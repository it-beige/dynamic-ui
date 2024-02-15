## SelectGenerate Select 生成

> 基于`Select`组件的封装, 扩展了及功能

- 传入 `URL` 自动请求数据来渲染组件
- 支持懒加载数据
- 参数监听, 值变动后根据新值自动请求数据
- 对`GroupOption`和`Option`组件进行了整合

### 基础用法

:::demo

```html
<dy-select-generate
  class="base-select"
  v-model="value"
  :options="options"
  :props="props"
  ref="selectGenerateRef"
  clearable
></dy-select-generate>

<script>
  export default {
    data() {
      return {
        props: {
          disabled: 'disabled',
        },
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
      this.getSelectRef()
    },
    methods: {
      getSelectRef() {
        console.log(this.$refs.selectGenerateRef.$refs.DySelect)
        // or
        console.log(this.$refs.selectGenerateRef.useRef())
      },
    },
  }
</script>
```

当组件中注入`options`对象数组后，组件内会根据数据渲染出`dy-option`组件。
:::

:::warning
这里的 label 和 value 能自动映射到 option, 是在注册 Dynamic 通过全局配置了`useOptionProps`, 在使用的组件中传入的`props`会和全局的 `useOptionProps` 的返回值进行合并
:::

```js
import Dynamic from 'main/index.js'
Vue.use(Dynamic, {
  // 配置需要data数据项的展示项和绑定值
  useOptionProps: () => ({
    label: 'label',
    value: 'value',
    children: 'children',
  }),
})
```

### 树形数据

:::demo

```html
<dy-select-generate
  :props="props"
  v-model="value"
  :options="options"
  :formatter="formatter"
  clearable
></dy-select-generate>

<script>
  export default {
    data() {
      return {
        value: '',
        props: {
          label: 'name',
          value: 'code',
          children: 'options',
          disabled: 'isDisabled',
          labelRender: (label, i) => {
            if (i.code === 'Shanghai') {
              return this.$createElement('span', { style: 'color: red' }, label)
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
      }
    },
    methods: {
      formatter(i) {
        let ret = {}
        if (i.name === '成都') {
          ret.name = `${i.name}-${i.code}`
        }
        if (i.name === '城市名') {
          ret.isDisabled = true
        }
        return ret
      },
    },
  }
</script>
```

下面的示例完整的展示了`props` 提供了所有配置项功能
:::

:::warning
需要注意的是 formatter 返回的属性取决于`props`中 label、value
、children、disabled 配置的属性名称是什么
:::

### Slot 用法

:::demo

```html
<dy-select-generate
  v-model="value"
  :options="options"
  :props="props"
  clearable
  @visible-change="visibleChange"
>
  <template #prefix>
    <i class="dy-input__icon dy-icon-search"></i>
  </template>
  <template #empty>
    <div
      style="height: 100px; display: flex; justify-content: center; align-items: center;"
    >
      正在请求数据
    </div>
  </template>
  <template #option="{props, i}">
    <dy-option v-bind="props"></dy-option>
  </template>
</dy-select-generate>

<script>
  export default {
    data() {
      return {
        props: {
          label: 'name',
          value: 'code',
          disabled: 'disabled',
        },
        value: '',
        options: [],
      }
    },
    methods: {
      getOptions() {
        setTimeout(() => {
          this.options = [
            {
              name: '选项1',
              code: '黄金糕',
              disabled: true,
            },
            {
              name: '选项2',
              code: '双皮奶',
            },
            {
              name: '选项3',
              code: '蚵仔煎',
            },
            {
              name: '选项4',
              code: '龙须面',
            },
            {
              name: '选项5',
              code: '北京烤鸭',
            },
          ]
        }, 1000 * 5)
      },
      visibleChange() {
        this.getOptions()
      },
    },
  }
</script>
```

在`option`的`ScopedSlot` 中接受个两个对象, props 为映射之后 label、value、disabled、children 属性对应的`值`, i 为当前数据

:::

### 自动请求数据

:::demo

