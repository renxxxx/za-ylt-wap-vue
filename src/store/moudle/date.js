import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';
import { Dialog } from 'vant'
import moment from 'moment'
import h5p from '../../../build/h5p.js'
import router from '../../router'

const state={
	//账号协议checked
	checked: true,
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
		clinicId: '',			//门诊id
		hospitalId: '',			//医院Id
		itemId : '',			//医院端门诊主页的图形统计及其列表Id
		patientId : '',			//医院端门诊主页的门诊详情页id
		data:{},
	},
	header:{},
	// 详情页数据
	detail:{
		patientId : undefined,		//病人id
		realname : undefined,		//病人姓名
		clinicId : undefined,		//门诊id
		clinicName : undefined,		//门诊名称
		hospitalConfirmTime : undefined	,//医院确诊时间
		hospitalId	: undefined,	//医院id
		hospitalName : undefined,	//医院名称
		idcardNo : undefined,		//身份证号
		invoices : [],		//发票
		patientId :undefined,		//患者id
		pushTime : undefined,		//推送时间
		remark : undefined,			//备注
		tel : undefined,			//电话号码
		sickness : undefined		//病例
	},
	//筛选的弹窗显示值
	show: false,
	//筛选数据
	Time:{
		look:'',
		noLook:'',
		confirmStart : undefined,
		confirmOver : undefined,
		pushStart : undefined,
		pushOver : undefined,
		postState : undefined,
	},
	// lable的dom节点
	labelDocument:['labelDocument','labelDocument2','labelDocument3','labelDocument4','labelDocument5','labelDocument6'],
	//label的button值
	dateStata : '',
	//显示半遮罩及其日期选择
	showTime : false,
	showData: '',
	//医院端活动发布的参数
	activity : {
		title : '',
		brief : '',
		address : '',
		tel : '',
		startTime : undefined,
		endTime : undefined,
		content : '',
		cover : 'static/img/Group@2x.png'
	},
	//医院端兑换管理详情页参数
	taskSubmitValue:{
		name: '',
		exchangePoint : '',
		exchangePointUpperPerDay : '',
		intro : "",
	},
	
	// 医院端门诊详情列表信息
	clinicDetails:{},
}
const getters={
	//账号协议checked
	checked: state => state.checked,
	// 详情页数据
	detail: state => state.detail,
	//账号登陆
	account : state => state.account,
	//筛选的弹窗显示值
	show : state => state.show,
	//筛选数据
	Time	: state => state.Time,
	// lable的dom节点
	labelDocument :state =>state.labelDocument,
	//显示半遮罩及其日期选择
	showTime : state => state.showTime,
	//医院端活动发布的参数
	activity : state => state.activity,
	//医院端兑换管理详情页参数
	taskSubmitValue : state => state.taskSubmitValue,
	// 医院端门诊详情列表信息
	clinicDetails : state => state.clinicDetails,
	isLogin : state => state.isLogin
}

