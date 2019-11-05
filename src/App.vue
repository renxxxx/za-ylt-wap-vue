<template>
  <div id="app">
	<router-view/>
	<div class="mainButton" v-show="roterShow">
		<router-link to="/index">
		  	<img src="../static/iOS切图/shouye@2x.png" alt="">
		  	<span>首页</span>
		</router-link>
		<router-link to="/index">
			<img src="../static/门诊端/iOS切图/Hospital@2x.png" alt="">
		  	<span>医院</span>
		</router-link>
		<router-link to="/index">
			<img src="../static/切图-基因/jiyin-gray@2x.png" alt="">
			<span>基因</span>
		</router-link>
		<router-link to="/index">
			<img src="../static/iOS切图/wode@2x.png" alt="">
			<span>我的</span>
		</router-link>
	</div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
  	return{}
  },
  computed:{
  	...mapGetters(['roterShow'])
  },
  methods:{
	  
  },
}
</script>

<style>
body{
	background-color:#FFFFFF;
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
.mainButton{
	background-color: #FFFFFF;
	position: fixed;bottom: 0;height: .49rem;width: 100%;
	box-shadow:0px 2px 4px 0px rgba(0,0,0,0.5);
	background:rgba(255,255,255,1);
}
.mainButton a {
	display: inline-block;width: 24.3%;text-align: center;
	margin-top: .08rem;
}
.mainButton img{
	width: .2rem;height: .21rem;display: block;
	margin: 0 auto;margin-bottom: 0.019rem;
}


</style>