```html
<dy-select-generate
  v-model="value"
  clearable
  baseURI="dev"
  url="/api/list"
  method="get"
  :params="params"
  :use-request="axios"
  :use-parse-data="useParseData"
  :use-parse-total="useParseTotal"
></dy-select-generate>

<script>
  export default {
    data() {
      return {
        value: '',
        url: '/api/list',
        params: {
          a: 1,
          b: 2,
        },
      }
    },
    methods: {
      // 模拟接口请求
      axios() {
        const vm = this
        return function request({ url, params }) {
          vm.$message.success({
            message: `接口请求: url: ${url} params: ${JSON.stringify(params)}`,
            duration: 5000,
          })
          return new Promise(resolve => {
            setTimeout(() => {
              const options = [
                {
                  value: '选项1',
                  label: '黄金糕',
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
                {
                  value: '选项11',
                  label: '黄金糕11',
                },
                {
                  value: '选项22',
                  label: '双皮奶22',
                },
                {
                  value: '选项33',
                  label: '蚵仔煎33',
                },
                {
                  value: '选项44',
                  label: '龙须面44',
                },
                {
                  value: '选项55',
                  label: '北京烤鸭55',
                },
              ]
              resolve({
                data: { list: options, total: 10 },
                code: '200',
              })
            }, 1000 * 5)
          })
        }
      },
      useParseData(res) {
        return res.data.list
      },
      useParseTotal(res) {
        return res.data.total
      },
    },
  }
</script>
```

下面的示例中在当前组件所涉及到数据请求相关配置都进行了自定义, 一般在项目中使用都会进行全局配置, 只要涉及到数据自动请求的组件都提供自定义配置能力
:::

**模拟数据请求, 全局配置**

`examples/api/request`

```javascript
import Message from 'packages/message/index.js'

export const API = {
  getList: '/api/list',
  getTreeList: '/api/tree',
}

const successResponse = {
  code: '200',
}

export const data = {
  list: {
    ...successResponse,
    data: [
      {
        value: '选项1',
        label: '黄金糕',
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
      {
        value: '选项11',
        label: '黄金糕11',
      },
      {
        value: '选项22',
        label: '双皮奶22',
      },
      {
        value: '选项33',
        label: '蚵仔煎33',
      },
      {
        value: '选项44',
        label: '龙须面44',
      },
      {
        value: '选项55',
        label: '北京烤鸭55',
      },
    ],
  },
  tree: {
    ...successResponse,
    data: [
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
}

export default function axios({ url, params }) {
  Message.success({
    message: `接口请求: url: ${url} params: ${JSON.stringify(params)}`,
    duration: 5000,
  })
  let response
  if (url === API.getList) {
    response = data.list
  } else if (url === API.getTreeList) {
    response = data.tree
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response)
    }, 5000)
  })
}
```

:::warning
下面的用法才是在项目中会常用的方式
:::

```javascript
import Vue from 'vue'
import Dynamic from 'dynamic-ui'
import { isPlainObject, isArray } from 'dynamic-ui/utils/lodash'
import axios from 'examples/api/request'

Vue.use(Dynamic, {
  // 数据请求的baseURI
  baseURI: process.env.VUE_APP_BASE_API || 'dev',
  // 分页参数字段名 page size
  pageParamsKey: { page: 'page', size: 'size' },
  // 分页默认的参数值
  pageParamsValue: { page: 1, size: 10 },
  //  自定义组件内部请求接口所使用方法
  useRequest: () => axios,
  // 请求接口默认携带的请求头参数, 项目中一般需要携带的鉴权token
  useRequestHeaders: () => ({
    'Dynamic-Auth': localStorage.getItem('access_token'),
  }),
  // 自定义解析数据接口返回的data
  useParseData: res => {
    const noop = []
    return isPlainObject(res.data)
      ? isArray(res.data.list)
        ? res.data.list
        : isArray(res.data.data)
        ? res.data.data
        : noop
      : isArray(res.data)
      ? res.data
      : noop
  },
  // 自定义解析数据接口返回的total
  useParseTotal: res => {
    const total = 0
    return isPlainObject(res.data)
      ? Reflect.has(res.data, 'total')
        ? res.data.total
        : total
      : Reflect.has(res, 'total')
      ? res.total
      : total
  },
  // 配置需要data数据项的展示项和绑定
  useOptionProps: () => ({
    label: 'label',
    value: 'value',
    children: 'children',
  }),
})
```

:::demo

```html
<dy-select-generate
  v-model="value"
  clearable
  url="/api/list"
  :params="params"
  :resolve-data="resolveData"
></dy-select-generate>

<script>
  export default {
    data() {
      return {
        value: '',
        url: '/api/list',
        params: {
          a: 1,
          b: 2,
        },
      }
    },
    methods: {
      // 获取自动请求已经解析好的数据
      resolveData(options) {
        console.log(options)
      },
    },
  }
</script>
```

