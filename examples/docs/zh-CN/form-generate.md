## FormGenerate Form 生成

> 基于`Form`组件的封装, 扩展了其功能

- 通过`JSON`方式的配置可以生成表单项, 灵活可应用于多数下的表单场景
- 可将组件库封装扩展的`Generate`组件注入进去也作为可配置的表单项
- 所有表单项都可选择使用默认的`Dynamic`提供的组件也可使用注入的组件
- 表单项的配置项支持: slot、on、所有在 `template` 支持的功能, 配置项都提供
- 将支持的 slot 和 scopedSlot 进行合并, 都通过 slots 进行配置
- 可以配置 component 的方式来完全自定义表单项
- 支持深度属性来绑定值

### 基础用法

:::demo

```html
<dy-form-generate
  ref="formGenerateRef"
  :config="config"
  v-model="modelValue"
  labdy-position="top"
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
              url: this.$root.URL.getList,
              params: { page: 1, size: 4 },
              toggle: true,
            },
          },
          {
            label: '多选框',
            prop: 'checkbox-field',
            component: 'checkbox',
            props: {
              url: this.$root.URL.getList,
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
      this.getFormItemsRef()
      this.getComponentsRef()
    },
    methods: {
      getFormRef() {
        console.log(this.$refs.formGenerateRef.$refs.DyForm)
        // or
        console.log(this.$refs.formGenerateRef.useRef())
      },
      getFormItemsRef() {
        const refs = this.config.map(i => {
          return this.$refs.formGenerateRef.useFormItemRef(i.prop)
        })
        console.log(refs, 'formItemRef')
      },
      getComponentsRef() {
        const refs = this.config.map(i => {
          return this.$refs.formGenerateRef.useComponentRef(i.prop)
        })
        console.log(refs, 'componentRef')
      },
    },
  }
</script>
```

:::

:::tip
props 传入的配置对象根据你需要渲染 component 决定, 所有组件都提供 formatter 用于格式化数据
:::

### 深度属性

:::demo

```html
<dy-form-generate
  :config="config"
  :rules="rules"
  v-model="modelValue"
  labdy-position="top"
></dy-form-generate>
<script>
  export default {
    data() {
      const requiredRule = {
        required: true,
        message: '不能为空',
      }
      return {
        modelValue: {},
        rules: {
          'obj.input-field': requiredRule,
          'obj.select-field': requiredRule,
          'obj.radio-field': requiredRule,
          'obj.checkbox-field': requiredRule,
          'obj.date-field': requiredRule,
        },
        config: [
          {
            label: '输入框',
            prop: 'obj.input-field',
            component: 'input',
          },
          {
            label: '下拉选择框',
            prop: 'obj.select-field',
            component: 'select',
            props: {
              clearable: true,
              url: this.$root.URL.getList,
            },
          },
          {
            label: '单选框',
            prop: 'obj.radio-field',
            component: 'radio',
            props: {
              url: this.$root.URL.getList,
              params: { page: 1, size: 4 },
              toggle: true,
            },
          },
          {
            label: '多选框',
            prop: 'obj.checkbox-field',
            component: 'checkbox',
            props: {
              url: this.$root.URL.getList,
              params: { page: 1, size: 4 },
            },
          },
          {
            label: '时间选择框',
            prop: 'obj.date-field',
            component: 'date',
          },
        ],
      }
    },
    watch: {
      modelValue: {
        handler(v) {
          console.log(v)
        },
        deep: true,
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
              url: this.$root.URL.getList,
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
              url: this.$root.URL.getList,
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

### 表单操作

:::demo

```html
<dy-descriptions
  title="详情数据"
  direction="vertical"
  :column="config.length"
  border
>
  <template #extra>
    <dy-row type="flex" justify="end">
      <dy-col>
        <dy-button type="text" @click="editHandle">编辑</dy-button>
        <dy-button type="text" @click="viewHandle">详情</dy-button>
      </dy-col>
    </dy-row>
  </template>
  <dy-descriptions-item :label="i.label" v-for="i of config" :key="i.prop">
    {{detailModel[i.prop] || '-'}}
  </dy-descriptions-item>
</dy-descriptions>

<dy-dialog-generate
  :visible.sync="dialogVisible"
  :operateType="operateType"
  :buttons="buttons"
  :disabled="disabled"
  @cancel="cancelHandle"
  @save="saveHandle"
  width="50%"
>
  <dy-form-generate
    ref="formRef"
    :rules="rules"
    :disabled="disabled"
    label-position="top"
    :config="config"
    v-model="modelValue"
  ></dy-form-generate>
