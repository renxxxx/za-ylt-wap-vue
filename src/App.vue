<template>
  <div id="app" v-cloak>
    <transition :name="transitionName">
     <router-view></router-view>
    </transition>
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
      transitionName: null
    };
  },
  beforeCreate() {},
  mounted() {
    // debugger
    // let lastRoute = JSON.parse(localStorage.getItem('lastRoute'))
  },
  created() {},
  watch: {
    $route(to, from) {
		debugger
      //目标导航下标和离开导航下标进行比较
      if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  },
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
