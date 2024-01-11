## FormGenerate Form 生成

> 基于`Form`组件的封装, 扩展了及功能

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
