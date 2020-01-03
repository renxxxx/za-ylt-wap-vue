<template>
  <div id="app" v-cloak>
    <keep-alive>
		<router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
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
      isRouterAlive: true
    };
  },
  beforeCreate() {},
  beforeRouteLeave(to, from, next) {
    debugger;
	this.scrollTop =document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
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
	  document.documentElement.scrollTop=document.body.scrollTop = vm.scrollTop;
	});
	
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
    if (isLogin && !isNaN(parseInt(isLogin))) {
      isLogin = parseInt(isLogin);
      this.$store.state.shop.isLogin = isLogin;
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
    } else {
      localStorage.removeItem("isLogin");
      this.$store.state.shop.isLogin = 0;
    }

    function getdata(_postRefresh, _isLogin) {
			debugger
      vm.$jquery.ajax({
        type: "post",
        url: _postRefresh,
        async: false,
        success: function(res) {
          if (res.code == 0) {
            switch (_isLogin) {
              case 100:
                vm.$store.state.shop.account.hospitalId =
                  res.data.hospital.hospitalId;
                vm.$store.state.shop.account.data = {};
                vm.$store.state.shop.account.data = res;
                break;

              case 200:
                vm.$store.state.shop.account.clinicId =
                  res.data.clinic.clinicId;
                vm.$store.state.shop.account.hospitalId =
                  res.data.hospital.hospitalId;
                vm.$store.state.shop.account.data = {};
                vm.$store.state.shop.account.data = res;
                break;

              case 300:
                vm.$store.state.shop.account.clinicId =
                  res.data.clinic.clinicId;
                vm.$store.state.shop.account.hospitalId =
                  res.data.hospital.hospitalId;
                vm.$store.state.shop.account.data = {};
                vm.$store.state.shop.account.data = res;
                break;
            }
          } else {
            localStorage.removeItem("isLogin");
            vm.$store.state.shop.isLogin = 0;
          }
        }
      });
    }
  },
  computed: {},
  methods: {
    reload() {
      debugger;
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    handleScroll() {
      let scrollTop =
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scroll;
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let data =
        document.body.scrollHeight >
        (window.innerHeight || document.documentElement.clientHeight);
      // console.log( document.documentElement.scrollTop)
      let opacityValue =
        Math.round(
          ((scrollTop + windowHeight) / document.body.scrollHeight) * 100
        ) / 100;
      // console.log(scrollTop)
      if (data && scrollTop > 150) {
        this.$refs.returnTopRef.style.opacity = 1;
      } else {
        this.$refs.returnTopRef.style.opacity = 0;
      }
    },
    returnTopFn() {
      let scrollTop =
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scroll;
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // console.log(scrollTop+windowHeight)
      for (let i = 0; i < scrollTop + windowHeight; i++) {
        var clearReturn = setTimeout(() => {
          document.body.scrollTop--;
          window.pageYOffset--;
          document.body.scroll--;
          document.documentElement.scrollTop--;
        }, 10);
      }
    }
  }
};
</script>

<style>
html {
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
.returnTop {
  z-index: 9999;
  position: fixed;
  right: 0.3rem;
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
</style>
