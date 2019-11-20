<template>
	<div class="gene">
		<div class="topNav">
			<div class="nav_left">
				<img src="static/iOS切图/scanning@2x.png" alt="">
			</div>
			<div class="nav_center">
				<h3>基因检测</h3>
			</div>
			<div class="nav_right">
				<van-dropdown-menu >
					<van-dropdown-item v-model="value" :options="option" @change="menuFn"/>
				</van-dropdown-menu>
			</div>
		</div>
		<div class="geneList">
			<ul>
				<li>
					<div class="statisticalLeft">
						<span>分配检测盒</span>
					</div>
					<div class="statisticalRight">
						<span>剩余 20个</span>
						<img src="static/iOS切图/Chevron Copy 2@2x.png" alt="">
					</div>
				</li>
				<li>
					<div class="title">
						<div class="titleLeft">	
							<img src="static/iOS切图/small-logo@2x.png" alt="">
							<span>江苏省人民医院</span>
						</div>
						<div class="titleRight"> 
							<img src="static/iOS切图/no@2x.png" alt="">
							<span>未采样本</span>
						</div>
					</div>
					
					<div class="content">
						<span>编号：1111111111111111111</span>
					</div>
				</li>
				<li>
					<div class="title">
						<div class="titleLeft">	
							<img src="static/iOS切图/small-logo@2x.png" alt="">
							<span>江苏省人民医院</span>
						</div>
						<div class="titleRight"> 
							<img src="static/iOS切图/yes@2x.png" alt="">
							<span class="overColor">已出报告</span>
						</div>
					</div>
					
					<div class="contentSpan">
						<span class="content_span">编号：1111111111111111111</span>
						<span class="content_span">姓名：1111111111111111111</span>
					</div>
				</li>
				<li>
					<div class="title">
						<div class="titleLeft">	
							<img src="static/iOS切图/small-logo@2x.png" alt="">
							<span>江苏省人民医院</span>
						</div>
						<div class="titleRight"> 
							<img src="static/iOS切图/wait@2x.png" alt="">
							<span class="nowColor">未出报告</span>
						</div>
					</div>
					
					<div class="contentSpan">
						<span class="content_span">编号：1111111111111111111</span>
						<span class="content_span">姓名：1111111111111111111</span>
					</div>
				</li>
			</ul>
		</div>
		<bottomNav v-bind:name='name'></bottomNav>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import bottomNav from './childPage/bottomNav.vue'
export default {
	name: 'gene',
	data () {
		return {
			name: 'gene',
			value: 0,
			option: [
			    { text: '全部', value: 0 },
			    { text: '未采样本', value: 1 },
			    { text: '已出报告', value: 2 },
				{ text: '未出报告', value: 3 }
			]
		}
	},
	components:{
		bottomNav
	},
	computed:{
	  
	},
	created () {
		
	},
	mounted () {
		
	},
	methods: {
		// 基因状态菜单选择返回值
		menuFn(_value){
			let _geneData =  this.option.find( n => n.value == _value);
			console.log(_geneData.text);
		}
	},
}
</script>

<style scoped>
.topNav{
	width: 100%;
	height: .47rem;
	background-color: #FFFFFFFF;
}
.nav_left{
	float: left;
	width: 27%;
	height:.47rem;
	line-height:.47rem;
	/* text-align:center; */
}
.nav_left img{
	margin-left: .15rem;
	width: .2rem;
	height: .2rem;
}
.nav_center{
	float: left;
	width: 46%;
	height:.47rem;
	line-height:.47rem;
	text-align:center;
}
.nav_center h3{
	font-weight: bold;
	font-size: .16rem;
}
.nav_right{
	float: left;
	width: 27%;
	height:.47rem;
	line-height:.47rem;
	text-align:center;
}

>>>.van-dropdown-menu {
    height: .47rem!important;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
}
.geneList{
	width: 100%;
	height: 100%;
}
.geneList ul{
	height: 100%;
	width: 100%;
}
.geneList ul li{
	width: 93.6%;
	margin: 0rem auto;
	margin-top: .12rem;
	background-color: #FFFFFF;
	border-radius: .03rem;
}
.geneList ul li:first-child{
	height: .49rem;
	line-height: .49rem;
}
.statisticalLeft{
	float: left;
}
.statisticalLeft span{
	float: left;
	margin-left: .15rem;
	color: #2B77EF;
	font-size: .13rem;
}
.statisticalRight{
	float: right;
}
.statisticalRight span{
	color: #666666;
}
.statisticalRight img{
	width: .07rem;
	height: .11rem;
	margin-left: .05rem;
	margin-right: .15rem;
}
.title{
	display: block;
	height: .5rem;
	line-height: .5rem;
	border-bottom: 1px solid #E5E5E5;
}
.titleLeft{
	float:left;width:76.4%;
	position:relative;
}
.titleLeft img{
	position: absolute;
	width: .23rem;
	height: .15rem;
	top:.175rem;
	left: .15rem;
	right: .1rem;
}
.titleLeft span{
	font-weight: bold;
	margin-left:.48rem;
	font-size: .14rem;
}
.titleRight{	
	float:right;
	width:23.6%;
	color: #2B77EF;
}	
.titleRight img{
	height: .11rem;
	width: .11rem;
}
.content{
	display: block;
	height: .42rem;
	line-height: .42rem;
}
.content span{
	display: block;
	margin-left: .15rem;
}
.contentSpan{
	height: .54rem;
}
.contentSpan span{
	display: block;
	height: .21rem;
	line-height: .21rem;
	margin-left: .15rem;
}
.contentSpan span:first-child{
	margin-top: .12rem;
}
.overColor{
	color: #FF951B;
}
.nowColor{
	color: #1ECAC6;
}
</style>
