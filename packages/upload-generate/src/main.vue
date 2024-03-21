<script>
import genAttrsMixin, {getExtra as getAttrMixExtra} from 'main/mixins/attrs';
import genUploadMixin, {getExtra as getUploadMixExtra} from 'main/mixins/upload';
import Locale from 'main/mixins/locale';
import { getComponentByName } from 'main/config/component';
import { isPlainObject, isFunction } from 'lodash';
import { saveAs} from 'file-saver';
import ImageViewer from 'packages/image/src/image-viewer';

const Upload = getComponentByName('Upload');
const Button = getComponentByName('Button');
const Progress = getComponentByName('Progress');
const Image = getComponentByName('Image');

const props = {
  // 是否显示上传进度条
  showProgress: {
    type: Boolean,
    default: true
  }
};
export default {
  name: 'DyUploadGenerate',
  mixins: [Locale, genAttrsMixin(Upload), genUploadMixin()],
  model: {
    prop: 'fileList',
    event: 'input'
  },
  components: { ImageViewer },
  props: {
    ...props
  },
  data () {
    return {
      extraProps: [...getAttrMixExtra('prop'), ...getUploadMixExtra('prop'), ...Object.keys(props)],
      extraData: [...getAttrMixExtra('data'), ...getUploadMixExtra('data')],
      bindFileList: isPlainObject(this.fileList) ? [this.fileList] : this.fileList,
      previewUrl: null
    };
  },
  computed: {
    // 不渲染upload组件
    disableRendering ({ disabled, isExceed }) {
      return disabled || isExceed;
    }
  },
  render () {
    const UploadVnode = this.renderUpload();
    return UploadVnode;
  },
  methods: {
    getUploadProps () {
      const props = this._excludeExtraProps(this.$props);
      props.action = this.url;
      props.fileList = this.bindFileList;
      this.bindPropsHook(props);
      return props;
    },
    getUploadOn () {
      const listeners = this._getListners();
      return listeners;
    },
    getUploadSlots () {
      const slots = this.$slots;
      return this._getVnodesBySlots(slots);
    },
    getUploadScopedSlots () {
      const { listType } = this;
      let scopedSlots = {};
      if (listType === 'picture-card') {
        scopedSlots.file = this.renderPictureCardFileVnode;
      }
      return scopedSlots;
    },
    notDefaultTemplate (slots) {
      return !slots.find(s => s.data.slot === 'default');
    },

    renderUpload () {
      const self = this;
      let createElement = self.$createElement;
      const { getUploadProps, getUploadOn, getUploadSlots, getUploadScopedSlots, disabled } = self;
      const props = getUploadProps();
      const on = getUploadOn();
      const slots = getUploadSlots();
      const scopedSlots = getUploadScopedSlots();
      const attrs = this.$attrs;

      let nodes = [slots];
      // 没有自定义default slot
      if (this.notDefaultTemplate(slots)) {
        // 显示文件列表的情况下, disabled为true || 超出上传限制 不渲染upload组件
        ((!disabled && this.showFileList) && !this.isExceed) && nodes.push(this.renderDefaultSlotVnode());
      }
      this.previewUrl && nodes.push(this.renderImageViewer());

      return createElement(Upload.name, {
        staticClass: 'dy-upload-generate',
        class: [this.disableRendering ? 'is-disabled' : '', this.isUploadValidError ? 'is-error' : ''],
        attrs,
        props,
        on,
        ref: Upload.name,
        scopedSlots
      }, nodes);
    },

    renderDefaultSlotVnode () {
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

    renderTextVnode () {
      return (
        <Button.name type="primary" icon="dy-icon-upload2">
          { this.t('dy.upload.buttonText')}
        </Button.name>
      );
    },
    renderPictureVnode () {
      return (
        <Button.name type="primary" icon="dy-icon-upload2">
          { this.t('dy.upload.buttonText')}
        </Button.name>
      );
    },
    renderPictureCardVnode () {
      return (
        <i class="dy-icon-plus"></i>
      );
    },
    renderPictureCardFileVnode ({ file }) {
      const { listType, showProgress, disabled } = this;
      const { status } = file;
      let nodes = [];

      // 进度条
      if (showProgress && status === 'uploading') {
        const progressVnode = (
          <Progress.name
            type={listType === 'picture-card' ? 'circle' : 'line'}
            stroke-width={listType === 'picture-card' ? 6 : 2}
            percentage={parseInt(file.percentage, 10)}
          >
          </Progress.name>
        );
        nodes.push(progressVnode);
      }

      const operateVnodes = [
        <span
          class="dy-upload-list__item-preview"
          onClick={() => this.viewFile(file)}
        >
          <i class="dy-icon-zoom-in"></i>
        </span>
      ];

      if (!disabled) {
        operateVnodes.push(
          <span
            class="dy-upload-list__item-delete"
            onClick={() => this.downloadFile(file)}
          >
            <i class="dy-icon-download"></i>
          </span>

        );
        operateVnodes.push(
          <span
            class="dy-upload-list__item-delete"
            onClick={() => this.deleteFile(file)}
          >
            <i class="dy-icon-delete"></i>
          </span>
        );
      }

      const maskLayer = (
        <div class='dy-upload-list__item-actions'>
          {operateVnodes}
        </div>
      );

      nodes.push(maskLayer);
      nodes.push(this.renderPreivewImage(file));

      return nodes;
    },
    getPreviewUrl (file) {
      let url = file.url;
      if (isFunction(this.onPreview)) {
        url = this.onPreview(file);
      }
      return url;
    },
    viewFile (file) {
      this.$refs[`imageRef-${file.uid}`].clickHandler();
    },
    downloadFile (file) {
      const url = this.getPreviewUrl(file);
      saveAs(url, file.name);
    },
    deleteFile (file) {
      const upload = this.useRef();
      upload.handleRemove(file);
    },
    renderPreivewImage (file) {
      let previewSrcList = this.bindFileList.map(i => this.getPreviewUrl(i));
      return (
        <Image.name
          ref={`imageRef-${file.uid}`}
          class="dy-upload-list__item-thumbnail"
          src={this.getPreviewUrl(file)}
          preview-src-list={previewSrcList}
        >
        </Image.name>
      );
    },
    preventBodyScroll () {
      this.prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    },
    restoreBodyScroll () {
      document.body.style.overflow = this.prevOverflow;
    },
    renderImageViewer () {
      const previewSrcList = this.bindFileList.map(this.getPreviewUrl);
      const srcIndex = previewSrcList.indexOf(this.previewUrl);
      let initialIndex = ~srcIndex ? srcIndex : 0 ;
      const onClose = () => {
        this.restoreBodyScroll();
        this.previewUrl = null;
      };
      this.preventBodyScroll();
      return (
        <ImageViewer.name
          z-index={2000}
          initial-index={initialIndex}
          urlList={previewSrcList}
          {...{props: {onClose}}}
        >
        </ImageViewer.name>
      );
    }

  }
};
</script>


 