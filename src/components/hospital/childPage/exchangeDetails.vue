<template>
	<div class="exchangeDetails">
		<div class="topNav" :style="{'padding-top': height+'px'}">
			<div class="leftImg" @click="goBackFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>专家介绍</h3>
			</div>
			<div class="right"></div>
		</div> 
		<div class="zhangwei" :style="{'padding-top': height+'px'}"></div>
		<div class="address">
			<div class="addressLeft">
				<img src="../../../assets/image/exchangeAdress.png" alt="">
			</div>
			<div class="addressCenter">
				<h4>{{exchangeDetails.receiverName}}</h4>
				<span>{{exchangeDetails.receiverTel}}</span>
				<p>{{exchangeDetails.receiverAddress}}</p>
			</div>
		</div>
		<div class="productList">
			<div class="listTitle">
				<h4>{{exchangeDetails.clinicName}}</h4>
			</div>
			<ul>
				<li>
					<img src="../../../assets/image/Group@2x.png" alt="">
					<h5>{{exchangeDetails.details[0].name}}</h5>
					<p>{{exchangeDetails.details[0].intro}}</p>
					<p>{{moment(exchangeDetails.addTime).format('YYYY-MM-DD HH:mm')}}</p>
					<p>数量<span>{{exchangeDetails.details[0].count}}</span></p>
				</li>
			</ul>
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
	created(){
		var heightRexg = /^[0-9]*/g
		var topHeight = this.topHeight.match(heightRexg)
		this.height = parseInt(topHeight.join()) 
		console.log(this.height)
	},
	beforeRouteLeave(to, from, next) {
     ;
    this.scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
     ;
    next(vm => {
      document.body.scrollTop = vm.scrollTop;
    });
  }, activated() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
		console.log(this.$route.query.item.orderId);
		this.$axios.post('/clientend2/hospitalend/exchangemanage/orderinfo',qs.stringify({
			orderId : this.$route.query.item.orderId,
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
	position: fixed;
	top:0;
	z-index: 9999;
}	
.zhangwei{
	width: 100%;
	height: .48rem;
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
.productList{
	width: 100%;
	background-color: #FFFFFF;
	margin-top: .155rem;
}
.listTitle{
	height: .52rem;
	line-height: .52rem;
}
.listTitle h4{
	padding-left: .16rem;
	font-size: .15rem;
	border-bottom: 1px solid #EEEEEE;
}
.productList ul{
	width: 100%;
}
.productList ul li{
	height: .56rem;
	padding: .16rem;
	padding-left: 0rem;
	margin-left: 4.27%;
	position: relative;
}
.productList ul li img{
	width: .66rem;
	height: .66rem;
	object-fit: cover;
	float: left;
	margin-right: .14rem;
}
.productList ul li h5{
	color: #333333;
	font-size: .14rem;
	font-weight: bold;
}
.productList ul li p{
	color: #999999;
	font-size: .125rem;
}
.productList ul li p:nth-child(4){
	padding-top: .05rem;
}
.productList ul li p:last-child{
	position: absolute;
	right: .16rem;
	bottom: .15rem;
}
.productList ul li p:last-child span{
	color: #333333;
	font-size: .145rem;
	padding-left: .15rem;
}
</style>
