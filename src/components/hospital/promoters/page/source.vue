<template>
	<div class="sourceManagement">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>{{this.$route.query.clinicName}}</h3>
			</div>
			<div class="rightImg">
				<router-link :to="{name:'promoters_clinicInfo',query:{clinicId:this.$route.query.clinicId}}">
					<img src="../../../../assets/image/promotersEditor.png" alt="">
				</router-link>
			</div>
			<div class="navZhanwei"></div>
			<div class="navTime">
				<span>{{moment(this.$route.query.clinicTime).format('YYYY-MM-DD HH:mm')}}</span>
			</div>
		</div>
		<div style="height: .575rem;width: 100%;"></div>
		<router-link :to="{name:'promoters_addSource',query:{clinicId:this.$route.query.clinicId}}">
			<div class="addEtiology">
				<img src="../../../../assets/image/xinzeng@2x.png" alt="">
				<span>新增病原</span>
			</div>
		</router-link>
		<div class="stateNav">
			<van-tabs title-inactive-color='#333333' title-active-color="#FF932E" @change="tabFn">
				<van-tab>
					 <div slot="title" class="tabTitle">
					      <span>全部病源</span>
						  <span>{{itemsNum}}</span>
					</div>
					<div class="list" @scroll="handleScroll" ref="listAll">
						<van-list  v-model="loading" :finished="finishedAll" finished-text="没有更多了"  @load="nextPageFn">
							<ul>
								<!-- items -->
								<li v-for="(item,inx) in  items" :key="inx">
									<router-link :to="{path : '/promoters/promoters_detailsPage' ,query : {patientId : item.itemId,}}">
										<div class="style">
											<div class="contentTitle">
												<img :src="item.img" alt="">
												<span>{{item.realname}}</span>
											</div>
											<div class="contnet_left">
												<span>推送：{{moment(item.pushTime).format('YYYY-MM-DD')}}</span>
												<span>状态：{{item.span}}</span>
											</div>
										</div>
									</router-link>
									<div class="content_right">
										<button :class="item.buttonColor" @click="submitFn(item,$event)">{{item.button}}</button>
									</div>
								</li>
							</ul>
						</van-list>
					</div>
				</van-tab>
				<van-tab>
					<div slot="title" class="tabTitle">
					      <span>已就诊</span>
						  <span>{{yesItemsNum}}</span>
					</div>
					<div class="list" @scroll="handleScroll" ref="listYes">
						<van-list  v-model="loading" :finished="finishedYes" finished-text="没有更多了"  @load="yesNextPageFn">
							<ul>
								<li v-for="(item,inx) in  yesItems" :key="inx">
									<router-link :to="{path : '/promoters/promoters_detailsPage' ,query : {patientId : item.itemId,}}">
										<div class="style">
											<div class="contentTitle">
												<img :src="item.img" alt="">
												<span>{{item.realname}}</span>
											</div>
											<div class="contnet_left">
												<span>推送：{{moment(item.pushTime).format('YYYY-MM-DD')}}</span>
												<span>状态：{{item.span}}</span>
											</div>
										</div>
									</router-link>
									<div class="content_right">
										<button :class="item.buttonColor" @click="submitFn(item,$event)">{{item.button}}</button>
									</div>
								</li>
							</ul>
						</van-list>
					</div>
				</van-tab>
				<van-tab>
					<div slot="title" class="tabTitle">
					      <span>未就诊</span>
						  <span>{{noItemsNum}}</span>
					</div>
					<div class="list" @scroll="handleScroll" ref="listNo">
						<van-list  v-model="loading" :finished="finishedNo" finished-text="没有更多了"  @load="noNextPageFn">
							<ul>
								<li v-for="(item,inx) in  noItems" :key="inx">
									<router-link :to="{path : '/promoters/promoters_detailsPage' ,query : {patientId : item.itemId,}}">
										<div class="style">
											<div class="contentTitle">
												<img :src="item.img" alt="">
												<span>{{item.realname}}</span>
											</div>
											<div class="contnet_left">
												<span>推送：{{moment(item.pushTime).format('YYYY-MM-DD')}}</span>
												<span>状态：{{item.span}}</span>
											</div>
										</div>
									</router-link>
									<div class="content_right">
										<button :class="item.buttonColor" @click="submitFn(item,$event)">{{item.button}}</button>
									</div>
								</li>
							</ul>
						</van-list>
					</div>
				</van-tab>
			</van-tabs>
		</div>
		<div class="returnTop" @click="returnTopFn" ref="returnTopRef" v-show="hospitalReturnTopPage">
			<img src="../../../../assets/image/returnTop.png" alt />
			<span>顶部</span>
		</div>
	</div>
