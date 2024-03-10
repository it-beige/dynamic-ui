const Mock = require('mockjs');

// 定义省、市、区的模拟数据
const provinces = ['广东省', '浙江省', '江苏省', '山东省', '四川省'];
const cities = ['广州市', '深圳市', '杭州市', '宁波市', '南京市', '苏州市', '济南市', '青岛市', '成都市', '绵阳市'];
const districts = ['天河区', '越秀区', '福田区', '南山区', '上城区', '江干区', '玄武区', '秦淮区', '历下区', '市中区', '武侯区', '锦江区'];

// 生成随机长度的数组，长度为1到3
function randomArrayLength(min = 1, max = 3) {
  return Mock.Random.integer(min, max);
}

// 生成随机地区数组
module.exports = function generateRandomLocationArray(min, max) {
  const length = randomArrayLength(min, max); // 随机数组长度
  const locationArray = [];
  for (let i = 0; i < length; i++) {
    const level = Mock.Random.integer(0, 2); // 随机选择省、市、区
    let value;
    switch (level) {
      case 0:
        value = Mock.Random.pick(provinces); // 随机选择一个省
        break;
      case 1:
        value = Mock.Random.pick(cities); // 随机选择一个市
        break;
      case 2:
        value = Mock.Random.pick(districts); // 随机选择一个区
        break;
    }
    locationArray.push(value); // 将值添加到数组中
  }
  return locationArray;
};

