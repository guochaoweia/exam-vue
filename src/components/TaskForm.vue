<template>
  <div class="create-task form-color">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="任务名称">
        <el-input style="width: 300px" placeholder="请输入任务名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="任务时长">
        <div class="flex">
          <el-input style="width: 60px" v-model="form.duration"></el-input>
          <span class="ml-5">小时</span>
        </div>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input
          placeholder="请输入任务描述"
          style="max-width: 370px"
          type="textarea"
          v-model="form.desc"
        ></el-input>
      </el-form-item>
      <el-form-item label="执行人" style="max-width: 400px" v-if="receivedTaskUsers.length">
        <el-select v-model="form.userIds" multiple filterable placeholder="请选择执行人">
          <el-option
            :label="user.name"
            v-for="user in receivedTaskUsers"
            :value="user.id"
            :key="user.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否紧急">
        <el-switch v-model="form.level"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserlist, getTaskdetailApi } from "@/api/api";
export default {
  props: ["task-id", "data"],
  data() {
    return {
      id: "",
      form: {
        name: "",
        level: "",
        desc: "",
        duration: 1,
        userIds: [],
      },
      users: [],
    };
  },
  watch: {
    taskId(newValue) {
      this.getUserListByTask(newValue);
    },
  },
  computed: {
    receivedTaskUsers() {
      return this.users.filter((item) => item.isReceived != 1);
    },
  },
  created() {
    this.init();
  },
  methods: {
    initForm() {
      this.init();
      if (this.taskId) {
        this.form.userIds = [];
      } else {
        this.form = {
          name: "",
          level: false,
          desc: "",
          userIds: [],
          duration: 1,
        };
      }
    },
    init() {
      if (this.taskId) {
        this.form.name = this.data.taskName;
        this.form.duration = this.data.duration;
        this.form.desc = this.data.desc;
        this.form.level = this.data.level == 1 ? true : false;
        this.getUserListByTask(this.taskId);
      } else {
        this.getUserList();
      }
    },
    async getUserList() {
      let usersResult = await getUserlist({ pagination: false });
      this.users = usersResult.data.data.data.rows.map((item) => {
        item.isReceived = 0;
        return item;
      });
    },
    async getUserListByTask(taskId) {
      let [usersResult, taskDetailResult] = await Promise.all([
        getUserlist({ pagination: false }),
        getTaskdetailApi({ taskId }),
      ]);
      let users = usersResult.data.data.data.rows;
      let taskDetail = taskDetailResult.data.data;
      let receivedData = taskDetail.receivedData;
      console.log(taskDetail);
      this.users = users.map((item) => {
        item.isReceived = receivedData.find((data) => data.userId == item.id)
          ? 1
          : 0;
        return item;
      });
      const { taskName, level, desc, duration } = taskDetail;
      this.form = {
        name: taskName,
        level: level == 1,
        desc,
        duration,
      };
    },
    onSubmit() {
      let { name, level, desc, duration, userIds } = this.form;
      let params = {
        name,
        level: level ? 1 : 0,
        desc,
        duration,
      };
      if (this.taskId) {
        params = Object.assign(params, { id: this.taskId });
      }
      this.$emit("submit", params, userIds);
    },
  },
};
</script>

<style scoped lang="scss">
.create-task {
  background: #fff;
  padding: 15px 12px;
  height: 100%;
  box-sizing: border-box;
}
.title {
  padding: 15px 0;
}
::v-deep .el-textarea__inner {
  height: 140px;
}
</style>