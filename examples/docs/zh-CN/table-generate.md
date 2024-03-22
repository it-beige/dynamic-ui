## TableGenerate Table 生成

> 基于`Table`组件的封装, 扩展了其功能

- 通过`JSON`方式的配置可以生成表格, 灵活可应用于多数下的表格场景
- 可通过配置生成过滤、表格、分页完全适用于于列表页

### 基础用法

:::demo

```html
<dy-table-generate
  ref="tableGenerateRef"
  :config="config"
  stripe
  border
  header-align="center"
  align="center"
  max-height="500"
  :cell-class-name="setCellClassName"
  :header-cell-class-name="setHeaderCellClassName"
  show-overflow-tooltip
  v-model="list"
>
  <template #status="{cellValue}">
    <dy-tag :type="cellValue === '1' ? 'success' : 'danger'">
      {{cellValue === '1' ? '开启' : '关闭'}}
    </dy-tag>
  </template>

  <template #statusHeader="{column}">dy-{{column.label}}</template>

  <dy-table-column-generate
    label="描述"
    prop="desc"
    width="120"
    :render="renderDesc"
  >
    <template #header="{column}">dy-{{column.label}}</template>
  </dy-table-column-generate>

  <dy-table-column-generate label="头像" width="80">
    <dy-avatar
      src="https://cdn.jsdelivr.net/gh/it-beige/dynamic-assets/images/beige.jpg"
    ></dy-avatar>
  </dy-table-column-generate>

  <dy-table-column fixed="right" label="操作" width="120">
    <template #default="scoped">
      <dy-button
        @click="delRow(scoped)"
        type="text"
        size="small"
        style="color: #f56c6c"
      >
        删除
      </dy-button>
    </template>
  </dy-table-column>
</dy-table-generate>

<style>
  .dy-table .main-cell {
    color: #409eff;
  }
  .dy-table .main-header-cell {
    color: #409eff;
  }
</style>

<script>
  import genTableMixin from 'dynamic-ui/src/mixins/table.js'
  import { formatDate } from 'dynamic-ui/src/utils/date-util'

  export default {
    mixins: [
      genTableMixin({
        useTableList: 'getTableList',
      }),
    ],
    data(self) {
      return {
        list: [],
        total: 0,
        config: [
          {
            label: '日期',
            prop: 'date',
            align: 'left',
            width: 120,
            'header-align': 'left',
            fixed: true,
            formatter: ({ cellValue }) => {
              return cellValue && formatDate(cellValue, 'yyyy-MM-dd')
            },
          },
          {
            label: '状态',
            prop: 'status',
          },
          {
            label: '邮箱',
            prop: 'email',
            headerRender({ column }) {
              return self.$createElement('div', ['dy-' + column.label])
            },
            render({ cellValue }) {
              return self.$createElement('div', [
                self.$createElement(
                  'dy-tag',
                  { props: { type: 'info' } },
                  cellValue,
                ),
              ])
            },
          },
          {
            label: '配送信息',
            children: [
              { label: '姓名', prop: 'name' },
              {
                label: '地址',
                children: [
                  {
                    label: '省',
                    formatter: ({ row }) => {
                      return row.area.at(0)
                    },
                  },
                  {
                    label: '市',
                    formatter: ({ row }) => {
                      return row.area.at(1)
                    },
                  },
                  {
                    label: '区',
                    formatter: ({ row }) => {
                      return row.area.at(2) || '-'
                    },
                  },
                ],
              },
            ],
          },
        ],
      }
    },
    created() {
      this.getTableList(this.getParams).then(([data, total]) => {
        this.list = data
        this.total = total
      })
    },
    mounted() {
      this.getTableRef()
    },
    methods: {
      getTableRef() {
        console.log(this.$refs.tableGenerateRef.$refs.DyTable)
        // or
        console.log(this.$refs.tableGenerateRef.useRef())
      },
      async getParams() {
        return {
          url: this.$root.URL.getTableList,
          params: {
            page: 1,
            size: 10,
          },
        }
      },
      setCellClassName({ column }) {
        return column.property === 'name' ? 'main-cell' : ''
      },
      setHeaderCellClassName({ column }) {
        return column.property === 'name' ? 'main-header-cell' : ''
      },
      delRow(scoped) {
        console.log(scoped)
        const { index } = scoped
        this.list.splice(index, 1)
      },
      renderDesc({ cellValue }) {
        return cellValue
      },
    },
  }
</script>
```

