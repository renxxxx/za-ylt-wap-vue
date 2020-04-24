<template>
	<div class="content">
		<!-- <span>已找到 {{clinicNum}} 条数据</span> -->
			<ul>
				<van-list  v-model="loading" :finished="finished" :finished-text="test"  @load="getNextPage">
					<li v-for="(items,inx) in content" :key="inx">
						<router-link :to="{path : '/operating/operating_clinicDetails' ,query :  {clinicId : items.itemId,}}">
							<div class="contentLi">
								<h4>{{items.name}}</h4>
								<span>推广人: {{items.clinicPromoterName}}</span>
								<input type="text" v-model="items.pushCount" readonly="readonly">
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
import qs from 'qs'
import { Dialog } from 'vant'
export default {
	name: 'content',
	data () {
		return {
			loading: false,
			finished: false,
			content : [],
			page:0,
			clinicNum : 0,
      test:''
		}
	},
	props:['show'],
	computed:{
	},
	components:{

	},
	created () {

	},
	activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			this.$axios.get('/hospital/super-admin/hospital-clinics-sum?')
			.then(res => {
				this.clinicNum = res.data.data.rowCount;
			})
			.catch((err)=>{
				
			})
			// this.getNextPage()
		}
  	},
 	mounted() {

	  
		// if(window.plus){
		// 	//plus.navigator.setStatusBarBackground("#ffffff");
		// 	plus.navigator.setStatusBarStyle("dark")
		// }
		//  this.$axios.get('/hospital/super-admin/hospital-clinics-sum?')
		//   .then(res => {
		//   	this.clinicNum = res.data.data.rowCount;
		//   })
		//   .catch((err)=>{
		  	
		//   })
	},
	methods: {
		initData() {
		  Object.assign(this.$data, this.$options.data());
		  this.getNextPage();
		},
		getdata(){
			this.$axios.get('/c2/clinic/items?'+qs.stringify({pn:this.page,hospitalId: this.$route.query.hospitalId,ps:10}))
			.then(res => {
				if(res.data.data.items.length != 0){
					for(let i in res.data.data.items){
						if(res.data.data.items[i]){
							this.content.push(res.data.data.items[i])
						}
						this.clinicNum = res.data.data.sum.totalCount
						// 
					}
				// 加载状态结束
				this.loading = false;
				}else{
					this.loading = false;
          this.test='没有更多了'
					this.finished = true;
				}
        
        if(this.content.length == 0){
          this.test='无数据'
        }
				// this.clinic.num = res.data.data.sum.totalCount;
			})
			.catch((err)=>{
				
			})

		},
		getNextPage(){
			this.page++
			this.getdata()

		},
	},
}
</script>

<style scoped>
.content{
	width: 100%;
	/* position: fixed; */
	/* height: calc(100% - 2.5rem); */
	height: 100%;
	/* overflow: scroll; */
}
.content>span{
	width: 94.6%;
	margin: 0 auto;
	display: block;
	margin-bottom: .05rem;
	color: #999999;
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
	box-shadow: 0px 0px 5px 0.5px #ded9d9;
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
