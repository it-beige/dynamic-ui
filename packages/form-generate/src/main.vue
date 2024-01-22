<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';
import { getComponentByName } from 'main/config/component';
import {
  getComponentByName as getFormComponentByName,
  getFormItemComponentAttribute
} from 'main/config/form';
import _, { isFunction } from 'lodash';
import { buildClass } from 'main/utils/component';

const Form = getComponentByName('Form');
const Row = getComponentByName('Row');

import GenerateFormItem from './form-item.vue';

export default {
  name: 'DyFormGenerate',
  mixins: [genAttrsMixin(Form)],
  props: {
    value: {
      type: Object,
      required: true
    },
    config: {
      type: Array,
      required: true
    },
    space: {
      type: Number,
      default: 36
    },
    labelSuffix: {
      type: String,
      default: '：'
    },
    classSheets: {
      type: Object,
      default: () => ({})
    },
    itemClassSheets: {
      type: Object,
      default: () => ({})
    },
    colClassSheets: {
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
  render() {
    const FormVnode = this.renderForm();
    return FormVnode;
  },
  methods: {
    getFormProps() {
      const props = this._excludeExtraProps(this.$props);
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
      const {
        getFormProps,
        getFormOn,
        getFormSlots,
        getFormScopedSlots,
        disabled
      } = self;
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
      return (
        <Row.name>
          {this.config.map((i, idx) => {
            const {
              props = {},
              on = {},
              nativeOn,
              slots,
              itemProps,
              colProps,
              component,
              span,
              label,
              prop
            } = i;
            const attrs = this.genFormItemAttrs(props, component);
            const data = {
              props: {
                props,
                slots,
                colProps,
                itemProps,
                classSheet: this.classSheets[prop],
                itemClassSheet: this.itemClassSheets[prop]
              },
              attrs,
              nativeOn,
              on: {
                ...on,
                input: updateValue(on, i)
              },
              slots
            };
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
              />
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
    }
  }
};
</script>

<style scoped lang="scss"></style>
