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

const TYPE = {
  date: 'date',
  input: 'string',
  checkbox: 'array'
};

export function injectPlaceholder(injectPlaceholders) {
  injectPlaceholders.forEach(([name, placeholder]) => {
    if (!name) {
      console.error('[Dynamic Error]注入placeholder的组件名称不能为空');
      return;
    }
    if (!placeholder) {
      console.error('[Dynamic Error]注入placeholder组件前缀不能为空');
      return;
    }

    PLACEHOLDER[name] = placeholder;
  });
};

export function getPlaceholderByName(name) {
  if (!name) {
    console.error('[Dynamic Error]获取placeholder的组件名称不能为空');
    return;
  }
  if (!PLACEHOLDER[name]) {
    return;
  }
  return PLACEHOLDER[name];
};

export function injectTrigger(injectTriggers) {
  injectTriggers.forEach(([name, trigger]) => {
    if (!name) {
      console.error('[Dynamic Error]注入trigger的组件名称不能为空');
      return;
    }

    if (!trigger) {
      console.error('[Dynamic Error]注入的trigger不能为空');
      return;
    }
    const triggers = TRIGGER[trigger];
    if (!triggers) {
      console.error('[Dynamic Error]注入的trigger只能为blur、change');
      return;
    }
    triggers.push(name);
  });
};

export function getTriggerByName(name) {
  if (!name) {
    console.error('[Dynamic Error]表单项不能为空');
    return;
  }
  const k = Object.keys(TRIGGER).find(k => {
    const names = TRIGGER[k];
    return names.includes(name);
  });
  if (!k) {
    console.error(`[Dynamic Error] 表单组件不支持的trigger：${name}`);
    return;
  }
  return k;
};

export function injectClearable(injectClearables) {
  injectClearables.forEach((name) => {
    if (!name) {
      console.error('[Dynamic Error]注入trigger的组件名称不能为空');
      return;
    }
    CLEARABLE.push(name);
  });
};

export function getClearableByName(name) {
  return CLEARABLE.includes(name);
};

export function injectType(injectTypes) {
  injectTypes.forEach(([name, type]) => {
    if (!name) {
      console.error('[Dynamic Error]注入type的组件名称不能为空');
      return;
    }
    if (!type) {
      console.error('[Dynamic Error]注入type不能为空');
      return;
    }

    TYPE[name] = type;
  });
};

export function getTypeByName(name) {
  if (!name) {
    console.error('[Dynamic Error]获取type的组件名称不能为空');
    return;
  }
  if (!TYPE[name]) {
    return;
  }
  return TYPE[name];
};

export function genFormConfig(config, fields) {
  const { genRequired, genModifiers, genPlaceholder, genComponentProps } = globalConfig;
  genComponentProps(config);
  const { required = [], trim = [], number = [], placeholder = [] } = fields;
  for (let n of config) {
    const { prop } = n;
    if (required.includes(prop)) {
      genRequired(n);
    }
    if ([...trim, ...number].includes(prop)) {
      genModifiers(n, { trim: trim.includes(prop), number: number.includes(prop) });
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

