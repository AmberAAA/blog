---
toc: 'menu'
nav:
  title: TypeScript
---

# Typescript 内置类型

> 使用 TS 的内置类型，减少 interface 的声明与调用；

> 参考资料 [utility-types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Partial

将传入的范型的值全部改为可选，范型可以传入 type 或 interface

```ts
interface IPerson {
  name: string;
  age: number;
}

type TModifyPerson = Partial<IPerson>;

// 内部实现：
// type Partial<T> = {
//   [K in keyof T]?: K[T]
// }

// 我们这里可以使用联合类型，给 TModifyPerson 上声明其他属性

type TModifyPersonPayload = TModifyPerson & { id: number };

const amber: TModifyPersonPayload = {
  id: 32,
};
```

```ts 通过阅读React.FC的类型定义掌握Partial
type FC<P = {}> = FunctionComponent<P>; // 这里使用了 type 的特性起了一个别名 FC

interface FunctionComponent<P = {}> {
  // interface 也也可以定义 函数类型， 此外，我们看到范型 P 给了props，因此我们使用了 React.FC<> 约束了React组件后，就不需要再给props约束条件了
  (props: P, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  // ⚠️ 看这里 这里的用法堪称经典，五星好评。 我们可以学到 React FC 也可以这样去设置默认值
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}
```

通过阅读 React.FC 的源码 我们学到了 可以直接使用 defaultProps 定义类型

```ts
interface IProps {
  name?: string;
  onChange?: (name: string) => void;
}

const Demo: React.FC<IProps> = ({ name }) => <div>{name}</div>;

Demo.defaultProps = {
  name: 'Amber',
};

export default Demo;
```

## Required

与 partial 刚好相反，required 是将所有的类型修改为只读。

## Readonly

与 Partial, Required 一样都是修改类型的值，将其变为只读。

## Record

快速定义一个键值对类型 Record 接收两个范型，第一个范型被用来约束 key ，第二个范型被用来约束 value

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

充分发挥想象力，Record 的第一个参数可以填的类型，决定了 Recode 的灵活度。

1. 传入一个枚举

   ```ts
   type Animal = {
     name: string;
     age: number;
   };

   enum eCat {
     TOM,
     JIM,
     Kitty,
   }

   type Cat = Animal & { mi: () => string };

   type AllCats = Record<eCat, Partial<Cat>>;

   const cats: AllCats = {
     [eCat.JIM]: {
       mi: () => `mi ~~~~`,
     },
     [eCat.Kitty]: {},
     [eCat.TOM]: {},
   };
   ```

1. 传入一个普通字符串
   ```ts
   const TCats = Record<string, Cat>;
   ```

## Pick

从给定的类型中挑选 key 组装成一个新的 type

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 现在出现了一种特殊的猫咪，它只有 name, age
type TSpecialCat = Pick<Cat, 'name' | 'age'>;
```

## Omit

与 Pick 相反，剔除给定的 key 组装何成一个新的 type

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

```ts
// 假设有一种聋哑cat
type TSpecialCat2 = Omit<Cat, 'mi'>;
```

## 其他

此外还有很多内置类型，这里不在一一介绍，只是列个表单，做个索引。

| 类型                               | 可供选择                                               |
| :--------------------------------- | :----------------------------------------------------- |
| 修改类型 value 的描述              | `Partial`, `Required`, `Readonly`                      |
| 过滤类型的 key                     | `Pick`, `Omit`                                         |
| 过滤联合类型                       | `Exclude`, `Extract`, `NonNullable`                    |
| 提取函数(包含构造函数)的入参和返回 | `Parameters`, `ConstructorParameters`, `ReturnType`    |
| 提取构造函数                       | `InstanceType`                                         |
| `this`作为如参数                   | `ThisParameterType`, `OmitThisParameter`               |
| 操作字符串类型                     | `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize` |
