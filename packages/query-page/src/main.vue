<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';
import { getComponentByName } from 'main/config/component';
import {
  getCompPropsBySourceOpt,
  attrsKebabToCamel,
  componentNameToTag
} from 'main/utils/component';
import { createNamespace } from 'main/utils/create';
import _ from 'lodash';

import TableGenerate from 'packages/table-generate';

export default {
  name: 'DyQueryPage',
  mixins: [],
  props: {
    useTableProps: Function
  },
  components: {
  },
  data() {
    return {

    };
  },
  render() {
    const [name] = createNamespace('query-page');
    const {
      useTableProps,
      getTableOption
    } = this;
    return (
      <div class={name}>
        {_.isFunction(useTableProps) ? <TableGenerate {...getTableOption()} /> : null}
      </div>
    );
  },
  methods: {
    getTableOption() {
      return {
        props: this.useTableProps()
      };
    }
  }
};
</script>

