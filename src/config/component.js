const COMPONENT_PREFIX = 'Dy';

export const getComponentPrefix = () => {
  return COMPONENT_PREFIX;
};

export function installComponent(Vue, component) {
  Vue.component(component.name, component);
}
