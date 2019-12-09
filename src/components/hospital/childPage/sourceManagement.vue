<template>
  <div class="index">
		<div class="navWarp">
			<!-- 搜索及其筛选 -->
			<div class="topNav">
				<div class="indexReturn" @click="goBackFn">
					<img src="static/iOS切图/back-white@2x.png" alt="">
				</div>
				<div class="indexSearch">
					<img src="static/iOS切图/sousuo@2x.png" alt="">
					<input type="text" placeholder="搜索病源" autofocus="autofocus" v-model="list.keywords" @keyup="inputNow">
				</div>
				<div class="indexScreening" @click="showPopup">
					<span>筛选</span>
					<img src="static/iOS切图/screen@2x.png" alt="加载中" >
				</div>
				<van-popup v-model="show" position="right" :style="{ height: '100%',width:'78.7%'}">
					<div id="indexLabel" v-model="Time">
						<div class="labelLabel" >
							<strong>就诊时间</strong>
							<button class="rightLine" @click="labelLabelFn([2,$event])" :id="labelDocument[0]">
								{{Time.confirmStart?  moment(Time.confirmStart).format('YYYY-MM-DD'):'开始时间'}}
							</button>
							<button  @click="labelLabelFn([3,$event])" :id="labelDocument[1]">
								{{Time.confirmOver? moment(Time.confirmOver).format('YYYY-MM-DD'):'结束时间'}}
							</button>
						</div>
						<div class="labelLabel">
							<strong>推送时间</strong>
							<button class="rightLine"  @click="labelLabelFn([4,$event])"  :id="labelDocument[2]">
								{{Time.pushStart? moment(Time.pushStart).format('YYYY-MM-DD'):'开始时间'}}
							</button>
							<button  @click="labelLabelFn([5,$event])"  :id="labelDocument[3]">
								{{Time.pushOver? moment(Time.pushOver).format('YYYY-MM-DD'):'结束时间'}}
							</button>
						</div>
						<div class="LabelResult">
							<button @click="screeningResult">重选</button>
							<button @click="screeningSubmit">确定</button>
						</div>
					</div>
				</van-popup>
			</div>
			<van-popup @click="closeFn" v-model="showTime" position="bottom" :style="{ height: '20%',width:'100%'}">
				<van-datetime-picker
				  type="date"
				  @confirm="confirm"
				  @cancel="cancel"
				/>
			</van-popup>
			<!-- 就诊情况 -->
			<div class="typeNav">
				<van-tabs background='none' line-width=.6rem title-inactive-color='#FFFFFF' title-active-color='#FFFFFF'>
					<!-- <van-tab :title='this.$refs.all.allTitle'> -->
					<van-tab :title='list.allTitle'>
						<clinicAll ref='all' :list = 'list'></clinicAll>
					</van-tab>
					<!-- <van-tab :title='this.$refs.no.noTitle'> -->
					<van-tab :title='list.noTitle'>
						<clinicNo ref='no' :list = 'list'></clinicNo>
					</van-tab>
					<!-- <van-tab :title='this.$refs.yes.yesTitle'> -->
					<van-tab :title='list.yesTitle'>
						<clinicYes ref='yes' :list = 'list'></clinicYes>
					</van-tab>
				</van-tabs>
			</div>
		</div>
  </div>
