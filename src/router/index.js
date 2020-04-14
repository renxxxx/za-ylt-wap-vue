import Vue from 'vue'
import Store from '../store'
import Router from 'vue-router'

import chooseTheType from '@/components/chooseTheType.vue'
import sharePage from '@/components/sharePage.vue'
import Page404 from '@/components/404Page.vue'

//医院端
import hospital from '@/components/hospital/hospital.vue'
import hospital_urlPage from '@/components/hospital/urlPage.vue'
import hospital_retrievePassword from '@/components/hospital/retrievePassword.vue'
import hospitalLogin from '@/components/hospital/hospitalLogin.vue'
//医院端主页
import hospital_index from '@/components/hospital/page/index.vue'
import hospital_clinic from '@/components/hospital/page/clinic.vue'
import hospital_gene from '@/components/hospital/page/gene.vue'
import hospital_user from '@/components/hospital/page/user.vue'

//医院端页面
import hospital_clinicSearch from '@/components/hospital/page/clinicSearch.vue'
import hospital_addCLinic from '@/components/hospital/page/addCLinic.vue'
import hospital_clinicDetails from '@/components/hospital/page/clinicDetails.vue'
import hospital_clinicInfo from '@/components/hospital/page/clinicInfo.vue'
import hospital_detailsPage from '@/components/hospital/page/detailsPage.vue'
import hospital_sourceManagement from '@/components/hospital/page/sourceManagement.vue'
import hospital_pathogenicSearch from '@/components/hospital/page/pathogenicSearch.vue'
import hospital_collect from '@/components/hospital/page/collect.vue'
import hospital_operating from '@/components/hospital/page/operating.vue'
import hospital_pushTheManagement from '@/components/hospital/page/pushTheManagement.vue'
import hospital_operatingManual from '@/components/hospital/page/operatingManual.vue'
import  hospital_operatingDate from '@/components/hospital/page/operatingDate.vue'
import hospital_operatingManualList from '@/components/hospital/page/operatingManualList.vue'
import hospital_operatingManualListTwo from '@/components/hospital/page/operatingManualListTwo.vue'
import  hospital_operatingManualListThree from '@/components/hospital/page/operatingManualListThree.vue'
import  hospital_operatingManualListFour from '@/components/hospital/page/operatingManualListFour.vue'
import  hospital_operatingManualListFive from '@/components/hospital/page/operatingManualListFive.vue'
import  hospital_operatingManualListSix from '@/components/hospital/page/operatingManualListSix.vue'
import  hospital_operatingManualListSeven from '@/components/hospital/page/operatingManualListSeven.vue'
import  hospital_operatingManualListDetails from '@/components/hospital/page/operatingManualListDetails.vue'
import  hospital_activityReleased from '@/components/hospital/page/activityReleased.vue'
import  hospital_addActivity from '@/components/hospital/page/addActivity.vue'
import  hospital_activityDetails from '@/components/hospital/page/activityDetails.vue'
import  hospital_previewActivities from '@/components/hospital/page/previewActivities.vue'
import  hospital_case from '@/components/hospital/page/case.vue'
import  hospital_caseDetails from '@/components/hospital/page/caseDetails.vue'
import  hospital_hospitalImage from '@/components/hospital/page/hospitalImage.vue'
import  hospital_typeDetails from '@/components/hospital/page/typeDetails.vue'
import  hospital_expertsIntroduction from '@/components/hospital/page/expertsIntroduction.vue'
import  hospital_clinicMessage from '@/components/hospital/page/clinicMessage.vue'
import  hospital_taskManagement from '@/components/hospital/page/taskManagement.vue'
import  hospital_taskManagementDetails from '@/components/hospital/page/taskManagementDetails.vue'
import  hospital_exchangeManagement from '@/components/hospital/page/exchangeManagement.vue'
import  hospital_exchangeDetails from '@/components/hospital/page/exchangeDetails.vue'
import  hospital_exchangeManagementList from '@/components/hospital/page/exchangeManagementList.vue'
import  hospital_exchangeManagementAdd from '@/components/hospital/page/exchangeManagementAdd.vue'
import  hospital_exchangeManagementImg from '@/components/hospital/page/exchangeManagementImg.vue'
import  hospital_exchangeEditor from '@/components/hospital/page/exchangeEditor.vue'
import  hospital_exchangeEditorImg from '@/components/hospital/page/exchangeEditorImg.vue'
import  hospital_promoters from '@/components/hospital/page/promoters.vue'
import  hospital_promotersDetails from '@/components/hospital/page/promotersDetails.vue'
import  hospital_promotersSearch from '@/components/hospital/page/promotersSearch.vue'
import  hospital_addPromoters from '@/components/hospital/page/addPromoters.vue'
import  hospital_list from '@/components/hospital/page/list.vue'
import  hospital_pictureEnlargement from '@/components/hospital/page/pictureEnlargement.vue'

