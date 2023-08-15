import DyDropdown from './src/dropdown';

/* istanbul ignore next */
DyDropdown.install = function(Vue) {
  Vue.component(DyDropdown.name, DyDropdown);
};

export default DyDropdown;
