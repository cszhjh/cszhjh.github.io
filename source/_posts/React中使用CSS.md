---
title: React中使用CSS
date: 2020-07-08 07:19:12
tags: React-CSS
categories: 
- React
---

## 前言

> 整个前端已经是组件化的天下, 而 CSS 的设计就不是为了组件化而生的, 所以在目前组件化的框架中都需要一种合适的 CSS 解决方案

## React 中的 CSS 方案

### React 中的 CSS

事实上, CSS 一直是 React 的痛点, 也是被很多开发者吐槽、诟病的一个点

在组件化中选择合适的 CSS 解决方案应该符合以下条件

- 可以编写局部 CSS: CSS 具备自己的作用域, 不会随意污染其他组件内的元素
- 可以编写动态 CSS: 可以获取当前组件的一些状态, 根据状态的变化生成不同的 CSS 样式
- 支持所有的 CSS 特性: 伪类、动画、媒体查询等
- 编写起来简洁方便、最好符合一贯的 CSS 风格特点

<!-- more -->

在这一点上, Vue 做的要远远好于 React

- Vue 通过在`.vue`文件中编写`<style></style>`标签来编写自己的样式
- 通过是否添加`scoped`属性来决定编写的样式是全局有效还是局部有效
- 通过`lang`属性来设置你喜欢的`less`、`sass`等预处理器
- 通过内联样式风格的方式来根据最新状态设置和改变 CSS

Vue 在 CSS 上虽然不能称之为完美, 但是已经足够简介、自然、方便了, 至少统一的样式风格不会出现多个开发人员、多个项目采用不一样的样式风格

相比而言, React 官方并没有给出在 React 中统一的样式风格

- 由此, 从普通的 CSS, 到 CSS Modules, 再到 CSS in JS, 有几十种不同的解决方案, 但是到目前为止也没有统一的方案

在这篇文章中, 我会介绍挑选四种解决方案来介绍

1. 内联样式的写法
2. 普通的 CSS 写法
3. CSS Modules
4. CSS in JS(styled-components)

### 普通的解决方案

#### 内联样式

内联样式是官方推荐的一种 CSS 样式的写法

- `style`接受一个采用**小驼峰命名**属性的 JavaScript 对象, 而不是 CSS 字符串
- 并且可以引用`state`中的状态来设置相关的样式

```react
import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      titleColor: 'red'
    }
  }

  render() {
    return (
      <div>
        <h2 style={{ color: this.state.titleColor, fontSize: '20px' }}>
          我是App标题
        </h2>
        <p style={{ color: 'green', textDecoration: 'underline' }}>
          我是一段文字描述
        </p>
      </div>
    )
  }
}
```

内联样式的优点

1. 样式之间不会有冲突
2. 可以动态获取当前`state`中的状态

内联样式的缺点

1. 写法上都需要使用驼峰标识
2. 某些样式没有提示
3. 大量的样式, 代码混乱
4. 某些样式无法编写(比如伪类、伪元素)

所以官方依然是希望内联样式和普通的 CSS 来结合编写

#### 普通的 CSS

普通的 CSS 我们通常会编写到一个单独的文件

`App.js`中编写 React 逻辑代码

```react
import React, { PureComponent } from 'react'

import Home from './Home'

import './App.css'

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <h2 className="title">我是App的标题</h2>
        <p className="desc">我是App中的一段文字描述</p>
        <Home />
      </div>
    )
  }
}
```

`App.css` 中编写 React 样式代码

```css
.title {
  color: red;
  font-size: 20px;
}

.desc {
  color: green;
  text-decoration: underline;
}
```

这样的编写方式和普通的网页开发中编写方式是一致的

- 如果我们按照普通的网页标准去编写, 那么也不会有太大的问题
- 但是组件化开发中我们总是希望组件是一个独立的模块, 即便是样式也只是在自己内部生效, 不会相互影响
- 但是普通的 CSS 都属于全局的 CSS, 样式之间会相互影响

比如编写`Home.js`的逻辑代码

```react
import React, { PureComponent } from 'react'

import './Home.css'

export default class Home extends PureComponent {
  render() {
    return (
      <div className="home">
        <h2 className="title">我是Home标题</h2>
        <span className="desc">我是Home中的span段落</span>
      </div>
    )
  }
}
```

又编写了`Home.css`的样式代码

```css
.title {
  color: orange;
}

.desc {
  color: purple;
}
```

最终样式之间会相互层叠, 只有一个样式会生效

#### CSS Modules

CSS Modules 并不是 React 特有的解决方案, 而是所有使用了类似于 Webpack 配置的环境下都可以使用的

但是, 如果在其他项目中使用, 那么我们需要自己来进行配置, 比如配置`webpack.config.js`中的`modules: true`等

