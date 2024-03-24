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
    // table
    useTableStyle: Function,
    useTableClass: Function,
    useTableProps: Function,
    useTableDomProps: Function,
    useTableOn: Function,
    useTableNativeOn: Function,
    useTableAttrs: Function,
    useTableDirectives: Function,
    useTableSlots: Function,

    // pagination
    usePaginationStyle: Function,
    usePaginationClass: Function,
    usePaginationProps: Function,
    usePaginationDomProps: Function,
    usePaginationOn: Function,
    usePaginationNativeOn: Function,
    usePaginationAttrs: Function,
    usePaginationDirectives: Function,
    usePaginationSlots: Function
  },
  data() {
    return {};
  },
  render() {
    const [name] = createNamespace('query-page');
    const {
      useTableProps,
      usePaginationProps,
      getTableOption,
      getPaginationOption
    } = this;
    return (
      <div class={name}>
        {_.isFunction(useTableProps) ? (
          <TableGenerate {...getTableOption()}>
            {this.renderTableSlots()}
          </TableGenerate>
        ) : null}
        {_.isFunction(usePaginationProps) ? (
          <Pagination {...getPaginationOption()}>
            {this.renderPaginationSlots()}
          </Pagination>
        ) : null}
      </div>
    );
  },
  methods: {
    getTableOption() {
      return {
        ref: TableGenerate.name,
        style: this.useTableStyle?.(),
        class: this.useTableClass?.(),
        attrs: this.useTableAttrs?.(),
        props: this.useTableProps?.(),
        domProps: this.useTableDomProps?.(),
        on: this.useTableOn?.(),
        nativeOn: this.useTableNativeOn?.(),
        directives: this.useTableDirectives?.(),
        useTableScopedSlots: this.useTableScopedSlots?.()
      };
    },
    useTableRef() {
      return this.$refs[TableGenerate.name].useRef();
    },
    renderTableSlots() {
      const { append } = this.getSlot('table');
      return append || this.normalizeSlot(this.useTableSlots?.().append?.(), 'append');
    },
    getPaginationOption() {
      return {
        ref: Pagination.name,
        attrs: this.usePaginationAttrs?.(),
        props: this.usePaginationProps?.(),
        on: this.usePaginationOn?.()
      };
    },
    usePaginationRef() {
      return this.$refs[Pagination.name];
    },
    renderPaginationSlots() {
      const { default: defaultSlot } = this.getSlot('pagination');
      return defaultSlot || this.normalizeSlot(this.usePaginationSlots?.().default?.(), 'default');
    },
    getSlot(name) {
      return Object.keys(this.$slots).reduce((o, k) => {
        const [componentName, slotName] = k.split('.');
        if (componentName === name) {
          o[slotName] = this.normalizeSlot(this.$slots[k], slotName);
        }
        return o;
      }, {});
    },
    normalizeSlot(vnode, slotName) {
      if (vnode) {
        return <template slot={slotName}>{vnode}</template>;
      }
      return vnode;
    }
  }
};
</script>
