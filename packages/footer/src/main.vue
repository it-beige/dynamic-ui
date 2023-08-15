<template>
  <footer class="dy-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
  export default {
    name: 'DyFooter',

    componentName: 'DyFooter',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
