---
title: Hello React
date: 2020-06-09 11:33:11
tags: React
toc: true
categories: 
- React
---

## React 是什么?

> A JavaScript library for building user interfaces(用于构建用户界面的 JavaScript 库)

- 我们知道对于前端来说, 主要的任务就是构建用户界面, 而构建用户界面离不开三个技术
  - HTML: 构建页面的结构
  - CSS: 构建页面的样式
  - JavaScript: 页面动态内容和交互
- 那么使用最原生的 HTML、CSS、JavaScript 可以构建完整的用户界面吗? 当然可以, 但是会存在很多问题
  - 操作 DOM 兼容性的问题
  - 过多兼容性代码的冗余问题
  - 代码组织和规范的问题

<!-- more -->

### 常见的 JavaScript 库

- 一直以来前端开发人员都在寻求可以让自己开发更方便的 JavaScript 库

  - 在过去很长一段时间内, **jQuery 是被使用最多的 JavaScript 库**
  - 在过去的一份调查中显示, 全球前 **10000** 个访问最高的网站中, 有 **65%** 使用了 jQuery, 它是**当时最受欢迎的 JavaScript 库**
  - 但是越来越多的公司开始慢慢不再使用 jQuery, 包括程序员使用最多的 **GitHub**

- 现在前端领域最为流行的是

  三大框架

  - Vue
  - React
  - Angular

