import { cloneDeep } from './lodash';

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

