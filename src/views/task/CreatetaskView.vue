<template>
  <div class="createtask">
    <div class="form">
      <el-title>新增项目任务</el-title>
      <div class="main">
        <!-- <el-task @submitForm="submitForm" :options="options" ref="form"></el-task> -->
        <el-taskform ref="createtask" @submit="submitForm"></el-taskform>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <el-button @click="query">查询任务列表</el-button>
          <el-button type="primary" @click="resetForm('form')">确 定</el-button>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getTaskCreate, getPublishtask } from "@/api/api";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  created() {},
  methods: {
    submitForm(val, userIds) {
      console.log(val);
      const { name, desc, duration, level } = val;
      getTaskCreate({ name, desc, duration, level }).then((res) => {
        val.id = res.data.data[0].id;
        console.log(res.data);
        if (res.data.status == 1) {
          this.dialogVisible = true;
          this.$message({
            type: "success",
            message: "创建任务成功",
          });
          getPublishtask({
            userIds: userIds,
            taskId: val.id,
          }).then((res) => {
            if (res.data.status == 1) {
              console.log(res);
            }
          });
          this.$refs.createtask.initForm();
        }
      });
    },
    resetForm() {
      this.dialogVisible = false;
    },
    query() {
      this.$router.push({
        name: "tasklist",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.createtask {
  display: grid;
  grid-template-columns: 1fr 1fr;
  .form {
    margin: 30px;
  }
}
</style>