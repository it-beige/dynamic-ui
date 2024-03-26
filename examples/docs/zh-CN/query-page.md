## QueryPage 查询页

> 基于`TableGenerate`、`FormGenerate`、`Pagination`、使用函数式的的组件的封装

- 可通过配置生成过滤表单、表格、分页完全适用于查询页
- 对组件进行了扩展和样式优化

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
  :useQueryDirectives="useQueryDirectives"
  :useOperateProps="useOperateProps"
  :useOperateClass="useOperateClass"
  :useSearchProps="useSearchProps"
  :useSearchOn="useSearchOn"
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
    <dy-button icon="dy-icon-circle-plus-outline">新增</dy-button>
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
      console.log(this.$refs.queryPage.useQueryRef())
      console.log(this.$refs.queryPage.useSearchRef())
    },
    methods: {
      useLoading() {
        return {
          name: 'loading',
          value: this.loading,
        }
      },
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
        return [this.useLoading()]
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
          labelWidth: '90px',
        }
      },
      useQueryOn() {
        return {
          input: value => {
            this.params = { ...value }
          },
        }
      },
      useQueryDirectives() {
        return [this.useLoading()]
      },
      useOperateProps() {
        return {
          tableName: '列表查询',
        }
      },
      useOperateClass() {
        return ['operate-cls']
      },
      useSearchProps() {
        return {
          // 开启过滤表单的折叠 true为折叠, false为展开
          collapse: false,
        }
      },
      useSearchOn() {
        return {
          reset: this.reset,
          search: this.search,
        }
      },
      async getParams() {
        const searchParams = {
          url: this.$root.URL.getTableList,
          params: {
            page: this.page,
            size: this.size,
          },
        }
        searchParams.params = {
          ...searchParams.params,
          ...this.params,
        }
        if (this.params.date) {
          const [start, end] = this.params.date
          searchParams.params.date = `${formatDate(
            start,
            'yyyy-MM-dd',
          )}/${formatDate(end, 'yyyy-MM-dd')}`
        }
        if (this.params.age) {
          const { start, end } = this.params.age
          searchParams.params.age = `${start}/${end}`
        }
        return searchParams
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
            }, 1000 * 1)
          })
      },
      reset() {
        this.params = {}
        this.query()
      },
      search() {
        this.query()
      },
    },
  }
</script>
```

:::

:::tip
插槽具体配置看下方 Slot, 需要注意的是 template slot 的写法优先级始终高于 useSlot 方法渲染
:::

### 自定义配置

:::demo

```html
<dy-query-page
  :useTableProps="useTableProps"
  :useQueryProps="useQueryProps"
  :useQueryOn="useQueryOn"
  :useSearchProps="useSearchProps"
  :useSearchOn="useSearchOn"
  ref="queryPage"
>
  <template #query.enableDate>
    <dy-switch v-model="params.enableDate"></dy-switch>
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
    methods: {
      useLoading() {
        return {
          name: 'loading',
          value: this.loading,
        }
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
      useQueryProps() {
        return {
          value: this.params,
          config: this.useTableQueryConfig(this.config).concat({
            label: '关闭日期',
            prop: 'enableDate',
            component: 'slot',
            span: 8,
          }),
          labelWidth: '90px',
        }
      },
      useQueryOn() {
        return {
          input: value => {
            this.params = { ...value }
          },
        }
      },
      useSearchProps() {
        return {
          collapse: true,
          upText: '展开',
          downText: '折叠',
          searchText: '查询',
          resetText: '重置',
        }
      },
      useSearchOn() {
        return {
          reset: this.reset,
          search: this.search,
        }
      },
      async getParams() {
        const searchParams = {
          url: this.$root.URL.getTableList,
          params: {
            page: this.page,
            size: this.size,
          },
        }
        searchParams.params = {
          ...searchParams.params,
          ...this.params,
        }
        if (this.params.date) {
          const [start, end] = this.params.date
          searchParams.params.date = `${formatDate(
            start,
            'yyyy-MM-dd',
          )}/${formatDate(end, 'yyyy-MM-dd')}`
        }
        return searchParams
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
            }, 1000 * 1)
          })
      },
      reset() {
        this.params = {}
        this.query()
      },
      search() {
        this.query()
      },
    },
  }
