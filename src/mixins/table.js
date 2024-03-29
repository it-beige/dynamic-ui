import globalConfig from 'main/config/global';
import { getClearableByName } from 'main/helper/props';
import _ from 'lodash';

export default function genTableMixin(option = {}) {
  const {
    useSpan = 'useSpan',
    useTableList = 'useTableList',
    useTableQueryConfig = 'useTableQueryConfig'
  } = option;

  const request = globalConfig.useRequest();
  const genPlaceholder = globalConfig.genPlaceholder;
  const genModifiers = globalConfig.genModifiers;
  return {
    methods: {
      async [useTableList](useParams) {
        const params = await useParams();
        return request({
          ...params,
          headers: globalConfig.useRequestHeaders()
        }).then(res => {
          let data = globalConfig.useParseData(res);
          let total = globalConfig.useParseTotal(res);
          return [data, total];
        });
      },
      [useTableQueryConfig](config) {

        config = config.toSorted((a, b) => {
          const aSort = a.query?.sort;
          const bSort = b.query?.sort;
          if (aSort && bSort) {
            return aSort - bSort;
          } else if (aSort) {
            return -1;
          } else if (bSort) {
            return 1;
          }
          return 1;
        });
        return config.reduce((o, i) => {
          if (_.isPlainObject(i.query)) {
            const {
              prop = i.prop,
              label = i.label,
              component,
              span = this.useSpan(),
              props = {},
              ...rest
            } = i.query;

            let option = {
              label,
              prop,
              component,
              span,
              ...rest,
              props
            };
            genPlaceholder(option);
            if (getClearableByName(component)) {
              props.clearable = getClearableByName(component);
            }
            if (component === 'date') {
              if (props.type === 'datetimerange') {
                props.startPlaceholder = '开始时间';
                props.endPlaceholder = '开始时间';
              }
              if (props.type === 'daterange') {
                props.startPlaceholder = '开始日期';
                props.endPlaceholder = '开始日期';
              }
              if (props.type === 'monthrange') {
                props.startPlaceholder = '开始月份';
                props.endPlaceholder = '开始月份';
              }
            }
            o.push(option);
          }
          return o;
        }, []);
      },
      [useSpan]() {
        return 8;
      }
    }
  };
}
