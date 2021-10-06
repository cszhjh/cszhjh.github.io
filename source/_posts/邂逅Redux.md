---
title: 邂逅Redux
date: 2020-07-28 21:46:19
tags: Redux
categories: 
- React
---

## 前言

> 在 React 的开发过程中, Redux 对于我们是非常重要的
>
> 但是对于很多人来说, 初次接触 Redux 会感觉 Redux 的学习坡度非常陡峭, 难度比较大
>
> 在接下来的过程中, 我会通过一个系列的方式循循渐进、层层深入的方式来讲解 Redux: 从 Redux 的独立使用过程、到 Redux 的结构划分、到 Redux 结合 React 的过程、到 Redux 中异步操作、到复杂数据的结构处理、到结合 immutable 的使用
>
> 整个过程都是在现有知识的基础上层层递增、一步步掌握 Redux 的使用

<!-- more -->

## Redux 是什么?

### JavaScript 纯函数

函数式编程中有一个概念叫纯函数, JavaScript 符合函数式编程的范式, 所以也有纯函数的概念

在 React 中, 纯函数的概念非常重要, 在接下来我们学习的 Redux 中也非常重要, 所以我们有必须来回顾(如果你之前没有学习过, 那么你可以花时间学习一下**纯函数**)

> 在程序设计中, 若一个函数符合以下条件, 那么这个函数被称为纯函数
>
> - 词函数在相同的输入值时, 需产生相同的输出, 函数的输出和输入值以外的其他隐藏信息或状态无关, 也和由 I/O 设备产生的外部输出无关
> - 该函数不能有语义上可观察的函数副作用, 注入“触发事件”, 使用输出设备输出, 或更改输出值以外物件的内容等
>
> ——维基百科

简单总结:

- 确定的输入, 一定会产生确定的输出
- 函数在执行过程中, 不能产出副作用

那么我们来看几个函数是否是纯函数:

案例一

```javascript
function sum(a, b) {
  return a + b
}
```

- 很明显, 下面的函数是一个纯函数
- 它的输出是依赖我们的输入内容, 并且中间没有产生任何副作用

案例二

```javascript
let foo = 5

function add(num) {
  return foo + num
}

console.log(add(5))
foo = 10
console.log(add(5))
```

- `add`函数不是一个纯函数
- 函数依赖一个外部的变量, 变量发送改变时, 会影响: 确定的输入, 产生确定的输出
- 能否改进成纯函数呢? `const foo = 5`即可

案例三

```javascript
function printInfo(info) {
  console.log(info.name, info.age)
  info.name = '哈哈哈'
}
```

- `printInfo`不是一个纯函数
- 虽然无论输入什么, 最终输出的都是`undefined`, 但是它产生了副作用, 修改了传入的对象

当然纯函数还有很多的变种, 但是我们只需要理解它的核心就可以了

为什么纯函数在函数式编程中非常重要呢?

- 因为你可以**安心的写**和**安心的用**
- 你在写的时候保证了函数的纯度, 只有但是实现自己的业务逻辑即可, 不需要关心传入的内容或者依赖其他的外部变量
- 你在用的时候, 需要确定你的输入内容不会被任意篡改, 并且自己确定的输入, 一定会有确定的输出

React 中要求我们无论是函数还是 class 声明一个组件, 这个组件都必须像纯函数一样, 保护它们的`props`不会被修改

