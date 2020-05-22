<template>
	<div class="exchange">
		<!-- <van-pull-refresh v-model="pullingDown" @refresh="afterPullDown" > -->
			<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
				<div class="leftImg" @click="goBackFn"  id="navback">
					<img src="../../../assets/image/shape@3x.png" alt="">
				</div>
				<div class="centerTitle">
					<h3>兑换管理</h3>
				</div>
				<router-link :to="{path : '/hospital/hospital_exchangeManagementList',query : {time:new Date().getTime()}}">
					<div class="right">
						<img src="../../../assets/image/liebiao@3x.png" alt="">
					</div>
				</router-link>
			</div>
			<div class="zhangwei"></div>
			<div class="exchangeTitle" :style="{'padding-top':$store.state.paddingTop}">
				<h3>已有商品</h3>
				<router-link :to="{path : '/hospital/hospital_exchangeManagementAdd'}">
					<div class="add">
						<span>新增</span>
						<img src="../../../assets/image/xinzeng@2x.png" alt="">
					</div>
				</router-link>
			</div>
		<div class="exchangeLists_content" @scroll="handleScroll" ref="exchangeLists_content">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<ul class="exchangeLists">
				<van-swipe-cell v-for="(item,inx) in commodity" :key="inx"  :right-width= 65 >
				<li>
					<router-link :to="{path : '/hospital/hospital_exchangeEditor' ,query : {itemId : item.itemId,}}">
					<div class="list">
						<div class="listsImg">
						<img v-if="item.cover"  v-lazy="item.cover" alt="">
						</div>
						<div class="listContent">
						<h4>{{item.name}}</h4>
						<p><span>{{item.payExchangepoint}}</span>积分</p>
						<span>数量</span>
						</div>
						<span>{{item.stock}}</span>
					</div>
					</router-link>
				</li>
				<template slot="right">
					<button class="deleteStyle" @click="deleteActiviteFn(item)">
					<img src="../../../assets/image/activiteDelete.png" alt="">
					</button>
				</template>
				</van-swipe-cell>
			</ul>
			</van-list>
		</div>
		
	<!-- </van-pull-refresh> -->
	<div class="returnTop" @click="$refs.exchangeLists_content.scrollTop=0;hospitalReturnTopPage = false;" ref="returnTopRef" v-show="hospitalReturnTopPage">
		<img src="../../../assets/image/returnTop.png" alt />
		<span>顶部</span>
	</div>
	</div>
</template>

<script>
import qs from 'qs';
export default {
	name: 'exchangeManagement',
	data () {
		return {
			commodity : [],
			loading: false,
			finished: false,
			page: 1,
			query:'',
			pullingDown:false,
			scrollTop:0,
    		hospitalReturnTopPage:false,
		}
	},
	computed:{
    exchangeAdd: {
        get: function() {
    		// 
            return this.$store.state.exchangeAdd
        },
        set: function (newValue) {
    		this.$store.state.exchangeAdd = newValue;
        },
    },
	},
	components:{
		
	},
	created(){

	},
 	mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		// this.getdata();
	},
	activated() {
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			this.getdata();
		}
		if(this.scrollTop != 0){
			this.$refs.exchangeLists_content.scrollTop = this.scrollTop;
		}
	},
	methods: {
		// 滑动一定距离出现返回顶部按钮
		handleScroll() {
			this.scrollTop = this.$refs.exchangeLists_content.scrollTop || this.$refs.exchangeLists_content.pageYOffset
			if (this.scrollTop > 800) {
				this.hospitalReturnTopPage = true;
			} else {
				this.hospitalReturnTopPage = false;
			}
		},
		afterPullDown() {
			//下拉刷新
		  setTimeout(() => {
			this.pullingDown = false;
			 this.initData();
		  }, 500);
		},
		initData() {
			let thisVue = this
			if(this.$route.meta.auth && !this.$store.state.hospital.login)
			this.$toast({message:'请登录',onClose:function(){
				thisVue.$router.replace({ path : '/hospital/hospitalLogin',query:{time:1}});
			}})

		  Object.assign(this.$data, this.$options.data());
		  this.page = 0;
		  this.onLoad();
		},
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
		deleteActiviteFn(_item){
      for(let i=0;i<this.commodity.length;i++){
        if(this.commodity[i].itemId ==_item.itemId){
          this.commodity.splice(i,1)
          i--;
        }
      }
			this.$axios.post('/c2/commodity/itemdel',qs.stringify({
				itemId : _item.itemId,
			})).then(res =>{
				this.getdata();
			}).catch(err =>{
				
			})
		},
    onLoad(){
      ++this.page;
      // 
      this.getdata();
    },
		getdata(){
			this.$axios.post('/c2/commodity/items',qs.stringify({
				hospitalId : this.$store.state.hospital.login.hospital.hospitalId,
        pn: this.page,
        ps: 10
			})).then(res =>{
				if(res.data.data.items.length != 0){
          for(let i in res.data.data.items){
            this.commodity.push({
              addTime : res.data.data.items[i].addTime,
              alterTime : res.data.data.items[i].alterTime,
              cover : res.data.data.items[i].cover,
              hospitalId : res.data.data.items[i].hospitalId,
              hosptialName : res.data.data.items[i].hosptialName,
              intro : res.data.data.items[i].intro,
              name : res.data.data.items[i].name,
              payExchangepoint : res.data.data.items[i].payExchangepoint,
              stock : res.data.data.items[i].stock,
              itemId : res.data.data.items[i].itemId,
            })
          }
          this.loading = false;
        }else {
            this.loading = false;
            this.finished = true;
          }
				// 
			}).catch(err =>{
				
			})
		}
	},
}
</script>

