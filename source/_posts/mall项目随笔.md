---
title: mall项目随笔
date: 2020-05-05 21:33:11
tags: 项目
toc: true
categories: 
- Vue
---

## 项目介绍

**技术栈**

- Vue2.0 (核心框架)
- Vue-CLI 4.0 (Vue 脚手架)
- Vue-Router (SPA 页面路由)
- Vuex (状态管理)
- Axios (网络请求)
- ES 6 (JavaScript 语言的下一代标准)
- Less (CSS 预处理器)
- Better-Scroll (让移动端的滚动更为流畅)
- FastClick (解决移动端点击 300ms 延迟)
- Vue-Lazyload (懒加载工具)
- PostCss (css 代码转化工具)

[在线预览](http://mall.coderlion.com/)

[GitHub 地址](https://github.com/cszhjh/mall)

<!-- more -->

## 初始化项目

通过 **Vue-CLI 4.2.3** 创建项目

```shell
vue create mall
```

## 目录划分及相关配置

### 划分目录结构 **(父级目录为 src)**

- `assets`: 创建 `img`、`css` 文件夹

- `common`: 存放一些公共的 JS 文件, 例如公共的**常量**、**方法**、**工具类**

- `components`: 存放一些公共的组件, 这里还可以分成两个文件夹: `common` 和 `content`
- `common`: 存放一些完全公共的组件, 完全独立的组件内容, 即使存放在下一个项目也能用的组件
  - `content`: 对本项目业务来说是公共的, 存放在下一个项目里时不能使用的组件

- `views`: 主要存放一些视图的相关业务和代码

- `router`: 存放一些路由相关的代码

- `store`: 存放一些 Vuex 公共状态管理相关的内容

- `network`: 存放一些网络相关的代码

### 引入两个初始化 CSS 文件 **(父级目录为 assets/css)**

- 初始化 CSS 文件, 让样式在各大浏览器显示统一的样式

  - 创建一个 `normalize.css` 文件, 这里推荐使用 [normalize](https://github.com/necolas/normalize.css)
  - 也可以通过 `npm install normalize.css` 来进行下载

- 创建一个 `base.css` 文件用来对项目进行统一初始化

  - 在这个文件里引用 `normalize` 文件, 然后再在 `App.vue` 文件内引入这个文件

**`base.css` 文件**

```css
@import './normalize.css';
```

**`App.vue` 文件**

```javascript
@import './assets/css/base.css';
```

### 路径配置别名

在**项目根目录**下创建一个 `vue.config.js` 配置文件, 到时候会将这个文件和公共配置进行一个合并

```javascript
module.exports = {
  configureWebpack: {
    // 表明你要配置的是哪个配置文件
    resolve: {
      // resolve 可以解决一些路径相关的问题
      alias: {
        // 配置别名
        // '@': 'src' 默认已经配置了这个别名
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'store': '@/store',
        'views': '@/views'
      }
    }
  }
}
```

### 统一代码风格

在**项目根目录**下创建一个 `.editorconfig` 配置文件, 统一代码风格

```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

## 路径问题

上面我们已经为路径配置了别名, 但在使用时应注意以下几点:

- 在 JS 中使用可直接使用别名

  ```javascript
  import 'components/HelloWorld.vue'
  ```

- 在含有 `src`、`href` 等路径属性时需在其别名前加上 `~`

  ```vue
  <img src="~asstes/logo.png" />
  ```

## 公共组件

制作前要想好组件是否可复用, 是**完全公共的组件**还是**仅项目公共组件**

### 完全公共组件

`tabbar` : 页面底部切换组件

[![teJOCn.png](https://s1.ax1x.com/2020/05/28/teJOCn.png)](https://s1.ax1x.com/2020/05/28/teJOCn.png)

`navbar` : 顶部导航

[![teJX3q.png](https://s1.ax1x.com/2020/05/28/teJX3q.png)](https://s1.ax1x.com/2020/05/28/teJX3q.png)

[![teJq4s.png](https://s1.ax1x.com/2020/05/28/teJq4s.png)](https://s1.ax1x.com/2020/05/28/teJq4s.png)

`swiper` : 轮播图

[![teJbNj.png](https://s1.ax1x.com/2020/05/28/teJbNj.png)](https://s1.ax1x.com/2020/05/28/teJbNj.png)

`toast` : 提示框

[![teJvvV.png](https://s1.ax1x.com/2020/05/28/teJvvV.png)](https://s1.ax1x.com/2020/05/28/teJvvV.png)

`scroll` : `better-scroll` 组件

### 仅项目公共组件

`mainTabBar` : 使用 `tabbar` 插槽的组件

[![teJOCn.png](https://s1.ax1x.com/2020/05/28/teJOCn.png)](https://s1.ax1x.com/2020/05/28/teJOCn.png)

`tabControl` : 分类菜单

[![teJzuT.png](https://s1.ax1x.com/2020/05/28/teJzuT.png)](https://s1.ax1x.com/2020/05/28/teJzuT.png)

`backTop` : 回到顶部按钮

[![teYSDU.png](https://s1.ax1x.com/2020/05/28/teYSDU.png)](https://s1.ax1x.com/2020/05/28/teYSDU.png)

`goods` : 商品展示

[![teYpbF.png](https://s1.ax1x.com/2020/05/28/teYpbF.png)](https://s1.ax1x.com/2020/05/28/teYpbF.png)

## tabControl 的下拉吸顶效果

1. 获取到 `tabControl` 的 `offsetTop`
   - 必须知道滚动到多少时, 开始有吸顶效果, 这个时候就需要获取距离顶部的距离是多少
   - 如果直接获取到 `tabControl` 的 `offsetTop` 的值是不正确的, 因为**图片加载比较慢的原因**
   - 监听 **HomeSwipper(轮播图)** 中的任意一个 `img` 的加载完成后发出**自定义事件**, 在 `Home.vue` 监听事件后获取正确的值 `this.$refs.tabControl.$el.offsetTop`
2. 判断滚动的距离为元素添加 `fixed` 样式
   - 但是 **`better-scroll` 是通过改变 `translate` 来实现滚动的**, `fixed` 样式依然会被滚到上面, 所以这个方法不管用
3. 通过复制一个相同的组件, **放在 `better-scroll` 外面**, 默认隐藏, 当组件重叠的时候显示, 并设置 **层级(`z-index`)** 就可以了
4. 这里有一个问题, 两个组件的点击事件是不同步的, 要解决这个问题只需要在点击事件里让这两个组件的当前状态的值一致就可以了

## backTop

点击回到顶部, 这里设置整个组件为点击事件, 一般情况下直接为组件添加原生事件是不行的, **可以使用修饰符 `.native` 来实现绑定原生事件**

```vue
<back-top @click="backClick" />  // 这样是没有效果的
<back-top @click.native="backClick" />  // 有效果
```

使用 `better-scroll` 对象里的方法 `scrollTo(0,0)` 来实现回到页面的顶部

这里直接在滚动组件 `Scroll.vue` 里封装了一个 **`scrollTo` 方法**

```javascript
/**
 * 设置跳转位置, 默认跳转时间300ms
 */
scrollTo(x, y, time = 300) {
  this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
},
```

点击事件

```javascript
<scroll ref="scroll">
  滚动的组件
</scroll>
<back-top @click.native="backTop" v-show="isShowBackTop" />

/**
  * 回到顶部
  */
backTop() {
  this.$refs.scroll.scrollTo(0, 0);
},

/**
  * 监听 better-scroll 的滚动事件
  * 1. 显示/隐藏backTop
  * 2. 是否吸顶tabControl
  */
contentScroll(position) {
  // 判断BackTop是否显示
  this.listenerShowBackTop(position.y);

  // 决定tabControl是否吸顶(position: fixed)
  this.isTabFixed = Math.abs(position.y) >= this.tabOffsetTop;
}

/**
  * 显示/隐藏BackTop
  */
listenerShowBackTop(positionY) {
  this.isShowBackTop = Math.abs(positionY) >= BACK_POSITION;
}
```

`this.$refs.scroll` 获取的就是滚动组件里的 `scroll` 对象, 然后直接调用里面定义的方法就可以了

## better-scroll

### 入门

这里使用的原生的滚动效果, 在手机上使用可能会有延迟感, 卡顿感, 给用户的体验并不是很好, 所以推荐使用 [Better-Scroll](https://github.com/ustbhuangyi/better-scroll/blob/master/README_zh-CN.md)

[![teYCE4.png](https://s1.ax1x.com/2020/05/28/teYCE4.png)](https://s1.ax1x.com/2020/05/28/teYCE4.png)

`Better-Scroll` 是作用在外层 `wrapper` 容器上的, 滚动的部分是 `content` 元素

**注意**

- `wrapper` 必须定高, 并且设置 `overflow: hidden`
- `Better-Scroll` 只处理容器(`wrapper`)的第一个子元素(`content`)的滚动, 其它的元素都会被忽略

某些情况下, 我们希望 **`wrapper` 高度自适应**, 例如本项目中 **顶部导航栏和底部导航栏高度固定**, 中间可滚动区域的 `wrapper` 高度自适应, 那么可以采取以下方案

```css
/* .scroll-content的父元素 */
#home {
  position: relative;
  height: 100vh;
}

.scroll-content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
```

最简单的初始化代码如下

```javascript
import BScroll from 'better-scroll'
let wrapper = document.querySelector('.wrapper')
let scroll = new BScroll(wrapper)
```

`Better-Scroll` 提供了一个类, 实例化的第一个参数是一个原生的 DOM 对象
当然, 如果传递的是一个字符串, `Better-Scroll` 内部会尝试调用 `querySelector` 去获取这个 DOM 对象

如果是在 Vue 中使用, **推荐使用 `ref` 的方式拿到 DOM 对象**, 防止类名相同而拿不到对象

- `ref` 如果是绑定在组件中的, 那么通过 `this.$refs.refname` 获取到的是一个组件对象
- `ref` 如果是绑定在普通的元素中, 那么通过 `this.$refs.refname` 获取到的是一个元素对象

### 监听事件

默认情况下 `BScroll` 是不可以实时的监听滚动位置, 如果你想监听滚动, 可以传递第二个参数

```javascript
import BScroll from 'better-scroll'

let wrapper = document.querySelector('.wrapper')
let scroll = new BScroll(wrapper, {
  probeType: 3,
  pullUpLoad: true,
  click: true
})

scroll.on('scroll', position => {
  console.log(position) // 这里就可以打印监听的滚动的位置了
})

scroll.on('pullingUp', () => {
  console.log('上拉加载更多')

  //scroll.finishPullUp()
  setTimeout(() => {
    scroll.finishPullUp()
  }, 2000)
})
```

`probeType` : 侦测类型

- 这里可以传递的参数有 0 、1 、2 、3
- 0 和 1 都是不侦测实时的位置
- 2 是在手指滚动的过程中侦测, 手指离开后的惯性滚动过程中不侦测
- 3 是只要是滚动都会侦测

`pullUpLoad` : 监听滚动到底部事件

- 默认只会触发一次, 如果想多次触发, 必须要在每次触发事件后调用 `scroll.finishPullUp()` 来结束这次事件, 这样就可以进行多次监听滚动到底部事件了
- 如果不想太过频繁的触发事件, 可以将调用包裹在一个定时器中

`click` : 监听点击事件

- 如果滑动区域内有除了 `button` 按钮以外的点击事件, 要加上这个才能点击, 否则点击事件会失效
- `button` 按钮无论该属性为 `true` | `false` 都会生效

### 封装

这里用的是 `@1.13.2` 版本的, 如果是 `@2.0` 版本以上的要参考官方的方式

在 Vue 中使用的封装

```vue
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      // 由使用者决定侦测类型和是否监听滚动到底部事件
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 创建 BScroll 对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 监听滚动的位置
      if (this.probeType == 2 || this.probeType == 3) {
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })
      }

      // 监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      /**
       * 设置跳转位置
       */
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },

      /**
       * 刷新底部上拉事件
       */
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },

      /**
       * 刷新scroll可滚动高度
       */
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },

      /**
       * 获取当前scroll的y值
       */
      getScrollY() {
        return this.scroll.y ? this.scroll.y : 0
      }
    }
  }
