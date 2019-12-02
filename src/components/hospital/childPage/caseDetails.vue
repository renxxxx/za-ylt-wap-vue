<template>
	<div class="caseDetails" >
		<div class="topNav">
			<img src="static/iOS切图/shape@2x.png" alt="" @click="goBackFn">
			<img src="static/iOS切图/share@3x.png" alt="">
		</div>
		<div class="banner">
			<img :src="caseDetails.cover" alt="">
		</div>
		<div class="content" v-model='caseDetails'>
			<h3>{{caseDetails.name}}</h3>
			<div class="headPortrait">
				<img src="static/iOS切图/logo@2x.png" alt="">
				<span>{{caseDetails.hosptialName}}</span>
				<span>{{moment(caseDetails.alterTime).format('YYYY-MM-DD HH:mm')}}</span>
			</div>
			<p>{{caseDetails.content}}</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import Dialog from 'vant';
export default {
	name: 'caseDetails',
	data () {
		return {
			caseDetails:{
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
		
	},
	created(){
		
	},
	mounted(){
		this.$axios.post('/c2/project/item',qs.stringify({
			itemId : this.account.itemId,
		}))
		.then(_d => {
			this.caseDetails = {
				addTime : _d.data.data.addTime,
				alterTime : _d.data.data.alterTime,
				cover : _d.data.data.cover,
				hosptialName : _d.data.data.hosptialName,
				name : _d.data.data.name,
				contentBtId : _d.data.data.contentBtId
			}
			// console.log(this.caseDetails.contentBtId)
			this.$axios.get('/other/bigtxt/'+this.caseDetails.contentBtId+'/'+this.caseDetails.contentBtId)
			.then(_d => {
				console.log(_d.data)
				this.$set(this.caseDetails,'content',_d.data)
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: err});
			})
			
			
			// console.log(_d.data.data)
		})
		.catch((err)=>{
			console.log(err);
			Dialog({ message: err});
		})
		
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
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
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
