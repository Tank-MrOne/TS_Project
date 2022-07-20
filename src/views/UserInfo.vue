<template>
  <div class="UserInfo">
    <!-- 用户中心 -->
    <div class="background"></div>
    <div class="userShow">
      <div class="avatar">
        <el-avatar
          shape="circle"
          :size="216"
          fit="fill"
          :src="userInfo.avatar"
        ></el-avatar>
      </div>
      <div class="info">
        <div class="userName">{{ userInfo.record.username }}</div>
        <div class="info_message">
          <div class="id">ID: {{ userInfo.record.id }}</div>
          <div class="tags">
            <!-- <div class="tag orange" v-for="item in userInfo.tags" :key="item">
              {{ item }}
            </div> -->
            <div class="tag green" v-if="userInfo.realname">实名认证</div>
          </div>
          <div class="address">
            <div class="title">链上标识</div>
            <div class="value">{{ userInfo.record.linkedId }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  private userInfo: any = {};
  private created() {
    this.userInfo =
      JSON.parse(sessionStorage.getItem("userInfo")) ||
      this.$store.state.userInfo;
    if (!this.userInfo.record) {
      this.$router.push("/login");
    }
  }
}
</script>

<style lang="scss" scoped>
.UserInfo {
  position: relative;
  height: 100vh;
  .background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url("../assets/images/userInfo.jpg");
    background-position: center;
    background-size: cover;
    z-index: -1;
  }
  .userShow {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    left: 77px;
    right: 675px;
    top: 147px;
    display: flex;
    padding: 25px;
    border-radius: 20px;
    color: #d8d8d8;
    .info {
      padding-left: 54px;
      .userName {
        font-size: 48px;
        color: #fff;
        margin-bottom: 40px;
        height: 100px;
      }
      .info_message {
        text-shadow: 0 0 2px rgba(0, 0, 0);
        .id {
          font-size: 18px;
          line-height: 30px;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          .tag {
            font-size: 18px;
            padding: 5px 10px;
            border-radius: 5px;
            text-shadow: none;
            margin-right: 10px;
            &.orange {
              background-color: #ede6c7;
              color: #d6683b;
            }
            &.green {
              background-color: #a6f58e;
              color: #131c10;
            }
          }
        }
        .address {
          margin-top: 10px;
          word-break: break-all;
          line-height: 1.5;
          font-size: 24px;
        }
      }
    }
  }
}
</style>