<style scoped>
.exchange{
	width: 100%;
	/* height: 100%; */
	background-color: #F5F5F5;
	height: 100%;
	overflow: hidden;
}
.topNav{
	width: 100%;
	height: .47rem;
	margin-bottom: .15rem;
	background-color: #FFFFFF;
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
	float:right;
}
.right img{
	width: .17rem;
	height: .2rem;
}
.exchangeTitle{
	width: 90.4%;
	height: .26rem;
	line-height:.26rem;
	margin: .15rem auto;
}
.exchangeTitle h3{
	font-weight: bold;
	font-size: .16rem;
	float: left;
}
.add{
	float: right;
}
.add span{
	font-size: .15rem;
	float: left;
}
.add img{
	width: .19rem;
	height: .19rem;
	margin-left: .05rem;
}
.exchangeLists{
	width: 100%;
}
.exchangeLists_content{
	height: calc(100% - .73rem);
	touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
	overflow: scroll;
	overflow-x: hidden;
	width: 100%;
}
.exchangeLists li{
	width: 100%;
	height: .98rem;
	background-color: #FFFFFF;
	margin: 0rem auto;
	margin-bottom: .12rem;
	border-radius: .03rem;
	position: relative;
}
.exchangeLists li>a{
	width: 100%;
	height: .48rem;
}
.listsImg{
	width: .66rem;
	height: .66rem;
	margin: .16rem 0rem;
	margin-left: .16rem;
	border: .02rem;
	float: left;
	text-align: center;
	overflow: hidden;
}
.listsImg img{
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.listContent{
	height: .68rem;
	float: left;
	margin-top: .14rem;
	margin-left: .12rem;
}
.listContent h4{
	font-size: .15rem;
	font-weight: bold;
}
.listContent p{
	color: #999999;
	font-size: .14rem;
}
.listContent>p>span{
	color: #FF951B;
}
.list{
	height: .98rem;
	width: 100%;
}
.list>span{
	display: block;
	font-size: .15rem;
	margin-top: .03rem;
}
.list>span{
	position: absolute;
	right: .18rem;
	bottom: .16rem;
	font-size: .14rem;
}
.deleteStyle{
	/* margin:.12rem 0rem; */
	height: .98rem;
	width: .6rem;
	border: none;
	color: #FFFFFF;
	background-color: #e91a1a;
}
.deleteStyle img{
	width: .15rem;
}
>>>.van-swipe-cell {
    position: relative;
    overflow: hidden;
	width: 91.46%;
	margin: 0rem auto;
}
>>>.van-pull-refresh{
	height: 100%;
}
</style>
