<template>
	<div class="promotersDetails" ref="promotersDetailsRef">
		<div class="nav" :style="{'padding-top': height+'px'}">
			<div class="topNav">
				<div class="leftImg" @click="returnFn">
					<img src="../../../assets/image/shape@3x.png" alt="">
				</div>
				<div class="rightImg">
					<img src="../../../assets/image/bianji@2x.png" alt="" @click="modifyFn">
					<img src="../../../assets/image/shanchu@2x.png" alt="">
				</div>
			</div>
			<van-popup v-model="showModify">
				<div class="modify">
					<div class="modifyTitle">
						<h4>编辑</h4>
					</div>
					<ul>
						<li>
							<h5>姓名:</h5>
							<input type="text">
						</li>
						<li>
							<h5>号码:</h5>
							<input type="text">
						</li>
						<li>
							<h5>密码:</h5>
							<input type="text">
						</li>
						<li>
							<h5>备注:</h5>
							<input type="text">
						</li>
					</ul>
					<button @click="modifyPromotersFn">保存</button>
				</div>
			</van-popup>
			<div class="titleNav">
				<div class="headPortrait">
					<img src="" alt="">
					<span>长按可分享和保存</span>
				</div>
				<div class="promotersAbout">
					<h4>{{promoters.name}}</h4>
					<p>编号:&nbsp;&nbsp;<span>{{promoters.phone}}</span></p>
					<p>备注:&nbsp;&nbsp;</p><span>{{promoters.cover}}</span>
				</div>
			</div>
		</div>
		<div class="cumulative">
			<h4>总共：16个门诊</h4>
			<span>全部转移</span>
		</div>
		<div class="zhangwei" :style="{'padding-top': height+'px'}"></div>
		<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="onLoad">
		<ul>
			<li v-for="(item,inx) in promotersList" :key='inx'>
				<h4>北京中日友好门诊</h4>
				<img src="../../../assets/image/zhuanyi@2x.png" alt="">
			</li>
		</ul>
		</van-list>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'promotersDetails',
	data () {
		return {
			loading: false,		//加载
			// 加载状态结束
			finished: false,	//加载到底显示
			promoters:{},		//推广人信息
			promotersList:[],	//推广人列表
			page:1,		//get请求页数
			showModify : false,	//修改显示
		}
	},
	computed:{
	  
	},
	components:{
		
	},
	created(){
		var heightRexg = /^[0-9]*/g;
		var topHeight = this.topHeight.match(heightRexg);
		this.height = parseInt(topHeight.join()) ;
		// console.log(this.height);
	},
	beforeRouteLeave(to, from, next) {
		this.scrollTop =
		  document.documentElement.scrollTop || document.body.scrollTop;
		next();
	},
	  //进入该页面时，用之前保存的滚动位置赋值
	beforeRouteEnter(to, from, next) {
		next(vm => {
		  document.body.scrollTop = vm.scrollTop;
		});
	},
	activated(){
		console.log(this.$route.query.hospitalUserId)
		this.$axios.get('/hospital/def/hospital-operator-user/'+this.$route.query.hospitalUserId)
		.then(res => {
			res.data.codeMsg?	this.$toast.fail(res.data.codeMsg) : this.promoters = res.data.data
		})
		.catch((err)=>{
			console.log(err);
		})
	},
	methods: {
		returnFn(){
			this.$router.back(-1)
		},
		modifyFn(){
			this.showModify = true
			console.log(this.showModify)
		},
		modifyPromotersFn(){
			
		},
		onLoad(){
			this.$axios.get('/hospital/super-admin/hospital-clinics?'+qs.stringify({hospitalUserId:this.$route.query.hospitalUserId})+'&'+qs.stringify({pn:this.page})+'&'+qs.stringify({ps:10}))
			.then(res => {
				if(res.data.data.rows.length != 0){
					for(let i in res.data.data.rows){
						if(res.data.data.rows[i]){
							this.promotersList.push(res.data.data.rows[i])
						}
						// console.log(this.content)
					}
					
				this.page++;
				// 加载状态结束
				this.loading = false;
				}else{
					this.loading = false;
					this.finished = true;
				}
				if(this.promotersList.length<7){
					let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
					// console.log(this.$refs.promotersDetailsRef.style.height)
					this.$refs.promotersDetailsRef.style.height = windowHeight+ 'px'
				}
				// this.clinic.num = res.data.data.sum.totalCount;
			
			})
			.catch((err)=>{
				console.log(err);
			})
		}
	},
}
</script>

