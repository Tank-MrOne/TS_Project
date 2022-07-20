<template>
  <div class="FriendsDrawer">
    <!-- 好友列表 -->
    <div class="userInfo">
      <div class="avatar">
        <el-avatar
          shape="circle"
          :size="108"
          fit="fill"
          :src="userInfo.record.avatar"
        ></el-avatar>
      </div>
      <div class="msg">
        <div class="userName">{{ userInfo.record.username }}</div>
        <!-- <div class="tag" v-if="$store.state.userInfo.tags.length">创世标识</div> -->
      </div>
    </div>
    <div class="friendsList">
      <div
        class="friend"
        v-for="(item, index) in friends"
        :key="index"
        :class="{ active: active === index }"
        @click="choiceFriend(index, item)"
      >
        <el-avatar
          shape="circle"
          :size="54"
          fit="fill"
          :src="item.avatar"
        ></el-avatar>
        <div class="tag">
          <!-- <span v-if="item.tags.length">创世标识</span> -->
        </div>
        <div class="friendName">{{ item.username }}</div>
      </div>
    </div>
    <div class="control" v-if="!$store.state.showDrawer && friends.length">
      <div @click="addFriends">添加好友</div>
      <div @click="deleteFriends">删除好友</div>
    </div>
    <div class="btn" v-if="$route.path !== '/social'">
      <div class="giveBtn" @click="giveCollection">确认赠送</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { friendsAdd, friendsRemove } from "@/api/index";
@Component
export default class extends Vue {
  private active = -1;
  private friend: any = {};
  private userInfo: any = {};
  private friends: any = [];
  private created() {
    this.userInfo =
      JSON.parse(sessionStorage.getItem("userInfo")) ||
      this.$store.state.userInfo;
    this.friends =
      JSON.parse(sessionStorage.getItem("friends")) ||
      this.$store.state.friends;
    if (!this.userInfo.record) {
      this.$router.push("/login");
    }
  }
  private choiceFriend(index: number, item: any) {
    if (this.$store.state.showDrawer) return;
    this.active = index;
    this.friend = item;
  }
  private giveCollection() {
    if (this.$store.state.showDrawer) return;
    if (this.active === -1) {
      this.$message.error("请选择一位好友");
      return;
    }
    this.$store.commit("SET_GIVE_INFO", {
      collection: this.$route.params.info ?? {},
      friend: this.friend ?? {},
    });
    this.$bus.$emit("handleRightDrawer", "showGiveCollection");
  }
  private addFriends() {
    this.$prompt("请输入用户ID", "提示", {
      confirmButtonText: "添加",
      cancelButtonText: "取消",
      inputPattern: /^[0-9]+$/,
      inputErrorMessage: "用户id不正确",
    })
      .then(async (v: any) => {
        try {
          let result: any = await friendsAdd({
            friendId: v.value,
          });
          if (result.code === 200) {
            this.$message({
              type: "success",
              message: "添加成功:",
            });
            this.$store.dispatch("_API_getFriendsListAll", {
              success: () => {
                this.friends = this.$store.state.friends;
              },
              error: (msg: any) => {
                this.$message.error(msg);
              },
            });
          } else {
            this.$message.error(result.data.friendId || result.msg);
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消输入",
        });
      });
  }
  private deleteFriends() {
    if (this.active === -1) {
      this.$message.error("请选择一位好友");
      return;
    }
    this.$confirm(`是否删除好友（${this.friend.username}）?`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        try {
          let result: any = await friendsRemove({
            friendId: this.friend?.friendId,
          });
          if (result.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.$store.dispatch("_API_getFriendsListAll", {
              success: () => {
                this.friends = this.$store.state.friends;
              },
              error: (msg: any) => {
                this.$message.error(msg);
              },
            });
          } else {
            this.$message.error(result.data.friendId || result.msg);
          }
        } catch (error) {
          console.log(error);
        }
        // let friends = this.$store.state.friends;
        // friends.splice(this.active, 1);
        // this.$store.commit("SET_FRIENDS", friends);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
  }
}
</script>

<style lang="scss" scoped>
.FriendsDrawer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #2d2d2d;
  border-radius: 80px 0 0 80px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  .userInfo {
    padding: 60px 64px 53px; 
    display: flex;
    align-items: center;
    border-bottom: solid 1px #5f5f5f;
    .msg {
      margin-left: 30px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100px;
      .userName {
        font-size: 36px;
      }
      .tag {
        color: #de966e;
        background-color: #f4edcd;
        text-align: center;
        border-radius: 20px;
        line-height: 25px;
        width: max-content;
        padding: 0 10px;
        font-size: 9px;
      }
    }
  }
  .friendsList {
    height: 50vh;
    overflow: auto;
    margin: 10px 0;
    .friend {
      background-color: #808080;
      &:nth-of-type(2n) {
        background-color: #595959;
      }
      margin-top: 10px;
      &:nth-of-type(1) {
        margin-top: 0;
      }
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 3px 10px;
      box-sizing: border-box;
      height: 61px;
      color: #fff;
      .tag {
        color: #de966e;
        background-color: #f4edcd;
        text-align: center;
        border-radius: 20px;
        line-height: 25px;
        width: max-content;
        min-width: 80px;
        padding: 0 10px;
        font-size: 12px;
        margin: 0 10px;
      }
      &:hover,
      &.active {
        background-color: rgb(228, 228, 228);
        color: #2b2b2b;
      }
      .friendName{
        font-size: 16px;
      }
    }
  }
  .control {
    border-top: solid 1px #5f5f5f;
    display: flex;
    justify-content: space-between;
    color: #9d9d9d;
    padding: 10px;
    cursor: pointer;
    font-size: 15px;
    div:hover {
      color: rgb(228, 228, 228);
    }
  }
  .btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .giveBtn {
      width: 240px;
      line-height: 50px;
      background-color: #2b2b2b;
      color: #887540;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: #1b1b1b;
      }
    }
  }
}
</style>