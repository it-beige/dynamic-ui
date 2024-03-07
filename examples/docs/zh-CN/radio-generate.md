## RadioGenerate Radio 生成

> 基于`Radio`组件的封装, 扩展了其功能

- 传入 `URL` 自动请求数据来渲染组件
- 对`radioGroup`和`Radio`及`RadioButton`组件进行了整合
- 对`Radio`和`RadioButton`行为进行统一,都支持不使用`radioGroup`的情况进行多选
- 可配置二次点击取消选项中状态

### 基础用法

:::demo

```html
<dy-radio-generate
  class="base-radio"
  v-model="value"
  :options="options"
  ref="radioGenerateRef"
  type="circle"
  :group="true"
></dy-radio-generate>
<script>
  export default {
    data() {
      return {
        value: '',
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
      this.getRadioRef()
    },
    methods: {
      getRadioRef() {
        console.log(this.$refs.radioGenerateRef)
        console.log(this.$refs.radioGenerateRef.$refs.DyRadioGroup)
        // or
        console.log(this.$refs.radioGenerateRef.useRef())
      },
    },
  }
</script>
```

`type`支持的类型有两种, `circle`对应的渲染组件`radio`、`button`对应的渲染组件`radio-button`, `group`是否为单选框组
:::

### 自动请求数据

:::demo

```html
<dy-radio-generate
  class="base-radio"
  v-model="value"
  type="button"
  :url="url"
  :params="params"
  :formatter="formatter"
  :props="props"
  :group="false"
></dy-radio-generate>
<script>
  export default {
    data() {
      return {
        props: {
          updateValue: 'updateValue',
        },
        value: [],
        url: '/api/list',
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

`type`支持的类型有两种, `circle`对应的渲染组件`radio`、`button`对应的渲染组件`radio-button`, `group`是否为单选框组;`
:::

### 可取消选中状态

:::demo

```html
<dy-radio-generate
  class="base-radio"
  v-model="value"
  :options="options"
  type="circle"
  :group="true"
  :toggle="true"
  text-color="red"
></dy-radio-generate>

<div style="margin-top: 40px;">
  <dy-radio-generate
    v-model="value2"
    type="button"
    :url="url"
    :params="params"
    :group="false"
    :toggle="true"
  ></dy-radio-generate>
</div>
<script>
  export default {
    data() {
      return {
        value: '',
        value2: [],
        value: [],
        url: '/api/list',
        params: { page: 1, size: 4 },
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
    mounted() {},
    methods: {},
  }
</script>
```

`type`支持的类型有两种, `circle`对应的渲染组件`radio`、`button`对应的渲染组件`radio-button`, `group`是否为单选框组;`
:::

### 扩展 Radio Attributes

| 参数      | 说明                 | 类型     | 可选值             | 默认值                  |
| --------- | -------------------- | -------- | ------------------ | ----------------------- |
| props     | 配置选项，具体看下表 | object   | —                  | global.useOptionProps() |
| formatter | 格式化 option 数据   | function | -                  | -                       |
| type      | 格支持的类型         | string   | `circle`、`button` | circle                  |
| group     | 是否分组             | boolean  | -                  | true                    |
| toggle    | 是否可取消选中       | boolean  | -                  | false                   |

### props

| 参数        | 说明                           | 类型            | 可选值 | 默认值   |
| ----------- | ------------------------------ | --------------- | ------ | -------- |
| label       | option 组件的 label 属性       | string          | —      | label    |
| value       | option 组件的 value 属性       | string          | —      | value    |
| children    | 指定子树为节点对象的某个属性值 | string          | —      |          |
| disabled    | 子节点否禁用的属性值           | string          | —      | children |
| updateValue | 等同于 radio 组件的 input      | function(value) | —      | -        |

### Radio-group Attributes

| 参数            | 说明                                                       | 类型                      | 可选值                | 默认值  |
| --------------- | ---------------------------------------------------------- | ------------------------- | --------------------- | ------- |
| value / v-model | 绑定值                                                     | string / number / boolean | —                     | —       |
| size            | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效 | string                    | medium / small / mini | —       |
| disabled        | 是否禁用                                                   | boolean                   | —                     | false   |
| text-color      | 按钮形式的 Radio 激活时的文本颜色                          | string                    | —                     | #ffffff |
| fill            | 按钮形式的 Radio 激活时的填充色和边框色                    | string                    | —                     | #409EFF |

### Radio-group Events

| 事件名称 | 说明                   | 回调参数              |
| -------- | ---------------------- | --------------------- |
| input    | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radio-button Attributes

| 参数            | 说明           | 类型                      | 可选值 | 默认值 |
| --------------- | -------------- | ------------------------- | ------ | ------ |
| value / v-model | 绑定值         | string / number / boolean | —      | —      |
| label           | Radio 的 value | string / number           | —      | —      |
| disabled        | 是否禁用       | boolean                   | —      | false  |
| name            | 原生 name 属性 | string                    | —      | —      |
