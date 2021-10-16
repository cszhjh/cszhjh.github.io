---
title: React父子组件通信
date: 2020-06-19 21:44:26
tags: React-Components
toc: true
categories: 
- React
---

## 认识组件的嵌套

组件之间存在嵌套关系

- 在之前的案例中, 我们只是创建了一个组件`App`
- 如果我们一个应用程序将所有的逻辑都放在一个组件中, 那么这个组件就会变得非常臃肿和难以维护
- 所以组件化的核心思想应该是对组件进行拆分, 拆分成一个个小的组件
- 再将这些组件组合嵌套在一起, 最终形成我们的应用程序

<!-- more -->

```react
import React, { Component } from 'react'

function Header() {
  return <h2>Header</h2>
}

function Main() {
  return (
    <div>
      <Banner />
      <ProductList />
    </div>
  )
}

function Banner() {
  return <div>Banner</div>
}

function ProductList() {
  return (
    <ul>
      <li>商品1</li>
      <li>商品2</li>
      <li>商品3</li>
      <li>商品4</li>
      <li>商品5</li>
    </ul>
  )
}

function Footer() {
  return <h2>Footer</h2>
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}
```

上面代码嵌套的逻辑及它们存在的关系如下

- `App`组件是`Header`、`Main`、`Footer`组件的父组件
- `Main`组件是`Banner`、`ProductList`组件的父组件

