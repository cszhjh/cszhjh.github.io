---
title: Vue基础语法
date: 2020-04-28 13:14:55
tags: Vue
categories:
- Vue
---

## mustache 语法

- `\{\{\}\}` mustache 语法
- 将 `data` 中的数据在 DOM 元素上展示
- 在元素的内容区书写, 该形式为单向绑定
- 在 DOM 中修改变量的值并不会影响到 `data` 中的值, 只能由Vue实例中改变该值才会让 DOM 元素的内容发生改变

写法例如:

<!-- more -->

```vue
<template>
  <!-- message是data中的一个属性 -->
  <div id="app">{{message}}</div>
</template>
```

## v-once

- 只渲染一次元素或组件, 不会随着数据 (不响应式解析) 的改变而改变

## v-html=“”

- 该指令后面往往会跟上一个 `string` 类型的值, 会将 `string` 中含有 `html` 的语法解析出来并且进行渲染, 但是会覆盖原有的结点

## v-text=“”

- 与 `v-html` 类似, 区别是不能解析 `html` 标签

## v-pre

- 不解析 `mustache` 语法

## v-bind:attr=“”

- 动态绑定标签属性

### 动态绑定属性 attr, 使属性 attr 跟随 vue 变量变化

```vue
<img v-bind:src="vueURL">
```

### 动态绑定 class

- 对象语法 `{className: boolean}`
  - 当 `boolean` 为 `true`, 则添加 `className`
  - `false` 则删除 `className`
- 数组语法 `[变量, 变量, …]` 动态绑定 `class`
- 通过函数返回值获得对象｜数组语法
- 普通 `class` 与动态绑定的 `class` 可以共存

```vue
<img v-bind:class="{active: true}" class="demo">
```

### 动态绑定 style

- 对象语法 `{attrName: value}`
  - 为元素添加 `style` 样式, `value` 加引号则按照 `value` 赋值, 否则将按照变量解析
- 数组语法 `[对象, 对象, ...]`
  - 根据对象添加相应的 `class`
- 通过函数返回值获得**对象**或**数组**语法

```vue
<!-- 其中divHeight为data中的属性 -->
<div v-bind:style="{width: '300px', height: divHeight}"></div>
```

### v-bind 语法糖

- `:` $\Leftrightarrow$ `v-bind:`
  - 可以使用 `:` 替换掉 `v-bind:`

## v-on: 事件=“”

- 绑定事件, 可以直接写代码语句, 也可以写函数名
  - 如果没有参数可以省略 `()`
- 如果有参数且省略了 `()`, 这时候 vue 会默认将浏览器产生的 `event` 事件对象作为第一个参数传入方法中, 且其他参数为 `undefined`
- 如果需要 `event` 对象以及参数, 那么传递参数时, 需传递 `$event`

```vue
<!-- 其中divClick为methods中的方法 -->
<div v-on:click="divClick"></div>
```

### v-on 修饰符

#### .stop=“”

- 阻止冒泡

#### .prevent=“”

- 阻止默认事件

#### .keyCode | .keyAlias

- 获得键盘按键的 `unicode` 编码

#### .enter

- 当按下回车键才触发事件

#### .native

- 监听组件根元素的原生事件

#### .once

- 只触发一次事件回调函数

### v-on 语法糖

- `@` $\Leftrightarrow$ `v-on:`
  - 可以使用 `@` 替换掉 `v-on:`

## v-if=“”

- 如果条件为 `true`, 则渲染, 为 `false` 则不渲染其结点及子结点 (结点不存在于 dom 中)
  - **注意:** 一旦条件为 `false`, 则DOMTree中并不会生成该节点

## v-else

- 必须写在 `v-if` 或 `v-else-if` 的下一个兄弟结点上才会生效, 否则报错, 且该结构直接失效

## input 在 v-if 和 v-else 中 value 的问题

**问题**

- 使用 `v-if`, `v-else` 时, `input` 输入框中的值不会清空

**原因**

- vue 在渲染页面之前, 出于性能考虑会生成虚拟 dom(virtual dom), 尽可能的复用已经存在的元素, 而不是重新创建新的元素
- vue 内部会发现原来的 `input` 元素不再使用, 那么 vue 就会把原来的 `input` 进行复用, 并且修改相应的结构, 属性, 文本, 但 `value` 不会清除

**解决方案**

- 给对应的 input 添加 `key`, 并且保证 `key` 不相同, 因为 `key` 的不相同, vue 会创建新的 dom 结点, 但是会影响性能

