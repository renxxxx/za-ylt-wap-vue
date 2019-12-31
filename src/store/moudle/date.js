import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';
import { Dialog } from 'vant'
import moment from 'moment'
import router from '../../router'

const state={
	//账号协议checked
	checked: true,
	//账号
	isLogin:0,
	whichClient:0,
	account:{
		name:'',
		password:'',
		user:{
			realname:'',
			tel: undefined,
			remark:"",				//备注
			idcardNo:undefined, 	//身份证号
		},
		clinicId: '',			//门诊id
		hospitalId: '',			//医院Id
		patientId : '',			//医院端门诊主页的门诊详情页id
		data:{},
	},
	//筛选的弹窗显示值
	show: false,
	//显示半遮罩及其日期选择
	showTime : false,
	// topHeight : "10px"
}
const getters={
	//账号协议checked
	checked: state => state.checked,
	// 详情页数据
	detail: state => state.detail,
	//账号登录
	account : state => state.account,
	//筛选的弹窗显示值
	show : state => state.show,
	//显示半遮罩及其日期选择
	showTime : state => state.showTime,
	isLogin : state => state.isLogin,
	whichClient : state => state.whichClient,
	// topHeight :state =>state.topHeight,
}

const actions={
	//复选框的选择
	change({commit},_value){
		commit('changeFn',_value)
	},
	//登录页面的表单验证
	submit({commit},landingState){
		// console.log(value)
		commit('submitFn',landingState)
		// this.$store.commit('submitFn','100')
	},
	//hospital的个人信息提交
	hospitalSubmit({commit},_message){
		commit('hospitalSubmitFn',_message)
	}
}
const mutations={
	//登录及其刷新请求
	submintGetData(_postUrl,_postRefresh,_isLogin,_url,state){
		console.log(state)
		state.isLogin = _isLogin;
		localStorage.setItem("isLogin",_isLogin);
		// state.account.name ='999999';
		// state.account.password = '123456';
		// console.log(state)
		axios.post(_postUrl,qs.stringify({
				account : state.account.name,
				password : state.account.password
			}))
			.then( res =>{
				// console.log(res.data.codeMsg)
				if(res.data.codeMsg == null ||  res.data.codeMsg == "" || res.data.codeMsg == undefined){

					 axios.post(_postRefresh)
						.then( res =>{
							switch(_isLogin){
								case 100:
									router.replace({ name : _url});
								state.account.hospitalId= res.data.data.hospital.hospitalId;
								// console.log(state.account.hospitalId)
								state.account.data = {};
								state.account.data = res.data;
								break;

								case 200:
									router.replace({ name : _url});
								state.account.clinicId= res.data.data.clinic.clinicId;
								state.account.hospitalId= res.data.data.hospital.hospitalId;
								// console.log(state.account.hospitalId)
								state.account.data = {};
								state.account.data = res.data;
								break;

								case 300:
									router.replace({ name : _url});
								Dialog({ message: '正在开发中，敬请期待' });
								state.account.clinicId= res.data.data.clinic.clinicId;
								state.account.hospitalId= res.data.data.hospital.hospitalId;
								// console.log(state.account.hospitalId)
								state.account.data = {};
								state.account.data = res.data;
								break;
							}
						})
						.catch((err)=>{
							console.log(err)
							Dialog({ message: '加载失败!' });
						})
				}else{
					Dialog({ message:  res.data.codeMsg});
				}
				// console.log(res.data.codeMsg)
			})
			.catch((err)=>{
				console.log(err)
				Dialog({ message: '加载失败!' });
			})
	},
	//复选框的选择
	changeFn(state,_value){
		state.checked = _value.target.checked;
	},

	//登录页面的表单验证
	submitFn(state,landingState){
		// console.log(this.account.name+this.account.password)
		state.isLogin = landingState;
		// console.log(landingState)
		if(state.checked == true){
			switch (landingState){
				case '100':
				mutations.submintGetData('/hospital/login','/hospital/login-refresh',100,'hospital_index',state)
				break;
				case '200':
				// console.log('200')
				mutations.submintGetData('/clinic/login','/clinic/login-refresh',200,'hospital_sourceManagement',state)
				break;
				case '300':
				mutations.submintGetData('/manager/login','/manager/login-refresh',300,'outpatient_index',state)
				break;
				default:
				break;
			}
		}else{
			Dialog({ message: '请勾选同意条款' });
		}

	},
	//hospital的个人信息提交
	hospitalSubmitFn(state,_message){
		// console.log(_message)
		console.log(state.account)
		axios.post('/c2/patient/itemadd',qs.stringify({
				clinicId : state.account.data.data.clinic.clinicId,
				hospitalId : state.account.data.data.hospital.hospitalId,
				password : state.account.user.password,
				realname : state.account.user.realname,
				tel	:  state.account.user.tel,
				remark : state.account.user.remark,
				idcardNo : state.account.user.idcardNo
			}))
			.then( res =>{
				console.log(res);
				console.log(state.account)
				// console.log(res)
				if(res.data.codeMsg){
					Dialog({ message: res.data.codeMsg  });
				}else if(res.data.code == 0){
					//成功
					Dialog({ message: '提交成功' });
				}else{
					//失败
				}
			})
			.catch((err)=>{
				console.log(err)
				//Dialog({ message: '加载失败!'});
			})
	},
}
export default  {
	state,
	mutations,
	actions,
	getters,
}
