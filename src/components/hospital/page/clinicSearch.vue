<template>
	<div class="search_clinic" >
		<!-- <van-pull-refresh v-model="pullingDown" @refresh="afterPullDown" > -->
			<div class="navWarp" :style="{'padding-top':$store.state.paddingTop}">
				<div class="topNav">
					<div class="clinic_information" @click="goBackFn"  id="navback">
						<img src="../../../assets/image/shape@3x.png" alt="">
					</div>
					<div class="clinic_search">
						<img src="../../../assets/image/sousuo@2x.png" alt="">
						<input type="search" v-focus='true' placeholder="搜索门诊"  v-model="keywords" @keyup.enter="inputNow">
					</div>
					<div class="clinic_buttton" @click="inputNow">
						<button>搜索</button>
					</div>
				</div>
				<div class="listTitle">
					<div class="titleleft">
						<h3>合作门诊 {{clinic.num}}</h3>
					</div>
					<div class="titleRight">
						<router-link :to="{path : '/hospital/hospital_addCLinic',query:{}}">
							<span>新增</span>
							<img src="../../../assets/image/xinzeng@2x.png" alt="">
						</router-link>
					</div>
				</div>
			</div>
			<div style="height:1.1rem"></div>
			<clinicContent ref='content' :clinic = 'false' :style="{'padding-top':$store.state.paddingTop}"></clinicContent>
		<!-- </van-pull-refresh> -->
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import clinicContent from '../function/clinic_content.vue'
export default {
	name: 'search',
	data () {
		return {
			keywords : '',
			content : [],
			clinic : {
				num : 0
			},
			query:'',
			pullingDown:false,
		}
	},
	computed:{
		...mapGetters(['account'])
	},
	components:{
		clinicContent,
	},
	created(){
	},

  	mounted() {
		// if(window.plus){
		// 	//plus.navigator.setStatusBarBackground("#ffffff");
		// 	plus.navigator.setStatusBarStyle("dark")
		// };
		// this.$axios.get('/hospital/super-admin/hospital-clinics-sum?')
		// 	.then(res => {
		// 		this.clinic.num = res.data.data.rowCount;
		// 	})
		// 	.catch((err)=>{
				
		// 	})
	},
	activated() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			this.$axios.get('/hospital/super-admin/hospital-clinics-sum?')
				.then(res => {
					this.clinic.num = res.data.data.rowCount;
				})
				.catch((err)=>{
					
				})
		}
	},
	methods: {
		afterPullDown() {
			//下拉刷新
		  setTimeout(() => {
			this.pullingDown = false;
			 this.initData();
			 this.$axios.get('/hospital/super-admin/hospital-clinics-sum?')
				.then(res => {
					this.clinic.num = res.data.data.rowCount;
				})
				.catch((err)=>{
					
				})
		  }, 500);
		},
		initData() {
			let thisVue = this
			if(this.$route.meta.auth && !this.$store.state.hospital.login)
			this.$toast({message:'请登录',onClose:function(){
				thisVue.$router.replace({ path : '/hospital/hospitalLogin',query:{time:1}});
			}})
		  Object.assign(this.$data, this.$options.data());
		  this.$refs.content.initData();
		  console.log(this.$refs.content.clinicNum)
		},
		goBackFn(){
			this.$router.back(-1)
		},
		//获取数据
		getdata(){
			// 
		this.$axios.get('/hospital/super-admin/hospital-clinics?'+qs.stringify({kw:this.keywords}))
			.then(_d => {
				this.$refs.content.content = _d.data.data.rows
			})
			.catch((err)=>{
				
				//Dialog({ message: '加载失败!'});
			})
		},
		//键盘输入值时触发
		inputNow(_keywordsCode){
			//清除计时器
			if (this.timer) {
			    clearTimeout(this.timer);
			}
			if (_keywordsCode) {
			    this.timer = setTimeout(() => {
					this.getdata();
			    }, 500);
			} else {
			    // 输入框中的内容被删为空时触发，此时会清除之前展示的搜索结果
			    this.getdata();
			}
		},
	},
}
</script>

<style scoped>
.search_clinic{
	width: 100%;
	height: 100%;
	/* touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
 	overflow: scroll;
 	overflow-x: hidden; */
}
.navWarp{
	width: 100%;
	height: .98rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 3;
}
.topNav{
	width: 100%;
	height: .42rem;
}
.clinic_search{
	float:left;
	width: 70.3%;
	position: relative;
}
.clinic_search input{
	margin: .09rem 0rem 0rem 0rem;
	height:.33rem;
	width: 100%;
	border: none;
	border-radius: .33rem;
	padding-left: 11.6%;
	background-color: rgba(0, 0, 0, 0.05);
}
.clinic_search input[type=search]::-webkit-search-cancel-button{
  padding-right: 5%;
}
.clinic_search img:first-child{
	width: .14rem;
	height: .15rem;
	position: absolute;
	top: .18rem;
	left: 4.8%;
}
.clinic_buttton{
	float: right;
	margin-top: .12rem;
	margin-right: .16rem;
}
.clinic_buttton button{
	color: #ffffff;
	    background-color: #2b77ef;
	    border-radius: 0.15rem;
	    border: none;
	    height: 0.28rem;
	    width: 0.5rem;
	    font-size: 0.12rem;
}

.clinic_information{
	float:left;
	width: 5.3%;
	margin-left: .16rem;
	margin-top: .13rem;
}
.clinic_information img{
	width: .09rem;
	height: .15rem;
}
.listTitle{
	width: 84%;
	height: .26rem;
	margin: 0rem auto;
	margin-top: .3rem;
}
.titleleft{
	float: left;
	height: .26rem;
	line-height: .26rem;
}
.titleleft h3{
	font-size: .16rem;
	font-weight: bolder;
}
.titleRight{
	float: right;
	height: .26rem;
	line-height: .26rem;
}
.titleRight span{
	font-size: .15rem;
}
.titleRight img{
	width: .19rem;
	height: .19rem;
	margin-left: .05rem;
	margin-top: -.03rem;
}
.content[data-v-3c6a3c8a] {
    width: 100%;
    height: 100%;
    margin-top: 0rem;

}
>>>.van-pull-refresh {
    overflow: visible;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
	height: 100%;
	overflow: hidden;
    /* margin-top: .98rem!important; */
}
.content{
    width: 100%;
    height: calc(100% - .98rem);
    /* margin-top: .98rem; */
}

</style>
