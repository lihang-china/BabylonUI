<template>
  <div class="main-card">
    <div class="card-header">
      <div class="header-top">
        <div class="top-title">
          <compress-outlined style="color: #18fefe; margin-right: 4px" /><span
            >{{ prop.title }}</span
          >
        </div>
        <div class="top-des">
          <span>{{ prop.desc.title }}</span> {{ prop.desc.value }}
        </div>
      </div>
      <div class="bottom-line">
        <span v-for="item in 3" :key="item" />
      </div>
      <span></span>
    </div>
    <div class="card-container">
      <slot> </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, registerRuntimeCompiler } from 'vue'
import { CompressOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: '标题'
    },
    desc: {
      type: Object,
      default: () => {
        return {
          title: 'Label',
          value: 'value'
        }
      }
    }
  },
  components: {
    CompressOutlined
  },
  setup(props) {
    const prop = reactive(props)
    return { prop }
  }
})
</script>

<style lang="scss" scoped>
.main-card {
  min-width: 200px;
  .card-header {
    margin: 0;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    .header-top {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      color: #fff;
      font-size: 14px;
      .top-des {
        span {
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
    .bottom-line {
      display: flex;
      align-items: flex-end;
      span {
        width: 100%;
        background-color: rgba(255, 255, 255, 0.5);
        height: 1px;
        &:nth-child(1) {
          height: 3px;
          width: 34px;
          background-color: #fff;
        }

        &:nth-child(3) {
          background-color: #18fefe;
          height: 3px;
          width: 12px;
          margin-left: 4px;
        }
      }
    }
  }
  .card-container {
    padding: 10px;
    display: flex;
    color: #fff;
  }
}
</style>