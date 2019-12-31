<template>
	<div class="all">
		<!-- <van-pull-refresh v-model="isLoading" @refresh="refresh"> -->
			<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="onLoad">
			<ul v-if="isLogin == 100? true:false">
				<li v-for="(item,inx) in list.clinicAll" :key="inx">
					<router-link :to="{name : 'details' ,query : {patientId : item.itemId,time:new Date().getTime()}}">
						<div class="contentTitle">
							<img :src="item.img" alt="">
							<span>{{item.realname}}</span>
						</div>
						<div class="contnet_left">
							<span>推送：{{moment(item.pushTime).format('YYYY-MM-DD')}}</span>
							<span>状态：{{item.span}}</span>
						</div>
					</router-link>
						<div class="content_right">
							<button :class="item.buttonColor" @click="submitFn(item,$event)">{{item.button}}</button>
						</div>
				</li>
			</ul>
			<ul class="clinicList" v-if="isLogin == 200? true:false">
				<li v-for="(item,inx) in list.clinicAll" :key="inx">
					<router-link :to="{name : 'details' ,query : {patientId : item.itemId,time:new Date().getTime()}}">
						<div class="content_left">
							<span>{{item.realname}}</span>
						</div>
						<div class="content_right">
							<img :src='item.img'>
							<span :class="item.span=='未就诊'? 'no':'yes'">{{item.span}}</span>
						</div>
						<p>{{moment(item.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
					</router-link>
				</li>
			</ul>
      </van-list>
		<!-- </van-pull-refresh> -->
	</div>
</template>
<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
	name: 'clinicAll',
	data () {
		return {
			// clinicDetails :[],
			loading: false,
			// 加载状态结束
			finished: false,
			//显示下拉加载
			isLoading: false,
			// 请求页数
			page : 1,
			noNum: 0,
			yesNum: 0,
			clinicId:'',
		}
	},
	computed:{
	  ...mapGetters(['account','isLogin']),
	},
	props:['list'],
	components:{

	},
	created () {
		debugger
	},
	beforeRouteLeave(to, from, next) {
    debugger;
    this.scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
    debugger;
    next(vm => {
      document.documentElement.scrollTop=document.body.scrollTop = vm.scrollTop;
    });
  }, mounted() {
	  debugger
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		console.log(this.$route.name)
		// console.log(this.list)
		// this.getdata();
    // let winHeight = document.documentElement.clientHeight;                   //视口大小
    // document.getElementById('list-content').style.height = (winHeight - 46) +'px'  //调整上拉加载框高度
	},
	methods:{
		submitFn(_item,_button){
			console.log(_item.status)

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
					// console.log(this.list.clinicAll.map(item => item.itemId =  _item.itemId).indexOf())

				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: err});
			})
		},
		search(){
			debugger
			let clinicId = '';
			this.list.clinicId? clinicId = this.list.clinicId: clinicId = this.account.clinicId;
			this.$route.name == 'hospital_sourceManagement'&&this.isLogin == 100?	clinicId='':'',
			this.$route.name == 'outpatient_search'&&this.isLogin == 100?	clinicId='':''
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw : this.list.keywords,
				hospitalId : this.account.hospitalId,
				clinicId : clinicId,
				pn : 1,
				ps : 10
			}))
			.then(_d => {
				this.list.clinicAll = [];
				let yesNum = 0;
				let noNum = 0;
				let allNum = 0;
				this.page = 2;
				if( _d.data.data.items.length == 0){
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					this.finished = true;
				}else{
					for (let nums in _d.data.data.items) {
						console.log(_d.data.data.items[nums].status)
						if(_d.data.data.items[nums].status == 1){
							switch(this.isLogin){
								case 100:
								this.list.clinicAll.push({
									clinicName : _d.data.data.items[nums].clinicName,
									itemId : _d.data.data.items[nums].itemId,
									pushTime : _d.data.data.items[nums].pushTime,
									realname : _d.data.data.items[nums].realname,
									status : _d.data.data.items[nums].status,
									img : require("../../../assets/image/orange@2x.png"),
									button : "确认就诊",
									span : "未就诊"
								});
								noNum++;
								break;
								case 200:
								this.list.clinicAll.push({
									clinicName : _d.data.data.items[nums].clinicName,
									itemId : _d.data.data.items[nums].itemId,
									pushTime : _d.data.data.items[nums].pushTime,
									realname : _d.data.data.items[nums].realname,
									status : _d.data.data.items[nums].status,
									img :require( "../../../assets/image/weijiuzhen@2x.png"),
									span : "未就诊"
								});
							}

						}else if(_d.data.data.items[nums].status == 4){
							switch(this.isLogin){
								case 100:
								this.list.clinicAll.push({
									clinicName : _d.data.data.items[nums].clinicName,
									itemId : _d.data.data.items[nums].itemId,
									pushTime : _d.data.data.items[nums].pushTime,
									realname : _d.data.data.items[nums].realname,
									status : _d.data.data.items[nums].status,
									img : require("../../../assets/image/blue@2x.png"),
									button : "已就诊",
									buttonColor : "buttonColor",
									span : "已就诊"
								});
								yesNum++;
								break;
								case 200:
								this.list.clinicAll.push({
									clinicName : _d.data.data.items[nums].clinicName,
									itemId : _d.data.data.items[nums].itemId,
									pushTime : _d.data.data.items[nums].pushTime,
									realname : _d.data.data.items[nums].realname,
									status : _d.data.data.items[nums].status,
									img : require("../../../assets/image/yijiuzhen@2x.png"),
									span : "已就诊"
								});
							}

						}
					}
					if(this.list.keywords != ''){
						allNum = noNum + yesNum;
						this.list.allNum = allNum;
						this.list.noNum = noNum;
						this.list.yesNum = yesNum;
					}else{
						this.list.allNum  = _d.data.data.sum.totalCount;
					}
					// this.isLoading = false;
					// 加载状态结束
					this.loading = false;
				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: err});
			})
		},
		// 详情页
		getdata(){
			debugger
			let clinicId = '';
			this.list.clinicId? clinicId = this.list.clinicId: clinicId = this.account.clinicId;
			this.$route.name == 'hospital_sourceManagement'&&this.isLogin == 100?	clinicId='':'',
			this.$route.name == 'outpatient_search'&&this.isLogin == 100?	clinicId='':''
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw : this.list.keywords,
				hospitalId : this.account.hospitalId,
				clinicId : clinicId,
				pn : 1,
				ps : 10
			}))
			.then(_d => {
				// 加载状态结束
				this.list.clinicAll = [];
				let yesNum = 0;
				let noNum = 0;
				let allNum = 0;
				this.page = 2;
				if( _d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
						switch(this.isLogin){
							case 100:
							this.list.clinicAll.push({
								clinicName : _d.data.data.items[nums].clinicName,
								itemId : _d.data.data.items[nums].itemId,
								pushTime : _d.data.data.items[nums].pushTime,
								realname : _d.data.data.items[nums].realname,
								status : _d.data.data.items[nums].status,
								img : require("../../../assets/image/orange@2x.png"),
								button : "确认就诊",
								span : "未就诊"
							});
							break;
							case 200:
							this.list.clinicAll.push({
								clinicName : _d.data.data.items[nums].clinicName,
								itemId : _d.data.data.items[nums].itemId,
								pushTime : _d.data.data.items[nums].pushTime,
								realname : _d.data.data.items[nums].realname,
								status : _d.data.data.items[nums].status,
								img : require("../../../assets/image/weijiuzhen@2x.png"),
								span : "未就诊"
							});
						}
					}
				}else if(_d.data.data.items[nums].status == 4){
					switch(this.isLogin){
						case 100:
						this.list.clinicAll.push({
							clinicName : _d.data.data.items[nums].clinicName,
							itemId : _d.data.data.items[nums].itemId,
							pushTime : _d.data.data.items[nums].pushTime,
							realname : _d.data.data.items[nums].realname,
							status : _d.data.data.items[nums].status,
							img : require("../../../assets/image/blue@2x.png"),
							button : "已就诊",
							buttonColor : "buttonColor",
							span : "已就诊"
						});
						break;
						case 200:
						this.list.clinicAll.push({
							clinicName : _d.data.data.items[nums].clinicName,
							itemId : _d.data.data.items[nums].itemId,
							pushTime : _d.data.data.items[nums].pushTime,
							realname : _d.data.data.items[nums].realname,
							status : _d.data.data.items[nums].status,
							img : require("../../../assets/image/yijiuzhen@2x.png"),
							span : "已就诊"
						});
					}
				}

				if(this.list.keywords != ''){
					allNum = noNum + yesNum;
					this.list.allNum = allNum;
					this.list.noNum = noNum;
					this.list.yesNum = yesNum;
				}else{
					this.list.allNum  = _d.data.data.sum.totalCount;
				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: err});
			})

		},
		nextdata(){
			debugger
			let clinicId = '';
			this.list.clinicId? clinicId = this.list.clinicId: clinicId = this.account.clinicId;
			this.$route.name == 'hospital_sourceManagement'&&this.isLogin == 100?	clinicId='':'',
			this.$route.name == 'outpatient_search'&&this.isLogin == 100?	clinicId='':''
			this.$axios.post('/c2/patient/items',qs.stringify({
				hospitalId : this.account.hospitalId,
				clinicId : clinicId,
				pn : this.page,
				ps : 10,
			}))
			.then(_d => {
				this.page++;
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
						if(_d.data.data.items[nums].status == 1){
							switch(this.isLogin){
								case 100:
								this.list.clinicAll.push({
									clinicName : _d.data.data.items[nums].clinicName,
									itemId : _d.data.data.items[nums].itemId,
									pushTime : _d.data.data.items[nums].pushTime,
									realname : _d.data.data.items[nums].realname,
									status : _d.data.data.items[nums].status,
									img : require("../../../assets/image/orange@2x.png"),
									button : "确认就诊",
									span : "未就诊"
								});
								break;
								case 200:
								this.list.clinicAll.push({
									clinicName : _d.data.data.items[nums].clinicName,
									itemId : _d.data.data.items[nums].itemId,
									pushTime : _d.data.data.items[nums].pushTime,
									realname : _d.data.data.items[nums].realname,
									status : _d.data.data.items[nums].status,
									img : require("../../../assets/image/weijiuzhen@2x.png"),
									span : "未就诊"
								});
							}
							// this.list.clinicNo.push({
							// 	clinicName : _d.data.data.items[nums].clinicName,
							// 	itemId : _d.data.data.items[nums].itemId,
							// 	pushTime : _d.data.data.items[nums].pushTime,
							// 	realname : _d.data.data.items[nums].realname,
							// 	status : _d.data.data.items[nums].status,
							// 	img : "../../../assets/image/orange@2x.png",
							// 	button : "确认就诊"
							// });
							// this.noNum++;
							// this.list.noNum = this.noNum;
							// this.list.noNum = _d.data.data.sum.totalCount
						}else if(_d.data.data.items[nums].status == 4){
							// console.log(_d.data.data.items[nums].status )
							switch(this.isLogin){
								case 100:
								this.list.clinicAll.push({
									clinicName : _d.data.data.items[nums].clinicName,
									itemId : _d.data.data.items[nums].itemId,
									pushTime : _d.data.data.items[nums].pushTime,
									realname : _d.data.data.items[nums].realname,
									status : _d.data.data.items[nums].status,
									img :require( "../../../assets/image/blue@2x.png"),
									button : "已就诊",
									buttonColor : "buttonColor",
									span : "已就诊"
								});
								break;
								case 200:
								this.list.clinicAll.push({
									clinicName : _d.data.data.items[nums].clinicName,
									itemId : _d.data.data.items[nums].itemId,
									pushTime : _d.data.data.items[nums].pushTime,
									realname : _d.data.data.items[nums].realname,
									status : _d.data.data.items[nums].status,
									img :require( "../../../assets/image/yijiuzhen@2x.png"),
									span : "已就诊"
								});
							}
							// this.list.clinicYes.push({
							// 	clinicName : _d.data.data.items[nums].clinicName,
							// 	itemId : _d.data.data.items[nums].itemId,
							// 	pushTime : _d.data.data.items[nums].pushTime,
							// 	realname : _d.data.data.items[nums].realname,
							// 	status : _d.data.data.items[nums].status,
							// 	button : "确认就诊"
							// });
							// this.yesNum++;
							// this.list.yesNum = this.yesNum;
							// this.list.yesNum  = _d.data.data.sum.totalCount
						}
					}
					// 加载状态结束
					this.loading = false;
				}else{
					// this.$notify({
					// 	message: '数据已全部加载',
					// 	duration: 1000,
					// 	background:'#79abf9',
					// })
					this.loading = false;
					this.finished = true;
				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: err});
			});

		},
		onLoad(){
			this.nextdata()
		},
		yesFn(){
			// this.isLogin =true;
			this.nextdata();
		},
		noPostFn(){
			this.nextdata();
			// this.loading = true;
		},
		refresh(){
			// console.log(this.list.data);
			this.getdata()
			// this.getdata()
		}
	},
}
</script>

