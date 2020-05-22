<template>
	<div class="activityDetails">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>活动详情</h3>
			</div>
			<div class="right">
				<img src="../../../../assets/image/share@3x.png" @click="share" alt="">	
			</div>
		</div> 
		<div class="zhangwei"></div>
		<div class="activityDetailsList" ref="activityDetailsList" @scroll="handleScroll">
			<div class="activeList" :model='active' :style="{'padding-top':$store.state.paddingTop}">
				<img v-lazy="active.cover" alt="">
				<div class="activeTitle">
					<h4>{{active.title}}</h4>
					<span>{{moment(active.startTime).format('YYYY-MM-DD HH:mm')}} - {{moment(active.endTime).format('YYYY-MM-DD HH:mm')}}</span>
				</div>
			</div>
			<div class="tabel">
				<ul>
					<li v-if="active.title">
						<span>标题</span>
						<input type="text" v-model='active.title' readonly="readonly">
					</li>
					<li v-if="active.brief">
						<span>副标题</span>
						<input type="text" v-model='active.brief' readonly="readonly">
					</li>
					<li v-if="active.tel">
						<span>联系电话</span>
						<input type="text" v-model='active.tel' readonly="readonly">
					</li>
					<li v-if="active.time">
						<span>活动起止时间</span>
						<input type="text" v-model="active.time" readonly="readonly">
					</li>
					<li v-if="active.address">
						<span>活动地址</span>
						<input type="text" v-model='active.address' readonly="readonly">
					</li>
					<li v-if="active.content">
						<span>活动说明</span>
						<!-- <input type="text" v-model='active.content' readonly="readonly"> -->
						<div class="tabelContent">
							<p style="white-space:pre-line;">{{active.content}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="returnTop" @click="$refs.activityDetailsList.scrollTop=0;hospitalReturnTopPage = false;" ref="returnTopRef" v-show="hospitalReturnTopPage">
			<img src="../../../../assets/image/returnTop.png" alt />
			<span>顶部</span>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'activityDetails',
	data () {
		return {
			active : {},
			scrollTop:0,
     		hospitalReturnTopPage:false,
		}
	},
	computed:{
	  ...mapGetters(['account']),
	},
	components:{
		
	},
	created(){
	},
   mounted() {
		// if(window.plus){
		// 	//plus.navigator.setStatusBarBackground("#ffffff");
		// 	plus.navigator.setStatusBarStyle("dark")
		// }
	},
	activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			Object.assign(this.$data, this.$options.data());
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			this.getdata();
		}
		if(this.scrollTop != 0){
			this.$refs.activityDetailsList.scrollTop = this.scrollTop;
		}
    },
	methods: {
		// 滑动一定距离出现返回顶部按钮
		handleScroll() {
			this.scrollTop = this.$refs.activityDetailsList.scrollTop || this.$refs.activityDetailsList.pageYOffset
			if (this.scrollTop > 800) {
				this.hospitalReturnTopPage = true;
			} else {
				this.hospitalReturnTopPage = false;
			}
		},
		getdata(){
			this.$axios.post('/c2/activity/item',qs.stringify({
				itemId : this.$route.query.itemId,
			}))
			.then(_d => {
				this.active = _d.data.data
				if(_d.data.data.startTime != '' && _d.data.data.endTime){
					var moment = require('moment');
					this.active.time = moment(_d.data.data.startTime).format('YYYY-MM-DD HH:mm') + ' - ' +moment(_d.data.data.endTime).format('YYYY-MM-DD HH:mm') 
					// 
				}
				this.$axios.get('/other/bigtxt/'+_d.data.data.contentBtId+'/'+_d.data.data.contentBtId)
				.then(_d => {
					this.$set(this.active,'content',_d.data)
					// 
				})
				.catch((err)=>{
					
					//Dialog({ message: err});;
				})
			})
			.catch((err)=>{
				
				//Dialog({ message: err});;
			})
		},
		share(){
			let vue = this
			this.$h5p.shareWeb(location.href,this.active.cover,this.active.title,this.active.brief||'',function(){
				 
				vue.$axios.post('/c2/share')
			});
		},
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
		
	},
}
</script>

<style scoped>
.activityDetailsList{
	width: 100%;
	height: calc(100% - .98rem);
  	touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
  	overflow: scroll;
  	overflow-x: hidden;
}
.activityDetails{
	width: 100%;
	height: 100%;
	overflow:hidden;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	background-color: #FFFFFF;
	border-bottom: 1px solid #E5E5E5;
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
.right img{
    width: .19rem;
    height: .19rem;
    float: right;
    margin-top: .14rem;
    margin-right: .21rem;
}
.activeList{
	width: 93.6%;
	height: 1.8rem;
	margin: .12rem auto;
	position: relative;
	overflow: hidden;
}
.activeList>img{
	/* height: 100%; */
	width: 100%;
}
.activeTitle{
	position: absolute;
	color: #FFFFFF;
	bottom: 0rem;
	left: 0rem;
	width: 100%;
	height: 50%;
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
.activeTitle h4{
	font-size: .15rem;
	position: absolute;
	bottom: .32rem;
	left: .2rem;
}
.activeTitle span{
	color: #EAF2FF;
	position: absolute;
	bottom: .15rem;
	left: .2rem;
}
.tabel{
	width: 100%;
}
.tabel ul{
	width: 91.46%;
	margin: 0 auto;
}
.tabel ul li{
	height: .71rem;
	width: 100%;
	margin: .12rem 0rem;
}
.tabel ul li span{
	display: block;
	color: #999999;
	margin-bottom: .05rem;
}
.tabel ul li input{
	width: 96%;
	height: .45rem;
	line-height: .45rem;
	border: 1px solid #D8D8D8;
	padding-left: 4%;
}
.tabelContent{
	width: 96%;
	/* height: 100%; */
	line-height: .25rem;
	border: 1px solid #D8D8D8;
	padding-left: 4%;
}
</style>
