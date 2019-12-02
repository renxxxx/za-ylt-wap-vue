<template>
	<div id="mainButton">
		<van-tabbar v-model="active" route>
			<van-tabbar-item :to="{name : 'hospital_index'}">
			    <span>首页</span>
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? index.inactive : index.active "
			    />
			</van-tabbar-item>
			<van-tabbar-item :to="{name : 'hospital_clinic'}"> 
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? hospital.inactive : hospital.active"
			    >
			    <span>门诊</span>
			</van-tabbar-item>
			<van-tabbar-item :to="{name : 'hospital_gene'}"> 
			    <span>基因</span>
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? gene.inactive : gene.active"
			    >
			</van-tabbar-item>
			<van-tabbar-item :to="{name : 'hospital_user'}">
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
		    active: 'static/iOS切图/shouye@2x.png',
		    inactive: 'static/iOS切图/shouye-blue@2x.png'
		},
		hospital:{
		    active: 'static/iOS切图/menzhen@2x.png',
		    inactive: 'static/iOS切图/menzhen-blue@2x.png	'
		},
		gene:{
		    active: 'static/切图-基因/jiyin-gray@2x.png',
		    inactive: 'static/切图-基因/jiyin-blue@2x.png'
		},
		my:{
		    active: 'static/iOS切图/wode@2x.png',
		    inactive: 'static/iOS切图/wode-blue@2x.png'
		},
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
</style>
