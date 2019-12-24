<template>
	<div class="exchange">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/img/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>兑换管理</h3>
			</div>
			<router-link :to="{name : 'hospital_exchangeManagementList'}">
				<div class="right">
					<img src="static/img/liebiao@3x.png" alt="">
				</div>
			</router-link>
		</div>
		<div class="exchangeTitle">
			<h3>已有商品</h3>
			<router-link :to="{name : 'hospital_exchangeManagementAdd'}">
				<div class="add">
					<span>新增</span>
					<img src="static/img/xinzeng@2x.png" alt="">
				</div>
			</router-link>
		</div>
		<ul class="exchangeLists">
			<van-swipe-cell v-for="(item,inx) in commodity" :key="inx"  :right-width= 65 >
				<li>
					<router-link :to="{name : 'hospital_exchangeEditor' ,query : {itemId : item.itemId}}">
						<div class="list">
							<div class="listsImg">
								<img :src="item.cover" alt="">
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
						<img src="static/img/activiteDelete.png" alt="">
					</button>
				</template>
			</van-swipe-cell>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import {Dialog} from 'vant'
export default {
	name: 'exchangeManagement',
	data () {
		return {
			commodity : [],
		}
	},
	computed:{
		...mapGetters(['account']),
    exchangeAdd: {
        get: function() {
    		// console.log(this.$store)
            return this.$store.state.shop.exchangeAdd
        },
        set: function (newValue) {
    		this.$store.state.shop.exchangeAdd = newValue;
        },
    },
	},
	components:{

	},
	created () {

	},
	mounted () {
		if(window.plus){
			plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
		this.getdata();
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
		deleteActiviteFn(_item){
			this.$axios.post('/c2/commodity/itemdel',qs.stringify({
				itemId : _item.itemId,
			})).then(res =>{
				this.getdata();
			}).catch(err =>{
				console.log(err)
			})
		},
		getdata(){
			this.$axios.post('/c2/commodity/items',qs.stringify({
				hospitalId : this.account.hospitalId,
			})).then(res =>{
				this.commodity = []
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
				// console.log(this.commodity)
			}).catch(err =>{
				console.log(err)
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
}
.topNav{
	width: 100%;
	height: .47rem;
	margin-bottom: .15rem;
	background-color: #FFFFFF;
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

</style>
