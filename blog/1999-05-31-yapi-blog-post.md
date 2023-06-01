---
title: Yapi 使用维护指南
tags: [Yapi, 自动化, mock]
authors: amber
---

# Yapi 使用维护指南

<!--truncate-->

## 后端架构

后端使用[Koa](https://www.npmjs.com/package/koa)+[mongoose](https://www.npmjs.com/package/mongoose)

### 应用入口文件

应用的入口文件为：`/home/amber/yapi-master/server/app.js`

**注意：**为了方便阅读，代码的顺序做出了调整

1. mockServer 以中间件的形式，注册到 Koa 中，如果检测到 path 以/mock/开头，则会被中间件拦截，并根据路由规则，生成并返回对应的 mock 数据

   ```
   const mockServer = require('./middleware/mockServer.js');
   app.use(mockServer);
   ```

2. 请求处理：之前已经排除了以`/mock`开头的 api，这里继续处理路由以`/api`开头的 path 将会正常处理，其他所有的则之间返回根路径。

   ```
   app.use(async (ctx, next) => {
     if (/^\/(?!api)[a-zA-Z0-9\/\-_]*$/.test(ctx.path)) {
       ctx.path = '/';
       await next();
     } else {
       await next();
     }
   });
   ```

### Model 层

Model 层用来与数据库进行读写操作，关于查询，或修改数据库的操作，会在 Model 处理。

所有的 Model 必须继承`BaseModel`, 并且重写`getSchema`、`getName`这两个方法。

以 UserModel 为例：初始化，以及 CRUD

```javascript
// *继承BaseModel
class userModel extends baseModel {
  // 返回表名
  getName() {
    return "user";
  }

  // 返回User的Schema，对User表进行约束
  getSchema() {
    return {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      passsalt: String,
      study: { type: Boolean, default: false },
      role: String,
      add_time: Number,
      up_time: Number,
      type: { type: String, enum: ["site", "third"], default: "site" }, //site用户是网站注册用户, third是第三方登录过来的用户
    };
  }

  // 保存 https://mongoosejs.com/docs/models.html#constructing-documents
  save(data) {
    let user = new this.model(data);
    return user.save();
  }

  // 删除 https://mongoosejs.com/docs/models.html#deleting
  del(id) {
    return this.model.remove({
      _id: id,
    });
  }

  // 更新 https://mongoosejs.com/docs/models.html#updating
  update(id, data) {
    return this.model.update(
      {
        _id: id,
      },
      data
    );
  }

  // 复杂查询 https://mongoosejs.com/docs/models.html#querying
  search(keyword) {
    return this.model
      .find(
        {
          $or: [
            { email: new RegExp(keyword, "i") },
            { username: new RegExp(keyword, "i") },
          ],
        },
        {
          passsalt: 0,
          password: 0,
        }
      )
      .limit(10);
  }

  // 通过email查询用户实体，后面讲登录用到
  findByEmail(email) {
    return this.model.findOne({ email: email });
  }
}
```

### Controller 层

Controller 层用于接受分发请求数据，业务逻辑一般写在这里。

所有的 Controller 需要继承 BaseController，在`BaseController`中，有关于用户鉴权的公共方法。这里还是以`UserController`为例，介绍如何登陆，以及创建新的用户：

```javascript
class userController extends baseController {
  constructor(ctx) {
    super(ctx);
    this.Model = yapi.getInst(userModel);
  }

  /**
   * 用户登录接口
   */
  async login(ctx) {
    //登录
    let userInst = yapi.getInst(userModel); //创建user实体
    // 通过ctx.request.body.* 可以拿到Body体中的数据
    let email = ctx.request.body.email;
    email = (email || "").trim();
    let password = ctx.request.body.password;

    if (!email) {
      //  yapi.commons.resReturn 返回体构造函数
      return (ctx.body = yapi.commons.resReturn(null, 400, "email不能为空"));
    }
    if (!password) {
      return (ctx.body = yapi.commons.resReturn(null, 400, "密码不能为空"));
    }

    // UserModel中有一个findByEmail， 这里通过findByEmail返回用户实体。注意await
    let result = await userInst.findByEmail(email);

    if (!result) {
      return (ctx.body = yapi.commons.resReturn(null, 404, "该用户不存在"));
      // 下面这个if判断密码是否正确
    } else if (
      yapi.commons.generatePassword(password, result.passsalt) ===
      result.password
    ) {
      // 设置 Cookie
      this.setLoginCookie(result._id, result.passsalt);

      return (ctx.body = yapi.commons.resReturn(
        {
          username: result.username,
          role: result.role,
          uid: result._id,
          email: result.email,
          add_time: result.add_time,
          up_time: result.up_time,
          type: "site",
          study: result.study,
        },
        0,
        "logout success..."
      ));
    } else {
      return (ctx.body = yapi.commons.resReturn(null, 405, "密码错误"));
    }
  }

  /**
   * 用户注册接口
   * @interface /user/reg
   */
  async reg(ctx) {
    //注册
    if (yapi.WEBCONFIG.closeRegister) {
      return (ctx.body = yapi.commons.resReturn(
        null,
        400,
        "禁止注册，请联系管理员"
      ));
    }
    let userInst = yapi.getInst(userModel);
    let params = ctx.request.body; //获取请求的参数,检查是否存在用户名和密码

    // 注意这个公共方法： 处理请求参数类型，String 字符串去除两边空格，Number 使用parseInt 转换为数字
    // 因为使用了parseInt，错误的使用，可能会导致BUG
    params = yapi.commons.handleParams(params, {
      username: "string",
      password: "string",
      email: "string",
    });

    /** 此处省略了部分代码 **/

    if (!data.username) {
      data.username = data.email.substr(0, data.email.indexOf("@"));
    }

    try {
      // 保持用户
      let user = await userInst.save(data);

      this.setLoginCookie(user._id, user.passsalt);
      await this.handlePrivateGroup(user._id, user.username, user.email);
      ctx.body = yapi.commons.resReturn({
        uid: user._id,
        email: user.email,
        username: user.username,
        add_time: user.add_time,
        up_time: user.up_time,
        role: "member",
        type: user.type,
        study: false,
      });
    } catch (e) {
      ctx.body = yapi.commons.resReturn(null, 401, e.message);
    }
  }
}
```

### MockServer

MockerServer 以中间件的形式，注入到 Koa 中，会拦截所有以/mock 开头的请求，并根据后续的链接，生成并返回对应的 mock 数据，底层依然是 mock.js 驱动。

## 前端架构

前端代码统一存放在`/client`文件内，前端架构为 React、React-Router、Redux。

应用的入口位于：`/client/index.js`

根组件位于：`/client/application.js`

所有页面位于：`/client/containers`

### Redux

注意 connect 注解，他的作用是将状态管理器中的状态，分发到组件的 props 中，可以类比着参考`mapState`。另外，详细的文档可查看：[react-redux 的 connect 用法详解](https://blog.csdn.net/yoonerloop/article/details/112058929)

```javascript
@connect((state) => {
  return {
    curUid: state.user.uid,
    userType: state.user.type,
    role: state.user.role,
  };
}, {})
class User extends Component {}

export default User;
```

### React-Router

路由表在`/clinent/application.js/AppRoute`内。

## 踩坑记录

### 安装依赖不成功

删除`package-lock.json`并重新安装依赖。

### Windows 上运行开发环境报错

windows 中没有 cp 命令，解决方案有两个：

1. 修改 package.json 中的命令，适配 windows 环境（未尝试）。
2. 使用 WSL，在 Linux 子系统中开发（可以解决），注意修改`/static/dev.html`中的资源地址。

### 在 Vscode 上调试后端代码

在 package.json 中，鼠标放置在`dev-server`上，点击`Debug Script`即可。在代码行号旁边，新增断点，也可在进入断点后，在调试控制台，打印运行时的变量。
