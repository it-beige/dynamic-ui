<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';
import genRequestMixin, {
  getExtra as getRequestMixExtra
} from 'main/mixins/request';
import genPaginationMixin, {
  getExtra as getPaginationMixExtra
} from 'main/mixins/pagination';
import { getComponentByName } from 'main/config/component';
import { isFunction, isArray } from 'lodash';
import { createNamespace } from 'main/utils/create';

import SelectMenu from 'dynamic-ui/packages/select/src/select-dropdown.vue';
const Input = getComponentByName('Input');
const Tree = getComponentByName('Tree');
const Scrollbar = getComponentByName('Scrollbar');

const props = {
  // 单选情况下只能选叶子节点
  isSelectLeaf: {
    type: Boolean,
    default: true
  },
  // 多选
  multiple: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Array]
  }
};
export default {
  name: 'DyTreeSelectGenerate',
  mixins: [genAttrsMixin(Input), genRequestMixin(), genPaginationMixin()],
  components: {
    [SelectMenu.name]: SelectMenu
  },
  props: {
    ...props
  },
  data() {
    return {
      extraProps: [
        ...getAttrMixExtra('prop'),
        ...getRequestMixExtra('prop'),
        ...getPaginationMixExtra('prop'),
        ...Object.keys(props)
      ],
      extraData: [
        ...getAttrMixExtra('data'),
        ...getRequestMixExtra('data'),
        ...getPaginationMixExtra('data')
      ],
      visible: false,
      selected: this.multiple ? [] : {}
    };
  },
  computed: {
    iconClass() {
      return this.visible
        ? 'arrow-up is-reverse'
        : 'arrow-up';
    }

  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.selected = this.value;
      }
    }
  },
  render() {
    return (
      <div class="dy-select" onClick={this.toggleMenu}>
        {this.renderTreeSelect()}
        {this.renderTree()}
      </div>
    );
  },
  methods: {
    getTreeSelectProps() {
      const props = this._excludeExtraProps(this.$props);
      props.readonly = true;
      return props;
    },
    getTreeSelectOn() {
      const listeners = this._getListners();
      return listeners;
    },
    getTreeSelectSlots() {
      const slots = [...this._getVnodesBySlots(this.$slots)];
      slots.push(this.renderSuffix());
      return slots;
    },
    renderSuffix() {
      const { iconClass } = this;
      return <i slot="suffix" class={['dy-select__caret', 'dy-input__icon', 'dy-icon-' + iconClass]}>
      </i>;
    },
    renderTreeSelect() {
      const self = this;
      let createElement = self.$createElement;
      const { getTreeSelectProps, getTreeSelectOn, getTreeSelectSlots } = self;
      const props = getTreeSelectProps();
      const on = getTreeSelectOn();
      const slots = getTreeSelectSlots();
      const attrs = this.$attrs;
      let nodes = [slots];

      return createElement(
        Input.name,
        {
          staticClass: 'dy-tree-select-generate',
          attrs,
          props,
          on,
          ref: 'reference'
        },
        nodes,
      );
    },
    renderTree() {
      const data = {
        props: {
          data: this.bindOptions,
          props: this.bindProps
        },
        on: {
          'node-click': this.clickNode
        }
      };
      return (
        <transition name="dy-zoom-in-top">
          <SelectMenu.name ref="popper" append-to-body={true} v-show={this.visible}>
            <Scrollbar.name
              wrap-class="dy-select-dropdown__wrap"
              view-class="dy-select-dropdown__list"
              ref="scrollbar"
              v-show={this.bindOptions.length && !this.loading}
            >
              <Tree.name {...data}>
              </Tree.name>
            </Scrollbar.name>
          </SelectMenu.name>
        </transition>
      );
    },
    useRef () {
      return this.$refs.reference;
    },
    toggleMenu(e) {
      e.stopPropagation();
      const [, bem] = createNamespace('input');
      if (!this.disabled) {
        this.visible = !this.visible;
        if (this.visible) {
          this.useRef().focus();
        } else {
          const elm = this.useRef().$el.querySelector(`.${bem('suffix')}`);
          if (elm.contains(e.target)) {
            this.useRef().blur();
          }

        }
      }
    },
    clickNode(data, node) {
      if (!node.isLeaf) {
        return;
      }

    }
  }
};
</script>
