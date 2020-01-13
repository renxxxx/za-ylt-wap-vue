<template>
	<div id="mainButton">
		<van-tabbar v-model="active" route :style="{'padding-bottom':$store.state.bottomHeight}">
      <!-- <router-link :to="{name : 'hospital_sourceManagement'}"> -->
			<van-tabbar-item replace :to="{name : 'hospital_sourceManagement',query:{time:new Date().getTime()}}"> 
			    <span>首页</span>
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? index.inactive : index.active "
			    />
			</van-tabbar-item>
			<van-tabbar-item replace :to="{name : 'outpatient_hospital',query:{time:new Date().getTime()}}"> 
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? hospital.inactive : hospital.active"
			    >
			    <span>医院</span>
			</van-tabbar-item>
			<van-tabbar-item replace :to="{name : 'outpatient_gene',query:{time:new Date().getTime()}}"> 
			    <span>基因</span>
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? gene.inactive : gene.active"
			    >
			</van-tabbar-item>
			<van-tabbar-item replace :to="{name : 'outpatient_user',query:{time:new Date().getTime()}}"> 
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
		    active: require('../../../assets/image/shouye@2x.png'),
		    inactive: require('../../../assets/image/shouye-blue@2x.png')
		},
		hospital:{
		    active: require('../../../assets/image/Hospital@2x.png'),
		    inactive: require('../../../assets/image/Hospital-blue@2x.png')
		},
		gene:{
		    active: require('../../../assets/image/jiyin-gray@2x.png'),
		    inactive: require('../../../assets/image/jiyin-blue@2x.png')
		},
		my:{
		    active: require('../../../assets/image/wode@2x.png'),
		    inactive: require('../../../assets/image/wode-blue@2x.png')
		},
		//主导航栏图片
		colorImg:[require('../../../assets/image/shouye-blue@2x.png'),
				require('../../../assets/image/Hospital@2x.png'),
				require('../../../assets/image/jiyin-gray@2x.png'),
				require('../../../assets/image/wode@2x.png')],
		dataValue : ''
	}
  },
  props:['name'],
  created(){
		var heightRexg = /^[0-9]*/g
		var bottomHeight = this.$store.state.bottomHeight.match(heightRexg)
		this.height = parseInt(bottomHeight.join()) 
	},
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

</style>
