<template>
	<div class="hospital_About">
		<span>— 基本信息 —</span>
		<ul>	
			<li>
				<h4>医院名称</h4>
				<span>{{hospitalImage.name}}</span>
			</li>
			<li>
				<h4>联系方式</h4>
				<span>{{hospitalImage.tel}}</span>
			</li>
			<li>
				<h4>地址</h4>
				<span>{{hospitalImage.address}}</span>
			</li>
		</ul>
		<span v-if="hospitalImage.intro? true:false">— 医院简介 —</span>
		<div class="content_content" v-if="hospitalImage.intro? true:false">
			<p>{{hospitalImage.intro}}</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs'
import { Dialog } from 'vant'
export default {
  	name: 'hospital_About',
  	data () {
   		return {
   		}
 	},
 	computed:{
	 // ...mapGetters([]),
	
 	},
 	props:['hospitalImage'],
 	 created () {
		  
  	},
  	mounted() {
		// if(window.plus){
		// 	//plus.navigator.setStatusBarBackground("#ffffff");
		// 	plus.navigator.setStatusBarStyle("dark")
		// }
 	 },
  	activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
		}
    },
  methods: {
	  
  },
}
</script>

<style scoped>
.content>span{
	color: #999999;
}
.content ul{
	width: 100%;
	height: 1.36rem;
	margin: .15rem 0rem;
}
.content ul li{
	width: 91.46%;
	height: .45rem;
	line-height: .45rem;
	margin: 0rem auto;
	border-bottom: 1px solid #D9DBDE;
}
.content ul li:last-child{
	border: none;
}
.content ul li h4{
	font-weight: bold;
	float: left;
}
.content ul li span{
	float: right;
	color: #2B77EF;
}
.content_content{
	width: 85.3%;
	margin: 0rem auto;
	margin-top: .15rem;
	text-align: left;
	padding: .1rem .1rem .14rem .1rem;
	border: 1px dashed #D8D8D8;
}
</style>
