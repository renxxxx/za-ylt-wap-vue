<template>
	<div class="all">
		<van-pull-refresh v-model="isLoading" @refresh="refresh">
			<ul>
				<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="onLoad">
					<li v-for="(item,inx) in clinicDetails" :key="inx" @click="detailsValueFn(item)">
						<router-link :to="{name : 'details' ,params : {patientId : item.itemId}}">
							<div class="contentTitle">
								<img :src="item.img" alt="">
								<span>{{item.realname}}</span>
							</div>
							<div class="contnet_left">
								<span>推送：{{moment(item.pushTime).format('YYYY-MM-DD')}}</span>
									<span>状态：未就诊</span>
							</div>
							<div class="content_right">
								<button :class="item.buttonColor">{{item.button}}</button>
							</div>
						</router-link>
					</li>
				</van-list>
			</ul>
		</van-pull-refresh>
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
			clinicDetails :[],
			loading: false,
			// 加载状态结束
			finished: false,
			//显示下拉加载
			isLoading: false,
			// 请求页数
			page : 2,
			noNum: 0,
			yesNum: 0,
		}
	},
	computed:{
	  ...mapGetters(['account']),
	},
	props:['list'],
	components:{
		
	},
	created () {
		
	},
	mounted () {
		this.getdata();		
	},
	methods:{
		// 详情页
		getdata(){
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw : this.list.keywords,
				hospitalId : this.account.hospitalId,
				clinicId : this.list.clinicId,
				pn : 1,
				ps : 10
			}))
			.then(_d => {
				this.isLoading = false;
				// 加载状态结束
				this.loading = false;
				this.finished = false;
				this.clinicDetails =[];
				this.page = 2;
				if( _d.data.data.items.length == 0){
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					this.finished = true;
				}else{
					
					for (let nums in _d.data.data.items) {
						if(_d.data.data.items[nums].status == 1){
							this.clinicDetails.push({
								clinicName : _d.data.data.items[nums].clinicName,
								itemId : _d.data.data.items[nums].itemId,
								pushTime : _d.data.data.items[nums].pushTime,
								realname : _d.data.data.items[nums].realname,
								status : _d.data.data.items[nums].status,
								img : "static/img/orange@2x.png",
								button : "确认就诊"
							});
							this.noNum++;
							this.list.noNum = this.noNum;
							// console.log(this.list.noNum)
						}else if(_d.data.data.items[nums].status == 4){
							this.clinicDetails.push({
								clinicName : _d.data.data.items[nums].clinicName,
								itemId : _d.data.data.items[nums].itemId,
								pushTime : _d.data.data.items[nums].pushTime,
								realname : _d.data.data.items[nums].realname,
								status : _d.data.data.items[nums].status,
								img : "static/img/blue@2x.png",
								button : "已就诊",
								buttonColor : "buttonColor"
							});
							this.yesNum++;
							this.list.yesNum = this.yesNum;
							// console.log(this.yesNum)
						}
					}
					
					// this.list.yesNum  = _d.data.data.sum.yesNum;
					this.list.allNum = this.list.noNum + this.list.yesNum;
					this.list.allTitle = '全部' + this.list.allNum;
					this.list.noTitle = '未就诊' + this.list.noNum;
					this.list.yesTitle = '已就诊' + this.list.yesNum;
					// console.log(this.allTitle)
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: err});
			})
		},
		nextdata(){
			this.$axios.post('/c2/patient/items',qs.stringify({
				hospitalId : this.account.hospitalId,
				clinicId : this.list.clinicId,
				pn : this.page,
				ps : 10,
			}))
			.then(_d => {
				this.page++;
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
						if(_d.data.data.items[nums].status == 1){
							this.clinicDetails.push({
								clinicName : _d.data.data.items[nums].clinicName,
								itemId : _d.data.data.items[nums].itemId,
								pushTime : _d.data.data.items[nums].pushTime,
								realname : _d.data.data.items[nums].realname,
								status : _d.data.data.items[nums].status,
								img : "static/img/orange@2x.png",
								button : "确认就诊"
							});
							this.list.noNum = _d.data.data.sum.totalCount
						}else if(_d.data.data.items[nums].status == 4){
							// console.log(_d.data.data.items[nums].status )
							this.clinicDetails.push({
								clinicName : _d.data.data.items[nums].clinicName,
								itemId : _d.data.data.items[nums].itemId,
								pushTime : _d.data.data.items[nums].pushTime,
								realname : _d.data.data.items[nums].realname,
								status : _d.data.data.items[nums].status,
								img : "static/img/blue@2x.png",
								button : "已就诊",
								buttonColor : "buttonColor"
							});
							this.list.yesNum  = _d.data.data.sum.totalCount
						}
					}
					this.list.allNum = this.list.noNum + this.list.yesNum;
					this.list.allTitle = '全部' + this.list.allNum;
					this.list.noTitle = '未就诊' + this.list.noNum;
					this.list.yesTitle = '已就诊' + this.list.yesNum;
					// console.log(this.allNum)
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					// console.log(this.message)
				}else{
					this.$notify({
						message: '数据已全部加载',
						duration: 1000,
						background:'#79abf9',
					})
					this.loading = false;
					this.finished = true;
				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: err});
			})
		},
		detailsValueFn(_item){
			this.account.patientId = '';
			this.account.patientId = _item.itemId;
			console.log(this.account.patientId)
		},
		onLoad(){
			this.nextdata()
		},
		refresh(){
			console.log(this.keywords);
			this.getdata()
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
</style>