</script>
```

### 使用

使用时将封装好的组件导入, 并将要滑动的区域用标签包裹起来

```vue
<scroll
  class="scroll-content"
  ref="scroll"
  :probe-type="3"
  :pull-up-load="true"
  @scroll="contentScroll"
  @pullingUp="loadMore"
>
  <div>需要包裹的内容</div>
</scroll>
```

### better-scroll 有时不能滚动 bug

[![teYPUJ.png](https://s1.ax1x.com/2020/05/28/teYPUJ.png)](https://s1.ax1x.com/2020/05/28/teYPUJ.png)

`better-scroll` 对象的 `scrollerHeight` 方法里面记录了可滚动内容的高度, 这个属性是根据放在 `content` 中的子组件的高度来决定的, 但是在刚开始计算 `scrollerHeight` 属性时, **由于图片加载比较慢, 所以没有将图片高度计算在内, 所以得到的可滚动高度是错误的**, 后面图片加载进来之后高度被撑开了, 但是 `scrollerHeight` 属性并**没有进行更新**, 所以滚动出现了问题

**解决方案:**

监听每一张图片是否加载完成, 只要有一张图片加载完成, 就执行一次 `refresh()`

- 原生的 JS 监听图片加载完成的方式: `img.onload = function() {}`

- Vue 中监听: `@load=imageLoad`, 这里是非父子组件通信

  1. 通过 `Vuex` 传递方法

  2. 通过**事件总线** `$bus` 的方式
  
     - 因为有多个页面都用到 `better-scroll`, 为了方便管理, 这里使用事件总线 `$bus` 的方式传递方法

1. 在 (`main.js`) Vue 原型上添加 `$bus`

   ```javascript
   Vue.prototype.$bus = new Vue()
   ```

2. 将方法发送到 `$bus` 中

   ```javascript
   imageLoad() { this.$bus.$emit('itemImageLoad') }
   ```

3. 通过 `$bus` 监听图片加载完成, 并调用 `refresh`

   ```javascript
   this.$bus.$on('itemImageLoad', () => {
     调用refresh
   })
   ```

`$bus` 取消事件监听

```javascript
this.$bus.$off('方法名', '对应的处理函数')
```

### 防抖

每张图片加载完之后都会立刻调用一次 `refresh`, 这对于性能上来说无异于是负担, 所以, 通过**防抖**对性能进行优化

```javascript
/**
 * 防抖
 */
