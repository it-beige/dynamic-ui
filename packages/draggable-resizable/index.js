import DraggableResizable from './src/main';

/* istanbul ignore next */
DraggableResizable.install = function (Vue) {
  Vue.component(DraggableResizable.name, DraggableResizable);
};

export default DraggableResizable;
