## TableGenerate Table 生成

> 基于`Table`组件的封装, 扩展了其功能

- 可通过配置生成过滤表单、表格、分页完全适用于查询页

### 完整功能

:::demo

```html
<dy-query-page
  :useTableStyle="useTableStyle"
  :useTableClass="useTableClass"
  :useTableProps="useTableProps"
  :useTableOn="useTableOn"
  :useTableNativeOn="useTableNativeOn"
  :useTableDirectives="useTableDirectives"
  :useTableSlots="useTableSlots"
  :useTableAttrs="useTableAttrs"
  :usePaginationProps="usePaginationProps"
  :usePaginationAttrs="usePaginationAttrs"
  :usePaginationOn="usePaginationOn"
  :useQueryProps="useQueryProps"
  :useQueryOn="useQueryOn"
  :useOperateProps="useOperateProps"
  ref="queryPage"
>
  <template #pagination.default>
    <div>
      <dy-link>调用接口看 Network</dy-link>
    </div>
  </template>

  <template #table.append>
    <div>
      <dy-link>template slot 优先级高于 useSlot</dy-link>
    </div>
  </template>

  <template #operate.button>
    <dy-button size="small" icon="dy-icon-circle-plus-outline">新增</dy-button>
  </template>
</dy-query-page>

<script>
  import genTableMixin from 'dynamic-ui/src/mixins/table.js'
  import { formatDate, parseDate } from 'dynamic-ui/src/utils/date-util'

  export default {
    mixins: [genTableMixin()],
    data(self) {
      return {
        loading: false,
        list: [],
        total: 0,
        page: 1,
        size: 10,
        params: {},
        config: [
          {
            label: '姓名',
            prop: 'name',
            query: {
              sort: 1,
              component: 'input',
              props: {
                placeholder: '全字匹配名称',
              },
            },
          },
          {
            label: '日期',
            prop: 'date',
            formatter: ({ cellValue }) => {
              return cellValue && formatDate(cellValue, 'yyyy-MM-dd')
            },
            query: {
              isRender: model => {
                if (model.enableDate) {
                  model.date = undefined
                  return false
                }
                return true
              },
              component: 'date',
              span: 12,
              props: {
                type: 'daterange',
              },
            },
          },
          {
            label: '月份',
            prop: 'month',
            formatter: ({ row }) => {
              return row.date && formatDate(row.date, 'MM')
            },
          },
          {
            label: '文本',
            prop: 'text',
            query: {
              sort: 3,
              label: '文本字符',
              prop: 'search',
              component: 'input',
            },
          },
          {
            label: '年龄',
            prop: 'age',
            query: {
              sort: 2,
              component: 'select',
              props: {
                valueKey: 'start',
                options: Array.from({ length: 10 }).map((_, idx) => {
                  const start = idx * 10 + 1
                  const end = start + 10 - 1
                  return {
                    label: `${start} ~ ${end}`,
                    value: { start, end },
                  }
                }),
              },
            },
          },
          {
            label: '小数',
            prop: 'num1',
          },
        ],
      }
    },
    created() {
      this.query()
    },
    mounted() {
      console.log(this.$refs.queryPage.useTableRef())
      console.log(this.$refs.queryPage.usePaginationRef())
    },
    methods: {
      useTableStyle() {
        return {
          color: '#606266',
        }
      },
      useTableClass() {
        return ['dy-table-cls1', { 'dy-table-cls2': false }]
      },
      useTableProps() {
        const { config, list } = this
        return {
          config,
          data: list,
          stripe: true,
          stripe: true,
          border: true,
          maxHeight: 500,
        }
      },
      useTableOn() {
        return {
          'row-click': row => {
            console.log(row)
          },
        }
      },
      useTableNativeOn() {
        return {
          click: () => {
            console.log('click <table></table>')
          },
        }
      },
      useTableAttrs() {
        return {
          id: 'table-idName',
        }
      },
      usePaginationProps() {
        const { total } = this
        return {
          total,
          background: true,
          layout: 'slot, total, sizes, prev, pager, next, jumper',
        }
      },
      useTableDirectives() {
        return [
          {
            name: 'loading',
            value: this.loading,
          },
        ]
      },
      useTableSlots() {
        return {
          append: () => {
            return <dy-link style="padding: 10px 0; ">append slot</dy-link>
          },
        }
      },
      usePaginationAttrs() {
        return {
          style: `margin-top: 20px`,
        }
      },
      usePaginationOn() {
        const paramsChange = params => {
          this.page = params
          this.query()
        }
        return {
          'size-change': size => {
            this.size = size
            this.query()
          },
          'current-change': paramsChange,
          'prev-click': paramsChange,
          'next-click': paramsChange,
        }
      },
      useQueryProps() {
        return {
          value: this.params,
          config: this.useTableQueryConfig(this.config),
        }
      },
      useQueryOn() {
        return {
          input: value => {
            this.params = { ...value }
          },
          // input: value => (this.params = { ...value }),
        }
      },
      useOperateProps() {
        return {
          tableName: '列表查询',
        }
      },
      async getParams() {
        return {
          url: this.$root.URL.getTableList,
          params: {
            page: this.page,
            size: this.size,
          },
        }
      },
      query() {
        this.loading = true
        return this.useTableList(this.getParams)
          .then(([data, total]) => {
            this.list = data
            this.total = total
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 1000 * 3)
          })
      },
    },
  }
</script>
```

:::

:::tip
template slot 优先级高于 useSlot
:::

### 扩展 Table Attributes

| 参数                 | 说明                                                         | 类型   | 可选值                   | 默认值 |
| -------------------- | ------------------------------------------------------------ | ------ | ------------------------ | ------ |
| data/v-model         | 表格数据                                                     | array  | —                        | —      |
| config               | 表格配置对象，具体选项看下表                                 | array  | —                        | —      |
| isRenders            | 控制表单项 render                                            | object | —                        | —      |
| align                | 全局表格对齐方式, 优先级低于 column 的`align`                | String | left/center/right        | left   |
| header-align         | 全局表头对齐方式, 优先级低于 column 的`header-align`         |
| show-overflo-tooltip | 全局表头对齐方式, 优先级低于 column 的`show-overflo-tooltip` |
| columns              | 内置支持的列                                                 | array  | index、selection、expand | —      |

### config

| 参数         | 说明                        | 类型                                       | 可选值 | 默认值 |
| ------------ | --------------------------- | ------------------------------------------ | ------ | ------ |
| formatter    | 格式化内容                  | Function({row, column, cellValue, $index}) | —      | —      |
| render       | defalut slot 的 render 写法 | Function({row, column, cellValue, $index}) | —      | —      |
| headerRender | header slot 的 render 写法  | Function({column, $index})                 | —      | —      |

### custom-column Attributes

<!--

 -->

| 参数         | 说明           | 类型       | 可选值 | 默认值 |
| ------------ | -------------- | ---------- | ------ | ------ |
| buttonProps  | 触发按钮 props | ButtonCtor | —      | —      |
| popoverProps | PopoverCtor    | —          | —      |
| tooltipProps | TooltipCtor    | —          | —      |
| fixedColumns | 固定的列       | —          | —      |
| resetText    | 重置按钮文本   | —          | —      |
| confirmText  | 确认按钮文本   | —          | —      |
