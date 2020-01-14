<template>
  <div id="app" v-cloak ref='appRef' v-on:touchstart="bodyTouchStart" v-on:touchmove="bodyTouchMove" v-on:touchend="bodyTouchEnd">
    <!-- <transition :name="direction"> -->
      <keep-alive include="home">
        <router-view v-if="isRouterAlive" class="appView"></router-view>
      </keep-alive>
    <!-- </transition> -->
    <div class="returnHomePage" @click="returnHomePageFn" ref="returnHomePageRef" v-show="returnHomePageData">
      <img src="./assets/image/returnHome.png" alt />
      <span>首页</span>
    </div>
    <div class="returnTop" @click="returnTopFn" ref="returnTopRef">
      <img src="./assets/image/returnTop.png" alt />
      <span>顶部</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import Vue from 'vue'
var swidth = document.documentElement.clientWidth;
// import Store from '../store'
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      returnTopButton: false,
      isRouterAlive: true,
      //默认滑动方向
      direction: "slide-left",
      // 触发距离
      touchLeft: swidth*2/5,
      touchStartPoint: 0,
      distance: 0,backBtn: null,
      
      // 滑动距离长度
      sliderLength : [],
    };
  },
  beforeCreate() {},
  beforeRouteLeave(to, from, next) {
	this.scrollTop =document.documentElement.scrollTop || window.pageYOffset || this.$refs.appRef.scrollTop
	if(!to.query.time || !from.query.time || to.query.time < from.query.time){
            if (this.$vnode && this.$vnode.data.keepAlive)
            {
                if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
                {
                    if (this.$vnode.componentOptions)
                    {
                        var key = this.$vnode.key == null
                                    ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                                    : this.$vnode.key;
                        var cache = this.$vnode.parent.componentInstance.cache;
                        var keys  = this.$vnode.parent.componentInstance.keys;
                        if (cache[key])
                        {
                            if (keys.length) {
                                var index = keys.indexOf(key);
                                if (index > -1) {
                                    keys.splice(index, 1);
                                }
                            }
                            delete cache[key];
                        }
                    }
                }
			}
            this.$destroy();
		}
	next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
    next(vm => {
	 document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
	});

  },
  
  computed:{
    ...mapGetters(['returnHomePageData'])
	},
  mounted() {
    // let lastRoute = JSON.parse(localStorage.getItem('lastRoute'))
    // console.log(document.documentElement.clientHeight)
    window.addEventListener("scroll", this.handleScroll, true);
  },
  watch:{
    $route(to,from){
        console.log(to);
        console.log(from)
        console.log(this.$router.app._route.name)
        if(!to.query.time || !from.query.time || to.query.transition=='def')
           this.direction = "";
        else if(to.query.time > from.query.time)
            this.direction = "slide-left";
        else
            this.direction = "";
        // if(to.name !="promoters_index"&&to.name !="promoters_cilnic"&&to.name !="promoters_user"&&
        // to.name !="hospital_index"&&to.name !="hospital_clinic"&&to.name !="hospital_gene"&&to.name !="hospital_user"&&
        // to.name !="hospital_sourceManagement"&& to.name !="outpatient_hospital"&&to.name !="outpatient_gene"&&to.name !="outpatient_user"){
        //   // this.direction = to.meta.auth? "slide-left" : "slide-right";
        //   this.direction = to.meta.auth? "" : "slide-right";
        // }else{
        //   this.direction=- ''
        // }
    }
 },
  created() {
    let vm = this
    let isLogin = localStorage.getItem("isLogin");
    localStorage.removeItem("isLogin");
    this.$store.state.isLogin = 0;
    if (isLogin && !isNaN(parseInt(isLogin))) {
      isLogin = parseInt(isLogin);
      switch (isLogin) {
        case 100:
          getdata("/hospital/login-refresh", 100);
          break;
        case 200:
          getdata("/clinic/login-refresh", 200);
          break;
        case 300:
          getdata("/manager/login-refresh", 300);
          break;
        default:
          break;
      }
    }
    function getdata(_postRefresh, _isLogin) {
      vm.$jquery.ajax({
        type: "post",
        url: _postRefresh,
        async: false,
        success: function(res) {
          if (res.code == 0) {
            vm.$store.state.isLogin = _isLogin;
            localStorage.setItem("isLogin",_isLogin);
            switch (_isLogin) {
              case 100:
                vm.$store.state.account.hospitalId =
                  res.data.hospital.hospitalId;
                vm.$store.state.account.data = {};
                vm.$store.state.account.data = res;
                break;

              case 200:
                vm.$store.state.account.clinicId =
                  res.data.clinic.clinicId;
                vm.$store.state.account.hospitalId =
                  res.data.hospital.hospitalId;
                vm.$store.state.account.data = {};
                vm.$store.state.account.data = res;
                break;

              case 300:
                vm.$store.state.account.clinicId =
                  res.data.clinic.clinicId;
                vm.$store.state.account.hospitalId =
                  res.data.hospital.hospitalId;
                vm.$store.state.account.data = {};
                vm.$store.state.account.data = res;
                break;
            }
          }
        }
      });
    }
  },
  methods: {
    reload() {
      debugger;
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    // 滑动一定距离出现返回顶部按钮
    handleScroll() {
      let scrollTop =
        this.$refs.appRef.scrollTop ||
        this.$refs.appRef.scrollTop ||
        this.$refs.appRef.pageYOffset;
      let windowHeight =
        document.documentElement.clientHeight || this.$refs.appRef.clientHeight;
      let data =
        this.$refs.appRef.scrollHeight >
        (window.innerHeight || document.documentElement.clientHeight);
      // console.log( document.documentElement.scrollTop)
      let opacityValue =
        Math.round(
          ((scrollTop + windowHeight) / this.$refs.appRef.scrollHeight) * 100
        ) / 100;
      // console.log(scrollTop)
      if (data && scrollTop > 1000) {
        this.$refs.returnTopRef.style.opacity = 1;
        this.$refs.returnHomePageRef.style.bottom = '1.5rem';
      } else {
        debugger
        this.$refs.returnTopRef.style.opacity = 0;
        this.$refs.returnHomePageRef.style.bottom = '1rem';
      }
    },
    // 返回列表顶部按钮
    returnTopFn() {
      var scrollTop =
        this.$refs.appRef.scrollTop ||
        this.$refs.appRef.scrollTop ||
        this.$refs.appRef.pageYOffset;
      let windowHeight =
        document.documentElement.clientHeight || this.$refs.appRef.clientHeight;
      for (let i = 0; i < (scrollTop + windowHeight); i++) {
        var clearReturn = setTimeout(() => {
          this.$refs.appRef.scrollTop--;
          window.pageYOffset--;
          this.$refs.appRef.scroll--;
          document.documentElement.scrollTop--;
        }, 5);
      }
      this.$refs.returnHomePageRef.style.bottom = '.6rem';
      this.$refs.returnTopRef.style.opacity = 0;
    },
    // 返回首页按钮触发事件
		returnHomePageFn(){
      debugger
      // console.log(this.$store.state.account.data.data)
      switch (this.$store.state.isLogin) {
        case 100:
          if(this.$store.state.account.data.data.type == 1){
            this.$router.replace({name:'promoters_index',query:{time:new Date().getTime(),transition:'def'}});
					}else{
            this.$router.replace({name:'hospital_index',query:{time:new Date().getTime(),transition:'def'}});
					}
          break;
        case 200:
          this.$router.replace({name:'hospital_sourceManagement',query:{time:new Date().getTime(),transition:'def'}})
          break;
        case 300:
          this.$router.replace({name:'outpatient_index',query:{time:new Date().getTime(),transition:'def'}})
          break;
        default:
          break;
      }
    // this.returnHomePageData = false;
    },
    bodyTouchStart: function(event) {
      // console.log(event)
      this.backBtn = document.getElementById("navback");
      this.touchTimeFrom=new Date();
      // if (this.backBtn) {
      //   // 获得起点X坐标，初始化distance为0
      //   this.touchStartPoint = event.targetTouches[0].pageX;
      //   this.distance = 0;
      // }
    },
    bodyTouchMove: function(event) {
      this.sliderLength.push(event.targetTouches[0].clientX)

      // console.log(this.sliderLength)
      // console.log(event.targetTouches[0].clientX)
      // if (this.backBtn && this.touchStartPoint < this.touchLeft) {
      //   // 只监听单指划动，多指划动不作响应
      //   if (event.targetTouches.length > 1) {
      //     return;
      //   }
      //   // 实时计算distance
      //   this.distance = event.targetTouches[0].pageX - this.touchStartPoint;
      //   // 根据distance在页面上做出反馈。这里演示通过返回按钮的背景变化作出反馈
      //   if (this.distance > 0 && this.distance < 100) {
      //     this.backBtn.style.backgroundPosition = ((this.distance - 100) / 100) * 50 + "px 0";
      //   }else if (this.distance >= 100) {
      //     this.backBtn.style.backgroundPosition = "0 0";
      //   }else{
      //     this.backBtn.style.backgroundPosition = "-50px 0";
      //   }
      // }
    },
    bodyTouchEnd: function(event) {
       this.touchTimeTo=new Date();
      // console.log(this.touchStartPoint)
      // console.log(this.touchLeft)
      var sliderData = '';
      for(let i=0;i<this.sliderLength.length;i++){
        sliderData = this.sliderLength[i]-this.sliderLength[0]>window.screen.height*0.3? true : false
      }
      if (sliderData && (this.touchTimeTo.getTime()-this.touchTimeFrom.getTime()) < 800 ) {
        // 划动结束，重置数据
        this.$router.back()
        this.touchStartPoint = 0;
        // this.backBtn.style.backgroundPosition = "-50px 0";
        // 当划动距离超过100px时，触发返回事件
        if (this.distance > 100) {
          // 返回前修改样式，让过渡动画看起来更快
            // document.getElementById("app").classList.add("quickback");
            // setTimeout(function(){
            //   document.getElementById("app").classList.remove("quickback");
            // },250)
          }
        }
      this.sliderLength= []
    }     
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  /* background-color:#FFFFFF; */
  height: 100%;
  width: 100%;
}
img {
  object-fit: cover
}

img[lazy="loading"]{
   
    object-fit:scale-down!important;
 }

img[lazy="error"]{
    object-fit:scale-down!important;
 }

#app {
  font-family: "苹方-简 常规体", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  height: 100%;
  overflow: scroll;
  /* background-color: #F5F5F5; */

   overflow-y: scroll;
	touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
}

