<template>
  <div class="_search">
		<div class="top_search">
			<div class="search_return">
				<a @click="goBackFn">
					<img src="../../../../static/iOS切图/shape@2x.png" alt="">
				</a>
			</div>
			<div class="search_input">
				<img src="../../../../static/iOS切图/sousuo@2x.png" alt="">
				<input type="text" placeholder="搜索病源" v-model="keywords" @keyup="inputNow">
			</div>
			<div class="screening" @click="showPopup">
				<span>筛选</span>
				<img src="../../../../static/iOS切图/screening.png" alt="">
			</div>
			<van-popup v-model="show" position="right" :style="{ height: '100%',width:'78.7%'}">
				<div id="indexLabel" v-model="Time">
					<div class="labelLabel" >
						<strong>状态</strong>
						<button   @click="labelLabelFn([0,$event])" :id="labelDocument[0]">未就诊</button>
						<button @click="labelLabelFn([1,$event])" :id="labelDocument[1]">已就诊</button>
					</div>
					<div class="labelLabel" >
						<strong>确认就诊时间</strong>
						<button class="rightLine" @click="labelLabelFn([2,$event])" :id="labelDocument[2]">
							{{Time.confirmStart}}
						</button>
						<button  @click="labelLabelFn([3,$event])" :id="labelDocument[3]">
							{{Time.confirmOver}}
						</button>
					</div>
					<div class="labelLabel">
						<strong>门诊推送时间</strong>
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
			<van-popup @click="closeFn" v-model="showTime" position="bottom" :style="{ height: '40%',width:'100%'}">
				<van-datetime-picker
				  type="date"
				  @confirm="confirm"
				  @cancel="cancel"
				/>
			</van-popup>
		</div>
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh" style=" overflow: none!important;">
			<ul class="search_content" v-model="search_userList">
				<router-link to="/outpatient_details" >
					<li v-for="(_user,inx) in search_userList" :key="inx" @click="detailsValueFn(_user)">
						<div class="content_left">
							<span>{{_user.realname}}</span>
						</div>
						<div class="content_right">
							<img :src='_user.imgUrl'>
							<span>{{_user.span}}</span>
						</div>
						<p>{{moment(_user.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
					</li>
				</router-link>
			</ul>
		</van-pull-refresh>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'index_search',
  data () {
    return {
     	keywords : '',
     	
     	isLoading: false,
		
		timer :undefined
    }
  },
  computed:{
	...mapGetters(['Time','labelDocument','show','showTime','detail','account','search_userList']),
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
	search_userList: {
	    get: function() {
			// console.log(this.$store)
	        return this.$store.state.shop.search_userList
	    },
	    set: function (newValue) {
			this.$store.state.shop.search_userList = newValue;
	    },
	},
  },
  created () {
		
  },
  mounted () {
	this.getdata();
  },
  methods: {
	//显示筛选弹窗
	showPopup() {
	   this.show = true;
	},
	//获取数据
	getdata(){
		console.log(this.Time)
		this.$axios.post('/c2/patient/items',qs.stringify({
			kw : this.keywords,
			clinicId : this.account.clinicId,
			// pushTimeStart : this.Time.pushStart,
			// pushTimeEnd : this.Time.pushOver,
			status : this.Time.postState,
			// hospitalConfirmTimeStart : this.Time.confirmStart,
			// hospitalConfirmTimeEnd : this.Time.confirmOver,
		}))
		.then(_d => {
			// console.log(_d.data.data.items)
			this.search_userList = _d.data.data.items
			for(var i in _d.data.data.items){
				if(_d.data.data.items[i].status == 1){
					_d.data.data.items[i].span = '未就诊'
					_d.data.data.items[i].imgUrl = '../../../../static/门诊端/iOS切图/weijiuzhen@2x.png'
				}else{
					_d.data.data.items[i].span = '已就诊'
					_d.data.data.items[i].imgUrl = '../../../../static/门诊端/iOS切图/yijiuzhen@2x.png'
				}
				// console.log(_d.data.data.items[i].status)
			}
					
		})
		.catch((err)=>{
			console.log(err);
			Dialog({ message: '加载失败!'});
		})
	},
	//刷新数据方法
  	onRefresh(){
  		this.getdata();
		this.isLoading = false;
  	},
	//键盘输入值时触发
  	inputNow(_keywordsCode){
		//清除计时器
		if (this.timer) {
		    clearTimeout(this.timer);
		}
		if (_keywordsCode) {
		    this.timer = setTimeout(() => {
				this.getdata();
		    }, 200);
		} else {
		    // 输入框中的内容被删为空时触发，此时会清除之前展示的搜索结果
		    this.getdata();
		}
  	},
	goBackFn(){
		this.$router.back(-1)
	},
	//详情页单个商品数据赋值
	detailsValueFn(_diagnosis){
		// console.log(_diagnosis)
		this.detail.patientId = _diagnosis.itemId;
		// console.log(this.detail)
	},
	...mapActions(['labelLabelFn','closeFn','screeningSubmit','screeningResult','confirm','cancel',])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
._search{
	position: relative;
}
.top_search{
	height: .5rem;width: 100%;
	background-color: #FFFFFF;
	position:fixed;
	top:0;
	/* margin-top: -.62rem; */
	z-index: 999;
}
.search_return{
	height: .5rem;width: 11.3%;
	float: left;
}
.search_return a{
	height: .5rem;width: 100%;
}
.search_return a img{
	width: .09rem;
	height: .16rem;
	margin: .17rem .18rem;
	
}
.search_input{
	float: left;width: 73%;
}
.search_input input{
	background-color: #F5F5F5;
	height: .3rem;
	line-height: .3rem;
	width: 86%;
	margin: .1rem 0rem;
	border: none;
	border-radius: 25px;
	position: relative;
	padding-left: .37rem;
}
.search_input img{
	height: .15rem;
	width: .15rem;
	z-index: 3;
	position: absolute;
	top: .18rem;
	left: .6rem;
}
.screening{
	float: left;
	width: 15.7%;
	height: .5rem;
	line-height: .5rem;
}
.screening span{
	font-weight: bold;
	margin-left: .05rem;
}
.screening img{
	height: .13rem;
	width: .12rem;
}
.search_content{
	margin: 0 .12rem;
}
.search_content li {
	height:1.01rem;
	margin-top:.12rem;
	background-color:#FFFFFF;
	position:relative;
	/* padding:.14rem .15rem; */
}
.search_content li:first-child{
	margin-top: .62rem;
}
.search_content li p{
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
>>>[data-v-6bfd94e2] .van-pull-refresh{
    overflow: visible!important;
    -webkit-user-select: none;
    user-select: none;
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
</style>
