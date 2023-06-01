# any、unknown、void、never

> [参考资料](https://blog.csdn.net/KNIGH_YUN/article/details/115412962)

## any

任何类型，万金油，啥都是。ts 编译器会跳过 any 类型，不做任何约束

## void

没有类型，一般如果函数没有返回值时，会用 `void` 约束

## unknown

表示未知类型，相比较与 any

1. 它可以被复制任何类型
2. 它不能给除了`any`,`unknown`以外的类型
3. 不允许使用 `unknown` 上的方法

```ts
let a: unknown;
let b: any = "A";
let c: Date = new Date();

// unknown 可以被赋任何值
a = "1";
a = 1;
a = b;
a = new Date();
// unknown 可以复制给any
b = a;
// unknown 不能复制给除了any unknown 类型以外的值
// c = a

// 不允许执行方法
// a.toString()
```

## never

永不存在；极少用；
