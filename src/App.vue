<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import axios from 'axios'
	// import Store from '../store'
	export default {
		name: 'App',
		data() {
			return {

			}
		},
		beforeCreate() {
		
		},
		mounted() {
			let lastRoute = JSON.parse(localStorage.getItem('lastRoute'))
			
			if(lastRoute){
				if(this.$store.state.shop.isLogin == 100){
					this.$router.replace('hospital_index')
				}else  if(this.$store.state.shop.isLogin == 200){
					this.$router.replace('outpatient_index')
				}else  if(this.$store.state.shop.isLogin == 300){
					this.$router.replace('landingPage')
				}
				this.$router.push(lastRoute)
			}
		},
		created() {

		},
		computed: {

		},
		methods: {

		},
	}
</script>

<style>
	body {
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
