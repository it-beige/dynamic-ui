
import axios from 'axios';
import Dynamic from 'main/index.js';

const { Message } = Dynamic;

const successResponse = {
  code: '200'
};

export const data = {
  list: {
    ...successResponse,
    data: [
      {
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '双皮奶'
      },
      {
        value: '选项3',
        label: '蚵仔煎'
      },
      {
        value: '选项4',
        label: '龙须面'
      },
      {
        value: '选项5',
        label: '北京烤鸭'
      },
      {
        value: '选项11',
        label: '黄金糕11'
      },
      {
        value: '选项22',
        label: '双皮奶22'
      },
      {
        value: '选项33',
        label: '蚵仔煎33'
      },
      {
        value: '选项44',
        label: '龙须面44'
      },
      {
        value: '选项55',
        label: '北京烤鸭55'
      },
      {
        value: '选项111',
        label: '黄金糕111'
      },
      {
        value: '选项222',
        label: '双皮奶222'
      },
      {
        value: '选项333',
        label: '蚵仔煎333'
      },
      {
        value: '选项444',
        label: '龙须面444'
      },
      {
        value: '选项555',
        label: '北京烤鸭555'
      },
      {
        value: '选项1111',
        label: '黄金糕1111'
      },
      {
        value: '选项2222',
        label: '双皮奶2222'
      },
      {
        value: '选项3333',
        label: '蚵仔煎3333'
      },
      {
        value: '选项4444',
        label: '龙须面4444'
      },
      {
        value: '选项5555',
        label: '北京烤鸭555'
      },
      {
        value: '选项11111',
        label: '黄金糕11111'
      },
      {
        value: '选项22222',
        label: '双皮奶22222'
      },
      {
        value: '选项33333',
        label: '蚵仔煎33333'
      },
      {
        value: '选项44444',
        label: '龙须面44444'
      },
      {
        value: '选项55555',
        label: '北京烤鸭5555'
      }
    ],
    total: 25
  },
  tree: {
    ...successResponse,
    data: [
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
  }
};

function offsetData (res, params) {
  let page = params.page || params.pageNo;
  let size = params.size || params.pageSize;
  let data = res.data;
  if (page && size) {
    const start = (page - 1) * size;
    const end = page * size;
    data = data.slice(start, end);
  }
  return {...res, data};
}

// export default function axios ({ url, params }) {
//   console.log(`接口请求: url: ${url} params: ${JSON.stringify(params)}`);
//   let response;
//   if (url === API.getList) {
//     response = offsetData(data.list, params);
//   } else if (url === API.getTreeList) {
//     response = offsetData(data.tree, params);
//   }
//   return new Promise(resolve => {
//     setTimeout(() => {resolve(response);}, 5000 * 0);
//   });
// }

const request = axios.create({
  withCredentials: true,
  timeout: 1000 * 60
});

request.interceptors.response.use(
  response => {
    let res = response.data;
    return res;
  },

  error => {
    let message = '';

    if (error.response) {
      switch (error.response.status) {
        case 400:
          message = '错误请求';
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求错误,未找到该资源';
          break;
        case 405:
          message = '请求方法未允许';
          break;
        case 408:
          message = '请求超时';
          break;
        case 500:
          message = '服务器端出错';
          break;
        case 501:
          message = '网络未实现';
          break;
        case 502:
          message = '网络错误';
          break;
        case 503:
          message = '服务不可用';
          break;
        case 504:
          message = '网络超时';
          break;
        case 505:
          message = 'http版本不支持该请求';
          break;
        default:
          message = `连接错误${error.response.status}`;
      }
    }

    message && Message.error(message);

    return Promise.reject(error);
  },
);

export default request;
