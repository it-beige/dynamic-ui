import DyAutocomplete from './src/autocomplete';

/* istanbul ignore next */
DyAutocomplete.install = function(Vue) {
  Vue.component(DyAutocomplete.name, DyAutocomplete);
};

export default DyAutocomplete;
