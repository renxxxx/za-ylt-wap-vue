<template>
  <div class="landing">
		<div class="nav">
			<div class="topNav">
				<img src="static/img/name@2x.png" alt="">
			</div>
			<div class="typeNav" type="line" border="false">
				<van-tabs  background='none' line-width=.6rem title-inactive-color='rgba(255, 255, 255, .6)'
				title-active-color='rgba(255, 255, 255)' v-model='data'>
				<van-tab title="医院端" :title-style="{'font-size':(data==0?'.24rem':'.14rem')}" >
					<form @submit.prevent="submit('100')" class="content">
						<div class="inputBox">
							<img class="telephoneImg" src="static/img/iphone@2x.png" alt="">
							<input type="text"  v-model="account.name" name='name' placeholder="请输入手机号" >
						</div>
						<div class="inputBox">
							<img  class="passwordImg" src="static/img/mima@2x.png" alt="">
							<input type="password"  v-model="account.password" name='password' placeholder="请输入密码" autocomplete>
						</div>
						<div class="checkBox">
							<input type="checkbox"
							    class="input_check"
							    :checked="checked"
							    @change="change"/>
							<p>&nbsp;&nbsp;我已经阅读并同意<a href="/oss/page/user-protocol.html">&nbsp;&nbsp;&lt;&lt;用户协议与隐私政策&gt;&gt;</a></p>
						</div>
						<input class="submitClass" type="submit" value="登陆"></input>
						<div class="passwordReset">
							<router-link  :to="{name : 'retrievePassword'}">
								<div  @click="forgetFn(100)" class="forget">
									忘记密码
									<!-- <img src="static/img/reset@2.png" alt=""> -->
								</div>
							</router-link>
						</div>
					</form>

				</van-tab>
				<van-tab title="门诊端" type="line" border="false" :title-style="{'font-size':(data==1?'.24rem':'.14rem')}" >
					<form @submit.prevent="submit('200')" class="content">
						<div class="inputBox">
							<img class="telephoneImg" src="static/img/iphone@2x.png" alt="">
							<input type="text"  v-model="account.name" name='name' placeholder="请输入手机号" >

						</div>
						<div class="inputBox">
							<img  class="passwordImg" src="static/img/mima@2x.png" alt="">
							<input type="password"  v-model="account.password" name='password' placeholder="请输入密码" autocomplete>
						</div>
						<div class="checkBox">
							<input type="checkbox"
							    class="input_check"
							    :checked="checked"
							    @change="change"/>
							<p>&nbsp;&nbsp;我已经阅读并同意<a href="/oss/page/user-protocol.html">&nbsp;&nbsp;&lt;&lt;用户协议与隐私政策&gt;&gt;</a></p>
						</div>
						<input class="submitClass" type="submit" value="登陆"></input>
						<div class="passwordReset">
							<router-link  :to="{name : 'retrievePassword'}">
								<div @click="forgetFn(200)" class="forget">
									忘记密码
									<!-- <img src="static/img/reset@2.png" alt=""> -->
								</div>
							</router-link>
						</div>
					</form>
				</van-tab>
				<van-tab title="运营端" type="line" border="false" :title-style="{'font-size':(data==2?'.24rem':'.14rem')}" >
					<form @submit.prevent="submit('300')" class="content">
						<div class="inputBox">
							<img class="telephoneImg" src="static/img/iphone@2x.png" alt="">
							<input type="text"  v-model="account.name" name='name' placeholder="请输入手机号" >
						</div>
						<div class="inputBox">
							<img  class="passwordImg" src="static/img/mima@2x.png" alt="">
							<input type="password"  v-model="account.password" name='password' placeholder="请输入密码"  autocomplete>
						</div>
						<div class="checkBox">
							<input type="checkbox"
							    class="input_check"
							    :checked="checked"
							    @change="change"/>
							<p>&nbsp;&nbsp;我已经阅读并同意<a href="/oss/page/user-protocol.html">&nbsp;&nbsp;&lt;&lt;用户协议与隐私政策&gt;&gt;</a></p>
						</div>
						<input class="submitClass" type="submit" value="登陆"></input>
						<div class="passwordReset">
							<router-link  :to="{name : 'retrievePassword'}">
								<div @click="forgetFn(300)" class="forget">
									修改密码
									<!-- <img src="static/img/reset@2.png" alt=""> -->
								</div>
							</router-link>
						</div>
					</form>
				</van-tab>
				</van-tabs>
			</div>
		</div>

  </div>
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex'
import router from '../router'
export default {
  name: 'landingPage',
  data () {
    return {
		data:1,
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

  mounted () {
		if(window.plus){
			plus.navigator.setStatusBarBackground("#2B77EF");
			plus.navigator.setStatusBarStyle("light")
  		}
	console.log(this.$store.state.shop.account)
  },
  computed:{
	...mapGetters(['checked','account']),
	isLogin: {
	    get: function() {
			// console.log(this.$store)
	        return this.$store.state.shop.isLogin
	    },
	    set: function (newValue) {
			this.$store.state.shop.isLogin = newValue;
	    },
	},
  },
  methods:{
	 //传递页面状态值
  	forgetFn(e){
  		this.isLogin = e
  		// console.log(this.isLogin)
  	},
	...mapActions(['submit','change'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.landing{
	width: 100%;
	height: 100%;
}
.nav{
	width: 100%;
	height: 2.07rem;
	background: #2B77EF;position: relative;
}
.topNav{
	width: 50%;margin: auto;
}
.topNav img{
	margin-top:40%;
	height: 100%;width: 100%;z-index: 999;
}
.typeNav{
	padding: 0 7.5%;
	position: absolute;
	top: 1.63rem;
	width: 85%;
}
>>>.van-tabs__line {
    position: absolute;
    bottom: 28%;
    left: 0;
    z-index: 1;
    height: .07rem;
    width: 1rem!important;
    background-color: #FFFFFF;
    border-radius: 3px;
}

>>>.van-tabs__nav--line {
    box-sizing: content-box;
    height: 100%;
    padding-bottom: 5.5%!important;
}
>>>[class*=van-hairline]::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: none!important;
    -webkit-transform: scale(.5);
    transform: scale(.5);
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
	font-size: .16rem;
}
.inputBox{
	position: relative;
	width: 100%;
	margin: 0 auto;
}

.passwordImg{
	position: absolute;
	height: .16rem;
	width: .18rem;
	top:.35rem;
	left: 7%;
}
.telephoneImg{
	width: .13rem;
	height: .2rem;
	top:.35rem;
	left: 7%;
	position: absolute;
}
.inputBox input{
	width: 85%;
	height: .45rem;
	border-radius: .25rem;
	border: 1px solid #E5E5E5;
	padding-left: 15%;
	background: #F5F5F5;
}
.inputBox input:last-child{
	margin-top: .2rem;
}
.inputBox input::-webkit-input-placeholder {
                /* Chrome/Opera/Safari */
                font-size:.15rem;padding:.065rem 0rem .06rem 0rem;
            }
            ::-moz-placeholder {
                /* Firefox 19+ */
                font-size:.15rem;padding:.065rem 0rem .06rem 0rem;
            }
            :-ms-input-placeholder {
                /* IE 10+ */
                font-size:.15rem;padding:.065rem 0rem .06rem 0rem;
            }
            :-moz-placeholder {
                /* Firefox 18- */
               font-size:.15rem;padding:.065rem 0rem .06rem 0rem;
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
  background: url('../../static/img/Not-checkbox@2x.png');
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
  background-image: url('../../static/img/checkbox@2x.png');
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
	display: inline-block;
	height: .17rem;line-height: .17rem;
}
.checkBox p a{
	color: #5ab5fc;
}
.passwordReset{
	/* margin-top: .05rem; */
	height: .17rem;
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
>>>.van-tab:nth-child(2) span{
	/* font-size: .24rem; */
	/* color: rgba(255, 255, 255); */
}
.forget{
	text-align: right;
}
</style>
