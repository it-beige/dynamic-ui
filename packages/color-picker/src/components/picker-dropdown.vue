<template>
  <transition name="dy-zoom-in-top" @after-leave="doDestroy">
    <div
      class="dy-color-dropdown"
      v-show="showPopper">
      <div class="dy-color-dropdown__main-wrapper">
        <hue-slider ref="hue" :color="color" vertical style="float: right;"></hue-slider>
        <sv-panel ref="sl" :color="color"></sv-panel>
      </div>
      <alpha-slider v-if="showAlpha" ref="alpha" :color="color"></alpha-slider>
      <predefine v-if="predefine" :color="color" :colors="predefine"></predefine>
      <div class="dy-color-dropdown__btns">
        <span class="dy-color-dropdown__value">
          <dy-input
            v-model="customInput"
            @keyup.native.enter="handleConfirm"
            @blur="handleConfirm"
            :validate-event="false"
            size="mini">
          </dy-input>
        </span>
        <dy-button
          size="mini"
          type="text"
          class="dy-color-dropdown__link-btn"
          @click="$emit('clear')">
          {{ t('dy.colorpicker.clear') }}
        </dy-button>
        <dy-button
          plain
          size="mini"
          class="dy-color-dropdown__btn"
          @click="confirmValue">
          {{ t('dy.colorpicker.confirm') }}
        </dy-button>
      </div>
    </div>
  </transition>
</template>

<script>
  import SvPanel from './sv-panel';
  import HueSlider from './hue-slider';
  import AlphaSlider from './alpha-slider';
  import Predefine from './predefine';
  import Popper from 'dynamic-ui/src/utils/vue-popper';
  import Locale from 'dynamic-ui/src/mixins/locale';
  import DyInput from 'dynamic-ui/packages/input';
  import DyButton from 'dynamic-ui/packages/button';

  export default {
    name: 'Dy-color-picker-dropdown',

    mixins: [Popper, Locale],

    components: {
      SvPanel,
      HueSlider,
      AlphaSlider,
      DyInput,
      DyButton,
      Predefine
    },

    props: {
      color: {
        required: true
      },
      showAlpha: Boolean,
      predefine: Array
    },

    data() {
      return {
        customInput: ''
      };
    },

    computed: {
      currentColor() {
        const parent = this.$parent;
        return !parent.value && !parent.showPanelColor ? '' : parent.color.value;
      }
    },

    methods: {
      confirmValue() {
        this.$emit('pick');
      },

      handleConfirm() {
        this.color.fromString(this.customInput);
      }
    },

    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.referenceElm = this.$parent.$el;
    },

    watch: {
      showPopper(val) {
        if (val === true) {
          this.$nextTick(() => {
            const { sl, hue, alpha } = this.$refs;
            sl && sl.update();
            hue && hue.update();
            alpha && alpha.update();
          });
        }
      },

      currentColor: {
        immediate: true,
        handler(val) {
          this.customInput = val;
        }
      }
    }
  };
</script>
