---
title: JSX语法解析
date: 2020-06-10 14:21:11
toc: true
tags: JSX
categories: 
- React
---

## 认识 JSX 语法

```react
<script type="text/babel">
  const element = <h2>Hello World</h2>
  ReactDOM.render(element, document.getElementById('app'))
</script>
```

- 这段 `element` 变量声明赋值的标签语法是什么呢?

  - 它不是一段字符串(因为没有使用引号包裹), 它看起来像一段`HTML`元素, 但是我们能在 JS 中直接给一个变量赋值`HTML`吗?
  - 其实是不可以的, 如果我们将`type="text/babel"`去除掉, 那么就会出现语法错误
  - 它到底是什么呢? 其实它是一段 JSX 的语法

<!-- more -->

### JSX 是什么?

**JSX 是一种 JavaScript 的语法扩展(eXtension)**, 也在很多地方称之为 **JavaScript XML**, 因为它看起来就是一段 XML 语法

它用于描述我们的 UI 界面, 并且其完全可以和 JavaScript 融合在一起

它不同于 Vue 中的模板语法, 你不需要专门学习模版语法中的一些指令(如`v-for`、`v-if`、`v-else`、`v-bind`等)

### 为什么 React 选择了 JSX?

React 认为渲染逻辑本质上与其他 UI 逻辑存在**内在耦合**

- 比如 UI 需要绑定事件
- 比如 UI 需要展示数据状态, 在某些状态发生改变时, 又需要改变 UI

他们之间时密不可分的, 所以 React 没有将标记分离到不同的文件中, 而是将它们组合到了一起, 这个地方就是组件(`Component`)

### JSX 的书写规范

JSX 的顶层**只能有一个根元素**, 所以我们很多使用会在外层包裹一个`div`元素

为了方便阅读, 我们通常在 JSX 的外层包裹一个小括号`()`, 这样可以方便阅读, 并且 JSX 可以进行换行书写

- 不加小括号贸然换行会导致`render`函数返回`undefined`, 因为 JavaScript 会在`return`语句后面补上**分号**

JSX 中的标签可以是单标签, 也可以是双标签

- 如果是单标签, 必须以`/>`结尾

## JSX 基础语法

如果我们 JSX 中的内容是动态的, 我们可以通过表达式来获取

- 书写规则: `{JS 表达式}`
- 打括号内可以是变量、字符串、数组、函数调用等任意 JS 表达式

### JSX 中的注释

JSX 是嵌入到 JavaScript 中的一种语法, 所以在编写注释时, 需要通过 JSX 的语法来编写

```jsx
<div>
  {/* 我是一段注释 */}
  <h2>Hello World</h2>
</div>
```

### JSX 嵌入变量

- 当变量是`Number`、`String`、`Array`类型时, 可以直接显示
- 当变量是`null`、`undefined`、`Boolean`类型时, 内容为空
  - 如果希望可以显示`null`、`undefined`、`Boolean`, 那么需要将其转成字符串
  - 转换的方式有很多, 例如`toString`、`String(变量)`、空字符串拼接等方式
- 对象和函数类型不能作为子元素(not valid as React child)

```react
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      name: 'lion'
      age: 18,
      language: ['html', 'css', 'javascript', 'c++', 'java']
      
      // 以下均不能显示
      test1: null,
      test2: undefined,
      flag: false,

      obj: {
        name: 'coder'
      }
      func: function () {}
    }
  }

  render() {
    return (
      <div>
        {/* 1.可以直接显示 */}
        <h2>{this.state.name}</h2>
        <h2>{this.state.age}</h2>
        <h2>{this.state.language}</h2>

        {/* 2.不显示 */}
        <h2>{this.state.test1}</h2>
        <h2>{this.state.test2}</h2>
        <h2>{this.state.flag}</h2>
        
        {/* 3.不显示 */}
        <h2>{this.state.obj}</h2>
        <h2>{this.state.func}</h2>

        {/* 4.间接显示 */}
        <h2>{this.state.test1 + ''}</h2>
        <h2>{this.state.test2 + ''}</h2>
        <h2>{this.state.flag + ''}</h2>
        
        <h2>{JSON.stringify(this.state.obj)}</h2>
        <h2>{this.state.func + ''}</h2>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("app"))
```

**补充: 为什么`null`、`undefined`、`Boolean`在 JSX 中要显示为空内容呢?**

原因是在开发中, 我们会进行很多的判断

