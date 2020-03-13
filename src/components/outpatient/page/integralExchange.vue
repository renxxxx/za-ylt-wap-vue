<template>
	<div class="integralExchange">
		<div class="topNav" :style="{'padding-top':$store.state.topHeight}">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@2x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>积分兑换</h3>
			</div>
			<div class="integralExchangeNum">
				<h2>{{integral}}</h2>
			</div>
			<div class="integralExchangeButton">
				<router-link :to="{name : 'outpatient_integralDetails',query:{time:new Date().getTime()}}">
				  <button>积分明细</button>
				</router-link>
				<router-link :to="{name : 'outpatient_integralHistory',query:{time:new Date().getTime()}}">
				  <button>兑换记录</button>
				</router-link>
			</div>
		</div>
		<div class="flowHeading" id ="flowHeading" :style="{'top':(parseInt($store.state.topHeight.replace('px',''))+176)+'px'}">
		    <ul class="rollScreen_list" :style = {transform:transform}  :class="{rollScreen_list_unanim:num===0}">
				<li class="rollScreen_once" v-for="(item,index) in contentArr" :key='index'>
					<img src="../../../assets/image/horn@2x.png" alt="">
					<span>{{item}}</span>
				</li>
				<li class="rollScreen_once" v-for="(item,index) in contentArr" :key='index+contentArr.length' >
					<img src="../../../assets/image/horn@2x.png" alt="">
					<span>{{item}}</span>
				</li>
		    </ul>
		</div>
		<div :style="{'height':(parseInt($store.state.topHeight.replace('px',''))+228)+'px'}"></div>
		<integralExchangeList :show = 'show' :style="{'padding-top':$store.state.topHeight}"></integralExchangeList>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import integralExchangeList from '../function/integralExchangeList.vue'
export default {
	name: 'integralExchange',
	data () {
		return {
			integral: 0,
			// 消息条数
			contentArr : [],
			//让消息显示为第一章的值
			num: 0,
			// 消息的计时器
			flowHeading : undefined,
			show : true
		}
	},
	computed:{
		...mapGetters(['account']),
		transform: function () {
	        return 'translateY(-' + this.num * .42 + 'rem)'
	    },
	},
	components:{
		integralExchangeList
	},
	destroyed() {

	},
	created () {
		let _this = this
		_this.flowHeading = setInterval(function () {
			if (_this.num !== _this.contentArr.length) {
				_this.num++
			} else {
				_this.num = 0
			}
		}, 2500)
		var heightRexg = /^[0-9]*/g
		//var topHeight = this.topHeight.match(heightRexg)
		//this.height = parseInt(topHeight.join())
		//console.log(this.height)
	},
	destroyed() {
		window.clearInterval(this.flowHeading)
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
    next(vm => {
	 document.getElementById('outpatient').scrollTop=document.getElementById('outpatient').pageYOffset=vm.scrollTop;
	});

  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}

		// 从接口获取消息
		this.$axios.post('/clientend2/clinicend/pointexchange/msgs',qs.stringify({
			clinicId : this.account.clinicId,
			pn : 1,
			ps : 10
		}))
		.then(res => {
			if(res.data.codeMsg == '' || res.data.codeMsg == null || res.data.codeMsg == undefined){
				for(let i in res.data.data.items){
					this.contentArr.push(res.data.data.items[i].title);
				}
			}else{
				this.$toast.fail(res.data.codeMsg)
			}
		})
		.catch((err)=>{
			//Dialog({ message: err});;
		})
		this.$axios.post('/clientend2/clinicend/pointexchange/main',qs.stringify({
			clinicId : this.account.clinicId,
			pn : 1,
			ps : 10
		}))
		.then(res => {
			this.integral = res.data.data.exchangePoint
		})
		.catch((err)=>{
			//Dialog({ message: err});;
		})
	},
	methods: {
		goBackFn(){
			this.$router.back(-1);
		}
	},
}
</script>

<style scoped>
.integralExchange{
	width:100%;
	height: 100%;
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: 1.76rem;
	background: url('../../../assets/image/blue-BJ@2x.png')  center no-repeat,linear-gradient(#FDFDFD, #FBFBFB) ;
	background-size: 100%;
	color: #FFFFFF;
	text-align: center;
	position: fixed;
	top:0;
	z-index: 9999;
}
.zhangwei{
	width: 100%;
	height: 1.76rem;
}
.leftImg{
	width: 22%;
	height: .47rem;
	line-height: .47rem;
	float:left;
	text-align: left;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
	line-height: .47rem;
	padding-left: .16rem;
}
.centerTitle{
	width: 56%;
	text-align: center;
	height: .47rem;
	line-height: .47rem;
	float:left;
	/* display:inline-block; */
}
.centerTitle h3{
	font-size: .16rem;
	font-weight: bolder;
}
.right{
	width: 22%;
	height: .47rem;
	line-height: .47rem;
	text-align: right;
	float:left;
}
.integralExchangeNum{
	display: block;
	float: left;
	width: 100%;
	height: .54rem;
	line-height: .54rem;
	text-align: center;
}
.integralExchangeNum h2{
	display: block;
	font-size: .36rem;
}
.integralExchangeButton{
	width: 100%;
	float: left;
	margin-top: .2rem;
}
.integralExchangeButton a button{
	width: 1.1rem;
	height: .29rem;
  color: #FFFFFF;
	background: none;
	border: 1px solid #FFFFFF;
	border-radius: .15rem;
}
.integralExchangeButton a:first-child button{
	margin-right: .5rem;
}
.flowHeading{
	width: 100%;
	height: .42rem;
	line-height: .42rem;
	background-color: #FFFFFF;
	display: inline-block;
	overflow: hidden;
	/* position:relative; */
	position: fixed;
	z-index: 9999;
}
.flowHeading ul li{
	width: 100%;
	height: .42rem;
	line-height: .42rem;
	font-size: .15rem;
}
.flowHeading ul li img{
	width: .17rem;
	height: .16rem;
	margin-left: .16rem;
	margin-right: .075rem;
	margin-top: -.03rem;
}
.rollScreen_list{
	transition: 1s linear;
}
.rollScreen_list_unanim{
	transition: none
}
</style>
