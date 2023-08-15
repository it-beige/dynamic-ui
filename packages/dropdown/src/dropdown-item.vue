<template>
  <li
    class="dy-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'dy-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </li>
</template>
<script>
  import Emitter from 'dynamic-ui/src/mixins/emitter';

  export default {
    name: 'DyDropdownItem',

    mixins: [Emitter],

    props: {
      command: {},
      disabled: Boolean,
      divided: Boolean,
      icon: String
    },

    methods: {
      handleClick(e) {
        this.dispatch('DyDropdown', 'menu-item-click', [this.command, this]);
      }
    }
  };
</script>