- 在判断结果为`false`时, 不显示一个内容
- 在判断结果为`true`时, 显示一个内容

```react
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      flag: false
    }
  }

  render() {
    return (
      <div>
        {this.state.flag ? <h2>我是标题</h2>: null}
        {this.state.flag && <h2>我是标题</h2>}
      </div>
    )
  }
}
```

### JSX 嵌入表达式

JSX 中, 也可以是一个**表达式**

```react
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: 'lion',
      lastName: 'coder',
      age: 20
    }
  }

  render() {
    const { firstName, lastName } = this.state
    return (
      <div>
        {/* 运算表达式 */}
        <h2>{firstName + ' ' + lastName}</h2>
        {/* 三元运算符 */}
        <h2>{this.state.age >= 18 ? '成年人': '未成年人'}</h2>
        {/* 执行一个函数 */}
        <h2>{this.sayHello('lion')}</h2>
      </div>
    )
  }

  sayHello(name) {
    return 'Hello ' + name
  }
}
```

### JSX 绑定属性

很多时候, 描述的 HTML 元素会有一些属性, 而我们希望这些属性也是动态的, 如

- 元素的`title`属性

- `img`元素的`src`属性

- `a`元素的`href`属性

- 元素的`class`属性

  - 注意: 绑定`class`比较特殊, 因为`class`在 JS 中是一个关键字, 所以 JSX 中不允许直接写`class`
  - 写法: 使用`className`替代
  
- 元素使用内联样式`style`

  - `style`后面跟的是一个对象类型, 对象的键值对是样式的**属性名**和**属性值**
  - 注意: 这里要将属性名转成**驼峰标识**, 而不是使用连接符`-`

```react
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '你好啊',
      imgUrl: 'https://www.coderlion.com/images/user_img.jpeg',
      link: 'https://www.baidu.com',
      active: true
    }
  }

  render() {
    return (
      <div>
        <h2 title={this.state.title} style={{ fontSize: '18px', color: 'red' }}>Hello World</h2>
        <img src={this.state.imgUrl} style={{ width: '100px', height: '100px' }} alt="" />
        <a href={this.state.link} target="_blank">百度一下</a>

        {/* 两种方式都可以动态添加 class */}
        <div className={'message '' + (this.state.active ? 'active' : '')}>你好啊</div>
        <div className={['message', (this.state.active ? 'active' : '')].join(' ')}>你好啊</div>
      </div>
    )
  }
}
```

## JSX 事件监听

### 与原生绑定的区别

如果原生 DOM 元素有一个监听事件, 我们如何操作呢?

1. 获取 DOM 元素, 添加监听事件
2. 在 HTML 元素中, 直接绑定`onclick`

这里演练一下第二种方式

```html
<button onclick="btnClick()">button</button>
<script>
  function btnClick() {
    console.log('click')
  }
</script>
```

`btnClick()`这样写的原因是`onclick`绑定的后面是跟上 JavaScript 代码

我们来实现一下 React 中的事件监听, 这里主要有两点不同

1. React 事件的命名采用**小驼峰式(camelCase)**, 而不是纯小写
2. 我们需要通过`{}`传入一个事件处理函数, 这个函数会在事件发生时被执行

```react
class App extends React.Component {
  constructor() {
    super()
  }
  
  render() {
    return (
      <div>
        <button onClick={this.btnClick}>button</button>
      </div>
    )
  }

  btnClick() {
    console.log('click')
  }
}
```

### this 绑定问题

在事件执行后, 我们可能需要获取当前类的对象中相关的属性

- 比如我们这里打印: `this.state.message`

  - 但是这里会报错: `Cannot read property 'state' of undefined`
- 原因是`this`在这里是`undefined`

```react
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'Hello React'
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.btnClick}>button</button>
      </div>
    )
  }

  btnClick() {
    // undefined
    console.log(this)
    // Cannot read property 'state' of undefined
    console.log(this.state.message)
  }
}
```

为什么`this`会是`undefined`呢?

- 原因是`btnClick`函数并不是我们主动调用的, 而且当`button`发生点击时, React 内部调用了`btnClick`函数
- 而它内部调用时, 并不知道要如何绑定正确的`this`

#### bind 给 btnClick 显示绑定 this

在传入函数时, 我们可以主动绑定`this`

