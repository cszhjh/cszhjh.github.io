---
title: Vue 组件-插槽
date: 2020-04-28 22:48:23
tags: Vue-Components
toc: true
categories:
- Vue
---

## 为什么使用 slot

- 插槽的目的是让我们原来的设备具备更多的扩展性
  - 比如电脑的 USB 插槽, 可以扩展 U 盘、硬盘、手机、音响、键盘、鼠标等

## 组件的插槽

- 组件的插槽也是为了让我们封装的组件更加具有扩展性
  - 让使用者可以决定组件内部的一些内容到底展示什么
- 例如:
  - 移动开发中, 几乎每个页面都有导航栏
  - 导航栏我们必然会封装成一个插件, 比如 `nav-bar` 组件
  - 一旦有了这个组件, 我们就可以在多个页面中复用了

<!-- more -->

## 如何封装组件? (slot)

- 原则: 抽取共性, 保留不同
- 最好的封装方法就是将共性抽取到组件中, 将不同暴露为插槽
- 一旦我们预留了插槽, 就可以让使用者根据自己的需求, 决定插槽中插入什么内容
- 是搜索框, 还是文字, 菜单, 都由调用者自己来决定

## 插槽的使用

### 插槽的基本使用

- 在组件模板中使用 `slot` 标签

```vue
<!-- 子组件 -->
<template>
  <slot></slot>
</template>
```

- 即可设置一个插槽
- 然后在使用组件时, 往组件标签内部填如入相应的代码即可

```vue
<!-- 父组件 -->
<template>
  <div id="app">
    <child>
      <p>插槽实例</p>
    </child>
  </div>
</template>
```

- 注意:
  - 在组件模版实例中, 无论写多少代码, 都会同时放入到组件中进行替换, 一起生效

### 插槽的默认值

- 在 `slot` 标签中填入的任何代码, 都会被当作默认值
  - 如果在组件实例中没有为插槽添加代码, 那么插槽的默认值将生效
  - 反之, 插槽的默认值被覆盖

```vue
<slot>
  <p>我是默认值</p>
</slot>
```

## 具名插槽

- 可以发现, 如果在子组件模板中有多个插槽 `slot` , 那么我们在使用插槽时, 会把所有 `slot` 的值都替换掉
- 所以, 当我们想单独修改某一个 `slot` 时, 可以使用**具名插槽**
- **使用步骤**
  1. 为插槽添加一个 `name` 属性
  2. 使用时通过 `slot=name` 的形式绑定对应的插槽

父组件 template 模板

```vue
<template>
  <div id="app">
    <cpn>
      <span slot="center">中间插槽</span>
      <button slot="left">左边插槽</button>
    </cpn>
  </div>
</template>
```

子组件 template 模板

```vue
<template id="cpn">
  <div>
    <slot name="left"><span>left</span></slot>
    <slot name="center"><span>center</span></slot>
    <slot name="right"><span>right</span></slot>
  </div>
</template>
```

## 编译作用域

- 父组件模版的所有东西都会在父组件的作用域内编译
- 子组件模板的所有东西都会在子组件的作用域内编译
- 即在父组件的模板实例中使用的属性都是来自父组件的实例对象
- 子组件的模板实例中使用的属性来自子组件的实例对象

## 作用域插槽

- 父组件替换插槽的标签, 但是属性、变量由子组件来提供
  - 即在父组件模板实例中, 如何使用子组件的数据

```vue
<!-- 子组件 -->
<template>
  <div>
    <slot :data="pLanguage">
      <ul>
        <li v-for="item in pLanguage">{{item}}</li>
      </ul>
    </slot>
  </div>
</template>
```

- 首先, 我们需要在插槽标签添加一个属性(该属性名任意)
- 然后, 我们需要在父组件模版实例中获得数据

```vue
<!-- 父组件 -->
<template>
  <div id="app">
    <child></child>
    <child>
      <!-- 在vue2.5x之前需要使用template来获得数据, 2.5x之后任何标签都可以 -->
      <template slot-scope="slot">
        <span v-for="item in slot.data">{{item}}</span>
      </template>
    </child>
    <child></child>
  </div>
</template>
```

- `slot-scope` 属性获得由插槽传来的数据对象

