<template>
  <div class="landing">
		<div class="nav">
				<img src="../assets/image/name-bj@2x.png" alt="">
		</div>
    <div class="typeNav" type="line" border="false">
      <div class="content">
      	<div class="inputBox">
      		<img class="telephoneImg" src="../assets/image/iphone@2x.png" alt="">
      		<input type="text"  v-model="account.name" name='name' placeholder="请输入手机号" >
          <img src="../assets/image/X Copy@2x.png" alt="" class="closeImg" @click="emptyAccountFn('name')" v-if="account.name">
      	</div>
      	<div class="inputBox">
      		<img  class="passwordImg" src="../assets/image/mima@2x.png" alt="">
      		<input type="password"  v-model="account.password" name='password' placeholder="请输入密码" autocomplete id='pwd1'>
          <img :src='pwdImg' alt="" class="openImg" @click="numFN('pwd1')" v-if="account.password">
          <img src="../assets/image/X Copy@2x.png" alt="" class="closeImg" @click="emptyAccountFn('password')" v-if="account.password">
      	</div>
      	<div class="checkBox">
      		<input type="checkbox"
      		    class="input_check"
      		    :checked="checked"
      		    @change="changeFn"/>
      		<p>&nbsp;&nbsp;我已经阅读并同意
      		<!-- <a href="/oss/page/user-protocol.html">&nbsp;&nbsp;&lt;&lt;用户协议与隐私政策&gt;&gt;</a> -->
      			<router-link :to="{name : 'urlPage' ,query:{url : '/oss/page/user-protocol.html',name : '用户协议'}}">
      				&nbsp;&nbsp;&lt;&lt;用户协议与隐私政策&gt;&gt;
      			</router-link>
      		</p>
      	</div>
      	<button class="submitClass" type="submit" value="医院登录" @click="submit()">医院登陆</button>
      	<div class="passwordReset">
      		<router-link  :to="{name : 'retrievePassword',query:{time:new Date().getTime()}}">
      			<div class="forget">
      				<span>忘记密码</span>
      				<!-- <img src="../assets/image/reset@2.png" alt=""> -->
      			</div>
      		</router-link>
      	</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex'
