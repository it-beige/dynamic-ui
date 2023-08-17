const globalConfig = {
  // 缓存数据
  cache: false,
  // 数据请求的baseURI
  baseURI: '',
  // 上传接口请求的baseURI, 使用第三方服务可能会用到, 比如使用oss上传
  baseUploadURI: '',
  // 分页参数字段名 page size
  pageParamsKey: { page: 'page', size: 'size' },
  // 分页默认的参数值
  pageParamsValue: { page: 1, size: 20 },
  // 请求头
  useRequestHeaders: () => ({}),
  // 请求函数
  useRequest: () => this.$axios,
  // 解析接口返回数据函数
  useParseData: (res) => res,
  // 解析分页接口返回数据函数total
  useParseTotal: (res) => res,
  // 配置需要data数据项的展示项和绑定值
  useOptionProps: () => ({label: 'label', value: 'value', children: 'children'})

};

export default globalConfig;
