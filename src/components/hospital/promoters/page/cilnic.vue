<template>
	<div class="hospital" :style="{'padding-top':$store.state.paddingTop}">
		<van-pull-refresh v-model="pullingDown" @refresh="afterPullDown">
			<div class="navWarp">
				<div class="topNav"  :style="{'padding-top':$store.state.paddingTop}">
					<div class="hospital_search">
						<router-link :to="{path : '/promoters/promoters_clinicSearch',query:{}}">
							<input type="text" placeholder="搜索门诊">
							<img src="../../../../assets/image/sousuo@2x.png" alt="">
						</router-link>
					</div>
				</div>
				<div class="statisticalTitle" v-model="clinic">
					<h3>合作门诊 {{clinic.num}}</h3>
					<div class="statisticalAdd">
						<router-link :to="{path : '/promoters/promoters_addClinic',query:{}}">
							<span>新增</span>
							<img src="../../../../assets/image/xinzeng@2x.png" alt="">
						</router-link>
					</div>
				</div>
			</div>
			<div class="zhangwei" ></div>
			<div class="content" ref="content" @scroll="handleScroll">
				<ul>
					<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @load="getNextPage">
						<!-- content	 -->
						<li v-for="(items,inx) in content" :key="inx">
							<router-link :to="{path : '/promoters/promoters_source' ,query :  {clinicId : items.hospitalClinicId,clinicName:items.name,clinicTime:items.alterTime,}}">
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
		<div class="returnTop" @click="$refs.content.scrollTop=0;hospitalReturnTopPage = false;" ref="returnTopRef" v-show="hospitalReturnTopPage">
			<img src="../../../../assets/image/returnTop.png" alt />
			<span>顶部</span>
		</div>
		<div style="height: .5rem;"></div>
	</div>
</template>

<script>
import qs from 'qs';
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
			page:1,
			hospitalReturnTopPage:false,
		 	show:false,
		}
	},
	computed:{
	},
	components:{
		
	},
	created(){
	},

  	destroyed(){
	  debugger
	  
 	},
	mounted() {
	//   debugger
	// 	if(window.plus){
	// 		//plus.navigator.setStatusBarBackground("#ffffff");
	// 		plus.navigator.setStatusBarStyle("dark")
	// 	}

		// this.getdata(0);
		// this.initData()
	},
	activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			// 加载dom节点后,获取推广人列表请求
			this.getdata();
		}
		if(this.scrollTop != 0){
			this.$refs.content.scrollTop = this.scrollTop;
		}
    },
	methods: {
		// 滑动一定距离出现返回顶部按钮
		handleScroll() {
			this.scrollTop = this.$refs.content.scrollTop || this.$refs.content.pageYOffset
			if (this.scrollTop > 800) {
				this.hospitalReturnTopPage = true;
			} else {
				this.hospitalReturnTopPage = false;
			}
		},
		afterPullDown() {
			//下拉刷新
		  setTimeout(() => {
			this.pullingDown = false;
			this.initData();
		  }, 500);
		},
		initData() {

			debugger

			let thisVue=this;
			if(this.$route.meta.auth && !this.$store.state.hospital.login)
				this.$toast({message:'请登录',onClose:function(){
					thisVue.$router.replace({ path : '/hospital/hospitalLogin',query:{time:1}});
				}})


		  Object.assign(this.$data, this.$options.data());
		  // this.$refs.clinic.initData();
		  this.$axios.get('/hospital/operator/hospital-clinics-sum?')
		  .then(res => {
		  	this.clinic.num = res.data.data.rowCount;
		  })
		  .catch((err)=>{
		  	
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
						// 
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
	overflow: hidden;
	background-color: #FFFFFF;
}
.navWarp{
	width: 100%;
	/* height: 1rem; */
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 3;
}
.zhangwei{
	height: 1rem;
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
	height: calc(100vh - 1.53rem);
	touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
  	overflow: scroll;
  	overflow-x: visible;
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
	/* margin-top: .2rem; */
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
