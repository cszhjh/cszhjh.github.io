---
title: React非父子组件通信
date: 2020-06-21 12:24:01
tags: React-Components
categories: 
- React
---

## Context 使用

### Context 应用场景

非父子组件数据的共享

- 在开发中, 比较常见的数据传递方式是通过`props`属性自上而下(由父到子)进行传递
- 但是对于一些场景: 比如一些数据需要在多个组件中进行共享(地区偏好、UI 主题、用户登陆状态、用户信息等等)
- 如果我们在顶层的`App`中定义这些信息, 之后一层层传递下去, 那么对于一些中间层不需要数据的组件来说, 是一种**冗余**的操作

<!-- more -->

看一个例子

```react
import React, { Component } from 'react'

function ProfileHeader(props) {
  return (
    <div>
      <h2>用户昵称: {props.nickname}</h2>
      <h2>用户等级: {props.level}</h2>
    </div>
  )
}

class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileHeader nickname={this.props.nickname} level={this.props.level} />
        <ul>
          <li>设置1</li>
          <li>设置2</li>
          <li>设置3</li>
          <li>设置4</li>
          <li>设置5</li>
        </ul>
      </div>
    )
  }
}

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      nickname: 'coderlion',
      level: 99
    }
  }

  render() {
    const { nickname, level } = this.state

    return (
      <div>
        <Profile nickname={nickname} level={level} />
        <h2>其他内容</h2>
      </div>
    )
  }
}
```

上面的代码中`App`组件将`nickname`、`level`传递给子组件`Profile`, 之后又经`Profile`之手将数据传递给其子组件`ProfileHeader`, 对于`Profile`本身来说, 这种操作非常冗余

