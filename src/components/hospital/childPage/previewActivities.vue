<template>
	<div class="preview">
		<div class="topNav">
			<div class="left" @click="goBackFn">
				<span>继续编辑</span>
			</div>
			<div class="centerTitle">
				<h3>预览</h3>
			</div>
			<div class="right" @click="releaseFn">
				<button>发布</button>
			</div>
		</div> 
		<div class="activeList">
			<img :src="activity.cover" alt="">
			<div class="activeTitle">
				<h4>{{activity.title}}</h4>
				<span>{{moment(activity.startTime).format('YYYY-MM-DD HH:mm') + ' - ' + moment(activity.endTime).format('YYYY-MM-DD HH:mm')}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'preview',
	data () {
		return {
			activity : {
				
			},
		}
	},
	computed:{
		...mapGetters(['account']),
	},
	components:{
		
	},
	created () {
		
	},
	mounted () {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		this.activity = this.$route.query.activity
		console.log(this.$route.query.activity)
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
		//发布活动
		releaseFn(){		
			this.activity.endTime = new Date(this.activity.endTime).getTime();
			this.activity.startTime = new Date(this.activity.startTime).getTime();
			this.$axios.post('/c2/activity/itemadd',qs.stringify({
				hospitalId : this.account.hospitalId,
				title : this.activity.title,
				brief : this.activity.brief,
				cover : this.activity.cover,
				content  : this.activity.content,
				address  : this.activity.address,
				tel : this.activity.tel,
				endTime : this.activity.endTime,
				startTime : this.activity.startTime,
			}))
			.then(res => {
				//医院端活动发布的参数
				this.activity = {
					title : '',
					brief : '',
					address : '',
					tel : '',
					startTime : undefined,
					endTime : undefined,
					content : '',
					cover : require('../../../assets/image/Group@2x.png')
				},
				console.log(this.activity)
				window.location.href='#/hospital_activityReleased';
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: '加载失败!'});
			})
		},
	},
}
</script>

<style scoped>
.preview{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	background-color: #FFFFFF;
	border-bottom: 1px solid #E5E5E5;
}
.left{
	width: 20%;
	height: .47rem;
	float:left;
	
}
.left>span{
	width: .32rem;
	height: 100%;
	color: #666666;
	font-size: .14rem;
	/* font-weight: bold; */
	padding-left: .16rem;
}
.centerTitle{
	width: 60%;
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
	width: 20%;
	height: .47rem;
	line-height: .47rem;
	float:right;
}
.right button{
	width: .66rem;
	height: .3rem;
	color: #FFFFFF;
	line-height: .3rem;
	border: none;
	border-radius: .03rem;
	background-color: #2B77EF;
	margin-right: .15rem;
}
.activeList{
	width: 93.6%;
	height: 1.8rem;
	margin: 40% auto;
	position: relative;
	overflow: hidden;
}
.activeList>img{
	/* height: 100%; */
	width: 100%;
}
.activeTitle{
	position: absolute;
	color: #FFFFFF;
	bottom: 0rem;
	left: 0rem;
	width: 100%;
	height: 50%;
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
.activeTitle h4{
	font-size: .15rem;
	position: absolute;
	bottom: .32rem;
	left: .2rem;
}
.activeTitle span{
	color: #EAF2FF;
	position: absolute;
	bottom: .15rem;
	left: .2rem;
}
</style>
