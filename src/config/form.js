import Input from 'packages/input';
// import Input from 'packages/popover-input';
import SelectGenerate from 'packages/select-generate';
import RadioGenerate from 'packages/radio-generate';
import CheckboxGenerate from 'packages/checkbox-generate';
import UploadGenerate from 'packages/upload-generate';
import DatePicker from 'packages/date-picker';
import { getComponentByName as getPackageComponentByName } from './component';
import { kebabToUpperCamel } from 'main/utils/util';

const FORM_COMPONENTS = {
  input: Input,
  select: SelectGenerate,
  radio: RadioGenerate,
  checkbox: CheckboxGenerate,
  upload: UploadGenerate,
  date: DatePicker
};

const commonAttreibutes = [
  'accept',
  'autocomplete',
  'capture',
  'crossorigin',
  'dirname',
  'disabled',
  'elementtiming',
  'for',
  'max',
  'maxlength',
  'min',
  'minlength',
  'multiple',
  'pattern',
  'placeholder',
  'readonly',
  'rel',
  'required',
  'size',
  'step'
];

const COMPONENT_ATTRIBUTES = Object.keys(FORM_COMPONENTS).reduce((o, name) => {
  o[name] = [...commonAttreibutes];
  return o;
}, {});

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
  const component = FORM_COMPONENTS[name] || getPackageComponentByName(kebabToUpperCamel(name));
  if (!component) {
    console.error(`[Dynamic Error] 表单组件不支持的表单项：${name}`);
    return;
  }
  return component;
};

export function getFormItemComponentAttribute(name) {
  if (!name) {
    console.error('[FormGlobal Error]表单项不能为空');
    return;
  }
  // eslint-disable-next-line
  if (FORM_COMPONENTS[name] && !COMPONENT_ATTRIBUTES[name]) {
    console.error(
      `[FormGlobal Error] 不存在的attribute：${name}`,
    );
    return;
  }
  return COMPONENT_ATTRIBUTES[name];
}
