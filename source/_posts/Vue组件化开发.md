---
title: Vue 组件化开发
date: 2020-04-28 20:14:29
tags: Vue-Components
categories:
- Vue
---

## Vue 组件化介绍

- **组件化**是 Vue 的**精髓**, Vue 就是由一个一个的组件构成的
- **组件化思想**是笔者认为世界上最美丽的思想, 此时不学, 更待何时!!!
  - **(别再跟我说面向对象思想了, 我没有对象~~)**

<!-- more -->

## 创建组件构造器对象

- 调用 `Vue.extend()` 创建的是一个组件构造器
- 通常在创建组件构造器时, 传入 `template` 代表我们自定义组件的模板
- 该模板就是在使用到组件的地方, 要显示的 `HTML` 代码
- 事实上, 这种写法在 `Vue2.x` 的文档中几乎看不到了, 因为[语法糖](https://www.coderlion.com/2020/04/28/Vue组件化开发/#cpnss)的存在

```javascript
Vue.extend({
  template: "html 模板代码",

  components: {
    // 注册子组件
  },

  data() {
    return Object;
  },

  methods: {
    // 方法
  },

  props: [] || {} // 获得组件的属性值 数组 | 对象
});
```

## 注册组件

- `Vue.component("组件标签名", 构造器对象)`
- 调用`Vue.component()`是将组件构造器注册为一个组件, 并且给它起了一个组件的标签名称
- 所以需要传递两个参数:
  1. 注册组件的标签名(在 HTML 中使用该组件的标签名称)
  2. 组件构造器对象

## 模板代码注意事项

- **模板代码必须有且只有一个根标签(`template` 不算根标签)**

## 全局组件

- 通过 `Vue.component` 注册的组件即为全局组件
- 在所有 Vue 实例和所有组件中都可以使用该组件

## 局部组件

- 通过 Vue 实例在 `options` 中的 `components` 属性中注册的组件
- 只能在该实例中使用该组件

## 父子组件

- 在父构造器中使用 `components` 属性注册子组件
- Vue 实例对象也可以看成一个组件, 即根结点 `root`
- 子组件只能在直接父组件内使用
  - 若要在 A 组件下使用某个子组件(非 A 注册, 但被其他组件注册过的子组件), 需在 A 组件上注册该子组件
- 即组件树中, 父结点只能访问直接子结点
  - 若要访问孙子结点, 需要在将孙子结点变成父结点的子结点, 或将孙子结点注册为全局组件

## 组件语法糖 (!!!推荐写法!!!)

### 注册全局组件

```javascript
Vue.component("cpn", {
  template: `<div>hello world</div>`
});
```

### 组册局部组件

- 该写法是将 **template模板** 代码直接写入 `components` 中 **(不推荐, 容易造成代码阅读困难)**
- 后面我们将介绍**模板分离写法(最主流写法, 也使代码更容易阅读)**

```javascript
components: {
   "cpn": {
    template: `<div>hello world</div>`
  }
}
```

即省略构造器, 直接在构造器参数上填写构造器对象, 内部还是调用了 `Vue.extend({...})`

## 模版分离写法

### script 标签写法

- 在 `body` 中使用 `script` 标签写模板代码, 且用 `id` 进行绑定

```html
<script type="text/x-template" id="cpn">
  <div>hello world</div>
</script>
```

### 注册全局组件

```javascript
Vue.component("cpn", { template: "#cpn" });
```

### 注册局部组件

```javascript
components: {
  "cpn": { template: "#cpn" }
}
```

### template 标签写法

- 该写法为最常用, 且最实用, 创建 `.vue` 来抽离组件将更有利于代码阅读和维护
- 方案一: 在 `body` 中使用 `template` 标签写模版代码, 且用 `id` 进行绑定

```html
<template id="cpn">
 <div>hello world</div>
</template>
```

- **方案二(推荐写法)**: 你也可以创建 `.vue` 文件
  - 在该文件中写入 `template` 模版代码
  - 以及组件 `JS` 逻辑代码
  - 和 `CSS` 样式代码
- 且不需要绑定 `id`, 在注册时引入文件即可
- **注意:**
  - 在父组件中使用子组件时必须将**驼峰式**转换成用 **-** 链接的形式

以下为 `HelloWorld.vue` 文件的 `template` 实例代码

```vue
<template>
 <div>hello world{{ name }}</div>
</template>

<script>
  export default {
    data() {
      return {
        name: "zjh"
      }
    }
  }
</script>
```

以下为父组件 template 中使用子组件

```vue
<template>
 <hello-world></hello-world>
</template>
  
<script>
  // 以下为父组件注册, 路径可以不需要携带.vue后缀, 这件事情Vue以及帮我们做好了, 放心写即可
  import HelloWorld from "./HelloWorld"

  export default {
    components: {
      HelloWorld
    }
  }
</script>
```

### 注册全局组件

```javascript
Vue.component("cpn", { template: "#cpn" });
```

#### 注册局部组件

```javascript
components: {
  "cpn": { template: "#cpn" }
}
```

## 组件的 data 数据

- 组件不可以

  直接

  访问 Vue 实例或其他组件中的数据

  - 因为:
    - 组件是一个单独的功能模块的封装, 这个模块有属于自己的 `HTML` 模板, 也应该有属于自己的数据 `data`

## 组件内部属性 data

```javascript
data() {
  return {
    message: "hello world"
  };
}
```

- 注意:
  - **组件中的 data** 与 **实例中的 data** 有区别
  - 组件中的 `data` 必须是一个函数, 且函数返回一个对象, 变量声明在对象中
  - 因为:
    - 对象是引用类型, 组件可能会被多个实例同时引用
    - 如果 `data` 值为对象, 将导致多个实例共享一个对象, 其中一个组件改变 `data` 属性值, 其它实例也会受到影响
  - 上面解释了 `data` 不能为对象的原因, 这里我们简单说下 `data` 为函数的原因
    - `data` 为函数, 通过 `return` 返回对象的拷贝, 致使每个实例都有自己独立的对象, 实例之间可以互不影响的改变 `data` 属性值

## 组件 data 是函数, 且返回对象的原理

- 在使用组件时, 因为 `data` 函数每次调用时会返回一个新的对象
- 即每个组件的实例得到的 `data` 都是独立的, 所以组件在使用时的变量就没有连锁反应了

## 父子组件的通信

### 下传数据 (父组件传递数据给子组件)

#### props

- `props` 在组件中, 使用选项 **props** 来声明需要从父级接收到的数据
- 在父组件模版中, 如果有多个子组件模板, 那么**父组件传递给子组件的属性只作用与该子组件的对应模板**
  - 即父组件传递给子组件 A 模板, 那么就只有 A 组件有该属性, 子组件的其他模板并没有该属性
- **注意:**
  - Vue 的 **v-bind 不支持小驼峰式**(即传递失败), 所以一般使用 **-** 来作为单词分割符
- 如果 props 属性要写小驼峰式, 那么 v-bind 必须要用 **-** 来链接单词从而转换成对应的小驼峰属性, 且使用变量时**必须是 props 中定义的小驼峰式属性**
- 子组件**不能修改 props 属性的值**, 应该要让父组件来对 props 的值进行修改
  - 如果需要实现通过下传得到的数据来与子组件进行双向绑定(`v-model`), 需要使用 **data 或 computed** 来实现**双向绑定**
  - 详情参见 [父子组件案例](https://www.coderlion.com/2020/04/28/Vue组件化开发/#module-demo)</a>

#### props 字符串数组

以下代码为父组件向子组件传递数据

```vue
<template>
  <div id="app">
    <child :c-message="message"></child>
  </div>
</template>

<script>
  import Child from "./Child"

  export default {
    data() {
      return {
        message: "hello, world"
      }
    },
    components: {
      Child
    }
  }
</script>
```

以下代码为子组件接收并使用父组件传递的数据

```vue
<template>
  <div>{{ cMessage }}</div>
</template>

<script>
  // 以下代码为子组件接收父组件传递的数据
  export default {
    props: ["cMessage"]
  }
</script>
```

- 字符串数组, 数组中的字符串就是传递时的名称, 通过 v-bind 获得父组件的数据
- 为子组件添加属性, 属性值为父组件的变量值

#### props 对象

- 对象可以设置传递时的**类型**, 也可以**设置默认值**等
- 类型:
  - `String`
  - `Number`
  - `Boolean`
  - `Array`
  - `Object`
  - `Date`
  - `Function`
  - `Symbol`
  - `null` (匹配任何类型)

```javascript
props: {
  // 1、类型限制
  cMovies: Arraym,
  cMessage: String

  // 2、提供默认值, 以及使用组件时属性是否为必传值
  cMessage: {
    type: String,
    default: "hello world",
    required: true
  },

  // 3、类型是Array | Object时, 默认值必须是一个函数
  cMovies: {
    type: Array,
    default() {
      return [];
    }
  },

  // 4、多个可能的类型
  cMessage: [String, Number],

  // 5、自定义验证函数
  cMessage: {
    validator(value) {
      // 这个值必须匹配下列字符串中的一个
      return ["success", "warning", "danger"].indexOf(value) !== -1;
    }
  }

  /* 6、自定义类型
     function Zjh() {
       name: "Sunny",
       age: 20
     }
  */
  cMessage: Zjh
}
```

### 上传数据 (子组件传递数据给父组件)

#### 自定义事件 Vue.$emit 和 v-on:

- 同 `v-bind` 一样不能写驼峰(如果使用**Vue脚手**架可以写驼峰式)

- 流程:

  - 子组件的浏览器默认事件触发后

  - 通过 `this.$emit("自定义对象名称", 数据)`  发送事件

    - **自定义事件**, 将该**自定义事件**发送到父组件上

以下代码为子组件模板代码

```vue
<template>
  <button @click="btnClick">button</button>
</template>

<script>
  export default {
    data() {
      return {
        message: "hello world"
      };
    },
    methods: {
      btnClick() {
        this.$emit("itemChild", this.message);
      }
    }
  }
</script>
```

- 在父组件中, 通过 `v-on` 来监听子组件的自定义事件
- 此时的 `cpnClick` 省略括号, 则 Vue 会自动把数据传入该事件方法中
  - 因为不是浏览器默认事件, 所以没有 `event` 对象
- 此时在父组件的 `methods` 中实现监听该事件的方法即可获得子传父的数据

以下代码为父组件模板代码

```vue
<template>
  <div id="app">
    <child @itemChild="cpnChild"></child>
    {{ message }}
  </div>
</template>

<script>
  import Child from "./Child"

  export default {
    data() {
      message: ""
    },
    methods: {
      cpnChild(message) {
        this.message = message;
      }
    }
  }
</script>
```

## 父子组件案例

### 父组件下传数据, 子组件与自身表单进行双向绑定, 且同时与父组件双向绑定

父组件模板代码

```vue
<template>
  <div id="app">
    <!-- 1、父组件通过v-bind给子组件传递数据 -->
    <!-- 2、父组件监听子组件的自定义事件 -->
    <child :number="num" @numChange="numChange"></child>
  </div>
</template>

<script>
  import Child from './Child'

  export default {
    name: 'App',
    components: {
      Child
    },
    data() {
      return {
        num: "1"
      }
    },
    methods: {
      // 3、父组件自定义事件触发, 通过emit传来的数据修改自身的值
      numChange(value) {
        this.num = value;
      }
    }
  }
</script>
```



子组件模板代码

```vue
<template>
  <div>
    <h2>props:{{ number }}</h2>
    <h2>data:{{ dnumber }}</h2>

    <!-- 3、进行双向绑定 -->
    <input type="text" :value="dnumber" @input="numInput" />
  </div>
</template>

<script>
  export default {
    // 1、子组件通过props获得数据
    props: {
      number: [Number, String]
    },

    // 2、因为props得到的数据不能直接修改, 所以在子组件内拷贝props中的数据
    data() {
      return {
        dnumber: this.number
      };
    },
    methods: {
      // 4、在触发input事件后, 将最新的值通过emit传递给父组件
      numInput(e) {
        this.dnumber = e.target.value;
        this.$emit("numChange", this.dnumber);
      }
    }
  }
</script>
```

## 父子组件的访问方式

### 父组件访问子组件

#### $children

- 在父组件中使用 `this.$children` 即可获得一个数组

  - 该数组中包含了父组件下所有子组件对象 **VueComponent**

#### $refs (!!!推荐使用!!!)

- 在父组件中使用 `this.$refs` 获得一个空对象
- 为这个对象添加子组件即可获得第一个子组件对象

```vue
<template>
  <div>
    <child ref="childOne"></child>
    <child></child>
    <p>为想要添加到对象中的子组件添加属性</p>
    <p>(ref="这是对象中的属性名里面存放了该子组件的对象(VueComponent)")</p>
    <button @click="showRefs">查看ref子组件</button>
  </div>
</template>

<script>
  export default {
    methods: {
      showRefs() {
        console.log(this.$refs.childOne);
      }
    }
  }
</script>
```

### 子组件访问父组件

#### $parent (不推荐使用, 耦合度太高)

- 在子组件中使用 `this.$parent` 即可获得父组件对象

  - 如果是 Vue 实例下的子组件, 则获得 Vue 实例对象**Vue**
  - 如果不是 Vue 实例下的子组件, 则获得父组件对象**VueComponent**

## 访问根组件

### $root

- 在 Vue 实例下, 任意组件通过`this.$root`即可获得 Vue 的实例对象(Vue)
- Vue 实例的 `root` 是自己本身

