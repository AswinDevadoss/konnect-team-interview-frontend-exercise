<template>
  <div class="nav">
    <img
      alt="Icon"
      class="logo"
      height="25.48"
      src="../assets/Kong.png"
      width="29"
    >
    <router-link
      class="konnect-label"
      to="/"
    > Konnect </router-link>
    <div class="right-link">
      <img
        alt="Icon"
        height="20"
        src="../assets/Org.png"
        width="20"
      >
      <router-link
        to="/"
      > Organization </router-link>
      <img
        alt="Icon"
        height="20"
        src="../assets/Settings.png"
        width="20"
      >
      <router-link
        to="/"
      > Settings </router-link>
      <img
        alt="Icon"
        height="20"
        src="../assets/Avatar.png"
        width="20"
      >
      <router-link
        to="/"
      > Katherine Ellis </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.nav {
  align-items: center;
  background: linear-gradient(to bottom, #09224F, #073382);
  display: flex;
  height: 70px;
  justify-content: center;
  a {
    color: #ffffff;
    font-weight: 700;
    text-decoration: none;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}
.logo {
  padding: 16px;
}
.konnect-label {
  font-size: x-large;
}
.right-link {
  height: 20px;
  margin-left: auto;
  a {
    line-height: 1.4;
    padding-left: 3px;
    padding-right: 25px;
    vertical-align: top;
  }
}
</style>