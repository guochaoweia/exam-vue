import Vue from "vue";
import JurisTable from "@/components/JurisTable.vue";
import TitleAll from "@/components/TitleAll.vue";
import AllTask from "@/components/AllTask.vue";
import TaskForm from "@/components/TaskForm.vue";
Vue.component('el-juris', JurisTable)
Vue.component('el-title', TitleAll)
Vue.component('el-task', AllTask)
Vue.component('el-taskform', TaskForm)