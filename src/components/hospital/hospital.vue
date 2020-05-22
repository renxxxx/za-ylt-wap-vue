<template>
  <div id="hospital" ref='hospitalRef' :style="{'margin-bottom':bottomShow?'0':'' }" @touchstart='touchStartFn' @touchend='touchEndFn'>

  <keep-alive>
    <!-- <topSolt> -->
      <router-view  class="appView"></router-view>
    <!-- </topSolt> -->
  </keep-alive>

  <!-- <div class="returnHomePage" @click="returnHomePageFn" id="returnHomePageId" ref="returnHomePageRef" v-show="hospitalReturnHomePage">
    <img src="../../assets/image/returnHome.png" alt />
    <span>首页</span>
  </div> -->
  <!-- <div class="returnTop" @click="returnTopFn" ref="returnTopRef" v-show="hospitalReturnTopPage">
    <img src="../../assets/image/returnTop.png" alt />
    <span>顶部</span>
  </div> -->
  <van-tabbar v-model="active" route :style="{'padding-bottom':$store.state.paddingBottom}" v-if="bottomShow">
  	<van-tabbar-item replace :to="{path : '/hospital/hospital_index',query:{transition:'def'}}">
  	    <span>首页</span>
  	    <img
  			slot="icon"
  			slot-scope="props"
  			:src="props.active ? index.inactive : index.active"
  	    />
  	</van-tabbar-item>
  	<van-tabbar-item replace :to="{path:'/hospital/hospital_clinic',query:{transition:'def'}}">
  	    <img
  			slot="icon"
  			slot-scope="props"
  			:src="props.active ? hospital.inactive : hospital.active"
  	    >
  	    <span>门诊</span>
  	</van-tabbar-item>
    <!-- /hospital/hospital_gene -->
  	<van-tabbar-item replace :to="{path:'/hospital/hospital_source',query:{transition:'def'}}">
  	    <span>病员</span>
  	    <img
  			slot="icon"
  			slot-scope="props"
  			:src="props.active ? gene.inactive : gene.active"
  	    >
  	</van-tabbar-item>
  	<van-tabbar-item replace :to="{path:'/hospital/hospital_user',query:{transition:'def'}}">
  	    <span>我的</span>
  	    <img
  			slot="icon"
  			slot-scope="props"
  			:src="props.active ? my.inactive : my.active"
  	    >
  	</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import topSolt from "./function/topSolt.vue";

