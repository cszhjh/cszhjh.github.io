---
title: Vuex
date: 2020-05-02 10:12:45
tags: Vuex
categories:
- Vue
---

## Vuex 是什么?

- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
  - 它采用**集中式存储管理**应用的所有组件的状态, 并以相应的规则保证状态以一种可预测的方式发生变化
  - Vuex 也集成到 Vue 的官方调试工具 **devtools extension** 中, 提供了诸如零配置的 **time-travel** 调试、**状态快照导入导出**等高级调试功能

<!-- more -->

### 什么是状态管理?

- **状态管理模式、集中式存储管理**这些名词听起来就非常高大上, 让人琢磨不透
- 其实, 你可以简单的将其看成把需要多个组件共享的变量全部存储在一个对象里面
- 然后, 将这个对象放在**顶层的 Vue 实例**中, 让其他组件可以使用
- 那么, 多个组件是不是就可以共享这个对象中的所有变量属性了呢?
- 如果只是这样的话, 为什么官方还要专门出一个插件 Vuex呢? 难道我们不能自己封装一个对象来管理吗?
  - 当然可以, 只是我们要先想想 Vue.js 带给我们**最大的便利**是什么呢? 没错, 就是**响应式**
  - 如果你自己封装实现一个对象能不能保证它里面所有的属性做到响应式呢? 当然也可以, 只是自己封装可能稍微麻烦一些
  - 不用怀疑, Vuex 就是为了提供这样一个在多个组件间共享状态的插件, 用它就可以了(盘它~)

简单理解: 把需要**多个组件共享的变量**全部存储在一个对象里面, 然后将这个对象**放在顶层的 Vue 实例中**, 让其他组件可以使用, 共享这个对象中的所有变量属性, **并且是响应式的**

#### 管理什么状态呢?

有什么状态是需要我们在多个组件间共享的呢?

例如: 多个状态在多个页面间的共享

- 比如用户的登录状态、用户名称、头像、地理位置信息等等
- 比如商品的收藏、购物车的物品等等
- 这些状态信息, 我们都可以放在统一的地方, 对它进行保存和管理, 而且他们还是响应式的

#### 单界面状态管理

在单个组件中进行状态管理是一件非常简单的事情, 如图:

[![teBWCD.png](https://s1.ax1x.com/2020/05/28/teBWCD.png)](https://s1.ax1x.com/2020/05/28/teBWCD.png)

**State** : 状态(姑且可以当做是 `data` 中的属性)
**View** : 视图层, 可以针对 State 的变化, 显示不同的信息 **(响应式)**
**Actions** : 用户的各种操作: 点击、输入等, 会导致状态的改变

#### 多界面状态管理

Vue 已经帮我们做好了单个界面的状态管理, 但是如果是多个界面呢?

多个视图都依赖同一个状态 **(一个状态被修改了, 多个界面需要进行更新)**

**全局单例模式(大管家)**

现在要做的就是将共享的状态抽取出来, 交给 **“大管家”** 统一进行管理, 之后每个试图按照规定进行访问和修改等操作, 这就是 Vuex 的基本思想

[![teBgUK.png](https://s1.ax1x.com/2020/05/28/teBgUK.png)](https://s1.ax1x.com/2020/05/28/teBgUK.png)

## 使用 Vuex

**安装**

```shell
npm install vuex --save
```



接下来, 如同 **Vue-Router** 一般, 它也有独立的文件夹, 以及相应的文件

在 `src` 文件夹下创建 `store` 文件夹, 在 `store` 文件夹下创建 `index.js`

对 `index.js` 使用 `Vuex`

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    // 同步操作
    increment(state, getters) {
      // 参数自动传入
      state.counter++;
    },
    decrement(state, getters) {
      state.counter--;
    }
  },
  actions: {
    // 异步操作
  },
  getters: {
    // 类似于组件中的computed
    getCounter(state, getters) {
      return state.counter * 2;
    }
  },
  modules: {
    // 模块
  }
})
```

**挂载到 Vue 实例中**

我们让所有的 Vue 组件都可以使用这个 `store` 对象

来到 `main.js` 文件, **导入 `store` 对象**, 并且**放在 `new Vue` 中**

```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
```

此后, 在其他 Vue 组件中, 可以通过 `this.$store` 的方式, 获取到 `store` 对象

在组件中使用 `vuex`

```vue
<template>
  <div id="app">
    <h3>{{ $store.state.counter }}</h3>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        message: "App",
      }
    },
    methods: {
      increment() {
        // commit提交, 参数为mutations中的方法名
        this.$store.commit('increment');
      },
      decrement() {
        this.$store.commit('decrement');
      }
    }
  }
