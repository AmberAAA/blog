---
title: Vim 搜索与匹配
toc: 'menu'
order: 50
group:
  title: Vim
  order: 50
---

# Vim 搜索与匹配

> [Find and Replace in Vim/Vi](https://linuxize.com/post/vim-find-replace/#basic-find-and-replace)

## 基本命令

```
:[range]s/{pattern}/{string}/[flags] [count]
```

## Example

test string foo bar foo bar foo bar bar

```
:s/foo/bar/     #删除当前行的第一个foo，并替换为bar
:s/foo/bar/g    #删除当前行的所有foo，并替换为bar
:%s/foo/bar/g   #将当前行的所有foo匹配，并且替换成为bar
:s/foo/bar/gc   #执行修改前需要确认
```

## Range

```
:10,12s/foo/bar/g     #在12-14行内操作
:.,+3s/foo/bar/g      #在当前行，和下面3行之间
:.,$/foo/bar/g        #在当前行和结尾之间进行匹配
```

## 匹配完整单词

```
:s/\<foo\>/bar/
```
