<template>
	<div class="exchangeAddImg">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/iOS切图/shape@2x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>推送通知</h3>
			</div>
			<div class="right">
				<button>完成</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'exchangeAddImg',
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
			// exchangeManagementAdd
		},
	},
}
</script>

<style scoped>
.exchangeAddImg{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	margin-bottom: .15rem;
	background-color: #FFFFFF;
	border-bottom: 1px solid #D8D8D8;
}	
.leftImg{
	width: 18%;
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
	width: 64%;
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
	width: 18%;
	height: .47rem;
	line-height: .47rem;
	float:right;
}
.right button{
	width: .56rem;
	height: .3rem;
	line-height: .3rem;
	text-align: center;
	color: #FFFFFF;
	background-color: #2B77EF;
	border: none;
	border-radius: .03rem;
}
</style>
