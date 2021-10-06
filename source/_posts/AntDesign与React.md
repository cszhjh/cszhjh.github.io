---
title: AntDesign与React
date: 2020-07-12 15:22:52
tags: AntDesign
categories: 
- React
---

## 认识 AntDesign

### AntDesign 介绍

**AntDesign** 简称 **antd**, 主要用于研发企业级中后台产品

AntDesign 的特点

1. 🌈 提炼自企业级中后台产品的交互语言和视觉风格
2. 📦 开箱即用的高质量 React 组件
3. 🛡️ 使用 TypeScript 开发, 提供完整的类型定义文件
4. ⚙️ 全链路开发和设计工具体系
5. 🌍 数十个国际化语言支持
6. 🎨 深入每个细节的主题定制能力

<!-- more -->

**全链路开发和设计指的是什么?**

- 全链路这个词大概是 16 年由阿里提出的
- 从**业务战略-用户场景-设计目标-交互体验-用户流程-预期效率**全方面分析和考虑
- 这个主要是产品经理会考虑的点

AntDesign 的兼容性

- 现代浏览器和 IE11 (需要 polyfills)
- 支持服务端渲染
- Electron

[![U3yhJf.png](https://s1.ax1x.com/2020/07/12/U3yhJf.png)](https://s1.ax1x.com/2020/07/12/U3yhJf.png)

**antd@2.0** 之后不再支持 IE8, **antd@4.0** 之后不再支持 IE9/10

目前稳定的版本为: v4.4.0

### AntDesign 安装

使用 `npm` 或 `yarn` 安装

`npm` 安装

```shell
npm install antd --save
```

`yarn` 安装

```shell
yarn add antd
```

之后在`index.js`中引入全局的 Antd 样式

```css
import 'antd/dist/antd.css'
```

在`App.js`中就可以使用一些组件了

```react
import React, { PureComponent } from 'react'
import { Button, DatePicker } from 'antd'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <div>
          <Button>Default Button</Button>
          <Button type="primary">Primary Button</Button>
          <Button type="dashed">Dashed Button</Button>
        </div>
        <div>
          <DatePicker
            onChange={this.onChange}
            allowClear={false}
            dateRender={this.userDateRender}
          />
        </div>
      </div>
    )
  }

  onChange(date, dateString) {
    console.log(date, dateString)
  }

  userDateRender(current) {
    const style = {}
    if (current.date() === 1) {
      style.border = '1px solid #1890ff'
      style.borderRadius = '50%'
    }
    return (
      <div className="ant-picker-cell-inner" style={style}>
        {current.date()}
      </div>
    )
  }
}
```

[![U32jHJ.png](https://s1.ax1x.com/2020/07/12/U32jHJ.png)](https://s1.ax1x.com/2020/07/12/U32jHJ.png)

> **思考一个问题: Antd 是否会将一些没用的代码(组件或者逻辑代码)引入, 造成代码包很大呢?**
>
> [官网有提到](https://ant.design/docs/react/getting-started-cn#按需加载): antd 的 JS 代码默认支持基于 ES modules 的 tree shaking, 对于 JS 部分, 直接引入`import { Button } from 'antd'`就会有按需加载的效果

### 高级配置

#### 认识 craco

上面的使用过程是无法对主题进行配置的, 若要对主题等相关的高级特性进行配置, 需要修改`create-react-app`的默认配置

如何修改`create-react-app`的默认配置呢?

- 可以通过`yarn run eject`来暴露出对应的配置信息进行修改
- 但是对于 Webpack 不熟悉的人来说, 直接修改 CRA 的配置是否会给你的项目带来负担, 甚至会增加项目的隐患和不稳定性呢?
- 所以, 在项目开发中是不建议大家直接去修改 CRA 的配置信息的

那么如何来修改默认配置呢? 社区目前有两个比较常见的方案

1. `react-app-rewired`+`customize-cra`(这个是 antd 早期推荐的方案)
2. `craco` (目前 antd 推荐的方案)

##### 安装 craco

```shell
yarn add @craco/craco
```

##### 修改 package.json 文件

- 原本启动时, 我们是通过`react-scripts`来管理的
- 现在启动时, 我们通过`craco`来管理

```json
"scripts": {
-  "start": "react-scripts start",
-  "build": "react-scripts build",
-  "test": "react-scripts test",
+  "start": "craco start",
+  "build": "craco start",
+  "test": "craco test"
}
```

##### craco.config.js 配置

在根目录下创建`craco.config.js`文件用于修改默认配置

```javascript
module.exports = {
  // 配置...
}
```

#### 配置主题

按照**配置主题**的要求, 自定义主题需要用到类似`less-loader`提供的 less 变量覆盖功能

- 我们可以引入`craco-less`来帮助加载 less 样式和修改变量

##### 安装 craco-less

```shell
yarn add craco-less
```

##### 修改 craco.config.js 中的 plugins

- 使用`modifyVars`可以在运行时修改 less 变量

```javascript
const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
```

引入 antd 的样式时, 引入`antd.less`文件

```javascript
// import 'antd/dist/antd.css'
import 'antd/dist/antd.less'
```

修改后重启`yarn start`, 如果看到一个绿色的按钮就说明配置成功了

#### 配置别名

在项目开发中, 某些组件或者文件的层级会较深

- 如果我们通过上层目录去引入就会出现这样的情况: `../../../components/Button`
- 如果我们可以配置别名, 就可以直接从根目录下面开始查找文件: `@/components/Button`, 甚至是: `components/Button`

配置别名也需要修改 Webpack 的配置, 当然我们也可以借助于 craco 来完成

```javascript
...

const path = require('path')
const resolve = dir => path.resolve(__dirnoame, dir)

module.exports = {
  ...
  ,
  webpack: {
    alias: {
      '@': resolve('src'),
      'components': resolve('src/components')
    }
  }
}
```

在导入时就可以按照下面的方式来进行使用

```javascript
import LionCommentInput from '@/components/comment-input'
import LionCommentItem from 'components/comment-item'
```

## AntDesign 案例

我们通过 AntDesign 来编写一个留言板

[![U8SngK.png](https://s1.ax1x.com/2020/07/12/U8SngK.png)](https://s1.ax1x.com/2020/07/12/U8SngK.png)

### 评论框

评论框有两部分组成

1. `TextArea`的输入框: `Input.TextArea`
2. 提交评论的按钮: `Button`

```react
// comment-input
import React, { PureComponent } from 'react'

import moment from 'moment'
import { Button, Input } from 'antd'

export default class LionCommentInput extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <div>
        <Input.TextArea
          rows={4}
          onChange={e => this.onChange(e)}
          value={this.state.value}
        />
        <Button onClick={e => this.onSubmit()} type="primary">
          添加评论
        </Button>
      </div>
    )
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  onSubmit() {
    console.log(this.state.value, moment().fromNow())
    const commentInfo = {
      id: Date.now(),
      name: 'coderlion',
      avatar: 'https://www.coderlion.com/images/user_img.jpeg',
      content: <p>{this.state.value}</p>,
      datetime: moment()
    }

    this.props.submitComment(commentInfo)
    this.setState({
      value: ''
    })
  }
}
```

### 评论列表

评论列表主要是使用`Comment`组件, `Comment`组件有一些属性

- `author`: 展示作者的名称

- `avatar`: 展示作者的头像
  - 可以使用`Avatar`的组件进行展示
  
- `content`: 展示评论的内容

- `datetime`: 展示评论的时间
  - 可以使用`Tooltip`组件, 当鼠标放在上面时, 会显示对应的`title`内容
  
- `actions`: 评论下方的操作按钮
  - 可以使用`DeleteOutlined`, 但是它来自`@ant-design/icons`, 需要我们进行安装

```react
// comment-item.js
import React, { PureComponent } from 'react'

import { Comment, Avatar, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

export default class LionCommentItem extends PureComponent {
  render() {
    const { comment } = this.props

    return (
      <Comment
        author={<a href="/#">{comment.name}</a>}
        avatar={<Avatar src={comment.avatar} alt={comment.name} />}
        content={comment.content}
        datetime={
          <Tooltip title={comment.datetime.format('YYYY-MM-DD HH:mm:ss')}>
            <span>{comment.datetime.fromNow()}</span>
          </Tooltip>
        }
        actions={this.getActions()}
      />
    )
  }

  getActions() {
    return [
      <span onClick={this.props.removeItem}>
        <DeleteOutlined /> 删除
      </span>
    ]
  }
}
```

### App 组件

我们在`App.js`中, 使用封装好的两个组件

```react
import React, { PureComponent } from 'react'

import LionCommentInput from './comment-input'
import LionCommentItem from './comment-item'

export default class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      commentList: []
    }
  }

  render() {
    return (
      <div style={{ width: '500px', padding: '20px' }}>
        {this.state.commentList.map((item, index) => {
          return (
            <LionCommentItem
              key={item.id}
              comment={item}
              index={index}
              removeItem={e => this.removeItem(index)}
            />
          )
        })}
        <LionCommentInput submitComment={this.submitComment.bind(this)} />
      </div>
    )
  }

  submitComment(comment) {
    this.setState({
      commentList: [...this.state.commentList, comment]
    })
  }

  removeItem(index) {
    const newCommentList = [...this.state.commentList]
    newCommentList.splice(index, 1)
    this.setState({
      commentList: newCommentList
    })
  }
}
```
