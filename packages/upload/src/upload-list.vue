<template>
  <transition-group
    tag="ul"
    :class="[
      'dy-upload-list',
      'dy-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="dy-list"
  >
    <li
      v-for="file in files"
      :class="['dy-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <img
          class="dy-upload-list__item-thumbnail"
          v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
          :src="file.url" alt=""
          @click="handlePreview(file)"
        >
        <a class="dy-upload-list__item-name" @click="handleClick(file)">
          <dy-svg-icon :icon-class="getFileIconByExt(file.name)" v-if="svgIcon"></dy-svg-icon>
          <i class="dy-icon-document" v-else></i>
          <label class="file-name"> {{file.name}}</label>
        </a>
        <label class="dy-upload-list__item-status-label">
          <i :class="{
            'dy-icon-upload-success': true,
            'dy-icon-circle-check': listType === 'text',
            'dy-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
          }"></i>
        </label>
        <i class="dy-icon-download" v-if="listType === 'text'" @click="$emit('download', file)"></i>
        <i class="dy-icon-close" v-if="!disabled" @click="$emit('remove', file)"></i>
        <i class="dy-icon-close-tip" v-if="!disabled">{{ t('dy.upload.deleteTip') }}</i> <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
        <dy-progress
          v-if="file.status === 'uploading'"
          :type="listType === 'picture-card' ? 'circle' : 'line'"
          :stroke-width="listType === 'picture-card' ? 6 : 2"
          :percentage="parsePercentage(file.percentage)">
        </dy-progress>
        <span class="dy-upload-list__item-actions" v-if="listType === 'picture-card'">
          <span
            class="dy-upload-list__item-preview"
            v-if="handlePreview && listType === 'picture-card'"
            @click="handlePreview(file)"
          >
            <i class="dy-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="dy-upload-list__item-delete"
            @click="$emit('remove', file)"
          >
            <i class="dy-icon-delete"></i>
          </span>
        </span>
      </slot>
    </li>
  </transition-group>
</template>
<script>
  import Locale from 'dynamic-ui/src/mixins/locale';
  import DyProgress from 'dynamic-ui/packages/progress';
  import DySvgIcon from 'dynamic-ui/packages/svg-icon';
  import {
    getSvgIconByType
  } from 'dynamic-ui/src/config/svg';

  export default {

    name: 'UploadList',

    mixins: [Locale],

    data () {
      return {
        focusing: false
      };
    },
    components: { DyProgress, DySvgIcon },

    props: {
      files: {
        type: Array,
        default () {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      handlePreview: Function,
      listType: String,
      svgIcon: true
    },
    methods: {
      parsePercentage (val) {
        return parseInt(val, 10);
      },
      handleClick (file) {
        this.handlePreview && this.handlePreview(file);
      },
      getFileIconByExt (filename) {
        const ext = filename.split('.').at(-1);
        return getSvgIconByType(ext);
      }
    }
  };
</script>
