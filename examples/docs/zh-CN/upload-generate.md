## UploadGenerate Upload 生成

> 基于`Upload`组件的封装, 扩展了其功能

- 对`list-type`的文件样式列表进行了封装
- 对各种类型文件提供对应的`icon`展示
- 所有类型都内置大图预览、下载、删除功能
- 提供严格对比文件`MIME`类型校验, 文件大小、宽高校验
- 对下面方法都进行了封装, 用户也可自定义
  - onSuccess
  - onError
  - beforeRemove
  - beforeUpload
  - onRemove
  - onPreview

### 基础用法

:::demo

```html
<dy-upload-generate
  v-model="fileList"
  :baseUploadURI="baseUploadURI"
  :parseResponse="parseResponse"
  listType="text"
  :action="exampleUploadUrl"
  :limit="3"
  ref="uploadGenerateRef"
  :disabled="disabled"
></dy-upload-generate>
<dy-button
  style="margin-top: 20px"
  type="primary"
  @click="() => disabled = !disabled"
>
  {{ !disabled ? '禁用' : '解除禁用' }}
</dy-button>
<script>
  export default {
    data() {
      return {
        disabled: false,
        fileList: [
          {
            fieldname: 'file',
            originalname: 'article.png',
            encoding: '7bit',
            mimetype: 'image/png',
            destination:
              '/Users/chenkun/personal/code/Nest/01/learn-multer/my-uploads',
            filename: 'file-1692683296660-853058701-article.png',
            path: '/Users/chenkun/personal/code/Nest/01/learn-multer/my-uploads/file-1692683296660-853058701-article.png',
            size: 42369,
            url: 'http://localhost:3333/preview/file-1692683296660-853058701-article.png',
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
      }
    },
    mounted() {
      this.getSelectRef()
    },
    methods: {
      getSelectRef() {
        console.log(this.$refs.uploadGenerateRef.$refs.DyUpload)
        // or
        console.log(this.$refs.uploadGenerateRef.useRef())
      },
      parseResponse(response, props) {
        let data = response.data
        const { name, url } = props
        return {
          ...data,
          name: data.fileName,
          url: data.url,
        }
      },
    },
  }
</script>
```

`action`为当前上传的接口路径, `baseUploadURI`一般为项目的的基础路径, 如果这里没有设置, 将会用全局的`baseURI`做为基础路径; `parseResponse` 方法用于解析接口返回的数据, 如果接口返回了 `name` 和 `url` 此方法一般不用配置
:::

### 缩略图扩展

```js
import Dynamic from 'main/index.js'
Vue.use(Dynamic, {
  // 数据请求的baseURI
  baseURI: 'http://localhost:2222',
  // 上传接口请求的baseURI, 使用第三方服务可能会用到, 比如使用oss上传, 如果没传入默认会用baseURI
  baseUploadURI: 'http://localhost:3333',
})
```

:::demo

```html
<dy-upload-generate
  v-model="fileList"
  :parseResponse="parseResponse"
  listType="picture-card"
  :action="exampleUploadUrl"
  :limit="3"
  multiple
  :disabled="disabled"
></dy-upload-generate>
<dy-button
  style="margin-top: 20px"
  type="primary"
  @click="() => disabled = !disabled"
>
  {{ !disabled ? '禁用' : '解除禁用' }}
</dy-button>

<script>
  export default {
    data() {
      return {
        disabled: false,
        fileList: [],
        headers: {
          'dynamic-example': 'Auth example....',
        },
        baseUploadURI:
          process.env.VUE_APP_UPLOAD_API || 'http://localhost:3333',
        exampleUploadUrl: '/upload',
      }
    },
    mounted() {},
    methods: {
      parseResponse(response, props) {
        let data = response.data
        const { name, url } = props
        return {
          ...data,
          name: data.fileName,
          url: data.url,
        }
      },
    },
  }
</script>
```

:::

### 图片列表缩略图扩展

:::demo

