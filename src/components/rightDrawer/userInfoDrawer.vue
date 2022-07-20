<template>
  <div class="UserInfoDrawer">
    <div class="userInfo">
      <div class="avatar">
        <el-avatar
          shape="circle"
          :size="108"
          fit="fill"
          :src="userInfo.record.avatar"
        ></el-avatar>
      </div>
      <div class="info">
        <div class="name">{{ userInfo.record.username }}</div>
        <div class="btn" @click="pageInto('/userInfo')">详细信息</div>
      </div>
    </div>
    <div class="center">
      <div class="gunctionalAreas">
        <div
          class="boxs"
          @click="handleComponent(item)"
          v-for="(item, index) in areas"
          :key="index"
        >
          <div class="icon"></div>
          <div class="title">{{ item.title }}</div>
        </div>
        <div class="boxs"></div>
        <div class="boxs"></div>
      </div>
      <div class="company">
        <div class="companyName">TiChaina天河链提供技术支持</div>
        <div class="support">
          <div class="list">
            <div class="msg">永乐文创</div>
            <div class="message">平台介绍</div>
          </div>
          <div class="list">
            <div class="msg">联系我们</div>
            <div class="message">微信官方交流群</div>
          </div>
          <div class="list">
            <div class="msg">藏品查询</div>
            <div class="message">查询链接</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ICP">网ICP备案号：718287124162146616264</div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  private areas = [
    {
      title: "藏品兑换",
    },
    {
      title: "好友转增",
    },
    {
      title: "藏品合成",
    },
    {
      title: "实名认证",
    },
    {
      title: "我的客服",
    },
    {
      title: "我的权益",
    },
  ];
  private imgsrc = require("../../assets/images/QrCode.jpg");
  private userInfo:any = {};
  private created() {
    this.userInfo =
      JSON.parse(sessionStorage.getItem("userInfo")) ||
      this.$store.state.userInfo;
  }
  private pageInto(url: string) {
    this.$router.push(url);
  }
  private handleComponent(type: any) {
    if (type.title === "藏品兑换") {
      this.$bus.$emit("handleRightDrawer", "showExchange");
    } else if (type.title === "实名认证") {
      if(!this.userInfo.record?.realname){
        this.$bus.$emit("handleRightDrawer", "showIdentity");
      }else{
        this.$message.warning("您已实名认证")
      }
    } else if (type.title === "好友转增") {
      this.$bus.$emit("handleRightDrawer", "");
      this.$router.push("/collection");
    } else if (["我的客服", "我的权益"].includes(type.title)) {
      this.$bus.$emit("handleRightDrawer", "");
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [
          h("i", null, "加入官方交流群了解详细信息 "),
          h("div", {
            style:
              "margin:0 auto;width:200px;height:200px;background-image:url(" +
              this.imgsrc +
              ");background-size:100% 100%;",
          }),
        ]),
        customClass: "areasMsgBox",
        center: true,
        confirmButtonText: "确定",
      });
    } else {
      this.$bus.$emit("handleRightDrawer", "");
      this.$message("功能暂未开放");
    }
  }
}
</script>

<style lang="scss" scoped>
.UserInfoDrawer {
  background: linear-gradient(#85342d, #212526);
  background: -ms-linear-gradient(left, #85342d, #212526);
  background: -moz-linear-gradient(left, #85342d, #212526);
  background: -webkit-linear-gradient(left, #85342d, #212526);
  background: -o-linear-gradient(left, #85342d, #212526);
  height: 100vh;
  border-radius: 108px 0 0 108px;
  display: flex;
  flex-direction: column;
  .userInfo {
    padding: 93px 55px 53px;
    display: flex;
    .avatar {
      margin-right: 28px;
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        font-size: 36px;
        color: #fff;
      }
      .btn {
        width: 100px;
        line-height: 30px;
        text-align: center;
        border-radius: 4px;
        color: #807e7e;
        background-color: #cccccc;
        cursor: pointer;
        &:hover {
          background-color: #949494;
          color: #fff;
        }
      }
    }
  }
  .center {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .gunctionalAreas {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      padding-right: 61px;
      .boxs {
        width: 75px;
        margin-left: 61px;
        margin-bottom: 37px;
        cursor: pointer;
        &:hover .title {
          color: #fff;
        }
        .icon {
          width: 75px;
          height: 75px;
          background-color: #bcadac;
          border-radius: 10px;
          margin-bottom: 15px;
        }
        .title {
          text-align: center;
          color: #bcadac;
        }
      }
    }
    .company {
      text-align: center;
      .companyName {
        color: #bcadac;
        padding-bottom: 30px;
        border-bottom: solid 1px #bcadac;
      }
      .support {
        display: flex;
        justify-content: space-evenly;
        .list {
          margin: 10px 0 20px;
          .msg {
            line-height: 40px;
            color: #807e7e;
            font-size: 14px;
          }
          .message {
            font-size: 16px;
            color: #bcadac;
          }
        }
      }
    }
  }
  .ICP {
    line-height: 100px;
    text-align: center;
    color: #807e7e;
    font-size: 12px;
  }
}
</style>
<style lang="scss">
.areasMsgBox {
  position: absolute;
  left: 20px;
  right: 470px;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
}
</style>