:::

- column 的 align、headerAlign 优先级高于 table
- template 的插槽写法高于 column 的 render
- 配置项的 underscore、camelCase 写法都支持, 如` header-align`、`headerAlign `这两种都行

### 内置列

:::demo

```html
<dy-table-generate
  ref="tableGenerateRef"
  :config="config"
  max-height="500"
  :columns="inlayColumns"
  v-model="list"
>
  <template #expand-prop="{row}">
    <dy-descriptions :column="config.length" border>
      <dy-descriptions-item v-for="i of config" :key="i.prop">
        <div slot="label">{{i.label}}</div>
        <div>{{row[i.prop]}}</div>
      </dy-descriptions-item>
    </dy-descriptions>
  </template>
</dy-table-generate>

<script>
  import genTableMixin from 'dynamic-ui/src/mixins/table.js'

  export default {
    mixins: [
      genTableMixin({
        useTableList: 'getTableList',
      }),
    ],
    data(self) {
      return {
        list: [],
        total: 0,
        config: [
          {
            label: '文本',
            prop: 'text',
          },
          {
            label: '年龄',
            prop: 'age',
            sortable: true,
          },
          {
            label: '小数',
            prop: 'num1',
          },
        ],
        inlayColumns: [
          {
            column: 'selection',
            props: {
              align: 'center',
            },
          },
          {
            column: 'index',
            props: {
              label: '序号',
              align: 'center',
            },
          },
          {
            column: 'expand',
            props: {
              prop: 'expand-prop',
              label: '展开',
              align: 'center',
            },
          },
        ],
      }
    },
    created() {
      this.getTableList(this.getParams).then(([data, total]) => {
        this.list = data
        this.total = total
      })
    },
    methods: {
      async getParams() {
        return {
          url: this.$root.URL.getTableList,
        }
      },
    },
  }
</script>
```

:::

### 筛选 + 排序

:::demo

```html
<dy-row type="flex" justify="end">
  <dy-col class="dy-flex__justify-end">
    <dy-button @click="clearFilter('date')" type="text" size="small">
      清除日期筛选
    </dy-button>
  </dy-col>
</dy-row>
<dy-table-generate
  ref="tableGenerateRef"
  :config="config"
  stripe
  border
  max-height="500"
  :default-sort="{prop: 'date', order: 'descending'}"
  :columns="inlayColumns"
  v-model="list"
></dy-table-generate>

<script>
  import genTableMixin from 'dynamic-ui/src/mixins/table.js'
  import { formatDate, parseDate } from 'dynamic-ui/src/utils/date-util'

  export default {
    mixins: [
      genTableMixin({
        useTableList: 'getTableList',
      }),
    ],
    data(self) {
      return {
        list: [],
        total: 0,
        config: [
          {
            label: '日期',
            prop: 'date',
            columnKey: 'date',
            formatter: ({ cellValue }) => {
              return cellValue && formatDate(cellValue, 'yyyy-MM-dd')
            },
            filters: [],
            'filter-method': (value, row, column) => {
              console.log(value, row, column)
              const month = formatDate(row.date, 'MM')
              return value === month
            },
            renderFilter: () => {
              return <i class="dyanamicDoc doc-dy-filter" />
            },
          },
          {
            label: '文本',
            prop: 'text',
          },
          {
            label: '年龄',
            prop: 'age',
            sortable: true,
          },
          {
            label: '小数',
            prop: 'num1',
          },
        ],
        inlayColumns: [
          {
            column: 'index',
          },
        ],
      }
    },
    created() {
      this.getTableList(this.getParams)
        .then(([data, total]) => {
          this.list = data
          this.total = total
        })
        .then(this.setColumnFilters)
    },
    methods: {
      async getParams() {
        return {
          url: this.$root.URL.getTableList,
        }
      },
      setColumnFilters() {
        const dateColumn = this.config.find(i => i.prop === 'date')
        const set = this.list.reduce((set, i) => {
          const month = formatDate(i.date, 'MM')
          return set.add(month)
        }, new Set())
        dateColumn.filters = Array.from(set)
          .toSorted((a, b) => a - b)
          .map(i => ({ text: `${i}月份`, value: i }))
      },
      clearFilter(prop) {
        this.$refs.tableGenerateRef.useRef().clearFilter(prop)
      },
    },
  }
</script>
```

