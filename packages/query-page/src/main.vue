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
import FormGenerate from 'packages/form-generate';
const Pagination = getComponentByName('Pagination');
const Row = getComponentByName('Row');
const Col = getComponentByName('Col');

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
    usePaginationSlots: Function,

    // form
    useQueryStyle: Function,
    useQueryClass: Function,
    useQueryProps: Function,
    useQueryDomProps: Function,
    useQueryOn: Function,
    useQueryNativeOn: Function,
    useQueryAttrs: Function,
    useQueryDirectives: Function,
    useQuerySlots: Function,

    // operate
    useOperateStyle: Function,
    useOperateClass: Function,
    useOperateProps: Function,
    useOperateDomProps: Function,
    useOperateOn: Function,
    useOperateNativeOn: Function,
    useOperateAttrs: Function,
    useOperateDirectives: Function,
    useOperateSlots: Function
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
      getPaginationOption,
      useQueryProps,
      getQueryOption,
      useOperateProps,
      getOperateOption
    } = this;

    return (
      <div class={name}>
        {_.isFunction(useQueryProps) ? (
          <FormGenerate {...getQueryOption()}>
          </FormGenerate>
        ) : null}
        {_.isFunction(useOperateProps) ? this.renderOperate(getOperateOption()) : null}
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
        scopedSlots: this.useTableScopedSlots?.()
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
        style: this.usePaginationStyle?.(),
        class: this.usePaginationClass?.(),
        attrs: this.usePaginationAttrs?.(),
        props: this.usePaginationProps?.(),
        domProps: this.usePaginationDomProps?.(),
        on: this.usePaginationOn?.(),
        nativeOn: this.usePaginationNativeOn?.(),
        directives: this.usePaginationDirectives?.(),
        scopedSlots: this.usePaginationScopedSlots?.()
      };
    },
    usePaginationRef() {
      return this.$refs[Pagination.name];
    },
    renderPaginationSlots() {
      const { default: defaultSlot } = this.getSlot('pagination');
      return defaultSlot || this.normalizeSlot(this.usePaginationSlots?.().default?.(), 'default');
    },
    getQueryOption() {
      return {
        ref: FormGenerate.name,
        style: this.useQueryStyle?.(),
        class: this.useQueryClass?.(),
        attrs: this.useQueryAttrs?.(),
        props: this.useQueryProps?.(),
        domProps: this.useQueryDomProps?.(),
        on: this.useQueryOn?.(),
        nativeOn: this.useQueryNativeOn?.(),
        directives: this.useQueryDirectives?.(),
        scopedSlots: this.useQueryScopedSlots?.()
      };
    },
    getOperateOption() {
      return {
        ref: 'operateRef',
        style: this.useOperateStyle?.(),
        class: this.useOperateClass?.(),
        attrs: this.useOperateAttrs?.(),
        props: this.useOperateProps?.(),
        domProps: this.useOperateDomProps?.(),
        on: this.useOperateOn?.(),
        nativeOn: this.useOperateNativeOn?.(),
        directives: this.useOperateDirectives?.(),
        scopedSlots: this.useOperateScopedSlots?.()
      };
    },
    renderOperate(option) {
      const { props = {} } = option;
      const [, bem] = createNamespace('query-page');
      const { tableName } = props;
      return (
        <Row class={[bem('operate')]} type="flex" justify="space-between">
          <div class={[bem('operate-title'), 'dy-flex__align-center']}>
            <div class="icon"></div>
            <div class="name">{tableName}</div>
          </div>
          <Col class={[bem('operate-button'), 'dy-flex__justify-end']}>
            {this.renderOperateSlots()}
          </Col>
        </Row>
      );
    },
    renderOperateSlots() {
      const { button } = this.getSlot('operate', false);
      return button || this.useOperatSlots?.().button?.();
    },
    getSlot(name, isNormalize = true) {
      return Object.keys(this.$slots).reduce((o, k) => {
        const [componentName, slotName] = k.split('.');
        if (componentName === name) {
          o[slotName] = isNormalize ? this.normalizeSlot(this.$slots[k], slotName) : this.$slots[k];
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
