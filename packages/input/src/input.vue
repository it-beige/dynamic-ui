<template>
  <div :class="[
    type === 'textarea' ? 'dy-textarea' : 'dy-input',
    inputSize ? 'dy-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'is-exceed': inputExceed,
      'dy-input-group': $slots.prepend || $slots.append,
      'dy-input-group--append': $slots.append,
      'dy-input-group--prepend': $slots.prepend,
      'dy-input--prefix': $slots.prefix || prefixIcon,
      'dy-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
    }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="dy-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="dy-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        ref="input"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <span class="dy-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="dy-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="dy-input__suffix"
        v-if="getSuffixVisible()">
        <span class="dy-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="dy-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon">
            </i>
          </template>
          <i v-if="showClear"
            class="dy-input__icon dy-icon-circle-close dy-input__clear"
            @mousedown.prevent
            @click="clear"
          ></i>
          <i v-if="showPwdVisible"
            class="dy-input__icon dy-icon-view dy-input__clear"
            @click="handlePasswordVisible"
          ></i>
          <span v-if="isWordLimitVisible" class="dy-input__count">
            <span class="dy-input__count-inner">
              {{ textLength }}/{{ upperLimit }}
            </span>
          </span>
        </span>
        <i class="dy-input__icon"
          v-if="validateState"
          :class="['dy-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="dy-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="dy-textarea__inner"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
    <span v-if="isWordLimitVisible && type === 'textarea'" class="dy-input__count">{{ textLength }}/{{ upperLimit }}</span>
  </div>
