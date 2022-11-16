---
toc: 'menu'
nav:
  title: React
---

# React 属性默认值

使用对象解构赋值实现属性默认值功能

```tsx | pure
interface IProps {
  top: number;
  left: number;
  zIndex?: number;
}

const FixImage: React.FC<IProps> = ({ zIndex = 20, ...props }) => <></>;
```

<Alert>[ES6 对象解构赋值](https://es6.ruanyifeng.com/#docs/destructuring#%E9%BB%98%E8%AE%A4%E5%80%BC)</Alert>
