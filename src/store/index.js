import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
  hospital:{login:null},
  outpatient:{login:null},
  operating:{login:null},
  //账号
  isLogin:0,
  account:{
  	name:'',
  	password:'',
  	user:{
  		realname:'',
  		tel: undefined,
  		remark:"",				//备注
  		idcardNo:undefined, 	//身份证号
  	},
  },
  //筛选的弹窗显示值
  show: false,
  //显示半遮罩及其日期选择
  showTime : false,
  // topHeight : "10px"
  // 返回首页按钮显示值
  returnHomePageData : true,
  //底部按钮显示
  bottomShow : false,
  //子路有下的底部按钮显示
  childBottomShow : false,
  //医院端返回首页按钮显示
  hospitalReturnHomePage : true,
  //医院端返回顶部按钮显示
  hospitalReturnTopPage : false,
  //门诊端返回首页按钮显示
  outpatientReturnHomePage : true,
  //门诊端返回顶部按钮显示
  outpatientReturnTopPage : false,
  //运营端返回首页按钮显示
  operatingReturnHomePage : true,
  //运营端返回顶部按钮显示
  operatingReturnTopPage:false,
  
}
const getters={
  //账号登录
  account : state => state.account,
  //筛选的弹窗显示值
  show : state => state.show,
  //显示半遮罩及其日期选择
  showTime : state => state.showTime,
  isLogin : state => state.isLogin,
  // topHeight :state =>state.topHeight,
  // 返回首页按钮显示值
  returnHomePageData : state => state.returnHomePageData,
  //医院端底部按钮显示
  bottomShow : state => state.bottomShow,
  //子路有下的底部按钮显示
  childBottomShow : state => state.childBottomShow,
  //医院端返回首页按钮显示
  hospitalReturnHomePage : state => state.hospitalReturnHomePage,
  //医院端返回顶部按钮显示
  hospitalReturnTopPage : state => state.hospitalReturnTopPage,
  //门诊端返回首页按钮显示
  outpatientReturnHomePage : state => state.outpatientReturnHomePage,
  //门诊端返回顶部按钮显示
  outpatientReturnTopPage : state => state.outpatientReturnTopPage,
  //运营端返回首页按钮显示
  operatingReturnHomePage  : state => state.operatingReturnHomePage,
  //运营端返回顶部按钮显示
  operatingReturnTopPage : state => state.operatingReturnTopPage,
}
const actions={}
const mutations={}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
