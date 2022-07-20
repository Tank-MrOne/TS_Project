<template>
  <div id="app" class="warp">
    <NavTab />
    <router-view />
    <RightDrawer v-if="$store.state.navTab !== 1" />
    <el-drawer
      size="90%"
      :withHeader="false"
      :visible.sync="show"
      direction="rtl"
      :show-close="false"
      :destroy-on-close="true"
      :modal="false"
      :modal-append-to-body="false"
    >
      <Exchange v-if="showComponent.showExchange" />
      <GiveCollection v-if="showComponent.showGiveCollection" />
      <Identity v-if="showComponent.showIdentity" />
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import NavTab from "@/components/navTab.vue";
import RightDrawer from "@/components/rightDrawer.vue";
import Exchange from "@/components/confirm/exchange.vue";
import GiveCollection from "@/components/confirm/giveCollection.vue";
import Identity from '@/components/confirm/identity.vue'
@Component({
  name: "app",
  components: {
    NavTab,
    RightDrawer,
    Exchange,
    GiveCollection,
    Identity,
  },
})
export default class extends Vue {
  private show = false;
  private showComponent = {
    showExchange: false,
    showGiveCollection: false,
    showIdentity: false,
  };
  private mounted() {
    this.$bus.$on("handleRightDrawer", (name: string) => {
      this.show = Boolean(name);
      this.$store.commit("SET_SHOW_DRAWER", this.show);
      this.showComponent = {
        showExchange: name === "showExchange",
        showGiveCollection: name === "showGiveCollection",
        showIdentity: name === "showIdentity",
      };
    });
  }
  @Watch("$store.state.navTab")
  private changeRouter(newVal: number) {
    let routerList = ["/userInfo", "/collection", "/home", "/social"];
    this.$router.push(routerList[newVal]);
  }
}
</script>
<style lang="scss" scoped>
#app {
  padding-left: 116px;
}
</style>