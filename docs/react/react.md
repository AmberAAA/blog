---
toc: 'menu'
nav:
  title: React
---

# React 使用心得

## Class 组件与函数组件

1. 代码结构上 函数组件 更加精练
2. Class 组件的副作用在生命周期里调用，如 props 改变，则从后端拉取最新的数据；
3. 函数组件的副作用一般在 useEffect 这个 hooks 中声明；

## 函数式组件

1. 涉及到一些 state 的初始化，应该在 hook 中进行初始化，useEffect 第二个参数传入空数组，效果等同与 componentDidMount

## 常用 hook

1. useState
2. useEffect
3. useContext

## 自定义 hooks

```ts
export const useCount = (num: number = 0) => {
  const [state, setState] = useState(num);
  useEffect(() => {
    const add = () => {
      console.log(state);
      setState((e) => e + 1);
    };
    document.addEventListener('click', add);
    return () => document.removeEventListener('click', add);
  }, []);
  return state;
};
```

## useEffect

场景复现：副组件通过 props 将两个属性 start、end 传入子组件，子组件通过 useEffect 执行副作用，第二个参数为数组，内部元素为 props。发现副组件内其他状态发生变化，也会触发子组件内部的副作用，打印日志发现，前后 props 确实不一致

```
// 重复调用
useEffect(() => {
  fetchData();
}, [props]);

// 问题解决
useEffect(() => {
  fetchData();
}, [props.end, props.start]);
```
