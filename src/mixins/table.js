import globalConfig from 'main/config/global';
import {
  getCompPropsBySourceOpt,
  genComponentPorps
} from 'main/utils/component.js';
import PaginationComponent from 'packages/pagination';
import _ from 'main/utils/lodash';
export const [PaginationCtor, PaginationPick] = genComponentPorps(
  getCompPropsBySourceOpt(PaginationComponent),
);

export default function genTableMixin(option = {}) {
  const {
    useTableList = 'useTableList',
    useTableQueryConfig = 'useTableQueryConfig'
  } = option;

  const request = globalConfig.useRequest();

  return {
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
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
        return config.reduce((o, i) => {
          if (_.isPlainObject(i.query)) {
            const { prop = i.prop, label = i.label, component, span = 8, props = {}} = i.query;
            let option = {
              label,
              prop,
              component,
              span,
              props
            };
            o.push(option);
          }
          return o;
        }, []);
      }
    }
  };
}
