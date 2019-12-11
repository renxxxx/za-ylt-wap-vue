import Vue from 'vue'
import Router from 'vue-router'
//登陆页面及其忘记密码和详情页
import landingPage from '@/components/landingPage.vue'
import retrievePassword from '@/components/retrievePassword.vue'
import details from '@/components/detailsPage.vue'
//门诊端页面及其组件
import outpatient_index from '@/components/outpatient/index.vue'
import outpatient_hospital from '@/components/outpatient/hospital.vue'
import outpatient_gene from '@/components/outpatient/gene.vue'
import outpatient_user from '@/components/outpatient/user.vue'
import outpatient_search from '@/components/outpatient/index/index_search.vue'

//医院端页面及其组件
// 医院端主页
import hospital_index from '@/components/hospital/index.vue'
// 医院端门诊主页
import hospital_clinic from '@/components/hospital/clinic.vue'
// 医院端基因主页
import hospital_gene from '@/components/hospital/gene.vue'
// 医院端用户主页
import hospital_user from '@/components/hospital/user.vue'

//医院端功能副插件
// 医院端门诊主页搜索页面
import hospital_indexSearch from '@/components/hospital/childPage/indexSearch.vue'
// 医院端门诊搜索页面
import hospital_clinicSearch from '@/components/hospital/childPage/clinic_search.vue'
// 医院端门诊添加门诊页面
import hospital_addCLinic from '@/components/hospital/childPage/addCLinic.vue'
// 医院端病源管理页面页
import hospital_sourceManagement from '@/components/common/page/sourceManagement.vue'
// 医院端器械采集页面
import hospital_collect from '@/components/hospital/childPage/collect.vue'

// 医院端门诊主页的医院形象页面
import hospitalImage from '@/components/hospital/childPage/hospitalImage.vue'
// 医院端门诊主页的医院形象页面中门诊科室详情页
import hospital_typeDetails from '@/components/hospital/childPage/typeDetails.vue'
// 医院端门诊主页的优质案例
import hospital_case from '@/components/hospital/childPage/case.vue'
// 医院端门诊主页的优质案例详情页
import hospital_caseDetails from '@/components/hospital/childPage/caseDetails.vue'
// 医院端门诊主页的专家介绍
import hospital_expertsIntroduction from '@/components/hospital/childPage/expertsIntroduction.vue'
// 医院端门诊主页的活动发布
import hospital_activityReleased from '@/components/hospital/childPage/activityReleased.vue'
// 医院端门诊主页的活动发布
import hospital_activityDetails from '@/components/hospital/childPage/activityDetails.vue'
// 医院端门诊主页的活动发布模块中的编辑活动页面
import hospital_addActivity from '@/components/hospital/childPage/addActivity.vue'
// 医院端门诊主页的活动发布模块中的编辑活动页的预览页面
import hospital_previewActivities from '@/components/hospital/childPage/previewActivities.vue'
//医院端门诊的门诊详情页
import hospital_clinicDetails from '@/components/hospital/childPage/clinicDetails.vue'
//医院端门诊主页的消息通知页面
import hospital_clinicMessage from '@/components/hospital/childPage/clinicMessage.vue'

//医院端用户主页的任务管理页面
import hospital_taskManagement from '@/components/hospital/childPage/taskManagement.vue'
//医院端用户主页的任务管理详情页页面
import hospital_taskManagementDetails from '@/components/hospital/childPage/taskManagementDetails.vue'
//医院端用户主页的兑换管理页面
import hospital_exchangeManagement from '@/components/hospital/childPage/exchangeManagement.vue'
//医院端用户主页的兑换管理中的添加商品页面
import hospital_exchangeManagementAdd from '@/components/hospital/childPage/exchangeManagementAdd.vue'
//医院端用户主页的兑换管理中的添加商品后上传图片的页面
import hospital_exchangeManagementImg from '@/components/hospital/childPage/exchangeManagementImg.vue'
//医院端用户主页的兑换管理中的门诊兑换清单
import hospital_exchangeManagementList from '@/components/hospital/childPage/exchangeManagementList.vue'
//医院端用户主页的兑换管理中的门诊兑换清单详情
import hospital_exchangeDetails from '@/components/hospital/childPage/exchangeDetails.vue'

import store from '../store'
Vue.use(Router)

