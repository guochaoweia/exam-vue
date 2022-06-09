<template>
  <div class="about"></div>
</template>


<script>
export default {
  data() {
    return {};
  },
  created() {
    // var arr = [11, 2, 2, 5, 25, 22505, 41522, 825, 584, 11];
    // function find(arr, cb) {
    //   let res;
    //   for (var i = 0; i < arr.length; i++) {
    //     let result = cb(arr[i]);
    //     if (result) {
    //       res = result;
    //     }
    //     break;
    //   }
    //   return res;
    // }
    // let cb = function (item) {
    //   if (item > 5) {
    //     return item;
    //   }
    //   console.log(item);
    // };
    // let num = find(arr, cb);
    // console.log(num);
    //  var arr = [11, 2, 2, 5, 25, 22505, 41522, 825, 584, 11];
    //     let res;
    //     function find(arr) {
    //       for (var i = 0; i < arr.length; i++) {
    //         let resusd = cb(arr[i]);
    //         if (resusd) {
    //           res = resusd;
    //           break;
    //         }
    //         return res;
    //       }
    //     }
    //     find(arr);
    //     console.log(res);
    //     function cb(item) {
    //       if (item > 5) {
    //         return item;
    //       }
    //     }
    // class Vue {
    //   constructor() {}
    //   count(a, b) {
    //     return a + b;
    //   }
    //   $message(options) {
    //     alert((options.type == "success" ? "成功" : "错误") + options.message);
    //   }
    // }
    // let vm = new Vue();
    // let res = vm.count(10, 20);
    // console.log(res);
    // vm.$message({
    //   type: "warning",
    //   message: "用户名密码错误",
    // });
    // class Animal {
    //   constructor(name) {
    //     this.name = name;
    //   }
    //   can(run) {
    //     // run.call(dog);
    //     this.run = run;
    //   }
    // }
    // let dog = new Animal("xiaogou");
    // function run() {
    //   console.log(this.name + "跑起来了");
    // }
    // dog.can(run);
    // dog.run();
    // class Vue {
    //   constructor(options) {
    //     this.created = options.created;
    //     setTimeout = function () {
    //       this.created();
    //     };
    //   }
    //   static use(fn) {
    //     fn(Vue);
    //   }
    // }
    // let vm = new Vue({
    //   created() {
    //     // Vue.$message();
    //     this.$message();
    //     console.log(vm);
    //   },
    // });
    // function fn(Vue) {
    //   // console.log(Vue);
    //   // Vue.$message = function () {
    //   //   console.log("hello world");
    //   // };
    //   Vue.prototype.$message = function () {
    //     console.log("hello world");
    //   };
    // }
    // Vue.use(fn);
  },
};
</script>
<style lang="scss" scoped>
</style>
