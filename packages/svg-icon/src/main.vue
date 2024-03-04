<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
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
    className: {
      type: String
    },
    useHash: {
      type: String,
      default: 'icon'
    }
  },
  computed: {
    iconName({useHash}) {
      return `#${useHash}-${this.iconClass}`;
    },
    svgClass() {
      let clssses = 'dy-svg-icon';
      if (this.className) {
        clssses += ` ${this.className}`;
      }
      return clssses;
    }
  }
};
</script>

