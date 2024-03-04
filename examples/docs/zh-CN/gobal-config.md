## 快速上手

本节将介绍如何在项目配置 Dynamic 的全局配置。

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
  useOptionProps: () => ({label: 'label', value: 'value', children: 'children'}),
  // 懒加载方法(接口要具备limit能力)
  loadMoreMethod: ([page, size], resolve) => {
    // 支持异步
    resolve([++page, size]);
  },
  // 分页的总条目数
  usePaginationLayout: () => {
    return 'total, sizes, prev, pager, next, jumper';
  },
  // 分页的每页显示个数选择器的选项设置
  usePaginationPageSizes: () => {
    return [10, 20, 30, 40, 50, 100];
  }
  // 国际化相关配置
  locale: Vue.locale
  locale: Vue.i18n,
  // 组件的全局配置
  size: 'small',
  zIndex: 3000
});
```

按照以上设置，项目中使用`FormGenerate`、`TableGenerate`组件根据定义的 JSON 去生成`Form`、`Table`时所使用的数据请求方法及解析数据的方法都可进行自定义。
