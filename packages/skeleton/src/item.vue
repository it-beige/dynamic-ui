<template>
  <div :class="['dy-skeleton__item', `dy-skeleton__${variant}`]">
    <img-placeholder v-if="variant === 'image'" />
  </div>
</template>

<script>
  import ImgPlaceholder from './img-placeholder';

  export default {
    name: 'DySkeletonItem',
    props: {
      variant: {
        type: String,
        default: 'text'
      }
    },
    components: {
      [ImgPlaceholder.name]: ImgPlaceholder
    }
  };
</script>