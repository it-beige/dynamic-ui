import FormGenerate from './src/main';
import { injectComponent } from 'main/config/component';

/* istanbul ignore next */
FormGenerate.install = function(Vue) {
  Vue.component(FormGenerate.name, FormGenerate);
};

FormGenerate.injectComponent = injectComponent;

export default FormGenerate;
