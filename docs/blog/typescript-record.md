---
toc: 'menu'
group:
  title: TypeScript
  order: 3
---

# Record定义键值对

在 `Typescript` 中，可以使用 `Recode` 来定义键值对类型的对象，`Record` 接收两个范型，第一个为 `key` 的类型，第二个为 `value` 的类型。

``` ts
type TPageName = "home" | "details" | "welcome"

interface IPage {
  title: string;
  body: string
}

// 使用Recode可以轻松定义出键值对类型的接口
const pages: Record<TPageName, IPage> = {
  details: {
    title: "",
    body: ""
  },
  home: {
    title: "",
    body: ""
  },
  welcome: {
    title: "",
    body: ""
  }
}

// 效果等价于 Record<TPageName, IPage>
// 使用Record可以减少类型定义
type IOtherPage = {
  [key in TPageName]: IPage
}

// 可以互相赋值
let otherPages: IOtherPage = pages
```
