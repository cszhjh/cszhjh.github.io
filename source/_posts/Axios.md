---
title: Axios
date: 2020-05-03 12:32:16
toc: true
tags: Axios
categories: 
- 网络
---

## 什么是 Axios?

Axios 是一个基于 `promise` 的 HTTP 库, 可以用在浏览器和 Node.js 中

Axios 的作用是什么呢: **Axios主要是用于向后台发起网络请求的**, 并且可以在请求中做更多的可控操作

简单来说: Axios 就是一种**前端向后端发送网络请求**的工具

## 网络模块的选择

### 传统的 Ajax

- 传统的 Ajax 基于 `XMLHttpRequest(XHR)`
- 之所以不用它, 是因为它配置和调用方式等非常混乱, 编码起来看起来令人十分头疼
- 真实开发中很少直接使用传统的 `Ajax`, 而是使用 **jQuery 版的 Ajax**

<!-- more -->

### jQuery-Ajax

- `jQuery-Ajax` 相对于传统的 `Ajax` 非常好用
- 之所以不用它, 是因为 jQuery 是一个重量级的框架, **代码有 1w+ 行**, 而 **Vue 的代码也是 1w+ 行**, 所以没必要为了网络请求, 特意引用一个 `jQuery`

### Vue-Resource

- 官方在 **Vue1.x** 的时候, 推出了 `Vue-Resource`
  `Vue-Resource` 的**体积相对于 jQuery 小很多**
- 之所以不用它, 是因为在 **Vue2.0** 推出后, Vue 的作者就在 GitHub 的 Issues 中说明了去掉 Vue-Resource, 并且以后也不会再更新, 意味着**以后 Vue-Reource 不再支持新的 Vue 版本, 也不会再继续更新和维护**, 对以后的项目开发和维护都存在很大的隐患

### Axios

- 在说明不再继续更新和维护 Vue-Resource 的同时, **作者(尤雨溪)** 还推荐了一个框架: `Axios`
- `Axios` 有非常多的优点, 并且用起来也非常方便

## Axios 使用

### 安装

```shell
npm install axios --save
```

Axios 虽然是一个插件, 但是我们**不需要通过 `Vue.use(axios)`** 来使用, 下载完成后, **只需在项目中引入即可**, 至于为什么, 我认为应该是因为开发者在封装 Axios 时, 没有写 `install` 这一步

### Axios 的特性

- 在浏览器中发送 **`XMLHttpRequests` 请求**
- 在 Node.js 中发送 **HTTP 请求**
- 支持 **Promise API**
- **拦截**请求和响应
- **转换**请求和响应数据

### Axios 请求方式

- `axios(config)`
- `axios.request(config)`
- `axios.get(url[, config])`
- `axios.delete(url[, config])`
- `axios.head(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.patch(url[, data[, config]])`

### 发送 get 请求

