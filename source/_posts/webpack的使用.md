---
title: Webpack 的使用
date: 2020-04-29 18:22:49
tags: Webpack
categories:
- Webpack
---

## 打包命令

- 在当前项目路径下, 输入命令
- `$ webpack 入口 出口`
- **注意: webpack 命令是全局命令**

```shell
webpack ./src/main.js ./dist/bundle.js
```

<!-- more -->

## 配置 webpack.config.js 文件

- 通过 **Node.js** 导入 `pash` 包
- 使用 **Node.js** 前, 初始化 `npm`

```shell
npm init
```

倒入模块路径

```javascript
const path = require("path");
```

配置

```javascript
module.exports = {
  entry: "./src/main.js", // 入口
  output: {
    // 出口对象
    path: path.resolve(__dirname, "dist"), // 出口文件路径
    filename: "bundel.js", // 出口文件名字
    publicPath: "dist/" // 打包资源后自动为url、src添加文件路径
  }
}
```

## 配置 package.json 文件

通过 `npm init` 得到的 `json` 文件配置

```json
{
  "name": "meetwebpack",  // 项目名称
  "version": "1.0.0",   // 项目版本
  "description": "",    // 描述
  "main": "index.js",
  "scripts": {    // 脚本命令映射
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "author": "",
  "license": "ISC"  // 是否开源
}
```

- 将 `webpack` 命令映射到 `npm run build` 上

  - 且优先在项目中寻找本地命令, 如果本地没有该命令再去全局找此命令

## Webpack 打包 (ES6/TS 转 ES5, Less 转 css, vue 转 js 等)

- 在入口 js 中导入此文件
  - 例如: `require("./css/normal.css")`;