function debounce(func, delay = 100) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func && func.apply(this, args)
    }, delay)
  }
}
```

### 解决移动端 URL 栏 和 底部工具栏 显示/隐藏 时高度 Bug

**Bug 原因**

移动端下浏览器对 100vh 的定义不考虑 URL 栏 和 底部工具栏 的高度(无论显示还是隐藏), 可以用下面这张图直观地体现问题

[![teYi59.png](https://s1.ax1x.com/2020/05/28/teYi59.png)](https://s1.ax1x.com/2020/05/28/teYi59.png)

当地址栏可见时, 由于移动浏览器不正确地将 `100vh` 设置为屏幕高度而没有显示地址栏, 因此屏幕底部被切断
在上图中, 应该在屏幕底部的按钮被隐藏了
更糟糕的是, 当用户第一次使用手机访问网站时, 地址栏会显示在页面顶部, 因此用户体验是很糟糕的

设置 `home` 高度也不能直接使用 `100%`, 因为 `100%` 是相对与父元素, 而 `home` 的父元素的高度又没有固定, 而是依赖与 `home` 的高度撑开, 所以百分比无效

**解决方案 (`window.innerHeight`)**

解决这个问题的一种方法是依赖 **JavaScript** 而不是 CSS, 当页面加载时, 将高度设置为 `window.innerHeight` 将正确地将高度设置为窗口的可见部分

使用 `window.innerHeight` 动态设置高度
当窗口大小改变时重新设置高度为 `window.innerHeight`, 因为 `window.innerHeight` 的高度**不包括地址栏和工具栏**

- 如果地址栏是可见的, 那么 `window.innerHeight` 将是屏幕可见部分的高度, 正如你所期望的那样
- 如果地址栏是隐藏的, 那么 `window.innerHeight` 是全屏的高度

```vue
<template>
  <div id="home" :style="{ height: homeHeight }"><div>
