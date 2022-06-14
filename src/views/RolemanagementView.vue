<template>
  <div class="jurisdiction">
    <div class="title align-center">
      <img class="icon mr-5" src="@/assets/userIcon.png" alt />
      <div>角色管理</div>
    </div>
    <div class="main">
      <div class="asside">
        <div class="align-center mt-15">
          <div class="align-center mr-30">
            <img class="icon mr-5" src="@/assets/adduser.png" alt />
            <div class="header-text" @click="newrole">新增角色</div>
          </div>
          <div class="align-center">
            <img class="icon mr-5" src="@/assets/adduser.png" alt />
            <div class="header-text" @click="creategroup">新建分组</div>
          </div>
        </div>
        <el-tree accordion :data="roleGroup" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="container">
        <div class="align-center">
          <div class="mr-5">所有者</div>
          <div class="right-text">系统默认角色，默认具有企业所有功能权限和全部数据可见范围</div>
        </div>
        <div class="tags">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色成员" name="first">
              <div class="roleMember">
                <div class="flex-between">
                  <div class="align-center">
                    <h1 class="mr-5">小千金</h1>
                    <img class="mr-5" src="@/assets/role.png" alt />
                    <span>1</span>
                  </div>
                  <div class="align-center member">
                    <div class="align-center mr-15">
                      <img class="mr-5" src="@/assets/former.png" alt />
                      <div>已离职成员</div>
                    </div>
                    <div class="align-center">
                      <img class="mr-5" src="@/assets/invite.png" alt />
                      <div>邀请新成员加入本组织</div>
                    </div>
                  </div>
                </div>
                <div class="flex-between">
                  <div class="align-center">
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <el-button class="iconbtn">
                      <img src="@/assets/list.png" alt />
                    </el-button>
                  </div>
                  <div>
                    <el-button icon="el-icon-plus" type="primary">添加成员</el-button>
                    <el-button>批量导入/导出</el-button>
                    <el-button>变更部门</el-button>
                    <el-button type="danger" plain>操作离职</el-button>
                  </div>
                </div>
                <div class="roletable">
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="姓名" width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="帐号状态" width="120"></el-table-column>
                    <el-table-column prop="address" label="手机" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address" label="部门" show-overflow-tooltip></el-table-column>
                  </el-table>
                </div>
                <div class="flex-between">
                  <div class="align-center">
                    <el-switch v-model="value" active-color="#13ce66" inactive-color="#aaa"></el-switch>
                    <div>仅展示部门的直属成员</div>
                  </div>
                  <div>
                    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="功能权限" name="second">
              <el-juris></el-juris>
            </el-tab-pane>
            <el-tab-pane label="数据范围" name="third"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRoleListApi, getRoleGroupListApi } from "@/api/api";
// import Group from "@/assets/menulist/group";
export default {
  data() {
    return {
      roleGroup: [],
      rolelist: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      activeName: "first",
      isIndeterminate: true,
      pagination: false,
      pageSize: "",
      pageNum: "",
      options: [
        {
          label: "全部",
        },
      ],
      value: true,
      tableData: [],
    };
  },
  async created() {
    let res = await getRoleListApi({
      pagination: false,
    });
    if (res.data.status == 1) {
      console.log(res);
      this.rolelist = res.data.data.rows;
    }
    this.getMenuList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    //新建角色
    newrole() {
      this.$router.push({
        name: "newrole",
      });
    },
    //新建分组
    creategroup() {
      this.$router.push({
        name: "rolegroup",
      });
    },
    //目录列表
    async getMenuList() {
      let [roleGroup, rolelist] = await Promise.all([
        getRoleGroupListApi({
          pagination: false,
        }),
        getRoleListApi({
          pagination: false,
        }),
      ]);
      this.roleGroup = roleGroup.data.data.rows;
      this.rolelist = rolelist.data.data.rows;
      this.roleGroup.forEach((item) => {
        item.children = this.rolelist.filter((el) => el.groupId == item.id);
        this.rolelist.forEach((item) => {
          item.name = item.roleName;
        });
        item.name = item.groupName;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.jurisdiction {
  font-family: "Helvetica Neue";
  margin: 0 20px;
  display: grid;
  grid-template-rows: 40px auto;
  .title {
    border-bottom: 1px solid #ebeff1;
    color: #727f90;
  }
  .main {
    display: grid;
    grid-template-columns: 250px auto;
    .asside {
      margin-left: 20px;
      border-right: 1px solid #ebeff1;
      .header-text {
        color: #4c8edd;
        font-size: 14px;
      }
    }
    .container {
      margin-left: 30px;
      display: grid;
      grid-template-rows: 40px auto;
      .right-text {
        color: #aaa;
        font-size: 14px;
      }
      .tags {
        .roleMember {
          display: grid;
          grid-template-rows: 40px 60px auto 40px;
          .member {
            color: #5488ff;
          }
          .roletable {
            .el-table {
              ::-webkit-scrollbar {
                height: 0;
                width: 0;
              }
            }
          }
        }
      }
    }
  }
}

::v-deep .el-tree-node__content {
  padding-top: 15px;
}
::v-deep .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding: 0 20px;
}
::v-deep .iconbtn {
  padding: 6px 8px;
}
</style>