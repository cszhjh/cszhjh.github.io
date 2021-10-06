---
title: Vue 文件的 “export  default”
date: 2020-05-01 09:22:11
tags: Vue
categories:
- Vue
---

## “export default” 究竟导出了什么?

- .vue 文件, 这个文件会被 **vue-loader(如果你用的是 Webpack 的话) 加工处理**
- 其中 `<template>` 部分会被 **vue-template-compiler 编译成 render 函数**, 并插入到 `export default { render() }`中被导出的 JS 对象中
- `<style>` 部分会被转换成样式函数或提取为**独立的 CSS 文件(取决于你的 Webpack 配置)**
- 所以在尽管`<template>`和`<style>`不在 `export default` 中仍然会被导出

<!-- more -->

## 为什么不可以用 “export” 代替 “export default”

- **vue-loader** 只会处理 `<script>` 部分默认导出的内容(也就是 `export default` 出来的内容)
- 所以你修改了导出的类型变成 **export** 就不可以啦

