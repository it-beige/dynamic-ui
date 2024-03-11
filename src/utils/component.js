import _, { cloneDeep, isString, isPlainObject, isArray, isFunction, isUndefined, isNull } from './lodash';
import {
  kebabToCamel,
  replaceKebabReg
} from './util';

export function componentNameToTag(name) {
  return _.toLower(name.replace(/([a-z0-9])([A-Z])/g, '$1-$2'));
}

export function attrsKebabToCamel(attrs) {
  return Object.keys(attrs).reduce((o, i) => {
    let prop = i;
    const value = attrs[i];
    const isKebabAttr = replaceKebabReg.test(i);
    if (isKebabAttr) {
      prop = kebabToCamel(i);
    }
    o[prop] = value;
    return o;
  }, {});

}

export const getCompPropsBySourceOpt = (component, skipProps = []) => {
  const selfProps = component.props;
  let props = { ...selfProps };
  if (skipProps.length) {
    skipProps.forEach(prop => {
      if (Reflect.has(props, prop)) {
        Reflect.deleteProperty(props, prop);
      }
    });
  }
  if (component.mixins) {
    component.mixins.reduce((props, opt) => {
      return Object.assign(props, opt.props || {});
    }, props);
  }
  return cloneDeep(props);
};

export const getProvidesOptionBySourceOpt = (provide, consumer) => {
  return Object.keys(provide).reduce((p, k) => {
    p[k] = consumer[k];
    return p;
  }, {});
};

export const buildClass = (classSheet) => {
  if (isString(classSheet)) {
    return classSheet;
  }
  if (isPlainObject(classSheet)) {
    return Object.keys(classSheet).reduce((className, i) => {
      const isTrue = !!classSheet[i];
      if (isTrue) {
        className += ` ${i}`;
      }
      return className;
    }, '');
  }
  if (isArray(classSheet)) {
    return classSheet.map(i => buildClass(i)).join(' ');
  }
};

export const genComponentPorps = (props) => {
  return [class ComponentProps {
    constructor(option = {}) {
      Object.keys(props).forEach(k => {
        let value = props[k];
        if (Reflect.has(option, k)) {
          value = option[k];
        }
        this[k] = value;
      });
    }
  }, function pick (props) {
    return Object.keys(props).reduce((p, k) => {
      const prop = props[k];
      if (isPlainObject(prop)) {
        if (isFunction(prop.default)) {
          p[k] = prop.default();
        } else {
          p[k] = prop.default;
        }
      } else {
        p[k] = isFunction(prop) ? prop() : prop;
      }
      return p;
    }, {});
  }];
};

export const genFormItemValue = (model, config) => {
  model = cloneDeep(model);
  const enumComponent = ['checkbox', 'upload'];
  for (let n of config) {
    let { prop, component, value, cascaderConfig } = n;

    // 对象有设置值不进行初始化
    if (_.has(model, prop)) {
      continue;
    }

    // 给表单项设置初始值
    if (isUndefined(value) || isNull(value)) {
      _.set(model, prop, enumComponent.includes(component) ? [] : value);
    }

    if (isArray(cascaderConfig)) {
      return genFormItemValue(model, cascaderConfig);
    }
  }
  return model;
};
