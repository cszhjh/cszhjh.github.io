---
title: template 分离
date: 2020-04-29 15:34:29
tags: Vue
categories:
- Vue
---

## 第一步分离

```javascript
const App = {
  template: `
    <div>
      <h2>message</h2>
      <button @click="btnClick">button</button>
      <h2>{{name}}</h2>
    </div>
  `,
  data() {
    return {
      message: "hello world",
      name: "zjh"
    };
  },
  methods: {
    btnClick() {
      console.log("click");
    }
  }
};

const app = new Vue({
  el: "#app",
  template: "<App></App>",
  components: {
    App
  }
});
```

<!-- more -->

## 第二步分离前提

### 使用webpack模块打包工具

- 如果你使用的是**webpack模块打包工具**
- 那么想要编译 Vue, 需要安装两个 **loader** 和相应的 **loader 配置**
  - `vue-loader`(14.x 版本开始, 要想使用该 loader 还需要配置一个插件, 或降低版本)
  - `vue-template-compiler`

### 使用Vue-CLI脚手架工具

- 如果你使用了**Vue-CLI**脚手架来构建你的项目
- 那么恭喜你, 你不必为安装和配置各种**loader**烦恼了, **Vue-CLI**已经自动帮你完成了这些事情

## 第二步分离

以 `app.vue` 文件来进行举例

```vue
<template>
  <div class="title">
    <h2>message</h2>
    <button @click="btnClick">button</button>
    <h2>{{ name }}</h2>
    <cpn></cpn>
  </div>
</template>

<script>
  //如果要引用子组件的话在这里进行, 将子组件导入到该文件中
  // 如果你使用Vue-CLI构建项目的话, ".vue"后缀可以省略
  import Cpn from "./Cpn.vue";

  export default {
    // name属性在将来Vue-Router中大有用处
    // 如果你不使用Vue-Router的话, 可以省略
    name: "app",
    components: {
      Cpn
    },
    data() {
      return {
        message: "hello world",
        name: "zjh"
      };
    },
    methods: {
      btnClick() {
        console.log("click");
      }
    }
  };
</script>

<style>
  .title {
    color: blue;
  }
</style>
```

在 **main.js** 中使用 `app.vue`

```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

