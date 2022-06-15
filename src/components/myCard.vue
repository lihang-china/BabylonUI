<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-05-06 16:55:13
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-01 16:10:31
-->
<template>
  <a-card hoverable :style="'width:' + cardWidth + ';height:' + cardHeight">
    <slot>
    </slot>
  </a-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: undefined
    },
    cardWidth: {
      type: String,
      default: '200px'
    },
    cardHeight: {
      type: String,
      default: '300px'
    }
  },
  setup(props) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.ant-card {
  border: 0;
  // box-shadow: 0 0 5px 4px rgba(17, 17, 17, 0.2);
  // background: linear-gradient(135deg, rgb(40, 47, 87), rgb(34, 35, 82));
  transition: 0.3s all;
  &:hover {
    box-shadow: 0 0 10px 10px rgba(17, 17, 17, 0.2);
  }
}
</style>