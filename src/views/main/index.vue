<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-08 09:16:22
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-28 16:02:33
-->
<template>
  <div class="container">
    <canvas id="mycanvas" style="width: 100%; height: 100%"></canvas>
    <div class="left">
      <my-card :title="'模型信息'" class="card-meshinfo">
        <ul>
          <li v-for="(item, index) in state.meshList" :key="index">
            <span>{{ item.label }}:</span>
            <span>{{ state.meshData[item.value] }}</span>
          </li>
        </ul>
      </my-card>
      <my-card>
        <div class="group-chart">
          <group class="btn-group">
            <button
              class="default-btn"
              @click="btnChange(item)"
              v-for="(item, index) in btnList"
              :key="index"
              :class="[state.radio === item.value ? 'active-btn' : '']"
            >
              {{ item.label }}
            </button>
          </group>
          <div
            id="myChart"
            class="mychart"
            :style="'height:' + state.chartHeight + 'px'"
          ></div>
        </div>
      </my-card>
      <my-card :title="'告警监控'" class="card-meshinfo">
        <a-table
          :customRow="customRow"
          :pagination="false"
          size="small"
          :columns="state.columns"
          :data-source="state.data"
          :scroll="{
            y: state.tableHeight
          }"
        >
        </a-table>
      </my-card>
    </div>
    <button class="fixed-btn" @click="meshReset()"><reload-outlined /></button>
    <div class="bottom"></div>
    <div class="right">
      <div class="right-card card-meshstatus"></div>
    </div>
    <transition name="fade">
      <loading v-if="false" :loading="state.loading" />
    </transition>
  </div>
</template>