</script>
```

这就是使用 Vuex 最简单的使用方式了:

1. 提取出一个公共的 `store` 对象, 用于保存在多个组件中共享的状态
   将 `store` 对象放置在 `new Vue` 对象中, 这样可以保证在所有的组件中都可以使用到
2. 在其他组件中使用 `store` 对象中保存的状态即可
3. 通过 `this.$store.state.属性` 的方式来访问状态
4. 通过 `this.$store.commit(“Mutations中方法”)` 来修改状态

**注意:**

我们通过提交 `Mutations` 的方式, 而非直接改变 `store.state.count`, 这是因为 Vuex 可以更明确的追踪状态的变化, 如果是由多个组件修改同一个状态, 可以知道是由哪个组件修改的什么状态, 便于调试, 所以**不要直接改变 `store.state.count` 的值**

## Vuex 核心概念

### State 单一状态树

Vuex 提出使用**单一状态树(Single Source of Truth)**, 也可以翻译成单一数据源

如果状态信息是保存到多个 Store 对象中的, 那么之后的管理和维护等等都会变得特别困难, 所以 Vuex 使用了单一状态树来管理应用层级的全部状态

单一状态树能够让我们以最直接的方式找到某个状态的片段, 而且在之后的维护和调试过程中, 也可以非常方便的管理和维护

**即仅使用一个 `Vuex.Store` 对象**

### Getters

有时候, 我们需要从 `store` 中获取一些 `state`, 则可以使用 `getters`, 它相当于计算属性, 一些复杂的计算和操作可以写到这里

#### Getters 的基本使用

比如, 现在 `Store` 中有这样的学生信息

```javascript
const store = new Vuex.Store({
  state: {
    count: 0,
      students: [
        { id: 1001, name: 'lyy', age: 18 },
        { id: 1002, name: 'sss', age: 17 },
        { id: 1003, name: 'lin', age: 28 },
        { id: 1004, name: 'jack', age: 24 }
      ]
  }
})
```

现要求获取`年龄小于 20`的学生个数, 可以在 `Store` 中定义 `getters`

```javascript
const store = new Vuex.Store({
  state: {
    count: 0,
    students: [
      { id: 1001, name: 'lyy', age: 18 },
      { id: 1002, name: 'sss', age: 17 },
      { id: 1003, name: 'lin', age: 28 },
      { id: 1004, name: 'jack', age: 24 }
    ]
  },
  getters: {
    getAgeLess20Count(state) {
      // 注意:
      // state由Vuex自动传入
      // 我们推荐使用state对象, 而不是 this 来访问 state 中的状态

      return state.students.filter(stu => stu.age < 20).length
    }
  }
})
```

之后, 在各个组件中想要使用这个 `getters`, 那就变得非常简单了

```vue
<template>
  <div id="app">
    <h3>{{ this.$store.getters.getAgeLess20Count }}</h3>
  </div>
