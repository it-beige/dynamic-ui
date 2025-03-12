## TreeSelectGenerate TreeSelect 生成

> 基于`Tree`、`Select`组件的封装, 扩展了其功能

- 传入 `URL` 自动请求数据来渲染组件
- 支持多选、全选功能
- 支持限制数量

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

### 可多选

:::demo 传入`multiple`可开启 Tree 的多选, `multiple-limit`限制选择的数量

```html
<dy-tree-select-generate
  v-model="value"
  :url="url"
  style="width: 50%"
  multiple
  :multiple-limit="3"
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

### 可全选

:::demo 传入`select-all`可开启 Tree 的全选选, 改属性和 `multiple-limit`互斥

```html
<dy-tree-select-generate
  v-model="value"
  :url="url"
  style="width: 50%"
  multiple
  filterable
  select-all
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

### 懒加载

:::demo 传入`select-all`可开启 Tree 的全选选, 改属性和 `multiple-limit`互斥

```html
<dy-tree-select-generate
  v-model="value"
  style="width: 50%"
  multiple
  :props="props"
  :treeProps="treeProps"
  placeholder="自定义懒加载"
></dy-tree-select-generate>

<script>
  import { TreeCtor } from 'dynamic-ui/packages/tree-select-generate/src/main.vue'

  export default {
    data() {
      return {
        url: this.$root.URL.getTreeSelectList,
        value: [],
        data: [],
        props: {
          label: 'label',
          disabled: 'disabled',
          children: 'children',
          isLeaf: 'leaf',
        },
        treeProps: new TreeCtor({
          lazy: true,
          load: this.load,
        }),
      }
    },
    methods: {
      load(node, resolve) {
        if (node.level === 0) {
          resolve([
            {
              label: '数字化事业部',
              value: 'code-1',
              leaf: false,
              children: [],
            },
            {
              label: '人工智能事业部',
              value: 'code-2',
              leaf: true,
              children: [],
            },
          ])
        }

        if (node.key === 'code-1') {
          resolve([
            {
              value: 'code-1-1',
              label: '前端',
              leaf: true,
            },
            {
              value: 'code-1-2',
              label: '后端',
              leaf: true,
            },
            {
              value: 'code-1-3',
              label: 'UI',
              leaf: true,
            },
            {
              value: 'code-1-4',
              label: '运营',
              leaf: true,
            },
            {
              value: 'code-1-5',
              label: '运维',
              leaf: true,
            },
          ])
        }
      },
    },
  }
</script>
```

:::

### TreeSelect Attributes

| 参数          | 说明                     | 类型                  | 可选值 | 默认值 |
| ------------- | ------------------------ | --------------------- | ------ | ------ |
| value         | 绑定值                   | string, object, array | —      | —      |
| isSelectLeaf  | 单选情况下只能选叶子节点 | boolean               | —      | true   |
| multiple      | 多选                     | boolean               | —      | false  |
| multipleLimit | 限制选择项目数           | number                | —      | —      |
| selectAll     | 是否可全选               | boolean               | —      | —      |
| selectAll     | 是否开启过滤树的功能     | boolean               | —      | false  |
| treeProps     | TreeCtor                 | class                 | —      | -      |
