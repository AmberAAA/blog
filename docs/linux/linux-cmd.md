# 常用命令

## nslookup

更新 DNS

```bash
nslookup -type=A www.baidu.com
```

## 查看文件/文件夹占用情况

使用`du`命令可是快速查看当前文件/文件夹的占用情况。为`du`其实是`disk usage`的缩写。

```zsh
du -h #以人类可读的形式打印，单位为G、M、K
du -ah --max-depth=1 # 现实所有 以及递归深度
```

## 排序

使用`sort`可是快速对输入进行排序，比如配合`du`命令，就可以实现查询当前文件夹内的文件占用情况，并本剧文件大小排序展示。

```zsh
du -ah --max-depth=1 | sort -hr
```
