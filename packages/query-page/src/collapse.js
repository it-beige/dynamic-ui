const collapseVessel = (el) => {
  el.style.height = el.dataset.collapseHeight;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.overflow = 'hidden';
};
const collapseExpand = (el) => {
  el.style.height = el.dataset.oldHeight;
  el.style.paddingTop = el.dataset.oldPaddingTop;
  el.style.paddingBottom = el.dataset.oldPaddingBottom;
  el.style.overflow = el.dataset.oldOverflow;
};

export default {
  bind(el) {
    if (!el.dataset) {
      el.dataset = {};
    }
    el.style.transition = '0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out';
  },
  inserted (el, binding) {
    const { height, paddingTop, paddingBottom, overflow} = window.getComputedStyle(el);
    const firstRow = el.querySelector('.dy-col');

    const isCollapse = binding.value;
    el.dataset.oldPaddingTop = paddingTop;
    el.dataset.oldPaddingBottom = paddingBottom;
    el.dataset.oldHeight = height;
    el.dataset.oldOverflow = overflow;
    el.dataset.collapseHeight = window.getComputedStyle(firstRow).height;

    if (isCollapse) {
      collapseVessel(el);
    }

  },
  update(el, binding) {
    const isCollapse = binding.value;

    isCollapse ? collapseVessel(el) : collapseExpand(el);
  }
};
