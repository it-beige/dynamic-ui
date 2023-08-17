import SelectGenerate from './src/main';

SelectGenerate.install = function(Vue) {
  Vue.component(SelectGenerate.name, SelectGenerate);
};

export default SelectGenerate;
