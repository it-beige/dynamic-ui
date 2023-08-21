## 快速上手

本节将介绍如何在项目中使用 Dynamic。

### 使用 vue-cli@3

我们为新版的 vue-cli 准备了相应的 [Dynamic 插件](https://github.com/DynamicUI/vue-cli-plugin-dynamic)，你可以用它们快速地搭建一个基于 Dynamic 的项目。

### 使用 Starter Kit

我们提供了通用的[项目模板](https://github.com/DynamicUI/dynamic-starter)，你可以直接使用。对于 Laravel 用户，我们也准备了相应的[模板](https://github.com/DynamicUI/dynamic-in-laravel-starter)，同样可以直接下载使用。

如果不希望使用我们提供的模板，请继续阅读。

### 引入 Dynamic

你可以引入整个 Dynamic，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Dynamic。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import DynamicUI from 'dynamic-ui';
import 'dynamic-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(DynamicUI);

new Vue({
  el: '#app',
  render: h => h(App),
});
```

以上代码便完成了 Dynamic 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "dynamic-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { Button, Select } from 'dynamic-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App),
});
```

完整组件列表和引入方式（完整组件列表以 [components.json](https://github.com/ElemeFE/dynamic/blob/master/components.json) 为准）, 提供的所有内置组件是放便你在不引入 Dynamic 的情况进行使用该组件库, 下面会演示使用其他组件库做为内置组件的情况

```javascript
import Vue from 'vue';
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Loading,
  MessageBox,
  Message,
  Notification,
} from 'dynamic-ui';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Spinner);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Calendar);
Vue.use(Backtop);
Vue.use(PageHeader);
Vue.use(CascaderPanel);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
```

### 全局配置

在引入 Dynamic 时，可以传入一个全局配置对象。

```js
import Vue from 'vue';
import Dynamic from 'dynamic-ui';
import request from '@/utils/request';
import storage from '@/utils/storage';

Vue.use(Dynamic, {
  // 数据请求的baseURI
  baseURI: process.env.VUE_APP_BASE_API,
  // 上传接口请求的baseURI 使用第三方服务可能会用到, 比如使用oss上传
  baseUploadURI: process.env.VUE_APP_BASE_UPLOAD_API,
  // 分页参数字段名 page size
  pageParamsKey: { page: 'page', size: 'size' },
  // 分页默认的参数值
  pageParamsValue: { page: 1, size: 20 },
  //  自定义组件内部请求接口所使用方法
  useRequest: () => request,
  // 请求接口默认携带的请求头参数, 项目中一般需要携带的鉴权token
  useRequestHeaders: () => ({ 'Dynamic-Auth': storage.get('access_token') }),
  // 自定义解析数据接口返回的data, 后续FormGenerate组件会介绍
  useParseData: res => res.data
  // 自定义解析数据接口返回的total, 后续TableGenerate组件会介绍
  useParseTotal: res => res.data.total,
  // 配置需要data数据项的展示项和绑定值
  useOptionProps: () => ({label: 'label', value: 'value', children: 'children'})
  // 国际化相关配置
  locale: Vue.locale
  locale: Vue.i18n,
  // 组件的全局配置
  size: 'small',
  zIndex: 3000
});
```

按照以上设置，项目中使用`FormGenerate`、`TableGenerate`组件根据定义的 JSON 去生成`Form`、`Table`时所使用的数据请求方法及解析数据的方法都可进行自定义。

### 开始使用

至此，一个基于 Vue 和 Dynamic 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
