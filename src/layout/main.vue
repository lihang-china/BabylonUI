<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-01 16:17:10
 * @LastEditors: Your Name
 * @LastEditTime: 2022-07-22 13:17:15
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
        <div class="header-weather">
          <img :src="require('@/assets/weather.png')" alt="" />
          <div class="flex-column">
            <div class="top">
              <span>{{ state.weatherData.temperature }}</span>
              <span>℃</span>
            </div>
            <span class="bottom">{{ state.weatherData.weather }}</span>
          </div>
        </div>
      </div>
      <div class="header-right">
        <div class="flex-column">
          <span> 模型 </span>
          <span> 状态 </span>
        </div>
        <div class="mesh-weather" @click="changeState">
          {{ state.meshState === 0 ? '昼' : '夜' }}
        </div>
        <!-- <img
          @click="changeState"
          :src="
            state.meshState === 0
              ? require('@/assets/sun.png')
              : require('@/assets/moon.png')
          "
          alt=""
        /> -->
        <div class="header-time">
          <span>{{ moment(state.time).format('HH:mm:ss') }}</span>
          <span>{{ moment(state.time).format('YYYY/MM/DD') }} | 年月日</span>
        </div>
      </div>
    </div>
    <router-view> </router-view>
  </div>
</template>
<script lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
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
      time: new Date(),
      weatherData: {}
    })
    const getWeather = () => {
      AMapLoader.load({
        key: '6a572530732922af32cf42baea2ce7fc', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Weather'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        let weather = new AMap.Weather()
        weather.getLive('杭州市', function (err: any, data: any) {
          state.weatherData = data
          store.state.weatherData = data
        })
      })
    }
    const changeState = () => {
      state.meshState === 0 ? (state.meshState = 1) : (state.meshState = 0)
      store.state.meshState = state.meshState
    }
    const CreateTime = () => {
      setTimeout(() => {
        state.time = new Date()
        CreateTime()
      }, 1000)
    }
    // const initWeather = () => {
    //   setTimeout(() => {
    //     getWeather()
    //   }, 600000)
    // }
    onMounted(() => {
      CreateTime()
      getWeather()
      // initWeather()
      router.push('/gis')
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
  src: url('../font/myfont.ttf');
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
    display: flex;
    justify-content: center;
    .header-weather {
      display: flex;
      align-items: center;
      flex-grow: 1;
      justify-content: flex-end;
      margin-right: 16px;
      .flex-column {
        margin-left: 16px;
        span {
          &:nth-child(1) {
            font-size: 28px;
            line-height: 28px;
          }
          font-size: 14px;
          line-height: 20px;
          text-align: left;
        }
        .bottom {
          line-height: 12px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
      img {
        width: 44px;
        border: 3px solid #06f7a1;
        padding: 4px;
      }
    }
    ::v-deep .ant-menu {
      margin-top: 10px;
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
    width: 260px;
    .header-time {
      display: flex;
      flex-direction: column;
      margin-right: 16px;
      align-items: flex-end;
      span {
        text-align: left;
        width: 130px;
        &:nth-child(1) {
          font-size: 32px;
          font-weight: 600;
          letter-spacing: 4px;
          line-height: 34px;
          font-family: elefont;
        }
        &:nth-child(2) {
          font-size: 14px;
          letter-spacing: 0px;
        }
      }
    }
    .flex-column {
      border: 3px solid #06f7a1;
      border-right: 0;
      border-left: 0;
      width: 42px;
      height: 42px;
      letter-spacing: 4px;
      align-items: center;
      padding-top: 4px;
      span {
        line-height: 16px;
      }
    }
    .mesh-weather {
      // border: 2px solid rgb(0, 255, 191);
      width: 42px;
      line-height: 38px;
      height: 42px;
      margin: 0 16px 0 0;
      font-size: 14px;
      border: 3px solid #06f7a1;
      border-left: 0;
      background-color: rgba(0, 0, 0, 0.1);
      color: rgb(236, 236, 236);
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