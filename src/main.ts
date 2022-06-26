/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-05-05 13:45:30
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-02 13:09:04
 */
import { createApp } from "vue";
import 'amfe-flexible'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App)
app.use(store).use(router).use(Antd).mount("#app");