</template>

<script>
import qs from 'qs';
export default {
	name: '',
	data () {
		return {
			items:[],
			yesItems:[],
			noItems:[],
			itemsNum:'',
			yesItemsNum:'',
			noItemsNum:'',
			loading: false,
			// 加载状态结束
			finishedAll: false,
			finishedYes: false,
			finishedNo:false,
			pageAll:0,
			pageYes:0,
			pageNo:0,
			clickData:0,
			scrollTopAll:0,
			scrollTopYes:0,
			scrollTopNo:0,
     		hospitalReturnTopPage:false,
		}
	},
	computed:{
	},
	components:{
		
	},
	created () {

	},
	mounted () {

	},
	activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			Object.assign(this.$data, this.$options.data());
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			this.getAllNum();
		}
		if(this.scrollTopAll != 0){
			this.$refs.listAll.scrollTop = this.scrollTopAll;
		}
		if(this.scrollTopYes != 0){
			this.$refs.listYes.scrollTop = this.scrollTopYes;
		}
		if(this.scrollTopNo != 0){
			this.$refs.listNo.scrollTop = this.scrollTopNo;
		}
    },

	methods: {
		// 滑动一定距离出现返回顶部按钮
		handleScroll() {
			switch(this.clickData){
				case 0:
				this.scrollTopAll = this.$refs.listAll.scrollTop || this.$refs.listAll.pageYOffset
				if (this.scrollTopAll > 0) {
					this.hospitalReturnTopPage = true;
				} else {
					this.hospitalReturnTopPage = false;
				}
				break;
				case 1:
				this.scrollTopYes = this.$refs.listYes.scrollTop || this.$refs.listYes.pageYOffset
				if (this.scrollTopYes > 0) {
					this.hospitalReturnTopPage = true;
				} else {
					this.hospitalReturnTopPage = false;
				}
				break;
				case 2:
				this.scrollTopNo = this.$refs.listNo.scrollTop || this.$refs.listNo.pageYOffset
				if (this.scrollTopNo > 0) {
					this.hospitalReturnTopPage = true;
				} else {
					this.hospitalReturnTopPage = false;
				}
				break;
			}
			
		},
		returnTopFn(){
			switch(this.clickData){
				case 0:
				this.$refs.listAll.scrollTop = 0;
				break;
				case 1:
				this.$refs.listYes.scrollTop = 0;
				break;
				case 2:
				this.$refs.listNo.scrollTop = 0;
				break;
			}
			// this.$refs.indexList.scrollTop=0;
			this.hospitalReturnTopPage = false;
		},
		getAllNum() {
			debugger
			var num = '';
			this.getNum("").then((v)=>{
				this.itemsNum = v
			})
			this.getNum(4).then((v)=>{
				this.yesItemsNum = v
			})
			this.getNum(1).then((v)=>{
				this.noItemsNum = v
			})
			
			// 
		},
		// 返回上上一级目录
		goBackFn(){
			this.$router.back(-1)
		},
		// 获取下一页的方法
		getDataAll(){
			this.$axios.post('/c2/patient/items',qs.stringify({
				clinicId : this.$route.query.clinicId,
				pn : this.pageAll,
				ps : 10,
			}))
			.then(res => {
				if(res.data.data.items.length != 0){
					for (let nums in res.data.data.items) {
						this.items.push({
							clinicName : res.data.data.items[nums].clinicName,
							itemId : res.data.data.items[nums].itemId,
							pushTime : res.data.data.items[nums].pushTime,
							realname : res.data.data.items[nums].realname,
							status : res.data.data.items[nums].status,
							img : require("../../../../assets/image/orange@2x.png"),
							button : "确认就诊",
							span : "未就诊"
						});
					}
					// 加载状态结束
					this.loading = false;
				}else{
					this.loading = false;
					this.finishedAll = true;
				}
			})
			.catch((err)=>{
				//Dialog({ message: err});;
			});
		},
		// 获取下一页的方法
		getDataNo(){
			this.$axios.post('/c2/patient/items',qs.stringify({
				clinicId : this.$route.query.clinicId,
				status: 1,
				pn : this.pageNo,
				ps : 10,
			}))
			.then(res => {
				if(res.data.data.items.length != 0){
					for (let nums in res.data.data.items) {
						this.noItems.push({
							clinicName : res.data.data.items[nums].clinicName,
							itemId : res.data.data.items[nums].itemId,
							pushTime : res.data.data.items[nums].pushTime,
							realname : res.data.data.items[nums].realname,
							status : res.data.data.items[nums].status,
							img : require("../../../../assets/image/orange@2x.png"),
							button : "确认就诊",
							span : "未就诊"
						});
					}
						// 加载状态结束
					this.loading = false;
				}else{
					this.loading = false;
					this.finishedNo = true;
				}
			})
			.catch((err)=>{
					
			});
		},
		// 获取下一页的方法
		getDataYse(){
			this.$axios.post('/c2/patient/items',qs.stringify({
				clinicId : this.$route.query.clinicId,
				status: 4,
				pn : this.pageYes,
				ps : 10,
			}))
			.then(res => {
				if(res.data.data.items.length != 0){
					for (let nums in res.data.data.items) {
						this.yesItems.push({
							clinicName : res.data.data.items[nums].clinicName,
							itemId : res.data.data.items[nums].itemId,
							pushTime : res.data.data.items[nums].pushTime,
							realname : res.data.data.items[nums].realname,
							status : res.data.data.items[nums].status,
							img :require( "../../../../assets/image/blue@2x.png"),
							button : "已就诊",
							buttonColor : "buttonColor",
							span : "已就诊"
						});
					}
					// 加载状态结束
					this.loading = false;
				}else{
					this.loading = false;
					this.finishedYes = true;
				}
			})
			.catch((err)=>{
				
				//Dialog({ message: err});;
			});
		},
		// 获取数量的方法
		async getNum(data){
			debugger;
			var num ='';
			await this.$axios.post('/c2/patient/items',qs.stringify({
					clinicId : this.$route.query.clinicId,
					status: data,
					pn : 1,
					ps : 10,
				}))
				.then(res => {
					num = res.data.data.sum.totalCount;
				})
				.catch((err)=>{
					
					//Dialog({ message: err});;
				});
			
			return num;
		},
		// 全部病原列表的下一页
		nextPageFn(){
			debugger;
			this.pageAll++;
			this.getDataAll();
		},
		// 已就诊病原列表的下一页
		yesNextPageFn(){
			this.pageYes++;
			this.getDataYse();
		},
		// 未就诊病原列表的下一页
		noNextPageFn(){
			this.pageNo++;
			this.getDataNo();
		},
		// 菜单切换的清空值
		tabFn(_value){
			this.clickData = _value;
			switch(this.clickData){
				case 0:
				if (this.scrollTopAll > 800) {
					this.hospitalReturnTopPage = true;
				} else {
					this.hospitalReturnTopPage = false;
				}
				this.$nextTick(()=>{
					this.$refs.listAll.scrollTop = this.scrollTopAll
				})
				break;
				case 1:
				if (this.scrollTopYes > 800) {
					this.hospitalReturnTopPage = true;
				} else {
					this.hospitalReturnTopPage = false;
				}
				this.$nextTick(()=>{
					this.$refs.listYes.scrollTop = this.scrollTopYes
				})
				break;
				case 2:
				if (this.scrollTopNo > 800) {
					this.hospitalReturnTopPage = true;
				} else {
					this.hospitalReturnTopPage = false;
				}
				this.$nextTick(()=>{
					this.$refs.listNo.scrollTop = this.scrollTopNo
				})
				break;
			}
		},
		submitFn(_item,_button){
			this.$axios.post('/c2/patient/confirmjiuzhen',qs.stringify({
				patientId : _item.itemId
			}))
			.then(res =>{
				if(res.data.codeMsg){
					this.$toast({duration: 1000,message: res.data.codeMsg})
				}else{
					this.$toast.success({duration: 1000,message: '操作成功'})
					if(_item.status == 1){
						
						_button.target.style.cssText="color:#333333; background-color:#EEEEEE;"
						_button.target.innerHTML = '已就诊';
					}
				}
			})
			.catch((err)=>{
				
			})
		}
	},
}
</script>

