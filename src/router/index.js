import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
//登陆页面及其忘记密码和详情页
import landingPage from '@/components/landingPage.vue'
import account from '@/components/account.vue'
//选择端口页面
import chooseTheType from '@/components/chooseTheType.vue'

//找回密码
import retrievePassword from '@/components/retrievePassword.vue'
//详情页
import details from '@/components/detailsPage.vue'
//用户协议
import urlPage from '@/components/urlPage.vue'
//病员管理页面页
import hospital_sourceManagement from '@/components/common/page/sourceManagement.vue'
//图片放大功能
import pictureEnlargement from '@/components/pictureEnlargement.vue'
//列表选择页
import list from '@/components/list.vue'


//推广人端首页主页面
import promoters_index from '@/components/promoters/index.vue'
//推广人端门诊主页面
import promoters_cilnic from '@/components/promoters/cilnic.vue'
//推广人端用户主页面
import promoters_user from '@/components/promoters/user.vue'
// 推广人用户搜索主页
import promoters_clinicSearch from '@/components/promoters/page/clinicSearch.vue'
// 推广人新增门诊页
import promoters_addClinic from '@/components/promoters/page/addClinic.vue'
// 推广人病源页
import promoters_source from '@/components/promoters/page/source.vue'
// 推广人门诊详情页
import promoters_clinicInfo from '@/components/promoters/page/clinicInfo.vue'
// 推广人门诊病原新增页
import promoters_addSource from '@/components/promoters/page/addSource.vue'
// 推广人门诊案例列表页
import promoters_case from '@/components/promoters/page/case.vue'
// 推广人门诊案例页
import promoters_caseDetails from '@/components/promoters/page/caseDetails.vue'
// 推广人门诊推广活动页面
import promoters_activityReleased from '@/components/promoters/page/activityReleased.vue'
// 推广人门诊推广活动详情页面
import promoters_activityDetails from '@/components/promoters/page/activityDetails.vue'
// 推广人门诊推广人详情页面
import promoters_promotersDetails from '@/components/promoters/page/promotersDetails.vue'
// 推广人病原管理页面
import promoters_sourceManagement from '@/components/promoters/page/promotersSourceManagement.vue'
// 推广人病原管理搜索页面
import promoters_sourceSearch from '@/components/promoters/page/sourceSearch.vue'

//门诊端页面及其组件
//门诊端病员主页
import outpatient_index from '@/components/outpatient/index.vue'
//门诊端医院主页
import outpatient_hospital from '@/components/outpatient/hospital.vue'
//门诊端基因主页
import outpatient_gene from '@/components/outpatient/gene.vue'
//门诊端用户主页
import outpatient_user from '@/components/outpatient/user.vue'
//门诊端病员主页的搜索主页
import outpatient_search from '@/components/common/page/index_search.vue'
//门诊端用户主页的任务中心
import outpatient_taskCenter from '@/components/outpatient/page/taskCenter.vue'
//门诊端用户主页的积分兑换
import outpatient_integralExchange from '@/components/outpatient/page/integralExchange.vue'
//门诊端用户主页的积分兑换列表
import outpatient_ExchangeList from '@/components/outpatient/page/ExchangeList.vue'
//门诊端用户主页的积分明细列表
import outpatient_integralDetails from '@/components/outpatient/page/integralDetails.vue'
//门诊端用户主页的兑换历史记录
import outpatient_integralHistory from '@/components/outpatient/page/integralHistory.vue'
//门诊端用户主页的积分兑换详情页
import outpatient_integralShop from '@/components/outpatient/page/integralShop.vue'
//门诊端用户主页的积分兑换结算页
import outpatient_integralShopDetails from '@/components/outpatient/page/integralShopDetails.vue'
//门诊端用户主页的积分兑换结算页面中的地址编辑页面
import outpatient_shopAddress from '@/components/outpatient/page/shopAddress.vue'
//门诊端用户主页的积分兑换结算页面中的地址新建页面
import outpatient_shopAddressAdd from '@/components/outpatient/page/shopAddressAdd.vue'

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
// 医院端器械采集页面
import hospital_collect from '@/components/hospital/childPage/collect.vue'
// 医院端运营中心页面
import hospital_operating from '@/components/hospital/childPage/operating.vue'
// 医院端运营中心的运营手册页面
import hospital_operatingManual from '@/components/hospital/childPage/operatingManual.vue'

