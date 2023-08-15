<template>
  <transition name="dy-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="dy-autocomplete-suggestion dy-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region">
      <dy-scrollbar
        tag="ul"
        wrap-class="dy-autocomplete-suggestion__wrap"
        view-class="dy-autocomplete-suggestion__list">
        <li v-if="!parent.hideLoading && parent.loading"><i class="dy-icon-loading"></i></li>
        <slot v-else>
        </slot>
      </dy-scrollbar>
    </div>
  </transition>
</template>
<script>
  import Popper from 'dynamic-ui/src/utils/vue-popper';
  import Emitter from 'dynamic-ui/src/mixins/emitter';
  import DyScrollbar from 'dynamic-ui/packages/scrollbar';

  export default {
    components: { DyScrollbar },
    mixins: [Popper, Emitter],
    componentName: 'AutocompleteSuggestions',

    data() {
      return {
        parent: this.$parent,
        dropdownWidth: ''
      };
    },

    props: {
      options: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },
      id: String
    },

    methods: {
      select(item) {
        this.dispatch('DyAutocomplete', 'item-click', item);
      }
    },

    updated() {
      this.$nextTick(_ => {
        this.popperJS && this.updatePopper();
      });
    },

    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.referenceElm = this.$parent.$refs.input.$refs.input || this.$parent.$refs.input.$refs.textarea;
      this.referenceList = this.$el.querySelector('.dy-autocomplete-suggestion__list');
      this.referenceList.setAttribute('role', 'listbox');
      this.referenceList.setAttribute('id', this.id);
    },

    created() {
      this.$on('visible', (val, inputWidth) => {
        this.dropdownWidth = inputWidth + 'px';
        this.showPopper = val;
      });
    }
  };
</script>
