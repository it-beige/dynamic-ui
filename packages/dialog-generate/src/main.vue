<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';

import { getComponentByName } from 'main/config/component';

import _ from 'main/utils/lodash';
import { createNamespace, createOptionMap } from 'main/utils/create';
import { on, off } from 'main/utils/dom';
const Dialog = getComponentByName('Dialog');
const Button = getComponentByName('Button');
const DraggableResizable = getComponentByName('DraggableResizable');

export const VIEW = 'view';
export const EDIT = 'edit';
export const ADD = 'add';
export const CANCEL = 'cancel';
export const SAVE = 'save';
export const SUBMIT = 'submit';
export const DELETE = 'delete';
const buttons = [
  VIEW,
  CANCEL,
  SAVE,
  SUBMIT,
  DELETE
];
const buttonMap = {
  [VIEW]: '查看',
  [CANCEL]: '取消',
  [SAVE]: '保存',
  [SUBMIT]: '提交',
  [DELETE]: '删除'
};
const iconMap = {
  [VIEW]: 'dy-icon-view',
  [EDIT]: 'dy-icon-edit',
  [ADD]: 'dy-icon-plus'
};
const createButtonMap = createOptionMap('text');
const createIconMap = createOptionMap('icon');

const props = {
  // 操作区渲染的按钮
  buttons: {
    type: Array,
    default: () => [],
    validator: (value) => {
      const valid = value.every(i => buttons.includes(i));
      if (!valid) {
        console.error(`[Dynamic Error] buttons只能是${buttons.join('、')}`);
      }

      return valid;
    }
  },
  // 渲染的按钮的props
  buttonMap: {
    type: Object,
    default: () => ({}),
    validator: (value) => {
      const kyes = Object.keys(value);
      const valid = kyes.every(i => buttons.includes(i));
      if (!valid) {
        console.error(`[Dynamic Error] buttonMap key只能是${buttons.join('、')}`);
      }

      return valid;
    }
  },
  // 操作类型
  operateType: {
    type: String,
    validator: (value) => {
      const types = [VIEW,
        EDIT, ADD];
      const valid = value ? types.includes(value) : true;
      if (!valid) {
        console.error(`[Dynamic Error] operateType只能是${types.join('、')}`);
      }
      return valid;
    }
  },
  // 标题文本
  label: {
    type: String
  },
  // 标题icon的配置
  iconMap: {
    type: Object,
    default: () => ({}),
    validator: (value) => {
      const kyes = Object.keys(value);
      const iconKyes = Object.keys(iconMap);
      const valid = kyes.every(i => iconKyes.includes(i));
      if (!valid) {
        console.error(`[Dynamic Error] iconMap key只能是${iconKyes.join('、')}`);
      }

      return valid;
    }
  },
  // 是否禁用操作区
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否可拖拽
  draggable: {
    type: Boolean,
    default: false
  },
  // 是否可缩放
  resizable: {
    type: Boolean,
    default: false
  },
  // 是否显示缩放的手柄
  showHandle: {
    type: Boolean,
    default: true
  }
};
export default {
  name: 'DyDialogGenerate',
  mixins: [genAttrsMixin(Dialog, false)],
  components: {},
  props: {
    ...props
  },
  data() {
    return {
      extraProps: [...getAttrMixExtra('prop'), ...Object.keys(props) ],
      extraData: [...getAttrMixExtra('data') ],
      bindButtonMap: {},
      bindIconMap: {},
      loadingMap: {
        [CANCEL]: false,
        [SAVE]: false,
        [SUBMIT]: false,
        [DELETE]: false
      },
      isFullscreen: false,
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      minWidth: 1,
      minHeight: 1,
      maxWidth: 2,
      maxHeight: 2
    };
  },
  computed: {
    enableDraggable({isFullscreen, draggable, visible}) {
      return isFullscreen ? false : visible && draggable;
    },
    enableResizable({isFullscreen, resizable}) {
      return isFullscreen ? false : resizable;
    }
  },
  watch: {
    buttonMap: {
      deep: true,
      immediate: true,
      handler(v) {
        this.bindButtonMap = {
          ...createButtonMap(buttonMap, {
            [VIEW]: {
              icon: 'dy-icon-search',
              type: ''
            },
            [CANCEL]: {
              icon: 'dy-icon-close',
              type: ''
            },
            [SAVE]: {
              icon: 'dy-icon-folder',
              type: 'primary'
            },
            [SUBMIT]: {
              icon: 'dy-icon-check',
              type: 'primary'
            },
            [DELETE]: {
              icon: 'dy-icon-delete',
              type: 'danger'
            }
          }),
          ...createButtonMap(v)
        };
      }
    },
    iconMap: {
      deep: true,
      immediate: true,
      handler(v) {
        this.bindIconMap = {
          ...createIconMap(iconMap, {
            [VIEW]: {
              text: '查看'
            },
            [EDIT]: {
              text: '编辑'
            },
            [ADD]: {
              text: '新增'
            }
          }),
          ...createIconMap(v)
        };
      }
    },
    visible: {
      immediate: true,
      handler(v) {
        if (!v) {
          return;
        }
        this.enableDraggable && this.$nextTick(() => {
          this.resetDialogOffset();
        });
      }
    }
  },
  render() {
    return this.renderDialog();
  },
  mounted () {
    this.windowLastWidth = window.innerWidth;
    this.windowLastHeight = window.innerHeight;
    on(window, 'resize', this.handleResize);
  },
  beforeDestroy () {
    off(window, 'resize', this.handleResize);
  },
  methods: {
    getProps() {
      const props = this._excludeExtraProps(this.$props);
      props.fullscreen = this.isFullscreen;
      return props;
    },
    getOn() {
      const listeners = this._getListners();
      return listeners;
    },
    getSlots() {
      const slots = [...this._getVnodesBySlots(this.$slots)];
      if (!this.$slots.footer) {
        this.buttons.length && !this.disabled && slots.push(this.renderFooterSlot());
      }
      if (!this.$slots.title) {
        slots.push(this.renderTitleSlot());
      }
      if (!this.$slots.button) {
        this.fullscreen && slots.push(this.renderButtonSlot());
      }
      if (!this.$slots.draggable) {
        (this.enableDraggable || this.enableResizable) && slots.push(this.renderDraggableSlot());
      }
      return slots;
    },
    renderDialog() {
      let createElement = this.$createElement;
      const { getProps, getOn, getSlots } = this;
      const props = getProps();
      const on = getOn();
      const slots = getSlots();
      const attrs = this.$attrs;
      return createElement(Dialog.name, {
        staticClass: 'dy-dialog-generate',
        attrs,
        props,
        on,
        ref: Dialog.name
      }, slots);
    },
    renderFooterSlot() {
      const [name] = createNamespace('button');
      return (
        <div class={`${name}__wrap`} slot="footer">
          {this.buttons.map(i => {
            const { text, type, ...props } = this.bindButtonMap[i];
            const loading = this.loadingMap[i];
            const data = {
              props,
              on: {click: () => this.clickButton(i)}
            };
            return <Button key={i} type={type} loading={loading} {...data}>{text}</Button>;
          })}
        </div>
      );
    },
    renderTitleSlot() {
      const [name, bem] = createNamespace('title');
      const [, bemFlex] = createNamespace('flex');
      const { icon, text } = this.bindIconMap[this.operateType] || {};
      return (
        <div class={`${name}__wrap ${bemFlex('align-center')}`} slot="title">
          {this.title ? this.title : [this.operateType ? [<i class={icon} />, <span class={bem('text')}>{text}{this.label}</span>] : null]}
        </div>
      );
    },
    renderButtonSlot() {
      const [name] = createNamespace('fullscreen');
      const onClick = () => {
        this.isFullscreen = !this.isFullscreen;
        const elm = this.getDialogElm();

        if (this.isFullscreen) {
          this.dialogLastLeft = elm.style.left;
          this.dialogLastTop = elm.style.top;
          this.dialogLastWidth = elm.style.width;
          this.dialogLastHeight = elm.style.height;
          elm.style.left = 0;
          elm.style.top = 0;
        } else {
          let x = parseInt(this.dialogLastLeft, 10);
          let y = parseInt(this.dialogLastTop, 10);
          let width = parseInt(this.dialogLastWidth, 10);
          let height = parseInt(this.dialogLastHeight, 10);
          this.setDialogOffset(x, y);
          this.resetDialogWH(width, height);
        }

      };
      return (
        <button onClick={onClick} class="fullscreen-btn" slot="button" type="button" aria-label="Fullscreen">
          <dy-svg-icon class={`${name} ${this.isFullscreen ? 'cancel-fullscreen' : 'fullscreen'}`} icon-class={`${this.isFullscreen ? 'cancel-fullscreen' : 'fullscreen'}`}></dy-svg-icon>
        </button>
      );
    },
    renderDraggableSlot() {
      const [, bem] = createNamespace('dialog');
      const [draggableCls] = createNamespace('draggable');
      const [resizableCls] = createNamespace('resizable');

      const getParentElm = () => {
        const ref = this.useRef();
        const parentElm = ref.$el;
        return parentElm;
      };
      const setParentOverflow = (value) => {
        getParentElm().style.overflow = value;
      };
      const onDragStart = () => {
        const parentElm = getParentElm();
        const style = window.getComputedStyle(parentElm);
        this.originalOverflow = style.getPropertyValue('overflow');
        setParentOverflow('hidden');
      };
      const onDragging = (left, top) => {
        const dialogElm = this.getDialogElm();
        if (dialogElm.style.position !== 'relative') {
          dialogElm.style.position = 'relative';
        }
        dialogElm.style.left = `${left}px`;
        dialogElm.style.top = `${top}px`;
      };
      const onDragStop = (left, top) => {
        onDragging(left, top);
        setParentOverflow(this.originalOverflow);
      };
      const onResize = (handle, x, y, width, height) => {
        const dialogElm = this.getDialogElm();
        dialogElm.style.left = `${x}px`;
        dialogElm.style.top = `${y}px`;
        dialogElm.style.width = width + 'px';
        dialogElm.style.height = height + 'px';
      };

      return (
        <DraggableResizable
          className={`vdr ${!this.showHandle ? 'hide-handle' : ''}`}
          slot="draggable"
          ref="draggableRef"
          classNameDraggable={draggableCls}
          classNameResizable={resizableCls}
          draggable={this.enableDraggable}
          resizable={this.enableResizable}
          x={this.x}
          y={this.y}
          w={this.w}
          h={this.h}
          z={1}
          minWidth={this.minWidth}
          minHeight={this.minHeight}
          maxWidth={this.maxWidth}
          maxHeight={this.maxHeight}
          propsOnDragStart={onDragStart}
          onDragging={onDragging}
          onDragstop={onDragStop}
          propsOnResize={onResize}
          parent={this.getDragParentElm}
          handles={['tl', 'tr', 'bl', 'br']}
          class={`${bem('draggable')}`}
        >
        </DraggableResizable>
      );
    },
    clickButton(key) {
      const showLoading = () => {
        this.loadingMap[key] = true;
      };
      const hideLoading = () => {
        this.loadingMap[key] = false;
      };
      this.$emit(key, [showLoading, hideLoading]);
    },
    getDialogElm() {
      const ref = this.useRef();
      const [name] = createNamespace('dialog');
      const dialogElm = ref.$el.querySelector(`.${name}`);
      return dialogElm;
    },
    getHeaderElm() {
      const [, bem] = createNamespace('dialog');
      return this.getDialogElm().querySelector(`.${bem('header')}`);
    },
    getBodyElm() {
      const [, bem] = createNamespace('dialog');
      return this.getDialogElm().querySelector(`.${bem('body')}`);
    },
    getHeaderClientRect() {
      const headerElm = this.getHeaderElm();
      return headerElm.getBoundingClientRect();
    },
    getButtonRealWith() {
      const [, bem] = createNamespace('button');
      const headerElm = this.getHeaderElm();
      const styleSheet = window.getComputedStyle(headerElm);
      const paddingRight = parseInt(styleSheet.paddingRight, 10);
      const buttonElm = headerElm.querySelector(`.${bem('wrap')}`);
      const width = parseInt(window.getComputedStyle(buttonElm).width, 10) || 0;
      return paddingRight + width;
    },
    getBodyClientRect() {
      return document.body.getBoundingClientRect();
    },
    getDialogClientRect() {
      return this.getDialogElm().getBoundingClientRect();
    },
    getDragParentElm() {
      return document.body;
    },
    setDialogOffset(x, y) {
      const dialogElm = this.getDialogElm();
      dialogElm.style.left = x + 'px';
      dialogElm.style.top = y + 'px';
      dialogElm.style.marginTop = 0;
      dialogElm.style.marginLeft = 0;
      dialogElm.style.marginRight = 0;
      dialogElm.style.marginBottom = 0;
      this.x = x;
      this.y = y;
    },
    resetDialogWH(w, h) {
      const dialogElm = this.getDialogElm();
      this.w = w;
      this.h = h;
      const headerElm = this.getHeaderElm();
      const bodyElm = this.getBodyElm();
      this.minHeight = parseInt(headerElm.offsetHeight + bodyElm.offsetHeight, 10);
      dialogElm.style.width = w + 'px';
      dialogElm.style.height = h + 'px';
    },
    resetDialogOffset() {
      const { width: bodyWidth, height: bodyHeight } = this.getBodyClientRect();
      const { width: dialogWidth, height: dialogHeight } = this.getDialogClientRect();
      const x = Math.round((bodyWidth - dialogWidth) / 2);
      const y = Math.round((bodyHeight - dialogHeight) / 2);
      this.setDialogOffset(x, y);
      this.resetDialogWH(dialogWidth, dialogHeight);
      this.maxWidth = bodyWidth;
      this.maxHeight = bodyHeight;
    },
    handleResize(e) {
      if (!(this.enableDraggable || this.enableResizable)) {
        return;
      }
      const shrinkWidth = this.windowLastWidth - e.currentTarget.innerWidth;
      const shrinkHeight = this.windowLastHeight - e.currentTarget.innerHeight;
      const dialogElm = this.getDialogElm();
      const dialogWidth = parseInt(dialogElm.style.width, 10);
      const dialogHeight = parseInt(dialogElm.style.height, 10);
      let width = dialogWidth;
      let height = dialogHeight;
      if (shrinkWidth > 0) {
        width -= shrinkWidth;
      }
      if (shrinkHeight > 0) {
        height -= shrinkHeight;
      }
      this.resetDialogWH(width, height);
      this.windowLastWidth = e.currentTarget.innerWidth;
      this.windowLastHeight = e.currentTarget.innerHeight;
    }
  }
};
</script>
