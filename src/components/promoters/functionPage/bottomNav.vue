<template>
	<div id="mainButton">
		<van-tabbar v-model="active" route :style="{'padding-bottom':$store.state.bottomHeight}">
      <!-- <router-link :to="{name : 'hospital_sourceManagement'}"> -->
			<van-tabbar-item replace :to="{name : 'promoters_index',query:{time:new Date().getTime(),transition:'def'}}"> 
			    <span>首页</span>
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? index.inactive : index.active "
			    />
			</van-tabbar-item>
			<van-tabbar-item replace :to="{name : 'promoters_cilnic',query:{time:new Date().getTime(),transition:'def'}}"> 
			    <img
					slot="icon"
					slot-scope="props"
					:src="props.active ? hospital.inactive : hospital.active"
			    >
			    <span>门诊</span>
			</van-tabbar-item>
			<van-tabbar-item replace :to="{name : 'promoters_user',query:{time:new Date().getTime(),transition:'def'}}"> 
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
		    active: require('../../../assets/image/menzhen@2x.png'),
		    inactive: require('../../../assets/image/menzhen-blue@2x.png')
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

<style scoped>

</style>