<style scoped>
.promotersDetails{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.nav{
	width: 100%;
	height: 1.93rem;
	position: fixed;
	top:0;
	z-index: 999;
	background-color: #FFFFFF;
}	
.topNav{
	width: 100%;
	height: .53rem;
	line-height: .53rem;
}
.leftImg{
	height: 100%;
	display: inline-block;
	padding-left: .16rem;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
}
.rightImg{
	float: right;
}
.rightImg img{
	width: .18rem;
	height: .17rem;
}
.rightImg img:first-child{
	padding-right: .2rem;
}
.rightImg img:last-child{
	padding-right: .16rem;
}
.titleNav{
	width: 100%;
	margin-top: .1rem;
}
.headPortrait{
	padding-left: .42rem;
	float: left;
}
.headPortrait img{
	width: .88rem;
	height: .88rem;
	object-fit: cover;
	display: block;
}
.headPortrait span{
	display: block;
	font-size: .12rem;
	transform:scale(0.9);
	-webkit-transform-origin-x: 0;
	color: #999999;
}
.promotersAbout{
	width: 51.4%;
	float: left;
	padding-left: .2rem;
}
.promotersAbout h4{
	font-size: .16rem;
	font-weight: bold;
	color: #333333;
	padding-bottom: .05rem;
}
.promotersAbout p{
	font-size: .12rem;
	color: #999999;
	
}
.promotersAbout p span{
	color: #333333;
}
.promotersAbout p:nth-child(3){
	/* display: inline-block; */
	float: left;
	height: .32rem;
}
.promotersAbout>span:last-child{
	width: 70%;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.cumulative{
	width: 100%;
	height: .53rem;
	line-height: .53rem;
	position: fixed;
	top: 2.03rem;
	font-size: .15rem;
	z-index: 99;
	background-color: #F5F5F5;
}
.cumulative h4{
	/* float: left; */
	display: inline-block;
	padding-left: .16rem;
}
.cumulative span{
	float: right;
	padding-right: .16rem;
	color: #2B77EF;
}
.zhangwei{
	width: 100%;
	height: 2.46rem;
}
.promotersDetails ul{
	width: 100%;
	background-color: #FFFFFF;
}
.promotersDetails ul li{
	width: 100%;
	height: .53rem;
	line-height: .53rem;
	position: relative;
}
.promotersDetails ul li h4{
	padding-left: .18rem;
	display: inline-block;
}
.promotersDetails ul li img{
	width: .16rem;
	height: .12rem;
	position: absolute;
	right: .16rem;
	top: 0;
	bottom: 0;
	margin: auto 0rem;
}
>>>.van-popup--center{
	width: 80%;
	height: 70.27%;
	border-radius: .05rem;
}
.modify{
	height: 100%;
	width: 100%;
	position: relative;
}
.modify h4{
	font-size: .15rem;
	height: .46rem;
	line-height: .46rem;
	text-align: center;
	border: 1px solid #E5E5E5;
}
.modify ul{
	margin-top: .17rem;
}
.modify ul li{
	height: .63rem;
	width: 81.67%;
	margin: 0rem auto .12rem;
	line-height: normal;
}
.modify ul li h5{
	color: #666666;
	font-size: .13rem;
	padding-bottom: .05rem;
}
.modify ul li input{
	width: 100%;
	height: .38rem;
	/* padding: 0; */
	border: 1px solid #D8D8D8;
	text-align: center;
}
.modify button{
	width: 81.67%;
	height: .4rem;
	color: #FFFFFF;
	border: none;
	border-radius: .2rem;
	background-color: #2B77EF;
	position: absolute;
	bottom: 10%;
	left: 0;
	right: 0;
	margin: 0rem auto;
	font-size: .14rem;
}
</style>
