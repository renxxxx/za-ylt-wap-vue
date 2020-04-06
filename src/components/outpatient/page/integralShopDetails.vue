<template>
	<div class="integralShopDetails">
		<div class="topNav" >
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>兑换详情</h3>
			</div>
			<div class="right"></div>
		</div>
		<router-link :to="{path : '/outpatient/outpatient_shopAddressAdd'  ,query : {address : JSON.stringify(address),time:new Date().getTime()}}">
			<div class="address" v-show="!address.receiverId">
				<img src="../../../assets/image/dingweiweizhi@2x.png" alt="">
				<div class="addressContent">
					<h4>您需要我们送到哪里？</h4>
					<p>添加收货地址和联系方式</p>
				</div>
				<img src="../../../assets/image/Chevron Copy 2@2x.png" alt="">
			</div>
		</router-link>
		<router-link :to="{path : '/outpatient/outpatient_shopAddress' ,query : {address : JSON.stringify(address),time:new Date().getTime()}}">
			<div class="address" v-show="!!address.receiverId">
				<img src="../../../assets/image/exchangeAdress.png" alt="">
				<div class="addressContent">
					<h4>{{address.name}}</h4>
					<span>{{address.tel}}</span>
					<p class="color">{{address.address}}</p>
				</div>
				<img src="../../../assets/image/Chevron Copy 2@2x.png" alt="">
			</div>
		</router-link>
		<div class="shopProducts">
			<img :src="shopDetails.cover" alt="">
			<div class="productsTitle">
				<h5>{{shopDetails.name}}</h5>
				<p><span>{{shopDetails.payExchangepoint}}</span> 积分</p>
			</div>
			<div class="productsNum">
				<van-stepper :value="value"  :disable-input="false" :max="shopDetails.stock+1" async-change @change="tipsFn"/>
			</div>
		</div>
		<button @click="submitFn">提交</button>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
	name: 'integralShopDetails',
	data () {
		return {
			value: 1,
			address:{},
			shopDetails:{}
		}
	},
	computed:{
		...mapGetters(['account']),	
	},
	components:{
		
	},
	created () {
		
	},
  beforeRouteLeave(to, from, next) {
    //debugger;
	this.scrollTop =document.getElementById('outpatient').scrollTop ||document.getElementById('outpatient').pageYOffset
	if(!to.query.time || !from.query.time || to.query.time < from.query.time){
		 debugger
            if (this.$vnode && this.$vnode.data.keepAlive)
            {
                if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
                {
                    if (this.$vnode.componentOptions)
                    {
                        var key = this.$vnode.key == null
                                    ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                                    : this.$vnode.key;
                        var cache = this.$vnode.parent.componentInstance.cache;
                        var keys  = this.$vnode.parent.componentInstance.keys;
                        if (cache[key])
                        {
                            if (keys.length) {
                                var index = keys.indexOf(key);
                                if (index > -1) {
                                    keys.splice(index, 1);
                                }
                            }
                            delete cache[key];
                        }
                    }
                }
			}
            this.$destroy();
		}
	next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
     ;
    next(vm => {
	 document.getElementById('outpatient').scrollTop=document.getElementById('outpatient').pageYOffset=vm.scrollTop;
	});
	
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
		
		this.getdata();
	},
	methods: {
		goBackFn(){
			this.$router.back(-1);
		},
		tipsFn(value){
			if(value > this.shopDetails.stock){
				this.$toast({
					 duration: 1000, 
					  message: '库存不足',
				});
				this.value = this.shopDetails.stock;
				
			}else{
				this.value = value;
			}
		},
		submitFn(){
			this.$axios.post('/clientend2/clinicend/pointexchange/order',qs.stringify({
				param : JSON.stringify({
					commodities:[{id:this.shopDetails.requestId,count:this.value}],receiverId:this.address.receiverId
				})
			}))
			.then(res => {
				
				res.data.codeMsg? this.$toast(res.data.codeMsg):this.$toast.success('操作成功')
			})
			.catch((err)=>{
				//Dialog({ message: err});;
			})
		},
		getdata(){
			this.$axios.post('/clientend2/clinicend/pointexchange/commoditydetail',qs.stringify({
				clinicId : this.$store.state.outpatient.login.clinicId,
				commodityId : this.$route.query.commodityId,
			}))
			.then(res => {
				if(!res.data.codeMsg){
					this.shopDetails = {
						name : res.data.data.name,
						payExchangepoint : res.data.data.payExchangepoint,
						stock : res.data.data.stock,
						intro : res.data.data.intro,
						cover : [],
						requestId : this.$route.query.commodityId,
					};
					this.shopDetails.cover = res.data.data.cover.split(',')
				}else{
					this.$toast(res.data.codeMsg)
				}
			})
			.catch((err)=>{
				//Dialog({ message: err});;
			})
			this.$axios.post('/clientend2/clinicend/pointexchange/receivers',qs.stringify({
				clinicId : this.$store.state.outpatient.login.clinicId,
				pn : 1,
				ps : 99
			}))
			.then(res => {
				if(res.data.code == 0 && res.data.data.items && res.data.data.items.length>0){
					this.address = res.data.data.items[0];
				}else{
					this.$toast(res.data.codeMsg)
				}	
			})
			.catch((err)=>{
				//Dialog({ message: err});;
			})
		}
	},
}
</script>

