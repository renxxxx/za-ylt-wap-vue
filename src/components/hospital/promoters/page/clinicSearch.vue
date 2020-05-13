<template>
	<div class="search_clinic">
		<van-pull-refresh v-model="pullingDown" @refresh="afterPullDown">
			<div class="navWarp" :style="{'padding-top':$store.state.paddingTop}">
				<div class="topNav">
					<div class="clinic_information" @click="goBackFn"  id="navback">
						<img src="../../../../assets/image/shape@3x.png" alt="">
					</div>
					<div class="clinic_search">
						<input type="search" placeholder="搜索门诊"  v-model="keywords" @keyup.enter="inputNow">
						<img src="../../../../assets/image/sousuo@2x.png" alt="">
					</div>
					<div class="clinic_buttton" @click="inputNow">
						<button>搜索</button>
					</div>
				</div>
				<div class="listTitle">
					<div class="titleleft">
						<h3>合作门诊 {{clinic.num}}</h3>
					</div>
						<div class="titleRight">
						<router-link :to="{path : '/promoters/promoters_addClinic',query:{}}">
							<span>新增</span>
							<img src="../../../../assets/image/xinzeng@2x.png" alt="">
						</router-link>
					</div>
				</div>
			</div>
			<div style="height: .98rem"  :style="{'padding-top':$store.state.paddingTop}"></div>
			<div class="content" ref="content" @scroll="handleScroll">
				<ul>
					<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @load="getNextPage">
						<!-- content -->
						<li v-for="(items,inx) in content" :key="inx">
							<router-link :to="{path : '/promoters/promoters_source' ,query :  {clinicId : items.hospitalClinicId,clinicName:items.name,clinicTime:items.alterTime}}">
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
	</div>
</template>

<script>
import qs from 'qs';
export default {
	name: 'search',
	data () {
		return {
			keywords : '',
			content : [],
			clinic : {
				num : 0
			},
			loading: false,
			finished: false,
			page:0,
			pullingDown: false,
			scrollTop:0,
     		hospitalReturnTopPage:false,
		}
	},
	created(){
	},
	activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			this.initData();
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
		}
		if(this.scrollTop != 0){
			this.$refs.content.scrollTop = this.scrollTop;
		}
    },
 	mounted() {
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
		goBackFn(){
			this.$router.back(-1)
		},
		initData() {
			debugger
		  Object.assign(this.$data, this.$options.data());
		  // this.$refs.clinic.initData();
		 	this.getSum();
		 	this.getNextPage();
		},
		getNextPage(){
			this.page++
			this.getdata();
		},
		getSum(){
			this.$axios.get('/hospital/operator/hospital-clinics-sum?')
			.then(res => {
				this.clinic.num = res.data.data.rowCount;
			})
			.catch((err)=>{
				
			})
		},
		//获取数据
		getdata(){
			this.$axios.get('/hospital/operator/hospital-clinics?'+qs.stringify({kw:this.keywords})+'&'+qs.stringify({pn:this.page})+'&'+qs.stringify({ps:10}))
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
			})
			.catch((err)=>{
				
			})
		},
		//键盘输入值时触发
		inputNow(_keywordsCode){
			this.content = [];
			this.page = 1;
			this.getdata();
		},
	},
}
</script>

<style scoped>
.search_clinic{
	width: 100%;
}
.navWarp{
	width: 100%;
	height: .98rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 3;
}
.topNav{
	width: 100%;
	height: .42rem;
}
.clinic_search{
	float:left;
	width: 74.3%;
	position: relative;
}
.clinic_search input{
	margin: .09rem 0rem 0rem 0rem;
	height:.33rem;
	width: 95%;
	border: none;
	border-radius: .33rem;
	padding-left: 11.6%;
	background-color: rgba(0, 0, 0, 0.05);
}
.clinic_search input[type=search]::-webkit-search-cancel-button{
  padding-right: 5%;
}
.clinic_search img{
	width: .14rem;
	height: .15rem;
	position: absolute;
	top: .18rem;
	left: 4.8%;
}
.clinic_buttton{
	float: left;
	margin-top: .14rem;
	margin-left: -.05rem;
}
.clinic_buttton button{
	color: #FFFFFF;
	background-color: #2B77EF;
	border-radius: .15rem;
	border: none;
	height: .28rem;
	width: .6rem;
}

.clinic_information{
	float:left;
	width: 5.3%;
	margin-left: .16rem;
	margin-top: .13rem;
}
.clinic_information img{
	width: .09rem;
	height: .15rem;
}
.listTitle{
	width: 84%;
	height: .26rem;
	margin: 0rem auto;
	margin-top: .3rem;
}
.titleleft{
	float: left;
	height: .26rem;
	line-height: .26rem;
}
.titleleft h3{
	font-size: .16rem;
	font-weight: bolder;
}
.titleRight{
	float: right;
	height: .26rem;
	line-height: .26rem;
}
.titleRight span{
	font-size: .15rem;
}
.titleRight img{
	width: .19rem;
	height: .19rem;
	margin-left: .05rem;
	margin-top: -.03rem;
}
.content[data-v-3c6a3c8a] {
    width: 100%;
    height: 100%;
    margin-top: 0rem;

}
>>>.van-pull-refresh{
	height: 100%;
}
.content{
    width: 100%;
	height: calc(100% - .98rem);
	touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
  	overflow: scroll;
  	overflow-x: hidden;
}
/* .content{
	width: 100%;
	height: 100%;
} */
.content ul{
	width: 94.6%;
	margin: 0 auto;
}
.content ul li{
	width: 48.6%;
	height: 1.1rem;
	display: inline-block;
	margin-top: .1rem;
	background-color: #FFFFFF;
	text-align: center;
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
