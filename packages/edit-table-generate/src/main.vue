<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';
import { getComponentByName } from 'main/config/component';
import {
  getCompPropsBySourceOpt,
  attrsKebabToCamel,
  componentNameToTag
} from 'main/utils/component';
import Column from './column.vue';
import _ from 'lodash';
import {
  Table,
  Tooltip
} from 'vxe-table';
// const columnProps = getCompPropsBySourceOpt(TableColumn);

// const tableColumnProps = {
//   align: columnProps.align,
//   headerAlign: columnProps.headerAlign,
//   showOverflowTooltip: columnProps.showOverflowTooltip
// };

export const INDEX = 'index';
export const SELECTION = 'selection';
export const EXPAND = 'expand';
const INLAY_COLUMNS = [INDEX, SELECTION, EXPAND];
const INLAY_COLUMNS_MAP = {
  [INDEX]: {
    type: INDEX,
    label: '#',
    width: 60
  },
  [SELECTION]: {
    type: SELECTION,
    width: 60
  },
  [EXPAND]: {
    type: EXPAND,
    width: 60
  }
};

const props = {
  // 表格配置对象
  config: {
    type: Array,
    required: true
  },
  // 控制列的渲染
  isRenders: {
    type: Object,
    default: () => ({})
  },
  // 内置支持的列
  columns: {
    type: Array,
    default: () => [],
    validator: value => {
      const valid = value.every(i => {
        return i.column && INLAY_COLUMNS.includes(i.column);
      });
      if (!valid) {
        console.error(
          `[Dynamic Error] columns项中的column只能是${INLAY_COLUMNS.join(
            '、',
          )}`,
        );
      }
      return valid;
    }
  }
};
export default {
  name: 'DyEditTableGenerate',
  mixins: [genAttrsMixin(Table)],
  model: {
    prop: 'data',
    event: 'input'
  },
  props: {
    ...props
  },
  components: {
    [Table.name]: Table,
    [Tooltip.name]: Tooltip
  },
  data() {
    return {
      extraProps: [...getAttrMixExtra('prop'), ...Object.keys(props)],
      extraData: [...getAttrMixExtra('data')]
    };
  },
  render() {
    const TableVnode = this.renderTable();
    return TableVnode;
  },
  methods: {
    getTableProps() {
      const props = this._excludeExtraProps(this.$props);
      return props;
    },
    getTableOn() {
      const listeners = this._getListners();
      return listeners;
    },
    getTableSlots() {
      const slots = this.$slots;
      return this._getVnodesBySlots(slots);
    },
    getTableScopedSlots() {
      let scopedSlots = {};
      return scopedSlots;
    },
    normalizeSlots(slots) {
      const defaultSlot = slots.find(i => i.data?.slot === 'default');
      _.isArray(defaultSlot?.children) &&
        this.normalizeDefaultSlot(defaultSlot.children);

      return slots;
    },
    normalizeDefaultSlot(children) {
      const columns = children.filter(
        i => i.componentOptions?.tag === componentNameToTag(Column.name),
      );
      columns.forEach(i => {
        const attrs = i.data?.attrs || {};
        const propsData = i.componentOptions?.propsData || {};
        const scopedSlots = i.data?.scopedSlots || {};
        const props = {
          ...propsData,
          ...attrs
        };
        if (!scopedSlots.default && i.componentOptions.children?.length) {
          scopedSlots.default = () => i.componentOptions.children;
        }
        i.componentOptions.propsData = this.setColumnProps(props);
        i.data.scopedSlots = this.setColumnScopedSlots({
          ...props,
          render: scopedSlots.default,
          headerRender: scopedSlots.header
        }, {});
      });
    },
    renderInlayColumns(inlayColumns) {
      return inlayColumns.map(i => {
        const { column, props = {} } = i;
        const defaultProps = INLAY_COLUMNS_MAP[column];
        return this.renderColumn({ ...defaultProps, ...props });
      });
    },
    renderTable() {
      let createElement = this.$createElement;
      const { getTableProps, getTableOn, getTableSlots, getTableScopedSlots } =
        this;
      const props = getTableProps();
      const on = getTableOn();
      const slots = getTableSlots();
      const scopedSlots = getTableScopedSlots();
      const attrs = this.$attrs;
      const children = [
        this.renderInlayColumns(this.columns),
        this.renderColumns(this.getRenderConfig(this.config)),
        this.normalizeSlots(slots)
      ];

      return createElement(
        Table.name,
        {
          staticClass: 'dy-table-generate',
          class: [],
          attrs,
          props,
          on,
          ref: Table.name,
          scopedSlots
        },
        children,
      );
    },
    getRenderConfig(config) {
      return config.filter(i => {
        const { prop, isRender } = i;
        const isRenderInvoke = this.isRenders[prop] || isRender;
        return _.isFunction(isRenderInvoke) ? isRenderInvoke(this.value) : true;
      });
    },
    renderColumns(config) {
      return config.map(this.renderColumn);
    },
    renderColumn(i) {
      const { label, prop, children = [], ...rest } = attrsKebabToCamel(i);
      const props = {
        ...rest,
        label,
        prop
      };
      const scopedSlots = {};
      const data = {
        props,
        scopedSlots
      };
      // column props
      this.setColumnProps(props);

      // column scopedSlots
      this.setColumnScopedSlots(props, scopedSlots);

      return (
        <Column.name {...data}>
          {this.renderColumns(this.getRenderConfig(children))}
        </Column.name>
      );
    },
    setColumnProps(props) {
      const { formatter, align, headerAlign, showOverflowTooltip } = props;

      this.setFormatter(props, formatter);

      this.setALign(props, align);
      this.setHeaderAlign(props, headerAlign);
      this.setShowOverflowTooltip(props, showOverflowTooltip);
      return props;
    },
    setColumnScopedSlots(props, scopedSlots) {
      this.setColumnDefaultSlot(scopedSlots, props);
      this.setColumnHeaderSlot(scopedSlots, props);
      return scopedSlots;
    },
    setFormatter(props, formatter) {
      if (_.isFunction(formatter)) {
        const { prop } = props;
        props.formatter = ({ row, column, rowIndex }) => {
          const $index = rowIndex;
          const cellValue = prop
            ? this.getCellValue(this.data, `[${$index}].${prop}`)
            : undefined;
          return formatter({row, column, $index, cellValue});
        };
      }
    },
    setColumnDefaultSlot(scopedSlots, props) {
      const { prop, render: configRender } = props;
      const render = this.$scopedSlots[prop] || configRender;
      scopedSlots.default = ({ row, column, rowIndex }) => {
        const $index = rowIndex;
        let cellValue;
        if (_.isFunction(props.formatter)) {
          cellValue = props.formatter({ row, column, rowIndex });
        } else if (prop) {
          cellValue = this.getCellValue(this.data, `[${$index}].${prop}`);
        }
        return _.isFunction(render) ? render({row, column, $index, cellValue}, this.$createElement) : cellValue;
      };
    },
    setColumnHeaderSlot(scopedSlots, props) {
      const { prop, headerRender: configRender } = props;
      const render = this.$scopedSlots[`${prop}Header`] || configRender;
      scopedSlots.header = ({column, $columnIndex
      }) => {
        const $index = $columnIndex;
        column = {...column, label: column.title};
        return _.isFunction(render) ? render({column, $index}, this.$createElement) : column.label;
      };
    },
    setALign(props, align) {
      props.align = align || this.align;
    },
    setHeaderAlign(props, headerAlign) {
      props.headerAlign = headerAlign || this.headerAlign;
    },
    setShowOverflowTooltip(props, showOverflowTooltip) {
      props.showOverflowTooltip =
        showOverflowTooltip || this.showOverflowTooltip;
    },
    getCellValue(data, prop) {
      return _.get(data, prop);
    }
  }
};
</script>
