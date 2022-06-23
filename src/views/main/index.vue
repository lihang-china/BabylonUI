<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-08 09:16:22
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-23 11:22:16
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
       <my-card :title="'告警列表'" class="card-meshinfo">
       
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
        info: '沿海建筑模型',
        path: 'XX省 XX市 116号'
      }
    })
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
    const handleSelect = () => {
      let animationBox = new BABYLON.Animation(
        'myAnimation',
        'position',
        100,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      )
      let animationRon = new BABYLON.Animation(
        'myAnimation',
        'rotation',
        100,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      )
      let key = []
      key.push({
        frame: 0,
        value: new BABYLON.Vector3(-40, 1.5, 3)
      })
      key.push({
        frame: 20,
        value: new BABYLON.Vector3(14.5, 1.5, 3)
      })
      key.push({
        frame: 40,
        value: new BABYLON.Vector3(14.4, 1.5, -13)
      })
      key.push({
        frame: 58,
        value: new BABYLON.Vector3(5, 1.5, -15)
      })
      key.push({
        frame: 80,
        value: new BABYLON.Vector3(4.2, 1.5, -11)
      })
      key.push({
        frame: 85,
        value: new BABYLON.Vector3(7, 1.5, -11)
      })
      let keys = []
      keys.push({
        frame: 0,
        value: new BABYLON.Vector3(0, 20.5, 0)
      })
      keys.push({
        frame: 10,
        value: new BABYLON.Vector3(0, 20.6, 0)
      })
      keys.push({
        frame: 15,
        value: new BABYLON.Vector3(0, 20.7, 0)
      })
      keys.push({
        frame: 18,
        value: new BABYLON.Vector3(0, 21.5, 0)
      })
      keys.push({
        frame: 20,
        value: new BABYLON.Vector3(0, 21.8, 0)
      })
      keys.push({
        frame: 35,
        value: new BABYLON.Vector3(0, 22.2, 0)
      })
      keys.push({
        frame: 40,
        value: new BABYLON.Vector3(0, 23.8, 0)
      })
      keys.push({
        frame: 50,
        value: new BABYLON.Vector3(0, 24, 0)
      })
      keys.push({
        frame: 60,
        value: new BABYLON.Vector3(0, 25.1, 0)
      })
      keys.push({
        frame: 65,
        value: new BABYLON.Vector3(0, 25.6, 0)
      })
      keys.push({
        frame: 82,
        value: new BABYLON.Vector3(0, 25.6, 0)
      })
      keys.push({
        frame: 86,
        value: new BABYLON.Vector3(0, 25.3, 0)
      })
      animationBox.setKeys(key)
      animationRon.setKeys(keys)
      babylon.camera.animations = []
      babylon.camera.animations.push(animationBox)
      babylon.camera.animations.push(animationRon)
      babylon.scene.beginAnimation(babylon.camera, 0, 100, true, 0.08)
    }
    const createScene = () => {
      babylon.scene = new BABYLON.Scene(babylon.engine)
      babylon.camera = new BABYLON.UniversalCamera(
        'UniversalCamera',
        new BABYLON.Vector3(-2000, 1000, 0),
        babylon.scene
      )
      babylon.camera.rotation = new BABYLON.Vector3(0.8, 1.58, 0)

      babylon.scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.5)
      let background = BABYLON.MeshBuilder.CreateGround(
        'myGround',
        { width: 10000, height: 10000, subdivisions: 10 },
        babylon.scene
      )
      background.position.y = -0.2
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
          babylon.scene.rootNodes[4]._children[0].position.y = 30
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
          //  animationRon.setKeys(key)
          babylon.camera.animations = []
          babylon.camera.animations.push(animationBox)
          babylon.scene.beginAnimation(babylon.camera, 0, 100, false, 0.2)
          // 让相机响应用户操作
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
        console.log(pickResult, 'pickResult')
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
      handleSelect
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
}
</style>
