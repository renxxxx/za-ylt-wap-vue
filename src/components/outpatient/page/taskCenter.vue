<template>
	<div class="taskCenter">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/img/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<!-- <h3>任务管理</h3> -->
			</div>
			<div class="right">
				<span>我要兑换</span>
			</div>
			<div class="Explain">
				<button>积分说明</button>
			</div>
		</div> 
		<div class="centerOnce">
			<ul>
				<h3 class="titleBefore">首次收益</h3>
				<li v-for="(item,inx) in 5" key='inx'>
					<h4>首次上传病源<span>+20000</span></h4>
					<p>首次给上级医院上传病源</p>
					<button :class="buttonColor? 'buttonColorYes':'buttonColorNo'">去完成</button>
				</li>
			</ul>
		</div>
		<div class="centerDate">
			<ul>
				<h3 class="titleBefore">首次收益</h3>
				<li v-for="(item,inx) in 5" key='inx'>
					<h4>首次上传病源<span>+1</span> <span>/每日首次登录</span></h4>
					<p>已获0分/上限10分</p>
					<button :class="buttonColor? 'buttonColorYes':'buttonColorNo'">去完成</button>
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
	name: 'taskCenter',
	data () {
		return {
			buttonColor: false
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
.taskCenter{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: 1.76rem;
	background: url('../../../../static/img/tu1.png')  center no-repeat,linear-gradient(#FDFDFD, #FBFBFB) ;
	background-size: 1.84rem 1.29rem;
	margin-bottom: .15rem;
	position: relative;
}	
.leftImg{
	width: 22%;
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
	width: 56%;
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
	width: 22%;
	height: .47rem;
	line-height: .47rem;
	text-align: right;
	float:left;
}
.right span{
	color: #2B77EF;
	font-size: .14rem;
	padding-right: .16rem;
}
.Explain{
	position: absolute;
	right: 0;
	bottom: .12rem;
}
.Explain button{
	width: .86rem;
	height: .285rem;
	border: none;
	border-radius: .5rem  0rem 0rem  .5rem ;
	color: #FFFFFF;
	background-color: #459AE9;
}
.centerOnce,.centerDate{
	width: 100%;
	margin: .12rem 0rem;
	background-color: #FFFFFF;
}
.centerOnce ul,.centerDate ul{
	width: 91.46%;
	margin: 0rem auto;
}
.centerOnce ul h3,.centerDate ul h3{
	color: #999999;
	position: relative;
	padding: .15rem 0rem;
	padding-left: .1rem!important;
}
.centerOnce ul li,.centerDate ul li{
	width: 100%;
	height: .67rem;
	line-height: .67rem;
	position: relative;
	border-bottom: 1px solid #EEEEEE;
}
.titleBefore:before {
    content: "";
    display: inline-block;
    width: .04rem;
    height: .11rem;
    background-color: #2B77EF;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* border-radius: 3px; */
    position: absolute;
    top: .185rem;
    left: -0rem;
}
.centerOnce ul li h4,.centerDate ul li h4{
	width:60%;
	color: #333333;
	line-height: .22rem;
	font-size: .14rem;
	font-weight: bolder;
	padding-top: .12rem;
	padding-bottom: .06rem;
}

.centerOnce ul li h4 span,.centerDate ul li h4 span{
	color: #FF1A2E;
	font-size: .13rem;
	margin-left: .15rem;
	font-weight: normal;
}
.centerDate ul li h4 span:last-child{
	font-size: .13rem;
	margin-left: 0rem;
	font-weight: normal;
	color: #999999;
}
.centerOnce ul li p,.centerDate ul li p{
	width:60%;
	line-height: .16rem;
	font-size: .12rem;
	color: #666666;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.centerOnce ul li button,.centerDate ul li button{
	position: absolute;
	bottom: .18rem;
	right: .16rem;
	width: .8rem;
	height: .3rem;
	line-height: .3rem;
	text-align: center;
	
	border-radius: .15rem;
}
.buttonColorYes{
	color: #666666;
	background-color: #E5E5E5;
	border: none;
}
.buttonColorNo{
	color: #E2403F;
	background-color: #FFFFFF;
	border: 1px solid #E2403F;
}
</style>