const actions={
	//复选框的选择
	change({commit},_value){
		commit('changeFn',_value)
	},
	//登陆页面的表单验证
	submit({commit},landingState){
		// console.log(value)
		commit('submitFn',landingState)
		// this.$store.commit('submitFn','100')
	},
	//选择框样式
	labelLabelFn({commit},obj){
		// console.log(obj);
		// console.log(ss)
		commit('labelLabelFn',obj);
	},
	//时间日期选择获取
	dateConfirm({commit},date){
		let time = date.slice(0,10);
		// console.log(date.slice(0,10));
		commit('dateConfirmFn',time);
	},
	//关闭半遮罩
	closeFn({commit}){
		commit('closeFn')
	},
	//筛选确定
	screeningSubmit({commit}){
		commit('screeningSubmitFn')
	},
	// 筛选重置
	screeningResult({commit}){
		commit('screeningResultFn')
	},
	// 确定选择的日期
	confirm({commit},_value){
		commit('confirmFn',_value)
	},
	//取消选择的日期
	cancel({commit},_value){
		commit('cancelFn',_value)
	},
	//hospital的个人信息提交
	hospitalSubmit({commit},_message){
		commit('hospitalSubmitFn',_message)
	}
}
const mutations={
	//登陆及其刷新请求
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
								if(state.loginToBack)
									router.back()
								else
									router.replace({ name : _url});
								state.account.hospitalId= res.data.data.hospital.hospitalId;
								// console.log(state.account.hospitalId)
								state.account.data = {};
								state.account.data = res.data;
								break;

								case 200:
								if(state.loginToBack)
									router.back()
								else
									router.replace({ name : _url});
								state.account.clinicId= res.data.data.clinic.clinicId;
								state.account.hospitalId= res.data.data.hospital.hospitalId;
								// console.log(state.account.hospitalId)
								state.account.data = {};
								state.account.data = res.data;
								break;

								case 300:
								if(state.loginToBack)
									router.back()
								else
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
		// console.log(state.checked)
		state.checked = _value.target.checked;
		// console.log(_value.target.checked)
	},

	//登陆页面的表单验证
	submitFn(state,landingState){
		h5p.shareWeb("www.baidu.com",'_www/logo.png','title','content');

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
	//关闭半遮罩
	closeFn(state){
		// console.log(dialog)
		state.showTime = false;
	},
	// 确定选择的日期
	confirmFn(state,_value){
		state.time = '';
		// state.time = _value
		let time = moment(_value).format('YYYY-MM-DD HH:mm:ss')
		state.time = new Date(time).getTime();
		console.log(state.time)
		console.log(state.calendarTime)
		switch (state.dateStata){
			case 2:
			state.Time.confirmStart = '';
			state.Time.confirmStart = state.time;
			break;
			case 3:
			state.Time.confirmOver = '';
			state.Time.confirmOver = state.time;
			break;
			case 4:
			state.Time.pushStart = '';
			state.Time.pushStart = state.time;
			break;
			case 5:
			state.Time.pushOver = '';
			state.Time.pushOver = state.time;
			break;
		}
		console.log(state.Time)
		// console.log(mutations.labelLabelFn._vlaue)
	},
	//取消选择的日期
	cancelFn(state,_value){
		console.log(_value)
	},
	//选择框样式
	labelLabelFn(state,obj){
		let _vlaue = obj[0];
		let _this = obj[1];
		// console.log(typeof _vlaue);
		// console.log(typeof _this);
		let buttonStyle = document.getElementById(state.labelDocument[_vlaue]);
		switch(_vlaue){
			case 0:
			document.getElementById(state.labelDocument[0]).style.backgroundColor = "#EEEEEE";
			document.getElementById(state.labelDocument[1]).style.backgroundColor = "#EEEEEE";
			_this.target.style.backgroundColor = "#FFE1BE";
			state.dataStata = '';
			state.Time.look = "";
			state.Time.noLook = "";
			state.Time.look = '未就诊';
			state.dateStata=_vlaue;
			state.Time.postState = 1;
			// console.log(state.dateStata);

			break;
			case 1:
			document.getElementById(state.labelDocument[0]).style.backgroundColor = "#EEEEEE";
			document.getElementById(state.labelDocument[1]).style.backgroundColor = "#EEEEEE";
			_this.target.style.backgroundColor = "#FFE1BE";
			state.dataStata = '';
			state.Time.look = "";
			state.Time.noLook = "";
			state.Time.noLook = '已就诊';
			state.dateStata=_vlaue;
			state.Time.postState = 4;
			// console.log(state.dateStata);
			break;

			case 2:
			document.getElementById(state.labelDocument[2]).style.backgroundColor = "#EEEEEE";
			document.getElementById(state.labelDocument[3]).style.backgroundColor = "#EEEEEE";
			_this.target.style.backgroundColor = "#FFE1BE";
			state.dataStata = '';
			state.dateStata=_vlaue;
			// console.log(state.dateStata);
			state.Time.confirmStart = state.time;
			state.showTime = true;
			break;

			case 3:
			_this.target.style.backgroundColor = "#FFE1BE";
			state.dataStata = null;
			state.dateStata=_vlaue;
			// console.log(state.dateStata);
			state.Time.confirmOver = state.time;
			state.showTime = true;
			break;

			case 4:
			_this.target.style.backgroundColor = "#FFE1BE";
			state.dataStata = '';
			state.dateStata = _vlaue;
			// console.log(state.dateStata);
			state.Time.pushStart = state.time;
			state.showTime = true;
			break;

			case 5:
			_this.target.style.backgroundColor = "#FFE1BE";
			state.dataStata = '';
			state.dateStata=_vlaue;
			// console.log(state.dateStata);
			state.showTime = true;
			state.Time.pushOver = state.time;
			break;
		}
		return {_vlaue,_this};
	},
	// 筛选确定
	screeningSubmitFn(state){
		axios.post('/c2/patient/items',qs.stringify({
			clinicId : state.account.clinicId,
			hospitalId :  state.account.hospitalId,
			status : state.Time.postState,
			pushTimeStart : state.Time.pushStart,
			pushTimeEnd : state.Time.pushOver,
			hospitalConfirmTimeStart : state.Time.confirmStart,
			hospitalConfirmTimeEnd : state.Time.confirmOver,
		}))
		.then(_d => {
			// console.log(_d.data.data.items)
			state.search_userList = _d.data.data.items
			state.show = false;
		})
		.catch((err)=>{
			console.log(err);
			Dialog({ message: '加载失败!'});
		})
		switch(state.isLogin){
			case 100:
			state.show = false;
			break;
			case 200:
			state.show = false;
			window.location.href='/#/outpatient_search';
			break;
			case 300:
			state.show = false;
			break;
		}
	},
	// 筛选重置
	screeningResultFn(state){
		// console.log("已重置");
		// console.log(state.labelDocument);
		if(state.isLogin  == 100){
			for(let _a=0 ;_a < 4; _a++){
				console.log(_a)
				document.getElementById(state.labelDocument[_a]).style.backgroundColor = "#EEEEEE";
			}
		}else{
			for(let _a=0 ;_a < state.labelDocument.length; _a++){
				// console.log(_a)
				document.getElementById(state.labelDocument[_a]).style.backgroundColor = "#EEEEEE";
			}
		}
		Vue.set(state.Time,'confirmStart',0);
		Vue.set(state.Time,'confirmOver',0);
		Vue.set(state.Time,'pushStart',0);
		Vue.set(state.Time,'pushOver',0);
		// console.log(typeof state.labelDocument)
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
				Dialog({ message: '加载失败!'});
			})
	},
}
export default  {
	state,
	mutations,
	actions,
	getters,
}
