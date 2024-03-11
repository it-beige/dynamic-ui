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
  v-model="list"
>
  <template #status="{cellValue}">
    <dy-tag :type="cellValue === '1' ? 'success' : 'danger'">
      {{cellValue === '1' ? '开启' : '关闭'}}
    </dy-tag>
  </template>

  <dy-table-column label="邮箱" prop="email"></dy-table-column>

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
            label: '名称',
            prop: 'name',
            align: 'left',
            'header-align': 'left',
            fixed: true,
          },
          {
            label: '日期',
            prop: 'date',
            formatter: ({ cellValue }) => {
              return cellValue && formatDate(cellValue, 'yyyy-MM-dd')
            },
          },
          {
            label: '状态',
            prop: 'status',
          },
          {
            label: '地区',
            prop: 'area',
            render({ cellValue }) {
              return self.$createElement(
                'div',
                { staticClass: 'dy-flex-column' },
                cellValue.map(i => {
                  return self.$createElement('dy-tag', [i])
                }),
              )
            },
          },
        ],
      }
    },
    created() {
      this.getTableList({
        url: this.$root.URL.getTableList,
        params: {
          page: 1,
          size: 10,
        },
      }).then(([data, total]) => {
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
    },
  }
</script>
```

:::

- column 的 align、headerAlign 优先级高于 table
- template 的插槽写法高于 column 的 render
- 配置项的 underscore、camelCase 写法都支持, 如` header-align`、`headerAlign `这两种都行

### 扩展 Table Attributes

| 参数         | 说明                                                 | 类型   | 可选值            | 默认值 |
| ------------ | ---------------------------------------------------- | ------ | ----------------- | ------ |
| data/v-model | 表格数据                                             | array  | —                 | —      |
| config       | 表格配置对象，具体选项看下表                         | array  | —                 | —      |
| isRenders    | 控制表单项 render                                    | object | —                 | —      |
| align        | 全局表格对齐方式, 优先级低于 column 的`align`        | String | left/center/right | left   |
| header-align | 全局表头对齐方式, 优先级低于 column 的`header-align` |

### config

| 参数      | 说明                        | 类型                                       | 可选值 | 默认值 |
| --------- | --------------------------- | ------------------------------------------ | ------ | ------ |
| formatter | 格式化内容                  | Function({row, column, cellValue, $index}) | —      | —      |
| render    | defalut slot 的 render 写法 | Function({row, column, cellValue, $index}) | —      | —      |

### form-generate 内置的 component

| 值       | 渲染的组件           |
| -------- | -------------------- |
| input    | dy-input             |
| select   | dy-select-generate   |
| radio    | dy-radio-generate    |
| checkbox | dy-checkbox-generate |
| upload   | dy-upload-generate   |

```

```
