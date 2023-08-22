import globalConfig from 'main/config/global';
import { isFunction, isPlainObject } from 'main/utils/lodash';
import {
  stitchUrl
} from 'main/utils/util';
import {
  parseResponse
} from 'main/help/upload';

const getExtraProps = () => {
  return {
    // 数据请求的baseURI
    baseURI: {
      type: String,
      default: () => globalConfig.baseURI
    },
    // 上传接口请求的baseURI
    baseUploadURI: {
      type: String,
      default: () =>globalConfig.baseUploadURI
    },
    // 请求数据的方法
    useRequest: {
      type: Function,
      default: () => globalConfig.useRequest()
    },
    // 解析数据的方法
    parseResponse: {
      type: Function,
      default: parseResponse
    },
    value: {
      type: [Object, Array],
      require: true
    },
    props: {
      type: Object,
      default: () => ({
        name: 'fileName',
        url: 'url'
      })
    },
    isCallBuilt: {
      type: Boolean,
      default: true
    }
  };
};

const getExtraData = (self = {}) => {

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
    },
    methods: {
      bindPropsHook(props) {
        props.onSuccess = this.callOriginalHook(this.callSuccess, props.onSuccess);
        props.onError = this.callOriginalHook(this.callError, props.onError);
        props.beforeRemove = this.callOriginalHook(this.callBeforeRemove, props.beforeRemove);
        props.onRemove = this.callOriginalHook(this.callRemove, props.onRemove);
      },
      callSuccess(response, file) {
        let data = file;
        if (isFunction(this.parseResponse)) {
          data = this.parseResponse(response, this.props);
          if (!isPlainObject(file)) {
            console.error('[Dynamic Error][UploadGenerate]', 'parseResponse Function must return object');
          }
        }
        if (!data.name) {
          data.name = file.name;
        }
        this.bindFileList.push(data);
        this.$emit('input', this.bindFileList);
      },
      callError() {
        this.$message.error('文件上传失败');
      },
      callBeforeRemove(file) {
        return this.$confirm(`确定移除 ${file.name}?`, '删除文件');
      },
      callRemove(file) {
        this.bindFileList = this.bindFileList.filter((i)=> i.uid !== file.uid);
        this.$emit('input', this.bindFileList);
      },
      callOriginalHook(call, originalHook) {
        const exist = isFunction(originalHook);
        return (...arg) => {
          let r = this.isCallBuilt && call(...arg);
          if (exist) {
            try {
              r = originalHook(...arg);
            } catch (e) {
              console.log(e);
            }
          }
          return r;

        };
      }
    }
  };
}
