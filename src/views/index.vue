<template>
  <div class="container flex-flex">
    <div class="left padding-20"></div>
    <div class="right padding-20">
      <div class="flex-column">
        <a-card>
          <div id="main" style="width: 100%; height: 300px"></div>
        </a-card>
        <h1>Card List</h1>
        <a-card
          hoverable
          :bordered="false"
          size="small"
          v-for="item in 2"
          :key="item"
          class="ui-card"
        >
          <div class="card-item">
            <div class="card-left">
              <span>Card content</span>
              <span>Card content test Text commiit</span>
            </div>
            <div class="card-right">></div>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  setup() {
    const initChart = () => {
      type EChartsOption = echarts.EChartsOption
      var chartDom = document.getElementById('main')!
      var myChart = echarts.init(chartDom)
      var option: EChartsOption

      option = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
          },
          {
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 282, 111, 234, 220, 340, 310]
          },
          {
            name: 'Line 3',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 132, 201, 334, 190, 130, 220]
          },
          {
            name: 'Line 4',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 0, 135)'
                },
                {
                  offset: 1,
                  color: 'rgb(135, 0, 157)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 402, 231, 134, 190, 230, 120]
          },
          {
            name: 'Line 5',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 191, 0)'
                },
                {
                  offset: 1,
                  color: 'rgb(224, 62, 76)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 302, 181, 234, 210, 290, 150]
          }
        ]
      }
      option && myChart.setOption(option)
    }
    onMounted(() => {
      initChart()
    })
    return {
      initChart
    }
  }
})
</script>

<style lang="scss" scoped>
.ant-card {
  margin-bottom: 12px;
  border-radius: 16px;
  width: 100%;
}
.ui-card {
  .card-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      span {
        color: rgb(150, 150, 150);
        &:nth-child(1) {
          color: rgb(40, 40, 40);
          font-weight: bold;
          font-size: 18px;
        }
      }
    }
    .card-right {
      color: rgb(40, 40, 40);
      font-weight: bold;
      font-size: 20px;
    }
  }
}
.left {
  flex-grow: 1;
}
.right {
  min-width: 490px;
  width: 30%;
  background-color: rgb(237, 243, 255);
  h1 {
    text-align: left;
  }
}
::v-deep .ant-carousel {
  .slick-slider {
    text-align: center;
    height: 160px;
    line-height: 10px;
    background: #364d79;
    overflow: hidden !important;
  }
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>
<style scoped>
/* For demo */
</style>
