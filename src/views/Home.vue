<template>
  <el-button type="primary" @click="changeCount">{{count}}</el-button>
  <div class="test-bind-bgcolor">1111</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
// import { useStore } from "vuex";
import { appStore } from "../store/app";

export default defineComponent({
    name: 'Layout',

    setup: () => {
        // const store = useStore()
        // const count = computed(() => store.state.appStore.count)

        // const changeCount = () => {
        //     store.commit('appStore/increment')
        // }
        // return {count, changeCount}
        const bgcolor = 'red'
        const store = appStore()
        const count = computed(() => store.count)

        const changeCount = () => {
            store.increment()
        }
        return {bgcolor, count, changeCount}
    },
})
</script>

<style lang="scss" scoped>
.test-bind-bgcolor {
    background-color: v-bind(bgcolor);
}
</style>