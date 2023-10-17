import { cloneDeep } from './lodash';
import {
  kebabToCamel
} from './util';

/**
 * @description: 解决$attrs并不会自动将kebab-case转换为camelCase的问题
 * @param {Object} $attrs
 * @param {String} name
 * @return {*} camelCase风格的name
 */
export function getAttrsName($attrs, name) {
  if ($attrs[name]) return $attrs[name];
  let camelCaseName = kebabToCamel(name);
  return $attrs[camelCaseName];
}

export const getCompPropsBySourceOpt = component => {
  const selfProps = component.props;
  let props = { ...selfProps };
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

