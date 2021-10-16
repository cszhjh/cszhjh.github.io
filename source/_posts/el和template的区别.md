---
title: el 和 template 的区别
date: 2020-04-29 12:01:54
toc: true
tags: Vue
categories:
- Vue
---

## el 和 template 同时出现

- 当一个实例同时拥有 `el` 和 `template`, Vue 在编译的时候
  - Vue会把 **template 的实例全部替换到 el 挂载的内容上, 包括挂载的标签也会被替换掉**

<!-- more -->

```html
<div id="app"></div>

<script>
  const app = new Vue({
    el: "#app",
    template: `
      <div>
        <h2>message</h2>
        <button @click="btnClick">button</button>
        <h2>{{name}}</h2>
      </div>
    `,
    data: {
      message: "hello world",
      name: "zjh"
    },
    methods: {
      btnClick() {
        console.log("click");
      }
    }
  });
</script>
```

- 最终`<div id="app"></div>`会被替换成 **template 中的模板实例**

