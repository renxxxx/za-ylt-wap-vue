<template>
	<div class="yes">
		<van-pull-refresh v-model="isLoading" @refresh="refresh">
			<ul>
				<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="onLoad">
					<li v-for="(item,inx) in list.clinicYes" :key="inx" @click="detailsValueFn(item)">
						<router-link :to="{name : 'details' ,params : {patientId : item.itemId}}">
							<div class="contentTitle">
								<img src="static/img/blue@2x.png" alt="">
								<span>{{item.realname}}</span>
							</div>
							<div class="contnet_left">
								<span>推送：{{moment(item.pushTime).format('YYYY-MM-DD')}}</span>
									<span>状态：未就诊</span>
							</div>
							<div class="content_right">
								<button  class="buttonColor">{{item.button}}</button>
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
	name: 'clinicYes',
	data () {
		return {
			// list.clinicYes :[],
			loading: false,
			// 加载状态结束
			finished: false,
			//显示下拉加载
			isLoading: false,
			page : 1,
			yesNum : 0,
			yesTitle :'已就诊',
		}
	},
	computed:{
	  ...mapGetters(['account']),

	},
	components:{

	},
	props:['list'],
	created () {

	},
	mounted () {
		// this.getdata();
		// this.clinicDetails = this.selectValue
	},
	methods: {
		// 详情页
		getdata(){
			this.yesNum = 0;
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw : this.list.keywords,
				hospitalId : this.account.hospitalId,
				clinicId : this.account.data.data.clinic.clinicId,
				status :4,
				pn : 1,
				ps : 10
			}))
			.then(_d => {
				this.finished = false;
				this.isLoading = false;
				this.loading = false;
				this.list.clinicYes =[];
				this.page = 2;
				console.log( _d.data.data.items.length)
				if( _d.data.data.items.length == 0){
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					this.finished = true;
				}else{
					for (let nums in _d.data.data.items) {
						this.list.clinicYes.push({
							clinicName : _d.data.data.items[nums].clinicName,
							itemId : _d.data.data.items[nums].itemId,
							pushTime : _d.data.data.items[nums].pushTime,
							realname : _d.data.data.items[nums].realname,
							status : _d.data.data.items[nums].status,
							button : "确认就诊"
						});
						// console.log(this.list.clinicYes)
					}
					// this.list.yesNum  = _d.data.data.sum.totalCount
					// console.log(_d.data.data.sum.totalCount)
					// this.list.allNum = this.list.noNum + this.list.yesNum;
					// this.list.allTitle = '全部' + this.list.allNum;
					// this.list.noTitle = '未就诊' + this.list.noNum;
					// this.list.yesTitle = '已就诊' + this.list.yesNum;
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
				clinicId : this.account.data.data.clinic.clinicId,
				status :4,
				pn : this.page,
				ps : 10,
			}))
			.then(_d => {
				this.page++;
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
						this.list.clinicYes.push({
							clinicName : _d.data.data.items[nums].clinicName,
							itemId : _d.data.data.items[nums].itemId,
							pushTime : _d.data.data.items[nums].pushTime,
							realname : _d.data.data.items[nums].realname,
							status : _d.data.data.items[nums].status,
							button : "确认就诊"
						});
						// this.yesNum++;
						// console.log(this.list.clinicYes)
					}
					// this.yesTitle = '已就诊' + this.yesNum
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
				Dialog({ message: '加载失败!'});
			})
		},
		detailsValueFn(_item){
			this.account.patientId = '';
			this.account.patientId = _item.itemId;
			console.log(this.account.patientId)
		},
		onLoad(){
			this.list.data? this.nextdata():''
		},
		refresh(){
			console.log(this.list.data);
			this.list.data? this.getdata():this.loading = false;
			// this.getdata()
		},
	},
}
</script>

<style scoped>
.yes{
	width: 100%;
}
.yes li{
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
