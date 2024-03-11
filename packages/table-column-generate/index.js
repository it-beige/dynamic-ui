import TableColumnGenerate from '../table-generate/src/column.vue';

/* istanbul ignore next */
TableColumnGenerate.install = function (Vue) {
  Vue.component(TableColumnGenerate.name, TableColumnGenerate);
};

export default TableColumnGenerate;
