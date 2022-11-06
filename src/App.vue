<template>
  <div>
    <AppGrid></AppGrid>
  </div>
</template>

<script>
import AppGrid from "./components/AppGrid.vue";
export default {
  name: "App",
  components: {
    AppGrid: AppGrid,
  },
};
</script>

<style>
/*全局样式*/
:root {
  --item-size: 55px;
  --item-gap-y: 30px;
  --item-gap-x: 30px;
  --icon-radius: 11px;
  --icon-bg-radius: 13px;
  --font-color: #333;
  --folder-bg: 255, 255, 255, 0.4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
