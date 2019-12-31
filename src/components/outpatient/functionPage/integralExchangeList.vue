<template>
	<div class="productsExchange">
		<div class="title" v-show="show? true : false">
			<h3>热门兑换</h3>
			<router-link :to="{name : 'outpatient_ExchangeList'}">
				<h3>更多</h3>
			</router-link>
		</div>
		<ul>
			<li v-for="(item,inx) in list" :key='inx'>
				<router-link :to="{name : 'outpatient_integralShop',query : {commodityId : item.commodityId}}">
					<div class="productsImg">
						<img :src="item.cover" alt="">
					</div>
					<h4>{{item.name}}</h4>
					<p><span>{{item.payExchangepoint}}</span> 积分</p>
					<button>立即兑换</button>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'integralExchangeList',
	data () {
		return {
			list : []
		}
	},
	computed:{
		...mapGetters(['account'])
	},
	components:{
		
	},
	created () {
		
	},
	props:['show'],
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
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
		this.$axios.post('/clientend2/clinicend/pointexchange/hots',qs.stringify({
			clinicId : this.account.clinicId,
			pn : 1,
			ps : 10
		}))
		.then(res => {
			if(res.data.codeMsg == null || res.data.codeMsg == '' || res.data.codeMsg == undefined){
				for(let i in res.data.data.items){
					this.list.push(res.data.data.items[i]);
				}
				console.log('ss')
			}else{
				this.$toast.fail(res.data.codeMsg)
			}
		})
		.catch((err)=>{
			Dialog({ message: err});
		})
	},
	methods: {
		
	},
}
</script>

<style scoped>
.productsExchange{
	width: 90.4%;
	background-color: #FFFFFF;
	padding: .12rem 4.8%;
}
.title h3{
	color: #333333;
	font-size: .15rem;
	font-weight: bolder;
	padding-bottom: .15rem;
	display: inline-block;
}
.title>a{
	float: right;
}
.productsExchange ul{
	width: 100%;
}
.productsExchange ul li{
	width: 48%;
	height: 2.11rem;
	display: inline-block;
	overflow: hidden;
	text-align: center;
	border: 1px solid #E5E5E5;
	margin-bottom: .09rem;
}
.productsExchange ul li:nth-child(2n){
	margin-left: .09rem;
}
.productsImg{
	width: 100%;
	height: 1.14rem;
	margin-bottom: .07rem;
	object-fit: cover;
	overflow: hidden;
}
.productsImg img{
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.productsExchange ul li h4{
	color: #333333;
	font-size: .15rem;
	font-weight: normal;
	padding-bottom: .02rem;
}
.productsExchange ul li p{
	font-size: .13rem;
}
.productsExchange ul li p span{
	color: #FF951B;
}
.productsExchange ul li button{
	width: .7rem;
	height: .21rem;
	color: #2B77EF;
	border: 1px solid #2B77EF;
	background-color: #FFFFFF;
	border-radius: .1rem;
	margin-top: .12rem;
}
</style>
