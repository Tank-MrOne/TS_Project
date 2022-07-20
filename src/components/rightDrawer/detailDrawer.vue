<template>
  <div class="DetailDrawer">
    <div class="top">
      <div class="imageName">{{ collection.info.name }}</div>
      <div class="introduce">
        <div class="left">{{ collection.info.type }}</div>
        <div class="right">
          <div class="l">限量</div>
          <div class="r">10000份</div>
        </div>
      </div>
    </div>
    <div class="center">
      <div>
        <span>创作者：</span>
        <span>{{ collection.info.creator }}</span>
      </div>
      <div>
        <span>发行方：</span>
        <span>{{ collection.info.issuer }}</span>
      </div>
    </div>
    <div class="content">
      <div class="message">NFR信息</div>
      <div class="msg">
        智能合约：{{
          collection.info.nfrContract ? collection.info.nfrContract : "null"
        }}
      </div>
      <div class="msg">
        合约地址：{{
          collection.info.nfrContractAddress
            ? collection.info.nfrContractAddress
            : "null"
        }}
      </div>
      <div class="msg">
        NFRID：{{ collection.info.nfrId ? collection.info.nfrId : "null" }}
      </div>
      <div class="msg">
        作品指纹：{{
          collection.info.nfrFingerprint
            ? collection.info.nfrFingerprint
            : "null"
        }}
      </div>
      <div v-if="!$store.state.isMine" class="message">购买须知</div>
      <div v-if="!$store.state.isMine" class="info">
        数字藏品未虚拟数字商品，而非实物，仅限实名认证为14周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有（特殊情况除外)，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，仅支持七天无理由退换（兑换码未使用情况下，在微店内申请）。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式使用。
      </div>
      <div v-if="$store.state.isMine" class="loginUser">
        <div class="message">拥有者：</div>
        <div class="message">{{ $store.state.userInfo.userName }}</div>
      </div>
    </div>
    <div class="btn">
      <template v-if="!$store.state.isMine">
        <div class="company">TiChaina天河链提供技术支持</div>
        <div class="weChart" @click="openDialog">微店内查看</div>
      </template>
      <template v-else>
        <div v-if="exchange" class="weChart success">兑换成功</div>
        <div v-else-if="!giveSuccess" class="weChart" @click="giveFriends">
          选择好友赠送
        </div>
        <div v-else-if="giveSuccess" class="weChart success">赠送成功</div>
      </template>
    </div>
    <el-dialog
      custom-class="detailDialog"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :modal="false"
    >
      <div class="weiChartDialog">
        <div class="statement">声明</div>
        <div class="content">
          本公司所有的微店上销售的商品均以传播传统文化为目的，由合作艺术工作人员自由创作，用户自由购买，本公司不承诺任何收益与各种形式的回报，呼吁用户关注艺术品价值本身，防范任何形式的炒作；禁止进行场外交易，围着将取消转增资格。（未完）
        </div>
        <div class="dialogBtns">
          <div class="btn">
            <el-button
              plain
              size="medium"
              :disabled="confirm"
              @click="_handlerDialog(1)"
              >确定
              <span v-show="confirmTime > 0"
                >({{ confirmTime }}s)</span
              ></el-button
            >
          </div>
          <div class="btn">
            <el-button plain size="medium" @click="_handlerDialog(0)"
              >取消</el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  private dialogTableVisible = false;
  private confirmTimer: any = null;
  private confirmTime: number = 5;
  private confirm = true;
  private giveSuccess = false;
  private exchange = false;
  private created() {
    this.exchange = this.$route.params.exchange ?? false;
    this.giveSuccess = false;
    this.$bus.$on("giveSuccess", () => {
      this.giveSuccess = true;
      this.$bus.$emit("hanlerFriendsDrawer", false);
    });
    if (!this.$route.params.info) {
      this.$router.push("/home");
      return;
    }
    this.collection = this.$route.params ?? {};
  }

  // get loginUserFlag() {
  //   this.userInfo =
  //     JSON.parse(sessionStorage.getItem("userInfo")) ||
  //     this.$store.state.userInfo;
  //   return this.userInfo.record;
  // }

  private openDialog() {
    this.confirm = true;
    this.confirmTimer && clearInterval(this.confirmTimer);
    this.dialogTableVisible = true;
    this.confirmTimer = setInterval(() => {
      this.confirmTime = this.confirmTime - 1;
      if (this.confirmTime <= 0) {
        this.confirm = false;
        clearInterval(this.confirmTimer);
      }
    }, 1000);
  }

  private _handlerDialog(type: number) {
    this.dialogTableVisible = false;
    this.confirmTimer && clearInterval(this.confirmTimer);
    if (type === 1) {
      // 确定
    } else {
      // 取消
    }
    this.$nextTick(() => {
      this.confirmTime = 5;
    });
  }

  private giveFriends() {
    this.$bus.$emit("hanlerFriendsDrawer", true);
  }
}
</script>

