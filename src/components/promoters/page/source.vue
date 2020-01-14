<template>
	<div class="sourceManagement">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>{{this.$route.query.clinicName}}</h3>
			</div>
			<div class="rightImg">
				<router-link :to="{name:'promoters_clinicInfo',query:{clinicId:this.$route.query.clinicId}}">
					<img src="../../../assets/image/promotersEditor.png" alt="">
				</router-link>
			</div>
			<div class="navZhanwei"></div>
			<div class="navTime">
				<span>{{moment(this.$route.query.clinicTime).format('YYYY-MM-DD HH:mm')}}</span>
			</div>
		</div>
		
		<div style="height: .575rem;width: 100%;"></div>
		<router-link :to="{name:'promoters_addSource',query:{clinicId:this.$route.query.clinicId}}">
			<div class="addEtiology">
				<img src="../../../assets/image/xinzeng@2x.png" alt="">
				<span>新增病原</span>
			</div>
		</router-link>
		<div class="stateNav">
			<van-tabs title-inactive-color='#333333' title-active-color="#FF932E" @change="tabFn">
				<van-tab>
					 <div slot="title" class="tabTitle">
					      <span>全部病源</span>
						  <span>{{itemsNum}}</span>
					</div>
					<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="nextPageFn">
						<ul class="list">
							<li v-for="(item,inx) in  items" :key="inx">
								<router-link :to="{name : 'details' ,query : {patientId : item.itemId,time:new Date().getTime()}}">
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
				</van-tab>
				<van-tab>
					<div slot="title" class="tabTitle">
					      <span>已就诊</span>
						  <span>{{yesItemsNum}}</span>
					</div>
					<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="yesNextPageFn">
						<ul class="list">
							<li v-for="(item,inx) in  yesItems" :key="inx">
								<router-link :to="{name : 'details' ,query : {patientId : item.itemId,time:new Date().getTime()}}">
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
				</van-tab>
				<van-tab>
					<div slot="title" class="tabTitle">
					      <span>未就诊</span>
						  <span>{{noItemsNum}}</span>
					</div>
					<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="noNextPageFn">
						<ul class="list">
							<li v-for="(item,inx) in  noItems" :key="inx">
								<router-link :to="{name : 'details' ,query : {patientId : item.itemId,time:new Date().getTime()}}">
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
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: '',
	data () {
		return {
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
		}
	},
	computed:{
	  ...mapGetters(['account'])
	},
	components:{
		
	},
	created () {
		
	},
	mounted () {
		this.getAllNum();
	},
	methods: {
		getAllNum() {
			debugger
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
			console.log(this.getNum(""))
			// console.log(this.itemsNum)
		},
		// 返回上上一级目录
		goBackFn(){
			this.$router.back(-1)
		},
		// 获取下一页的方法
		getData(data,page){
			this.$axios.post('/c2/patient/items',qs.stringify({
					clinicId : this.$route.query.clinicId,
					status: data,
					pn : page,
					ps : 10,
				}))
				.then(res => {
					if(res.data.data.items.length != 0){
						for (let nums in res.data.data.items) {
							if(res.data.data.items[nums].status == 1){
								this.items.push({
									clinicName : res.data.data.items[nums].clinicName,
									itemId : res.data.data.items[nums].itemId,
									pushTime : res.data.data.items[nums].pushTime,
									realname : res.data.data.items[nums].realname,
									status : res.data.data.items[nums].status,
									img : require("../../../assets/image/orange@2x.png"),
									button : "确认就诊",
									span : "未就诊"
								});
								if(data){
									this.noItems.push({
										clinicName : res.data.data.items[nums].clinicName,
										itemId : res.data.data.items[nums].itemId,
										pushTime : res.data.data.items[nums].pushTime,
										realname : res.data.data.items[nums].realname,
										status : res.data.data.items[nums].status,
										img : require("../../../assets/image/orange@2x.png"),
										button : "确认就诊",
										span : "未就诊"
									});
								}
							}else if(res.data.data.items[nums].status == 4){
								this.items.push({
									clinicName : res.data.data.items[nums].clinicName,
									itemId : res.data.data.items[nums].itemId,
									pushTime : res.data.data.items[nums].pushTime,
									realname : res.data.data.items[nums].realname,
									status : res.data.data.items[nums].status,
									img :require( "../../../assets/image/blue@2x.png"),
									button : "已就诊",
									buttonColor : "buttonColor",
									span : "已就诊"
								});
								if(data){
									this.yesItems.push({
										clinicName : res.data.data.items[nums].clinicName,
										itemId : res.data.data.items[nums].itemId,
										pushTime : res.data.data.items[nums].pushTime,
										realname : res.data.data.items[nums].realname,
										status : res.data.data.items[nums].status,
										img :require( "../../../assets/image/blue@2x.png"),
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
					console.log(err);
					//Dialog({ message: err});;
				});
		},
		
		// 获取下一页的方法
		async getNum(data){
			debugger;
			var num ='';
			await this.$axios.post('/c2/patient/items',qs.stringify({
					clinicId : this.$route.query.clinicId,
					status: data,
					pn : 1,
					ps : 10,
				}))
				.then(res => {
					num = res.data.data.sum.totalCount;
				})
				.catch((err)=>{
					console.log(err);
					//Dialog({ message: err});;
				});
			console.log(num)
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
			this.page++;
			this.getData(4,this.page);
		},
		// 未就诊病原列表的下一页
		noNextPageFn(){
			this.page++;
			this.getData(1,this.page);
		},
		// 菜单切换的清空值
		tabFn(_value){
			console.log(_value)
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
					this.$toast.fail({duration: 1000,message: res.data.codeMsg})
				}else{
					this.$toast.success({duration: 1000,message: '操作成功'})
					if(_item.status == 1){
						console.log(_button.target)
						_button.target.style.cssText="color:#333333; background-color:#EEEEEE;"
						_button.target.innerHTML = '已就诊';
					}
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		}
	},
}
</script>

<style scoped>
.sourceManagement{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .475rem;
	/* line-height: .575rem; */
	position: fixed;
	tab-size: 0;
	text-align: center;
	padding-top: .1rem ;
	background-color: #FFFFFF;
	z-index: 999;
}
.leftImg{
	width: 10%;
	float: left;
	line-height: .25rem;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
}
.centerTitle{
	width: 80%;
	float: left;
	line-height: .25rem;
}
.centerTitle h3{
	color: #333333;
	font-size: .16rem;
	font-weight: bolder;
	display: inline-block;
}
.rightImg{
	width: 10%;
	float: left;
	line-height: .25rem;
}
.rightImg img{
	width: .19rem;
	height: .2rem;
}
.navZhanwei{
	height: .25rem;
}
.navTime{
	width: 100%;
	text-align: center;
	position: absolute;
}
.navTime span{
	font-size: .13rem;
	color: #999999;
}
.addEtiology{
	width: 91.47%;
	height: .42rem;
	line-height: .42rem;
	margin: .1rem auto 0rem;
	text-align: center;
	background-color: #EAF2FF;
}
.addEtiology img{
	width: .16rem;
	height: .16rem;
	margin-top: -.03rem;
}
.addEtiology span{
	font-size: .14rem;
	color: #2B77EF;
}
.stateNav{
	width: 91.47%;
	margin: .15rem auto 0rem;
	border-radius: .3rem;
	box-shadow: 0px 0px 26px 3px hsla(0, 0%, 0%, 10%);
}
>>>.van-tabs__line{
	background-color: #FF932E;
	width: .16rem!important;
}
>>>.van-tabs{
	height: .58rem;
}
>>>.van-tabs__wrap{
	height: .58rem;
	border-radius: .5rem;
}
>>>.van-tab{
	line-height: .21rem;
}
>>>.van-tabs__content{
	margin-top: .15rem;
}
>>>.van-tab>span{
	font-size: .145rem;
	font-weight: bold;
}
.list{
	width: 100%;
}
.list li{
	width: 100%;
	height: .845rem;
	box-shadow: 0px 0px 26px 3px hsla(0, 0%, 0%, 10%);
	margin-bottom: .1rem;
	position: relative;
	border-radius: .03rem;
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
	padding-left: .32rem;
	padding-top: .04rem;
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
	font-size: .125rem;
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