</dy-dialog-generate>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        operateType: 'edit',
        buttons: ['cancel', 'save'],
        detailModel: {},
        modelValue: {},
        disabled: false,
        config: [
          {
            label: '输入框',
            prop: 'input-field',
            component: 'input',
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
          },
          {
            label: '单选框',
            prop: 'radio-field',
            component: 'radio',
            props: {
              url: this.$root.URL.getList,
              params: { page: 1, size: 4 },
              toggle: true,
            },
          },
          {
            label: '多选框',
            prop: 'checkbox-field',
            component: 'checkbox',
            props: {
              url: this.$root.URL.getList,
              params: { page: 1, size: 4 },
              toggle: true,
            },
          },
        ],
      }
    },
    computed: {
      rules({ config }) {
        return config.reduce((o, i) => {
          o[i.prop] = [{ required: true, message: '不能为空' }]
          return o
        }, {})
      },
    },
    methods: {
      editHandle() {
        this.dialogVisible = true
        this.disabled = false
        this.operateType = 'edit'
        this.modelValue = { ...this.detailModel }
      },
      viewHandle() {
        this.dialogVisible = true
        this.disabled = true
        this.operateType = 'view'
        this.modelValue = { ...this.detailModel }
      },
      cancelHandle([showloading, hideLoading]) {
        this.dialogVisible = false
      },
      saveHandle([showloading, hideLoading]) {
        this.$refs.formRef
          .validate()
          .then(() => {
            this.detailModel = { ...this.modelValue }
            this.dialogVisible = false
          })
          .catch(err => {
            console.log(err)
          })
      },
    },
  }
</script>
```

:::

### 表单项联动

:::demo

```html
<dy-form-generate
  ref="formGenerateRef"
  label-width="120px"
  :config="config"
  :isDisableds="isDisableds"
  v-model="modelValue"
>
  <template #slot-field>插槽名称由prop决定</template>
</dy-form-generate>

<script>
  export default {
    data() {
      return {
        modelValue: {},
        options: [
          {
            name: '是',
            code: '1',
          },
          {
            name: '否',
            code: '2',
          },
        ],
        config: [],
        isDisableds: {
          'form-control-input-field': model => {
            return model['form-control-field'] === '1'
          },
        },
      }
    },
    created() {
      this.config = [
        {
          label: 'isDisabled',
          prop: 'disabled-field',
          component: 'select',
          span: 12,
          props: {
            props: this.useOptionProps(),
            options: this.options,
          },
        },
        {
          label: 'disabled',
          prop: 'disabled-input-field',
          component: 'input',
          span: 12,
          isDisabled: model => {
            return model['disabled-field'] === '1'
          },
          props: {
            placeholder: '值为是禁用',
          },
        },
        {
          label: 'isReadonly',
          prop: 'readonly-field',
          component: 'select',
          span: 12,
          props: {
            props: this.useOptionProps(),
            options: this.options,
          },
        },
        {
          label: 'readonly',
          prop: 'readonly-input-field',
          component: 'input',
          span: 12,
          isReadonly: model => {
            return model['readonly-field'] === '1'
          },
          props: {
            placeholder: '值为是只读',
          },
        },
        {
          label: 'isRender',
          prop: 'render-field',
          component: 'select',
          span: 12,
          props: {
            props: this.useOptionProps(),
            options: this.options,
          },
        },
        {
          label: 'render',
          prop: 'render-input-field',
          component: 'input',
          span: 12,
          isRender: model => {
            return model['render-field'] === '1'
          },
          props: {
            placeholder: '值为是渲染',
          },
        },
        {
          label: 'props control disabled',
          prop: 'control-field',
          component: 'select',
          span: 12,
          props: {
            props: this.useOptionProps(),
            options: this.options,
          },
          on: {
            change: v => {
              const isControlDisabled = v === '1'
              const n = this.config.find(i => i.prop === 'control-input-field')
              n.props.disabled = isControlDisabled
            },
          },
        },
        {
          label: 'props disabled',
          prop: 'control-input-field',
          component: 'input',
          span: 12,
          isDisabled: () => {
            return true
          },
          props: {
            disabled: false,
            placeholder: '通过 props 也可以控制',
          },
        },
        {
          label: 'form control disabled',
          prop: 'form-control-field',
          component: 'select',
          span: 12,
          props: {
            props: this.useOptionProps(),
            options: this.options,
          },
        },
        {
          label: 'props disabled',
          prop: 'form-control-input-field',
          component: 'input',
          span: 12,
          props: {
            placeholder: '通过全局的isDisableds也可以控制',
          },
        },
      ]
    },
    methods: {
      useOptionProps() {
        return {
          label: 'name',
          value: 'code',
        }
      },
    },
  }
