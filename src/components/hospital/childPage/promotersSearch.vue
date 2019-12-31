<template>
	<div class="promotersSearch" ref='promotersSearchRef'>
		<div class="nav" :style="{'padding-top': height+'px'}">
			<img src="../../../assets/image/shape@3x.png" alt="" @click="goBackFn">
			<div class="topNav">
				<img src="" alt="">
				<img src="../../../assets/image/sousuo@2x.png" alt="">  
				<input type="text" @keyup.enter="searchFn" v-focus='true' v-model="searchInputValue">
				<span @click="searchFn">搜索</span>
			</div>
		</div>
		<div class="zhangwei"></div>
		<ul :style="{'padding-top': height+'px'}">
			<li v-for="(item,inx) in promotersList" :key="inx">
				<div class="list">
					<img src="../../../assets/image/ren@2x.png" alt="">
					<h4>{{item.name}}</h4>
					<div class="listRight">
						<span>门诊数：{{item.clinicCount}}</span>
						<img src="../../../assets/image/right@2x.png" alt="">
					</div>
				</div>
				
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'promotersSearch',
	data () {
		return {
			promotersList:[],
			searchInputValue : '',
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
		  document.documentElement.scrollTop=document.body.scrollTop = vm.scrollTop;
		});
	},
	mounted () {
		this.getData()
	},
	methods: {
		goBackFn(){
			this.$router.back(-1)
		},
		getData(){
			this.promotersList = []
			this.$axios.get('/hospital/admin/hospital-users?')
			.then(res => {
				if(!res.data.codeMsg){
					for(let i in res.data.data.rows){
						this.promotersList.push(res.data.data.rows[i])
					}
					if(this.promotersList.length<10){
						let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
						console.log(this.$refs.promotersSearchRef.style.height)
						this.$refs.promotersSearchRef.style.height = windowHeight+ 'px'
					}
					console.log(this.promotersList)
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		searchFn(e){
			this.$axios.get('/hospital/admin/hospital-users?'+qs.stringify({kw:this.searchInputValue}))
			.then(res => {
				this.promotersList = []
				if(!res.data.codeMsg){
					for(let i in res.data.data.rows){
						this.promotersList.push(res.data.data.rows[i])
					}
					if(this.promotersList.length<10){
						let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
						console.log(this.$refs.promotersSearchRef.style.height)
						this.$refs.promotersSearchRef.style.height = windowHeight+ 'px'
					}
					console.log(this.promotersList)
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		}
	},
}
</script>

<style scoped>
.promotersSearch{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.nav{
	position: fixed;
	left: 0;
	right: 0;
	z-index: 999;
	margin: .08rem auto 0rem;
	width: 93.6%;
	height: .33rem;
	line-height: .33rem;
}
.nav>img{
	width: .09rem;
	height: .15rem;
	/* display: inline-block;	 */
	padding-right: .12rem;
}
.topNav{
	width: 93.6%;
	height: .33rem;
	line-height: .33rem;
	display: inline-block;
	background-color: #FFFFFF;
	border-radius: .15rem;
	float: right;
	position: relative;
}	
.topNav img{
	width: .14rem;
	height: .15rem;
	/* padding-left: .14rem; */
	padding-right: .1rem;
	
}
.topNav span{
	width: .4rem;
	height: .16rem;
	line-height: .16rem;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	text-align: right;
	right: .17rem;
	border-left: 1px solid #C2C2C2;
	font-size: .14rem;
}
.topNav input{
	height: .21rem;
	width: 65.6%;
	border: none;
	font-size: .14rem;
	/* border-right: 2px solid #C2C2C2; */
}
.topNav span{
	color: #2B77EF;
}
.zhangwei{
	width: 100%;
	height: .42rem;
}
.promotersSearch ul{
	width: 100%;
	/* height: 100%; */
}
.promotersSearch ul li{
	width: 93.6%;
	height: .5rem;
	margin:.12rem auto 0;
	line-height: .5rem;
	overflow: hidden;
	background-color: #FFFFFF;
}
.list{
	height: 100%;
	width: 100%;
	position: relative;
}
.list img:first-child{ 
	width: .17rem;
	height: .16rem;
	margin: 0rem .1rem 0rem .15rem;
	display: inline-block;
}
.list h4{
	color: #333333;
	font-size: .14rem;
	font-weight: bold;
	display: inline-block;
}
.listRight{
	position: absolute;
	right: .1rem;
	top:0;
	font-size: .13rem;
}
.listRight span{
	margin-right: .15rem;
}
.listRight img{
	height: .15rem;
}
</style>
