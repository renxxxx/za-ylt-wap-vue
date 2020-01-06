<template>
	<div class="hospital" :style="{'padding-top': height+'px'}">
		<div class="navWarp">
			<div class="topNav"  :style="{'padding-top': height+'px'}">
				<div class="hospital_search">
					<router-link :to="{name : 'hospital_indexSearch',query:{time:new Date().getTime()}}">
						<input type="text" placeholder="搜索门诊">
						<img src="../../assets/image/sousuo@2x.png" alt="">
					</router-link>
				</div>
				<router-link :to="{name : 'hospital_clinicMessage',query:{time:new Date().getTime()}}">
					<div class="hospital_information">
						<img src="../../assets/image/xiaoxi@2x.png" alt="">
						<div class="num" v-if="this.account.data.data.newMessageCount? true:false">
							<span>{{this.account.data.data.newMessageCount}}</span>
						</div>
					</div>
				</router-link>
			</div>
			<div class="shared">
				<ul>
					<router-link :to="{name : 'hospitalImage',query:{time:new Date().getTime()}}">
						<li>
							<img src="../../assets/image/yiyuanxingxiang@2x.png" alt=""/>
							<span>医院形象</span>
						</li>
					</router-link>
					<router-link  :to="{name : 'hospital_case',query:{time:new Date().getTime()}}">
						<li>
							<img src="../../assets/image/youzhianli@2x.png" alt=""/>
							<span>优质案例</span>
						</li>
					</router-link>
					<router-link :to="{name : 'hospital_expertsIntroduction',query:{time:new Date().getTime()}}">
						<li>
							<img src="../../assets/image/zhuanjia@2x.png" alt=""/>
							<span>专家介绍</span>
						</li>
					</router-link>
					<router-link :to="{name : 'hospital_activityReleased',query:{time:new Date().getTime()}}">
						<li>
							<img src="../../assets/image/huodongfabu@2x.png" alt=""/>
							<span>最新活动</span>
						</li>
					</router-link>
				</ul>
			</div>
			<div class="statisticalTitle" v-model="clinic">
				<h3>合作门诊 {{clinic.num}}</h3>
				<div class="statisticalAdd">
					<router-link :to="{name : 'hospital_addCLinic',query:{time:new Date().getTime()}}">
						<span>新增</span>
						<img src="../../assets/image/xinzeng@2x.png" alt="">
					</router-link>
				</div>
			</div>
		</div>
		
		<clinicContent :clinic = 'clinic'></clinicContent>
		
		<bottomNav></bottomNav>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import bottomNav from './functionPage/bottomNav.vue'
import clinicContent from './functionPage/clinic_content.vue'
export default {
	name: 'clinic',
	data () {
		return {
			clinic : {
				num : 0
			},
		}
	},
	computed:{
	  ...mapGetters(['account'])
	},
	components:{
		clinicContent,bottomNav
	},
	created(){
		debugger
		var heightRexg = /^[0-9]*/g
		var topHeight = this.topHeight.match(heightRexg)
		this.height = parseInt(topHeight.join()) 
		console.log(this.height)
	},
  beforeRouteLeave(to, from, next) {
	debugger;
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
     debugger;
    next(vm => {
	 document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
	});
	
  }, 
  destroyed(){
	  debugger
	  console.log('destroyed')
  },
  mounted() {
	  debugger
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
		// this.getdata(0);
		console.log(this.account.data.data.newMessageCount)
	},
	methods: {	
		onRefresh() {
			this.content = []
			this.getdata(0)
		},
		getdata(_data){
			if(_data == 0){
				this.isLoading = false;
				this.$axios.post('/c2/clinic/items',qs.stringify({
					hospitalId : this.account.hospitalId,
					pn : 1,
					ps : 10
				}))
				.then(res => {
					if(res.data.data.items.length != 0){
						// console.log(this.page)
						for(let i in res.data.data.items){
						// console.log(res.data.data.items[i])
						if(!res.data.data.items[i]){
							// this.$notify({
							// 	message: '数据已全部加载',
							// 	duration: 1000,
							// 	background:'#79abf9',
							// })
							// this.loading = false;
							// this.finished = true;
						}else{
							this.content.push(res.data.data.items[i])
						}
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
			}else if(_data = 1){
				console.log(this.page)
				this.page++
				this.$axios.post('/c2/clinic/items',qs.stringify({
					hospitalId : this.account.hospitalId,
					pn : this.page,
					ps : 10
				}))
				.then(res => {
					if(res.data.data.items.length != 0){
						// console.log(this.page)
						for(let i in res.data.data.items){
						// console.log(res.data.data.items[i])
						if(!res.data.data.items[i]){
							// this.$notify({
							// 	message: '数据已全部加载',
							// 	duration: 1000,
							// 	background:'#79abf9',
							// })
							// this.loading = false;
							// this.finished = true;
						}else{
							this.content.push(res.data.data.items[i])
						}
					}
					
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
			}
			
		},
		onLoad(){
			this.getdata(1)
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hospital{
	width: 100%;
	background-color: #FFFFFF;
}
.navWarp{
	width: 100%;
	height: 2.3rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 3;
}
.topNav{
	width: 100%;
	height: .42rem;
}
.hospital_search{
	float:left;
	width: 85.9%;
	position: relative;
}
.hospital_search input{
	margin: .08rem 0rem 0rem .16rem;
	height:.34rem;
	width: 80%;
	border: none;
	border-radius: .33rem;
	padding-left: 11.6%;
	background-color: rgba(0, 0, 0, 0.04);
}
.hospital_search img{
	width: .14rem;
	height: .15rem;
	position: absolute;
	top: .18rem;
	left: 9.8%;
}
.hospital_information{
	float:left;
	width: 10.3%;
	margin-left: .14rem;
	margin-top: .15rem;
	position: relative;
}
.hospital_information img{
	width: .19rem;
	height: .24rem;
}
.num{
	height: .18rem;
	width: .18rem;
	line-height: .18rem;
	text-align: center;
	background-color: #FF951B;
	border-radius: 50%;
	color: #FFFFFF;
	font-size: .12rem;
	position: absolute;
	top: -6px;
	right: 12px;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.shared{
	height: .73rem;
	width: 89%;
	margin: 0rem auto;
	margin-top: .3rem;
}
.shared ul{
	width: 100%;
	margin-top: .25rem;
}
.shared ul li{
	width: 25%;
	float: left;
	text-align: center;
}
.shared ul li img{
	width: .56rem;
	height: .43rem;
	display: block;
	margin: 0 auto;
	margin-bottom: .12rem;
}
.statisticalTitle{
	margin-top: .25rem;
	width: 100%;
	height: .26rem;
	line-height: .26rem;
	padding-bottom: .1rem;
}
.statisticalTitle h3{
	float: left;
	margin-left: .18rem;
	font-size: .16rem;
	font-weight: bolder;
}
.statisticalAdd{
	float: right;
	height: .26rem;
	line-height: .26rem;
	margin-right: .18rem;
}
.statisticalAdd span{
	font-size: .15rem;
}
.statisticalAdd img{
	height: .19rem;
	width: .19rem;
	/* margin: .04rem 0rem; */
	margin-left: .05rem;
	margin-top: -.03rem;
}
.content{
	width: 100%;
	height: 100%;
	margin-top: 2.1rem;
}
</style>
