<template>
	<div class="user">
		<div class="user_top" :style="{'padding-top': height+'px'}">
			<div class="user_set" v-show=false>
				<img src="../../assets/image/set up@2x.png" alt="">
			</div>
			<div class="user_message">
				<div class="top_left">
					<img :src="coverImg? coverImg: require('../../assets/image/logo@2x.png')" alt="">
					<span>已认证</span>
				</div>
				<div class="top_center">
					<h3>{{this.account.data.data.hospital.name}}</h3>
					<p>账号：{{this.account.data.data.phone}}</p>
				</div>
				<div class="top_right" @click="showImgFn">
					<span>营业执照</span>
					<img src="../../assets/image/Chevron Copy 2@2x.png" alt="">
				</div>
			</div>
		</div>
		<van-image-preview v-model="show" :images="images" @change="onChange" >
		  <!-- <template v-slot:index>第{{ index }}页</template> -->
		</van-image-preview>
		<div class="user_center"  :style="{'padding-top': (height+140)+'px'}">
			<ul>
				<router-link :to="{name : 'hospital_taskManagement'}">
					<li>
						<span>任务管理</span>
						<img src="../../assets/image/Chevron Copy 2@2x.png" alt="">
					</li>
				</router-link>
				<router-link :to="{name : 'hospital_exchangeManagement'}">
					<li>
						<span>兑换管理</span>
						<img src="../../assets/image/Chevron Copy 2@2x.png" alt="">
					</li>
				</router-link>
				<li @click="noLinkFn">
					<span>集采订单</span>
					<img src="../../assets/image/Chevron Copy 2@2x.png" alt="">
				</li>
				<li @click="noLinkFn">
					<span>集采积分</span>
					<img src="../../assets/image/Chevron Copy 2@2x.png" alt="">
				</li>
				<router-link :to="{name : 'hospital_promoters'}">
					<li>
						<span>推广人员管理</span>
						<img src="../../assets/image/Chevron Copy 2@2x.png" alt="">
					</li>
				</router-link>
					<li @click="exitFn">
						<span>退出登录</span>
						<img src="../../assets/image/Chevron Copy 2@2x.png" alt="">
					</li>
				
			</ul>
		</div>
		<bottomNav></bottomNav>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import bottomNav from './functionPage/bottomNav.vue'
export default {
	name: 'user',
	data () {
		return {
			coverImg: '',
			show: false,
			index: 0,
			images: []
		}
  },
	computed:{
		// ...mapGetters(['account'])
		account: {
		    get: function() {
				// console.log(this.$store)
		        return this.$store.state.shop.account
		    },
		    set: function (newValue) {
				this.$store.state.shop.account = newValue;
		    },
		},
	},
	components:{
		bottomNav
	},
	created(){
		var heightRexg = /^[0-9]*/g
		var topHeight = this.topHeight.match(heightRexg)
		this.height = parseInt(topHeight.join()) 
		console.log(this.height)
	},
	beforeRouteLeave(to, from, next) {
     ;
    this.scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
     ;
    next(vm => {
      document.body.scrollTop = vm.scrollTop;
    });
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
		this.coverImg = this.account.data.data.hospital.cover;
		this.images.push(this.account.data.data.hospital.license)
		// console.log(this.account.data.data.hospital.cover)
	},
	methods: {
		onChange(index) {
		    this.index = index;
		},
		showImgFn(){
			this.show = true;
			console.log(this.show)
		},
		userFn(){
			// console.log("hahha")
			// console.log(this.account);
			//用户头像值
			// let cover = this.account.data.data.cover;
			// // 是否认证值
			// let license = this.account.data.data.license
			// if(cover == '' || cover == undefined || cover == null){
			// 	// console.log("cover为空")
			// }else{
			// 	this.coverImg = cover
			// }
			
			// if(license == '' || license == undefined || license == null){
			// 	// console.log("license为空")
			// }else{
					
			// }
			
			// console.log(this.account.data.data.cover)
			// console.log(this.account.data.data.license)
		 },
		//退出方法
		exitFn(){
			this.$axios.post('/hospital/logout')
			this.$store.state.shop.isLogin = 0
			this.isLogin = 0;
			this.account = {
				name:'',
				password:'',
				user:{
					realname:'',
					tel: undefined,
					remark:"",				//备注
					idcardNo:undefined, 	//身份证号
				},
				clinicId: '',			//门诊id
				hospitalId: '',			//医院Id
				patientId : '',			//医院端门诊主页的门诊详情页id
				data:{},
			},
			console.log(this.isLogin);
			localStorage.clear();
			if(window.plus){
			  	plus.webview.currentWebview().clear()
				  plus.webview.currentWebview().loadURL(location.href.substr(0,location.href.indexOf('#'))+'#/landingPage')
			}
			location.replace(location.href.substr(0,location.href.indexOf('#'))+'#/landingPage')
			location.reload()

		},
		noLinkFn(){
			this.$toast.setDefaultOptions({ duration: 1000 });
			this.$toast.fail('暂未开通');
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user{
	width: 100%;
	background-color: #F5F5F5;
}
.user_top{
	width: 100%;
	height: 1.3rem;
	background-color: #FFFFFF;
	/* margin-top: .36rem; */
	position: fixed;
	top:0;
	z-index: 9999;
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
}
.top_left span{
	position: absolute;
	left: .61rem;
	top: .79rem;
	font-size: .03rem;
	color: #FFFFFF;
	background:url('../../assets/image/Gradualchange@2x.png');
	background-size:100% 100%;
	padding: .02rem .1rem;
}
.top_center{
	position: relative;
	width: 33%;
	float: left;
	height: .49rem;
	margin: .37rem .21rem .28rem 0rem;
}
.top_center h3{
	height: .29rem;
	line-height: .29rem;
	font-size: .16rem;
	font-weight: bolder;
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
}
.top_right{
	width: 13%;
	float:left;
	margin: .53rem .34rem .44rem 0rem;
	color: #999999;
	position: relative;
}
.top_right img{
	position: absolute;
	top: .01rem;
	left: .56rem;
	width: .08rem;
	height: .13rem;
}

.user_center{
	width: 100%;
	
	padding-top: 1.6rem;
}
.user_center ul{
	height: 100%;
	width: 100%;
	background-color: #FFFFFF;
	font-size: .14rem;
}

.user_center ul li{
	height: .52rem;
	line-height: .52rem;
	padding: 0rem .18rem;
	position: relative;
	border-bottom: 1px solid #EEEEEE;
}
.user_center ul a:last-child{
	margin-bottom: .5rem;
}
.user_center ul li img{
	position: absolute;
	height: .13rem;
	width: .08rem;
	right: .18rem;
	top: .19rem;
}
</style>
