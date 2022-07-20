<template>
  <div class="Exchange">
    <!-- 藏品兑换 -->
    <div class="warp">
      <div class="title">输入兑换码</div>
      <div class="input">
        <el-input class="exchangeInput" v-model="input"></el-input>
      </div>
      <div class="button" @click="exchange">领 取</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  private input: string = "";
  private exchange() {
    if (this.input.trim().length) {
      this.$router.push({
        name: "detail",
        params: {
          typeId: {
            id: "2",
            img_id: "7",
          },
          info: {
            img_id: "7",
            imageName: "狐狸高清头像",
            abstract: "这是狐狸高清头像的一段简介",
            nums: 2,
            url: "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
          },
          exchange: true,
        },
      });
    } else {
      this.$message.error("请输入正确的兑换码");
    }
  }
}
</script>

<style lang="scss" scoped>
.Exchange {
  position: absolute;
  left: 0;
  top: 0;
  right: 519px;
  bottom: 0;
  padding-right: 108px;
  background-color: #333;
  display: flex;
  align-items: center;
  .warp {
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    .title {
      color: #fff;
      font-size: 30px;
    }
    .input {
      width: 80%;
    }
    .button {
      width: 130px;
      text-align: center;
      line-height: 35px;
      background-color: #cfad4a;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss">
.Exchange {
  .exchangeInput .el-input__inner {
    border-radius: 20px;
    text-align: center;
    font-size: 17px;
  }
}
</style>