:::

### 自定列

:::demo

```html
<dy-row type="flex" justify="end">
  <dy-col :span="12">
    <div
      class="dy-flex__align-center dy-flex__justify-between"
      style="margin-bottom: 12px"
    >
      <dy-link type="primary" :underline="false">自定义配置:</dy-link>
      <dy-table-custom-column-generate
        :config="config2"
        :buttonProps="buttonProps"
        :popoverProps="popoverProps"
        :tooltipProps="tooltipProps"
        :fixedColumns="fixedColumns"
        resetText="重新"
        confirmText="确定"
      ></dy-table-custom-column-generate>
    </div>

    <dy-table-generate
      :config="config2"
      stripe
      border
      max-height="500"
      v-model="list"
    ></dy-table-generate>
  </dy-col>

  <dy-col style="margin-left: 10px;" :span="12">
    <div
      class="dy-flex__align-center dy-flex__justify-between"
      style="margin-bottom: 12px"
    >
      <dy-link type="primary" :underline="false">默认配置:</dy-link>
      <dy-table-custom-column-generate
        :config="config"
        :fixedColumns="fixedColumns"
      ></dy-table-custom-column-generate>
    </div>

    <dy-table-generate
      :config="config"
      stripe
      border
      max-height="500"
      v-model="list"
    ></dy-table-generate>
  </dy-col>
</dy-row>

<script>
  import genTableMixin from 'dynamic-ui/src/mixins/table.js'
  import { formatDate, parseDate } from 'dynamic-ui/src/utils/date-util'
  import {
    ButtonCtor,
    PopoverCtor,
    TooltipCtor,
  } from 'dynamic-ui/packages/table-generate/src/custom-column.vue'

  const buttonProps = new ButtonCtor({
    type: 'success',
    circle: true,
  })
  const popoverProps = new PopoverCtor({
    trigger: 'manual',
    placement: 'left',
  })
  const tooltipProps = new TooltipCtor({
    effect: 'light',
  })

  export default {
    mixins: [
      genTableMixin({
        useTableList: 'getTableList',
      }),
    ],
    data(self) {
      return {
        buttonProps,
        popoverProps,
        tooltipProps,
        list: [],
        list2: [],
        fixedColumns: ['date'],
        total: 0,
        total2: 0,
        config: [
          {
            label: '日期',
            prop: 'date',
            fixed: 'left',
            formatter: ({ cellValue }) => {
              return cellValue && formatDate(cellValue, 'yyyy-MM-dd')
            },
          },
          {
            label: '文本',
            prop: 'text',
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
        config2: [
          {
            label: '日期',
            prop: 'date',
            fixed: 'left',
            formatter: ({ cellValue }) => {
              return cellValue && formatDate(cellValue, 'yyyy-MM-dd')
            },
          },
          {
            label: '文本',
            prop: 'text',
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
      this.getTableList(this.getParams).then(([data, total]) => {
        this.list = data
        this.list2 = data
        this.total = total
        this.total2 = total
      })
    },
    methods: {
      async getParams() {
        return {
          url: this.$root.URL.getTableList,
        }
      },
    },
  }
</script>
```

:::

:::tip
使用 custom-column-generate 传入`config`之后, isRender 的控制是否显示列的配置会被前者接管, 组件支持的 props 上面示例均给出
:::

### 分页列表

:::demo

