<template>
  <div class="HomePage" v-if="homeShow && homeShow.productUrl">
    <div class="background">
      <el-image
        v-if="showIamge"
        :lazy="true"
        class="image"
        :src="homeShow.productUrl"
        fit="cover"
      ></el-image>
    </div>
    <div class="info">
      <div class="title">
        <div class="bigTitle">{{ homeShow.name }}</div>
        <div class="smallTitle">{{ homeShow.productDesc }}</div>
      </div>
      <div class="btn">
        <div class="number">数量 - {{ homeShow.number }}</div>
        <div class="pageTodDtails" @click="pageToDetail">查看详情</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class extends Vue {
  private homeShow = {};
  private showIamge = false;

  @Watch("$store.state.homeChoice", { immediate: true })
  private watchHomeChoice(newVal: any) {
    this.showIamge = false;
    this.$nextTick(() => {
      if (!this.$store.state.product.records) return;
      this.homeShow = this.$store.state.product.records.find(
        (el: any) => el.id === newVal.img_id
      );
      this.showIamge = true;
    });
  }

  private async pageToDetail() {
    this.$store.commit("SET_IS_MINE", false);
    this.$router.push({
      name: "detail",
      params: {
        typeId: this.$store.state.homeChoice,
        info: this.homeShow,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
.HomePage {
  position: relative;
  height: 100vh;
  .background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .image {
      width: 100%;
      height: 100%;
      vertical-align: top;
      animation: showImage 0.5s forwards;
      @keyframes showImage {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
  }
  .info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #fff;
    text-shadow: 0 0 2px rgb(0, 0, 0);
    .title {
      margin-left: 76px;
      .bigTitle {
        font-size: 100px;
        font-weight: bold;
        line-height: 200px;
        margin-bottom: 23px;
      }
      .smallTitle {
        font-size: 36px;
        font-weight: bold;
        color: #fff;
      }
    }
    .btn {
      margin-left: 76px;
      .number {
        font-size: 36px;
        margin-bottom: 34px;
        height: 83px;
      }
      .pageTodDtails {
        font-size: 20px;
        text-align: center;
        background-color: rgb(68, 67, 67);
        color: #fff;
        width: 100px;
        line-height: 49px;
        cursor: pointer;
        border-radius: 2px;
        &:hover {
          background-color: rgb(53, 53, 53);
        }
      }
    }
  }
}
</style>