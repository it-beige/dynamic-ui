<script>
import genAttrsMixin from 'main/mixins/attrs';
import { getComponentByName } from 'main/config/component';
import { isFunction, isArray } from 'main/utils/lodash';

const Select = getComponentByName('Select');
// eslint-disable-next-line
const OptionGroup = getComponentByName('OptionGroup');
// eslint-disable-next-line
const Option = getComponentByName('Option');

export default {
  name: 'DySelectGenerate',
  mixins: [genAttrsMixin(Select)],
  props: {
    formatter: {
      type: Function
    }
  },
  extraProps: ['props', 'options'],
  components: {},
  data() {
    return {
      bindProps: {},
      bindOptions: [...this.options]
    };
  },
  render() {
    // eslint-disable-next-line
    const SelectOpt = this.getSelectCompOpt();
    const OptionsVnode = this.renderOptions();

    return (
      <Select {...SelectOpt}>
        {OptionsVnode}
        {[...SelectOpt.slots]}
      </Select>
    );
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
      const slots = this.$slots;
      return this._getVnodesBySlots(slots);
    },
    getSelectCompOpt() {
      const self = this;
      const { getSelectProps, getSelectOn, getSelectSlots } = self;
      const props = getSelectProps();
      const on = getSelectOn();
      const slots = getSelectSlots();

      return {
        is: Select,
        attrs: this.$attrs,
        props,
        on,
        slots
      };
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
        if (Reflect.has(formatedItem, 'label')) {
          bindLabel = formatedItem.label;
        }
        if (Reflect.has(formatedItem, 'value')) {
          bindValue = formatedItem.value;
        }
        if (Reflect.has(formatedItem, 'disabled')) {
          bindDisabled = formatedItem.disabled;
        }
        if (Reflect.has(formatedItem, 'children')) {
          bindChildren = formatedItem.children;
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
      const {value, label} = props;

      return <Option
        {
        ...{props}
        }
        key={`${value}-${idx}`}
      >
        {isFunction(labelRender) && labelRender(label, i)}
      </Option>;
    },
    getGroupVnode(i, idx) {
      const { getOptionsVnode, getPropsWithFormatter } = this;
      const { label, children } = getPropsWithFormatter(i);

      return (
        <OptionGroup
          label={label}
          key={`${label}-${idx}`}
        >
          {
            i[children].reduce((groupVnode, c, cdx) => {
              groupVnode.push(getOptionsVnode(c, cdx));
              return groupVnode;
            }, [])
          }
        </OptionGroup>
      );
    },
    renderOptions() {
      const self = this;
      const { getOptionsVnode, getGroupVnode, bindProps, getPropsWithFormatter } = self;
      const { children } = bindProps;
      const optionTemplateRender = this.$scopedSlots.option;
      return this.options.reduce((optionsVnode, i, idx) => {
        const props = getPropsWithFormatter(i);
        if (isFunction(optionTemplateRender)) {
          optionsVnode.push(optionTemplateRender({props, i}));
        } else if (children && isArray(i[children])) {
          optionsVnode.push(getGroupVnode(i, idx));
        } else {
          optionsVnode.push(getOptionsVnode(i, idx));
        }
        return optionsVnode;
      }, []);
    }
  }
};
</script>

<style scoped lang="scss"></style>
