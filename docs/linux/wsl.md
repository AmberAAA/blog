---
toc: menu
title: WSL
nav:
  title: Linux
  order: 0
---

# WSL

## 端口转发

WSL 内的端口，在宿主机上可以通过`localhost`直接访问到。但是如果外界需要访问则需要通过配置实现。

在管理员模式下的`PowerShell`中：

```powershell
netsh interface portproxy #系列
netsh interface portproxy show all #展示所有已有的代理
netsh interface portproxy add v4tov4 listenport=8001 connectaddress=192.168.16.160 connectport=8000 # 添加一个代理
```
