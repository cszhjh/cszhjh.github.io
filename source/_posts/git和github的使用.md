---
title: git 和 github 的使用
date: 2020-04-08 11:48:41
toc: true
tags: Git
categories:
- Git
---

## github

### 仓库(Repository)

仓库用来存放项目代码, 每个项目对应一个仓库, 多个开源项目则有多个仓库

### 收藏(Star)

收藏项目, 方便下次查看, 同点赞 + 收藏

<!-- more -->

### 复制克隆项目(Fork)

[![teJPpt.jpg](https://s1.ax1x.com/2020/05/28/teJPpt.jpg)](https://s1.ax1x.com/2020/05/28/teJPpt.jpg)

**注意: 该 Fork 的项目是独立存在的**

### 发起请求(Pull Request)

[![teJ9fI.jpg](https://s1.ax1x.com/2020/05/28/teJ9fI.jpg)](https://s1.ax1x.com/2020/05/28/teJ9fI.jpg)

### 关注(Watch)

关注项目, 当项目更新可以接收到通知

### 事务卡片(Issue)

发现代码 Bug, 但是目前没有成型代码, 需要讨论时用, 即提出建议和意见的反馈区

### 仓库主页说明

[![teJptA.png](https://s1.ax1x.com/2020/05/28/teJptA.png)](https://s1.ax1x.com/2020/05/28/teJptA.png)

## git

### git 工作区

[![teJSkd.jpg](https://s1.ax1x.com/2020/05/28/teJSkd.jpg)](https://s1.ax1x.com/2020/05/28/teJSkd.jpg)

### 命令

#### 初始化

**设置用户名**

```shell
git config --global user.name 'cszhjh'
```

**设置用户名邮箱**

```shell
git config --global user.email 'cszhjh@gmail.com'
```

**初始化工作区**

```shell
git init
```

#### 过滤文件

**.gitignore 文件**
git 忽略文件, 忽略配置项, 哪些文件不需要提交到 git 上就可以在这里进行忽略

**vim .gitignore**
新增以及编写这个文件

此外, git 对于 .gitignore 配置文件是按行从上到下进行规则匹配的, 意味着如果前面的规则匹配的范围更大, 则后面的规则将不会生效

```
node_modules/  ---> 过滤整个文件夹
*.zip		---> 过滤zip后缀文件
demo.html   过滤该文件

!src/   不过滤该文件夹
!*.js   不过滤java源文件
!index.html 不过滤该文件
```

#### 文件操作

**创建文件**

```
touch file.txt
```



**添加文件到暂存区**

```
git add file.txt
```



**将所有需要添加的文件添加到暂存区**

```
git add .
```



**将文件从暂存区提交到仓库**

```
git commit -m '添加描述'
```



**将所有修改的文件直接放到仓库中**

```
git commit --all -m '描述'
```



#### 查看日志

**查看当前文件状态**

```
git status
```



**查看日志**

```
git log
```



**查看简洁版的日志**

```
git log --oneline
```



#### 回退版本

**回退到指定的版本**

```
git reset --hard Head~0   ## 0代表上次, 1代表上上次
```



**通过版本号回退**

```
通过版本号回退：git reset --hard [版本号]
```



**查看切换版本的记录**

```
git reflog
```



#### 分支

**创建分支**

```
git branch name
```



**查看分支**

```
git branch
```



**切换分支**

```
git checkout name
```



**合并分支**

```
git merge name
```



**删除分支**

```
git branch -d name
```



#### 连接 github

**上传当前分支代码**

```
git push [github项目地址] master
```

当我们在 push / pull 时, 加上 **-u** 参数, 那么在下一次 push / pull 时, 我们只需要写 `git push / pull` 就能上传 / 下载代码(加上 **-u** 之后, git会把当前分支与远程的指定分支进行关联)

`git push -f` 表示将目前自己本机的代码库推送到远端, 并覆盖

**生成变量**

```
git remote add name [github项目地址]
```



相当于 name = github 仓库 HTTPS 地址, 只在本地当前文件夹生效, 其他地方不可用

**下载到本地**

```
git pull [github项目地址] master   ## 本地要初始一个仓库, 多次执行会合并处理
```



**克隆到本地**

```
git clone [github项目地址] --depth=1   ## 多次执行会覆盖本地内容
```



下载中可以加上 `--depth=1` 表示只下载最后一次的 commit, 其他历史记录不要, 这样可以提高下载速度

如果服务器版本和本地版本不同时, 先 pull, 在本地解决冲突后再 push 到服务器中

#### ssh 连接

创建 ssh 钥匙

```
ssh-keygen -t rsa -C "[邮箱地址]"
```

路径: **C:\Users\Administrator.ssh**

`id_rsa`: 私钥
`id_rsa.pub`: 公钥

**点击 github 头像 –> settings –> SSH and GPG keys –> New SSH key –> 将复制的公钥里的内容粘贴到 Key 中 –> 生成**

上传当前分支代码

```
git push [github仓库SSH地址] master  ## 不用输入账号密码
```
