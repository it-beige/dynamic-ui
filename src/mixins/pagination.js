import globalConfig from 'main/config/global';
import { getCompPropsBySourceOpt, genComponentPorps } from 'main/utils/component.js';
import PaginationComponent from 'packages/pagination';
import { getComponentByName } from 'main/config/component';

export const [Ctor, pick] = genComponentPorps(getCompPropsBySourceOpt(PaginationComponent));

const getExtraProps = () => {
  const props = new Ctor();
  // 组件布局，子组件名用逗号分隔
  props.layout.default = globalConfig.usePaginationLayout();
  // 每页显示个数选择器的选项设置
  props.pageSizes.default = () => globalConfig.usePaginationPageSizes();
  return {
    paginationProps: {
      type: Ctor,
      default: () => new Ctor()
    },
    // 使用分页
    pagination: {
      type: Boolean,
      default: false
    }
  };
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

export default function genPaginationMixin() {

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
      renderPagination() {
        const Pagination = getComponentByName('Pagination');
        const page = this.pageParams[this.pageParamsKey.page];
        const size = this.pageParams[this.pageParamsKey.size];
        const onSizeChange = (size) => {
          this.pageParams[this.pageParamsKey.size] = size;
          this.offsetRequestOptions();
        };
        const onCurrentChange = (page) => {
          this.pageParams[this.pageParamsKey.page] = page;
          this.offsetRequestOptions();

        };
        const data = {
          props: {
            ...pick(this.paginationProps),
            total: this.pageParams.total,
            currentPage: page,
            pageSize: size
          },
          on: {
            'size-change': onSizeChange,
            'current-change': onCurrentChange,
            'update:currentPage': onCurrentChange
          }
        };
        return (
          <Pagination.name
            slot="append"
            class="dy-select-pagination"
            {...data}
          >
          </Pagination.name>
        );

      }
    }
  };
}
