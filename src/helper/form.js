
import _ from 'lodash';
import { getPlaceholderByName, getTriggerByName, getClearableByName } from 'main/helper/props';

export function genRequired(n) {
  const { label, component } = n;
  const tirgger = getTriggerByName(component);
  const requiredRule = {
    required: true,
    message: `${label || ''}不能为空`,
    tirgger
  };

  n.rules = (_.isArray(n.rules) || []).concat(requiredRule);
}

export function genModifiers(n, { trim, number }) {
  const noop = val => val;
  const extendFormatter = (enhancerFormatter, n) => {
    const originalFormatter = n.formatter || noop;
    n.formatter = val => {
      return originalFormatter(enhancerFormatter(val));
    };
  };

  if (trim.includes(n.prop)) {
    extendFormatter(val => {
      return _.isFunction(val.trim) ? val.trim() : val;
    }, n);
  }

  if (number.includes(n.prop)) {
    extendFormatter(val => {
      return REG_PATTERN.NUM_3.test(val) ? +val : val;
    }, n);
  }
}

export function genPlaceholder(n) {
  const { props, label, component } = n;
  let placeholder = props.placeholder;
  if (!placeholder) {
    const prefix = getPlaceholderByName(component);
    placeholder = `${prefix}${label || ''}`;
  }
  return placeholder;
}

export function genComponentProps(config) {

  for (let n of config) {
    n.props ??= {};
    if (!Reflect.has(n.props, 'clearable')) {
      n.props.clearable = true;
    }

    if (_.isArray(n.cascaderConfig)) {
      genComponentProps(n.cascaderConfig);
    }
  }
  return config;
}

// /** ************************** 表单值合法性校验---start ************************************************/
export const REG_PATTERN = {
  // 正数
  NUM: /^\d+$/,
  // 正数且最多允许两位小数
  NUM_2: /^\d+(\.\d{1,2})?$/,
  // 正数、小数、负数
  NUM_3: /^-?\d+(\.\d+)?$/,
  // 正数、小数
  NUM_4: /^\d+(\.\d+)?$/,
  // 手机号
  PHONE:
    /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/, // eslint-disable-line
};

// 校验数据必须匹配正则
export const generateValidateByRegExp = pattern => {
  return (rule, value, callback) => {
    if (!value) {
      callback();
    }

    let reg = new RegExp(pattern.source, pattern.flags);
    if (!reg.test(value)) {
      callback(new Error(rule.message));
    } else {
      callback();
    }
  };
};

// export const generateValidateTableByRegExp = pattern => {
//   return ({ cellValue, rule }) => {
//     if (!cellValue) {
//       return Promise.resolve();
//     }

//     let reg = new RegExp(pattern.source, pattern.flags);
//     if (!reg.test(cellValue)) {
//       return Promise.reject(new Error(rule.message));
//     } else {
//       return Promise.resolve();
//     }
//   };
// };
/** ************************** 表单值合法性校验---end ************************************************/
