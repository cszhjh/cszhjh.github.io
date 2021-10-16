---
title: Vue-Router
date: 2020-05-01 15:35:19
toc: true
tags: Vue-Router
categories:
- Vue
---

## 前端路由 Vue-Router 介绍

### 什么是路由?

> 路由（routing）就是通过互联的网络把信息从源地址传输到目的地址的活动 — 维基百科

路由器提供了两种机制, 路由和转发

- 路由是决定数据包从来源到目的地的路径
- 转发将输入端的数据转移到合适的输出端

<!-- more -->

### 网站发展的几个阶段

#### 后端路由阶段

##### 什么是后端路由

早期的网站开发, 整个 HTML 页面都是是由服务器来渲染的, 服务器直接生产渲染好对应的 HTML 页面, 返回给客户端进行展示

但是, 服务器如何处理一个网站的诸多页面呢?

首先, 一个页面会有自己对应的网址, 也就是 URL, 客户端发生请求时, URL 会发送到服务器, 服务器通过**正则表达式**对该 URL 进行匹配且最后交给 **Controller** 进行处理, **Controller** 进行各种处理后, 最终生成 HTML 或者数据, 返回给前端, 这就完成了一个IO操作, 这种操作, 就是 **后端路由**

##### 后端路由的优点

当页面中需要请求不同的路径内容时, 交给服务器来进行处理, 服务器渲染好整个页面, 并且将页面返回给客户端, 这种情况下渲染好的页面, **不需要单独加载任何的 JavaScript 和 CSS**, 可以直接交给浏览器展示, 这样也**有利于 SEO 的优化**

##### 后端路由的缺点

- 整个页面的模块都要由后端人员来编写和维护, **工作量太大**
- 前端开发人员如果要开发页面, 需要通过 **PHP** 和 **Java** 等语言来编写页面代码, **增加了额外的学习成本**
- **HTML** 代码和数据以及对应的逻辑混在一起, **不利于编写和维护**

#### 前端路由阶段

前端路由的核心: 改变URL, 但是页面不进行整体的刷新

#### 前后端分离阶段

随着 **Ajax** 的出现, 有了前后端分离的开发模式: **后端只提供 API** 来返回数据, 前端通过 **Ajax** 获取数据, 并且可以通过 **JavaScript** 将数据渲染到页面中

**优点:**

- 前后端责任变得很清晰, 后端专注于数据上, 前端专注于交互和可视化上
- 当移动端(IOS / Android)出现后, 后端不需要进行任何处理, 依然使用之前的一套API即可

#### 单页面富应用阶段

单页面富应用, 即**单页Web应用(single page web application, SPA)**, 就是只有一张 Web 页面的应用, 是加载单个 HTML 页面并在用户与应用程序交互时动态更新该页面的 Web 应用程序

简单理解: 就是在前后端分离的基础上加了一层前端路由

**SPA 的特点**

- 速度: 更好的用户体验, 让用户在 web app 感受 native app 的速度和流畅
- MVVM: 经典 MVVM 开发模式, 前后端各负其责
- ajax: 重前端, 业务逻辑全部在本地操作, 数据都需要**通过 Ajax 同步、提交**
- 路由: 在 URL 中采用 ## 号来作为当前视图的地址, 改变 ## 号后的参数, 页面并不会重载

##### SPA 的优点

**良好的交互体验:**

- 用户不需要重新刷新页面, 获取数据也是通过 Ajax 异步获取, 页面显示流畅

**良好的前后端工作分离模式:**

- 单页 Web 应用可以和 RESTful 规约一起使用, 通过 REST API 提供接口数据, 并使用 Ajax 异步获取
- 这样有助于分离客户端和服务器端工作, 更进一步, 可以在客户端也可以分解为静态页面和页面交互两个部分

**减轻服务器压力:**

- 服务器只用出数据就可以, 不用管展示逻辑和页面合成, 吞吐能力会提高几倍

**共用一套后端程序代码:**

- 不用修改后端程序代码就可以同时用于 Web 界面、手机、平板等多种客户端

##### SPA 的缺点

**首屏渲染等待时长**

- 必须等待加载完毕, 才能渲染出首屏

