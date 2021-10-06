---
title: JSX原理解析
date: 2020-06-13 19:41:11
tags: JSX
categories: 
- React
---

## JSX 转换本质

实际上, JSX 仅仅只是`React.createElement(component, props, ...children)`函数的语法糖

- 所有的 JSX 最终都会被转换成`React.createElement`的函数调用

`React.createElement`在源码的什么位置呢?

<!-- more -->

[![tzaYsU.png](https://s1.ax1x.com/2020/06/14/tzaYsU.png)](https://s1.ax1x.com/2020/06/14/tzaYsU.png)

`createElement`需要传递三个参数

1. `type`
   - 当前`ReactElement`的类型
   - 如果是标签元素, 那么就使用字符串表示`"div"`
   - 如果是组件元素, 那么就直接使用组件的名称
   
2. `config`
   - 所有 JSX 中的属性都在`config`中以对象的属性和值的形式存储
   
3. `children`
   - 存放在标签中的内容, 以`children`数组的方式进行存储
   - 当然, 如果是多个元素呢? React 内部有对它们进行处理

对`children`进行处理

- 从第二个参数开始, 将其他所有的参数放到`props`对象的`children`中

```javascript
const childrenLength = arguments.length - 2
if (childrenLength === 1) {
  props.children = children
} else if (childrenLength > 1) {
  const childArray = Array(childrenLength)
  for (let i = 0; i < childrenLength; i++) {
    childArray[i] = arguments[i + 2]
  }
  if (__DEV__) {
    if (Object.freeze) {
      Object.freeze(childArray)
    }
  }
  props.children = childArray
}
```

真实的转换过程到底长什么样子呢? 我们可以从多个角度来查看

### Babel 官网查看

默认 JSX 是通过 Babel 帮我们进行语法转换的, 所以我们之前写的 JSX 代码都需要依赖 Babel

- 可以在 Babel 的官网中快速查看转换的过程https://babeljs.io/repl#?presets=react

在这里我们编写一些 JSX 代码, 来查看运行后的结果

```html
<div className="app">
  <div className="header">
    <h1 title="标题">我是网站标题</h1>
  </div>
  <div className="content">
    <h2>我是h2元素</h2>
    <button onClick={e => console.log('+1')}>+1</button>
    <button onClick={e => console.log('-1')}>-1</button>
  </div>
  <div className="footer">
    <p>我是网站的尾部</p>
  </div>
</div>
```

[![tzsfnx.png](https://s1.ax1x.com/2020/06/14/tzsfnx.png)](https://s1.ax1x.com/2020/06/14/tzsfnx.png)

### 编写 createElement

还有一种办法是我们自己来编写`React.createElement`代码

```react
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    /*#__PURE__*/
    const result = React.createElement('div', {
      className: 'app'
    }, /*#__PURE__*/React.createElement('div', {
      className: 'header'
    }, /*#__PURE__*/React.createElement('h1', {
      title: '\u6807\u9898'
    }, '\u6211\u662F\u7F51\u7AD9\u6807\u9898')), /*#__PURE__*/React.createElement('div', {
      className: 'content'
    }, /*#__PURE__*/React.createElement('h2', null, '\u6211\u662Fh2\u5143\u7D20'), /*#__PURE__*/React.createElement('button', {
      onClick: e => console.log('+1')
    }, '+1'), /*#__PURE__*/React.createElement('button', {
      onClick: e => console.log('-1')
    }, '-1')), /*#__PURE__*/React.createElement('div', {
      className: 'footer'
    }, /*#__PURE__*/React.createElement('p', null, '\u6211\u662F\u7F51\u7AD9\u7684\u5C3E\u90E8')))
    return result
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'))
```

上面的整个代码, 我们就没有通过 JSX 来书写了, 界面依然是可以正常渲染的

另外, 在这样的情况下, 你还需要 Babel 相关的内容吗? 不需要了

- 所以, `type="text/babel"`可以被我们删掉了
- 所以, `<script src="./babel.min.js"></script>`也可以被我们删掉了

## 虚拟 DOM

### 虚拟 DOM 的创建过程

我们通过`React.createElement`最终创建出一个`ReactElement`对象

```react
return ReactElement(
  type,
  key,
  ref,
  self,
  source,
  ReactCurrentOwner.current,
  props,
)
```

这个`ReactElement`对象有什么作用呢? React 为什么要创建它?

- 原因是 React 利用 ReactElement 对象组成了一个 JavaScript 的对象树
- JavaScript 的对象树就是大名鼎鼎的**虚拟 DOM (Virtual DOM)**

如何查看 `ReactElement` 的树结构呢?

- 我们可以将之前的 JSX 返回结果进行打印

```react
render() {
  const jsx = (
    <div className="app">
      <div className="header">
        <h1 title="标题">我是网站标题</h1>
      </div>
      <div className="content">
        <h2>我是h2元素</h2>
        <button onClick={e => console.log('+1')}>+1</button>
        <button onClick={e => console.log('-1')}>-1</button>
      </div>
      <div className="footer">
        <p>我是网站的尾部</p>
      </div>
    </div>
  )
  
  console.log(jsx)
  return jsx
}
```

[![tzyM8J.png](https://s1.ax1x.com/2020/06/14/tzyM8J.png)](https://s1.ax1x.com/2020/06/14/tzyM8J.png)

而`ReactElement`最终形成的树结构就是 **Virtual DOM**

整体转换过程如下

[![tzcrAf.png](https://s1.ax1x.com/2020/06/14/tzcrAf.png)](https://s1.ax1x.com/2020/06/14/tzcrAf.png)

### 为什么采用虚拟 DOM

为什么要采用虚拟 DOM, 而不是直接修改真实 DOM 呢?

- 很难跟踪状态发生的改变: 原有的开发模式, 我们很难跟踪到状态发生的改变, 不方便针对我们应用程序进行调试
- 操作真实 DOm 性能较低: 传统的开发模式会进行频繁的 DOM 操作, 而这一做法性能非常低

**DOM 操作性能低:**

首先, `document.createElement`本身创建出来的就是一个非常复杂的对象

- https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement

其次, DOM 操作会引起浏览器的**回流**和**重绘**, 所以在开发中应该避免频繁的操作 DOM

例如我们有一个数组需要渲染: `[0, 1, 2, 3, 4]`, 我们一般怎么做?

```html
<ul>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```

后来, 我们又增加了 5 条数据: `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`

```javascript
for (let i = 5; i < 10; i++) {
  let li = document.createElement('li')
  li.innerHTML = arr[i]
  ul.appendChild(li)
}
```

上面这种代码的性能怎么样? **非常低效**

- 因为我们通过`document.createElement`创建元素, 再通过`ul.appendChild(li)`渲染到 DOM 上, 进行了多次 DOM 操作
- 对于批量操作, 最好的办法不是一次次修改 DOM, 而是对批量的操作进行合并(比如可以通过`DocumentFragment`进行合并)

**虚拟 DOM 帮助我们从命令式编程转到了声明式编程的模式**

> React 官方说法: Virtual DOM 是一种编程理念

在这个理念中, UI 以一种理想化或者说虚拟化的方式保存在内存中, 并且它是一个相对简单的 JavaScript 对象, 我们可以通过`ReactDOM.render`让**虚拟 DOM** 和**真实 DOM** 同步起来, 这个过程叫做协调(Reconciliation)

这种编程的方式赋予了 React 声明式的 API: 你只需要告诉 React 希望让 UI 是什么状态, React 来确保 DOM 和这种状态是匹配的

你不需要直接进行 DOM 操作, 可以从手动修改 DOM、属性操作、事件处理中解放出来
