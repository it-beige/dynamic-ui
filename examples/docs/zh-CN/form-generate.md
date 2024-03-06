## FormGenerate Form 生成

> 基于`Form`组件的封装, 扩展了其功能

- 通过`JSON`方式的配置可以生成表单项, 灵活可应用于多数下的表单场景
- 可将组件库封装扩展的`Generate`组件注入进去也作为可配置的表单项
- 所有表单项都可选择使用默认的`Dynamic`提供的组件还是自行注入组件
- 表单项的配置项支持: Slot、On、所有在 `template` 支持的功能, 配置项都提供

### 基础用法

:::demo

```html
<dy-form-generate
  ref="formGenerateRef"
  :config="config"
  v-model="modelValue"
  :classSheets="classSheets"
  :itemClassSheets="itemClassSheets"
  :colClassSheets="colClassSheets"
></dy-form-generate>
<script>
  export default {
    data() {
      return {
        modelValue: {
          'input-field': '123',
          'textarea-field': '123',
        },
        config: [
          {
            label: '输入框',
            prop: 'input-field',
            component: 'input',
            props: {
              maxlength: '20',
              showWordLimit: true,
            },
          },
          {
            label: '大文本输入框',
            prop: 'textarea-field',
            component: 'input',
            props: {
              type: 'textarea',
              maxlength: '30',
              showWordLimit: true,
            },
          },
          {
            label: '下拉选择框',
            prop: 'select-field',
            component: 'select',
            props: {
              clearable: true,
              props: {
                label: 'name',
                value: 'code',
                children: 'options',
                disabled: 'isDisabled',
                labelRender: (label, i) => {
                  if (i.code === 'Shanghai') {
                    return this.$createElement(
                      'span',
                      { style: 'color: red' },
                      label,
                    )
                  }
                },
              },
              options: [
                {
                  name: '热门城市',
                  options: [
                    {
                      code: 'Shanghai',
                      name: '上海',
                    },
                    {
                      code: 'Beijing',
                      name: '北京',
                      isDisabled: true,
                    },
                  ],
                },
                {
                  name: '城市名',
                  options: [
                    {
                      code: 'Chengdu',
                      name: '成都',
                    },
                    {
                      code: 'Shenzhen',
                      name: '深圳',
                    },
                    {
                      code: 'Guangzhou',
                      name: '广州',
                    },
                    {
                      code: 'Dalian',
                      name: '大连',
                    },
                  ],
                },
              ],
            },
          },
          {
            label: '单选框',
            prop: 'radio-field',
            component: 'radio',
            props: {
              url: '/api/list',
              params: { page: 1, size: 4 },
              toggle: true,
            },
          },
          {
            label: '多选框',
            prop: 'checkbox-field',
            component: 'checkbox',
            props: {
              url: '/api/list',
              params: { page: 1, size: 4 },
            },
          },
          {
            label: '上传',
            prop: 'update-field',
            component: 'upload',
            props: {
              baseUploadURI:
                process.env.VUE_APP_UPLOAD_API || 'http://localhost:3333',
              action: '/upload',
              listType: 'picture-card',
            },
          },
        ],
        classSheets: { 'input-field': 'component-class' },
        itemClassSheets: { 'input-field': { 'item-class': true } },
        colClassSheets: {
          'input-field': ['col-class', { 'col-class-var': true }],
        },
      }
    },
    mounted() {
      this.getFormRef()
    },
    methods: {
      getFormRef() {
        console.log(this.$refs.formGenerateRef.$refs.DyForm)
        // or
        console.log(this.$refs.formGenerateRef.useRef())
      },
    },
  }
</script>
```

:::

:::tip
props 传入的配置对象根据你需要渲染 component 决定
:::

### 数据格式化处理

:::demo

