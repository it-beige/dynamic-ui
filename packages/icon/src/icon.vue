<template>
  <i :class="'dy-icon-' + name"></i>
</template>

<script>
  export default {
    name: 'DyIcon',

    props: {
      name: String
    }
  };
</script>
