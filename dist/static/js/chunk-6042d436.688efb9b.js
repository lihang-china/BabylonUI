(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6042d436"],{"650d":function(e,n,t){"use strict";t.r(n);var a=t("7a23"),r=function(e){return Object(a["K"])("data-v-36a4cf97"),e=e(),Object(a["I"])(),e},o={class:"container"},i=r((function(){return Object(a["n"])("canvas",{id:"mycanvas",style:{width:"100%",height:"100%"}},null,-1)})),c=r((function(){return Object(a["n"])("button",null,"查看画板",-1)}));function s(e,n,t,r,s,u){return Object(a["H"])(),Object(a["m"])("div",o,[i,c,Object(a["n"])("button",{onClick:n[0]||(n[0]=function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return e.handleSelect&&e.handleSelect.apply(e,n)})},"寻找Li")])}var u=t("633b"),l=(t("01ef"),Object(a["q"])({setup:function(){var e=[],n={canvas:void 0,engine:void 0,scene:void 0,camera:void 0},t=function(){n.canvas=document.getElementById("mycanvas"),n.engine=new u["Engine"](n.canvas,!0)},r=function(){var e=new u["Animation"]("myAnimation","position",100,u["Animation"].ANIMATIONTYPE_VECTOR3,u["Animation"].ANIMATIONLOOPMODE_CONSTANT),t=new u["Animation"]("myAnimation","rotation",100,u["Animation"].ANIMATIONTYPE_VECTOR3,u["Animation"].ANIMATIONLOOPMODE_CONSTANT),a=[];a.push({frame:0,value:new u["Vector3"](-40,1.5,3)}),a.push({frame:20,value:new u["Vector3"](14.5,1.5,3)}),a.push({frame:40,value:new u["Vector3"](14.4,1.5,-13)}),a.push({frame:58,value:new u["Vector3"](5,1.5,-15)}),a.push({frame:80,value:new u["Vector3"](4.2,1.5,-11)}),a.push({frame:85,value:new u["Vector3"](7,1.5,-11)});var r=[];r.push({frame:0,value:new u["Vector3"](0,20.5,0)}),r.push({frame:10,value:new u["Vector3"](0,20.6,0)}),r.push({frame:15,value:new u["Vector3"](0,20.7,0)}),r.push({frame:18,value:new u["Vector3"](0,21.5,0)}),r.push({frame:20,value:new u["Vector3"](0,21.8,0)}),r.push({frame:35,value:new u["Vector3"](0,22.2,0)}),r.push({frame:40,value:new u["Vector3"](0,23.8,0)}),r.push({frame:50,value:new u["Vector3"](0,24,0)}),r.push({frame:60,value:new u["Vector3"](0,25.1,0)}),r.push({frame:65,value:new u["Vector3"](0,25.6,0)}),r.push({frame:82,value:new u["Vector3"](0,25.6,0)}),r.push({frame:86,value:new u["Vector3"](0,25.3,0)}),e.setKeys(a),t.setKeys(r),n.camera.animations=[],n.camera.animations.push(e),n.camera.animations.push(t),n.scene.beginAnimation(n.camera,0,100,!0,.03)},o=function(){n.scene=new u["Scene"](n.engine),n.camera=new u["UniversalCamera"]("UniversalCamera",new u["Vector3"](-40,1.5,3),n.scene),n.camera.rotation=new u["Vector3"](0,20.5,0),n.camera.attachControl(n.canvas,!1),n.scene.clearColor=new u["Color3"](.5,.8,.5);var t=u["MeshBuilder"].CreateGround("myGround",{width:500,height:500,subdivisions:1},n.scene),a=u["Mesh"].CreateBox("skyBox",500,n.scene),r=new u["StandardMaterial"]("skyBox",n.scene);r.backFaceCulling=!1,r.disableLighting=!0,a.material=r,r.disableLighting=!0,r.reflectionTexture=new u["CubeTexture"]("textures/skybox",n.scene),r.reflectionTexture.coordinatesMode=u["Texture"].SKYBOX_MODE;var o=new u["HemisphericLight"]("dir01",new u["Vector3"](0,20,0),n.scene);o.groundColor=new u["Color3"](1,1,1),o.intensity=.3;var i=new u["PointLight"]("pointLight",new u["Vector3"](1,40,1),n.scene);i.intensity=.4,n.scene.gravity=new u["Vector3"](0,-1.81,0),n.camera.applyGravity=!0,n.camera.ellipsoid=new u["Vector3"](1,1,1),n.scene.collisionsEnabled=!0,n.camera.checkCollisions=!0,t.checkCollisions=!0,u["SceneLoader"].ImportMesh("","./","demo1.gltf",n.scene,(function(t){e=t;var a=new u["StandardMaterial"]("myMaterial",n.scene),r=new u["StandardMaterial"]("myMaterial",n.scene);n.scene.ambientColor=new u["Color3"](1,1,1),r.diffuseColor=new u["Color3"](1,1,1),t.forEach((function(e,n){console.log("door"==e.name,n)})),t[535].rotation.y=10,console.log(t[535],"65565"),t[535].rotationQuaternion=null,t[535].rotation.y=Math.PI/2;var o=u["MeshBuilder"].CreateBox("doorMeshLeft",{height:4,width:2,depth:.25});o.position=new u["Vector3"](-1,0,5.5),t[535].actionManager=new u["ActionManager"](n.scene),t[535].setPivotPoint(new u["Vector3"](-1,0,0),u["Space"].LOCAL),t[535].actionManager.registerAction(new u["CombineAction"](u["ActionManager"].OnPickTrigger,[new u["InterpolateValueAction"](u["ActionManager"].OnPickTrigger,t[535],"rotation.y",-Math.PI/2,1500)])),a.emissiveColor=new u["Color3"](1,1,1),a.diffuseTexture=new u["Texture"]("PATH TO IMAGE",n.scene),a.specularTexture=new u["Texture"]("PATH TO IMAGE",n.scene),a.emissiveTexture=new u["Texture"]("PATH TO IMAGE",n.scene),a.ambientTexture=new u["Texture"]("PATH TO IMAGE",n.scene);for(var i=0;i<t.length;i++)t[i].checkCollisions=!0})),window.addEventListener("click",(function(){n.scene.pick(n.scene.pointerX,n.scene.pointerY)})),n.engine.runRenderLoop((function(){n.scene.render()}))};return Object(a["E"])((function(){t(),o()})),{babylon:n,left1:e,handleSelect:r}}})),m=(t("7f1b"),t("d959")),w=t.n(m);const d=w()(l,[["render",s],["__scopeId","data-v-36a4cf97"]]);n["default"]=d},"69d8":function(e,n,t){},"7f1b":function(e,n,t){"use strict";t("69d8")}}]);