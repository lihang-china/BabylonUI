<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-08 09:16:22
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-29 20:02:33
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
import { defineComponent, nextTick, onMounted, reactive, watch } from 'vue'
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

    let hl: any, //模型高亮
      myMesh: any, //模型信息
      timer: number, //定时器
      skybox: any, //天空图
      light: any //半球光

    const btnList = [
        //按钮列表
        {
          label: '人员流动分析',
          value: '1',
          pos: { x: -10.9, y: 200, z: 28.4 }
        },
        { label: '流量报警', value: '2', pos: { x: -6.4, y: 200, z: -52 } },
        {
          label: '入口流量分析',
          value: '3',
          pos: { x: 28.4, y: 200, z: -21.4 }
        }
      ],
      state = reactive({
        //获取自适应
        chartHeight: document.documentElement.clientHeight * 0.2, //图标窗口比例高度
        tableHeight: document.documentElement.clientHeight * 0.25, //ant-table窗口比例高度
        meshState: 1, //模型昼夜状态 1：昼 2：夜
        chartList: [820, 932, 901, 934, 1290, 1330, 1320], //echart数据
        radio: '1', //按钮默认值
        show: false, //模型加载窗口显示
        loading: 0, //模型加载百分比
        meshList: [
          //左侧头部信息
          { label: '模型名称', value: 'name' },
          { label: '模型信息', value: 'info' },
          { label: '模型位置', value: 'path' }
        ],
        meshData: {
          //左侧头部信息
          name: 'Mymesh',
          info: '沿海机场模型',
          path: 'XX省 XX市 116号'
        },
        columns: [
          //ant-table列
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
      }),
      babylon: any = {
        //babylonJs 基本信息
        canvas: undefined, //画布
        engine: undefined, //引擎
        scene: undefined, //场景
        camera: undefined //相机
      }
    const meshReset = () => {
      //重置模型纹理
      light.intensity = 1 //半球光亮度
      if (babylon.scene.getMeshById('cylinder')) {
        //判断摄像头特效是否存在
        babylon.scene.getMeshById('cylinder').dispose() //处理模型
      }
      if (babylon.scene.getMaterialByName('mat')) {
        //判断发光材质是否存在
        babylon.scene.getMaterialByName('mat').dispose() //处理材质
        babylon.scene.getMeshById('pathCy').dispose() //处理模型
        babylon.scene.getMeshById('torus').dispose() //处理模型
      }
      myMesh.forEach(
        (e: { disableEdgesRendering: () => void }, index: number) => {
          e.disableEdgesRendering() //关闭边缘发光
          if (index !== 0) {
            hl.removeMesh(e) //关闭模型描边
          }
        }
      )
      light.diffuse = new BABYLON.Color3(1, 1, 1) //重置半球光散射
      babylon.scene.freezeActiveMeshes() //冻结活动网格
    }
    const meshChange = (val: number) => {
      // 天空动态切换
      timer ? clearInterval(timer) : '' //判断计时器是否存在
      let speed = 10 // 昼夜切换速度
      if (val === 1) {
        timer = setInterval(() => {
          if (light.intensity <= 0.2) {
            clearInterval(timer)
          } else {
            light.intensity -= 0.01 //灯光明暗递减
            skybox.material.alpha -= 0.01 //天空盒透明度递减
          }
        }, speed)
      } else {
        timer = setInterval(() => {
          if (light.intensity >= 1) {
            clearInterval(timer)
          } else {
            light.intensity += 0.01 //灯光明暗递增
            skybox.material.alpha += 0.01 //天空盒透明度递增
          }
        }, speed)
      }
    }
    const btnChange = async (row: {
      value: string
      pos: { x: number; y: number; z: number }
    }) => {
      state.radio = row.value //切换绑定按钮
      state.chartList.sort(() => {
        return Math.random() > 0.5 ? -1 : 1 //echarts数据随机排序
      })
      createChart()
      babylon.scene.blockfreeActiveMeshesAndRenderingGroups = true
      babylon.scene.blockMaterialDirtyMechanism = true
      babylon.scene.unfreezeActiveMeshes() //解冻活动网格
      meshAnimo(row.pos)
      await babylon.scene
        .beginAnimation(babylon.camera, 0, 100, false, 0.8)
        .waitAsync() //异步加载动画
      meshTx()
    }
    const meshTx = () => {
      //描边特效
      myMesh.forEach((e: any, index: number) => {
        if (index < 1000) {
          e.enableEdgesRendering(0.001)
          e.edgesWidth = 50
          e.edgesColor = new BABYLON.Color4(0, 1, 1, 1)
        }
        if (index !== 0) {
          hl.addMesh(
            e.subMeshes[0].getRenderingMesh(),
            new BABYLON.Color3(0, 1, 1)
          )
        }
      })
      light.intensity = 0.1
    }
    const meshAnimo = (pos: { x: number; y: number; z: number }) => {
      //相机位置和旋转动画，不需要判断是否已存在模型，用于位置初始化
      let posKey = [
        {
          frame: 0,
          value: new BABYLON.Vector3(
            babylon.camera.position.x,
            babylon.camera.position.y,
            babylon.camera.position.z
          )
        },
        {
          frame: 100,
          value: new BABYLON.Vector3(pos.x - 200, pos.y, pos.z)
        }
      ]
      let ronKey = [
        {
          frame: 0,
          value: new BABYLON.Vector3(
            babylon.camera.rotation.x,
            babylon.camera.rotation.y,
            babylon.camera.rotation.z
          )
        },
        {
          frame: 100,
          value: new BABYLON.Vector3(0.8, 1.6, 0)
        }
      ]
      let keys = [
        {
          frame: 0,
          value: new BABYLON.Vector3(0, 0.1, 0)
        },
        {
          frame: 100,
          value: new BABYLON.Vector3(10, 0.1, 10)
        }
      ]
      let key = [
        {
          frame: 0,
          value: new BABYLON.Vector3(pos.x, 18, pos.z)
        },
        {
          frame: 50,
          value: new BABYLON.Vector3(pos.x, 25, pos.z)
        },
        {
          frame: 100,
          value: new BABYLON.Vector3(pos.x, 18, pos.z)
        }
      ]
      if (!babylon.camera.getAnimationByName('aniPos')) {
        let aniPos = new BABYLON.Animation(
          'aniPos',
          'position',
          100,
          BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        ) //镜头位置动画
        let aniRon = new BABYLON.Animation(
          'aniRon',
          'rotation',
          100,
          BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        ) //镜头旋转动画

        aniRon.setKeys(ronKey)
        aniPos.setKeys(posKey)
        babylon.camera.animations.push(aniRon)
        babylon.camera.animations.push(aniPos)
      } else {
        babylon.camera.getAnimationByName('aniPos').setKeys(posKey),
          babylon.camera.getAnimationByName('aniRon').setKeys(ronKey)
      }
      if (!babylon.scene.getMaterialByName('mat')) {
        //判断圆环模型是否存在，不存在则执行创建模型和动画
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
        let mat = new BABYLON.StandardMaterial('mat', babylon.scene) //发光材质
        mat.emissiveColor = new BABYLON.Color3(0, 1, 1)
        let gl = new BABYLON.GlowLayer('glow', babylon.scene, {
          //材质发光
          mainTextureSamples: 6
        })
        let mySphere = BABYLON.Mesh.CreateTorus(
          'torus',
          150,
          3,
          150,
          babylon.scene
        )
        light.intensity = 0.01
        light.diffuse = new BABYLON.Color3(0, 1, 1)
        cy.material = mat
        mySphere.material = mat
        gl.addIncludedOnlyMesh(mySphere)
        //圆环动画与浮动圆锥动画
        let animationBox = new BABYLON.Animation(
          'animationBox',
          'scaling',
          100,
          BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        )
        let animationCy = new BABYLON.Animation(
          'animationCy',
          'position',
          100,
          BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        )
        animationBox.setKeys(keys)
        animationCy.setKeys(key)
        cy.animations = []
        cy.animations.push(animationCy)
        mySphere.animations = []
        mySphere.animations.push(animationBox)
      } else {
        //设置动画为最新值
        babylon.scene
          .getMeshByName('torus')
          .getAnimationByName('animationBox')
          .setKeys(keys)
        babylon.scene
          .getMeshByName('pathCy')
          .getAnimationByName('animationCy')
          .setKeys(key)
      }
      //修改模型位置
      babylon.scene.getMeshByName('torus').position = new BABYLON.Vector3(
        pos.x,
        -1,
        pos.z
      )
      babylon.scene.getMeshByName('pathCy').position = new BABYLON.Vector3(
        pos.x,
        18,
        pos.z
      )
      //执行模型动画
      babylon.scene.beginAnimation(
        babylon.scene.getMeshByName('torus'),
        0,
        100,
        true,
        0.6
      )
      babylon.scene.beginAnimation(
        babylon.scene.getMeshByName('pathCy'),
        0,
        100,
        true,
        0.8
      )
      //开启模型动画
      babylon.scene.blockMaterialDirtyMechanism = false
      babylon.scene.blockfreeActiveMeshesAndRenderingGroups = false
    }
    const customRow = (record: any, index: number) => {
      //点击ant-table-row时间
      return {
        onClick: () => {
          babylon.scene.unfreezeActiveMeshes() //解冻活动网格
          babylon.camera.position = new BABYLON.Vector3(5, 30, 140) //改变相机位置
          //控制相机旋转
          babylon.camera.rotation.y = 3.1
          babylon.camera.rotation.x = 0.6
          if (!babylon.scene.getMeshById('cylinder')) {
            //判断摄像头扫描特效是否存在，防止重复加载模型
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
            //渲染摄像头扫描动画
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
      babylon.canvas = document.getElementById('mycanvas') //获取babylon画布
      babylon.engine = new BABYLON.Engine(babylon.canvas, true, {
        //创建babylon 3d引擎
        stencil: true
      })
    }
    const createScene = () => {
      babylon.scene = new BABYLON.Scene(babylon.engine) //创建babylon场景
      babylon.camera = new BABYLON.UniversalCamera( // 创建babylon相机
        'UniversalCamera',
        new BABYLON.Vector3(-2000, 1000, 0),
        babylon.scene
      )
      //动态模糊效果
      // new BABYLON.MotionBlurPostProcess(
      //   'mb',
      //   babylon.scene,
      //   0.1,
      //   babylon.camera
      // )
      babylon.camera.rotation = new BABYLON.Vector3(0.8, 1.6, 0) //相机旋转
      babylon.scene.clearColor = new BABYLON.Color3(0, 0.07, 0.18) //场景颜色
      let background = BABYLON.MeshBuilder.CreateGround(
        //创景地板
        'myGround',
        { width: 10000, height: 10000, subdivisions: 10 },
        babylon.scene
      )
      background.position.y = -0.5 //地板轻微下沉，防止与模型重合
      // var me = new BABYLON.StandardMaterial('myMaterial', babylon.scene)
      // me.emissiveColor = new BABYLON.Color3(1, 1, 1)
      // me.wireframe = true

      light = new BABYLON.HemisphericLight( //创建半球光
        'light1',
        new BABYLON.Vector3(0, 1, 0),
        babylon.scene
      )

      light.diffuse = new BABYLON.Color3(1, 0.98, 0.58)
      light.groundColor = new BABYLON.Color3(1, 0.98, 0.58)
      light.intensity = 1 //光照强度
      light.specular = BABYLON.Color3.Black() //镜面反射颜色
      skybox = BABYLON.Mesh.CreateBox(
        //创建天空盒
        'BackgroundSkybox',
        10000,
        babylon.scene,
        undefined,
        BABYLON.Mesh.BACKSIDE
      )
      let boxMaterial = new BABYLON.BackgroundMaterial( //创建天空盒材质
        'backgroundMaterial',
        babylon.scene
      )
      boxMaterial.reflectionTexture = new BABYLON.CubeTexture( //天空盒贴图
        'textures/TropicalSunnyDay',
        babylon.scene
      )
      boxMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.SKYBOX_MODE
      skybox.material = boxMaterial
      light.diffuse = new BABYLON.Color3(0.98, 0.98, 0.98)
      let backgroundMaterial = new BABYLON.StandardMaterial(
        'myMaterial',
        babylon.scene
      ) //创建地板材质
      let Textur = new BABYLON.Texture('textures/ground.png', babylon.scene) //地板草地贴图
      //贴图缩放
      Textur.uScale = 100
      Textur.vScale = 100
      backgroundMaterial.diffuseTexture = Textur
      background.material = backgroundMaterial

      //碰撞检测
      babylon.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1)
      babylon.scene.collisionsEnabled = true
      babylon.camera.checkCollisions = true
      background.checkCollisions = true
      babylon.camera.attachControl(babylon.canvas, true)
      babylon.scene.freezeActiveMeshes() //冻结活动网格
      hl = new BABYLON.HighlightLayer('hl1', babylon.scene) //高亮描边
      BABYLON.SceneLoader.ImportMesh(
        //加载本地gltf模型
        '',
        './',
        '3d66.gltf',
        babylon.scene,
        (mesh) => {
          mesh.forEach((e) => {
            // e.setEnabled(false)
            e.freezeWorldMatrix() //减少世界矩阵计算
            if (e.material) {
              e.material.freeze() //冻结材质
            }
          })
          myMesh = mesh
          state.show = true
          let animationBox = new BABYLON.Animation(
            'myAnimation',
            'position',
            100,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
          )
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
          //模型加载进度
          state.loading = Number(((load.loaded / load.total) * 100).toFixed(0))
        }
      )
      window.addEventListener('click', function () {
        //监听鼠标点击事件
        let pickResult = babylon.scene.pick(
          babylon.scene.pointerX,
          babylon.scene.pointerY
        )
        console.log(pickResult, 'asdadada6312321321')
      })
      babylon.engine.runRenderLoop(function () {
        //场景渲染
        babylon.scene.render()
      })
    }
    const createChart = () => {
      //创建echarts
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
      meshReset,
      meshAnimo
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