</template>

<script>
export default {
  data() {
    return {
      homeHeight: window.innerHeight + 'px'
    }
  }
  mounted() {
    window.addEventListener("resize", () => {
      this.homeHeight = window.innerHeight + "px"
    })
  }
}
</script>

<style>
  #home {
    position: relative;
    /* height: 100vh */
  }
</style>
```

## 让 Home 不销毁(destroyed), 并在路由来回切换后回到离开时的位置

**让 `home` 不要随意销毁掉**

添加 `keep-alive` 就可以了

**让 `home` 中的内容保持原来的位置**

```javascript
data() {
  return {
    saveY: 0
  }
},
activated() {
  // 当路由处于活跃状态时, 将页面回到离开时的位置, 且刷新一次 scroll 的高度
  this.$refs.scroll.scrollTo(0, this.saveY, 0)
  this.$refs.scroll.refresh()
},
deactivated() {
  // 当路由处于不活跃状态时, 保存 scroll 的 y 值
  this.saveY = this.$refs.scroll.getScrollY()

  // 取消该路由的图片加载事件监听
  this.$bus.$off("itemImageLoad", this.itemImageListener);
}
```

## 详情页

`this.$nextTick(() => {})` 在 `created` 中这个函数意思是: 等模板渲染完后就执行这个函数, 从这里就可以拿到一些数据, 这个时候对应的 DOM 已经报备渲染出来了, 但是图片依然是没有加载完

[![teYkCR.png](https://s1.ax1x.com/2020/05/28/teYkCR.png)](https://s1.ax1x.com/2020/05/28/teYkCR.png)

一定要将详情页销毁

```vue
<keep-alive exclude="Detail">
  <router-view />