:::

### 请求懒加载

:::demo

```html
<dy-select-generate
  v-model="value"
  clearable
  lazy
  url="/api/list"
  filterable
  :params="params"
  :resolve-data="resolveData"
></dy-select-generate>

<script>
  export default {
    data() {
      return {
        value: '',
        url: '/api/list',
        params: {
          a: 1,
          b: 2,
        },
      }
    },
    methods: {
      // 获取自动请求已经解析好的数据
      resolveData(options) {
        console.log(options)
      },
    },
  }
</script>
```

:::

### 分页请求

:::demo

```html
<dy-select-generate
  v-model="value"
  clearable
  url="/api/list"
  filterable
  pagination
  :params="params"
  :resolve-data="resolveData"
></dy-select-generate>

<script>
  export default {
    data() {
      return {
        value: '',
        url: '/api/list',
        params: {
          a: 1,
          b: 2,
        },
      }
    },
    methods: {
      // 获取自动请求已经解析好的数据
      resolveData(options) {
        console.log(options)
      },
    },
  }
</script>
```

:::

### 参数监听

:::demo

```html
<dy-select-generate
  v-model="value"
  clearable
  lazy
  :showLoading="false"
  :url="url"
  filterable
  :props="props"
  :params="params"
  :resolve-data="resolveData"
  :pageParamsKey="pageParamsKey"
  :pageParamsValue="pageParamsValue"
  @load="loadHandle"
></dy-select-generate>

<dy-button type="primary" style="margin-left: 10px" @click="changeType('list')">
  请求数据list
</dy-button>
<dy-button type="primary" @click="changeType('tree')">请求数据tree</dy-button>

<script>
  export default {
    data() {
      const requestMaps = new Map([
        [
          'list',
          {
            url: '/api/list',
            params: {
              type: 'list',
            },
            props: {
              label: 'label',
              value: 'value',
            },
          },
        ],
        [
          'tree',
          {
            url: '/api/tree',
            params: {
              type: 'tree',
            },
            props: {
              label: 'name',
              value: 'code',
              children: 'options',
            },
          },
        ],
      ])
      const reqOptions = requestMaps.get('list')
      return {
        value: '',
        ...reqOptions,
        requestMaps,
        // 分页参数字段名 page size
        pageParamsKey: { page: 'pageNo', size: 'pageSize' },
        // 分页默认的参数值
        pageParamsValue: { pageNo: 1, pageSize: 10 },
      }
    },
    methods: {
      // 获取自动请求已经解析好的数据
      resolveData(options) {
        console.log(options)
      },
      loadHandle() {
        this.$message({
          type: 'waring',
          message: '请求中...',
        })
      },
      changeType(type) {
        const { url, params, props } = this.requestMaps.get(type)
        this.url = url
        this.params = params
        this.props = props
        this.pageParamsValue.pageSize = type === 'tree' ? 3 : 10
      },
    },
  }
</script>
```

通过参数监听, 只要任何参数变动都会自动请求, 需要注意的是如果 url 进行变动了, page、size 数据会重置, 如果 lazy 为 true, 分页会重新计算
:::

- 组件内部对同时修改 url、params、data, method 其中的任何两个及以上, 只会对最新的一次修改进行生效, 这么做的目的是防止接口在同个操作内修改多次值导致请求多次

- 组件内对 pageParamsValue 也进行了`watch`, 如果修改`pageParamsValue`也会触发重新请求, 用此方式也可以进行实现懒加载相关逻辑

:::warning
`url`、`pageParamsValue` 的变动势必会重新变动接口请求的数据, 所以涉及这两个的变动 **会重置`value`的值**。
:::

### Request 提供的 Select Attributes

组件引入`mixins/request`会提供数据请求相关支持的 attrs