- 这里我们主动将`btnClick`中的`this`通过`bind`来进行绑定(显示绑定)
- 那么之后 React 内部调用`btnClick`函数时, 就会有一个`this`, 并且是我们绑定的`this`

```jsx
<button onClick={this.btnClick.bind(this)}>button</button>
```

但是呢, 如果我有两个函数都需要用到`btnClick`的绑定

我们发现`bind(this)`需要书写两遍

```jsx
<button onClick={this.btnClick.bind(this)}>button1</button>
<button onClick={this.btnClick.bind(this)}>button2</button>
```

这个问题我们可以通过在构造方法中直接给`this.btnClick`绑定`this`来解决

- 注意查看`constructor`中我们的操作`this.btnClick = this.btnClick.bind(this)`

```react
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'Hello React'
    }

    this.btnClick = this.btnClick.bind(this)
  }

  render() {
    return (
      <div>
        <button onClick={this.btnClick}>button1</button>
        <button onClick={this.btnClick}>button2</button>
      </div>
    )
  }

  btnClick() {
    console.log(this)	// App
    console.log(this.state.message) // Hello React
  }
}
```

#### 使用 ES6 class fields 语法

你会发现我这里将`btnClick`的定义变成了一种赋值语句

- 这里 ES6 中给类定义属性的方法, 称之为 **class fields** 语法
- 因为这里我们赋值时, 使用了箭头函数, 所以在当前函数中的`this`会去上一个**作用域**中查找
- 而上一个作用域的`this`就是当前对象`App`

```react
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'Hello React'
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.btnClick}>button1</button>
        <button onClick={this.btnClick}>button2</button>
      </div>
    )
  }

  btnClick = () => {
    console.log(this)	// App
    console.log(this.state.message) // Hello React
  }
}
```

#### 事件监听时传入箭头函数(推荐)

因为`onClick`中要求我们传入一个函数, 那么我们可以直接定义一个箭头函数传入

- 传入的箭头函数的函数体是我们需要执行的代码, 我们直接执行`this.btnClick()`
- `this.btnClick()`中通过`this`来指定会进行隐式绑定, 最终`this`也是正确的

```react
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'Hello React'
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.btnClick()}>button1</button>
        <button onClick={() => this.btnClick()}>button2</button>
      </div>
    )
  }

  btnClick() {
    console.log(this)	// App
    console.log(this.state.message) // Hello React
  }
}
```

### 事件参数传递

在执行事件函数时, 有可能我们需要获取一些参数信息, 例如`event`对象, 其他参数等

#### 获取 event 对象

很多使用我们需要拿到`event`对象来做一些事情(比如阻止默认行为)

假如我们用不到`this`, 那么可以直接传入函数就可以获取到`event`对象

```react
class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <a href="http://www.baidu.com" onClick={this.btnClick}>百度一下</a>
      </div>
    )
  }

  btnClick(event) {
    event.preventDefault()	// 阻止 a 标签默认行为
    console.log(event)	// event object
  }
}
```

#### 获取更多参数

有更多参数时, 我们最好的方式就是传入一个箭头函数, 主动执行的事件函数, 并且传入相关的其他参数

```react
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      names: ['衣服', '鞋子', '裤子']
    }
  }

  render() {
    return (
      <div>
        <a href="http://www.baidu.com" onClick={this.aClick}>百度一下</a>

        {
          this.state.names.map((item, index) => {
            return (
              <a href="#" onClick={event => this.aClick(event, item, index)}>{item}</a>
            )
          })
        }
      </div>
    )
  }

  aClick(event, item, index) {
    e.preventDefault()
    console.log(item, index)
    console.log(event)
    /*
      百度一下: undefined, undefined, event object
      衣服: '衣服', 0, event object
      鞋子: '鞋子', 1, event object
      裤子: '裤子', 2, event object
    */
  }
}
```

## 条件渲染

某些情况下, 界面的内容会根据不同的情况显示不同的内容, 或者决定是否渲染某部分内容

- 在 Vue 中, 我们一般通过指令来控制: `v-if`、`v-show`
- 在 React 中, 所有的条件判断都和普通的 JavaScript 代码一致

### 条件判断语句

一种方式是当逻辑较多时, 通过条件判断

```react
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true
    }
  }

  render() {
    let titleJsx = null
    if (this.state.isLogin) {
      titleJsx = <h2>欢迎回来~</h2>
    } else {
      titleJsx = <h2>请先登录~</h2>
    }

    return (
      <div>
        {titleJsx}
      </div>
    )
  }
}
```

