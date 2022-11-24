---
title: Vim使用指南
toc: 'menu'
order: 50
group:
  title: Vim
  order: 50
---

# Vim 使用指南

## 参考资料

[阮一峰 Vim 配置入门](https://www.ruanyifeng.com/blog/2018/09/vimrc.html)

## Vim config file

Vim 的配置文件名为`.vimrc`，一般存放在用户家目录。

## 注释

vimrc 的注释格式是双引号"

## 键盘映射

参考文档

## 窗口操作

```
:vs [file name] 水平方向新开一个窗口，并打开该文件。也可以理解为纵向切一刀
:sp [file name] 垂直方向新开一个窗口，并打开改文件。窗口会出现在当前窗口的上方。

# 在普通模式下，使用^+W+[h/j/k/l]实现在多个窗口之间移动
# 也可以通过<^+W>+W实现窗口间的循环切换

# 查看关于vim 窗口的文档
:help window

# 移动窗口位置
[^+W] R 切换窗口位置
[^+W] [H/J/K/L] 改变窗口位置，移动到最左/下/上/右边。
```

## 标签页操作

```vim
:tabnew     #开启新的标签页
:gt/gT      #前往下一个/上一个标签页
```

## 打开文件

可以使用以下方式在 Vim 中打开文件。

```
:vs/:sp [file name] 水平/垂直方向打开
:e [file name] 在当前标签页打开文件
:Ex . 以文件浏览器的形式打开目录
```

## 打开终端

vim 内可以直接打开终端。在命令模式下，输入`:ter`即可。

## 插件

### easy motion

https://github.com/easymotion/vim-easymotion

## 宏

在普通模式下，输入 q 后面加一个[a-z]的字符,[a-z]即为宏的名称，即可开始录制一段宏。录制结束后，按 q 退出录制。

想要再次调用这段宏时，即可使用@[a-z]使用。想要多次调用，通过 N@[a-z]即可，N 为调用次数。

## 其他常用技巧

取消搜索后的高亮: `:noh`