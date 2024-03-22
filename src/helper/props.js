import globalConfig from 'main/config/global';

const PLACEHOLDER = {
  input: '请输入',
  select: '请选择',
  date: '请选择'
};

const TRIGGER = {
  blur: ['input'],
  change: [
    'date',
    'select',
    'radio',
    'checkbox',
    'upload',
    'date'
  ]
};

const CLEARABLE = [
  'input',
  'select'
];

export function injectPlaceholder(injectPlaceholders) {
  injectPlaceholders.forEach(([name, placeholder]) => {
    if (!name) {
      console.error('[Dynamic Error]注册表单项名称不能为空');
      return;
    }
    if (!placeholder) {
      console.error('[Dynamic Error]注册表单项placeholder前缀不能为空');
      return;
    }

    PLACEHOLDER[name] = placeholder;
  });
};

export function getPlaceholderByName(name) {
  if (!name) {
    console.error('[Dynamic Error]表单项不能为空');
    return;
  }
  if (!PLACEHOLDER[name]) {
    console.error(`[Dynamic Error] 表单组件不支持的表单项：${name}`);
    return;
  }
  return PLACEHOLDER[name];
};

export function injectTrigger(injectTriggers) {
  injectTriggers.forEach(([name, trigger]) => {
    if (!name) {
      console.error('[Dynamic Error]注册表单项名称不能为空');
      return;
    }
    if (!trigger) {
      console.error('[Dynamic Error]注册表单项trigger不能为空');
      return;
    }

    TRIGGER[name] = trigger;
  });
};

export function getTriggerByName(name) {
  if (!name) {
    console.error('[Dynamic Error]表单项不能为空');
    return;
  }
  if (!TRIGGER[name]) {
    console.error(`[Dynamic Error] 表单组件不支持的表单项：${name}`);
    return;
  }
  return TRIGGER[name];
};

export function injectClearable(injectClearables) {
  injectClearables.forEach((name) => {
    if (!name) {
      console.error('[Dynamic Error]注册表单项名称不能为空');
      return;
    }
    CLEARABLE.push(name);
  });
};

export function getClearableByName(name) {
  if (!name) {
    console.error('[Dynamic Error]表单项不能为空');
    return;
  }
  if (!CLEARABLE[name]) {
    console.error(`[Dynamic Error] 表单组件不支持的表单项：${name}`);
    return;
  }
  return CLEARABLE[name];
};

export function genFormConfig(config, fields) {
  const { genRequired, genModifiers, genPlaceholder } = globalConfig;
  const { required = [], trim = [], number = [], placeholder = [] } = fields;
  for (let n of config) {
    const { prop } = n;
    if (required.includes(prop)) {
      genRequired(n);
    }
    if ([...trim, ...number].includes(prop)) {
      genModifiers(n, { trim, number });
    }

    if (placeholder.includes(prop)) {
      genPlaceholder(n);
    }

    if (Array.isArray(n.cascaderConfig)) {
      genFormConfig(n.cascaderConfig, fields);
    }
  }
  return config;
}

