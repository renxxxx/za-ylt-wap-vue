import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/hospital_indexApp.vue'
import hospital from '@/components/hospital_hospital.vue'
import user from '@/components/hospital_user.vue'
import landingPage from '@/components/landingPage.vue'
import retrievePassword from '@/components/retrievePassword.vue'

import store from '../store'
Vue.use(Router)

const router = new Router({
  routes: [
    // 动态路径参数 以冒号开头
    {
		// 门诊主页
    	path: '/',
    	name: 'index',
    	component: index,
    	meta: {auth:true},
		alias:'/index'
    },
	{
		//医院主页
		path: '/hospital',
		name: 'hospital',
		// meta: {auth:true},
		component: hospital,
	},
	{
		//用户主页
		path: '/user',
		name: 'user',
		// meta: {auth:true},
		component: user,
	},
	{
		// 登陆主页
		path: '/landingPage',
		name: 'landingPage',
		component: landingPage,
	},
	{
		//找回密码页面
		path: '/retrievePassword',
		name: 'retrievePassword',
		meta: {auth:false},
		component: retrievePassword,
	},
  ],
})

router.beforeEach((to,from,next) => {
	// console.log(to)
	// console.log(to)
	// console.log(next)
	if(to.meta){
		if(to.meta.auth){
			// console.log(store.state.shop.account.isLogin)
			switch(store.state.shop.account.isLogin){
				case 100: 
				// console.log('暂未开放中');
				next({path : '/landingPage'});
				break;
				
				case 200: 
				next();
				break;
				
				case 300:
				// console.log('暂未开放中');
				next({path : '/landingPage'});
				break;
				
				default:next({path : '/landingPage'});
			}
		}else{
			next();
		}
	}else{
		next();
	}
	if(to.path == "/landingPage"){
		store.state.shop.roterShow = false;
		// console.log(store.state.shop.roterShow)
	}
	if(to.path == "/index"){
		store.state.shop.roterShow = true;
		document.getElementsByTagName("body")[0].style.backgroundColor = "#F5F5F5"
	}else{
		document.getElementsByTagName("body")[0].style.backgroundColor = "#FFFFFF"
	}
	if(to.path == "/user"){
		store.state.shop.roterShow = true;
		document.getElementsByTagName("body")[0].style.backgroundColor = "#F5F5F5"
	}else{
		document.getElementsByTagName("body")[0].style.backgroundColor = "#FFFFFF"
	}
})
export default router
