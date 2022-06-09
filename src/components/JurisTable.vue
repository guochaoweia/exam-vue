<template>
  <div class="tags-second">
    <div class="flex-between">
      <div class="right-text">设置角色对应的功能操作、应用管理、后台管理权限</div>
    </div>
    <div class="table mt-10">
      <div v-for="(item,index) in cities" :label="item.label" :key="item.name">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange(index,item.children)"
        >{{item.label}}</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <template v-if="item.children">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox
              v-for="children in item.children"
              :key="children.name"
              :label="children.label"
            >{{children.label}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import menu from "@/config/menu.config.js";
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: menu,
      isIndeterminate: false,
    };
  },
  created() {},
  methods: {
    handleCheckAllChange(val, children) {
      console.log(val);
      console.log(children);
      this.checkedCities = val ? menu : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-second {
  .right-text {
    color: #aaa;
    font-size: 14px;
  }
  .table {
    background: #fafbfc;
    border: 1px solid #fafbfc;
    .table-colums {
      display: grid;
      grid-template-columns: 100px auto;
      border-bottom: 1px solid #eef3fc;
      .table-msg {
        border-right: 1px solid #eef3fc;
        padding: 30px 0 30px 20px;
      }
      .table-main {
        display: grid;
        grid-template-columns: 200px 200px 200px;
        padding: 20px 0 20px 20px;
      }
    }
  }
}
</style>