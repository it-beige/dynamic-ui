import FormGenerate from './src/main';

/* istanbul ignore next */
FormGenerate.install = function(Vue) {
  Vue.component(FormGenerate.name, FormGenerate);
};

export default FormGenerate;