<style scoped>
.sourceManagement{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.topNav{
	width: 100%;
	height: .475rem;
	/* line-height: .575rem; */
	position: fixed;
	tab-size: 0;
	text-align: center;
	padding-top: .1rem ;
	background-color: #FFFFFF;
	z-index: 999;
}
.leftImg{
	width: 10%;
	float: left;
	line-height: .25rem;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
}
.centerTitle{
	width: 80%;
	float: left;
	line-height: .25rem;
}
.centerTitle h3{
	color: #333333;
	font-size: .16rem;
	font-weight: bolder;
	display: inline-block;
}
.rightImg{
	width: 10%;
	float: left;
	line-height: .25rem;
}
.rightImg img{
	width: .19rem;
	height: .2rem;
}
.navZhanwei{
	height: .25rem;
}
.navTime{
	width: 100%;
	text-align: center;
	position: absolute;
}
.navTime span{
	font-size: .13rem;
	color: #999999;
}
.addEtiology{
	width: 91.47%;
	height: .42rem;
	line-height: .42rem;
	margin: .1rem auto 0rem;
	text-align: center;
	background-color: #EAF2FF;
}
.addEtiology img{
	width: .16rem;
	height: .16rem;
	margin-top: -.03rem;
}
.addEtiology span{
	font-size: .14rem;
	color: #2B77EF;
}
.stateNav{
	width: 100%;
	
}	
>>>.van-tabs__wrap{
	width: 91.47%;
	margin: .15rem auto 0rem;
	border-radius: .3rem;
	background-color: transparent;
	box-shadow: 0px 0px 26px 3px hsla(0, 0%, 0%, 10%);
}
>>>.van-tabs__content{
	/* width: 91.47%!important; */
	/* margin: .15rem auto 0rem; */
	margin-top: .15rem;
}
>>>.van-tabs__line{
	background-color: #FF932E;
	width: .16rem!important;
}
>>>.van-tabs{
	height: .58rem;
}
>>>.van-tabs__wrap{
	height: .58rem;
	border-radius: .5rem;
}
>>>.van-tab{
	line-height: .21rem;
}
>>>.van-tab>span{
	font-size: .145rem;
	font-weight: bold;
}
.list{
	width: 100%;
	height: calc(100vh - 1.575rem);
	touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
  	overflow: scroll;
  	overflow-x: visible;
}
.list ul{
	height: auto;
}
.list li{
	width: 91.47%;
	height: .845rem;
	box-shadow: 0px 0px 26px 3px hsla(0, 0%, 0%, 10%);
	margin-bottom: .1rem;
	margin: .15rem auto;
	position: relative;
	border-radius: .03rem;
}
.style{
	height: 100%;
	color: #333333;
}
.contentTitle{
	width: 100%;
	/* height: .17rem; */
	/* line-height: .17rem; */
	padding-top: .1rem;
	padding-left: .1rem;

}
.contentTitle img{
	width: .17rem;
	height: .17rem;
	margin-top: -.03rem;
}
.contentTitle span{
	font-size: .14rem;
	font-weight: bold;
}
.contnet_left{
	padding-left: .32rem;
	padding-top: .04rem;
}
.contnet_left span{
	display: block;
}
.content_right{
	position: absolute;
	right: .15rem;
	bottom: .25rem;
}
.content_right button{
	width: .8rem;
	height: .28rem;
	background-color: #2B77EF;
	border: none;
	border-radius: .14rem;
	color: #FFFFFF;
	font-size: .125rem;
}
.buttonColor{
    color: #333333!important;
    background-color: #EEEEEE!important;
}
.tabTitle{
	margin: .08rem 0rem;
}
.tabTitle span{
	display: block;
}
>>>.van-list__finished-text{
	height: 1rem;
}
</style>
