<template>
	<div class="list">
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<div class="list">
				<ul :model="message" class="index_content">
					<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad">
						<router-link to="/outpatient_details" >
							<li v-for="(_notDiagnosis,inx) in message.notDiagnosis" :key="inx" @click="detailsValueFn(_notDiagnosis)">
								<div class="content_left">
									<span>{{_notDiagnosis.realname}}</span>
								</div>
								<div class="content_right">
									<img src='static/门诊端/iOS切图/weijiuzhen@2x.png'>
									<span class="AlreadySpanColor">未就诊</span>
								</div>
								<p>{{moment(_notDiagnosis.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
							</li>
						</router-link>
					</van-list>
				</ul>
			</div>
		</van-pull-refresh>
	</div>
	
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'list',
	data () {
		return {
			//关键字
			keywords : '',
			//显示下拉加载
			isLoading: false,
			// 加载状态结束
			finished: false,
			// 数据全部加载完成
			loading: false,
			//页数
			page : 2,
			//获取动态数据
			message:{
				//未就诊
				notDiagnosis:[],
				//未就诊
				diagnosis:[],
			},
			noTitle:'未就诊',
		}
	},
	computed:{
	  
	},
	components:{
		
	},
	created () {
		
	},
	mounted () {
		...mapGetters(['Time','labelDocument','show','showTime','detail','account','search_userList']),
		show: {
		      get: function() {
		  		// console.log(this.$store)
		          return this.$store.state.shop.show
		      },
		      set: function (newValue) {
		  		this.$store.state.shop.show = newValue;
		      },
		},
		showTime: {
		    get: function() {
				// console.log(this.$store)
		        return this.$store.state.shop.showTime
		    },
		    set: function (newValue) {
				this.$store.state.shop.showTime = newValue;
		    },
		},
		search_userList: {
		    get: function() {
				// console.log(this.$store)
		        return this.$store.state.shop.search_userList
		    },
		    set: function (newValue) {
				this.$store.state.shop.search_userList = newValue;
		    },
		},
	},
	methods: {
		//上拉加载数据
		onLoad(){
		  this.getdata(1,this.message.notDiagnosis,1);
		},
		//获取下一页
		onRefresh(){
			this.message.notDiagnosis = []
			this.getdata(1,this.message.notDiagnosis,0);
		},
		getdata(data,_value,shuaxin){
			if(shuaxin ==0 ){
				this.$axios.post('/c2/patient/items',qs.stringify({
					kw	:	"",
					clinicId : this.account.data.data.clinic.clinicId,
					name : "",
					hospitalId : this.account.data.data.hospital.hospitalId,
					status : data ,
					orders : 'asc',
					pn : 1,
					ps : 10
				}))
				.then(_d => {
					if(_d.data.data.items.length != 0){
						// console.log(this.page)
						for (let nums in _d.data.data.items) {
						    _value.push(_d.data.data.items[nums]);
						}
						this.isLoading = false;
						// 加载状态结束
						this.loading = false;
						this.noTitle = '未就诊' + _d.data.data.sum.totalCount
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
			}else{
				this.$axios.post('/c2/patient/items',qs.stringify({
					kw	:	"",
					clinicId : this.account.data.data.clinic.clinicId,
					name : "",
					hospitalId : this.account.data.data.hospital.hospitalId,
					status : data ,
					orders : 'asc',
					pn : this.page,
					ps : 10
				}))
				.then(_d => {
					if(_d.data.data.items.length != 0){
						// console.log(this.page)
						for (let nums in _d.data.data.items) {
						    _value.push(_d.data.data.items[nums]);
						}
						this.loading = false;
						this.page++	
						this.noTitle = '未就诊' + _d.data.data.sum.totalCount
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
			}
			
		},
	},
}
</script>

<style>
.list{
	width: 100%;
}
</style>
