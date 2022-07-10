<template>
  <div class="newrole">
    <div class="header align-center">
      <div class="mr-15">新增角色权限</div>
      <div class="msg align-center">
        <img class="icon" src="@/assets/home.png" alt />
        <div class="text">· 系统管理</div>
        <div class="text">· 角色与权限</div>
        <div>· 新增角色权限</div>
      </div>
    </div>
    <div class="main">
      <div class>
        <div class="addInfo">
          <div class="align-center mr-15">
            <label style="width:100px">角色名称</label>
            <el-input v-model="roleName" placeholder="请输入新增角色"></el-input>
          </div>
          <div class="align-center">
            <label style="width:80px">所属部门</label>
            <el-select v-model="groupId">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.groupName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <el-juris @checkboxVal="checkboxVal"></el-juris>
      <div class="pt-5">
        <el-button type="primary" @click="createrole">确认新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRoleListApi,
  getRoleCreateApi,
  getRoleGroupListApi,
  getRolepermissionCreateApi,
} from "@/api/api";
export default {
  data() {
    return {
      roleName: "",
      groupId: "",
      options: [],
      pagination: false,
      pageSize: "",
      pageNum: "",
      userId: "",
      titleData: [],
    };
  },
  async created() {
    let res = await getRoleGroupListApi();
    console.log(res);
    this.options = res.data.data.rows;
    let role = await getRoleListApi({
      pagination: this.pagination,
      pageSize: this.pageSize,
      pageNum: this.pageNum,
    });
    if (role.data.status == 1) {
      console.log(role.data.data.rows);
      role.data.data.rows.forEach((el) => {
        console.log(el.id);
      });
    }
  },
  methods: {
    async checkboxVal(val) {
      console.log(val);
      let res = [];
      val.forEach((element) => {
        res = res.concat(element.arr);
      });
      this.titleData = res;
      console.log(this.titleData);
    },
    async createrole() {
      let res = await getRoleCreateApi({
        roleName: this.roleName,
        groupId: this.groupId,
      });
      console.log(res);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "创建成功",
        });
        this.roleName = "";
        this.groupId = "";
        this.userId = res.data.data[0].id;
        let permissionCreate = await getRolepermissionCreateApi({
          title: this.titleData,
          rId: this.userId,
        });
        console.log(permissionCreate);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.newrole {
  background: #f2f5fa;
  padding: 0 15px;
  .header {
    padding: 15px 0;
    .msg {
      font-size: 12px;
      color: #adb0b7;
      .icon {
        width: 20px;
        height: 20px;
      }
      .text {
        color: #3f70e7;
      }
    }
  }
  .main {
    background: #fff;
    border-radius: 8px;
    padding: 0 20px 20px 20px;
    .addInfo {
      padding-top: 5px;
      display: flex;
      border-bottom: 1px solid #f3f2f7;
      padding-bottom: 10px;
    }
    // .choose {
    //   padding: 15px 30px;
    // }
    // .table {
    //   border: 1px solid #e7ecf0;
    //   margin: 0 20px;
    //   .table-head {
    //     background: #f6fafd;
    //     padding: 15px;
    //   }
    //   .table-main {
    //     padding: 15px 45px;
    //   }
    //   .table-head,
    //   .table-main {
    //     border-bottom: 1px solid #e7ecf0;
    //   }
    // }
  }
}
</style>