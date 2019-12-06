<template>
	<div class="exchangeList">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/iOS切图/shape@2x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>门诊兑换清单</h3>
			</div>
			<div class="right"></div>
		</div>
		<ul>
			<li>
				<ul>
					<li>
						<span>订单编号：939873423847</span>
					</li>
					<li>
						<h4>北京中日友好门诊</h4>
						<p>兑换时间：<span>2019/02/19 10:29</span></p>
						<p>兑换数量：<span>2</span></p>
					</li>
					<li>
						<p>使用积分：<span>50000</span></p>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'exchangeList',
	data () {
		return {
			
		}
	},
	computed:{
	  
	},
	components:{
		
	},
	created () {
		
	},
	mounted () {
	
	},
	methods: {
		goBackFn(){
			this.$router.back(-1)
		}
	},
}
</script>

<style scoped>
.exchangeList{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.topNav{x
	width: 100%;
	height: .47rem;
	margin-bottom: .15rem;
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
.exchangeList>ul{
	width: 100%;
}
.exchangeList>ul>li{
	width: 93.6%;
	height: 1.925rem;
	margin: 0rem auto;
	margin-top: .12rem;
	background-color: #FFFFFF;
}
.exchangeList>ul>li>ul{
	width: 91.453%;
	height: 100%;
	margin: 0rem auto;
}
.exchangeList>ul>li>ul>li:first-child{
	width: 100%;
	height: .425rem;
	line-height: .425rem;
	color: #999999;
	border-bottom: 1px solid #EEEEEE;
}
.exchangeList>ul>li>ul>li:nth-child(2){
	width: 100%;
	height: .75rem;
	border-bottom: 1px solid #EEEEEE;
	padding: .12rem 0rem;
}
.exchangeList>ul>li>ul>li:nth-child(2)>h4{
	font-weight: bold;
	font-size: .15rem;
	line-height: .34rem;
}
.exchangeList>ul>li>ul>li:nth-child(2)>p{
	color: #999999;
	line-height: .21rem;
	font-size: .13rem;
}
.exchangeList>ul>li>ul>li:last-child{
	height: .49rem;
	line-height: .49rem;
	text-align: right;
}
.exchangeList>ul>li>ul>li:last-child>p{
	color: #999999;
	font-size: .13rem;
}
.exchangeList>ul>li>ul>li:last-child>p>span{
	color: #FF951B;
}
</style>
