---
title: React脚手架
date: 2020-06-17 20:11:32
toc: true
tags: React-CLI
categories: 
- React
---

## 认识脚手架

如果我们只是开发几个小的 Demo 程序, 那么永远不需要考虑一些复杂的问题, 比如

- 目录结构如何组织划分
- 如何管理文件之间的相互依赖
- 如何管理第三方模块的依赖
- 项目发布前如何压缩、打包项目

现代的前端项目已经越来越复杂了

- 不会再是在 HTML 中引入几个 CSS 文件, 引入几个编写的 JS 文件或者第三方 JS 文件这么简单
- 比如 CSS 可能是使用 Less、Sass 等预处理器进行编写, 我们需要将它们转成普通的 CSS 才能被浏览器解析
- 比如 JavaScript 代码不再只是编写在几个文件中, 而是通过模块化的方式, 被组织在**成百上千**个文件中, 我们需要通过模块化的技术来管理他们之间的相互依赖
- 比如项目需要依赖多个第三方库, 如何更好的管理它们(比如管理它们的依赖、版本升级等)

为了解决上面这些问题, 我们需要再去学习一些工具

- 比如 Babel、Webpack、Gulp, 配置它们转换规则、打包依赖、热更新等等一些内容
- 你会发现, 你还没有开始做项目就面临一系列的工程化问题

**脚手架的出现, 就是帮助我们解决这一系列的问题**

<!-- more -->

### 脚手架是什么?

传统的脚手架指的是建筑学的一种结构: 在搭建楼房、建筑物时, 临时搭建出来的一个框架

