<template>
	<div class="imageType">
		<ul>
			<li v-for="(item,inx) in type" :key='inx'>
				<img :src="item.url" alt="">
				<span>{{item.name}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'hospital_About',
  data () {
    return {
		type:[
			{name:'内科',url:'/static/iOS切图/Internal medicine@2x.png'},
			{name:'胃肠科',url:'/static/iOS切图/stomach@3x.png'},
			{name:'口腔科',url:'/static/iOS切图/tooth@2x.png'},
			{name:'儿科',url:'/static/iOS切图/erke.png'},
			{name:'外科',url:'/static/iOS切图/waike.png'},
			{name:'体检中心',url:'/static/iOS切图/tijianzhongxin.png'},
			{name:'肝病科',url:'/static/iOS切图/ganbing.png'},
			{name:'骨科',url:'/static/iOS切图/guke.png'},
			{name:'肛肠科',url:'/static/iOS切图/ganchang.png'},
			{name:'耳鼻喉科',url:'/static/iOS切图/erbihou.png'},
			{name:'泌尿外科',url:'/static/iOS切图/miniaowaike.png'},
			{name:'妇科',url:'/static/iOS切图/fuke.png'},
		]
    }
  },
  computed:{
	 ...mapGetters([]),
	
  },
  created () {
		
  },
  mounted () {

  },
  
  methods: {


  },
}
</script>

<style scoped="">
.imageType{
	width: 100%;
}
.content ul{
	width: 97.2%;
	margin: 0rem auto;
}
.content ul li{
	width: 25%;
	height: .66rem;
	text-align: center;
	float: left;
	margin-bottom: .27rem;
}
.content ul li img{
	width: .29rem;
	height: .33rem;
	margin-bottom: .05rem;
}
.content ul li span{
	display: block;
}
</style>
