<template>
	<div class="exchangeDetails">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/img/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>专家介绍</h3>
			</div>
			<div class="right"></div>
		</div> 
		<div class="address">
			<div class="addressLeft">
				<img src="static/img/exchangeAdress.png" alt="">
			</div>
			<div class="addressCenter">
				<h4>邵先生</h4>
				<span>153*****38</span>
				<p>江苏省 南京市 鼓楼区 XX路</p>
			</div>
			<div class="addressRight">
				
			</div>
			
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'exchangeDetails',
	data () {
		return {
			exchangeDetails:{}
		}
	},
	computed:{
	  
	},
	components:{
		
	},
	created () {
		
	},
	mounted () {
		console.log(this.$route.params.item.orderId);
		this.$axios.post('/clientend2/hospitalend/exchangemanage/orderinfo',qs.stringify({
			orderId : this.$route.params.item.orderId,
		}))
		.then(res => {
			res.data.codeMsg? Toast.success(res.data.codeMsg) : this.successFn(res);
		})
		.catch((err)=>{
			Dialog({ message: err});
		})
	},
	methods: {
		goBackFn(){
			this.$router.back(-1)
		},
		successFn(res){
			this.exchangeDetails = res.data.data;
			console.log(this.exchangeDetails)
		}
	},
}
</script>

<style scoped>
.exchangeDetails{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: .47rem;
	background-color: #FFFFFF;
}	
.leftImg{
	width: 10%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
	line-height: .47rem;
	padding-left: .16rem;
}
.centerTitle{
	width: 80%;
	text-align: center;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.centerTitle h3{
	font-size: .16rem;
	font-weight: bolder;
}
.right{	
	width: 10%;
	height: .47rem;
	line-height: .47rem;
	float:right;
}
.address{
	width: 100%;
	height: .8rem;
	background-color: #FFFFFF;
	margin-top: .12rem;
}
.addressLeft{
	width: .5rem;
	height: 100%;
	float: left;
	text-align: center;
}
.addressLeft img{
	width: .18rem;
	height: .22rem;
	margin-top: .29rem;
}
.addressCenter{
	height: .555rem;
	line-height: .26rem;
	float: left;
	display: block;
	margin-top: .12rem;
}
.addressCenter p{
	font-size: .15rem;
	color: #333333;
}
.addressCenter p:last-child{
	display: block;
	margin-bottom: .1rem;
}
.addressCenter h4{
	font-size: .15rem;
	color: #333333;
	display: inline;
}
.addressCenter span{
	color: #999999;
	font-size: .14rem;
}
</style>
