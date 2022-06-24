<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-08 09:16:22
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-24 16:55:43
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
      <my-card :title="'告警监控'" class="card-meshinfo">
        <a-table
          :customRow="customRow"
          :pagination="false"
          size="small"
          :columns="state.columns"
          :data-source="state.data"
        >
        </a-table>
      </my-card>
    </div>
    <div class="bottom"></div>
    <div class="right"></div>
    <transition name="fade">
      <loading v-if="!state.show" :loading="state.loading" />
    </transition>
  </div>
</template>

<script lang="ts">
import loading from './components/loading.vue'
import myCard from './components/mainCard.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
export default defineComponent({
  components: {
    myCard,
    loading
  },
  setup() {
    const state = reactive({
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
        { name: 'Tcic-2', area: '商店', time: '2022-06-06 10:22:01' }
      ]
    })
    const customRow = (record: any, index: number) => {
      return {
        onClick: () => {
          babylon.camera.position = new BABYLON.Vector3(10, 50, 150)
          babylon.camera.rotation.y = 3.2
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
          cylinder.position = new BABYLON.Vector3(35, -3, 75)
          cylinder.rotation.z = -0.5
          cylinder.material = myMaterial
          myMaterial.alpha = 0.3
          myMaterial.wireframe = true
          let time = 0
          cylinder.setPivotPoint(
            new BABYLON.Vector3(0, 10, 0),
            BABYLON.Space.LOCAL
          )
          babylon.scene.registerBeforeRender(function () {
            time += 0.01 * babylon.scene.getAnimationRatio()
            console.log(time,'asdsadad');
            
            cylinder.rotation.y = 1.2 * Math.sin(time)
          })
          // let animationRon = new BABYLON.Animation(
          //   'myAnimation',
          //   'rotation',
          //   100,
          //   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          //   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
          // )
          // let key = []
          // key.push({
          //   frame: 0,
          //   value: new BABYLON.Vector3(0, 0, -0.5)
          // })
          // key.push({
          //   frame: 33.3,
          //   value: new BABYLON.Vector3(0.2, -0.3, -0.5)
          // })
          // key.push({
          //   frame: 66.3,
          //   value: new BABYLON.Vector3(0, 0.3, -0.5)
          // })
          // key.push({
          //   frame: 100,
          //   value: new BABYLON.Vector3(0, 0, -0.5)
          // })
          // cylinder.setPivotPoint(
          //   new BABYLON.Vector3(0, 10, 0),
          //   BABYLON.Space.LOCAL
          // )
          // animationRon.setKeys(key)
          // cylinder.animations = []
          // cylinder.animations.push(animationRon)
          // babylon.scene.beginAnimation(cylinder, 0, 100, true, 0.4)
        }
      }
    }
    const babylon: any = {
      canvas: undefined,
      engine: undefined,
      scene: undefined,
      camera: undefined
    }
    const initBabylon = () => {
      babylon.canvas = document.getElementById('mycanvas')
      babylon.engine = new BABYLON.Engine(babylon.canvas, true)
    }
    const createScene = () => {
      babylon.scene = new BABYLON.Scene(babylon.engine)
      babylon.camera = new BABYLON.UniversalCamera(
        'UniversalCamera',
        new BABYLON.Vector3(-2000, 1000, 0),
        babylon.scene
      )
      var motionblur = new BABYLON.MotionBlurPostProcess(
        'mb', // The name of the effect.
        babylon.scene, // The scene containing the objects to blur according to their velocity.
        2.0, // The required width/height ratio to downsize to before computing the render pass.
        babylon.camera // The camera to apply the render pass to.
      )
      babylon.camera.rotation = new BABYLON.Vector3(0.8, 1.6, 0)
      babylon.scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.5)
      let background = BABYLON.MeshBuilder.CreateGround(
        'myGround',
        { width: 10000, height: 10000, subdivisions: 1 },
        babylon.scene
      )
      background.receiveShadows = true
      let light = new BABYLON.HemisphericLight(
        'light1',
        new BABYLON.Vector3(0, 1, 0),
        babylon.scene
      )
      // light.position = new BABYLON.Vector3(0, -1, 0)
      light.intensity = 1
      let skybox = BABYLON.Mesh.CreateBox(
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
      myMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8)
      background.material = myMaterial
      //碰撞检测
      babylon.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1)
      babylon.scene.collisionsEnabled = true
      babylon.camera.checkCollisions = true
      background.checkCollisions = true
      babylon.camera.attachControl(babylon.canvas, true)
      BABYLON.SceneLoader.ImportMesh(
        'mesh',
        './',
        '3d66.gltf',
        babylon.scene,
        (mesh) => {
          babylon.scene.rootNodes[4]._children[0].position =
            new BABYLON.Vector3(0, 0.2, 0)
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
    onMounted(() => {
      initBabylon()
      createScene()
    })
    return {
      babylon,
      state,
      customRow
    }
  }
})
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
#mycanvas {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
.right,
.left {
  width: 320px;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 20, 29, 0.2);
  // background: linear-gradient(90deg,rgba(0, 20, 29, 0.2) 40%,rgba(0, 20, 29, 0) 100%);
  backdrop-filter: saturate(100%) blur(5px);
  padding: 10px;
  padding-top: 95px;
}
.right {
  width: 240px;
}
.bottom {
  z-index: 10;
  // background-color: rgba(0, 20, 29, 0.2);
  // backdrop-filter: saturate(100%) blur(20px);
  padding: 10px;
  flex-grow: 1;
  height: 100px;
}
button {
  padding: 5px 15px;
  border-radius: 3px;
  background-color: rgba(252, 244, 138, 0.6);
  color: #fff;
  border: 0;
  &:nth-child(2) {
    left: 100px;
  }
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
</style>
