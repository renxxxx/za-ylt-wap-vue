<template>
	<div class="addPromoters" ref="addPromotersRef">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@2x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>人员列表</h3>
			</div>
			<div class="right"></div>
		</div>
		<div class="zhangwei" :style="{'padding-top':$store.state.paddingTop}"></div>
		<ul :style="{'padding-top':$store.state.paddingTop}">
			<li>
				<h4>姓名</h4>
				<input type="text" placeholder="请输入" v-model="addPromoters.name">
			</li>
			<li>
				<h4>号码</h4>
				<input type="text" maxlength="11" placeholder="请输入" v-model="addPromoters.phone">
			</li>
			<li>
				<h4>密码</h4>
				<input type="password" placeholder="请输入" v-model="addPromoters.password">
			</li>
			<li>
				<h4>再次确认密码</h4>
				<input type="password" placeholder="请输入" v-model="addPromoters.passwordConfirm">
			</li>
			<li>
				<h4>备注</h4>
				<input type="text" placeholder="请输入" v-model="addPromoters.cover">
			</li>
		</ul>
		<button @click="submitFn">保存</button>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'addPromoters',
	data () {
		return {
			addPromoters:{
				path : '/hospital/',
				phone : '',
				password : '',
				passwordConfirm : '',
				cover : '',
			},
			query:''
		}
	},
	computed:{
	  
	},
	components:{
		
	},
	created(){
		var heightRexg = /^[0-9]*/g;
		//var topHeight = this.topHeight.match(heightRexg);
		//this.height = parseInt(topHeight.join()) ;
		// //
	},
  
		

	mounted(){
		
	},
	activated() {
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			this.$refs.addPromotersRef.style.height = windowHeight+ 'px'
		}
	},
	methods: {
		goBackFn(){
			this.$router.back(-1)
		},
		submitFn(){
			this.$axios.post('/hospital/def/hospital-operator-user-add',qs.stringify({
				name : this.addPromoters.name,
				phone : this.addPromoters.phone,
				password : this.addPromoters.password,
				passwordConfirm : this.addPromoters.passwordConfirm,
				cover : this.addPromoters.cover,
			}))
			.then(res => {
				res.data.codeMsg? this.$toast(res.data.codeMsg):this.$toast.success('操作成功')
			})
			.catch((err)=>{
				
				//Dialog({ message: '加载失败!'});
			})
		}
	},
}
</script>

<style scoped>
.addPromoters{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
	position: relative;
}
.topNav{
	width: 100%;
	height: .47rem;
	position: fixed;
	top:0;
	z-index: 999;
	background-color: #2B77EF;
}	
.zhangwei{
	width: 100%;
	height: .47rem;
}
.leftImg{
	width: 22%;
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
	width:56%;
	text-align: center;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.centerTitle h3{
	font-size: .16rem;
	font-weight: bolder;
	color: #333333;
	color: #FFFFFF;
}
.right{	
	width: 22%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.addPromoters ul{
	width: 100%;
}
.addPromoters ul li{
	width: 91.46%;
	height: .45rem;
	line-height: .45rem;
	margin: .12rem auto 0;
	border: 1px solid #D8D8D8;
	position: relative;
}
.addPromoters ul li h4{
	color: #333333;
	font-size: .14rem;
	margin-left: .15rem;
	display: inline-block;
}
.addPromoters ul li input{
	display: inline-block;
	text-align: right;
	height: .21rem;
	position: absolute;
	top:0;
	bottom: 0;
	right: .15rem;
	margin: auto 0;
	font-size: .14rem;
	color: #2B77EF;
	border: none;
}
.addPromoters>button{
	width: 65.3%;
	height: .4rem;
	color: #FFFFFF;
	line-height: .4rem;
	position: absolute;
	bottom: 19.5%;
	left: 0;
	right: 0;
	margin: 0rem auto;
	background-color: #2B77EF;
	border: none;
	border-radius: .2rem;
	font-size: .145rem;
	font-weight: bold;
}
</style>