[![te8Egf.png](https://s1.ax1x.com/2020/05/28/te8Egf.png)](https://s1.ax1x.com/2020/05/28/te8Egf.png)

### 发送并发请求

使用 `axios.all`, 可以放入多个请求的数组

`axios.all([])` 返回的结果是一个数组, 使用 `axios.spread` 可将数组 `[res1,res2]` 展开为 `res1, res2`

```javascript
axios.all([
  axios.get('http://123.207.32.32:8000/home/multidata'),
  axios.get('http://123.207.32.32:8000/home/data', {
    params: { 
      type: 'sell',
      page: 1 
    } 
  })
]).then(axios.spread((res1, res2) => {
  console.log(res1)   // 第一个请求的数据
  console.log(res2)   // 第二个请求的数据
}))
```

### 全局配置

在开发中, 可能很多参数都是固定的, 例如请求的 URL 前面某些部分总是一致的, 只是后面的参数或是 `query` 不同
这个时候, 我们可以进行一些抽取, 也可以利用 `Axios` 的全局配置

例如:

- `http://123.207.32.32:8000/home/multidata`
- `http://123.207.32.32:8000/home/data?type=sell&page=1`

我们发现前面的 `http://123.207.32.32:8000` 总是一样的, 那么就可以进行全局配置

**注: `/home` 并不是完全一致, `/home` 只是在某个页面的数据, 并不能代表全部, 有可能做某个页面的时候就不再是 `/home`, 而是 `/category`**

[![te8eKS.png](https://s1.ax1x.com/2020/05/28/te8eKS.png)](https://s1.ax1x.com/2020/05/28/te8eKS.png)

### 配置请求头 Content-Type

`Axios` **使用 `post` 发送数据时**, 默认是直接把 json 放到请求体中提交到后端的
也就是说, 我们的 `Content-Type` 变成了 `application/json;charset=utf-8`, 这是 Axios **默认的请求头 `content-type` 类型**
但是实际我们后端要求的 `‘Content-Type’: ‘application/x-www-form-urlencoded’` 为多见, 这就与我们不符合

所以很多小伙伴在这里犯错误, 导致请求数据获取不到, 明明自己的请求地址和参数都对了却得不到数据

我们现在来说说 `post` 请求常见的数据格式(`content-type`)

- `Content-Type: application/json`
  - 请求体中的数据会以 `json` 字符串的形式发送到后端
- `Content-Type: application/x-www-form-urlencoded`
  - 请求体中的数据会以普通表单形式(键值对)发送到后端
- `Content-Type: multipart/form-data`
  - 它会将请求体的数据处理为一条消息, 以标签为单元, 用分隔符分开, 既可以上传键值对, 也可以上传文件

### 常见的配置选项

- **请求地址** : `url: '/user'`

- **请求类型** : `method: 'get'`

- **请求路径** : `baseURL: 'http://'`

- **请求的数据处理** : `transformRequest: [function(data){}]`

- **请求的数据处理** : `transformResponse: [function(data){}]`

- **自定义的请求头** : `headers: {'x-Requested-With' : * 'XMLHttpReqyest'}`

- **URL查询对象** : `params: {id: 12}`

- **查询对象序列化函数** : `paramsSerializer: function(params) {}`

- **request body** : `data: {key: 'aa'}`

- **超时设置** : `timeout: 1000`

- **跨域是否带 token** : `withCredentials: false`

- **自定义请求处理** : `adapter: function(resolve, reject, * config) {}`

- **身份验证信息** : `auth: {uname: '', pwd: '12'}`

- 响应的数据格式: `responseType : 'json'`

  - json
- blob
  - document
- arraybuffer
  - text
- stream

### Axios 实例

为什么要创建 Axios 的实例呢?

当我们从 Axios 模块中导入对象时, 使用的实例是默认的实例, 当给该实例设置一些默认配置时, 这些配置就被固定下来了
但是后续开发中, 某些配置可能会不太一样, 比如某些请求需要使用**特定的 `baseURL` 或者 `timeout` 或者 `content-Type` 等**, 这时我们就可以创建新的实例, 并且传入属于该实例的配置信息, 这里推荐使用实例的方式, 而不使用全局的方式

```javascript
import axios from 'axios'

// 创建新的实例
const instance = axios.create({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 发送网络请求
instance({
  url: '/category',
  method: 'get'
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
```

### Axios 封装

为什么要封装呢? 万一哪天这个框架不维护了呢?
那维护项目就只能加班加点了 **(通宵警告)**, 所以封装后的代码更易维护

**封装有多种方式, 这里展示个人认为比较优美的封装方式**

[![te8A8P.png](https://s1.ax1x.com/2020/05/28/te8A8P.png)](https://s1.ax1x.com/2020/05/28/te8A8P.png)

[![te8kCt.png](https://s1.ax1x.com/2020/05/28/te8kCt.png)](https://s1.ax1x.com/2020/05/28/te8kCt.png)

[![te8mDg.png](https://s1.ax1x.com/2020/05/28/te8mDg.png)](https://s1.ax1x.com/2020/05/28/te8mDg.png)

#### 拦截器

Axios 提供了拦截器, 用于我们每次**发送请求或者得到请求响应后**, 进行对应的处理, 例如有些页面或功能需要用户登陆模式才可以访问, 那此时就可以在用户请求页面时**利用拦截器做登陆验证了**

[![te8nbQ.png](https://s1.ax1x.com/2020/05/28/te8nbQ.png)](https://s1.ax1x.com/2020/05/28/te8nbQ.png)

