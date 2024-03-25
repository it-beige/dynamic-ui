
<script>
import { getComponentByName } from 'main/config/component';
import { getComponentByName as getFormComponentByName} from 'main/config/form';
import _, { isFunction } from 'lodash';

const FormItem = getComponentByName('FormItem');

export default {
  name: 'DyFormItemGenerate',
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
    // value: {},
    classSheet: {
      type: [String, Object, Array]
    },
    itemClassSheet: {
      type: [String, Object, Array]
    },
    defaultRender: Function,
    isDisabled: {
      type: Function
    },
    isReadonly: {
      type: Function
    },
    model: {}
  },
  components: {

  },
  data () {
    return {

    };
  },
  render() {
    return this.renderFormItem();
  },
  methods: {
    useRef() {
      return this.$refs[`${this.prop}Ref`];
    },
    getSlots(slots) {
      return Object.keys(slots).map(k => {
        const vnode = isFunction(slots[k]) ? slots[k]({}) : null;
        return <template slot={k}>{vnode}</template>;
      });
    },
    renderFormItem() {
      const {
        label,
        prop,
        props,
        itemProps,
        classSheet,
        itemClassSheet
      } = this;

      const component = this.component === 'slot' ? this.component : getFormComponentByName(this.component);
      const slots = this.getSlots(this.slots);
      const data = {
        props: {
          disabled: isFunction(this.isDisabled) ? this.isDisabled(this.model) : undefined,
          readonly: isFunction(this.isReadonly) ? this.isReadonly(this.model) : undefined,
          ...props
        },
        attrs: this.$attrs,
        on: this.$listeners
      };
      const itemData = {
        props: itemProps,
        scopedSlots: {
          error: this.itemSlots.error ? this.itemSlots.error : null
        }
      };
      return (
        <FormItem.name class={itemClassSheet} label={label} prop={prop} {...itemData}>
          {
            component === 'slot' ? this.defaultRender({label, prop}) : [
              this.getSlots(this.itemSlots),
              <component.name ref={`${this.prop}Ref`} class={classSheet} value={this.$attrs.value} {...data}>
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