<style lang="scss" scoped>
.DetailDrawer {
  background: #2d2d2d;
  height: 100%;
  border-radius: 40px 0 0 40px;
  color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .top {
    margin-top: 8vh;
    // height: 330px;
    .imageName {
      font-size: 64px;
      margin-bottom: 4vh;
    }
    .introduce {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      font-size: 13px;
      width: 300px;
      .left {
        padding: 3px 2px;
        border: solid 1px #887540;
        color: #887540;
      }
      .right {
        display: flex;
        background-color: #2b2b2b;
        align-items: center;
        .l {
          padding: 3px 2px;
          background-color: #887540;
          color: #2d2d2d;
        }
        .r {
          padding: 3px 2px;
          color: #887540;
        }
      }
    }
  }
  .center {
    padding: 26px 0;
    border-top: solid 1px #616161;
    border-bottom: solid 1px #616161;
    width: 100%;
    margin: 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div {
      display: flex;
      justify-content: space-between;
      width: 378px;
      line-height: 1.6;
      font-size: 18px;
    }
  }
  .content {
    flex: 1;
    padding: 0 48px;
    box-sizing: border-box;
    .loginUser {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
    }
    .message {
      font-size: 30px;
      font-family: "宋体";
      margin-top: 30px;
      margin-bottom: 5px;
      font-weight: bold;
    }
    .msg {
      line-height: 1.5;
      color: #c8c8c8;
      word-break: break-all;
      font-size: 18px;
    }
    .info {
      width: 368px;
      font-size: 13px;
      line-height: 1.5;
      color: #a1a1a1;
      margin: 0 auto;
    }
  }
  .btn {
    margin-bottom: 40px;
    .company {
      font-size: 12px;
      margin-bottom: 20px;
    }
    .weChart {
      width: 268px;
      line-height: 63px;
      background-color: #292929;
      color: rgba(207, 173, 74, 1);
      cursor: pointer;
      font-size: 20px;
      &:hover {
        background-color: #1b1b1b;
      }
      &.success {
        background-color: transparent;
        cursor: auto;
        font-size: 25px;
      }
    }
  }
  .detailDialog {
    .weiChartDialog {
      color: #fff;
      .statement {
        margin-top: 30px;
        font-size: 50px;
        font-family: "宋体";
        margin-bottom: 5px;
        font-size: 80px;
      }
      .content {
        font-size: 18px;
        line-height: 1.5;
        margin-bottom: 40px;
        font-size: 50px;
      }
      .dialogBtns {
        display: flex;
        justify-content: space-evenly;
        .btn .el-button {
          font-size: 36px;
          color: rgba(207, 173, 74, 1);
          // padding: 20px 40px
          padding: 0;
          text-align: center;
          line-height: 78px;
          width: 160px;
          height: 78px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.DetailDrawer {
  .el-dialog__wrapper {
    .detailDialog {
      width: calc(100vw - 640px);
      background-color: #1b1b1b;
      border-radius: 30px;
      margin: 0 470px 0 140px;
    }
  }
}
</style>