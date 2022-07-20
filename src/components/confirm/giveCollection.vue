<template>
  <div class="GiveCollection">
    <div class="warp" v-if="giveInfo.collection">
      <div class="prompt">
        确定将（{{ giveInfo.collection.name }}）赠送给好友（{{
          giveInfo.friend.username
        }}）吗？
      </div>
      <div class="prompt">注意！ 此操作不可逆</div>

      <div class="button">
        <el-button plain @click="confirm(1)">确认</el-button>
        <el-button plain @click="confirm(0)">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { productPresent } from "@/api/index";
@Component
export default class extends Vue {
  private input: string = "";
  private giveInfo: any = {};
  private mounted() {
    this.giveInfo = this.$store.state.giveInfo ?? {};
  }

  private async confirm(type: number) {
    if (type === 1) {
      try {
        let result: any = await productPresent({
          friendsId: this.giveInfo.friend.friendId,
          productId: this.giveInfo.collection.id,
        });
        if (result.code == 200) {
          this.$message.success(result.msg);
          this.$bus.$emit("giveSuccess");
        } else {
          this.$message.error(result.msg);
        }
      } catch (error) {
        this.$message.error("请求异常，请稍后再试");
      }
    }
    this.$bus.$emit("handleRightDrawer", "");
  }
}
</script>

<style lang="scss" scoped>
.GiveCollection {
  position: absolute;
  left: 0;
  top: 0;
  right: 410px;
  bottom: 0;
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
    .prompt {
      padding: 0 40px;
      font-size: 17px;
      color: #d2d2d2;
    }
    .button {
      width: 200px;
      display: flex;
      justify-content: space-between;
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