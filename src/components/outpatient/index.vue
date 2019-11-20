<template>
  <div class="index">
		<div class="navWarp">
			<!-- 搜索及其筛选 -->
			<div class="topNav">
				<div class="indexSearch">
					<router-link to="/outpatient_search">
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
							<strong>状态</strong>
							<button   @click="labelLabelFn([0,$event])" :id="labelDocument[0]">未就诊</button>
							<button @click="labelLabelFn([1,$event])" :id="labelDocument[1]">已就诊</button>
						</div>
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
					<van-tab title="新增病源">
						<form @submit.prevent="hospitalSubmit" class="newAdd">
							<div class="newAddTitle">
								<img src="static/iOS切图/bitian@2x.png" alt="">
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
										<input type="text" v-model="account.user.idcardNo" maxlength="18"  οninput="value= value.replace(/[^\d|xX]/g,'')" placeholder="请填写">
									</li>
								</ul>
							</div>
							<div class="newAddTitle bottom">
								<img src="static/iOS切图/bitian@2x.png" alt="">
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
					<van-tab :title=noTitle class="Already" @click="testClick()">
						<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
							<div class="list">
								<ul :model="message" class="index_content">
									<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad">
										<router-link to="/outpatient_details" >
											<li v-for="(_notDiagnosis,inx) in message.notDiagnosis" :key="inx" @click="detailsValueFn(_notDiagnosis)">
												<div class="content_left">
													<span>{{_notDiagnosis.realname}}</span>
												</div>
												<div class="content_right">
													<img src='static/门诊端/iOS切图/weijiuzhen@2x.png'>
													<span class="AlreadySpanColor">未就诊</span>
												</div>
												<p>{{moment(_notDiagnosis.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
											</li>
										</router-link>
									</van-list>
								</ul>
							</div>
						</van-pull-refresh>
				  </van-tab>
				  <van-tab :title=yesTitle class="Already" >
						<van-pull-refresh v-model="isLoading" @refresh="onRefresh2">
							<ul class="index_content" :model="message">
								<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoadss">
									<router-link to="/outpatient_details" >
										<li v-for="(_diagnosis,inx) in message.diagnosis" :key="inx" @click="detailsValueFn(_diagnosis)">
											<div class="content_left">
												<span>{{_diagnosis.realname}}</span>
											</div>
											<div class="content_right">
												<img src='static/门诊端/iOS切图/yijiuzhen@2x.png'>
												<span>已就诊</span>
											</div>
											<p>{{moment(_diagnosis.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
										</li>
									</router-link>
								</van-list>
							</ul>
						</van-pull-refresh>
					</van-tab>
				</van-tabs>
			</div>
		</div>
		<routerNav v-bind:name='name'></routerNav>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import routerNav from './childPage/router.vue'
export default {
  name: 'index',
  data () {
    return {
		name: 'index',
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
		 // 数据全部加载完成
		loading: false,
		// 加载状态结束
		finished: false,
		//显示下拉加载
		isLoading: false
    }
  },
  mounted(){
	// //未就诊请求
	this.$axios.post('/c2/patient/items',qs.stringify({
		status : 1 ,
		pn : 1,
		ps : 10
	}))
	.then(_d => {
		if(_d.data.data.items.length != 0){
			setTimeout(() => {
				for (let nums in _d.data.data.items) {
				    this.message.notDiagnosis.push(_d.data.data.items[nums]);
				 }
			}, 300);
			this.noTitle = '未就诊' + _d.data.data.sum.totalCount
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
	//已就诊
	this.$axios.post('/c2/patient/items',qs.stringify({
		status : 4 ,
		pn : 1,
		ps : 10
	}))
	.then(_d => {
		if(_d.data.data.items.length != 0){
			setTimeout(() => {
				for (let nums in _d.data.data.items) {
				     this.message.diagnosis.push(_d.data.data.items[nums]);
				}
			}, 300);
			this.yesTitle = '已就诊' + _d.data.data.sum.totalCount
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
	  routerNav
  },
  methods:{
	detailsValueFn(_diagnosis){
		// console.log(_diagnosis)
		this.detail.patientId = _diagnosis.itemId;
		// console.log(this.detail)
	},
	//上拉加载数据
	onLoad(){
	  this.getdata(1,this.message.notDiagnosis,1);
	},
	//上拉加载数据
	onLoadss(){
	    this.getdata2(4,this.message.diagnosis,1);
	},
	//下拉刷新数据
	onRefresh(){
		this.message.notDiagnosis = []
		this.getdata(1,this.message.notDiagnosis,0);
	},
	//下拉刷新数据
	onRefresh2(){
		this.message.diagnosis = []
		this.getdata2(4,this.message.diagnosis,0);
	},
	//下拉加载获取数据
	getdata(data,_value,shuaxin){
		if(shuaxin ==0 ){
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw	:	"",
				clinicId : this.account.data.data.clinic.clinicId,
				name : "",
				hospitalId : this.account.data.data.hospital.hospitalId,
				status : data ,
				orders : 'asc',
				pn : 1,
				ps : 10
			}))
			.then(_d => {
				if(_d.data.data.items.length != 0){
					// console.log(this.page)
					for (let nums in _d.data.data.items) {
					    _value.push(_d.data.data.items[nums]);
					}
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					this.noTitle = '未就诊' + _d.data.data.sum.totalCount
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
				clinicId : this.account.data.data.clinic.clinicId,
				name : "",
				hospitalId : this.account.data.data.hospital.hospitalId,
				status : data ,
				orders : 'asc',
				pn : this.page,
				ps : 10
			}))
			.then(_d => {
				if(_d.data.data.items.length != 0){
					// console.log(this.page)
					for (let nums in _d.data.data.items) {
					    _value.push(_d.data.data.items[nums]);
					}
					this.loading = false;
					this.page++	
					this.noTitle = '未就诊' + _d.data.data.sum.totalCount
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
	getdata2(data,_value,shuaxin){
		if(shuaxin ==0 ){
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw	:	"",
				clinicId : this.account.data.data.clinic.clinicId,
				name : "",
				hospitalId : this.account.data.data.hospital.hospitalId,
				status : data ,
				orders : 'asc',
				pn : 1,
				ps : 10
			}))
			.then(_d => {
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
					    _value.push(_d.data.data.items[nums]);
					}
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					this.noTitle = '已就诊' + _d.data.data.sum.totalCount
				}else{
					this.$notify({
						message: '数据已全部加载',
						duration: 1000,
						background:'#79abf9',
					})
					this.page2++
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
				clinicId : this.account.data.data.clinic.clinicId,
				name : "",
				hospitalId : this.account.data.data.hospital.hospitalId,
				status : data ,
				orders : 'asc',
				pn : this.page2,
				ps : 10
			}))
			.then(_d => {
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
					    _value.push(_d.data.data.items[nums]);
					}
					this.loading = false;
					this.page2++
					this.noTitle = '未就诊' + _d.data.data.sum.totalCount
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
	/* background-color:#F5F5F5!important; */
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
	background:url('../../../static/门诊端/iOS切图/BJ-blue.png');
	background-size:100% 100%;
	position: relative;
}
.indexSearch{
	height: .335rem;
	display: inline-block;
	/* width: 3.07rem; */
	width: 82%;
	float: left;
	position: relative;
	z-index: 999;
}
.indexSearch img{
	position: absolute;z-index: 9;left: .25rem;top: .09rem;
	height: .15rem;width:.14rem;
}
.indexSearch input{
	border-radius: .18rem;border: none;
	height: .335rem;width: 2.4rem;
	/* margin:.09rem .12rem 0rem .16rem; */
	/* padding:0 0 0 .39rem; */
	/* margin-left: 0.16rem; */
	padding: 0;
	width: 78%;
	padding-left: 12%;
	margin:0 5%;
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
.labelLabel:first-child button:last-child{
	margin-left: .2rem;
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
.newAdd{
	width: 100%;
	 height: 5.34rem; 
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

.index_content{
	margin: 0 .12rem;
}
.index_content li {
	height:1.01rem;
	margin-top:.12rem;
	background-color:#FFFFFF;
	position:relative;
	/*padding:.14rem .15rem;*/
}
.index_content li p{
	position:absolute;
	bottom:0;
	height:.5rem;
	width:93%;
	line-height:.5rem;
	margin-left:.14rem;
	border-top:1px solid #E5E5E5;
}
.content_left{
	float:left;
	height:.5rem;
	margin-top:.14rem;
	margin-left:.15rem;
}
.content_right{
	float:right;
	height:.5rem;
	margin-right:.14rem;
	margin-top:.15rem
}
.content_right img{
	width:.11rem;
	height:.11rem;
	margin-right:.04rem;
}
.content_right span{
	color: #4DD865;
}
.date_ctrl {
    vertical-align: middle;
    background-color: #ffffff;
    color: #000;
    margin: 0;
    height: auto;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9901;
    overflow: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
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