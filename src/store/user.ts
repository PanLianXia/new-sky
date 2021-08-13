import { defineStore } from "pinia";

interface UserState {
  isLogin: boolean
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const userStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "userState",
  // state: 返回对象的函数
  state: ():UserState => ({
    isLogin: false
  }),
  actions: {
    toggleIsLogin(isLogin: boolean) {
      this.isLogin = isLogin
    }
  },
});
