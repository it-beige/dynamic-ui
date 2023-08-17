import {
  getCompPropsBySourceOpt,
  getProvidesOptionBySourceOpt
} from 'main/utils/component.js';
import globalConfig from 'main/config/global';

export default function genPropsMixin(component) {
  const props = getCompPropsBySourceOpt(component);
  const optionProps = globalConfig.useOptionProps();
  return {
    props: {
      ...props,
      props: {
        type: Object,
        default: () => optionProps
      },
      options: {
        type: Array,
        default: () => ([])
      }
    },
    data() {
      return {
        bindProps: {
          ...optionProps,
          ...this.props
        }
      };
    },
    watch: {
      props: {
        handler() {
          this.bindProps = {...this.bindProps, ...this.props};
        },
        deep: true
      },
      options: {
        handler() {
          this.bindOptions = this.options;
        }
      }
    },
    methods: {
      _excludeExtraProps(props) {
        const extraProps = this.$options.extraProps;
        return Object.keys(props).reduce((_, k) => {
          if (!extraProps.includes(k)) {
            _[k] = props[k];
          }
          return _;
        }, {});
      },
      _getListners() {
        const consumeListeners = this.$options._parentListeners || {};
        const listeners = getProvidesOptionBySourceOpt(
          consumeListeners,
          this.$listeners
        );
        return listeners;
      },
      _getVnodesBySlots(slots) {
        return Object.keys(slots).map(k => {
          const vnode = Array.isArray(slots[k]) ? slots[k].at(0) : slots[k];
          if (!vnode.data) {
            vnode.data = {};
          }
          return <template slot={k}>{vnode}</template>;
        });
      }

    }
  };
}
