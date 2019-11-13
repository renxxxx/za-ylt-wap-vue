<template>
	<div id="app">
	<router-view/>
		<!-- <div id="mainButton" v-show="roterShow">
			<router-link to="/outpatient_index">
				<div id="_index" @click="colorFn('_index')">
					<img :src=colorImg[0] alt="">
					<span>首页</span>
				</div>
			</router-link>
			<router-link to="/outpatient_hospital">
				<div id="_hospital" @click="colorFn('_hospital')">
					<img :src=colorImg[1] alt="">
					<span>医院</span>
				</div>
			</router-link>
			<router-link to="/outpatient_gene">
				<div id="_gene" @click="colorFn('_gene')">
					<img :src=colorImg[2] alt="">
					<span>基因</span>
				</div>
			</router-link>
			<router-link to="/outpatient_user">
				<div id="_my" @click="colorFn('_my')">
					<img :src=colorImg[3] alt="">
					<span>我的</span>
				</div>
			</router-link>
		</div> -->
	</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
  	return{
		//主导航栏图片
		colorImg:['../static/iOS切图/shouye-blue@2x.png',
				'../static/门诊端/iOS切图/Hospital@2x.png',
				'../static/切图-基因/jiyin-gray@2x.png',
				'../static/iOS切图/wode@2x.png']
	}
  },
  computed:{
  	...mapGetters(['roterShow'])
  },
  methods:{
	//主导航栏颜色切换
	colorFn(_id){
		switch(_id){
			case '_index':
			this.colorImg[0] = '../static/iOS切图/shouye-blue@2x.png';
			this.colorImg[1] = '../static/门诊端/iOS切图/Hospital@2x.png';
			this.colorImg[2] = '../static/切图-基因/jiyin-gray@2x.png';
			this.colorImg[3] = '../static/iOS切图/wode@2x.png';
			document.getElementById('_index').style.color = "#2B77EF"
			document.getElementById('_hospital').style.color = "#999999"
			document.getElementById('_gene').style.color = "#999999"
			document.getElementById('_my').style.color = "#999999"
			break;
			case '_hospital':
			this.colorImg[0] = '../static/iOS切图/shouye@2x.png';
			this.colorImg[2] = '../static/切图-基因/jiyin-gray@2x.png';
			this.colorImg[3] = '../static/iOS切图/wode@2x.png';
			this.colorImg[1] = '../static/门诊端/iOS切图/Hospital-blue@2x.png';
			document.getElementById('_index').style.color = "#999999"
			document.getElementById('_hospital').style.color = "#2B77EF"
			document.getElementById('_gene').style.color = "#999999"
			document.getElementById('_my').style.color = "#999999"
			break;
			 
			case '_gene':
			this.colorImg[0] = '../static/iOS切图/shouye@2x.png';
			this.colorImg[1] = '../static/门诊端/iOS切图/Hospital@2x.png';
			this.colorImg[3] = '../static/iOS切图/wode@2x.png';
			this.colorImg[2] = '../static/切图-基因/jiyin-blue@2x.png';
			document.getElementById('_index').style.color = "#999999"
			document.getElementById('_hospital').style.color = "#999999"
			document.getElementById('_gene').style.color = "#2B77EF"
			document.getElementById('_my').style.color = "#999999"
			break;
			  
			case '_my':
			this.colorImg[0] = '../static/iOS切图/shouye@2x.png';
			this.colorImg[1] = '../static/门诊端/iOS切图/Hospital@2x.png';
			this.colorImg[2] = '../static/切图-基因/jiyin-gray@2x.png';
			this.colorImg[3] = '../static/iOS切图/wode-blue@2x.png';
			
			document.getElementById('_index').style.color = "#999999"
			document.getElementById('_hospital').style.color = "#999999"
			document.getElementById('_gene').style.color = "#999999"
			document.getElementById('_my').style.color = "#2B77EF"
			break;
		}
		// document.getElementById(_id).style.color = 'red'
		  // console.log(document.getElementById(_id).color)
	}
  },
}
</script>

<style>
body{
	/* background-color:#FFFFFF; */
	height: 100%;
	width: 100%;
}
#app {
  font-family: '苹方-简 常规体', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* background-color: #F5F5F5; */
}
#mainButton{
	background-color: #FFFFFF;
	position: fixed;bottom: 0;height: .49rem;width: 100%;
	box-shadow:0px 2px 4px 0px rgba(0,0,0,0.5);
	background:rgba(255,255,255,1);
}
#mainButton a {
	float: left;width: 24.3%;text-align: center;
	margin-top: .07rem;height: .21rem;
	text-align: center;color: #999999;
}
#mainButton a:first-child{
	color:#2B77EF;
}
#_index,#_hospital,#_gene,#_my{
	height: .51rem;width: 100%;
}
#mainButton img{
	width: .2rem;height: .21rem;display: block;
	margin: 0 auto;margin-bottom: 0.019rem;
}
/* .mainButton a:nth-child(1){
	background:url('../static/iOS切图/shouye@2x.png') no-repeat center ;
	background-size:.2rem .21rem;
}
.mainButton a:nth-child(2){
	background:url('../static/门诊端/iOS切图/Hospital@2x.png') no-repeat center ;
	background-size:.2rem .21rem;
}
.mainButton a:nth-child(3){
	background:url('../static/切图-基因/jiyin-gray@2x.png') no-repeat center ;
	background-size:.2rem .21rem;
}
.mainButton a:nth-child(4){
	background:url('../static/iOS切图/wode@2x.png') no-repeat center ;
	background-size:.2rem .21rem;
}

.mainButton a:nth-child(1):visited{
	background:url('../static/iOS切图/wode@2x.png') no-repeat center;
	background-size:.2rem .21rem;
	color:#2B77EF;
}

.mainButton a span{
	display: block;
	margin-top: .22rem;
	
} */







</style>