</template>
```

#### Getters 作为参数

如果我们已经有了一个获取所有年龄小于20岁学生列表的 `getters`, 那么可以这样来写

```javascript
getters: {
  // 获取年龄小于20的学生
  getAgeLess20(state) {
    return state.students.filter(stu => stu.age < 20)
  },
  // 获取年龄小于20的学生人数
  getAgeLess20Count(state, getters) {
    return getters.getAgeLess20.length
  }
}
```

#### Getters 传递参数

**getters 默认是不能传递参数的**, 如果希望传递参数, 那么只能让 `getters` 本身返回一个函数, 在这个函数中即可获取到参数, **实际上就是利用了“闭包”的原理**

比如上面的案例中, 我们希望根据 `ID` 获取用户的信息

```javascript
getters: {
  // 根据id查找学生
  getStuByID(state) {
    // return id => state.students.find(stu => stu.id === id)

    // 如果对 ES6 语法不熟悉的话, 以下代码可能更好理解
    return function (id) {
      return state.students.find(stu => stu.id === id)
    }
  }
}
```

在组件中使用

```vue
<template>
  <div id="app">
    <h3>{{ this.$store.getters.getStuByID(1002) }}</h3>
  </div>
</template>
```

### Mutation

Vuex 的 `store` 状态的更新唯一方式: **提交 `Mutation`**

#### Mutations 组成

- 字符串的事件类型(`type`)
- 一个回调函数(`handler`), 该回调函数的第一个参数就是 `state`

#### Mutations 定义方式

```javascript
const store = new Vuex.Store({
  state: {},    // 略
  getters: {},  // 略
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    }
  }
})
```

#### 通过 Mutations 更新状态

在组件中, 通过 `$store` 提交相应的更新方法即可

```javascript
methods:{
  increment() {
    this.$store.commit('increment')
  },
  decrement() {
    this.$store.commit('decrement')
  }
}
```

#### Mutations 传递参数

在通过 `Mutations` 更新数据的时候, 有时候希望携带一些额外的参数, 这种参数被称为 `Mutations` 的 **载荷(Payload)**

比如之前的计数器案例, 每次都是加减 1, 现在想让加减的数字作为一个参数, 传到 `Mutations` 的方法中

[![teBcE6.png](https://s1.ax1x.com/2020/05/28/teBcE6.png)](https://s1.ax1x.com/2020/05/28/teBcE6.png)

[![teB24O.png](https://s1.ax1x.com/2020/05/28/teB24O.png)](https://s1.ax1x.com/2020/05/28/teB24O.png)

如果有很多参数需要传递, 通常会以对象的形式传递, 也就是 `payload` 是一个对象, 再从对象中取出相关的信息

[![teByHx.png](https://s1.ax1x.com/2020/05/28/teByHx.png)](https://s1.ax1x.com/2020/05/28/teByHx.png)

#### Mutations 提交风格

上面的通过 `commit` 进行提交是一种普通的方式

Vue 还提供了另外一种风格, 它是一个包含 `type` 属性的对象

```javascript
incrementCount(num) {
  this.$store.commit({
    type: 'incrementCount',
    num
  })
}
```

`Mutations` 中的处理方式是将整个 `commit` 的对象作为 `payload` 使用, 所以代码没有改变, 依然如下

```javascript
incrementCount(state, payload) {
  state.count += paload.num;
}
```

#### Mutations 响应规则

Vuex 的 `store` 中的 `state` 是响应式的, 当 `state` 中的数据发生改变时, Vue 组件会自动更新

这就要求我们必须遵守一些 Vuex 对应的规则

- 提前在 `store` 中初始化好所需的属性
- 当给 `state` 中的对象添加新属性时, 使用下面的方式
  1. 使用 `Vue.set(obj, ‘newProp’, 123)`
  2. 用新对象给旧对象重新赋值

我们来看一个例子

当我们点击更新信息时, 界面并没有发生对应改变

[![teBf8e.png](https://s1.ax1x.com/2020/05/28/teBf8e.png)](https://s1.ax1x.com/2020/05/28/teBf8e.png)

以上代码给 `state` 中的对象添加新属性时, 由于不是响应式添加, 所以界面不会更新, 要想让界面更新, 可以参考以下方式

```javascript
updateInfo(state, payload) {
  // state.info['height'] = payload.height

  // 方式一：Vue.set()
  // Vue.set(state.info, 'height', payload.height)
  // 方式二：给 info 赋值一个新的对象
  state.info = { ...state.info, 'height': payload.height }
}
```

#### Mutations 常量类型

在 `Mutations` 中, 我们定义了很多事件类型(也就是其中的方法名称), 当我们的项目不断增大时, 可能会出现诸如以下一些问题

- Vuex 管理的状态越来越多, 需要更新状态的情况越来越多
- `Mutations` 中的方法越来越多, 使用者需要花费大量精力去记住这些方法, 甚至是多个文件间来回切换, 查看方法名称, 甚至出现写错的情况

如何避免上述的问题呢?

在各种 `Flux` 实现中, 一种很常见的方案是

- 使用常量替代 `Mutations` 事件的类型
- 将这些常量放在一个单独的文件中, 方便管理以及让整个 `app` 所有的事件类型一目了然

在 `store/index.js` 同级目录下, 创建文件 `mutation-types.js`, 并且在其中定义我们的常量

```javascript
export const UPDATE_INFO = 'update_info'
```

定义常量时, 我们可以使用 ES2015 中的风格, 使用一个常量来作为函数的名称

**使用定义的常量**

[![teBhgH.png](https://s1.ax1x.com/2020/05/28/teBhgH.png)](https://s1.ax1x.com/2020/05/28/teBhgH.png)

### Actions

通常情况下, Vuex 要求 `Mutations` 中的方法必须是**同步方法**, 因为当我们使用 **devtools** 时, `devtools` 可以帮助我们捕捉 **Mutations 的快照**, 但如果是异步操作, 那么 `devtools` 将不能很好的追踪这个操作什么时候会被完成

比如之前的代码, 当执行修改信息操作时, `devtools` 中会有如下信息

[![teB4vd.png](https://s1.ax1x.com/2020/05/28/teB4vd.png)](https://s1.ax1x.com/2020/05/28/teB4vd.png)

但是, 如果 Vuex 中的代码使用了异步函数

```javascript
mutations: {
  [UPDATE_INFO](state, payload) {
    setTimeout(() => {
      state.info = {
        ...state.info, 
        'height': payload.height
      }
    }, 1000);
  }
}
```

这时会发现 state 中的 info 数据一直没有被改变

[![terefS.png](https://s1.ax1x.com/2020/05/28/terefS.png)](https://s1.ax1x.com/2020/05/28/terefS.png)

这是因为 **devtools 无法追踪到异步操作**

虽然强调不要再 `Mutations` 中进行异步操作, 但某些情况, 又确实希望在 Vuex 中进行一些异步操作, **比如网络请求, 这时可以使用 `Actions`**

`Actions` 类似于 `Mutations`, 是用来代替 `Mutations` 进行异步操作的

在 `Actions` 中, 可以将异步操作放在一个 `Promise` 中, 并且在成功或者失败后, 调用对应的 `resolve` 或 `reject`

[![ter6fO.png](https://s1.ax1x.com/2020/05/28/ter6fO.png)](https://s1.ax1x.com/2020/05/28/ter6fO.png)

[![terytK.png](https://s1.ax1x.com/2020/05/28/terytK.png)](https://s1.ax1x.com/2020/05/28/terytK.png)

这里的 `context` 可以当成 `store` 对象,也可以通过 `payload` 传递参数

**context 可以使用对象的解构方式的写法**

```javascript
actions: {
  [UPDATE_INFO]({ state, commit }, payload) {
    return Promise((resolve, reject) => {
      setTimeout(() => {
        commit(UPDATE_INFO, payload)
        resolve('access')
      }, 1000)
    })
  }
}
```

### Modules

`Modules` 是模块的意思，为什么在 Vuex 中我们要使用模块呢?

Vue 使用单一状态树, 意味着很多状态都会交给 Vuex 来管理, 当应用变得非常复杂时, `store` 对象就有可能变得相当臃肿, 为了解决这个问题, Vuex 允许我们将 `store` 分割成模块(Module), 每个模块拥有自己的 `state`、`mutations`、`actions`、`getters` 等

#### Modules 基本使用

我们按照什么样的方式来组织模块呢?

```javascript
const ModuleA = {
  state:{},
  mutations:{},
  // 这里的 context 指的是本模块内 mutations 里的内容
  actions:{},
  // 模块里的getters可以有第三个参数 rootState, 意思是可以拿到根模块中的数据
  getters:{}
}

