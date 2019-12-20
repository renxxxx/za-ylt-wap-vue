<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
	name: 'App',
	data(){
		return{
		
		}
	},
	created () {
	   
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
  height: 100%;
  /* background-color: #F5F5F5; */
}
</style>
