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
			debugger;
		},
		mounted() {
			debugger;
		},
		created() {
			debugger;
			//TODO 取出保存的路由

			//TODO 取出isLogin,保存到$store

			//TODO 根据isLogin调登陆刷新

			//如果为登陆，跳登陆页

			//如果已登录，保存登陆刷新数据岛$store，跳转到取出的路由

			//在页面加载时读取sessionStorage里的状态信息
			//   if (localStorage.getItem("store") ) {
			// console.log(this.$store)
			// console.log(JSON.parse(localStorage.getItem("store")))
			//       this.$store.replaceState(Object.assign({}, this.$store.state.shop,JSON.parse(localStorage.getItem("store"))))
			//       console.log(this.$store)
			//   }
			//   //在页面刷新时将vuex里的信息保存到sessionStorage里
			//   window.addEventListener("beforeunload",()=>{
			//       localStorage.setItem("store",JSON.stringify(this.$store.state.shop))
			// this.$store.replaceState(Object.assign({}, this.$store.state.shop,JSON.parse(localStorage.getItem("store"))))
			// console.log(localStorage)
			//   })
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
