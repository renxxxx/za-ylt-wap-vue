<template>
  <div class="landing">
		<div class="nav">
        <span>— 医院端 —</span>
				<img src="../../assets/image/beijing.png" alt="">
		</div>
    <div class="typeNav" type="line" border="false">
      <div class="content">
      	<div class="inputBox">
      		<img class="telephoneImg" src="../../assets/image/iphone@2x.png" alt="">
      		<input type="text"  v-model="submitAccount.name" name='name' placeholder="请输入手机号">
          <img src="../../assets/image/X Copy@2x.png" alt="" class="closeImg" @click="emptyAccountFn('name')" v-if="submitAccount.name" >
      	</div>
      	<div class="inputBox">
      		<img  class="passwordImg" src="../../assets/image/mima@2x.png" alt="">
      		<input type="password" class="lastInput" v-model="submitAccount.password" name='password' placeholder="请输入密码" autocomplete id='pwd1' @keyup.enter="submit">
          <img :src='pwdImg' alt="" class="openImg" @click="numFN('pwd1')" v-if="submitAccount.password" >
          <img src="../../assets/image/X Copy@2x.png" alt="" class="closeImg" @click="emptyAccountFn('password')" v-if="submitAccount.password">
      	</div>
      	<div class="checkBox">
      		<input type="checkbox"
      		    class="input_check"
      		    :checked="checked"
      		    @change="changeFn"/>
      		<p>&nbsp;&nbsp;我已经阅读并同意
      		<!-- <a href="/oss/page/user-protocol.html">&nbsp;&nbsp;&lt;&lt;用户协议与隐私政策&gt;&gt;</a> -->
      			<router-link :to="{path : '/hospital/hospital_urlPage' ,query:{url : '/oss/page/user-protocol.html',name : '用户协议'}}">
      			《应用服务条款》
      			</router-link>
      		</p>
      	</div>
      	<button class="submitClass" type="submit" value="医院登录" @click="submit()">登录</button>
      	<div class="passwordReset">
      		<router-link  :to="{path : '/hospital/hospital_retrievePassword',query:{time:new Date().getTime()}}">
      			<div class="forget">
      				<span>忘记密码</span>
      				<img src="../../assets/image/wenhao@2x.png" alt="">
      			</div>
      		</router-link>
			
          	<div @click="chooseEntrance" class="returnTypePage">
          		<span style="color: #2B77EF;">选择入口</span>
          	</div>
      	</div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import router from '../../router'
