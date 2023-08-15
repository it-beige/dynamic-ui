<template>
  <dy-popover
    v-bind="$attrs"
    v-model="visible"
    trigger="click"
  >
  <div class="dy-popconfirm">
    <p class="dy-popconfirm__main">
    <i
      v-if="!hideIcon"
      :class="icon"
      class="dy-popconfirm__icon"
      :style="{color: iconColor}"
    ></i>
      {{title}}
    </p>
    <div class="dy-popconfirm__action">
      <dy-button 
        size="mini" 
        :type="cancelButtonType" 
        @click="cancel"
      >
        {{ displayCancelButtonText }}
      </dy-button>
      <dy-button 
        size="mini" 
        :type="confirmButtonType" 
        @click="confirm"
      >
        {{ displayConfirmButtonText }}
      </dy-button>
    </div>
  </div>
  <slot name="reference" slot="reference"></slot>
</dy-popover>
</template>

<script>
import DyPopover from 'dynamic-ui/packages/popover';
import DyButton from 'dynamic-ui/packages/button';
import {t} from 'dynamic-ui/src/locale';

export default {
  name: 'DyPopconfirm',
  props: {
    title: {
      type: String
    },
    confirmButtonText: {
      type: String
    },
    cancelButtonText: {
      type: String
    },
    confirmButtonType: {
      type: String,
      default: 'primary'
    },
    cancelButtonType: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: 'dy-icon-question'
    },
    iconColor: {
      type: String,
      default: '#f90'
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    DyPopover,
    DyButton
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    displayConfirmButtonText() {
      return this.confirmButtonText || t('dy.popconfirm.confirmButtonText');
    },
    displayCancelButtonText() {
      return this.cancelButtonText || t('dy.popconfirm.cancelButtonText');
    }
  },
  methods: {
    confirm() {
      this.visible = false;
      this.$emit('confirm');
    },
    cancel() {
      this.visible = false;
      this.$emit('cancel');
    }
  }
};
</script>
