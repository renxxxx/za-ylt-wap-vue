<template>
  <div id="app" v-cloak>
    <keep-alive>
      <router-view></router-view>
     </keep-alive>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
// import Store from '../store'
export default {
  name: "App",
  data() {
    return {
    };
  },
  beforeCreate() {},
  beforeRouteLeave(to, from, next) {
    debugger;
    this.scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
    debugger;
    next(vm => {
      document.body.scrollTop = vm.scrollTop;
    });
  },mounted(){
    // debugger
    // let lastRoute = JSON.parse(localStorage.getItem('lastRoute'))
  },
  created() {},
 
  computed: {},
  methods: {}
};
</script>

<style>
body {
  /* background-color:#FFFFFF; */
  height: 100%;
  width: 100%;
}

#app {
  font-family: "苹方-简 常规体", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  /* background-color: #F5F5F5; */
}

[v-cloak] {
  display: none;
}
</style>
