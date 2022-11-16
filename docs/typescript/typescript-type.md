---
toc: 'menu'
nav:
  title: TypeScript
---

# TypeScript 类型断言

## 使用!与?避免冗余代码

```ts
interface TData {
  name?: string;
}

const data: TData = {
  name: 'Amber',
};

function main() {
  if (data.name) {
    data.name.charAt(0);
  } // 不使用类型断言 则需要if分支
  const a = data.name?.charAt(0); // 此时 a 的类型推断为 string｜undefined
  const b = data.name!.charAt(0); // 此时 b 的类型团队为 string
}
```

一般的使用`?`进行安全的调用，避免出现`TypeError: Cannot read properties of undefined`报错，如果尝试操作 undefined 则安全的返回 undefined。而`!`则是一个一定存在的类型断言，当开发这明确此时属性一定存在时，跟在属性名身后。
