import globalConfig from 'main/config/global';
import { getCompPropsBySourceOpt, genComponentPorps } from 'main/utils/component.js';
import PaginationComponent from 'packages/pagination';
import { getComponentByName } from 'main/config/component';

export const [PaginationCtor, PaginationPick] = genComponentPorps(getCompPropsBySourceOpt(PaginationComponent));

const getExtraProps = () => {

};

const getExtraData = (self = {}) => {
  return {
  };
};

export const getExtra = key => {
  let get;
  switch (key) {
    case 'data':
      get = getExtraData;
      break;
    case 'prop':
      get = getExtraProps;
      break;
  }
  return Object.keys(get());
};

export default function genTableMixin(option = {}) {
  const {
    useTableList = 'useTableList'
  } = option;

  const request = globalConfig.useRequest();

  return {
    props: {
      ...getExtraProps()
    },
    data(self) {
      return getExtraData(self);
    },
    computed: {

    },
    watch: {

    },
    created() {

    },
    methods: {
      [useTableList]({url, ...option}) {
        return request({
          url,
          headers: globalConfig.useRequestHeaders(),
          ...option
        })
          .then((res) => {
            let data = globalConfig.useParseData(res);
            let total = globalConfig.useParseTotal(res);
            return [data, total];
          });

      }
    }
  };
}
