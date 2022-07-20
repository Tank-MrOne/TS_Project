<template>
  <div class="Login">
    <!-- 登入注册 -->
    <div class="background"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
.Login {
  position: relative;
  height: 100vh;
  margin-right: 580px;
  .background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background-image: url("../assets/images/login.jpg");
    background-size: cover;
    background-position: center;
  }
}
</style>