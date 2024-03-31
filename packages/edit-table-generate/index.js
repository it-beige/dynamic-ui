import EditTableGenerate from './src/main';

/* istanbul ignore next */
EditTableGenerate.install = function (Vue) {
  Vue.component(EditTableGenerate.name, EditTableGenerate);
};

export default EditTableGenerate;
