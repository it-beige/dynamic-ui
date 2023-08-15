<template>
  <ul class="dy-select-group__wrap" v-show="visible">
    <li class="dy-select-group__title">{{ label }}</li>
    <li>
      <ul class="dy-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from 'dynamic-ui/src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'DyOptionGroup',

    componentName: 'DyOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    watch: {
      disabled(val) {
        this.broadcast('DyOption', 'handleGroupDisabled', val);
      }
    },

    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },

    created() {
      this.$on('queryChange', this.queryChange);
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('DyOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>
