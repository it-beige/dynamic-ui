<template>
  <label
    class="dy-radio-button"
    :class="[
      size ? 'dy-radio-button--' + size : '',
      { 'is-active': model === label },
      { 'is-disabled': isDisabled },
      { 'is-focus': focus }
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    
    @keydown.space.stop.prevent="model = isDisabled ? model : label"

  >
    <input
      class="dy-radio-button__orig-radio"
      :value="label"
      type="radio"
      v-model="model"
      :name="name"
      @change="handleChange"
      :disabled="isDisabled"
      tabindex="-1"
      @focus="focus = true"
      @click="handleClick"
      @blur="focus = false"
      autocomplete="off"
    >
    <span
      class="dy-radio-button__inner"
      :style="model === label ? activeStyle : null"
      @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from 'dynamic-ui/src/mixins/emitter';

  export default {
    name: 'DyRadioButton',

    mixins: [Emitter],

    inject: {
      dyForm: {
        default: ''
      },
      dyFormItem: {
        default: ''
      }
    },

    props: {
      value: {},
      label: {},
      disabled: Boolean,
      name: String
    },
    data() {
      return {
        focus: false
      };
    },
    computed: {
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'DyRadioGroup') {
            parent = parent.$parent;
          } else {
            this._radioGroup = parent;
            return true;
          }
        }
        return false;
      },
      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value;
        },
        set(val) {
          if (this.isGroup) {
            this.dispatch('DyRadioGroup', 'input', [val]);
          } else {
            this.$emit('input', val);
          }
        }
      },
      _radioGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'DyRadioGroup') {
            parent = parent.$parent;
          } else {
            return parent;
          }
        }
        return false;
      },
      activeStyle() {
        return {
          backgroundColor: this._radioGroup.fill || '',
          borderColor: this._radioGroup.fill || '',
          boxShadow: this._radioGroup.fill ? `-1px 0 0 0 ${this._radioGroup.fill}` : '',
          color: this._radioGroup.textColor || ''
        };
      },
      _elFormItemSize() {
        return (this.dyFormItem || {}).elFormItemSize;
      },
      size() {
        return this._radioGroup.radioGroupSize || this._elFormItemSize || (this.$DYNAMIC || {}).size;
      },
      isDisabled() {
        return this.disabled || this._radioGroup.disabled || (this.dyForm || {}).disabled;
      },
      tabIndex() {
        return (this.isDisabled || (this._radioGroup && this.value !== this.label)) ? -1 : 0;
      }
    },
    methods: {
      handleChange() {
        this.$nextTick(() => {
          this.dispatch('DyRadioGroup', 'handleChange', this.value);
        });
      },
      handleClick() {
        this.$emit('click');
      }
  
    }
  };
</script>
