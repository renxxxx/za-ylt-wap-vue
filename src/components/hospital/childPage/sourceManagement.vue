<template>
  <div class="index">
		<div class="navWarp">
			<!-- 搜索及其筛选 -->
			<div class="topNav">
				<div class="indexReturn">
					<img src="static/iOS切图/back-white@2x.png" alt="">
				</div>
				<div class="indexSearch">
					<router-link to="">
						<img src="static/iOS切图/sousuo@2x.png" alt="">
						<input type="text" placeholder="搜索病源" autofocus="autofocus">
					</router-link>
				</div>
				<div class="indexScreening" @click="showPopup">
					<span>筛选</span>
					<img src="static/iOS切图/screen@2x.png" alt="加载中" >
				</div>
				<van-popup v-model="show" position="right" :style="{ height: '100%',width:'78.7%'}">
					<div id="indexLabel" v-model="Time">
						<div class="labelLabel" >
							<strong>就诊时间</strong>
							<button class="rightLine" @click="labelLabelFn([2,$event])" :id="labelDocument[2]">
								{{Time.confirmStart}}
							</button>
							<button  @click="labelLabelFn([3,$event])" :id="labelDocument[3]">
								{{Time.confirmOver}}
							</button>
						</div>
						<div class="labelLabel">
							<strong>推送时间</strong>
							<button class="rightLine"  @click="labelLabelFn([4,$event])"  :id="labelDocument[4]">
								{{Time.pushStart}}
							</button>
							<button  @click="labelLabelFn([5,$event])"  :id="labelDocument[5]">
								{{Time.pushOver}}
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
			<div class="typeNav" :v-model="message">
				<van-tabs background='none' line-width=.6rem title-inactive-color='#FFFFFF' title-active-color='#FFFFFF'>
					<van-tab :title=allTitle>
						<van-pull-refresh v-model="isLoading" @refresh="allRefresh">
							<ul class="content">
								<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @load="allOnLoad">
									<li v-for="(item,inx) in message.notDiagnosis" :key="inx">
										<div class="contentTitle">
											<img src="static/iOS切图/orange@2x.png" alt="">
											<span>{{item.realname}}</span>
										</div>
										<div class="contnet_left">
											<span>{{moment(item.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
											<span>所属门诊：{{item.clinicName}}</span>
										</div>
										<div class="content_right">
											<button>确认就诊</button>
										</div>
									</li>
									<li v-for="(item,inx) in message.diagnosis" :key="inx+'11'">
										<div class="contentTitle">
											<img src="static/iOS切图/blue@2x.png" alt="">
											<span>{{item.realname}}</span>
										</div>
										<div class="contnet_left">
											<span>{{moment(item.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
											<span>所属门诊：{{item.clinicName}}</span>
										</div>
										<div class="content_right">
											<button class="buttonColor">已就诊</button>
										</div>
									</li>
								</van-list>
							</ul>
						</van-pull-refresh>
					</van-tab>
					<van-tab :title=noTitle class="Already">
						<van-pull-refresh v-model="isLoading" @refresh="noRefresh">
							<ul class="content">
								<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @load="noOnLoad">
									<li v-for="(item,inx) in message.notDiagnosis" :key="inx">
										<div class="contentTitle">
											<img src="static/iOS切图/orange@2x.png" alt="">
											<span>{{item.realname}}</span>
										</div>
										<div class="contnet_left">
											<span>{{moment(item.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
											<span>所属门诊：{{item.clinicName}}</span>
										</div>
										<div class="content_right">
											<button>确认就诊</button>
										</div>
									</li>
								</van-list>
							</ul>
						</van-pull-refresh>
					</van-tab>
					<van-tab :title=yesTitle class="Already" >
						<van-pull-refresh v-model="isLoading" @refresh="yesRefresh">
							<ul class="content">
								<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @load="yesOnLoad">
									<li v-for="(item,inx) in message.diagnosis" :key="inx+'11'">
										<div class="contentTitle">
											<img src="static/iOS切图/blue@2x.png" alt="">
											<span>{{item.realname}}</span>
										</div>
										<div class="contnet_left">
											<span>{{moment(item.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
											<span>所属门诊：{{item.clinicName}}</span>
										</div>
										<div class="content_right">
											<button class="buttonColor">已就诊</button>
										</div>
									</li>
								</van-list>
							</ul>
						</van-pull-refresh>
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
export default {
  name: 'index',
  data () {
    return {
		name: 'index',
		allTitle: '全部',
		noTitle:'未就诊',
		yesTitle:'已就诊',
		//获取动态数据
		message:{
			//未就诊
			notDiagnosis:[],
			//未就诊
			diagnosis:[],
		},
		//页数
		page : 2,
		page2 : 2,
		allPage:2,
		allPage2:2,
		 // 数据全部加载完成
		loading: false,
		// 加载状态结束
		finished: false,
		//显示下拉加载
		isLoading: false,
		sunNum:0,
    }
  },
  mounted(){
	  this.getdata(1,1,5);
	  this.getdata(4,1,5);
  },
  computed:{
	...mapGetters(['Time','labelDocument','showTime','show','account']),
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
	  
  },
  methods:{
	getdata(_data,_pn,_ps){
		this.$axios.post('/c2/patient/items',qs.stringify({
			kw	:	"",
			hospitalId : this.account.data.data.hospital.hospitalId,
			status : _data,
			pn : _pn,
			ps : _ps,
		}))
		.then(_d => {
			if(_d.data.data.items.length != 0){
				if(_data == 1){
					for (let nums in _d.data.data.items) {
						this.message.notDiagnosis.push(_d.data.data.items[nums]);
					}
					this.sunNum += _d.data.data.sum.totalCount
					console.log(this.sunNum)
					this.noTitle = '未就诊' + _d.data.data.sum.totalCount
				}else{
					for (let nums in _d.data.data.items) {
						this.message.diagnosis.push(_d.data.data.items[nums]);
					}
					this.sunNum += _d.data.data.sum.totalCount
					console.log(this.sunNum)
					this.yesTitle = '已就诊' + _d.data.data.sum.totalCount
				}
				this.isLoading = false;
				// 加载状态结束
				this.loading = false;
				
				// console.log(this.message)
				this.allTitle = '全部' + this.sunNum
			}else{
				this.$notify({
					message: '数据已全部加载',
					duration: 1000,
					background:'#79abf9',
				})
				this.loading = false;
				this.finished = true;
			}
		})
		.catch((err)=>{
			console.log(err);
			Dialog({ message: '加载失败!'});
		})
	},
	allNextdata(_data,_ps){
		if(_data == 1){
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw	:	"",
				hospitalId : this.account.data.data.hospital.hospitalId,
				status : _data,
				pn : this.allPage,
				ps : _ps,
			}))
			.then(_d => {
				this.allPage++;
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
						this.message.notDiagnosis.push(_d.data.data.items[nums]);
					}
					this.noTitle = '未就诊' + _d.data.data.sum.totalCount;
					
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					// console.log(this.message)
				}else{
					this.$notify({
						message: '数据已全部加载',
						duration: 1000,
						background:'#79abf9',
					})
					this.loading = false;
					this.finished = true;
				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: '加载失败!'});
			})
		}else{
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw	:	"",
				hospitalId : this.account.data.data.hospital.hospitalId,
				status : _data,
				pn : this.allPage2,
				ps : _ps,
			}))
			.then(_d => {
				this.allPage2++;
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
						this.message.diagnosis.push(_d.data.data.items[nums]);
					}
					this.yesTitle = '已就诊' + _d.data.data.sum.totalCount
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					// console.log(this.message)
				}else{
					this.$notify({
						message: '数据已全部加载',
						duration: 1000,
						background:'#79abf9',
					})
					this.loading = false;
					this.finished = true;
				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: '加载失败!'});
			})
		}
	},
	nextdata(_data,_ps){
		if(_data == 1){
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw	:	"",
				hospitalId : this.account.data.data.hospital.hospitalId,
				status : _data,
				pn : this.page,
				ps : _ps,
			}))
			.then(_d => {
				this.page++;
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
						this.message.notDiagnosis.push(_d.data.data.items[nums]);
					}
					this.noTitle = '未就诊' + _d.data.data.sum.totalCount;
					
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					// console.log(this.message)
				}else{
					this.$notify({
						message: '数据已全部加载',
						duration: 1000,
						background:'#79abf9',
					})
					this.loading = false;
					this.finished = true;
				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: '加载失败!'});
			})
		}else{
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw	:	"",
				hospitalId : this.account.data.data.hospital.hospitalId,
				status : _data,
				pn : this.page2,
				ps : _ps,
			}))
			.then(_d => {
				this.page2++;
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
						this.message.diagnosis.push(_d.data.data.items[nums]);
					}
					this.yesTitle = '已就诊' + _d.data.data.sum.totalCount
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					// console.log(this.message)
				}else{
					this.$notify({
						message: '数据已全部加载',
						duration: 1000,
						background:'#79abf9',
					})
					this.loading = false;
					this.finished = true;
				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: '加载失败!'});
			})
		}
		
	},
	detailsValueFn(_diagnosis){
		// console.log(_diagnosis)
		this.detail.patientId = _diagnosis.itemId;
		// console.log(this.detail)
	},
	//上拉加载数据
	allOnLoad(){
		this.allNextdata(1,5);
		this.allNextdata(4,5);
	},
	//下拉刷新数据
	allRefresh(){
		this.sunNum=0;
		this.allPage = 2;
		this.allPage2 = 2;	
		this.message.notDiagnosis = [];
		this.message.diagnosis = [];
		this.getdata(1,1,5);
		this.getdata(4,1,5);
		console.log(this.message)
	},
	noRefresh(){
		this.sunNum=0;
		this.page = 2;
		this.message.notDiagnosis = [];
		this.getdata(1,1,10);
		console.log(this.message)
	},
	noOnLoad(){
		this.nextdata(1,10);
	},
	yesRefresh(){
		this.sunNum=0;
		this.page2 = 2;
		this.message.diagnosis = [];
		this.getdata(4,1,10);
		console.log(this.message)
	},
	yesOnLoad(){
		this.nextdata(4,10);
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
	margin-top: -.65rem;
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