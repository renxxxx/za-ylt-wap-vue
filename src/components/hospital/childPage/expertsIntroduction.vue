<template>
	<div class="expertsIntroduction">
		<div class="topNav" :style="{'padding-top': height+'px'}">
			<div class="leftImg" @click="goBackFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>专家介绍</h3>
			</div>
			<div class="right"></div>
		</div> 
		<div class="zhangwei"></div>
		<div class="content" :style="{'padding-top': height+'px'}">
			<ul>
				<li v-for="(item,inx) in this.doctor" :key='inx'>
					<img :src="item.headimg" alt="">
					<div class="contentLists">
						<h4>{{item.name}}</h4>
						<span>军总疼痛科学科带头人</span>
						<span class="xia">副主任医师</span>
						<div class="duanluo" @click="showContent(inx)" >
							<p ref='showP'>{{item.intro}}</p>
							<img :src="downImg" alt="" ref='showimg'>
						</div>
					</div>
					<hr>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
	name: 'expertsIntroduction',
	data () {
		return {
			doctor:[],
			downImg : require('../../../assets/image/down@2x.png'),
			clickNum: 0 ,
		}
	},
	computed:{
		...mapGetters(['account']),
	
	},
	created(){
		var heightRexg = /^[0-9]*/g
		var topHeight = this.topHeight.match(heightRexg)
		this.height = parseInt(topHeight.join()) 
		console.log(this.height)
	},
	mounted () {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
		this.$axios.post('/c2/doctor/items',qs.stringify({
			hospitalId : this.account.hospitalId,
		}))
		.then(_d => {
			for(let i in _d.data.data.items){
				this.doctor.push({
					name : _d.data.data.items[i].name,
					hosptialName : _d.data.data.items[i].hosptialName,
					intro : _d.data.data.items[i].intro,
					jobTitles : _d.data.data.items[i].jobTitles,
					headimg : _d.data.data.items[i].headimg,
				})
			}
			// console.log(this.doctor)
			// this.$refs.scrollId.style.width = 50 * _d.data.data.items.length +'%'
			// console.log(this.$refs.scrollId)
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
		//显示内容
		showContent(inx){
			// console.log(inx)
			this.clickNum++;
			if(this.clickNum % 2 == 0){
				this.$refs.showP[inx].style.webkitLineClamp = '9'
				this.$refs.showimg[inx].src=require('../../../assets/image/up-1@2x.png')
			}else{
				this.$refs.showP[inx].style.webkitLineClamp = '2'
				this.$refs.showimg[inx].src=require('../../../assets/image/down@2x.png')
			}
			
			console.log()
		}
	},
}
</script>

<style scoped>
.expertsIntroduction{
	width: 100%;
	height: 100%;
	/* background-color: #F5F5F5; */
	background-color: #FFFFFF;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 9999;
}
.zhangwei{
	width: 100%;
	height: .47rem;
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
.content{
	width: 100%;
}
.content ul {
	width: 100%;
}
.content ul li {
	width: 100%;
	height: 100%;
	/* margin: .12rem auto; */
	background-color: #FFFFFF;
	position: relative;
	/* padding-bottom: .18rem; */
}
.content>ul>li>img{
	width: .65rem;
	height: .65rem;
	margin : .22rem .17rem 0rem .16rem;
	float: left;
	border-radius: 50%;
	object-fit: cover;
}
.contentLists{
	width: 60.8%;
	height: 100%;
	display: block;
	padding-left: .98rem;
	padding-top: .18rem;
	
}
.contentLists h4{
	font-size: .15rem;
	font-weight: bold;
	color: #333333;
}
.contentLists>span{
	padding-top:.08rem;
	margin-right: .1rem;
	font-size: .12rem;
}
.xia{
	margin-left: .1rem;
	position: relative;
}
.xia:before{
	content: "";
	width: .01rem;
	height: .06rem;
	background-color: #D8D8D8;
	position: absolute;
	top: .11rem;
	left: -.11rem;
}
.duanluo{
	position: relative;
	height: 100%;
	width: 100%;
}
.duanluo>p{
	min-height: .35rem;
	width: 100%;
	padding-top: .04rem;
	color: #999999;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.duanluo>img{
	width: .12rem;
	height: .07rem;
	position: absolute;
	right: -.33rem;
	bottom: .11rem;
}
hr{
	width: 91%;
	border-top:1px solid #D8D8D8;
}
.content ul li:last-child hr{
	display: none;
}
</style>
