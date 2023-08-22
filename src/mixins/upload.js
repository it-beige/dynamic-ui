import globalConfig from 'main/config/global';
// import { isFunction } from 'main/utils/lodash';
import {
  getCompPropsBySourceOpt
} from 'main/utils/component.js';
import UploadComponent from 'packages/upload';
import {
  stitchUrl
} from 'main/utils/util';

const getExtraProps = () => {
  const UploadProps = getCompPropsBySourceOpt(UploadComponent);

  return {
    ...UploadProps,
    // 数据请求的baseURI
    baseURI: {
      type: String,
      default: globalConfig.baseURI
    },
    // 上传接口请求的baseURI
    baseUploadURI: {
      type: String,
      default: globalConfig.baseUploadURI
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
    // 获取请求接口的数据
    resolveData: {
      type: Function
    }
  };
};

const getExtraData = (self = {}) => {
  const {

  } = self;
  return {

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

export default function genUploadMixin() {
  return {
    props: getExtraProps(),
    data(self) {
      return getExtraData(self);
    },
    computed: {
      // 是否超出上传限制数量
      isExceed({ limit, fileList }) {
        return limit ? fileList.length >= limit : false;
      },
      url({ baseURI, baseUploadURI, action}) {
        let url = baseURI;
        // upload相关接口地址单独配置的情况
        if (baseUploadURI) {
          url = baseUploadURI;
        }
        return stitchUrl(url, action);
      }
    },
    watch: {},
    created() {

    },
    beforeDestroy() {
      this.$unWatchs.forEach(i => i());
    },
    methods: {

      $request(reqOptions) {

      }

    }
  };
}