</script>
```

:::

:::tip
isDisabled、isReadonly、isRender 分别控制表单项的禁用、只读、渲染;
**props.disabled 的优先级大于前者**
:::

### 问卷表单

:::demo

```html
<dy-form-generate
  ref="formGenerateRef"
  label-position="top"
  :config="config"
  v-model="modelValue"
></dy-form-generate>

<script>
  export default {
    data() {
      return {
        modelValue: {},
        config: [],
      }
    },
    created() {
      this.config = [
        {
          label: '改造方式',
          prop: 'renMethod',
          component: 'radio',
          props: {
            url: this.$root.URL.getRenMethodList,
          },
          cascaderConfig: [
            {
              prop: 'renMethodRemark',
              component: 'input',
              isRender: model => {
                return model.renMethod === 0
              },
              props: {
                placeholder: '请输入其他改造方式',
                maxlength: 200,
                showWordLimit: true,
              },
            },
          ],
        },
        {
          label: '现企业的主要融资渠道',
          prop: 'finChannel',
          component: 'checkbox',
          props: {
            url: this.$root.URL.getFinChannelList,
          },
          cascaderConfig: [
            {
              prop: 'finChannelRemark',
              component: 'input',
              isRender: model => {
                return model.finChannel?.includes(0)
              },
              props: {
                maxlength: 200,
                showWordLimit: true,
                placeholder: '请输入其他融资渠道',
              },
            },
          ],
        },
        {
          label: '现企业是否存在改造范围内的不动产权证抵押情况',
          prop: 'mortgage',
          component: 'radio',
          props: {
            options: [
              {
                label: '存在',
                value: 1,
              },
              {
                label: '不存在',
                value: 2,
              },
            ],
          },
          cascaderConfig: [
            {
              label: '贷款银行',
              labelWidth: '80px',
              prop: 'mortgageBank',
              component: 'input',
              span: 6,
              isRender: model => {
                return model.mortgage === 1
              },
              props: {
                maxlength: 100,
                showWordLimit: true,
              },
            },
            {
              label: '贷款金额',
              prop: 'mortgageNum',
              component: 'input',
              span: 6,
              isRender: model => {
                return model.mortgage === 1
              },
              slots: {
                append: () => '元',
              },
            },
            {
              label: '贷款利率',
              prop: 'mortgageRate',
              component: 'input',
              span: 6,
              isRender: model => {
                return model.mortgage === 1
              },
            },
            {
              label: '贷款年限',
              prop: 'mortgagePeriod',
              component: 'input',
              span: 6,
              isRender: model => {
                return model.mortgage === 1
              },
              slots: {
                append: () => '年',
              },
            },
          ],
        },
        {
          label: '现企业在融资方面是否存在困难',
          prop: 'finThereCulty',
          component: 'radio',
          props: {
            options: [
              {
                label: '是，困难大',
                value: 1,
              },
              {
                label: '是，困难不大',
                value: 2,
              },
              {
                label: '没有困难',
                value: 3,
              },
            ],
          },
          cascaderConfig: [
            {
              label: '现企业的主要融资渠道（限选5项）',
              prop: 'finThereCultyDec',
              component: 'checkbox',
              isRender: model => {
                const ind = [1, 2]
                return ind.includes(model.finThereCulty)
              },
              props: {
                url: this.$root.URL.getFinThereCultyList,
                max: 5,
              },
              cascaderConfig: [
                {
                  prop: 'finThereCultyRemark',
                  component: 'input',
                  isRender: model => {
                    return model.finThereCultyDec.includes(0)
                  },
                  props: {
                    maxlength: 200,
                    showWordLimit: true,
                    placeholder: '请输入其他原因',
                  },
                },
              ],
            },
          ],
        },
      ]
    },
    methods: {
      useOptionProps() {
        return {
          label: 'name',
          value: 'code',
        }
      },
    },
  }
</script>
```

:::

:::tip
cascaderConfig 渲染的结构是当前表单项的子节点
:::

### 使用帮助方法

:::demo

```html
<dy-form-generate
  :config="config"
  v-model="modelValue"
  labdy-position="top"
