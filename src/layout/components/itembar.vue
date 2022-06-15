<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-05-05 16:52:07
 * @LastEditors: Your Name
 * @LastEditTime: 2022-06-07 09:59:00
-->
<template>
  <div class="menu flex-column">
    <div class="icon flex-flex flex-center">
      <span @click="handleTitle">Menu Element</span>
    </div>
    <a-menu class="a-menu" :inline-collapsed="state.collapsed">
      <a-menu-item>菜单项</a-menu-item>
      <a-menu-item-group key="g2" title="Item 2">
        <a-menu-item key="3">Option 3</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item>
      </a-menu-item-group>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const state = reactive<any>({
      collapsed: false
    })
    const handleTitle = () => {
      router.push('/main')
    }
    return {
      handleTitle,
      state
    }
  }
})
</script>
<style lang="scss" scoped>
.menu {
  border-right: 1px solid rgb(236, 238, 240);
  width: 100%;
  height: 100%;
  .icon {
    height: 80px;
    color: #11142d;
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    span{
      &:hover{
        cursor: pointer;
      }
    }
    // background: linear-gradient(95deg, rgb(80, 210, 176), rgb(181, 223, 132));
  }
  ::v-deep .a-menu {
    width: 80%;
    border: none;
    flex-grow: 1;
    background-color: rgb(253, 253, 253);
  * {
font-size: 12px !important;
   } 
    // background: linear-gradient(rgb(48, 56, 116), rgb(18, 27, 56));
    font-weight: bold;
    color: #a3a3a5;
    i {
      color: rgb(178, 179, 247);
    }
    .ant-menu-item {
      height: 45px;
      padding-top: 2px;
      border-radius: 0 14px 14px 0;
    }
    .ant-menu-item-group-title {
      color: rgb(115, 117, 151);
    }
    .ant-menu-item-selected {
      span {
        color: #fff;
      }
      background-color: rgb(47, 60, 237);
    }
  }
}
</style>
