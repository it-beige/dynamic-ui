<script>
import genAttrsMixin, { getExtra as getAttrMixExtra } from 'main/mixins/attrs';

import { getComponentByName } from 'main/config/component';

import _ from 'main/utils/lodash';
import { createNamespace, createOptionMap } from 'main/utils/create';
const Dialog = getComponentByName('Dialog');
const Button = getComponentByName('Button');
const DraggableResizable = getComponentByName('DraggableResizable');

console.log(DraggableResizable);

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

export default {
  name: 'DyDialogGenerate',
  mixins: [genAttrsMixin(Dialog, false)],
  components: {},
  props: {
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
    // 是否可拖拽
    draggable: {
      type: Boolean,
      default: false
    },
    // 是否可缩放
    resizable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      extraProps: [...getAttrMixExtra('prop') ],
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
      maxLeft: 0,
      maxRight: 0
    };
  },
  computed: {

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
        if (!v) return;
        this.draggable && this.$nextTick(() => {
          const { width, height } = this.getHeaderClientRect();
          this.w = width;
          this.h = height;
          this.resetDialogOffset();
        });
      }
    }
  },
  render() {
    return this.renderDialog();
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
        this.buttons.length && slots.push(this.renderFooterSlot());
      }
      if (!this.$slots.title) {
        slots.push(this.renderTitleSlot());
      }
      if (!this.$slots.button) {
        this.fullscreen && slots.push(this.renderButtonSlot());
      }
      if (!this.$slots.draggable && (this.draggable || this.resizable)) {
        slots.push(this.renderDraggableSlot());
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
      };
      return (
        <button onClick={onClick} class="fullscreen-btn" slot="button" type="button" aria-label="Fullscreen">
          <dy-svg-icon class={`${name} ${this.isFullscreen ? 'cancel-fullscreen' : 'fullscreen'}`} icon-class={`${this.isFullscreen ? 'cancel-fullscreen' : 'fullscreen'}`}></dy-svg-icon>
        </button>
      );
    },
    renderDraggableSlot() {
      const [name, bem] = createNamespace('dialog');
      const [draggableCls] = createNamespace('draggable');
      const [resizableCls] = createNamespace('resizable');
      const ref = this.useRef();

      const onDragging = (left, top) => {
        const dialogElm = ref.$el.querySelector(`.${name}`);
        if (dialogElm.style.position !== 'relative') {
          dialogElm.style.position = 'relative';
        }
        dialogElm.style.left = `${left}px`;
        dialogElm.style.top = `${top}px`;
        // const { x, y, width: dialogWidth, height: dialogHeight } = dialogElm.getBoundingClientRect();
        // const { width: bodyWidth, height: bodyHeight } = this.getBodyClientRect();
        // const maxLeft = bodyWidth - dialogWidth;
        // const maxTop = bodyHeight - dialogHeight;
        // const lastLeft = parseInt(dialogElm.style.left, 10) || 0;
        // const lastTop = parseInt(dialogElm.style.top, 10) || 0;

        // if (x > maxLeft) {
        //   dialogElm.style.left = `${maxLeft}px`;
        // } else {
        //   dialogElm.style.left = `${left}px`;
        // }

        // if (y > maxTop) {
        //   dialogElm.style.top = `${maxTop}px`;
        // } else {
        //   dialogElm.style.top = `${top}px`;
        // }

      };
      const onDragStop = (left, top) => {
        onDragging(left, top);
        this.$refs.draggableRef.style.transform = 'none';
      };
      return (
        <DraggableResizable
          slot="draggable"
          ref="draggableRef"
          classNameDraggable={draggableCls}
          classNameResizable={resizableCls}
          draggable={this.draggable}
          resizable={this.resizable}
          x={this.x}
          y={this.y}
          w={this.w}
          h={this.h}
          minLeft={0}
          minTop={0}
          maxLeft={this.maxLeft}
          maxTop={this.maxTop}
          z={1}
          getTranslate={() => 'none'}
          onDragging={onDragging}
          onDragstop={onDragStop}
          handles={['tl', 'tr']}
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
    getHeaderClientRect() {
      const ref = this.useRef();
      const [, bem] = createNamespace('dialog');
      const headerElm = ref.$el.querySelector(`.${bem('header')}`);
      return headerElm.getBoundingClientRect();
    },
    getBodyClientRect() {
      return document.body.getBoundingClientRect();
    },
    resetDialogOffset() {
      const ref = this.useRef();
      const [name, bem] = createNamespace('dialog');
      const dialogElm = ref.$el.querySelector(`.${name}`);
      const { width: bodyWidth, height: bodyHeight } = this.getBodyClientRect();
      const { width: dialogWidth, height: dialogHeight } = dialogElm.getBoundingClientRect();
      const x = Math.round((bodyWidth - dialogWidth) / 2);
      const y = Math.round((bodyHeight - dialogHeight) / 2);
      dialogElm.style.left = x + 'px';
      dialogElm.style.top = y + 'px';
      dialogElm.style.marginTop = 0;
      dialogElm.style.marginLeft = 0;
      dialogElm.style.marginRight = 0;
      dialogElm.style.marginBottom = 0;
      this.x = x;
      this.y = y;
      this.maxLeft = Math.round(bodyWidth - dialogWidth);
      this.maxTop = Math.round(bodyHeight - dialogHeight);
      this.$refs.draggableRef.style.transform = 'none';
    }
  }
};
</script>