</keep-alive>
```

如何判断一个对象是不是一个空的对象

```javascript
const obj = {}
Object.keys(obj).length === 0
```

### 混入(mixin)的使用

创建混入对象: `const mixin = {}`

组件中导入: `mixins: [mixin]`

### 点击标题，滚动到对应的主题

- 获取标题的 `offsetTop`
- 在哪里才能获取到正确的 `offsetTop` ?
  1. `created` 肯定不行, DOM 还没渲染
  2. `mounted` 也不行, 图片数据还没有加载完
  3. `nextTick` 也不行, 虽然 DOM 改变触发 `nextTick` 钩子, 但图片不一定加载完, 导致 `offsetTop` 是错误的值

**方案一**

在 `created` 中事先通过**防抖**获得处理函数, 等待图片加载完毕之后再调用该函数

```javascript
created() {
  /**
  * 通过防抖获得 getThemeTopY 函数, 等待图片加载完之后再调用
  */
  this.getThemeTopY = debounce(() => {
    this.$nextTick(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    })
  }, 100);
},
methods: {
  /**
   * 刷新scroll高度, 且获得各个标题的 offsetTop
   */
  detailImageLoad() {
    this.refresh();
    this.getThemeTopY();
  }
}
```

**方案二**

等待所有图片加载完毕

```javascript
methods: {
  detailImageLoad() {
    // 判断所有的图片都加载完了, 进行一次回调
    if (++this.counter === this.imageLength) {
      this.refresh();
      this.$emit("detailImageLoad");
    }
  }
}
```

## vuex

`mutations` 唯一的目的就是修改 `state` 中状态, 最好是其中的每个方法尽可能完成得事件比较单一一点, 否则每次执行的时候执行的方法名字一样, 不知道到底执行的是哪个

如果有逻辑判断推荐放到 `actions` 里, 执行的方法可以放到 `mutations` 里, 这样就可以跟踪每个想要调试的点

```javascript
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCount(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      state.cartList.unshift(payload)
    }
  },
  actions: {
    addToCart({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        let oldProduct = state.cartList.find(item => item.iid === payload.iid)

        if (oldProduct) {
          commit('addCount', oldProduct)
          resolve('当前商品已被添加到购物车+1')
        } else {
          payload.count = 1
          payload.checked = true
          commit('addToCart', payload)
          resolve('已添加至购物车')
        }
      })
    }
  }
})
```

### 目录结构

建议分类成一个一个的文件, 这样方便管理, 还可以封装常量文件

`index.js`

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  cartList: []
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
```