<style scoped>
.integralShopDetails{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
	position: relative;
}
.integralShopDetails>button{
	width: 64.2%;
	height: .4rem;
	line-height: .4rem;
	color: #FFFFFF;
	font-size: .14rem;
	background-color: #2B77EF;
	border: none;
	border-radius: .2rem;
	position: absolute;
	bottom: .18rem;
	left: 17.9%;
}
.topNav{
	width: 100%;
	height: .47rem;
  background-color: #FFFFFF;
}
.leftImg{
	width: 10%;
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
.address{
	height: .56rem;
	padding: .12rem .16rem;
	background-color: #FFFFFF;
	margin: .12rem auto;
	position : relative;
}
.address img:first-child{
	width: .18rem;
	height: .22rem;
	position: absolute;
	top: .29rem;
	left: .16rem;
}
.address img:last-child{
	width: .16rem;
	height: .26rem;
	position: absolute;
	right: .16rem;
	top: .27rem;
}
.addressContent{
	padding-left: .16rem;
	padding-left: .5rem;
}
.addressContent h4{
	color: #333333;
	font-size: .15rem;
	font-weight: bold;
	padding-bottom: .09rem;
	display:inline-block;
}
.addressContent span{
	color: #BBBBBB;
	padding-left: .08rem;
	display:inline-block;
}
.addressContent p {
	color: #BBBBBB;
	font-size: .14rem;
}
.color{
	color: #333333!important;
}
.shopProducts{
	height: .56rem;
	padding: .16rem .16rem;
	background-color: #FFFFFF;
	position: relative;
}
.shopProducts img{
	width: .66rem;
	height: .66rem;
	object-fit: cover;
	position: absolute;
}
.productsTitle{
	margin-left: .78rem;
}
.productsTitle h5{
	color: #333333;
	font-size: .14rem;
	font-weight: bold;
}
.productsTitle p{
	color: #999999;
	font-size: .12rem;
}
.productsTitle p span{
	color: #FF951B;
}
.productsNum{
	position: absolute;
	right: .16rem;
	bottom: .1rem;
}
>>>.van-stepper__minus::before, >>>.van-stepper__plus::before {
    width: .12rem;
    height: .02rem;
	background-color:#BDBDBD;
}
>>>.van-stepper__plus::after {
    width: .02rem;
    height: .12rem;
	background-color:#BDBDBD;
}
>>>.van-stepper__plus::before ,>>>.van-stepper__plus::after{
	background-color: #FFFFFF;
}
>>>.van-stepper__minus{
    position: relative;
    box-sizing: border-box;
    width: .22rem;
    height: .22rem;
    margin: 0;
    padding: 4px;
    color: #323233;
    vertical-align: middle;
    background-color: #FFFFFF;
    border: 3px solid #D9DBDE;
	border-radius: 50%;
}
>>>.van-stepper__plus {
    position: relative;
    box-sizing: border-box;
	width: .22rem;
	height: .22rem;
    margin: 0;
    padding: 4px;
    vertical-align: middle;
    border: none;
	background-color: #00B7EE;
	border-radius: 50%;
}
>>>.van-stepper__input{
	background-color: #FFFFFF;
	color: #333333!important;
	font-size: .14rem;
}
</style>
