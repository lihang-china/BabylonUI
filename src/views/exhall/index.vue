<template>
  <canvas id="mycanvas" style="width: 100%; height: 100%"></canvas>
</template>
<script>
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import { defineComponent, onMounted, reactive, watch } from 'vue'
export default {
  setup() {
    const babylon = {
      //babylonJs 基本信息
      canvas: undefined, //画布
      engine: undefined, //引擎
      scene: undefined, //场景
      camera: undefined //相机
    }
    const initBabylon = () => {
      babylon.canvas = document.getElementById('mycanvas') //获取babylon画布
      babylon.engine = new BABYLON.Engine(babylon.canvas, true, {
        //创建babylon 3d引擎
        stencil: true
      })
    }
    //创建场景和导入gltf模型
    const createScene = () => {
      babylon.scene = new BABYLON.Scene(babylon.engine) //创建babylon场景
      babylon.camera = new BABYLON.UniversalCamera( // 创建babylon相机
        'UniversalCamera',
        new BABYLON.Vector3(2, 1.5, 3),
        babylon.scene
      )
      babylon.camera.attachControl(babylon.canvas, false) //相应用户操作
      babylon.camera.speed = 0.08
      let light = new BABYLON.HemisphericLight( //创建半球光
        'light1',
        new BABYLON.Vector3(0, 1, 0),
        babylon.scene
      )
      babylon.scene.gravity = new BABYLON.Vector3(0, -0.9, 0)
      babylon.camera.applyGravity = true
      light.diffuse = new BABYLON.Color3(1, 1, 1)
      light.groundColor = new BABYLON.Color3(1, 1, 1)
      light.intensity = 0.5 //光照强度
      light.specular = BABYLON.Color3.Black() //镜面反射颜色
      babylon.camera.ellipsoid = new BABYLON.Vector3(1.2, 0.8, 1) //相机碰撞半径
      // babylon.camera.collisionRadius = new BABYLON.Vector3(0.8, 0.8, 0.8)
      babylon.scene.collisionsEnabled = true
      babylon.camera.checkCollisions = true
      let light2 = new BABYLON.PointLight( //创建半球光
        'light12',
        new BABYLON.Vector3(0, 1, 0),
        babylon.scene
      )
      light2.intensity = 15
      light2.position = new BABYLON.Vector3(5, 2, 3.5)
      var shadowGenerator = new BABYLON.ShadowGenerator(1024, light2)
      var gl = new BABYLON.GlowLayer('glow', babylon.scene)
      gl.intensity = 10
      var hl = new BABYLON.HighlightLayer('hl1', babylon.scene)
      var pbr = new BABYLON.PBRMetallicRoughnessMaterial('pbr', babylon.scene)
      pbr.baseColor = new BABYLON.Color3(1, 1, 1)
      var gl = new BABYLON.GlowLayer('glow', babylon.scene)
      gl.intensity = 10
      BABYLON.SceneLoader.ImportMesh(
        //加载本地gltf模型
        '',
        './',
        'csd.gltf',
        babylon.scene,
        async (mesh) => {
          for (let e of mesh) {
            if (e.name && e.name === 'Component71') {
            } else {
              e.checkCollisions = true
            }
            if (e.name === 'Component112' || e.name === 'Component120') {
              gl.addIncludedOnlyMesh(e)
              hl.addMesh(e, new BABYLON.Color3(1, 1, 1))
              shadowGenerator.getShadowMap().renderList.push(e)
              e.material = pbr
            }
            if (e.name && e.name === 'Component78') {
              e.receiveShadows = true
            }
          }
          console.log(mesh)
          window.addEventListener('click', function () {
            //监听鼠标点击事件
            let pickResult = babylon.scene.pick(
              babylon.scene.pointerX,
              babylon.scene.pointerY
            )
            // pickResult.pickedMesh.position.y = 2
            console.log(pickResult)
          })
        }
      )
      babylon.engine.runRenderLoop(function () {
        //场景渲染
        babylon.scene.render()
      })
    }
    onMounted(() => {
      initBabylon()
      createScene()
    })
    return {
      babylon
    }
  }
}
</script>