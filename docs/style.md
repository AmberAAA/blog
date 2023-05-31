# 关于 CSS 开坑记录

## 在 LESS 中使用 CSS 变量

可以。可以在 LESS 中使用 CSS 变量

<!--truncate-->

## flex-shrink 不生效

可以参考这篇文档[flex 布局与 min-width](https://blog.tcs-y.com/2021/09/23/flex-content-min-width/)

要想使用`flex-shrink`需要配合`min-width`使用。

## Border 动画

制作好看的边框动画，[blog](https://web.dev/css-border-animations/)。
三个图层，底层背景，中间层遮照，顶层为实际内容。

## CSS 颜色函数

1. CSS 颜色渐变函数有三个，分别是线性，锥形，放射形 [渐变函数](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient)

## Gap

在 flex 与 grid 布局中，可以使用 gap，快的的去指定边距

## Grid

1. gird-template-\*
2. grid-auto-\*