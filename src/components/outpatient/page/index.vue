<template>
	<van-pull-refresh v-model="pullingDown" @refresh="afterPullDown" >
		<div class="index">
			<div class="navWarp">
				<!-- 搜索及其筛选 -->
				<div class="topNav" ref="topNav" :style="{'padding-top':$store.state.paddingTop}">
				<router-link :to="{name:'outpatient_pathogenicSearch',query:{focus : true,time:new Date().getTime()}}">
					<div class="indexSearch clinicSearchStyle">
						<input type="text" placeholder="搜索病员" v-model="list.keywords" readonly="readonly">
						<img src="../../../assets/image/sousuo@2x.png" alt="">
					</div>
				</router-link>
				<router-link :to="{name:'outpatient_pathogenicSearch',query:{time:new Date().getTime()}}">
				  <div class="clinic_buttton">
					<button>搜索</button>
				  </div>
				</router-link>
				<router-link :to="{name:'outpatient_pathogenicSearch',query:{time:new Date().getTime()}}">
				  <div class="indexScreening" @click="showPopup">
					<span>筛选</span>
					<img src="../../../assets/image/screen@2x.png" alt="加载中" >
				  </div>
				</router-link>
				</div>
				<!-- 就诊情况 -->
				<div class="typeNav" :style="{'padding-top': (parseInt($store.state.paddingTop.replace('px',''))+32)+'px'}">
					<van-tabs background='none' line-width=.6rem title-inactive-color='#FFFFFF' title-active-color='#FFFFFF' v-model='list.titleData'>
						<van-tab title="新增病员">
							<div class="newAdd">
								<div class="newAddTitle">
									<img src="../../../assets/image/bitian@2x.png" alt="">
									<h3>必填项</h3>
									<ul class="Fill">
										<li>
											<span>病患姓名</span>
											<input type="text" v-model="account.realname"  placeholder="请填写" >
										</li>
										<li>
											<span>联系电话</span>
											<input type="text" v-model="account.tel" maxlength="11"  oninput="value=value.replace(/[^\d]/g,'')" placeholder="请填写">
										</li>
										<li>
											<span>身份证号</span>
											<input type="text" v-model="account.idcardNo" maxlength="18"  oninput="value=value.replace(/[^\d|xX]/g,'')" placeholder="请填写">
										</li>
									</ul>
								</div>
								<div class="newAddTitle bottom">
									<img src="../../../assets/image/bitian@2x.png" alt="">
									<h3>选填项</h3>
									<ul class="Fill">
										<li>
											<span>备注</span>
											<input type="text" v-model="account.remark"  placeholder="请填写" >
										</li>
									</ul>
								</div>
								<button class="submitClass" @click="hospitalSubmit">提交</button>
							</div>
						</van-tab>
						<van-tab :title='list.noNum==0? list.noTitle:list.noTitle+list.noNum'>
							<keep-alive>
								<clinicNo ref='no' :list = 'list'></clinicNo>
							</keep-alive>
						</van-tab>
						<van-tab :title='list.yesNum==0? list.yesTitle:list.yesTitle+list.yesNum'>
							<keep-alive>
								<clinicYes ref='yes' :list = 'list'></clinicYes>
							</keep-alive>
						</van-tab>
					</van-tabs>
				</div>
			</div>
			<!-- <router v-if="isLogin == 200? true:false"></router> -->
		</div>
	</van-pull-refresh>
