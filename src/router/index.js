import Store from '../store'
import Router from 'vue-router'
import Vue from 'vue'


const chooseTheType = ()=>import( '@/components/chooseTheType.vue')
const sharePage = ()=>import( '@/components/sharePage.vue')
const Page404 = ()=>import( '@/components/404Page.vue')
const tihuan = ()=>import( '@/components/tihuan.vue')

//医院端
const hospital = ()=>import( '@/components/hospital/hospital.vue')
const hospital_urlPage = ()=>import( '@/components/hospital/urlPage.vue')
const hospital_retrievePassword = ()=>import( '@/components/hospital/retrievePassword.vue')
const hospitalLogin = ()=>import( '@/components/hospital/hospitalLogin.vue')
//医院端主页
const hospital_index = ()=>import( '@/components/hospital/page/index.vue')
const hospital_clinic = ()=>import( '@/components/hospital/page/clinic.vue')
const hospital_gene = ()=>import( '@/components/hospital/page/gene.vue')
const hospital_user = ()=>import( '@/components/hospital/page/user.vue')

//医院端页面
const hospital_clinicSearch = ()=>import( '@/components/hospital/page/clinicSearch.vue')
const hospital_addCLinic = ()=>import( '@/components/hospital/page/addCLinic.vue')
const hospital_clinicDetails = ()=>import( '@/components/hospital/page/clinicDetails.vue')
const hospital_clinicInfo = ()=>import( '@/components/hospital/page/clinicInfo.vue')
const hospital_detailsPage = ()=>import( '@/components/hospital/page/detailsPage.vue')
const hospital_sourceManagement = ()=>import( '@/components/hospital/page/sourceManagement.vue')
const hospital_pathogenicSearch = ()=>import( '@/components/hospital/page/pathogenicSearch.vue')
const hospital_collect = ()=>import( '@/components/hospital/page/collect.vue')
const hospital_operating = ()=>import( '@/components/hospital/page/operating.vue')
const hospital_pushTheManagement = ()=>import( '@/components/hospital/page/pushTheManagement.vue')
const hospital_operatingManual = ()=>import( '@/components/hospital/page/operatingManual.vue')
const hospital_operatingDate = ()=>import( '@/components/hospital/page/operatingDate.vue')
const hospital_operatingManualList = ()=>import( '@/components/hospital/page/operatingManualList.vue')
const hospital_operatingManualListTwo = ()=>import( '@/components/hospital/page/operatingManualListTwo.vue')
const hospital_operatingManualListThree = ()=>import( '@/components/hospital/page/operatingManualListThree.vue')
const hospital_operatingManualListFour = ()=>import( '@/components/hospital/page/operatingManualListFour.vue')
const hospital_operatingManualListFive = ()=>import( '@/components/hospital/page/operatingManualListFive.vue')
const hospital_operatingManualListSix = ()=>import( '@/components/hospital/page/operatingManualListSix.vue')
const hospital_operatingManualListSeven = ()=>import( '@/components/hospital/page/operatingManualListSeven.vue')
const hospital_operatingManualListDetails = ()=>import( '@/components/hospital/page/operatingManualListDetails.vue')
const hospital_activityReleased = ()=>import( '@/components/hospital/page/activityReleased.vue')
const hospital_addActivity = ()=>import( '@/components/hospital/page/addActivity.vue')
const hospital_activityDetails = ()=>import( '@/components/hospital/page/activityDetails.vue')
const hospital_previewActivities = ()=>import( '@/components/hospital/page/previewActivities.vue')
const hospital_case = ()=>import( '@/components/hospital/page/case.vue')
const hospital_caseDetails = ()=>import( '@/components/hospital/page/caseDetails.vue')
const hospital_hospitalImage = ()=>import( '@/components/hospital/page/hospitalImage.vue')
const hospital_typeDetails = ()=>import( '@/components/hospital/page/typeDetails.vue')
const hospital_expertsIntroduction = ()=>import( '@/components/hospital/page/expertsIntroduction.vue')
const hospital_clinicMessage = ()=>import( '@/components/hospital/page/clinicMessage.vue')
const hospital_taskManagement = ()=>import( '@/components/hospital/page/taskManagement.vue')
const hospital_taskManagementDetails = ()=>import( '@/components/hospital/page/taskManagementDetails.vue')
const hospital_exchangeManagement = ()=>import( '@/components/hospital/page/exchangeManagement.vue')
const hospital_exchangeDetails = ()=>import( '@/components/hospital/page/exchangeDetails.vue')
const hospital_exchangeManagementList = ()=>import( '@/components/hospital/page/exchangeManagementList.vue')
const hospital_exchangeManagementAdd = ()=>import( '@/components/hospital/page/exchangeManagementAdd.vue')
const hospital_exchangeManagementImg = ()=>import( '@/components/hospital/page/exchangeManagementImg.vue')
const hospital_exchangeEditor = ()=>import( '@/components/hospital/page/exchangeEditor.vue')
const hospital_exchangeEditorImg = ()=>import( '@/components/hospital/page/exchangeEditorImg.vue')
const hospital_promoters = ()=>import( '@/components/hospital/page/promoters.vue')
const hospital_promotersDetails = ()=>import( '@/components/hospital/page/promotersDetails.vue')
const hospital_promotersSearch = ()=>import( '@/components/hospital/page/promotersSearch.vue')
const hospital_addPromoters = ()=>import( '@/components/hospital/page/addPromoters.vue')
const hospital_list = ()=>import( '@/components/hospital/page/list.vue')
const hospital_pictureEnlargement = ()=>import( '@/components/hospital/page/pictureEnlargement.vue')

