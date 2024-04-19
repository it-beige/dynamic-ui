import TreeSelectGenerate from './src/main';

TreeSelectGenerate.install = function (Vue) {
  Vue.component(TreeSelectGenerate.name, TreeSelectGenerate);
};

export default TreeSelectGenerate;
