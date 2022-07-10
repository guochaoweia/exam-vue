<template>
  <div class="tags-second">
    <div class="flex-between">
      <div class="right-text">设置角色对应的功能操作、应用管理、后台管理权限</div>
    </div>
    <div class="table mt-10">
      <div v-for="item in menu" :label="item.label" :key="item.name" class="item">
        <el-checkbox
          class="mt-15"
          :indeterminate="item.isIndeterminate"
          v-model="item.checkAll"
          @change="handleCheckAllChange($event,item)"
        >{{item.label}}</el-checkbox>
        <div style="margin: 10px 0;"></div>
        <template v-if="item.children">
          <el-checkbox-group v-model="item.arr" @change="handleCheckedCitiesChange($event,item)">
            <el-checkbox
              v-for="children in item.children"
              :key="children"
              :label="children"
            >{{children}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import menus from "@/config/menu.config.js";
export default {
  data() {
    return {
      checkedCities: [],
      menu: [],
      isIndeterminate: false,
    };
  },
  watch: {
    
  },
  async created() {
    this.menu = menus.map((data) => {
      let item = JSON.parse(JSON.stringify(data));
      item.checkAll = false;
      item.isIndeterminate = false;
      item.children = item.children.map((el) => {
        return el.label;
      });
      item.arr = [];
      return item;
    });
  },
  methods: {
    handleCheckAllChange(val, item) {
      // console.log(item);
      item.isIndeterminate = false;
      item.arr = val ? item.children : [];
    },
    handleCheckedCitiesChange(value, el) {
      let checkedCount = value.length;
      el.checkAll = checkedCount === el.children.length;
      el.isIndeterminate =
        checkedCount > 0 && checkedCount < el.children.length;
      console.log(el.isIndeterminate);
      this.$emit("checkboxVal", this.menu);
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
    .item {
      padding: 0 15px 15px 15px;
      border-bottom: 1px solid #eef3fc;
    }
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