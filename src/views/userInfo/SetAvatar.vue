<template>
  <div>
    <div class="allicon align-center">
      <el-upload
        class="avatar-uploader"
        action="/api/upload/image"
        :show-file-list="false"
        :data="{type:2}"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="img align-center">
        <div :class="{active:active==imageUrl}">
          <img class="icon" :src="imageUrl" @click="changeicon(imageUrl,imageUrl)" />
        </div>
        <div v-for="(item,index) in fileList" :key="index" :class="{active:active==index}">
          <img class="icon" :src="item.url" @click="changeicon(item.url,index)" alt />
        </div>
      </div>
    </div>
    <el-button class="ml-40" type="primary" @click="modify">修改</el-button>
  </div>
</template>

<script>
import { getUpdata, getAvatarListApi } from "@/api/api";
export default {
  data() {
    return {
      imageUrl: "",
      avatarImg: "",
      fileList: [],
      icon: "",
      active: "",
    };
  },
  async created() {
    this.getAvatarList();
    let res = await this.$store.dispatch("getUserInfoApi");
    this.imageUrl = this.$store.state.userinfo.avatarImg;
    console.log(res);
  },
  methods: {
    async getAvatarList() {
      let res = await getAvatarListApi();
      this.fileList = res.data.data;
      console.log(this.fileList);
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.avatarImg = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      const isLt2M = file.size / 1024 < 200;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 200kb!");
      }
      return isJPG && isLt2M;
    },
    modify() {
      this.$confirm("是否修改头像?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await getUpdata({ avatarImg: this.avatarImg });
          if (res.data.status == 1) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            let userInfo = await this.$store.dispatch("getUserInfoApi");
            console.log(userInfo);
            this.$store.commit("userinfo", userInfo.data.data);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    changeicon(url, index) {
      this.avatarImg = url;
      console.log(url);
      this.active = index;
      console.log(this.active);
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  border: 2px solid red;
}
.img {
  flex-wrap: wrap;
}
.allicon {
  display: flex;
}
.icon {
  width: 100px;
  height: 100px;
  border: 2px dashed blue;
  margin: 5px;
  //   padding: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #383535;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #464749;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

// .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }
</style>