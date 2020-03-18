import Vue from 'vue'
import Store from '../store'
import Router from 'vue-router'
import chooseTheType from '@/components/chooseTheType.vue'
import sharePage from '@/components/sharePage.vue'

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

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'chooseTheType',
      component: chooseTheType,
      meta: {unkeepLastRoute:true},
    },
    {
      path: '/chooseTheType',
      name: 'chooseTheType',
      component: chooseTheType,
      meta: {unkeepLastRoute:true},
    },
    {
      path: '/sharePage',
      name: 'sharePage',
      component: sharePage,
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
          meta: {auth:true,unkeepLastRoute:true},
        },
        {
          path: 'hospital_index',
          name: 'hospital_index',
          component: hospital_index,
          meta: {auth:true,tabbar:true,unkeepLastRoute:true},
        },
        {
          path: 'hospital_urlPage',
          name: 'hospital_urlPage',
          component: hospital_urlPage,
          meta: {auth:true},
        },
        {
          path: 'hospital_retrievePassword',
          name: 'hospital_retrievePassword',
          component: hospital_retrievePassword,
          meta: {auth:true},
        },
        {
          path: 'hospital_clinic',
          name: 'hospital_clinic',
          component: hospital_clinic,
          meta: {auth:true,tabbar:true,lastRouter:true},
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
          meta: {auth:true,lastRouter:true},
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
              meta: {auth:true},
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
              meta: {auth:true},
            },
            {
              path: 'promoters_user',
              name: 'promoters_user',
              component: promoters_user,
              meta: {auth:true},
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
      redirect:'/outpatientLogin',
      children:[
        {
          path: '/outpatientLogin',
          name: 'outpatientLogin',
          component: outpatientLogin,
          meta: {auth:true},
        },
        {
          path: 'outpatient_index',
          name: 'outpatient_index',
          component: outpatient_index,
          meta: {auth:true},
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
          meta: {auth:true},
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
          meta: {auth:true},
        },
        {
          path: 'outpatient_user',
          name: 'outpatient_user',
          component: outpatient_user,
          meta: {auth:true},
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
  ]
})
router.afterEach((to,from) => {
  debugger
  Store.state.bottomShow = !!to.meta.tabbar;
  if(!to.meta.unkeepLastRoute)
    localStorage.setItem('lastRouter',JSON.stringify({path:to.path,name:to.name,query:to.query}))
  
    


  //判断是否显示端口底部菜单按钮
  //console.log('hahahhah')
  //if(Store.state.isLogin || to.name == 'sharePage'){
    // if(to.name == 'hospital_index'|| to.name == 'hospital_clinic' || to.name == 'hospital_gene' || to.name == 'hospital_user'
    //   || to.name == 'outpatient_index' || to.name == 'outpatient_hospital' || to.name == 'outpatient_gene' || to.name == 'outpatient_user'){
    //   Store.state.bottomShow = true;
    // }else{
    //   Store.state.bottomShow = false;
    // }
    // //判断是否显示医院端返回首页和顶部按钮
    // // console.log(to.name)
    // if(to.name == 'hospital_addCLinic' || to.name == 'hospital_clinicInfo' || to.name == 'hospitalLogin'
    // || to.name == 'hospital_pictureEnlargement' || to.name == 'hospital_operatingManualListDetails' ||
    // to.name == 'hospital_index' || to.name == 'promoters_index' || to.name == 'promoters_clinicInfo' ||
    // to.name == 'promoters_addClinic'){
    //   Store.state.hospitalReturnHomePage = false;
    // }else{
    //   Store.state.hospitalReturnHomePage = true;
    // }
    // //判断推广人端是否显示端口底部菜单按钮
    // if(to.name == 'promoters_index' || to.name == 'promoters_cilnic' || to.name == 'promoters_user'){
    //   Store.state.childBottomShow = true;
    // }else{
    //   Store.state.childBottomShow = false;
    // }
    // //判断门诊端返回首页按钮
    // if(to.name == 'outpatient_index' || to.name == 'outpatientLogin'){
    //   Store.state.outpatientReturnHomePage = false;
    // }else{
    //   Store.state.outpatientReturnHomePage = true;
    // }
 // }else{
    // console.log(to.path.indexOf("hospital") != -1)
    // if(to.path.indexOf("hospital") != -1 || to.path.indexOf("promoters") != -1){
    //   router.replace({name:'hospitalLogin'});
    //   Store.state.hospitalReturnHomePage = false;
    // }else if( to.path.indexOf("outpatient") != -1 ){
    //   router.replace({name:'outpatientLogin'});
    //   Store.state.outpatientReturnHomePage = false;
    // }
 // }
  
// 		{
// 			//推广人端首页主页面
// 			path: '/promoters_index',
// 			name: 'promoters_index',
// 			component: promoters_index,
// 			meta: {auth:true},
// 		},
// 		{
// 			//推广人端门诊主页面
// 			path: '/promoters_cilnic',
// 			name: 'promoters_cilnic',
// 			component: promoters_cilnic,
// 			meta: {auth:true},
// 		},
// 		{
// 			//推广人端用户主页面
// 			path: '/promoters_user',
// 			name: 'promoters_user',
// 			component: promoters_user,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人用户搜索主页
// 			path: '/promoters_clinicSearch',
// 			name: 'promoters_clinicSearch',
// 			component: promoters_clinicSearch,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人新增门诊页
// 			path: '/promoters_addClinic',
// 			name: 'promoters_addClinic',
// 			component: promoters_addClinic,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人病源管理页
// 			path: '/promoters_source',
// 			name: 'promoters_source',
// 			component: promoters_source,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人门诊详情页
// 			path: '/promoters_clinicInfo',
// 			name: 'promoters_clinicInfo',
// 			component: promoters_clinicInfo,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人门诊病原新增页
// 			path: '/promoters_addSource',
// 			name: 'promoters_addSource',
// 			component: promoters_addSource,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人门诊案例列表页
// 			path: '/promoters_case',
// 			name: 'promoters_case',
// 			component: promoters_case,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人门诊案例页
// 			path: '/promoters_caseDetails',
// 			name: 'promoters_caseDetails',
// 			component: promoters_caseDetails,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人门诊推广活动页面
// 			path: '/promoters_activityReleased',
// 			name: 'promoters_activityReleased',
// 			component: promoters_activityReleased,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人门诊推广活动页面
// 			path: '/promoters_activityDetails',
// 			name: 'promoters_activityDetails',
// 			component: promoters_activityDetails,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人门诊推广人详情页面
// 			path: '/promoters_promotersDetails',
// 			name: 'promoters_promotersDetails',
// 			component: promoters_promotersDetails,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人病原管理页面
// 			path: '/promoters_sourceManagement',
// 			name: 'promoters_sourceManagement',
// 			component: promoters_sourceManagement,
// 			meta: {auth:true},
// 		},
// 		{
// 			// 推广人病原管理搜索页面
// 			path: '/promoters_sourceSearch',
// 			name: 'promoters_sourceSearch',
// 			component: promoters_sourceSearch,
// 			meta: {auth:true},
// 		},
// 		{
// 			//详情页
// 			path: '/details',
// 			name: 'details',
// 			component: details,
// 			meta: {auth:true},
// 		},
// 		{
// 			//用户协议
// 			path: '/urlPage',
// 			name: 'urlPage',
// 			component: urlPage,
// 			meta: {auth:true},
// 		},
// 		// {
// 		// 	// 登陆主页
// 		// 	path: '/',
// 		// 	name: 'landingPage',
// 		// 	component: landingPage,
// 		// 	alias:'/landingPage'
// 		// },
//     {
//     	// 登陆主页
//     	path: '/',
//     	name: 'account',
//     	component: account,
//     	alias:'/account'
//     },
//     {
//     	//选择入口页面
//     	path: '/chooseTheType',
//     	name: 'chooseTheType',
//     	meta: {auth:true},
//     	component: chooseTheType,
//     },
// 		{
// 			//找回密码页面
// 			path: '/retrievePassword',
// 			name: 'retrievePassword',
// 			meta: {auth:true},
// 			component: retrievePassword,
// 		},
// 	],
//   // scrollBehavior (to, from, savedPosition) {
//   //   console.log(savedPosition)
//   //     // return 期望滚动到哪个的位置
//   //     // return { x: 300, y: 300 }
//   //   }
// })
// router.beforeEach((to,from,next) => {
// 	debugger
// 	//TODO 保存当前路由
// 	if(to.name != 'account')
// 	 	localStorage.setItem('lastRoute',JSON.stringify({name:to.name,query:to.query,params:to.params}))
// 	next()
// })
// router.afterEach((to, from) => {
// 	debugger
// 		if(to.name!='hospital_index' && to.name!='hospital_sourceManagement' && to.name!='outpatient_index' && to.name != 'promoters_index' &&
// 		to.name!='landingPage' && to.name != 'retrievePassword' && to.name != 'account' && to.name != 'chooseTheType'){
// 			Store.state.returnHomePageData = true;
// 		}else{
// 		Store.state.returnHomePageData = false;
// 		if(Store.state.isLogin == 100  && to.name == 'hospital_sourceManagement'){
// 			Store.state.returnHomePageData = true;
// 		}
// 	}
})
export default router
