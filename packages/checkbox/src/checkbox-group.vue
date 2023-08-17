<script>
  import Emitter from 'dynamic-ui/src/mixins/emitter';

  export default {
    name: 'DyCheckboxGroup',

    componentName: 'DyCheckboxGroup',

    mixins: [Emitter],

    inject: {
      dyFormItem: {
        default: ''
      }
    },

    props: {
      value: {},
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
    },

    computed: {
      _elFormItemSize() {
        return (this.dyFormItem || {}).elFormItemSize;
      },
      checkboxGroupSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      }
    },

    watch: {
      value(value) {
        this.dispatch('DyFormItem', 'el.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div class="dy-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
