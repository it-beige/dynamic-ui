import TableGenerate from './src/main';

/* istanbul ignore next */
TableGenerate.install = function (Vue) {
  Vue.component(TableGenerate.name, TableGenerate);
};

export default TableGenerate;
