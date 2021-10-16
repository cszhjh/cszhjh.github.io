---
title: React过渡动画
date: 2020-07-28 12:46:19
toc: true
tags: Animation
categories: 
- React
---

## 前言

> 在开发中, 我们想要给一个组件的 show/hidden 添加某种过渡动画, 可以很好的增加用户体验
>
> 当然, 我们可以通过原生的 CSS 来实现这些过渡动画, 但是 React 社区为我们提供了`react-transition-group`用来完成过渡动画

## react-transition-group 介绍

React 曾为开发者提供过动画插件`react-addons-css-transition-group`, 后由社区维护, 形成了现在的`react-transition-group`

<!-- more -->

这个库可以帮助我们方便的实现组件的**入场**和**离场**动画, 使用时需要进行额外的安装

```shell
## npm
npm install react-transition-group --save

## yarn
yarn add react-transition-group
```

`react-transition-group`本身非常小, 不会为我们应用程序增加过多的负担

`react-transition-group`主要包含四个组件:

- `Transition`
  - 该组件是一个和平台无关的组件(不一定要结合 CSS)
  - 在前端开发中, 我们一般是结合 CSS 来完成样式, 所以比较常用的是`CSSTransition`

- `CSSTransition`
  - 在前端开发中, 通常使用`CSSTransition`来完成过渡动画效果
  
- `SwitchTransition`
  - 两个组件显示和隐藏切换时, 使用该组件
  
- `TransitionGroup`
  - 将多个动画组件包裹在其中, 一般用于列表中元素的动画

## react-transition-group 使用

### CSSTransition

`CSSTransition`是基于`Transition`组件构建的

- `CSSTransition`执行过程中, 有三个状态: **appear**、**enter**、**exit**
- 它们有三种状态, 需要定义对应的 CSS 样式
  - 第一类: 开始状态, 对应的类是`-appear`、`-enter`、`exit`
  - 第二类: 执行动画, 对应的类是`-appear-active`、`-enter-active`、`-exit-active`
  - 第三类: 执行结束, 对应的类是`-appear-done`、`-enter-done`、`-exit-done`

`CSSTransition`常见对应的属性

- `in`: 触发进入或退出状态
  - 如果添加了`unmountOnExit={true}`, 那么该组件会在执行退出动画结束后被移除掉
  - 当`in`为`true`时, 触发进入状态, 会添加`-enter`、`-enter-active`的 class 开始执行动画, 当动画执行结束后, 会移除两个 class, 并且添加`-enter-done`的 class
  - 当`in`为`false`时, 触发退出状态, 会添加`-exit`、`-exit-active`的 class 开始执行动画, 当动画执行结束后, 会移除两个 class, 并且添加`-enter-done` 的 class
  
- `classNames`: 动画`class`的名称
  - 决定了在编写 CSS 时, 对应的 class 名称: 比如`card-enter`、`card-enter-active`、`card-enter-done`
  
- `timeout`: 过渡动画的时间

- `appear`: 是否在初次进入时添加动画(需要和`in`同时为`true`)

- [更多属性](https://reactcommunity.org/react-transition-group/transition)

`CSSTransition`对应的钩子函数: 主要为了检测动画的执行过程, 来完成一些 JavaScript 的操作

- `onEnter`: 在进入动画之前被触发
- `onEntering`: 在应用进入动画时被触发
- `onEntered`: 在应用进入动画结束后被触发

```react
import './App.css'

import { CSSTransition } from 'react-transition-group'

import { Card, Avatar, Button } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

const { Meta } = Card

export default class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isShowCard: true
    }
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={e => this.setState({ isShowCard: !this.state.isShowCard })}>
          显示/隐藏
        </Button>
        <CSSTransition
          in={this.state.isShowCard}
          classNames="card"
          timeout={1000}
          unmountOnExit={true}
          onEnter={el => console.log('进入动画前')}
          onEntering={el => console.log('进入动画')}
          onEntered={el => console.log('进入动画后')}
          onExit={el => console.log('退出动画前')}
          onExiting={el => console.log('退出动画')}
          onExited={el => console.log('退出动画后')}
        >
          <Card
            style={{ width: 300 }}
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />
            ]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </CSSTransition>
      </div>
    )
  }
}
```

对应的 CSS 样式如下

```css
.card-enter, .card-appear {
  opacity: 0;
  transform: scale(.8);
}

.card-enter-active, .card-appear-active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 300ms, transform 300ms;
}

.card-exit {
  opacity: 1;
}

.card-exit-active {
  opacity: 0;
  transform: scale(.8);
  transition: opacity 300ms, transform 300ms;
}
```

### SwitchTransition

`SwitchTransition`可以完成两个组件之间切换的炫酷动画

- 比如我们有一个按钮需要在`on`和`off`之间切换, 我们希望看到`on`先从左侧退出, `off`再从右侧进入
- 这个动画在 Vue 中被称之为 Vue Transition Modes
- `react-transition-group`中使用`SwitchTransition`来实现该动画

`SwitchTransition`中主要有一个属性: `mode`, 它有两个值

1. `in-out`: 表示新组件先进入, 旧组件再移除
2. `out-in`: 表示旧组件先移除, 新组件再进入

如何使用`SwitchTransition`呢?

- `SwitchTransition`组件里面要有`CSSTransition`或者`Transition`组件, **不能直接包裹你想要切换的组件**
- `SwitchTransition`里面的`CSSTransition`或`Transition`组件不再像以前那样接受`in`属性来判断元素是何种状态, 取而代之的是`key`属性

下面代码为按钮的**入场**和**出场**效果

```react
import { SwitchTransition, CSSTransition } from 'react-transition-group'

export default class SwitchAnimation extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isOn: true
    }
  }

  render() {
    const { isOn } = this.state

    return (
      <SwitchTransition mode="out-in">
        <CSSTransition classNames="btn" timeout={500} key={isOn ? 'on' : 'off'}>
          {<button onClick={this.btnClick.bind(this)}>{isOn ? 'on' : 'off'}</button>}
        </CSSTransition>
      </SwitchTransition>
    )
  }

  btnClick() {
    this.setState({ isOn: !this.state.isOn })
  }
}
```

对应的 CSS 样式如下

```css
.btn-enter {
  transform: translate(100%, 0);
  opacity: 0;
}

.btn-enter-active {
  transform: translate(0, 0);
  opacity: 1;
  transition: all 500ms;
}

.btn-exit {
  transform: translate(0, 0);
  opacity: 1;
}

.btn-exit-active {
  transform: translate(-100%, 0);
  opacity: 0;
  transition: all 500ms;
}
```

### TransitionGroup

当我们有一组动画时, 需要将这些`CSSTransition`放入到一个`TransitionGroup`中来完成动画

```react
import React, { PureComponent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export default class GroupAnimation extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      friends: []
    }
  }

  render() {
    return (
      <div>
        <TransitionGroup>
          {this.state.friends.map((item, index) => {
            return (
              <CSSTransition classNames="friend" timeout={300} key={index}>
                <div>{item}</div>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
        <button onClick={e => this.addFriend()}>+friend</button>
      </div>
    )
  }

  addFriend() {
    this.setState({
      friends: [...this.state.friends, 'coderlion']
    })
  }
}
```
