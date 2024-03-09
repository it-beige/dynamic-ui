## DialogGenerate Dialog 生成

> 基于`Dialog`组件的封装, 扩展了其功能

- 对 footer slot 进行了封装, 默认 slot 会根据 buttons 配置渲染按钮区域
- 对 title slot 进行了封装, 默认 slot 会根据 operateType 和 iconMap 配置渲染按钮区域
- 添加全屏弹框功能
- 添加拖拽弹框功能
- 添加缩放弹框功能

### 基础用法

:::demo

```html
<dy-button type="text" @click="dialogVisible = true">点击打开 Dialog</dy-button>

<dy-dialog-generate
  title="提示"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose"
  ref="dialogGenerateRef"
  :buttons="buttons"
  @cancel="cancelHandle"
  @save="saveHandle"
  @submit="submitHandle"
  @delete="deleteHandle"
></dy-dialog-generate>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        buttons: ['cancel', 'save', 'submit', 'delete'],
      }
    },
    mounted() {
      this.getDialogRef()
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      getDialogRef() {
        console.log(this.$refs.dialogGenerateRef.useRef())
      },
      cancelHandle([showloading, hideLoading]) {
        showloading()
        setTimeout(() => hideLoading(), 1000 * 3)
      },
      saveHandle([showloading, hideLoading]) {
        showloading()
        setTimeout(() => hideLoading(), 1000 * 3)
      },
      submitHandle([showloading, hideLoading]) {
        showloading()
        setTimeout(() => hideLoading(), 1000 * 3)
      },
      deleteHandle([showloading, hideLoading]) {
        showloading()
        setTimeout(() => hideLoading(), 1000 * 3)
      },
    },
  }
</script>
```

:::

### 操作状态

:::demo

```html
<dy-button type="text" @click="viewHandle">查看</dy-button>
<dy-button type="text" @click="editHandle">编辑</dy-button>
<dy-button type="text" @click="addHandle">新增</dy-button>

<dy-button type="text" @click="otherHandle">自定义标题</dy-button>

<dy-dialog-generate
  v-bind="titleProp"
  :visible.sync="dialogVisible"
  :operateType="operateType"
  width="30%"
  ref="dialogGenerateRef"
></dy-dialog-generate>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        operateType: '',
        title: '',
      }
    },
    computed: {
      titleProp({ operateType }) {
        let props = {}
        if (this.title) {
          props.title = this.title
        } else if (['view', 'edit', 'add'].includes(operateType)) {
          props.label = '用户'
        }
        return props
      },
    },
    mounted() {
      this.getDialogRef()
    },
    methods: {
      getDialogRef() {
        console.log(this.$refs.dialogGenerateRef.useRef())
      },
      viewHandle() {
        this.title = ''
        this.dialogVisible = true
        this.operateType = 'view'
      },
      editHandle() {
        this.title = ''
        this.dialogVisible = true
        this.operateType = 'edit'
      },
      addHandle() {
        this.title = ''
        this.dialogVisible = true
        this.operateType = 'add'
      },
      otherHandle() {
        this.dialogVisible = true
        this.title = '自定义的标题'
      },
    },
  }
</script>
```

:::

### 全屏弹框

:::demo

```html
<dy-button type="text" @click="dialogVisible = true">全屏弹框控制</dy-button>

<dy-dialog-generate
  :visible.sync="dialogVisible"
  title="全屏"
  width="30%"
  fullscreen
  ref="dialogGenerateRef"
></dy-dialog-generate>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
      }
    },
    mounted() {
      this.getDialogRef()
    },
    methods: {
      getDialogRef() {
        console.log(this.$refs.dialogGenerateRef.useRef())
      },
    },
  }
</script>
```

:::

### 拖拽弹框

:::demo

```html
<dy-button type="text" @click="dialogVisible = true">拖拽弹框控制</dy-button>

<dy-dialog-generate
  :visible.sync="dialogVisible"
  title="拖拽"
  width="60%"
  fullscreen
  draggable
  ref="dialogGenerateRef"
>
  只有头部区可以拖拽
</dy-dialog-generate>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
      }
    },
    mounted() {
      this.getDialogRef()
    },
    methods: {
      getDialogRef() {
        console.log(this.$refs.dialogGenerateRef.useRef())
      },
    },
  }
</script>
```

:::

### 拖拽缩放弹框

:::demo

```html
<dy-button type="text" @click="dialogVisible = true">
  拖拽缩放弹框控制
</dy-button>

<dy-dialog-generate
  :visible.sync="dialogVisible"
  title="拖拽缩放"
  width="60%"
  fullscreen
  draggable
  resizable
  :showHandle="showHandle"
  ref="dialogGenerateRef"
>
  <div>
    左上、左下、右上、右下角分别可以缩放

    <dy-button style="display: block" @click="showHandle = !showHandle">
      是否显示拖拽手柄
    </dy-button>
  </div>
</dy-dialog-generate>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        showHandle: true,
      }
    },
    mounted() {
      this.getDialogRef()
    },
    methods: {
      getDialogRef() {
        console.log(this.$refs.dialogGenerateRef.useRef())
      },
    },
  }
</script>
```

