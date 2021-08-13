import { defineStore } from "pinia";
import { HeaderTabModal } from "../model/app";

interface AppState {
  count: number,
  headerTabList: HeaderTabModal[],
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const appStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "appState",
  // state: 返回对象的函数
  state: ():AppState => ({
    count: 10,
    headerTabList: [],
    sidebar: {
      opened: true,
      withoutAnimation: false
    }
  }),
  actions: {
    increment() {
        // 这里的 `state` 对象是模块的局部状态
        this.count++
    },
    setHeaderTabList(headerTabList: HeaderTabModal[]) {
      this.headerTabList = headerTabList
    },
    toggleSidebar(withoutAnimation: boolean) {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = withoutAnimation
    }
  },
});
