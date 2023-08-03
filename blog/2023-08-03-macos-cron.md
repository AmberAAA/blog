---
title: 在MacOS中使用定时任务
tags: [MAC]
authors: amber
---

在macos中使用定时任务需要注意一下事项：
1. 在`设置/隐私与安全性/完全磁盘访问权限`中添加`终端`,`/usr/sbin/cron`。
2. 使用`crontab -e`编辑，确保语法正确。
3. mac与linux中的`cron`表达式第一位从`分钟`开始。
4. 确保`cron`服务状态为开启，可通过`sudo launchctl list | grep "cron"`查看。
5. 在`crontab`内使用绝对路径。


举个例子
```zsh
0 11,17 * * * source /Users/amber/.zshrc; /bin/zsh /Users/amber/code/config-backup/backup.sh >> /Users/amber/code/config-backup/log 2>&1
```
