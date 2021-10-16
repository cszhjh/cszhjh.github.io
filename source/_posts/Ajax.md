---
title: Ajax
date: 2020-04-10 15:15:22
toc: true
tags: Ajax
categories: 
- 网络
---

## 什么是 Ajax ?

Ajax 就是浏览器提供的一套API, 可以通过 JavaScript 调用, 从而实现**通过代码控制请求与相应, 实现网络编程**

优点: 相比传统网络请求(数据写在 HTML 中), 请求只发生在页面区域内, **不会重新加载整个页面(像一些引入内容等)**, 请求速度会更快

缺点: 不利于 SEO, 就是说不利于搜索引擎优化, 目前百度不支持抓取 JavaScript 里的内容, 只支持抓取 HTML 中的内容, 国外已经支持抓取 JavaScript 里的内容

**注意: 涉及到 Ajax 操作的页面不能使用文件协议访问(文件的方法访问)**

<!-- more -->

## 快速上手

**发送 GET 请求**

```javascript
// xhr 就类似于浏览器的作用(发送请求接收响应)
var xhr = new XMLHttpRequest()

// 获取相应状态码
console.log(xhr.readyState) // ==> 0 : 初始化, 请求代理对象

// 以 GET 的方式发送请求
xhr.open('GET', 'ajax.php')
console.log(xhr.readyState) // ==> 1 : open 方法已经调用, 建立一个与服务端特定端口的连接

// 开始请求, 没有返回值
xhr.send()	
console.log(xhr.readyState)// ==> 1 : 这里也是1

// 接收请求(监听状态码改变事件)
xhr.onreadystatechange = function () {
  /* 
    ==> 2,3,4 : 
    2 指已经接受到相应报文的响应头, 此时只接受到了响应头
    3 指正在下载相应报文的响应体, 有可能响应体为空, 有可能不完整
    4 指一切ok, 可以执行后续的逻辑了
  */
  if (this.readyState !== 4) return
  
  //获取相应状态描述
  console.log(this.responseText)
  console.log(xhr.readyState)
}
```

**发送 POST 请求**

```javascript
// 设置请求信息
		
var xhr = new XMLHttpRequest()

xhr.open('POST', 'ajax.php') // 设置请求行

xhr.setRequestHeader('Foo', 'Bar') // 设置一个请求头

// 一旦你的请求体是 urlencoded 格式的内容, 一定要设置请求头中 Content-Type 为对应的格式
xhr.setRequestHeader('content-Type','application/x-www-from-urlencoded')

xhr.send('key1=value1&key2=value2') // 以urlencoded 格式设置请求体

xhr.onreadystatechange = function() {
  if (this.readyState !=== 4) return
  console.log(this.responseText)
}
```

`this.responseText` 永远获取的都是字符串形式的响应体

## 模板引擎

1. 选择一个模板引擎
   http://github.com/tj/consolidate.js#supported-template-engines
2. 下载模板引擎JS文件
3. 引入到页面中
4. 准备一个模板
5. 准备一个数据
6. 通过模板引擎的 JS 提供的一个函数将模板和数据整合得到渲染结果 HTML
7. 将渲染结果的 HTML 设置到默认元素的 `innerHTML` 中

利用模板引擎动态生成表格数据 **(客户端)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <table id="demo"></table>
	
  <!-- 导入模板 JS 文件 -->
  <script src="template-web.js"></script>
  <!-- 模板创建元素 -->
  <script id="tmpl" type="text/html">
    // each 遍历 comments 中的数据, 动态的生成表格数据 
    {{ each comments }}
    // each 内部 $value 拿到的是当前被遍历的那个元素, $index拿到的是下标 
    <tr>
      <td>{{$value.name}}</td>
      <td>{{$value.age}}</td>
    </tr>
    {{/each}}
  </script>

  <!-- ajax获取服务端的json数据 -->
  <script type="text/javascript">
    var xhr = new XMLHttpRequest()
    xhr.open('GET','art-template.php')
    xhr.send()
    xhr.onreadystatechange = function(){
      if (this.readyState !== 4) return
      // 将获取的json数据解析
      var res = JSON.parse(this.responseText)

      // 模板所需数据
      var context = {comments:res}
      var html1 = template('tmpl',context)
      console.log(html1)

      document.getElementById('demo').innerHTML = html1
    }

  </script>
