/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-05-05 13:45:30
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-30 16:54:23
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import layout from "../layout/index.vue";
import main from "../layout/main.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "mian",
    component: main,
    children: [{
      path: '/gis',
      name: 'gisIndex',
      component: () => import('@/views/main/index.vue')
    }
    ]
  },
  {
    path: "/layout",
    name: "layout",
    component: layout,
    children: [{
      path: '/index',
      name: 'index',
      component: () => import('@/views/index.vue')
    },
    {
      path: '/babylon',
      name: 'babylon',
      component: () => import('@/views/babylon/index.vue')
    }]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
