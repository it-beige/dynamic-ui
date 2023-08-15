<template>
  <div class="dy-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`dy-collapse-content-${id}`"
      :aria-describedby ="`dy-collapse-content-${id}`"
    >
      <div
        class="dy-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`dy-collapse-head-${id}`"
        :tabindex="disabled ? undefined : 0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <slot name="title">{{title}}</slot>
        <i
          class="dy-collapse-item__arrow dy-icon-arrow-right"
          :class="{'is-active': isActive}">
        </i>
      </div>
    </div>
    <dy-collapse-transition>
      <div
        class="dy-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`dy-collapse-head-${id}`"
        :id="`dy-collapse-content-${id}`"
      >
        <div class="dy-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </dy-collapse-transition>
  </div>
</template>
<script>
  import DyCollapseTransition from 'dynamic-ui/src/transitions/collapse-transition';
  import Emitter from 'dynamic-ui/src/mixins/emitter';
  import { generateId } from 'dynamic-ui/src/utils/util';

  export default {
    name: 'DyCollapseItem',

    componentName: 'DyCollapseItem',

    mixins: [Emitter],

    components: { DyCollapseTransition },

    data() {
      return {
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0,
        focusing: false,
        isClick: false,
        id: generateId()
      };
    },

    inject: ['collapse'],

    props: {
      title: String,
      name: {
        type: [String, Number],
        default() {
          return this._uid;
        }
      },
      disabled: Boolean
    },

    computed: {
      isActive() {
        return this.collapse.activeNames.indexOf(this.name) > -1;
      }
    },

    methods: {
      handleFocus() {
        setTimeout(() => {
          if (!this.isClick) {
            this.focusing = true;
          } else {
            this.isClick = false;
          }
        }, 50);
      },
      handleHeaderClick() {
        if (this.disabled) return;
        this.dispatch('DyCollapse', 'item-click', this);
        this.focusing = false;
        this.isClick = true;
      },
      handleEnterClick() {
        this.dispatch('DyCollapse', 'item-click', this);
      }
    }
  };
</script>
