<template>
	<div class="promotersDetails" ref="promotersDetailsRef">
		<div class="nav" :style="{'padding-top':$store.state.topHeight}">
			<div class="topNav">
				<div class="leftImg" @click="returnFn" id="navback">
					<img src="../../../assets/image/shape@3x.png" alt="">
				</div>
			</div>
			<div class="titleNav">
				<div class="headPortrait" v-show="promotersImg">
					<img :src="promotersImg" alt="">
					<span>长按可分享和保存</span>
				</div>
				<div class="promotersAbout">
					<h4>{{promoters.name}}</h4>
					<p>编号:&nbsp;&nbsp;<span>{{promoters.phone}}</span></p>
					<p>备注:&nbsp;&nbsp;</p><span>{{promoters.cover}}</span>
				</div>
			</div>
		</div>
		<div class="zhangwei" :style="{'padding-top':$store.state.topHeight}"></div>
		<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="onLoad">
		<ul>
			<li v-for="(item,inx) in promotersList" :key='inx'>
				<!-- <router-link :to="{name : 'hospital_clinicDetails' ,query :  {clinicId : item.hospitalClinicId}}"> -->
					<div class="promotersList">
						<h4>{{item.name}}</h4>
					</div>
				<!-- </router-link> -->
			</li>
		</ul>
		</van-list>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'promotersDetails',
	data () {
		return {
			loading: false,		//加载
			// 加载状态结束
			finished: false,	//加载到底显示
			promoters:{			//推广人信息
				name: '',
				phone: '',
				password: '',
				passwordConfirm: '',
				cover: '',
			},		
			page:1,		//get请求页数
			promotersImg:'',
			promotersList:[],	//推广人列表
		}
	},
	computed:{
	  ...mapGetters(['account'])
	},
	components:{
		
	},
	created(){
		var heightRexg = /^[0-9]*/g;
		//var topHeight = this.topHeight.match(heightRexg);
		//this.height = parseInt(topHeight.join()) ;
		// //console.log(this.height);
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
    next(vm => {
	 document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
	});
	
  },
	mounted(){
		this.promoters = {
			name:this.account.data.data.name,
			phone: this.account.data.data.phone,
			cover: this.account.data.data.cover,
		}
	},
	methods: {
		//返回上一级
		returnFn(){
			this.$router.back(-1)
		},
		// 下拉加载被推广的医院
		onLoad(){
			this.$axios.get('/hospital/operator/hospital-clinics?'+qs.stringify({hospitalUserId:this.$route.query.hospitalUserId})+'&'+qs.stringify({pn:this.page})+'&'+qs.stringify({ps:10}))
			.then(res => {
				if(res.data.data.rows.length != 0){
					for(let i in res.data.data.rows){
						if(res.data.data.rows[i]){
							this.promotersList.push(res.data.data.rows[i])
						}
					}
				this.page++;
				// 加载状态结束
				this.loading = false;
				}else{
					this.loading = false;
					this.finished = true;
				}
				if(this.promotersList.length<7){
					let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
					// console.log(this.$refs.promotersDetailsRef.style.height)
					this.$refs.promotersDetailsRef.style.height = windowHeight+ 'px'
				}
				// this.clinic.num = res.data.data.sum.totalCount;
			})
			.catch((err)=>{
				console.log(err);
			})
		},
	},
}
</script>

<style scoped>
.promotersDetails{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.nav{
	width: 100%;
	height: 1.93rem;
	position: fixed;
	top:0;
	z-index: 999;
	background-color: #FFFFFF;
}	
.topNav{
	width: 100%;
	height: .53rem;
	line-height: .53rem;
}
.leftImg{
	height: 100%;
	display: inline-block;
	padding-left: .16rem;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
}
.titleNav{
	width: 100%;
	margin-top: .1rem;
}
.headPortrait{
	padding-left: .42rem;
	float: left;
}
.headPortrait img{
	width: .88rem;
	height: .88rem;
	object-fit: cover;
	display: block;
}
.headPortrait span{
	display: block;
	font-size: .12rem;
	transform:scale(0.9);
	-webkit-transform-origin-x: 0;
	color: #999999;
}
.promotersAbout{
	width: 51.4%;
	float: left;
	padding-left: .2rem;
}
.promotersAbout h4{
	font-size: .16rem;
	font-weight: bold;
	color: #333333;
	padding-bottom: .05rem;
}
.promotersAbout p{
	font-size: .12rem;
	color: #999999;
	
}
.promotersAbout p span{
	color: #333333;
}
.promotersAbout p:nth-child(3){
	/* display: inline-block; */
	float: left;
	height: .32rem;
}
.promotersAbout>span:last-child{
	width: 70%;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.zhangwei{
	width: 100%;
	height: 2.06rem;
}
.promotersDetails ul{
	width: 100%;
	background-color: #FFFFFF;
}
.promotersDetails ul>li{
	width: 100%;
	height: .53rem;
	line-height: .53rem;
	position: relative;
	border-bottom:1px solid #EEEEEE;
}
.promotersDetails ul li h4{
	padding-left: .18rem;
	display: inline-block;
}
</style>
