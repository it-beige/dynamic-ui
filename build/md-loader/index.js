const { stripScript, stripTemplate, genInlineComponentText } = require('./util');
const md = require('./config');

function getImportStatement(str) {
  // eslint-disable-next-line
  let reg = /import ((?:\{[^{}]+\}|\w+)) from 'dynamic-ui\/(src|packages)\/(.+?)'/g;
  const importMap = new Map();
  const exportsPackageSet = new Set();
  const aliasMap = new Map();
  str = str.replace(reg, (...arg) => {
    let [, name, alias, path] = arg;

    if (!aliasMap.has(path)) {
      aliasMap.set(path, alias === 'src' ? 'main' : 'packages');
    }

    const reg = /[{}]/g;
    if (reg.test(name)) {
      name = name.replace(reg, '').trim();
      exportsPackageSet.add(path);
    }

    if (!importMap.has(path)) {
      importMap.set(path, new Set());
    }

    const set = importMap.get(path);
    const packages = name.split(',');
    packages.forEach(i => {
      if (!set.has(i)) {
        set.add(i);
      }
    });

    return '';
  });
  let imports = Array.from(importMap.keys()).map(path => {
    const set = importMap.get(path);
    let packageStr = Array.from(set).join(',');
    if (exportsPackageSet.has(path)) {
      packageStr = `{ ${packageStr} }`;
    }
    const alias = aliasMap.get(path);
    return `import ${packageStr} from '${alias}/${path}'`;
  });

  return [str, imports];
}

module.exports = function (source) {
  const content = md.render(source);

  const startTag = '<!--dynamic-demo:';
  const startTagLen = startTag.length;
  const endTag = ':dynamic-demo-->';
  const endTagLen = endTag.length;

  let componenetsString = '';
  let id = 0; // demo 的 id
  let output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const html = stripTemplate(commentContent);
    const script = stripScript(commentContent);
    let demoComponentContent = genInlineComponentText(html, script);
    const demoComponentName = `dynamic-demo${id}`;
    output.push(`<template slot="source"><${demoComponentName} /></template>`);
    componenetsString += `${JSON.stringify(
      demoComponentName,
    )}: ${demoComponentContent},`;

    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑
  let pageScript = '';
  if (componenetsString) {
    let [str, imports] = getImportStatement(componenetsString);
    componenetsString = str;
    pageScript = `<script>
      ${imports.join(';\n')}
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        },
      }
    </script>`;

    /* import
    import request form 'dynamic-ui/src/mixins/request.js';
  */
  } else if (content.indexOf('<script>') === 0) {
    // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start));
  return `
    <template>
      <section class="content dynamic-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `;
};
