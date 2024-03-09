const Mock = require('mockjs');
const URL = require('../api/url');
const _ = require('lodash');

const getParams = (url) => {
  const [baseUrl, queryString] = _.split(url, '?');
  const queryParams = _.split(queryString, '&');
  const params = _.map(queryParams, param => _.split(param, '='));
  const queryParamsObject = _.fromPairs(params);
  return queryParamsObject;

};

function offsetData (res, params) {
  let page = params.page || params.pageNo;
  let size = params.size || params.pageSize;
  let data = res.data;
  let list = data.list;
  if (page && size) {
    const start = (page - 1) * size;
    const end = page * size;
    list = list.slice(start, end);
  }
  return {...res, data: {...data, list}};
}

const common = {
  code: '200',
  message: 'success'
};

Mock.Random.incrementId = (() => {
  let id = 0;
  return function() {
    id++;
    return id.toString();
  };
})();

const listData = Mock.mock({
  ...common,
  data: {
    'list|25': [
      {
        'id|+1': '@incrementId',
        name: function () {
          const names = ['黄金糕', '双皮奶', '蚵仔煎', '龙须面', '北京烤鸭'];
          const idx = this.id - 1;
          let name = names[idx % names.length];
          const coefficient = parseInt(idx / names.length, 10);
          return `${name}${Array(coefficient)
            .fill(this.id % names.length)
            .join('')}`;
        },
        'code|+10': function () {
          return '选项' + this.id;
        }
      }
    ],
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
        name: '一组城市',
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
        name: '二组城市',
        options: [
          {
            code: 'Qingdao',
            name: '青岛'
          },
          {
            code: 'Ningbo',
            name: '宁波'
          },
          {
            code: 'Xiamen',
            name: '厦门'
          },
          {
            code: 'Changchun',
            name: '长春'
          }
        ]
      },
      {
        name: '三组城市',
        options: [
          {
            code: 'Wuhan',
            name: '武汉'
          },
          {
            code: 'Tianjin',
            name: '天津'
          },
          {
            code: "Xi'an",
            name: '西安'
          },
          {
            code: 'Qingdao',
            name: '青岛'
          }
        ]
      },
      {
        name: '四组城市',
        options: [
          {
            code: 'Dalian',
            name: '大连'
          },
          {
            code: 'Shijiazhuang',
            name: '石家庄'
          },
          {
            code: 'Jinan',
            name: '济南'
          },
          {
            code: 'Ningbo',
            name: '宁波'
          }
        ]
      },
      {
        name: '五组城市',
        options: [
          {
            code: 'Harbin',
            name: '哈尔滨'
          },
          {
            code: 'Changsha',
            name: '长沙'
          },
          {
            code: 'Fuzhou',
            name: '福州'
          },
          {
            code: 'Hefei',
            name: '合肥'
          }
        ]
      }
    ],
    total: 7
  },
  total: 7
};

const renMethodData = {
  data: [
    {
      name: '规划区块内等价置换',
      code: 1
    },
    {
      name: '协议收回',
      code: 2
    },
    {
      name: '其他',
      code: 0
    }
  ]
};

const finChannelList = {
  data: [
    {
      name: '自有资金',
      code: 1
    },
    {
      name: '银行贷款',
      code: 2
    },
    {
      name: '向亲朋借款',
      code: 3
    },
    {
      name: '民间借贷',
      code: 4
    },
    {
      name: '股权融资',
      code: 5
    },
    {
      name: '债券融资',
      code: 6
    },
    {
      name: '凤险投资',
      code: 7
    },
    {
      name: '外资',
      code: 8
    },
    {
      name: '其他',
      code: 0
    }
  ]
};

const finThereCultyList = {
  data: [
    {
      name: '利率太高',
      code: 1
    },
    {
      name: '缺乏融资渠道',
      code: 2
    },
    {
      name: '政府扶持政策缺失',
      code: 3
    },
    {
      name: '中小银行数量太少',
      code: 4
    },
    {
      name: '缺乏与银行良好的私人关系',
      code: 5
    },
    {
      name: '缺乏担保',
      code: 6
    },
    {
      name: '企业规模太小',
      code: 7
    },
    {
      name: '信用受限',
      code: 8
    },
    {
      name: '其他',
      code: 0
    }
  ]
};

module.exports = function beforeMock(middlewares, devServer) {
  devServer.app.get(URL.getList, (req, res) => {
    const params = getParams(req.url);
    res.json(offsetData(listData, params));
  });
  devServer.app.get(URL.getTreeList, (req, res) => {
    res.json(treeData);
  });

  devServer.app.get(URL.getRenMethodList, (req, res) => {
    res.json(renMethodData);
  });

  devServer.app.get(URL.getFinChannelList, (req, res) => {
    res.json(finChannelList);
  });

  devServer.app.get(URL.getFinThereCultyList, (req, res) => {
    res.json(finThereCultyList);
  });
  return middlewares;
};