<script lang="ts">
import { ReloadOutlined } from '@ant-design/icons-vue'
import loading from './components/loading.vue'
import myCard from './components/mainCard.vue'
import { defineComponent, onMounted, reactive, watch } from 'vue'
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import * as echarts from 'echarts'
import store from '@/store'
export default defineComponent({
  components: {
    myCard,
    loading,
    ReloadOutlined
  },
  setup() {
    watch(
      () => store.state.meshState,
      (val) => {
        meshChange(val)
      }
    )
    let hl: any = undefined
    let myMesh: any[] = []
    let timer: any = undefined
    let skybox: any = undefined
    let light: any = undefined
    let mySphere: any = undefined
    const btnList = [
      { label: '人员流动分析', value: '1' },
      { label: '流量报警', value: '2' },
      { label: '入口流量分析', value: '3' }
    ]
    const state = reactive({
      //获取自适应
      chartHeight: document.documentElement.clientHeight * 0.2,
      tableHeight: document.documentElement.clientHeight * 0.25,
      meshState: 1,
      chartList: [820, 932, 901, 934, 1290, 1330, 1320],
      radio: '1',
      show: false,
      loading: 0,
      meshList: [
        { label: '模型名称', value: 'name' },
        { label: '模型信息', value: 'info' },
        { label: '模型位置', value: 'path' }
      ],
      meshData: {
        name: 'Mymesh',
        info: '沿海机场模型',
        path: 'XX省 XX市 116号'
      },
      columns: [
        { title: '监控名称', key: 'name', dataIndex: 'name' },
        { title: '区域', key: 'area', dataIndex: 'area' },
        {
          title: '时间',
          key: 'time',
          dataIndex: 'time',
          ellipsis: true,
          align: 'center'
        }
        // {
        //   title: "操作",
        //   key: "handle",
        //   slots: { customRender: "handle" },
        //   align: "center",
        // },
      ],
      data: [
        { name: 'Row-1', area: '西路口', time: '2022-06-06 10:22:01' },
        { name: 'Tcar-1', area: '停车场', time: '2022-06-06 10:22:01' },
        { name: 'Row-2', area: '东路口', time: '2022-06-06 10:22:01' },
        { name: 'Tik-1', area: '餐厅', time: '2022-06-06 10:22:01' },
        { name: 'Tcic-2', area: '商店', time: '2022-06-06 10:22:01' },
        { name: 'Row-2', area: '东路口', time: '2022-06-06 10:22:01' },
        { name: 'Tik-1', area: '餐厅', time: '2022-06-06 10:22:01' },
        { name: 'Tcic-2', area: '商店', time: '2022-06-06 10:22:01' }
      ]
    })

    const babylon: any = {
      canvas: undefined,
      engine: undefined,
      scene: undefined,
      camera: undefined
    }
    const meshReset = () => {
      //重置模型纹理
      light.intensity = 1
      if (babylon.scene.getMeshById('cylinder')) {
        babylon.scene.getMeshById('cylinder').dispose()
      }
      if (babylon.scene.getMaterialByName('mat')) {
        babylon.scene.getMaterialByName('mat').dispose()
        babylon.scene.getMeshById('pathCy').dispose()
        babylon.scene.getMeshById('torus').dispose()
      }
      myMesh.forEach((e) => {
        e.disableEdgesRendering() //关闭描边
        hl.removeMesh(e)
      })
      light.diffuse = new BABYLON.Color3(1, 1, 1)
    }
    const meshChange = (val: number) => {
      // 天空动态切换
      timer ? clearInterval(timer) : ''
      let speed = 10
      if (val === 1) {
        timer = setInterval(() => {
          if (light.intensity <= 0.2) {
            clearInterval(timer)
          } else {
            light.intensity -= 0.01
            skybox.material.alpha -= 0.01
          }
        }, speed)
      } else {
        timer = setInterval(() => {
          if (light.intensity >= 1) {
            clearInterval(timer)
          } else {
            light.intensity += 0.01
            skybox.material.alpha += 0.01
          }
        }, speed)
      }
    }
    const btnChange = (row: { value: string }) => {
      // 更新echarts图标
      state.radio = row.value
      state.chartList.sort(() => {
        return Math.random() > 0.5 ? -1 : 1
      })
      if (!mySphere) {
        //判断圆环模型是否存在，不存在则不执行创建模型和动画
        let cy = BABYLON.Mesh.CreateCylinder(
          //圆锥
          'pathCy',
          20,
          10,
          0.1,
          100,
          1,
          babylon.scene
        )
        cy.position = new BABYLON.Vector3(0, 18, 0)
        let mat = new BABYLON.StandardMaterial('mat', babylon.scene) //发光材质
        mat.emissiveColor = new BABYLON.Color3(0, 1, 1)
        let gl = new BABYLON.GlowLayer('glow', babylon.scene, {
          //材质发光
          mainTextureSamples: 6
        })
        mySphere = BABYLON.Mesh.CreateTorus('torus', 150, 3, 150, babylon.scene)
        hl = new BABYLON.HighlightLayer('hl1', babylon.scene)
        let box = BABYLON.Mesh.CreateBox('box1', 2, babylon.scene)
        babylon.camera.position = new BABYLON.Vector3(-250, 300, 0)
        myMesh.forEach((e, index) => {
          e.enableEdgesRendering(0.5)
          e.edgesWidth = 30
          e.edgesColor = new BABYLON.Color4(0, 1, 1, 1)
          if (index !== 0) {
            hl.addMesh(
              e.subMeshes[0].getRenderingMesh(),
              new BABYLON.Color3(0, 1, 1)
            )
          }
        })
        light.intensity = 0.2
        light.diffuse = new BABYLON.Color3(0, 1, 1)
        cy.material = mat
        mySphere.material = mat
        mySphere.position = new BABYLON.Vector3(0, -1, 0)
        gl.addIncludedOnlyMesh(mySphere)
        //圆环动画与浮动圆锥动画
        let animationBox = new BABYLON.Animation(
          'myAnimation',
          'scaling',
          100,
          BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        )
        let animationCy = new BABYLON.Animation(
          'cyAnimation',
          'position',
          100,
          BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        )
        let keys = []
        keys.push({
          frame: 0,
          value: new BABYLON.Vector3(0, 0.1, 0)
        })

        keys.push({
          frame: 100,
          value: new BABYLON.Vector3(10, 0.1, 10)
        })
        let key = []
        key.push({
          frame: 0,
          value: new BABYLON.Vector3(0, 18, 0)
        })
        key.push({
          frame: 50,
          value: new BABYLON.Vector3(0, 25, 0)
        })
        key.push({
          frame: 100,
          value: new BABYLON.Vector3(0, 18, 0)
        })
        animationBox.setKeys(keys)
        animationCy.setKeys(key)
        cy.animations = []
        cy.animations.push(animationCy)
        mySphere.animations = []
        mySphere.animations.push(animationBox)
        babylon.scene.beginAnimation(mySphere, 0, 100, true, 0.6)
        babylon.scene.beginAnimation(cy, 0, 100, true, 0.8)
      }
      createChart()
    }
    const customRow = (record: any, index: number) => {
      return {
        onClick: () => {
          babylon.camera.position = new BABYLON.Vector3(5, 30, 140)
          babylon.camera.rotation.y = 3.1
          babylon.camera.rotation.x = 0.6
          if (!babylon.scene.getMeshById('cylinder')) {
            let myMaterial = new BABYLON.StandardMaterial(
              'myMaterial',
              babylon.scene
            )
            myMaterial.emissiveColor = new BABYLON.Color3(0, 0.29, 0.61)
            myMaterial.diffuseColor = new BABYLON.Color3(0, 0.72, 1)
            let cylinder = BABYLON.Mesh.CreateCylinder(
              'cylinder',
              18,
              0.2,
              40,
              100,
              1,
              babylon.scene
            )
            cylinder.position = new BABYLON.Vector3(10, -3, 85)
            cylinder.rotation.z = -0.5
            cylinder.material = myMaterial
            myMaterial.alpha = 0.3
            myMaterial.wireframe = true //栅格纹理
            let time = 0.2
            cylinder.setPivotPoint(
              new BABYLON.Vector3(0, 10, 0),
              BABYLON.Space.LOCAL
            )
            //渲染动画
            skybox.material.alpha = 0.7
            babylon.scene.registerBeforeRender(function () {
              time += 0.01 * babylon.scene.getAnimationRatio()
              cylinder.rotation.y = 0.8 * Math.sin(time)
            })
          }
        }
      }
    }
    const initBabylon = () => {
      babylon.canvas = document.getElementById('mycanvas')
      babylon.engine = new BABYLON.Engine(babylon.canvas, true, {
        stencil: true
      })
    }
    const createScene = () => {
      babylon.scene = new BABYLON.Scene(babylon.engine)
      babylon.camera = new BABYLON.UniversalCamera(
        'UniversalCamera',
        new BABYLON.Vector3(-2000, 1000, 0),
        babylon.scene
      )
      //动态模糊效果
      // var motionblur = new BABYLON.MotionBlurPostProcess(
      //   'mb',
      //   babylon.scene,
      //   0.1,
      //   babylon.camera
      // )
      babylon.camera.rotation = new BABYLON.Vector3(0.8, 1.6, 0)
      babylon.scene.clearColor = new BABYLON.Color3(0, 0.07, 0.18)
      let background = BABYLON.MeshBuilder.CreateGround(
        'myGround',
        { width: 10000, height: 10000, subdivisions: 10 },
        babylon.scene
      )
      background.position.y = -0.5
      var me = new BABYLON.StandardMaterial('myMaterial', babylon.scene)
      me.emissiveColor = new BABYLON.Color3(1, 1, 1)
      me.wireframe = true

      light = new BABYLON.HemisphericLight(
        'light1',
        new BABYLON.Vector3(0, 1, 0),
        babylon.scene
      )
      light.intensity = 1
      light.diffuseColor = new BABYLON.Color3(1, 1, 1)
      light.specular = BABYLON.Color3.Black()
      skybox = BABYLON.Mesh.CreateBox(
        'BackgroundSkybox',
        10000,
        babylon.scene,
        undefined,
        BABYLON.Mesh.BACKSIDE
      )
      let backgroundMaterial = new BABYLON.BackgroundMaterial(
        'backgroundMaterial',
        babylon.scene
      )
      backgroundMaterial.reflectionTexture = new BABYLON.CubeTexture(
        'textures/TropicalSunnyDay',
        babylon.scene
      )
      backgroundMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.SKYBOX_MODE
      skybox.material = backgroundMaterial
      light.diffuse = new BABYLON.Color3(0.98, 0.98, 0.98)
      let myMaterial = new BABYLON.StandardMaterial('myMaterial', babylon.scene)
      // myMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8)
      let Textur = new BABYLON.Texture('textures/ground.png', babylon.scene)
      Textur.uScale = 100
      Textur.vScale = 100
      myMaterial.diffuseTexture = Textur
      background.material = myMaterial

      //碰撞检测
      babylon.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1)
      babylon.scene.collisionsEnabled = true
      babylon.camera.checkCollisions = true
      background.checkCollisions = true
      babylon.camera.attachControl(babylon.canvas, true)
      BABYLON.SceneLoader.ImportMesh(
        '',
        './',
        '3d66.gltf',
        babylon.scene,
        (mesh) => {
          myMesh = mesh

          state.show = true
          let animationBox = new BABYLON.Animation(
            'myAnimation',
            'position',
            100,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
          )
          // mesh.forEach((e) => {
          //   e.enableEdgesRendering(9999)
          //   e.edgesWidth = 10.0
          //   e.edgesColor = new BABYLON.Color4(0, 0, 1, 1)
          // })

          let keys = []
          keys.push({
            frame: 0,
            value: new BABYLON.Vector3(-2000, 1000, 0)
          })
          keys.push({
            frame: 60,
            value: new BABYLON.Vector3(-800, 800, 0)
          })
          keys.push({
            frame: 100,
            value: new BABYLON.Vector3(-300, 350, 0)
          })
          animationBox.setKeys(keys)
          babylon.camera.animations = []
          babylon.camera.animations.push(animationBox)
          babylon.scene.beginAnimation(babylon.camera, 0, 100, false, 0.4)
        },
        (load) => {
          state.loading = Number(((load.loaded / load.total) * 100).toFixed(0))
        }
      )
      window.addEventListener('click', function () {
        let pickResult = babylon.scene.pick(
          babylon.scene.pointerX,
          babylon.scene.pointerY
        )
      })
      babylon.engine.runRenderLoop(function () {
        babylon.scene.render()
      })
    }
    const createChart = () => {
      let chartDom = document.querySelector('#myChart')
      if (chartDom !== null) {
        let myChart = echarts.init(chartDom as HTMLDivElement)
        myChart.setOption({
          grid: {
            x: 30,
            y: 30,
            x2: 10,
            y2: 10
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            show: false
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
              data: state.chartList,
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
    onMounted(() => {
      initBabylon()
      createScene()
      createChart()
    })
    return {
      babylon,
      state,
      customRow,
      btnList,
      btnChange,
      meshReset
    }
  }
})
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 14px;
  overflow: hidden;
}
#mycanvas {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
.right,
.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 370px;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 20, 29, 0.2);
  // background: linear-gradient(90deg,rgba(0, 20, 29, 0.2) 40%,rgba(0, 20, 29, 0) 100%);
  backdrop-filter: saturate(100%) blur(5px);
  padding: 10px;
  padding-top: 120px;
}
.right {
  width: 260px;
}
.bottom {
  z-index: 10;
  // background-color: rgba(0, 20, 29, 0.2);
  // backdrop-filter: saturate(100%) blur(20px);
  padding: 10px;
  flex-grow: 1;
  height: 100px;
}

.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.group-chart {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.btn-group {
  display: flex;
  justify-content: space-between;
  .default-btn {
    border-radius: 0;
    font-size: 8px;
    padding: 8px 18px;
    background-color: rgba(168, 168, 168, 0);
    border: 1px solid rgb(199, 199, 199);
    color: rgb(220, 220, 220);
    transition: all 0.3s;
    font-size: 12px;
    &:hover {
      cursor: pointer;
      background-color: rgba(41, 41, 41, 0.2) !important;
    }
  }
  .active-btn {
    border: 1px solid #18fefe;
    color: rgb(255, 255, 255);
  }
}
.card-meshinfo {
  ul {
    width: 100%;
    padding: 0;
    li {
      list-style: none;
      width: 100%;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
    }
  }

  ::v-deep .ant-table {
    background: rgba(0, 0, 0, 0);
    * {
      font-size: 14px !important;
    }
    th,
    td {
      color: #fff;
    }
    .ant-table-row:hover {
      cursor: pointer;
    }
    .ant-table-cell-row-hover {
      //  background: rgba(0, 0, 0, 0.185);
      color: rgb(161, 161, 161);
    }
    * {
      background: rgba(0, 0, 0, 0);
    }
  }
}
::v-deep .ant-table-body {
  max-height: 200px;
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background: #73737285;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: 0;
    border-radius: 0;
    background: #ffffff1a;
  }
}
.right-card {
  display: flex;
  width: 100%;
}
.mychart {
  width: 100%;
}
.fixed-btn {
  width: 40px;
  height: 40px;
  z-index: 999;
  margin: 10px;
  font-size: 16px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  overflow: hidden;
  border: 0;
  &:hover {
    cursor: pointer;
  }
}
</style>