//医院端下的门诊推广人端
const promoters = ()=>import( '@/components/hospital/promoters/promoters.vue')
//医院端下的门诊推广人端主页
const promoters_index = ()=>import( '@/components/hospital/promoters/page/index.vue')
const promoters_cilnic = ()=>import( '@/components/hospital/promoters/page/cilnic.vue')
const promoters_user = ()=>import( '@/components/hospital/promoters/page/user.vue')
//医院端下面的推广人端页面
const promoters_clinicSearch = ()=>import( '@/components/hospital/promoters/page/clinicSearch.vue')
const promoters_addClinic = ()=>import( '@/components/hospital/promoters/page/addClinic.vue')
const promoters_source = ()=>import( '@/components/hospital/promoters/page/source.vue')
const promoters_addSource = ()=>import( '@/components/hospital/promoters/page/addSource.vue')
const promoters_clinicInfo = ()=>import( '@/components/hospital/promoters/page/clinicInfo.vue')
const promoters_detailsPage = ()=>import( '@/components/hospital/promoters/page/detailsPage.vue')
const promoters_pictureEnlargement = ()=>import( '@/components/hospital/promoters/page/pictureEnlargement.vue')
const promoters_sourceManagement = ()=>import( '@/components/hospital/promoters/page/sourceManagement.vue')
const promoters_sourceSearch = ()=>import( '@/components/hospital/promoters/page/sourceSearch.vue')
const promoters_case = ()=>import( '@/components/hospital/promoters/page/case.vue')
const promoters_caseDetails = ()=>import( '@/components/hospital/promoters/page/caseDetails.vue')
const promoters_activityReleased = ()=>import( '@/components/hospital/promoters/page/activityReleased.vue')
const promoters_activityDetails = ()=>import( '@/components/hospital/promoters/page/activityDetails.vue')