但是 React 的脚手架已经内置了 CSS Modules 的配置

- `.css`/`.less`/`.scss`等样式文件都修改成`.module.css`/`.module.less`/`.module.scss`等
- 之后就可以引用并使用了

使用方法如下

[![UVlDLF.png](https://s1.ax1x.com/2020/07/08/UVlDLF.png)](https://s1.ax1x.com/2020/07/08/UVlDLF.png)

这种 CSS 使用方式最终生成的`class`名称将会是全局唯一的

[![UVlBsU.png](https://s1.ax1x.com/2020/07/08/UVlBsU.png)](https://s1.ax1x.com/2020/07/08/UVlBsU.png)

CSS Modules 确实解决了局部作用域的问题, 也是很多人喜欢在 React 中使用的一种方案

但是这种方案也有自己的缺陷

- 引用的类名, 不能使用连接符(`.home-title`), 在 JavaScript 中是不识别的
- 所有的`className`都必须使用`{styles.className}`的形式来编写
- 不方便动态来修改某些样式, 依然需要使用内联样式的方式

如果你觉得上面的缺陷还算 OK, 那么你在开发中完全可以选择使用 CSS Modules 来编写, 而且它也是在 React 中很受欢迎的一种方式

## CSS in JS

### 认识 CSS in JS

实际上, 官方文档也有提到过 CSS in JS 这种方案

- “CSS-in-JS”是指一种模式, 其中 CSS 由 JavaScript 生成而不是定义在外部文件中
- *注意此功能并不是 React 的一部分, 而是由第三方库提供*, React 对样式如何定义并没有明确态度

在传统的前端开发中, 我们通常会将结构(HTML)、样式(CSS)、逻辑(JavaScript)进行分离

- 但是在 React 的思想中认为逻辑本身和 UI 是无法分离的, 所以才会有了 JSX 的语法
- 样式呢? 样式也是属于 UI 的一部分
- 事实上 CSS-in-JS 的模式就是一种将样式(CSS)也写入到 JavaScript 中的方式, 并且可以方便的使用 JavaScript 的状态
- 所以 React 也被人称之为 **All in JS**

当然, 这种开发的方式也受到了很多的批评

- [Stop using CSS in JavaScript for web development](https://hackernoon.com/stop-using-css-in-javascript-for-web-development-fa32fb873dcc)

批评声音虽然有, 但是在我们看来很多优秀的 CSS-in-JS 的库依然非常强大、方便

- CSS-in-JS 通过 JavaScript 来为 CSS 赋予一些能力, 包括类似于 CSS 预处理器一样的样式嵌套、函数定义、逻辑复用、动态修改状态等等
- 虽然 CSS 预处理器也具备某些能力, 但是获取动态状态依然是一个不好处理的地方
- **所以, 目前可以说 CSS-in-JS 是 React 编写 CSS 最为受欢迎的一种解决方案**

目前比较流行的 CSS-in-JS 的库有哪些呢?

- styled-components
- emotion
- glamorous

目前可以说 styled-components 依然是社区最流行的 CSS-in-JS 库, 所以我以 styled-components 的讲解为主

安装 styled-components

```shell
yarn add styled-components
```

### styled-components

#### 标签模板字符串

ES6 中添加了**模版字符串**语法, 这个对于很多人来说都会使用

但是模版字符串还有另一种用法: 标签模版字符串(Tagged Template Literals)

我们一起来看一个普通的 JavaScript 函数

```javascript
function foo(...args) {
  console.log(args)  // ['Hello World']
}

foo('Hello World')
```

正常情况下, 我们都是通过`函数名()`方式来对函数进行调用, 其实函数还有另一种调用方式

```javascript
foo`Hello World`  // [['Hello World']]
```

如果我们在调用的时候插入其他的变量

- 模版字符串被拆分
- 第一个元素是数组, 是被模块字符串拆分的字符串组合
- 后面的元素是一个个模块字符串传入的内容

```javascript
let name = 'lion'
foo`Hello ${name}`	// [['Hello ', ''], 'lion']
```

在 styled-components 中, 就是通过这种方式来解析模块字符串, 最终生成我们想要的样式

#### styled 基本使用

styled-components 的本质是通过函数的调用, 最终创建出一个**组件**

- 这个组件会被自动添加上一个不重复的`class`
- styled-components 会给该`class`添加相关的样式

比如我们正常开发出来的`Home`组件是这样的格式

```html
<div>
  <h2>我是Home标题</h2>
  <ul>
    <li>我是列表1</li>
    <li>我是列表2</li>
    <li>我是列表3</li>
  </ul>
</div>
```

我们希望给外层的`div`添加一个特殊的`class`, 并且添加相关的样式

[![UVYFMt.png](https://s1.ax1x.com/2020/07/08/UVYFMt.png)](https://s1.ax1x.com/2020/07/08/UVYFMt.png)

[![UVYGZT.png](https://s1.ax1x.com/2020/07/08/UVYGZT.png)](https://s1.ax1x.com/2020/07/08/UVYGZT.png)

另外, 它支持类似于 CSS 预处理器一样的样式嵌套

- 支持直接子代选择器或后代选择器, 并且直接编写样式
- 可以通过`&`获取当前元素
- 直接伪类选择器、伪元素等

```javascript
const HomeWrapper = styled.div`
  color: purple;

  h2 {
    font-size: 50px;
  }

  ul > li {
    color: orange;

    &:active {
      color: red;
    }

    &:hover {
      background-color: #aaa;
    }

    &::after {
      content: 'abc';
    }
  }
`
```

[![UVtscn.png](https://s1.ax1x.com/2020/07/08/UVtscn.png)](https://s1.ax1x.com/2020/07/08/UVtscn.png)

#### props、attrs 属性

**`props` 可以穿透**

定义一个`styled`组件

```javascript
const LionInput = styled.input`
  boder-color: red;
  
  &:focus {
    outline-color: orange;
  }
`
```

使用`styled`组件

```jsx
<LionInput type="password" />
```

**`props`可以被传递给`styled`组件**

```jsx
<HomeWrapper color="blue"></HomeWrapper>
```

使用时可以获取到传入的`color`

- 获取`props`需要通过`${}`传入一个插值函数, `props`会作为该函数的参数
- 这种方式可以有效的解决动态样式的问题

```javascript
const HomeWrapper = styled.div`
  color: ${props => props.color};
`
```

**添加`attrs`属性**

```javascript
const LionInput = styled.input.attrs({
  placeholder: '请填写密码',
  paddingLeft: props => props.left || '5px'
})`
  border-color: red;
  padding-left: ${props => props.paddingLeft};

  &:focus {
    outline-color: orange;
  }
`
```

#### styled 高级特性

**支持样式的继承**

编写`styled`组件

```javascript
const LionButton = styled.button`
  padding: 8px 30px;
  border-radius: 5px;
`

const LionWarnButton = styled(LionButton)`
  background-color: red;
  color: #fff;
`

const LionPrimaryButton = styled(LionButton)`
  background-color: green;
  color: #fff;
`
```

按钮的使用

```jsx
<LionButton>我是普通按钮</LionButton>
<LionWarnButton>我是警告按钮</LionWarnButton>
<LionPrimaryButton>我是主要按钮</LionPrimaryButton>
```

**`styled`设置主题**

在全局定制自己的主题, 通过`Provider`进行共享

```react
import { ThemeProvider } from 'styled-components`

<ThemeProvider theme={{ color: 'red', fontSize: '30px' }}>
  <Home />
  <Profile />
</ThemeProvider>
```

在`styled`组件中可以获取到主题的内容

```javascript
const ProfileWrapper = styled.div`
  color: ${props => props.theme.color};
  font-size: ${props => props.theme.fontSize};
`
```

### classnames

**Vue 中添加`class`**

在 Vue 中给一个元素添加动态的`class`时一件非常简单的事情

你可以通过传入一个对象

```jsx
<div 
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
/></div>
```

你也可以传入一个数组

```jsx
<div :class="[activeClass, errorClass]"></div>
```

甚至是对象和数组混合使用

```jsx
<div :class="[{ active: isActive}, errorClass]"></div>
```

**React 中添加 class**

React 在 JSX 中给了我们开发者足够多的灵活性, 你可以像编写 JavaScript 代码一样, 通过一些逻辑来决定是否添加某些`class`

```react
import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isActive: true
    }
  }

  render() {
    const { isActive } = this.state

    return (
      <div>
        <h2 className={'title ' + (isActive ? 'active' : '')}>
          我是标题
        </h2>
        <h2 className={['title', isActive ? 'active' : ''].join(' ')}>
          我是标题
        </h2>
      </div>
    )
  }
}
```

这个时候我们可以借助于一个第三方库: **classnames**

- 很明显, 这是一个用于动态添加`className`的一个库

我们来使用以下最常见的用法

```react
classNames('foo', 'bar') // 'foo bar'
classNames('foo', { bar: true }) // 'foo bar'
classNames({ 'foo-bar': true }) // 'foo-bar'
classNames({ 'foo-bar': false }) // ''
classNames({ foo: true }, { bar: true }) // 'foo bar'
classNames({ foo: true, bar: true }) // 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }) // 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '') // 'bar 1'
```
