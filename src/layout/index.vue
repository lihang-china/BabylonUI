<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-05-05 16:21:51
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-22 15:52:48
-->
<template>
  <div class="container flex-flex">
    <div class="left"><item-bar /></div>
    <div class="right flex-column">
      <div class="header">
        <h1>Welecome Li ToBaihda A</h1>
        <header-bar />
      </div>
      <div class="router-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import headerBar from './components/header.vue'
import itemBar from './components/itembar.vue'
import { defineComponent, onMounted, reactive } from 'vue'
export default defineComponent({
  name: 'index',
  components: {
    itemBar,
    headerBar
  },
  setup() {
    const router = useRouter()
    const state = reactive<any>({
      index: 0
    })
    onMounted(() => {
      router.push('/index')
    })
    return {
      state,
      router
    }
  }
})
</script>
<style lang="scss" scoped>
//修改ant 默认表格样式 勿动
::v-deep .ant-table-cell-row-hover {
  background-color: rgba(255, 255, 255, 0.226) !important;
}
::v-deep .ant-pagination {
  li {
    box-shadow: 0 0 2px 2px rgba(100, 100, 100, 0.5);
  }
  * {
    border: 0;
    border-radius: 10px !important;
  }
}
::v-deep .ant-table-wrapper {
  height: 100% !important;
}
::v-deep .ant-table {
  height: 100%;
  .ant-table-thead > tr > th {
    background-color: rgba(0, 0, 0, 0) !important;
    color: rgb(250, 250, 250);
    font-weight: bold;
  }
  background-color: rgba(0, 0, 0, 0) !important;
  color: rgb(250, 250, 250);
}
</style>
<style lang="scss" scoped>
.container {
  // background: linear-gradient(rgb(60, 70, 136), rgb(20, 31, 72));
  background-color: rgb(253, 253, 253);
  padding: 0;
  height: 100%;
  .router-container {
    // background: linear-gradient(rgb(63, 71, 134), rgb(20, 31, 72));
    height: calc(100% - 100px) ;
    padding: 20px;
    position:relative;
  }
  .left {
    min-width: 240px;
    height: 100%;
  }
  .right {
    flex-grow: 1;
    .header {
      position: relative;
      height: 100px;
      h1 {
        padding: 20px;
        font-size: 40px;
        font-weight: bold;
        width: 100%;
        position: absolute;
      }
    }
  }
}
</style>


