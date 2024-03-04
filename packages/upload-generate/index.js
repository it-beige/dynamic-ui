import UploadGenerate from './src/main';

UploadGenerate.install = function (Vue) {
  Vue.component(UploadGenerate.name, UploadGenerate);
};

export default UploadGenerate;