//门诊端
const outpatient = ()=>import( '@/components/outpatient/outpatient.vue')
const outpatientLogin = ()=>import( '@/components/outpatient/outpatientLogin.vue')
const outpatient_retrievePassword = ()=>import( '@/components/outpatient/retrievePassword.vue')
const outpatient_urlPage = ()=>import( '@/components/outpatient/urlPage.vue')
//门诊端主页
const outpatient_index = ()=>import( '@/components/outpatient/page/index.vue')
const outpatient_hospital = ()=>import( '@/components/outpatient/page/hospital.vue')
const outpatient_gene = ()=>import( '@/components/outpatient/page/gene.vue')
const outpatient_user = ()=>import( '@/components/outpatient/page/user.vue')
//门诊端页面
const outpatient_pathogenicSearch = ()=>import( '@/components/outpatient/page/pathogenicSearch.vue')
const outpatient_detailsPage = ()=>import( '@/components/outpatient/page/detailsPage.vue')
const outpatient_hospitalImage = ()=>import( '@/components/outpatient/page/hospitalImage.vue')
const outpatient_typeDetails = ()=>import( '@/components/outpatient/page/typeDetails.vue')
const outpatient_case = ()=>import( '@/components/outpatient/page/case.vue')
const outpatient_caseDetails = ()=>import( '@/components/outpatient/page/caseDetails.vue')
const outpatient_expertsIntroduction = ()=>import( '@/components/outpatient/page/expertsIntroduction.vue')
const outpatient_activityReleased = ()=>import( '@/components/outpatient/page/activityReleased.vue')
const outpatient_addActivity = ()=>import( '@/components/outpatient/page/addActivity.vue')
const outpatient_previewActivities = ()=>import( '@/components/outpatient/page/previewActivities.vue')
const outpatient_activityDetails = ()=>import( '@/components/outpatient/page/activityDetails.vue')
const outpatient_clinicMessage = ()=>import( '@/components/outpatient/page/clinicMessage.vue')
const outpatient_taskCenter = ()=>import( '@/components/outpatient/page/taskCenter.vue')
const outpatient_integralExchange = ()=>import( '@/components/outpatient/page/integralExchange.vue')
const outpatient_integralDetails = ()=>import( '@/components/outpatient/page/integralDetails.vue')
const outpatient_integralHistory = ()=>import( '@/components/outpatient/page/integralHistory.vue')
const outpatient_ExchangeList = ()=>import( '@/components/outpatient/page/ExchangeList.vue')
const outpatient_integralShop = ()=>import( '@/components/outpatient/page/integralShop.vue')
const outpatient_integralShopDetails = ()=>import( '@/components/outpatient/page/integralShopDetails.vue')
const outpatient_shopAddress = ()=>import( '@/components/outpatient/page/shopAddress.vue')
const outpatient_shopAddressAdd = ()=>import( '@/components/outpatient/page/shopAddressAdd.vue')
const outpatient_pictureEnlargement = ()=>import( '@/components/outpatient/page/pictureEnlargement.vue')
const outpatient_articleSearch = ()=>import( '@/components/outpatient/page/articleSearch.vue')

//运营端
const operating = ()=>import( '@/components/operating/operating.vue')
const operatingLogin = ()=>import( '@/components/operating/operatingLogin.vue')
const operating_urlPage = ()=>import( '@/components/operating/urlPage.vue')
const operating_retrievePassword = ()=>import( '@/components/operating/retrievePassword.vue')