```html
<dy-form-generate
  ref="formGenerateRef"
  :config="config"
  v-model="modelValue"
></dy-form-generate>
<script>
  export default {
    data() {
      return {
        modelValue: {
          'input-field': '123',
          'textarea-field': '123',
        },
        config: [
          {
            label: '输入框',
            prop: 'input-field',
            component: 'input',
            formatter: value => {
              if (~value.indexOf('-formatter')) {
                return value
              }
              return `${value}-formatter`
            },
            props: {
              maxlength: '20',
              showWordLimit: true,
            },
          },
          {
            label: '大文本输入框',
            prop: 'textarea-field',
            component: 'input',
            props: {
              type: 'textarea',
              maxlength: '30',
              showWordLimit: true,
            },
          },
          {
            label: '下拉选择框',
            prop: 'select-field',
            component: 'select',
            props: {
              clearable: true,
              props: {
                label: 'name',
                value: 'code',
                children: 'options',
                disabled: 'isDisabled',
                labelRender: (label, i) => {
                  if (i.code === 'Shanghai') {
                    return this.$createElement(
                      'span',
                      { style: 'color: red' },
                      label,
                    )
                  }
                },
              },
              options: [
                {
                  name: '热门城市',
                  options: [
                    {
                      code: 'Shanghai',
                      name: '上海',
                    },
                    {
                      code: 'Beijing',
                      name: '北京',
                      isDisabled: true,
                    },
                  ],
                },
                {
                  name: '城市名',
                  options: [
                    {
                      code: 'Chengdu',
                      name: '成都',
                    },
                    {
                      code: 'Shenzhen',
                      name: '深圳',
                    },
                    {
                      code: 'Guangzhou',
                      name: '广州',
                    },
                    {
                      code: 'Dalian',
                      name: '大连',
                    },
                  ],
                },
              ],
            },
            on: {
              'visible-change': visible => {
                console.log(visible)
              },
            },
          },
          {
            label: '单选框',
            prop: 'radio-field',
            component: 'radio',
            props: {
              url: '/api/list',
              params: { page: 1, size: 4 },
              toggle: true,
            },
          },
          {
            label: '多选框',
            prop: 'checkbox-field',
            component: 'checkbox',
            props: {
              url: '/api/list',
              params: { page: 1, size: 4 },
              toggle: true,
              updateValue: ({ value }) => {
                this.$message.success(`点击了${value}`)
              },
            },
          },
        ],
      }
    },
    mounted() {
      this.getFormRef()
    },
    methods: {
      getFormRef() {
        console.log(this.$refs.formGenerateRef.$refs.DyForm)
        // or
        console.log(this.$refs.formGenerateRef.useRef())
      },
    },
  }
</script>
```

:::

### 表单项的事件

:::demo

