<template>
	<div class="hospital" :style="{'padding-top':$store.state.topHeight}">
		<van-pull-refresh v-model="pullingDown" @refresh="afterPullDown" >
			<div class="navWarp">
				<div class="topNav"  :style="{'padding-top':$store.state.topHeight}">
					<div class="hospital_search">
						<router-link :to="{path : '/hospital/hospital_clinicSearch',query:{time:new Date().getTime()}}">
							<input type="text" placeholder="搜索门诊">
							<img src="../../../assets/image/sousuo@2x.png" alt="">
						</router-link>
					</div>
					<router-link :to="{path : '/hospital/hospital_clinicMessage',query:{time:new Date().getTime()}}">
						<div class="hospital_information">
							<img src="../../../assets/image/xiaoxi@2x.png" alt="">
							<div class="num" v-if=" this.$store.state.hospitalEntrance.loginRefresh().unlookedMessageCount == 0? false:true">
								<span>{{this.$store.state.hospitalEntrance.loginRefresh().unlookedMessageCount}}</span> 
							</div>
						</div>
					</router-link>
				</div>
				<div class="shared">
					<ul>
						<router-link :to="{path : '/hospital/hospital_hospitalImage',query:{time:new Date().getTime()}}">
							<li>
								<img src="../../../assets/image/yiyuanxingxiang@2x.png" alt=""/>
								<span>医院形象</span>
							</li>
						</router-link>
						<router-link  :to="{path : '/hospital/hospital_case',query:{time:new Date().getTime()}}">
							<li>
								<img src="../../../assets/image/youzhianli@2x.png" alt=""/>
								<span>优质案例</span>
							</li>
						</router-link>
						<router-link :to="{path : '/hospital/hospital_expertsIntroduction',query:{time:new Date().getTime()}}">
							<li>
								<img src="../../../assets/image/zhuanjia@2x.png" alt=""/>
								<span>专家介绍</span>
							</li>
						</router-link>
						<router-link :to="{path : '/hospital/hospital_activityReleased',query:{time:new Date().getTime()}}">
							<li>
								<img src="../../../assets/image/huodongfabu@2x.png" alt=""/>
								<span>最新活动</span>
							</li>
						</router-link>
					</ul>
				</div>
				<div class="statisticalTitle" v-model="clinic">
					<h3>合作门诊</h3>
					<div class="statisticalAdd">
						<router-link :to="{path : '/hospital/hospital_addCLinic',query:{time:new Date().getTime()}}">
							<span>新增</span>
							<img src="../../../assets/image/xinzeng@2x.png" alt="">
						</router-link>
					</div>
				</div>
			</div>
			<div style="height:2rem"></div>
			<clinicContent  ref="clinic" :show = 'show'></clinicContent>
      <div style="height: .55rem;"></div>
		</van-pull-refresh>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import clinicContent from '../function/clinic_content.vue'
export default {
	name: 'clinic',
	data() {
		return {
			clinic : {
				num : null,
			},
			show : true,
			pullingDown:false
		}
	},
	computed:{
	},
	components:{
		clinicContent
	},
	beforeCreate(){
		
	},
	created(){

	},
  beforeRouteLeave(to, from, next) {
	  debugger
	let scrollTop = this.scrollTop =document.getElementById('hospital').scrollTop;
this.scrollTop = scrollTop?scrollTop :0;
console.log(this.scrollTop)
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
	  debugger
    next(vm => {
		debugger
	 document.getElementById('hospital').scrollTop=document.getElementById('hospital').pageYOffset=vm.scrollTop;
	});

  },
  destroyed(){
  },
  mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		this.initData()
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
		  Object.assign(this.$data, this.$options.data());
		  this.$refs.clinic.initData();
		}
	},
	activated(){
	},
	deactivated(){}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hospital{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
}
.navWarp{
	width: 100%;
	/* height: 2rem; */
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 3;
}
.topNav{
	width: 100%;
	height: .42rem;
}
.hospital_search{
	float:left;
	width: 85.9%;
	position: relative;
}
.hospital_search input{
	margin: .08rem 0rem 0rem .16rem;
	height:.34rem;
	width: 80%;
	border: none;
	border-radius: .33rem;
	padding-left: 11.6%;
	background-color: rgba(0, 0, 0, 0.04);
}
.hospital_search img{
	width: .14rem;
	height: .15rem;
	position: absolute;
	top: .18rem;
	left: 9.8%;
}
.hospital_information{
	float:left;
	width: 10.3%;
	margin-left: .14rem;
	margin-top: .15rem;
	position: relative;
}
.hospital_information img{
	width: .19rem;
	height: .24rem;
}
.num{
	height: .18rem;
	width: .18rem;
	line-height: .18rem;
	text-align: center;
	background-color: #FF951B;
	border-radius: 50%;
	color: #FFFFFF;
	font-size: .12rem;
	position: absolute;
	top: -6px;
	right: 12px;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.shared{
	height: .73rem;
	width: 89%;
	margin: 0rem auto;
	margin-top: .3rem;
}
.shared ul{
	width: 100%;
	margin-top: .25rem;
}
.shared ul li{
	width: 25%;
	float: left;
	text-align: center;
}
.shared ul li img{
	width: .56rem;
	height: .43rem;
	display: block;
	margin: 0 auto;
	margin-bottom: .12rem;
}
.statisticalTitle{
	margin-top: .25rem;
	width: 100%;
	height: .26rem;
	line-height: .26rem;
	/* padding-bottom: .1rem; */
}
.statisticalTitle h3{
	float: left;
	margin-left: .1rem;
	font-size: .16rem;
	font-weight: bolder;
}
.statisticalAdd{
	float: right;
	height: .26rem;
	line-height: .26rem;
	margin-right: .1rem;
}
.statisticalAdd span{
	font-size: .15rem;
}
.statisticalAdd img{
	height: .19rem;
	width: .19rem;
	/* margin: .04rem 0rem; */
	margin-left: .05rem;
	margin-top: -.03rem;
}
</style>
