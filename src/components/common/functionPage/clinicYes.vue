<template>
	<div class="yes">
		<!-- <van-pull-refresh v-model="isLoading" @refresh="refresh"> -->
			<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="onLoad">
				<ul class="hospitalList" v-if="isLogin == 100? true:false">
					<li v-for="(item,inx) in list.clinicYes" :key="inx">
						<router-link :to="{name : 'details' ,query : {patientId : item.itemId,time:new Date().getTime()}}">
							<div class="contentTitle">
								<img src="../../../assets/image/blue@2x.png" alt="">
								<span>{{item.realname}}</span>
							</div>
							<div class="contnet_left">
								<span>推送：{{moment(item.pushTime).format('YYYY-MM-DD')}}</span>
									<span>状态：已就诊</span>
							</div>
							<div class="content_right">
								<button  class="buttonColor">{{item.button}}</button>
							</div>
						</router-link>
					</li>
				</ul>
				<ul class="clinicList" v-if="isLogin == 200? true:false">
					<li v-for="(item,inx) in list.clinicYes" :key="inx">
						<router-link :to="{name : 'details' ,query : {patientId : item.itemId,time:new Date().getTime()}}">
							<div class="content_left">
								<span>{{item.realname}}</span>
							</div>
							<div class="content_right">
								<img src='../../../assets/image/yijiuzhen@2x.png'>
								<span class="AlreadySpanColor">已就诊</span>
							</div>
							<p>{{moment(item.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
						</router-link>
					</li>
				</ul>
			</van-list>
		<!-- </van-pull-refresh> -->
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
	name: 'clinicYes',
	data () {
		return {
			// list.clinicYes :[],
			loading: false,
			// 加载状态结束
			finished: false,
			//显示下拉加载
			isLoading: false,
			page : 1,
			yesNum : 0,
			yesTitle :'已就诊',
		}
	},
	computed:{
	  ...mapGetters(['account','isLogin']),

	},
	components:{

	},
	props:['list'],
	created () {
debugger
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
    // let winHeight = document.documentElement.clientHeight;                   //视口大小
    // document.getElementById('list-content').style.height = (winHeight - 46) +'px'  //调整上拉加载框高度
	},
	methods: {
		// 详情页
		getdata(){
			debugger
			this.yesNum = 0;
			let clinicId = '';
      let yesNum = 0;
			this.list.clinicId? clinicId = this.list.clinicId: clinicId = this.account.clinicId;
			this.$route.name == 'hospital_sourceManagement'&&this.isLogin == 100?	clinicId='':'',
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw : this.list.keywords,
				hospitalId : this.account.hospitalId,
				clinicId : clinicId,
				status :4,
				pn : 1,
				ps : 10
			}))
			.then(_d => {
				this.list.clinicYes =[];
				this.page = 2;
				// console.log( _d.data.data.items.length)
				if( _d.data.data.items.length == 0){
				}else{
					for (let nums in _d.data.data.items) {
						this.list.clinicYes.push({
							clinicName : _d.data.data.items[nums].clinicName,
							itemId : _d.data.data.items[nums].itemId,
							pushTime : _d.data.data.items[nums].pushTime,
							realname : _d.data.data.items[nums].realname,
							status : _d.data.data.items[nums].status,
							button : "已就诊"
						});
						yesNum++
					}
					this.isLoading = false;
				}
				if(this.list.keywords != ''){
					this.list.yesNum = yesNum;
					// console.log(yesNum)
				}else{
					this.list.yesNum  = _d.data.data.sum.totalCount
				}
			})
			.catch((err)=>{
				console.log(err);
				//Dialog({ message: err});;
			})
		},
		nextdata(){
			debugger
			let clinicId = '';
			this.list.clinicId? clinicId = this.list.clinicId: clinicId = this.account.clinicId;
			this.$route.name == 'hospital_sourceManagement'&&this.isLogin == 100?	clinicId='':'',
			this.$axios.post('/c2/patient/items',qs.stringify({
				hospitalId : this.account.hospitalId,
				clinicId : clinicId,
				status :4,
				pn : this.page,
				ps : 10,
			}))
			.then(_d => {
				this.page++;
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
						this.list.clinicYes.push({
							clinicName : _d.data.data.items[nums].clinicName,
							itemId : _d.data.data.items[nums].itemId,
							pushTime : _d.data.data.items[nums].pushTime,
							realname : _d.data.data.items[nums].realname,
							status : _d.data.data.items[nums].status,
							button : "已就诊"
						});

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
		},
		onLoad(){
			// this.list.keywords? this.nextdata():this.noPostFn;
			this.nextdata()
		},
		noPostFn(){
			this.nextdata();
			// this.loading=false
		},
		refresh(){
			// console.log(this.list.data);
			this.getdata();
			// this.getdata()
		},
	},
}
</script>

<style scoped>
.yes{
	width: 100%;
}
.hospitalList li{
	height:.84rem;
	width: 91.5%;
	background-color: #FFFFFF;
	margin: .12rem auto;
	border-radius: .14rem;
	box-shadow: hsla(0, 0%, 0%, 10%) 0rem 0rem 0.1rem 0rem;
  position: relative;
}
.contentTitle{
	padding: .09rem 0rem .07rem .1rem;
}
.contentTitle img{
	width: .17rem;
	height: .17rem;
}
.contentTitle span{
	margin-left: .05rem;
	font-weight: bold;
}
.contnet_left{
	margin-left: .32rem;
	float: left;
}
.contnet_left span{
	display: block;
}
.contnet_left span:last-child{
	margin-top: .04rem;
}
.content_right{
	float: right;
	margin-right: .15rem;
	margin-top: -.03rem;
}
.content_right button{
	width: .8rem;
	height: .28rem;
	color: #FFFFFF;
	background-color: #2B77EF;
	border: none;
	border-radius: .14rem;
}
.buttonColor{
    color: #333333!important;
    background-color: #EEEEEE!important;
}

.clinicList{
	margin: 0 .12rem;
}
.clinicList li {
	height:1.01rem;
	margin-top:.12rem;
	background-color:#FFFFFF;
	position:relative;
	/*padding:.14rem .15rem;*/
}
.clinicList li p{
	position:absolute;
	bottom:0;
	height:.5rem;
	width:93%;
	line-height:.5rem;
	margin-left:.14rem;
	border-top:1px solid #E5E5E5;
}
.content_left{
	float:left;
	height:.5rem;
	margin-top:.14rem;
	margin-left:.15rem;
}
.content_right{
	position: absolute;
	height:.5rem;
	right:.14rem;
	bottom:0rem;
}
.content_right img{
	width:.11rem;
	height:.11rem;
	margin-right:.04rem;
}
.content_right span{
	color: #4DD865;
}
</style>
