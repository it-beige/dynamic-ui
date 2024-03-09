<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';
import { getComponentByName } from 'main/config/component';
import { getFormItemComponentAttribute } from 'main/config/form';
import { genFormItemValue } from 'main/utils/component';

import _, { isFunction } from 'lodash';

const Form = getComponentByName('Form');
const Row = getComponentByName('Row');

import GenerateFormItem from './form-item.vue';

export default {
  name: 'DyFormGenerate',
  mixins: [genAttrsMixin(Form)],
  props: {
    // 表单数据对象
    value: {
      type: Object,
      required: true
    },
    // 表单配置对象
    config: {
      type: Array,
      required: true
    },
    labelSuffix: {
      type: String,
      default: '：'
    },
    // 表单项渲染组件class配置
    classSheets: {
      type: Object,
      default: () => ({})
    },
    // 表单项class配置
    itemClassSheets: {
      type: Object,
      default: () => ({})
    },
    // 包裹表单项的col组件的class配置
    colClassSheets: {
      type: Object,
      default: () => ({})
    },
    // 控制表单项的禁用
    isDisableds: {
      type: Object,
      default: () => ({})
    },
    // 控制表单项的输入
    isReadonlys: {
      type: Object,
      default: () => ({})
    }, // 控制表单项的渲染
    isRenders: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    [GenerateFormItem.name]: GenerateFormItem
  },
  data() {
    return {
      extraProps: [...getAttrMixExtra('prop')],
      extraData: [...getAttrMixExtra('data')]
    };
  },
  computed: {
    validteProps() {
      return this.config.map(i => i.prop);
    }
  },
  watch: {
    config: {
      immediate: true,
      handler() {
        this.init(true);
      }
    },
    value: {
      handler(v, lastV) {
        if (_.isEqual(v, lastV)) {
          return;
        }
        this.init();
      }
    }
  },
  render() {
    const FormVnode = this.renderForm();
    return FormVnode;
  },
  methods: {
    init(isMounted) {
      const model = genFormItemValue(this.value, this.config);
      this.$emit('input', model);
      // 重置因初始化数据导致的change校验
      const clear = () => this.$nextTick(() => {
        const formRef = this.useRef();
        formRef && formRef.clearValidate();
      });
      isMounted ? this.$once('hook:mounted', () =>
        clear()
      ) : clear();
    },
    getFormProps() {
      const props = this._excludeExtraProps(this.$props);
      props.model = this.value;
      return props;
    },
    getFormOn() {
      const listeners = this._getListners();
      return listeners;
    },
    getFormSlots() {
      const slots = this.$slots;
      return this._getVnodesBySlots(slots);
    },
    getFormScopedSlots() {
      let scopedSlots = {};
      return scopedSlots;
    },
    renderForm() {
      const self = this;
      let createElement = self.$createElement;
      const { getFormProps, getFormOn, getFormSlots, getFormScopedSlots } = self;
      const props = getFormProps();
      const on = getFormOn();
      const slots = getFormSlots();
      const scopedSlots = getFormScopedSlots();
      const attrs = this.$attrs;
      const children = [slots];
      const rowVnode = this.renderFormLayout();
      children.push(rowVnode);

      return createElement(
        Form.name,
        {
          staticClass: 'dy-form-generate',
          class: [],
          attrs,
          props,
          on,
          ref: Form.name,
          scopedSlots
        },
        children,
      );
    },
    genFormItemAttrs(data, componentName) {
      const attributes = getFormItemComponentAttribute(componentName) || [];
      return attributes.reduce((attrs, _) => {
        if (Reflect.has(data, _)) {
          attrs[_] = data[_];
        }
        return attrs;
      }, {});
    },
    renderFormLayout() {
      const updateValue = (on, i) => {
        return value => {
          this.updateModelValue(this.value, i, value);
          if (isFunction(on.input)) {
            this.updateModelValue(this.value, i, on.input(this.value[i.prop]));
          }
        };
      };

      const props = this.getComponentProps(Row, this.$attrs, {
        type: 'flex',
        gutter: 20,
        ...props
      });
      const data = {
        props
      };
      return (
        <Row.name {...data}>
          {this.config.map((i, idx) => {
            const {
              props = {},
              on = {},
              nativeOn,
              slots,
              itemSlots,
              itemProps,
              colProps,
              component,
              span,
              label,
              prop,
              isDisabled,
              isReadonly,
              isRender
            } = i;
            const attrs = component === 'slot' ? {} : this.genFormItemAttrs(props, component);
            const data = {
              props: {
                model: this.value,
                props,
                slots,
                itemSlots,
                colProps,
                itemProps,
                classSheet: this.classSheets[prop],
                itemClassSheet: this.itemClassSheets[prop],
                isDisabled: this.isDisableds[prop] || isDisabled,
                isReadonly: this.isReadonlys[prop] || isReadonly,
                isRender: this.isRenders[prop] || isRender
              },
              attrs,
              nativeOn,
              on: {
                ...on,
                input: updateValue(on, i)
              }
            };
            if (component === 'slot') {
              data.props.defaultRender = this.$scopedSlots[prop] || i.default;
            }
            return (
              <GenerateFormItem.name
                class={this.colClassSheets[prop]}
                value={this.getModelValue(this.value, i)}
                span={span}
                label={label}
                prop={prop}
                component={component}
                key={i.prop}
                {...data}
              >
              </GenerateFormItem.name>
            );
          })}
        </Row.name>
      );
    },
    getModelValue(model, i) {
      const { prop, formatter } = i;
      let value = _.get(model, prop);
      if (isFunction(formatter)) {
        value = formatter(value);
      }
      return value;
    },
    updateModelValue(model, i, value) {
      const { prop, formatter } = i;
      if (isFunction(formatter)) {
        value = formatter(value);
      }
      _.set(model, prop, value);
      return this.getModelValue(model, i);
    },

    validate(callback) {
      const ref = this.useRef();
      if (_.isFunction(callback)) {
        return ref.validate(callback);
      }

      return new Promise((resolve, reject) => {
        const rulesHash = [];
        ref.validateField(
          this.validteProps,
          (message, rules) => {
            if (message && rules) {
              const rulesArr = [];
              rulesArr.push(message, rules);
              rulesHash.push(rulesArr);
            }
          },
        );

        if (rulesHash.length) {
          reject(rulesHash);
        } else {
          resolve();
        }
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
