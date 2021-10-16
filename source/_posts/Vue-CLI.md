---
title: Vue-CLI
date: 2020-05-01 08:05:51
tags: Vue-CLI
toc: true
categories:
- Vue
---

## Vue-CLI (Vue 脚手架) 介绍

- **Vue-CLI** 是一个专门为**单页面应用快速搭建繁杂的脚手架**, 它可以轻松的创建新的应用程序而且可用于**自动生成Vue和webpack的项目模板**
- 如果只是简单的写几个 Vue 的 **Demo 程序**, 那么不需要 **Vue-CLI**
- 如果你在**开发大型项目**, 那么你需要, 并且必然**需要使用 Vue-CLI**
- **Vue-CLI 使用前提**
  - Node.js
  - Webpack

<!-- more -->

## 安装 Vue 脚手架

**Vue-CLI** 的安装

```shell
npm install -g @vue/cli
```

- 注意:
  - 上面安装的是 Vue-CLI 的最新版本
  - 如果想按照 **Vue-CLI2** 的方式初始化项目时是不可以的
  - 如果使用 **npm** 安装比较慢的话可以使用 **cnpm** 进行安装

### cnpm 安装

由于国内直接使用 npm 的官方镜像时非常慢的, 所以推荐使用淘宝 npm 镜像

```shell
npm install -g cnpm --registry="https://registry.npm.taobao.org"
```

安装之后就可以使用 cnpm 命令来安装模块了

### 拉取 2.x 模版 (Vue-CLI 旧版本)

**Vue-CLI 3** 和旧版本使用了相同的 Vue 命令, 所以 **Vue-CLI 2** 被覆盖了, 如果你仍想使用旧版本的 `vue init` 功能, 你可以全局安装一个桥接工具:

```shell
npm install -g @vue/cli-init
## 'vue init' 的运行效果将会跟 'Vue-CLI@2.x' 相同
```

## Vue-CLI 的使用

### Vue-CLI 2

初始化项目

```shell
vue init webpack 项目名称
```

[![tetay6.jpg](https://s1.ax1x.com/2020/05/28/tetay6.jpg)](https://s1.ax1x.com/2020/05/28/tetay6.jpg)

- **Project name**: 项目名称(一般和初始化的项目名称一致)
- **Project description**: 项目描述
- **Author**: 作者(姓名, 邮箱)
- **Vue build**: 构建项目时使用 **Runtime-Compiler** 还是 **Runtime-only**
- **Install vue-router?** 是否安装 Vue 的路由
- Use ESLint to lint your code? 是否使用 ESlint 限制代码规范
  - 如果**选择了 ESLint**, 那么需要选择 ESLint 规范
  - **Pick an ESLint preset (Use arrow keys)** 选择规范
- **Set up unit tests**: 是否使用单元测试
- **Setup e2e tests with Nightwatch?** 是否端到端测试, 且安装 Nightwatch?
- **Should we run `npm install` for you after the project has been created? (recommended)**: 你准备管理项目时使用 NPM 还是 Yarn 呢?

#### runtime-compiler 和 runtime-only 的区别

无论是使用 **runtime-compiler** 还是使用 **runtime-only** 只要 **(template 或 render函数) 与 el 一起使用**, 都会替换掉 el 挂载的标签

**唯一不同: main.js**

此为 `runtime-compiler` 的 `main.js`

```javascript
import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
```



此为 `runtime-only` 的 `main.js`

```javascript
import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: h => h(App)
});
```

[![tetUQx.png](https://s1.ax1x.com/2020/05/28/tetUQx.png)](https://s1.ax1x.com/2020/05/28/tetUQx.png)

- **runtime-compiler 的运行过程**
  - `template` $\rightarrow$ 解析 $\rightarrow$ `ast` $\rightarrow$ 编译 $\rightarrow$ `render` $\rightarrow$ `virtual dom` $\rightarrow$ `UI`
- **runtime-only 的运行过程**
  - rander $\rightarrow$ virtual dom $\rightarrow$ UI

**区别**

- `runtime-only` 性能更高
- `runtime-only` 文件更小 (比 `runtime-compiler` 轻 `10kb` 左右), 因为 `template` 的解析, `ast` 编译都会有相应的代码

**简单总结**

- 如果在之后的开发中, 你依然使用 `template`, 就需要选择 **runtime-compiler**
- 如果你之后的开发中, 使用的是 `.vue` 文件开发, 那么可以选择 **runtime-only**

#### render 函数

```javascript
render: function (createElement) {
  // 1. createElement("标签", {标签的属性}, ["内容"])
  // return createElement("div", { class: "box" }, ["hello world"]);
  // 2. createElement(组件)
  return createElement(App)
}
```

**.vue 文件里的 template 需不需要解析呢?**

- 答案是不需要
- 因为在 `.vue` 文件中的 `template` 由 **vue-template-compiler** 解析成 `render` 函数

### Vue-CLI 3

**Vue-CLI 3 及以上版本**号称”零配置”, 它将大部分配置文件都藏在 **.git文件夹中**, 仅有少部分是需要开发者自行配置的

初始化项目

```shell
vue create my-project
```

**Please pick a preset**: 选择配置(默认配置 || 手动选择一些特性)

- 如果选择**手动设置** \>> **Check the features needed for your project**: 选择特性(按空格 选中|取消选中)

  - **Where do you prefer placing config for Babel, ESLint, etc.?**: (将某些配置文件放到独立的文件中 || 将某些配置放在**package.json**中)
  - **Save this as a preset for future projects?**: 是否将刚才的配置保存为将来项目的预置
  
- 如果选择 yes

- **Save preset as**: 保存的名字
- **Pick the package manager to use when istalling dependencies**: 选择 NPM 或 Yarn

**main.js 变化(最终版本)**

```javascript
new Vue({
  render: h => h(App)
}).$mount("#app");
```

**用 $mount(“#app”) 取缔了 el**

- `el` 最终还是会通过 `$mount()` 进行挂载

#### 配置 Vue CLI3 的方式

启动配置服务器: `vue ui` 指令, 安装`@vue/cli` 同时安装了 **vue** 和 **vue ui**

- 运行`vue ui`命令
- 在项目根目录创建文件名为 **“vue.config.js”**, 然后运行`git commit -m '添加一个配置文件'`

## Vue-CLI 2 和 Vue-CLI 3 的区别

- Vue-CLI 3 是基于 webpack4 打造, Vue-CLI 2 还是 webpack3
- Vue-CLI 3 的**设计原则是“零配置”**, 移除的配置文件根目录下的, **build 和 config 等目录**
- Vue-CLI 3 提供了 `vue ui` 命令, 提供了可视化配置, 更加人性化
- Vue-CLI 3 **移除了 static 文件夹, 新增了 public 文件夹, 并且 index.html 移动到 public 中**
