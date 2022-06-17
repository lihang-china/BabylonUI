<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-01 16:17:10
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-17 17:01:03
-->
<template>
  <div class="container">
    <div class="header-nav">
      <div class="nav-title">
        <radar-chart-outlined
          style="margin-right: 8px; font-size: 48px; color: #0af0ff"
        />
        <div class="right">
          <div class="top"><span>SAMRT </span><span>Tag</span></div>
          <span>SDV UI-Kit GIS BIGDATA CONTROL </span>
        </div>
      </div>
      <div class="header-menu">
        <a-menu mode="horizontal">
          <a-menu-item v-for="(item, index) in state.menuList" :key="index">
            {{ item.label }}
          </a-menu-item>
        </a-menu>
      </div>
      <div class="header-time">
        <span>{{ moment(state.time).format('HH:mm:ss') }}</span>
        <span>{{ moment(state.time).format('YYYY/MM/DD') }} 年月日</span>
      </div>
    </div>
    <router-view> </router-view>
  </div>
</template>
<script lang="ts">
import { RadarChartOutlined } from '@ant-design/icons-vue'
import { defineComponent, onMounted, reactive } from 'vue'
import moment from 'moment'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    RadarChartOutlined
  },
  setup() {
    const router = useRouter()
    const state = reactive<any>({
      menuList: [
        { label: '综合首页' },
        { label: '智能巡检' },
        { label: '设备管理' },
        { label: '实时告警' }
      ],
      time: new Date()
    })
    onMounted(() => {
      router.push('/gis')
      setInterval(() => {
        state.time = new Date()
      }, 1000)
    })
    return {
      state,
      moment
    }
  }
})
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'colfont';
  src: url('../font/Coalition-v2-1.ttf');
  font-family: 'elefont';
  src: url('../font/ele.ttf');
}
.container {
  padding: 0;
  box-shadow: 0 0 5px 10px rgba(0, 20, 29, 0.8) inset;
}
.header-nav {
  position: fixed;
  z-index: 999;
  width: 100%;
  padding: 0 10px;
  height: 97px;
  background: linear-gradient(
    rgba(0, 20, 29, 0.8) 10%,
    rgba(0, 20, 29, 0) 100%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
  * {
    color: #fff;
  }
  .header-time {
    display: flex;
    flex-direction: column;
    width: 265px;
    margin: 0 16px;
    align-items: flex-end;
    span {
      text-align: left;
      &:nth-child(1) {
        font-size: 28px;
        font-weight: 600;
        letter-spacing: 3.5px;
        line-height: 30px;
        font-family: elefont;
      }
      &:nth-child(2) {
        font-size: 12px;
      }
    }
  }
  .header-menu {
    flex-grow: 1;
    margin: 0 16px;
    height: 57px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    ::v-deep .ant-menu {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.7);
      background-color: rgba(0, 0, 0, 0);
      border: 0;
      .ant-menu-item:hover {
        color: #fff;
      }
      .ant-menu-item:hover::after {
        border-bottom: 2px solid #fff;
      }
      .ant-menu-item-selected::after {
        border-bottom: 2px solid #fff;
      }
      .ant-menu-item-selected {
        color: #fff;
      }
    }
  }
  .nav-title {
    display: flex;
    padding: 0;
    margin: 0 16px;
    width: 370px;
    height: 54px;
    .right {
      display: flex;
      flex-direction: column;
      .top {
        display: flex;
        align-items: center;
        span {
          &:nth-child(1) {
            font-size: 28px;
            color: #fff;
            line-height: 32px;
            text-shadow: 0px 0px 5px rgb(255, 255, 255);
            letter-spacing: 2px;
            font-family: 'colfont';
            font-weight: bold;
          }
          &:nth-child(2) {
            padding: 0 10px;
            margin-left: 10px;
            line-height: 26px;
            height: 28px;
            color: #fff;
            font-size: 12px;
            border: 1px solid #fff;
            border-radius: 5px;
            text-align: center;
          }
        }
      }
      span {
        max-width: 200px;
        font-size: 12px;
      }
    }
  }
}
</style>