//医院端下的门诊推广人端
import promoters from '@/components/hospital/promoters/promoters.vue'
//医院端下的门诊推广人端主页
import promoters_index from '@/components/hospital/promoters/page/index.vue'
import promoters_cilnic from '@/components/hospital/promoters/page/cilnic.vue'
import promoters_user from '@/components/hospital/promoters/page/user.vue'
//医院端下面的推广人端页面
import promoters_clinicSearch from '@/components/hospital/promoters/page/clinicSearch.vue'
import promoters_addClinic from '@/components/hospital/promoters/page/addClinic.vue'
import promoters_source from '@/components/hospital/promoters/page/source.vue'
import promoters_addSource from '@/components/hospital/promoters/page/addSource.vue'
import promoters_clinicInfo from '@/components/hospital/promoters/page/clinicInfo.vue'
import promoters_detailsPage from '@/components/hospital/promoters/page/detailsPage.vue'
import promoters_pictureEnlargement from '@/components/hospital/promoters/page/pictureEnlargement.vue'
import promoters_sourceManagement from '@/components/hospital/promoters/page/sourceManagement.vue'
import promoters_sourceSearch from '@/components/hospital/promoters/page/sourceSearch.vue'
import promoters_case from '@/components/hospital/promoters/page/case.vue'
import promoters_caseDetails from '@/components/hospital/promoters/page/caseDetails.vue'
import promoters_activityReleased from '@/components/hospital/promoters/page/activityReleased.vue'
import promoters_activityDetails from '@/components/hospital/promoters/page/activityDetails.vue'

//门诊端
import outpatient from '@/components/outpatient/outpatient.vue'
import outpatientLogin from '@/components/outpatient/outpatientLogin.vue'
import outpatient_retrievePassword from '@/components/outpatient/retrievePassword.vue'
import outpatient_urlPage from '@/components/outpatient/urlPage.vue'

//门诊端主页
import outpatient_index from '@/components/outpatient/page/index.vue'
import outpatient_hospital from '@/components/outpatient/page/hospital.vue'
import outpatient_gene from '@/components/outpatient/page/gene.vue'
import outpatient_user from '@/components/outpatient/page/user.vue'
//门诊端页面
import outpatient_pathogenicSearch from '@/components/outpatient/page/pathogenicSearch.vue'
import outpatient_detailsPage from '@/components/outpatient/page/detailsPage.vue'
import outpatient_hospitalImage from '@/components/outpatient/page/hospitalImage.vue'
import outpatient_typeDetails from '@/components/outpatient/page/typeDetails.vue'
import outpatient_case from '@/components/outpatient/page/case.vue'
import outpatient_caseDetails from '@/components/outpatient/page/caseDetails.vue'
import outpatient_expertsIntroduction from '@/components/outpatient/page/expertsIntroduction.vue'
import outpatient_activityReleased from '@/components/outpatient/page/activityReleased.vue'
import outpatient_addActivity from '@/components/outpatient/page/addActivity.vue'
import outpatient_previewActivities from '@/components/outpatient/page/previewActivities.vue'
import outpatient_activityDetails from '@/components/outpatient/page/activityDetails.vue'
import outpatient_clinicMessage from '@/components/outpatient/page/clinicMessage.vue'
import outpatient_taskCenter from '@/components/outpatient/page/taskCenter.vue'
import outpatient_integralExchange from '@/components/outpatient/page/integralExchange.vue'
import outpatient_integralDetails from '@/components/outpatient/page/integralDetails.vue'
import outpatient_integralHistory from '@/components/outpatient/page/integralHistory.vue'
import outpatient_ExchangeList from '@/components/outpatient/page/ExchangeList.vue'
import outpatient_integralShop from '@/components/outpatient/page/integralShop.vue'
import outpatient_integralShopDetails from '@/components/outpatient/page/integralShopDetails.vue'
import outpatient_shopAddress from '@/components/outpatient/page/shopAddress.vue'
import outpatient_shopAddressAdd from '@/components/outpatient/page/shopAddressAdd.vue'
import outpatient_pictureEnlargement from '@/components/outpatient/page/pictureEnlargement.vue'
import outpatient_articleSearch from '@/components/outpatient/page/articleSearch.vue'

//运营端
import operating from '@/components/operating/operating.vue'
import operatingLogin from '@/components/operating/operatingLogin.vue'
import operating_urlPage from '@/components/operating/urlPage.vue'
import operating_retrievePassword from '@/components/operating/retrievePassword.vue'