import qs from 'qs';
export default {
  name: 'account',
  data () {
    return {
    checked: true,
		submitAccount:{
			name: '',
			password: '',
      nameStata: false,
      passwordStata: false,
		},
		data:1,
    pwdImg : require('../../assets/image/close-eye@2x.png'),
    isLoginData:[],
    }
  },
  directives: {
    focus: {
		inserted: function (el, {value}) {
            if (value) {
                el.focus();
            }
        }
    }
  },
  beforeRouteLeave(to, from, next) {
    debugger;
	let scrollTop = this.scrollTop =document.getElementById('hospital').scrollTop;
this.scrollTop = scrollTop?scrollTop :0;
console.log(this.scrollTop)
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
  // 进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.getElementById('hospital').scrollTop=document.getElementById('hospital').pageYOffset=vm.scrollTop;
    });

  },
  mounted() {
    debugger
    let thisVue = this;
		if(window.plus){
      plus.navigator.setStatusBarStyle("light")
    }
    
     if(this.$store.state.hospitalEntrance.loginRefresh())
      this.$toast({message:'已登录',onClose:function(){
        thisVue.$router.replace({ path : '/hospital/hospital_index',query:{time:new Date().getTime()}});
      }})

    
		// let lastRoute = JSON.parse(localStorage.getItem('lastRoute'))
		//  if(this.$store.state.isLogin == 100){
		// 	this.$router.replace({ name : 'hospital_index',query:{time:new Date().getTime()}})
		// 	this.$router.push(lastRoute)
		// }else  if(this.$store.state.isLogin == 200){
		// 	this.$router.replace({ name : 'outpatient_index',query:{time:new Date().getTime()}})
		// 	this.$router.push(lastRoute)
		// }else  if(this.$store.state.isLogin == 300){
		// 	this.$router.replace({ name : 'chooseTheType',query:{time:new Date().getTime()}})
		// 	this.$router.push(lastRoute)
		// }
  },
  activated(){
    debugger
  },
  computed:{
    account:{
    	get: function() {
    		console.log(this.$store)
    	    return this.$store.state.account
    	},
    	set: function (newValue) {
    		this.$store.state.account = newValue;
    	},
    },
    isLogin: {
      get: function() {
        return this.$store.state.isLogin
      },
      set: function (newValue) {
        this.$store.state.isLogin = newValue;
      },
    },
  },
  methods:{

	clear(){
		localStorage.clear('entrance')
	},
    chooseEntrance(){
      localStorage.removeItem('entrance');
	  debugger
      this.$router.push({path:'/',query:{time:new Date().getTime()}})
    },
    emptyAccountFn(value){
      if(value == 'name'){
        this.submitAccount.name = '';

      }else{

      this.submitAccount.password = '';
      }
    },
    numFN(_ref){
      // console.log(_ref)
      // console.log(document.getElementById(_ref).type)
      if(document.getElementById(_ref).type == 'password'){
        document.getElementById(_ref).setAttribute('type','text')
        this.pwdImg = require('../../assets/image/open-eye@2x.png')
      }else{
        document.getElementById(_ref).setAttribute('type','password')
        this.pwdImg = require('../../assets/image/close-eye@2x.png')
      }
      if(document.getElementById(_ref).type == 'text'){
      }
    },
    submit(){
      let thisVue = this
    	 if(this.checked == true){
        this.$axios.post('/hospital/login',qs.stringify({
        		account : this.submitAccount.name,
        		password : this.submitAccount.password
        	}))
        	.then( res =>{
            // console.log(res.data.code)
            if(res.data.code == 0){
        debugger;
        this.$toast({"message":'登录成功',onClose(){
          if(thisVue.$store.state.hospitalEntrance.loginRefresh().type == 1){
                    thisVue.$router.replace({ name : 'promoters',query:{time:new Date().getTime()}});
                  }else{
                    thisVue.$router.replace({ name : 'hospital_index',query:{time:new Date().getTime()}});
                  }
        }})
				
              // this.$axios.post('/hospital/login-refresh')
              // 	.then( res =>{
              //     if(res.data.code == 0){
              //       this.isLogin = 100;
              //       localStorage.setItem("isLogin",this.isLogin);
              //       if(res.data.data.type == 1){
              //       	this.$router.replace({ name : 'promoters',query:{time:new Date().getTime()}});
              //       }else{
              //       	this.$router.replace({ name : 'hospital_index',query:{time:new Date().getTime()}});
              //       }
              //       this.account.hospitalId= res.data.data.hospital.hospitalId;
              //       // console.log(this.account.hospitalId)
              //       this.account.data = {};
              //       this.account.data = res.data;
              //     }
              // 	})
              // 	.catch((err)=>{
              // 		console.log(err)
              // 		this.$toast(err);
              // 	})
            }else{
              this.$toast(res.data.codeMsg);
            }
        	})
        	.catch((err)=>{
        		console.log(err)
        		this.$toast(err);
        	})
        }
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
	/* background: #2B77EF; */
  margin-bottom: .47rem;
  position: relative;
  /* background: url("../../assets/image/beijing.png")100% 100% center no-repeat; */
}
.nav span{
  /* display: block; */
  width: 1.1rem;
  height: .3rem;
  line-height: .3rem;
  color: #FFFFFF;
  position: absolute;
  right: 0;
  bottom: .4rem;
  left: 0;
  z-index: 999;
  margin:0rem  auto;
  text-align: center;
  font-weight: bolder;
  font-size: .18rem;
}
.nav img{
	height: 100%;
  width: 100%;
  /* z-index: 999; */
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
	/* background-color: #2B77EF; */
  background-image: linear-gradient(to left, #F75178, #ED2828);
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
	width: 68%;
	height: .45rem;
	border-radius: .25rem;
	border: 1px solid #E5E5E5;
	padding-left: 15%;
	/* background: #F5F5F5; */
  font-size: .17rem;
  padding-right: 15%;
}
.lastInput{
  width: 63%!important;
  padding-right: 20%!important;
  text-align: left;
}
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
  background: url('../../assets/image/Rectangle29.png');
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
  background-image: url('../../assets/image/select.png');
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
	width: .95rem;
  height: .25rem;
  line-height: .25rem;
	text-align: center;
	float: left;
  position: relative;
  text-align: left;
  /* display: inline; */
}
.forget span{
  /* width: .8rem; */
  font-size: .185rem;
}
.forget img{
  position: absolute;
  right: 0rem;
  top: 0rem;
  bottom: 0rem;
  margin: auto 0rem;
  display: inline;
}
.returnTypePage{
  float: right;
  display: inline
}
.returnTypePage{
  font-size: .185rem;
}
</style>