### 三元运算符

另外一种实现条件渲染的方法就是**三元运算符**

三元运算符适用于没有太多逻辑的代码: 只是根据不同的条件直接返回不同的结果

```react
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true
    }
  }

  render() {
    const { isLogin } = this.state
    return (
      <div>
        <h2>{isLogin ? '欢迎回来~': '请先登录~'}</h2>
        <button onClick={e => this.loginBtnClick()}>{isLogin ? '退出': '登录'}</button>
      </div>
    )
  }

  loginBtnClick() {
    this.setState({
      isLogin: !this.state.isLogin
    })
  }
}
```

### 与运算符 &&

在某些情况下, 我们会遇到这样的场景

- 如果条件成立, 渲染某一个组件
- 反之, 什么内容都不渲染

如果我们使用三元运算符, 是如何做呢?

```react
{this.state.isLogin ? <h2>{this.state.username}</h2> : null}
```

其实我们可以通过**逻辑与 &&** 来简化操作

```react
{this.state.isLogin && <h2>{this.state.username}</h2>}
```

### v-show 效果

针对一个 HTML 元素, 渲染和不渲染之间, 如果切换的非常频繁, 那么会相对比较损耗性能

- 在开发中,其实我们可以通过`display`的属性来控制它的显示和隐藏
- 这种控制方式在 Vue 中有一个专门的指令: `v-show`
- React 没有指令, 但是 React 会更加灵活(灵活带来的代价就是需要自己实现)

```react
render() {
  const { isLogin, username } = this.state
  const nameDisplay = isLogin ? 'block': 'none'

  return (
    <div>
      <h2 style={{display: nameDisplay}}>{username}</h2>
      <button onClick={e => this.loginBtnClick()}>{isLogin ? '退出': '登录'}</button>
    </div>
  )
}
```

## JSX 列表渲染

### 列表渲染

真实开发中我们会从服务器请求到大量的数据, 数据会以列表的形式存储

- 如歌曲、歌手、排行榜列表的数据
- 如商品、购物车、评论列表的数据
- 如好友消息、动态、联系人列表的数据

在 React 中并没有像 Vue 模版语法中的`v-for`指令, 而且需要我们通过 JavaScript 代码的方式组织数据, 转成 JSX

- 在 React 中, 展示类标最多的方式就是使用数组的`map`高阶函数

```react
let new_array = arr.map(function callback(currentValue, index, array) {
 // Return element for new_array 
}, thisArg)
```

- `callback`: 生成新数组元素的回调函数, 使用三个参数:
  - `currentValue`: 数组中正在处理的当前元素
  - `index`(可选): 数组中正在处理的当前元素的索引
  - `array`(可选): `map`方法调用的数组
  
- `shitArg`(可选): 执行`callback`函数时值被用作`this`

```react
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      musics: ['My World', 'No Name', 'Freedom', 'White Angel', 'The Way']
    }
  }

  render() {
    return (
      <div>
        <h2>歌曲列表</h2>
        <ul>
          {
            this.state.musics.map(item => <li>{item}</li>)
          }
        </ul>
      </div>
    )
  }
}
```

### 数组处理

很多时候我们在展示一个数组中的数据之前, 需要先对它进行一些处理

- 如过滤掉一些内容: `filter`函数
- 如截取数组中的一部分内容: `slice`函数

例如这样一列数字: `[10, 30, 77, 24, 99, 95, 21, 111, 233, 311]`

案例需求: 获取所有大于 50 的数字, 并展示前 3 个数字

```react
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      numbers: [10, 30, 77, 24, 99, 95, 21, 111, 233, 311]
    }
  }

  render() {
    const { numbers } = this.state
  
    return (
      <div>
        <h2>数字列表</h2>
        <ul>
          {
            numbers.filter(item => item > 50).slice(0, 3).map(item => <li>{item}</li>)
          }
        </ul>
      </div>
    )
  }
}
```

### 列表的 key

我们会发现在前面的代码中只要展示列表都会报一个**警告**

[![tvdTAA.png](https://s1.ax1x.com/2020/06/13/tvdTAA.png)](https://s1.ax1x.com/2020/06/13/tvdTAA.png)

这个警告是告诉我们需要在列表展示的 JSX 中添加一个`key`值

至于如何添加一个`key`, 为什么要添加一个`key`, 这个我们放到后面讲解`setState`时再来讨论