// 医院端运营中心的运营手册的历史记录
import hospital_operatingDate from '@/components/hospital/childPage/operatingDate.vue'
// 医院端运营中心的运营手册下一级章节页面
import hospital_operatingManualList from '@/components/hospital/childPage/operatingManualList.vue'
// 医院端运营中心的运营手册下一级章节页的子章节面
import hospital_operatingManualListTwo from '@/components/hospital/childPage/operatingManualListTwo.vue'

// 医院端运营中心的运营手册下一级章节页的子章节面二
import  hospital_operatingManualListThree from '@/components/hospital/childPage/operatingManualListThree.vue'
// 医院端运营中心的运营手册下一级章节页的子章节面三
import  hospital_operatingManualListFour from '@/components/hospital/childPage/operatingManualListFour.vue'
// 医院端运营中心的运营手册下一级章节页的子章节面四
import  hospital_operatingManualListFive from '@/components/hospital/childPage/operatingManualListFive.vue'
// 医院端运营中心的运营手册下一级章节页的子章节面五
import  hospital_operatingManualListSix from '@/components/hospital/childPage/operatingManualListSix.vue'
// 医院端运营中心的运营手册下一级章节页的子章节面五
import  hospital_operatingManualListSeven from '@/components/hospital/childPage/operatingManualListSeven.vue'

