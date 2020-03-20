<template>
	<div class="images">
		<div class="nav" :style="{'padding-top':$store.state.topHeight}">
			<img src="../../../assets/image/shape@3x.png" alt="" @click="goBackFn"  id="navback">
			<h3>医院详情</h3>
		</div>
		<div class="zhangwei"></div>
		<div class="topNav" ref='img' :style="{'padding-top':$store.state.topHeight}"></div>
		<div class="content" :style="{'margin-top': -(55-parseInt($store.state.topHeight.replace('px','')))+'px'}">
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
import hospital_imageAbout from '../function/hospital_imageAbout.vue'
import hospital_imageType from '../function/hospital_imageType.vue'
export default {
  name: 'hospitalImage',
  data () {
    return {
		hospitalImage:{
			address : '',
			cover : '',
			headmanpath : '/hospital/',
			intro : '',
			path : '/hospital/',
			tel : '',
		},
		componentpath : '/hospital/hospital_imageAbout',
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
  	//console.log(this.height)
  },
  beforeRouteLeave(to, from, next) {
    //debugger;
	let scrollTop = this.scrollTop =document.getElementById('hospital').scrollTop;
this.scrollTop = scrollTop?scrollTop :0;
console.log(this.scrollTop)
	if(!to.query.time || !from.query.time || to.query.time < from.query.time){
		 debugger
            if (this.$vnode && this.$vnode.data.keepAlive)
            {
                if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
                {
                    if (this.$vnode.componentOptions)
                    {
                        var key = this.$vnode.key == null
                                    ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                                    : this.$vnode.key;
                        var cache = this.$vnode.parent.componentInstance.cache;
                        var keys  = this.$vnode.parent.componentInstance.keys;
                        if (cache[key])
                        {
                            if (keys.length) {
                                var index = keys.indexOf(key);
                                if (index > -1) {
                                    keys.splice(index, 1);
                                }
                            }
                            delete cache[key];
                        }
                    }
                }
			}
            this.$destroy();
		}
	next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
     ;
    next(vm => {
	 document.getElementById('hospital').scrollTop=document.getElementById('hospital').pageYOffset=vm.scrollTop;
	});
	
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
	console.log(this.$router.currentRoute.query.components)

	// console.log(this.$router.currentRoute.query.components)
	this.$router.currentRoute.query.components? this.backFN(): this.componentName = 'hospital_imageAbout'
	this.$axios.post('/c2/hospital/item',qs.stringify({
		itemId : this.$store.state.hospitalEntrance.loginRefresh().hospital.hospitalId,
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
		//Dialog({ message: '加载失败!'});
	})
  },

  methods: {
	  //回退方法
	goBackFn(){
		this.$router.back(-1)
    // if(this.isLogin == 100){
    //   this.$router.push({ path : '/hospital/hospital_clinic',query:{time:new Date().getTime()}});
    // }else{
    //   this.$router.push({ path : '/hospital/outpatient_hospital',query:{time:new Date().getTime()}});
    // }
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