const ModuleB = {
  state:{},
  mutations:{},
  actions:{},
  getters:{}
}

const store = new Vuex.Store({
  modules:{
    a:ModuleA,
    b:ModuleB
  }
})
// 拿取 state 里的数据的时候要.对应的模块来拿取，其它的使用方法都一样
$store.state.a // ModuleA 的状态
$store.state.b // ModuleB 的状态
```

#### Modules 中的 state

要想知道如何调用 Modules 中的 `state`, 需要先了解一下 Modules 中的 `module` 真实位置

其实, 在 `store` 实例的 `modules` 中定义的 `a` 和 `b` 会被放到 `store` 的 `state` 中

[![tesw8S.png](https://s1.ax1x.com/2020/05/28/tesw8S.png)](https://s1.ax1x.com/2020/05/28/tesw8S.png)

[![tesdC8.png](https://s1.ax1x.com/2020/05/28/tesdC8.png)](https://s1.ax1x.com/2020/05/28/tesdC8.png)

既然 Module 被放到了 `store` 的 `state` 中，那么在其他组件中就可以使用 `this.$store.state` 来调用了

[![tesU4f.png](https://s1.ax1x.com/2020/05/28/tesU4f.png)](https://s1.ax1x.com/2020/05/28/tesU4f.png)

[![tesNUP.png](https://s1.ax1x.com/2020/05/28/tesNUP.png)](https://s1.ax1x.com/2020/05/28/tesNUP.png)

#### Modules 中的 mutations

虽然 `mutations` 是定义在模块中的, 但是在组件中提交时还是使用: `this.$store.commit`

[![tesgU0.png](https://s1.ax1x.com/2020/05/28/tesgU0.png)](https://s1.ax1x.com/2020/05/28/tesgU0.png)

[![tesWCT.png](https://s1.ax1x.com/2020/05/28/tesWCT.png)](https://s1.ax1x.com/2020/05/28/tesWCT.png)

#### Modules 中的 getters

**注意 : `rootState` 可以拿到根模块中的数据, 即全局状态**

[![tes25V.png](https://s1.ax1x.com/2020/05/28/tes25V.png)](https://s1.ax1x.com/2020/05/28/tes25V.png)

[![tescEq.png](https://s1.ax1x.com/2020/05/28/tescEq.png)](https://s1.ax1x.com/2020/05/28/tescEq.png)

#### Modules 中的 actions

几乎与之前的 `actions` 无区别

[![teyYM4.png](https://s1.ax1x.com/2020/05/28/teyYM4.png)](https://s1.ax1x.com/2020/05/28/teyYM4.png)

[![tey8RU.png](https://s1.ax1x.com/2020/05/28/tey8RU.png)](https://s1.ax1x.com/2020/05/28/tey8RU.png)

## 项目结构

当 Vuex 帮助我们管理过多的内容时, 好的项目结构可以让我们的代码更加清晰

这里建议: `state` 的内容可以写在 `index` 里, 其它所有的都抽离成一个模块

[![teyGzF.png](https://s1.ax1x.com/2020/05/28/teyGzF.png)](https://s1.ax1x.com/2020/05/28/teyGzF.png)

[![tey3GT.png](https://s1.ax1x.com/2020/05/28/tey3GT.png)](https://s1.ax1x.com/2020/05/28/tey3GT.png)
