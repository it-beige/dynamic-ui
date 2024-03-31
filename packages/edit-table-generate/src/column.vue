
<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';
import _ from 'lodash';

import {
  Column as TableColumn
} from 'vxe-table';

export default {
  name: 'DyEditTableColumnGenerate',
  mixins: [genAttrsMixin(TableColumn)],
  components: {
    [TableColumn.name]: TableColumn
  },
  props: {
    label: String
  },
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
      props: this.transformProps(props),
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
    },
    transformProps(props) {
      const { label } = props;
      return {
        ...props,
        title: label
      };
    }
  }
};
</script>

<style scoped lang="scss">

 
</style>
