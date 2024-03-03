<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';
import genRequestMixin, { getExtra as getRequestMixExtra } from 'main/mixins/request';
import genPaginationMixin, { getExtra as getPaginationMixExtra } from 'main/mixins/pagination';
import { getComponentByName } from 'main/config/component';
import { isFunction, isArray } from 'main/utils/lodash';

const Select = getComponentByName('Select');
const OptionGroup = getComponentByName('OptionGroup');
const Option = getComponentByName('Option');

export default {
  name: 'DySelectGenerate',
  mixins: [genAttrsMixin(Select), genRequestMixin(), genPaginationMixin()],
  props: {
    // 格式化option数据
    formatter: {
      type: Function
    },
    activePopper: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      extraProps: [...getAttrMixExtra('prop'), ...getRequestMixExtra('prop'), ...getPaginationMixExtra('prop')],
      extraData: [...getAttrMixExtra('data'), ...getRequestMixExtra('data'), ...getPaginationMixExtra('data')]
    };
  },
  render() {
    const SelectVnode = this.renderSelect();
    return SelectVnode;
  },
  methods: {
    getSelectProps() {
      const props = this._excludeExtraProps(this.$props);
      return props;
    },
    getSelectOn() {
      const listeners = this._getListners();
      return listeners;
    },
    getSelectSlots() {
      const slots = [...this._getVnodesBySlots(this.$slots)];
      if (this.pagination) {
        slots.push(this.renderPagination());
      }
      return slots;
    },
    renderSelect() {
      const self = this;
      let createElement = self.$createElement;
      const { getSelectProps, getSelectOn, getSelectSlots } = self;
      const props = getSelectProps();
      const on = getSelectOn();
      const slots = getSelectSlots();
      const attrs = this.$attrs;
      const OptionsVnode = this.renderOptions();
      let nodes = [slots];
      if (this.lazy) {
        const directives = [
          { name: 'infinite-scroll', value: this.load }
        ];
        const infiniteScrollVnode = (
          <div
            {...{ directives }}
            ref="lazyWrapRef"
            class="dy-select-dropdown__lazy"
            infinite-scroll-distance={this.infiniteScrollDistance}
          >
            {OptionsVnode}
          </div>
        );
        nodes.push(infiniteScrollVnode);
      } else {
        nodes.push(OptionsVnode);
      }
      if (this.showLoading) {
        const loadingVnode = this.renderLoading();
        nodes.push(loadingVnode);
      }
      return createElement(Select.name, {
        staticClass: 'dy-select-generate',
        attrs,
        props,
        on,
        ref: Select.name
      }, nodes);
    },
    getPropsWithFormatter(i) {
      const { bindProps, formatter } = this;
      const { label, value, disabled, children } = bindProps;
      let bindLabel = i[label];
      let bindValue = i[value];
      let bindDisabled = i[disabled];
      let bindChildren = i[children];
      if (isFunction(formatter)) {
        let formatedItem = formatter(i);
        if (Reflect.has(formatedItem, label)) {
          bindLabel = formatedItem[label];
        }
        if (Reflect.has(formatedItem, value)) {
          bindValue = formatedItem[value];
        }
        if (Reflect.has(formatedItem, disabled)) {
          bindDisabled = formatedItem[disabled];
        }
        if (Reflect.has(formatedItem, children)) {
          bindChildren = formatedItem[children];
        }
      }
      const props = {
        label: bindLabel,
        value: bindValue,
        disabled: bindDisabled,
        children: bindChildren
      };
      return props;
    },
    getOptionsVnode(i, idx) {
      const { bindProps, getPropsWithFormatter } = this;
      const { labelRender } = bindProps;
      const props = getPropsWithFormatter(i);
      const { value, label } = props;

      return <Option.name
        {
        ...{ props }
        }
        key={`${value}-${idx}`}
      >
        {isFunction(labelRender) && labelRender(label, i)}
      </Option.name>;
    },
    getGroupVnode(i, idx) {
      const { getOptionsVnode, getPropsWithFormatter } = this;
      const { label, children, disabled } = getPropsWithFormatter(i);

      return (
        <OptionGroup.name
          label={label}
          disabled={disabled}
          key={`${label}-${idx}`}
        >
          {
            children.reduce((groupVnode, c, cdx) => {
              groupVnode.push(getOptionsVnode(c, cdx));
              return groupVnode;
            }, [])
          }
        </OptionGroup.name>
      );
    },
    renderOptions() {
      const self = this;
      const { getOptionsVnode, getGroupVnode, bindProps, getPropsWithFormatter } = self;
      const { children } = bindProps;
      const optionTemplateRender = this.$scopedSlots.option;
      return this.bindOptions.reduce((optionsVnode, i, idx) => {
        const props = getPropsWithFormatter(i);
        if (isFunction(optionTemplateRender)) {
          optionsVnode.push(optionTemplateRender({ props, i }));
        } else if (children && isArray(i[children])) {
          optionsVnode.push(getGroupVnode(i, idx));
        } else {
          optionsVnode.push(getOptionsVnode(i, idx));
        }
        return optionsVnode;
      }, []);
    },
    renderLoading() {
      const directives = [
        { name: 'loading', value: this.requestPending }
      ];
      return (
        <div
          {...{ directives }}
          class="dy-select-dropdown__loading"
          dynamic-loading-text={this.dynamicLoadingText}
        >
        </div>
      );
    }

  }
};
</script>