实际上 JSX 仅仅只是`React.createElement(component, props, ...children)`函数的语法糖, 详情参见[官方文档](https://zh-hans.reactjs.org/docs/jsx-in-depth.html)

下面两种写法是等价的

```react
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />
}

function App2() {
  const props = { firstName: 'Ben', lastName: 'Hector' }
  return <Greeting {...props} />
}
```

那么我们上面的`Profile`的传递代码就可以修改为如下代码

```react
<ProfileHeader {...this.props} />
```

但是, 如果层级更多的话, 一层层传递是非常麻烦的, 并且代码非常冗余

- React 提供了一个API: **Context**
- Context 提供了一种在组件之间共享此类值的方式, 而不必显示地通过组件书的逐层传递`props`
- Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据, 例如当前认证的用户、主题、首选语言

### React.createContext

```react
const MyContext = React.createContext(defaultValue)
```

创建一个需要共享的 Context 对象

- 如果一个组件订阅了 Context, 那么这个组件会从离自身最近的那个匹配的`Provider`中读取到当前的 Context 值
- `defaultValue`是组件在顶层查找过程中没有找到对应的`Provider`, 那么就使用默认值

### Context.Provider

```react
<MyContext.Provider value={/* ... */} />
```

每个 Context 对象都会返回一个 Provider React 组件, 它允许消费组件订阅 Context 的变化

- `Provider`接收一个`value`属性, 传递给消费组件
- 一个`Provider`可以和多个消费组件有对应关系
- 多个`Provider`也可以嵌套使用, 里层的会覆盖外层的数据

当`Provider`的`value`值发生变化时, 它内部的所有消费组件都会重新渲染

### Class.contextType

```react
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context
    /* ... */
  }
  render() {
    let value = this.context
    /* 基于 MyContext 组件的值进行渲染 */
  }
}

MyClass.contextType = MyContext
```

挂载在`class`上的`contextType`属性会被重新赋值为一个由`React.createContext()`创建的 Context 对象

- 这能让你使用`this.context`来消费最近`Context`上的那个值
- 你可以在任何生命周期中访问到他, 包括`render`函数

### Context.Consumer

```react
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染 */}
</MyContext.Consumer>
```

这里 React 组件也可以订阅到 Context 变更, 这能让你在**函数式组件**中完成订阅 Context

- 这里需要将函数作为子元素(function as child)这种做法
- 这个函数接收当前的 Context 值, 并返回一个 React 节点

### Context 使用过程

我们先按照前面三个步骤来使用一个 Context

```react
import React, { Component } from 'react'

const UserContext = React.createContext({ nickname: '默认', level: -1 })

class ProfileHeader extends Component {
  render() {
    return (
      <div>
        <h2>用户昵称: {this.context.nickname}</h2>
        <h2>用户等级: {this.context.level}</h2>
      </div>
    )
  }
}

ProfileHeader.contextType = UserContext

class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileHeader />
        <ul>
          <li>设置1</li>
          <li>设置2</li>
          <li>设置3</li>
          <li>设置4</li>
          <li>设置5</li>
        </ul>
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <UserContext.Provider value={{ nickname: 'coderlion', level: 99 }}>
          <Profile />
        </UserContext.Provider>
        <h2>其他内容</h2>
      </div>
    )
  }
}
```

我们会发现, 这个过程中`Profile`不需要有任何相关数据传递的操作

**什么时候使用默认值`defaultValue`呢?** 如果出现了如下代码就可以使用

```react
<Profile />
<UserContext.Provider value={{ nickname: 'coderlion', level: 99 }} />
```

`Profile`并没有作为`UserContext.Provider`的子组件

**什么时候使用`Context.Consumer`呢?**

1. 当使用`value`的组件是一个函数式组件时
2. 当组件中需要使用多个 `Context` 时

函数式组件

```react
function ProfileHeader(props) {
  return (
    <div>
      <UserContext.Consumer>
        {value => {
          return (
            <div>
              <h2>用户昵称: {value.nickname}</h2>
              <h2>用户等级: {value.level}</h2>
            </div>
          )
        }}
      </UserContext.Consumer>
    </div>
  )
}
```

当组件中需要使用多个 Context

1. 创建一个新的 Context

```react
const ThemeContext = React.createContext({ color: 'black' })
```

1. `Provider`的嵌套

```react
<UserContext.Provider value={{ nickname: 'coderlion', level: 99 }}>
  <ThemeContext.Provider value={{ color: 'red' }}>
    <Profile />
  </ThemeContext.Provider>
</UserContext.Provider>
```

1. 使用`Consumer`的嵌套

```react
<UserContext.Consumer>
  {value => {
    return (
      <ThemeContext.Consumer>
        {
          theme => (
            <div>
              <h2 style={theme}>用户昵称: {value.nickname}</h2>
              <h2 style={theme}>用户等级: {value.level}</h2>
            </div>
          )
        }
      </ThemeContext.Consumer>
    )
  }}
</UserContext.Consumer>
```

[更多用法参照官方文档](https://zh-hans.reactjs.org/docs/context.html)

## 事件总线

### 事件总线的概述

前面通过 Context 主要实现的是数据的共享, 但是在开发中如果有跨组件之间的事件传递, 应该如何操作呢?

- 在 Vue 中我们可以通过 Vue 的实例, 快速实现一个事件总线(EventBus), 来完成操作
- 在 React 中, 我们可以依赖一个使用较多的库`events`来完成对应的操作

我们可以通过 NPM 或 Yarn 来安装`events`

```shell
yarn add events
```

### Events 常用 API

- 创建 EventEmitter 对象: `eventBus` 对象
- 发出事件: `eventBus.emit('事件名称', 参数列表)`
- 监听事件: `eventBus.addListener('事件名称', 监听函数)`
- 移除事件: `eventBus.removeListener('事件名称', 监听函数)`

### 使用 Events

```react
import React, { Component } from 'react'
import { EventEmitter } from 'events'

const eventBus = new EventEmitter()

class ProfileHeader extends Component {
  render() {
    return (
      <div>
        <button onClick={e => this.btnClick()}>按钮</button>
      </div>
    )
  }

  btnClick() {
    eventBus.emit('headerClick', 'coderlion', 20)
  }
}

class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileHeader />
        <ul>
          <li>设置1</li>
          <li>设置2</li>
          <li>设置3</li>
          <li>设置4</li>
          <li>设置5</li>
        </ul>
      </div>
    )
  }
}

export default class App extends Component {
  componentDidMount() {
    eventBus.addListener('headerClick', this.headerClick)
  }

  headerClick(name, age) {
    console.log(name, age)
  }

  componentWillUnmount() {
    eventBus.removeListener('headerClick', this.headerClick)
  }

  render() {
    return (
      <div>
        <Profile />
        <h2>其他内容</h2>
      </div>
    )
  }
}
```

