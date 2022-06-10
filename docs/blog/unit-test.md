---
toc: 'menu'
group:
  title: 代码
---
# 代码可测试

## 编写可测试的Javascript代码

> [Writing Testable Javascript](https://se-education.org/learningresources/contents/javascript/WritingTestableJavascript.html)

### 复杂度

1. 字面意思的“复杂度”，若行数太多，则考虑拆分逻辑。
2. 圈复杂度：一块代码，数量上表现为独立现行路径条数。圈复杂度为n的代码，需要n个不同的用例，才能测试完所有路径。

| 圈复杂度 | 代码状况     | 可测性 | 维护成本 |
| -------- | ------------ | ------ | -------- |
| 1-10     | 清晰、结构化 | 高     | 低       |
| 10-20    | 复杂         | 中     | 中       |
| 20-30    | 非常复杂     | 低     | 高       |
| >30      | 不可读       | 不可测 | 非常高   |

按照实践，被单元测试的代码。圈复杂度不要超过5。

**复杂度永远都是单元测试的头号天敌。**

这是一段复杂度为12的代码：

```javascript
    mounted() {
        const styleList = ["font-size", "color", "font-family", "font-weight", "letter-spacing", "word-spacing"]
        styleList.forEach(css => {
            const m = css.replace(/-\w/g, r => r[1].toUpperCase())
            if (css == "font-size") {
                this.style[css] = parseInt(this.size) || this.ops[css] || this.ops[m] || parseInt(window.getCompute dStyle(this.$refs.txtBox).getPropertyValue("font-size")) || 12
                this.boxStyle = { fontSize: this.style[css] }
            } else if (css == "color") {
                this.style[css] = this.color || this.ops[css] || window.getComputedStyle(this.$refs.txtBox).getPropertyValue("color") || "#333"
            } else {
                this.style[css] = this.ops[css] || this.ops[m] || window.getComputedStyle(this.$refs.txtBox).getPropertyValue(css)
            }
        })
  })
```

通过提炼函数，将一个模块提炼出来，最终分为三个复杂度为4的函数，以其中一个举例

```javascript
computedFontSize() {
    this.style["font-size"] =
        parseInt(this.size) || this.ops["font-size"] || this.ops["font-size"] || parseInt(window.getComputedStyle(this.$refs.txtBox).getPropertyValue("font-size")) || 12
    this.boxStyle = { fontSize: this.style["font-size"] }
},
```

如果想要覆盖完所有的路径，你需要这么多测试用例：

```javascript
it("computedFontSize", () => {
        // 这是一个复杂度为4的测试用例
        window.getComputedStyle = chai.spy(() => ({
            getPropertyValue: () => undefined
        }))
        const options = {
            localVue: localVue,
            propsData: {
                color: "#fff",
                ops: {
                    color: "#fff"
                }
            }
        }
        expect(shallowMount(Font, options).vm.boxStyle.fontSize).equal(12)
        expect(shallowMount(Font, options).vm.style["font-size"]).equal(12)
        window.getComputedStyle = chai.spy(() => ({
            getPropertyValue: () => 13
        }))
        expect(shallowMount(Font, options).vm.boxStyle.fontSize).equal(13)
        expect(shallowMount(Font, options).vm.style["font-size"]).equal(13)
        options.propsData.ops["font-size"] = 14
        expect(shallowMount(Font, options).vm.boxStyle.fontSize).equal(14)
        expect(shallowMount(Font, options).vm.style["font-size"]).equal(14)
        options.propsData.size = 15
        expect(shallowMount(Font, options).vm.boxStyle.fontSize).equal(15)
        expect(shallowMount(Font, options).vm.style["font-size"]).equal(15)
})
```

所以，如果做不到TDD，呢么我们就要从编写代码之初，就要考虑到复杂度带来的问题。这个组件API这么设计，再当初，我们认为提高冗余度，就是提高的组件的灵活性，如果在单元测试的背景下，灵活度冗余度无疑会加重内部的复杂度，从而提高单元测试的难度。

### 纯函数

一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。

纯函数对单元测试是非常友好的，测试时，不需要关注其他方面，只需要给定特定的入参，返回特定的出参即可。

```javascript
var index = 1;
var todos = [];

// bad
// 不仅依赖，还修改了外部变量，所以每次返回都不一样。
function getTodo() {
    index--;
    if (index > todos.length) {
        return 'NIL';
    }
    return todos[index];
}

// good
function getTodoV2(todos, index) {
    if (index >= todos.length) {
        return 'NIL';
    }
    return todos[index - 1];
}

describe("纯函数与非纯函数测试用例的比较", () => {
    it("非纯函数", () => {
        var index = 1;
		var todos = [1,2,3];
        expect(getTodo()).eq(1)
        var index = 2;
        expect(getTodo()).eq(2)
        // 还需要考虑，index变化是否会影响其他函数。
    })
    it("纯函数", () => {
        expect(getTodoV2([1,2,3], 1)).eq(1)
        expect(getTodoV2([1,2,3], 2)).eq(2)
    })
})
```

*注意：* 在日常开发中，组件内部方法想要实现纯函数是基本上不可能的，因为组件内部方法肯定访问了`data`或者`props`。这时，但在单元测试时，入参一致的组件，如果函数行为一致，我认为它也是一种`纯函数`。如：

```javascript
export default {
    data () {
        return: { list: [] }
    }
    methods: {
        addItem(item) {
            this.list = [...this.list, item]
        }
    }
}
```

虽然，如果我们以局部的目光去看`addItem`一定不是个纯函数，他在内部修改了`this.list`产生了副作用。

但，如果我们将目光放置到整个组件，那个对于组件来说，他是可以被重复和测试的，如果过分追求严格的纯函数，那在Vue的思想内是难以实现的：

```javascript
it("addItem", () => {
    const listWrapper = shallowMount(List, { data: { list: [] } });
    listWrapper.vm.addItem(1)
    expect(listWrapper.vm.list).eq([1])
})
```



 ### 依赖注入

以Vue的设计思想，没有使用依赖注入的必要，因此这里只用了解。在以面向对象的思想中，依赖注入被广泛使用。这里以一段Angular伪代码伪类。依赖注入，其实是一种硬强行的方式。

```javascript
export class UserService {
   
    getUserName () {
        return JSON.parse(localstorage.getItem("userInfo")).userName
    }
}
```



非依赖注入：

```javascript
import { UserService } from './user-service.js'


export class UserComponent {
    userService: new UserService();
    
    sayHello () {
        return "Hello " + this.userService.getUserName()
    }
}
```

现在我们要对UserCompoent的sayHello进行单元测试，但是，改方法又对UserService完全依赖，getUserName又对浏览器API严重依赖，那么，我们如何测试这段代码呢？这个时候，就可以考虑到依赖注入。

依赖注入：

```javascript
import { UserService } from './user-service.js'

export class UserComponent {
    userService;
    
    constructor (userService) {
        this.userService = userService
    }
    
    sayHello () {
        return "Hello " + this.userService.getUserName()
    }
}
```

此时，我们可以这么测试：

```javascript
describe("UserComponent", () => {
    it("sayHello", {
        const userService = {
        	getUserName: chai.spy(() => "Amber")
    	}
        const userCompoent = new UserComponent(userService)
		expect(userCompoent.sayHello()).eq("Hello Amber")
		expect(userService.getUserName).called.once
    })
})
```



### 业务代码与展示逻辑分开

这一点，目前我们的代码是比较符合规范的。组件库目前是和业务代码完全解耦的，因此尚未有这方面的实践。但考虑到后期如果每个项目中都要引入单元测试的话，可以从现在按照这种方式编写。好处就是，业务代码（与后端交互获取数据的方法）不用测试。我们前端内部的逻辑，通过本地mock数据，或者从MockServer上直接请求即可。

推荐使用aysnc/await写法，可以避免很多花括号，语义更加自然，不能担心兼容性，babel会帮我们转义。

```javascript
export default class {
    methods: {
        async getData () {},
    	async deleteItem (id) {},
    	async handleClick(id) {
            this.loading = true
            await this.deleteItem(id)
            this.loading = false
        }
    }
}
```

### 避免大型匿名函数

大型的匿名函数是无法维护的，一定要拆出来。

## 前端在单元测试过程中的特殊性

### DOM API与DOM

在前端，访问DOM API是无可避免的，Mocha虽然是nodejs运行环境，但是vue单元测试框架已经帮我们mock了一整套dom api。此外，因为Vue已经帮我们做了dom与data的绑定，因此我们需要将中心点更多的放在data上。或有部分特殊的方向，需要访问或修改dom，则需要我们自己去Mock完成。后面会有一段完整的例子。

## 异步

异步函数也是可以被测试的。

```javascript
const getDataFromMockServer = () => new Promise((res) => setTimeout(() => res("Amber"), 100))

describe("Provice", () => {
    it("test async", async () => {
        const data = await getDataFromMockServer()
        expect(data).equal("Amber")
    })
})
```

### 全局变量

我们有许多全局的变量或者方法，可能会被调用。确保它是只读的。另外代码中出现我们的公共方法也是可以的。

## 单元测试的边界

我们不可否认，单元测试有成本。如果在成本与收益之间取一个平衡，是我们每一位开发者需要关注的问题。一下三个阶段，成本越来越高，带来的收益可能并不像花费的成本那么突出，因此需要我们在实践中，掌握一套平衡。

1. 冒烟通过
2. 测试关键函数，并覆盖正确的输入与输出
3. 开始关注异常

另外，在Vue组件化测试中，我们需要测什么。那些是我们应该关注的点

| 名称                               | 关注度 |      |
| ---------------------------------- | ------ | ---- |
| 组件-Template                      | 低     |      |
| 公共方法                           | 高     |      |
| 组件-逻辑代码                      | 中     |      |
| 组件-业务代码（与后端API交互逻辑） | 不关注 |      |

那些频繁迭代，不稳定的模块，比稳定，不频繁改动的模块更需要单元测试。



### 业务、单元测试、重构之间的平衡

1. 重构不是全部推倒重来，重构可以很小，重命名一个更友好的变量名，提炼一段函数，改变一个函数的签名等等，都是重构。
2. 确保你的每次提交都比上一个版本干净一点点。
3. 单元测试是重构的基石，确保重构时，单元测试处于打开监听，时刻观察单元测试有无异常。
4. 单元测试与重构之间，一定是单元测试先行，如果做不到，至少也要冒烟通过。

## 实践

现在有以下代码，虽然复杂度是1，但是太长了，不易阅读与理解，现在想重构这个方法：

```javascript
draw() {
    let c = document.createElement("canvas")
    let ct = document.createElement("canvas")
    let ctctx = ct.getContext("2d")
    let font = `${this.fontSize}px ${this.fontFamily}`
    ctctx.font = font
    let ctx = c.getContext("2d")
    let maxWidth = ctctx.measureText(this.text).width
    let height = this.fontSize
    let degToPI = (Math.PI * this.rotate) / 180
    let absDeg = Math.abs(degToPI)
    let hSinDeg = height * Math.sin(absDeg)
    let hCosDeg = height * Math.cos(absDeg)
    let wSinDeg = maxWidth * Math.sin(absDeg)
    let wCosDeg = maxWidth * Math.cos(absDeg)
    c.width = parseInt(hSinDeg + wCosDeg + this.ops.marginRight)
    c.height = parseInt(wSinDeg + hCosDeg + this.ops.marginBottom)
    ctx.font = font
    ctx.fillStyle = this.fontColor
    ctx.textBaseline = this.rotate <= 0 ? "hanging" : "bottom"
    ctx.translate(0, this.rotate <= 0 ? wSinDeg : hSinDeg + this.fontSize * Math.cos(absDeg))
    ctx.rotate(degToPI)
    ctx.fillText(this.text, 0, 0)
    let imgData = c.toDataURL("image/png")
    let watermarkDom = this.$refs.watermark
    watermarkDom.style.cssText += "position:absolute; left:0; top:0; right:0; bottom:0; z-index:9999; pointer-events:none;"
    watermarkDom.style.backgroundImage = "url(" + imgData + ")"
    watermarkDom.style.backgroundPosition = this.ops.left + "px " + this.ops.top + "px"
    setTimeout(() => {
        c.remove()
        ct.remove()
    }, 0)
}
```

### 第一步 分析与编写冒烟测试用例

整个函数其实可以分为三个步骤：

1. 获取大小角度等位置信息
2. 生成base64信息；
3. 渲染到dom的背景中；

所以，我们想通过提炼函数的方法给这段函数瘦身，首先我们先写一个冒烟测试，并将单元测试设置为监听状态；

```javascript
it("draw", () => {
    wrapper.methods.draw()
 })
```

然后打开单元测试：

````bash
npm run tuw
vue-cli-service test:unit --watch
````

接下来，愉快的迁移代码吧，请时刻关注控制台，任何变量不存在或语法错误都会导致冒烟测试失败，因此你可以在控制台看到详细的错误堆栈信息，从而更快的发现错误，解决错误。

### 第二步 分批提炼函数

我们将计算字体的位置信息，分析代码得出：获取字体的位置信息，除了依赖组件的data与props以外，只依赖字体的宽度，因此，我们将宽度作为函数的入参，位置信息作为函数的出参。提炼后的函数如下：

```javascript
getSize(fontWidth) {
    let degToPI = (Math.PI * this.rotate) / 180
    let absDeg = Math.abs(degToPI)
    let hSinDeg = this.fontSize * Math.sin(absDeg)
    let hCosDeg = this.fontSize * Math.cos(absDeg)
    let wSinDeg = fontWidth * Math.sin(absDeg)
    let wCosDeg = fontWidth * Math.cos(absDeg)
    let width = parseInt(hSinDeg + wCosDeg + this.ops.marginRight)
    let height = parseInt(wSinDeg + hCosDeg + this.ops.marginBottom)
    let rotate = this.rotate <= 0 ? wSinDeg : hSinDeg + this.fontSize * Math.cos(absDeg)
    return [width, height, rotate, degToPI]
}
```

记得编写单元测试，确保gitSize正确可靠：

```javascript
    it("getSize", () => {
        // mock 一个this
        const self = {
            rotate: 45,
            fontSize: 12,
            ops: {
                marginRight: 10,
                marginBottom: 20,
            }
        }
        const width = 100
        const size = watermark.methods.getSize.call(self, width)
        expect(size[0]).to.been.equal(89)
        expect(size[1]).to.been.equal(99)
        expect(Math.floor(size[2] * 100) / 100).to.been.equal(16.97)
        expect(Math.floor(size[3] * 100) / 100).to.been.equal(0.78)
    })
```

重复此步骤，将其余部分历练出来。并补充单元测试。

### 第三步 Mock Dom API

Camvas的内部API在测试框架中，并没有被声明，并且我们需要这些API返回特定的值，以便于测试：

```javascript
it("getImage", () => {
    // 1. mock 一个 canvas上下文的API
    const ctx = {
        translate: chai.spy(),
        rotate: chai.spy(),
        fillText: chai.spy(),
    }
    // 2. mock 一个canvas的API，并在getContext的方法出，返回我们mock的ctx
    const canvas = {
        getContext: chai.spy(() => ctx),
        remove: chai.spy(),
        toDataURL: chai.spy(() => 'data-url')
    }
    // 3. 备份一下createElement方法
    const _back = document.createElement
    // 4. 重写 createElement 方法，使其返回我们的mock对象
    document.createElement = chai.spy(() => canvas)
    const fontString = "xxxx"
    const text = "text"
    expect(watermark.methods.getImage.call({text, rotate: -45, fontColor: "fontColor"},[1,2,3,4], fontString)).to.been.equal("data-url")
    // 5. 可以通过框架，断言mock方法的调用次数，以及入参等，这里确保canvas.remove方法只被调用了一次，
    expect(canvas.remove).called.once;
    // 6. 还原createElement方法，避免对其他恶的用例产生影响
    document.createElement = _back
})
```
