<script>
import {
  getCompPropsBySourceOpt
} from 'main/utils/component.js';
import {
  camelToKebab
} from 'main/utils/util.js';
import globalConfig from 'main/config/global';

import genRequestMixin, {getExtra as getRequestMixExtra} from 'main/mixins/request';
import { getComponentByName } from 'main/config/component';
import { isFunction, isString } from 'main/utils/lodash';

const Checkbox = getComponentByName('Checkbox');
const CheckboxGroup = getComponentByName('CheckboxGroup');
const CheckboxButton = getComponentByName('CheckboxButton');
const optionProps = globalConfig.useOptionProps();

const props = {
  props: {
    type: Object,
    default: () => optionProps
  },
  // 格式化option数据
  formatter: {
    type: Function
  },
  // 支持的类型
  type: {
    type: String,
    default: 'square',
    validator: (value) => {
      return ['square', 'button'].includes(value);
    }
  },
  // 是否分组
  group: {
    type: Boolean,
    default: true
  },
  value: {
    type: Array
  }
};
export default {
  name: 'DyCheckboxGenerate',
  mixins: [genRequestMixin()],
  components: {

  },
  props,
  data () {
    return {
      extraProps: [...getRequestMixExtra('prop'), ...Object.keys(props)],
      extraData: [...getRequestMixExtra('data')],
      bindProps: {
        ...globalConfig.useOptionProps(),
        ...this.props
      },
      groupValue: []
    };
  },
  watch: {
    props: {
      handler () {
        this.bindProps = {...this.bindProps, ...this.props};
      },
      deep: true
    },
    value: {
      handler() {
        if (this.group) {
          this.groupValue = Array.from(new Set(this.value));
        }
      },
      immediate: true
    }
  },
  render () {
    const CheckboxVnode = this.renderCheckbox();
    return this.group ? this.renderCheckboxGroup(CheckboxVnode) : <div class="dy-checkbox__container">
      { CheckboxVnode }
    </div>;
  },
  methods: {
    getProps (component, target) {
      const componentProps = getCompPropsBySourceOpt(component);
      return Object.keys(componentProps).reduce((_, k) => {
        _[k] = target[camelToKebab(k)];
        return _;
      }, {});
    },
    renderCheckboxGroup(children) {
      const props = this.getProps(CheckboxGroup, this.$attrs);
      props.value = this.value;
      const data = {
        staticClass: 'dy-checkbox-group-generate',
        props,
        on: this.$listeners,
        ref: CheckboxGroup.name
      };
      return (
        <CheckboxGroup.name {...data}>
          {children}
        </CheckboxGroup.name>
      );
    },
    renderCheckbox () {
      const { getOptionsVnode, getPropsWithFormatter } = this;
      const checkboxTemplateRender = this.$scopedSlots.checkbox;
      return this.bindOptions.reduce((optionsVnode, i, idx) => {
        const props = getPropsWithFormatter(i);
        if (isFunction(checkboxTemplateRender)) {
          optionsVnode.push(checkboxTemplateRender({props, i}));
        } else {
          optionsVnode.push(getOptionsVnode(i, idx));
        }
        return optionsVnode;
      }, []);
    },
    getPropsWithFormatter (i) {
      const { getComponentByType, bindProps, formatter } = this;
      const { label, value, disabled, updateValue } = bindProps;
      let bindLabel = i[label];
      let bindValue = i[value];
      let bindDisabled = i[disabled];
      let bindUpdateValue = i[updateValue];
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
        if (Reflect.has(formatedItem, updateValue)) {
          bindUpdateValue = formatedItem[updateValue];
        }
      }
      const component = getComponentByType();
      const attrs = this.getProps(component, i);
      const props = {
        ...attrs,
        label: bindLabel,
        value: bindValue,
        disabled: bindDisabled,
        bindUpdateValue
      };
      return props;
    },
    updateValue(props, value) {
      const { updateValue, ...rest} = props;
      if (isFunction(updateValue)) {
        updateValue(rest);
      }
      if (!this.group) {
        const set = new Set(this.groupValue);
        set.add(value);
        this.groupValue = Array.from(set);
      }
    },
    getOptionsVnode (i, idx) {
      const { bindProps, getPropsWithFormatter, getComponentByType } = this;
      const { labelRender } = bindProps;
      const props = getPropsWithFormatter(i);
      const {value, label} = props;
      props.label = value;
      if (!this.groupValue.includes(value)) {
        props.value = undefined;
      }
      const component = getComponentByType();
      let data = {
        staticClass: 'dy-checkbox-generate',
        props,
        on: {
          change: (v) => this.updateValue(i, v)
        }
      };

      return <component.name
        {...data}
        key={`${value}-${idx}`}
        ref={`${value}${component.name}`}
      >
        {isFunction(labelRender) ? labelRender(label, i) : label}
      </component.name>;
    },
    getComponentByType() {
      const { type } = this;
      const component = type === 'square' ? Checkbox : CheckboxButton;
      return component;
    },
    useRef() {
      let ref = {};
      if (this.group) {
        ref[CheckboxGroup.name] = this.$refs[CheckboxGroup.name];
      }
      const component = this.getComponentByType();
      ref[component.name] = this.bindOptions.map(({value}) => {
        return this.$refs[`${value}${ component.name}`];
      });
      return ref;
    }
  }
};
</script>


