<template>
  <TopNav />
  <router-view />
</template>

<script setup lang="ts">
import TopNav from './components/TopNav.vue'
</script>

<style lang="scss">
// Unscoped styles for html and body
html {
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  background-color: #F2F6FE;
  font-family: "Inter", Helvetica, Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
}
h1,p{
  margin: 0;
}
</style>
