## UploadGenerate Upload 生成

基于`Upload`组件的封装, 扩展了及功能, 对`list-type`的文件样式列表进行了封装

<!-- ### 基础用法

:::demo

```html
<dy-upload-generate
  v-model="fileList"
  :baseUploadURI="baseUploadURI"
  :parseResponse="parseResponse"
  listType="text"
  :action="exampleUploadUrl"
  ref="uploadGenerateRef"
></dy-upload-generate>

<script>
  export default {
    data() {
      return {
        fileList: [
          {
            fieldname: 'file',
            originalname: 'article.png',
            encoding: '7bit',
            mimetype: 'image/png',
            destination:
              '/Users/chenkun/personal/code/Nest/01/learn-multer/my-uploads',
            filename: 'file-1692683296660-853058701-article.png',
            path:
              '/Users/chenkun/personal/code/Nest/01/learn-multer/my-uploads/file-1692683296660-853058701-article.png',
            size: 42369,
            url:
              '/Users/chenkun/personal/code/Nest/01/learn-multer/my-uploads/file-1692683296660-853058701-article.png',
            fileName: 'article.png',
            name: 'article.png',
            status: 'success',
          },
        ],
        headers: {
          'dynamic-example': 'Auth example....',
        },
        baseUploadURI:
          process.env.VUE_APP_UPLOAD_API || 'http://localhost:3333',
        exampleUploadUrl: '/upload',
      };
    },
    mounted() {
      this.getSelectRef();
    },
    methods: {
      getSelectRef() {
        console.log(this.$refs.uploadGenerateRef.$refs.DyUpload);
        // or
        console.log(this.$refs.uploadGenerateRef.useRef());
      },
      parseResponse(response, props) {
        let data = response.data;
        const { name, url } = props;
        return {
          ...data,
          name: data.fileName,
          url: data.url,
        };
      },
    },
  };
</script>
```

`action`为当前上传的接口路径, `baseUploadURI`一般为项目的的基础路径, 如果这里没有设置, 将会用全局的`baseURI`做为基础路径
::: -->

### picture-card

```js
import Dynamic from 'main/index.js';
Vue.use(Dynamic, {
  // 数据请求的baseURI
  baseURI: 'http://localhost:2222',
  // 上传接口请求的baseURI, 使用第三方服务可能会用到, 比如使用oss上传, 如果没传入默认会用baseURI
  baseUploadURI: 'http://localhost:3333',
});
```

:::demo

```html
<dy-upload-generate
  v-model="fileList"
  :parseResponse="parseResponse"
  listType="picture-card"
  :action="exampleUploadUrl"
  :limit="3"
></dy-upload-generate>

<script>
  export default {
    data() {
      return {
        fileList: [],
        headers: {
          'dynamic-example': 'Auth example....',
        },
        baseUploadURI:
          process.env.VUE_APP_UPLOAD_API || 'http://localhost:3333',
        exampleUploadUrl: '/upload',
      };
    },
    mounted() {},
    methods: {
      parseResponse(response, props) {
        let data = response.data;
        const { name, url } = props;
        return {
          ...data,
          name: data.fileName,
          url: data.url,
        };
      },
    },
  };
</script>
```

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

### 扩展 Select Attributes

| 参数      | 说明               | 类型     | 可选值 | 默认值                        |
| --------- | ------------------ | -------- | ------ | ----------------------------- |
| formatter | 格式化 option 数据 | function | —      | globalConfig.useOptionProps() |

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
