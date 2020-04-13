<template>
	<div class="index">
		<van-pull-refresh v-model="pullingDown" @refresh="afterPullDown" ref="refersh" >
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="topNav_search">
				<img src="../../../assets/image/sousuo@2x.png" alt="">
				<input type="search">
				<div class="shaixuan">
					<span>筛选</span>
					<img src="../../../assets/image/shaixuan.svg" alt="">
				</div>
			</div>
			<div class="topNav_Title">
				<h4>合作医院<span>473</span></h4>
				<router-link :to="{path:''}">
					<div class="addHospital">新增医院<img src="../../../assets/image/right@2x.png" alt=""></div>
				</router-link>
			</div>
		</div>
		<div style="width: 100%;height: 1rem;" :style="{'padding-top':$store.state.paddingTop}"></div>
		<clinicContent></clinicContent>
		<div style="height: .55rem;"></div>
		</van-pull-refresh>
	</div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import qs from "qs";
import { Dialog } from "vant";
import clinicContent from '../function/clinic_content.vue'
// import bottomNav from "./functionPage/bottomNav.vue";
// import moment from 'moment'
export default {
  name: "gene",
  data() {
    return {
      page: 1,
      pullingDown: false
    };
  },
  components: {
    clinicContent
  },
  computed: {
    // ...mapGetters(["account", "isLogin"])
  },

  beforeCreate(){
    
  },
  created() {

  },
  beforeRouteLeave(to, from, next) {
	
  let scrollTop = this.scrollTop =document.getElementById('operating').scrollTop;
this.scrollTop = scrollTop?scrollTop :0;

	
	
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
	  debugger;
     next(vm => {
       debugger
	 document.getElementById('operating').scrollTop=document.getElementById('operating').pageYOffset=vm.scrollTop;
  });
  
         let fromRoute =  JSON.stringify({path:from.path,name:from.name,query:from.query})
         let lastRoute = localStorage.getItem('lastRoute')
         
         
         if(fromRoute == lastRoute){
          localStorage.removeItem('lastRoute')
         }
   

  },
  beforeMount(){
    debugger
    
  },
  mounted() {
    debugger
    let thisVue = this;
    if (window.plus) {
      //plus.navigator.setStatusBarBackground("#ffffff");
      plus.navigator.setStatusBarStyle("dark");
    }
    
    let lastRoute = localStorage.getItem('lastRoute')
        if(lastRoute){
          this.$router.push(JSON.parse(lastRoute));
          return
        }
    this.initData();
  },
  activated(){
  },
  deactivated(){
    debugger
    },
  methods: {
    afterPullDown() {
      //下拉刷新
      setTimeout(() => {
        this.pullingDown = false;
        this.initData();
      }, 500);
    },
    initData() {
      let thisVue = this;
	  console.log(this.$store.state.operating.login)
      if(this.$route.meta.auth && !this.$store.state.operating.login)
      this.$toast({message:'请登录',onClose:function(){
        thisVue.$router.replace({ path : '/operating/operatingLogin',query:{time:1}});
      }})

      Object.assign(this.$data, this.$options.data());
      // this.getdata();
      this.$refs.clinic.initData();
    },
    getdata(_data) {
      // this.$axios.post("/c2/article/items",qs.stringify({
      //       hospitalId: this.$store.state.hospital.login.hospital.hospitalId,
      //       pn: this.page,
      //       ps: 10
      //     })
      //   )
      //   .then(res => {
      //     if (res.data.data.items.length != 0) {
      //       for (let i in res.data.data.items) {
      //         if (res.data.data.items[i]) {
      //           this.article.push({
      //             content: res.data.data.items[i].title,
      //             img: res.data.data.items[i].cover,
      //             time: res.data.data.items[i].alterTime,
      //             itemId: res.data.data.items[i].itemId
      //           });
      //         }
      //       }
      //       this.loading = false;
      //       // this.finished = true;
      //     } else {
      //       this.loading = false;
      //       this.finished = true;
      //     }
      //   })
      //   .catch(err => {
          
      //   });
    },
    // onLoad() {
    //   ++this.page;
      
    //   this.getdata();
    // },
  }
};
</script>

<style scoped>
.index{
	width: 100%;	
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	padding: 0px .16rem;
	box-sizing: border-box;
	position: fixed;
	background-color: #F5F5F5;
	z-index: 999;
	top: 0;
}
.topNav_search{
	width: 100%;
	height: .335rem;
	line-height: .335rem;
	position: relative;
}
.topNav_search>img{
	width: .13rem;
	height: .145rem;
	position: absolute;
	left: .15rem;
	top:0rem;
	bottom: 0rem;
	margin: auto 0rem;
}
.topNav_search>input{
	width: 82%;
	height: .335rem;
	background-color: #FFFFFF;
	border-radius: .17rem;
	box-sizing: border-box;
	padding: .06rem .1rem .06rem .39rem;
}
.shaixuan{
	height: 35px;
	/* line-height: 100%; */
	float: right;
}
.shaixuan span{
	font-size: .15rem;
	display: inline-block;
	margin-right: .03rem;
	height: 100%;
	line-height: auto;
}
.shaixuan img{
	width: .115rem;
	height: .13rem;
	float: right;
	margin-top:.1rem ;
}
.topNav_Title{
	margin-top: .2rem;
	height: .26rem;
}
.topNav_Title>h4{
	color: #333333;
	font-size: .17rem;
	font-weight: bolder;
	display: inline-block;
}
.topNav_Title>h4>span{
	font-size: .15rem;
	margin-left: .08rem;
}
.addHospital{
	float: right;
	display: inline-block;
	color: #2B77EF;
	font-size: .16rem;
}
.addHospital>img{
	width: .08rem;
	height: .13rem;
	float: right;
	margin-left: .05rem;
	margin-top: .05rem;
}
</style>
