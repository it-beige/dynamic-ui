<script>
import { getComponentByName } from 'main/config/component';
import { createNamespace } from 'main/utils/create';
import { isReactive } from 'main/utils/vdom';
import Locale from 'main/mixins/locale';
import _ from 'lodash';

import TableGenerate from 'packages/table-generate';
import FormGenerate from 'packages/form-generate';
import Collapse from './collapse';
const Pagination = getComponentByName('Pagination');
const Row = getComponentByName('Row');
const Col = getComponentByName('Col');
const Button = getComponentByName('Button');

export default {
  name: 'DyQueryPage',
  mixins: [Locale],
  directives: {Collapse},
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
    useTableScopedSlots: Function,

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
    usePaginationScopedSlot: Function,

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
    useQueryScopedSlot: Function,

    // operate
    useOperateStyle: Function,
    useOperateClass: Function,
    useOperateProps: Function,
    useOperateDomProps: Function,
    useOperateOn: Function,
    useOperateNativeOn: Function,
    useOperateAttrs: Function,
    useOperateDirectives: Function,
    useOperateSlots: Function,
    useOperateScopedSlot: Function,

    // search
    useSearchStyle: Function,
    useSearchClass: Function,
    useSearchProps: Function,
    useSearchDomProps: Function,
    useSearchOn: Function,
    useSearchNativeOn: Function,
    useSearchAttrs: Function,
    useSearchDirectives: Function,
    useSearchSlots: Function,
    useSearchScopedSlot: Function

  },
  data() {
    return {
      reactiveVm: {}
    };
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
        {_.isFunction(useQueryProps) ? this.renderQuery(getQueryOption()) : null}
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
    useTableRef() {
      return this.$refs[TableGenerate.name].useRef();
    },
    usePaginationRef() {
      return this.$refs[Pagination.name];
    },
    useQueryRef() {
      return this.$refs[FormGenerate.name].useRef();
    },
    useSearchRef() {
      return this.$refs.searchRef;
    },
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
    renderTableSlots() {
      const { append } = this.getSlot('table', false);
      // append slot is must normalize
      return this.normalizeSlot(append, 'append') || this.normalizeSlot(this.useTableSlots?.().append?.(), 'append');
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
    renderPaginationSlots() {
      const { default: defaultSlot } = this.getSlot('pagination', false);
      return defaultSlot || this.normalizeSlot(this.usePaginationSlots?.().default?.(), 'default');
    },
    getQueryOption() {
      const templateRenders = this.getScopedSlot('query');
      const methodRenders = this.useQueryScopedSlots?.() || {};
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
        scopedSlots: Object.assign(methodRenders, templateRenders)
      };
    },
    renderQuery(option) {
      const {
        props,
        scopedSlots
      } = option;
      if (!props.config?.length) return;

      option.directives ??= [];
      const renderConfig = props.config.filter(i => i.isRender ? i.isRender(props.value) : true);
      const isConfig = renderConfig.length;
      if (_.isFunction(this.useSearchProps) && isConfig) {
        this.renderSearch(option);
        if (this.isRenderCollapse()) {
          const searchProps = this.useSearchProps();
          const [collapse] = this.useReactive(searchProps, 'collapse', 'search.props');
          option.directives.push({
            name: 'collapse',
            value: collapse
          });
        }
      }
      return (
        <FormGenerate {...option}>
          {this.renderQuerySlots(scopedSlots)}
        </FormGenerate>
      );
    },
    renderQuerySlots(scopedSlots) {
      const templateRenders = this.getSlot('query', false);
      const methodRenders = this.useQuerySlots?.() || {};
      const slots = Object.assign(methodRenders, templateRenders);
      const childrenVnode = Object.keys(slots).reduce((o, k) => {
        if (!scopedSlots[k]) {
          o.push(this.normalizeSlot(slots[k], k));
        }
        return o;
      }, []);
      return childrenVnode;
    },
    getSearchOption() {
      return {
        ref: FormGenerate.name,
        style: this.useSearchStyle?.(),
        class: this.useSearchClass?.(),
        attrs: this.useSearchAttrs?.(),
        props: this.useSearchProps?.(),
        domProps: this.useSearchDomProps?.(),
        on: this.useSearchOn?.(),
        nativeOn: this.useSearchNativeOn?.(),
        directives: this.useSearchDirectives?.(),
        scopedSlots: this.useSearchScopedSlots?.()
      };
    },
    isRenderCollapse() {
      const props = this.useQueryProps();
      return props.config
        .filter(i => i.isRender ? i.isRender(props.value) : true)
        .reduce((acc, i) => acc + i.span, 0) > 24;
    },
    renderInlaySearch() {
      const [, bem] = createNamespace('query-page');
      const { button } = this.getSlot('search', false);
      const {
        props,
        on
      } = this.getSearchOption();
      const buttonVnode = button || this.normalizeSlot(this.useSearchSlots?.().search?.(), 'search');
      const {upText = '展开', downText = '收起', searchText, resetText } = props;
      const [collapse, setCollapse] = this.useReactive(props, 'collapse', 'search.props');
      const onClick = () => {
        setCollapse(!collapse);
      };
      return (
        <div class={[bem('search'), 'dy-flex__justify-end']} ref="searchRef">
          {buttonVnode || [
            <Button onClick={on.reset} class={['reset-btn']} plain={true} icon="dy-icon-refresh-right">{resetText || this.t('dy.queryPage.resetText')}</Button>,
            <Button onClick={on.search} class={['search-btn']} plain={true} icon="dy-icon-search">{searchText || this.t('dy.queryPage.searchText')}</Button>
          ]}
          {

            this.isRenderCollapse() && Reflect.has(props, 'collapse')
              ? <dy-tooltip
                effect="dark"
                content={collapse ? upText : downText}
                placement="top"
              >
                <Button onClick={onClick} plain={true} class={['collapse-btn']} icon={collapse ? 'dy-icon-arrow-down' : 'dy-icon-arrow-up'}></Button>
              </dy-tooltip>
              : null
          }
        </div>
      );
    },
    renderSearch(option) {
      const { props } = option;
      const { config } = props;
      const l = config.length;
      const getSearchSpanWithIdx = () => {
        let span = 0;
        let idx = 0;
        while (!(span >= 16 || idx === config.length)) {
          const isRender = config[idx].isRender;
          if (isRender ? isRender(props.value) : true) {
            span += config[idx].span || 0;
          }
          idx++;
        }
        let residueSpan = 24 - span;
        if (residueSpan < 8) {
          residueSpan = 16;
          idx--;
        }
        return [residueSpan, idx];
      };

      const [span, idx] = getSearchSpanWithIdx();
      const searchProps = {
        component: 'slot',
        span,
        default: this.renderInlaySearch
      };

      if (l < 1) {
        config.push(searchProps);
      } else {
        config.splice(idx, 0, searchProps);
      }
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
      const {
        props = {},
        style,
        class: className,
        attrs,
        domProps,
        nativeOn,
        directives
      } = option;
      const [, bem] = createNamespace('query-page');
      const { tableName } = props;
      return (
        <Row
          class={[bem('operate'), className ]}
          style={style}
          attrs={attrs}
          domProps={domProps}
          nativeOn={nativeOn}
          directives={directives}
          type="flex"
          justify="space-between"
        >
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
    getScopedSlot(name) {
      return Object.keys(this.$scopedSlots).reduce((o, k) => {
        const [componentName, slotName] = k.split('.');
        if (componentName === name) {
          o[slotName] = this.$scopedSlots[k];
        }
        return o;
      }, {});
    },
    normalizeSlot(vnode, slotName) {
      if (vnode) {
        return <template slot={slotName}>{vnode}</template>;
      }
      return vnode;
    },
    useReactive(props, attr, path) {
      if (isReactive(props)) {
        return [
          props[attr],
          (value) => {
            props[attr] = value;
          }
        ];
      } else {
        const attrPath = `${path}.${attr}`;
        if (!Reflect.has(this.reactiveVm, attrPath)) {
          this.reactiveVm[attrPath] = props[attr];
        }
        return [
          this.reactiveVm[attrPath],
          (value) => {
            this.reactiveVm = {
              ...this.reactiveVm,
              [attrPath]: value
            };
          }]
        ;
      }
    }

  }
};
</script>
