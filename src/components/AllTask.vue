<template>
  <div class="main">
    <el-form
      :label-position="labelPosition"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item class="mt-30" label="任务名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请填写任务名称"></el-input>
      </el-form-item>
      <el-form-item label="预计完成时间" prop="duration">
        <div class="completion-time">
          <el-input v-model="ruleForm.duration" maxlength="1"></el-input>
          <div>小时</div>
        </div>
      </el-form-item>
      <el-form-item label="任务说明" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="执行人" prop="region">
        <el-select v-model="ruleForm.userIds" multiple filterable placeholder="请选择执行人">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="紧急重要" prop="level">
        <el-switch v-model="ruleForm.level"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('submitForm',ruleForm)">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { getUserlist } from "@/api/api";
export default {
  props: ["form", "options"],
  data() {
    return {
      labelPosition: "right",
      ruleForm: {
        name: "",
        id: "",
        duration: "",
        desc: "",
        level: false,
        userIds: [],
      },

      rules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        duration: [
          { required: true, message: "请输入完成时间", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写任务说明", trigger: "blur" }],
      },
    };
  },
  created() {
    console.log(this.form);
    // let params = {
    //   pagination: this.pagination,
    //   pageSize: this.pageSize,
    //   pageNum: this.pageNum,
    // };
    // getUserlist(params).then((res) => {
    //   this.options = res.data.data.data.rows;
    //   console.log(this.options);
    // });
  },
  methods: {
    empty() {
      this.ruleForm = {
        name: "",
        id: "",
        duration: "",
        desc: "",
        level: false,
        userIds: [],
      };
    },
  },
};
</script>


<style lang="scss" scoped>
.completion-time {
  display: grid;
  grid-template-columns: 40px auto;
}
</style>