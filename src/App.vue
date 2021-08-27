<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import genTestUserSig from "../public/debug/GenerateTestUserSig";

export default defineComponent({
  name: "App",
  setup() {
    onMounted(() => {
      genTestUserSig("");
    });
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
