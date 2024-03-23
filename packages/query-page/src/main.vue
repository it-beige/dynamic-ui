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

    // pagination
    usePaginationProps: Function,
    usePaginationAttrs: Function,
    usePaginationOn: Function,
    usePaginationSlot: Function
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
          <TableGenerate {...getTableOption()} />
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
        style: this.useTableStyle?.(),
        class: this.useTableClass?.(),
        attrs: this.useTableAttrs?.(),
        props: this.useTableProps?.(),
        domProps: this.useTableDomProps?.(),
        on: this.useTableOn?.(),
        nativeOn: this.useTableNativeOn?.(),
        directives: this.useTableDirectives?.()
      };
    },
    getPaginationOption() {
      return {
        attrs: this.usePaginationAttrs?.(),
        props: this.usePaginationProps?.(),
        on: this.usePaginationOn?.()
      };
    },
    renderPaginationSlots() {
      const { default: defaultSlot } = this.getSlot('pagination');
      return defaultSlot || this?.usePaginationSlot();
    },
    getSlot(name) {
      return Object.keys(this.$slots).reduce((o, k) => {
        const [componentName, slotName] = k.split('.');
        if (componentName === name) {
          o[slotName] = <template slot={slotName}>{this.$slots[k]}</template>;
        }
        return o;
      }, {});
    }
  }
};
</script>
