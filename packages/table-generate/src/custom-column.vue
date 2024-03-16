
<script>
import { getComponentByName } from 'main/config/component';
import { getComponentByName as getFormComponentByName} from 'main/config/form';
import { getCompPropsBySourceOpt, genComponentPorps } from 'main/utils/component.js';

import _ from 'lodash';
import { createNamespace } from 'main/utils/create';

const Button = getComponentByName('Button');
const Popover = getComponentByName('Popover');
const CheckboxGroup = getComponentByName('Checkbox');
const Checkbox = getFormComponentByName('checkbox');
export const [ButtonCtor, ButtonPick] = genComponentPorps(getCompPropsBySourceOpt(Button));
export const [PopoverCtor, PopoverPick] = genComponentPorps(getCompPropsBySourceOpt(Popover));

export default {
  name: 'DyTableCustomColumnGenerate',
  props: {
    buttonProps: {
      type: ButtonCtor,
      default: () => new ButtonCtor({
        type: 'primary',
        circle: true
      })
    },
    popoverProps: {
      type: PopoverCtor,
      default: () => new PopoverCtor({
        trigger: 'manual'
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
    resetText: {
      type: String,
      default: '重置'
    },
    confirmText: {
      type: String,
      default: '确认'
    }
  },
  data () {
    return {
      chekcedColumns: [],
      initCheckedColumns: false,
      visible: false
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
          this.chekcedColumns = this.getColumnNames();
          this.initCheckedColumns = true;
        } else {
          const newColumns = this.config.filter(i => !i.isRender);
          this.chekcedColumns.push(...newColumns.map(i => i.prop));
        }
      }
    },
    visible: {
      handler() {
        if (this.visible) {
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
          this.visible = true;
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
            <CheckboxGroup.name
              label="全部"
              class={bem('header')}
              size='medium'
              indeterminate={this.isIndeterminate}
              v-model={this.checkAll}
            >
            </CheckboxGroup.name>
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
      const props = {
        label: 'label',
        value: 'value',
        disabled: 'disabled',
        labelRender:
        this.renderColumn
      };
      return (
        <Checkbox.name
          v-model={this.chekcedColumns}
          class={`dy-flex-column ${bem('body')}`}
          options={this.getCustomOption()}
          propsProps={props}
        >
        </Checkbox.name>
      );
    },
    renderColumn(label, {}) {
      return <div class="dy-flex__justify-between">
        <div>{label}</div>
        <div class="fixed">
          <dy-svg-icon class="fixed-left" icon-class="fixed"></dy-svg-icon>
          <dy-svg-icon class="fixed-right" icon-class="fixed"></dy-svg-icon>
        </div>
      </div>;
    },
    getCustomOption() {
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
    },
    confirmHandle() {
      this.visible = false;
      this.setColumnsRender(this.config, this.columnRenderOption);
    },
    setColumnsRender(columns, isRender) {
      columns.forEach(isRender);
    },
    columnRenderOption(i) {
      this.$set(i, 'isRender', () => {
        return this.chekcedColumns.includes(i.prop);
      });
    }
  }
};
</script>

<style scoped lang="scss">

 
</style>