| 参数                   | 说明                                       | 类型     | 可选值      | 默认值                           |
| ---------------------- | ------------------------------------------ | -------- | ----------- | -------------------------------- |
| baseURI                | 数据请求的 baseURI                         | string   | —           | globalConfig.baseURI             |
| useRequestHeaders      | 请求头                                     | function | —           | globalConfig.useRequestHeaders() |
| useRequest             | 请求数据的方法                             | function | —           | globalConfig.useRequest()        |
| useParseData           | 解析数据的方法                             | function | —           | globalConfig.useParseData()      |
| useParseTotal          | 解析 total 的方法                          | function | —           | globalConfig.useParseTotal()     |
| resolveData            | 获取请求接口的数据                         | function | —           | []                               |
| url                    | 异步获取配置项与 options 互斥              | string   |             |                                  |
| method                 | 请求方式「需配合`url`使用」                | string   | RESTful API | GET                              |
| params                 | query 参数「需配合`url`使用」              | object   | —           | {}                               |
| data                   | body 参数「需配合`url`使用」               | object   | —           | {}                               |
| pageParamsKey          | 分页参数字段名                             | object   | —           | globalConfig.pageParamsKey       |
| pageParamsValue        | 分页参数值                                 | object   | —           | globalConfig.pageParamsValue     |
| disabledRequest        | 是否禁止异步的请求「需配合`url`使用」      | boolean  | —           | false                            |
| lazy                   | 是否懒加载「需配合`url`使用」              | boolean  | —           | false                            |
| loadMoreMethod         | 懒加载方法「需`lazy`为 true」              | function | —           | globalConfig.loadMoreMethod      |
| infiniteScrollDistance | 触发加载的距离阈值，单位为 px              | number   | —           | 50                               |
| remote-method          | 远程搜索方法                               | function | —           | —                                |
| showLoading            | 懒加载中 loading「需`lazy`为 true」        | boolean  | —           | true」                           |
| dynamicLoadingText     | 加载时显示的文字「需`showLoading`为 true」 | string   | —           | 数据加载中                       |

### Pagination 提供的 Attributes

组件通过引入帮助函数可以生成`Pagination`的 prop

```js
import Ctor from 'dynamic-ui/src/mixins/pagination.js'

const props = new Ctor({
  small: true,
})


// 组件参数传入
<dy-select-generate
  :paginationProps="props"
></dy-select-generate>
```

| 参数                | 说明                                                                                                                  | 类型     | 可选值                                                            | 默认值                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------- | -------------------------------------- |
| small               | 是否使用小型分页样式                                                                                                  | boolean  | —                                                                 | false                                  |
| background          | 是否为分页按钮添加背景色                                                                                              | boolean  | —                                                                 | false                                  |
| page-size           | 每页显示条目个数，支持 .sync 修饰符                                                                                   | number   | —                                                                 | 10                                     |
| total               | 总条目数                                                                                                              | number   | —                                                                 | —                                      |
| page-count          | 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性 | Number   | —                                                                 | —                                      |
| pager-count         | 页码按钮的数量，当总页数超过该值时会折叠                                                                              | number   | 大于等于 5 且小于等于 21 的奇数                                   | 7                                      |
| current-page        | 当前页数，支持 .sync 修饰符                                                                                           | number   | —                                                                 | 1                                      |
| layout              | 组件布局，子组件名用逗号分隔                                                                                          | String   | `sizes`, `prev`, `pager`, `next`, `jumper`, `->`, `total`, `slot` | 'prev, pager, next, jumper, ->, total' |
| page-sizes          | 每页显示个数选择器的选项设置                                                                                          | number[] | —                                                                 | [10, 20, 30, 40, 50, 100]              |
| popper-class        | 每页显示个数选择器的下拉框类名                                                                                        | string   | —                                                                 | —                                      |
| prev-text           | 替代图标显示的上一页文字                                                                                              | string   | —                                                                 | —                                      |
| next-text           | 替代图标显示的下一页文字                                                                                              | string   | —                                                                 | —                                      |
| disabled            | 是否禁用                                                                                                              | boolean  | —                                                                 | false                                  |
| hide-on-single-page | 只有一页时是否隐藏                                                                                                    | boolean  | —                                                                 | -                                      |

### Events

| 事件名称       | 说明                               | 回调参数 |
| -------------- | ---------------------------------- | -------- |
| size-change    | pageSize 改变时会触发              | 每页条数 |
| current-change | currentPage 改变时会触发           | 当前页   |
| prev-click     | 用户点击上一页按钮改变当前页后触发 | 当前页   |
| next-click     | 用户点击下一页按钮改变当前页后触发 | 当前页   |

### 扩展 Select Attributes

| 参数      | 说明                 | 类型     | 可选值 | 默认值                  |
| --------- | -------------------- | -------- | ------ | ----------------------- |
| props     | 配置选项，具体看下表 | object   | —      | global.useOptionProps() |
| formatter | 格式化 option 数据   | function | —0     | -                       |

### props

