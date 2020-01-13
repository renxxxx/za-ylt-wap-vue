<template>
	<div class="taskDetails">
		<div class="topNav" :style="{'padding-top':$store.state.topHeight}">
			<div class="leftImg" @click="goBackFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>{{taskSubmitValue.name}}</h3>
			</div>
			<div class="right"></div>
		</div>
		<div class="zhangwei"></div>
		<ul :style="{'padding-top':$store.state.topHeight}">
			<li>
				<span>名称</span>
				<span>{{taskSubmitValue.name}}</span>
			</li>
			<li>
				<span>简介</span>
				<p>
					<input type="text" value="首次上传病员" v-model="taskSubmitValue.intro">
				</p>
			</li>
			<li>
				<span>积分</span>
				<p>
					<input type="text" oninput="value=value.replace(/[^\d]/g,'')" placeholder="1" v-model="taskSubmitValue.exchangePoint"> 分
				</p>
			</li>
			<li v-show="show" >
				<span>上限</span>
				<p>
					<input type="text" oninput="value=value.replace(/[^\d]/g,'')" placeholder="10" v-model="taskSubmitValue.exchangePointUpperPerDay"> 分
				</p>
			</li>
		</ul>
		<button @click="submitFn">发布</button>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
	name: 'taskDetails',
	data () {
		return {
			show : false,
			taskSubmitValue:{
				name: '',
				exchangePoint : '',
				exchangePointUpperPerDay : '',
				intro : "",
			}
		}
	},
	computed:{
		...mapGetters(['account']),
	},
	components:{
		
	},
	created(){
		var heightRexg = /^[0-9]*/g
		var topHeight = this.$store.state.topHeight.match(heightRexg)
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
		console.log()
		this.show = this.$route.query.show;	
		this.taskSubmitValue = JSON.parse(this.$route.query.item)
		// this.taskSubmitValue = this.$route.query.item
		console.log(this.$route.query)
	},
	methods: {
		// 返回上一级
		goBackFn(){
			this.$router.back(-1)
		},
			
		submitFn(){
			this.$axios.post('/c2/task/taskissue',qs.stringify({
				hospitalId : this.account.hospitalId,
				taskId : this.taskSubmitValue.taskId,
				exchangePoint : this.taskSubmitValue.exchangePoint,
				exchangePointUpperPerDay : this.taskSubmitValue.exchangePointUpperPerDay,
				intro : this.taskSubmitValue.intro,
			})).then(res =>{
				res.data.codeMsg? Dialog({message : res.data.codeMsg}): Dialog({message : '已添加'})
				
			}).catch(err =>{
				console.log(err)
			})
		}
	},
}
</script>

<style scoped>
.taskDetails{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	margin-bottom: .15rem;
	position: fixed;
	top:0;
	z-index: 999;
}	
.zhangwei{
	width: 100%;
	height: .62rem;
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
.taskDetails ul{
	width: 100%;
}
.taskDetails ul li{
	width: 91.46%;
	height: .45rem;
	line-height: .45rem;
	margin: 0 auto;
	border: 1px solid #D8D8D8;
	margin-bottom: .12rem;
}
.taskDetails ul li span{
	font-size: .14rem;
	margin-left: .15rem;
	color: #333333;
}
.taskDetails>ul>li>span:last-child{
	float: right;
	margin-right: .15rem;
	color: #666666;
}
/* .taskDetails>ul>li>span:last-child{
	float: right;
	margin-right: .15rem;
	color: #2B77EF;
} */
.taskDetails ul li p{
	float: right;
	margin-right: .15rem;
	font-size: .14rem;
}
.taskDetails ul li p>input{
	border: none;
	height: .38rem;
	text-align: right;
	color: #2B77EF;
}
.taskDetails button{
	width: 2.41rem;
	height: .4rem;
	display: block;
	margin: 0 auto;
	margin-top: .5rem;
	background: -webkit-gradient(linear, left top, left bottom, from(#56AFF8), to(#2B77EF));
	background: linear-gradient(#56AFF8, #2B77EF);
	border: none;
	border-radius: .2rem;
	color: #FFFFFF;
	font-size: .14rem;
}

</style>
