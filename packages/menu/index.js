import DyMenu from './src/menu';

/* istanbul ignore next */
DyMenu.install = function(Vue) {
  Vue.component(DyMenu.name, DyMenu);
};

export default DyMenu;
