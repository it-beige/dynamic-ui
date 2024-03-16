import TableCustomColumnGenerate from '../table-generate/src/custom-column.vue';

/* istanbul ignore next */
TableCustomColumnGenerate.install = function (Vue) {
  Vue.component(TableCustomColumnGenerate.name, TableCustomColumnGenerate);
};

export default TableCustomColumnGenerate;
