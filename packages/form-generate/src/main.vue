<script>
import Locale from 'main/mixins/locale';

import genAttrsMixin, {getExtra as getAttrMixExtra} from 'main/mixins/attrs';
import { getComponentByName } from 'main/config/component';

const Form = getComponentByName('Form');

export default {
  name: 'DyFormGenerate',
  mixins: [Locale, genAttrsMixin(Form)],
  components: {},
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
    getFormProps () {
      const props = this._excludeExtraProps(this.$props);
      return props;
    },
    getFormOn () {
      const listeners = this._getListners();
      return listeners;
    },
    getFormSlots () {
      const slots = this.$slots;
      return this._getVnodesBySlots(slots);
    },
    getFormScopedSlots () {
      let scopedSlots = {};
      return scopedSlots;
    },
    renderForm() {
      const self = this;
      let createElement = self.$createElement;
      const { getFormProps, getFormOn, getFormSlots, getFormScopedSlots, disabled } = self;
      const props = getFormProps();
      const on = getFormOn();
      const slots = getFormSlots();
      const scopedSlots = getFormScopedSlots();
      const attrs = this.$attrs;

      return createElement(Form.name, {
        staticClass: 'dy-form-generate',
        class: [],
        attrs,
        props,
        on,
        ref: Form.name,
        scopedSlots
      }, []);
    }
  }
};
</script>

<style scoped lang="scss"></style>
