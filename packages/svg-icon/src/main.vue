<template>
  <svg class="dy-svg-icon" :aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'DySvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    useHash: {
      type: String,
      default: 'icon'
    }
  },
  computed: {
    iconName({ useHash }) {
      return `#${useHash}-${this.iconClass}`;
    }
  }
};
</script>
