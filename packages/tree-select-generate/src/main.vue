<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';
import genRequestMixin, {
  getExtra as getRequestMixExtra
} from 'main/mixins/request';
import genPaginationMixin, {
  getExtra as getPaginationMixExtra
} from 'main/mixins/pagination';
import { getCompPropsBySourceOpt, genComponentPorps } from 'main/utils/component.js';
import { getComponentByName } from 'main/config/component';
import _ from 'lodash';
import { createNamespace } from 'main/utils/create';
import {
  findParentElement
} from 'dynamic-ui/src/utils/dom';
import {
  getValueByTree
} from 'dynamic-ui/src/utils/util';

import Clickoutside from 'dynamic-ui/src/utils/clickoutside';
import SelectMenu from 'dynamic-ui/packages/select/src/select-dropdown.vue';
const Input = getComponentByName('Input');
const Tree = getComponentByName('Tree');
const Scrollbar = getComponentByName('Scrollbar');

export const [TreeCtor, TreePick] = genComponentPorps(getCompPropsBySourceOpt(Tree));

const props = {
  value: {
    type: [String, Object, Array]
  },
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
  // 激活v-clickoutside的处理
  activePopper: {
    type: Boolean,
    default: true
  },
  // 是否开启过滤树的功能
  filterable: {
    type: Boolean,
    default: false
  },
  treeProps: {
    type: TreeCtor,
    default: () => new TreeCtor()
  }
};
export default {
  name: 'DyTreeSelectGenerate',
  mixins: [genAttrsMixin(Input), genRequestMixin(), genPaginationMixin()],
  directives: { Clickoutside },
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
      selected: this.multiple ? [] : {},
      filterText: ''
    };
  },
  computed: {
    iconClass() {
      return this.visible ? 'arrow-up is-reverse' : 'arrow-up';
    },
    valueText() {
      return this.multiple ? '' : this.selected[this.bindProps.label];
    }
  },
  watch: {
    filterText: {
      handler: 'filterMethod'
    }
  },
  render() {
    return (
      <div class="dy-select tree-select-generate" onClick={this.toggleMenu}>
        {this.renderTreeSelect()}
        {this.renderTree()}
      </div>
    );
  },
  created () {
    this.$unWatch = [this.watchValueEffect()];
  },
  beforeDestroy() {
    this.$unWatchs.forEach(i => i());
  },
  methods: {
    getTreeSelectProps() {
      const props = this._excludeExtraProps(this.$props);
      props.readonly = true;
      props.value = this.valueText;
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
      return (
        <i
          slot="suffix"
          class={['dy-select__caret', 'dy-input__icon', 'dy-icon-' + iconClass]}
        ></i>
      );
    },
    renderTreeSelect() {
      const self = this;
      let createElement = self.$createElement;
      const { getTreeSelectProps, getTreeSelectOn, getTreeSelectSlots } = self;
      const props = getTreeSelectProps();
      const on = getTreeSelectOn();
      const slots = getTreeSelectSlots();
      const attrs = this.$attrs;
      const directives = [{
        name: 'clickoutside',
        value: this.handleClose
      }];
      let nodes = [slots];

      return createElement(
        Input.name,
        {
          attrs,
          props,
          on,
          directives,
          ref: 'reference'
        },
        nodes,
      );
    },
    renderTree() {
      const props = {
        // ...TreePick(this.treeProps),
        data: this.bindOptions,
        props: this.bindProps,
        nodeKey: this.bindProps.value
      };
      if (this.filterable) {
        props.filterNodeMethod = this.genFilterNodeMethod(props.filterNodeMethod);
      }
      const data = {
        props,
        on: {
          'node-click': this.clickNode
        },
        ref: 'treeRef'
      };
      return (
        <transition name="dy-zoom-in-top">
          <SelectMenu.name
            ref="popper"
            append-to-body={true}
            v-show={this.visible}
          >
            <Input.name
              placeholder="输入关键词进行筛选"
              class="active-popper filter-input"
              suffix-icon="dy-icon-search"
              v-model={this.filterText}
              nativeOnKeydown={this.handleFilter}
            />
            <Scrollbar.name
              wrap-class="dy-select-dropdown__wrap"
              view-class="dy-select-dropdown__list"
              ref="scrollbar"
              v-show={this.bindOptions.length && !this.loading}
            >
              <Tree.name {...data}></Tree.name>
            </Scrollbar.name>
          </SelectMenu.name>
        </transition>
      );
    },
    useRef() {
      return this.$refs.reference;
    },
    toggleMenu(e) {
      e.stopPropagation();
      if (findParentElement(e.target, 'active-popper')) {
        return;
      }
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
      if (this.visible && !this.multiple) {
        this.$nextTick(() => {
          this.$refs.treeRef.setCurrentKey(this.getValue(this.selected));
        });
      }
    },
    clickNode(data, node) {
      if (this.isSelectLeaf && !node.isLeaf) {
        return;
      }
      this.selected = data;
      this.visible = false;
      this.$emit('input', this.getValue(this.selected));
    },
    handleClose(mouseupTarget) {
      if (this.activePopper && findParentElement(mouseupTarget, 'dy-popper')) {
        return;
      }
      this.visible = false;
    },
    handleFilter(e) {
      // Enter
      if (e.keyCode === 13) {
        this.filterMethod(this.filterText);
      }
    },
    getValue(value) {
      return value[this.bindProps.value];
    },
    watchValueEffect() {
      return this.$watch(
        () => [this.value, this.bindOptions],
        ([value, bindOptions]) => {
          if (!value || !bindOptions.length) {
            return;
          }

          if (this.multiple) {
            this.selected = this.value.map(i => getValueByTree(bindOptions, i, {
              key: this.bindProps.value,
              children: this.bindProps.children
            }));
          } else {
            this.selected = getValueByTree(bindOptions, value, {
              key: this.bindProps.value,
              children: this.bindProps.children
            });
          }
        },
        {immediate: true}
      );
    },
    /** ********************* 过滤树形方法-start ************************/
    // 最终绑定fks-tree中的filterNodeMethod
    genFilterNodeMethod(filterNodeMethod) {
      // 用户自定义过滤树的方法
      if (_.isFunction(filterNodeMethod)) {
        return filterNodeMethod;
      }
      return this.defaultFilterNodeMethod;
    },
    // 默认接受表单输入的过滤值的方法
    filterMethod(text) {
      this.$refs.treeRef.filter(text);
    },
    // 默认过滤树的方法
    defaultFilterNodeMethod(value, data, node) {
      if (!value) return true;
      return this.filterChildrenNode(
        value,
        data,
        node,
        this.filterMethodByIndexOf,
      );
    },
    // 根据哪个条件过滤
    filterMethodByIndexOf(label, value) {
      return label.indexOf(value) !== -1;
    },
    // 如果父节点包含，不要筛选掉子节点
    filterChildrenNode(value, data, node, filterMethodByIndexOf) {
      if (filterMethodByIndexOf(node.label, value)) {
        return true;
      }
      // 一级节点没有父级
      if (node.level === 1) return false;

      // 往上找到最大父节点结束
      const maxNode = 1;
      // 多级节点父级符合条件，不要、过滤子级
      let parentNode = node.parent;

      while (parentNode.level > maxNode) {
        if (filterMethodByIndexOf(parentNode.label, value)) {
          parentNode.expanded = false;
          return true;
        }

        parentNode = parentNode.parent;
      }

      // 当前节点的最大父节点都没找到
      return false;
    }
    /** ****************** 树形过滤-end ***********************/
  }
};
</script>
