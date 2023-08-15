import DyCheckbox from './src/checkbox';

/* istanbul ignore next */
DyCheckbox.install = function(Vue) {
  Vue.component(DyCheckbox.name, DyCheckbox);
};

export default DyCheckbox;
