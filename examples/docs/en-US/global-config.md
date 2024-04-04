## 快速上手

This section will introduce how to configure the global settings of Dynamic in the project.

### 全局配置

When importing Dynamic, you can pass a global configuration object.

```js
import Vue from 'vue';
import Dynamic from 'dynamic-ui';
import request from '@/utils/request';
import storage from '@/utils/storage';

Vue.use(Dynamic, {
  // baseURI for data requests
  baseURI: process.env.VUE_APP_BASE_API,
  // baseUploadURI for upload interface requests. This might be necessary when using third-party services, such as uploading to an OSS (Object Storage Service)
  baseUploadURI: process.env.VUE_APP_BASE_UPLOAD_API,
  // pageParamsKey for pagination parameters: 'page' and 'size'.
  pageParamsKey: { page: 'page', size: 'size' },
  // pageParamsValue for default parameter values for pagination
  pageParamsValue: { page: 1, size: 20 },
  // Customize the method used for internal requests to interfaces in components
  useRequest: () => request,
  // The default request header parameters carried by the request interface, typically including the authentication token required for authorization in the project
  useRequestHeaders: () => ({ 'Dynamic-Auth': storage.get('access_token') }),
  // Customize parsing the 'data' returned by the data interface. The subsequent FormGenerate component will be introduced
  useParseData: res => res.data
  // Customize parsing the 'total' returned by the data interface. The subsequent TableGenerate component will be introduced
  useParseTotal: res => res.data.total,
  // useOptionProps for Configure the display items and bound values required for the 'data' data item
  useOptionProps: () => ({label: 'label', value: 'value', children: 'children'}),
  // loadMoreMethod for Lazy loading method (the interface needs to have the ability to limit)
  loadMoreMethod: ([page, size], resolve) => {
    // 支持异步
    resolve([++page, size]);
  },
  // usePaginationLayout for total number of items in pagination
  usePaginationLayout: () => {
    return 'total, sizes, prev, pager, next, jumper';
  },
  // usePaginationPageSizes for the page size selector in pagination
  usePaginationPageSizes: () => {
    return [10, 20, 30, 40, 50, 100];
  }
  // Internationalization-related configuration
  locale: Vue.locale
  i18n: Vue.i18n,
  // Global configuration of components
  size: 'small',
  zIndex: 3000,

  /* Helper methods related to forms.  */
  genPlaceholder: genPlaceholder,
  genModifiers: genModifiers,
  genRequired: genRequired,

});
```

According to the above settings, in the project, the data request method and data parsing method used when generating `Form` and `Table` based on the defined JSON using `FormGenerate` and `TableGenerate` components can be customized.