import router from '../router'
import qs from 'qs';
export default {
  name: 'account',
  data () {
    return {
    checked: true,
		account:{
			name: '',
			password: ''
		},
		data:1,
    pwdImg : require('../assets/image/close-eye@2x.png'),
    isLoginData:[],
    }
  },
  directives: {
    focus: {
		inserted: function (el, {value}) {
            if (value) {
				// console.log('ss')
                el.focus();
            }
        }
    }
  },
  beforeRouteLeave(to, from, next) {
    //debugger;
	this.scrollTop =document.getElementById('app').scrollTop ||document.getElementById('app').pageYOffset
	if(!to.query.time || !from.query.time || to.query.time < from.query.time){
		 debugger
            if (this.$vnode && this.$vnode.data.keepAlive)
            {
                if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
                {
                    if (this.$vnode.componentOptions)
                    {
                        var key = this.$vnode.key == null
                                    ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                                    : this.$vnode.key;
                        var cache = this.$vnode.parent.componentInstance.cache;
                        var keys  = this.$vnode.parent.componentInstance.keys;
                        if (cache[key])
                        {
                            if (keys.length) {
                                var index = keys.indexOf(key);
                                if (index > -1) {
                                    keys.splice(index, 1);
                                }
                            }
                            delete cache[key];
                        }
                    }
                }
			}
            this.$destroy();
		}
	next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
    next(vm => {
	 document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
	});

  },
  mounted() {

	  debugger
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#2B77EF");
			plus.navigator.setStatusBarStyle("light")
		  }

			let lastRoute = JSON.parse(localStorage.getItem('lastRoute'))
		  if(this.$store.state.isLogin == 100){
				this.$router.replace({ name : 'hospital_index',query:{time:new Date().getTime()}})
				this.$router.push(lastRoute)
			}else  if(this.$store.state.isLogin == 200){
				this.$router.replace({ name : 'hospital_sourceManagement',query:{time:new Date().getTime()}})
				this.$router.push(lastRoute)
			}else  if(this.$store.state.isLogin == 300){
				this.$router.replace({ name : 'account',query:{time:new Date().getTime()}})
				this.$router.push(lastRoute)
			}
  },
  computed:{
	// ...mapGetters(['checked']),
	// account:{
	// 	get: function() {
	// 		console.log(this.$store)
	// 	    return this.$store.state.account
	// 	},
	// 	set: function (newValue) {
	// 		this.$store.state.account = newValue;
	// 	},
	// },
	// isLogin: {
	//     get: function() {
	// 		// console.log(this.$store)
	//         return this.$store.state.isLogin
	//     },
	//     set: function (newValue) {
	// 		this.$store.state.isLogin = newValue;
	//     },
	// },
  },
  methods:{
    emptyAccountFn(value){
      if(value == 'name'){
        this.account.name = '';

      }else{

      this.account.password = '';
      }
    },
    numFN(_ref){
      console.log(_ref)
      console.log(document.getElementById(_ref).type)
      if(document.getElementById(_ref).type == 'password'){
        document.getElementById(_ref).setAttribute('type','text')
        this.pwdImg = require('../assets/image/open-eye@2x.png')
      }else{
        document.getElementById(_ref).setAttribute('type','password')
        this.pwdImg = require('../assets/image/close-eye@2x.png')
      }
      if(document.getElementById(_ref).type == 'text'){
      }
      // this.$refs._ref.type = 'text'
      // docuemnt.getelementbyid("refs1").attribute("type","text");
    },
    async submit(){
    	// console.log(_value[1])
    	// let account = _value;
    	// console.log(account)
    	 if(this.checked == true){
        console.log(this.checked)
        this.isLoginData = []
        debugger;
        await this.submintGetData('/hospital/login','hospital')
        debugger;
        await this.submintGetData('/clinic/login','clinic')
        debugger;
        await this.submintGetData('/manager/login','manager')
        debugger;
       await this.nextPageFn()

    		// console.log(_value[0])
    		// switch (_value[0]){
    		// 	case '100':
    		// 	this.submintGetData('/hospital/login',account)
    		// 	break;
    		// 	case '200':
    		// 	// console.log('200')
    		// 	this.submintGetData('/clinic/login',account)
    		// 	break;
    		// 	case '300':
    		// 	this.submintGetData('/manager/login',account)
    		// 	break;
    		// 	default:
    		// 	break;
    		// }
    	}else{
        this.$toast.fail('请勾选用户协议');
    	}

    },
    nextPageFn(){
      let ss = this.isLoginData.filter((n)=>n.code == false);
      console.log(ss)
      if(this.isLoginData[0].code|| this.isLoginData[1].code || this.isLoginData[2].code){
          this.$router.replace({ name : 'chooseTheType',query:{time:new Date().getTime(),phone:this.account.name}});
        }else{
           let fail = this.isLoginData.filter((n)=>n.code == false);
          // console.log(fail[0].codeMsg)
          this.$toast.fail(fail[0].codeMsg);
        }
    },
    async submintGetData(_postUrl,_name){
    	// console.log(state)
      debugger
    	await this.$axios.post(_postUrl,qs.stringify({
    			account : this.account.name,
    			password : this.account.password
    		}))
    		.then( res =>{
          if(res.data.code == 0){
            this.isLoginData.push({
              _ame:_name,
              code : true,
              codeMsg:res.data.codeMsg
            })
          }else{
            this.isLoginData.push({
              _ame:_name,
              code : false,
              codeMsg:res.data.codeMsg
            })
          }
          // console.dir(this.isLoginData)
    			// console.log(res.data.codeMsg)
    			// if(res.data.code == 0){
            // debugger;
              // this.isLoginData = true
              // router.replace({ name : 'chooseTheType',query:{time:new Date().getTime()}});
    				 // axios.post(_postRefresh)
    					// .then( res =>{
    					// 	state.isLogin = _isLogin;
    					// 	local   Storage.setItem("isLogin",_isLogin);
    					// 	switch(_isLogin){
    					// 		case 100:
    					// 		if(res.data.data.type == 1){
    					// 			router.replace({ name : 'promoters_index',query:{time:new Date().getTime()}});
    					// 		}else{
    					// 			router.replace({ name : _url,query:{time:new Date().getTime()}});
    					// 		}
    					// 		state.account.hospitalId= res.data.data.hospital.hospitalId;
    					// 		// console.log(state.account.hospitalId)
    					// 		state.account.data = {};
    					// 		state.account.data = res.data;
    					// 		break;

    					// 		case 200:
    					// 			router.replace({ name : _url,query:{time:new Date().getTime()}});
    					// 		state.account.clinicId= res.data.data.clinic.clinicId;
    					// 		state.account.hospitalId= res.data.data.hospital.hospitalId;
    					// 		// console.log(state.account.hospitalId)
    					// 		state.account.data = {};
    					// 		state.account.data = res.data;
    					// 		break;

    					// 		case 300:
    					// 			// router.replace({ name : _url,query:{time:new Date().getTime()}});
    					// 			Toast.fail('正在开发中')
    					// 		// Dialog({ message: '正在开发中，敬请期待' });
    					// 		// state.account.clinicId= res.data.data.clinic.clinicId;
    					// 		// state.account.hospitalId= res.data.data.hospital.hospitalId;
    					// 		// console.log(state.account.hospitalId)
    					// 		// state.account.data = {};
    					// 		// state.account.data = res.data;
    					// 		break;
    					// 	}
    					// })
    					// .catch((err)=>{
    					// 	console.log(err)
    					// 	Dialog({ message: err });
    					// })
    			// }else{
    				// this.$toast.fail(res.data.codeMsg);
    			// }
    			// console.log(res.data.codeMsg)
    		})
    		.catch((err)=>{
    			console.log(err)
    			this.$toast.fail(err);
    		})
    },
    changeFn(_value){
      // console.log(_value.target.checked)
    	this.checked = _value.target.checked;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.account{
	width: 100%;
	height: 100%;
}
.nav{
	width: 100%;
	height: 2.07rem;
	background: #2B77EF;position: relative;
  position: relative;
  margin-bottom: .47rem;
}
.nav img{
	height: 100%;
  width: 100%;
  z-index: 999;
  position: absolute;
  top:0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.typeNav{
	padding: 0 7.5%;
	/* position: absolute; */
	top: 1.63rem;
	width: 85%;
  /* margin-to:   ;p: -.5rem; */
}
.content{
	width: 100%;
	margin-top: .47rem;
}
.submitClass{
	background-color: #2B77EF;
	width: 100%;height: .45rem;
	border-radius: .23rem;
	margin-top: .8rem;
	color: #FFFFFF;
	border: none;
	font-size: .19rem;
}
.inputBox{
	position: relative;
	width: 100%;
	margin: .2rem auto;
}

.passwordImg{
	position: absolute;
	height: .16rem;
	width: .18rem;
	left: 7%;
  top: 0;
  bottom: 0;
  margin: auto 0rem;
}
.telephoneImg{
	width: .13rem;
	height: .2rem;
	/* top:.35rem; */
	position: absolute;
	left: 7%;
  top: 0;
  bottom: 0;
  margin: auto 0rem;
}
.closeImg{
  width: .11rem;
  height: .11rem;
  position: absolute;
  right: 7%;
  top:0;
  bottom: 0;
  margin: auto 0;
}
.openImg{
  width: .15rem;
  height: .11rem;
  position: absolute;
  right: 14%;
  top:0;
  bottom: 0;
  margin: auto 0;
}
.inputBox input{

	width: 85%;
	height: .45rem;
	border-radius: .25rem;
	border: 1px solid #E5E5E5;
	padding-left: 15%;
	background: #F5F5F5;

  font-size: .17rem;
}
/* .inputBox:last-child{ */
	/* margin-top: .2rem; */
/* } */
>>>.van-hairline--top-bottom{
	display: block;
   width: 100%!important;
   padding-bottom:.07rem;
}
.checkBox input[type=checkbox] {
  width: .17rem;
  height: .17rem;
  -webkit-appearance: none;
  background-color: transparent;
  border: 0;
  outline: 0 !important;
  color: #d8d8d8;
  position: relative;
  margin: 0!important;
}
.checkBox input[type=checkbox]:before{
  content: "";
  display:inline-block;
  width: .17rem;
  height: .17rem;
  background: url('../assets/image/Not-checkbox@2x.png');
  box-sizing:border-box;
  border-radius: 3px;
  position: absolute;
  background-size: cover;
}

.checkBox input[type=checkbox]:disabled:before{
  content: "";
  display:inline-block;
  width: .17rem;
  height: .17rem;
  background-color: #333;
  box-sizing:border-box;
  border-radius: 3px;
  position: absolute;
}
.checkBox input[type=checkbox]:checked:before{
  content: "";
  display:inline-block;
  width: .17rem;
  height: .17rem;
  border: 1px dotted #D2A47E;
  background-image: url('../assets/image/checkbox@2x.png');
  background-size: .17rem .17rem;
  box-sizing:border-box;
  border-radius: 3px;
  position: absolute;
}
.checkBox input[type=checkbox]:checked:after{
  content: "";
  display:inline-block;
  width: .17rem;
  height:.17rem;
  border-left: 0rem dotted #fff;
  border-top: 0rem dotted #fff;
  box-sizing:border-box;
  position: absolute;
  transform: rotate(-135deg) translate(-70%, 25%);
}
.checkBox{
	margin-top: .2rem;
	margin-right: .09rem;
	height: .3rem;
	line-height: .3rem;
	position: relative;
}
.checkBox input{
	position: absolute;
	top: .04rem;
}
.checkBox p{
	margin-top: -.05rem;
	display: inline;
	height: .17rem;line-height: .17rem;
}
.checkBox p a{
	color: #5ab5fc;
}
.passwordReset{
	 margin-top: .09rem;
	/* height: .17rem; */
}
.passwordRese{
	height: .21rem;
}
.passwordReset a{
	margin-right: .05rem;
	color: #2B77EF;
}
.passwordReset img{
	width: .15rem;
	height: .15rem;
}
.forget{
	text-align: right;
	/* width: 18%; */
	text-align: center;
	float: right;
}
.forget span{
  font-size: .185rem;
}
</style>