//运营端主页
const operating_index = ()=>import( '@/components/operating/page/index.vue')
const operating_user = ()=>import( '@/components/operating/page/user.vue')
const operating_clinic = ()=>import( '@/components/operating/page/clinic.vue')
//运营端页面
const operating_addHospital = ()=>import( '@/components/operating/page/addHospital.vue')
const operating_indexDetails = ()=>import( '@/components/operating/page/indexDetails.vue')
const operating_hospiatlAllSearch = ()=>import( '@/components/operating/page/hospiatlAllSearch.vue')
const operating_clinicSearch = ()=>import( '@/components/operating/page/clinicSearch.vue')
const operating_sourceManagement = ()=>import( '@/components/operating/page/sourceManagement.vue')
const operating_pathogenicSearch = ()=>import( '@/components/operating/page/pathogenicSearch.vue')
const operating_activityDetails = ()=>import( '@/components/operating/page/activityDetails.vue')
const operating_activityReleased = ()=>import( '@/components/operating/page/activityReleased.vue')
const operating_addActivity = ()=>import( '@/components/operating/page/addActivity.vue')
const operating_previewActivities = ()=>import( '@/components/operating/page/previewActivities.vue')
const operating_caseDetails = ()=>import( '@/components/operating/page/caseDetails.vue')
const operating_collect = ()=>import( '@/components/operating/page/collect.vue')
const operating_clinicDetails = ()=>import( '@/components/operating/page/clinicDetails.vue')
const operating_operating = ()=>import( '@/components/operating/page/operating.vue')
const operating_operatingManual = ()=>import( '@/components/operating/page/operatingManual.vue')
const operating_operatingManualList = ()=>import( '@/components/operating/page/operatingManualList.vue')
const operating_operatingManualListDetails = ()=>import( '@/components/operating/page/operatingManualListDetails.vue')
const operating_operatingManualListTwo = ()=>import( '@/components/operating/page/operatingManualListTwo.vue')
const operating_operatingDate = ()=>import( '@/components/operating/page/operatingDate.vue')
const operating_clinicAllSearch = ()=>import( '@/components/operating/page/clinicAllSearch.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'chooseTheType',
      component: chooseTheType,
      meta: {},
    },
    {
      path: '/tihuan',
      name: 'tihuan',
      component: tihuan,
      meta: {unkeepLastRoute:true},
    },
    {
      path: '/sharePage',
      name: 'sharePage',
      component: sharePage,
	  meta: {},
    },
	{
		path: '*',
		name: 'error',
		component: Page404,
		meta: {},
	},
    {
      path: '/hospital',
      name: 'hospital',
      component: hospital,
      meta: {auth:true},
      redirect:'/hospital/hospital_index',
      children:[
        {
          path: 'hospitalLogin',
          name: 'hospitalLogin',
          component: hospitalLogin,
          meta: {auth:true,indexHide:true},
        },
        {
          path: 'hospital_index',
          name: 'hospital_index',
          component: hospital_index,
          meta: {auth:true,tabbar:true,indexHide:true},
        },
        {
          path: 'hospital_urlPage',
          name: 'hospital_urlPage',
          component: hospital_urlPage,
          meta: {auth:true,indexHide:true,},
        },
        {
          path: 'hospital_retrievePassword',
          name: 'hospital_retrievePassword',
          component: hospital_retrievePassword,
          meta: {auth:true,indexHide:true,},
        },
        {
          path: 'hospital_clinic',
          name: 'hospital_clinic',
          component: hospital_clinic,
          meta: {auth:true,tabbar:true},
        },
        {
          path: 'hospital_gene',
          name: 'hospital_gene',
          component: hospital_gene,
          meta: {auth:true,tabbar:true},
        },
        {
          path: 'hospital_user',
          name: 'hospital_user',
          component: hospital_user,
          meta: {auth:true,tabbar:true},
        },
        {
          path: 'hospital_clinicSearch',
          name: 'hospital_clinicSearch',
          component: hospital_clinicSearch,
          meta: {auth:true},
        },
        {
          path: 'hospital_addCLinic',
          name: 'hospital_addCLinic',
          component: hospital_addCLinic,
          meta: {auth:true},
        },
        {
          path: 'hospital_clinicDetails',
          name: 'hospital_clinicDetails',
          component: hospital_clinicDetails,
          meta: {auth:true},
        },
        {
          path: 'hospital_clinicInfo',
          name: 'hospital_clinicInfo',
          component: hospital_clinicInfo,
          meta: {auth:true},
        },
        {
          path: 'hospital_detailsPage',
          name: 'hospital_detailsPage',
          component: hospital_detailsPage,
          meta: {auth:true},
        },
        {
          path: 'hospital_sourceManagement',
          name: 'hospital_sourceManagement',
          component: hospital_sourceManagement,
          meta: {auth:true},
        },
        {
          path: 'hospital_pathogenicSearch',
          name: 'hospital_pathogenicSearch',
          component: hospital_pathogenicSearch,
          meta: {auth:true},
        },
        {
          path: 'hospital_collect',
          name: 'hospital_collect',
          component: hospital_collect,
          meta: {auth:true},
        },
        {
          path: 'hospital_operating',
          name: 'hospital_operating',
          component: hospital_operating,
          meta: {auth:true},
        },
        {
          path: 'hospital_pushTheManagement',
          name: 'hospital_pushTheManagement',
          component: hospital_pushTheManagement,
          meta: {auth:true},
        },
        {
          path: 'hospital_operatingManual',
          name: 'hospital_operatingManual',
          component: hospital_operatingManual,
          meta: {auth:true},
        },
        {
          path: 'hospital_operatingDate',
          name: 'hospital_operatingDate',
          component: hospital_operatingDate,
          meta: {auth:true},
        },
        {
          path: 'hospital_operatingManualList',
          name: 'hospital_operatingManualList',
          component: hospital_operatingManualList,
          meta: {auth:true},
        },
        {
          path: 'hospital_operatingManualListTwo',
          name: 'hospital_operatingManualListTwo',
          component: hospital_operatingManualListTwo,
          meta: {auth:true},
        },
        {
          path: 'hospital_operatingManualListThree',
          name: 'hospital_operatingManualListThree',
          component: hospital_operatingManualListThree,
          meta: {auth:true},
        },
        {
          path: 'hospital_operatingManualListFour',
          name: 'hospital_operatingManualListFour',
          component: hospital_operatingManualListFour,
          meta: {auth:true},
        },
        {
          path: 'hospital_operatingManualListFive',
          name: 'hospital_operatingManualListFive',
          component: hospital_operatingManualListFive,
          meta: {auth:true},
        },
        {
          path: 'hospital_operatingManualListSix',
          name: 'hospital_operatingManualListSix',
          component: hospital_operatingManualListSix,
          meta: {auth:true},
        },
        {
          path: 'hospital_operatingManualListSeven',
          name: 'hospital_operatingManualListSeven',
          component: hospital_operatingManualListSeven,
          meta: {auth:true},
        },
        {
          path: 'hospital_operatingManualListDetails',
          name: 'hospital_operatingManualListDetails',
          component: hospital_operatingManualListDetails,
          meta: {auth:true},
        },
        {
          path: 'hospital_activityReleased',
          name: 'hospital_activityReleased',
          component: hospital_activityReleased,
          meta: {auth:true},
        },
        {
          path: 'hospital_addActivity',
          name: 'hospital_addActivity',
          component: hospital_addActivity,
          meta: {auth:true},
        },
        {
          path: 'hospital_activityDetails',
          name: 'hospital_activityDetails',
          component: hospital_activityDetails,
          meta: {auth:true},
        },
        {
          path: 'hospital_previewActivities',
          name: 'hospital_previewActivities',
          component: hospital_previewActivities,
          meta: {auth:true},
        },
        {
          path: 'hospital_case',
          name: 'hospital_case',
          component: hospital_case,
          meta: {auth:true},
        },
        {
          path: 'hospital_caseDetails',
          name: 'hospital_caseDetails',
          component: hospital_caseDetails,
          meta: {auth:true},
        },
        {
          path: 'hospital_hospitalImage',
          name: 'hospital_hospitalImage',
          component: hospital_hospitalImage,
          meta: {auth:true},
        },
        {
          path: 'hospital_typeDetails',
          name: 'hospital_typeDetails',
          component: hospital_typeDetails,
          meta: {auth:true},
        },
        {
          path: 'hospital_expertsIntroduction',
          name: 'hospital_expertsIntroduction',
          component: hospital_expertsIntroduction,
          meta: {auth:true},
        },
        {
          path: 'hospital_clinicMessage',
          name: 'hospital_clinicMessage',
          component: hospital_clinicMessage,
          meta: {auth:true},
        },
        {
          path: 'hospital_taskManagement',
          name: 'hospital_taskManagement',
          component: hospital_taskManagement,
          meta: {auth:true},
        },
        {
          path: 'hospital_taskManagementDetails',
          name: 'hospital_taskManagementDetails',
          component: hospital_taskManagementDetails,
          meta: {auth:true},
        },
        {
          path: 'hospital_exchangeManagement',
          name: 'hospital_exchangeManagement',
          component: hospital_exchangeManagement,
          meta: {auth:true},
        },
		{
		  path: 'hospital_exchangeDetails',
		  name: 'hospital_exchangeDetails',
		  component: hospital_exchangeDetails,
		  meta: {auth:true},
		},
        {
          path: 'hospital_exchangeManagementList',
          name: 'hospital_exchangeManagementList',
          component: hospital_exchangeManagementList,
          meta: {auth:true},
        },
        {
          path: 'hospital_exchangeManagementAdd',
          name: 'hospital_exchangeManagementAdd',
          component: hospital_exchangeManagementAdd,
          meta: {auth:true},
        },
        {
          path: 'hospital_exchangeManagementImg',
          name: 'hospital_exchangeManagementImg',
          component: hospital_exchangeManagementImg,
          meta: {auth:true},
        },
        {
          path: 'hospital_exchangeEditor',
          name: 'hospital_exchangeEditor',
          component: hospital_exchangeEditor,
          meta: {auth:true},
        },
        {
          path: 'hospital_exchangeEditorImg',
          name: 'hospital_exchangeEditorImg',
          component: hospital_exchangeEditorImg,
          meta: {auth:true},
        },
        {
          path: 'hospital_promoters',
          name: 'hospital_promoters',
          component: hospital_promoters,
          meta: {auth:true},
        },
        {
          path: 'hospital_promotersDetails',
          name: 'hospital_promotersDetails',
          component: hospital_promotersDetails,
          meta: {auth:true},
        },
        {
          path: 'hospital_promotersSearch',
          name: 'hospital_promotersSearch',
          component: hospital_promotersSearch,
          meta: {auth:true},
        },
        {
          path: 'hospital_addPromoters',
          name: 'hospital_addPromoters',
          component: hospital_addPromoters,
          meta: {auth:true},
        },
        {
          path: 'hospital_list',
          name: 'hospital_list',
          component: hospital_list,
          meta: {auth:true},
        },
        {
          path: 'hospital_pictureEnlargement',
          name: 'hospital_pictureEnlargement',
          component: hospital_pictureEnlargement,
          meta: {auth:true},
        },
        {
          path: '/promoters',
          name: 'promoters',
          component: promoters,
          meta: {auth:true},
          redirect:'/promoters_index',
          children:[
            {
              path: '/promoters_index',
              name: 'promoters_index',
              component: promoters_index,
              meta: {auth:true,bottom:true,indexHide:true},
            },
            {
              path: 'promoters_clinicSearch',
              name: 'promoters_clinicSearch',
              component: promoters_clinicSearch,
              meta: {auth:true},
            },
            {
              path: 'promoters_addClinic',
              name: 'promoters_addClinic',
              component: promoters_addClinic,
              meta: {auth:true},
            },
            {
              path: 'promoters_source',
              name: 'promoters_source',
              component: promoters_source,
              meta: {auth:true},
            },
            {
              path: 'promoters_addSource',
              name: 'promoters_addSource',
              component: promoters_addSource,
              meta: {auth:true},
            },
            {
              path: 'promoters_clinicInfo',
              name: 'promoters_clinicInfo',
              component: promoters_clinicInfo,
              meta: {auth:true},
            },
            {
              path: 'promoters_detailsPage',
              name: 'promoters_detailsPage',
              component: promoters_detailsPage,
              meta: {auth:true},
            },
            {
              path: 'promoters_pictureEnlargement',
              name: 'promoters_pictureEnlargement',
              component: promoters_pictureEnlargement,
              meta: {auth:true},
            },
            {
              path: 'promoters_sourceManagement',
              name: 'promoters_sourceManagement',
              component: promoters_sourceManagement,
              meta: {auth:true},
            },
            {
              path: 'promoters_sourceSearch',
              name: 'promoters_sourceSearch',
              component: promoters_sourceSearch,
              meta: {auth:true},
            },
            {
              path: 'promoters_cilnic',
              name: 'promoters_cilnic',
              component: promoters_cilnic,
              meta: {auth:true,bottom:true},
            },
            {
              path: 'promoters_user',
              name: 'promoters_user',
              component: promoters_user,
              meta: {auth:true,bottom:true},
            },
            {
              path: 'promoters_case',
              name: 'promoters_case',
              component: promoters_case,
              meta: {auth:true},
            },
            {
              path: 'promoters_caseDetails',
              name: 'promoters_caseDetails',
              component: promoters_caseDetails,
              meta: {auth:true},
            },
            {
              path: 'promoters_activityReleased',
              name: 'promoters_activityReleased',
              component: promoters_activityReleased,
              meta: {auth:true},
            },
            {
              path: 'promoters_activityDetails',
              name: 'promoters_activityDetails',
              component: promoters_activityDetails,
              meta: {auth:true},
            },

          ]
        },
      ]
    },
    {
      path: '/outpatient',
      name: 'outpatient',
      component: outpatient,
      meta: {auth:true},
      redirect:'/outpatient/outpatient_index',
      children:[
        {
          path: '/outpatientLogin',
          name: 'outpatientLogin',
          component: outpatientLogin,
          meta: {auth:true,indexHide:true,},
        },
		
        {
          path: 'outpatient_index',
          name: 'outpatient_index',
          component: outpatient_index,
          meta: {auth:true,tabbar:true,indexHide:true},
        },
		{
			path: '/outpatient_retrievePassword',
			name: 'outpatient_retrievePassword',
			component: outpatient_retrievePassword,
			meta: {auth:true,indexHide:true},
		},
		{
			path: '/outpatient_urlPage',
			name: 'outpatient_urlPage',
			component: outpatient_urlPage,
			meta: {auth:true,indexHide:true},
		},
        {
          path: 'outpatient_pathogenicSearch',
          name: 'outpatient_pathogenicSearch',
          component: outpatient_pathogenicSearch,
          meta: {auth:true},
        },
        {
          path: 'outpatient_detailsPage',
          name: 'outpatient_detailsPage',
          component: outpatient_detailsPage,
          meta: {auth:true},
        },
        {
          path: 'outpatient_hospital',
          name: 'outpatient_hospital',
          component: outpatient_hospital,
          meta: {auth:true,tabbar:true},
        },
        {
          path: 'outpatient_hospitalImage',
          name: 'outpatient_hospitalImage',
          component: outpatient_hospitalImage,
          meta: {auth:true},
        },
        {
          path: 'outpatient_typeDetails',
          name: 'outpatient_typeDetails',
          component: outpatient_typeDetails,
          meta: {auth:true},
        },
        {
          path: 'outpatient_case',
          name: 'outpatient_case',
          component: outpatient_case,
          meta: {auth:true},
        },
        {
          path: 'outpatient_caseDetails',
          name: 'outpatient_caseDetails',
          component: outpatient_caseDetails,
          meta: {auth:true},
        },
        {
          path: 'outpatient_expertsIntroduction',
          name: 'outpatient_expertsIntroduction',
          component: outpatient_expertsIntroduction,
          meta: {auth:true},
        },
        {
          path: 'outpatient_activityReleased',
          name: 'outpatient_activityReleased',
          component: outpatient_activityReleased,
          meta: {auth:true},
        },
        {
          path: 'outpatient_addActivity',
          name: 'outpatient_addActivity',
          component: outpatient_addActivity,
          meta: {auth:true},
        },
        {
          path: 'outpatient_previewActivities',
          name: 'outpatient_previewActivities',
          component: outpatient_previewActivities,
          meta: {auth:true},
        },
        {
          path: 'outpatient_activityDetails',
          name: 'outpatient_activityDetails',
          component: outpatient_activityDetails,
          meta: {auth:true},
        },
        {
          path: 'outpatient_clinicMessage',
          name: 'outpatient_clinicMessage',
          component: outpatient_clinicMessage,
          meta: {auth:true},
        },
        {
          path: 'outpatient_gene',
          name: 'outpatient_gene',
          component: outpatient_gene,
          meta: {auth:true,tabbar:true},
        },
        {
          path: 'outpatient_user',
          name: 'outpatient_user',
          component: outpatient_user,
          meta: {auth:true,tabbar:true},
        },
        {
          path: 'outpatient_taskCenter',
          name: 'outpatient_taskCenter',
          component: outpatient_taskCenter,
          meta: {auth:true},
        },
        {
          path: 'outpatient_integralExchange',
          name: 'outpatient_integralExchange',
          component: outpatient_integralExchange,
          meta: {auth:true},
        },
        {
          path: 'outpatient_integralDetails',
          name: 'outpatient_integralDetails',
          component: outpatient_integralDetails,
          meta: {auth:true},
        },
        {
          path: 'outpatient_integralHistory',
          name: 'outpatient_integralHistory',
          component: outpatient_integralHistory,
          meta: {auth:true},
        },
        {
          path: 'outpatient_ExchangeList',
          name: 'outpatient_ExchangeList',
          component: outpatient_ExchangeList,
          meta: {auth:true},
        },
        {
          path: 'outpatient_integralShop',
          name: 'outpatient_integralShop',
          component: outpatient_integralShop,
          meta: {auth:true},
        },
        {
          path: 'outpatient_integralShopDetails',
          name: 'outpatient_integralShopDetails',
          component: outpatient_integralShopDetails,
          meta: {auth:true},
        },
        {
          path: 'outpatient_shopAddress',
          name: 'outpatient_shopAddress',
          component: outpatient_shopAddress,
          meta: {auth:true},
        },
        {
          path: 'outpatient_shopAddressAdd',
          name: 'outpatient_shopAddressAdd',
          component: outpatient_shopAddressAdd,
          meta: {auth:true},
        },
        {
          path: 'outpatient_pictureEnlargement',
          name: 'outpatient_pictureEnlargement',
          component: outpatient_pictureEnlargement,
          meta: {auth:true},
        },
        {
          path: 'outpatient_articleSearch',
          name: 'outpatient_articleSearch',
          component: outpatient_articleSearch,
          meta: {auth:true},
        },
        
      ]
    },
	{
		path: '/operating',
		name: 'operating',
		component: operating,
		meta: {auth:true},
		redirect:'/operating/operating_index',
		children:[
			{
			  path: 'operatingLogin',
			  name: 'operatingLogin',
			  component: operatingLogin,
			  meta: {auth:true,indexHide:true},
			},
			{
			  path: 'operating_urlPage',
			  name: 'operating_urlPage',
			  component: operating_urlPage,
			  meta: {auth:true,indexHide:true},
			},
			{
			  path: 'operating_retrievePassword',
			  name: 'operating_retrievePassword',
			  component: operating_retrievePassword,
			  meta: {auth:true,indexHide:true},
			},
			
			{
			  path: 'operating_index',
			  name: 'operating_index',
			  component: operating_index,
			  meta: {auth:true,tabbar:true,indexHide:true},
			},
			{
			  path: 'operating_user',
			  name: 'operating_user',
			  component: operating_user,
			  meta: {auth:true,tabbar:true},
			},
			{
			  path: 'operating_clinic',
			  name: 'operating_clinic',
			  component: operating_clinic,
			  meta: {auth:true,tabbar:true},
			},
			{
			  path: 'operating_addHospital',
			  name: 'operating_addHospital',
			  component: operating_addHospital,
			  meta: {auth:true},
			},
			{
			  path: 'operating_hospiatlAllSearch',
			  name: 'operating_hospiatlAllSearch',
			  component: operating_hospiatlAllSearch,
			  meta: {auth:true},
			},
			{
			  path: 'operating_clinicSearch',
			  name: 'operating_clinicSearch',
			  component: operating_clinicSearch,
			  meta: {auth:true},
			},
			{
			  path: 'operating_sourceManagement',
			  name: 'operating_sourceManagement',
			  component: operating_sourceManagement,
			  meta: {auth:true},
			},
			{
			  path: 'operating_pathogenicSearch',
			  name: 'operating_pathogenicSearch',
			  component: operating_pathogenicSearch,
			  meta: {auth:true},
			},
			{
			  path: 'operating_activityDetails',
			  name: 'operating_activityDetails',
			  component: operating_activityDetails,
			  meta: {auth:true},
			},
			{
			  path: 'operating_activityReleased',
			  name: 'operating_activityReleased',
			  component: operating_activityReleased,
			  meta: {auth:true},
			},
			{
			  path: 'operating_addActivity',
			  name: 'operating_addActivity',
			  component: operating_addActivity,
			  meta: {auth:true},
			},
			{
			  path: 'operating_previewActivities',
			  name: 'operating_previewActivities',
			  component: operating_previewActivities,
			  meta: {auth:true},
			},
			{
			  path: 'operating_caseDetails',
			  name: 'operating_caseDetails',
			  component: operating_caseDetails,
			  meta: {auth:true},
			},
			{
			  path: 'operating_collect',
			  name: 'operating_collect',
			  component: operating_collect,
			  meta: {auth:true},
			},
			{
			  path: 'operating_operating',
			  name: 'operating_operating',
			  component: operating_operating,
			  meta: {auth:true},
			},
			{
			  path: 'operating_operatingManual',
			  name: 'operating_operatingManual',
			  component: operating_operatingManual,
			  meta: {auth:true},
			},
			{
			  path: 'operating_operatingManualList',
			  name: 'operating_operatingManualList',
			  component: operating_operatingManualList,
			  meta: {auth:true},
			},
			{
			  path: 'operating_operatingManualListDetails',
			  name: 'operating_operatingManualListDetails',
			  component: operating_operatingManualListDetails,
			  meta: {auth:true},
			},
			{
			  path: 'operating_operatingDate',
			  name: 'operating_operatingDate',
			  component: operating_operatingDate,
			  meta: {auth:true},
      },
      {
			  path: 'operating_operatingManualListTwo',
			  name: 'operating_operatingManualListTwo',
			  component: operating_operatingManualListTwo,
			  meta: {auth:true},
      },
      
			{
			  path: 'operating_clinicAllSearch',
			  name: 'operating_clinicAllSearch',
			  component: operating_clinicAllSearch,
			  meta: {auth:true},
			},
			
			{
			  path: 'operating_clinicDetails',
			  name: 'operating_clinicDetails',
			  component: operating_clinicDetails,
			  meta: {auth:true},
			},
			
			{
			  path: 'operating_indexDetails',
			  name: 'operating_indexDetails',
			  component: operating_indexDetails,
			  meta: {auth:true},
			},
			
		]
	}		
  ]
})
router.afterEach((to,from) => {
  // console.log(from.name)
  // console.dir(from.query)
  // console.log(this.$vnode.parent.componentInstance.cache)
  // console.log('---------')
  // console.log(to.name)
	// console.dir(to.query)
  debugger
  Store.state.bottomShow = !!to.meta.tabbar;
  Store.state.childBottomShow = !!to.meta.bottom;
  Store.state.hospitalReturnHomePage = !to.meta.indexHide
  Store.state.outpatientReturnHomePage = !to.meta.indexHide
  Store.state.operatingReturnHomePage = !to.meta.indexHide
  if(to.path == from.path){
	// next({path:'/tihuan',query:to.query})
	router.replace({path:'/tihuan',query:{query:JSON.stringify(to.query),path:to.path}})
  }

})
export default router
