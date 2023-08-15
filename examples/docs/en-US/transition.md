## Built-in transition

You can use Element's built-in transitions directly. Before that, please read the [transition docs](https://vuejs.org/v2/api/#transition).

### fade

:::demo We have two fading effects: `dy-fade-in-linear` and `el-fade-in`.

```html
<template>
  <div>
    <dy-button @click="show = !show">Click Me</dy-button>

    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition name="dy-fade-in-linear">
        <div v-show="show" class="transition-box">.dy-fade-in-linear</div>
      </transition>
      <transition name="el-fade-in">
        <div v-show="show" class="transition-box">.dy-fade-in</div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      show: true,
    }),
  };
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```

:::

### zoom

:::demo `dy-zoom-in-center`, `dy-zoom-in-top` and `dy-zoom-in-bottom` are provided.

```html
<template>
  <div>
    <dy-button @click="show2 = !show2">Click Me</dy-button>

    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition name="dy-zoom-in-center">
        <div v-show="show2" class="transition-box">.dy-zoom-in-center</div>
      </transition>

      <transition name="dy-zoom-in-top">
        <div v-show="show2" class="transition-box">.dy-zoom-in-top</div>
      </transition>

      <transition name="dy-zoom-in-bottom">
        <div v-show="show2" class="transition-box">.dy-zoom-in-bottom</div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      show2: true,
    }),
  };
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```

:::

### collapse

For collapse effect, use the `el-collapse-transition` component.

:::demo

```html
<template>
  <div>
    <dy-button @click="show3 = !show3">Click Me</dy-button>

    <div style="margin-top: 20px; height: 200px;">
      <dy-collapse-transition>
        <div v-show="show3">
          <div class="transition-box">el-collapse-transition</div>
          <div class="transition-box">el-collapse-transition</div>
        </div>
      </dy-collapse-transition>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      show3: true,
    }),
  };
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```

:::

### On demand

```js
// fade/zoom
import 'dynamic-ui/lib/theme-chalk/base.css';
// collapse
import CollapseTransition from 'dynamic-ui/lib/transitions/collapse-transition';
import Vue from 'vue';

Vue.component(CollapseTransition.name, CollapseTransition);
```