```html
<dy-form-generate
  ref="formGenerateRef"
  :config="config"
  v-model="modelValue"
  :classSheets="classSheets"
  :itemClassSheets="itemClassSheets"
  :colClassSheets="colClassSheets"
></dy-form-generate>
<script>
  export default {
    data() {
      return {
        modelValue: {
          'input-field': '123',
          'textarea-field': '123',
        },
        config: [
          {
            label: '输入框',
            prop: 'input-field',
            component: 'input',
            formatter: value => {
              if (~value.indexOf('-formatter')) {
                return value
              }
              return `${value}-formatter`
            },
            on: {
              input: value => {
                if (~value.indexOf('-onInput')) {
                  return value
                }
                return `${value}-onInput`
              },
            },
            slots: {
              prefix: () => {
                return <i class="dy-input__icon dy-icon-search"></i>
              },
              append: () => {
                return <dy-button icon="dy-icon-search"></dy-button>
              },
            },
            props: {
              maxlength: '20',
              showWordLimit: true,
            },
          },
          {
            label: '大文本输入框',
            prop: 'textarea-field',
            component: 'input',
            props: {
              type: 'textarea',
              maxlength: '30',
              showWordLimit: true,
            },
          },
          {
            label: '下拉选择框',
            prop: 'select-field',
            component: 'select',
            props: {
              clearable: true,
              props: {
                label: 'name',
                value: 'code',
                children: 'options',
                disabled: 'isDisabled',
                labelRender: (label, i) => {
                  if (i.code === 'Shanghai') {
                    return this.$createElement(
                      'span',
                      { style: 'color: red' },
                      label,
                    )
                  }
                },
              },
              options: [
                {
                  name: '热门城市',
                  options: [
                    {
                      code: 'Shanghai',
                      name: '上海',
                    },
                    {
                      code: 'Beijing',
                      name: '北京',
                      isDisabled: true,
                    },
                  ],
                },
                {
                  name: '城市名',
                  options: [
                    {
                      code: 'Chengdu',
                      name: '成都',
                    },
                    {
                      code: 'Shenzhen',
                      name: '深圳',
                    },
                    {
                      code: 'Guangzhou',
                      name: '广州',
                    },
                    {
                      code: 'Dalian',
                      name: '大连',
                    },
                  ],
                },
              ],
            },
            on: {
              'visible-change': visible => {
                console.log(visible)
              },
            },
          },
          {
            label: '单选框',
            prop: 'radio-field',
            component: 'radio',
            props: {
              url: '/api/list',
              params: { page: 1, size: 4 },
              toggle: true,
            },
          },
          {
            label: '多选框',
            prop: 'checkbox-field',
            component: 'checkbox',
            props: {
              url: '/api/list',
              params: { page: 1, size: 4 },
              toggle: true,
              updateValue: ({ value }) => {
                this.$message.success(`点击了${value}`)
              },
            },
          },
          {
            label: '上传',
            prop: 'update-field',
            component: 'upload',
            props: {
              baseUploadURI:
                process.env.VUE_APP_UPLOAD_API || 'http://localhost:3333',
              action: '/upload',
              listType: 'picture-card',
            },
          },
        ],
        classSheets: { 'input-field': 'component-class' },
        itemClassSheets: { 'input-field': { 'item-class': true } },
        colClassSheets: {
          'input-field': ['col-class', { 'col-class-var': true }],
        },
      }
    },
    mounted() {
      this.getFormRef()
    },
    methods: {
      getFormRef() {
        console.log(this.$refs.formGenerateRef.$refs.DyForm)
        // or
        console.log(this.$refs.formGenerateRef.useRef())
      },
    },
  }
</script>
```

:::

### 扩展 Form Attributes

| 参数            | 说明                               | 类型   | 可选值 | 默认值 |
| --------------- | ---------------------------------- | ------ | ------ | ------ |
| value/v-model   | 表单数据对象                       | object | —      | —      |
| config          | 表单配置对象，具体选项看下表       | array  | —      | —      |
| classSheets     | 表单项渲染组件 class 配置          | object | —      | —      |
| itemClassSheets | 表单项 class 配置                  | object | —      | —      |
| colClassSheets  | 包裹表单项的 col 组件的 class 配置 | object | —      | —      |

### config

| 参数      | 说明                                     | 类型            | 可选值 | 默认值 |
| --------- | ---------------------------------------- | --------------- | ------ | ------ |
| component | 要渲染的表单组件,内置的 component 看下表 | string          | —      | -      |
| label     | form-item 的 label                       | string          | —      | -      |
| prop      | form-item 的 prop                        | string          | —      | -      |
| formatter | 表单项数据格式化函数                     | function(value) | —      | -      |
| props     | 渲染组件的 props                         | object          | —      | —      |
| slots     | 渲染组件的 slots                         | array           | —      | —      |
| itemProps | 表单项 form-item 的 props                | object          | —      | —      |
| colProps  | 表单项 col 的 props                      | object          | —      | —      |

### form-generate 内置的 component

| 值       | 渲染的组件           |
| -------- | -------------------- |
| input    | dy-input             |
| select   | dy-select-generate   |
| radio    | dy-radio-generate    |
| checkbox | dy-checkbox-generate |
| upload   | dy-upload-generate   |

### Form Events

| 事件名称 | 说明                   | 回调参数                                                   |
| -------- | ---------------------- | ---------------------------------------------------------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

### Form-Item Slot

| name  | 说明             |
| ----- | ---------------- |
| —     | Form Item 的内容 |
| label | 标签文本的内容   |

### Form-Item Scoped Slot

| name  | 说明                                           |
| ----- | ---------------------------------------------- |
| error | 自定义表单校验信息的显示方式，参数为 { error } |

### Form-Item Methods

| 方法名        | 说明                                                 | 参数 |
| ------------- | ---------------------------------------------------- | ---- |
| resetField    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | -    |
| clearValidate | 移除该表单项的校验结果                               | -    |
