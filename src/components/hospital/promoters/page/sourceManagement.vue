<template>
  	<div class="index">
			<!-- <van-pull-refresh v-model="pullingDown" @refresh="afterPullDown" > -->
				<div class="navWarp" :style="{'padding-top':$store.state.paddingTop}">
					<!-- 搜索及其筛选 -->
					<div class="topNav" ref="topNav">
						<div class="indexReturn" @click="goBackFn"  id="navback">
							<img src="../../../../assets/image/back-white@2x.png" alt="">
						</div>
						<router-link :to="{name:'promoters_sourceSearch',query:{focus : true,}}">
					<div class="indexSearch">
						<input type="text" placeholder="搜索病员" readonly="readonly">
						<img src="../../../../assets/image/sousuo@2x.png" alt="">
					</div>
						</router-link>
					<router-link :to="{name:'promoters_sourceSearch',query:{}}">
						<div class="clinic_buttton">
							<button>搜索</button>
						</div>
					</router-link>
					<router-link :to="{name:'promoters_sourceSearch',query:{}}">
						<div class="indexScreening" @click="showPopup">
							<span>筛选 </span>
							<img src="../../../../assets/image/screen@2x.png" alt="加载中" >
						</div>
					</router-link>
					</div>
					<div id="navType">
						<div class="navType_one" @click="xiaclickFn('all')">
							<h5>全部{{itemsNum}}</h5>
						</div>
						<div class="navType_two" @click="xiaclickFn('no')">
							<h5>未就诊{{yesItemsNum}}</h5>
						</div>
						<div class="navType_three" @click="xiaclickFn('yes')">
							<h5>已就诊{{noItemsNum}}</h5>
						</div>
						<div ref="xiahuaxian" class="navType_line"></div>
					</div>
				</div>
				
				<div style="height:calc(100% - .8rem);margin-top:.8rem">
					<topSolt v-if="all">
						<van-list  v-model="loading" slot="returnTopSolt" :finished="finished" finished-text="没有更多了"  @load="nextPageFn">
							<!-- <div style="height:.8rem" ></div> -->
							<ul class="list"  :style="{'padding-top':(parseInt($store.state.paddingTop.replace('px',''))+12)+'px'}">
								<!-- items -->
								<li v-for="(item,inx) in items " :key="inx">
									<router-link :to="{path : '/promoters/promoters_detailsPage' ,query : {patientId : item.itemId,}}">
										<div class="style">
											<div class="contentTitle">
												<img :src="item.img" alt="">
												<span>{{item.realname}}</span>
											</div>
											<div class="contnet_left">
												<span>推送：{{moment(item.pushTime).format('YYYY-MM-DD')}}</span>
												<span>状态：{{item.span}}</span>
											</div>
										</div>
									</router-link>
									<div class="content_right">
										<button :class="item.buttonColor" @click="submitFn(item,$event)">{{item.button}}</button>
									</div>
								</li>				
							</ul>
						</van-list>
					</topSolt>
					<topSolt v-if="no">
						<van-list slot="returnTopSolt" v-model="loading" :finished="finished" finished-text="没有更多了"  @load="yesNextPageFn">
							<!-- <div style="height:.8rem" ></div> -->
							<ul  class="list" :style="{'padding-top':(parseInt($store.state.paddingTop.replace('px',''))+12)+'px'}">
								<!-- yesItems -->
								<li v-for="(item,inx) in yesItems" :key="inx">
									<router-link :to="{path : '/promoters/promoters_detailsPage' ,query : {patientId : item.itemId,}}">
										<div class="style">
											<div class="contentTitle">
												<img :src="item.img" alt="">
												<span>{{item.realname}}</span>
											</div>
											<div class="contnet_left">
												<span>推送：{{moment(item.pushTime).format('YYYY-MM-DD')}}</span>
												<span>状态：{{item.span}}</span>
											</div>
										</div>
									</router-link>
									<div class="content_right">
										<button :class="item.buttonColor" @click="submitFn(item,$event)">{{item.button}}</button>
									</div>
								</li>
							</ul>
						</van-list>
					</topSolt>
					<topSolt v-if="yes">
						<van-list slot="returnTopSolt" v-model="loading" :finished="finished" finished-text="没有更多了"  @load="noNextPageFn">
							<!-- <div style="height:.8rem" ></div> -->
							<ul class="list" :style="{'padding-top':(parseInt($store.state.paddingTop.replace('px',''))+12)+'px'}">
								<!-- noItems -->
								<li v-for="(item,inx) in noItems " :key="inx">
									<router-link :to="{path : '/promoters/promoters_detailsPage' ,query : {patientId : item.itemId,}}">
										<div class="style">
											<div class="contentTitle">
												<img :src="item.img" alt="">
												<span>{{item.realname}}</span>
											</div>
											<div class="contnet_left">
												<span>推送：{{moment(item.pushTime).format('YYYY-MM-DD')}}</span>
												<span>状态：{{item.span}}</span>
											</div>
										</div>
									</router-link>
									<div class="content_right">
										<button :class="item.buttonColor" @click="submitFn(item,$event)">{{item.button}}</button>
									</div>
								</li>
							</ul>
						</van-list>
					</topSolt>
				</div>
			<!-- </van-pull-refresh> -->
  	</div>
