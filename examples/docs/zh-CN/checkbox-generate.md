## CheckboxGenerate Checkbox 生成

> 基于`Checkbox`组件的封装, 扩展了其功能

- 传入 `URL` 自动请求数据来渲染组件
- 对`checkboxGroup`和`Checkbox`及`CheckboxButton`组件进行了整合

### 基础用法

:::demo

```html
<dy-checkbox-generate
  class="base-checkbox"
  v-model="value"
  :options="options"
  ref="checkboxGenerateRef"
  type="square"
></dy-checkbox-generate>
<script>
  export default {
    data() {
      return {
        value: ['选项1'],
        options: [
          {
            value: '选项1',
            label: '黄金糕',
            disabled: true,
          },
          {
            value: '选项2',
            label: '双皮奶',
          },
          {
            value: '选项3',
            label: '蚵仔煎',
          },
          {
            value: '选项4',
            label: '龙须面',
          },
          {
            value: '选项5',
            label: '北京烤鸭',
          },
        ],
      }
    },
    mounted() {
      this.getCheckboxRef()
    },
    methods: {
      getCheckboxRef() {
        console.log(this.$refs.checkboxGenerateRef.$refs)
        console.log(this.$refs.checkboxGenerateRef.$refs.DyCheckboxGroup)
        // or
        console.log(this.$refs.checkboxGenerateRef.useRef())
      },
    },
  }
</script>
```

`type`支持的类型有两种, `square`对应的渲染组件`checkbox`、`button`对应的渲染组件`checkbox-button`, `group`是否为单选框组
:::

### 自动请求数据

:::demo

```html
<dy-checkbox-generate
  class="base-checkbox"
  v-model="value"
  type="button"
  :url="url"
  :params="params"
  :formatter="formatter"
  :props="props"
></dy-checkbox-generate>
<script>
  export default {
    data() {
      return {
        props: {
          updateValue: 'updateValue',
        },
        value: [],
        url: this.$root.URL.getList,
        params: { page: 1, size: 4 },
      }
    },
    mounted() {},
    methods: {
      formatter(props) {
        props.updateValue = ({ value }) => {
          this.$message.success(`点击了${value}`)
        }
        return props
      },
    },
  }
</script>
```

`type`支持的类型有两种, `square`对应的渲染组件`checkbox`、`button`对应的渲染组件`checkbox-button`, `group`是否为单选框组;
:::

### 扩展 Checkbox Attributes

| 参数      | 说明                 | 类型     | 可选值             | 默认值                  |
| --------- | -------------------- | -------- | ------------------ | ----------------------- |
| props     | 配置选项，具体看下表 | object   | —                  | global.useOptionProps() |
| formatter | 格式化 option 数据   | function | -                  | -                       |
| type      | 格支持的类型         | string   | `square`、`button` | square                  |
| group     | 是否分组             | boolean  | -                  | true                    |
| toggle    | 是否可取消选中       | boolean  | -                  | false                   |

### props

| 参数        | 说明                           | 类型            | 可选值 | 默认值   |
| ----------- | ------------------------------ | --------------- | ------ | -------- |
| label       | option 组件的 label 属性       | string          | —      | label    |
| value       | option 组件的 value 属性       | string          | —      | value    |
| children    | 指定子树为节点对象的某个属性值 | string          | —      |          |
| disabled    | 子节点否禁用的属性值           | string          | —      | children |
| updateValue | 等同于 checkbox 组件的 change  | function(value) | —      | -        |

### Checkbox-group Attributes

| 参数            | 说明                                                             | 类型                      | 可选值                | 默认值  |
| --------------- | ---------------------------------------------------------------- | ------------------------- | --------------------- | ------- |
| value / v-model | 绑定值                                                           | string / number / boolean | —                     | —       |
| size            | 单选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效 | string                    | medium / small / mini | —       |
| disabled        | 是否禁用                                                         | boolean                   | —                     | false   |
| text-color      | 按钮形式的 Checkbox 激活时的文本颜色                             | string                    | —                     | #ffffff |
| fill            | 按钮形式的 Checkbox 激活时的填充色和边框色                       | string                    | —                     | #409EFF |

### Checkbox-group Events

| 事件名称 | 说明                   | 回调参数                 |
| -------- | ---------------------- | ------------------------ |
| input    | 绑定值变化时触发的事件 | 选中的 Checkbox label 值 |

### Checkbox-button Attributes

| 参数            | 说明              | 类型                      | 可选值 | 默认值 |
| --------------- | ----------------- | ------------------------- | ------ | ------ |
| value / v-model | 绑定值            | string / number / boolean | —      | —      |
| label           | Checkbox 的 value | string / number           | —      | —      |
| disabled        | 是否禁用          | boolean                   | —      | false  |
| name            | 原生 name 属性    | string                    | —      | —      |
