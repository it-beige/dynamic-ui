'use strict';

var postcss = require('postcss');
var fs = require('fs');
var path = require('path');

function genIconList(fontFile, iconDirName) {
  var nodes = postcss.parse(fontFile).nodes;
  var classList = [];

  nodes.forEach((node) => {
    var selector = node.selector || '';
    var reg = new RegExp(/\.dy-icon\d?-([^:]+):before/);
    var arr = selector.match(reg);

    if (arr && arr[1]) {
      classList.push(arr[1]);
    }
  });

  classList.reverse(); // 希望按 css 文件顺序倒序排列
  fs.writeFile(path.resolve(__dirname, `../../examples/icons/${iconDirName}.json`), JSON.stringify(classList), () => {});

}

var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8');
var font1File = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon1.scss'), 'utf8');
var font2File = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon2.scss'), 'utf8');

genIconList(fontFile, 'icon');
genIconList(font1File, 'icon1');
genIconList(font2File, 'icon2');

