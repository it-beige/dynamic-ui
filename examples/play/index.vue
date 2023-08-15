<template>
  <div style="margin: 20px;">
    <dy-input v-model="input" placeholder="请输入内容"></dy-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: 'Hello Element UI!'
      };
    }
  };
</script>
