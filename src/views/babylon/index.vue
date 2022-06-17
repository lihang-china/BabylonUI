<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-06-08 09:16:22
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-17 13:55:12
-->
<template>
  <div class="container">
    <canvas id="mycanvas" style="width: 100%; height: 100%"></canvas>
    <button>查看画板</button>
    <button @click="handleSelect">寻找Li</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
export default defineComponent({
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
      babylon.scene.beginAnimation(babylon.camera, 0, 100, true, 0.03)
    }
    const createScene = () => {
      babylon.scene = new BABYLON.Scene(babylon.engine)
      babylon.camera = new BABYLON.UniversalCamera(
        'UniversalCamera',
        new BABYLON.Vector3(-40, 1.5, 3),
        babylon.scene
      )
      babylon.camera.rotation = new BABYLON.Vector3(0, 20.5, 0)
      // 让相机响应用户操作
      babylon.camera.attachControl(babylon.canvas, false)
      babylon.scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5)
      let background = BABYLON.MeshBuilder.CreateGround(
        'myGround',
        { width: 500, height: 500, subdivisions: 1 },
        babylon.scene
      )
      let skybox = BABYLON.Mesh.CreateBox('skyBox', 500.0, babylon.scene)
      let skyboxMaterial = new BABYLON.StandardMaterial('skyBox', babylon.scene)
      skyboxMaterial.backFaceCulling = false
      skyboxMaterial.disableLighting = true
      skybox.material = skyboxMaterial
      skyboxMaterial.disableLighting = true
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
        'textures/skybox',
        babylon.scene
      )
      skyboxMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.SKYBOX_MODE
      let light2 = new BABYLON.HemisphericLight(
        'dir01',
        new BABYLON.Vector3(0, 20, 0),
        babylon.scene
      )
      light2.groundColor = new BABYLON.Color3(1, 1, 1)
      light2.intensity = 0.3
      let light = new BABYLON.PointLight(
        'pointLight',
        new BABYLON.Vector3(1, 40, 1),
        babylon.scene
      )
      light.intensity = 0.4
      babylon.scene.gravity = new BABYLON.Vector3(0, -1.81, 0)
      babylon.camera.applyGravity = true
      babylon.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1)
      babylon.scene.collisionsEnabled = true
      babylon.camera.checkCollisions = true
      background.checkCollisions = true
      BABYLON.SceneLoader.ImportMesh(
        '',
        './',
        'demo1.gltf',
        babylon.scene,
        function (meshes) {
          left1 = meshes
          let myMaterial = new BABYLON.StandardMaterial(
            'myMaterial',
            babylon.scene
          )
          let myMaterial2 = new BABYLON.StandardMaterial(
            'myMaterial',
            babylon.scene
          )
          babylon.scene.ambientColor = new BABYLON.Color3(1, 1, 1)
          myMaterial2.diffuseColor = new BABYLON.Color3(1, 1, 1)

          meshes.forEach((e, index) => {
            console.log(e.name == 'door', index)
          })
          meshes[535].rotation.y = 10
          console.log(meshes[535], '65565')
          meshes[535].rotationQuaternion = null
          meshes[535].rotation.y = Math.PI / 2
          let doorMeshLeft = BABYLON.MeshBuilder.CreateBox('doorMeshLeft', {
            height: 4,
            width: 2,
            depth: 0.25
          })
          doorMeshLeft.position = new BABYLON.Vector3(-1, 0, 5.5)
          meshes[535].actionManager = new BABYLON.ActionManager(babylon.scene)
          meshes[535].setPivotPoint(
            new BABYLON.Vector3(-1, 0, 0),
            BABYLON.Space.LOCAL
          )
          meshes[535].actionManager.registerAction(
            new BABYLON.CombineAction(BABYLON.ActionManager.OnPickTrigger, [
              new BABYLON.InterpolateValueAction(
                BABYLON.ActionManager.OnPickTrigger,
                meshes[535],
                'rotation.y',
                -Math.PI / 2,
                1500
              )
            ])
          )
          myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1)
          myMaterial.diffuseTexture = new BABYLON.Texture(
            'PATH TO IMAGE',
            babylon.scene
          )
          myMaterial.specularTexture = new BABYLON.Texture(
            'PATH TO IMAGE',
            babylon.scene
          )
          myMaterial.emissiveTexture = new BABYLON.Texture(
            'PATH TO IMAGE',
            babylon.scene
          )
          myMaterial.ambientTexture = new BABYLON.Texture(
            'PATH TO IMAGE',
            babylon.scene
          )
          for (let i = 0; i < meshes.length; i++) {
            meshes[i].checkCollisions = true
          }
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
      left1,
      handleSelect
    }
  }
})
</script>
<style lang="scss" scoped>
#mycanvas {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
button {
  position: absolute;
  top: 10px;
  left: 0;
  z-index: 2;
  padding: 5px 15px;
  border-radius: 8px;
  background-color: rgba(0, 26, 255, 0.6);
  color: #fff;
  border: 0;
  &:nth-child(2) {
    left: 100px;
  }
}
</style>
