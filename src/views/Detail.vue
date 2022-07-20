<template>
  <div class="Detail" :class="{ login: $store.state.isMine }">
    <!-- 藏品详情 -->
    <div class="image" v-if="collection.info">
      <img class="fill_image" :src="collection.info.productUrl" alt="" />
      <!-- <el-image fit="contain"></el-image> -->
    </div>
    <div class="info">
      {{ collection.info ? collection.info.productDesc : "" }}
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Detail",
})
export default class extends Vue {
  private collection = {};
  private created() {
    if (!this.$route.params.info) {
      this.$router.push("/home");
      return;
    }
    this.collection = this.$route.params ?? {};
    console.log(this.collection);
  }
}
</script>

<style lang="scss" scoped>
.Detail {
  display: flex;
  flex-wrap: wrap;
  margin-right: 430px;
  padding-right: 10px;
  box-sizing: border-box;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/images/detailBackground.jpg");
  &.login {
    background-image: url("../assets/images/userDetail.jpg");
    .info {
      font-weight: bold;
      text-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
    }
  }
  background-size: cover;
  background-position: center;
  & > div {
    flex: 1;
    min-width: 300px;
    min-height: 300px;
    margin: 20px;
    width: 500px;
    height: 500px;
  }
  @media (max-width: 1180px) {
    & > div {
      height: 400px;
    }
  }
  .image {
    .fill_image {
      width: 100%;
      padding: 10px;
      background-image: url("../assets/images/detailBox.png");
      background-size: 100% 100%;
      background-position: center;
    }
  }
  .info {
    color: #333;
    // margin-right:20px;
    padding-left: 10px;
    box-sizing: border-box;
  }
}
</style>