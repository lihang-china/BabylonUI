/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-07-12 11:15:34
 * @LastEditors: Your Name
 * @LastEditTime: 2022-07-22 13:45:27
 */
import * as echarts from 'echarts'
export function leftCharts(dom: any, data: number[]) {
  const chartDom = dom
  if (chartDom !== null) {
    const myChart = echarts.init(chartDom as HTMLDivElement)
    myChart.setOption({
      grid: {
        x: 30,
        y: 30,
        x2: 10,
        y2: 18
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        show: true,
        data: ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7'],
        axisLabel: {
          textStyle: {
            color: 'rgba(255,255,255,0.7)'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          //网格线样式
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          show: true
        }
      },
      series: [
        {
          data: data,
          type: 'line',
          areaStyle: {
            color: 'rgba(24, 212, 221, 0.3)'
          },
          itemStyle: {
            normal: {
              color: 'rgba(24, 212, 221, 0.6)',
              lineStyle: {
                color: 'rgba(24, 212, 221, 0.6)' //改变折线颜色
              }
            }
          }
        }
      ]
    })
  }
}
export function rightCharts(dom:any) {
  const data1: number[] = []
  const data2: number[] = []
  for (let i = 0; i < 9; i++) {
    data1.push(Number((Math.random() * 1000).toFixed(0)))
    data2.push(Number((Math.random() * 1000).toFixed(0)))
  }
  const chartDom = dom!
  const myChart = echarts.init(chartDom)
  const yData = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9']
  let option = {}
  option = {
    tooltip: {
      trigger: 'axis'
    },
    color: ['rgba(200,200,200,0.6)', 'rgba(24, 254, 254, 1)'],
    grid: {
      top: '0%',
      left: '1%',
      right: '10%',
      bottom: '1%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      show: false
    },
    yAxis: {
      type: 'category',
      data: yData.reverse(),
      splitLine: {
        //网格线样式
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        show: true
      },
      axisLabel: {
        textStyle: {
          fontSize: '14px',
          color: '#fff'
        }
      }
    },
    series: [
      {
        name: '出',
        type: 'bar',
        data: data1,
        barWidth: 10,
        barGap: '100%' /*多个并排柱子设置柱子之间的间距*/,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true,
          textStyle: {
            color: 'rgba(255,255,255,0.8)',
            fontSize: '12px'
          }
        },
        itemStyle: {
          normal: {
            //柱形图圆角，初始化效果
            barBorderRadius: [0, 10, 10, 0]
          }
        }
      },
      {
        name: '入',
        type: 'bar',
        data: data2,
        barWidth: 10,
        barGap: '100%' /*多个并排柱子设置柱子之间的间距*/,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true,
          textStyle: {
            color: 'rgba(150,150,150,1)',
            fontSize: '12px'
          }
        },
        itemStyle: {
          normal: {
            //柱形图圆角，初始化效果
            barBorderRadius: [0, 10, 10, 0]
          }
        }
      }
    ],
    animationDuration: 0,
    animationDurationUpdate: 10000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }

  const fn = async () => {
    await setTimeout(() => {
      for (let i = 0; i < 9; i++) {
        data1[i] = Number((Math.random() * 1000).toFixed(0))
        data2[i] = Number((Math.random() * 1000).toFixed(0))
      }
      myChart.setOption({
        series: [
          {
            type: 'bar',
            data: data1
          },
          {
            type: 'bar',
            data: data2
          }
        ]
      })
      fn()
    }, 10000)
  }
  fn()
  option && myChart.setOption(option)
}