| 参数     | 说明                           | 类型   | 可选值 | 默认值   |
| -------- | ------------------------------ | ------ | ------ | -------- |
| label    | option 组件的 label 属性       | string | —      | label    |
| value    | option 组件的 value 属性       | string | —      | value    |
| children | 指定子树为节点对象的某个属性值 | string | —      |          |
| disabled | 子节点否禁用的属性值           | string | —      | children |

### Select Attributes

| 参数                  | 说明                                                                           | 类型                      | 可选值            | 默认值     |
| --------------------- | ------------------------------------------------------------------------------ | ------------------------- | ----------------- | ---------- |
| value / v-model       | 绑定值                                                                         | boolean / string / number | —                 | —          |
| multiple              | 是否多选                                                                       | boolean                   | —                 | false      |
| disabled              | 是否禁用                                                                       | boolean                   | —                 | false      |
| value-key             | 作为 value 唯一标识的键名，绑定值为对象类型时必填                              | string                    | —                 | value      |
| size                  | 输入框尺寸                                                                     | string                    | medium/small/mini | —          |
| clearable             | 是否可以清空选项                                                               | boolean                   | —                 | false      |
| collapse-tags         | 多选时是否将选中值按文字的形式展示                                             | boolean                   | —                 | false      |
| multiple-limit        | 多选时用户最多可以选择的项目数，为 0 则不限制                                  | number                    | —                 | 0          |
| name                  | select input 的 name 属性                                                      | string                    | —                 | —          |
| autocomplete          | select input 的 autocomplete 属性                                              | string                    | —                 | off        |
| auto-complete         | 下个主版本弃用                                                                 | string                    | —                 | off        |
| placeholder           | 占位符                                                                         | string                    | —                 | 请选择     |
| filterable            | 是否可搜索                                                                     | boolean                   | —                 | false      |
| allow-create          | 是否允许用户创建新条目，需配合 `filterable` 使用                               | boolean                   | —                 | false      |
| filter-method         | 自定义搜索方法                                                                 | function                  | —                 | —          |
| remote                | 是否为远程搜索                                                                 | boolean                   | —                 | false      |
| remote-method         | 远程搜索方法                                                                   | function                  | —                 | —          |
| loading               | 是否正在从远程获取数据                                                         | boolean                   | —                 | false      |
| loading-text          | 远程加载时显示的文字                                                           | string                    | —                 | 加载中     |
| no-match-text         | 搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置                       | string                    | —                 | 无匹配数据 |
| no-data-text          | 选项为空时显示的文字，也可以使用`slot="empty"`设置                             | string                    | —                 | 无数据     |
| popper-class          | Select 下拉框的类名                                                            | string                    | —                 | —          |
| reserve-keyword       | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词                       | boolean                   | —                 | false      |
| default-first-option  | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用       | boolean                   | -                 | false      |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean                   | -                 | true       |
| automatic-dropdown    | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单                  | boolean                   | -                 | false      |

### Select Events

| 事件名称       | 说明                                     | 回调参数                      |
| -------------- | ---------------------------------------- | ----------------------------- |
| change         | 选中值发生变化时触发                     | 目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下移除 tag 时触发                | 移除的 tag 值                 |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                             |
| blur           | 当 input 失去焦点时触发                  | (event: Event)                |
| focus          | 当 input 获得焦点时触发                  | (event: Event)                |

### 扩展 Select Events

| 事件名称 | 说明                                | 回调参数 |
| -------- | ----------------------------------- | -------- |
| load     | lazy 为 true 情况下懒加载数据前触发 | -        |

### Select Slots

|   name  | 说明                | 参数                                          |
| ------- | ------------------- | --------------------------------------------- |
| option  | Option 组件列表     | {props: { label,value,disabled,children }, i} |
| prefix  | Select 组件头部内容 |                                               |
| empty   | 无选项时的列表      |                                               |

### Option Attributes

| 参数     | 说明                                      | 类型                 | 可选值 | 默认值 |
| -------- | ----------------------------------------- | -------------------- | ------ | ------ |
| value    | 选项的值                                  | string/number/object | —      | —      |
| label    | 选项的标签，若不设置则默认与 `value` 相同 | string/number        | —      | —      |
| disabled | 是否禁用该选项/将该分组下所有选项置为禁用 | boolean              | —      | false  |

### Methods

| 方法名 | 说明                            | 参数 |
| ------ | ------------------------------- | ---- |
| focus  | 使 input 获取焦点               | -    |
| blur   | 使 input 失去焦点，并隐藏下拉框 | -    |
