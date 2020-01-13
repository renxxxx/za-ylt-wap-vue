<template>
  <div id="app" v-cloak ref='appRef'>
    <keep-alive>
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
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
      // returnHomePageData : false,
    };
  },
  beforeCreate() {},
  beforeRouteLeave(to, from, next) {
    debugger;
   
	this.scrollTop =document.documentElement.scrollTop || window.pageYOffset || this.$refs.appRef.scrollTop
	if(!to.query.time || !from.query.time || to.query.time < from.query.time){
		 debugger
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
    debugger
    // let lastRoute = JSON.parse(localStorage.getItem('lastRoute'))
    // console.log(document.documentElement.clientHeight)
    window.addEventListener("scroll", this.handleScroll, true);
  },
  created() {
    let vm = this
     debugger;
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
			debugger
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
      console.log(this.$store.state.account.data.data)
      switch (this.$store.state.isLogin) {
        case 100:
          if(this.$store.state.account.data.data.type == 1){
            this.$router.replace({name:'promoters_index',query:{time:new Date().getTime()}});
					}else{
            this.$router.replace({name:'hospital_index',query:{time:new Date().getTime()}});
					}
          break;
        case 200:
          this.$router.replace({name:'hospital_sourceManagement',query:{time:new Date().getTime()}})
          break;
        case 300:
          this.$router.replace({name:'outpatient_index',query:{time:new Date().getTime()}})
          break;
        default:
          break;
      }
    // this.returnHomePageData = false;
    },
  }
};
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
</style>
