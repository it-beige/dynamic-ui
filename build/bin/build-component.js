var Components = require('../../components.json');
var fs = require('fs');
var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');
var path = require('path');
var endOfLine = require('os').EOL;

var OUTPUT_PATH = path.join(__dirname, '../../src/config/component.js');
var IMPORT_TEMPLATE = 'import {{name}} from \'packages/{{package}}/index.js\';';
var COMPONENT_NAME_HASH = '  {{componentName}}: {{component}}';
var MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-component.js' */

{{include}}

var CONFIG_COMPONENTS = {
{{includeComponents}}
};

var COMPONENT_PREFIX = 'Dy';

export function getComponentPrefix() {
  return COMPONENT_PREFIX;
};

export function injectComponent(injectComps) {
  injectComps.forEach(([name, component]) => {
    if (!name) {
      console.error('[Dynamic Error]注册表单项名称不能为空');
      return;
    }
    if (!component) {
      console.error('[Dynamic Error]注册表单项组件名称不能为空');
      return;
    }

    CONFIG_COMPONENTS[name] = component;
  });
};

export function getComponentByName(name) {
  if (!name) {
    console.error('[Dynamic Error]表单项不能为空');
    return;
  }
  // eslint-disable-next-line
  if (!CONFIG_COMPONENTS[name]) {
    console.error(\`[Dynamic Error] 表单组件不支持的表单项：\${name}\`);
    return;
  }
  return CONFIG_COMPONENTS[name];
};

export function installComponent(Vue, component) {
  Vue.component(component.name, component);
}
`;

delete Components.font;

var ComponentNames = Object.keys(Components);

var includeComponentTemplate = [];
var includeComponents = [];
var excludeComponents = [
  'Loading',
  'MessageBox',
  'Notification',
  'Message',
  'InfiniteScroll',
  'InputGenerate',
  'SelectGenerate',
  'RadioGenerate',
  'CheckboxGenerate',
  'DialogGenerate',
  'UploadGenerate',
  'TreeSelectGenerate',
  'TreeTableGenerate',
  'FormGenerate',
  'TableGenerate'
];

ComponentNames.forEach(name => {
  var componentName = uppercamelcase(name);
  if (!excludeComponents.includes(componentName)) {
    includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
      name: componentName,
      package: name
    }));
    includeComponents.push(render(COMPONENT_NAME_HASH, {
      componentName: componentName,
      component: componentName
    }));
  }
});

var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  includeComponents: includeComponents.join(',' + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);

