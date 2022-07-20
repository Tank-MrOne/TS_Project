<template>
  <div class="LoginDrawer">
    <div class="logo">
      <div class="logoImage"></div>
      <div class="company">加入永乐</div>
    </div>
    <div class="form">
      <div class="input" v-if="submitType === 'register'">
        <el-input
          class="loginInput"
          v-model="form.userName"
          placeholder="用户名"
        ></el-input>
      </div>
      <div class="input">
        <el-input
          class="loginInput"
          v-model="form.phone"
          placeholder="手机号"
        ></el-input>
      </div>
      <div
        v-if="submitType === 'password' || submitType === 'register'"
        class="input"
      >
        <el-input
          class="loginInput"
          v-model="form.password"
          placeholder="密码"
          show-password
        ></el-input>
      </div>
      <div
        v-if="submitType === 'code' || submitType === 'register'"
        class="validation"
      >
        <div class="input">
          <el-input
            class="loginInput"
            v-model="form.validation"
            placeholder="验证码"
          ></el-input>
        </div>
        <div class="btn">
          <el-popover
            placement="bottom"
            width="400"
            trigger="manual"
            popper-class="loginPopover"
            v-model="popoverVisible"
          >
            <div class="compute">
              <div class="computeInput">
                <el-input
                  v-model="captchaValue"
                  placeholder="请输入验证码"
                ></el-input>
                <img :src="captchaData.captchaImg" @click="getCaptchaCode" />
              </div>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="getCaptchaData(0)"
                  >取消</el-button
                >
                <el-button type="primary" size="mini" @click="getCaptchaData(1)"
                  >确定</el-button
                >
              </div>
            </div>
            <el-button
              class="valiBtn btnThem"
              slot="reference"
              @click="getCaptchaCode"
            >
              {{ getCode }}
            </el-button>
          </el-popover>
        </div>
      </div>
      <div
        v-if="isFirst || submitType === 'register'"
        class="changePassword btnThem"
        @click="changeSubmitType('password')"
      >
        设置密码登入
      </div>
      <div v-show="!isFirst" class="fun">
        <div
          class="changeCode"
          v-show="submitType !== 'code'"
          @click="changeSubmitType('code')"
        >
          验证码登入
        </div>
        <div
          class="changeCode"
          v-show="submitType !== 'password'"
          @click="changeSubmitType('password')"
        >
          密码登入
        </div>
        <div
          class="changeCode"
          v-show="submitType !== 'register'"
          @click="changeSubmitType('register')"
        >
          注册
        </div>
      </div>
    </div>
    <div class="submit">
      <el-checkbox v-model="agree"
        >需同意用户行为准则、隐私保护协议等条款</el-checkbox
      >
      <div class="submitBtn btnThem" @click="submit">
        {{ submitText }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import { captcha, login, register, sendCode } from "@/api/index";

@Component
export default class extends Vue {
  private isFirst = true;
  private agree = false;
  private submitText = "开始体验";
  private getCode = "获取验证码";
  private submitType = "code";
  private form = {
    userName: "",
    phone: "",
    validation: "",
    password: "",
  };
  private popoverIn = null;
  private popoverTime = 60;
  private popoverVisible = false;
  private captchaData: any = {}; // 验证码
  private captchaValue = "";

  private async getCaptchaCode() {
    if (this.popoverTime !== 60) return;
    let reg = /^1[3-9][0-9]{9}$/;
    if (!this.form.phone.trim()) {
      this.$message.error("请输入手机号");
      return;
    } else if (!reg.test(this.form.phone)) {
      this.$message.error("手机号格式有误");
      return;
    }
    let result: any = await captcha();
    if (result.code === 200) {
      this.captchaData = result.data;
      this.openPopover();
    } else {
      this.$message.error(result.msg);
    }
  }
  private openPopover() {
    this.popoverVisible = true;
  }
  private async getCaptchaData(type: number) {
    if (type === 1) {
      if (this.captchaValue.trim().length === 0) {
        this.$message.error("验证码不能为空");
        return;
      } else if (
        this.captchaValue?.trim().toUpperCase() !==
        this.captchaData.code?.trim().toUpperCase()
      ) {
        this.$message.error("验证码不正确");
        return;
      }
      sendCode({
        phone: this.form.phone,
      })
        .then((result: any) => {
          if (result.code === 200) {
            this.$message({
              message: "短信验证码发送成功",
              type: "success",
            });
            this.popoverVisible = false;
            this.popoverIn = setInterval(() => {
              this.getCode = this.popoverTime + "秒后重新获取";
              this.popoverTime = this.popoverTime - 1;
              if (this.popoverTime <= 0) {
                this.popoverIn && clearInterval(this.popoverIn);
                this.popoverTime = 60;
                this.getCode = "获取验证码";
              }
            }, 1000);
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error: any) => {
          this.$message.error(error);
        });
    } else {
      this.popoverVisible = false;
    }
  }
  private changeSubmitType(type) {
    this.isFirst = false;
    this.submitType = type;
  }

  private submit() {
    if (!this.agree) {
      this.$message({
        message: "请同意用户行为准则",
        type: "warning",
      });
      return;
    }
    let reg = /^1[3-9][0-9]{9}$/;
    if (!this.form.phone.trim()) {
      this.$message.error("请输入手机号");
      return;
    } else if (!reg.test(this.form.phone) && this.submitType !== "password") {
      this.$message.error("手机号格式有误");
      return;
    }
    if (this.submitType === "code" || this.submitType === "register") {
      if (!this.form.validation.trim()) {
        this.$message.error("验证码不能为空");
        return;
      }
    } else if (
      this.submitType === "password" ||
      this.submitType === "register"
    ) {
      if (!this.form.password.trim()) {
        this.$message.error("密码不能为空");
        return;
      }
    }
    if (this.submitType === "register") {
      if (this.form.userName.trim().length === 0) {
        this.$message.error("请输入用户名");
        return;
      }
      this.register();
      return;
    }
    this.login(this.submitType);
  }
  private login(requestType: string) {
    login({
      [requestType]:
        this.submitType === "password"
          ? this.form.password
          : this.form.validation,
      username: this.form.phone,
    })
      .then((result: any) => {
        if (result.code === 200) {
          this.$message({
            message: result.msg,
            type: "success",
          });
          sessionStorage.setItem("yongle", result.data.token);
          this.$store.commit("SET_TOKEN", result.data.token);
          this.$store.commit("SET_IS_LOGIN", true);
          this.$router.push("/home");
          this.getUserInfo();
        } else {
          this.$message.error(result.msg);
        }
      })
      .catch((error: any) => {
        this.$message.error(error);
      });
  }
  private register() {
    register({
      code: this.form.validation,
      password: this.form.password,
      phone: this.form.phone,
      username: this.form.userName,
    })
      .then((result: any) => {
        if (result.code === 200) {
          this.$message({
            message: result.msg,
            type: "success",
          });
          this.form = {
            userName: "",
            phone: "",
            validation: "",
            password: "",
          };
          this.submitType = "password";
        } else {
          this.$message.error(
            result.data.username ??
              result.data.code ??
              result.data.phone ??
              result.data.username ??
              "注册失败，请稍后再试"
          );
        }
      })
      .catch((error: any) => {
        this.$message.error(error);
      });
  }
  private getUserInfo() {
    this.$store.dispatch("_API_getUserDetail", {
      error: (msg: any) => {
        this.$message.error(msg);
      },
    });
    this.$store.dispatch("_API_getFriendsListAll", {
      error: (msg: any) => {
        this.$message.error(msg);
      },
    });
  }

  @Watch("submitType")
  private watchType(newVal: any) {
    if (newVal === "code" || newVal === "password") {
      this.submitText = "立即登入";
    } else if (newVal === "register") {
      this.submitText = "立即注册";
    }
  }
}
</script>

<style lang="scss" scoped>
.LoginDrawer {
  background: linear-gradient(#627f87, #1a151a);
  background: -ms-linear-gradient(left, #627f87, #1a151a);
  background: -moz-linear-gradient(left, #627f87, #1a151a);
  background: -webkit-linear-gradient(left, #627f87, #1a151a);
  background: -o-linear-gradient(left, #627f87, #1a151a);
  height: 100vh;
  border-radius: 40px 0 0 40px;
  display: flex;
  flex-direction: column;
  padding: 165px 85px 123px;
  .logo {
    display: flex;
    align-items: center;
    color: #ccc;
    .logoImage {
      width: 108px;
      height: 108px;
      background-color: #ccc;
      border-radius: 25px;
    }
    .company {
      margin-left: 41px;
      font-size: 48px;
      // font-weight: bold;
    }
  }
  .form {
    margin: 20px 0;
    flex: 1;
    .input,
    .btnThem {
      margin-bottom: 30px;
      height: 65px;
      font-size: 24px;
    }
    .validation {
      display: flex;
      .input {
        flex: 1;
      }
      .valiBtn {
        margin-left: 15px;
        font-size: 12px;
        padding: 0 10px;
      }
    }
    .fun {
      display: flex;
      justify-content: space-between;
      color: #ccc;
      font-size: 13px;
      div:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .submit {
    text-align: center;
    .el-checkbox__label {
      font-size: 9px;
    }
    .submitBtn {
      font-size: 30px;
      font-weight: bold;
      line-height: 60px;
      margin-top: 10px;
    }
  }
  .btnThem {
    background-color: #ccc;
    color: #fff;
    text-align: center;
    border-radius: 25px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 108px;
    font-size: 36px;
  }
}
</style>
<style lang="scss">
.LoginDrawer {
  .loginInput {
    .el-input__inner {
      border-radius: 25px;
      text-align: center;
      height: 65px;
      font-size: 24px;
    }
  }
  .el-checkbox__inner {
    border-radius: 50%;
  }
}
.loginPopover.el-popover {
  z-index: 9999 !important;
  background-color: var(--themColor);
  border: none;
  color: #ccc;
  .compute {
    text-align: center;
    .computeInput {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      img {
        margin-left: 15px;
        cursor: pointer;
      }
    }
  }
  .popper__arrow {
    border-bottom-color: var(--themColor);
    &::after {
      border-bottom-color: var(--themColor);
    }
  }
}
</style>