[![NEjxhj.jpg](https://s1.ax1x.com/2020/06/17/NEjxhj.jpg)](https://s1.ax1x.com/2020/06/17/NEjxhj.jpg)

编程中提到的脚手架(`Scaffold`), 其实是一种工具, 可以帮助我们快速生成项目有的工程化结构

- 每个项目作出的效果不同, 但是它们的基本工程化结构是相似的
- 既然相似, 就没有必要每次都从零开始搭建, 完全可以使用一些工具, 帮助我们生产基本的工程化模版
- 不同的项目, 在这个模板的基础之上进行项目开发或者进行一些配置的简单修改即可
- 这样也可以间接保证项目的基本结构的一致性, 方便后期的维护

**总结: 脚手架让项目从搭建到开发, 再到部署, 整个流程变得快速和便捷**

对于现在比较流行的三大框架都有属于自己的脚手架

- Vue 的脚手架: `vue-cli`
- Angular 的脚手架: `angular-cli`
- React 的脚手架: `create-react-app`

它们的作用都是帮助我们生成一个通用的目录结构, 并且已经将我们所需的工程环境配置好

使用这些脚手架需要依赖什么呢?

- 目前这些脚手架都是使用 Node.JS 编写的, 并且都是基于 Webpack
- 所以我们必须在自己的计算机上**安装 Node 环境**

## 安装相关的依赖

### 安装 Node

React 脚手架本身需要依赖 Node, 所以我们需要安装 Node 环境

- 无论是 Windows 还是 Mac OS, 都可以通过 [Node 官网直接下载](http://nodejs.cn/download/)
- 注意: 这里推荐下载 LTS (*Long-term support*)版本, 它是长期支持版本, 会比较稳定

[![NVSg8H.png](https://s1.ax1x.com/2020/06/17/NVSg8H.png)](https://s1.ax1x.com/2020/06/17/NVSg8H.png)

下载后, 双击安装即可

1. 安装的过程中, 会自动配置环境变量
2. 安装时, 会同时帮助我们安装 NPM 管理工具

[![NVpAMR.png](https://s1.ax1x.com/2020/06/17/NVpAMR.png)](https://s1.ax1x.com/2020/06/17/NVpAMR.png)

你的版本可能跟我不一致, 这是很正常的, 如果你输入`node -v`或`npm -v`之后没有显示版本信息, 那么你可能需要重新安装

### 包管理工具

**什么是 NPM?**

全称 **Node Package Manager**, 即 “Node 包管理器”

作用是帮助我们管理一些依赖的工具包(比如 React、React-DOM、Axios、Babel、Webpack 等等)

作者开发的目的就是为了解决**模块管理很糟糕**的问题

**另外, 还有一个大名鼎鼎的 Node 包管理工具 Yarn**

Yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出的一个新的 JS 包管理工具

Yarn 是为了弥补 NPM 的一些缺陷而出现的

早起的 NPM 存在很多的缺陷, 比如安装依赖速度很慢、版本依赖混乱等等一系列问题

虽然从 NPM5 版本开始, 进行了很多的升级和改进, 但是依然由很多人喜欢使用 Yarn

React 脚手架默认也是使用 Yarn

**安装 Yarn**

```shell
npm install -g yarn
```

[![NVCwKs.png](https://s1.ax1x.com/2020/06/17/NVCwKs.png)](https://s1.ax1x.com/2020/06/17/NVCwKs.png)

**Yarn 和 NPM 的命令对比**

| NPM                                     | Yarn                          |
| :-------------------------------------- | :---------------------------- |
| npm install                             | yarn install                  |
| npm install [package]                   | yarn add [package]            |
| npm install --save [package]            | yarn add [package]            |
| npm install --save-dev [package]        | yarn add [package] [--dev/-D] |
| npm rebuild                             | yarn install --force          |
| npm uninstall [package]                 | yarn remove [package]         |
| npm uninstall --save [package]          | yarn remove [package]         |
| npm uninstall --save-dev [package]      | yarn remove [package]         |
| npm uninstall --save-optional [package] | yarn remove [package]         |
| npm cache clean                         | yarn cache clean              |
| rm -rf node_modules && npm install      | yarn upgrade                  |

**CNPM 的使用**

在国内, 某些情况使用 `NPM` 和 `Yarn` 可能无法正常安装一个库, 这个时候我们可以选择使用 `CNPM`

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 安装 create-react-app

最后一个需要安装的是创建 React 项目的脚手架

```shell
npm install -g create-react-app
```

## 使用 create-react-app

### 创建 React 项目

现在, 我们就可以通过脚手架来创建 React 项目了

创建 React 项目的命令如下

- 注意: 项目名称不能包含大写字母

```shell
create-react-app 项目名称
```

另外还有更多创建项目的方式, 可以参考[官方 GitHub 文档](https://github.com/facebook/create-react-app)

- 上面的创建方式, 默认使用的是 Yarn 来管理整个项目包相关的依赖
- 如果希望使用 NPM, 也可以在参数后面加上`--use-npm`

[![NVAG9K.png](https://s1.ax1x.com/2020/06/17/NVAG9K.png)](https://s1.ax1x.com/2020/06/17/NVAG9K.png)

创建完成后, 进入对应的目录, 就可以将项目跑起来

```shell
cd demo
yarn start
```

[![NVE1bj.png](https://s1.ax1x.com/2020/06/17/NVE1bj.png)](https://s1.ax1x.com/2020/06/17/NVE1bj.png)

### 目录结构分析

[![NVVsOg.png](https://s1.ax1x.com/2020/06/17/NVVsOg.png)](https://s1.ax1x.com/2020/06/17/NVVsOg.png)

**目录结构分析**

```
test-react
├─ README.md // readme 说明文档
├─ package.json // 对整个应用程序的描述: 包括应用名称、版本号、一些依赖包、以及项目的启动、打包等等（Node 管理项目必备文件）
├─ public
│    ├─ favicon.ico // 应用程序顶部的 icon 图标
│    ├─ index.html // 应用的 index.html 入口文件
│    ├─ logo192.png // 被在 manifest.json 中使用
│    ├─ logo512.png // 被在 manifest.json 中使用
│    ├─ manifest.json // 和 Web app 配置相关
│    └─ robots.txt // 指定搜索引擎可以或者无法爬取哪些文件
├─ src
│    ├─ App.css // App 组件相关的样式
│    ├─ App.js // App 组件的代码文件
│    ├─ App.test.js // App 组件的测试代码文件
│    ├─ index.css // 全局的样式文件
│    ├─ index.js // 整个应用程序的入口文件
│    ├─ logo.svg // 刚才启动项目, 所看到的 React 图标
│    ├─ serviceWorker.js // 默认帮助我们写好的注册 PWA 相关的代码
│    └─ setupTests.js // 测试初始化文件
└─ yarn.lock
```

整个目录都非常好理解, 只是有一个 PWA 相关的概念

- PWA 全称 Progressive Web App, 即渐进式 Web 应用
- 一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用, 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能
- 这种 Web 存在的形式, 我们也称之为 Web App

PWA 解决了哪些问题?

- 可以添加至主屏幕, 点击主屏幕图标可以实现启动动画以及隐藏地址栏
- 实现离线缓存功能, 即使用户手机没有网络, 依然可以使用一些离线功能
- 实现消息推送等等一系列类似于 Native App 相关的功能

### Webpack 配置

我们说过 React 的脚手架是基于 Webpack 来配置的

- Webpack 是一个现代 JavaScript 应用程序的**静态模块打包工具(module bundler)**
- 当 Webpack 处理应用程序时, 它会递归地构建一个**依赖关系图(dependency graph)**, 其中包含应用程序需要的每个模块, 然后将所有模块打包成一个或多个 bundle

[![NVmWtA.jpg](https://s1.ax1x.com/2020/06/17/NVmWtA.jpg)](https://s1.ax1x.com/2020/06/17/NVmWtA.jpg)

但是很奇怪, 我们并没有在目录结构中看到任何 Webpack 相关的内容

- 原因是 create-react-app 将 Webpack 相关的配置隐藏起来了(其实从 Vue-CLI3 开始, 也进行了隐藏)

如果我们希望看到 Webpack 的配置信息, 应该怎么来做呢?

- 我们可以执行一个`package.json`文件中的一个脚本`"eject": "react-scripts eject"`
- 这个操作是不可逆的, 所以在执行过程中会给予我们提示

[![NV3uRJ.png](https://s1.ax1x.com/2020/06/17/NV3uRJ.png)](https://s1.ax1x.com/2020/06/17/NV3uRJ.png)

[![NV3OSJ.png](https://s1.ax1x.com/2020/06/17/NV3OSJ.png)](https://s1.ax1x.com/2020/06/17/NV3OSJ.png)

## 从零编写项目

### 文件的删减

通过脚手架创建完项目, 我们可以将一些不需要的文件删掉

1. 将 src 下的所有文件删除
2. 将 public 下**除了**`favicon.ico`和`index.html`之外的文件删除

[![NV8x3Q.png](https://s1.ax1x.com/2020/06/17/NV8x3Q.png)](https://s1.ax1x.com/2020/06/17/NV8x3Q.png)

修改`index.html`文件

- 我们需要删除选中的内容
- 这两行内容是我们之前引入的一个图标和`manifest`文件

[![NVGBUf.png](https://s1.ax1x.com/2020/06/17/NVGBUf.png)](https://s1.ax1x.com/2020/06/17/NVGBUf.png)

### 开始编写代码

在 src 目录下, 创建一个`index.js`文件, 因为这是 Webpack 打包的入口

在`index.js`中开始编写 React 代码

- 在模块化开发中, 我们需要手动的导入`react`、`react-dom`, 因为它们都是在我们安装的模块中

```react
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<h2>Hello React</h2>, document.getElementById('root'))
```

[![NVYKk6.png](https://s1.ax1x.com/2020/06/17/NVYKk6.png)](https://s1.ax1x.com/2020/06/17/NVYKk6.png)

如果我们不希望直接在`ReactDOM.render`中编写过多的代码, 就可以单独抽取一个组件`App.js`

```react
// App.js
import React, { Component } from 'react'

export default class App extends React.Component {
  render() {
    return <h2>Hello React</h2>
  }
}
```

在`index.js`中引入 App 组件, 并且使用它

```react
// index.js
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

![NVYKk6.png](https://s1.ax1x.com/2020/06/17/NVYKk6.png)

