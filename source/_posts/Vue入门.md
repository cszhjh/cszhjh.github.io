---
title: Vue 入门
date: 2020-04-28 10:41:13
toc: true
tags: Vue
categories:
- Vue
---

## Vue 是什么?

- Vue (读音 /vjuː/, 类似于 view)
- Vue是一套用于构建用户界面的渐进式框架。
- 与其它大型框架不同的是, Vue 被设计为可以自底向上逐层应用。
- Vue 的核心库只关注视图层, 不仅易于上手, 还便于与第三方库或既有项目整合。
- 另一方面, 当与**现代化的工具链**以及各种**支持类库**结合使用时, Vue 也完全能够为复杂的单页应用提供驱动。

<!-- more -->

[出自 Vue.js 官方文档](https://cn.vuejs.org/v2/guide/)

- Vue 有很多特点和 Web 开发中常见的高级功能
  - 解耦视图和数据
  - 可复用的组件
  - 前端路由技术
  - 状态管理
  - 虚拟 DOM

## Vue 实例

```javascript
new Vue(options)
options = {
  el: "value" // "value - 元素选择器" 进行数据绑定(实际上调用了$mount())
  data: {
    // 数据
    // 实例对象可直接使用Object的方式定义数据
    // 组件必须通过return一个Object的方式来定义数据
  },
  computed: {
    // 计算属性
    // 优点: 
    //      在template中调用时可省略"()", 即调用get函数
    //      当不发生set时, 每次get都不会重新计算, 效率提高
    attr: {
      set: function(newValue) {}
      get: function() {}
    }
  }
  methods: {
    // 方法
    // 在template中使用时需要"()"来调用
    attr: function() {}
  },
  filters: {
    // 过滤器方法:
    // 使用时: data | function, 会自动把 data 作为参数传入 function 中
    attr: function(data) {}
  },
  components: {
    // 局部组件:
    // "组件标签名": 组件构造器
  },
  watch: {
    // 监听Vue中数据发生改变的事件
    attr(newValue, oldValue) {

    }
  },

  /** 以下均为 生命周期函数 **/

  created() {
    // 当组件被创建后回调该函数
    // 注意: 组件被创建后DOM并不一定创建完成, 即不能在created中操作DOM元素
  },
  mounted() {
    // 当组件的template挂载到DOM之后回调该函数
  },
  updated() {
    // 当页面发生更新后回调该函数
  },
  destroyed() {
    // 组件销毁后回调
  }
}
```

## 生命周期

[![tewvFS.png](https://s1.ax1x.com/2020/05/28/tewvFS.png)](https://s1.ax1x.com/2020/05/28/tewvFS.png)

[![tewxJg.png](https://s1.ax1x.com/2020/05/28/tewxJg.png)](https://s1.ax1x.com/2020/05/28/tewxJg.png)

## 计算属性详细

- 在`template`中使用时不需要`()`, 会默认调用`get`函数
- 使用时`attr`即调用`get`方法, 为`attr`赋值即调用`set`方法
- 计算属性一般没有`set`方法, 所以计算属性也称只读属性

即可以简写:

```javascript
computed: {
  attr: function() {}

  /** 或以下 es6 语法 **/
  attr: () => {}
}
```

## computed 和 methods 的对比

- computed 的属性如果没有变化, 则 computed 有缓存, 即 computed 只执行一次, 而 methods 没有缓存, 调用几次执行几次
  - 相比之下, 如果某个元素`get`比较多的话推荐使用**computed**
  - 反之, 如果逻辑比较复杂, 那么使用**methods**
