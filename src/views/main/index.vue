<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-08 09:16:22
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-20 16:22:55
-->
<template>
  <div class="container">
    <a-space v-if="show">
    <a-spin size="large" />
  </a-space>
    <canvas id="mycanvas" style="width: 100%; height: 100%"></canvas>
    <div class="left">
      <my-card :title="'模型信息'">
        <div>
          Text Demo
          <button @click="handleSelect">房间元</button>
        </div>
      </my-card>
    </div>
    <div class="bottom"></div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
import myCard from './components/mainCard.vue'
import { defineComponent, onMounted } from 'vue'
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
export default defineComponent({
  components: {
    myCard
  },
  setup() {
    let left1: any = []
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
        new BABYLON.Vector3(-300, 0, 0),
        babylon.scene
      )
      babylon.camera.rotation = new BABYLON.Vector3(0.8, 1.55, 0)
      babylon.camera.position.y = 200
      // 让相机响应用户操作
      babylon.camera.attachControl(babylon.canvas, false)
      babylon.scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8)
      let background = BABYLON.MeshBuilder.CreateGround(
        'myGround',
        { width: 10000, height: 10000, subdivisions: 1 },
        babylon.scene
      )
      background.position.y = -0.5
      //添加雾
      babylon.scene.fogMode = BABYLON.Scene.FOGMODE_EXP
      babylon.scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.9)
      babylon.scene.fogDensity = 0.00005
      let light2 = new BABYLON.HemisphericLight(
        'dir01',
        new BABYLON.Vector3(0, 20, 0),
        babylon.scene
      )
      light2.groundColor = new BABYLON.Color3(1, 1, 1)
      light2.intensity = 0.7

      //碰撞检测
      babylon.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1)
      babylon.scene.collisionsEnabled = true
      babylon.camera.checkCollisions = true
      background.checkCollisions = true
      BABYLON.SceneLoader.ImportMesh(
        '',
        './',
        '3d66.gltf',
        babylon.scene,
        (mesh) => {
          console.log(mesh, 'asdsad')
        }
      )
      window.addEventListener('click', function () {
        let pickResult = babylon.scene.pick(
          babylon.scene.pointerX,
          babylon.scene.pointerY
        )
        console.log(pickResult,'pickResult');
        pickResult.pickedMesh.position.y = 1
        
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
      left1,
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
  background-color: rgba(10, 240, 255, 0.6);
  color: #fff;
  border: 0;
  &:nth-child(2) {
    left: 100px;
  }
}
</style>
