<template>
	<div class="content">
		<!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
			<ul>
				<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad">
					<li v-for="(items,inx) in content" :key="inx">
						<router-link :to="{name : 'hospital_clinicDetails' ,query :  {clinicId : items.hospitalClinicId}}">
							<div class="contentLi">
								<h4>{{items.name}}</h4>
								<span>推广人: {{items.hospitalUserName}}</span>
								<input type="text" v-model="items.patientCount" readonly="readonly">
							</div>
						</router-link>
					</li>
				</van-list>
			</ul>
		<!-- </van-pull-refresh> -->
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
	name: 'content',
	data () {
		return {
			isLoading: true,
			loading: false,
			finished: false,
			content : [],
			page:1
		}
	},
	props:['clinic'],
	computed:{
		...mapGetters(['account']),
	},
	components:{

	},
	created () {

	},
	mounted () {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
    this.$axios.get('/hospital/super-admin/hospital-clinics-sum?')
    .then(res => {
    	this.clinic.num = res.data.data.rowCount;
    })
    .catch((err)=>{
    	console.log(err);
    })
	},
	methods: {
		onRefresh() {
			this.page = 1;
			this.content = [];
			this.getdata(0)
		},
		getdata(){
			this.$axios.get('/hospital/super-admin/hospital-clinics?'+qs.stringify({pn:this.page})+'&'+qs.stringify({ps:10}))
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
		onLoad(){
			this.getdata()
			this.page++
		},
	},
}
</script>

<style scoped>
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
    margin-top: 2rem;
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
