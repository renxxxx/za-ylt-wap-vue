<template>
	<div class="images">
		<div class="topNav" ref='img' >
			<img src="static/img/shape@3x.png" alt="" @click="goBackFn">
		</div>
		<div class="content">
			<div class="contentTitle">
				<h3 @click="switchFn('about')" ref='about' class="xiahuaxian">医院介绍</h3>
				<h3 @click="switchFn('type')" ref='type'>特色科室</h3>
			</div>
			<component v-bind:is="componentName" v-bind:hospitalImage='hospitalImage'></component>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import hospital_imageAbout from '../functionPage/hospital_imageAbout.vue'
import hospital_imageType from '../functionPage/hospital_imageType.vue'
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
  created () {

  },
  mounted () {
	// console.log(this.$router.currentRoute.params.components)
	this.$router.currentRoute.params.components? this.backFN(): this.componentName = 'hospital_imageAbout'
	this.$axios.post('/c2/hospital/item',qs.stringify({
		itemId : this.account.hospitalId,
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
		// console.log(imgUrl)
		if(imgUrl != ''){
			this.$refs.img.style['background-image']='url('+imgUrl+')';
		}
		// console.log(this.hospitalImage)
	})
	.catch((err)=>{
		console.log(err);
		Dialog({ message: '加载失败!'});
	})
  },

  methods: {
	  //回退方法
	goBackFn(){
    if(this.isLogin == 100){
      this.$router.push({ name : 'hospital_clinic'});
    }else{
      this.$router.push({ name : 'outpatient_hospital'});
    }
	},
	  // 组件切换
	switchFn(data){
		if(data == 'about'){
			this.componentName = 'hospital_imageAbout';
			this.$refs.about.style.color='#2B77EF'
			this.$refs.type.style.color='#666666'
			this.$refs.about.classList.add('xiahuaxian');
			this.$refs.type.classList.remove('xiahuaxian');
			console.log(this.$refs.about)
		}else{
			this.$refs.about.style.color='#666666'
			this.$refs.type.style.color='#2B77EF'
			this.$refs.about.classList.remove('xiahuaxian');
			this.$refs.type.classList.add('xiahuaxian');
			this.componentName = 'hospital_imageType';
		}
	},
	backFN(){
		this.$refs.about.style.color='#666666'
		this.$refs.type.style.color='#2B77EF'
		this.$refs.about.classList.remove('xiahuaxian');
		this.$refs.type.classList.add('xiahuaxian');
		this.componentName = this.$router.currentRoute.params.components;
	}
  },
}
</script>

<style scoped>
.topNav{
	width: 100%;
	height: 2.63rem;
	background: url('../../../../static/img/bj-keshi@2x.png') no-repeat center;
	background-size: contain;
	/* background-size: 100%; */
	/* background-color: #fff000; */
}
.topNav img{
	width: .09rem;
	height: .15rem;
	margin-left: .16rem;
	margin-top: .17rem;
}
.content{
	width: 100%;
	height: 100%;
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
