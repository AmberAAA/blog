---
toc: 'menu'
group:
  title: 工具
  order: 2
---

# Git 进阶以及工作流

## 推荐工具

1. GUI 工具 - SourceTree
   ![2022-12-28-13-30-56](https://public-abr.oss-cn-hangzhou.aliyuncs.com/2022-12-28-13-30-56_00a95bcc.png)

2. CLI 工具 LazyGit

![2022-12-28-13-32-04](https://public-abr.oss-cn-hangzhou.aliyuncs.com/2022-12-28-13-32-04_08cd93ea.png)

## Commit

### 快速提交

```bash
# -a 提交工作区代码，相当于提前执行了 git add .
# [-m message] 后面跟commit message
# 因此快速提交可以使用
git commit -am "fast commit"
```

### 修订

修订`git commit --ament`，工作中，我们通常建议多提交，但是过多的 commit message 也会导致 git 提交记录非常难看，因此可以使用此命令来压缩 commit。
`git commit --ament`可以将暂存区的记录，修订到上次的 commit 记录中。

```bash
# --ament 修正
git commit --ament
```

## DIFF

```bash
git diff # 比较工作区和暂存区
s
git diff --cache # 比较暂存区和上次提交
s
git diff [branch/commit] # 当前状态，与提供的分之名/commit/tag等比较
d
git diff [brach/commit] [branch/commit] #比较两次提交或者分支
```

## stash

## 分支合并

### Merge

在命令行中快速解决冲突

```bash
git merge --continue #继续merge，发生在merge存在冲突，并已经解决了冲突，且将响应的文件已经提交到了暂存区。通过 continue 继续合并代码
git merge --abort #放弃本次merge，发生在解决冲突，手动合并了错误的代码，想要退出merge时，执行后，一切都没有发生。
git diff #快速定位到冲突位置。
```

![2022-12-28-14-14-43](https://public-abr.oss-cn-hangzhou.aliyuncs.com/2022-12-28-14-14-43_24a02f15.png)

### Cherry-Pick

在很少的情况下，你并不想合并目标分支的所有代码，你只想将某一次,或多次提交记录给摘取过来，那么你可以使用`cherry-pick`命令。

```bash
# git cherry-pick [commit]...
git cherry-pick 7c948209366e4b8acb7730a8ce7ec8cba7025cae # 将这条commit记录cherry-pick到当前分支
git cherry-pick e8cbc3a1925d7d07802a063095a2e6921993a890 7c948209366e4b8acb7730a8ce7ec8cba7025cae # 后面可以跟多个提交记录
```

### Rebase

## 后悔药

### log & reflog

### revert

### reset

## 工作流

### Merge Request
