<template>
  <aside class="dy-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
  export default {
    name: 'DyAside',

    componentName: 'DyAside',

    props: {
      width: {
        type: String,
        default: '300px'
      }
    }
  };
</script>
