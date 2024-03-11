<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';
import { getComponentByName } from 'main/config/component';
import {
  getCompPropsBySourceOpt,
  attrsKebabToCamel
} from 'main/utils/component';
import Column from './column.vue';
import _ from 'lodash';

const Table = getComponentByName('Table');
const TableColumn = getComponentByName('TableColumn');
const columnProps = getCompPropsBySourceOpt(TableColumn);

const tableColumnProps = {
  align: columnProps.align,
  headerAlign: columnProps.headerAlign
};

export default {
  name: 'DyTableGenerate',
  mixins: [genAttrsMixin(Table)],
  model: {
    prop: 'data',
    event: 'input'
  },
  props: {
    ...tableColumnProps,
    rowKey: {
      type: [String, Function],
      default: 'id'
    },
    // 表格配置对象
    config: {
      type: Array,
      required: true
    },
    // 控制列的渲染
    isRenders: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    [Column.name]: Column
  },
  data() {
    return {
      extraProps: [...getAttrMixExtra('prop')],
      extraData: [...getAttrMixExtra('data')]
    };
  },
  computed: {},
  watch: {},
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
        this.renderColumns(this.getRenderConfig(this.config)),
        slots
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
      return config.map(i => {
        const {
          label,
          prop,
          render,
          formatter,
          align,
          headerAlign
        } = attrsKebabToCamel(i);
        const props = {
          label,
          prop
        };
        const scopedSlots = {};
        const data = {
          props,
          scopedSlots
        };
        // column props
        this.setFormatter(props, formatter);
        this.setALign(props, align);
        this.setHeaderAlign(props, headerAlign);

        // column scopedSlots
        this.setColumnDefaultSlot(scopedSlots, render, prop);
        return <Column.name {...data} />;
      });
    },
    setFormatter(props, formatter) {
      if (_.isFunction(formatter)) {
        props.formatter = (row, column, cellValue, index) => {
          return formatter({ row, column, $index: index, cellValue });
        };
      }
    },
    setColumnDefaultSlot(scopedSlots, configRender, prop) {
      const render = this.$scopedSlots[prop] || configRender;
      if (_.isFunction(render)) {
        scopedSlots.default = scoped => {
          const { $index } = scoped;
          const cellValue = this.getCellValue(this.data, `[${$index}].${prop}`);
          return render({ ...scoped, cellValue }, this.$createElement);
        };
      }
    },
    setALign(props, align) {
      props.align = align || this.align;
    },
    setHeaderAlign(props, headerAlign) {
      props.headerAlign = headerAlign || this.headerAlign;
    },
    getCellValue(data, prop) {
      return _.get(data, prop);
    }
  }
};
</script>

<style scoped lang="scss"></style>
