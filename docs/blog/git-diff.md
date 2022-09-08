---
toc: 'menu'
group:
  title: 工具
  order: 2
---

# Git 比较 diff


## 摘要
使用git diff 可以快速检索出当前工作区的变动，分支与分支之间的变动

```sh
#可以使用此命令来查看帮助
git diff --help
```

## 常用命令

### 比较工作区与暂存区差异

```sh
git diff
```

### 比较暂存区与上次提交的差异

```sh
git diff --cached
```

### 与上次提交分支等进行比较
 
```sh
git diff [branch name/commit id]
```

### 也可以比较两个分支
 
```sh
git diff [branch name/commit id] [branch name/commit id]
```

