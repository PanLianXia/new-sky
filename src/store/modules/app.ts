export default {
    namespaced: true,
    state: () => ({
        count: 33
    }),
    mutations: {
        increment (state: any) {
            // 这里的 `state` 对象是模块的局部状态
            state.count++
        }
    },
    getters: {
        doubleCount (state: any) {
          return state.count * 2
        }
    }
}
