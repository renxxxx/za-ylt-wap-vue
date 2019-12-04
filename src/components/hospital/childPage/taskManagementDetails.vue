<template>
	<div class="taskDetails">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/iOS切图/shape@2x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>设置首次任务</h3>
			</div>
			<div class="right"></div>
		</div>
		<ul>
			<li>
				<span>名称</span>
				<span>首次上传病源</span>
			</li>
			<li>
				<span>名称</span>
				<span>首次上传病源</span>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'taskDetails',
	data () {
		return {
			
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
		this.$axios.post('/c2/task/taskissue',qs.stringify({
			patientId : this.$route.params.patientId,
			hospitalId : this.account.hospitalId,
		})).then(res =>{
			
		}).catch(err =>{
			console.log(err)
		})
	},
	methods: {
		// 返回上一级
		goBackFn(){
			this.$router.back(-1)
		},
	},
}
</script>

<style scoped>
.taskDetails{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	margin-bottom: .15rem;
}	
.leftImg{
	width: 10%;
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
	width: 80%;
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
	width: 10%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.taskDetails ul{
	width: 100%;
}
.taskDetails ul li{
	width: 91.46%;
	height: .45rem;
	line-height: .45rem;
	margin: 0 auto;
	border: 1px solid #D8D8D8;
	margin-bottom: .12rem;
}
.taskDetails ul li span{
	font-size: .14rem;
	margin-left: .15rem;
	color: #333333;
}
.taskDetails ul li:first-child span:last-child{
	float: right;
	margin-right: .15rem;
	color: #666666;
}
.taskDetails ul li span:last-child{
	float: right;
	margin-right: .15rem;
	color: #2B77EF;
}
</style>
