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
const Pagination = getComponentByName('Pagination');

export default {
  name: 'DyQueryPage',
  mixins: [],
  props: {
    useTableProps: Function,
    usePaginationProps: Function,
    usePaginationAttrs: Function,
    usePaginationOn: Function
  },
  components: {},
  data() {
    return {};
  },
  render() {
    const [name] = createNamespace('query-page');
    const { useTableProps, usePaginationProps, getTableOption, getPaginationOption } = this;
    return (
      <div class={name}>
        {_.isFunction(useTableProps)
          ? (
            <TableGenerate {...getTableOption()} />
          )
          : null
        }
        {_.isFunction(usePaginationProps)
          ? (
            <Pagination {...getPaginationOption()} />
          )
          : null
        }
      </div>
    );
  },
  methods: {
    getTableOption() {
      return {
        props: this.useTableProps()
      };
    },
    getPaginationOption() {
      return {
        attrs: this.usePaginationAttrs(),
        props: this.usePaginationProps(),
        on: this.usePaginationOn()
      };
    }
  }
};
</script>
