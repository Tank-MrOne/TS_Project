<template>
  <div class="Collection" v-loading="loading">
    <div class="background"></div>
    <div class="warp">
      <el-carousel
        class="carousel"
        ref="carousel"
        indicator-position="none"
        :autoplay="false"
        arrow="never"
      >
        <el-carousel-item v-for="(item, index) in carouselList" :key="index">
          <div class="collectionGroup">
            <div
              class="window"
              v-for="(el, i) in item"
              :key="i"
              @click="pageToDetail(el)"
            >
              <div class="box" v-show="el.name">
                <el-image
                  class="image"
                  :src="el.productUrl"
                  fit="cover"
                ></el-image>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="btns" v-if="list.length">
        <div class="icon" @click="changeCarousel(1)">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="icon" @click="changeCarousel(0)">
          <i class="el-icon-arrow-left"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
// import Goods from "@/utils/mockData";
import { productListUserId } from "@/api/index";
// import { productDetail } from "@/api/index";
// let result = await productDetail(this.$store.state.homeChoice.img_id);
// console.log(111, result);
@Component
export default class extends Vue {
  private collection: any = [];
  private list = [];
  private carouselList = [];
  private loading = false;
  private async created() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo.record) return;
    await this.createGroup(userInfo?.record?.id);
    // await this.createGroup("7");
  }
  private async createGroup(
    userId: string,
    pageNo: string = "1",
    pageSize: string = "30"
  ) {
    this.loading = true;
    try {
      let result: any = await productListUserId(userId, pageNo, pageSize);
      console.log(result);
      if (result.code === 200) {
        this.collection = result.data;
        if (this.collection.records.length) {
          this.list.push(...this.collection.records);
          if (this.collection.current + 1 < this.collection.pages) {
            this.createGroup(userId, this.collection.current + 1);
          } else {
            this.loading = false;
          }
        } else {
          this.loading = false;
        }
      } else {
        this.$message.error(result.msg);
        this.loading = false;
      }
    } catch (error) {
      this.$message.error("网络异常，请稍后再试");
      this.loading = false;
    }
    let arr = [];
    this.list.forEach((el: any, index: number) => {
      arr.push(el);
      if (index === this.list.length - 1 && arr.length < 3) {
        let length = arr.length;
        for (let i = 0; i < 3 - length; i++) {
          arr.push({});
        }
        this.carouselList.push(arr);
        arr = [];
      } else if ((index + 1) % 3 === 0) {
        this.carouselList.push(arr);
        arr = [];
      }
    });
  }
  private changeCarousel(type: number) {
    if (type === 1) {
      this.$refs.carousel.next();
    } else {
      this.$refs.carousel.prev();
    }
  }

  private pageToDetail(item: any) {
    if (!item.name) return;
    let collection: any = {};
    collection.info = item;
    this.$store.commit("SET_IS_MINE", true);
    this.$router.push({
      name: "detail",
      params: collection,
    });
  }
}
</script>

<style lang="scss" scoped>
.Collection {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  .background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background-image: url("../assets/images/collectionBackgroundClear.png");
    background-size: 100% 100%;
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
}
.warp {
  width: 100%;
  height: 80vh;
  .carousel {
    height: 70vh;
    .el-carousel__container {
      height: 100%;
    }
    .collectionGroup {
      height: 100%;
      display: flex;
      .window {
        flex: 1;
        margin: 30px;
        cursor: pointer;
        &:nth-of-type(1) .box {
          background-image: url("../assets/images/collectionBox1.png");
        }
        &:nth-of-type(2) .box {
          background-image: url("../assets/images/collectionBox2.png");
        }
        &:nth-of-type(3) .box {
          background-image: url("../assets/images/collectionBox3.png");
        }
        &:hover {
          transform: scale(1.01);
          transition: all 0.2s;
        }
        .box {
          height: 100%;
          box-shadow: 5px 10px 5px rgba(0, 0, 0, 0.3);
          box-sizing: border-box;
          padding: 20px;
          background-size: 100% 100%;
          .image {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
  .btns {
    margin-right: 50px;
    display: flex;
    flex-direction: row-reverse;
    .icon {
      background-color: var(--themColor);
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color: #fff;
      width: 40px;
      height: 40px;
      margin-left: 10px;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background-color: var(--hoverThemColor);
      }
    }
  }
}
@media (max-height: 500px) {
  .warp {
    height: 480px;
    .carousel {
      height: 400px;
    }
  }
}
</style>
<style lang="scss">
.Collection {
  .carousel .el-carousel__container {
    height: 100%;
  }
}
</style>