```html
<dy-table-generate
  :config="config"
  stripe
  border
  max-height="500"
  v-model="list"
></dy-table-generate>
<dy-pagination
  style="margin-top: 20px;"
  background
  :total="total"
  :current-page.sync="page"
  @size-change="onSizeChange"
  @current-change="onCurrentChange"
  @prev-click="onPrevClick"
  @next-click="onNextClick"
  layout="total, sizes, prev, pager, next, jumper"
></dy-pagination>

<script>
  import genTableMixin from 'dynamic-ui/src/mixins/table.js'
  import { formatDate, parseDate } from 'dynamic-ui/src/utils/date-util'

  export default {
    mixins: [
      genTableMixin({
        useTableList: 'getTableList',
      }),
    ],
    data(self) {
      return {
        list: [],
        fixedColumns: ['date'],
        total: 0,
        page: 1,
        size: 10,
        config: [
          {
            label: '日期',
            prop: 'date',
            fixed: 'left',
            formatter: ({ cellValue }) => {
              return cellValue && formatDate(cellValue, 'yyyy-MM-dd')
            },
          },
          {
            label: '文本',
            prop: 'text',
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
        return this.getTableList(this.getParams).then(([data, total]) => {
          this.list = data
          this.total = total
        })
      },
      onSizeChange(size) {
        this.size = size
        this.query()
      },
      onCurrentChange(page) {
        this.page = page
        this.query()
      },
      onPrevClick(page) {
        this.page = page
        this.query()
      },
      onNextClick(page) {
        this.page = page
        this.query()
      },
    },
  }
</script>
```

:::

:::tip
pagination
:::

### 查询列表

:::demo

```html
<dy-form-generate :config="queryFornConfig" v-model="params"></dy-form-generate>

<dy-table-generate
  :config="config"
  stripe
  border
  max-height="500"
  v-model="list"
></dy-table-generate>

<script>
  import genTableMixin from 'dynamic-ui/src/mixins/table.js'
  import { formatDate, parseDate } from 'dynamic-ui/src/utils/date-util'

  export default {
    mixins: [
      genTableMixin({
        useTableQueryConfig: 'genQueryConfig',
      }),
    ],
    data(self) {
      return {
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
              component: 'date',
              span: 12,
              props: {
                type: 'daterange',
              },
            },
          },
          {
            label: '文本',
            prop: 'text',
            query: {
              label: '文本字符',
              prop: 'search',
              component: 'input',
              span: 12,
            },
          },
          {
            label: '年龄',
            prop: 'age',
            query: {
              component: 'select',
              props: {
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
    computed: {
      queryFornConfig({ config }) {
        return this.genQueryConfig(config)
      },
    },
    created() {
      this.query()
    },
    methods: {
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
        return this.useTableList(this.getParams).then(([data, total]) => {
          this.list = data
          this.total = total
        })
      },
    },
  }
</script>
```

:::

:::tip
pagination
:::

### 完整功能

:::demo

```html
<dy-query-page
  :useTableProps="useTableProps"
  :usePaginationProps="usePaginationProps"
  :usePaginationAttrs="usePaginationAttrs"
  :usePaginationOn="usePaginationOn"
></dy-query-page>

<script>
  import genTableMixin from 'dynamic-ui/src/mixins/table.js'
  import { formatDate, parseDate } from 'dynamic-ui/src/utils/date-util'

  export default {
    mixins: [
      genTableMixin({
        useTableList: 'getTableList',
      }),
    ],
    data(self) {
      return {
        list: [],
        fixedColumns: ['date'],
        total: 0,
        page: 1,
        size: 10,
        config: [
          {
            label: '日期',
            prop: 'date',
            fixed: 'left',
            formatter: ({ cellValue }) => {
              return cellValue && formatDate(cellValue, 'yyyy-MM-dd')
            },
          },
          {
            label: '文本',
            prop: 'text',
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
      usePaginationProps() {
        const { total } = this
        return {
          total,
          background: true,
          layout: 'total, sizes, prev, pager, next, jumper',
        }
      },
      usePaginationAttrs() {
        return {
          style: `margin-top: 30px`,
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
        return this.getTableList(this.getParams).then(([data, total]) => {
          this.list = data
          this.total = total
        })
      },
    },
  }
</script>
```

:::

:::tip
pagination
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
