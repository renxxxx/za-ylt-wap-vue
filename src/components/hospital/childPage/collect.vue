<template>
	<div class="collect"  id='read' ref="Box"  @scroll="scrollToTop">
		<div class="topNav">
			<div class="return" @click="goBackFn">
				<img src="static/img/shape@3x.png" alt="">
			</div>
			<div class="searchInput">
				<img src="static/img/sousuo@2x.png" alt="">
				<input type="text" placeholder="搜索器械">
			</div>
			<div class="rightImg">
				<img src="static/img/shopping@2x.png" alt="">
				<img src="static/img/Import@2x.png" alt="">
			</div>
		</div>
		<div class="slide">
			<van-swipe >
			  <van-swipe-item v-for="(image, index) in images" :key="index">
			    <img v-lazy="image" class="silder_img"/>
			  </van-swipe-item>
			</van-swipe>
		</div>
		
		<div class="content">
			<div class="content_Left" id='topNav' ref='top' >
				<h3>分类一</h3>
				<h3>分类二</h3>
			</div>
			<div class="contnet_right">
				<ul>
					<li v-for="(item,inx) in 99" :key='inx'>
						<img src="static/img/small-logo@2x.png" alt="">
						<div class="liRight">
							<h4>半自动体外除颤器</h4>
							<span>心脏骤停-分秒必争</span>
							<div class="nums">
								<input type="button" value="-" >
								<span>5</span>
								<input type="button" value="+">
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	
	
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'collect',
  data () {
    return {
		images: [],
    }
  },
  computed:{
	 ...mapGetters([]),
	
  },
  created () {
		
  },
  mounted () {
if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
	document.addEventListener('scroll',this.scrollToTop)
	// window.addEventListener('scroll', console.log('s'))
	this.$axios.post('/c/procurement/entpg')
	.then(_d => {
		for(let _i in  _d.data.data.ads){
			this.images.push( _d.data.data.ads[_i].cover)
			// console.log(this.images)
		}
	})
	.catch((err)=>{
		console.log(err);
		Dialog({ message: '加载失败!'});
	})
	
	// this.navTopFn();
  },
  
  methods: {
	//回退方法
	goBackFn(){
			 this.$router.back(-1)
	},
	scrollToTop (e) {
		console.log(this.$refs.orderBox.scrollTop)
 
	        // let _this = this
	        // let read = _this.$el.querySelector('#topNav')
	        console.log(13213)
			this.$refs.Box.scrollTop = 0 ;

		  
	  }
  },
}
</script>

<style scoped>
.collect{
	height: 100%;
	width: 100%;
}
.topNav{
	height: .47rem;
	width: 100%;
}
.return{
	width: 9.3%;
	margin: auto;
	float: left;
}
.return img{
	margin: .16rem 0rem;
	margin-left: .16rem;
	width: .09rem;
	height: .15rem;
}
.searchInput{
	width: 65%;
	float: left;
	height: 100%;
	position: relative;
}
.searchInput img{
	width: .13rem;
	height: .13rem;
	position: absolute;
	left: 7%;
	top: .16rem;
}
.searchInput input{
	width: 84%;
	height: .33rem;
	border: none;
	border-radius: .15rem;
	background-color: rgba(0, 0, 0, 0.05);
	margin: .06rem 0rem;
	padding-left: 16%;
}
.rightImg{
	float: left;
	width: 25.7%;
}
.rightImg img{
	width: .18rem;
	height: .18rem;
	margin: .16rem 0rem;
	margin-left: .2rem;
}
.slide{
	width: 94.6%;
	height: 1.47rem;
	margin: 0rem auto;
	margin-top: .11rem;
}
>>>.van-swipe {
    position: relative;
    overflow: hidden;
    -webkit-user-select: none;
    user-select: none;
    height: 100%;
}
.silder_img{
	width:94.6%;
	height: 1.4rem;
	margin: 0rem 2.25%;
	/* box-shadow:0px 0px 30px 5px hsla(0, 0%, 0%, 10%); */
	box-shadow: hsla(0, 0%, 0%, 10%)  0rem 0rem .1rem 0rem;
}
.content{
	width: 100%;
	height: 100%;
	margin-top: .1rem;
}
.content_Left{
	width: 22.4%;
	height: 100%;
	float: left;
	text-align: center;
	/* background-color: #F8F8F8; */
}
.content_Left h3{
	font-weight: bold;
	color: #00B7EE;
	height: .55rem;
	line-height: .55rem;
}
.contnet_right{
	width: 77.6%;
	float: right;
}
.contnet_right ul{
	width: 89%;
	margin: 0 auto;
}
.contnet_right ul li{
	margin-bottom: .2rem;
	height: .66rem;
}
.contnet_right ul li>img{
	width: .66rem;
	height: .66rem;
	float: left;
}
.liRight{
	height: .66rem;
	margin-left: .78rem;
}
.liRight h4{
	font-size: .16rem;
	font-weight: bold;
}
.liRight span{
	color: #999999;
}
.nums{
	float: right;
	width: .75rem;
	height: .21rem;
	line-height: .21rem;
	margin-top: .2rem;
}
.nums input{
	font-weight: bolder;
	font-size: .15rem;
	width: .21rem;
	height: .21rem;
	border-radius: 50%;
	text-align: center;
	line-height: .18rem;
	color : #D9DBDE;
	border: .5px solid #D9DBDE;
	background: rgb(255, 255, 255);
}
.nums span{
	color: #333333;
	margin: 0rem .09rem;
}
.nums input:last-child{
	/* backgronud-color: #FFFFFF; */
	border: .5px solid #00B7EE;
	background: rgba(0, 183, 238, 1);
}
</style>
