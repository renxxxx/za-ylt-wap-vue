<template>
	<div class="ExchangeList">
		<div class="topNav" :style="{'padding-top': height+'px'}">
			<div class="leftImg" @click="goBackFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>兑换列表</h3>
			</div>
		</div> 
		<div class="zhangwei" :style="{'height':(height+60)+'px'}"></div>
		<integralExchangeList></integralExchangeList>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import integralExchangeList from '../functionPage/integralExchangeList.vue'
export default {
	name: 'ExchangeList',
	data () {
		return {
			
		}
	},
	computed:{
	  
	},
	components:{
		integralExchangeList
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
      document.documentElement.scrollTop=document.body.scrollTop = vm.scrollTop;
    });
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
	
	},
	methods: {
		goBackFn(){
			this.$router.back(-1);
		},
	},
}
</script>

<style scoped>
.ExchangeList{
	width:100%;
	height: 100%;
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: .5rem;
	background-color: #FFFFFF;
	text-align: center;
	margin-bottom: .12rem;
	position: fixed;
	top:0;
	z-index: 9999;
}	
.zhangwei{
	width: 100%;
	/* height: .47rem; */
}
.leftImg{
	width: 22%;
	height: .47rem;
	line-height: .47rem;
	float:left;
	text-align: left;
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
	/* display:inline-block; */
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
</style>
