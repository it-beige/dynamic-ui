
import _ from 'lodash';
import { getPlaceholderByName, getTriggerByName, getClearableByName, getTypeByName } from 'main/helper/props';

export function genRequired(n) {
  const { label, component, props = {} } = n;
  const tirgger = getTriggerByName(component);
  let type = getTypeByName(component);
  if (component === 'radio' && props.group === false) {
    type = getTypeByName('checkbox');
  }
  const requiredRule = {
    required: true,
    message: `${label || ''}不能为空`,
    type,
    tirgger
  };

  if (_.isPlainObject(n.itemProps.rules)) {
    n.itemProps.rules = [n.itemProps.rules];
  }
  n.itemProps.rules = (_.isArray(n.itemProps.rules) || []).concat(requiredRule);
}

export function genModifiers(n, { trim, number }) {
  const noop = val => val;
  const extendFormatter = (enhancerFormatter, n) => {
    const originalFormatter = n.formatter || noop;
    n.formatter = val => {
      return originalFormatter(enhancerFormatter(val));
    };
  };

  if (trim) {
    extendFormatter(val => {
      return _.isFunction(val?.trim) ? val.trim() : val;
    }, n);
  }

  if (number) {
    // fix async-validator type string. This is the default type.
    if (n.itemProps?.rules) {
      const rule = n.itemProps.rules.find(i => i.required);
      if (rule) {
        rule.type = 'number';
      }
    }
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
    if (prefix) {
      props.placeholder = `${prefix}${label || ''}`;
    }
  }

}

export function genComponentProps(config) {
  for (let n of config) {
    n.props ??= {};
    n.itemProps ??= {};

    if (getClearableByName(n.component) && !Reflect.has(n.props, 'clearable')) {
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
  // 正整数
  NUM: /^(?!0\d)\d+$/,
  // 小数且最多允许两位小数
  NUM_2: /^(?!(?:0\d)\d*$)(?!\d+(\.\d{0,1}?0)?$)\d+(\.\d{1,2})?$/,
  // 正整数、小数、负数
  NUM_3: /^-?\d+(\.\d+)?$/,
  // 正整数、小数
  NUM_4: /^\d+(\.\d+)?$/,
  // 手机号
  PHONE: /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/,
  // 邮箱
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // 银行卡号
  BANK_NO: /^[1-9]\d{9,29}$/,
  // 身份证号
  ID_NO: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
  // 邮政编码
  POSTAL_CODE: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/
};

// 校验数据必须匹配正则
export const generateValidateByRegExp = pattern => {
  return (rule, value) => {
    if (!value) {
      return Promise.resolve();
    }

    let reg = new RegExp(pattern.source, pattern.flags);
    if (!reg.test(value)) {
      return Promise.reject(new Error(rule.message));
    } else {
      return Promise.resolve();
    }
  };
};

export const generateValidateMessage = (label) => {
  return `请输入合法的${label}`;
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