[![NKTpdO.png](https://s1.ax1x.com/2020/06/19/NKTpdO.png)](https://s1.ax1x.com/2020/06/19/NKTpdO.png)

在开发过程中, 我们经常遇到需要组件之间相互进行通信

- 比如`App`可能使用了多个`Header`, 每个地方的`Header`展示的内容不同, 那么我们就需要使用者传递给`Header`一些数据, 让其进行展示
- 又比如我们在`Main`中一次性请求了`Banner`数据和`ProductList`数据, 那么就需要传递给他们相应的数据来进行展示
- 也可能是子组件中发生了**事件**, 需要由父组件来完成某些操作, 那就需要子组件向父组件传递事件

总之, 在一个 React 项目中, 组件之间的通信是非常重要的环节

父组件在展示子组件, 可能会传递一些数据给子组件

- 父组件通过**属性=值**的形式来传递给子组件数据
- 子组件通过 `props` 参数获取父组件传递过来的数据

## 父组件传递子组件

### 子组件是 class 组件

```react
import React, { Component } from 'react'

// 1.类子组件
class ChildCpn1 extends Component {
  constructor(props) {
    super()
    this.props = props
  }

  render() {
    const { name, age, height } = this.props

    return (
      <div>
        <h2>我是class的组件</h2>
        <p>展示父组件传递过来的数据: {name + ' ' + age + ' ' + height}</p>
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn1 name="lion" age="20" height="1.80" />
      </div>
    )
  }
}
```

按照上面的结构, 我们每一个子组件都需要写构造器来完成: `this.props = props`

其实大可不必这样做, 因为我们可以调用`super(props)`, 我们来看一下`Component`的源码

```react
function Component(props, context, updater) {
  this.props = props
  this.context = context
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue
}
```

- 这里我们先不关心`context`、`updater`
- 我们发现传入的`props`会被`Component`设置到`this`中(父类的对象), 那么子类就可以继承过来

所以, 我们的构造方法可以换成下面的写法

```react
constructor(props) {
  super(props)
}
```

甚至我们可以省略, 为什么可以省略呢?

如果不指定构造方法, 则使用默认构造函数, 对于基类, 默认构造函数是

```react
constructor() {}
```

对于派生类, 默认构造函数是

```react
constructor(...args) {
  super(...args)
}
```

### 子组件是 function 组件

```react
function ChildCpn2(props) {
  const { name, age, height } = props

  return (
    <div>
      <h2>我是function的组件</h2>
      <p>展示父组件传递过来的数据: {name + ' ' + age + ' ' + height}</p>
    </div>
  )
}

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn2 name="lion" age="20" height="1.80" />
      </div>
    )
  }
}
```

`function`组件相对来说比较简单, 因为不需要由构造方法, 也不需要有`this`

### 参数验证 propTypes

对于传递给子组件的数据, 有时候我们可能希望进行验证, 特别是对于大型项目来说

- 当然, 如果你的项目中默认继承了 Flow 或者 TypeScript, 那么就可以直接进行类型验证
- 但是, 即使我们没有使用 Flow 或者 TypeScript, 也可以通过`prop-types`库来进行参数验证

> 注意: 自 React v15.5 起, `React.PropTypes` 已移入另一个包中, 请使用 [`prop-types` 库](https://www.npmjs.com/package/prop-types) 代替
>

我们对之前的 `class` 组件进行验证

```react
import PropTypes from 'prop-types'

ChildCpn1.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  height: PropTypes.number
}
```

这个时候, 控制台就会报警告

[![NKqbvj.png](https://s1.ax1x.com/2020/06/19/NKqbvj.png)](https://s1.ax1x.com/2020/06/19/NKqbvj.png)

此时, 我们就得传入正确的类型才能避免警告

```jsx
<ChildCpn1 name="lion" age={18} height={1.80} />
```

更多的验证方式, 可以参考[官网](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html)

- 比如验证数组, 并且数组中包含哪些元素
- 比如验证对象, 并且对象中包含哪些`key`及`value`是什么类型
- 比如某个元素是必须的, 使用`requiredFunc: PropTypes.func.isRequired`

如果父组件没有传递数据, 而我们希望子组件有默认值呢?

- 那么使用`defaultProps`就可以了

```react
ChildCpn1.defaultProps = {
  name: 'lion',
  age: 20,
  height: 1.80
}
```

## 子组件传递父组件

某些情况, 我们也需要子组件向父组件传递数据

- 在 Vue 中是通过自定义事件来完成的
- 在 React 中同样是通过`props`传递消息, 只是让**父组件**给**子组件**传递一个**回调函数**, 在子组件中调用这个函数即可

我们这里来完成一个案例

- 将计数器案例进行拆解
- 将按钮封装到子组件中: `CounterButton`
- `CounterButton`发生点击事件, 将内容传递到父组件中, 父组件修改`counter`的值

[![NKXbxe.png](https://s1.ax1x.com/2020/06/19/NKXbxe.png)](https://s1.ax1x.com/2020/06/19/NKXbxe.png)

```react
import React, { Component } from 'react'

function CounterButton(props) {
  const { operator, btnClick } = props
  return <button onClick={btnClick}>{operator}</button>
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <CounterButton operator="+" btnClick={e => this.changeCounter(1)} />
        <CounterButton operator="-" btnClick={e => this.changeCounter(-1)} />
      </div>
    )
  }

  changeCounter(num) {
    this.setState({
      counter: this.state.counter + num
    })
  }
}
```

由子组件监听按钮事件, 事件触发后调用父组件传递的`btnClick`函数, 父组件向子组件传递函数时使用的是**箭头函数**, 所以不必担心`this`指向问题

## React 插槽实现

### 为什么使用插槽?

在开发中, 我们抽取了一个组件, 但是为了让这个组件具备更强的通用性, 我们不能将组件中的内容限制为固定的`div`、`span`等元素

我们应该让组件使用者可以决定某一块区域的存放内容

举个例子: 假如我们定制一个通用的导航组件`NavBar`

- 这个组件分成三块区域: 左边-中间-右边, 每块区域的内容是不固定的
- 左边区域可能是一个菜单图标, 也可能是一个返回按钮, 也可能什么都不显示
- 中间区域可能是一个搜索框, 也可能是一个列表, 也可能是一个标题等等
- 右边可能是一个文字, 也可能是一个图标, 也可能什么都不显示

[![NMpr5R.png](https://s1.ax1x.com/2020/06/19/NMpr5R.png)](https://s1.ax1x.com/2020/06/19/NMpr5R.png)

这种需求在 Vue 当中有一个固定的做法就是通过`slot`来完成的, React 呢?

- React 对于这种需要插槽的情况非常灵活
- 有两种方案可以实现: `children`和`props`

### children 实现

每个组件都可以获取到`props.children`: 它包含组件的开始标签和结束标签之间的内容

```jsx
<Welcome>Hello React</Welcome>
```

在`Welcome`组件中获取`props.children`, 就可以得到字符串`Hello React`

```react
function Welcome(props) {
  return <p>{props.children}</p>
  // <p>Hello React</p>
}
```

- 如果只有一个元素, 那么`children`指向该元素
- 如果有多个与安素, 那么`children`指向的是数组, 数组中包含多个元素

那么, 我们的`NavBar`可以进行如下实现

```react
import React, { Component } from 'react'

class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <div className="item left">{this.props.children[0]}</div>
        <div className="item center">{this.props.children[1]}</div>
        <div className="item right">{this.props.children[2]}</div>
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar>
          <div>返回</div>
          <div>购物街</div>
          <div>更多</div>
        </NavBar>
      </div>
    )
  }
}
```

### props 实现

通过`children`实现的方案虽然可行, 但是有一个弊端: 通过索引值获取传入的元素很容易出错, 不能精准的获取传入的元素

另外一种方案就是使用`props`实现

- 通过具体的属性名, 可以让我们在传入和获取时更加精准

```react
import React, { Component } from 'react'

class NavBar extends Component {
  render() {
    const { leftSlot, centerSlot, rightSlot } = this.props

    return (
      <div className="nav-bar">
        <div className="item left">{leftSlot}</div>
        <div className="item center">{centerSlot}</div>
        <div className="item right">{rightSlot}</div>
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    const navLeft = <div>返回</div>
    const navCenter = <div>购物街</div>
    const navRight = <div>更多</div>

    return (
      <div>
        <NavBar leftSlot={navLeft} centerSlot={navCenter} rightSlot={navRight} />
      </div>
    )
  }
}
```

## 问题

**为什么 constructor 中不传入 props 也能在别处使用**

在进行 React 开发中, 有一个很奇怪的现象

- 在调用`super()`的时候, 不传入`props`, 但是在下面的`render`函数中我们依然可以使用`props`
- 如果你自己编写一个基础的类, 可以尝试一下: 理论上来说这种情况`props`应该是`undefined`, 但是结果却不是`undefined`

```react
class ChildCpn extends Component {
  constructor(props) {
    super()
  }
  
  render() {
    const { name, age, height } = this.props // coderlion 20 1.80
    return (
      <h2>子组件展示数据: {name + ' ' + age + ' ' + height}</h2>
    )
  }
}
```

为什么这么神奇呢?

因为 React 担心你有时会忘了为`super()`传入`props`而进行了一些操作

[![N8B03V.png](https://s1.ax1x.com/2020/06/21/N8B03V.png)](https://s1.ax1x.com/2020/06/21/N8B03V.png)

我们来看一下这个组件时怎么被创建出来的

我们找到其中的`render`函数

[![N8DSKS.png](https://s1.ax1x.com/2020/06/21/N8DSKS.png)](https://s1.ax1x.com/2020/06/21/N8DSKS.png)

`render`函数中有这样一段代码

这个`_instance`实例就是组件对象

[![N8DpDg.png](https://s1.ax1x.com/2020/06/21/N8DpDg.png)](https://s1.ax1x.com/2020/06/21/N8DpDg.png)

我们再来看一下, 它在哪里重新赋值

这里还包括通过`this._instance`的方式回调生命周期函数

[![N8DE80.png](https://s1.ax1x.com/2020/06/21/N8DE80.png)](https://s1.ax1x.com/2020/06/21/N8DE80.png)

**结论: 仅当你想在`constructor`内使用`props`才将`props`传入`super()`, 你无论是否手动的将`props`保存到组件的实例上, React 内部都会帮你保存**
