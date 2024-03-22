import FormGenerate from './src/main';
import { injectFormComponent } from 'main/config/form';

/* istanbul ignore next */
FormGenerate.install = function (Vue) {
  Vue.component(FormGenerate.name, FormGenerate);
};

export {
  injectFormComponent
};
export * from 'main/helper/props';
export default FormGenerate;
