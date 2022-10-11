<template>
  <el-container style="height: 100%" data-theme="dark" :class="classes">
    <el-aside class="aside-sidebar">
      <Sidebar class="sidebar-content" :isCollapse="isCollapse" />
    </el-aside>
    <el-container class="content-container">
      <el-header class="fixed-header">
        <div class="header-content">
          <div class="header-left">
            <expand
              v-if="isCollapse"
              class="collapse-icon"
              @click="handleFoldMenu"
            />
            <fold v-else class="collapse-icon" @click="handleFoldMenu" />
          </div>
          <div class="header-right">
            <el-dropdown class="header-dropdown">
              <span class="el-dropdown-link header-user">
                <el-avatar
                  class="user-avatar"
                  size="medium"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                ></el-avatar>
                panlianxiaya
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                  <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="header-tab">
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            closable
            @tab-remove="removeTab"
          >
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.path"
              :label="item.name"
              :name="item.path"
            >
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-header>
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Sidebar from "../Sidebar/index.vue";
import { appStore } from "../../store/app";
import { Expand } from "@element-plus/icons";
import { Fold } from "@element-plus/icons";

interface setInter {
  sidebar: any;
  classes: any;
}

export default defineComponent({
  name: "Layout",
  components: { Sidebar, Expand, Fold },

  setup: () => {
    const store = appStore();
    const route = useRoute();
    const router = useRouter();
    const tabIndex = ref<number>(1);
    const editableTabsValue = ref<string>(route.path);
    const isCollapse = computed(() => !store.sidebar.opened);
    const editableTabs = computed(() => store.headerTabList);

    const set: setInter = reactive({
      sidebar: computed(() => {
        return store.sidebar;
      }),
      classes: computed(() => {
        return {
          hideSidebar: !set.sidebar.opened,
          openSidebar: set.sidebar.opened,
          withoutAnimation: set.sidebar.withoutAnimation,
        };
      }),
    });

    watch(editableTabsValue, () => {
      router.push(editableTabsValue.value);
    });
    watch(route, () => {
      editableTabsValue.value = route.path;
    });

    const handleFoldMenu = () => {
      store.toggleSidebar(true);
    };

    const addTab = (targetName: string) => {};
    const removeTab = (path: string) => {
      let headerTabList = JSON.parse(JSON.stringify(store.headerTabList));
      if (headerTabList.length == 1 && route.path === "/main/goods/GoodsList") {
        return;
      }
      const deleteHeaderTabIndex = headerTabList.findIndex(
        (headerTab: any) => headerTab.path === path
      );
      headerTabList.splice(deleteHeaderTabIndex, 1);
      store.setHeaderTabList(headerTabList);

      if (headerTabList.length < 1) {
        // 跳转到首页
        router.push("/");
        return;
      } else if (path !== editableTabsValue.value) {
        return;
      }
      // 删除的是左边，路由跳转到后边的tab；删除的是其他，路由跳转到前边的tab
      editableTabsValue.value =
        (store.headerTabList[deleteHeaderTabIndex - 1]
          ? store.headerTabList[deleteHeaderTabIndex - 1].path
          : store.headerTabList[deleteHeaderTabIndex].path) || "";
    };

    return {
      editableTabsValue,
      tabIndex,
      editableTabs,
      isCollapse,
      ...toRefs(set),
      handleFoldMenu,
      addTab,
      removeTab,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.header-tab .el-tabs__item) {
  height: 30px;
  line-height: 30px;
}
:deep(.header-tab .el-tabs__item.is-active) {
  background-color: #409eff;
  color: #fff;
}
:deep(.el-menu--collapse .el-menu-item .el-submenu__icon-arrow) {
  display: none;
}
:deep(.el-menu--collapse
    .el-submenu
    .el-submenu__title
    .el-submenu__icon-arrow) {
  display: none;
}
:deep(.el-menu--collapse .el-menu-item span) {
  display: none;
}
:deep(.el-menu--collapse .el-submenu .el-submenu__title span) {
  display: none;
}
:deep(.el-menu--collapse .el-menu-item .el-icon-location) {
  margin: 0;
  vertical-align: middle;
  width: 24px;
  text-align: center;
}
:deep(.el-menu--collapse .el-submenu .el-submenu__title .el-icon-location) {
  margin: 0;
  vertical-align: middle;
  width: 24px;
  text-align: center;
}

.aside-sidebar {
  width: 210px;
  transition: width 0.28s;
}
.hideSidebar .aside-sidebar {
  width: 64px;
  transition: width 0.28s;
}

// 右侧内容区
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 210px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 64px);
}

.content-container {
  background-color: #f0f2f5;
  .el-header {
    padding: 0;
    background-color: #fff;
    .header-content {
      display: flex;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eee;
      .header-left,
      .header-right {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 10px;
      }
      .header-left .collapse-icon {
        width: 1.5em;
        height: 1.5em;
        margin-right: 8px;
        cursor: pointer;
      }
      .header-right {
        flex-direction: row-reverse;
        .header-dropdown .header-user {
          height: 100%;
          display: flex;
          align-items: center;
          color: #53a8ff;
          .user-avatar {
            margin-right: 10px;
          }
        }
      }
    }
    .header-tab {
      height: 31px;
      .el-tabs {
        margin: 0;
      }
    }
  }

  .main-content {
    margin-top: 81px; // header高度
    padding-right: 13px;
  }
  ::-webkit-scrollbar {
    width: 7px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