[v-cloak] {
  display: none;
}
.returnTop {
  z-index: 9997;
  position: fixed;
  right: 0.2rem;
  bottom: 1rem;
  opacity: 0;
  width: 0.4rem;
  height: 0.4rem;
  /* line-height: .4rem; */
  text-align: center;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #bfbebe;
}
.returnTop img {
  background: none;
  border: none;
  width: 0.18rem;
  display: block;
  margin: 0rem auto;
  margin-top: 0.045rem;
  /* height: .5rem; */
}

.returnTop span{
	display: block;
	font-size: 12px;
	transform:scale(0.85);
}

.returnHomePage{
  z-index: 9999;
  position: fixed;
  right: 0.2rem;
  bottom: 1rem;
  opacity: 1;
  width: 0.4rem;
  height: 0.4rem;
  /* line-height: .4rem; */
  text-align: center;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #bfbebe;
}

.returnHomePage img {
  background: none;
  border: none;
  width: 0.18rem;
  display: block;
  margin: 0rem auto;
  margin-top: 0.045rem;
  /* height: .5rem; */
}

.returnHomePage span{
	display: block;
	font-size: 12px;
	transform:scale(0.85);
}


#app {
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
      width: 100%;
      overflow-x: hidden;
 }
 .appView {
     position: absolute;
     width: 100%;
     background: #fff;
     min-height: 100vh;
     transition: transform 0.24s ease-out;
 }
 #app.quickback .appView{
     transition-duration: 10s;
 }
 .slide-left-enter {
     transform: translate(100%, 0);
 }
 .slide-left-leave-active {
     transform: translate(-50%, 0);
 }
 .slide-right-enter {
     transform: translate(-50%, 0);
 }
 .slide-right-leave-active {
     transform: translate(100%, 0);
 }
</style>
