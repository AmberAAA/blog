---
title: 常用命令
last_update:
  author: Amber
  date: 2023-06-03
---

### nslookup

更新 DNS

```bash
nslookup -type=A www.baidu.com
```

### 查看文件/文件夹占用情况

使用`du`命令可是快速查看当前文件/文件夹的占用情况。为`du`其实是`disk usage`的缩写。

```zsh
du -h #以人类可读的形式打印，单位为G、M、K
du -ah --max-depth=1 # 现实所有 以及递归深度
```

### 排序

使用`sort`可是快速对输入进行排序，比如配合`du`命令，就可以实现查询当前文件夹内的文件占用情况，并本剧文件大小排序展示。

```zsh
du -ah --max-depth=1 | sort -hr
```

### 代理的最佳实践

1. 如果网络内已经存在代理服务器，则通过设置环境变量`HTTP_PROXY`, `HTTPS_PROXY`, 或者`proxychains`实现。
2. 如果网络内没有代理服务器，则通过 docker，网络类型为 host，搭建代理服务器；

### 端口占用

```sh
netstat -tunlp #该命令已停止维护，但可用；
ss -atu #查看所有tcp,udp进程信息
```

#### 关于`ss`的一些详细指令
- `-l` 只列出状态为`listening`的网络链接
- `-p` 显示进程信息 可能需要提升权限``
- `-n` 显示端口好，而不是服务名

如果没有显示进程相关信息，则需要提升用户权限

### 进程查看

```
ps -aux
```

### Date
使用`date`格式化日期
```sh
# 格式化的模板字符串以+开头
date "+%Y-%m-%d %T" # 2023-07-24 10:28:07

# 备份文件

cp "$HOME/.zsh" "$HOME/.back/$(date '+%Y-%m-%d %T').back"
```

