## TreeSelectGenerate TreeSelect 生成

> 基于`Tree`、`Select`组件的封装, 扩展了其功能

- 传入 `URL` 自动请求数据来渲染组件
- 支持懒加载数据
- 支持分页形式展示
- 参数监听, 值变动后根据新值自动请求数据
- 对`GroupOption`和`Option`组件进行了整合

### 基础用法

:::demo

```html
<dy-tree-select-generate
  class="base-tree-select"
  v-model="value"
  :options="options"
  ref="treeSelectGenerateRef"
  clearable
  placeholder="请选择岗位"
></dy-tree-select-generate>

<script>
  export default {
    data() {
      return {
        value: 'code-1-1',
        options: [
          {
            value: 'code-1',
            label: '数字化事业部',
            children: [
              {
                value: 'code-1-1',
                label: '前端',
              },
              {
                value: 'code-1-2',
                label: '后端',
              },
              {
                value: 'code-1-3',
                label: 'UI',
              },
              {
                value: 'code-1-4',
                label: '运营',
              },
              {
                value: 'code-1-5',
                label: '运维',
              },
            ],
          },
          {
            value: 'code-2',
            label: '人工智能事业部',
            children: [
              {
                value: 'code-2-1',
                label: '机器学习工程师',
              },
              {
                value: 'code-2-2',
                label: '数据科学家',
              },
              {
                value: 'code-2-3',
                label: '算法工程师',
              },
              {
                value: 'code-2-4',
                label: '深度学习工程师',
              },
              {
                value: 'code-2-5',
                label: '自然语言处理工程师',
              },
            ],
          },
          {
            value: 'code-3',
            label: '云计算事业部',
            children: [
              {
                value: 'code-3-1',
                label: '云架构师',
              },
              {
                value: 'code-3-2',
                label: '云安全工程师',
              },
              {
                value: 'code-3-3',
                label: '云运维工程师',
              },
              {
                value: 'code-3-4',
                label: '大数据工程师',
              },
              {
                value: 'code-3-5',
                label: '容器技术专家',
              },
            ],
          },
        ],
      }
    },
    mounted() {
      this.getSelectRef()
    },
    methods: {
      getSelectRef() {
        console.log(this.$refs.treeSelectGenerateRef.useRef())
      },
    },
  }
</script>
```

:::

### 自动请求数据

:::demo 通过传入`url`、 `params`、 `method`等自动请求数, 据, `filterable`可开启 Tree 的过滤功能

```html
<dy-tree-select-generate
  v-model="value"
  :url="url"
  filterable
  placeholder="请选择岗位"
  style="width: 50%"
></dy-tree-select-generate>

<script>
  export default {
    data() {
      return {
        url: this.$root.URL.getTreeSelectList,
        value: 'code-1-1',
      }
    },
  }
</script>
```

:::

### 基础多选

:::demo 通过传入`url`、 `params`、 `method`等自动请求数, 据, `filterable`可开启 Tree 的过滤功能

```html
<dy-tree-select-generate
  class="base-tree-select"
  v-model="value"
  :url="url"
  multiple
  filterable
  placeholder="请选择岗位"
></dy-tree-select-generate>

<script>
  export default {
    data() {
      return {
        url: this.$root.URL.getTreeSelectList,
        value: ['code-1-1'],
      }
    },
  }
</script>
```

:::

### 扩展 Select Attributes

| 参数      | 说明                 | 类型     | 可选值 | 默认值                  |
| --------- | -------------------- | -------- | ------ | ----------------------- |
| props     | 配置选项，具体看下表 | object   | —      | global.useOptionProps() |
| formatter | 格式化 option 数据   | function | —0     | -                       |

### 扩展 Select Events

| 事件名称 | 说明                                | 回调参数 |
| -------- | ----------------------------------- | -------- |
| load     | lazy 为 true 情况下懒加载数据前触发 | -        |
