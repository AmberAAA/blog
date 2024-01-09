---
title: Core Review 最佳实践
tags: [前端, 架构, Sonar, Gitlab]
authors: Amber
---

## SonarQube的优点

1. 拥有丰富的指标集，全面掌握代码的可维护性，安全性，漏洞，复杂度等。
2. 可以集成各种代码分析器，如`Eslint`等。
3. 可以分析全量代码，与新增代码。
4. 内置强大、灵活的质量阈，可为`Code Review`提供参数依据。
5. 内置各种看板，可从各种维度分析代码。
6. 内嵌代码查看器。

<!--truncate-->

## SonarQube的名词解释/用法

### 指标

Sonar会从很多方面，去评估代码，我们重点关注以下几个指标

#### 可靠性

`Bug`的数量会影响到可靠性。Sonar一般会将代码语法问题，IF分支判断，函数调用等分析出`BUG`数量，可靠性越低，评分越低

#### 安全性

代码中，会被黑客攻击，或者其他问题，如在前端使用`Math.random()`生成随机数。

#### 可维护性

可维护性，受`代码异味`影响。`代码异味`往往受影响面非常广，如未使用的变量，`shadowing variable`，命名规范，不规范的注释等等。

#### 复杂度

复杂度由`圈负责度`和`认知复杂度构成`。圈负责度由代码中的条件分支决定。

#### 重复代码

`Sonar`会扫描出代码中重复的重复的代码行以及代码块。

### 新代码

`Sonar会从`两个周期维度分析代码。
1. 全部代码。
2. 新代码。


![image](https://public-abr.oss-cn-hangzhou.aliyuncs.com/image_ef8c3957.png)

建议将迭代开始时，设置为新代码起始点。这样，可以监控全量的代码，以及本次迭代维度的代码评价。

对应的，我们可以严格要求本次迭代的维度评价，放宽对历史版本的评价要求。这样，通过多次迭代，提高代码水平。

### 质量阀/质量门禁

通过对指标的操作要求，构成质量门禁。一旦任意条件不符合要求，则拒绝合并。同样，可以从两个周围维度分开配置。

### 问题类型

1. Bug
2. 安全
3. 异味

### 问题严重程度


## 基于SonarQube，前端对CodeReview的实践

1. 基于`git commit hocks`对代码进行初次拦截，只需要跑通过`eslint`且无`error`即可。
2. 严格控制`test`, `master`, `main` 合并权限，通过`MR`提交合并请求，并审核者指定为`review`负责人。
3. `MR`触发`sonar`流水线，质量阀未通过，则无法merge。
4. 负责人，根据前端开发规范，快速`Review`代码，选择通过/关闭/提交检视意见。
    * 通过：代码合入目标分支，结束本次merge
    * 关闭：结束本次merge
    * 提交检视意见，提交人员可以留言沟通/提交补丁/关闭`MR`等，直到处理完所有检视意见。
5. 若涉及多个代码检视人员，可通过👍/提交检视意见。最后由负责人合并代码。
6. 企业微信机器人通过`webhooks`通知审核者进行review。
6. **注意**处理检视意见不需要关闭合并请求，处理完，直接在源分支上提交代码即可。

### 在`gitlab`中如何合并代码

#### 创建合并请求
![image](https://public-abr.oss-cn-hangzhou.aliyuncs.com/image_a0388450.png)


![image-1](https://public-abr.oss-cn-hangzhou.aliyuncs.com/image-1_a98285d4.png)

1. 标题：建议以需求名称活问题单号开始，如：
    * 小程序扫码和平台扫码冲突处理、配送单名称修改
    * JARVIS-1633 数字孪生-进入数字孪生模块，页面加载缓慢，3D图片未渲染出来，直接进行半成品巡航，页面显示白屏。
2. 指派给审核人

### 审核人如何`Code Review`

1. 审核人必须掌握代码规范，按照规格`Review`代码合入目标分支
2. 你可以有问题的行号左侧，点击留言按钮，提交意见
3. 建议意见应当清晰，且应明确指出，问题所在。
4. 当解决玩所有问题/没有问题后，合并代码到目标分支。

![image-2](https://public-abr.oss-cn-hangzhou.aliyuncs.com/image-2_2433ebf3.png)

![image-3](https://public-abr.oss-cn-hangzhou.aliyuncs.com/image-3_4654d92c.png)
Sonarqube的检测报告，将会出现在这里。 

## Sonar集成Eslint

1. eslint输入报告
```sh
npx eslint -o report.json -f json ./src
```

2. Sonar导入报告

通过配置项`sonar.eslint.reportPaths`导入报告

```
sonar.eslint.reportPaths=./eslint.report.json
```
