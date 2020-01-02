<template>
	<div class="no">
		<!-- <van-pull-refresh v-model="isLoading" @refresh="refresh"> -->
			<ul class="hospitalList" v-if="isLogin == 100? true:false">
				<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="onLoad">
					<li v-for="(item,inx) in list.clinicNo" :key="inx" >
						<router-link :to="{name : 'details' ,query : {patientId : item.itemId,time:new Date().getTime()}}">
							<div class="contentTitle">
								<img :src="item.img" alt="">
								<span>{{item.realname}}</span>
							</div>
							<div class="contnet_left">
								<span>推送：{{moment(item.pushTime).format('YYYY-MM-DD')}}</span>
									<span>状态：未就诊</span>
							</div>
              </router-link>
						<div class="content_right">
							<button  @click="submitFn(item,$event)">{{item.button}}</button>
						</div>
					</li>
				</van-list>
			</ul>
			<ul class="clinicList" v-if="isLogin == 200? true:false">
				<van-list  v-model="loading" :finished="finished" finished-text="已加载全部数据"  @load="onLoad">
					<li v-for="(item,inx) in list.clinicNo" :key="inx">
						<router-link :to="{name : 'details' ,query : {patientId : item.itemId,time:new Date().getTime()}}">
							<div class="content_left">
								<span>{{item.realname}}</span>
							</div>
							<div class="content_right">
								<img src='../../../assets/image/weijiuzhen@2x.png'>
								<span class="AlreadySpanColor">未就诊</span>
							</div>
							<p>{{moment(item.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
						</router-link>
					</li>
				</van-list>
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
			// list.clinicNo :[],
			loading: false,
			// 加载状态结束
			finished: false,
			//显示下拉加载
			isLoading: false,
			page : 1,
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
		// this.getdata();
    // let winHeight = document.documentElement.clientHeight;                   //视口大小
    // document.getElementById('list-content').style.height = (winHeight - 46) +'px'  //调整上拉加载框高度
	},
	methods: {
    submitFn(_item,_button){
    	console.log(_item.status)

    	this.$axios.post('/c2/patient/confirmjiuzhen',qs.stringify({
    		patientId : _item.itemId
    	}))
    	.then(res =>{
    		if(res.data.codeMsg){
    			this.$toast.fail({duration: 1000,message: res.data.codeMsg})
    		}else{
    			this.$toast.success({duration: 1000,message: '操作成功'})
			if(_item.status == 1){
				console.log(_button.target)
				_button.target.style.cssText="color:#333333; background-color:#EEEEEE;"
				_button.target.innerHTML = '已就诊';
			}
    			// console.log(this.list.clinicAll.map(item => item.itemId =  _item.itemId).indexOf())

    		}
    	})
    	.catch((err)=>{
    		console.log(err);
    		//Dialog({ message: err});;
    	})
    },
		// 详情页
		getdata(){
			debugger
			this.noNum = 0;
			let clinicId = '';
			this.list.clinicId? clinicId = this.list.clinicId: clinicId = this.account.clinicId;
			this.$route.name == 'hospital_sourceManagement'&&this.isLogin == 100?	clinicId='':''
			this.$axios.post('/c2/patient/items',qs.stringify({
				kw : this.list.keywords,
				hospitalId : this.account.hospitalId,
				clinicId : clinicId,
				status :1,
				pn : 1,
				ps : 10
			}))
			.then(_d => {
				this.list.clinicNo =[];
				this.page = 2;
				let yesNum = 0;
				let noNum = 0;
				let allNum = 0;
				// console.log( _d.data.data.items.length)
				if( _d.data.data.items.length == 0){
				}else{
					for (let nums in _d.data.data.items) {
						this.list.clinicNo.push({
							clinicName : _d.data.data.items[nums].clinicName,
							itemId : _d.data.data.items[nums].itemId,
							pushTime : _d.data.data.items[nums].pushTime,
							realname : _d.data.data.items[nums].realname,
							status : _d.data.data.items[nums].status,
							img : require("../../../assets/image/orange@2x.png"),
							button : "确认就诊"
						});
						noNum++
					}
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
				}
				if(this.list.keywords != ''){
					this.list.noNum = noNum;
				}else{
					this.list.noNum  = _d.data.data.sum.totalCount
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
				status :1,
				pn : this.page,
				ps : 10,
			}))
			.then(_d => {
				this.page++;
				if(_d.data.data.items.length != 0){
					for (let nums in _d.data.data.items) {
						this.list.clinicNo.push({
							clinicName : _d.data.data.items[nums].clinicName,
							itemId : _d.data.data.items[nums].itemId,
							pushTime : _d.data.data.items[nums].pushTime,
							realname : _d.data.data.items[nums].realname,
							status : _d.data.data.items[nums].status,
							img : require("../../../assets/image/orange@2x.png"),
							button : "确认就诊"
						});
						// this.noNum++;
						// console.log(this.clinicDetails)
					}
					// this.noTitle = '未就诊' + this.noNum
					// console.log(this.list.noNum)
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					// console.log(this.message)
				}else{
					/* this.$notify({
						message: '数据已全部加载',
						duration: 1000,
						background:'#79abf9',
					}) */
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
			// console.log(this.keywords);
			this.getdata();
		},
	},
}
</script>

<style scoped>
.no{
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
	color: #2B77EF;
}
</style>
