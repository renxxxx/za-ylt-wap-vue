<template>
	<div class="exchange">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/iOS切图/shape@2x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>推送通知</h3>
			</div>
			<div class="right">
				<img src="static/iOS切图/liebiao@3x.png" alt="">
			</div>
		</div>
		<div class="exchangeTitle">
			<h3>已有商品</h3>
			<div class="add">
				<span>新增</span>
				<img src="static/iOS切图/xinzeng@2x.png" alt="">
			</div>
		</div>
		<ul class="exchangeLists">
			<li>
				<img src="static/iOS切图/bj-keshi.png" alt="">
				<div class="listContent">
					<h4>激光穿刺针</h4>
					<p><span>50000</span>积分</p>
					<span>数量</span>
				</div>
				<span>500</span>
			</li>
			
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'exchangeManagement',
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
		//回退方法
		goBackFn(){
				 this.$router.back(-1)
		},
	},
}
</script>

<style scoped>
.exchange{
	width: 100%;
}
.topNav{
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
.right img{
	width: .17rem;
	height: .2rem;
}
.exchangeTitle{
	width: 90.4%;
	height: .26rem;
	line-height:.26rem;
	margin: .15rem auto;
}
.exchangeTitle h3{
	font-weight: bold;
	font-size: .16rem;
	float: left;
}
.add{
	float: right;
}
.add span{
	font-size: .15rem;
	float: left;
}
.add img{
	width: .19rem;
	height: .19rem;
	margin-left: .05rem;
}
.exchangeLists{
	width: 100%;
}
.exchangeLists>li{
	width: 91.46%;
	height: .98rem;
	background-color: #FFFFFF;
	margin: 0rem auto;
	margin-bottom: .12rem;
	border-radius: .03rem;
	position: relative;
}
.exchangeLists>li>img{
	width: .66rem;
	height: .66rem;
	margin: .16rem 0rem;
	margin-left: .16rem;
	border: .02rem;
	float: left;
}
.listContent{
	height: .68rem;
	float: left;
	margin-top: .14rem;
	margin-left: .12rem;
}
.listContent h4{
	font-size: .15rem;
	font-weight: bold;
}
.listContent p{
	color: #999999;
	font-size: .14rem;
}
.listContent>p>span{
	color: #FF951B;
}
.listContent>span{
	display: block;
	font-size: .15rem;
	margin-top: .03rem;
}
.exchangeLists>li>span{
	position: absolute;
	right: .18rem;
	bottom: .16rem;
	font-size: .14rem;
}
</style>
