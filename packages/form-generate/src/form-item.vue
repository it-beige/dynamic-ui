
<script>
import { getComponentByName } from 'main/config/component';
import { getComponentByName as getFormComponentByName} from 'main/config/form';
import {
  getCompPropsBySourceOpt,
  getProvidesOptionBySourceOpt
} from 'main/utils/component.js';
import _, { isFunction } from 'lodash';

const FormItem = getComponentByName('FormItem');
const Col = getComponentByName('Col');

export default {
  name: 'DyGenerateFormItem',
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    slots: {
      type: Object,
      default: () => ({})
    },
    itemProps: {
      type: Object,
      default: () => ({})
    },
    colProps: {
      type: Object,
      default: () => ({})
    },
    span: {
      type: Number,
      default: 24
    },
    label: {
      type: String
    },
    prop: {
      type: String
    },
    component: {
      type: String
    },
    value: {},
    classSheet: {
      type: [String, Object, Array]
    },
    itemClassSheet: {
      type: [String, Object, Array]
    }
  },
  components: {

  },
  data () {
    return {

    };
  },
  render() {
    const FormItemVnode = this.renderFormItem();
    return (
      <Col.name span={this.span} {...{props: this.colProps}}>
        {FormItemVnode}
      </Col.name>
    );
  },
  methods: {
    getSlots() {
      const slots = this.slots;
      return Object.keys(slots).map(k => {
        const vnode = isFunction(this.slots[k]) ? this.slots[k]() : null;
        return <template slot={k}>{vnode}</template>;
      });
    },
    renderFormItem() {
      const {
        props,
        itemProps,
        classSheet,
        itemClassSheet
      } = this;

      const component = getFormComponentByName(this.component);
      const slots = this.getSlots();
      const data = {
        props,
        attrs: this.$attrs,
        on: this.$listeners
      };
      return (
        <FormItem.name class={itemClassSheet} label={this.label} prop={this.prop} {...{props: itemProps}}>
          <component.name class={classSheet} value={this.value} {...data}>
            { slots }
          </component.name>
        </FormItem.name>
      );

    }

  }
};
</script>

<style scoped lang="scss">

 
</style>
