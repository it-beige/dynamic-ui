import globalConfig from 'main/config/global';
import { getCompPropsBySourceOpt } from 'main/utils/component.js';
import PaginationComponent from 'packages/pagination';
import { getComponentByName } from 'main/config/component';

const getExtraProps = () => {
  return {
    // 使用分页
    pagination: {
      type: Boolean,
      default: false
    },
    // 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: globalConfig.usePaginationLayout()
    },
    // 每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default: () => globalConfig.usePaginationPageSizes()
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
  const PaginationProps = getCompPropsBySourceOpt(PaginationComponent, ['total', 'pageCount']);

  return {
    props: {
      // ...PaginationProps,
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
            layout={this.layout}
            pageSizes={this.pageSizes}
            total={this.pageParams.total}
            currentPage={page}
            pageSize={size}
            {...data}
          >
          </Pagination.name>
        );

      }
    }
  };
}
