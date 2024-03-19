
<script>
import { getComponentByName } from 'main/config/component';
import { getCompPropsBySourceOpt, genComponentPorps } from 'main/utils/component.js';
import { createNamespace } from 'main/utils/create';
import _ from 'lodash';
import Locale from 'dynamic-ui/src/mixins/locale';

const Button = getComponentByName('Button');
const Popover = getComponentByName('Popover');
const CheckboxGroup = getComponentByName('CheckboxGroup');
const Checkbox = getComponentByName('Checkbox');
const Tooltip = getComponentByName('Tooltip');
export const [ButtonCtor, ButtonPick] = genComponentPorps(getCompPropsBySourceOpt(Button));
export const [PopoverCtor, PopoverPick] = genComponentPorps(getCompPropsBySourceOpt(Popover));
export const [TooltipCtor, TooltipPick] = genComponentPorps(getCompPropsBySourceOpt(Tooltip));

export default {
  name: 'DyTableCustomColumnGenerate',
  mixins: [Locale],
  props: {
    // 触发按钮props
    buttonProps: {
      type: ButtonCtor,
      default: () => new ButtonCtor({
        type: 'primary',
        circle: true
      })
    },
    // 面板props
    popoverProps: {
      type: PopoverCtor,
      default: () => new PopoverCtor({
        trigger: 'manual'
      })
    },
    // 固钉提示的props
    tooltipProps: {
      type: TooltipCtor,
      default: () => new TooltipCtor({
        effect: 'dark'
      })
    },
    // 列配置对象
    config: {
      type: Array,
      required: true
    },
    // 固定的列
    fixedColumns: {
      type: Array,
      default: () => []
    },
    // 重置按钮文本
    resetText: {
      type: String,
      default: '重置'
    },
    // 确认按钮文本
    confirmText: {
      type: String,
      default: '确认'
    }
  },
  data () {
    return {
      chekcedColumns: [],
      initCheckedColumns: false,
      visible: false,
      isConfirm: false,
      leftFixedColumns: [],
      rightFixedColumns: []
    };
  },
  computed: {
    checkAll: {
      get({chekcedColumns, config}) {
        return chekcedColumns.length === config.length;
      },
      set(v) {
        const columns = this.getColumnNames();
        this.chekcedColumns = v ? columns : [...this.fixedColumns];
      }
    },
    isIndeterminate({chekcedColumns, config}) {
      if (!chekcedColumns.length) {
        return false;
      }
      return chekcedColumns.length !== config.length;
    }
  },
  watch: {
    config: {
      immediate: true,
      handler() {
        if (!this.initCheckedColumns) {
          this.chekcedColumns = this.config
            .filter(i => _.isFunction(i.isRender) ? i.isRender() : true)
            .map(i => i.prop);
          this.initCheckedColumns = true;
          this.setColumnsFixed();
        } else {
          const newColumns = this.config.filter(i => !i.isRender);
          this.chekcedColumns.push(...newColumns.map(i => i.prop));
          this.setColumnsFixed();
        }
      }
    },
    visible: {
      handler() {
        if (this.visible && this.isConfirm) {
          this.isConfirm = false;
          this.$nextTick(() => {
            this.setColumnsRender(this.config, (i) => {
              const rendered = this.chekcedColumns.includes(i.prop);
              this.$set(i, 'isRender', () => rendered);
            });
          });
        }
      }
    }

  },
  render() {
    const [name, bem] = createNamespace('table-custom-column');
    const buttonData = {
      props: {
        ...ButtonPick(this.buttonProps)
      },
      on: {
        click: () => {
          this.visible = !this.visible;
        }
      }
    };
    const popoverData = {
      props: {
        ...PopoverPick(this.popoverProps),
        value: this.visible
      }
    };
    popoverData.props.popperClass += ' custom-column-popover';
    return (
      <div class={name} >
        <Popover.name {...popoverData}>
          <div class={bem('wrapper')}>
            <Checkbox.name
              label="全部"
              class={bem('header')}
              size='medium'
              indeterminate={this.isIndeterminate}
              v-model={this.checkAll}
            >
            </Checkbox.name>
            {this.renderCustomColumn()}
            {this.renderFooter()}
          </div>
          <Button.name {...buttonData} slot="reference">
            <dy-svg-icon icon-class="custom"></dy-svg-icon>
          </Button.name>
        </Popover.name>
      </div>
    );
  },
  methods: {
    renderCustomColumn() {
      const [, bem] = createNamespace('table-custom-column');
      const options = this.getCustomOptions();
      return (
        <CheckboxGroup.name
          class={`dy-flex-column ${bem('body')}`}
          v-model={this.chekcedColumns}
        >
          {options.map(i => (
            <div key={i.value} class="item dy-flex__justify-between">
              <Checkbox.name label={i.value} disabled={this.fixedColumns.includes(i.value)}>
                {i.label}
              </Checkbox.name>
              {this.renderFixed(i)}
            </div>
          ))}
        </CheckboxGroup.name>

      );
    },
    renderFixed({ value }) {
      const column = this.config.find(i => i.prop === value);
      const getCompOption = (direction) => {
        let content = this.t(`dy.table.column.custom.${ direction === 'left' ? 'leftText' : 'rightText'}`);
        return ({
          props: {
            ...TooltipPick(this.tooltipProps),
            content,
            placement: direction
          }
        });
      };
      return (
        <div class="fixed">
          <Tooltip.name {...getCompOption('left')}>
            <dy-svg-icon class={`${this.leftFixedColumns.includes(column.prop) ? 'active' : ''} fixed-left`} icon-class="fixed" nativeOnClick={this.genColumnFixed(column, 'left')}></dy-svg-icon>
          </Tooltip.name>
          <Tooltip.name {...getCompOption('right')}>
            <dy-svg-icon class={`${this.rightFixedColumns.includes(column.prop) ? 'active' : ''} fixed-right`} icon-class="fixed" nativeOnClick={this.genColumnFixed(column, 'right')}></dy-svg-icon>
          </Tooltip.name>
        </div>
      );
    },
    getCustomOptions() {
      return this.config.map(i => ({
        label: i.label,
        value: i.prop,
        disabled: this.fixedColumns.includes(i.prop)
      }));
    },
    getColumnNames() {
      return this.config.map(i => i.prop);
    },
    renderFooter() {
      const [, bem] = createNamespace('table-custom-column');
      return (
        <div class={`${bem('footer')} dy-flex__align-center`}>
          <button onClick={this.resetHandle}>{this.resetText}</button>
          <button onClick={this.confirmHandle}>{this.confirmText}</button>
        </div>
      );
    },
    resetHandle() {
      this.chekcedColumns = this.getColumnNames();
      this.setColumnsFixed();
    },
    confirmHandle() {
      this.visible = false;
      this.isConfirm = true;
      this.setColumnsRender(this.config, this.columnRenderOption);
      this.setColumnsFixedOption();
    },
    setColumnsRender(columns, isRender) {
      columns.forEach(isRender);
    },
    columnRenderOption(i) {
      this.$set(i, 'isRender', () => {
        return this.chekcedColumns.includes(i.prop);
      });
    },
    genFixedSet() {
      const leftSet = new Set(this.leftFixedColumns);
      const rightSet = new Set(this.rightFixedColumns);
      return [leftSet, rightSet];
    },
    setColumnsFixed() {
      const leftSet = new Set();
      const rightSet = new Set();
      this.config.forEach(i => {
        switch (i.fixed) {
          case 'left':
            leftSet.add(i.prop);
            break;
          case 'right':
            rightSet.add(i.prop);
            break;
        }
      });
      this.leftFixedColumns = Array.from(leftSet);
      this.rightFixedColumns = Array.from(rightSet);
    },
    genColumnFixed(column, direction) {
      return () => {
        const prop = column.prop;
        const [leftSet, rightSet] = this.genFixedSet();
        const addSet = direction === 'left' ? leftSet : rightSet;
        const removeSet = direction === 'left' ? rightSet : leftSet;
        if (addSet.has(prop)) {
          addSet.delete(prop);
        } else {
          addSet.add(prop);
        }

        if (removeSet.has(prop)) {
          removeSet.delete(prop);
        }
        this.leftFixedColumns = Array.from(leftSet);
        this.rightFixedColumns = Array.from(rightSet);
      };
    },
    setColumnsFixedOption() {
      this.config.forEach(i => {
        const fixed = this.leftFixedColumns.includes(i.prop)
          ? 'left'
          : this.rightFixedColumns.includes(i.prop)
            ? 'right'
            : undefined;
        this.$set(i, 'fixed', fixed);
      });
    }
  }
};
</script>

<style scoped lang="scss">

 
</style>
