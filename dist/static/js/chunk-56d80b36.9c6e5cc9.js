(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56d80b36"],{"2ae7":function(e,t,n){"use strict";n("7e1b")},4035:function(e,t,n){},"50f9":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),r=function(e){return Object(a["K"])("data-v-1806d8f9"),e=e(),Object(a["I"])(),e},i={class:"container"},c=r((function(){return Object(a["n"])("canvas",{id:"mycanvas",style:{width:"100%",height:"100%"}},null,-1)})),o={class:"left"},s={class:"group-chart"},l=["onClick"],u=r((function(){return Object(a["n"])("div",{class:"bottom"},null,-1)})),d={class:"right"},b={class:"right-card"},m=r((function(){return Object(a["n"])("h2",null,"人员流动分析",-1)})),f=r((function(){return Object(a["n"])("div",null,[Object(a["n"])("span",null,"[Day]"),Object(a["n"])("span",null,"检查口人流实时数据")],-1)})),h=r((function(){return Object(a["n"])("div",{id:"right-chart",class:"right-chart"},null,-1)})),p={class:"right-card"},O=r((function(){return Object(a["n"])("h2",null,"天气条件",-1)})),y=r((function(){return Object(a["n"])("div",null,[Object(a["n"])("span",null,"[Day]"),Object(a["n"])("span",null,"监听当前天气状况")],-1)})),v={class:"right-weather"},g={class:"humidity-cirle"},j=r((function(){return Object(a["n"])("span",null,"湿度",-1)})),w={class:"weather-bottom"},A={class:"flex-column"},x=r((function(){return Object(a["n"])("span",null,"风向",-1)})),M={class:"flex-column"},C=r((function(){return Object(a["n"])("span",null,"风力",-1)}));function N(e,t,n,r,N,T){var I=Object(a["Q"])("loading"),S=Object(a["Q"])("my-card"),E=Object(a["Q"])("group"),k=Object(a["Q"])("a-table"),B=Object(a["Q"])("reload-outlined"),V=Object(a["Q"])("hgroup");return Object(a["H"])(),Object(a["m"])("div",i,[Object(a["p"])(a["e"],{name:"fade"},{default:Object(a["cb"])((function(){return[e.state.show?(Object(a["H"])(),Object(a["k"])(I,{key:0,loading:e.state.loading},null,8,["loading"])):Object(a["l"])("",!0)]})),_:1}),c,Object(a["n"])("div",o,[Object(a["p"])(S,{title:"模型信息",class:"card-meshinfo"},{default:Object(a["cb"])((function(){return[Object(a["n"])("ul",null,[(Object(a["H"])(!0),Object(a["m"])(a["b"],null,Object(a["O"])(e.state.meshList,(function(t,n){return Object(a["H"])(),Object(a["m"])("li",{key:n},[Object(a["n"])("span",null,Object(a["T"])(t.label)+":",1),Object(a["n"])("span",null,Object(a["T"])(e.state.meshData[t.value]),1)])})),128))])]})),_:1}),Object(a["p"])(S,null,{default:Object(a["cb"])((function(){return[Object(a["n"])("div",s,[Object(a["p"])(E,{class:"btn-group"},{default:Object(a["cb"])((function(){return[(Object(a["H"])(!0),Object(a["m"])(a["b"],null,Object(a["O"])(e.btnList,(function(t,n){return Object(a["H"])(),Object(a["m"])("button",{class:Object(a["x"])(["default-btn",[e.state.radio===t.value?"active-btn":""]]),onClick:function(n){return e.btnChange(t)},key:n},Object(a["T"])(t.label),11,l)})),128))]})),_:1}),Object(a["n"])("div",{id:"myChart",class:"mychart",style:Object(a["y"])("height:"+e.state.chartHeight+"px")},null,4)])]})),_:1}),Object(a["p"])(S,{title:"告警监控",class:"card-meshinfo"},{default:Object(a["cb"])((function(){return[Object(a["n"])("div",{style:{width:"100%"},class:Object(a["x"])(e.state.shadow?"alarm-shadow":"alarm-unshadow")},[Object(a["p"])(k,{customRow:e.customRow,pagination:!1,size:"small",columns:e.state.columns,"data-source":e.state.data,scroll:{y:e.state.tableHeight}},null,8,["customRow","columns","data-source","scroll"])],2)]})),_:1})]),Object(a["n"])("button",{class:"fixed-btn",onClick:t[0]||(t[0]=function(t){return e.meshReset()})},[Object(a["p"])(B)]),u,Object(a["n"])("div",d,[Object(a["n"])("div",b,[Object(a["p"])(V,null,{default:Object(a["cb"])((function(){return[m,f]})),_:1}),h]),Object(a["n"])("div",p,[Object(a["p"])(V,null,{default:Object(a["cb"])((function(){return[O,y]})),_:1}),Object(a["n"])("div",v,[Object(a["n"])("div",g,[Object(a["n"])("span",null,Object(a["T"])(e.state.weatherData.humidity)+"%",1),j]),Object(a["n"])("div",w,[Object(a["n"])("div",A,[x,Object(a["n"])("span",null,Object(a["T"])(e.state.weatherData.windDirection),1)]),Object(a["n"])("div",M,[C,Object(a["n"])("span",null,Object(a["T"])(e.state.weatherData.windPower),1)])])])])])])}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function T(e,t,n,a){function r(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,i){function c(e){try{s(a.next(e))}catch(t){i(t)}}function o(e){try{s(a["throw"](e))}catch(t){i(t)}}function s(e){e.done?n(e.value):r(e.value).then(c,o)}s((a=a.apply(e,t||[])).next())}))}function I(e,t){var n,a,r,i,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:o(0),throw:o(1),return:o(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(e){return function(t){return s([e,t])}}function s(i){if(n)throw new TypeError("Generator is already executing.");while(c)try{if(n=1,a&&(r=2&i[0]?a["return"]:i[0]?a["throw"]||((r=a["return"])&&r.call(a),0):a.next)&&!(r=r.call(a,i[1])).done)return r;switch(a=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,a=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(r=c.trys,!(r=r.length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){c.label=i[1];break}if(6===i[0]&&c.label<r[1]){c.label=r[1],r=i;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(i);break}r[2]&&c.ops.pop(),c.trys.pop();continue}i=t.call(e,c)}catch(o){i=[6,o],a=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}}var S=n("313e");function E(e,t){var n=e;if(null!==n){var a=S["b"](n);a.setOption({grid:{x:30,y:30,x2:10,y2:18},xAxis:{type:"category",boundaryGap:!1,show:!0,data:["6.1","6.2","6.3","6.4","6.5","6.6","6.7"],axisLabel:{textStyle:{color:"rgba(255,255,255,0.7)"}}},yAxis:{type:"value",axisLabel:{textStyle:{color:"#fff"}},splitLine:{lineStyle:{color:"rgba(255, 255, 255, 0.1)"},show:!0}},series:[{data:t,type:"line",areaStyle:{color:"rgba(24, 212, 221, 0.3)"},itemStyle:{normal:{color:"rgba(24, 212, 221, 0.6)",lineStyle:{color:"rgba(24, 212, 221, 0.6)"}}}}]})}}function k(e){for(var t=this,n=[],a=[],r=0;r<9;r++)n.push(Number((1e3*Math.random()).toFixed(0))),a.push(Number((1e3*Math.random()).toFixed(0)));var i=e,c=S["b"](i),o=["A1","A2","A3","A4","A5","A6","A7","A8","A9"],s={};s={tooltip:{trigger:"axis"},color:["rgba(200,200,200,0.6)","rgba(24, 254, 254, 1)"],grid:{top:"0%",left:"1%",right:"10%",bottom:"1%",containLabel:!0},xAxis:{type:"value",boundaryGap:[0,.01],show:!1},yAxis:{type:"category",data:o.reverse(),splitLine:{lineStyle:{color:"rgba(255, 255, 255, 0.1)"},show:!0},axisLabel:{textStyle:{fontSize:"14px",color:"#fff"}}},series:[{name:"出",type:"bar",data:n,barWidth:10,barGap:"100%",label:{show:!0,position:"right",valueAnimation:!0,textStyle:{color:"rgba(255,255,255,0.8)",fontSize:"12px"}},itemStyle:{normal:{barBorderRadius:[0,10,10,0]}}},{name:"入",type:"bar",data:a,barWidth:10,barGap:"100%",label:{show:!0,position:"right",valueAnimation:!0,textStyle:{color:"rgba(150,150,150,1)",fontSize:"12px"}},itemStyle:{normal:{barBorderRadius:[0,10,10,0]}}}],animationDuration:0,animationDurationUpdate:5e3,animationEasing:"linear",animationEasingUpdate:"linear"};var l=function(){return T(t,void 0,void 0,(function(){return I(this,(function(e){switch(e.label){case 0:return[4,setTimeout((function(){console.log(1);for(var e=0;e<9;e++)n[e]=Number((1e3*Math.random()).toFixed(0)),a[e]=Number((1e3*Math.random()).toFixed(0));c.setOption({series:[{type:"bar",data:n},{type:"bar",data:a}]}),l()}),5e3)];case 1:return e.sent(),[2]}}))}))};l(),s&&c.setOption(s)}var B={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"}}]},name:"reload",theme:"outlined"},V=B,z=n("b3f0");function L(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){P(e,t,n[t])}))}return e}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var D=function(e,t){var n=L({},e,t.attrs);return Object(a["p"])(z["a"],L({},n,{icon:V}),null)};D.displayName="ReloadOutlined",D.inheritAttrs=!1;var H=D,R=function(e){return Object(a["K"])("data-v-6069f255"),e=e(),Object(a["I"])(),e},_={class:"loading"},K={class:"loading-container"},Y={class:"loading-textarea"},G=R((function(){return Object(a["n"])("h1",null,"SMART",-1)})),Q=R((function(){return Object(a["n"])("span",null,"BABYLON JS 3D ",-1)})),F=R((function(){return Object(a["n"])("div",null,[Object(a["n"])("span",null," SYSTEM ")],-1)})),X=R((function(){return Object(a["n"])("h1",null,"Axlxxhxx",-1)})),U=R((function(){return Object(a["n"])("div",{class:"loading-right"},[Object(a["n"])("span",null,"V1.0")],-1)})),W={class:"loading-icon"},q=R((function(){return Object(a["n"])("span",null," 3D资源正在加载中... ",-1)}));function J(e,t,n,r,i,c){var o=Object(a["Q"])("radar-chart-outlined"),s=Object(a["Q"])("a-progress");return Object(a["H"])(),Object(a["m"])("div",_,[Object(a["n"])("div",K,[Object(a["n"])("div",Y,[Object(a["p"])(o,{style:{"margin-right":"8px","margin-bottom":"40px","font-size":"80px",color:"#0af0ff"}}),G,Q,F,X]),U]),Object(a["n"])("div",W,[q,Object(a["p"])(s,{"stroke-color":{"0%":"rgba(0, 20, 29, 0.5)","100%":"rgb(10,240,250)"},success:{strokeColor:"rgb(10,240,250)"},percent:e.prop.loading},null,8,["stroke-color","success","percent"])])])}var $=n("0659"),Z=Object(a["q"])({components:{RadarChartOutlined:$["a"]},props:{loading:{type:Number,default:0}},setup:function(e){var t=Object(a["L"])(e);return{prop:t}}}),ee=(n("c05e"),n("d959")),te=n.n(ee);const ne=te()(Z,[["render",J],["__scopeId","data-v-6069f255"]]);var ae=ne,re=function(e){return Object(a["K"])("data-v-81dad47a"),e=e(),Object(a["I"])(),e},ie={class:"main-card"},ce={class:"card-header"},oe={class:"header-top"},se={class:"top-title"},le={class:"top-des"},ue={class:"bottom-line"},de=re((function(){return Object(a["n"])("span",null,null,-1)})),be={class:"card-container"};function me(e,t,n,r,i,c){var o=Object(a["Q"])("compress-outlined");return Object(a["H"])(),Object(a["m"])("div",ie,[Object(a["n"])("div",ce,[Object(a["n"])("div",oe,[Object(a["n"])("div",se,[Object(a["p"])(o,{style:{color:"#18fefe","margin-right":"4px"}}),Object(a["n"])("span",null,Object(a["T"])(e.prop.title),1)]),Object(a["n"])("div",le,[Object(a["n"])("span",null,Object(a["T"])(e.prop.desc.title),1),Object(a["o"])(" "+Object(a["T"])(e.prop.desc.value),1)])]),Object(a["n"])("div",ue,[(Object(a["H"])(),Object(a["m"])(a["b"],null,Object(a["O"])(3,(function(e){return Object(a["n"])("span",{key:e})})),64))]),de]),Object(a["n"])("div",be,[Object(a["P"])(e.$slots,"default",{},void 0,!0)])])}var fe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M326 664H104c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V696c0-17.7-14.3-32-32-32zm16-576h-48c-8.8 0-16 7.2-16 16v176H104c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V104c0-8.8-7.2-16-16-16zm578 576H698c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V744h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm0-384H746V104c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16z"}}]},name:"compress",theme:"outlined"},he=fe;function pe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){Oe(e,t,n[t])}))}return e}function Oe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ye=function(e,t){var n=pe({},e,t.attrs);return Object(a["p"])(z["a"],pe({},n,{icon:he}),null)};ye.displayName="CompressOutlined",ye.inheritAttrs=!1;var ve=ye,ge=Object(a["q"])({props:{title:{type:String,default:"标题"},desc:{type:Object,default:function(){return{title:"",value:""}}}},components:{CompressOutlined:ve},setup:function(e){var t=Object(a["L"])(e),n=Object(a["L"])({date:""});return Object(a["E"])((function(){n.date="asdsada"})),{prop:t,state:n}}});n("dd07");const je=te()(ge,[["render",me],["__scopeId","data-v-81dad47a"]]);var we=je,Ae=n("633b"),xe=(n("01ef"),n("0613")),Me=Object(a["q"])({components:{myCard:we,loading:ae,ReloadOutlined:H},setup:function(){var e,t,n,r,i=this;Object(a["ab"])((function(){return[xe["a"].state.meshState]}),(function(e){d(Number(e[0]))})),Object(a["ab"])((function(){return[xe["a"].state.weatherData]}),(function(e){o.weatherData=e[0]}));var c=[{label:"人员流动分析",value:"1",pos:{x:-10.9,y:200,z:28.4}},{label:"流量报警",value:"2",pos:{x:-6.4,y:200,z:-52}},{label:"入口流量分析",value:"3",pos:{x:28.4,y:200,z:-21.4}}],o=Object(a["L"])({weatherData:{},shadow:!1,chartHeight:.2*document.documentElement.clientHeight,tableHeight:.25*document.documentElement.clientHeight,meshState:1,chartList:[820,932,901,934,1290,1330,1320],radio:"1",show:!0,loading:0,meshList:[{label:"模型名称",value:"name"},{label:"模型信息",value:"info"},{label:"模型位置",value:"path"}],meshData:{name:"Mymesh",info:"沿海机场模型",path:"XX省 XX市 116号"},columns:[{title:"报警名称",key:"name",dataIndex:"name"},{title:"区域",key:"area",dataIndex:"area"},{title:"时间",key:"time",dataIndex:"time",ellipsis:!0,align:"center",width:150}],data:[{name:"爆炸报警",area:"西路口",time:"06-06 10:22:01"},{name:"烟雾报警",area:"停车场",time:"06-06 10:22:01"},{name:"火灾报警",area:"东路口",time:"06-06 10:22:01"},{name:"烟雾报警",area:"餐厅",time:"06-06 10:22:01"},{name:"烟雾报警",area:"商店",time:"06-06 10:22:01"},{name:"烟雾报警",area:"东路口",time:"06-06 10:22:01"},{name:"火灾报警",area:"餐厅",time:"06-06 10:22:01"},{name:"火灾报警",area:"商店",time:"06-06 10:22:01"}]}),s={canvas:void 0,engine:void 0,scene:void 0,camera:void 0},l=function(){setInterval((function(){o.shadow=!o.shadow}),800)},u=function(){if(n.diffuse=new Ae["Color3"](1,1,1),s.scene.unfreezeActiveMeshes(),n.intensity=1,s.scene.getMeshById("cylinder")&&s.scene.getMeshById("cylinder").dispose(),s.scene.getMaterialByName("mat")){s.scene.getMaterialByName("mat").dispose(),s.scene.getMeshById("pathCy").dispose(),s.scene.getMeshById("torus").dispose();for(var t=0;t<=e.length;t++){if(!(t<=1e3))break;e[t].disableEdgesRendering()}}s.scene.freezeActiveMeshes()},d=function(e){return T(i,void 0,void 0,(function(){return I(this,(function(a){switch(a.label){case 0:return[4,s.scene.unfreezeActiveMeshes()];case 1:return a.sent(),r&&clearInterval(r),r=1===e?setInterval((function(){n.intensity<=.2?(clearInterval(r),s.scene.freezeActiveMeshes()):(n.intensity-=.02,t.material.alpha-=.028,n.diffuse=new Ae["Color3"](n.intensity,n.intensity,n.intensity))}),10):setInterval((function(){n.intensity>=1?(clearInterval(r),n.diffuse=new Ae["Color3"](n.intensity,n.intensity,n.intensity),s.scene.freezeActiveMeshes()):(n.intensity+=.02,t.material.alpha+=.028,n.diffuse=new Ae["Color3"](n.intensity,n.intensity,n.intensity))}),10),[2]}}))}))},b=function(e){return T(i,void 0,void 0,(function(){return I(this,(function(t){switch(t.label){case 0:return o.radio=e.value,o.chartList.sort((function(){return Math.random()>.5?-1:1})),y(),s.scene.blockfreeActiveMeshesAndRenderingGroups=!0,s.scene.blockMaterialDirtyMechanism=!0,s.scene.unfreezeActiveMeshes(),f(e.pos),[4,s.scene.beginAnimation(s.camera,0,100,!1,.8).waitAsync()];case 1:return t.sent(),m(),[2]}}))}))},m=function(){e.forEach((function(e,t){t<1e3&&(e.enableEdgesRendering(.001),e.edgesWidth=50,e.edgesColor=new Ae["Color4"](0,1,1,1))})),n.intensity=.1},f=function(e){var t=[{frame:0,value:new Ae["Vector3"](s.camera.position.x,s.camera.position.y,s.camera.position.z)},{frame:100,value:new Ae["Vector3"](e.x-200,e.y,e.z)}],a=[{frame:0,value:new Ae["Vector3"](s.camera.rotation.x,s.camera.rotation.y,s.camera.rotation.z)},{frame:100,value:new Ae["Vector3"](.8,1.6,0)}],r=[{frame:0,value:new Ae["Vector3"](0,.1,0)},{frame:100,value:new Ae["Vector3"](10,.1,10)}],i=[{frame:0,value:new Ae["Vector3"](e.x,18,e.z)},{frame:50,value:new Ae["Vector3"](e.x,25,e.z)},{frame:100,value:new Ae["Vector3"](e.x,18,e.z)}];if(s.camera.getAnimationByName("aniPos"))s.camera.getAnimationByName("aniPos").setKeys(t),s.camera.getAnimationByName("aniRon").setKeys(a);else{var c=new Ae["Animation"]("aniPos","position",100,Ae["Animation"].ANIMATIONTYPE_VECTOR3,Ae["Animation"].ANIMATIONLOOPMODE_CONSTANT),o=new Ae["Animation"]("aniRon","rotation",100,Ae["Animation"].ANIMATIONTYPE_VECTOR3,Ae["Animation"].ANIMATIONLOOPMODE_CONSTANT);o.setKeys(a),c.setKeys(t),s.camera.animations.push(o),s.camera.animations.push(c)}if(s.scene.getMaterialByName("mat"))s.scene.getMeshByName("torus").getAnimationByName("animationBox").setKeys(r),s.scene.getMeshByName("pathCy").getAnimationByName("animationCy").setKeys(i);else{var l=Ae["Mesh"].CreateCylinder("pathCy",20,10,.1,100,1,s.scene),u=new Ae["StandardMaterial"]("mat",s.scene);u.emissiveColor=new Ae["Color3"](0,1,1);var d=new Ae["GlowLayer"]("glow",s.scene,{mainTextureSamples:6}),b=Ae["Mesh"].CreateTorus("torus",150,3,150,s.scene);n.intensity=.01,n.diffuse=new Ae["Color3"](0,1,1),l.material=u,b.material=u,d.addIncludedOnlyMesh(b);var m=new Ae["Animation"]("animationBox","scaling",100,Ae["Animation"].ANIMATIONTYPE_VECTOR3,Ae["Animation"].ANIMATIONLOOPMODE_CYCLE),f=new Ae["Animation"]("animationCy","position",100,Ae["Animation"].ANIMATIONTYPE_VECTOR3,Ae["Animation"].ANIMATIONLOOPMODE_CYCLE);m.setKeys(r),f.setKeys(i),l.animations=[],l.animations.push(f),b.animations=[],b.animations.push(m)}s.scene.getMeshByName("torus").position=new Ae["Vector3"](e.x,-1,e.z),s.scene.getMeshByName("pathCy").position=new Ae["Vector3"](e.x,18,e.z),s.scene.beginAnimation(s.scene.getMeshByName("torus"),0,100,!0,.6),s.scene.beginAnimation(s.scene.getMeshByName("pathCy"),0,100,!0,.8),s.scene.blockMaterialDirtyMechanism=!1,s.scene.blockfreeActiveMeshesAndRenderingGroups=!1},h=function(e,n){return{onClick:function(){if(s.scene.unfreezeActiveMeshes(),s.camera.position=new Ae["Vector3"](5,30,140),s.camera.rotation.y=3.1,s.camera.rotation.x=.6,!s.scene.getMeshById("cylinder")){var e=new Ae["StandardMaterial"]("myMaterial",s.scene);e.emissiveColor=new Ae["Color3"](0,.29,.61),e.diffuseColor=new Ae["Color3"](0,.72,1);var n=Ae["Mesh"].CreateCylinder("cylinder",18,.2,40,100,1,s.scene);n.position=new Ae["Vector3"](10,-3,85),n.rotation.z=-.5,n.material=e,e.alpha=.3,e.wireframe=!0;var a=.2;n.setPivotPoint(new Ae["Vector3"](0,10,0),Ae["Space"].LOCAL),t.material.alpha=.7,s.scene.registerBeforeRender((function(){a+=.01*s.scene.getAnimationRatio(),n.rotation.y=.8*Math.sin(a)})),Ae["ParticleHelper"].CreateAsync("explosion",s.scene).then((function(e){e.start(),e.systems.forEach((function(e){e.emitter=new Ae["Vector3"](-5,2,70)}))}))}}}},p=function(){s.canvas=document.getElementById("mycanvas"),s.engine=new Ae["Engine"](s.canvas,!0,{stencil:!0})},O=function(){s.scene=new Ae["Scene"](s.engine),s.camera=new Ae["UniversalCamera"]("UniversalCamera",new Ae["Vector3"](-2e3,1e3,0),s.scene),s.camera.rotation=new Ae["Vector3"](.8,1.6,0),s.scene.clearColor=new Ae["Color3"](0,.04,.12);var a=Ae["MeshBuilder"].CreateGroundFromHeightMap("gdhm","textures/heightMap.png",{width:1e4,height:1e4,subdivisions:100,maxHeight:1e3});a.position.y=-51.1,a.position.x=-700,a.position.z=1400,n=new Ae["HemisphericLight"]("light1",new Ae["Vector3"](0,1,0),s.scene),n.diffuse=new Ae["Color3"](1,1,1),n.groundColor=new Ae["Color3"](1,.98,.58),n.intensity=1,n.specular=Ae["Color3"].Black(),t=Ae["Mesh"].CreateBox("BackgroundSkybox",1e4,s.scene,void 0,Ae["Mesh"].BACKSIDE);var r=new Ae["BackgroundMaterial"]("backgroundMaterial",s.scene);r.reflectionTexture=new Ae["CubeTexture"]("textures/TropicalSunnyDay",s.scene),r.reflectionTexture.coordinatesMode=Ae["Texture"].SKYBOX_MODE,t.material=r;var i=new Ae["StandardMaterial"]("myMaterial",s.scene),c=new Ae["Texture"]("textures/ground.png",s.scene);c.uScale=20,c.vScale=20,i.diffuseTexture=c,a.material=i,Ae["ParticleHelper"].CreateAsync("rain",s.scene).then((function(e){e.systems[0].updateSpeed=.1,e.start(),s.scene.registerBeforeRender((function(){e.systems.forEach((function(e){e.emitter=s.camera.position}))}))})),s.camera.ellipsoid=new Ae["Vector3"](1,1,1),s.scene.collisionsEnabled=!0,s.camera.checkCollisions=!0,a.checkCollisions=!0,s.camera.attachControl(s.canvas,!0),s.scene.freezeActiveMeshes(),new Ae["HighlightLayer"]("hl1",s.scene),Ae["SceneLoader"].ImportMesh("","./","3d66.gltf",s.scene,(function(t){for(var n=0,a=t;n<a.length;n++){var r=a[n];r.freezeWorldMatrix(),r.material&&r.material.freeze()}e=t,o.show=!1;var i=new Ae["Animation"]("myAnimation","position",100,Ae["Animation"].ANIMATIONTYPE_VECTOR3,Ae["Animation"].ANIMATIONLOOPMODE_CONSTANT),c=[];c.push({frame:0,value:new Ae["Vector3"](-2e3,1e3,0)}),c.push({frame:60,value:new Ae["Vector3"](-800,800,0)}),c.push({frame:100,value:new Ae["Vector3"](-300,350,0)}),i.setKeys(c),s.camera.animations=[],s.camera.animations.push(i),s.scene.beginAnimation(s.camera,0,100,!1,.4),Ae["ParticleHelper"].CreateAsync("smoke",s.scene).then((function(e){e.start(),e.systems.forEach((function(e){e.emitter=new Ae["Vector3"](-5,2,70)}))})),Ae["ParticleHelper"].CreateAsync("fire",s.scene).then((function(e){e.start(),e.systems.forEach((function(e){e.emitter=new Ae["Vector3"](-5,2,70)}))}))}),(function(e){o.loading=Number((e.loaded/e.total*100).toFixed(0))})),window.addEventListener("click",(function(){var e=s.scene.pick(s.scene.pointerX,s.scene.pointerY);console.log(e)})),s.engine.runRenderLoop((function(){s.scene.render()}))},y=function(){E(document.getElementById("myChart"),o.chartList)},v=function(){k(document.getElementById("right-chart"))};return Object(a["E"])((function(){l(),p(),O(),y(),v()})),{babylon:s,state:o,customRow:h,btnList:c,btnChange:b,meshReset:u,meshAnimo:f,store:xe["a"]}}});n("2ae7");const Ce=te()(Me,[["render",N],["__scopeId","data-v-1806d8f9"]]);t["default"]=Ce},"7e1b":function(e,t,n){},a2c2:function(e,t,n){},c05e:function(e,t,n){"use strict";n("a2c2")},dd07:function(e,t,n){"use strict";n("4035")}}]);