</template>
<script>
import axios from 'axios'
import {mapActions,mapGetters,mapState} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import topSolt from "../../function/topSolt.vue";
export default {
  name: 'index',
  data () {
    return {
		name: 'index',
		//导航栏切换标题
		pullingDown: false,
		items:[],
		yesItems:[],
		noItems:[],
		itemsNum:'',
		yesItemsNum:'',
		noItemsNum:'',
		loading: false,
		// 加载状态结束
		finished: false,
		page:0,
		yesPage:0,
		noPage:0,
		all:true,
		yes:false,
		no:false,
		noData:true,
		yesData:true,
    }
  },
  created(){
	
  },

  mounted(){
    // if(window.plus){
    // 	//plus.navigator.setStatusBarBackground("#2B77EF");
    // 	plus.navigator.setStatusBarStyle("dark")
    // }
	// this.getAllNum();
	let width = document.getElementById('navType').getBoundingClientRect().width/6
	this.$refs.xiahuaxian.style.webkitTransform = "translateX("+(width)+"px) translateX(-50%)"
  },
  activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			this.getAllNum();
			this.noNextPageFn();
			this.yesNextPageFn();
		}
    },
  computed:{
		...mapGetters(['account']),
  },
  //注册组件
  components:{
	 topSolt
  },
  methods:{
	xiaclickFn(_data){
		
		// console.log(document.getElementById('navType').getBoundingClientRect().width)
		let width = document.getElementById('navType').getBoundingClientRect().width/6
		// console.log(width)
		switch(_data){
			case 'all':
			this.all = true;
			this.yes = false;
			this.no = false;
			// console.log('all')
			this.$refs.xiahuaxian.style.webkitTransform = "translateX("+(width)+"px) translateX(-50%)"
			break;
			case 'yes':
			this.all = false;
			this.yes = true;
			this.no = false;
			// console.log('yes')
			// if(this.yesData){
			// 	this.yesNextPageFn();
			// 	this.yesData = false;
			// 	console.log(this.yesItems)
			// }
			this.$refs.xiahuaxian.style.webkitTransform = "translateX("+(width*5)+"px) translateX(-50%)"
			break;
			case 'no':
			this.all = false;
			this.yes = false;
			this.no = true;
			// if(this.noData){
			// 	this.noNextPageFn();
			// 	this.noData = false;
			// 	console.log(this.noItems)
			// }
			// console.log('no')
			this.$refs.xiahuaxian.style.webkitTransform = "translateX("+(width*3)+"px) translateX(-50%)"
			break;
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
	  Object.assign(this.$data, this.$options.data());
	  let width = document.getElementById('navType').getBoundingClientRect().width/6
	  this.$refs.xiahuaxian.style.webkitTransform = "translateX("+(width)+"px) translateX(-50%)"
	  this.getAllNum();
	  this.nextPageFn();
	  this.yesNextPageFn();
	  this.noNextPageFn();
	},
	getAllNum() {
		var num = '';
		this.getNum("").then((v)=>{
			this.itemsNum = v
		})
		this.getNum(4).then((v)=>{
			this.yesItemsNum = v
		})
		this.getNum(1).then((v)=>{
			this.noItemsNum = v
		})
		
		
	},
	// 返回上上一级目录
	goBackFn(){
		this.$router.back(-1)
	},
	//显示筛选弹窗
	showPopup() {
	   this.show = true;
	   // 
	},
	// 获取下一页的方法
	getData(data,page){
		this.$axios.post('/c2/patient/items',qs.stringify({
				hospitalId: this.$store.state.hospital.login.hospital.hospitalId,
				hospitalUserId : this.$store.state.hospital.login.hospitalUserId,
				status: data,
				pn : page,
				ps : 10,
			}))
			.then(res => {
				if(res.data.data.items.length != 0){
					for (let nums in res.data.data.items) {
						if(res.data.data.items[nums].status == 1){
							if(!data){
								this.items.push({
									clinicName : res.data.data.items[nums].clinicName,
									itemId : res.data.data.items[nums].itemId,
									pushTime : res.data.data.items[nums].pushTime,
									realname : res.data.data.items[nums].realname,
									status : res.data.data.items[nums].status,
									img : require("../../../../assets/image/orange@2x.png"),
									button : "确认就诊",
									span : "未就诊"
								});
							}
							if(data){
								this.noItems.push({
									clinicName : res.data.data.items[nums].clinicName,
									itemId : res.data.data.items[nums].itemId,
									pushTime : res.data.data.items[nums].pushTime,
									realname : res.data.data.items[nums].realname,
									status : res.data.data.items[nums].status,
									img : require("../../../../assets/image/orange@2x.png"),
									button : "确认就诊",
									span : "未就诊"
								});
							}
						}else if(res.data.data.items[nums].status == 4){
							if(!data){
								this.items.push({
									clinicName : res.data.data.items[nums].clinicName,
									itemId : res.data.data.items[nums].itemId,
									pushTime : res.data.data.items[nums].pushTime,
									realname : res.data.data.items[nums].realname,
									status : res.data.data.items[nums].status,
									img :require( "../../../../assets/image/blue@2x.png"),
									button : "已就诊",
									buttonColor : "buttonColor",
									span : "已就诊"
								});
							}
							if(data){
								this.yesItems.push({
									clinicName : res.data.data.items[nums].clinicName,
									itemId : res.data.data.items[nums].itemId,
									pushTime : res.data.data.items[nums].pushTime,
									realname : res.data.data.items[nums].realname,
									status : res.data.data.items[nums].status,
									img :require( "../../../../assets/image/blue@2x.png"),
									button : "已就诊",
									buttonColor : "buttonColor",
									span : "已就诊"
								});
							}
						}
					}
					// 加载状态结束
					this.loading = false;
				}else{
					this.loading = false;
					this.finished = true;
				}
			})
			.catch((err)=>{
				
				//Dialog({ message: err});;
			});
	},
	
	// 获取下一页的方法
	async getNum(data){
		debugger;
		var num ='';
		await this.$axios.post('/c2/patient/items',qs.stringify({
				hospitalId: this.$store.state.hospital.login.hospital.hospitalId,
				hospitalUserId : this.$store.state.hospital.login.hospitalUserId,
				status: data,
				pn : 1,
				ps : 10,
			}))
			.then(res => {
				num = res.data.data.sum.totalCount;
			})
			.catch((err)=>{
				
				//Dialog({ message: err});;
			});
		
		return num;
	},
	// 全部病原列表的下一页
	nextPageFn(){
		debugger;
		this.page++;
		this.getData('',this.page);
	},
	// 已就诊病原列表的下一页
	yesNextPageFn(){
		this.yesPage++;
		this.getData(4,this.yesPage);
	},
	// 未就诊病原列表的下一页
	noNextPageFn(){
		this.noPage++;
		this.getData(1,this.noPage);
	},
	// 菜单切换的清空值
	tabFn(_value){
		
		switch(_value){
			case 0:
			debugger
			if(!this.items.length){
				this.page = 0;
				this.finished = false;
			}
			break;
			case 1:
			if(!this.yesItems.length){
				this.page = 0;
				this.finished = false;
			}
			break;
			case 2:
			if(!this.noItems.length){
				this.page = 0;
				this.finished = false;
			}
			break;
		}
	},
	submitFn(_item,_button){
		this.$axios.post('/c2/patient/confirmjiuzhen',qs.stringify({
			patientId : _item.itemId
		}))
		.then(res =>{
			if(res.data.codeMsg){
				this.$toast({duration: 1000,message: res.data.codeMsg})
			}
			if(res.data.code == 0 ){
				this.$toast.success({duration: 1000,message: '操作成功'})
				if(_item.status == 1){
					
					_button.target.style.cssText="color:#333333; background-color:#EEEEEE;"
					_button.target.innerHTML = '已就诊';
				}
			}
		})
		.catch((err)=>{
			
		})
	}
	
  },
}
</script>
<style scoped>
.index{
	width: 100%;
  height: 100%;
	background-color: #F5F5F5;
}
.navWarp{
	height: .8rem;
    line-height: .335rem;
    width: 100%;
    /* padding-top: 0.07rem; */
    background: url(/assets/img/BJ-blue.5dbb0cc.png);
    /* background-size: 100% 100%; */
    background-color: #2B77EF;
    position: fixed;
    top: 0rem;
    z-index: 1;
}
.topNav{
	height: .46rem;
	box-sizing: border-box;
}
.indexReturn{
	width: 10%;
	float: left;
	text-align: center;
	display: inline-block;
	z-index: 999;
	padding-top: 6px;
}
.indexReturn img{
	width: .09rem;
	height: .15rem;
	margin: auto;
}
.indexSearch{
	display: inline-block;
	/* width: .43rem; */
	width: 65%;
	float: left;
	/* text-align: center; */
	z-index: 999;
	height: .4rem;
	line-height: .36rem;
	position: relative;
	padding-top: 6px;
}
.indexSearch img{
	position: absolute;z-index: 9;left: .11rem;top: .15rem;
	height: .15rem;width:.14rem;
}
.indexSearch input{
	border-radius: .18rem;border: none;
	height: .335rem;width: 2.4rem;
	line-height: .3rem;
	/* padding: 0; */
	width: 84%;
	padding-left: 12%;
	/* margin:0 5%; */
	background: #F5F5F5;
	font-size:.15rem;
}
.clinic_buttton{
	float: left;
	margin-top: .024rem;
	margin-left: -.05rem;
	padding-top: 6px;
}
.clinic_buttton button{
	color: #FFFFFF;
	background-color: rgba(0,0,0,0);
	border-radius: .15rem;
	border: 1px solid #FFFFFF;
	height: .28rem;
	width: .45rem;
	font-size: .12rem;
	text-align: center;
	line-height: .25rem;
}
.indexScreening{
	display:inline-block;
	/* width: .43rem; */
	width: 12%;
	float: left;
	text-align: center;
	z-index: 999;
	height: .4rem;
	line-height: .38rem;
	margin-left: .052rem;
	padding-top: 6px;
}
.indexScreening span{
	width: .15rem;height: .21rem;
	/* margin: .65rem .02rem .06rem 0rem; */
	color: #FFFFFF;font-size: .12rem;
	z-index: 3;
	position:relative;
}
.indexScreening img{
	height: .13rem;width: .12rem;
	/* margin-right: .16rem; */
}
.indexFrom label{
	background: red;
}
#navType{
	height: .34rem;
	line-height: .34rem;
	/* width: 73.33%; */
	/* margin:0rem auto; */
	color: #FFFFFF;
	box-sizing: border-box;
	position: relative;
}
.navType_one{
	width: 33.33%;
	display: inline-block;
	float: left;
	text-align: center
}
.navType_two{
	width: 33.33%;
	display: inline-block;
	float: left;
	text-align: center
}
.navType_three{
	width: 33.33%;
	display: inline-block;
	float: left;
	text-align: center
}	
.navType_line{
	position: absolute;
    bottom: .03rem;
    left: 0;
    z-index: 1;
    height: .03rem;
    width: .24rem;
    background-color: #FFFFFF!important;
    border-radius: 3px;
	transition-duration: 0.3s;
}
.list{	
	width: 91.46%;
	margin: 0rem auto;
	height: calc(100% - .5rem);
}
.list li{
	width: 100%;
	height: .845rem;
	box-shadow: 0px 0px 26px 3px hsla(0, 0%, 0%, 10%);
	margin-bottom: .1rem;
	position: relative;
	border-radius: .1rem;
	/* background-color: #FFFFFF */
}
.style{
	height: 100%;
	color: #333333;
}
.contentTitle{
	width: 100%;
	/* height: .17rem; */
	/* line-height: .17rem; */
	padding-top: .1rem;
	padding-left: .1rem;
	
}
.contentTitle img{
	width: .17rem;
	height: .17rem;
	margin-top: -.03rem;
}
.contentTitle span{
	font-size: .14rem;
	font-weight: bold;
}
.contnet_left{
	padding-top: .04rem;
	padding-left: .31rem
}
.contnet_left span{
	display: block;
}
.content_right{
	position: absolute;
	right: .15rem;
	bottom: .25rem;
}
.content_right button{
	width: .8rem;
	height: .28rem;
	background-color: #2B77EF;
	border: none;
	border-radius: .14rem;
	color: #FFFFFF;
	font-size: .14rem;
}
.buttonColor{
    color: #333333!important;
    background-color: #EEEEEE!important;
}
.tabTitle{
	margin: .08rem 0rem;
}
.tabTitle span{
	display: block;
}
</style>

