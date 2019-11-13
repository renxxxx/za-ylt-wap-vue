<template>
	<div class="navWarp">
		<div class="navTitle">
			<span>- 医院端 -</span>
		</div>
		<div class="slider">
			<van-swipe :autoplay="3000">
			  <van-swipe-item v-for="(image, index) in images" :key="index">
			    <img v-lazy="image" class="silder_img"/>
			  </van-swipe-item>
			</van-swipe>
		</div>
	</div>
	
</template>

<script>
export default {
	name: 'gene',
	data () {
		return {
			images: [
			        '../../../static/iOS切图/banner@2x.png',
			        '../../../static/iOS切图/denglu1.png',
					'../../../static/iOS切图/denglu2.png',
					'../../../static/iOS切图/denglu3.png',
					'../../../static/iOS切图/denglu1.png',
					'../../../static/iOS切图/denglu2.png',
			      ]
		}
	},
	computed:{
	  
	},
	created () {
		
	},
	mounted () {
		
	},
	methods: {

	},
}
</script>

<style scoped>
.navWarp{
	height: 2.44rem;
	width: 100%;
	background: url('../../../static/iOS切图/88-1.png') no-repeat;
	background-size: 100% 1.8rem;
	padding-top: .12rem;
}
.navTitle{
	width: .88rem;
	height: .25rem;
	line-height: .25rem;
	color: #FFFFFF;
	font-size: .14rem;
	font-weight: bolder;
	text-align: center;
	margin: 0 auto;
}
.slider{
	width: 95.7%;
	height: 1.96rem;
	margin: 0rem auto;
	margin-top: .05rem;
}
.silder_img{
	width:100%;
	height: 1.96rem;
	margin: 0rem auto;
}
</style>
