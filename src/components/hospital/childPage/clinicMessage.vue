<template>
	<div class="message">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>推送通知</h3>
			</div>
			<div class="right">
			</div>
		</div>
		<div class="content">
			<ul>
				<li v-for="(item,inx) in clinicMessage" :key='inx'>
					<router-link :to="{name : 'details' ,query : {patientId : item.itemId,time:new Date().getTime()}}">
						<div class="triangle_border_up">
							<span></span>
						</div>
						<div class="contentTitle">
							<span>{{item.realname}}</span>
							<span>所属：{{item.clinicName}}</span>
							<span>时间 : {{moment(item.pushTime).format('YYYY-MM-DD HH:MM')}}</span>
						</div>
						<div class="contentTel">
							<span>去联系</span>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
	name: 'case',
	data () {
		return {
			clinicMessage : [],
			
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
	  debugger
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		this.$axios.post('/c2/patient/items',qs.stringify({
			hospitalId : this.account.hospitalId,
		}))
		.then(_d => {
			this.clinicMessage = _d.data.data.items;
			
		})
		.catch((err)=>{
			console.log(err);
			//Dialog({ message: err});;
		})
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
		
		
	},
}
</script>

<style scoped>
.message{
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
.content{
	width: 100%;
}
.content ul{
	width: 91.46%;
	margin: 0rem auto;
	margin-top: .2rem;
}
.content ul li{
	width: 100%;
	height: .95rem;
	border: 1px solid #FF1A2E;
	border-radius: .08rem;
	/* padding: .16rem .22rem; */
	position: relative;
	margin-bottom: .12rem;
}
.triangle_border_up{
	width: .3rem;
	height: .3rem;
	float: left;
	/* display: inline-block; */
}
.triangle_border_up span{
	display:block;
	width:0;
	height:0;
	border-width:0 .06rem .06rem;
	border-style:solid;
	border-color:transparent transparent #FF1A2E;/*透明 透明  黄*/
	top : .23rem;
	left: .22rem;
	position: absolute;
}
.contentTitle{
	width: 1.41rem;
	height: .61rem;
	float: left;
	margin-top: .16rem;
	margin-left: .15rem;
	
}
.contentTitle span{
	display: block;
	color: #0D0E10;
	font-size: .12rem;
}
.contentTitle span:first-child{
	font-size: .15rem;
	font-weight: bolder;
	margin-bottom: .03rem;
}
.contentTel{
	float: right;
	color: #FF1A2E;
	margin-top: .39rem;
	margin-right: .22rem;
}
</style>
