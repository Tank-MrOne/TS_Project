<!-- 左侧导航 -->
<template>
  <div
    class="rightDrawer"
    :class="{ small: path !== '/login' && path !== '/userInfo' }"
  >
    <LoginDrawer v-if="path === '/login'" />
    <HomePageTool v-if="path === '/home' && $store.state.navTab === 2" />
    <DetailDrawer v-if="path === '/detail'" />
    <UserInfoDrawer v-if="path === '/userInfo'" />
    <FriendsDrawer v-if="showFriends" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import HomePageTool from "./rightDrawer/homePageDrawer.vue";
import DetailDrawer from "./rightDrawer/detailDrawer.vue";
import UserInfoDrawer from "./rightDrawer/userInfoDrawer.vue";
import FriendsDrawer from "./rightDrawer/friendsDrawer.vue";
import LoginDrawer from "./rightDrawer/loginDrawer.vue";
@Component({
  name: "NavTab",
  components: {
    HomePageTool,
    DetailDrawer,
    UserInfoDrawer,
    FriendsDrawer,
    LoginDrawer,
  },
})
export default class extends Vue {
  private path = "/home";
  private showFriends = false;
  private created() {
    this.$bus.$on("hanlerFriendsDrawer", (flag: boolean) => {
      this.showFriends = flag;
    });
  }
  @Watch("$route.path", { immediate: true })
  private watchRoute(newVal: any) {
    this.path = newVal;
  }
}
</script>

<style lang="scss" scoped>
.rightDrawer {
  position: fixed;
  height: 100vh;
  width: 616px;
  &.small {
    width: 471px;
  }
  right: 0;
  top: 0;
  animation: moveToLeft 0.5s forwards;
  z-index: 2050;
  @keyframes moveToLeft {
    from {
      right: -450px;
    }
    to {
      right: 0;
    }
  }
}
</style>