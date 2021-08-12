<template>
  <el-menu class="sidebar-container" :collapse="isCollapse" :default-active="route.path" @open="()=>{}" @close="()=>{}">
    <div class="sidebar-logo" :class="{'big-logo': !isCollapse, 'min-logo': isCollapse}"><img class="logo" src="@/assets/images/logo.png" alt="" /></div>
    <sidebar-item
      v-for="route in routes"
      :key="route.path"
      :item="route">
    </sidebar-item>
  </el-menu>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import SidebarItem from "./SidebarItem.vue";

export default defineComponent({
  name: "Sidebar",
  components: { SidebarItem },
  props: {
    isCollapse:{
      type: Boolean, 
      default: false
    }
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const routes = computed(() => store.state.permissionStore.constantRoutes)

    return {
      route,
      routes,
    };
  },
});
</script>

<style lang="scss">

.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
  text-align: left;
}

.sidebar-container {
  .sidebar-logo {
    height: 50px;
    line-height: 50px;
    text-align: center;
    .logo {
      width: 50px;
      transition: width 0.28s;
    }
  }
  .min-logo .logo {
    width: 35px !important;
  }
} 
</style>

