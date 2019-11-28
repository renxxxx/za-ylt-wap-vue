<template>
	<div class="active">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/iOS切图/shape@2x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>发布精准活动</h3>
			</div>
			<div class="right">
				
			</div>
		</div>
		<router-link to="/hospital_addActivity">
			<div class="addActive">
				<span>+</span>
				<span>新建活动</span>
			</div>
		</router-link>
		<router-link to="/hospital_activityDetails">
			<div class="activeList" v-for="(item,inx) in active" :key="inx" @click="itemPostFn(item)">
				<img :src="item.cover" alt="">
				<div class="activeTitle">
					<h4>{{item.title}}</h4>
					<span>{{moment(item.alterTime).format('YYYY-MM-DD HH:mm')}}</span>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import clinic_content from '../functionPage/clinic_content.vue'
export default {
	name: 'case',
	data () {
		return {
			active:[],
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
		this.$axios.post('/c2/activity/items',qs.stringify({
			hospitalId : this.account.hospitalId,
			pn : 1,
			ps : 10
		}))
		.then(res => {
			if(res.data.data.items.length != 0){
				for(let i in res.data.data.items){
					this.active.push(res.data.data.items[i])
					// console.log(res.data.data.items[i])
				}
			}
		})
		.catch((err)=>{
			console.log(err);
			Dialog({ message: '加载失败!'});
		})
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
		itemPostFn(_id){
			this.account.itemId = _id.itemId;
			// console.log(this.account.itemId)
		}
	},
}
</script>

<style scoped>
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	background-color: #FFFFFF;
}
.leftImg{
	width: 10%;
	height: .47rem;
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
.addActive{
	width: 93.6%;
	height: .49rem;
	line-height: .49rem;
	text-align: center;
	font-size: .14rem;
	margin: 0 auto;
	margin-top: .12rem;
	background-color: #FFFFFF;
}
.addActive span:first-child{
	color: #2B77EF;
	width: .15rem;
	height: .15rem;
	line-height: .15rem;
	border: 1px solid #2B77EF;
	display: inline-block;
}
.addActive span:last-child{
	color: #2B77EF;
}
.activeList{
	width: 93.6%;
	height: 1.8rem;
	margin: .12rem auto;
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