```vue
<input v-if="true" :key="one">
<input v-else :key="two">
```

## v-show=“”

- true | false 控制元素是否显示(控制 display)

## v-for=“”

- 遍历, 同等于 js 中的 `for`
- `key` 属性和 `item` 绑定可以提高 dom 更新的性能
  - 因为在插入数据时, 如果 `key` 和 `item` 进行了绑定, 那么就只需要将新插入的结点直接插入即可, 否则就会出现在末尾插入, 从插入位置开始依次修改内容的情况
- `key` 不能重复绑定同一个 `value`
  - **注意:** 如果是遍历一个指定的数字, 那么 `item` 从 `1` 开始, 到指定数字结束

### 遍历数字

```vue
<ul>
  <!-- 从1～10循环创建li -->
  <li v-for="(item, index) in 10" :key="index">{{item}}</li>
</ul>
```

### 遍历数组

```vue
<ul>
  <!-- 其中arr为data中的属性, 值为数组 -->
  <li v-for="(item, index) in arr" :key="index">{{item}}</li>
</ul>
```

### 遍历对象

- `v-for="value in Object"` 只获取 `value`
- `v-for="(value, key) in Object"` 获取 `value` 和 `key`

```vue
<ul>
    <!-- 只获取value -->
  <li v-for="value in arr">{{value}}</li>
</ul>

<ul>
    <!-- 其中arr为data中的属性, 值为数组 -->
  <li v-for="(value, key) in arr" :key="key">{{value}}</li>
</ul>
```

## 哪些数组的方法是响应式的

- 改变原数组本身的方法:
  - `push`
  - `pop`
  - `shift`
  - `unshift`
  - `splice`
  - `sort`
  - `reverse`
- Vue 方法:
  - `Vue. set` (要修改的对象, 索引值, 修改后的值)
  - 通过索引值修改不是响应式的

## v-model=“”

- 双向绑定
  - 用来实现表单元素和数据的双向绑定
- v-model 得到的 `value` 总是 `string`
- 若想更深入的了解双向绑定, 需要先知道哪些方法是**改变原数组**的, 参照[哪些数组的方法是响应式的](https://www.coderlion.com/2020/04/28/Vue基础语法/#changeArray)

### 输入框: text

```vue
<input type="text" v-model="message" />
```

- 即 `input` 的 `value` 属性与 `vue` 的变量 `message` 实现了绑定
- 无论是修改 `message` 的值还是在 `input` 中输入内容都会使 `message` 产生变化

### 单选框: radio

```vue
<input type="radio" value="male" v-model="sex" />
<input type="radio" value="female" v-model="sex" />
```

- `sex: "male"` 可以使用 `v-model` 绑定 `value`
- 从而获取到用户选择的内容, 也可以省略掉 `name` 属性

### 多选框: checkbox

#### 单个多选框:

```vue
<input type="checkbox" v-model="isAgree" />同意协议
<button :disabled="!isAgree">提交</button>
isAgree: false
```

- 通过 `isAgree` 可以实现勾选同意协议和按钮之间的绑定

#### 多个多选框

```vue
<!-- 其中fruits为data中的属性, 值为Array -->
<input type="checkbox" value="orange" v-model="fruits" />orange
<input type="checkbox" value="apple" v-model="fruits" />apple
```

- 当选中一个多选框时, vue 会把该多选框的 `value` 值 `push` 到 `fruits` 中

### 下拉列表: select

#### 单选列表

```vue
<!-- fruit: "banana" -->
<select v-model="fruit">
    <option value="apple">apple</option>
    <option value="banana">banana</option>
    <option value="orange">orange</option>
</select>
```

#### 多选列表

```vue
<!-- fruits: [] -->
<select v-model="fruits" multiple>
    <option value="apple">apple</option>
    <option value="banana">banana</option>
    <option value="orange">orange</option>
</select>
```

### v-model 原理

1. 单向绑定( 值绑定 )

```vue
<input :value="message" />
```

1. 监听输入事件, 获取输入后 `value` 的值并修改 `message` 的值, 从而达到双向数据绑定

```vue
<input @input="message = $event.target.value" :value="message" />
```

### v-model 修饰符

#### . lazy

- 当输入框敲回车或失去焦点后再更新 vue 变量

#### . number

- 获得的 `value` 是 `number` 类型

#### . trim

- 删除 `value` 两边的空格

## 值绑定

- 即 v-for 动态绑定 value

```vue
<label v-for="item in list">
    <input type="checkbox" :value="item" v-model="arr" />{{item}}
</label>
```
