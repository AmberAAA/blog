---
toc: 'menu'
nav:
  title: TypeScript
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
6. 当需要遍历类型时，使用 type : `[key in xxx]`

以下情况使用 interface

1. 当不需要遍历类型时（参考上面第六条）
1. 当你需要属性合并时，使用 `interface`

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

<Alert>TS 的类型可以重载，但是 JS 对象是不支持方法重载的！</Alert>

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

### 属性合并

```ts
interface Person {
  name: String;
}

const tom: Person = {
  name: 'Tom',
  // 没有say方法 会报错，可见类型声明，会被提前
  say: () => 'Hello every body',
};

interface Person {
  say: () => string;
}

//
const amber: Person = {
  name: 'Amber',
  // 类型被合并，Person同时拥有 name say
  say() {
    return "I'm " + this.name;
  },
};
```

```ts
type Person = {
  name: string;
};

// 报错 Person重复
type Person = {
  age: () => string;
};
```

### 描述属性对象

这是一个更贴近于业务的事例，我们如何描述这段对象

```ts
// 1. 如果描述这个对象
const hdcpVersion: HdcpV = {
  'HDMI1.3': {
    list: ['HDMI1.4'],
    def: 'HDMI1.4',
  },
  'HDMI1.5': {
    list: ['HDMI1.5'],
    def: 'HDMI1.5',
  },
  DVI: {
    list: ['HDCP1.3'],
    def: 'HDCP1.2',
  },
};

// 2. 声明一个type 包含所有的视频接口协议
type HDCP = 'HDMI1.3' | 'HDMI1.5' | 'HDMI1.4' | 'DVI' | 'HDCP1.3' | 'HDCP1.2';

// 3. 声明一个type 用来描述对象
type HdcpV = {
  // 4. [key in HDCP]对对象的key进行约束，只能从HDCP里取
  // 5. **注意**： "?"问好表述为可选，去掉问好表述，对象的值必须吧 HDCP全部包含
  [key in HDCP]?: {
    list: HDCP[];
    def: HDCP;
  };
};
```

## 总结

大多数情况下，`type`与`interface`用法类似

```ts
type Props = { name: string };
interface Props {
  name: string;
}
```

然而当你需要合并两个，三个类型时，你就会发现这两个彼此之间的差异。你可以选择通过 `interface` 去继承，或者通过 `type`去交叉合并。这个时候才是真正明白彼此之间差异的时候。

`interface`由于继承的关系，因此是一个更加扁平的对象，所以在出现问题时，也更好排查。_`type`的交叉合并，有时候合了等于没合（没有任何产出）？_`interface` 的语法提示也会更加友好一点（强烈同意）。

原文如下：这一段可能翻译的不太准确

> Interfaces create a single flat object type that detects property conflicts, which are usually important to resolve! Intersections on the other hand just recursively merge properties, and in some cases produce never. Interfaces also display consistently better, whereas type aliases to intersections can't be displayed in part of other intersections. Type relationships between interfaces are also cached, as opposed to intersection types as a whole. A final noteworthy difference is that when checking against a target intersection type, every constituent is checked before checking against the "effective"/"flattened" type.