## toast 插件封装

在 **`components/common/toast` 文件夹**下新建两个文件

- `index.js`
- `Toast.vue`

`index.js`

```javascript
import Toast from './Toast.vue'

export default {
  install(Vue) {
    const toastConstructor = Vue.extend(Toast)
    const toast = new toastConstructor()
    toast.$mount(document.createElement('div'))
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast
  }
}
```

`Toast.vue`

```vue
<template>
  <div v-show="isShow" class="toast">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration = 2000) {
        this.isShow = true
        this.message = message

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    padding: 8px 10px;
    color: #fff;
    text-align: center;
    border-radius: 8px;
    z-index: 9999;
  }
</style>
```

`main.js`

```javascript
import toast from './components/common/toast/index'

Vue.use(toast) // 这里会去执行 index.js 里的 install 方法
```

使用的时候, 只需要: `this.$toast.show("需要显示的文字", 2000)` 就可以了

## 细节处理

### FastClick

使用 `FastClick` 解决移动端点击 `300ms` 的延迟

**安装**

```shell
npm install fastclick --save
```

**使用 (在 `main.js` 中安装插件)**

```javascript
import FastClick from 'fastclick'

FastClick.attach(document.body)
```

### 图片懒加载

图片需要显示在屏幕上时再加载

**安装**

```shell
npm install vue-lazyload --save
```

**使用 (在 `main.js` 中安装插件)**

```javascript
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  // 显示占位图
  loading: require('./assets/img/common/placeholder.jpg')
})
// 修改组件中 img 的属性 :src => v-lazy
```

## 快捷修改 CSS 单位(适配不同设备)

项目直接是使用的 `px` 单位进行开发的, 这里改成 `vm` 单位

使用插件, 有很多类似的插件, 这里使用的 `postcss-px-to-viewport`, 这是开发时依赖

**安装**

```shell
npm install postcss-px-to-viewport --save-dev
```

**配置(在项目根目录下创建 `postcss.config.js` 配置文件)**

```json
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视口宽度, 对应的是设计稿宽度
      viewportHeight: 667, // 视口高度, 对应的是设计稿的高度
      unitPrecision: 5, // 指定'px'转换为视口单位值的小数位数(保留5位小数)
      viewportUnit: 'vw', // 指定需要转换成的视口单位, 建议使用vw
      selectorBlackList: ['ignore'], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于'1px'不转换为视口单位
      mediaQuery: false, // 允许在媒体查询中转换'px'
      exclude: [/TabMenu\.vue/] // 排除文件名包含 TabBar 的文件，必须是正则来匹配文件
    }
  }
}
```

这样项目中所有的 `px` 单位就会变成 `vm` 单位

## 项目部署到远程服务器

使用 Webpack 打包项目

```shell
npm run build
```

使用服务器软件: `tomcat`、`nginx`, 这里使用 `nginx`

将 `build` 文件中的所有**文件、文件夹、图片**拷贝到站点根目录下

### 刷新页面 404

**问题**
将项目部署到远程服务器上后, 在页面中一旦刷新, 会出现 `404`

**原因**

使用 `history` 模式时, 还需要后台配置支持
因为我们的应用是个单页客户端应用, 如果后台没有正确的配置, 当直接访问 http://mall.coderlion.com/home 就会报 `404` 的错误

所以需要在服务端增加一个覆盖所有情况的候选资源: 如果 URL 匹配不到任何静态资源, 则应该返回同一个 `index.html` 页面, 这个页面就是 `home` 页面

**解决方案**

为 nginx 服务器添加**重定向**配置

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

其他服务器配置参照[官方文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html#后端配置例子)

## Vue 响应式原理

1. 当数据发生修改时, Vue 内部是如何监听 `message` 数据的改变
   - **Object.defineProperty** $\rightarrow$ 监听对象属性的改变
2. 当数据发生改变, Vue 是如何知道要通知那些人, 界面发生刷新
   - # **发布订阅者模式**

[![teYA81.png](https://s1.ax1x.com/2020/05/28/teYA81.png)](https://s1.ax1x.com/2020/05/28/teYA81.png)
