<template>
  <div class="dy-page-header">
    <div class="dy-page-header__left" @click="$emit('back')">
      <i class="dy-icon-back"></i>
      <div class="dy-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="dy-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import { t } from 'dynamic-ui/src/locale';
export default {
  name: 'DyPageHeader',

  props: {
    title: {
      type: String,
      default() {
        return t('dy.pageHeader.title');
      }
    },
    content: String
  }
};
</script>
