import Input from 'packages/input';
// import Input from 'packages/popover-input';
import SelectGenerate from 'packages/select-generate';
import RadioGenerate from 'packages/radio-generate';
import CheckboxGenerate from 'packages/checkbox-generate';
import UploadGenerate from 'packages/upload-generate';

const FORM_COMPONENTS = {
  input: Input,
  select: SelectGenerate,
  radio: RadioGenerate,
  checkbox: CheckboxGenerate,
  upload: UploadGenerate
};

export function injectFormComponent(injectComps) {
  injectComps.forEach(([name, component]) => {
    if (!name) {
      console.error('[Dynamic Error]注册表单项名称不能为空');
      return;
    }
    if (!component) {
      console.error('[Dynamic Error]注册表单项组件名称不能为空');
      return;
    }

    FORM_COMPONENTS[name] = component;
  });
};

export function getComponentByName(name) {
  if (!name) {
    console.error('[Dynamic Error]表单项不能为空');
    return;
  }
  if (!FORM_COMPONENTS[name]) {
    console.error(`[Dynamic Error] 表单组件不支持的表单项：${name}`);
    return;
  }
  return FORM_COMPONENTS[name];
};