```html
<dy-upload-generate
  v-model="fileList"
  :parseResponse="parseResponse"
  listType="picture"
  :action="exampleUploadUrl"
  :limit="3"
  :disabled="disabled"
></dy-upload-generate>
<dy-button
  style="margin-top: 20px"
  type="primary"
  @click="() => disabled = !disabled"
>
  {{ !disabled ? '禁用' : '解除禁用' }}
</dy-button>

<script>
  export default {
    data() {
      return {
        disabled: false,
        fileList: [],
        headers: {
          'dynamic-example': 'Auth example....',
        },
        baseUploadURI:
          process.env.VUE_APP_UPLOAD_API || 'http://localhost:3333',
        exampleUploadUrl: '/upload',
      }
    },
    mounted() {},
    methods: {
      parseResponse(response, props) {
        let data = response.data
        const { name, url } = props
        return {
          ...data,
          name: data.fileName,
          url: data.url,
        }
      },
    },
  }
</script>
```

:::

### 文件限制

:::demo

```html
<dy-upload-generate
  v-model="fileList"
  :parseResponse="parseResponse"
  listType="picture"
  :action="exampleUploadUrl"
  accept="image/*,pdf"
  :maxFileSize="maxFileSize"
  :limitFile="limitFile"
></dy-upload-generate>

<script>
  export default {
    data() {
      return {
        // 限定图片最大可以上传的宽度和高度
        limitFile: {
          maxWidth: 400,
          maxHeight: 400,
        },
        maxFileSize: '1MB' || 1024,
        fileList: [],
        headers: {
          'dynamic-example': 'Auth example....',
        },
        baseUploadURI:
          process.env.VUE_APP_UPLOAD_API || 'http://localhost:3333',
        exampleUploadUrl: '/upload',
      }
    },
    mounted() {},
    methods: {
      parseResponse(response, props) {
        let data = response.data
        const { name, url } = props
        return {
          ...data,
          name: data.fileName,
          url: data.url,
        }
      },
    },
  }
</script>
```

:::

### 内置 helper 方法

:::demo

```html
<dy-upload-generate
  v-model="fileList"
  :parseResponse="parseResponse"
  listType="picture"
  :action="exampleUploadUrl"
  accept="image/*,pdf"
  :maxFileSize="maxFileSize"
  :limitFile="limitFile"
  :getTip="getTip"
></dy-upload-generate>

<script>
  export default {
    data() {
      return {
        // 限定图片最大可以上传的宽度和高度
        limitFile: {
          maxWidth: 400,
          maxHeight: 400,
        },
        maxFileSize: '1MB' || 1024,
        fileList: [],
        headers: {
          'dynamic-example': 'Auth example....',
        },
        baseUploadURI:
          process.env.VUE_APP_UPLOAD_API || 'http://localhost:3333',
        exampleUploadUrl: '/upload',
      }
    },
    mounted() {},
    methods: {
      parseResponse(response, props) {
        let data = response.data
        const { name, url } = props
        return {
          ...data,
          name: data.fileName,
          url: data.url,
        }
      },
      getTip(attr, replaceValue) {
        if (attr === 'successText') {
          return 'dy: 文件上传成功'
        } else if (attr === 'limitFile.maxWidth') {
          // 调用helper提供的方法
          return `dy: 图片高度不可大于${replaceValue}px`
        }
      },
    },
  }
</script>
```

通过`getTip`可以自定义组件内的提示

:::

组件内置的提示配置如下

```javascript
{
  errorText: '文件上传失败',
  successText: '文件上传成功',
  removeConfirmText: '确定移除{name}?',
  noAccept: '不支持的文件类型: {accept}',
  noAcceptContent: '文件类型后缀对应的文件内容不匹配',
  exceedSize: '文件不能超过{size}',
  limitFile: {
    width: '宽度只能为{width}像素',
    height: '高度只能为{height}像素',
    maxWidth: '图片宽度不可大于{maxWidth}',
    maxHeight: '图片高度不可大于{maxHeight}',
    minWidth: '图片宽度不可小于{minWidth}',
    minHeight: '图片高度不可小于{minHeight}',
    offset: '文件尺寸超过最小可以向下偏移的值(可以向下偏移：{offsetWidth}*{offsetHeight})'
  }
}
```

### 扩展 Upload Attributes