:::

:::tip
全屏状态下会禁用缩放和拖拽
:::

### 扩展 Dialog Attributes

| 参数        | 说明                                     | 类型    | 可选值                               | 默认值 |
| ----------- | ---------------------------------------- | ------- | ------------------------------------ | ------ |
| buttons     | 操作区渲染的按钮                         | array   | `cancel`、`save`、`submit`、`delete` | []     |
| disabled    | 是否禁用操作区渲染                       | boolean | -                                    | false  |
| buttonMap   | 渲染的按钮的 props, 配置选项，具体看下表 | object  | -                                    | -      |
| operateType | 操作类型                                 | string  | `view`、`edit`                       | -      |
| label       | 标题文本                                 | string  | -                                    | -      |
| draggable   | 可拖拽                                   | boolean | -                                    | false  |
| resizable   | 可缩放                                   | boolean | -                                    | false  |
| showHandle  | 显示缩放的手柄                           | boolean | -                                    | true   |

### buttonMap

默认配置

```javascript
{
  "view": {
    "icon": "dy-icon-search",
    "type": "",
    "text": "查看"
  },
  "cancel": {
    "icon": "dy-icon-close",
    "type": "",
    "text": "取消"
  },
  "save": {
    "icon": "dy-icon-folder",
    "type": "primary",
    "text": "保存"
  },
  "submit": {
    "icon": "dy-icon-check",
    "type": "primary",
    "text": "提交"
  },
  "delete": {
    "icon": "dy-icon-delete",
    "type": "danger",
    "text": "删除"
  }
}
```

| 参数        | 说明           | 类型    | 可选值                                             | 默认值 |
| ----------- | -------------- | ------- | -------------------------------------------------- | ------ |
| size        | 尺寸           | string  | medium / small / mini                              | —      |
| type        | 类型           | string  | primary / success / warning / danger / info / text | —      |
| plain       | 是否朴素按钮   | boolean | —                                                  | false  |
| round       | 是否圆角按钮   | boolean | —                                                  | false  |
| circle      | 是否圆形按钮   | boolean | —                                                  | false  |
| disabled    | 是否禁用状态   | boolean | —                                                  | false  |
| icon        | 图标类名       | string  | —                                                  | —      |
| autofocus   | 是否默认聚焦   | boolean | —                                                  | false  |
| native-type | 原生 type 属性 | string  | button / submit / reset                            | button |

### Attributes

| 参数                  | 说明                                                                         | 类型                                 | 可选值 | 默认值 |
| --------------------- | ---------------------------------------------------------------------------- | ------------------------------------ | ------ | ------ |
| visible               | 是否显示 Dialog，支持 .sync 修饰符                                           | boolean                              | —      | false  |
| title                 | Dialog 的标题，也可通过具名 slot （见下表）传入                              | string                               | —      | —      |
| width                 | Dialog 的宽度                                                                | string                               | —      | 50%    |
| fullscreen            | 是否开启全屏控制 Dialog                                                      | boolean                              | —      | false  |
| top                   | Dialog CSS 中的 margin-top 值                                                | string                               | —      | 15vh   |
| modal                 | 是否需要遮罩层                                                               | boolean                              | —      | true   |
| modal-append-to-body  | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上 | boolean                              | —      | true   |
| append-to-body        | Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true | boolean                              | —      | false  |
| lock-scroll           | 是否在 Dialog 出现时将 body 滚动锁定                                         | boolean                              | —      | true   |
| custom-class          | Dialog 的自定义类名                                                          | string                               | —      | —      |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Dialog                                           | boolean                              | —      | true   |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog                                             | boolean                              | —      | true   |
| show-close            | 是否显示关闭按钮                                                             | boolean                              | —      | true   |
| before-close          | 关闭前的回调，会暂停 Dialog 的关闭                                           | function(done)，done 用于关闭 Dialog | —      | —      |
| center                | 是否对头部和底部采用居中布局                                                 | boolean                              | —      | false  |
| destroy-on-close      | 关闭时销毁 Dialog 中的元素                                                   | boolean                              | —      | false  |

### Slot

| name   | 说明                      |
| ------ | ------------------------- |
| —      | Dialog 的内容             |
| header | Dialog 头部区的内容       |
| button | Dialog 右上角按钮区的内容 |
| title  | Dialog 标题区的内容       |
| footer | Dialog 按钮操作区的内容   |

### Events

| 事件名称 | 说明                        | 回调参数 |
| -------- | --------------------------- | -------- |
| open     | Dialog 打开的回调           | —        |
| opened   | Dialog 打开动画结束时的回调 | —        |
| close    | Dialog 关闭的回调           | —        |
| closed   | Dialog 关闭动画结束时的回调 | —        |
