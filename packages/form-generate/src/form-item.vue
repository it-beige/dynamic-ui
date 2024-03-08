
<script>
import { getComponentByName } from 'main/config/component';
import { getComponentByName as getFormComponentByName} from 'main/config/form';
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
    itemSlots: {
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
    },
    defaultRender: Function
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
    getSlots(slots) {
      return Object.keys(slots).map(k => {
        const vnode = isFunction(slots[k]) ? slots[k]({}) : null;
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

      const component = this.component === 'slot' ? this.component : getFormComponentByName(this.component);
      const slots = this.getSlots(this.slots);
      const data = {
        props,
        attrs: this.$attrs,
        on: this.$listeners
      };
      const itemData = {props: itemProps, scopedSlots: {
        error: this.itemSlots.error ? this.itemSlots.error : null
      }};
      return (
        <FormItem.name class={itemClassSheet} label={this.label} prop={this.prop} {...itemData}>
          {
            component === 'slot' ? this.defaultRender() : [
              this.getSlots(this.itemSlots),
              <component.name class={classSheet} value={this.value} {...data}>
                { slots }
              </component.name>
            ]
          }
        </FormItem.name>
      );

    }

  }
};
</script>

<style scoped lang="scss">

 
</style>
