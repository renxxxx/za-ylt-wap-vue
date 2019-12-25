<template>
	<div class="exchangeEditor">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/img/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>修改商品</h3>
			</div>
			<div class="right">
				<button @click="nextFn">下一步</button>
			</div>
		</div>
		<ul>
			<li>
				<span>商品名称</span>
				<p>
					<input type="text" v-model="exchangeEditor.name">
				</p>
			</li>
			<li>
				<span>单个积分</span>
				<p>
					<input type="text" v-model="exchangeEditor.payExchangepoint"> 分
				</p>
			</li>
			<li>
				<span>总数量</span>
				<p>
					<input type="text" oninput="value=value.replace(/[^\d]/g,'')"  v-model="exchangeEditor.stock"> 个
				</p>
			</li>
			<li>
				<span>简介</span>
				<span v-show="exchangeEditor.intro? false:true">请输入</span>
				<textarea v-model="exchangeEditor.intro"></textarea>				
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Toast } from 'vant';
export default {
	name: 'exchangeEditor',
	data () {
		return {
			exchangeEditor:{
				name : '',
				payExchangepoint : 0,
				stock : 0,
				intro : '',
				cover : '',
				show : true,
			}
		}
	},
	computed:{
		...mapGetters(['account']),
	},
	components:{
		
	},
	created () {
		
	},
	mounted () {
		
		this.$axios.post('/c2/commodity/item',qs.stringify({
			hospitalId : this.account.hospitalId,
			itemId : this.$route.query.itemId
		})).then(res  =>{
			if(res.data.codeMsg){
				this.$toast.fail(res.data.codeMsg)
			}else{
				this.exchangeEditor = {
					name :res.data.data.name,
					payExchangepoint : res.data.data.payExchangepoint,
					stock : res.data.data.stock,
					intro : res.data.data.intro,
					cover : res.data.data.cover,
					itemId : this.$route.query.itemId,
				}
			}
		}).catch(err =>{
			console.log(err)
		})
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1);
			// this.$router.back({ name : 'hospital_exchangeManagement'});
		},
		nextFn(){
			if(this.exchangeEditor.name != ''){
				if(this.exchangeEditor.payExchangepoint != ''){
					if(this.exchangeEditor.stock != ''){
						if(this.exchangeEditor.intro != ''){
							console.log(this.exchangeEditor)
							this.$router.push({ name : 'hospital_exchangeEditorImg',params : {exchangeEditor : this.exchangeEditor}});
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
		// modifyFn(){
		// 	this.$axios.post('/c2/commodity/itemalter',qs.stringify({
		// 		hospitalId : this.account.hospitalId,
		// 		itemId : this.$route.query.item.itemId,
		// 		name : this.exchangeEditor.name,
		// 		cover : this.exchangeEditor.cover,
		// 		intro : this.exchangeEditor.intro,
		// 		stock: this.exchangeEditor.stock,
		// 		payExchangepoint : this.exchangeEditor.payExchangepoint,
		// 	})).then(res =>{
		// 		// console.log(res.data.codeMsg)
		// 		res.data.codeMsg?	this.$toast.fail({duration: 1000,message: res.data.codeMsg}):this.$toast.success({duration: 1000,message: '操作成功'})
		// 	}).catch(err =>{
		// 		console.log(err)
		// 	})
		// }
	},
}
</script>

<style scoped>
.exchangeEditor{
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
.exchangeEditor ul{
	width: 100%;
}
.exchangeEditor ul li{
	width: 91.46%;
	height: .45rem;
	line-height: .45rem;
	margin: 0 auto;
	border: 1px solid #D8D8D8;
	margin-bottom: .12rem;
}
.exchangeEditor ul li:last-child{
	height: 3.65rem;
	line-height: normal;
	padding-top: .12rem;
}
.exchangeEditor ul li:last-child span:nth-child(2){
	color: #2B77EF;
}
.exchangeEditor ul li span{
	font-size: .14rem;
	margin-left: .15rem;
	color: #333333;
}
.exchangeEditor>ul>li>span:nth-child(2){
	float: right;
	margin-right: .15rem;
	color: #666666;
}
.exchangeEditor ul li p{
	float: right;
	margin-right: .15rem;
	font-size: .14rem;
}
.exchangeEditor ul li p>input{
	border: none;
	height: .43rem;
	text-align: right;
	color: #2B77EF;
}
.exchangeEditor ul li textarea{
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