</script>
```

:::

### 自定义查询区按钮

:::demo

```html
<dy-query-page
  :useTableProps="useTableProps"
  :useQueryProps="useQueryProps"
  :useQueryOn="useQueryOn"
  :useSearchProps="useSearchProps"
  ref="queryPage"
>
  <template #search.button>
    <dy-button type="primary" icon="dy-icon-search" @click="query">
      查询
    </dy-button>
    <dy-button icon="dy-icon-refresh-left" @click="reset">重置</dy-button>
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
          },
          {
            label: '日期',
            prop: 'date',
            formatter: ({ cellValue }) => {
              return cellValue && formatDate(cellValue, 'yyyy-MM-dd')
            },
            query: {
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
    methods: {
      useLoading() {
        return {
          name: 'loading',
          value: this.loading,
        }
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
      useQueryProps() {
        return {
          value: this.params,
          config: this.useTableQueryConfig(this.config),
          labelWidth: '90px',
        }
      },
      useQueryOn() {
        return {
          input: value => {
            this.params = { ...value }
          },
        }
      },
      useSearchProps() {
        return {}
      },
      async getParams() {
        const searchParams = {
          url: this.$root.URL.getTableList,
          params: {
            page: this.page,
            size: this.size,
          },
        }
        searchParams.params = {
          ...searchParams.params,
          ...this.params,
        }
        if (this.params.date) {
          const [start, end] = this.params.date
          searchParams.params.date = `${formatDate(
            start,
            'yyyy-MM-dd',
          )}/${formatDate(end, 'yyyy-MM-dd')}`
        }
        return searchParams
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
            }, 1000 * 1)
          })
      },
      reset() {
        this.params = {}
        this.query()
      },
      search() {
        this.query()
      },
    },
  }
</script>
```

:::

### QueryPage Attributes

:::warning
`query-page `通过 use 开头函数返回的配置根据需求来确定是否进行**响应式处理**, 示例中直接返回的字面量对象都是没有进行响应式处理, 如果需要可以将返回的配置对象在 data 中定义, 这么做的目的是为了优化不必要的渲染
:::

| use 开头配置     | 说明       | 组件           |
| ---------------- | ---------- | -------------- |
| useQueryxxx      | 过滤表单区 | `FormGenerate` |
| useOperatexxx    | 按钮操作区 | `Row`          |
| useSearchxxx     | 查询重置区 | `Slot`         |
| usePaginationxxx | 分页区     | `Pagination`   |

### use 配置

| 参数             | 说明                              | 返回值类型            |
| ---------------- | --------------------------------- | --------------------- |
| usexxxStyle      | 与 `v-bind:class` 的 API 相同     | string、object、array |
| usexxxClass      | 与 `v-bind:style` 的 API 相同     | string、object、array |
| usexxxAttrs      | HTML attribute                    | object                |
| usexxxProps      | 组件 props                        | object                |
| usexxxDomProps   | DOM property                      | object                |
| usexxxOn         | 与 `v-on` API 相同,但不支持修饰符 | object                |
| usexxxNativeOn   | 监听原生事件                      | object                |
| usexxxDirectives | 自定义指令                        | array                 |
| usexxxSlots      | 自定义 Slot                       | object                |
| usexxxScopedSlot | 自定义 Scoped Slot                | object                |

### Props

| 参数               | 返回值说明                                        | 返回值类型 |
| ------------------ | ------------------------------------------------- | ---------- |
| useTableProps      | `TableGenerate`组件提供的 props                   | object     |
| usePaginationProps | `Pagination`组件提供的 props                      | object     |
| useQueryProps      | `FormGenerate`组件提供的 props                    | object     |
| useSearchProps     | collapse、upText、downText、searchText、resetText | object     |

### Slot 配置

| 插槽写法           | 说明                         | 组件           |
| ------------------ | ---------------------------- | -------------- |
| query.xxx          | 过滤表单区(插槽根据配置而定) | `FormGenerate` |
| operate.button     | 按钮操作区提供的插槽         | `Row`          |
| search.button      | 查询重置区提供的插槽         | `Slot`         |
| pagination.default | 分页区提供的插槽             | `Pagination`   |
