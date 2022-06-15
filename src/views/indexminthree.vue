<template>
  <div id="container" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { defineComponent, onMounted, reactive, nextTick } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let scene: any = null
let mesh1: any = null
export default defineComponent({
  name: 'index',
  setup() {
    const state = reactive<any>({
      camera: null,
      scene: null,
      renderer: null,
      cube: null
    })
    const init3D = async () => {
      var loader = new GLTFLoader() //创建一个FBX加载器
      loader.load('../../public/3d.fbx', (obj) => {
        // console.log(obj);//查看加载后返回的模型对象
        state.scene.add(obj)
        // 适当平移fbx模型位置
      })
      let container = document.getElementById('container')
      // 构建场景

      // 构建相机
      // 参数说明 视野：75度，长宽比，近平面裁剪：0.1，远平面裁剪：1000
      if (container) {
        state.camera = new THREE.PerspectiveCamera(
          75,
          container.clientWidth / container.clientHeight,
          0.1,
          100
        ) //初始化相机，参数通俗讲PerspectiveCamera(远近，宽高比,摄像机视锥体近端面(默认0.1)，摄像机视锥体远端面(默认2000，无限大，表示可以看到最远))
        state.camera.position.z = 5 //Z轴的距离
        scene = new THREE.Scene() //初始化场景
        let loader = new GLTFLoader()
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        loader.load(('../views/de.gltf'), function (obj) {
          // 控制台查看返回结构：包含一个网格模型Mesh的组Group
          console.log(obj)
          // 查看加载器生成的材质对象：MeshPhongMaterial
          scene.add(obj)
        })
        state.renderer = new THREE.WebGLRenderer({ antialias: true }) //render函数
        state.renderer.setSize(container.clientWidth, container.clientHeight) //设置render的尺寸
        container.appendChild(state.renderer.domElement) //插入container
        var geometry1 = new THREE.SphereGeometry(0.2, 40, 40) //多面体
        let material1 = new THREE.MeshLambertMaterial({
          color: 0x409eff,
          transparent: true, //是否透明
          opacity: 0.5 //透明度
        })
        mesh1 = new THREE.Mesh(geometry1, material1) //材质跟立方体
        scene.add(mesh1) //add到场景中

        // var geometry = new THREE.SphereGeometry(0.1, 40, 40)
        // var material = new THREE.MeshBasicMaterial({
        //   color: 'rgb(246,191,27)'
        // })
        // var cube = new THREE.Mesh(geometry, material)
        // cube.position.set(1.6, 0, 0)
        // scene.add(cube)

        // var geometry2 = new THREE.SphereGeometry(1, 40, 40)
        // var material2 = new THREE.MeshPhongMaterial({
        //   color: 0xff0000,
        //   specular: 0x444444, //高光部分的颜色
        //   shininess: 20 //高光部分的亮度，默认30
        // })
        // var mesh2 = new THREE.Mesh(geometry2, material2) //网格模型对象Mesh
        // mesh2.translateX(0) //球体网格模型沿Y轴正方向平移120
        // scene.add(mesh2)
        mesh1.position.set(3, 0, 0)
        // mesh2.position.set(1, 0, 0)
        //添加点光源
        var point = new THREE.PointLight(0xffffff)
        point.position.set(400, 10, 500)
        scene.add(point)

        //添加环境光
        var ambient = new THREE.AmbientLight(0x999999)
        scene.add(ambient)

        var controls = new OrbitControls(state.camera, container) //控制器，可实现鼠标左键旋转，右键拖动，滑轮缩放,OrbitControls第二个参数新版必填为绑定元素，改变相机对象的角度
      }
    }
    const animate = () => {
      requestAnimationFrame(animate) //此方法会重复调用animate，从而实现旋转
      //垂直旋转,两种都可
      // state.mesh.rotation.x += 0.01 //垂直旋转
      // scene.rotateX(0.01)
      //水平旋转,两种都可
      mesh1.rotation.y += 0.02
      mesh1.rotateY(0.01)
      scene.rotateY(0.02)
      state.renderer.render(scene, state.camera)
    }
    onMounted(() => {
      nextTick(() => {
        init3D()
        animate()
      })
    })
    return {
      state,
      init3D
    }
  }
})
</script>