[![tIPhuQ.png](https://s1.ax1x.com/2020/06/09/tIPhuQ.png)](https://s1.ax1x.com/2020/06/09/tIPhuQ.png)

- 而 Angular 在国内并不是特别受欢迎, 尤其是 Angular 目前的版本对 **TypeScript** 还有要求的情况下
- Vue 和 React 是国内最为流行的两个框架, 而他们都是帮助我们来构建用户界面的 **JavaScript 库**

## React 的起源

React 是 **2013 年**, **Facebook** 开源的 JavaScript 框架, 那么当时为什么 Facebook 要退出这样一款框架呢?

这个源于一个需求所产生的 BUG

[![tIii8K.png](https://s1.ax1x.com/2020/06/09/tIii8K.png)](https://s1.ax1x.com/2020/06/09/tIii8K.png)

- 该功能上线后总是出现 BUG
- 三个消息的数字在发生变化时, 过多的操作很容易产生 BUG

BUG 是否可以修复呢? 当然可以修复, 但是 Facebook 的工程师并不满足于此

- 他们开始思考为什么会产生这样的问题
- 在传统的开发模式中, 我们过多的去操作界面的细节(前端、IOS、Android)
  - 并且需要掌握和使用大量 DOM 的 API, 当然我们可以通过 jQuery 来简化和适配一些 API 的使用
- 另外关于数据(状态), 往往会分散到各个地方, 不方便管理和维护

他们就去思考, 是否有一种新的模式来解决上面的问题

1. 以组件的方式去划分一个个功能模块
2. 组件内以 `JSX` 来描述 UI 的样子, 以 `state` 来存储组件内的状态
3. 当应用的状态发生改变时, 通过 `setState` 来修改状态, 状态发生变化时, UI 会自动发生更新

## React 的特点

### 声明式编程

声明式编程是目前整个大前端开发的模式: Vue、React、Flutter、SwiftUI

它允许我们只需要维护自己的状态, 当状态发生改变时, React 可以根据最新的状态去渲染我们的 UI 界面

[![tIlgPS.png](https://s1.ax1x.com/2020/06/09/tIlgPS.png)](https://s1.ax1x.com/2020/06/09/tIlgPS.png)

### 组件化开发

组件化开发页面是目前前端的**流行趋势**, 我们会将重复的界面拆分成一个个小的组件

如何合理的进行组件的划分和设计也是学习 React 的一个重点

[![tINKne.png](https://s1.ax1x.com/2020/06/09/tINKne.png)](https://s1.ax1x.com/2020/06/09/tINKne.png)

### 多平台适配

- 2013年, React 发布之初主要是开发 Web 页面
- 2015年, Facebook 推出 ReactNative, 用于开发移动端跨平台(虽然目前 Flutter 非常火爆, 但还是有很多公司在使用 ReactNative)
- 2017年, Facebook 推出 ReactVR, 用于开发虚拟现实 Web 应用程序(随着 5G 的普及, VR 也会是一个非常火爆的应用场景)

[![tIrOAS.png](https://s1.ax1x.com/2020/06/10/tIrOAS.png)](https://s1.ax1x.com/2020/06/10/tIrOAS.png)

## 掌握最先进的思想和技术

React 由 Facebook 来更新和维护, 它是大量优秀程序员的思想结晶

- React 的流行不仅仅局限于普通开发工程师对它的认可, 大量流行的其他框架也借鉴了 React 的思想

Vue.js 框架的设计之初, 有很多的灵感来自 Angular 和 React

包括 Vue 3 的很多新特性, 也是借鉴和学习了 React

- 比如 React Hooks 是开创性的新功能
- Vue Function Based API 学习了 React Hooks 的思想

Flutter 的很多灵感都来自 React, 来自官网的一段话

[![tIsI5F.png](https://s1.ax1x.com/2020/06/10/tIsI5F.png)](https://s1.ax1x.com/2020/06/10/tIsI5F.png)

- 事实上 Flutter 中的 `Widget - Element - RenderObject`, 对应的就是`JSX - 虚拟DOM - 真实DOM`

所以 React 可以说是**前端的先驱者**, 它总是会引领整个前端的潮流

## React 现状

在 **HackerRank** 中, 2020年有一份调查, 你更想学习的 **framework(框架)**

[![tIyeIS.png](https://s1.ax1x.com/2020/06/10/tIyeIS.png)](https://s1.ax1x.com/2020/06/10/tIyeIS.png)

国内外很多**知名网站使用 React 开发**

[![tIyNiF.png](https://s1.ax1x.com/2020/06/10/tIyNiF.png)](https://s1.ax1x.com/2020/06/10/tIyNiF.png)

## 原生 Hello React 案例

为了演练 React, 我们可以提出一个小的需求

- 在界面显示一个文本`Hello World`
- 点击下方的按钮, 点击后文本改变为`Hello React`

[![tIyydK.png](https://s1.ax1x.com/2020/06/10/tIyydK.png)](https://s1.ax1x.com/2020/06/10/tIyydK.png)

在使用 React 之前, 我们希望你先使用**原生代码来实现**, 这样更方便对比 React 和原生

- 当然, 你也可以使用 jQuery 和 Vue 来实现, 对他们分别进行对比学习

```html
<body>
  <div id="app">
    <h2 class="title"></h2>
    <button class="change-btn">change</button>
  </div>
  
  <script>
    // 1. 获取 DOM 节点
    const titleEl = document.getElementsByClassName('title')[0]
    const btnEl = document.getElementsByClassName('change-btn')[0]

    // 2. 获取数据
    let message = 'Hello World'

    // 3. 将数据显示到 UI 中
    titleEl.innerText = message
    
    // 4. 修改文本内容
    btnEl.addEventlistener('click', e => {
      message = 'Hello React'
      titleEl.innerText = message
    })
  </script>
</body>
```

## React 开发依赖

开发 React 必须**依赖三个库**

- `react`: 包含 React 所必须的核心代码
- `react-dom`: React 渲染在不同平台所需要的核心代码
- `babel`: 将`JSX`转换成 React 代码的工具

第一次接触 React 容易被它繁琐的依赖搞蒙, 对于 Vue 来说, 我们只是依赖一个`vue.js`文件即可, 但是 React 居然要依赖三个库

- 其实, 这三个库是**各司其职**的, 目的就是让每一个库单纯的做自己的事情
- 在 React 的 **0.14** 版本之前是没有`react-dom`这个概念的, 所有功能都包含在`react`里
- 为什么要进行拆分呢? 原因就是`react-native`
- `react`包中包含了`react`和`react-native`所共同拥有的核心代码

`react-dom`针对 Web 和 Native 所完成的事情不同

- Web 端: `react-dom`会将`JSX`最终渲染成真实的 DOM 显示在浏览器中
- Native 端: `react-dom`会将`JSX`最终渲染成原生的控件(比如 Android 中的`Button`, IOS 中的`UIButton`)

## 认识 Babel

Babel 是什么?

- Babel, 又名 **Babel.js**
- 它是目前前端使用非常广泛的编辑器、转移器
- 比如当下很多浏览器并不支持 ES6 的语法, 但是确实 ES6 的语法非常的简洁和方便, 我们**开发时**非常希望使用它
- 那么编写源码时, 我们就可以使用 ES6 来编写, 之后通过 Babel 工具, 将 ES6 转成**大部分浏览器都支持的 ES5 语法**

React 和 Babel 的关系

- 默认情况下开发 React 其实可以不使用 Babel
- 但是前提是我们自己使用`React.createElement`来编写源代码, 它编写的代码非常繁琐和可读性差
- 那么我们就可以直接编写`JSX(JavaScript XML)`的语法, 并且让 Babel 帮助我们转换成`React.createElement`

## 引入 React 依赖

如何添加三个依赖?

- 方式一: 直接 CDN 引入
- 方式二: 下载源文件, 添加本地依赖
- 方式三: 通过`npm`管理(后续脚手架再使用)

暂时我们直接通过 CDN 引入, 来演练下面的示例程序

- 这里有一个`crossorigin`的属性, 这个属性的目的是为了拿到跨域脚本的错误信息

```html
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

## Hello World

第一步: 在界面上通过 React 显示一个`Hello World`

- 注意: 这里我们编写 React 的`script`代码中, 必须添加行间属性`type="text/babel"`, 作用是可以让 Babel 解析`JSX`语法

```react
<body>
  <div id="app"></div>
  
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <script type="text/babel">
    // 1. 将数据定义到变量中
    let message = 'Hello World'

    // 2. 通过 ReactDOM 对象渲染内容
    ReactDOM.render(<h2>{message}</h2>, document.getElementById('app'))
  </script>
</body>
```

`ReactDOM.render`函数

- 参数一: 传递要渲染的内容, 这个内容可以是 `HTML` 元素, 也可以是 React 的组件

  - 这里我们传入了一个`h2`元素, 后面我们就会使用 React 组件
  
- 参数二: 将渲染的内容挂载到某一个 `HTML` 元素上

  - 这里我们挂载到已经定义好的 id 为`app`的`div`上

我们可以通过`{}`语法来引入外部的变量或`JavaScript`表达式

### 错误的方式

```react
<body>
  <div id="app">
    <button class="change-btn">change</button>
  </div>
  
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <script type="text/babel">
    // 1. 将数据定义到变量中
    let message = 'Hello World'

    // 2. 通过 ReactDOM 对象渲染内容
    ReactDOM.render(<h2>{message}</h2>, document.getElementById('app'))

    // 3. 监听按钮点击
    const btnEl = document.getElementsByClassName('change-btn')[0]
    btnEl.addEventListener('click', e => console.log(e))
  </script>
</body>
```

上面的代码会报错

- 原因是默认情况下`ReactDOM.render`会**覆盖**挂载对象元素中的所有内容
- 所以在执行完`ReactDOM.render`之后, 就不存在`button`元素了

### 正确的方式

```react
<body>
  <div id="app"></div>
  
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <script type="text/babel">
    // 1. 将数据定义到变量中
    let message = 'Hello World'

    // 2. 调用封装的 render 函数
    render()

    // 3. 修改文本, 并重新调用 render 函数更新界面
    function btnClick() {
      message = 'hello React'
      render()
    }

    function render() {
      ReactDOM.render((
        <div>
          <h2>{message}</h2>
          <button onClick={btnClick}>change</button>
        </div>
      ), document.getElementById('app'))
    }
  </script>
</body>
```

上面的方法虽然可以实现, 但是整个代码的流程过于**繁琐**

> **注意**
>
> - 使用`JSX`语法渲染时必须有且仅有一个根元素(类似于 Vue 的`template`)
> - 当数据发生改变时, 需要重新调用`ReactDOM.render`才会使界面发生更新

### 组件的方式

实现的整个逻辑其实可以看作一个整体, 那么我们就可以将其封装成一个组件

- `ReactDOM.render`函数的第一个参数是一个`HTML`元素或是一个**组件**
- 所以我们可以先将之前的业务逻辑封装到一个组件中, 然后传入到`ReactDOM.render`函数中的第一个参数

在 React 中, 如何封装一个组件呢?

- 这里我们暂时使用类(`class`)的方式封装组件
  - `render`当中返回的`JSX`内容, 就是之后 React 会帮助我们渲染的内容
  - 定义一个类, 继承自`React.Component`
  - 实现当前组件的`render`函数

```react
class App extends React.Component {
  render() {
    return (<h2>Hello World</h2>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
```

如果我们的`Hello World`是依赖变量的, 并且会根据按钮的点击而改变呢? 这里涉及到几个核心点

1. 数据在哪里定义

   - 在组件中的数据, 我们可以分成两类

     - 参与界面更新的数据: 当数据改变时, 需要更新组件渲染的内容
     - 不参与界面更新的数据: 当数据改变时, 不需要更新组件渲染的内容

   - 参与界面更新的数据我们也可以称之为参与数据流, 这个数据的定义在当前对象的 `state` 中

     - 我们可以通过在**构造函数**中`this.state = {}`定义数据
  - 当我们的数据发生变化时, 我们可以调用`this.setState`来更新数据, 并且通知 React 进行`update`操作
     - 在进行`update`操作时, 就会重新调用`render`函数, 并且使用最新的数据来渲染页面

2. 事件绑定中的 `this`

   - 在类中直接定义一个函数, 并且将这个函数绑定到`HTML`元素的`onClick`事件上, 当前这个函数的`this`指向的是谁呢?
   
   - 默认情况下是 `undefined`

     - 很奇怪, 居然是`undefined`
  - 因为在正常的 DOM 操作中, 监听点击, 监听函数中的`this`其实是节点对象(比如这里是`button`对象)
     - 这是因为 React 并不是直接渲染成真实的 DOM, 我们所编写的`button`只是一个**语法糖**, 它的本质是 React 的 `Element` 对象
- 那么在这里发生监听的时候, React 给我们函数绑定的`this`, 默认情况下就是一个`undefined`(`this.changeText.apply(undefined)`)

我们在绑定的函数中, 可能想要使用当前对象, 比如执行`this.setState`函数, 就必须拿到当前对象的`this`

- 我们就需要在传入函数时, 给这个函数直接绑定`this`
- 类似于这种的写法: `<button onClick={this.changeText.bind(this)}>change</button>`

```react
<body>
  <div id="app"></div>
  
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <script type="text/babel">
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          message: 'Hello World'
        }
      }

      render() {
        return (
          <div>
            <h2>{this.state.message}</h2>
            <button onClick={this.changeText.bind(this)}>change</button>
          </div>
        )
      }

      changeText() {
        this.setState({ message: 'Hello React' })
      }
    }

    ReactDOM.render(<App/>, document.getElementById('app'))
  </script>
</body>
```

## 案例练习

### 列表展示

真实开发中, 我们的数据通常会从服务器获取, 比较常见的是获取一个列表数据, 保存到一个数组中进行展示

比如现在有一个歌曲列表, 我们如何通过 React 进行展示呢?

```react
class App extends React.Component {
  constructor() {
    super()
      this.state = {
        title: 'music',
        musics: ['不浪漫罪名', '浪子回头', '风的季节', '让一切随风']
      }

  render() {
    const { title, musics } = this.state

    return (
      <div>
        <h2>{title}</h2>
        <ul>
          {musics.map(item => (<li key={item}>{item}</li>))}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
```

同 Vue 的`v-for`一样, 这里循环也需要绑定一个 `key` 值 `state` 中的属性可以通过 ES6 的**解构赋值**到 `render` 函数中, 这样可以省略 `this.state`

### 计数器

```react
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0
    }
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>当前计数: {counter}</h2>
        <button onClick={this.increment.bind(this)}>+</button>
        <button onClick={this.decrement.bind(this)}>-</button>
      </div>
    )
  }

  increment() {
    this.setState({ counter: this.state.counter + 1 })
  }

  decrement() {
    this.setState({ counter: this.state.counter - 1 })
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
```
