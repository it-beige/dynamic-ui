<script>
import genAttrsMixin, {getExtra as getAttrMixExtra} from 'main/mixins/attrs';
import genUploadMixin, {getExtra as getUploadMixExtra} from 'main/mixins/upload';
import { getComponentByName } from 'main/config/component';
import { isPlainObject } from 'main/utils/lodash';
import Locale from 'dynamic-ui/src/mixins/locale';

const Upload = getComponentByName('Upload');
// eslint-disable-next-line
const Button = getComponentByName('Button');

export default {
  name: 'DyUploadGenerate',
  mixins: [Locale, genAttrsMixin(Upload), genUploadMixin()],
  props: {

  },
  data() {
    return {
      extraProps: [...getAttrMixExtra('prop'), ...getUploadMixExtra('prop')],
      extraData: [...getAttrMixExtra('data'), ...getUploadMixExtra('data')],
      bindFileList: isPlainObject(this.value) ? [this.value] : this.value
    };
  },
  render() {
    const UploadVnode = this.renderUpload();
    return UploadVnode;
  },
  methods: {
    getUploadProps() {
      const props = this._excludeExtraProps(this.$props);
      props.action = this.url;
      props.fileList = this.bindFileList;
      this.bindPropsHook(props);
      return props;
    },
    getUploadOn() {
      const listeners = this._getListners();
      return listeners;
    },
    getUploadSlots() {
      const slots = this.$slots;
      return this._getVnodesBySlots(slots);
    },
    notDefaultTemplate(slots) {
      return !slots.find(s => s.data.slot === 'default');
    },

    renderUpload() {
      const self = this;
      let createElement = self.$createElement;
      const { getUploadProps, getUploadOn, getUploadSlots } = self;
      const props = getUploadProps();
      const on = getUploadOn();
      const slots = getUploadSlots();
      const attrs = this.$attrs;

      let nodes = [slots];
      // 没有自定义default slot
      if (this.notDefaultTemplate(slots)) {
        nodes.push(this.renderDefaultSlotVnode());
      }
      return createElement(Upload, {
        attrs,
        props,
        on,
        ref: Upload.name
      }, nodes);
    },

    renderDefaultSlotVnode() {
      const { listType } = this;
      let render;
      switch (listType) {
        case 'text':
          render = this.renderTextVnode;
          break;
        case 'picture':
          render = this.renderPictureVnode;
          break;
        case 'picture-card':
          render = this.renderPictureCardVnode;
          break;
      }
      return render();
    },

    renderTextVnode() {
      return (
        <Button.name type="primary" icon="dy-icon-upload2">
          { this.t('dy.upload.buttonText')}
        </Button.name>
      );
    },
    renderPictureCardVnode() {
      return (
        <i class="dy-icon-plus"></i>
      );
    }

  }
};
</script>


