<template>
	<div class="exchangeAdd">
		<div class="topNav" :style="{'padding-top':$store.state.topHeight}">
			<div class="leftImg" @click="goBackFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>新增商品</h3>
			</div>
			<div class="right">
				<!-- <button v-show=" this.$route.query.item? true:false" @click="modifyFn">修改</button> -->
				<button @click="nextFn">下一步</button>
			</div>
		</div>
		<div class="zhangwei"></div>
		<ul :style="{'padding-top':$store.state.topHeight}">
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
import { Toast } from 'vant';
export default {
	name: 'exchangeAdd',
	data () {
		return {
			// 医院端兑换管理的新增和商品修改信息参数
			exchangeAdd:{
				name : '',
				payExchangepoint : '',
				stock : '',
				intro : '',
				cover : '',
				show : true,
			},
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
    //debugger;
	this.scrollTop =document.getElementById('app').scrollTop ||document.getElementById('app').pageYOffset
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
	 document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
	});
	
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
	},
	methods: {
		//回退方法
		goBackFn(){
			this.exchangeAdd = {
				name : '',
				payExchangepoint : 0,
				stock : 0,
				intro : '',
				cover : '',
				show : true,
			}
			this.$router.back(-1);
			// this.$router.back({ name : 'hospital_exchangeManagement'});
		},
		nextFn(){
			if(this.exchangeAdd.name != ''){
				if(this.exchangeAdd.payExchangepoint != ''){
					if(this.exchangeAdd.stock != ''){
						if(this.exchangeAdd.intro != ''){
							this.$router.push({ name : 'hospital_exchangeManagementImg',query : {exchangeAdd : JSON.stringify(this.exchangeAdd),time:new Date().getTime()}});
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
	position: fixed;
	top:0;
	z-index: 9999;
}	
.zhangwei{
	width: 100%;
	height: .62rem;
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
	padding: 1px 3px;
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
	height: .38rem;
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
