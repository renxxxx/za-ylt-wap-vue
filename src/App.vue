<template>
  <div id="app" ref='appRef'>
    <!-- <keep-alive> -->
    <router-view />

    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  // name: "App",
  // provide() {
  //   return {
  //     reload: this.reload
  //   };
  // },
  // data() {
  //   return {
  //     returnTopButton: false,
  //     isRouterAlive: true,
  //     //默认滑动方向
  //     direction: "slide-left",
  //     // 触发距离
  //     touchLeft: swidth*2/5,
  //     touchStartPoint: 0,
  //     distance: 0,backBtn: null,

  //     // 滑动距离长度
  //     sliderLength : [],
  //   };
  // },
  // beforeCreate() {
  //   debugger
  // },
  // beforeRouteLeave(to, from, next) {
  //   debugger
	// this.scrollTop =document.documentElement.scrollTop || window.pageYOffset || this.$refs.appRef.scrollTop
	// if(!to.query.time || !from.query.time || to.query.time < from.query.time){
  //           if (this.$vnode && this.$vnode.data.keepAlive)
  //           {
  //               if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
  //               {
  //                   if (this.$vnode.componentOptions)
  //                   {
  //                       var key = this.$vnode.key == null
  //                                   ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
  //                                   : this.$vnode.key;
  //                       var cache = this.$vnode.parent.componentInstance.cache;
  //                       var keys  = this.$vnode.parent.componentInstance.keys;
  //                       if (cache[key])
  //                       {
  //                           if (keys.length) {
  //                               var index = keys.indexOf(key);
  //                               if (index > -1) {
  //                                   keys.splice(index, 1);
  //                               }
  //                           }
  //                           delete cache[key];
  //                       }
  //                   }
  //               }
	// 		}
  //           this.$destroy();
	// 	}
	// next();
  // },
  // //进入该页面时，用之前保存的滚动位置赋值
  // beforeRouteEnter(to, from, next) {
  //   debugger
  //   next(vm => {
	//  document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
	// });

  // },
  // computed:{
  //   ...mapGetters(['returnHomePageData','includedComponents'])
	// },
  // mounted() {
  //   debugger
  //   // let lastRoute = JSON.parse(localStorage.getItem('lastRoute'))
  //   // console.log(document.documentElement.clientHeight)
  //   window.addEventListener("scroll", this.handleScroll, true);
  // },

  name: 'App',
  watch:{
     $route(to,from){
         if(!to.query.time || !from.query.time || to.query.transition=='def')
            this.direction = "";
         else if(to.query.time > from.query.time)
             this.direction = "slide-left";
         else
             this.direction = "";
     }
  },
  // beforeRouteLeave(to, from, next) {
  // this.scrollTop =document.documentElement.scrollTop || window.pageYOffset || this.$refs.appRef.scrollTop
  // if(!to.query.time || !from.query.time || to.query.time < from.query.time){
  //           if (this.$vnode && this.$vnode.data.keepAlive)
  //           {
  //               if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
  //               {
  //                   if (this.$vnode.componentOptions)
  //                   {
  //                       var key = this.$vnode.key == null
  //                                   ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
  //                                   : this.$vnode.key;
  //                       var cache = this.$vnode.parent.componentInstance.cache;
  //                       var keys  = this.$vnode.parent.componentInstance.keys;
  //                       if (cache[key])
  //                       {
  //                           if (keys.length) {
  //                               var index = keys.indexOf(key);
  //                               if (index > -1) {
  //                                   keys.splice(index, 1);
  //                               }
  //                           }
  //                           delete cache[key];
  //                       }
  //                   }
  //               }
  // 		}
  //      this.$destroy();
  // 	}
  // next();
  // },
  // //进入该页面时，用之前保存的滚动位置赋值
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //  document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
  // });

  // },
  // // created() {
  //   // console.log(this.$route.fullPath)
    
  //   let vm = this
  //   let isLogin = localStorage.getItem("isLogin");
  //   // let lastRoute = JSON.parse(localStorage.getItem('lastRoute'))
  //   // console.dir(lastRoute)
  //   localStorage.removeItem("isLogin");
  //   this.$store.state.isLogin = 0;
  //   if (isLogin && !isNaN(parseInt(isLogin))) {
  //     isLogin = parseInt(isLogin);
  //     switch (isLogin) {
  //       case 100:
  //         getdata("/hospital/login-refresh", 100);
  //         break;
  //       case 200:
  //         getdata("/clinic/login-refresh", 200);
  //         break;
  //       case 300:
  //         getdata("/manager/login-refresh", 300);
  //         break;
  //       default:
  //         break;
  //     }
  //     let lastRoute = JSON.parse(localStorage.getItem('lastRoute'));
	 //  console.log(lastRoute)
  //     // localStorage.removeItem("lastRoute");
  //     debugger
  //      if(this.$store.state.isLogin == 100){
  //       if(vm.$store.state.account.data.data.type == 1){
  //         //this.$router.replace({ name : 'promoters',query:{time:new Date().getTime()}});
  //         //this.$router.replace(lastRoute)
  //       }else{
  //         //this.$router.replace({ name : 'hospital_index',query:{time:new Date().getTime()}})
  //         //this.$router.replace(lastRoute)
  //       }
  //     }else  if(this.$store.state.isLogin == 200){
  //     	this.$router.replace({ name : 'outpatient_index',query:{time:new Date().getTime()}})
  //     	//this.$router.replace(lastRoute)
  //     }else  if(this.$store.state.isLogin == 300){
  //     	this.$router.replace({ name : 'chooseTheType',query:{time:new Date().getTime()}})
  //     	//this.$router.replace(lastRoute)
  //     }
  //   }
  //   function getdata(_postRefresh, _isLogin) {
  //     vm.$jquery.ajax({
  //       type: "post",
  //       url: _postRefresh,
  //       async: false,
  //       success: function(res) {
  //         if (res.code == 0) {
  //           vm.$store.state.isLogin = _isLogin;
  //           localStorage.setItem("isLogin",_isLogin);
  //           switch (_isLogin) {
  //             case 100:
  //               vm.$store.state.account.hospitalId =
  //                 res.data.hospital.hospitalId;
  //               vm.$store.state.account.data = {};
  //               vm.$store.state.account.data = res;
  //               break;

  //             case 200:
  //               vm.$store.state.account.clinicId =
  //                 res.data.clinic.clinicId;
  //               vm.$store.state.account.hospitalId =
  //                 res.data.hospital.hospitalId;
  //               vm.$store.state.account.data = {};
  //               vm.$store.state.account.data = res;
  //               break;

  //             case 300:
  //               // vm.$store.state.account.clinicId =
  //                 // res.data.clinic.clinicId;
  //               // vm.$store.state.account.hospitalId =
  //                 // res.data.hospital.hospitalId;
  //               // vm.$store.state.account.data = {};
  //               // vm.$store.state.account.data = res;
  //               break;
  //           }
  //         }
  //       },

  //     });
  //   }
  // },
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

</style>
