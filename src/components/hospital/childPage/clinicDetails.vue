<template>
	<div class="clinicDetails">
		<div class="topNav" :style="{'padding-top': height+'px'}">
			<div class="leftImg" @click="goBackFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>{{this.clinicDetails.name}}</h3>
			</div>
			<router-link :to="{name : 'hospital_clinicInfo' ,query : {item : clinicDetails.clinicId}}">
				<div class="right">
					<img src="../../../assets/image/Preview@2x.png" alt="">
				</div>
			</router-link>
		</div>
		<div class="detailsTime" :style="{'top': (height+47)+'px'}">
			<span>{{moment(this.clinicDetails.alterTime).format('YYYY-MM-DD HH:mm')}}</span>
		</div>
		<div class="zhangwei"></div>
		<div class="statistics" :style="{'padding-top': height+'px'}">
			<van-circle v-model="num" :rate="num" :speed="100" :stroke-width="120" layer-color="#FF951B" color = '#2B77EF'
			  size="1.15rem" :text="String(list.yesNum + list.noNum)" />
			<div class="statisticsText">
				<div class="noText">
					<span>未就诊：{{list.noNum}}</span>
				</div>
				<div class="yesText">
					<span>已就诊：{{list.yesNum}}</span>
				</div>
			</div>
		</div>
		<div class="detailsList">
			<div class="listLeft">
				<h4>病员列表</h4>
			</div>
			<div class="listRight">
				<van-dropdown-menu >
					<van-dropdown-item v-model="value" :options="option" @change="menuFn"/>
				</van-dropdown-menu>
			</div>
		</div>
		<keep-alive>
			<component v-bind:is="componentName"  ref='clinicAll' v-bind:list = 'list'></component>
		</keep-alive>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import clinicAll from '../../common/functionPage/clinicAll.vue'
import clinicYes from '../../common/functionPage/clinicYes.vue'
import clinicNo from '../../common/functionPage/clinicNo.vue'
export default {
	name: 'case',
	data () {
		return {
			// 就诊状态选项值
			value: 0,
			option: [
			    { text: '全部', value: 0 },
			    { text: '未就诊', value: 1 },
			    { text: '已就诊', value: 2 },
			],
			// 组件切换值
			componentName :'clinicAll',
			clinicDetails : {},
			list:{
				name:'',
				keywords : '',			//搜索框的关键字value
				allTitle: '全部',
				noTitle:'未就诊',
				yesTitle:'已就诊',
				noNum : 0,
				yesNum : 0,
				allNum : 0,
				clinicId: '',
				clinicAll : [],
				clinicNo : [],
				clinicYes : [],
				data: true,
			},
		}
	},
	computed:{
		...mapGetters(['account']),

		num: {
			get: function() {
				// console.log(this.$store)
				return this.list.yesNum /(this.list.yesNum + this.list.noNum)*100;
			},
			set: function (newValue) {
				// 图形数据加载后v-model返回的修改值,暂时项目不需要
				// console.log(newValue)
			},
		}
	},
	components:{
		clinicAll,clinicYes,clinicNo
	},
	created(){
		var heightRexg = /^[0-9]*/g
		var topHeight = this.topHeight.match(heightRexg)
		this.height = parseInt(topHeight.join()) 
		console.log(this.height)
	},
	beforeRouteLeave(to, from, next) {
     ;
    this.scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
     ;
    next(vm => {
      document.body.scrollTop = vm.scrollTop;
    });
  }, activated() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		// this.ItemIdFn();
		this.$route.query.clinicId?  this.ItemIdFn() : this.list.clinicId = '';
		this.getNum();
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
		// 列表来回切换组件
		menuFn(){
			// let _geneData =  this.option.find( n => n.value == this.value);
			// console.log('ss')
			switch(this.value){
				case 0:
				this.componentName = 'clinicAll';
				break;
				case 1:
				this.componentName = 'clinicNo';
				break;
				case 2:
				this.componentName = 'clinicYes';
				break;
			}
		},
		ItemIdFn(){
			this.list.clinicId = this.$route.query.clinicId;
			this.$axios.post('/c2/clinic/item',qs.stringify({
				itemId : this.list.clinicId,
			}))
			.then(_d => {
				// this.clinicDetails = {}
				this.clinicDetails = _d.data.data;
				this.clinicDetails.clinicId = this.list.clinicId;
				console.log(this.clinicDetails)
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: err});
			})
		},
		getNum(){
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw : this.list.keywords,
				hospitalId : this.account.hospitalId,
				clinicId : this.list.clinicId,
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
				clinicId : this.list.clinicId,
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
			this.list.allNum = this.list.noNum + this.list.yesNum;
			// console.log(this.list.allNum)
		},
	},
}
</script>

<style scoped>
.clinicDetails{
	width: 100%;
	/* padding-top: .47rem; */
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	background-color: #FFFFFF;
	position: fixed;
	top: 0;
	z-index: 999;
}
.zhangwei{
	width: 100%;
	height: .47rem;
}
.leftImg{
	width: 10%;
	height: .47rem;
	float:left;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
	line-height: .47rem;
	padding-left: .16rem;
}
.centerTitle{
	width: 80%;
	text-align: center;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.centerTitle h3{
	font-size: .16rem;
	font-weight: bolder;
}
.right{
	width: 10%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.right img{
	width: .19rem;
	height: .2rem;
}
.detailsTime{
	/* float: left; */
	height: .15rem;
	line-height: .15rem;
	width: 100%;
	text-align: center;
	position: fixed;
	z-index: 9999;
	background: #FFFFFF;
}
.detailsTime span{
	color: #999999;
}
.statistics{
	width: 65.06%;
	margin: 0rem auto;
	margin-top: .47rem;
}
.statisticsText{
	width: .8rem;
	height: .54rem;
	/* display: inline-block; */
	float: right;
	margin: .31rem 0rem;
	margin-left: .4rem;
}
.noText {
	height: .21rem;
	color: #333333;
	margin-bottom: .12rem;
	position:relative;
}
.noText span:before {
    content: "";
    display: inline-block;
	width: .06rem;
	height: .06rem;
    background-color: #FF951B;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* border-radius: 3px; */
    position: absolute;
    top: .06rem;
    left: -.1rem;
}
.yesText {
	height: .21rem;
	color: #333333;
	position:relative;
}
.yesText span:before {
    content: "";
    display: inline-block;
	width: .06rem;
	height: .06rem;
    background-color: #2B77EF;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* border-radius: 3px; */
    position: absolute;
    top: .06rem;
    left: -.1rem;
}
.detailsList{
	height: .3rem;
	width: 91.46%;
	margin: 0rem auto;
	margin-top: .29rem;
}
.listLeft{
	float: left;
	height: .3rem;
	line-height: .3rem;
}
.listRight{
	float: right;
	width: .95rem;
	height: .3rem;
	z-index: 9999;
}
>>>.van-dropdown-menu__item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    min-width: 0;
    height: .28rem;
	border:1px solid #2B77EF;
	border-radius: .15rem;
}
>>>.van-dropdown-menu {
    height: 30px;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
}
>>>.van-dropdown-item--down {
    bottom: 0;
	top: 280px
}
>>>.van-pull-refresh__head {
    position: absolute;
    top: -40px;
    left: 0px;
    width: 100%;
    height: 40px;
    overflow: hidden;
    color: #969799;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    z-index: -1!important;
}
/* >>>.van-circle svg, .van-loading__spinner--spinner i {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
>>>.van-circle__text {
    z-index: -1;
} */
</style>
