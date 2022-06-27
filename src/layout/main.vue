<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-01 16:17:10
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-27 11:47:31
-->
<template>
  <div class="container">
    <div class="header-nav">
      <div class="nav-title">
        <radar-chart-outlined
          style="margin-right: 8px; font-size: 0.25rem; color: #0af0ff"
        />
        <div class="right">
          <div class="top"><span>SAMRT </span><span>Tag</span></div>
          <span>SDV UI-Kit GIS BIGDATA </span>
        </div>
      </div>
      <div class="header-menu">
        <a-menu mode="horizontal">
          <a-menu-item v-for="(item, index) in state.menuList" :key="index">
            {{ item.label }}
          </a-menu-item>
        </a-menu>
      </div>
      <div class="header-right">
        <img
          @click="changeState"
          :src="
            state.meshState === 0
              ? require('@/assets/sun.png')
              : require('@/assets/moon.png')
          "
          alt=""
        />
        <div class="header-time">
          <span>{{ moment(state.time).format('HH:mm:ss') }}</span>
          <span>{{ moment(state.time).format('YYYY/MM/DD') }} 年月日</span>
        </div>
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
import store from '@/store'
export default defineComponent({
  components: {
    RadarChartOutlined
  },
  setup() {
    const router = useRouter()
    const state = reactive<any>({
      meshState: 0,
      menuList: [
        { label: '综合首页' },
        { label: '智能巡检' },
        { label: '设备管理' },
        { label: '实时告警' }
      ],
      time: new Date()
    })
    const changeState = () => {
      state.meshState === 0 ? (state.meshState = 1) : (state.meshState = 0)
      store.state.meshState = state.meshState
    }
    onMounted(() => {
      router.push('/gis')
      setInterval(() => {
        state.time = new Date()
      }, 1000)
    })
    return {
      state,
      moment,
      changeState
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
  height: 100px;
  background: linear-gradient(
    rgba(0, 13, 19, 0.8) 10%,
    rgba(0, 13, 19, 0) 100%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
  * {
    color: #fff;
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
  .header-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .header-time {
      display: flex;
      flex-direction: column;
      margin-right: 16px;
      align-items: flex-end;
      span {
        text-align: center;
        &:nth-child(1) {
          font-size: 34px;
          font-weight: 600;
          letter-spacing: 5px;
          line-height: 30px;
          font-family: elefont;
        }
        &:nth-child(2) {
          font-size: 14px;
        }
      }
    }
    img {
      height: 40px;
      margin-right: 16px;
      &:hover {
        cursor: pointer;
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
      justify-content: space-between;
      text-align: left;
      .top {
        display: flex;
        align-items: center;
        span {
          &:nth-child(1) {
            font-size: 34px;
            color: #fff;
            line-height: 38px;
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
            font-size: 8px;
            border: 1px solid #fff;
            border-radius: 5px;
            text-align: center;
          }
        }
      }
      span {
        font-size: 8px;
        white-space: nowrap;
      }
    }
  }
}
</style>