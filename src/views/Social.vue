<template>
  <div class="Social">
    <!-- 社交圈 -->
    <div class="background"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  private mounted() {
    this.$nextTick(() => {
      this.$bus.$emit("hanlerFriendsDrawer", true);
    });
  }
}
</script>

<style lang="scss" scoped>
.Social {
  position: relative;
  height: 100vh;
  .background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background-image: url("../assets/images/social.png");
    background-size: cover;
    background-position: center;
  }
}
</style>