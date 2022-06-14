<template>
  <div class="home">
    <el-container>
      <el-header class="header flex-between">
        <div class="logo align-center">
          <img src="../assets/menu.png" class="icon mr-5" />
          <span class="text">Achi5</span>
        </div>
        <div class="info align-center">
          <div>武汉市 2022-04-20 15:00 星期三 21-22℃ 晴 风力 1|2级 风向 无持续风向微风</div>
          <div class="align-center">
            <img src="../assets/1.jpg" class="iconImg mr-5" />
            <span>{{userInfo.phone}}</span>
          </div>
          <span class="iconfont icon-guanji" @click="logout">退出</span>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside class="aside" width="200px">
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            v-for="item in menu"
            :key="item.name"
          >
            <el-menu-item :index="item.name" v-if="!item.children" @click="navigator(item.name)">
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span>{{item.label}}</span>
              </template>
            </el-menu-item>
            <el-submenu v-else :index="item.name">
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span>{{item.label}}</span>
              </template>
              <el-menu-item-group v-for="item in item.children" :key="item.name">
                <el-menu-item :index="item.name" @click="navigator(item.name)">{{item.label}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
//获取个人信息
//调取/user/info,获取sessionStorage中的值，把值渲染到页面上
//退出
// 点击退出时,调取服务端接口/user/logout,如果退出成功,则删除sessionStorage中的token值,并返回到登录页面
import { logoutAPi, getUserInfo } from "../api/api";
import menu from "@/config/menu.config";
export default {
  name: "HomeView",
  data() {
    return {
      userInfo: {},
      defaultActive: "",
      menu,
    };
  },
  async created() {
    this.defaultActive = this.$route.name;
    let res = await getUserInfo();
    // console.log(res);
    if (res.data.status == 1) {
      this.userInfo = res.data.data;
      // console.log(this.userInfo);
    }
    this.$bus.setItem("userInfo", this.userInfo);
  },
  // },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navigator(name) {
      //解决重复点击路由报错，加个判断返回就好了
      if (this.$route.name == name) return;
      this.$router.push({
        name,
      });
    },
    async logout() {
      let res = await logoutAPi();
      if (res.data.status == 1) {
        sessionStorage.removeItem("token");
        this.$router.push({
          name: "login",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  .header {
    background-color: #409eff;
    color: #fff;
    font-size: 20px;
    min-width: 800px;
    // .logo {
    //   // margin-left: 40px;
    // }
    .info {
      font-size: 10px;
      display: flex;
      gap: 0 20px;
      // margin-right: 40px;
    }
    .iconImg {
      border-radius: 50%;
      width: 24px;
      height: 24px;
    }
  }
  .container {
    height: calc(100vh - 60px);
    .aside {
      background-color: #545c64;
      overflow: auto;
    }
  }
}
.el-main {
  // overflow: hidden;
  overflow-y: scroll;
  padding: 0;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
::v-deep .el-submenu .el-menu-item {
  min-width: 198px;
}
</style>
