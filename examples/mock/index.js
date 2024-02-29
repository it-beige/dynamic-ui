const Mock = require('mockjs');
const URL = require('../api/url');

const common = {
  code: '200',
  message: 'success'
};

const listData = Mock.mock({
  ...common,
  data: {
    'list|25': [{
      'id|+1': 1,
      'label': function() {
        const labels = ['黄金糕', '双皮奶', '蚵仔煎', '龙须面', '北京烤鸭'];
        const idx = this.id - 1;
        let label = labels[idx % labels.length];
        const coefficient = parseInt(idx / labels.length, 10);
        return `${label}${Array(coefficient).fill(this.id % labels.length).join('')}`;
      },
      'value|+10': function() {
        return '选项' + this.id;
      }
    }],
    total: 25
  }
});

const treeData = {
  ...common,
  data: {
    list: [
      {
        name: '热门城市',
        options: [
          {
            code: 'Shanghai',
            name: '上海'
          },
          {
            code: 'Beijing',
            name: '北京'
          }
        ]
      },
      {
        name: '城市名',
        options: [
          {
            code: 'Chengdu',
            name: '成都'
          },
          {
            code: 'Shenzhen',
            name: '深圳'
          },
          {
            code: 'Guangzhou',
            name: '广州'
          },
          {
            code: 'Dalian',
            name: '大连'
          }
        ]
      },
      {
        'name': '一组城市',
        'options': [
          {
            'code': 'Chengdu',
            'name': '成都'
          },
          {
            'code': 'Shenzhen',
            'name': '深圳'
          },
          {
            'code': 'Guangzhou',
            'name': '广州'
          },
          {
            'code': 'Dalian',
            'name': '大连'
          }
        ]
      },
      {
        'name': '二组城市',
        'options': [
          {
            'code': 'Qingdao',
            'name': '青岛'
          },
          {
            'code': 'Ningbo',
            'name': '宁波'
          },
          {
            'code': 'Xiamen',
            'name': '厦门'
          },
          {
            'code': 'Changchun',
            'name': '长春'
          }
        ]
      },
      {
        'name': '三组城市',
        'options': [
          {
            'code': 'Wuhan',
            'name': '武汉'
          },
          {
            'code': 'Tianjin',
            'name': '天津'
          },
          {
            'code': "Xi'an",
            'name': '西安'
          },
          {
            'code': 'Qingdao',
            'name': '青岛'
          }
        ]
      },
      {
        'name': '四组城市',
        'options': [
          {
            'code': 'Dalian',
            'name': '大连'
          },
          {
            'code': 'Shijiazhuang',
            'name': '石家庄'
          },
          {
            'code': 'Jinan',
            'name': '济南'
          },
          {
            'code': 'Ningbo',
            'name': '宁波'
          }
        ]
      },
      {
        'name': '五组城市',
        'options': [
          {
            'code': 'Harbin',
            'name': '哈尔滨'
          },
          {
            'code': 'Changsha',
            'name': '长沙'
          },
          {
            'code': 'Fuzhou',
            'name': '福州'
          },
          {
            'code': 'Hefei',
            'name': '合肥'
          }
        ]
      }
    ],
    total: 7
  },
  total: 7
};

module.exports = function beforeMock(middlewares, devServer) {
  devServer.app.get(URL.getList, (req, res) => {
    res.json(listData);treeData;
  });
  devServer.app.get(URL.getTreeList, (req, res) => {
    res.json(treeData);
  });
  return middlewares;
};
