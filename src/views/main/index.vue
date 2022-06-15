<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-01 16:01:22
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-07 13:20:29
-->
<template>
  <div class="container">
    <div id="container"></div>
    <div class="left">
      <main-card> TEST </main-card>
      <main-card> TEST </main-card>
      <main-card> TEST </main-card>
    </div>
    <div class="bottom">
      <main-card> TEST </main-card> <main-card> TEST </main-card>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import mainCard from './components/mainCard.vue'
import { defineComponent, onMounted, reactive } from 'vue'

export default defineComponent({
  components: {
    mainCard
  },
  setup() {
    const initMap = () => {
      AMapLoader.load({
        key: '6a572530732922af32cf42baea2ce7fc', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          state.map = new AMap.Map('container', {
            zoom: 18,
            viewMode: '3D', // 地图模式
            pitch: 50,
            mapStyle: 'amap://styles/cdd7b700d61dcfa4b4bb29cfc2afb23a' //设置地图的显示样式
          })
          state.map.setFeatures(['building', 'road', 'bg']) // 多个种类要素显示
        })
        .catch((e) => {
          console.log(e)
        })
    }
    const state = reactive<any>({
      map: undefined
    })
    onMounted(() => {
      initMap()
    })
  }
})
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: flex-end;
  #container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .left,
  .right {
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: saturate(100%) blur(25px);
    width: 320px;
    height: 100%;
    padding: 100px 16px 0 16px;
    .main-card {
      height: 250px;
    }
  }
  .right {
    width: 230px;
  }
  .bottom {
    padding: 10px 18px;
    display: flex;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: saturate(100%) blur(15px);
    flex-grow: 1;
    height: 180px;
    .main-card {
      width: 100%;
      &:nth-child(1) {
        width: 45%;
        margin-right: 20px;
      }
    }
  }
}
</style>
