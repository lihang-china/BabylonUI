<template>
  <div
    :class="[state.isShow ? 'header-vis' : '']"
    class="header flex-flex flex-between flex-center"
  >
    <span class="flex-btn" @click="state.isShow = !state.isShow">
      <down-outlined
        v-if="state.isShow"
        style="fontsize: 20px; color: rgb(150, 150, 150)"
      />

      <up-outlined v-else style="fontsize: 20px; color: rgb(150, 150, 150)" />
    </span>
    <div class="tag-group">
      <a-tag color="rgb(47,60,237)" closable v-for="item in 4" :key="item"
        >pink{{ item }}</a-tag
      >
    </div>
    <div class="flex-flex flex-center avatar">
      <a-image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      <span> User Name </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { UpOutlined, DownOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    UpOutlined,
    DownOutlined,
  },
  setup() {
    const state = reactive<any>({
      isShow: false,
    });
    return { state };
  },
});
</script>

<style lang="scss" scoped>
* {
  color: #11142d;
}
.ant-row {
  color: rgb(250, 250, 250);
}
.header-vis {
  margin-top: -90px;
}
.header {
  position: relative;
  padding: 0 20px;
  min-height: 90px;
  max-height: 90px;
  transition: 0.3s all;
  z-index: 126;
  box-shadow: 5px 0 5px 0 rgb(180, 180, 180);
  background-color: rgb(253, 253, 253);
  .flex-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 25px;
    left: calc(50% - 40px);
    bottom: -25px;
    position: absolute;
    border-radius: 0 0 50% 50%;
    background-color: rgb(253, 253, 253);
    box-shadow: 0 3px 3px 0 rgba(114, 114, 114, 0.589);

    &:hover {
      cursor: pointer;
      // background-color: rgb(40, 60, 237);
      * {
        transition: 0.2s all;
        color: rgb(40, 60, 237) !important;
        font-size: 18px !important;
      }
    }
  }
  .avatar {
    border-radius: 14px;
    padding: 5px 10px;
    background-color: rgb(40, 60, 237);
    span {
      color: #fff;
      font-weight: bold;
    }
  }
  .tag-group {
    max-width: 500px;
    .ant-tag {
      margin: 0;
      padding: 2px 6px;
      margin-right: 12px;
    }
  }
  h1 {
    font-size: 58px;
    font-weight: bold;
  }
  ::v-deep .ant-image {
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
  }
  span {
    font-size: 14px;
    margin: 0 20px;
  }
}
::v-deep .ant-breadcrumb {
  span {
    margin: 0;
    margin-right: 5px;
    color: #11142d !important;
    font-weight: bold;
    &:nth-last-child(1) {
      color: #11142d !important;
    }
  }
}
</style>