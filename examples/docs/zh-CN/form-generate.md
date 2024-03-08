## FormGenerate Form 生成

> 基于`Form`组件的封装, 扩展了其功能

- 通过`JSON`方式的配置可以生成表单项, 灵活可应用于多数下的表单场景
- 可将组件库封装扩展的`Generate`组件注入进去也作为可配置的表单项
- 所有表单项都可选择使用默认的`Dynamic`提供的组件也可使用注入的组件
- 表单项的配置项支持: slot、on、所有在 `template` 支持的功能, 配置项都提供
- 将支持的 slot 和 scopedSlot 进行合并, 都通过 slots 进行配置
- 可以配置 component 的方式来完全自定义表单项

### 基础用法

:::demo

```html
<dy-form-generate
  ref="formGenerateRef"
  :config="config"
  v-model="modelValue"
  label-position="top"
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
            formatter: value => {
              let v = Number(value)
              return isNaN(v) ? value : v
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
            label: '时间选择框',
            prop: 'date-field',
            component: 'date',
            props: {},
          },
          {
            label: '年份选择框',
            prop: 'year-field',
            component: 'date',
            props: {
              type: 'year',
            },
          },
          {
            label: '月份选择框',
            prop: 'month-field',
            component: 'date',
            props: {
              type: 'month',
            },
          },
          {
            label: '日期时间选择框',
            prop: 'datetime-field',
            component: 'date',
            props: {
              type: 'datetime',
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
props 传入的配置对象根据你需要渲染 component 决定, 所有组件都提供 formatter 用于格式化数据
:::

### 表单项的事件

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
        modelValue: {},
        config: [
          {
            label: '输入框',
            prop: 'input-field',
            component: 'input',
            on: {
              input: value => {
                let v = Number(value)
                return isNaN(v) ? value : v
              },
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
              input: value => {
                return value
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
            on: {
              input: value => {
                console.log('radio 双向绑定自定义')
                return value
              },
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
            },
            on: {
              input: value => {
                console.log('checkbox 双向绑定自定义')
                return value
              },
            },
          },
        ],
      }
    },
  }
</script>
```

:::

:::tip
on 传入的事件监听根据你需要渲染 component 决定, 所有组件都提供 input 用于自定义双向绑定
:::

### 表单项的插槽

:::demo

```html
<dy-form-generate ref="formGenerateRef" :config="config" v-model="modelValue">
  <template #slot-field>插槽名称由prop决定</template>
</dy-form-generate>
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
            on: {
              input: value => {
                console.log('input 事件可自定义双向绑定')
                return value
              },
            },
            slots: {
              prefix: () => {
                return <i class="dy-input__icon dy-icon-search"></i>
              },
              suffix: () => {
                return <i class="dy-input__icon dy-icon1-youjian"></i>
              },
              prepend: () => {
                return 'https://'
              },
              append: () => {
                return <dy-button icon="dy-icon-search"></dy-button>
              },
            },
            itemSlots: {
              label: () => {
                return 'dy-输入框'
              },
              error: ({ error }) => {
                return <div style="color: green; font-size: 12px">{error}</div>
              },
            },
            itemProps: {
              required: true,
              rules: [{ required: true, message: '必填' }],
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
              },
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
            slots: {
              prefix: () => {
                return <i class="dy-input__icon dy-icon-search"></i>
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
            slots: {
              tip: () => {
                return (
                  <dy-alert
                    style="line-height: normal; margin-top: 20px;"
                    title="tip slot"
                    type="info"
                    show-icon
                  ></dy-alert>
                )
              },
            },
          },
          // 通过form-item default slot添加自定义内容
          {
            label: '自定义内容-1',
            prop: 'default-slot-field',
            component: 'input',
            itemSlots: {
              default: () => {
                return <div>通过form-item default slot添加自定义内容</div>
              },
            },
          },
          // 通过component: template 自定义slot
          {
            label: '自定义内容-2',
            prop: 'slot-field',
            component: 'slot',
          },
          // 通过component: defalut function 自定义slot
          {
            label: '自定义内容-3',
            prop: 'slot-function-field',
            component: 'slot',
            default: () => {
              return <div>render函数渲染插槽内容</div>
            },
          },
        ],
      }
    },
  }
</script>
```

:::

:::tip
slot 传入的 slot 根据你需要渲染 component 决定
itemSlots 渲染的是`form-item`的 slot、scopedSlot
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
| slots     | 渲染组件的 slots                         | object          | —      | —      |
| itemSlots | 渲染组件的 itemSlots                     | object          | —      | —      |
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
