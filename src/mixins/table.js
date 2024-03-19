import globalConfig from 'main/config/global';
import {
  getCompPropsBySourceOpt,
  genComponentPorps
} from 'main/utils/component.js';
import PaginationComponent from 'packages/pagination';
import { getComponentByName } from 'main/config/component';

export const [PaginationCtor, PaginationPick] = genComponentPorps(
  getCompPropsBySourceOpt(PaginationComponent),
);

export default function genTableMixin(option = {}) {
  const {
    page = 'page',
    size = 'size',
    useTableList = 'useTableList',
    useSizeChange = 'useSizeChange'
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
      [useTableList]({ url, ...option }) {
        return request({
          url,
          headers: globalConfig.useRequestHeaders(),
          ...option
        }).then(res => {
          let data = globalConfig.useParseData(res);
          let total = globalConfig.useParseTotal(res);
          return [data, total];
        });
      },
      [useSizeChange](pageSize) {
        this[size] = pageSize;
        this[useTableList]();
      }
    }
  };
}
