import {
  getCompPropsBySourceOpt,
  getProvidesOptionBySourceOpt
} from 'main/utils/component.js';
import { camelToKebab } from 'main/utils/util.js';
import globalConfig from 'main/config/global';

const getExtraProps = () => {
  const optionProps = globalConfig.useOptionProps();
  return {
    props: {
      type: Object,
      default: () => optionProps
    }
  };
};

const getExtraData = (self = {}) => {
  return {
    bindProps: {
      ...globalConfig.useOptionProps(),
      ...self.props
    }

  };
};

export const getExtra = (key) => {
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

export default function genAttrsMixin (component, extra = true) {
  const props = getCompPropsBySourceOpt(component);
  const extraProps = extra ? getExtraProps() : {};
  return {
    props: {
      ...props,
      ...extraProps
    },
    data (self) {
      return {
        ...getExtraData(self)
      };
    },
    watch: {
      props: {
        handler () {
          this.bindProps = {...this.bindProps, ...this.props};
        },
        deep: true
      }

    },
    methods: {
      getComponentProps(component, target, assigns) {
        const componentProps = getCompPropsBySourceOpt(component);
        return Object.keys(componentProps).reduce((_, k) => {
          _[k] = target[camelToKebab(k)] || assigns[camelToKebab(k)];
          return _;
        }, {});
      },
      _excludeExtraProps (props) {
        const extraProps = this.extraProps;
        return Object.keys(props).reduce((_, k) => {
          if (!extraProps.includes(k)) {
            _[k] = props[k];
          }
          return _;
        }, {});
      },
      _getListners () {
        const consumeListeners = this.$options._parentListeners || {};
        const listeners = getProvidesOptionBySourceOpt(
          consumeListeners,
          this.$listeners
        );
        return listeners;
      },
      _getVnodesBySlots (slots) {
        return Object.keys(slots).map(k => {
          const vnode = Array.isArray(slots[k]) ? slots[k].at(0) : slots[k];
          return <template slot={k}>{vnode}</template>;
        });
      },
      useRef () {
        const refName = component.name;
        return this.$refs[refName];
      }
    }
  };
}

