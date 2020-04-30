<template>
	<div class="user">
		<div class="user_top">
			<div class="user_set" v-show="false">
				<img src="../../../../assets/image/set up@2x.png" alt="">
			</div>
			<div class="user_message">
				<div class="top_left">
					<img :src="coverImg? coverImg:require('../../../../assets/image/logo@2x.png')" alt="">
					<span>已认证</span>
				</div>
				<div class="top_center">
					<h3>{{this.$store.state.hospital.login.name}}</h3>
					<p>账号：{{this.$store.state.hospital.login.phone}}</p>
				</div>
			</div>
		</div>
		<van-image-preview v-model="show" :images="images" @change="onChange" >
		  <!-- <template v-slot:index>第{{ index }}页</template> -->
		</van-image-preview>
		<div class="user_center">
			<ul>
				<!-- <router-link :to="{name: 'promoters_promotersDetails',query:{}}">
					<li>
						<span>门诊列表	</span>
						<img src="../../../../assets/image/Chevron Copy 2@2x.png" alt="">
					</li>
				</router-link> -->
				<li @click="exitFn">
					<span>退出登录</span>
					<img src="../../../../assets/image/Chevron Copy 2@2x.png" alt="">
				</li>
			</ul>
		</div>
		<div style="height: .5rem;"></div>
		<span>版本：{{this.$version.split('-')[0]}}</span>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'user',
	data () {
		return {
			name: 'user',
			coverImg: '',
			show: false,
			index: 0,
			images: []
		}
	},
	computed:{
		...mapGetters(['account']),
		isLogin: {
			get: function() {
				// 
				return this.$store.state.isLogin
			},
			set: function (newValue) {
				this.$store.state.isLogin = newValue;
			},
		},
		account: {
			get: function() {
				// 
				return this.$store.state.account
			},
			set: function (newValue) {
				this.$store.state.account = newValue;
			},
		},
	},
	components:{

	},
	created () {

	},
	activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			this.initData();
		}
    },
	mounted() {
		// if(window.plus){
		// 	//plus.navigator.setStatusBarBackground("#ffffff");
		// 	plus.navigator.setStatusBarStyle("dark")
		// }
		// this.initData();
	},
	methods: {
		initData(){
			  let thisVue = this
      if(this.$route.meta.auth && !this.$store.state.hospital.login)
      this.$toast({message:'请登录',onClose:function(){
        thisVue.$router.replace({ path : '/hospital/hospitalLogin',query:{time:1}});
	  }})
	  this.userFn();
		this.coverImg = this.$store.state.hospital.login.hospital.cover;
		this.images.push(this.$store.state.hospital.login.hospital.license)
		},
		onChange(index) {
			this.index = index;
		},
		showImgFn(){
			this.show = true;
			
		},
		userFn(){
			// 
			// 
			//用户头像值
			let cover = this.$store.state.hospital.login.hospital.cover;
			// 是否认证值
			let license = this.$store.state.hospital.login.license
			if(cover == '' || cover == undefined || cover == null){
				// 
			}else{
				this.coverImg = cover
			}

			if(license == '' || license == undefined || license == null){
				// 
			}else{

			}

			// 
			// 
		 },
		//退出方法
		exitFn(){
			// this.$axios.post('/hospital/logout');
			// if(window.plus){
			// 		plus.webview.currentWebview().clear()
			// 		plus.webview.currentWebview().loadURL(location.href.substr(0,location.href.indexOf('#'))+'#/account')
			// }
			localStorage.clear();
			let thisVue=this
			this.$axios.post('/hospital/logout').then(function(){
				localStorage.removeItem('entrance')
				// localStorage.clear()
				thisVue.$toast("操作成功")
				setTimeout(()=>{
					// thisVue.$router.push({path:"/hospital/hospitalLogin",query:{}})
					location.href=location.pathname
				},1500)
			})
			// location.href=location.pathname
			// location.reload()
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.user_top{
	width: 100%;
	height: 1.3rem;
	background-color: #FFFFFF;
	position: relative;
	padding-top: .36rem;
}
.user_set{
	top: .18rem;
	right: .16rem;
	position: absolute;
}
.user_set img{
	width: .21rem;
	height: .2rem;
}
.user_message{
	/* height: .8rem; */
	/* margin: auto 0rem; */
	/* padding: .23rem .18rem .15rem .28rem;; */
}

.top_left{
	width: 24%;
	float:left;
	height: .8rem;
	margin:.23rem .29rem .15rem .28rem;
}
.top_left img{
	width: .75rem;
	height: .75rem;
	position: relative;
	border-radius: 50%;
}
.top_left span{
	position: absolute;
	left: .61rem;
	top: 1.15rem;
	font-size: .03rem;
	color: #FFFFFF;
	background:url('../../../../assets/image/Gradualchange@2x.png');
	background-size:100% 100%;
	padding: .02rem .1rem;
}
.top_center{
	position: relative;
	width: 36%;
	float: left;
	height: .49rem;
	margin: .37rem .15rem .28rem 0rem;
}
.top_center h3{
	height: .29rem;
	line-height: .29rem;
	font-size: 16px;
	font-weight: bolder;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.top_center p{
	color: #666666;
	font-size: .13rem;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.user_center{
	width: 100%;
	background-color: #FFFFFF;
	margin-top: .12rem;
}
.user_center ul{
	height: 100%;
	width: 100%;
	font-size: .14rem;
}

.user_center ul li{
	height: .52rem;
	line-height: .52rem;
	padding: 0rem .18rem;
	position: relative;
	border-bottom: 1px solid #EEEEEE;
}
.user_center ul li img{
	position: absolute;
	height: .13rem;
	width: .08rem;
	right: .18rem;
	top: .19rem;
}
.user>span{
	width: 50%;
	text-align: center;
	color: #cfd2d3;
	position: absolute;
	bottom: .8rem;
	left: 0rem;
	right: 0rem;
	margin: 0rem auto;
}
</style>
