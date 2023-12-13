---
title: 如何监听DOM大小变化？
tags: [前端]
authors: Amber
---

## `onresize`事件
使用`window.on('resize', () => {})`可以监听因为窗口变化，而发生的变化回调，但是对于Dom的的尺寸变化，却无法响应。

## 使用`ResizeObserver`尺寸变化

> [ResizeObserver API MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)

ResizeObserver 接口监视 Element 内容盒或边框盒或者 SVGElement 边界尺寸的变化。


```tsx
const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    console.log('handling box size changing')
  }
});

observer.observe(window.document.querySelector('dom'));
observer.disconnect();
```