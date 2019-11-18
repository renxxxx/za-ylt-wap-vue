<template>
	<div id="mainButton">
		<van-tabbar v-model="active" route>
			<van-tabbar-item to="/outpatient_index">
			    <span>首页</span>
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? index.inactive : index.active "
			    />
			</van-tabbar-item>
			<van-tabbar-item to="/outpatient_hospital"> 
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? hospital.inactive : hospital.active"
			    >
			    <span>医院</span>
			</van-tabbar-item>
			<van-tabbar-item to="/outpatient_gene"> 
			    <span>基因</span>
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? gene.inactive : gene.active"
			    >
			</van-tabbar-item>
			<van-tabbar-item to="/outpatient_user">
			    <span>我的</span>
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? my.inactive : my.active"
			    >
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
  	return{
		active: 0,
		index:{
		    active: '../static/iOS切图/shouye@2x.png',
		    inactive: '../static/iOS切图/shouye-blue@2x.png'
		},
		hospital:{
		    active: '../static/门诊端/iOS切图/Hospital@2x.png',
		    inactive: '../static/门诊端/iOS切图/Hospital-blue@2x.png'
		},
		gene:{
		    active: '../static/切图-基因/jiyin-gray@2x.png',
		    inactive: '../static/切图-基因/jiyin-blue@2x.png'
		},
		my:{
		    active: '../static/iOS切图/wode@2x.png',
		    inactive: '../static/iOS切图/wode-blue@2x.png'
		},
		//主导航栏图片
		colorImg:['static/iOS切图/shouye-blue@2x.png',
				'static/门诊端/iOS切图/Hospital@2x.png',
				'static/切图-基因/jiyin-gray@2x.png',
				'static/iOS切图/wode@2x.png'],
		dataValue : ''
	}
  },
  props:['name'],
  computed:{
  },
  methods:{
	  
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
