<template>
  <div id="app" v-cloak>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
     <div class="returnTop" @click="returnTopFn" ref="returnTopRef">
       <img src="./assets/image/returnTop.png" alt="">
	   <span>顶部</span>
     </div>
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
      returnTopButton : false,
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
    debugger
     // console.log(document.documentElement.clientHeight)
     window.addEventListener('scroll',this.handleScroll,true)
  },
  created() {},
  computed: {},
  methods: {
    handleScroll(){
      debugger
      let scrollTop =  document.body.scrollTop||document.documentElement.scrollTop || window.pageYOffset || document.body.scroll
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let data = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
	  // console.log( document.documentElement.scrollTop)
      let opacityValue =Math.round((scrollTop+windowHeight)/document.body.scrollHeight*100)/100;
      console.log(scrollTop)
      if(data&&scrollTop>150){
        this.$refs.returnTopRef.style.opacity = 1
      }else{
         this.$refs.returnTopRef.style.opacity = 0
      }
    },
    returnTopFn(){
      debugger
      let scrollTop = document.body.scrollTop||document.documentElement.scrollTop || window.pageYOffset || document.body.scroll
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
	  // console.log(scrollTop+windowHeight)
      for(let i=0;i<(scrollTop+windowHeight);i++){
        var clearReturn = setTimeout(()=>{
          document.body.scrollTop--
		  window.pageYOffset--
		  document.body.scroll--
		  document.documentElement.scrollTop--
        },10)
      }

    }
  }
};
</script>

<style>
html{
	height: 100%;
}
body {
  /* background-color:#FFFFFF; */
  /* height: 100%; */
  width: 100%;
}

#app {
  font-family: "苹方-简 常规体", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  height: 100%;
  /* background-color: #F5F5F5; */
}

[v-cloak] {
  display: none;
}
.returnTop{
  z-index: 9999;
  position: fixed;
  right: .3rem;
  bottom: 1rem;
  opacity: 0;
  width: .4rem;
  height: .4rem;
  /* line-height: .4rem; */
  text-align: center;
  border-radius: 50%;
  background-color: #FFFFFF;
}
.returnTop img{
  background: none;
  border: none;
  width: .18rem;
  display: block;
  margin: 0rem auto;
  margin-top: .045rem;
  /* height: .5rem; */
}
.returnTop span{
	display: block;
	font-size: 12px;
	transform:scale(0.85);
}
</style>
