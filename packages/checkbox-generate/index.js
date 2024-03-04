import CheckboxGenerate from './src/main';

CheckboxGenerate.install = function (Vue) {
  Vue.component(CheckboxGenerate.name, CheckboxGenerate);
};

export default CheckboxGenerate;
