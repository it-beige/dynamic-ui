import { isPlainObject } from 'main/utils/lodash';
import { getValueByPath } from 'main/utils/util';
import {
  multiply
} from 'main/utils/operate';

const defaultResolve = (response) => {
  return response.data;
};

export function parseResponse (response, props, resolve = defaultResolve) {
  let data = resolve(response);
  const { name, url } = props;
  return {
    ...data,
    [name]: data[name],
    url: data[url]
  };
}

export const textTypeMap = [
  ['txt', 'text/plain'],
  ['html', 'text/html'],
  ['css', 'text/css'],
  ['js', 'application/javascript'],
  ['json', 'application/json']
];

export const imageTypeMap = [
  ['jpeg', 'image/jpeg'],
  ['jpg', 'image/jpeg'],
  ['png', 'image/png'],
  ['gif', 'image/gif'],
  ['bmp', 'image/bmp'],
  ['svg', 'image/svg+xml']
];

export const audioTypeMap = [
  ['mp3', 'audio/mpeg'],
  ['wav', 'audio/wav'],
  ['ogg', 'audio/ogg']
];

export const videoTypeMap = [
  ['mp4', 'video/mp4'],
  ['avi', 'video/x-msvideo'],
  ['mov', 'video/quicktime'],
  ['mkv', 'video/x-matroska']
];

export const compressionTypeMap = [
  ['zip', 'application/zip'],
  ['rar', 'application/x-rar-compressed'],
  ['7z', 'application/x-7z-compressed']
];

export const pdfTypeMap = [
  ['pdf', 'application/pdf']
];

export const officeTypeMap = [
  ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ['doc', 'application/msword'],
  ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  ['xls', 'application/vnd.ms-excel'],
  ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  ['ppt', 'application/vnd.ms-powerpoint']
];

export const fileTypeMap = new Map([
  ...textTypeMap,
  ...imageTypeMap,
  ...audioTypeMap,
  ...videoTypeMap,
  ...compressionTypeMap,
  ...pdfTypeMap,
  ...officeTypeMap
]);

export const fileTypeHash = {
  text: new Map([...textTypeMap]),
  image: new Map([...imageTypeMap]),
  audio: new Map([...audioTypeMap]),
  video: new Map([...videoTypeMap]),
  application: new Map([...pdfTypeMap, ...compressionTypeMap, ...officeTypeMap ])
};

export function getFileType (accept, toUpperCase) {
  const mimeReg = /(.+)\/(.+)/g;
  return accept.reduce((_, i) => {
    const reg = new RegExp(mimeReg.source);
    if (reg.test(i)) {
      const [, mime, type] = reg.exec(i);
      const mimeMap = fileTypeHash[mime.toLowerCase()];
      if (type === '*') {
        const types = Array.from(mimeMap.keys()).map(toUpperCase);
        _.push(...types);
      } else {
        _.push(toUpperCase(type));
      }
    } else {
      _.push(toUpperCase(i));
    }

    return _;
  }, []);
}

export function getMimeType (fileExtension) {
  const mime = fileTypeMap.get(fileExtension.toLowerCase());
  return mime;
}

export function processFileUnitToMb (size) {
  const toUpperCase = (s) => String.prototype.toUpperCase.call(s);
  const units = ['KB', 'MB', 'GB'];
  const isUnit = units.some(unit => toUpperCase(size).endsWith(unit));
  if (!isUnit) {
    return size;
  }

  const num = size.slice(0, -2);
  const unit = size.slice(-2);
  let unitIdx = units.indexOf(unit) + 1;
  const transform = (num) => multiply(num, 1024);
  let processNum;
  while (unitIdx) {
    processNum = transform(num);
    --unitIdx;
  }
  return processNum;
}

const tipConfig = {
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
};
const PLACEHOLDE_RREG = /\{([A-z]+)\}/g;

export function getTip (attr, replaceValue) {

  let placeholderText = getValueByPath(tipConfig, attr);
  if (PLACEHOLDE_RREG.test(placeholderText)) {
    placeholderText = placeholderText.replace(PLACEHOLDE_RREG, replaceValue);
  }
  return placeholderText;
}

export function limitFileContourSize (file, fileContour, getTip) {
  if (!isPlainObject(fileContour)) {
    console.error('[Dynamic Error UploadGenerate]' + 'limitFile props must be an object');
    return;
  }
  const {
    width,
    height,
    maxWidth = 0,
    maxHeight = 0,
    minWidth = 0,
    minHeight = 0,
    offsetWidth = 0,
    offsetHeight = 0
  } = fileContour;

  // 校验参数
  const isExceedWidth = Math.min(maxWidth - minWidth, 0);
  const isExceedHeight = Math.min(maxHeight - minHeight, 0);

  if (isExceedWidth < 0) {
    console.error('[Dynamic Error UploadGenerate]' + '最大宽度不能小于最小宽度');
    return;
  }
  if (isExceedHeight < 0) {
    console.error('[Dynamic Error UploadGenerate]' + '最大高度不能小于最小高度');
    return;
  }

  const _URL = window.URL || window.webkitURL;
  const img = new Image();
  let message = '';
  return new Promise((resolve) => {
    img.onload = () => {
      if (width && img.width !== width) {
        message = getTip('limitFile.width');
      }
      if (height && img.height !== height) {
        message = getTip('limitFile.height');
      }

      const restWidth = img.width - maxWidth;
      const restHeight = img.height - maxHeight;

      if (offsetWidth && offsetHeight) {
        // 当前宽高不能超过最多可以向下偏移的值
        const isExceedOffset =
            Math.max(restWidth + offsetWidth, restHeight + offsetHeight) < 0;

        if (isExceedOffset) {
          message = `文件尺寸超过最小可以向下偏移的值(可以向下偏移：${offsetWidth}*${offsetHeight})`;
        }
      } else {
        const isMinHeight = img.height < minHeight;
        const isMinWidth = img.width < minWidth;

        /* 不能小于指定宽高 */
        if (isMinHeight) {
          message = getTip('limitFile.minHeight', minHeight);
        }
        if (isMinWidth) {
          message = getTip('limitFile.minWidth', minWidth);
        }

        /* 不能超过指定宽高 */
        const isMaxWidth = restWidth > 0;
        const isMaxHeight = restHeight > 0;

        if (isMaxHeight) {
          message = getTip('limitFile.maxHeight', maxHeight);
        }
        if (isMaxWidth) {
          message = getTip('limitFile.maxWidth', maxWidth);
        }
      }

      resolve(message);
    };

    img.src = _URL.createObjectURL(file);
  });

}
