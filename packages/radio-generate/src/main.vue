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
import { isFunction } from 'main/utils/lodash';

const Radio = getComponentByName('Radio');
const RadioGroup = getComponentByName('RadioGroup');
const RadioButton = getComponentByName('RadioButton');
const optionProps = globalConfig.useOptionProps();

export default {
  name: 'DyRadioGenerate',
  mixins: [genRequestMixin()],
  components: {

  },
  props: {
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
      default: 'circle',
      validator: (value) => {
        return ['circle', 'button'].includes(value);
      }
    },
    // 是否分组
    group: {
      type: Boolean,
      default: true
    },
    value: {},
    // 是否可取消选中
    toggle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      extraProps: [...getRequestMixExtra('prop')],
      extraData: [...getRequestMixExtra('data')],
      bindProps: {
        ...globalConfig.useOptionProps(),
        ...this.props
      }
    };
  },
  computed: {
    bindValue: {
      get({value}) {
        return Array.from(new Set(value));
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  watch: {
    props: {
      handler () {
        this.bindProps = {...this.bindProps, ...this.props};
      },
      deep: true
    }
  },
  render () {
    const RadioVnode = this.renderRadio();
    return this.group ? this.renderRadioGroup(RadioVnode) : <div class="dy-radio__container">
      { RadioVnode }
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
    renderRadioGroup(children) {
      const props = this.getProps(RadioGroup, this.$attrs);
      props.value = this.value;
      const data = {
        staticClass: 'dy-radio-group-generate',
        props,
        on: this.$listeners,
        ref: RadioGroup.name
      };
      return (
        <RadioGroup.name {...data}>
          {children}
        </RadioGroup.name>
      );
    },
    renderRadio () {
      const { getOptionsVnode, getPropsWithFormatter } = this;
      const radioTemplateRender = this.$scopedSlots.radio;
      return this.bindOptions.reduce((optionsVnode, i, idx) => {
        const props = getPropsWithFormatter(i);
        if (isFunction(radioTemplateRender)) {
          optionsVnode.push(radioTemplateRender({props, i}));
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
        const set = new Set(this.bindValue);
        set.add(value);
        this.bindValue = Array.from(set);
      }

    },
    toggleValue(props) {
      if (this.toggle) {
        this.bindValue = this.bindValue.filter(i => i !== props.value);
      }
    },
    getOptionsVnode (i, idx) {
      const { bindProps, getPropsWithFormatter, getComponentByType } = this;
      const { labelRender } = bindProps;
      const props = getPropsWithFormatter(i);
      const {value, label} = props;
      props.label = value;
      if (!this.bindValue.includes(value)) {
        props.value = undefined;
      }
      const component = getComponentByType();
      let data = {
        staticClass: 'dy-radio-generate',
        props,
        on: {
          input: (v) => this.updateValue(i, v),
          click: () => this.toggleValue(props)
        },
        ref: component.name
      };

      return <component.name
        {...data}
        key={`${value}-${idx}`}
        ref={`${value}Radio`}
      >
        {isFunction(labelRender) ? labelRender(label, i) : label}
      </component.name>;
    },
    getComponentByType() {
      const { type } = this;
      const component = type === 'circle' ? Radio : RadioButton;
      return component;
    },
    useRef() {
      let ref = {};
      if (this.group) {
        ref[RadioGroup.name] = this.$refs[RadioGroup.name];
      }
      const component = this.getComponentByType();
      ref[component.name] = this.$refs[component.name];
      return ref;
    }
  }
};
</script>