</body>
</html>
```

**服务端**

```php
<?php 
  // 设置访问头格式
  header('Content-Type: application/json');
?>

// json数据
[
  { "name": "张三", "age": "1" },	
  { "name": "李四", "age": "2" },	
  { "name": "王五", "age": "3" }	
]
```

## jQuery 中 Ajax 的使用

**底层接口的使用**

```javascript
$.ajax({
  url: 'time.php',
  type: 'get',
  // 用于提交到服务端的参数, 如果是 get 请求就通过 url 传递, 如果是 post 请求就通过请求体传递
  data: { id: 1, name: '张三' },
  // 用于设置响应体的类型, 和data参数没关系
  dataType: 'json',
  success: function (res) {
    console.log(res)
  }
})
```

**相关函数**

```javascript
$.ajax({
  url: 'time.php',
  type: 'get',
  beforeSend: function(xhr) {
    // 在所有发送请求的操作(open, send)之前执行
    console.log(xhr)
  },
  success: function(res) {
    // 隐藏 loading, 只有请求成功(状态码为200)才会执行
    console.log(res)
  },
  error: function(xhr) {
  // 隐藏loading, 和success相反
    console.log(xhr)
  },
  complete: function(xhr) {
    // 不管是成功还是失败都会执行这个函数, 相当于 success 和 error 的结合体
    console.log(xhr)
  }
})
```

**高度封装的函数**

```javascript
$.get('json.php', { id: 1 }, function(res) {
  console.log(res)
})

$.post('json.php', { id: 1 }, function(res) {
  console.log(res)
})

// 转换成json对象
$.getJSON('json.php', { id: 1 }, function(res) {
  console.log(res)
})
```

## 跨域

同源策略: 同源是指协议, 端口, 域名完全相同, 默认只有**同源的地址才能相互通过 Ajax 发送请求**, 不同源地址之间请求我们称之为跨域请求

## JS 的方法

- 所有的请求方式: **ajax、img、link、script、iframe**
- 校验目标
  1. 能发出去
  2. 能收回来

```javascript
// ajax 的方式请求(默认不能发送跨域请求)

// img的方式发送请求
var img = new Image()
img.src = '不同源地址'
// 结论: 可以发送不同源地址之间的请求, 但是无法拿到响应结果

// link 真正的定义: 链入一个文档, 通过 rel 属性申明链入的文档与当前文档之间的关系
var link = document.createElement('link')
link.rel = 'stylesheet'
link.src = '地址'
document.body.appendChild('link') 
// 结论: 可以发送不同源地址之间的请求, 但是无法拿到响应结果
```

## JSONP

**客户端**

```javascript
var script = document.createElement('script')
script.src = '服务端地址'
document.body.appendChild('script') 
function callback(data) {
  console.log(data)
}
```

**服务端**

```php
<?php
header('Content-Type:applacation/javascript');
$json = { "name": "zhangsan", "age": 14 };
echo callback({ $json });
?>
```

结论: 可以发送不同源地址之间的请求, 但是无法拿到相应结果, 可以借助于能够作为 JS 执行来拿到结果
服务端把 **Content—Type 设置成 javascript**, 并把结果包装在一个函数内, 且又服务端调用该函数, 客户端通过这个函数拿到结果, 这个过程叫做 **JSONP**

## jQuery 的方法

jsonp 和 Ajax 没有必然的联系, 只需要把 dataType 设置成 jsonp 就可以跨域

```javascript
$.ajax ({
  url: '服务器地址',
  dataType:'jsonp',
  success: function (res) {
    console.log(res)
  }
})
```

## CORS

**Cross Origin Resource Share(跨域资源共享)**

这种方案无需客户端做出任何变化, 只是在被请求的服务端响应的时候添加一个 **Access-Content-Allow-Origin** 的响应头, 表示这个资源是否允许指定域请求

```php
//允许远端访问
header('Access-Content-Allow-Origin: *');
```
