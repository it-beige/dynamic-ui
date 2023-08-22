import globalConfig from 'main/config/global';
import { isFunction } from 'main/utils/lodash';
import {
  getCompPropsBySourceOpt
} from 'main/utils/component.js';
import LoadingComponent from 'packages/loading';
import InfiniteScrollComponent from 'packages/infinite-scroll';

const getExtraProps = () => {
  return {
    // 数据请求的baseURI
    baseURI: {
      type: String,
      default: globalConfig.baseURI
    },
    // 请求头
    useRequestHeaders: {
      type: Function,
      default: () => globalConfig.useRequestHeaders()
    },
    // 请求数据的方法
    useRequest: {
      type: Function,
      default: () => globalConfig.useRequest()
    },
    // 解析数据的方法
    useParseData: {
      type: Function,
      default: (res) => globalConfig.useParseData(res)
    },
    // 解析total的方法
    useParseTotal: {
      type: Function,
      default: (res) => globalConfig.useParseTotal(res)
    },
    // 获取请求接口的数据
    resolveData: {
      type: Function
    },
    // 异步获取配置项与options互斥
    url: String,
    options: {
      type: Array,
      default: () => ([])
    },
    // 请求方式
    method: {
      type: String,
      default: 'GET'
    },
    // query参数
    params: {
      type: Object,
      default: () => ({})
    },
    // body参数
    data: {
      type: Object,
      default: () => ({})
    },
    // 分页参数字段名
    pageParamsKey: {
      type: Object,
      default: () => globalConfig.pageParamsKey
    },
    // 分页参数值
    pageParamsValue: {
      type: Object,
      default: () => globalConfig.pageParamsValue
    },
    // 是否禁止异步的请求
    disabledRequest: Boolean,
    // 是否懒加载
    lazy: {
      type: Boolean,
      default: false
    },
    // 懒加载方法(接口要具备limit能力)
    loadMoreMethod: {
      type: Function,
      default: (...arg) => globalConfig.loadMoreMethod(...arg)
    }

  };
};

const getExtraData = (self = {}) => {
  const {
    url,
    method,
    params,
    data,
    options
  } = self;
  return {
    // 分页的数据
    pageParams: {},
    bindRequestParams: {
      url,
      method,
      params,
      data
    },
    bindOptions: [...options],
    requestPending: false,
    bindRequestParamsChanged: false
  };
};

export const getExtra = (key) => {
  let get;
  switch (key) {
    case 'data':
      get = getExtraData;
      break;
    case 'prop':
      get = getExtraProps;
      break;
  }
  return Object.keys(get());
};

export default function genRequestMixin() {
  const LoadingProps = getCompPropsBySourceOpt(LoadingComponent);
  const InfiniteScrollProps = getCompPropsBySourceOpt(InfiniteScrollComponent);
  return {
    props: {
      ...LoadingProps,
      ...InfiniteScrollProps,
      ...getExtraProps(),
      // 触发加载的距离阈值，单位为px
      infiniteScrollDistance: {
        type: Number,
        default: 50
      },
      showLoading: {
        type: Boolean,
        default: true
      },
      dynamicLoadingText: {
        type: String,
        default: '数据加载中'
      }
    },
    data(self) {
      return getExtraData(self);
    },
    watch: {
      url: {
        handler(v) {
          this.updateRequestParams('url', v);
          // url变动之后分页参数重置
          this.setPageParams();
          // 重新触发获取options
          // this.dispatchGetOptions(true);
        }
      },
      method: {
        handler(v) {
          this.updateRequestParams('method', v);
        }
      },
      params: {
        handler(v) {
          this.updateRequestParams('params', v);
        },
        deep: true
      },
      data: {
        handler(v) {
          this.updateRequestParams('data', v);
        },
        deep: true
      },
      pageParamsValue: {
        handler() {
          this.setPageParams();
          this.bindRequestParamsChanged = true;
        },
        deep: true
      },
      // 如果变动url、params、data, method, 根据新的参数重新触发获取options
      bindRequestParamsChanged: {
        handler(v) {
          // 存在同时变动, 只生效一次
          if (v) {
            this.dispatchGetOptions(true).then(() => {
              this.bindRequestParamsChanged = false;
            });
          }
        }
      }
    },
    created() {
      this.$unWatchs = [];
      if (this.url) {
        this.setPageParams();
      } else {
        this.watchPropWithOption();
      }
      this.dispatchGetOptions();
    },
    beforeDestroy() {
      this.$unWatchs.forEach(i => i());
    },
    methods: {
      $request(reqOptions) {
        // 请求数据的方法
        const request = this.useRequest();

        return new Promise((resolve) => {
          request({ ...reqOptions, headers: this.useRequestHeaders() })
            .then((res) => {
              let data = this.useParseData(res);
              this.pageParams.total = this.useParseTotal(res);
              // 返回解析之后的接口数据
              resolve(data);
            });
        });

      },
      setPageParams() {
        this.pageParams = {
          [this.pageParamsKey.page]: this.pageParamsValue[this.pageParamsKey.page],
          [this.pageParamsKey.size]: this.pageParamsValue[this.pageParamsKey.size],
          total: 0,
          count: 0
        };
      },
      dispatchGetOptions(reset) {
        if (reset) {
          // options、value重置
          this.$emit('input', undefined);
          this.bindOptions = [];
        }
        if (this.url && !this.disabledRequest) {
          if (this.lazy) {
            return this.offsetRequestOptions();
          } else {
            return this.getAsyncOptions(this.bindRequestParams);
          }
        }
      },
      watchPropWithOption() {
        this.$unWatchs.push(
          this.$watch('options', (v) => {
            this.bindOptions = v;
          })
        );
      },
      updateRequestParams(key, value) {
        this.bindRequestParams[key] = value;
        this.bindRequestParamsChanged = true;
      },
      getAsyncOptions(params) {
        this.requestPending = true;
        return this.$request(params)
          .then((options) => {
            if (this.lazy) {
              this.bindOptions = this.bindOptions.concat(options);
              this.pageParams.count += options.length;
            } else {
              this.bindOptions = options;
            }
            // 用户需要获取异步请求数据的情况
            if (isFunction(this.resolveData)) {
              this.resolveData(this.bindOptions);
            }
            this.requestPending = false;
          });
      },
      offsetRequestOptions() {
        // eslint-disable-next-line
        const {count, total, ...pageParams} = this.pageParams;
        return this.getAsyncOptions({
          ...this.bindRequestParams,
          params: {
            ...this.bindRequestParams.params,
            ...pageParams
          }
        });
      },
      load() {
        const {count, total, ...pageParams} = this.pageParams;
        if (count === Number(total)) {
          return;
        }
        if (this.requestPending) return;
        this.$emit('load');
        return new Promise((resolve) => {
          const page = pageParams[this.pageParamsKey.page];
          const size = pageParams[this.pageParamsKey.size];
          this.loadMoreMethod([page, size], resolve);
        })
          .then(([page, size]) => {
            this.pageParams[this.pageParamsKey.page] = page;
            this.pageParams[this.pageParamsKey.size] = size;
            this.offsetRequestOptions();
          });

      }
    }
  };
}
