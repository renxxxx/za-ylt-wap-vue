<template>
<topSolt>
	<div class="caseDetails" slot="returnTopSolt">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<img src="../../../assets/image/shape@3x.png" alt="" @click="goBackFn"  id="navback">
			<img src="../../../assets/image/share@3x.png" @click="share" alt="">
		</div>
		<div class="zhangwei" :style="{'padding-top':$store.state.paddingTop}"></div>
		<div class="banner" v-show="!!caseInfo.cover">
			<img v-lazy="caseInfo.cover"  alt="">
		</div>
		<div class="content" >
			<h3>{{caseInfo.name}}</h3>
			<div class="headPortrait">
				<img src="../../../assets/image/logo@2x.png" alt="">
				<span>{{caseInfo.hosptialName}}</span>
				<span>{{moment(caseInfo.alterTime).format('YYYY-MM-DD HH:mm')}}</span>
			</div>
			<div style="white-space: pre-line; word-break: break-all; word-wrap: break-word;text-indent:2em" v-html="caseInfo.content"></div>
		</div>
	</div>
</topSolt>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import Dialog from 'vant';
import topSolt from "../function/topSolt.vue";
export default {
	name: 'caseDetails',
	data () {
		return {
			caseInfo:{
				addTime : '',
				alterTime : '',
				cover : '',
				hosptialName : '',
				name : '',
				content:''
			}
		}
	},
	computed:{
		...mapGetters(['account']),
	},
	components:{
		topSolt
	},
	beforeCreate(){

	},
	created(){
    let myDate = new Date();
    this.caseInfo.alterTime = myDate.toLocaleDateString()
		// 
	},
	mounted(){
		// if(window.plus){
		// 	//plus.navigator.setStatusBarBackground("#ffffff");
		// 	plus.navigator.setStatusBarStyle("dark")
		// }
		// // 
		// let postUrl = '';
		// if(this.$route.query.data ==1){
		// 	let postUrl ='/c2/article/item';
		// 	this.getData(postUrl)
		// }else{
		// 	let postUrl ='/c2/project/item'
		// 	this.getData(postUrl)
		// }
		// 
	},
	activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			let postUrl = '';
			if(this.$route.query.data ==1){
				let postUrl ='/c2/article/item';
				this.getData(postUrl)
			}else{
				let postUrl ='/c2/project/item'
				this.getData(postUrl)
			}
		}
    },
	methods: {
		share(){
		 let shareUrl= location.href.replace('/outpatient/outpatient_caseDetails',"/sharePage")
		  
		  // 
		 	let vue = this
		 	this.$h5p.shareWeb(shareUrl,this.caseInfo.cover,this.caseInfo.name,'',function(){
		 		vue.$axios.post('/c2/share')
		 	});
		},
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
		getData(url){
			// let query = JSON.stringify(this.$route.query)
			// 
			this.$axios.post(url,qs.stringify({
				itemId : this.$route.query.itemId,
			}))
			.then(_d => {
				this.caseInfo = {
					addTime : _d.data.data.addTime,
					alterTime : _d.data.data.alterTime,
					cover : _d.data.data.cover,
					hosptialName : _d.data.data.hosptialName,
					name : _d.data.data.title?_d.data.data.title:_d.data.data.name,
					contentBtId : _d.data.data.contentBtId
				}
				// 
				this.$axios.get('/other/bigtxt/'+this.caseInfo.contentBtId+'/'+this.caseInfo.contentBtId)
				.then(_d => {
					// 
					this.$set(this.caseInfo,'content',_d.data)
				})
				.catch((err)=>{
					
					//Dialog({ message: err});;
				})
			})
			.catch((err)=>{
				
				//Dialog({ message: err});;
			})
		}
	},
}
</script>

<style scoped>
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	position: fixed;
	top: 0;
	z-index: 999;
	background: #FFFFFF;
}
.zhangwei{
	width: 100%;
	height: .47rem;
}
.topNav img:first-child{
	width: .09rem;
	height: .15rem;
	float: left;
	margin-top: .16rem;
	margin-left: .16rem;
}
.topNav img:last-child{
	width: .19rem;
	height: .19rem;
	float: right;
	margin-top: .14rem;
	margin-right: .21rem;
}
.banner{
	height: 1.75rem;
	width: 100%;
}
.banner img{
	width: 100%;
	height: 1.75rem;
	object-fit: cover;
}
.content{
	width: 91.46%;
	height: .33rem;
	margin: 0 auto;
	margin-top: .22rem;
}
.content h3{
	color: #333333;
	font-size: .16rem;
	font-weight: bold;
}
.headPortrait{
	margin-top: .12rem;
	margin-bottom: .15rem;
}
.headPortrait img{
	width: .33rem;
	height: .33rem;
	float: left;
	margin-right: .1rem;
}
.headPortrait span{
	display: block;
	color: #333333;
	font-weight: bold;
}
.headPortrait span:last-child{
	color: #999999;
	font-weight: normal;
}
</style>