<style scoped>
.all{
	width: 100%;
}
.all li{
	height:.84rem;
	width: 91.5%;
	background-color: #FFFFFF;
	margin: .12rem auto;
	border-radius: .14rem;
	box-shadow: hsla(0, 0%, 0%, 10%) 0rem 0rem 0.1rem 0rem;
  position: relative;
}
.contentTitle{
	padding: .09rem 0rem .07rem .1rem;
}
.contentTitle img{
	width: .17rem;
	height: .17rem;
}
.contentTitle span{
	margin-left: .05rem;
	font-weight: bold;
}
.contnet_left{
	margin-left: .32rem;
	float: left;
}
.contnet_left span{
	display: block;
}
.contnet_left span:last-child{
	margin-top: .04rem;
}
.content_right{
	float: right;
	margin-right: .15rem;
	margin-top: -.03rem;
}
.content_right button{
	width: .8rem;
	height: .28rem;
	color: #FFFFFF;
	background-color: #2B77EF;
	border: none;
	border-radius: .14rem;
}
.buttonColor{
    color: #333333!important;
    background-color: #EEEEEE!important;
}
.clinicList{
	margin: 0 .12rem;
}
.clinicList li {
	height:1.01rem;
  width: 100%;
	margin-top:.12rem;
	background-color:#FFFFFF;
	position:relative;
	/*padding:.14rem .15rem;*/
}
.clinicList li p{
	position:absolute;
	bottom:0;
	height:.5rem;
	width:93%;
	line-height:.5rem;
	margin-left:.14rem;
	border-top:1px solid #E5E5E5;
}
.content_left{
	float:left;
	height:.5rem;
	margin-left:.15rem;
	margin-top:.14rem;
}
.content_right{
	position: absolute;
	height:.5rem;
	right:.14rem;
	bottom:0rem;
}
.content_right img{
	width:.11rem;
	height:.11rem;
	margin-right:.04rem;
}
.yes{
	color: #4DD865;
}
.no{
	color: #2B77EF;
}
</style>
