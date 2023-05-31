# 权限控制

:::info
参考资料:

1.  [arch-wiki: 文件权限](https://wiki.archlinuxcn.org/wiki/%E6%96%87%E4%BB%B6%E6%9D%83%E9%99%90%E4%B8%8E%E5%B1%9E%E6%80%A7)
2.  [arch-wiki: 用户管理](https://wiki.archlinuxcn.org/wiki/%E7%94%A8%E6%88%B7%E5%92%8C%E7%94%A8%E6%88%B7%E7%BB%84)

:::

## 文件权限

```
# ls /boot -l
权限	*	用户	用户组
drwxr-xr-x 3 root root     4096 Jan  1  1970 efi
drwxr-xr-x 6 root root     4096 May 30 12:56 grub
-rw------- 1 root root 67309190 May 30 04:51 initramfs-linux-lts-fallback.img
-rw------- 1 root root  9544098 May 30 12:50 initramfs-linux-lts.img
-rw-r--r-- 1 root root 11215360 May 30 12:50 vmlinuz-linux-lts
```

如文件夹`efit`的权限信息为`drwxr-xr-x`，表示：`root`用户拥有：`r`,`w`,`x`（读，写，执行）权限。`root`组拥有`r`,`x`权限，其他用户拥有`r`，`x`权限。

### 修改文件的权限

文件的权限可以通过`chown`,`chmod`进行修改。

```sh
chmod u=document #用户的权限
chmod g=document #用户组，其他人的权限
chmod o=document #他人的权限
chmod a=document #所有人权限

chmod o-x # 其他人取消执行权限
chmod g+r # group 添加读权限
```

### 修改所有者

```sh
chown username filepath
```

## 用户管理

```sh
useradd -m -G "附加组" -s "指定shell" “用户名” #多个附加组用.隔开
```

### 禁止用户登录

有时候需要禁止某些用户执行登录动作，例如用来执行系统服务的用户。将 shell 设置成 `/usr/bin/nologin` 就可以禁止用户登录。

如：创建系统用户

```sh
useradd -r -s /usr/bin/nologin username
```

### 更改登录 SHELL

```sh
usermod -s /usr/bin/zsh
```

### 删除用户

```sh
userdel -r username
```

## 用户组管理

### 查询所有用户组

```
cat /etc/group
```

### 查询用户所在用户组

```
groups username
```

### 将用户添加到某个用户组

```sh
usermod -aG group-name username # 不加 -a 则是覆盖模式
gpasswd -a username group-name
```

:::info
docker 免 sudo 执行，只需要将当前用户添加到 docker 用户组`gpasswd -a ${USER} docker`，之后重新登录 shell 即可，如果不生效，则重启 docker 服务；
:::

### 将用户移除某个用户组

```sh
gpasswd -d username group-name
```
