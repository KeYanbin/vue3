<template>
  <!-- <RouterLink to="/">Home页面</RouterLink>
  <RouterLink to="/about">About页面</RouterLink> -->
  <div>
    <!-- 页面组件的占位 iframe -->
    <RouterView></RouterView>
    <kBnav v-if="$r.meta.hideTabBar" />
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import kBnav from "./components/k-BottomNavContainer.vue";
import { useRoute,useRouter } from 'vue-router'
const $r = useRoute();
</script>
<style>
html,
body,
#app {
  height: 100%;
}
</style>