<template>
	<div class="exchangeList">
		<div class="topNav" :style="{'padding-top': height+'px'}">
			<div class="leftImg" @click="goBackFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>门诊兑换清单</h3>
			</div>
			<div class="right"></div>
		</div>
		<div class="zhangwei"></div>
		<!-- <van-pull-refresh v-model="isLoading" @refresh="refresh" > -->
			<ul :style="{'padding-top': height+'px'}">
				<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="onLoad">
					<li v-for="(item,inx) in exchangeList" :key='inx' class='List'>
						<router-link :to="{name : 'hospital_exchangeDetails' ,query : {item : item,time:new Date().getTime()}}">
							<ul>
								<li>
									<span>订单编号：{{item.orderId}}</span>
								</li>
								<li>
									<h4>{{item.clinicName}}</h4>
									<p>兑换时间：<span>{{moment(item.addTime).format('YYYY-MM-DD hh:mm')}}</span></p>
									<p>兑换数量：<span>{{item.totalCount}}</span></p>
								</li>
								<li>
									<p>使用积分：<span>{{item.totalExchangePoint}}</span></p>
								</li>
							</ul>
						</router-link>
					</li>
				</van-list>
			</ul>
		<!-- </van-pull-refresh> -->
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
	name: 'exchangeList',
	data () {
		return {
			exchangeList:[],
			page : 2,
			loading: false,
			// 加载状态结束
			finished: false,
			//显示下拉加载
			isLoading: false,
		}
	},
	computed:{
		...mapGetters(['account']),
	},
	components:{
		
	},
	created(){
		var heightRexg = /^[0-9]*/g
		var topHeight = this.topHeight.match(heightRexg)
		this.height = parseInt(topHeight.join()) 
		console.log(this.height)
	},
  beforeRouteLeave(to, from, next) {
    debugger;
	this.scrollTop =document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
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
	  document.documentElement.scrollTop=document.body.scrollTop = vm.scrollTop;
	});
	
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
		this.getdata()
	},
	methods: {
		goBackFn(){
			this.$router.back(-1)
		},
		successFn(_d){
			for (let nums in _d.data.data.items) {
				this.exchangeList.push( _d.data.data.items[nums] );
			}
			console.log(this.exchangeList)
		},
		getdata(){
			this.$axios.post('/clientend2/hospitalend/exchangemanage/orders',qs.stringify({
				hospitalId : this.account.hospitalId,
				pn : 1,
				ps : 10,
			}))
			.then(_d => {
				this.finished = false;
				this.isLoading = false;
				this.loading = false;
				this.exchangeList =[];
				this.page = 2;
				console.log( _d.data.data.items.length)
				if( _d.data.data.items.length == 0){
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					this.finished = true;
				}else{
					_d.data.codeMsg? Toast.success(_d.data.codeMsg) : this.successFn(_d);
					// console.log(_d.data.data.sum.totalCount)
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: err});
			})
		},
		nextdata(){
			this.$axios.post('/clientend2/hospitalend/exchangemanage/orders',qs.stringify({
				hospitalId : this.account.hospitalId,
				pn : this.page,
				ps : 10,
			}))
			.then(_d => {
				this.page++;
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
						this.exchangeList.push( _d.data.data.items[nums] );
					}
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
				}else{
					// this.$notify({
					// 	message: '数据已全部加载',
					// 	duration: 1000,
					// 	background:'#79abf9',
					// })
					this.loading = false;
					this.finished = true;
				}
			})
			.catch((err)=>{
				console.log(err);
				//Dialog({ message: '加载失败!'});
			})
		},
		onLoad(){
			this.nextdata()
		},
		refresh(){
			this.getdata()
		}
	},
}
</script>

<style scoped>
.exchangeList{
	width: 100%;
	/* height: 100%; */
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: .47rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 9999;
}	
.zhangwei{
	width: 100%;
	height: .47rem;
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
	float:right;
}
.exchangeList ul{
	width: 100%;
}
.List{
	width: 93.6%;
	height: 1.925rem;
	margin: 0rem auto;
	margin-top: .12rem;
	background-color: #FFFFFF;
}
.List ul{
	width: 91.453%;
	height: 100%;
	margin: 0rem auto;
}
.List ul li:first-child{
	width: 100%;
	height: .425rem;
	line-height: .425rem;
	color: #999999;
	border-bottom: 1px solid #EEEEEE;
}
.List ul li:nth-child(2){
	width: 100%;
	height: .75rem;
	border-bottom: 1px solid #EEEEEE;
	padding: .12rem 0rem;
}
.List ul li:nth-child(2)>h4{
	font-weight: bold;
	font-size: .15rem;
	line-height: .34rem;
}
.List ul li:nth-child(2)>p{
	color: #999999;
	line-height: .21rem;
	font-size: .13rem;
}
.List ul li:last-child{
	height: .49rem;
	line-height: .49rem;
	text-align: right;
}
.List ul li:last-child>p{
	color: #999999;
	font-size: .13rem;
}
.List ul li:last-child>p>span{
	color: #FF951B;
}
>>>.van-pull-refresh {
    overflow: hidden;
    -webkit-user-select: none;
    user-select: none;
	padding-top: .5rem;
}
</style>
