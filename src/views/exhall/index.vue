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
      light.intensity = 0.5 //光照强度
      light.specular = BABYLON.Color3.Black() //镜面反射颜色
      light.diffuse = new BABYLON.Color3(0.9, 0.95, 1)
      light.groundColor = new BABYLON.Color3(1, 1, 1)
      babylon.camera.ellipsoid = new BABYLON.Vector3(1.2, 0.8, 1) //相机碰撞半径
      // babylon.camera.collisionRadius = new BABYLON.Vector3(0.8, 0.8, 0.8)
      babylon.scene.collisionsEnabled = true
      babylon.camera.checkCollisions = true
      let light2 = new BABYLON.DirectionalLight(
        'light12',
        new BABYLON.Vector3(0, -1, 0),
        babylon.scene
      )
      light2.intensity = 1
      // light2.position = new BABYLON.Vector3(3, 1, 5)
      var shadowGenerator = new BABYLON.ShadowGenerator(1024, light2)

      //自发光
      var gl = new BABYLON.GlowLayer('glow', babylon.scene)
      gl.intensity = 0.3
      gl.customEmissiveColorSelector = function (
        mesh,
        subMesh,
        material,
        result
      ) {
        result.set(1, 1, 1, 1)
      }
      var gl2 = new BABYLON.GlowLayer('glow', babylon.scene)
      gl2.intensity = 0.8
      gl2.customEmissiveColorSelector = function (
        mesh,
        subMesh,
        material,
        result
      ) {
        result.set(0.6, 0.81, 1, 0.8)
      }
      let Textur = new BABYLON.Texture('textures/topb.jpg', babylon.scene) //地板草地贴图
      Textur.uScale = 0.01
      Textur.vScale = 0.01
      var myMaterial = new BABYLON.StandardMaterial('myMaterial', babylon.scene)
      myMaterial.diffuseTexture = Textur
      var hl = new BABYLON.HighlightLayer("hl1", babylon.scene);

      BABYLON.SceneLoader.ImportMesh(
        //加载本地gltf模型
        '',
        './',
        'csd.gltf',
        babylon.scene,
        async (mesh) => {
          for (let e of mesh) {
            if (e.name === 'Component71' || e.name === 'Component72') {
            } else {
              e.checkCollisions = true
            }
            if (
              e.name === 'Component112' ||
              e.name === 'Component120' ||
              e.name === 'Component122' ||
              e.name === 'Component118' ||
              e.name === 'Component26' ||
              e.name === 'Component27'
            ) {
              gl.addIncludedOnlyMesh(e)
              shadowGenerator.getShadowMap().renderList.push(e)
              e.material.emissiveColor = new BABYLON.Color3(1, 1, 1)
            }
            if (e.name === 'Component158') {
              hl.addMesh(e,  new BABYLON.Color3(0.6, 0.81, 1));
            }
            if (e.name === 'Component69') {
              gl2.addIncludedOnlyMesh(e)
              e.material.emissiveColor = new BABYLON.Color3(0.6, 0.81, 1)
            }
            if (e.name === 'Component78') {
              e.receiveShadows = true
              e.material = myMaterial
              e.material.diffuseColor = new BABYLON.Color3(0, 0, 0)
              e.material.emissiveColor = new BABYLON.Color3(0, 0, 0)
            }
            if (e.name === 'Component165') {
              e.material = myMaterial
              e.material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5)
              e.material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5)
            }
          }
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