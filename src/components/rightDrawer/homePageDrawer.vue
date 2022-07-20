<!-- 左侧导航 -->
<template>
  <div class="HomePageTool">
    <div class="imageList">
      <div class="functionalAreas">
        <div class="chose">选择藏品</div>
        <div class="filpOver" v-if="goods.records">
          <div class="icon" v-show="goods.current !== 1">
            <i class="el-icon-arrow-left" @click="changeImageIndex(0)"></i>
          </div>
          <div class="icon" v-if="goods.current !== goods.pages">
            <i class="el-icon-arrow-right" @click="changeImageIndex(1)"></i>
          </div>
        </div>
      </div>
      <div class="exhibit">
        <el-image
          v-for="(item, index) in goods.records"
          :key="index"
          class="image"
          :class="{ img_choice: img_choice === item.id }"
          :src="item.productUrl"
          fit="cover"
          @click="changeImage(item.id)"
        ></el-image>
      </div>
    </div>
    <div class="typeList">
      <div class="functionalAreas">
        <div class="chose">选择系列</div>
        <div class="filpOver">
          <div
            class="icon"
            v-show="series.current !== 1"
            @click="changeTypeIndex(0)"
          >
            <i class="el-icon-arrow-up"></i>
          </div>
          <div
            class="icon"
            v-show="series.current !== series.pages"
            @click="changeTypeIndex(1)"
          >
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </div>
      <div class="choiseType">
        <div
          class="list"
          :class="{ checked: checked === item.id }"
          v-for="item in series.records"
          :key="item.id"
          @click="changeType(item.id)"
        >
          <div class="name">{{ item.name }}</div>
          <div class="img">
            <el-image
              class="collectionImage"
              :src="item.url"
              fit="cover"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "HomePageTool",
})
export default class extends Vue {
  private checked = "1";
  private img_choice = "1";

  private isFirst = true;
  private goods: any = {};
  private series: any = {};

  private mounted() {
    this.getSeries();
  }
  private changeType(id: string) {
    this.checked = id;
    this.getProduct(id);
  }
  private changeImage(img_id: string) {
    this.img_choice = img_id;
  }
  private changeImageIndex(num: number) {
    if (num === 1) {
      this.getProduct(this.goods.current + 1 + "");
    } else {
      this.getProduct(this.goods.current - 1 + "");
    }
  }
  private changeTypeIndex(num: number) {
    if (num === 1) {
      this.getSeries(this.series.current + 1 + "");
    } else {
      this.getSeries(this.series.current - 1 + "");
    }
  }
  @Watch("img_choice", { immediate: true })
  private watchImg_choice() {
    this.$store.commit("SET_HOME_CHOICE", {
      id: this.checked,
      img_id: this.img_choice,
    });
  }
  @Watch("checked", { immediate: true })
  private watchChecked() {
    this.$store.commit("SET_HOME_CHOICE", {
      id: this.checked,
      img_id: this.img_choice,
    });
  }
  private getProduct(
    seriesId: string,
    pageNo: string = "1",
    pageSize: string = "4"
  ) {
    this.$store.dispatch("_API_getProductList", {
      seriesId,
      pageNo,
      pageSize,
      success: () => {
        this.goods = this.$store.state.product;
        this.goods.records = this.goods.records?.map((item: any) => {
          item.productUrl = item.productUrl.split(",")[0];
          return item;
        });
        this.img_choice = this.goods.records[0]?.id;
      },
      error: (msg: any) => {
        this.$message.error(msg);
      },
    });
  }
  private getSeries(pageNo: string = "1", pageSize: string = "2") {
    this.$store.dispatch("_API_getSeriesList", {
      pageNo,
      pageSize,
      success: () => {
        this.series = this.$store.state.series;
        if (this.isFirst) {
          this.getProduct(this.series.records[0]?.id);
          this.isFirst = false;
        }
      },
      error: (msg: any) => {
        this.$message.error(msg);
      },
    });
  }
}
</script>

<style lang="scss" scoped>
.HomePageTool {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%), 0 16px 24px 2px rgb(0 0 0 / 14%),
    0 6px 30px 5px rgb(0 0 0 / 12%);
  .imageList {
    height: 60vh;
    background: rgba(41, 41, 41, 0.6);
    .exhibit {
      display: flex;
      flex-wrap: wrap;
      margin-top: 38px;
      // justify-content: space-evenly;
      .image {
        width: 200px;
        height: 24vh;
        margin-left: 27px;
        margin-bottom: 27px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        &.img_choice {
          outline: solid 2px #fff;
          border-radius: 16px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        }
        &:hover {
          outline: solid 1px rgb(204, 204, 204);
          border-radius: 16px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
  @media (max-height: 500px) {
    .imageList {
      height: 310px;
      .exhibit .image {
        height: 100px;
      }
    }
  }
  .typeList {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.6);
    .list {
      width: 398px;
      display: flex;
      height: 110px;
      margin: 36px auto 57px;
      font-size: 24px;
      line-height: 110px;
      text-align: center;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      &.checked {
        outline: solid 2px #fff;
      }
      &:hover {
        outline: solid 1px rgb(204, 204, 204);
      }
      .name {
        width: 220px;
        background-color: rgb(68, 67, 67);
        color: var(--themTextColor);
      }
      .img {
        flex: 1;
        .collectionImage {
          width: 100%;
          height: 110px;
        }
      }
    }
  }
  .functionalAreas {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 10px 0;
    .chose {
      width: 88px;
      line-height: 28px;
      text-align: center;
      color: var(--themTextColor);
      background-color: rgb(68, 67, 67);
    }
    .filpOver {
      display: flex;
      justify-content: space-between;
      .icon {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: rgb(68, 67, 67);
        color: var(--themTextColor);
        border-radius: 50%;
        margin: 0 10px;
        cursor: pointer;
        &:hover {
          background-color: rgb(90, 90, 90);
        }
      }
    }
  }
}
</style>