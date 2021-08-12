<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link v-if="theOnlyOneChild.meta" :to="theOnlyOneChild.path">
        <el-menu-item :class="route.path === theOnlyOneChild.path ? 'is-active' :''" :index="theOnlyOneChild.path">
          <i class="el-icon-menu" v-if="theOnlyOneChild.meta.icon"></i>
          <template #title>{{ theOnlyOneChild.meta.title || "1111" }}</template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)">
      <template #title>
        <i class="el-icon-location" v-if="item.meta.icon"></i>
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import SidebarItemLink from "./SidebarItemLink.vue";

export default defineComponent({
  name: "SidebarItem",
  components: { SidebarItemLink },
  props: { item: { type: Object, default: {} } },
  setup(props) {
    const route = useRoute()
    const alwaysShowRootMenu = computed(() => {
      if (props.item.meta && props.item.meta.alwaysShow) {
        return true;
      }
      return false;
    });
    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item: any) => {
          if (item.meta && item.meta.hidden) {
            return false;
          } else {
            return true;
          }
        });
        return showingChildren.length;
      }
      return 0;
    });
    const theOnlyOneChild = computed(() => {
      console.log("11", props.item);
      console.log("showingChildNumber", showingChildNumber.value);
      if (showingChildNumber.value > 1) {
        return null;
      }
      if (props.item.children) {
        for (let child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child;
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...props.item };
    });

    const resolvePath = (routePath: string) => {
      return "http://localhost:3000/" + routePath;
    };

    return {
      route,
      alwaysShowRootMenu,
      showingChildNumber,
      theOnlyOneChild,
      resolvePath,
    };
  },
});
</script>

<style lang="scss" scope>
.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}

@import '@/assets/styles/theme/_handle.scss';

.logo-wrap {
  @include background_color_important('logo-wrap-bg-color');

  .el-icon-s-operation {
    @include background_color_important('icon-shrink-color');
  }
}
.el-menu {
  @include background_color_important('menu-wrap-bg-color');
  .el-submenu .el-submenu__title,
  .el-menu-item {
    @include font_color('menu-text-color');
  }
}

.el-submenu__title {
  &:hover {
    @include font_color_important('menu-hover-text-color');
    @include background_color('menu-hover-bg-color');
    @include background_rgba('menu-hover-rgba');
  }
}
.el-menu-item {
  &:hover,
  &.is-active {
    position: relative;
    @include font_color_important('menu-hover-text-color');
    @include background_color_important('menu-hover-bg-color');
    @include background_rgba_important('menu-hover-rgba');
  }
  &.is-active {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 5px;
      height: 50px;
      background-color: #0479fc;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
}
.nest-menu .el-menu-item,
.nest-menu .el-submenu__title,
.nest-menu .el-submenu .el-menu-item {
 &.is-active {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 5px;
      height: 40px;
      background-color: #0479fc;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
}

</style>

