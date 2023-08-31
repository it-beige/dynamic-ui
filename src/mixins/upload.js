import globalConfig from 'main/config/global';
import { isFunction, isPlainObject, isNumber } from 'main/utils/lodash';
import {
  stitchUrl
} from 'main/utils/util';
import {
  divide
} from 'main/utils/operate';

import {
  parseResponse,
  getMimeType,
  processFileUnitToMb,
  getTip,
  getFileType,
  limitFileContourSize
} from 'main/helper/upload';

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
    fileList: {
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
    // 严格对比文件后缀对应的MIME类型
    strictAccept: {
      type: Boolean,
      default: true
    },
    // 文件最大限制, 默认单位MB, 「2, '2MB'」
    maxFileSize: {
      type: [Number, String],
      validator: val => {
        if (isNumber(val)) return true;
        return ['KB', 'MB', 'GB'].indexOf(val.toUpperCase().slice(-2)) > -1;
      }
    },
    limitFile: {
      type: Object
      /* {
        width 限定宽度
        height 限定高度
        maxWidth: 最大的宽度
        maxHeight: 最大的高度
        mminWidth: 最小的宽度
        mminHeight: 最小的高度
        offsetWidth: 可以偏移的宽度值
        offsetHeight: 可以偏移的高度值
      } */
    },
    getTip: {
      type: Function,
      default: getTip
    }
  };
};

const getExtraData = (self = {}) => {
  return {
    isUploadValidError: false
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

export default function genUploadMixin () {
  return {
    props: getExtraProps(),
    data (self) {
      return getExtraData(self);
    },
    computed: {
      // 是否超出上传限制数量
      isExceed ({ limit, fileList }) {
        return limit ? fileList.length >= limit : false;
      },
      url ({ baseURI, baseUploadURI, action}) {
        let url = baseURI;
        // upload相关接口地址单独配置的情况
        if (baseUploadURI) {
          url = baseUploadURI;
        }
        return stitchUrl(url, action);
      }
    },
    watch: {},
    created () {

    },
    beforeDestroy () {
    },
    methods: {
      bindPropsHook (props) {
        props.onSuccess = this.callSuccess;
        props.onError = this.callError;
        props.beforeRemove = this.callBeforeRemove;
        props.beforeUpload = this.callBeforeUpload;
        props.onRemove = this.callRemove;
        props.onPreview = this.callPreview;
      },
      callSuccess (response, file, fileList) {
        const uploadFiles = fileList.filter(i => i.raw);
        const getFile = (file) => {
          let data = file;
          if (isFunction(this.parseResponse)) {
            data = this.parseResponse(file.response, this.props);
            if (!isPlainObject(file)) {
              console.error('[Dynamic Error][UploadGenerate]', 'parseResponse Function must return object');
            }
          }
          if (!data.name) {
            data.name = file.name;
          }
          data.uid = file.uid;
          return data;
        };
        this.bindFileList.push(...uploadFiles.map(getFile));
        this.$emit('input', this.bindFileList);
        this.$message.success(this.getTip('successText'));
        return this.callOriginalHook(this.onSuccess, [response, file, fileList]);
      },
      callError (err, file, fileList) {
        this.callOriginalHook(this.onError, [err, file, fileList], () => {
          this.$message.error(this.getTip('errorText'));
        });
      },
      callBeforeRemove (file, fileList) {
        return this.callOriginalHook(this.beforeRemove, [file, fileList], () => {
          if (this.isUploadValidError) {
            this.isUploadValidError = false;
            return Promise.resolve();
          }
          const msg = this.getTip('removeConfirmText', file.name);
          return this.$confirm(msg, '删除文件');
        });

      },
      callBeforeUpload (file) {
        return this.callOriginalHook(this.beforeUpload, [file], async () => {
          let r = Promise.resolve;
          const isInvalid = (r) => {
            this.isUploadValidError = r.name !== Promise.resolve.name;
            return [this.isUploadValidError, r];
          };
          let valids = [];
          // 限制类型
          if (this.accept) {
            valids.push(this.acceptFile(file));
          }
          // 限制大小
          if (this.maxFileSize) {
            valids.push(this.limitMaxFileSize(file));
          }
          // 限制尺寸
          if (this.limitFile) {
            valids.push(await this.limitFileWidthOrHeight(file));
          }

          while (valids.length) {
            const [invalid, callback] = isInvalid(valids.shift());
            if (invalid) {
              r = callback;
              break;
            }
          }
          // https://stackoverflow.com/questions/60980357/typeerror-promisereject-called-on-non-object
          return r.call(Promise);
        });

      },
      callRemove (file, fileList) {
        this.bindFileList = this.bindFileList.filter((i)=> i.uid !== file.uid);
        this.$emit('input', this.bindFileList);
        return this.callOriginalHook(this.beforeRemove, [file, fileList]);
      },
      callPreview (file, fileList) {
        let url = file.url;
        this.previewUrl = url;
        return this.callOriginalHook(this.onPreview, [file, fileList]);
      },
      callOriginalHook (originalHook, args, call) {
        if (isFunction(originalHook)) {
          return originalHook(...args);
        }
        if (isFunction(call)) {
          return call();
        }
      },
      acceptFile (file) {
        const extType = file.name.split('.').at(-1);
        const mimeType = file.type;
        const toUpperCase = (string) => String.prototype.toUpperCase.call(string);
        let message = '';
        let r = Promise.resolve;
        const accept = getFileType(
          this.accept.split(',').map(toUpperCase),
          toUpperCase
        );
        if (!accept.includes(toUpperCase(extType))) {
          message = this.getTip('noAccept', extType);
        }
        const exactMimeType = getMimeType(extType);
        if (this.strictAccept && exactMimeType && mimeType !== exactMimeType) {
          message = this.getTip('noAcceptContent');
        }
        if (message) {
          this.$message.error(message);
        }
        return r;
      },

      limitMaxFileSize (file) {
        const limitMb = processFileUnitToMb(this.maxFileSize);
        const actualMb = divide(file.size, 1024).toFixed(2);
        let r = Promise.resolve;
        if (actualMb > limitMb) {
          r = Promise.reject;
          this.$message.error(this.getTip('exceedSize', this.maxFileSize));
        }

        return r;
      },
      async limitFileWidthOrHeight (file) {
        const message = await limitFileContourSize(file, this.limitFile);
        if (message) {
          this.$message.error(message);
          return Promise.reject;
        }
        return Promise.resolve;

      }
    }

  };
}
