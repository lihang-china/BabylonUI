/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-05-05 13:45:30
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-08 09:35:37
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import layout from "../layout/index.vue";
import main  from "../layout/main.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    component: layout,
    children:[{
      path: '/index',
      name: 'index',
     component: ()=>import('@/views/index.vue')
    },
    {
      path: '/babylon',
      name: 'babylon',
     component: ()=>import('@/views/babylon/index.vue')
    }]
  },
  {
    path: "/main",
    name: "mian",
    component: main,
    children:[{
      path: '/gis',
      name: 'gisIndex',
     component: ()=>import('@/views/main/index.vue')
    }
   ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