**seo不友好:**

- 爬虫只能拿到一个 `div`, 认为页面是空的, 不利于 `seo`

**初次加载耗时多:**

- 为实现单页 Web 应用功能及显示效果, 需要在加载页面的时候将 JavaScript、CSS 统一加载, 部分页面可以在需要的时候加载
- 所以必须对 JavaScript 及 CSS 代码进行合并压缩处理, 如果使用第三方库, 建议使用一些大公司的 CDN, 因此带宽的消耗是必然的

### 改变 URL, 页面不刷新

#### URL 的 hash

URL 的 hash 也就是锚点(#), 本质上是改变 **window.location** 的 `href` 属性, 可以通过直接赋值 `location.hash` 来改变 `href`, 但是页面不发生刷新

[![tetokQ.png](https://s1.ax1x.com/2020/05/28/tetokQ.png)](https://s1.ax1x.com/2020/05/28/tetokQ.png)

#### HTML5 的 history 模式

`history` 接口是 HTML5 新增的, 它有五种模式改变 URL 而不刷新页面 **(具体有点像浏览器的前进和后退)**

- `history.pushState(Object, “title”, “url”)`
  - 相当于**入栈**的操作(出入栈相当于往一个杯子里加东西, 只有一个出入口, 后进的会在先进的上面), 遵循**后进先出**的规则, **会保存历史记录, 可以返回**
    [![tet40S.png](https://s1.ax1x.com/2020/05/28/tet40S.png)](https://s1.ax1x.com/2020/05/28/tet40S.png)
- `history.replaceState(Objectj, “title”, “url”)`
  - 同 `pushState()`
  - 区别是: 它不是栈结构, 所以**不保存历史记录, 不能返回**
- `history.go(Number)`
  - 功能等价于 `history.back()`, 但是可以通过参数来进行具体的跳转
  - `Number` 负数: 表示**出栈**几次
  - `Number` 正数: 表示把之前**出栈掉的** `Number` 个数据重新 `push` 进去
    [![tetWOf.png](https://s1.ax1x.com/2020/05/28/tetWOf.png)](https://s1.ax1x.com/2020/05/28/tetWOf.png)
- `history.forward()`
  - 可以前进到下一个记录的地址
  - 等价于 `history.go(1)`
- `history.back()`
  - 相当于**出栈**的操作, 遵循**后进先出**的规则, 可以返回上一个记录的地址
  - 等价于 `history.go(-1)`

## Vue-Router 基本使用

目前前端流行的三大框架, 都有自己的路由实现:

- Angular: ngRouter
- React: ReactRouter
- Vue: Vue-Router

Vue-Router 是 Vue.js 官方的路由插件, 它和 Vue.js 是深度集成的, **适合用于构建单页面富应用程序**

Vue-Router 是**基于路由和组件的**, 路由用于设定访问路径, 将路径和组件映射起来, 在 Vue-Router 的单页面应用中, 页面路径的改变就是组件的切换

### 安装 Vue-Router

安装

```shell
npm install vue-router --save
```

在模块化工程中使用它(因为是一个插件, 所以可以通过`Vue.use()`来安装路由功能)

在 **src** 目录下创建 **router** 文件夹, 并在 router 文件夹中创建 **index.js**, 并在 **index.js** 中进行如下配置 **(第一步、第二步均在此文件中配置)**

1. 导入 `Vue、Vue-Router`对象, 并且调用 `Vue.use(VueRouter)`

   ```javascript
   // 导入vue对象
   import Vue from 'vue'
   
   // 导入vue-router对象
   import VueRouter from 'vue-router'
   
   // 注入插件
   Vue.use(VueRouter)
   ```
   
2. 创建路由实例, 并且传入路由映射配置

   ```javascript
   //定义路由
   const routes = [
     // 里面是映射配置
   ]
   
   // 创建路由实例
   const router = new VueRouter({
     routes
   })
   
   // 导出 router 实例
   export default router
   ```
   
3. 在**Vue 实例**中**挂载**创建的**路由实例**
   [![tet5Tg.png](https://s1.ax1x.com/2020/05/28/tet5Tg.png)](https://s1.ax1x.com/2020/05/28/tet5Tg.png)

### 使用 Vue-Router

1. **创建路由组件**
   [![teNtAg.png](https://s1.ax1x.com/2020/05/28/teNtAg.png)](https://s1.ax1x.com/2020/05/28/teNtAg.png)
2. **配置路由映射: 组件和路径的映射关系**
   [![teNNNQ.png](https://s1.ax1x.com/2020/05/28/teNNNQ.png)](https://s1.ax1x.com/2020/05/28/teNNNQ.png)
3. 使用路由: 通过`<router-link>` 和 `<roter-view>`(该标签为 router 内部已经注册的两个全局组件)
   - `<router-link>`: 该标签是一个 **Vue-Router** 中已经内置的组件, 它默认会被渲染成一个 `<a>` 标签, [详情请看“router-link”章节](https://www.coderlion.com/2020/05/01/Vue-Router的安装和使用/#router-link)
   - `<router-view>`: 该标签会根据当前的路径, 动态渲染出不同的组件, 放置的位置决定渲染的位置
     [![teNJHS.png](https://s1.ax1x.com/2020/05/28/teNJHS.png)](https://s1.ax1x.com/2020/05/28/teNJHS.png)

**最终效果如下**
[![tethm8.png](https://s1.ax1x.com/2020/05/28/tethm8.png)](https://s1.ax1x.com/2020/05/28/tethm8.png)

### router-link标签

该标签是一个 **Vue-Router** 中已经内置的组件, 它默认会被渲染成一个 `<a>` 标签

它有如下属性

- `to`: (URL)
  - 用于指定跳转的路径
- `tag`: (tagName)
  - 最终渲染成 `tagName` 标签
- `replace`: (无值)
  - 跳转时使用 `history.replaceState()`, 即页面不能前进和后退
- `active-class`: (className)
  - 当 `<router-link>` 对应的路由匹配成功时, 会自动给当前元素设置一个 **router-link-active** 的 **class** , 设置 **active-class** 可以修改默认的名称
  - 在进行**高亮显示的导航栏菜单或者底部 tabbar 时**, 会使用到该类
  - 但是通常不会修改类的属性, 会直接使用默认的 **router-link-active** 即可
  - 简便写法: 该属性可以在 **VueRouter** 实例中添加属性为 `linkActiveClass`

### 设置默认路径(重定向)

如何让**路径**默认跳到**首页**, 并且 `<router-view>`渲染首页组件呢?

非常简单, 我们只需要配置多一个映射就可以了

```javascript
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
];
```

**配置解析:**

- 我们在 `routes` 中又配置了一个映射
- `path` 配置的是根路径
- `redirect` 是重定向, 也就是我们将根路径重定向到 `/home` 的路径下, 这样就可以得到我们想要的结果了

### 将 URL 的模式 hash(默认) 改为 HTML5 的 history

前面说过改变路径的方式有两种：

- URL 的 `hash`
- HTML5 的 `history`

默认情况下, Vue 路径的改变使用的是 **URL 的 hash**, 这样显示出的页面的地址中有一个 `#` 号, 不太美观

可以使用 HTML5 的 `history` 模式来进行改变, 进行如下配置即可:

为 **VueRouter** 实例对象添加属性 **mode(模式)**, 值为 `history`

```javascript
const router = new VueRouter({
  routes,
  mode: "history"
});
```

### 路由代码跳转(不通过 router-link 实现同样的功能)

**$router** : VueRouter 实例对象, Vue 在所有组件中都添加了该属性
**$router == VueRouter**

```vue
<template>
  <div id="app">
    <button @click="homeClick">home</button>
    <button @click="aboutClick">about</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    homeClick() {
      // push --> pushState
      // replace --> repalceState
      this.$router.push("/home").catch(err => {
        console.log(err)
      })
    },
    aboutClick() {
      this.$router.push("/about").catch(err => {
        console.log(err)
      })
    }
  }
};
</script>
```

### 动态路由

在某些情况下, 一个页面的 **path** 可能是不确定的, 比如我们进入用户界面时, 希望是如下路径

- `/user/Sunny` 或 `/user/kobe`
- 除了有前面的 `/user` 之外, 后面还跟上了用户的 `id`
- 这种 **path 和 Component 的匹配关系**, 我们称之为 **动态路由** (也就是路由传递数据的一种方式)

**步骤一: 路由映射**

```javascript
import User from "../components/User.vue";

const routes = [
  {
    path: "/user/:userId",
    component: User
  }
];
```

**步骤二: 使用子组件路由, 且通过 `v-bind` 动态设置属性**

```javascript
<router-link :to="'/user/' + userId">My</router-link>

<script>
  export default {
    data() {
      return {
        userId: "Sunny"
      };
    }
  }
</script>
```

步骤三: 在子组件 `User.vue` 中, 通过 `$route.params.userId` 获得当前用户 `id`

```vue
<template>
  <div>
    <h1>{{ $route.params.userId }}</h1>
    <h2>User Interface</h2>
    <p>User information</p>
  </div>
</template>
```

### 懒加载

当打包构建应用时, **Javascript** 包会变得非常大, 影响页面加载, 如果我们能把不同路由对应的组件分割成不同的代码块, 然后当路由被访问的时候才加载对应组件, 这样就更加高效了

为了实现这种效果, 我们可以使用路由的懒加载

路由懒加载的主要作用就是将路由对应的组件打包成一个个的 js 代码块, 只有在这个路由被访问到的时候, 才加载对应的组件

js 包为什么大?

- 首先, 我们知道路由通常会定义很多不同的页面
- 这个页面最后被打包放在哪里呢? 一般情况下, 是放在一个 js 文件中
- 但是, 页面这么多放在一个 js 文件中, 必然会造成这个页面非常的大
- 如果我们一次性从服务器请求下来这个页面, 可能需要花费一定的时间, 甚至用户电脑上还出现了短暂空白的情况
- 如何避免这种情况呢? 使用路由懒加载就可以了
- 路由懒加载做了什么?
  - 路由懒加载的主要作用就是将路由对应的组件打包成一个个 js 代码块
  - 只有在这个路由被访问到的时候, 才加载对应的组件

#### 懒加载的三种方式

方式一(早期): 结合 Vue 的异步组件和 webpack 的代码分析

```javascript
const Home = resolve => {
  require.ensure(["../components/Home.vue"], () => {
    resolve(require("../components/Home.vue"))
  })
}
```

方式二: AMD 写法

```javascript
const Aoubt = resolve => require(["../components/About.vue"], resolve);
```

方式三(推荐): 在 ES6 中, 我们可以有更加简单的写法来组织 Vue 异步组件和 webpack 的代码分割

```javascript
const Home = () => import("../components/Home.vue");
```

### 嵌套路由

嵌套有路是一个很常见的功能

- 比如在 `home` 页面中, 我们希望通过 `/home/news` 和 `/home/message` 访问一些内容
- 一个路径映射一个组件, 访问这两个路径也会分别渲染两个组件

实现嵌套路由有两个步骤:

1. 创建对应的子组件, 并且在路由映射中配置对应的子路由
2. 在组件内部使用`<router-view>`标签

创建对应的子组件

```vue
<template>
  <div>
    <ul>
      <li>消息1</li>
      <li>消息2</li>
      <li>消息3</li>
      <li>消息4</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "HomeMessage"
  };
</script>
```

在路由映射中配置对应的子路由

```javascript
// 注意: 子路由的path前面不能带'/'
const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        redirect: 'news'
        // 默认路径为/home/news
      },
      {
        path: 'news',
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]
  },
]
```

在组件内部使用`<router-view>`标签

```vue
<template>
  <div>
    <h2>Home</h2>
    <p>I'am is Home</p>
    <router-link to="/home/news">news</router-link>
    <router-link to="/home/message">message</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Home"
  };
</script>
```

### 嵌套路由默认路径

在子路由中设置重定向

```javascript
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "",
        redirect: "news"
      },
      {
        path: "news",
        component: HomeNews
      }
    ]
  }
];
```

### keep-alive

**keep-alive** 是 Vue 内置的一个组件, 可以使被包含的组件保留状态, 或避免重新渲染
**router-view** 也是一个组件, 如果直接被包在**keep-alive**里面, 所有路径匹配到的视图组件都会被缓存

**通过 create 生命周期函数来验证**

可以通过 **keep-alive**, 监听一个组件 “活跃” 和 “不活跃” 的状态

- `activated()` 活跃状态自动调用该函数
- `deactivated()` 不活跃状态自动调用该函数

**keep-alive**属性:

- `include` : 字符串或正则, 只有匹配的组件才会被缓存

- `exclude`: 字符串或正则, 任何匹配的组件都不会被缓存
  - **可以使用组件导出时的 name 作为匹配**
  - 注意: 如果有多个匹配, 用 **, (逗号)** 分开, 且逗号两边不能存在空格

### 参数传递

**传递参数主要有两种类型: `params` 和 `query`**

- `params($route.params)` 的类型:
  - 配置路由格式: `/router/:id`
  - 传递的方式: **在 `path` 后面跟上对应的值**
  - 传递后形成的路径: `/router/123, /router/abc`

- `query ($route.query)` 的类型:
  - 配置路由格式: `/router`
  - 传递的方式: 对象中使用 **query 的 `key` 作为传递方式**
  - 传递后形成的路径: `/router?id=123, /router?id=abc`

```vue
<router-link
  :to="{
        path: '/profile',
        query: {
          name: 'Sunny',
          age: 20,
          height: 1.7
        }
      }">
  Profile
</router-link>
```

这里获取并打印这些数据:

```vue
<template>
  <div>
    <h1>{{ $route.query.name }}</h1>
    <h2>Profile</h2>
    <p>I'am is Profile</p>
    <p>{{ $route.query }}</p>
  </div>
</template>
```

#### 不使用 router-link 实现 query

```vue
<template>
  <div>
    <button @click="profileClick">profile</button>
  </div>
</template>

<script>
  export default {
    mathods: {
      profileClick() {
        this.$router.push({
          path: '/profile',
            query: {
              name: 'Sunny',
              age: 20,
              height: 1.7
            }
        })
      }
    }
  }
</script>
```

### 导航守卫

在 SPA 应用中, 如何改变页面的标题呢?

- 网页标题是通过 `<title>` 来显示的, 但是 SPA 只有一个固定的 HTML, 切换不同的页面时, 标题并不会改变

- 但是我们可以通过 js 来修改 `<title>` 的内容, `document.title = 'new title'`

- 那么在 Vue 项目中, 我们可以通过**生命周期**的 `created` 函数来实现

- 或调用 `VueRouter `实例的 `.beforeEach()` 函数

  ```javascript
  const routes = [
    {
      path: "/about",
      component: About,
      meta: {
        title: "About"
      }
    }
  ];
  
  /**
   * to: 即将要进入的目标的路由对象
   * from: 当前导航即将要离开的路由对象
   * next: 调用该方法后, 才能进入下一个钩子
   */
  router.beforeEach((to, from, next) => {
    document.title = to.matched[0].meta.title;
    next();
  });
  ```

#### beforeEach 前置守卫

通过 VueRouter 实例对象调用
`beforeEach(function (to, from, next) {});`

- `to`: 即将要进入的目标路由对象
- `from`: 当前导航即将要离开的路由对象
- `next`: 调用该方法后, 才能进入下一个路由对象

#### afterEach 后置守卫

通过 VueRouter 实例对象调用
`afterEach(function (to, from) {});`

- `to`: 已经进入的目标路由对象
- `from`: 已经离开的路由对象

#### 导航守卫补充

- 如果是后置钩子, 也就是 `afterEach`, 不需要主动调用 **`next()` 函数**
- `beforEach` 必须要调用 **`next()` 函数**, 不然就会终止, 不会往下执行
- 上面使用的导航守卫, 被称之为全局守卫, 除此之外, 还有路由独享的守卫、组件内的守卫

### \$router 和 $route 的区别

- `$router` == `Vue-Router` 实例对象
- `$route` == 当前处于活跃状态的路由

**所有组件都继承自 Vue 的原型**, 所以, 所有组件都拥有 **\$router 和 $route**
