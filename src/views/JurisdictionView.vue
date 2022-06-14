<template>
  <div class="juris">
    <div>
      <div class="flex-between">
        <el-title>权限配置</el-title>
        <el-button type="primary" @click="append">添加权限</el-button>
      </div>
      <div class="main">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.title }}</span>
            <span>
              <el-button type="text" size="mini" @click="append(data)">增加</el-button>
              <el-button
                type="text"
                size="mini"
                v-if="!data.children.length"
                @click="()=>remove(node, data)"
              >删除</el-button>
              <el-button type="text" size="mini" @click="() => modify(node, data)">修改</el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <el-dialog title="新增权限" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option v-for="item in option" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在目录" v-if="dialogFormVisible" :label-width="formLabelWidth">
          <el-select filterable v-model="form.pid" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">创建</el-button>
        <el-button type="primary" @click="modifyJuris">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissionListApi,
  getPermissionCreateApi,
  getPermissionDeleteApi,
  getPermissionUpdateApi,
} from "@/api/api";
export default {
  data() {
    return {
      data: [],
      id: "",
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        title: "",
        type: 1,
        pid: null,
      },
      formLabelWidth: "120px",
      options: [],
      option: [
        {
          id: 1,
          label: "左侧栏",
        },
        {
          id: 2,
          label: "页面",
        },
        {
          id: 3,
          label: "功能",
        },
      ],
    };
  },
  created() {
    this.getPermissionList();
  },
  methods: {
    async getPermissionList() {
      let res = await getPermissionListApi({ pagination: false });
      if (res.data.status == 1) {
        console.log(res);
        this.options = res.data.data.rows;
        let jurisMenu = res.data.data.rows;
        // jurisMenu.forEach((el) => {
        //   let parent = jurisMenu.find((item) => item.id == el.pid);
        //   if (!el.pid) return;
        //   parent.children = parent.children || [];
        //   parent.children.push(el);
        // });
        jurisMenu.forEach((el) => {
          el.children = jurisMenu.filter((item) => item.pid == el.id);
        });
        this.data = jurisMenu.filter((el) => !el.pid);
      }
    },
    //增加
    append(data) {
      this.form = {};
      this.dialogVisible = true;
      this.form.pid = data.id;
      console.log(data);
    },
    async confirm() {
      let res = await getPermissionCreateApi(this.form);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "创建成功",
        });
        this.getPermissionList();
        console.log(res);
      }
      this.dialogVisible = false;
    },
    //删除
    getSelectedIds(data) {
      let res = [data.id];
      data.children.forEach((item) => {
        if (item.children.length) {
          let ids = this.getSelectedIds(item);
          if (ids.length) res.push(...ids);
        }
        res.push(item.id);
      });
      return res;
    },
    remove(node, data) {
      //   data.forEach((el) => {
      //     el.children = data.filter((d) => d.pid == data.id);
      //     console.log(el.children);
      //   });
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          console.log(node);
          let ids = this.getSelectedIds(data);
          let res = await getPermissionDeleteApi({ id: ids });
          if (res.data.status == 1) {
            this.getPermissionList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    modify(node, data) {
      //修改弹层
      console.log(node);
      console.log(data);
      this.dialogVisible = true;
      this.dialogFormVisible = true;
      this.form.title = data.title;
      this.form.type = data.type;
      this.form.pid = data.pid;
      this.id = data.id;
    },
    async modifyJuris() {
      let res = await getPermissionUpdateApi({
        id: this.id,
        title: this.form.title,
        type: this.form.type,
        pid: this.form.pid,
      });
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getPermissionList();
      }
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.juris {
  margin: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .main {
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      padding-right: 8px;
    }
  }
}
</style>