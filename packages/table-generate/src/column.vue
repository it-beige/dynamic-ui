
<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';
import { getComponentByName } from 'main/config/component';
import _ from 'lodash';

const TableColumn = getComponentByName('TableColumn');

export default {
  name: 'DyTableColumnGenerate',
  mixins: [genAttrsMixin(TableColumn)],
  data () {
    return {
      extraProps: [...getAttrMixExtra('prop')],
      extraData: [...getAttrMixExtra('data')]
    };
  },
  render() {
    const props = this.getProps();
    const on = this.getOn();
    const slots = this.getSlots();
    const scopedSlots = this.getScopedSlots();
    const data = {
      props,
      on,
      scopedSlots
    };
    return (
      <TableColumn.name {...data}>
        { slots }
      </TableColumn.name>
    );
  },
  methods: {
    getProps() {
      const props = this._excludeExtraProps(this.$props);
      return props;
    },
    getOn() {
      const listeners = this._getListners();
      return listeners;
    },
    getSlots() {
      const slots = this.$slots;
      return this._getVnodesBySlots(slots);
    },
    getScopedSlots() {
      let scopedSlots = this.$scopedSlots;
      return scopedSlots;
    }
  }
};
</script>

<style scoped lang="scss">

 
</style>