</template>
<script>
import axios from 'axios'
import {mapActions,mapGetters,mapState} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import clinicAll from '../function/clinicAll.vue'
import clinicYes from '../function/clinicYes.vue'
import clinicNo from '../function/clinicNo.vue'
// import router from '../../outpatient/functionPage/router.vue'
export default {
  name: 'index',
  data () {
    return {
		name: 'index',
		selectValue : [],
		account:{
			realname:'',
			tel:'',
			idcardNo:'',
			remark:''
		},
		//导航栏切换标题
		list:{
			keywords : '',			//搜索框的关键字value
			allTitle: '全部',
			noTitle:'未就诊',
			yesTitle:'已就诊',
			allNum : 0,
			noNum : 0,
			yesNum : 0,
			clinicId : '',
			clinicAll : [],
			clinicNo : [],
			clinicYes : [],
			data: false,
			titleData:0,
		},
		height : undefined,
		pullingDown: false,
    }
  },
  created(){
  },
  beforeRouteLeave(to, from, next) {
	  	debugger;
	// this.scrollTop =document.getElementById('outpatient').scrollTop ||document.getElementById('outpatient').pageYOffset
	// 
	let scrollTop = this.scrollTop =document.getElementById('outpatient').scrollTop;
this.scrollTop = scrollTop?scrollTop :0;


	if(!to.query.time || !from.query.time || to.query.time < from.query.time){
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
	  debugger
    next(vm => {
		debugger
      document.getElementById('outpatient').scrollTop=document.getElementById('outpatient').pageYOffset=vm.scrollTop;
    });
	let fromRoute =  JSON.stringify({path:from.path,name:from.name,query:from.query})
	let lastRoute = localStorage.getItem('lastRoute')
	
	
	if(fromRoute == lastRoute){
	 localStorage.removeItem('lastRoute')
	}
  },
  destroyed(){
  },
  mounted(){
	let thisVue =this
    if(window.plus){
    	//plus.navigator.setStatusBarBackground("#2B77EF");
    	plus.navigator.setStatusBarStyle("dark")
    }
	let lastRoute = localStorage.getItem('lastRoute')
	    if(lastRoute){
	      this.$router.push(JSON.parse(lastRoute));
	      return
	    }
	
	this.initData();
  },
  activated(){
	  
  },
  computed:{
		show: {
			get: function() {
			
				return this.$store.state.show
			},
			set: function (newValue) {
			this.$store.state.show = newValue;
		   },
		},
		showTime: {
			get: function() {
			// 
				return this.$store.state.showTime
			},
			set: function (newValue) {
			this.$store.state.showTime = newValue;
			},
		},
		...mapGetters(['Time']),
  },
  //注册组件
  components:{
	  clinicAll,clinicYes,clinicNo
  },
  methods:{
	 afterPullDown() {
      //下拉刷新
		setTimeout(() => {
			this.pullingDown = false;
			this.initData();
		}, 500);
    },
    initData() {
		debugger
		let thisVue = this
			if(this.$route.meta.auth && !this.$store.state.outpatient.login)
			this.$toast({message:'请登录',onClose:function(){
				thisVue.$router.replace({ path : '/outpatientLogin',query:{time:1}});
			}})
			
      Object.assign(this.$data, this.$options.data());
	  this.getNum();
       this.$refs.all.initData();
	   this.$refs.no.initData();
	   this.$refs.yes.initData();

    },
	//回退方法
	goBackFn(){
		this.$router.back(-1)
	},
	//显示筛选弹窗
	showPopup() {
	   this.show = true;
	   // 
	},
	getNum(){
		let clinicId = '';
		// this.list.clinicId? clinicId = this.list.clinicId : clinicId = this.$store.state.outpatient.login.clinicId;
		this.$route.name == 'outpatient_index'?	clinicId='':'',
		this.$axios.post('/c2/patient/items',qs.stringify({
			kw : this.list.keywords,
			hospitalId : this.$store.state.outpatient.login.hospital.hospitalId,
			clinicId : this.$store.state.outpatient.login.clinic.clinicId,
			status :1,
			pn : 1,
			ps : 10
		}))
		.then(_d => {
			this.list.noNum = _d.data.data.sum.totalCount;
			// 
		})
		.catch((err)=>{
			
		})
		this.$axios.post('/c2/patient/items',qs.stringify({
			kw : this.list.keywords,
			hospitalId : this.$store.state.outpatient.login.hospital.hospitalId,
			clinicId : this.$store.state.outpatient.login.clinic.clinicId,
			status :4,
			pn : 1,
			ps : 10
		}))
		.then(_d => {
			this.list.yesNum = _d.data.data.sum.totalCount;
			// 
		})
		.catch((err)=>{
			
			// //Dialog({ message: err});;
		});

		// 
	},
  hospitalSubmit(){
    this.$axios.post('/c2/patient/itemadd',qs.stringify({
			clinicId : this.$store.state.outpatient.login.clinic.clinicId,
			hospitalId : this.$store.state.outpatient.login.hospital.hospitalId,
    		password : this.account.password,
    		realname : this.account.realname,
    		tel	:   this.account.tel,
    		remark :  this.account.remark,
    		idcardNo :  this.account.idcardNo
    	}))
    	.then( res =>{
    		
    		
    		// 
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
    		
    		//Dialog({ message: '加载失败!'});
    	})
  }
	// ...mapActions(['labelLabelFn','dateConfirm','closeFn','screeningSubmit','screeningResult','confirm','cancel','hospitalSubmit'])
  },
}
</script>
<style scoped>
.index{
	width: 100%;
  height: 100%;
	background-color: #F5F5F5;
}
.navWarp{
	/* background-color: #FFFFFF; */
	/* height: 1rem; */
	height: 100%;
}
.topNav{
	height: .8rem;
	line-height:.335rem;
	width: 100%;
	padding-top: 0.1rem;
	/* background:url('../../../assets/image/BJ-blue.png'); */
	/* background-size:100% 100%; */
	background-color: #2B77EF;
	position: fixed;
	top: 0rem;
	z-index: 1;
}
.indexReturn{
	width: 10%;
	float: left;
	text-align: center;
	display: inline-block;
	z-index: 999;
	padding-top: 6px;
}
.indexReturn img{
	width: .09rem;
	height: .15rem;
	margin: auto;
}
.indexSearch{
	display: inline-block;
	/* width: .43rem; */
	width: 63%;
	float: left;
	/* text-align: center; */
	z-index: 999;
	height: .4rem;
	line-height: .36rem;
	position: relative;
	padding-top: 6px;
}
.indexSearch img{
	position: absolute;
	z-index: 9;
	left: .11rem;
	/* top: .15rem; */
	top: 0rem;
	bottom: 0rem;
	margin: auto 0rem;
	height: .15rem;
	width:.14rem;
}
.indexSearch input{
	border-radius: .18rem;border: none;
	height: .335rem;width: 2.4rem;
	line-height: .3rem;
	/* padding: 0; */
	width: 80%;
	padding-left: 12%;
	/* margin:0 5%; */
	background: #F5F5F5;
	font-size:.15rem;
}
.clinic_buttton{
	float: left;
	margin-top: .024rem;
	margin-left: -.05rem;
	padding-top: 6px;
}
.clinic_buttton button{
	color: #FFFFFF;
	background-color: rgba(0,0,0,0);
	border-radius: .15rem;
	border: 1px solid #FFFFFF;
	height: .28rem;
	width: .5rem;
	font-size: .12rem;
	text-align: center;
	line-height: .25rem;
}
.indexScreening{
	display:inline-block;
	/* width: .43rem; */
	width: 12%;
	float: left;
	text-align: center;
	z-index: 999;
	height: .4rem;
	line-height: .38rem;
	margin-left: .052rem;
	padding-top: 6px;
}
.indexScreening span{
	width: .15rem;height: .21rem;
	/* margin: .65rem .02rem .06rem 0rem; */
	color: #FFFFFF;font-size: .12rem;
	z-index: 3;
	position:relative;
}
.indexScreening img{
	height: .13rem;width: .12rem;
	/* margin-right: .16rem; */
}
.indexFrom label{
	background: red;
}

.typeNav{
	width: 100%;
	/* height: 100%; */
	/* margin-top: -.45rem; */
}
.content{
	width: 100%;
}
.content li{
	height:.84rem;
	width: 91.5%;
	background-color: #FFFFFF;
	margin: .12rem auto;
	border-radius: .14rem;
}
.contentTitle{
	padding: .09rem 0rem .07rem .1rem;
}
.contentTitle img{
	width: .17rem;
	height: .17rem;
}
.contentTitle span{
	margin-left: .05rem;
	font-weight: bold;
}
.contnet_left{
	margin-left: .32rem;
	float: left;
}
.contnet_left span{
	display: block;
}
.contnet_left span:last-child{
	margin-top: .04rem;
}
.content_right{
	float: right;
	margin-right: .15rem;
	margin-top: -.03rem;
}
.content_right button{
	width: .8rem;
	height: .28rem;
	color: #FFFFFF;
	background-color: #2B77EF;
	border: none;
	border-radius: .14rem;
}
.buttonColor{
	color: #333333!important;
	background-color: #EEEEEE!important;
}
>>>.van-tabs__nav--line {
    box-sizing: content-box;
    height: 100%;
    padding-bottom: 15px;
    z-index: 99;
}
>>>.van-tabs--line .van-tabs__wrap {
	width: 100%;
    height: 44px;
	position: fixed;
	z-index: 9;
	/* margin-top: .46rem */
}
>>>.van-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    z-index: 2002!important;
}
>>>[data-v-111b5a74] .van-hairline--top-bottom {
    display: block;
    width: 100%!important;
    z-index: 99!important;
}
>>>.van-notify--danger {
	margin-top: .94rem!important;
    /* background-color: #ee0a24; */
}
>>>.van-picker {
    position: fixed;
    background-color: #fff;
	box-shadow: #F5F5F5;
    -webkit-user-select: none;
    user-select: none;
    -webkit-text-size-adjust: 100%;
    width: 100%;
    bottom: 0;
	border-top: 1px solid #F5F5F5;
}
>>>.calendar_content[data-v-0946a5a1] {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 3.5rem!important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
>>>.calendar_group[data-v-1043c5e4] {
    position: absolute;
    top: .5rem;
    left: 0;
    bottom: 0;
    right: 0;
	height: 2.5rem!important;
    overflow: hidden;
    transition: height .3s;
    -webkit-transition: height .3s;
}

>>>._v-container[data-v-ecaca2b0] {
    height: 80%!important;
    overflow: scroll;
}
>>>.van-tabs__content{
	background: #F5F5F5!important;
	height: 100%;
	/* padding-top: 1rem; */
	padding-top: .44rem;
}
>>>.van-tab{
	height: .5rem;
	line-height: .5rem;;
}
>>>.van-picker__confirm {
    padding: 0 16px;
    color: #1989fa;
    font-size: 14px;
    background-color: transparent;
    border: 0;
	float: right!important;
}
>>>.van-tabs__line{
    position: absolute;
    bottom: .16rem;
    left: 0;
    z-index: 1;
    height: .03rem;
	width: .24rem!important;
    background-color: #FFFFFF!important;
    border-radius: 3px;
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
    border:none;
    -webkit-transform: scale(.5);
    transform: scale(.5);
}

>>>van-tabs{
	height: 100%;
	position: relative;
	margin-top: .9rem;
}
.submitClass{
	width:2.41rem;
	height: .4rem;
	display:block;margin:0 auto;
	margin-top: .5rem;
	background-color: #2B77EF;
	/* background: linear-gradient(#56AFF8, #2B77EF); */
	border: none;
	border-radius: .2rem;
	color: #FFFFFF;
	font-size: 	.14rem;
}
.newAdd{
	position: fixed;
	height: calc(100% - 1.3rem);
	width: 91.4%;
	left: 0;
	right: 0;
	margin: 0rem auto;
}
.newAddTitle{
	width: 91.4%;
	margin-top: 2.9%;
	margin: 0 auto;
	padding-top: .2rem;
}
.newAddTitle img{
	width: .165rem;
	height: .185rem;
}
.newAddTitle h3{
	margin-left: .05rem;
	width: .45rem;
	height: .21rem;
	display: inline;
}
.Fill {
	width:90%;
	height: 1.59rem;
}
.Fill li{
	border: 1px solid #D8D8D8;
	border-radius: .02rem;
	padding: .12rem .15rem;
	margin-top:.12rem;
	width: 100%;
}
.Fill li span{
	height: .21rem;width: .6rem;

}
.Fill li input{
	border: none;
	float:right;
	text-align: right;
	/* background-color: #F5F5F5; */
}
.bottom{
	margin-top: .2rem;
	height: .78rem;
}
.AlreadySpanColor{
	color: #2B77EF!important;
}
.clinicSearchStyle{
	margin-left: .16rem;
	width: 70%;

}


</style>