| 参数         | 说明                                     | 类型          | 可选值   | 默认值        |
| ------------ | ---------------------------------------- | ------------- | -------- | ------------- |
| value        | v-model 双向绑定值(可以不使用 file-list) | array/object  | -        | -             |
| strictAccept | 是否严格对比文件后缀对应的 MIME 类型     | boolean       | -        | true          |
| maxFileSize  | 文件最大限制                             | number/string | KB/MB/GB | 数值默认为 MB |
| limitFile    | 对图片尺寸进行限制, 配置选项具体看下表   | object        | -        | -             |
| showProgress | 是否显示上传进度条                       | boolean       | -        | true          |

### limitFile

| 参数         | 说明             | 类型   | 可选值 | 默认值 |
| ------------ | ---------------- | ------ | ------ | ------ |
| width        | 限定宽度         | number | -      | -      |
| height       | 限定高度         | number | -      | -      |
| maxWidth     | 最大的高度       | number | -      | -      |
| maxHeight    | 限定宽度         | number | -      | -      |
| mminWidth    | 最小的宽度       | number | -      | -      |
| mminHeight   | 最小的高度       | number | -      | -      |
| offsetWidth  | 可以偏移的宽度值 | number | -      | -      |
| offsetHeight | 可以偏移的高度值 | number | -      | -      |

### Attribute

| 参数             | 说明                                                                                                                                 | 类型                               | 可选值                    | 默认值 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | ------------------------- | ------ |
| action           | 必选参数，上传的地址                                                                                                                 | string                             | —                         | —      |
| headers          | 设置上传的请求头部                                                                                                                   | object                             | —                         | —      |
| multiple         | 是否支持多选文件                                                                                                                     | boolean                            | —                         | —      |
| data             | 上传时附带的额外参数                                                                                                                 | object                             | —                         | —      |
| name             | 上传的文件字段名                                                                                                                     | string                             | —                         | file   |
| with-credentials | 支持发送 cookie 凭证信息                                                                                                             | boolean                            | —                         | false  |
| show-file-list   | 是否显示已上传文件列表                                                                                                               | boolean                            | —                         | true   |
| drag             | 是否启用拖拽上传                                                                                                                     | boolean                            | —                         | false  |
| accept           | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效） | string                             | —                         | —      |
| on-preview       | 点击文件列表中已上传的文件时的钩子                                                                                                   | function(file)                     | —                         | —      |
| on-remove        | 文件列表移除文件时的钩子                                                                                                             | function(file, fileList)           | —                         | —      |
| on-success       | 文件上传成功时的钩子                                                                                                                 | function(response, file, fileList) | —                         | —      |
| on-error         | 文件上传失败时的钩子                                                                                                                 | function(err, file, fileList)      | —                         | —      |
| on-progress      | 文件上传时的钩子                                                                                                                     | function(event, file, fileList)    | —                         | —      |
| on-change        | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用                                                                       | function(file, fileList)           | —                         | —      |
| before-upload    | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。                                        | function(file)                     | —                         | —      |
| before-remove    | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。                              | function(file, fileList)           | —                         | —      |
| list-type        | 文件列表的类型                                                                                                                       | string                             | text/picture/picture-card | text   |
| auto-upload      | 是否在选取文件后立即进行上传                                                                                                         | boolean                            | —                         | true   |
| file-list        | 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]                                                       | array                              | —                         | []     |
| http-request     | 覆盖默认的上传行为，可以自定义上传的实现                                                                                             | function                           | —                         | —      |
| disabled         | 是否禁用                                                                                                                             | boolean                            | —                         | false  |
| limit            | 最大允许上传个数                                                                                                                     | number                             | —                         | —      |
| on-exceed        | 文件超出个数限制时的钩子                                                                                                             | function(files, fileList)          | —                         | -      |

### Slot

| name    | 说明                 |
| ------- | -------------------- |
| trigger | 触发文件选择框的内容 |
| tip     | 提示说明文字         |

### Methods

| 方法名     | 说明                                                        | 参数                                |
| ---------- | ----------------------------------------------------------- | ----------------------------------- |
| clearFiles | 清空已上传的文件列表（该方法不支持在 before-upload 中调用） | —                                   |
| abort      | 取消上传请求                                                | （ file: fileList 中的 file 对象 ） |
| submit     | 手动上传文件列表                                            | —                                   |
