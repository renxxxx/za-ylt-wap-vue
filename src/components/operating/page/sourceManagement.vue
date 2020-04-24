<template>
<topSolt>
<van-pull-refresh slot="returnTopSolt" v-model="pullingDown" @refresh="afterPullDown" >
  <div class="index">
		<div class="navWarp">
			<!-- 搜索及其筛选 -->
			<div class="topNav" ref="topNav" :style="{'padding-top':$store.state.paddingTop}">
				<div class="indexReturn" @click="goBackFn"  id="navback">
					<img src="../../../assets/image/back-white@2x.png" alt="">
				</div>
				<router-link :to="{path:'/operating/operating_pathogenicSearch',query:{hospitalId: this.$route.query.hospitalId,focus : true,}}">
          <div class="indexSearch ">
              <input type="text" placeholder="搜索病员" v-model="list.keywords" readonly="readonly">
              <img src="../../../assets/image/sousuo@2x.png" alt="">
          </div>
				</router-link>
        <router-link :to="{path:'/operating/operating_pathogenicSearchoperating_pathogenicSearch',query:{hospitalId: this.$route.query.hospitalId,}}">
          <div class="clinic_buttton">
            <button>搜索</button>
          </div>
        </router-link>
        <!-- <router-link }}"> -->
          <div class="indexScreening" @click="showPopup">
            <span>筛选</span>
            <img src="../../../assets/image/screen@2x.png" alt="加载中" >
          </div>
        <!-- </router-link> -->
			</div>
			<!-- 就诊情况 -->
			<div class="typeNav" :style="{'padding-top': (parseInt($store.state.paddingTop.replace('px',''))+39)+'px'}">
				<van-tabs background='none' line-width=.6rem title-inactive-color='#FFFFFF' title-active-color='#FFFFFF' v-model='list.titleData'>
					<van-tab :title='list.noNum!=0||list.yesNum!=0? list.allTitle+(list.noNum+list.yesNum):list.allTitle'>
						<keep-alive>
							<clinicAll ref='all' :list = 'list' :hospitalId = "this.$route.query.hospitalId"></clinicAll>
						</keep-alive>
					</van-tab>
					<van-tab :title='list.noNum==0? list.noTitle:list.noTitle+list.noNum'>
						<keep-alive>
							<clinicNo ref='no' :list = 'list' :hospitalId = "this.$route.query.hospitalId"></clinicNo>
						</keep-alive>
					</van-tab>
					<van-tab :title='list.yesNum==0? list.yesTitle:list.yesTitle+list.yesNum'>
						<keep-alive>
							<clinicYes ref='yes' :list = 'list' :hospitalId = "this.$route.query.hospitalId"></clinicYes>
						</keep-alive>
					</van-tab>
				</van-tabs>
			</div>
		</div>
		<!-- <router v-if="isLogin == 200? true:false"></router> -->
  </div>
  </van-pull-refresh>
  </topSolt>
</template>
<script>
import axios from 'axios'
import {mapActions,mapGetters,mapState} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import clinicAll from '../function/clinicAll.vue'
import clinicYes from '../function/clinicYes.vue'
import clinicNo from '../function/clinicNo.vue'
import topSolt from "../function/topSolt.vue";
// import router from '../../outpatient/functionPage/router.vue'
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
		},
		height : undefined,
		pullingDown: false,
    }
  },
  created(){
	
  }
  ,destroyed(){
	  debugger
	  
  },
  mounted(){
	//   console.dir(this.$route.query)
	//   debugger
    // if(window.plus){
    // 	//plus.navigator.setStatusBarBackground("#2B77EF");
    // 	plus.navigator.setStatusBarStyle("dark")
    // }
	// this.getNum();
  },
  activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			this.getNum();
			this.initData();
		}
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
    hospitalReturnHomePage: {
    	get: function() {
    	// 
    		return this.$store.state.hospitalReturnHomePage
    	},
    	set: function (newValue) {
    	this.$store.state.hospitalReturnHomePage = newValue;
    	},
    },

		...mapGetters(['Time','account','isLogin']),
  },
  //注册组件
  components:{
	  clinicAll,clinicYes,clinicNo,topSolt
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
      Object.assign(this.$data, this.$options.data());
	  this.getNum();
       this.$refs.all.initData();
	   this.$refs.no.initData();
	   this.$refs.yes.initData();

    },
	//回退方法
	goBackFn(){
		this.$router.back()
	},
	//显示筛选弹窗
	showPopup() {
	  this.show = true;
		this.$router.push({path:'/operating/operating_pathogenicSearch',query:{hospitalId: this.$route.query.hospitalId,show:false}})

	},
	getNum(){
		
		this.$axios.post('/c2/patient/items',qs.stringify({
			kw : this.list.keywords,
			hospitalId: this.$route.query.hospitalId,
			status :1,
			pn : 1,
			ps : 10
		}))
		.then(_d => {
			this.list.noNum = _d.data.data.sum.totalCount;
			// 
		})
		.catch((err)=>{
			
			// //Dialog({ message: err});;
		})
		this.$axios.post('/c2/patient/items',qs.stringify({
			kw : this.list.keywords,
			hospitalId: this.$route.query.hospitalId,
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
	...mapActions(['labelLabelFn','dateConfirm','closeFn','screeningSubmit','screeningResult','confirm','cancel','hospitalSubmit'])
  },
}
</script>
<style scoped>
.index{
	width: 100%;
  height: 100%;
	background-color: #F5F5F5;
	/* position: fixed; */
}
.navWarp{
	/* background-color: #FFFFFF; */
	/* height: 1rem; */
	height: 100%;
}
.topNav{
	height: .85rem;
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
