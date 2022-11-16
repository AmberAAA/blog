---
toc: 'menu'
nav:
  title: TypeScript
---

# 使用 declare 声明方法

当在 ts 环境使用 js 时，往往会因为缺少类型推断而报错，甚至代码根本无法运行。此时可以使用`d.ts`文件，来补充声明类型。

```ts global.d.ts
/**
 * global.d.ts定义的类型会直接出现在 全局变量中
 */
declare interface API {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  rest?: boolean;
}

type APIS = {
  [k: string | number]: API;
};

declare interface ResponseBody<T> {
  code: 'ok' | any;
  body: T;
}

declare async function request<T>(params: enum): Promise<ResponseBody<T>> {};

declare let service = (a, b) => request;
```
