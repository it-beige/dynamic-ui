import SvgIcon from './src/main.vue';
import { injectSvgIcon, loadSvg } from 'main/config/svg';

/* istanbul ignore next */
SvgIcon.install = function(Vue) {
  Vue.component(SvgIcon.name, SvgIcon);
};
loadSvg();
export {
  injectSvgIcon
};
export default SvgIcon;
