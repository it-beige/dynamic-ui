## SvgIcon 图标

提供了常用的 svg 使用组件

### 使用方法

直接通过设置类名为 `icon-class` 来使用对应 svg。如果需要配置打包的 hash 前缀, 可通过`useHash`来设置

:::demo

```html
<template>
  <dy-svg-icon
    :icon-class="`doc_${i}`"
    useHash="icon"
    v-for="i of svgs"
    :key="i"
  ></dy-svg-icon>
</template>

<script>
  export default {
    data() {
      return {
        svgs: [
          'blank',
          'code',
          'excel',
          'exe',
          'folder',
          'html',
          'img',
          'iso',
          'music',
          'pdf',
          'ppt',
          'txt',
          'video',
          'word',
          'zip',
        ],
      }
    },
  }
</script>
```

:::
