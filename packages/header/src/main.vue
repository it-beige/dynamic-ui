<template>
  <header class="dy-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'DyHeader',

    componentName: 'DyHeader',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