</template>
<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import clinicAll from '../functionPage/clinicAll.vue'
import clinicYes from '../functionPage/clinicYes.vue'
import clinicNo from '../functionPage/clinicNo.vue'
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
		}
    }
  },
  mounted(){
	  
  },
  computed:{
	...mapGetters(['Time','labelDocument','showTime','show','account','detail']),
	show: {
	    get: function() {
			// console.log(this.$store)
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
  },
  //注册组件
  components:{
	  clinicAll,clinicYes,clinicNo
  },
  methods:{
	//回退方法
	goBackFn(){
		this.$router.back(-1)
	},
	inputNow(_keywordsCode){
		//清除计时器
		if (this.timer) {
		    clearTimeout(this.timer);
		}
		if (_keywordsCode) {
		    this.timer = setTimeout(() => {
				this.$refs.all.getdata();
		    }, 200);
		} else {
		    // 输入框中的内容被删为空时触发，此时会清除之前展示的搜索结果
		    this.getdata();
		}
	},
	//获取数据
	getdata(){
		this.$axios.post('/c2/patient/items',qs.stringify({
			kw : this.list.keywords,
			hospitalId : this.account.hospitalId,
			clinicId : this.account.itemId,
			pn : 1,
			ps : 10,
			pushTimeStart : this.Time.pushStart,
			pushTimeEnd : this.Time.pushOver,
			hospitalConfirmTimeStart : this.Time.confirmStart,
			hospitalConfirmTimeEnd : this.Time.confirmOver,
		}))
		.then(_d => {
			this.selectValue =[];
			this.page = 2;
			console.log( _d.data.data.items.length)
			if( _d.data.data.items.length != 0){
				for (let nums in _d.data.data.items) {
					// this.clinicDetails.push(_d.data.data.items[nums]);
					console.log(_d.data.data.items[nums].status)
					if(_d.data.data.items[nums].status == 1){
						this.selectValue.push({
							clinicName : _d.data.data.items[nums].clinicName,
							itemId : _d.data.data.items[nums].itemId,
							pushTime : _d.data.data.items[nums].pushTime,
							realname : _d.data.data.items[nums].realname,
							status : _d.data.data.items[nums].status,
							img : "static/iOS切图/orange@2x.png",
							button : "确认就诊"
						});
						this.allTitle = '已就诊' + _d.data.data.sum.totalCount
					}else if(_d.data.data.items[nums].status == 4){
						console.log(_d.data.data.items[nums].status )
						this.selectValue.push({
							clinicName : _d.data.data.items[nums].clinicName,
							itemId : _d.data.data.items[nums].itemId,
							pushTime : _d.data.data.items[nums].pushTime,
							realname : _d.data.data.items[nums].realname,
							status : _d.data.data.items[nums].status,
							img : "static/iOS切图/blue@2x.png",
							button : "已就诊",
							buttonColor : "buttonColor"
						});
					}
					console.log(this.selectValue)
				}
				
			}
		})
		.catch((err)=>{
			console.log(err);
			Dialog({ message: err});
		})
	},
	// 详情页
	detailsValueFn(_diagnosis){
		console.log(_diagnosis.itemId)
		this.detail.patientId = _diagnosis.itemId;
		console.log(this.detail.patientId)	
	},
	//显示筛选弹窗
	showPopup() {
	   this.show = true;
	},
	dateFn(e){
		console.log(e)
	},
	...mapActions(['labelLabelFn','dateConfirm','closeFn','screeningSubmit','screeningResult','confirm','cancel','hospitalSubmit'])
  },
}
</script>
<style scoped>
.index{
	width: 100%;
	background-color: #F5F5F5;
}
.navWarp{
	/* background-color: #FFFFFF; */
	/* height: 1rem; */
	height: 100%;
}
.topNav{
	height: .8rem;
	/* height: .335rem; */
	/* width: 3.75rem; */
	line-height:.335rem;
	width: 100%;
	padding-top: 0.14rem;
	background:url('../../../../static/门诊端/iOS切图/BJ-blue.png');
	background-size:100% 100%;
	position: relative;
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
	height: .335rem;
	display: inline-block;
	/* width: 3.07rem; */
	width: 72%;
	float: left;
	position: relative;
	z-index: 999;
}
.indexSearch img{
	position: absolute;z-index: 9;left: .13rem;top: .09rem;
	height: .15rem;width:.14rem;
}
.indexSearch input{
	border-radius: .18rem;border: none;
	height: .335rem;width: 2.4rem;
	/* margin:.09rem .12rem 0rem .16rem; */
	/* padding:0 0 0 .39rem; */
	/* margin-left: 0.16rem; */
	padding: 0;
	width: 82.5%;
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
.indexScreening{
	display:inline-block;
	/* width: .43rem; */
	width: 18%;
	float: right;
	text-align: center;
	z-index: 999;
}
.indexScreening span{
	width: .15rem;height: .21rem;
	margin: .65rem .02rem .06rem 0rem;
	color: #FFFFFF;font-size: .15rem;
	z-index: 3;
	position:relative;
}
.indexScreening img{
	height: .13rem;width: .12rem;margin-right: .16rem;
}
.indexFrom label{
	background: red;
}
#indexLabel{
	width: 85.5%;
	padding: .32rem .2rem .25rem .2rem;
	position: relative;
}
.labelLabel{
	height: .95rem;
}
.labelLabel:first-child{
	height: .95rem;
	border-bottom: 1px dotted  rgba(0, 0, 0, 0.4);
}
.labelLabel strong{
	display: block;
}
.rightLine{
	margin-right: .25rem;
}
.rightLine:after{
	content: " ";
	position: absolute;
	height: .01rem;
	width: .15rem;
	bottom: 0;
	top: 50%;
	left:107%;
	background-color: #999999;
	
}
.labelLabel button{
	height: .3rem;width: 1.05rem;
	margin-top: .1rem;
	border-radius: .15rem;
	border: none;background: #EEEEEE;
	text-align: center;position: relative;
}
.LabelResult{
	position: fixed;bottom: .25rem;right: .2rem;
}
.LabelResult button:first-child{
	border: none;height: .3rem;text-align: center;width: .8rem;
	border-radius: 100px  0px  0px  100px;
	background-color: #1ECAC6;
}
.LabelResult button:last-child{
	border: none;height: .3rem;text-align: center;width: .8rem;
	border-radius:0px 100px 100px 0px;
	background-color: #FF951B;
}
.typeNav{
	width: 100%;
	height: 100%;
	margin-top: -.45rem;
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
}
</style>