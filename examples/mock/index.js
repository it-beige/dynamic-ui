const Mock = require('mockjs');
const URL = require('../api/url');
const _ = require('lodash');
const genRandomLocationArr = require('./area');
const Random = Mock.Random;
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
  value: '200',
  message: 'success'
};

Random.incrementId = (() => {
  let id = 0;
  return function() {
    id++;
    return id.toString();
  };
})();
Random.genRandomLocationArr = genRandomLocationArr;

const listData = Mock.mock({
  ...common,
  data: {
    'list|25': [
      {
        'id|+1': '@incrementId',
        label: function () {
          const labels = ['黄金糕', '双皮奶', '蚵仔煎', '龙须面', '北京烤鸭'];
          const idx = this.id - 1;
          let label = labels[idx % labels.length];
          const coefficient = parseInt(idx / labels.length, 10);
          return `${label}${Array(coefficient)
            .fill(this.id % labels.length)
            .join('')}`;
        },
        'value|+10': function () {
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
        label: '热门城市',
        options: [
          {
            value: 'Shanghai',
            label: '上海'
          },
          {
            value: 'Beijing',
            label: '北京'
          }
        ]
      },
      {
        label: '城市名',
        options: [
          {
            value: 'Chengdu',
            label: '成都'
          },
          {
            value: 'Shenzhen',
            label: '深圳'
          },
          {
            value: 'Guangzhou',
            label: '广州'
          },
          {
            value: 'Dalian',
            label: '大连'
          }
        ]
      },
      {
        label: '一组城市',
        options: [
          {
            value: 'Chengdu',
            label: '成都'
          },
          {
            value: 'Shenzhen',
            label: '深圳'
          },
          {
            value: 'Guangzhou',
            label: '广州'
          },
          {
            value: 'Dalian',
            label: '大连'
          }
        ]
      },
      {
        label: '二组城市',
        options: [
          {
            value: 'Qingdao',
            label: '青岛'
          },
          {
            value: 'Ningbo',
            label: '宁波'
          },
          {
            value: 'Xiamen',
            label: '厦门'
          },
          {
            value: 'Changchun',
            label: '长春'
          }
        ]
      },
      {
        label: '三组城市',
        options: [
          {
            value: 'Wuhan',
            label: '武汉'
          },
          {
            value: 'Tianjin',
            label: '天津'
          },
          {
            value: "Xi'an",
            label: '西安'
          },
          {
            value: 'Qingdao',
            label: '青岛'
          }
        ]
      },
      {
        label: '四组城市',
        options: [
          {
            value: 'Dalian',
            label: '大连'
          },
          {
            value: 'Shijiazhuang',
            label: '石家庄'
          },
          {
            value: 'Jinan',
            label: '济南'
          },
          {
            value: 'Ningbo',
            label: '宁波'
          }
        ]
      },
      {
        label: '五组城市',
        options: [
          {
            value: 'Harbin',
            label: '哈尔滨'
          },
          {
            value: 'Changsha',
            label: '长沙'
          },
          {
            value: 'Fuzhou',
            label: '福州'
          },
          {
            value: 'Hefei',
            label: '合肥'
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
      label: '规划区块内等价置换',
      value: 1
    },
    {
      label: '协议收回',
      value: 2
    },
    {
      label: '其他',
      value: 0
    }
  ]
};

const finChannelList = {
  data: [
    {
      label: '自有资金',
      value: 1
    },
    {
      label: '银行贷款',
      value: 2
    },
    {
      label: '向亲朋借款',
      value: 3
    },
    {
      label: '民间借贷',
      value: 4
    },
    {
      label: '股权融资',
      value: 5
    },
    {
      label: '债券融资',
      value: 6
    },
    {
      label: '凤险投资',
      value: 7
    },
    {
      label: '外资',
      value: 8
    },
    {
      label: '其他',
      value: 0
    }
  ]
};

const finThereCultyList = {
  data: [
    {
      label: '利率太高',
      value: 1
    },
    {
      label: '缺乏融资渠道',
      value: 2
    },
    {
      label: '政府扶持政策缺失',
      value: 3
    },
    {
      label: '中小银行数量太少',
      value: 4
    },
    {
      label: '缺乏与银行良好的私人关系',
      value: 5
    },
    {
      label: '缺乏担保',
      value: 6
    },
    {
      label: '企业规模太小',
      value: 7
    },
    {
      label: '信用受限',
      value: 8
    },
    {
      label: '其他',
      value: 0
    }
  ]
};

console.log(Mock);

const tableList = Mock.mock({
  ...common,
  data: {
    'list|25': [
      {
        'id|+1': '@uuid()',
        'name': '@cname()',
        'date': '@date("yyyy-MM-dd HH:mm:ss")',
        'email': '@email(163.com)',
        'status|1': () => {
          return Random.integer(0, 1).toString();
        },
        'area': '@genRandomLocationArr',
        'desc': '@cword(5, 11)',
        'text': 'text@integer(0, 100)',
        'age': '@integer(1, 90)',
        'num1': '@float(1, 50, 2, 2)'
      }
    ],
    total: 25
  }
});

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

  devServer.app.get(URL.getTableList, (req, res) => {
    const params = getParams(req.url);
    res.json(offsetData(tableList, params));
  });
  return middlewares;
};