export default {
  name: 'hospital',
  data(){
  	return{
      active: 0,
      index:{
          active: require('../../assets/image/shouye@2x.png'),
          inactive: require('../../assets/image/shouye-blue@2x.png')
      },
      hospital:{
          active: require('../../assets/image/menzhen@2x.png'),
          inactive: require('../../assets/image/menzhen-blue@2x.png')
      },
      gene:{
          active: require('../../assets/image/jiyin-gray@2x.png'),
          inactive: require('../../assets/image/jiyin-blue@2x.png')
      },
      my:{
          active: require('../../assets/image/wode@2x.png'),
          inactive: require('../../assets/image/wode-blue@2x.png')
      },
	  startLength:0,
	  overLength:0,
	  startLengthY:0,
	  overLengthY:0,
    }
  },
  props:['name'],
 
  computed:{
    hospitalReturnTopPage: {
      get: function() {
        // 
        return this.$store.state.hospitalReturnTopPage;
      },
      set: function(newValue) {
        this.$store.state.hospitalReturnTopPage = newValue;
      }
    },
    ...mapGetters(['bottomShow','hospitalReturnHomePage','account','isLogin'])
  },
  created(){
        let thisVue = this
        $.ajax({
			  url:'/hospital/login-refresh',
			  type:'get',
			  async:false,
			  success:function(res){
			    if(res.code == 0){
					  thisVue.$store.state.hospital.login=res.data
			    }
			  }
      })
  },
  components: {
    topSolt
  },
  mounted(){
   
    // window.addEventListener("scroll", this.handleScroll, true);
  },
  activated(){
    

    localStorage.setItem("entrance",1)
  },
  watch:{

  },
  methods:{
    upgradeFn(){
      this.$toast.setDefaultOptions({ duration: 1000 });
      this.$toast("升级中");
    },
	touchStartFn(_value){
		this.startLengthY = _value.changedTouches[0].screenY;
		this.startLength = _value.changedTouches[0].screenX
	},
	touchEndFn(_value){
		this.overLength = _value.changedTouches[0].screenX;
		this.overLengthY = _value.changedTouches[0].screenY
		if((this.overLength-this.startLength)>100 && (this.startLengthY - this.overLengthY) < 150){
			this.$router.back()
		}
	},
    // 滑动一定距离出现返回顶部按钮
    // handleScroll() {
    //   if(!this.$refs.hospitalRef)
    //     return
    //   let scrollTop =
    //     this.$refs.hospitalRef.scrollTop ||
    //     this.$refs.hospitalRef.pageYOffset;
    //   let windowHeight =
    //     document.documentElement.clientHeight || this.$refs.hospitalRef.clientHeight;
    //   let data =
    //     this.$refs.hospitalRef.scrollHeight >
    //     (window.innerHeight || document.documentElement.clientHeight);
    //   // 
    //   let opacityValue =
    //     Math.round(
    //       ((scrollTop + windowHeight) / this.$refs.hospitalRef.scrollHeight) * 100
    //     ) / 100;
    //   // 
    //   if (data && scrollTop > 800) {
    //     this.hospitalReturnTopPage = true;
    //     this.$refs.returnTopRef.style.opacity = 1;
    //     document.getElementById("returnHomePageId").style.bottom = '1.5rem';
    //   } else {
    //     debugger
    //     this.$refs.returnTopRef.style.opacity = 0;
    //     document.getElementById("returnHomePageId").style.bottom = '1rem';
    //     this.hospitalReturnTopPage = false;
    //   }
    // },
    // 返回列表顶部按钮
    // returnTopFn() {
		// debugger
    //   var scrollTop =
    //     this.$refs.hospitalRef.scrollTop ||
    //     this.$refs.hospitalRef.scrollTop ||
    //     this.$refs.hospitalRef.pageYOffset;
    //   let windowHeight =
    //     document.documentElement.clientHeight || this.$refs.hospitalRef.clientHeight;
    //   for (let i = 0; i < (scrollTop + windowHeight); i++) {
    //     var clearReturn = setTimeout(() => {
    //       this.$refs.hospitalRef.scrollTop--;
    //       window.pageYOffset--;
    //       this.$refs.hospitalRef.scroll--;
    //       document.documentElement.scrollTop--;
    //     }, 5);
    //   }
    //   document.getElementById("returnHomePageId").style.bottom = '.6rem';
    //   this.$refs.returnTopRef.style.opacity = 0;
    //   this.hospitalReturnTopPage = false;
    // },
    // 返回首页按钮触发事件
    returnHomePageFn(){
      
      if(this.$store.state.hospital.login.type == 1){
        this.$router.replace({path:'/promoters_index',query:{transition:'def'}});
      }else{
        this.$router.replace({path:'/hospital/hospital_index',query:{transition:'def'}});
      }
    },
  },
}
</script>

<style>
#hospital {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  
  /* overflow-y: scroll; */
	/* touch-action: pan-y; */
	/* -webkit-overflow-scrolling: touch; */
  /* overflow: scroll; */

}

.appView {
     /* position: absolute; */
     width: 100%;
     /* background: #fff; */
     min-height: 100vh;
     transition: transform 0.24s ease-out;
     /* height: 100%; */
     height: 100%;
    /* touch-action: pan-y; */
    /* -webkit-overflow-scrolling: touch; */
    /* overflow: scroll; */
    /* overflow-x: hidden; */
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
.returnHomePage{
  z-index: 99;
  position: fixed;
  right: 0.2rem;
  bottom: 1rem;
  opacity: 1;
  width: 0.4rem;
  height: 0.4rem;
  /* line-height: .4rem; */
  text-align: center;
  border-radius: 50%;
  background-color: rgba(255,255,255,.8);
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
.returnTop {
  z-index: 99;
  position: fixed;
  right: 0.2rem;
  bottom: 1rem;
  width: 0.4rem;
  height: 0.4rem;
  /* line-height: .4rem; */
  text-align: center;
  border-radius: 50%;
  background-color: rgba(255,255,255,.8);
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
