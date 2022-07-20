<template>
  <div class="Identity">
    <!-- 实名认证 -->
    <div class="warp">
      <div class="title">实名认证</div>
      <div class="uploadIdentity">
        <div class="positive">
          <el-upload
            class="upload-demo"
            :class="{ upload_sucess: identityUpload.positive.length }"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :multiple="false"
            :accept="acceptList.join()"
            :on-success="onUploadSuccessPositive"
            :on-error="onUploadError"
            :before-upload="beforeUploadPositive"
            :file-list="identityUpload.positive"
          >
            <i class="el-icon-upload"></i>
            <div
              v-if="identityUpload.positive.length === 0"
              class="el-upload__text"
            >
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <el-image
              v-else
              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
            >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <div class="el-upload__tip" slot="tip">上传身份证正面照</div>
          </el-upload>
        </div>
        <div class="back">
          <el-upload
            class="upload-demo"
            :class="{ upload_sucess: identityUpload.back.length }"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :multiple="false"
            :accept="acceptList.join()"
            :on-success="onUploadSuccessBack"
            :on-error="onUploadError"
            :before-upload="beforeUploadBack"
            :file-list="identityUpload.back"
          >
            <i class="el-icon-upload"></i>
            <div
              v-if="identityUpload.back.length === 0"
              class="el-upload__text"
            >
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <el-image
              v-else
              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
            >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <div class="el-upload__tip" slot="tip">上传身份证国徽照</div>
          </el-upload>
        </div>
      </div>
      <div class="input">
        <div class="label">姓名：</div>
        <el-input class="exchangeInput" v-model="inputName"></el-input>
      </div>
      <div class="input">
        <div class="label">身份证号：</div>
        <el-input class="exchangeInput" v-model="inputIdentity"></el-input>
      </div>
      <div class="buttonWarp">
        <div class="button" @click="identitySubmit">确定</div>
        <div class="button cancle" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { userAudit } from "@/api/index";
@Component
export default class extends Vue {
  private acceptList = [".jpg", ".jpeg", ".png", ".JPG", ".PNG", ".JPEG"];
  private identityUpload: any = {
    positive: [],
    back: [],
  };
  private inputName: string = "";
  private inputIdentity: string = "";
  private async identitySubmit() {
    let reg1 =
      /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    let reg2 =
      /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
    if (
      this.identityUpload.positive.length === 0 ||
      this.identityUpload.back.length === 0
    ) {
      this.$message.error("请上传身份证件照");
      return;
    }
    if (this.inputName.trim().length === 0) {
      this.$message.error("姓名不能为空");
      return;
    }
    if (!(reg1.test(this.inputIdentity) || reg2.test(this.inputIdentity))) {
      this.$message.error("身份证号输入错误");
      return;
    }
    try {
      let result: any = await userAudit({
        identityNumber: this.inputIdentity,
        realname: this.inputName,
      });
      if (result.code === 200) {
        this.$message.success(result.msg);
        this.$store.dispatch("_API_getUserDetail", {
          error: (msg: any) => {
            this.$message.error(msg);
          },
        });
        this.$bus.$emit("handleRightDrawer", "");
      } else {
        this.$message.error(result.msg);
        this.$bus.$emit("handleRightDrawer", "");
      }
    } catch (error) {
      this.$message.error("网络异常，请稍后再试");
      this.$bus.$emit("handleRightDrawer", "");
    }
  }
  private cancel() {
    this.$bus.$emit("handleRightDrawer", "");
  }

  private onUploadSuccessPositive(res: any, file: any, fileList: any) {
    console.log(res);
    console.log(file);
    console.log(fileList);
    this.identityUpload.positive = fileList;
  }
  private onUploadSuccessBack(res: any, file: any, fileList: any) {
    console.log(res);
    console.log(file);
    console.log(fileList);
    this.identityUpload.back = fileList;
  }
  private beforeUploadPositive(file: any) {
    console.log("positive", file);
    let flag = this.beforeUpload(file);
    if (
      flag &&
      this.identityUpload.positive &&
      this.identityUpload.positive.fileList?.length
    ) {
      this.identityUpload.positive.fileList = [];
    }
    return flag;
  }
  private beforeUploadBack(file: any) {
    console.log("back", file);
    let flag = this.beforeUpload(file);
    if (
      flag &&
      this.identityUpload.back &&
      this.identityUpload.back.fileList?.length
    ) {
      this.identityUpload.back.fileList = [];
    }
    return flag;
  }
  private async beforeUpload(file: any) {
    const fileName = file.name;
    const match = fileName.match(/(\.[a-zA-Z]+)$/);
    if (!match || this.acceptList.indexOf(match[1].toLowerCase()) < 0) {
      this.$notify({
        title: "提示",
        message: "上传文件格式不允许",
      });
      return false;
    }
    const isLt50M = file.size / 1024 / 1024 > 50;
    if (isLt50M) {
      this.$notify({
        title: "提示",
        message: "上传文件大小不能超过 50MB!",
      });
    }

    return !isLt50M;
  }
  private onUploadError() {
    this.$message("上传失败，请稍后再试");
  }
}
</script>

<style lang="scss" scoped>
.Identity {
  position: absolute;
  left: 0;
  top: 0;
  right: 519px;
  bottom: 0;
  background-color: #333;
  padding-right: 108px;
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
    .uploadIdentity {
      display: flex;
      justify-content: space-evenly;
      margin-bottom: 20px;
      width: 100%;
      padding: 20px;
      .upload-demo.upload_sucess {
        .el-icon-upload {
          display: none;
        }
      }
    }
    .input {
      width: 70%;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .label {
        width: 150px;
        text-align: right;
        color: #fff;
        font-size: 20px;
        margin-right: 20px;
      }
    }
    .buttonWarp {
      width: 70%;
      display: flex;
      flex-direction: row-reverse;
      .button {
        width: 100px;
        text-align: center;
        line-height: 35px;
        background-color: #cfad4a;
        border-radius: 4px;
        font-size: 20px;
        cursor: pointer;
        margin-left: 20px;
        &.cancle {
          background: none;
          color: #ccc;
          border: #ccc solid 1px;
        }
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.Identity {
  .exchangeInput .el-input__inner {
    font-size: 20px;
  }
  .uploadIdentity .el-upload__tip {
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
}
</style>