[![aEPxds.png](https://s1.ax1x.com/2020/07/28/aEPxds.png)](https://s1.ax1x.com/2020/07/28/aEPxds.png)

在之后学习 Redux 中, `reducer`也被要求是一个纯函数

### 认识 Redux

#### 为什么需要 Redux?

JavaScript 开发的应用程序, 已经变得越来越复杂了

- JavaScript 需要管理的状态越来越多, 越来越复杂
- 这些状态包括服务器返回的数据、缓存数据、用户操作产生的数据等等, 也包括一些 UI 的状态, 比如某些元素是否被选中, 是否显示加载动效, 当前分页

管理不断变化的`state`是非常困难的

- 状态之间相互会存在依赖, 一个状态的变化会引起另一个状态的变化, View 页面也有可能会引起状态的变化
- 当应用程序复杂时, `state`在什么时候, 因为什么原而发生了变化, 发生了怎么样的变化, 会变得非常难以控制和追踪

React 是在视图层帮助我们解决了 DOM 的渲染过程, 但是`state`依然是留给我们自己来管理

- 无论是组件定义自己的`state`, 还是组件之间的通信通过`props`进行传递, 也包括通过`Context`进行数据之间的共享
- React 主要负责帮助我们管理视图, `state`如何维护最终还是我们自己来决定

[![aEknxK.png](https://s1.ax1x.com/2020/07/28/aEknxK.png)](https://s1.ax1x.com/2020/07/28/aEknxK.png)

Redux 就是一个帮助我们管理`state`的容器: Redux 是 JavaScript 的状态容器, 提供了可预测的状态管理

Redux 除了和 React 一起使用之外, 它也可以和其他界面库一起来使用(比如 Vue), 并且它非常小(包括依赖在内, 只有`2kb`)

#### Redux 核心理念

Redux 的核心理念非常简单

比如我们有一个朋友列表需要管理

```javascript
const initialState = {
  friends: [
    { name: 'lion', age: 18 },
    { name: 'kobe', age: 40 },
    { name: 'lilei', age: 30 }
  ]
}
```

- 比如我们没有定义统一的规范来操作这段数据, 那么整个数据的变化就是无法追踪的
- 比如页面的某处通过`products.push`的方式增加了一条数据
- 比如另一个页面通过`products[0].age = 25`修改了一条数据
- 整个应用程序错综复杂, 当出现 Bug 时, 很难跟踪到哪里发生的变化

Redux 要求我们通过`action`来更新数据

- 所有数据的变化, 必须通过派发(dispatch)`action`来更新
- `action`是一个普通的 JavaScript 对象, 用来描述这次更新的`type`和`content`

比如下面就是几个更新`friends`的`action`

```javascript
const action1 = { type: 'ADD_FRIEND', info: { name: 'lucy', age: 20 } }
const action2 = { type: 'INC_AGE', index: 0 }
const action3 = { type: 'CHANGE_NAME', playload: { index: 0, newName: 'coderlion' } }
```

- 强制使用`action`的好处是可以清晰的知道数据到底发生了什么样的变化, 所有的数据变化都是可跟踪、可预测的
- 当然, 目前我们的`action`是固定的对象, 真实应用中, 我们会通过函数来定义, 返回一个`action`

但是如何将`state`和`action`联系在一起呢? 答案就是 **reducer**

- `reducer`是一个纯函数
- `reducer`做的事情就是将传入的`state`和`action`结合起来生成一个新的`state`

```javascript
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FRIEND':
      return { ...state, friends: [...state.friends, action.info] }
    case 'INC_AGE':
      return {
        ...state,
        friends: state.friends.map((item, index) => {
          if (index === action.index) {
            return { ...item, age: item.age + 1 }
          }
          return item
        })
      }
    case 'CHANGE_NAME':
      return {
        ...state,
        friends: state.friends.map((item, index) => {
          if (index === action.index) {
            return { ...item, name: action.newName }
          }
          return item
        })
      }
    default:
      return state
  }
}
```

#### Redux 的三大原则

##### 单一数据源

整个应用程序的`state`被存储在一颗 Object Tree 中, 并且这个 Object Tree 只存储在一个`store`中

- Redux 并没有强制让我们不能创建多个`store`, 但是那样做并不利于数据的维护
- 单一的数据源可以让整个应用程序的`state`变得方便维护、追踪、修改

##### State 是只读的

唯一修改`State`的方法一定是触发`action`, 不要试图在其他地方通过其他的方式来修改`State`

- 这样就确保了 View 或网络请求都不能直接修改`state`, 它们只能通过`action`来描述自己想要如何修改`state`
- 这样可以保证所有的修改都被集中化管理, 并且按照严格的顺序来执行, 所以不需要担心 race condition(竞态)的问题

##### 使用纯函数来执行修改

通过`reducer`将`old state`和`action`联系在一起, 并且返回一个新的`State`

- 随着应用程序的复杂度增加, 我们可以将`reducer`拆分成多个小的`reducers`, 分别操作不同的 state tree 的一部分
- 但是所有的`reducer`都应该是纯函数, 不能产生任何副作用

## Redux 的基本使用

### Redux 使用过程

#### 安装 Redux

```shell
## npm
npm install redux --save

## yarn
yarn add redux
```

这里通过传家一个简单的`js`文件, 我们来简单学习一下 Redux

#### 搭建项目结构

1. 创建一个新的项目文件夹: `learn-redux`

```shell
## 执行初始化操作
yarn init

## 安装 redux
yarn add redux
```

1. 创建`src`目录, 并且创建`index.js`文件
2. 修改`package.json`, 令其可以执行`index.js`

```json
"scripts": {
  "start": "node src/index.js"
}
```

#### 开始在 index.js 中编写代码

1. 创建一个对象, 作为我们要保存的状态

```react
const redux = require('redux')

const initialState = {
  counter: 0
}
```

1. 创建`store`来存储这个`state`
   - 创建`store`时必须创建`reducer`
   - 我们可以通过`store.getState`来获取当前的`state`

```react
// 创建 reducer
const reducer = (state = initialState, action) => state

// 根据 reducer 创建 store
const store = redux.createStore(reducer)

console.log(store.getState())
```

1. 通过`action`来修改`state`
   - 通过`dispatch`来派发`action`
   - 通常`action`都会有`type`属性, 也可以携带其他的数据

```react
store.dispatch({
  type: 'INCREMENT'
})

store.dispatch({
  type: 'DECREMENT'
})

store.dispatch({
  type: 'ADD_NUMBER',
  number: 5
})
```

1. 修改`reducer`中的处理代码

   - 这里一定要记住, `reducer`是一个纯函数, 不需要直接修改`state`
   - 后面我们会解释直接修改`state`带来的问题

```react
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 }
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 }
    case 'ADD_NUMBER':
      return { ...state, counter: state.counter + action.number }
    default:
      return state
  }
}
```

1. 可以在派发`action`之前, 监听`store`的变化

```react
store.subscribe(() => console.log(store.getState()))
```

完整的案例代码如下

```react
const redux = require('redux')

const initialState = {
  counter: 0
}

// 创建 reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 }
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 }
    case 'ADD_NUMBER':
      return { ...state, counter: state.counter + action.number }
    default:
      return state
  }
}

// 根据 reducer 创建 store
const store = redux.createStore(reducer)

store.subscribe(() => {
  console.log(store.getState())
})

// 修改 store 中的 state
store.dispatch({
  type: 'INCREMENT'
})
// console.log(store.getState())

store.dispatch({
  type: 'DECREMENT'
})
// console.log(store.getState())

store.dispatch({
  type: 'ADD_NUMBER',
  number: 5
})
// console.log(store.getState())
```

### Redux 结构划分

如果我们将所有的逻辑代码写到一起, 那么当 Redux 变得复杂时代码将难以维护

接下来, 我会对代码进行拆分, 将`store`、`reducer`、`action`、`constants`拆分称一个个文件

**注意: node 中对 ES6 模块化的支持**

目前我使用的 node 版本是`v12.17.0`, 从 node `v13.2.0`开始, node 才对 ES6 模块化提供了支持

- node `v13.2.0`之前, 需要进行如下操作

  - 在`package.json`中添加属性: `"type": "module"`
  - 在执行命令中添加如下选项: `node --experimental-modules src/index.js`
  
- node `v13.2.0`之后, 只需要进行如下操作

  - 在`package.json`中添加属性: `"type": "module"`

**注意: 导入文件时, 需要跟上`.js`后缀**

#### 对 Redux 结构进行划分

创建`store/index.js`文件

```react
import redux from 'redux'
import reducer from './reducer.js'

const store = redux.createStore(reducer)

export default store
```

创建`store/reducer.js`文件

```react
import { ADD_NUMBER, SUB_NUMBER } from './constants.js'

const initialState = {
  counter: 0
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NUMBER:
      return { ...state, counter: state.counter + action.num }
    case SUB_NUMBER:
      return { ...state, counter: state.counter - action.num }
    default:
      return state
  }
}

export default reducer
```

创建`store/actionCreators.js`文件

```react
import { ADD_NUMBER, SUB_NUMBER } from './constants.js'

const addAction = count => ({
  type: ADD_NUMBER,
  num: count
})

const subAction = count => ({
  type: SUB_NUMBER,
  num: count
})

export { addAction, subAction }
```

创建`store/constants.js`文件

```react
const ADD_NUMBER = 'ADD_NUMBER'
const SUB_NUMBER = 'SUB_NUMBER'

export { ADD_NUMBER, SUB_NUMBER }
```

### Redux 流程图

我们已经知道了 Redux 的基本使用过程, 那么我们就更加清晰来认识一下 Redux 在实际开发中的流程

[![aEd3Ps.png](https://s1.ax1x.com/2020/07/28/aEd3Ps.png)](https://s1.ax1x.com/2020/07/28/aEd3Ps.png)

1. 全局通常只有一个 Store, 存储我们的 State
2. Component 中在某些情况会派发 Action(这些 Action 是我们提前定义好的)
3. Reducer 会接收到这些 Action, 并且在 Reducer 中会返回一个新的 State, 作为 Store 的 State
4. State 发生更新之后会触发通知, 告知订阅者数据发生了改变
5. 订阅者拿到最新的数据(在`props`中), 更新到 JSX 中, 界面发生改变
