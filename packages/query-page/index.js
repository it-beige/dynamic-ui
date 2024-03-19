import queryPage from './src/main';

/* istanbul ignore next */
queryPage.install = function (Vue) {
  Vue.component(queryPage.name, queryPage);
};

export default queryPage;
