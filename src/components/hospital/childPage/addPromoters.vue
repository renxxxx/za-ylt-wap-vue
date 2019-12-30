<template>
	<div class="addPromoters">
		<div class="topNav" :style="{'padding-top': height+'px'}">
			<div class="leftImg" @click="goBackFn">
				<img src="../../../assets/image/shape@2x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>人员列表</h3>
			</div>
			<div class="right"></div>
		</div>
		<div class="zhangwei"></div>
		<ul>
			<li>
				<h4>姓名</h4>
				<input type="text" placeholder="请输入">
			</li>
			<li>
				<h4>编号</h4>
				<input type="text" placeholder="请输入">
			</li>
			<li>
				<h4>备注</h4>
				<input type="text" placeholder="请输入">
			</li>
		</ul>
		<button @click="submitFn">保存</button>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'addPromoters',
	data () {
		return {
			addPromoters:{
				name : ''
			}
		}
	},
	computed:{
	  
	},
	components:{
		
	},
	created(){
		var heightRexg = /^[0-9]*/g;
		var topHeight = this.topHeight.match(heightRexg);
		this.height = parseInt(topHeight.join()) ;
		// console.log(this.height);
	},
	beforeRouteLeave(to, from, next) {
		this.scrollTop =
		  document.documentElement.scrollTop || document.body.scrollTop;
		next();
	},
	  //进入该页面时，用之前保存的滚动位置赋值
	beforeRouteEnter(to, from, next) {
		next(vm => {
		  document.body.scrollTop = vm.scrollTop;
		});
	},
	activated(){
		
	},
	methods: {
		goBackFn(){
			this.$router.back(-1)
		},
		submitFn(){
			
		}
	},
}
</script>

<style scoped>
.addPromoters{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
	position: relative;
}
.topNav{
	width: 100%;
	height: .47rem;
	position: fixed;
	top:0;
	z-index: 999;
	background-color: #2B77EF;
}	
.zhangwei{
	width: 100%;
	height: .47rem;
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
	width:56%;
	text-align: center;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.centerTitle h3{
	font-size: .16rem;
	font-weight: bolder;
	color: #333333;
	color: #FFFFFF;
}
.right{	
	width: 22%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.addPromoters ul{
	width: 100%;
}
.addPromoters ul li{
	width: 91.46%;
	height: .45rem;
	line-height: .45rem;
	margin: .12rem auto 0;
	border: 1px solid #D8D8D8;
	position: relative;
}
.addPromoters ul li h4{
	color: #333333;
	font-size: .14rem;
	margin-left: .15rem;
	display: inline-block;
}
.addPromoters ul li input{
	display: inline-block;
	text-align: right;
	height: .21rem;
	position: absolute;
	top:0;
	bottom: 0;
	right: .15rem;
	margin: auto 0;
	font-size: .14rem;
	color: #2B77EF;
	border: none;
}
.addPromoters>button{
	width: 65.3%;
	height: .4rem;
	color: #FFFFFF;
	line-height: .4rem;
	position: absolute;
	bottom: 19.5%;
	left: 0;
	right: 0;
	margin: 0rem auto;
	background-color: #2B77EF;
	border: none;
	border-radius: .2rem;
	font-size: .145rem;
	font-weight: bold;
}
</style>