</template>
<script>
  import emitter from 'dynamic-ui/src/mixins/emitter';
  import Migrating from 'dynamic-ui/src/mixins/migrating';
  import calcTextareaHeight from './calcTextareaHeight';
  import merge from 'dynamic-ui/src/utils/merge';
  import {isKorean} from 'dynamic-ui/src/utils/shared';

  export default {
    name: 'DyInput',

    componentName: 'DyInput',

    mixins: [emitter, Migrating],

    inheritAttrs: false,

    inject: {
      dyForm: {
        default: ''
      },
      dyFormItem: {
        default: ''
      }
    },

    data() {
      return {
        textareaCalcStyle: {},
        hovering: false,
        focused: false,
        isComposing: false,
        passwordVisible: false
      };
    },

    props: {
      value: [String, Number],
      size: String,
      resize: String,
      form: String,
      disabled: Boolean,
      readonly: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      autocomplete: {
        type: String,
        default: 'off'
      },
      /** @Deprecated in next major version */
      autoComplete: {
        type: String,
        validator(val) {
          process.env.NODE_ENV !== 'production' &&
            console.warn('[Dynamic Warn][Input]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
          return true;
        }
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      suffixIcon: String,
      prefixIcon: String,
      label: String,
      clearable: {
        type: Boolean,
        default: false
      },
      showPassword: {
        type: Boolean,
        default: false
      },
      showWordLimit: {
        type: Boolean,
        default: false
      },
      tabindex: String
    },

    computed: {
      _elFormItemSize() {
        return (this.dyFormItem || {}).elFormItemSize;
      },
      validateState() {
        return this.dyFormItem ? this.dyFormItem.validateState : '';
      },
      needStatusIcon() {
        return this.dyForm ? this.dyForm.statusIcon : false;
      },
      validateIcon() {
        return {
          validating: 'dy-icon-loading',
          success: 'dy-icon-circle-check',
          error: 'dy-icon-circle-close'
        }[this.validateState];
      },
      textareaStyle() {
        return merge({}, this.textareaCalcStyle, { resize: this.resize });
      },
      inputSize() {
        return this.size || this._elFormItemSize || (this.$DYNAMIC || {}).size;
      },
      inputDisabled() {
        return this.disabled || (this.dyForm || {}).disabled;
      },
      nativeInputValue() {
        return this.value === null || this.value === undefined ? '' : String(this.value);
      },
      showClear() {
        return this.clearable &&
          !this.inputDisabled &&
          !this.readonly &&
          this.nativeInputValue &&
          (this.focused || this.hovering);
      },
      showPwdVisible() {
        return this.showPassword &&
          !this.inputDisabled &&
          !this.readonly &&
          (!!this.nativeInputValue || this.focused);
      },
      isWordLimitVisible() {
        return this.showWordLimit &&
          this.$attrs.maxlength &&
          (this.type === 'text' || this.type === 'textarea') &&
          !this.inputDisabled &&
          !this.readonly &&
          !this.showPassword;
      },
      upperLimit() {
        return this.$attrs.maxlength;
      },
      textLength() {
        if (typeof this.value === 'number') {
          return String(this.value).length;
        }

        return (this.value || '').length;
      },
      inputExceed() {
        // show exceed style if length of initial value greater then maxlength
        return this.isWordLimitVisible &&
          (this.textLength > this.upperLimit);
      }
    },

    watch: {
      value(val) {
        this.$nextTick(this.resizeTextarea);
        if (this.validateEvent) {
          this.dispatch('DyFormItem', 'dy.form.change', [val]);
        }
      },
      // native input value is set explicitly
      // do not use v-model / :value in template
      // see: https://github.com/ElemeFE/element/issues/14521
      nativeInputValue() {
        this.setNativeInputValue();
      },
      // when change between <input> and <textarea>,
      // update DOM dependent value and styles
      // https://github.com/ElemeFE/element/issues/14857
      type() {
        this.$nextTick(() => {
          this.setNativeInputValue();
          this.resizeTextarea();
          this.updateIconOffset();
        });
      }
    },

    methods: {
      focus() {
        this.getInput().focus();
      },
      blur() {
        this.getInput().blur();
      },
      getMigratingConfig() {
        return {
          props: {
            'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
            'on-icon-click': 'on-icon-click is removed.'
          },
          events: {
            'click': 'click is removed.'
          }
        };
      },
      handleBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
        if (this.validateEvent) {
          this.dispatch('DyFormItem', 'dy.form.blur', [this.value]);
        }
      },
      select() {
        this.getInput().select();
      },
      resizeTextarea() {
        if (this.$isServer) return;
        const { autosize, type } = this;
        if (type !== 'textarea') return;
        if (!autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
          };
          return;
        }
        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;

        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      },
      setNativeInputValue() {
        const input = this.getInput();
        if (!input) return;
        if (input.value === this.nativeInputValue) return;
        input.value = this.nativeInputValue;
      },
      handleFocus(event) {
        this.focused = true;
        this.$emit('focus', event);
      },
      handleCompositionStart(event) {
        this.$emit('compositionstart', event);
        this.isComposing = true;
      },
      handleCompositionUpdate(event) {
        this.$emit('compositionupdate', event);
        const text = event.target.value;
        const lastCharacter = text[text.length - 1] || '';
        this.isComposing = !isKorean(lastCharacter);
      },
      handleCompositionEnd(event) {
        this.$emit('compositionend', event);
        if (this.isComposing) {
          this.isComposing = false;
          this.handleInput(event);
        }
      },
      handleInput(event) {
        // should not emit input during composition
        // see: https://github.com/ElemeFE/element/issues/10516
        if (this.isComposing) return;

        // hack for https://github.com/ElemeFE/element/issues/8548
        // should remove the following line when we don't support IE
        if (event.target.value === this.nativeInputValue) return;

        this.$emit('input', event.target.value);

        // ensure native input value is controlled
        // see: https://github.com/ElemeFE/element/issues/12850
        this.$nextTick(this.setNativeInputValue);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      calcIconOffset(place) {
        let elList = [].slice.call(this.$el.querySelectorAll(`.dy-input__${place}`) || []);
        if (!elList.length) return;
        let el = null;
        for (let i = 0; i < elList.length; i++) {
          if (elList[i].parentNode === this.$el) {
            el = elList[i];
            break;
          }
        }
        if (!el) return;
        const pendantMap = {
          suffix: 'append',
          prefix: 'prepend'
        };

        const pendant = pendantMap[place];
        if (this.$slots[pendant]) {
          el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$el.querySelector(`.dy-input-group__${pendant}`).offsetWidth}px)`;
        } else {
          el.removeAttribute('style');
        }
      },
      updateIconOffset() {
        this.calcIconOffset('prefix');
        this.calcIconOffset('suffix');
      },
      clear() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clear');
      },
      handlePasswordVisible() {
        this.passwordVisible = !this.passwordVisible;
        this.$nextTick(() => {
          this.focus();
        });
      },
      getInput() {
        return this.$refs.input || this.$refs.textarea;
      },
      getSuffixVisible() {
        return this.$slots.suffix ||
          this.suffixIcon ||
          this.showClear ||
          this.showPassword ||
          this.isWordLimitVisible ||
          (this.validateState && this.needStatusIcon);
      }
    },

    created() {
      this.$on('inputSelect', this.select);
    },

    mounted() {
      this.setNativeInputValue();
      this.resizeTextarea();
      this.updateIconOffset();
    },

    updated() {
      this.$nextTick(this.updateIconOffset);
    }
  };
</script>
