---
toc: 'menu'
group:
  title: React
  order: 3
---

# React 使用心得

## Class组件与函数组件

1. 代码结构上 函数组件 更加精练
2. Class组件的副作用在生命周期里调用，如props改变，则从后端拉取最新的数据；
3. 函数组件的副作用一般在useEffect 这个hooks中声明；


## 函数式组件
1. 涉及到一些state的初始化，应该在hook中进行初始化，useEffect第二个参数传入空数组，效果等同与componentDidMount
