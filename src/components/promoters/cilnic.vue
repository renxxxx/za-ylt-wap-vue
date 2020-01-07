<template>
	<div class="hospital" :style="{'padding-top': height+'px'}">
		<van-pull-refresh v-model="pullingDown" @refresh="afterPullDown" >
			<div class="navWarp">
				<div class="topNav"  :style="{'padding-top': height+'px'}">
					<div class="hospital_search">
						<router-link :to="{name : 'promoters_clinicSearch',query:{time:new Date().getTime()}}">
							<input type="text" placeholder="搜索门诊">
							<img src="../../assets/image/sousuo@2x.png" alt="">
						</router-link>
					</div>
				</div>
				<div class="statisticalTitle" v-model="clinic">
					<h3>合作门诊 {{clinic.num}}</h3>
					<div class="statisticalAdd">
						<router-link :to="{name : 'hospital_addCLinic',query:{time:new Date().getTime()}}">
							<span>新增</span>
							<img src="../../assets/image/xinzeng@2x.png" alt="">
						</router-link>
					</div>
				</div>
			</div>
			<div class="zhangwei" :style="{'padding-top': height+'px'}"></div>
			<div class="content">
				<ul>
					<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @load="getNextPage">
						<li v-for="(items,inx) in content" :key="inx">
							<router-link :to="{name : 'hospital_clinicDetails' ,query :  {clinicId : items.hospitalClinicId,time:new Date().getTime()}}">
								<div class="contentLi">
									<h4>{{items.name}}</h4>
									<span>推广人: {{items.hospitalUserName}}</span>
									<input type="text" v-model="items.patientCount" readonly="readonly">
								</div>
							</router-link>
						</li>
					</van-list>
				</ul>
			</div>
		</van-pull-refresh>
		<div style="height: .5rem;"></div>
		<bottomNav></bottomNav>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import bottomNav from './functionPage/bottomNav.vue'
// import clinicContent from './functionPage/clinic_content.vue'
export default {
	name: 'clinic',
	data () {
		return {
			clinic : {
				num : null
			},
			pullingDown:false,
			loading: false,
			finished: false,
			content : [],
			page:0
		}
	},
	computed:{
	  ...mapGetters(['account'])
	},
	components:{
		// clinicContent,
		bottomNav
	},
	created(){
		debugger
		var heightRexg = /^[0-9]*/g
		var topHeight = this.topHeight.match(heightRexg)
		this.height = parseInt(topHeight.join()) 
		console.log(this.height)
	},
  beforeRouteLeave(to, from, next) {
	debugger;
	this.scrollTop =document.getElementById('app').scrollTop ||document.getElementById('app').pageYOffset
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
     debugger;
    next(vm => {
	 document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
	});
	
  }, 
  destroyed(){
	  debugger
	  console.log('destroyed')
  },
  mounted() {
	  debugger
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
		// this.getdata(0);
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
			debugger
		  Object.assign(this.$data, this.$options.data());
		  // this.$refs.clinic.initData();
		  this.$axios.get('/hospital/operator/hospital-clinics-sum?')
		  .then(res => {
		  	this.clinic.num = res.data.data.rowCount;
		  })
		  .catch((err)=>{
		  	console.log(err);
		  })
		  this.getNextPage();
		},
		getNextPage(){
			this.page++
			this.getdata();
		},
		getdata(){
			debugger
			this.$axios.get('/hospital/operator/hospital-clinics?'+qs.stringify({pn:this.page})+'&'+qs.stringify({ps:10}))
			.then(res => {
				if(res.data.data.rows.length != 0){
					for(let i in res.data.data.rows){
						if(res.data.data.rows[i]){
							this.content.push(res.data.data.rows[i])
						}
						// console.log(this.content)
					}
				// 加载状态结束
				this.loading = false;
				}else{
					this.loading = false;
					this.finished = true;
				}
				// this.clinic.num = res.data.data.sum.totalCount;
		
			})
			.catch((err)=>{
				console.log(err);
			})
		},
	},
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
	height: 1.2rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 3;
}
.zhangwei{
	height: 1.2rem;
	width: 100%;
}
.topNav{
	width: 100%;
	height: .42rem;
}
.hospital_search{
	/* float:left; */
	width: 100%;
	position: relative;
	margin: 0rem auto;
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

.statisticalTitle{
	margin-top: .25rem;
	width: 100%;
	height: .26rem;
	line-height: .26rem;
	padding-bottom: .1rem;
}
.statisticalTitle h3{
	float: left;
	margin-left: .18rem;
	font-size: .16rem;
	font-weight: bolder;
}
.statisticalAdd{
	float: right;
	height: .26rem;
	line-height: .26rem;
	margin-right: .18rem;
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

.content{
	width: 100%;
	height: 100%;
	/* margin-top: 2.1rem; */
}
.content ul{
	width: 94.6%;
	margin: 0 auto;
	/* text-align: center; */
}
.content ul li{
	width: 48.6%;
	height: 1.1rem;
	display: inline-block;
	margin-top: .1rem;
	background-color: #FFFFFF;
	text-align: center;
}
/* .content ul li:first-child {
    margin-top: 2.1rem;
} */
>>>.van-pull-refresh {
    overflow: visible;
    -webkit-user-select: none;
    user-select: none;
    /* margin-top: 2rem; */
}
.content ul li:nth-child(1),.content ul li:nth-child(2){
	margin-top: 0rem;
}
.content ul li:nth-child(2n){
	margin-left:1.71% ;
}
.content ul li:first-child{
	margin-top: .2rem;
}
.content ul li:last-child{
	margin-bottom: .49rem;
}
.contentLi{
	height: .82rem;
	/* margin-top: .19rem; */
	margin: .14rem auto;
}
.contentLi h4{
	font-size: .14rem;
	font-weight: bold;
	display: block;
	margin-top: .19rem;
}
.contentLi span{
	display: block;
	margin-top: .05rem;
	margin-bottom: .09rem;
	color: #999999;
}
.contentLi input{
	width: .9rem;
	height: .24rem;
	text-align: center;
	border: 1px solid #FF951B;
	border-radius: .5rem;
}



</style>

