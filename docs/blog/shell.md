---
title: Shell编程与常见命令
toc: 'menu'
group:
  title: 工具
---


# 变量

1. 定一个变量不需要$符号
2. 取变量的值需要在变量前加$符号
3. 除了显示的赋值，还可以直接使用子语句的结果

```bash
name=Amber
echo "Hello $name"
trueName=$(whoami)

if [ $name = $trueName ]
then
	echo "Oh~~~~"
fi

for i in $(ls ~)
do
    echo $i
done
```

# 环境变量

1. 在macOS，使用export修改或新增环境变量，使用unset删除环境变量
2. 若脚本修改了环境变量并希望起生效，则使用source命令，**source updateEnv.sh**

# 函数

1. shell脚本中可以使用函数，但函数必须在执行前声明且定义；
2. shell中调用函数不需要加括号
3. 函数通过$1,$2….接收参数

```bash
#!/bin/zsh

sayHi () {
    echo "Hello, World! $1 $2"
}

for i in $(ls ~)
do
    sayHi $i
done

sayHi Amber
```

# for循环

for循环的结构体一般如下

```bash
#!/bin/zsh

for i in $(command)
do
	# do something with $i
done

```

# 流程控制

1. 流程控制需要关系运算符
2. 流程内[[与[代表含义不同，优先使用[[

[](https://www.runoob.com/linux/linux-shell-basic-operators.html)

```bash
name1=Amber
name2=Tim
if [[ $1 = $name1 ]]   # 注意这里的中括号内有空格
then
	echo "Hi $1, i konw u are Amber, Go Back."
elif [[ $1 = $name2 ]]
then                # 注意这个then
    echo "Time"
else
	echo "Wa wu hi $1"
fi
```

# 标准输入输出

```bash
 
while read line
do
	echo $line
done
```

# 重定向

[Shell 输入/输出重定向](https://www.runoob.com/linux/linux-shell-io-redirections.html)

```bash
test < a.txt  #输入重定向
text > log    #输出重定向
text >> log   #输出重定向 以追加的形式
text < fill 1> log 2> error  # 0输入1输出2输出
text > log 2>&1 #将错误日志重定向到标注输出
```

# 管道、awk、xargs

1. 获取所有进程信息
2. 过滤关键词
3. 打印第2列
4. 管道将上一个的标准输入转换为下一个的标准输出
5. xargs则是将标准输入转换为参数

```bash
ps -ef | grep "/Users/anborong/code/" | awk '{print $2}'| xargs kill -9
```
