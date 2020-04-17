<template>
	<div class="imageType">
		<ul>
			<li v-for="(item,inx) in type" :key='inx'>
				<router-link :to="{path : '/hospital/hospital_typeDetails' ,query : {item : item.itemId,}}">
					<img :src="item.url" alt="">
					<span>{{item.name}}</span>
				</router-link>
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
		type:[],
		query:'',
		keepAlive:false
    }
  },
  computed:{
	...mapGetters(['account']),
  },
  created () {
		
  },
  mounted() {
	  console.log('这是mounted')
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		if(!this.keepAlive){
			this.$axios.post('/c2/office/items',qs.stringify({
					hospitalId : this.$store.state.hospital.login.hospital.hospitalId,
			}))
			.then(_d => {
				for(let i in _d.data.data.items){
					this.type.push({
						name: _d.data.data.items[i].name,
						url : _d.data.data.items[i].cover,
						itemId : _d.data.data.items[i].itemId,
					})
				}
			})
			.catch((err)=>{
				
				//Dialog({ message: err});;
			})
		}
	
  },
  activated() {
	  console.log('z这是activated')
	 
  	if(this.query != JSON.stringify(this.$route.query)){
  		this.query = JSON.stringify(this.$route.query);
  		if(window.plus){
  			//plus.navigator.setStatusBarBackground("#ffffff");
  			plus.navigator.setStatusBarStyle("dark")
  		}
  		if(this.keepAlive){
  			this.$axios.post('/c2/office/items',qs.stringify({
  					hospitalId : this.$store.state.hospital.login.hospital.hospitalId,
  			}))
  			.then(_d => {
  				for(let i in _d.data.data.items){
					this.keepAlive = true
  					this.type.push({
  						name: _d.data.data.items[i].name,
  						url : _d.data.data.items[i].cover,
  						itemId : _d.data.data.items[i].itemId,
  					})
  				}
  			})
  			.catch((err)=>{
  				
  				//Dialog({ message: err});;
  			})
  		}
  	}
  },
  methods: {
	
  },
}
</script>

<style scoped>
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
	object-fit: cover;
}
.content ul li span{
	display: block;
}
</style>