- 为 Webpack 扩展 `loader`
  - 更多 `loader` 请上 [Webpack官方文档](https://www.webpackjs.com/loaders/) 查询

### loader 使用

- 通过 `npm` 安装需要使用的 `loader`
- 在官网上查找对应的 `loader`, 例如 `css` 的 `loader`: `css-loader`
- 在` webpack.config.js` 中的 `module` 关键字下进行配置

安装

```shell
npm install css-loader --save-dev
```

配置

```json
module: {
  rules: [
    {
      test: /\.css\$/,
      use: ["style-loader", "css-loader"]
    }
  ]
}
```

- `css-loader` 只负责加载 CSS 文件, 不会帮助我们解析文件
- 所以我们还需要安装解析 CSS 文件的 `loader`

```shell
npm install style-loader --save-dev
```

- 然后在 `use` 属性中添加`style-loader`

```json
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }
  ];
}
```

- 注意: 在使用多个 `loader` 时, Webpack 从右向左执行

  - 即添加`style-loader`必须放在`css-loader`左边

## ES6 转 ES5

- 需要使用 `babel` 的 `loader`

安装

```shell
npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
```

配置

```json
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        }
      }
    }
  ]
}
```

## 配置 Vue

安装

```shell
npm install vue --save
```

导入 vue

```javascript
import Vue from "vue"
```

- **runtime-only** 代码中, 不可以使用任何的 `template`
- **runtime-compiler** 代码中, 可以使用 `template`, 因为有 `compiler` 可以用于编译 `template`
- **解决方案:** 指定版本, 在 **webpack.config.js** 中配置

```json
resolve: {
  alias: { // 别名
    "vue$": "vue/dist/vue.esm.js"
  }
}
```

## 编译 .vue 文件

- 想要编译 Vue, 需要安装两个 `loader` 和相应的 `loader` 配置
- `vue-loader`(14.x 版本开始, 要想使用该 `loader` 还需要配置一个插件, 或降低版本, 降低版本后需要重新 `npm install`)
- `vue-template-compiler` (用于解析 `.vue` 文件中的 `template`)

## Plugin 插件

### 添加版权的 Plugin

- 该插件名字叫 **BannerPlugin**, 属于 Webpack 自带的插件
- 按照下面的方式来修改 **webpack.config.js** 文件

```javascript
const webpack = require("webpack")
module.exports = {
  plugins: [new webpack.BannerPlugin("版权归 coerlion 所有")]
}
```

### 打包 HTML 的 plugin

- 如何将 `index.html` 打包到 `dist` 文件夹中呢?
  - **HtmlWebpackPlugin** 插件可以为我们做这些事情
  - 自动生成一个 `index.html` 文件(可以指定模板来生成)
  - 将打包的 JS 文件, 自动通过 `script` 标签插入到 `body` 中

安装 `html-webpack-plugin` 插件

```shell
npm install html-webpack-plugin --save-dev
```

- 使用插件, 修改 **webpack.config.js** 文件中的 **plugins** 部分内容如下

先导入 `html-webpack-plugin`

```shell
const HtmlWebpackPlugin = require("html-webpack-plugin")
```

再到 `module.exports` 下进行配置

```json
plugins: [
  new htmlWebpackPlugin({
    template: "index.html"
  )}
]
```

- 这里的 `template` 表示根据什么模版来生成 `index.html`
  - 在当前目录下, 根据 `index.html` 模板文件来生成一个在 dist 文件夹下的 `index.html` 文件
- 另外, 我们需要删除之前在 **output** 中添加的 **publicPath** 属性, 否则插入的 `script` 标签中的 `src` 可能会有问题

### js 压缩的 Plugin

使用第三方插件`uglifyjs-webpack-plugin`, 并且版本号指定 1.1.1, 和 CLI2 保持一致

```shell
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
```

- 修改 **webpack.config.js** 文件, 并且使用

先导入`uglifyjs-webpack-plugin`

```javascript
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");
```

再到 `module.exports` 下进行配置

```json
plugins: {
  new uglifyJsPlugin()
}
```

## 搭建本地服务器

- Webpack 提供了一个可选的本地开发服务器, 这个本地服务器基于 **Node.js** 搭建, 内部使用 `express` 框架
- 它可以实现我们想要的让浏览器自动刷新显示我们修改后的结果(它不会编译文件到磁盘中, 而是存储在内存中)

安装

```shell
npm install --save-dev webpack-dev-server@2.9.3
```

- `devServer` 也是作为 `module.exports` 中的一个选项, 选项本身可以设置如下属性:
  1. `contentBase`: 为哪一个文件夹提供本地服务, 默认是根文件夹, 我们这里要填写 `./dist`
2. `port`: 端口号
  3. `inline`: 页面是否实时刷新
4. `historyApiFallback`: 在 SPA 页面中, 依赖 HTML 的 `history` 模式

`module.exports` 配置修改如下:

```json
devServer: {
  contentBase: "./dist",
  inline: true
}
```

使用

- 方法 1: `node_modules/.bin/webpack-dev-server`

- 方法 2: 在 **package.json** 中添加 scripts 属性`"dev": "webpack-dev-server"`, 即可通过`npm run dev`的方式直接使用

  - `webpack-dev-server` 命令参数
    - 例如 `"dev": "webpack-dev-server --open"`
    - **open** 参数表示直接打开浏览器

## Webpack 配置文件分离

1. 开发时配置文件 和 运行时配置文件的分离
2. 创建文件夹 **build**
3. 创建文件 **base.config.js** 存放开发时和运行时依赖
4. 创建文件 **dev.config.js** 存放开发时依赖
5. 创建文件 **prod.config.js** 存放运行时依赖

安装 `webpack-marge`

```shell
npm install webpack-merge --save-dev
```

**合并三个文件**

- 修改 **base.config.js** 配置文件
- 将所有开发时、运行时依赖存放到该文件之后修改 `path` 路径

```javascript
path: path.resolve(__dirname, "../dist")
```

修改 **prod.config.js** 配置文件

```javascript
// 运行时依赖
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin")
const webpackMerge = require("webpack-merge")
const baseConfig = require("./base.config")

module.exports = webpackMerge(baseConfig, {
  plugins: [new UglifyjsWebpackPlugin()]
})
```

修改 **dev.config.js** 配置文件

```javascript
// 开发时依赖
const webpackMerge = require("webpack-merge")
const baseConfig = require("./base.config")

module.exports = webpackMerge(baseConfig, {
  devServer: {
    contentBase: "./dist",
    inline: true
  }
})
```

修改 **package.json** 中的 scripts 下的 **build** 和 **dev** 属性为:

```javascript
"build": "webpack --config ./build/prod.config.js",
"dev": "webpack-dev-server --open --config ./build/dev.config.js"
```