//运营端主页
import operating_index from '@/components/operating/page/index.vue'
import operating_user from '@/components/operating/page/user.vue'
import operating_clinic from '@/components/operating/page/clinic.vue'
//运营端页面
import operating_addHospital from '@/components/operating/page/addHospital.vue'
import operating_indexDetails from '@/components/operating/page/indexDetails.vue'
import operating_hospiatlAllSearch from '@/components/operating/page/hospiatlAllSearch.vue'
import operating_clinicSearch from '@/components/operating/page/clinicSearch.vue'
import operating_sourceManagement from '@/components/operating/page/sourceManagement.vue'
import operating_pathogenicSearch from '@/components/operating/page/pathogenicSearch.vue'
import operating_activityDetails from '@/components/operating/page/activityDetails.vue'
import operating_activityReleased from '@/components/operating/page/activityReleased.vue'
import operating_addActivity from '@/components/operating/page/addActivity.vue'
import operating_previewActivities from '@/components/operating/page/previewActivities.vue'
import operating_caseDetails from '@/components/operating/page/caseDetails.vue'
import operating_collect from '@/components/operating/page/collect.vue'
import operating_operating from '@/components/operating/page/operating.vue'
import operating_clinicDetails from '@/components/operating/page/clinicDetails.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'chooseTheType',
      component: chooseTheType,
      meta: {unkeepLastRoute:true},
    },
    // {
    //   path: '/chooseTheType',
    //   name: 'chooseTheType',
    //   component: chooseTheType,
    //   meta: {unkeepLastRoute:true},
    // },
    {
      path: '/sharePage',
      name: 'sharePage',
      component: sharePage,
	  meta: {unkeepLastRoute:true},
    },
	{
		path: '*',
		name: 'error',
		component: Page404,
		meta: {unkeepLastRoute:true},
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
          meta: {auth:true,unkeepLastRoute:true,indexHide:true},
        },
        {
          path: 'hospital_index',
          name: 'hospital_index',
          component: hospital_index,
          meta: {auth:true,tabbar:true,unkeepLastRoute:true,indexHide:true},
        },
        {
          path: 'hospital_urlPage',
          name: 'hospital_urlPage',
          component: hospital_urlPage,
          meta: {auth:true,indexHide:true,unkeepLastRoute:true},
        },
        {
          path: 'hospital_retrievePassword',
          name: 'hospital_retrievePassword',
          component: hospital_retrievePassword,
          meta: {auth:true,indexHide:true,unkeepLastRoute:true},
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
              meta: {auth:true,bottom:true,unkeepLastRoute:true,indexHide:true},
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
          meta: {auth:true,indexHide:true,unkeepLastRoute:true},
        },
		
        {
          path: 'outpatient_index',
          name: 'outpatient_index',
          component: outpatient_index,
          meta: {auth:true,unkeepLastRoute:true,tabbar:true,indexHide:true},
        },
				{
					path: '/outpatient_retrievePassword',
					name: 'outpatient_retrievePassword',
					component: outpatient_retrievePassword,
					meta: {auth:true,unkeepLastRoute:true,indexHide:true},
				},
				{
					path: '/outpatient_urlPage',
					name: 'outpatient_urlPage',
					component: outpatient_urlPage,
					meta: {auth:true,unkeepLastRoute:true,indexHide:true},
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
			  meta: {auth:true,unkeepLastRoute:true,indexHide:true},
			},
			{
			  path: 'operating_urlPage',
			  name: 'operating_urlPage',
			  component: operating_urlPage,
			  meta: {auth:true,unkeepLastRoute:true,indexHide:true},
			},
			{
			  path: 'operating_retrievePassword',
			  name: 'operating_retrievePassword',
			  component: operating_retrievePassword,
			  meta: {auth:true,unkeepLastRoute:true,indexHide:true},
			},
			
			{
			  path: 'operating_index',
			  name: 'operating_index',
			  component: operating_index,
			  meta: {auth:true,tabbar:true,unkeepLastRoute:true,indexHide:true},
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
  debugger
  Store.state.bottomShow = !!to.meta.tabbar;
  Store.state.childBottomShow = !!to.meta.bottom;
  Store.state.hospitalReturnHomePage = !to.meta.indexHide
  Store.state.outpatientReturnHomePage = !to.meta.indexHide
  Store.state.operatingReturnHomePage = !to.meta.indexHide
  
  // Store.state.bottomShow = !!to.meta.bottomShow;
  if(!to.meta.unkeepLastRoute){
	  debugger;
    localStorage.setItem('lastRoute',JSON.stringify({path:to.path,name:to.name,query:to.query}))
  }
    
})
export default router
