<template>
	<div class="clinicDetails">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/img/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>{{this.clinicDetails.name}}</h3>
			</div>
			<router-link :to="{name : 'hospital_addCLinic' ,params : {item : list.clinicId}}">
				<div class="right">
					<img src="static/img/Preview@2x.png" alt="">
				</div>
			</router-link>
		</div>
		<div class="detailsTime">
			<span>{{moment(this.clinicDetails.alterTime).format('YYYY-MM-DD HH:mm')}}</span>
		</div>
		<div class="statistics">
			<van-circle v-model="list.yesNum" :rate="list.yesNum" :stroke-width="120" layer-color="#FF951B" color = '#2B77EF'
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
				<h4>病原列表</h4>
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
			// 图形统计值
			currentRate: 30,
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
	},
	components:{
		clinicAll,clinicYes,clinicNo
	},
	created () {
		
	},
	mounted () {
		this.ItemIdFn();
		this.$route.params.item?  this.ItemIdFn() : this.list.clinicId = '';
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
			this.list.clinicId = this.$route.params.item.itemId;
			this.$axios.post('/c2/clinic/item',qs.stringify({
				itemId : this.list.clinicId,
			}))
			.then(_d => {
				this.clinicDetails = {}
				this.clinicDetails = _d.data.data;
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
			console.log(this.list.allNum)
		},
	},
}
</script>

<style scoped>
.clinicDetails{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	background-color: #FFFFFF;
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
}
.detailsTime span{
	color: #999999;
}
.statistics{
	width: 65.06%;
	margin: 0rem auto;
	margin-top: .25rem;
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
</style>
