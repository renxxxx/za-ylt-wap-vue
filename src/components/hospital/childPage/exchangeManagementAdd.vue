<template>
	<div class="exchangeAdd">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/img/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>推送通知</h3>
			</div>
			<div class="right">
				<button v-show=" this.$route.params.item? true:false" @click="modifyFn">修改</button>
				<button v-show=" this.$route.params.item? false:true" @click="nextFn">下一步</button>
			</div>
		</div>
		<ul>
			<li>
				<span>商品名称</span>
				<p>
					<input type="text" v-model="exchangeAdd.name">
				</p>
			</li>
			<li>
				<span>单个积分</span>
				<p>
					<input type="text" v-model="exchangeAdd.payExchangepoint"> 分
				</p>
			</li>
			<li>
				<span>总数量</span>
				<p>
					<input type="text" oninput="value=value.replace(/[^\d]/g,'')"  v-model="exchangeAdd.stock"> 个
				</p>
			</li>
			<li>
				<span>简介</span>
				<span v-show="exchangeAdd.intro? false:true">请输入</span>
				<textarea v-model="exchangeAdd.intro"></textarea>				
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'exchangeAdd',
	data () {
		return {
			
		}
	},
	computed:{
		...mapGetters(['account']),
		exchangeAdd: {
		    get: function() {
				// console.log(this.$store)
		        return this.$store.state.shop.exchangeAdd
		    },
		    set: function (newValue) {
				this.$store.state.shop.exchangeAdd = newValue;
		    },
		},
	},
	components:{
		
	},
	created () {
		
	},
	mounted () {
		this.$route.params.item? this.exchangeAdd = {
			name : this.$route.params.item.name,
			payExchangepoint : this.$route.params.item.payExchangepoint,
			stock : this.$route.params.item.stock,
			intro : this.$route.params.item.intro,
			cover : this.$route.params.item.cover,
			show : true,
		}:''
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1);
			// this.$router.back({ name : 'hospital_exchangeManagement'});
		},
		nextFn(){
			if(this.exchangeAdd.name != ''){
				if(this.exchangeAdd.payExchangepoint != ''){
					if(this.exchangeAdd.stock != ''){
						if(this.exchangeAdd.intro != ''){
							this.$router.push({ name : 'hospital_exchangeManagementImg',params : {exchangeAdd : this.exchangeAdd}});
						}else{
							Toast.fail('请填写简介');
						}
					}else{
						Toast.fail('请填写数量');
					}
				}else{
					Toast.fail('请填写积分');
				}
			}else{
				Toast.fail('请填写名称');
			}
		},
		modifyFn(){
			this.$axios.post('/c2/commodity/itemalter',qs.stringify({
				hospitalId : this.account.hospitalId,
				itemId : this.$route.params.item.itemId,
				name : this.exchangeAdd.name,
				cover : this.exchangeAdd.cover,
				intro : this.exchangeAdd.intro,
				stock: this.exchangeAdd.stock,
				payExchangepoint : this.exchangeAdd.payExchangepoint,
			})).then(res =>{
				
			}).catch(err =>{
				console.log(err)
			})
		}
	},
}
</script>

<style scoped>
.exchangeAdd{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	margin-bottom: .15rem;
	background-color: #FFFFFF;
	border-bottom: 1px solid #D8D8D8;
}	
.leftImg{
	width: 18%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
	line-height: .47rem;
	padding-left: .16rem;
}
.centerTitle{
	width: 64%;
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
	width: 18%;
	height: .47rem;
	line-height: .47rem;
	float:right;
}
.right button{
	width: .56rem;
	height: .3rem;
	line-height: .3rem;
	text-align: center;
	color: #FFFFFF;
	background-color: #2B77EF;
	border: none;
	border-radius: .03rem;
}
.exchangeAdd ul{
	width: 100%;
}
.exchangeAdd ul li{
	width: 91.46%;
	height: .45rem;
	line-height: .45rem;
	margin: 0 auto;
	border: 1px solid #D8D8D8;
	margin-bottom: .12rem;
}
.exchangeAdd ul li:last-child{
	height: 3.65rem;
	line-height: normal;
	padding-top: .12rem;
}
.exchangeAdd ul li:last-child span:nth-child(2){
	color: #2B77EF;
}
.exchangeAdd ul li span{
	font-size: .14rem;
	margin-left: .15rem;
	color: #333333;
}
.exchangeAdd>ul>li>span:nth-child(2){
	float: right;
	margin-right: .15rem;
	color: #666666;
}
.exchangeAdd ul li p{
	float: right;
	margin-right: .15rem;
	font-size: .14rem;
}
.exchangeAdd ul li p>input{
	border: none;
	height: .43rem;
	text-align: right;
	color: #2B77EF;
}
.exchangeAdd ul li textarea{
	width: 91.25%;
	height: 3.3rem;
	margin: 0rem auto;
	line-height: .15rem;
	display: block;
	color: #2B77EF;
	font-size: .13rem;
	border: none;
	margin-top: .03rem;
}
</style>
