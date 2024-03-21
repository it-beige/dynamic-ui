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
        // config.reduce((o, i) => {
        //   if (_.isPlainObject(i.query)) {
        //     const { component } = i.query;
        //     let option = {
        //       label: i.label,
        //       prop: i.prop,
        //       component
        //     };
        //     o.push(option);
        //   }
        //   return o;
        // }, []);
        return [{
          label: 'a',
          prop: 'a',
          component: 'input'
        }];
      }
    }
  };
}
