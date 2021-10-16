---
title: React组件化开发
date: 2020-06-18 09:21:51
tags: React-Components
toc: true
categories: 
- React
---

## 认识组件化开发

### 什么是组件化?

人面对复杂问题的处理方式:

- 任何一个人处理信息的逻辑能力都是有限的
- 所以, 当面对一个非常复杂的问题时, 我们不太可能一次性搞定一大堆内容
- 但是, 我们人有一种天生的能力, 就是将问题进行拆解
- 如果将一个复杂的问题, 拆分成很多个可以处理的小问题, 再将其放在整体当中, 你会发现大的问题也会迎刃而解

<!-- more -->

[![NmBDVU.png](https://s1.ax1x.com/2020/06/18/NmBDVU.png)](https://s1.ax1x.com/2020/06/18/NmBDVU.png)

组件化也是类似的思想

- 如果我们将一个页面中所有的处理逻辑全部放在一起, 处理起来就会变得非常复杂, 而且不利于后续的管理以及扩展
- 但如果我们将一个页面拆分成一个个小的功能块, 每个功能块完成属于自己这部分独立的功能, 那么之后整个页面的管理和维护就会变得非常容易了

[![NmDui4.png](https://s1.ax1x.com/2020/06/18/NmDui4.png)](https://s1.ax1x.com/2020/06/18/NmDui4.png)

我们需要通过组件化的思想来思考整个应用程序

- 我们将一个完整的页面分成很多个组件
- 每个组件都用于实现页面的一个功能块
- 而每一个组件又可以进行细分
- 组件本身又可以在多个地方进行复用

### React 组件化

组件化是 React 的核心思想, 前面我们封装的`App`本身就是一个组件

- 组件化提供了一种抽象, 让我们可以开发出一个个独立可复用的小组件来构造我们的应用
- 任何的应用都会被抽象成一颗组件树

[![Nm4tTs.png](https://s1.ax1x.com/2020/06/18/Nm4tTs.png)](https://s1.ax1x.com/2020/06/18/Nm4tTs.png)

组件化思想的应用

- 有了组件化的思想, 我们在之后的开发中就要充分的利用它
- 尽可能的将页面拆分成一个个小的、可复用的组件
- 这样让我们的代码更加方便组织和管理, 并且扩展性也更强

React 的组件相对于 Vue 更加的灵活和多样, 按照不同的方式可以分成很多类组件

- 根据组件的定义方式, 可以分为: **函数组件(Function Component)**和**类组件(Class Component)**
- 根据组件内部是否有状态需要维护, 可以分成: **无状态组件(Stateless Component)**和**有状态组件(Stateful Component)**

这些概念有很多重叠, 但是它们最主要是关注数据逻辑和 UI 展示的分离

- 函数组件、无状态组件、展示型组件主要关注 UI 的展示
- 类组件、有状态组件、容器型组件主要关注数据逻辑

当然还有很多组件的其他概念: 比如异步组件、高阶组件等等

## 创建 React 组件

### 创建类组件

类组件的定义有如下要求

- 组件的名称必须是**大写字符开头**(无论是类组件还是函数组件)
- 类组件需要继承自`React.Component`
- 类组件必须实现`render`函数

在 ES6 之前, 可以通过`create-react-class`模块来定义类组件, 但是目前官网建议我们使用 ES6 的`class`类定义

使用`class`定义一个组件

- `constructor`是可选的, 我们通常在`constructor`中初始化一些数据
- `this.state`中维护的就是我们组件内部的数据
- `render()` 方法是`class`组件中唯一必须要实现的方法

```react
import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return <h2>Hello React</h2>
  }
}
```

当`render`被调用时, 它会检查`this.props`和`this.state`的变化并返回以下类型之一

- React 元素

  - 通常通过 JSX 创建
  - 例如, `<div />`会被 React 渲染为 DOM 节点, `<MyComponent />`会被 React 渲染为自定义组件
  - 无论是`<div />`还是`<MyComponent />`均为 React 元素

- 数组或 fragments

  - 使得`render`方法可以返回多个元素

- Portals

  - 可以渲染子节点到不同的 DOM 子树中

- 字符串或数值类型

  - 它们在 DOM 中会被渲染为**文本节点**

- 布尔类型或 `null`

  - 什么都不渲染

### 创建函数组件

函数组件时使用`function`来进行定义的函数, 只是这个函数会返回和类组件中`render`函数返回一样的内容

函数组件有自己的特点

- 没有生命周期, 也会被更新并挂载, 但是没有生命周期函数
- 没有`this`(组件实例)
- 没有`state`(内部状态)

```react
export default function App() {
  return <div>Hello React</div>
}
```

## 组件的生命周期

### 认识生命周期

很多的事物都有从创建到销毁的整个过程, 这个过程称之为**生命周期**

React 组件也有自己的生命周期, 了解组件的生命周期可以让我们在最合适的地方完成自己想要的功能

生命周期和生命周期函数的关系:

- 生命周期时一个抽象的概念, 在生命周期的整个过程, 分成了很多个阶段, 比如
  - 装载阶段(`Mount`), 组件第一次在 DOM 树中被渲染的过程
  - 更行过程(`Update`), 组件状态发生变化, 重新更新渲染的过程
  - 卸载过程(`Unmount`), 组件从 DOM 树中被移除的过程
- React 内部为了告诉我们当前处于哪些阶段, 会对我们组件内部实现的某些函数进行回调, 这些函数就是生命周期函数, 比如
  - `componentDidMount`函数: 组件已经挂载到 DOM 上时发生回调
  - `componentDidUpdate`函数: 组件已经发生了更新时发生回调
  - `componentWillUnmount`函数: 组件即将被移除时发生回调
  - 我们可以在这些回调函数中编写自己的逻辑代码, 来完成自己的需求功能

我们谈 React 生命周期时, 主要谈的是类的生命周期, 因为函数式组件式没有生命周期函数的, 将来我们可以通过 **hooks** 来模拟一些生命周期的回调

### 生命周期解析

[![NntFCq.png](https://s1.ax1x.com/2020/06/18/NntFCq.png)](https://s1.ax1x.com/2020/06/18/NntFCq.png)

上图第一个区域解析:

- 当我们挂载一个组件时, 会先执行`constructor`构造方法来创建组件
- 紧接着调用`render`函数, 获取要渲染的 DOM 结构(`JSX`), 并且开始渲染 DOM
- 当组件挂载成功(DOM 渲染完成), 会执行`componentDidMount`生命周期函数

上图第二个区域解析:

- 当我们通过修改`props`, 或者调用`setState`修改内部状态, 或者直接调用`forceUpdate`时会重新调用`render`函数, 进行更新操作
- 当更新完成时, 会调用`componentDidUpdate`生命周期函数

上图第三个区域解析:

- 当我们的组件不再使用, 会从 DOM 中移除掉(卸载)
- 这个时候会回调`componentWillUnmount`生命周期函数

### 生命周期函数

`constructor`

```react
constructor(props)
```

如果不初始化`state`或不进行方法绑定, 则不需要为 React 组件实现构造函数

`constructor`中通常只做两件事

1. 通过给`this.state`赋值对象来初始化内部`state`
2. 为事件绑定实例`this`

`componentDidMount`

```react
componentDidMount()
```

`componentDidMount()`会在组件挂载后(插入 DOM 树中)立即调用

`componentDidMount`中通常进行哪些操作呢?

- 依赖于 DOM 的操作可以在这里进行
- 在此处发送网络请求就是最好的地方(官方建议)
- 可以在此处添加一些订阅(会在`componentWillUnmount`取消订阅)

`componentDidUpdate`

```react
componentDidUpdate(prevProps, prevState, snapshot)
```

`componentDidUpdate()`会在更新后立即调用, 首次渲染不会执行此方法

- 当组件更新后, 可以在此处对 DOM 进行操作
- 如果你对更新前后的`props`进行了比较, 也可以选择在此处进行网络请求(例如, 当`props`未发生变化时, 则不会执行网络请求)

```react
componentDidUpdate(prevProps) {
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID)
  }
}
```

`componentWillUnmount`

```react
componentWillUnmount()
```

`componentWillUnmount()`会在组件卸载及销毁之前直接调用

- 在此方法中执行必要的清理操作
- 例如, 清除`timer`, 取消网络请求或清除在`componentDidMount()`中创建的订阅等

**代码验证所有的生命周期函数**

```react
import React, { Component } from 'react'

class HYTestCpn extends Component {
  render() {
    return <h2>HYTestCpn</h2>
  }

  componentWillUnmount() {
    console.log('HYTestCpn componentWillUnmount')
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }

    console.log('调用constructor方法')
  }

  render() {
    console.log('调用render方法')
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        {this.state.counter <= 5 && <HYTestCpn/>}
        <button onClick={e => this.increment()}>+1</button>
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  componentDidMount() {
    console.log('调用componentDidMount方法')
  }

  componentDidUpdate() {
    console.log('调用componentDidUpdate方法')
  }

  componentWillUnmount() {
    console.log('调用componentWillUnmount方法')
  }
}
```

### 不常用生命周期

除了上面介绍的生命周期函数之外, 还有一些不常用的生命周期函数

- `getDerivedStateFromProps`: `state`的值在任何时候都依赖于`props`时使用, 该方法返回一个对象来更新`state`
- `getSnapshotBeforeUpdate`: 在 React 更新 DOM 之前回调的一个函数, 可以获取 DOM 更新前的一些信息(比如滚动位置)
- `shouldComponentUpdate`: 该生命周期函数很常用, 但是我们等待讲性能优化时再来详细讲解

[![Nmj8XR.jpg](https://s1.ax1x.com/2020/06/18/Nmj8XR.jpg)](https://s1.ax1x.com/2020/06/18/Nmj8XR.jpg)

另外, React 中还提供了一些过期的生命周期函数, 这些函数已经不再推荐使用
