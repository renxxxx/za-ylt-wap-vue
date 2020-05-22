<template>
	<div class="images">
		<div class="nav" :style="{'padding-top':$store.state.paddingTop}">
			<img src="../../../assets/image/shape@3x.png" alt="" @click="goBackFn"  id="navback">
			<h3>医院详情</h3>
		</div>
		<div class="zhangwei"></div>
		<div class="topNav" ref='img' :style="{'padding-top':$store.state.paddingTop}"></div>
		<div class="content" :style="{'margin-top': -(55-parseInt($store.state.paddingTop.replace('px','')))+'px'}">
			<div class="contentTitle">
				<h3 @click="switchFn('about')" ref='about' class="xiahuaxian">医院介绍</h3>
				<h3 @click="switchFn('type')" ref='type'>特色科室</h3>
			</div>
			<component v-bind:is="componentName" v-bind:hospitalImage='hospitalImage' ref="hospitalImageRef"></component>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import hospital_imageAbout from '../function/hospital_imageAbout.vue'
import hospital_imageType from '../function/hospital_imageType.vue'
export default {
  name: 'hospitalImage',
  data () {
    return {
		hospitalImage:{
			address : '',
			cover : '',
			headmanName : '',
			intro : '',
			name : '',
			tel : '',
		},
		componentName : 'hospital_imageAbout',
    }
  },
  computed:{
	 ...mapGetters(['account','isLogin']),

  },
  components:{
  	hospital_imageAbout,hospital_imageType
  },
  created(){
  	var heightRexg = /^[0-9]*/g
  	//var topHeight = this.topHeight.match(heightRexg)
  	//this.height = parseInt(topHeight.join()) 
  	//
  },
   mounted() {
		// if(window.plus){
		// 	//plus.navigator.setStatusBarBackground("#ffffff");
		// 	plus.navigator.setStatusBarStyle("dark")
		// }
		// this.getData();
  },
	activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			this.getData()
		}
    },
  methods: {
	getData(){
		this.$router.currentRoute.query.components? this.backFN(): this.componentName = 'hospital_imageAbout'
		this.$axios.post('/c2/hospital/item',qs.stringify({
			itemId : this.$store.state.outpatient.login.hospital.hospitalId,
		}))
		.then(_d => {
			this.hospitalImage = {
				address : _d.data.data.address,
				cover : _d.data.data.cover,
				headmanName :_d.data.data.headmanName,
				intro : _d.data.data.intro,
				name : _d.data.data.name,
				tel : _d.data.data.tel,
			};
			let imgUrl = '';
			this.hospitalImage.cover? imgUrl = this.hospitalImage.cover : imgUrl = ''
			// imgUrl = this.hospitalImage.cover;
			// 
			if(imgUrl != ''){
				this.$refs.img.style['background-image']='url('+imgUrl+')';
			}
			// 
		})
		.catch((err)=>{
			
			//Dialog({ message: '加载失败!'});
		})	
	},
	//回退方法
	goBackFn(){
		this.$router.back(-1)
	},
	  // 组件切换
	switchFn(data){
		if(data == 'about'){
			this.componentName = 'hospital_imageAbout';
			this.$refs.about.style.color='#2B77EF'
			this.$refs.type.style.color='#666666'
			this.$refs.about.classList.add('xiahuaxian');
			this.$refs.type.classList.remove('xiahuaxian');
			
		}else{
			this.$refs.about.style.color='#666666'
			this.$refs.type.style.color='#2B77EF'
			this.$refs.about.classList.remove('xiahuaxian');
			this.$refs.type.classList.add('xiahuaxian');
			this.componentName = 'hospital_imageType';
			this.$refs.hospitalImageRef.getData()
		}
	},
	backFN(){
		this.$refs.about.style.color='#666666'
		this.$refs.type.style.color='#2B77EF'
		this.$refs.about.classList.remove('xiahuaxian');
		this.$refs.type.classList.add('xiahuaxian');
		this.componentName = this.$router.currentRoute.query.components;
	}
  },
}
</script>

<style scoped>
.images{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
}
.nav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	text-align: center;
	position: fixed;
	top:0;
	z-index: 999;
	background-color: #FFFFFF;
}
.nav img{
	width: .09rem;
	height: .15rem;
	margin-left: .16rem;
	float: left;
	margin-top: .17rem;
}
.nav h3{
	display: inline;
	font-size: .16rem;
	font-weight: bold;	
	margin-left: -.25rem;
}
.zhangwei{
	width: 100%;
	height: .47rem;
}
.topNav{
	width: 100%;
	height: 2.63rem;
	background: url('../../../assets/image/bj-keshi@2x.png') no-repeat center;
	background-size: contain;
	/* background-size: 100%; */
	/* background-color: #fff000; */
}

.content{
	width: 100%;
	height: 62%;
	margin-top: -.4rem;
	border-radius: .14rem  .14rem  0rem  0rem;
	background-color: #FFFFFF;
	text-align: center;
	border-top: 1px solid #F5F5F5;
}

.contentTitle{
	height: .52rem;
	line-height: .52rem;
	width: 100%;
	margin-bottom: .24rem;
}
.contentTitle h3{
	font-size: .16rem;
	font-weight: bolder;
	color: #666666;
	width: 50%;
	text-align: center;
	float: left;
	position: relative;
}
.contentTitle h3:first-child{
	color: #2B77EF;
}
.xiahuaxian:before{
	content: "";
	width: .4rem;
	height: .02rem;
	background-color: #2B77EF;
	position: absolute;
	top: .44rem;
	left: .73rem;
}
</style>