// 医院端运营中心的运营手册下一级列表页面内容详情页面
import hospital_operatingManualListDetails from '@/components/hospital/childPage/operatingManualListDetails.vue'
// 医院端运营中心的运营手册下一级列表页面内容详情添加页面
import hospital_operatingManualListDetailsAdd from '@/components/hospital/childPage/operatingManualListDetailsAdd.vue'
// 医院端运营中心的推广管理
import hospital_pushTheManagement from '@/components/hospital/childPage/pushTheManagement.vue'

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
//医院端门诊的具体门诊详情页
import hospital_clinicInfo from '@/components/hospital/childPage/clinicInfo.vue'

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
//医院端用户主页的兑换管理中的修改商品页面
import hospital_exchangeEditor from '@/components/hospital/childPage/exchangeEditor.vue'
//医院端用户主页的兑换管理中的修改商品的添加图片页面
import hospital_exchangeEditorImg from '@/components/hospital/childPage/exchangeEditorImg.vue'
//医院端用户主页的兑换管理中的添加商品后上传图片的页面
import hospital_exchangeManagementImg from '@/components/hospital/childPage/exchangeManagementImg.vue'
//医院端用户主页的兑换管理中的门诊兑换清单
import hospital_exchangeManagementList from '@/components/hospital/childPage/exchangeManagementList.vue'
//医院端用户主页的兑换管理中的门诊兑换清单详情
import hospital_exchangeDetails from '@/components/hospital/childPage/exchangeDetails.vue'
//医院端用户主页的推广人渠道人
import hospital_promoters from '@/components/hospital/childPage/promoters.vue'
//医院端用户主页的推广人渠道人搜索
import hospital_promotersSearch from '@/components/hospital/childPage/promotersSearch.vue'
//医院端用户主页的推广人渠道人增加
import hospital_addPromoters from '@/components/hospital/childPage/addPromoters.vue'
//医院端用户主页的推广人详情页
import hospital_promotersDetails from '@/components/hospital/childPage/promotersDetails.vue'

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
			// meta: {auth:true},
		},
		{
			// 医院端门诊主页
			path: '/hospital_clinic',
			name: 'hospital_clinic',
			component: hospital_clinic,
			// meta: {auth:true},
		},
		{
			// 医院端基因主页
			path: '/hospital_gene',
			name: 'hospital_gene',
			component: hospital_gene,
			// meta: {auth:true},
		},
		{
			// 医院端用户主页
			path: '/hospital_user',
			name: 'hospital_user',
			component: hospital_user,
			// meta: {auth:true},
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
			//病员管理页面页
			path: '/hospital_sourceManagement',
			name: 'hospital_sourceManagement',
			component: hospital_sourceManagement,
			meta: {auth:true},
		},
		{
			//图片放大功能
			path: '/pictureEnlargement',
			name: 'pictureEnlargement',
			component: pictureEnlargement,
			meta: {auth:true},
		},
    {
    	//列表选择页
    	path: '/list',
    	name: 'list',
    	component: list,
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
    	// 医院端运营中心
    	path: '/hospital_operating',
    	name: 'hospital_operating',
    	component: hospital_operating,
    	meta: {auth:true},
    },
    {
    	// 医院端运营中心的运营手册页面
    	path: '/hospital_operatingManual',
    	name: 'hospital_operatingManual',
    	component: hospital_operatingManual,
    	meta: {auth:true},
    },
    {
    	// 医院端运营中心的运营手册的历史记录
    	path: '/hospital_operatingDate',
    	name: 'hospital_operatingDate',
    	component: hospital_operatingDate,
    	meta: {auth:true},
    },
    {
    	// 医院端运营中心的运营手册下一级章节页面
    	path: '/hospital_operatingManualList',
    	name: 'hospital_operatingManualList',
    	component: hospital_operatingManualList,
    	meta: {auth:true},
    },

    {
    	// 医院端运营中心的运营手册下一级章节页的子章节面
    	path: '/hospital_operatingManualListTwo',
    	name: 'hospital_operatingManualListTwo',
    	component: hospital_operatingManualListTwo,
    	meta: {auth:true},
    },

    {
    	// 医院端运营中心的运营手册下一级章节页的子章节面二
    	path: '/hospital_operatingManualListThree',
    	name: 'hospital_operatingManualListThree',
    	component: hospital_operatingManualListThree,
    	meta: {auth:true},
    },
    {
    	// 医院端运营中心的运营手册下一级章节页的子章节面三
    	path: '/hospital_operatingManualListFour',
    	name: 'hospital_operatingManualListFour',
    	component: hospital_operatingManualListFour,
    	meta: {auth:true},
    },
    {
    	// 医院端运营中心的运营手册下一级章节页的子章节面四
    	path: '/hospital_operatingManualListFive',
    	name: 'hospital_operatingManualListFive',
    	component: hospital_operatingManualListFive,
    	meta: {auth:true},
    },
    {
    	// 医院端运营中心的运营手册下一级章节页的子章节面五
    	path: '/hospital_operatingManualListSix',
    	name: 'hospital_operatingManualListSix',
    	component: hospital_operatingManualListSix,
    	meta: {auth:true},
    },
    {
    	// 医院端运营中心的运营手册下一级章节页的子章节面五
    	path: '/hospital_operatingManualListSeven',
    	name: 'hospital_operatingManualListSeven',
    	component: hospital_operatingManualListSeven,
    	meta: {auth:true},
    },

    {
    	// 医院端运营中心的运营手册下一级列表页面内容详情页面
    	path: '/hospital_operatingManualListDetails',
    	name: 'hospital_operatingManualListDetails',
    	component: hospital_operatingManualListDetails,
    	meta: {auth:true},
    },
    {
    	// 医院端运营中心的运营手册下一级列表页面内容详情添加页面
    	path: '/hospital_operatingManualListDetailsAdd',
    	name: 'hospital_operatingManualListDetailsAdd',
    	component: hospital_operatingManualListDetailsAdd,
    	meta: {auth:true},
    },
    {
    	// 医院端运营中心的推广管理
    	path: '/hospital_pushTheManagement',
    	name: 'hospital_pushTheManagement',
    	component: hospital_pushTheManagement,
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
			//医院端门诊的具体门诊详情页
			path: '/hospital_clinicInfo',
			name: 'hospital_clinicInfo',
			component: hospital_clinicInfo,
			meta: {auth:true},
		},
		{
			// 医院端门诊主页的优质案例
			path: '/hospital_case',
			name: 'hospital_case',
			component: hospital_case,
			// meta: {auth:true},
		},
		{
			// 医院端门诊主页的优质案例详情页
			path: '/hospital_caseDetails',
			name: 'hospital_caseDetails',
			component: hospital_caseDetails,
			// meta: {auth:true},
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
			//医院端用户主页的兑换管理中的修改商品页面
			path: '/hospital_exchangeEditor',
			name: 'hospital_exchangeEditor',
			component: hospital_exchangeEditor,
			// meta: {auth:true},
		},
		{
			//医院端用户主页的兑换管理中的修改商品的添加图片页面
			path: '/hospital_exchangeEditorImg',
			name: 'hospital_exchangeEditorImg',
			component: hospital_exchangeEditorImg,
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
			//医院端用户主页的推广人渠道人
			path: '/hospital_promoters',
			name: 'hospital_promoters',
			component: hospital_promoters,
			// meta: {auth:true},
		},
		{
			//医院端用户主页的推广人渠道人搜索
			path: '/hospital_promotersSearch',
			name: 'hospital_promotersSearch',
			component: hospital_promotersSearch,
			// meta: {auth:true},
		},
		{
			//医院端用户主页的推广人渠道人增加
			path: '/hospital_addPromoters',
			name: 'hospital_addPromoters',
			component: hospital_addPromoters,
			// meta: {auth:true},
		},
		{
			//医院端用户主页的推广人详情页
			path: '/hospital_promotersDetails',
			name: 'hospital_promotersDetails',
			component: hospital_promotersDetails,
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
			// meta: {auth:true},
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
			//门诊端用户主页的任务中心
			path: '/outpatient_taskCenter',
			name: 'outpatient_taskCenter',
			component: outpatient_taskCenter,
			meta: {auth:true},
		},
		{
			//门诊端用户主页的积分兑换
			path: '/outpatient_integralExchange',
			name: 'outpatient_integralExchange',
			component: outpatient_integralExchange,
			meta: {auth:true},
		},
		{
			//门诊端用户主页的积分兑换列表
			path: '/outpatient_ExchangeList',
			name: 'outpatient_ExchangeList',
			component: outpatient_ExchangeList,
			meta: {auth:true},
		},
		{
			//门诊端用户主页的积分明细列表
			path: '/outpatient_integralDetails',
			name: 'outpatient_integralDetails',
			component: outpatient_integralDetails,
			// meta: {auth:true},
		},
		{
			//门诊端用户主页的兑换历史记录
			path: '/outpatient_integralHistory',
			name: 'outpatient_integralHistory',
			component: outpatient_integralHistory,
			// meta: {auth:true},
		},
		{
			//门诊端用户主页的积分兑换详情页
			path: '/outpatient_integralShop',
			name: 'outpatient_integralShop',
			component: outpatient_integralShop,
			// meta: {auth:true},
		},
		{
			//门诊端用户主页的积分兑换结算页
			path: '/outpatient_integralShopDetails',
			name: 'outpatient_integralShopDetails',
			component: outpatient_integralShopDetails,
			// meta: {auth:true},
		},
		{
			//门诊端用户主页的积分兑换结算页面中的地址编辑页面
			path: '/outpatient_shopAddress',
			name: 'outpatient_shopAddress',
			component: outpatient_shopAddress,
			// meta: {auth:true},
		},
		{
			//门诊端用户主页的积分兑换结算页面中的地址新建页面
			path: '/outpatient_shopAddressAdd',
			name: 'outpatient_shopAddressAdd',
			component: outpatient_shopAddressAdd,
			// meta: {auth:true},
		},

		{
			//推广人端首页主页面
			path: '/promoters_index',
			name: 'promoters_index',
			component: promoters_index,
			meta: {auth:true},
		},
		{
			//推广人端门诊主页面
			path: '/promoters_cilnic',
			name: 'promoters_cilnic',
			component: promoters_cilnic,
			meta: {auth:true},
		},
		{
			//推广人端用户主页面
			path: '/promoters_user',
			name: 'promoters_user',
			component: promoters_user,
			meta: {auth:true},
		},
		{
			// 推广人用户搜索主页
			path: '/promoters_clinicSearch',
			name: 'promoters_clinicSearch',
			component: promoters_clinicSearch,
			meta: {auth:true},
		},
		{
			// 推广人新增门诊页
			path: '/promoters_addClinic',
			name: 'promoters_addClinic',
			component: promoters_addClinic,
			meta: {auth:true},
		},
		{
			// 推广人病源管理页
			path: '/promoters_source',
			name: 'promoters_source',
			component: promoters_source,
			meta: {auth:true},
		},
		{
			// 推广人门诊详情页
			path: '/promoters_clinicInfo',
			name: 'promoters_clinicInfo',
			component: promoters_clinicInfo,
			meta: {auth:true},
		},
		{
			// 推广人门诊病原新增页
			path: '/promoters_addSource',
			name: 'promoters_addSource',
			component: promoters_addSource,
			meta: {auth:true},
		},
		{
			// 推广人门诊案例列表页
			path: '/promoters_case',
			name: 'promoters_case',
			component: promoters_case,
			meta: {auth:true},
		},
		{
			// 推广人门诊案例页
			path: '/promoters_caseDetails',
			name: 'promoters_caseDetails',
			component: promoters_caseDetails,
			meta: {auth:true},
		},
		{
			// 推广人门诊推广活动页面
			path: '/promoters_activityReleased',
			name: 'promoters_activityReleased',
			component: promoters_activityReleased,
			meta: {auth:true},
		},
		{
			// 推广人门诊推广活动页面
			path: '/promoters_activityDetails',
			name: 'promoters_activityDetails',
			component: promoters_activityDetails,
			meta: {auth:true},
		},
		{
			// 推广人门诊推广人详情页面
			path: '/promoters_promotersDetails',
			name: 'promoters_promotersDetails',
			component: promoters_promotersDetails,
			meta: {auth:true},
		},
		{
			// 推广人病原管理页面
			path: '/promoters_sourceManagement',
			name: 'promoters_sourceManagement',
			component: promoters_sourceManagement,
			meta: {auth:true},
		},
		{
			// 推广人病原管理搜索页面
			path: '/promoters_sourceSearch',
			name: 'promoters_sourceSearch',
			component: promoters_sourceSearch,
			meta: {auth:true},
		},
		{
			//详情页
			path: '/details',
			name: 'details',
			component: details,
			meta: {auth:true},
		},
		{
			//用户协议
			path: '/urlPage',
			name: 'urlPage',
			component: urlPage,
			meta: {auth:true},
		},
		// {
		// 	// 登陆主页
		// 	path: '/',
		// 	name: 'landingPage',
		// 	component: landingPage,
		// 	alias:'/landingPage'
		// },
    {
    	// 登陆主页
    	path: '/',
    	name: 'account',
    	component: account,
    	alias:'/account'
    },
    {
    	//选择端口页面
    	path: '/chooseTheType',
    	name: 'chooseTheType',
    	meta: {auth:true},
    	component: chooseTheType,
    },
		{
			//找回密码页面
			path: '/retrievePassword',
			name: 'retrievePassword',
			meta: {auth:true},
			component: retrievePassword,
		},
	],
  // scrollBehavior (to, from, savedPosition) {
  //   console.log(savedPosition)
  //     // return 期望滚动到哪个的位置
  //     // return { x: 300, y: 300 }
  //   }
})
router.beforeEach((to,from,next) => {
	//TODO 保存当前路由
	if(to.name != 'account')
	 	localStorage.setItem('lastRoute',JSON.stringify({name:to.name,query:to.query,params:to.params}))
	next()
})
router.afterEach((to, from) => {
		if(to.name!='hospital_index' && to.name!='hospital_sourceManagement' && to.name!='outpatient_index' && to.name != 'promoters_index' &&
		to.name!='landingPage' && to.name != 'retrievePassword' && to.name != 'account' && to.name != 'chooseTheType'){
			Store.state.returnHomePageData = true;
		}else{
		Store.state.returnHomePageData = false;
		if(Store.state.isLogin == 100  && to.name == 'hospital_sourceManagement'){
			Store.state.returnHomePageData = true;
		}
	}
})
export default router
