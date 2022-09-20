---
title: Vim使用指南
toc: 'menu'
group:
  title: 工具
---

# Vim 使用指南 

## 参考资料
[阮一峰 Vim配置入门](https://www.ruanyifeng.com/blog/2018/09/vimrc.html)

## Vim config file

Vim的配置文件名为`.vimrc`，一般存放在用户家目录。

## 注释
vimrc的注释格式是双引号"

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
可以使用以下方式在Vim中打开文件。
```
:vs/:sp [file name] 水平/垂直方向打开
:e [file name] 在当前标签页打开文件
:Ex . 以文件浏览器的形式打开目录
```


## 打开终端
vim内可以直接打开终端。在命令模式下，输入`:ter`即可。

## 插件
### easy motion
https://github.com/easymotion/vim-easymotion
## 宏
在普通模式下，输入q后面加一个[a-z]的字符,[a-z]即为宏的名称，即可开始录制一段宏。录制结束后，按q退出录制。

想要再次调用这段宏时，即可使用@[a-z]使用。想要多次调用，通过N@[a-z]即可，N为调用次数。

## 其他常用技巧
取消搜索后的高亮: `:noh`

## 搜索文件
```zsh
" find files and populate the quickfix list
fun! FindFiles(filename)
  let error_file = tempname()
  silent exe '!find . -name "'.a:filename.'" | xargs file | sed "s/:/:1:/" > '.error_file
  set errorformat=%f:%l:%m
  exe "cfile ". error_file
  copen
  call delete(error_file)
endfun
command! -nargs=1 FindFile call FindFiles(<q-args>)
```
之后，使用命令`:FindFile`即可失效搜索文件


