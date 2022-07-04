<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-23 10:11:58
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-23 10:49:57
-->
<template>
  <div class="loading">
    <div class="loading-container">
      <div class="loading-textarea">
        <radar-chart-outlined
          style="
            margin-right: 8px;
            margin-bottom: 40px;
            font-size: 80px;
            color: #0af0ff;
          "
        />
        <h1>SMART</h1>
        <span>BABYLON JS 3D </span>
        <div><span> SYSTEM </span></div>
        <h1>Axlxxhxx</h1>
      </div>
      <div class="loading-right">
        <span>V1.0</span>
      </div>
    </div>
    <div class="loading-icon">
      <span> 3D资源正在加载中... </span>
      <a-progress
        :stroke-color="{
          '0%': 'rgba(0, 20, 29, 0.5)',
          '100%': 'rgb(10,240,250)',
        }"
        :success="{ strokeColor: 'rgb(10,240,250)' }"
        :percent="prop.loading"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { RadarChartOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    RadarChartOutlined,
  },
  props: {
    loading: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const prop = reactive<any>(props);
    return {
      prop,
    };
  },
});
</script>
<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999999999;
  background-color: rgb(21, 21, 21);
  display: flex;
  flex-direction: column;
  padding: 40px;
}
.loading-container {
  flex-grow: 1;
  display: flex;
  .loading-right {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 62px;
    color: rgb(255, 255, 255);
  }
  .loading-textarea {
    text-align: left;
    h1 {
      font-size: 82px;
      color: rgb(24, 212, 221);
      font-weight: bold;
      margin: 0;
    }
    span {
      font-size: 82px;
      color: rgb(255, 255, 255);
      font-weight: bold;
    }
  }
}
.loading-icon {
  span {
    color: rgb(250, 250, 250);
  }
}
</style>
