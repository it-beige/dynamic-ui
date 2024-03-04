import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import Dynamic from 'main/index.js';
import hljs from 'highlight.js';
import routes from './route.config';
import demoBlock from './components/demo-block';
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import title from './i18n/title';

import 'packages/theme-chalk/src/index.scss';
import './demo-styles/index.scss';
import './assets/styles/common.css';
import './assets/styles/fonts/style.css';
import './mock/index.js';
import icon from './icons/icon.json';
import icon1 from './icons/icon1.json';
import icon2 from './icons/icon2.json';
import request from './api/request';
import { isPlainObject, isArray } from 'main/utils/lodash';

Vue.use(Dynamic, {
  // 数据请求的baseURI
  baseURI: process.env.VUE_APP_BASE_API || 'dev',
  // 上传接口请求的baseURI, 使用第三方服务可能会用到, 比如使用oss上传
  baseUploadURI: 'http://localhost:3333',
  // 分页参数字段名 page size
  pageParamsKey: { page: 'page', size: 'size' },
  // 分页默认的参数值
  pageParamsValue: { page: 1, size: 10 },
  //  自定义组件内部请求接口所使用方法
  useRequest: () => request,
  // 请求接口默认携带的请求头参数, 项目中一般需要携带的鉴权token
  useRequestHeaders: () => ({ 'Dynamic-Auth': localStorage.getItem('access_token') }),
  // 自定义解析数据接口返回的data, 后续FormGenerate组件会介绍
  useParseData: res => {
    const noop = [];
    return isPlainObject(res.data)
      ? isArray(res.data.list)
        ? res.data.list
        : isArray(res.data.data)
          ? res.data.data
          : noop
      : isArray(res.data)
        ? res.data
        : noop;

  },
  // 自定义解析数据接口返回的total, 后续TableGenerate组件会介绍
  useParseTotal: res => {
    const total = 0;
    return isPlainObject(res.data)
      ? Reflect.has(res.data, 'total')
        ? res.data.total
        : total
      : Reflect.has(res, 'total')
        ? res.total
        : total;
  },
  // 配置需要data数据项的展示项和绑定
  useOptionProps: () => ({label: 'label', value: 'value', children: 'children'})
});
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

const globalEle = new Vue({
  data: { $isEle: false } // 是否 ele 用户
});

Vue.mixin({
  computed: {
    $isEle: {
      get: () => (globalEle.$data.$isEle),
      set: (data) => {globalEle.$data.$isEle = data;}
    }
  }
});

// Icon 列表页用
Vue.prototype.$icon = icon;
Vue.prototype.$icon1 = icon1;
Vue.prototype.$icon2 = icon2;

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

console.dir(Vue);

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Dynamic';
  ga('send', 'event', 'PageView', route.name);
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
