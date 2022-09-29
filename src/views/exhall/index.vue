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
      babylon.scene.clearColor = BABYLON.Color3.Black()

      babylon.camera.attachControl(babylon.canvas, false) //相应用户操作
      babylon.camera.speed = 0.08
      let light = new BABYLON.HemisphericLight( //创建半球光
        'light1',
        new BABYLON.Vector3(0, -10, 0),
        babylon.scene
      )
      // babylon.scene.gravity = new BABYLON.Vector3(0, -0.9, 0)
      // babylon.camera.applyGravity = true
      light.intensity = 0.1 //光照强度
      light.specular = new BABYLON.Color3(0, 0, 0) //镜面反射颜色
      //  light.diffuse = new BABYLON.Color3(0.6, 0.81, 1)
      //   light.groundColor = new BABYLON.Color3(0.6, 0.81, 1)
      babylon.camera.ellipsoid = new BABYLON.Vector3(1.2, 0.8, 1) //相机碰撞半径
      // babylon.camera.collisionRadius = new BABYLON.Vector3(0.8, 0.8, 0.8)
      babylon.scene.collisionsEnabled = true
      babylon.camera.checkCollisions = true
      let light2 = new BABYLON.DirectionalLight(
        'light12',
        new BABYLON.Vector3(0, -1, 0),
        babylon.scene
      )
      light2.specular = new BABYLON.Color3(0.1, 0.1, 0.1) //镜面反射颜色
      light2.diffuse = new BABYLON.Color3(0.6, 0.81, 1)
      light2.emissive = new BABYLON.Color3(0.6, 0.81, 1)
      light2.groundColor = new BABYLON.Color3(0.6, 0.81, 1)
      light2.intensity = 0.5
      light2.position = new BABYLON.Vector3(100, 100, 0)
      var shadowGenerator = new BABYLON.ShadowGenerator(1024, light2)

      //自发光
      var gl = new BABYLON.GlowLayer('glow', babylon.scene)
      gl.intensity = 0.4
      gl.customEmissiveColorSelector = function (
        mesh,
        subMesh,
        material,
        result
      ) {
        result.set(0.8, 0.8, 0.8, 0.2)
      }
      var gl2 = new BABYLON.GlowLayer('glow', babylon.scene, {
        mainTextureFixedSize: 1024,
        blurKernelSize: 50
      })
      gl2.intensity = 0.2
      gl2.customEmissiveColorSelector = function (
        mesh,
        subMesh,
        material,
        result
      ) {
        result.set(0.6, 0.81, 1, 1)
      }
      var gl3 = new BABYLON.GlowLayer('glow', babylon.scene)
      gl3.intensity = 0.01
      gl3.customEmissiveColorSelector = function (
        mesh,
        subMesh,
        material,
        result
      ) {
        result.set(0, 0.17, 0.35, 1)
      }
      let Textur = new BABYLON.Texture('textures/topb.jpg', babylon.scene) //地板贴图
      Textur.uScale = 0.01
      Textur.vScale = 0.01
      var myMaterial = new BABYLON.StandardMaterial('myMaterial', babylon.scene)
      myMaterial.diffuseTexture = new BABYLON.Texture(
        'textures/topb2.jpg',
        babylon.scene
      )
      myMaterial.specularTexture = new BABYLON.Texture(
        'textures/topb2.jpg',
        babylon.scene
      )
      myMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.81, 1)
      myMaterial.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4)
      var hl = new BABYLON.HighlightLayer('hl1', babylon.scene)
      babylon.scene.environmentTexture =
        BABYLON.CubeTexture.CreateFromPrefilteredData(
          'textures/environment.env',
          babylon.scene
        )
      babylon.scene.environmentIntensity = 0.3
      var pbr = new BABYLON.PBRMaterial('pbr', babylon.scene)
      BABYLON.SceneLoader.ImportMesh(
        //加载本地gltf模型
        '',
        './',
        'csd.gltf',
        babylon.scene,
        async (mesh) => {
          for (let e of mesh) {
            e.specular = new BABYLON.Color3(0, 0, 0)
            if (e.name === 'Component71' || e.name === 'Component72') {
              e.material = new BABYLON.StandardMaterial(
                'myMaterial',
                babylon.scene
              )
              e.material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1)
              e.material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7)
            } else {
              e.checkCollisions = true
            }
            if (
              e.name === 'Component112' ||
              e.name === 'Component120' ||
              e.name === 'Component122' ||
              e.name === 'Component118'
            ) {
              gl.addIncludedOnlyMesh(e)
              shadowGenerator.getShadowMap().renderList.push(e)
              e.material.emissiveColor = new BABYLON.Color3(1, 1, 1)
            }

            if (e.name === 'Component70' || e.name === 'Component163') {
              e.material.diffuse = new BABYLON.Color3(0, 0, 0)
            }
            if (e.name === 'Component158' || e.name === 'Component81') {
              gl2.addIncludedOnlyMesh(e)
            }
            if (
              e.name === 'Component69' ||
              e.name === 'Component163' ||
              e.name === 'Component27' ||
              e.name === 'Component28' ||
              e.name === 'Component180' ||
              e.name === 'Component26'
            ) {
              gl2.addIncludedOnlyMesh(e)
              e.material.emissiveColor = new BABYLON.Color3(0.6, 0.81, 1)
            }
            if (e.name === 'Component78') {
              e.material = myMaterial
            }
            if (e.name === 'Component165') {
              e.material = myMaterial
              e.material.diffuseColor = new BABYLON.Color3(1, 1, 1)
              e.material.specularColor = new BABYLON.Color3(1, 1, 1)
            }
            if (e.name === 'Component93') {
            }

            if (
              e.name === 'Component18' ||
              e.name === 'Component16' ||
              e.name === 'Component24' ||
              e.name === 'Component23' ||
              e.name === 'Component84' ||
              e.name === 'Component16' ||
              e.name === 'Component15' ||
              e.name === 'Component4' ||
              e.name === 'Component2' ||
              e.name === 'Component8' ||
              e.name === 'Component13' ||
              e.name === 'Component9' ||
              e.name === 'Component22' ||
              e.name === 'Component21' ||
              e.name === 'Component30' ||
              e.name === 'Component31' ||
              e.name === 'Component32' ||
              e.name === 'Component33' ||
              e.name === 'Component29' ||
              e.name === 'Component155' ||
              e.name === 'Component157' ||
              e.name === 'Component' ||
              e.name === 'Component49' ||
              e.name === 'Component48' ||
              e.name === 'Component47' ||
              e.name === 'Component126' ||
              e.name === 'Component130' ||
              e.name === 'Component134'
            ) {
              e.material = pbr
              pbr.bumpTexture = new BABYLON.Texture(
                'textures/qbg.jpg',
                babylon.scene
              )
              pbr.albedoColor = new BABYLON.Color3(0.71, 0.67, 0.61)
              pbr.metallic = 1
              pbr.roughness = 0.5
              pbr.clearCoat.isEnabled = true
              // babylon.scene.debugLayer.show({ showExplorer: false })
              // babylon.scene.debugLayer.select(pbr, 'CLEAR COAT')
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