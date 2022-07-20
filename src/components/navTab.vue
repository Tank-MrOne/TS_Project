<!-- 左侧导航 -->
<template>
  <div class="NavTab">
    <div
      class="userPage icon"
      :class="{ active: $store.state.navTab === 0 }"
      @click="changeActive(0)"
    >
      <i class="el-icon-user"></i>
    </div>
    <div class="center">
      <div
        class="home icon"
        :class="{ active: $store.state.navTab === 2 }"
        @click="changeActive(2)"
      >
        <i class="el-icon-house"></i>
      </div>
      <div
        class="collection icon"
        :class="{ active: $store.state.navTab === 1 }"
        @click="changeActive(1)"
      >
        <i class="el-icon-star-off"></i>
      </div>
      <div
        class="other icon"
        :class="{ active: $store.state.navTab === 3 }"
        @click="changeActive(3)"
      >
        <i class="el-icon-help"></i>
      </div>
    </div>
    <div class="logo">Logo</div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "NavTab",
})
export default class extends Vue {
  private changeActive(active: number) {
    this.$bus.$emit("hanlerFriendsDrawer", false);
    this.$bus.$emit("handleRightDrawer", "");
    if (this.$route.path === "/login" && [3].includes(active)) {
      this.$store.commit("SET_NAV_TAB", 0);
      return;
    }
    this.$store.commit("SET_NAV_TAB", active);
  }
  @Watch("$route.path", { immediate: true })
  private watchRoute(newVal: any) {
    if (newVal === "/login") {
      this.changeActive(0);
      return;
    }
    let path = ["/userInfo", "/collection", "/home", "/social"];
    let index = path.findIndex((el: any) => el === newVal);
    this.changeActive(index !== -1 ? index : 4);
  }
}
</script>

<style lang="scss" scoped>
.NavTab {
  position: fixed;
  height: 100vh;
  min-height: 500px;
  left: 0;
  top: 0;
  width: 116px;
  background-color: var(--themColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .userPage,
  .logo {
    width: 93px;
    height: 39px;
    margin-top: 26px;
    margin-bottom: 12px;
  }
  .center {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 20px 0;
  }
  .logo {
    background-color: #ccc;
    padding: 10px;
  }
  .icon {
    width: 54px;
    height: 54px;
    text-align: center;
    line-height: 54px;
    font-size: 40px;
    background-color: #2b2b2b;
    border-radius: 10px;
    color: rgb(241, 241, 102);
    cursor: pointer;
    &.active {
      background-color: #fff;
    }
    &:hover {
      background-color: rgb(148, 148, 148);
    }
  }
  .userPage{
    width: 44px;
    height: 44px;
    font-size: 30px;
    line-height: 44px;
    background-color: #ccc;
  }
}
</style>