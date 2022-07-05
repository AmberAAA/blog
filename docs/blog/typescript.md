---
toc: 'menu'
group:
  title: TypeScript
  order: 3
---

# Interface 与 type 的区别

> 参考资料 <br/> > [stackoverflow](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript) <br/> > [掘金](https://juejin.cn/post/6844903749501059085)

## 一句话总结

> 能用`interface`就不用`type`

以下这些情况使用`type`：

1. 使用 type 为基础类型起别名
2. 使用 type 定义元组类型
3. 使用 type 定义函数类型
4. 使用 type 定义联合类型
5. 使用 type 通过组合来实现对象函数的重载
6. Use type when needing to take advantage of mapped types

以下情况使用 interface

1. Use interface for all object types where using type is not required (see above)
1. Use interface when you want to take advantage of declaration merging.

## 基础类型别名

```ts
type Nullish = null | undefined;
type Fruit = 'apple' | 'pear' | 'orange';
type Num = number | bigint;
```

## 定义元组类型

```ts
type Point = [x: number, y: number];
```

## 定义函数类型

虽然 type 与 interface 都可以定义函数类型，但是显然，使用 type 更加简洁

```ts
type Sum = (a: number, b: number) => number;

interface Sum {
  (a: number, b: number): number;
}
```

## 定义联合类型

```ts
type Fruit = 'apple' | 'pear' | 'orange';
type Vegetable = 'carrot' | 'lettuce';

// 'apple' | 'pear' | 'orange' | 'carrot' | 'lettuce'
type HealthyFoods = Fruit | Vegetable;
```

## 定义对象

### 合并与继承

<Alert>TS 的类型可以重载，但是JS对象是不支持方法重载的！</Alert>

```ts
interface NumLogger {
  log: (val: number) => void;
}

type StringAndNumberLogger = NumLogger & {
  log: (val: string) => void;
};

const logger: StringAndNumberLogger = {
  // 此时a已经被自动ts自动约束为：string ｜ number
  log: (a) => console.log(a),
};
```

如果使用 interface
```ts
// ts报错：属性“log”的类型不兼容。
interface StringAndNumber extends NumLogger {
  // 入参类型与父级必须完全一致
  log: (e: string) => void;
  // 但可以修改返回值
  log: (e: string) => string;
}
```

因此，如果想要重载某个对象类型的方法，我们使用 type 则会更方便



### Declaration Merging