const router = new Router({
	// mode: 'history',
  // base:'/landingPage/',
	routes: [
		{
			// 医院端主页
			path: '/hospital_index',
			name: 'hospital_index',
			component: hospital_index,
			meta: {auth:true},
		},
		{
			// 医院端门诊主页
			path: '/hospital_clinic',
			name: 'hospital_clinic',
			component: hospital_clinic,
			meta: {auth:true},
		},
		{
			// 医院端基因主页
			path: '/hospital_gene',
			name: 'hospital_gene',
			component: hospital_gene,
			meta: {auth:true},

		},
		{
			// 医院端用户主页
			path: '/hospital_user',
			name: 'hospital_user',
			component: hospital_user,
			meta: {auth:true},

		},
		{
			// 医院端门诊主页搜索页面
			path: '/hospital_indexSearch',
			name: 'hospital_indexSearch',
			component: hospital_indexSearch,
			meta: {auth:true},
		},
		{
			// 医院端门诊搜索页面
			path: '/hospital_clinicSearch',
			name: 'hospital_clinicSearch',
			component: hospital_clinicSearch,
			meta: {auth:true},
		},
		{
			// 医院端病源管理页面页
			path: '/hospital_sourceManagement',
			name: 'hospital_sourceManagement',
			component: hospital_sourceManagement,
			meta: {auth:true},
		},
		{
			// 医院端门诊添加门诊页面
			path: '/hospital_addCLinic',
			name: 'hospital_addCLinic',
			component: hospital_addCLinic,
			meta: {auth:true},
		},
		{
			// 医院端器械采集页面
			path: '/hospital_collect',
			name: 'hospital_collect',
			component: hospital_collect,
			meta: {auth:true},
		},
		{
			// 医院端门诊主页的医院形象页面
			path: '/hospitalImage',
			name: 'hospitalImage',
			component: hospitalImage,
			meta: {auth:true},
		},
		{
			// 医院端门诊主页的医院形象页面中门诊科室详情页
			path: '/hospital_typeDetails',
			name: 'hospital_typeDetails',
			component: hospital_typeDetails,
			// meta: {auth:true},
		},
		{
			//医院端门诊的门诊详情页
			path: '/hospital_clinicDetails',
			name: 'hospital_clinicDetails',
			component: hospital_clinicDetails,
			meta: {auth:true},
		},
		{
			// 医院端门诊主页的优质案例
			path: '/hospital_case',
			name: 'hospital_case',
			component: hospital_case,
			meta: {auth:true},
		},
		{
			// 医院端门诊主页的优质案例详情页
			path: '/hospital_caseDetails',
			name: 'hospital_caseDetails',
			component: hospital_caseDetails,
			meta: {auth:true},
		},
		{
			// 医院端门诊主页的专家介绍
			path: '/hospital_expertsIntroduction',
			name: 'hospital_expertsIntroduction',
			component: hospital_expertsIntroduction,
			meta: {auth:true},
		},
		{
			// 医院端门诊主页的活动发布
			path: '/hospital_activityReleased',
			name: 'hospital_activityReleased',
			component: hospital_activityReleased,
			meta: {auth:true},
		},
		{
			// 医院端门诊主页的活动发布详情页
			path: '/hospital_activityDetails',
			name: 'hospital_activityDetails',
			component: hospital_activityDetails,
			meta: {auth:true},
		},
		{
			// 医院端门诊主页的活动发布模块中的编辑活动页面
			path: '/hospital_addActivity',
			name: 'hospital_addActivity',
			component: hospital_addActivity,
			meta: {auth:true},
		},

		{
			// 医院端门诊主页的活动发布模块中的编辑活动页的预览页面
			path: '/hospital_previewActivities',
			name: 'hospital_previewActivities',
			component: hospital_previewActivities,
			meta: {auth:true},
		},
		{
			//医院端门诊主页的消息通知页面
			path: '/hospital_clinicMessage',
			name: 'hospital_clinicMessage',
			component: hospital_clinicMessage,
			// meta: {auth:true},
		},
		{
			//医院端用户主页的任务管理页面
			path: '/hospital_taskManagement',
			name: 'hospital_taskManagement',
			component: hospital_taskManagement,
			// meta: {auth:true},
		},
		{
			//医院端用户主页的任务管理详情页页面
			path: '/hospital_taskManagementDetails',
			name: 'hospital_taskManagementDetails',
			component: hospital_taskManagementDetails,
			// meta: {auth:true},
		},
		{
			//医院端用户主页的兑换管理页面
			path: '/hospital_exchangeManagement',
			name: 'hospital_exchangeManagement',
			component: hospital_exchangeManagement,
			// meta: {auth:true},
		},
		{
			//医院端用户主页的兑换管理中的添加商品页面
			path: '/hospital_exchangeManagementAdd',
			name: 'hospital_exchangeManagementAdd',
			component: hospital_exchangeManagementAdd,
			// meta: {auth:true},
		},
		{
			//医院端用户主页的兑换管理中的门诊兑换清单
			path: '/hospital_exchangeManagementList',
			name: 'hospital_exchangeManagementList',
			component: hospital_exchangeManagementList,
			// meta: {auth:true},
		},
		{
			//医院端用户主页的兑换管理中的门诊兑换清单详情
			path: '/hospital_exchangeDetails',
			name: 'hospital_exchangeDetails',
			component: hospital_exchangeDetails,
			// meta: {auth:true},
		},
		{
			//医院端用户主页的兑换管理中的添加商品后上传图片的页面
			path: '/hospital_exchangeManagementImg',
			name: 'hospital_exchangeManagementImg',
			component: hospital_exchangeManagementImg,
			// meta: {auth:true},
		},
		{
			// 门诊端主页
			path: '/outpatient_index',
			name: 'outpatient_index',
			component: outpatient_index,
			meta: {auth:true},

		},
		{
			// 门诊端的主页搜索
			path: '/outpatient_search',
			name: 'outpatient_search',
			component: outpatient_search,
			meta: {auth:true},
		},
		{
			//门诊端的医院主页
			path: '/outpatient_hospital',
			name: 'outpatient_hospital',
			meta: {auth:true},
			component: outpatient_hospital,
		},
		{
			//门诊端的基因主页
			path: '/outpatient_gene',
			name: 'outpatient_gene',
			meta: {auth:true},
			component: outpatient_gene,
		},
		{
			//用户主页
			path: '/outpatient_user',
			name: 'outpatient_user',
			meta: {auth:true},
			component: outpatient_user,
		},
		{
			//详情页
			path: '/details',
			name: 'details',
			component: details,
			meta: {auth:true},
		},
		{
			// 登陆主页
			path: '/',
			name: 'landingPage',
			component: landingPage,
			alias:'/landingPage'
		},
		{
			//找回密码页面
			path: '/retrievePassword',
			name: 'retrievePassword',
			meta: {auth:true},
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
				next();
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

})
export default router
