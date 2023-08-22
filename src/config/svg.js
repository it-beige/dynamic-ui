export const fileIconMap = {
  jpg: 'doc_img',
  jpeg: 'doc_img',
  png: 'doc_img',
  gif: 'doc_img',
  bmp: 'doc_img',
  txt: 'doc_txt',
  css: 'doc_code',
  html: 'doc_html',
  xlsx: 'doc_excel',
  exe: 'doc_exe',
  iso: 'doc_iso',
  ppt: 'doc_ppt',
  pptx: 'doc_ppt',
  zip: 'doc_zip',
  rar: 'doc_zip',
  pdf: 'doc_pdf',
  doc: 'doc_word',
  docx: 'doc_word',
  dir: 'doc_folder'
};

const defaultIcon = 'doc_blank';

export const injectSvgIcon = (type, iconName) => {
  if (!type) {
    console.error('[Dynamic Error]注入的类型不能为空');
    return;
  }
  if (!iconName) {
    console.error('[Dynamic Error]注入的svg name不能为空');
    return;
  }
};

export const getSvgIconByType = (type) => {
  if (!type) {
    console.error('[Dynamic Error]类型不能为空');
    return;
  }
  return fileIconMap[type] || defaultIcon;
};

export const loadSvg = () => {
  const req = require.context('main/svg', true, /\.svg$/);
  const requireAll = (requireContext) =>
    requireContext.keys().map(requireContext);
  requireAll(req);
};
