<template>
	<div class="sourceManagement">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>北京中日友好门诊</h3>
			</div>
			<div class="rightImg">
				<img src="../../../assets/image/promotersEditor.png" alt="">
			</div>
			<div class="navZhanwei"></div>
			<div class="navTime">
				<span>2019-02-19 12:39</span>
			</div>
		</div>
		
		<div style="height: .575rem;width: 100%;"></div>
		<div class="addEtiology">
			<img src="../../../assets/image/xinzeng@2x.png" alt="">
			<span>新增病原</span>
		</div>
		<div class="stateNav">
			<van-tabs title-inactive-color='#333333' title-active-color="#FF932E" border = 'false'>
				<van-tab title="全部病源">
					内容 1
				</van-tab>
				<van-tab title="已就诊" >
					内容 2
				</van-tab>
				<van-tab title="未就诊">
					内容 3
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: '',
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
.sourceManagement{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .475rem;
	/* line-height: .575rem; */
	position: fixed;
	tab-size: 0;
	text-align: center;
	padding-top: .1rem ;
}
.leftImg{
	width: 10%;
	float: left;
	line-height: .25rem;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
}
.centerTitle{
	width: 80%;
	float: left;
	line-height: .25rem;
}
.centerTitle h3{
	color: #333333;
	font-size: .16rem;
	font-weight: bolder;
	display: inline-block;
}
.rightImg{
	width: 10%;
	float: left;
	line-height: .25rem;
}
.rightImg img{
	width: .19rem;
	height: .2rem;
}
.navZhanwei{
	height: .25rem;
}
.navTime{
	width: 100%;
	text-align: center;
	position: absolute;
}
.navTime span{
	font-size: .13rem;
	color: #999999;
}
.addEtiology{
	width: 91.47%;
	height: .42rem;
	line-height: .42rem;
	margin: .1rem auto 0rem;
	text-align: center;
	background-color: #EAF2FF;
}
.addEtiology img{
	width: .16rem;
	height: .16rem;
	margin-top: -.03rem;
}
.addEtiology span{
	font-size: .14rem;
	color: #2B77EF;
}
.stateNav{
	width: 91.47%;
	margin: .15rem auto 0rem;
	border-radius: .3rem;
	box-shadow: 0px 0px 26px 3px hsla(0, 0%, 0%, 10%);
}
>>>.van-tabs__line{
	background-color: #FF932E;
	width: .16rem!important;
}
>>>.van-tabs{
	height: .58rem;
}
>>>.van-tabs__wrap{
	height: .58rem;
	border-radius: .5rem;
}
>>>.van-tab{
	line-height: .58rem;
}
>>>.van-tabs__content{
	margin-top: .15rem;
}
>>>.van-tab>span{
	font-size: .145rem;
	font-weight: bold;
}
</style>