></dy-form-generate>
<script>
  import { genFormConfig } from 'dynamic-ui/src/helper/props.js'

  export default {
    data() {
      return {
        modelValue: {},
        config: [
          {
            label: '输入框',
            prop: 'input-field',
            component: 'input',
          },
          {
            label: '下拉选择框',
            prop: 'select-field',
            component: 'select',
            props: {
              url: this.$root.URL.getList,
            },
          },
          {
            label: '单选框',
            prop: 'radio-field',
            component: 'radio',
            props: {
              url: this.$root.URL.getList,
              params: { page: 1, size: 4 },
              toggle: true,
            },
          },
          {
            label: '单选框',
            prop: 'radio2-field',
            component: 'radio',
            props: {
              url: this.$root.URL.getList,
              params: { page: 1, size: 4 },
              toggle: true,
              group: false,
            },
          },
          {
            label: '多选框',
            prop: 'checkbox-field',
            component: 'checkbox',
            props: {
              url: this.$root.URL.getList,
              params: { page: 1, size: 4 },
            },
          },
          {
            label: '时间选择框',
            prop: 'date-field',
            component: 'date',
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
        ],
      }
    },
    created() {
      genFormConfig(this.config, {
        placeholder: this.config.map(i => i.prop),
        trim: ['input-field'],
        number: ['input-field'],
        required: this.config.map(i => i.prop),
      })
    },
    methods: {},
  }
</script>
```

:::

:::tip
genFormConfig 配置中的生成方法可以通过全局配置自定义, 配置方式如下
:::

```js
import Dynamic from 'dynamic-ui'
Vue.use(Dynamic, {
  // placeholder 配置对应的生成方法
  genPlaceholder: option => {
    // option表单项
  },
  // modifiers 配置对应的生成方法
  genModifiers: (option, { trim, number }) => {
    // option表单项
  },
  // required 配置对应的生成方法
  genRequired: option => {
    // option表单项
  },
})
```

### 使用帮助方法

:::demo

```html
<dy-form-generate
  :config="config"
  v-model="modelValue"
  labdy-position="top"
></dy-form-generate>
<script>
  import { genFormConfig } from 'dynamic-ui/src/helper/props.js'
  import {
    generateValidateByRegExp,
    REG_PATTERN,
  } from 'dynamic-ui/src/helper/form.js'

  export default {
    data() {
      return {
        modelValue: {},
        config: [
          {
            label: '正整数',
            prop: 'integer-field',
            component: 'input',
            itemProps: {
              rules: {
                validator: generateValidateByRegExp(REG_PATTERN.NUM),
                message: '请输入正整数',
              },
            },
          },
          {
            label: '小数',
            prop: 'decimal-field',
            component: 'input',
          },
          {
            label: '负数',
            prop: 'minus-field',
            component: 'input',
          },
          {
            label: '小数(保留两位小数)',
            prop: 'decimal-2-field',
            component: 'input',
          },
        ],
      }
    },
    created() {
      genFormConfig(this.config, {
        placeholder: this.config.map(i => i.prop),
      })
    },
    methods: {},
  }
</script>
```

:::

:::tip
genFormConfig 配置中的生成方法可以通过全局配置自定义, 配置方式如下
:::

### 扩展 Form Attributes

| 参数            | 说明                               | 类型   | 可选值 | 默认值 |
| --------------- | ---------------------------------- | ------ | ------ | ------ |
| value/v-model   | 表单数据对象                       | object | —      | —      |
| config          | 表单配置对象，具体选项看下表       | array  | —      | —      |
| classSheets     | 表单项渲染组件 class 配置          | object | —      | —      |
| itemClassSheets | 表单项 class 配置                  | object | —      | —      |
| colClassSheets  | 包裹表单项的 col 组件的 class 配置 | object | —      | —      |
| isDisableds     | 控制表单项 disabled                | object | —      | —      |
| isReadonlys     | 控制表单项 readonly                | object | —      | —      |
| isRenders       | 控制表单项 render                  | object | —      | —      |

### config

| 参数           | 说明                                     | 类型            | 可选值 | 默认值 |
| -------------- | ---------------------------------------- | --------------- | ------ | ------ |
| component      | 要渲染的表单组件,内置的 component 看下表 | string          | —      | -      |
| label          | form-item 的 label                       | string          | —      | -      |
| prop           | form-item 的 prop                        | string          | —      | -      |
| formatter      | 表单项数据格式化函数                     | function(value) | —      | -      |
| props          | 渲染组件的 props                         | object          | —      | —      |
| slots          | 渲染组件的 slots                         | object          | —      | —      |
| itemSlots      | 渲染组件的 itemSlots                     | object          | —      | —      |
| itemProps      | 表单项 form-item 的 props                | object          | —      | —      |
| colProps       | 表单项 col 的 props                      | object          | —      | —      |
| isDisabled     | 控制表单项 disabled                      | function        | —      | —      |
| isReadonly     | 控制表单项 readonly                      | function        | —      | —      |
| isRender       | 控制表单项 render                        | function        | —      | —      |
| cascaderConfig | config(递归渲染)                         | array           |

### form-generate 内置的 component

| 值       | 渲染的组件           |
| -------- | -------------------- |
| input    | dy-input             |
| select   | dy-select-generate   |
| radio    | dy-radio-generate    |
| checkbox | dy-checkbox-generate |
| upload   | dy-upload-generate   |
