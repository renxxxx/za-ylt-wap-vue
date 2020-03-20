<template>
  <div class="retrievePassword">
	<div class="navWarp" :style="{'padding-top': height+'px'}">
		<a @click="goBackFn" id="navback">
			<img src="../../assets/image/shape@3x.png" alt="">
		</a>
		<span>修改密码</span>
    <p>修改后的新密码将替换原密码</p>
	</div>
	<div class="center" v-model="retrieve">
		<ul>
			<li>
				<img class="iphone" src="../../assets/image/iphone@2x.png" alt="">
				<input type="text" name='password' v-model="retrieve.telephone" maxlength="11"  oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入手机号">
			</li>
			<li>
				<img class="yanzhengma" src="../../assets/image/yanzhengma@2x.png" alt="">
				<input type="text" name='password' v-model="retrieve.smsvcode" oninput="value=value.replace(/[^0-9a-zAA-Z]/g,'')" placeholder="请输入验证码">
				<button @click="getSmsvcode">
					<span v-if="showYan" class="showYan">获取验证码</span>
					<van-count-down v-show="showTime" :time="time" :auto-start="false" ref="countDown" format="ss" @finish="finished"/>
					<span v-show="showTime">S</span>
				</button>
				<!-- <input type="button" value="获取验证码" style="direction: rtl;" @click="getdata"> -->
			</li>
			<li>
				<img class="mima" src="../../assets/image/mima@2x.png" alt="">
				<input type="text" name='password' maxlength="12" v-model="retrieve.newpwd" oninput="value=value.replace(/[^0-9a-zAA-Z]/g,'')" placeholder="请输入新密码">
			</li>
		</ul>
		<button @click="retrieveSubmit">确认</button>
	</div>


  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'retrievePassword',
  data () {
    return {
		// 找回密码信息
		retrieve:{
			telephone : '',
			smsvcode : undefined,
			newpwd : undefined,
			data : true,
		},
		// 验证码倒计时
		time : 60 * 1000,
		showTime : false,
		showYan : true
    }
  },
  created () {
	var heightRexg = /^[0-9]*/g
	var topHeight = this.$store.state.topHeight.match(heightRexg)
	this.height = parseInt(topHeight.join())
  },
  computed:{
	  ...mapGetters(['account','isLogin','whichClient'])
  },
  beforeRouteLeave(to, from, next) {
    this.scrollTop =document.getElementById('outpatient').scrollTop ||document.getElementById('outpatient').pageYOffset
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
	 document.getElementById('outpatient').scrollTop=document.getElementById('outpatient').pageYOffset=vm.scrollTop;
	});

  },
  mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#2B77EF");
			plus.navigator.setStatusBarStyle("dark")
  		}
  },
  methods: {
	 //回退方法
	 goBackFn(){
		 this.$router.back(-1)
	 },
	//倒计时结束时触发的方法
	finished(e){
		this.retrieve.data = true;
		 this.$refs.countDown.reset();
		console.log(this.retrieve.data);
		this.showYan = true;
		this.showTime = false;
	},
	//获取信息的post请求方法
	getdata(postUrl){
		this.$axios.post(postUrl,qs.stringify({
				phone : this.retrieve.telephone,
				smsvcode : this.retrieve.smsvcode,
				newpwd : this.retrieve.newpwd
			}))
		.then( _d => {
			console.log(_d)
			_d.data.codeMsg? this.$toast.fail(_d.data.codeMsg):this.$toast.success('操作成功');
			if(_d.data.code == 0){
				setTimeout(()=>{
					this.$router.back(-1);
				},800)
			}
		})
		.catch((err)=>{
			console.log(err);
			//Dialog({ message: '加载失败!'});
		})
	},
	//获取验证码
	getSmsvcode(){
		// console.log(this.retrieve.telephone);
		// console.log(this.retrieve.data);
		if(this.retrieve.telephone != '' && this.retrieve.data == true){
			console.log(this.retrieve.data)
			this.$axios.post('/sendsmsvcode',qs.stringify({
				phone : this.retrieve.telephone,
			}))
			.then(_d => {
        if(_d.data.codeMsg){
          this.$toast.fail(_d.data.codeMsg)
          this.showYan = true;
          this.showTime = false;
        }else{
          this.showYan = false;
          this.showTime = true;
          this.$refs.countDown.start();
          this.retrieve.data = false;
        }
				// console.log(this.retrieve.data);
			})
			.catch((err)=>{
				console.log(err)
				// console.log(this.retrieve.data);
				//Dialog({ message: '加载失败!'});
			})

		}else if(this.retrieve.data == false){
			Dialog({ message: '请不要重复点击' });
		}else{
			Dialog({message: '请输入手机号'})
		}
	},
	// 提交重设信息
	retrieveSubmit(){
		console.log(this.whichClient)
		switch(this.whichClient){
			case 100:
			this.getdata('/hospital/set-pwd-by-phone');
			break;

			case 200:
			this.getdata('/clinic/set-pwd-by-phone');
			break;

			case 300:
			this.getdata('/manager/set-pwd-by-phone');
			break;
		}
	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.retrievePassword{
	height: 6.67rem;
}
.navWarp{
	width:100%;
	height:22%;
	/* color: #FFFFFF; */
	/* font-size: .2rem; */
	/* background-image:url('../../assets/image/BJ-change@2x.png'); */
	background-size:100% 100%;
	position: relative;
}
.navWarp img{
	width: .09rem;
	height: .15rem;
	margin: .22rem 0rem 0rem .16rem;
}
.navWarp span{
	position: absolute;
	bottom: .33rem;
	left: .38rem;
	/* display: block; */
  font-size: .2rem;
  font-weight: bolder;
}
.navWarp p{
  position: absolute;
  bottom: 0rem;
  left: .38rem;
  font-size: .16rem;
  color: #666666;
}
.center{
	width:82%;
	margin: 0 auto;
}
.center>button{
	width: 100%;
	height: .45rem;
	border: none;
	color: #FFFFFF;
	border-radius: 45px;
	font-size: .16rem;
	background-image: linear-gradient(to left, #F75178, #ED2828);
}
.center ul{
	margin: .8rem 0;
}
.center ul li{
	position: relative;
	/* text-align: center; */
}
.iphone{
	width: .13rem;
}
.yanzhengma{
	width: .15rem;
}
.mima{
	width: .18rem;
}
.showYan{
	right: .2rem!important;
}
.center ul li img{
	position: absolute;
	left: 7.3%;
	top:.14rem;
}
.center ul li:nth-child(2){
	border-radius: 45px;
	width: 100%;
	height: .45rem;
	border: 1px solid #E5E5E5;z-index:999;
}
.center ul li:nth-child(2) input:nth-child(2){
	border: none;
	float: left;
	height: .4rem;
	width: 50%;border-radius: 45px 0 0 45px;
}
.center ul li:nth-child(2) button{
	color: #2B77EF;
	border: none;
	margin: .11rem auto;
	height: .21rem;
	line-height: .21rem;
	font-size: .11rem;
	border-left:1px solid #E5E5E5;
	background-color: #FFFFFF;text-align: center;
	width: 31%;border-radius: 0 45px 45px 0;
	position: relative;
}
>>>.van-count-down{
    color:#2B77EF;
    font-size: 14px;
    line-height: 20px;
}
.center ul li:nth-child(2) button span{
	font-size: .12rem;
	/* position: absolute; */
	/* right: .34rem; */
	/* top: .02rem; */
}
.center ul li input{
	border: 1px solid #E5E5E5;
	border-radius: 45px;
	width:85%;
	height: .45rem;
	padding-left:.54rem ;
	font-size: .17rem;
}
.center ul li:nth-child(2){
	margin: .2rem 0;
}
>>>.van-count-down {
    display: inline;
}
</style>
