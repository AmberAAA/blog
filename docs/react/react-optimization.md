---
toc: 'menu'
nav:
  title: React
---

# 浅谈 React 性能优化

## 一句话总结

1. 目前 react 的优化方向是减少 render 的次数。
2. 渲染 DOM 是通过 react 内部 dom-diff 算法实现，开发者无法插手。
3. 只有当你确定，性能压力来自 render 执行方法时，可以考虑使用改优化方法
4. `useMemo`, `useCallBack` 需要与 `memo` 方法配合使用。

## 核心思路

1. `memo`是一个高阶函数，第一个参数接收一个 React Dom，第二个参数，传入一个比较函数，判断是否需要更新组件。
2. 使用`useMemo`缓存变量，以及使用`useCallBack`缓存函数，再通过`memo`控制 React Dom 的 render 时机

## 实例

:::info{title=自定义标题}

1.请打开控制台查看输出

2.请打开源码查看备注

:::

<code src="../../src/components/optimization/index.tsx"> </code>
