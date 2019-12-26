<template>
  <div class="index">
		<div class="navWarp">
			<!-- 搜索及其筛选 -->
			<div class="topNav" >
				<div class="indexReturn" @click="goBackFn" v-if="isLogin == 100? true:false">
					<img src="static/img/back-white@2x.png" alt="">
				</div>
			<div class="indexSearch" v-bind:class="[isLogin == 200? 'clinicSearchStyle':'']">
				<router-link :to="{name:'outpatient_search',query:{focus : true}}">
					<input type="text" placeholder="搜索病员" v-model="list.keywords" readonly="readonly">
					<img src="static/img/sousuo@2x.png" alt="">
				</router-link>
			</div>
			<router-link :to="{name:'outpatient_search'}">
				<div class="clinic_buttton">
					<button>搜索</button>
				</div>
			</router-link>
			<router-link :to="{name:'outpatient_search'}">
				<div class="indexScreening" @click="showPopup">
					<span>筛选</span>
					<img src="static/img/screen@2x.png" alt="加载中" >
				</div>
			</router-link>
			</div>
			<!-- 就诊情况 -->
			<div class="typeNav">
				<van-tabs background='none' line-width=.6rem title-inactive-color='#FFFFFF' title-active-color='#FFFFFF' v-model='list.titleData'>
					<van-tab :title='list.noNum!=0||list.yesNum!=0? list.allTitle+(list.noNum+list.yesNum):list.allTitle'
						v-if="isLogin == 200? false:true">
						<keep-alive>
							<clinicAll ref='all' :list = 'list'></clinicAll>
						</keep-alive>
					</van-tab>
					<van-tab title="新增病员" v-if="isLogin == 200? true:false">
						<form @submit.prevent="hospitalSubmit" class="newAdd">
							<div class="newAddTitle">
								<img src="static/img/bitian@2x.png" alt="">
								<h3>必填项</h3>
								<ul class="Fill">
									<li>
										<span>病患姓名</span>
										<input type="text" v-model="account.user.realname"  placeholder="请填写" >
									</li>
									<li>
										<span>联系电话</span>
										<input type="text" v-model="account.user.tel" maxlength="11"  oninput="value=value.replace(/[^\d]/g,'')" placeholder="请填写">
									</li>
									<li>
										<span>身份证号</span>
										<input type="text" v-model="account.user.idcardNo" maxlength="18"  oninput="value=value.replace(/[^\d|xX]/g,'')"placeholder="请填写">
									</li>
								</ul>
							</div>
							<div class="newAddTitle bottom">
								<img src="static/img/bitian@2x.png" alt="">
								<h3>选填项</h3>
								<ul class="Fill">
									<li>
										<span>备注</span>
										<input type="text" v-model="account.user.remark"  placeholder="请填写" >
									</li>
								</ul>
							</div>
							<input class="submitClass" type="submit" value="提交"></input>
						</form>
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
		<router v-if="isLogin == 200? true:false"></router>
  </div>
</template>
<script>
import axios from 'axios'
import {mapActions,mapGetters,mapState} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import clinicAll from '../functionPage/clinicAll.vue'
import clinicYes from '../functionPage/clinicYes.vue'
import clinicNo from '../functionPage/clinicNo.vue'
import router from '../../outpatient/functionPage/router.vue'
export default {
  name: 'index',
  data () {
    return {
		name: 'index',
		selectValue : [],
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
		}
    }
  },
  mounted(){
    if(window.plus){
    	//plus.navigator.setStatusBarBackground("#2B77EF");
    	plus.navigator.setStatusBarStyle("dark")
    }
	this.getNum();
  },
  computed:{
		// ...mapState({
		// 	count: account =>
		// }),
		show: {
			get: function() {
			console.log(this.$store)
				return this.$store.state.shop.show
			},
			set: function (newValue) {
			this.$store.state.shop.show = newValue;
		   },
		},
		showTime: {
			get: function() {
			// console.log(this.$store)
				return this.$store.state.shop.showTime
			},
			set: function (newValue) {
			this.$store.state.shop.showTime = newValue;
			},
		},
		...mapGetters(['Time','account','isLogin']),
  },
  //注册组件
  components:{
	  clinicAll,clinicYes,clinicNo,router
  },
  methods:{
	//回退方法
	goBackFn(){
		this.$router.back(-1)
	},
	//显示筛选弹窗
	showPopup() {
	   this.show = true;
	   // console.log(this.show)
	},
	getNum(){
		let clinicId = '';
		this.list.clinicId? clinicId = this.list.clinicId : clinicId = this.account.clinicId;
		this.$axios.post('/c2/patient/items',qs.stringify({
			kw : this.list.keywords,
			hospitalId : this.account.hospitalId,
			clinicId : clinicId,
			status :1,
			pn : 1,
			ps : 10
		}))
		.then(_d => {
			this.list.noNum = _d.data.data.sum.totalCount;
			// console.log(this.list.noNum)
		})
		.catch((err)=>{
			console.log(err);
			Dialog({ message: err});
		})
		this.$axios.post('/c2/patient/items',qs.stringify({
			kw : this.list.keywords,
			hospitalId : this.account.hospitalId,
			clinicId : clinicId,
			status :4,
			pn : 1,
			ps : 10
		}))
		.then(_d => {
			this.list.yesNum = _d.data.data.sum.totalCount;
			// console.log(this.list.yesNum)
		})
		.catch((err)=>{
			console.log(err);
			Dialog({ message: err});
		});

		// console.log(this.list.allNum)
	},
	...mapActions(['labelLabelFn','dateConfirm','closeFn','screeningSubmit','screeningResult','confirm','cancel','hospitalSubmit'])
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
	/* background:url('../../../../static/img/BJ-blue.png'); */
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
}
.indexReturn img{
	width: .09rem;
	height: .15rem;
	margin: auto;
}
.indexSearch{
	display: inline-block;
	/* width: .43rem; */
	width: 65%;
	float: left;
	/* text-align: center; */
	z-index: 999;
	height: .4rem;
	line-height: .36rem;
	position: relative;
}
.indexSearch img{
	position: absolute;z-index: 9;left: .13rem;top: .09rem;
	height: .15rem;width:.14rem;
}
.indexSearch input{
	border-radius: .18rem;border: none;
	height: .335rem;width: 2.4rem;
  /* line-height: .3rem; */
	padding: 0;
	width: 84%;
	padding-left: 12%;
	/* margin:0 5%; */
	background: #F5F5F5;
}
.indexSearch input::-webkit-input-placeholder {
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
.clinic_buttton{
	float: left;
	margin-top: .024rem;
	margin-left: -.05rem;
}
.clinic_buttton button{
	color: #FFFFFF;
	background-color: rgba(0,0,0,0);
	border-radius: .15rem;
	border: 1px solid #FFFFFF;
	height: .28rem;
	width: .45rem;
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
	margin-top: .46rem
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
	padding-top: 1rem;
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

	background: linear-gradient(#56AFF8, #2B77EF);
	border: none;
	border-radius: .2rem;
	color: #FFFFFF;
	font-size: 	.14rem;
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
	background-color: #F5F5F5;
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
