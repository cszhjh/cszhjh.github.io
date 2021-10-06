---
title: 深入理解setState
date: 2020-06-25 16:14:51
tags: setState
categories: 
- React
---

## 为什么使用 setState

回到最早的案例, 当点击一个**改变文本**的按钮时, 修改界面显示的内容

[![tIyydK.png](https://s1.ax1x.com/2020/06/10/tIyydK.png)](https://s1.ax1x.com/2020/06/10/tIyydK.png)

```react
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Hello World'
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <button onClick={e => this.changeText()}>改变文本</button>
      </div>
    )
  }

  changeText() {
    // ...
  }
}
```

<!-- more -->

**关键是`changeText`中应该如何实现?**

我们是否可以通过直接修改`state`中的`message`来修改界面呢?

```react
changeText() {
  this.state.message = 'Hello React'
}
```

- 点击不会有任何反应, 为什么呢?
- 因为我们修改了`state`之后, 希望 React 根据最新的`state`来重新渲染界面, 但是这种方式的修改, React 并不知道数据发生了变化
- React 并没有实现类似于 Vue2 中的`Object.defineProperty`或者 Vue3 中的`Proxy`的方式来监听数据的变化
- 我们必须通过`setState`来告知 React 数据已经发生了变化

在组件中并没有实现`setState`的方法, 为什么可以直接调用呢?

原因很简单, `setState`方法是从`Component`中继承过来的

```react
Component.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === 'object' ||
      typeof partialState === 'function' ||
      partialState == null,
    'setState(...): takes an object of state variables to update or a ' +
      'function which returns an object of state variables.',
  );
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
```

[![NB869s.png](https://s1.ax1x.com/2020/06/25/NB869s.png)](https://s1.ax1x.com/2020/06/25/NB869s.png)

所以, 我们可以通过调用`setState`来修改数据

- 当我们调用`setState`时, 会重新执行`render`函数, 根据最新的`state`来创建`ReactElement`对象
- 再根据最新的`ReactElement`对象, 对 DOM 进行修改

```react
changeText() {
  this.setState({
    message: 'Hello React'
  })
}
```

## setState 异步更新

```react
changeText() {
  this.setState({
    message: 'Hello React'
  })
  console.log(this.state.message) // Hello World
}
```

最终打印结果是“Hello World”, 可见`setState`是异步的操作, 我们并不能在执行完`setState`之后立刻拿到最新的`state`

为什么`setState`设计为异步呢?

- `setState`设计为异步其实之前在 [GitHub](https://github.com/) 上也有很多的讨论
- React 核心成员(Redux 作者) Dan Abramov 也有对应的[回复](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

**简单总结:**

- `setState`设计为异步, 可以显著的提升性能
  - 如果每次调用`setState`都进行一次更新, 那么意味着`render`函数会被频繁调用, 界面重新渲染, 效率非常低下
  - 比较好的办法应该是获取到多个更新, 之后进行批量更新

- 如果同步更新, 但是还没有执行`render`函数, 那么`state`和`props`不能保持同步

  - `state`和`props`不能保持一致性, 会导致在开发中引发很多的问题

那么如何可以获取更新后的`state`呢?

- `setState`接受两个参数: 第二个参数是一个回调函数, 这个回调函数会在更行后执行
- 格式为: `setState(partialState, callback)`

```react
changeText() {
  this.setState({
    message: 'Hello React'
  }, () => console.log(this.state.message)) // Hello React
}
```

当然, 我们也可以在生命周期函数中获取更新后的`state`

```react
componentDidUpdate(prevProps, prevState, snapshot) {
  console.log(this.state.message) // Hello React
}
```

## setState 一定是异步吗?

验证一: 在`setTimeout`中的更新

```react
changeText() {
  setTimeout(() => {
    this.setState({
      message: 'Hello React'
    })
    console.log(this.state.message) // Hello React
  }, 0)
}
```

验证二: 原生 DOM 事件

```react
componentDidMount() {
  const btnEl = document.getElementById('btn')
  btnEl.addEventListener('click', e => {
    this.setState({
      message: 'Hello React'
    })
    console.log(this.state.message) // Hello React
  })
}
```

分成两种情况

- 在组件**生命周期**、 **React 合成事件**中, `setState`是异步的
- 在`setTimeout`、**原生 DOM** 事件中, `setState`是同步的

React 中其实是通过一个函数来确定的: `enqueueSetState`部分实现

```react
enqueueSetState(inst, payload, callback) {
  const fiber = getInstance(inst);
  
  // 会根据 React 上下文计算一个当前时间
  const currentTime = requestCurrentTimeForUpdate();
  const suspenseConfig = requestCurrentSuspenseConfig();
  
  // 这个函数会返回当前是同步还是异步更新(准确的说是优先级)
  const expirationTime = computeExpirationForFiber(
    currentTime,
    fiber,
    suspenseConfig,
  );

  const update = createUpdate(expirationTime, suspenseConfig);
  update.payload = payload;
  if (callback !== undefined && callback !== null) {
    if (__DEV__) {
      warnOnInvalidCallback(callback, 'setState');
    }
    update.callback = callback;
  }

  enqueueUpdate(fiber, update);
  scheduleWork(fiber, expirationTime);
}
```

[![NBdBfU.png](https://s1.ax1x.com/2020/06/25/NBdBfU.png)](https://s1.ax1x.com/2020/06/25/NBdBfU.png)

`computeExpirationForFiber`函数的部分实现

- `Sync`优先级最高, 即创建就更新

[![NB6aJ1.png](https://s1.ax1x.com/2020/06/25/NB6aJ1.png)](https://s1.ax1x.com/2020/06/25/NB6aJ1.png)

## setState 的合并

### 数据的合并

假如我们有这样的数据

```react
this.state = {
  name: 'coderlion',
  message: 'Hello World'
}
```

我们需要更新`message`

- 通过`setState`去修改`message`是不会对`name`产生影响的

```react
changeText() {
  this.setState({
    message: 'Hello React'
  })
}
```

为什么不会产生影响呢? 源码中其实是有对**原对象**和**新对象**进行合并的

- 事实上就是使用`Object.assign(target, ...sources)`来完成的

[![NB6qFs.png](https://s1.ax1x.com/2020/06/25/NB6qFs.png)](https://s1.ax1x.com/2020/06/25/NB6qFs.png)

### 多个 setState 合并

比如我们还是有一个`counter`属性, 记录当前的数字

```react
increment() {
  this.setState({
    counter: this.state.counter + 1
  })
  
  this.setState({
    counter: this.state.counter + 1
  })
  
  this.setState({
    counter: this.state.counter + 1
  })
}
```

上面代码执行完之后`counter`会变成几呢? 答案是 1

为什么呢? 因为它会对多个`state`进行合并

其实在源码的`processUpdateQueue`中有一个`do...while`循环, 就是从队列中取出多个`state`进行合并的

[![NBcG1P.png](https://s1.ax1x.com/2020/06/25/NBcG1P.png)](https://s1.ax1x.com/2020/06/25/NBcG1P.png)

如何可以做到让`counter`最终变成 3 呢?

```react
increment() {
  this.setState((state, props) => ({ counter: state.counter + 1 }))
  
  this.setState((state, props) => ({ counter: state.counter + 1 }))
  
  this.setState((state, props) => ({ counter: state.counter + 1 }))
}
```

为什么传入一个函数就可以变成 3 呢?

原因是多个`state`进行合并时, 每次遍历都会执行一次函数

[![NBgNgx.png](https://s1.ax1x.com/2020/06/25/NBgNgx.png)](https://s1.ax1x.com/2020/06/25/NBgNgx.png)

## React 更新机制

我们在前面已经学习 React 的渲染流程

[![NBWN2n.png](https://s1.ax1x.com/2020/06/25/NBWN2n.png)](https://s1.ax1x.com/2020/06/25/NBWN2n.png)

那么 React 的更新流程是什么呢?

[![NBfOfJ.png](https://s1.ax1x.com/2020/06/25/NBfOfJ.png)](https://s1.ax1x.com/2020/06/25/NBfOfJ.png)

React 在`props`或`state`发生改变时, 会调用 React 的`render`方法, 创建出一颗不同的树

React 需要基于这两棵不同的树之间的差别来判断如何有效的更新 UI

- 如果一棵树参考另外一棵树进行完全比较更新, 那么即使是最先进的算法, 该算法的时间复杂度为 O(n^3), 其中`n`是树中元素的数量, 具体参照[《A Survey on Tree Edit Distance and Related Problems》](https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)
- 如果在 React 中使用了该算法, 那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围
- 这个开销太过昂贵了, React 的更新性能会变得非常低效

于是, React 对于这个算法进行了优化, 将其优化成了 O(n), 如何优化的呢?

- 同层节点之间相互比较, 不会垮节点比较
- 不同类型的节点, 产生不同的树结构
- 开发中, 可以通过`key`来指定哪些节点在不同的渲染下保持稳定

## Diffing 算法

### 对比不同类型的元素

当节点为不同的与安素, React 会拆卸原有的树, 并且建立起新的树

- 当一个元素从`<a>`变成`<img>`, 从`<article>`变成`<comment>`, 或从`<button>`变成`<div>`都会触发一个完整的重建流程
- 当卸载一棵树时, 对应的 DOM 节点也会被销毁, 组件实例将执行`componentWillUnmount()`方法
- 当建立一棵新的树时, 对应的 DOM 节点会被创建及插入到 DOM 中, 组件实例将执行`componentWillMount()`方法, 紧接着执行`componentDidMount()`方法

比如下面的代码更改

- React 会销毁`Counter`组件并重新装载一个新的组件, 而不会对`Counter`进行复用

```jsx
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

### 对比同类型的元素

当对比两个相同类型的 React 元素时, React 会保留 DOM 节点, 仅比对更新有改变的属性

比如下面的代码更改

- 通过比对这两个元素, React 知道只需要修改 DOM 元素上的`className`属性

```jsx
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

比如下面的代码更改

- 当更新`style`属性时, React 仅更新有所改变的属性
- 通过比对这两个元素, React 知道只需要修改 DOM 元素上的`color`样式, 无需修改`fontWeight`

```jsx
<div style={{ color: 'red', fontWeight: 'bold' }} />

<div style={{ color: 'green', fontWeight: 'bold' }} />
```

如果是同类型的组件元素

- 组件会保持不变, React 会更新该组件的`props`, 并且调用`componentWillReceiveProps()`和`componentWillUpdate()`方法
- 下一步, 调用`render()`方法, diff 算法将在之前的结果以及新的结果中进行递归

### 对子节点进行递归

在默认条件下, 当递归 DOM 节点的子元素时, React 会同时遍历两个子元素的列表, 当产生差异时, 生成一个`mutation`

在末尾插入一条数据的情况

```jsx
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

- 前面两个比较是完全相同的, 所以不会产生`mutation`
- 最后一个比较, 产生一个`mutation`, 将其插入到新的 DOM 树中即可

但是如果我们是在中间插入一条数据

```jsx
<ul>
  <li>星际穿越</li>
  <li>盗梦空间</li>
</ul>

<ul>
  <li>大话西游</li>
  <li>星际穿越</li>
  <li>盗梦空间</li>
</ul>
```

- React 会对每一个子元素产生一个`mutation`, 而不是保持`<li>星际穿越</li>`和`<li>盗梦空间</li>`的不变
- 这种低效的比较方式会带来一定的性能问题

## keys 的优化

我们在前面遍历列表时, 总是会提示一个警告, 让我们加入一个`key`属性

[![tvdTAA.png](https://s1.ax1x.com/2020/06/13/tvdTAA.png)](https://s1.ax1x.com/2020/06/13/tvdTAA.png)

```
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movies: ['星际穿越', '盗梦空间']
    }
  }

  render() {
    return (
      <div>
        <h2>电影列表</h2>
        <ul>
          {
            this.state.movies.map((item, index) => {
              return <li>{item}</li>
            })
          }
        </ul>
        <button onClick={e => this.insertMovie()}>插入数据</button>
      </div>
    )
  }

  insertMovie() {
    // ...
  }
}
```

方式一: 在最后位置插入数据

- 这种情况, 有无`key`意义并不大

```
insertMovie() {
  const newMovies = [...this.state.movies, '大话西游']
  this.setState({
    movies: newMovies
  })
}
```

方式二: 在前面插入数据

- 这种做法, 在没有`key`的情况下, 所有的`li`都需要进行修改

```
insertMovie() {
  const newMovies = ['大话西游', ...this.state.movies]
  this.setState({
    movies: newMovies
  })
}
```

当子元素(这里的`li`)拥有`key`时, React 使用`key`来匹配原有树上的子元素以及最新树上的子元素

- 在下面这种场景下, `key`为`111`和`222`的元素仅仅进行位移, 不需要进行任何的修改
- 将`key`为`333`的元素插入到最前面的位置即可

```
<ul>
  <li key="111">星际穿越</li>
  <li key="222">盗梦空间</li>
</ul>

<ul>
  <li key="333">Connecticut</li>
  <li key="111">星际穿越</li>
  <li key="222">盗梦空间</li>
</ul>
```

`key`的注意事项

- `key`应该是**唯一**的
- `key`不要使用随机数(随机数在下一次`render`时, 会重新生成一个数字)
- 使用`index`作为`key`, 对性能是没有优化的

## SCU 的优化

### render 函数被调用

我们使用之前的一个嵌套案例

- 在`App`中, 我们增加了一个计数器的代码
- 当点击`+1`时, 会重新调用`App`的`render`函数
- 而当`App`的`render`函数被调用时, 所有的子组件的`render`函数都会被重新调用

```react
import React, { Component } from 'react'

function Header() {
  console.log('Header Render 被调用')
  return <h2>Header</h2>
}

class Main extends Component {
  render() {
    console.log('Main Render 被调用')
    return (
      <div>
        <Banner />
        <ProductList />
      </div>
    )
  }
}

function Banner() {
  console.log('Banner Render 被调用')
  return <div>Banner</div>
}

function ProductList() {
  console.log('ProductList Render 被调用')
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
  console.log('Footer Render 被调用')
  return <h2>Footer</h2>
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }
  }

  render() {
    console.log('App Render 被调用')

    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}
```

[![NKTpdO.png](https://s1.ax1x.com/2020/06/19/NKTpdO.png)](https://s1.ax1x.com/2020/06/19/NKTpdO.png)

那么, 我们可以思考一下, 在以后的开发中, 我们只要是修改了`App`中的数据, 所有的组件都需要重新`render`, 进行 diff 算法, 性能必然是很低的

- 事实上, 很多的组件没有必须要重新`render`
- 它们调用`render`应该有一个前提, 就是依赖的数据(state、props)发生改变时, 再调用自己的`render`方法

如何来控制`render`方法是否被调用呢?

- 通过`shouldComponentUpdate`方法即可

### shouldComponentUpdate

React 给我们提供了一个生命周期方法`shouldComponentUpdate`(很多时候, 我们简称为SCU), 这个方法接受参数, 并且需要有返回值

- 该方法有两个参数

  1. `nextProps`修改之后, 最新的`props`属性
  2. `nextState`修改之后, 最新的`state`属性

- 该方法返回值是一个`Boolean`类型

  - 返回值为`true`, 那么就需要调用`render`方法
  - 返回值为`false`, 那么就不需要调用`render`方法
  - 默认返回`true`, 也就是只要`state`发生改变, 就会调用`render`方法

```react
shouldComponentUpdate(nextProps, nextState) {
  return true
}
```

我们可以控制它返回的内容, 来决定是否需要重新渲染

比如我们在`App`中增加一个`message`属性

- JSX 中并没有依赖这个`message`, 那么它的改变不应该引起重新渲染
- 但是因为`render`监听到`state`的改变, 就会重新`render`, 所以最后`render`方法还是被重新调用了

```react
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0,
      message: 'Hello World'
    }
  }

  render() {
    console.log('App Render 被调用')

    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.changeText()}>改变文本</button>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  changeText() {
    this.setState({
      message: 'Hello React'
    })
  }
}
```

这个时候, 我们可以通过实现`shouldComponentUpdate`来决定要不要重新调用`render`方法

- 这个时候, 我们改变`counter`时, 会重新渲染
- 如果, 我们改变的是`message`, 那么默认返回的是`false`, 那么就不会重新渲染

```react
shouldComponentUpdate(nextProps, nextState) {
  if (nextState.counter !== this.state.counter) {
    return true
  }

  return false
}
```

但是我们的代码依然没有优化到最好, 因为当`counter`改变时, 所有的子组件依然重新渲染了

- 所以, 事实上我们应该实现所有的子组件的`shouldComponentUpdate`

比如`Main`组件, 可以进行如下实现

- `shouldComponentUpdate`默认返回一个`false`
- 在特定情况下, 需要更新时, 我们在上面添加对应的条件即可

```react
class Main extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    console.log('Main Render 被调用')
    return (
      <div>
        <Banner />
        <ProductList />
      </div>
    )
  }
}
```

### PureComponent 和 memo

如果所有的类, 我们都需要手动来实现`shouldComponentUpdate`, 那么会给我们开发者增加非常多的工作量

我们来设想一下`shouldComponentUpdate`中的各种判断的目的是什么?

- `props`或者`state`中的数据是否发生了改变, 来决定`shouldComponentUpdate`返回`true`或者`false`

事实上 React 已经考虑到了这一点, 所以 React 已经默认帮我们实现好了, 如何实现呢?

- 将`class`继承自`PureComponent`

比如我们修改`Main`组件的代码

```react
class Main extends PureComponent {
  render() {
    console.log('Main Render 被调用')
    return (
      <div>
        <Banner />
        <ProductList />
      </div>
    )
  }
}
```

`PureComponent`的原理是什么呢?

- 对`props`和`state`f进行浅层比较

**查看`PureComponent`相关的源码**

- 在`PureComponent`的原型上增加一个`isPureReactComponent`为`true`的属性

[![NBqkh6.png](https://s1.ax1x.com/2020/06/25/NBqkh6.png)](https://s1.ax1x.com/2020/06/25/NBqkh6.png)

[![NBq7vD.png](https://s1.ax1x.com/2020/06/25/NBq7vD.png)](https://s1.ax1x.com/2020/06/25/NBq7vD.png)

这个方法中, 调用`!shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)`, 这个`shallowEqual`就是进行浅层比较

[![NBLEan.png](https://s1.ax1x.com/2020/06/25/NBLEan.png)](https://s1.ax1x.com/2020/06/25/NBLEan.png)

**那么, 如果是一个函数式组件呢?**

我们需要使用一个高阶组件`memo`

- 我们将之前的`Header`、`Banner`、`ProductList`都通过`memo`函数进行一层包裹
- `Footer`没有使用`memo`函数进行包裹
- 最终的效果是, 当`counter`发生改变时, `Header`、`Banner`、`ProductList`的函数不会重新执行, 而`Footer`的函数会被重新执行

```react
import React, { Component, PureComponent, memo } from 'react'

const MemoHeader = memo(function() {
  console.log('Header Render 被调用')
  return <h2>Header</h2>
})

class Main extends PureComponent {
  render() {
    console.log('Main Render 被调用')
    return (
      <div>
        <MemoBanner />
        <MemoProductList />
      </div>
    )
  }
}

const MemoBanner = memo(function() {
  console.log('Banner Render 被调用')
  return <div>Banner</div>
})

const MemoProductList = memo(function() {
  console.log('ProductList Render 被调用')
  return (
    <ul>
      <li>商品1</li>
      <li>商品2</li>
      <li>商品3</li>
      <li>商品4</li>
      <li>商品5</li>
    </ul>
  )
})

function Footer() {
  console.log('Footer Render 被调用')
  return <h2>Footer</h2>
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0,
      message: 'Hello World'
    }
  }

  render() {
    console.log('App Render 被调用')

    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.changeText()}>改变文本</button>
        <MemoHeader />
        <Main />
        <Footer />
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.counter !== this.state.counter) {
      return true
    }

    return false
  }

  changeText() {
    this.setState({
      message: 'Hello React'
    })
  }
}
```

**`memo`的原理是什么呢?**

[![NBLxeJ.png](https://s1.ax1x.com/2020/06/25/NBLxeJ.png)](https://s1.ax1x.com/2020/06/25/NBLxeJ.png)

最终返回一个对象, 这个对象中有一个`compare`函数

### 不可变数据的力量

我们通过一个案例来演练我们之前说的不可变数据的重要性

```react
import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      friends: [
        { name: 'lilei', age: 20, height: 1.76 },
        { name: 'lucy', age: 18, height: 1.65 },
        { name: 'tom', age: 30, height: 1.78 }
      ]
    }
  }

  render() {
    return (
      <div>
        <h2>朋友列表</h2>
        <ul>
          {
            this.state.friends.map((item, index) => {
              return (
                <li key={item.name}>
                  <span>{`姓名:${item.name} 年龄: ${item.age}`}</span>
                  <button onClick={e => this.incrementAge(index)}>年龄+1</button>
                </li>
              )
            })
          }
        </ul>
        <button onClick={e => this.insertFriend()}>添加新数据</button>
      </div>
    )
  }

  insertFriend() {
     
  }

  incrementAge(index) {
    
  }
}
```

**我们来思考一下`inertFriend`应该如何实现?**

```react
insertFriend() {
  this.state.friends.push({name: 'lion', age: 18, height: 1.88});
  this.setState({
    friends: this.state.friends
  })
}
```

- 这种方式会造成界面不会发生刷新, 添加新的数据
- 原因是继承自`PureComponent`, 会进行浅层比较, 浅层比较过程中两个`friends`是相同的对象

```react
insertFriend() {
  this.setState({
    friends: [...this.state.friends, {name: 'lion', age: 18, height: 1.88}]
  })
}
```

- `[...this.state.friends, {name: 'lion', age: 18, height: 1.88}]`会生成一个新的数组引用
- 在进行浅层比较时, 两个引用的是不同的数组, 所以它们是不相同的

**我们再来思考一下`incrementAge`应该如何实现?**

```react
incrementAge(index) {
  this.state.friends[index].age += 1
  this.setState({
    friends: this.state.friends
  })
}
```

和上面第一种方式类似

```react
incrementAge(index) {
  const newFriends = [...this.state.friends]
  newFriends[index].age += 1
  this.setState({
    friends: newFriends
  })
}
```

和上面第二种方式类似

所以, 在真实开发中, 我们要尽量保证`state`、`props`中的数据不可变性, 这样我们才能合理和安全的使用`PureComponent`和`memo`
