<template>
  <div class="_search">
		<div class="top_search">
			<div class="search_return">
				<a @click="goBackFn">
					<img src="../../../static/iOS切图/shape@2x.png" alt="">
				</a>
			</div>
			<div class="search_input">
				<img src="../../../static/iOS切图/sousuo@2x.png" alt="">
				<input type="text" placeholder="搜索病源" v-model="keywords" @keyup="inputNow" >
			</div>
		</div>
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh" style=" overflow: none!important;">
			<ul class="search_content" v-model="user">
				<li v-for="(_user,inx) in user" :key="inx">
					<div class="content_left">
						<span>{{_user.realname}}</span>
					</div>
					<div class="content_right">
						<img :src='_user.imgUrl'>
						<span>{{_user.span}}</span>
					</div>
					<p>{{moment(_user.pushTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
				</li>
			</ul>
		</van-pull-refresh>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'index_search',
  data () {
    return {
     	keywords : '',
     	user:[],
     	isLoading: false,
    }
  },
  computed:{
	  
  },
  created () {
		
  },
  mounted () {
	this.getdata();
  },
  methods: {
	//获取数据
	getdata(){
		this.$axios.post('/c2/patient/items',qs.stringify({
			kw : this.keywords,
		}))
		.then(_d => {
			// console.log(_d.data.data.items)
			this.user = _d.data.data.items
			for(var i in _d.data.data.items){
				if(_d.data.data.items[i].status == 1){
					_d.data.data.items[i].span = '未就诊'
					_d.data.data.items[i].imgUrl = '../../../static/门诊端/iOS切图/weijiuzhen@2x.png'
				}else{
					_d.data.data.items[i].span = '已就诊'
					_d.data.data.items[i].imgUrl = '../../static/门诊端/iOS切图/yijiuzhen@2x.png'
				}
				// console.log(_d.data.data.items[i].status)
			}
					
		})
		.catch((err)=>{
			console.log(err);
			Dialog({ message: '加载失败!'});
		})
	},
	//刷新数据方法
  	onRefresh(){
  		this.getdata();
		this.isLoading = false;
  	},
	//键盘输入值时触发
  	inputNow(_keywordsCode){
  		// console.log(_keywords);
  		// console.log(this.keywords);
		let postTime = setTimeout(this.getdata(), 100000);
		clearTimeout(postTime);
  		if(_keywordsCode.keyCode == 13){
           this.getdata();
        }
  	},
	goBackFn(){
		this.$router.back(-1)
	},
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
._search{
	position: relative;
}
.top_search{
	height: .5rem;width: 100%;
	background-color: #FFFFFF;
	position:fixed;
	margin-top: -.62rem;
	z-index: 999;
}
.search_return{
	height: .5rem;width: .5rem;
	float: left;
}
.search_return a{
	height: .5rem;width: 100%;
}
.search_return a img{
	width: .09rem;
	height: .16rem;
	margin: .17rem .18rem;
	
}
.search_input{
	float: left;width: 75%;
}
.search_input input{
	background-color: #F5F5F5;
	height: .3rem;
	line-height: .3rem;
	width: 88%;
	margin: .1rem 0rem;
	border: none;
	border-radius: 25px;
	position: relative;
	padding-left: .37rem;
}
.search_input img{
	height: .15rem;
	width: .15rem;
	z-index: 3;
	position: absolute;
	top: .18rem;
	left: .6rem;
}
.search_content{
	margin: 0 .12rem;
}
.search_content li {
	height:1.01rem;
	margin-top:.12rem;
	background-color:#FFFFFF;
	position:relative;
	/* padding:.14rem .15rem; */
}
.search_content li:first-child{
	margin-top: .62rem;
}
.search_content li p{
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
	float:right;
	height:.5rem;
	margin-right:.14rem;
	margin-top:.15rem
}
.content_right img{
	width:.11rem;
	height:.11rem;
	margin-right:.04rem;
}
>>>[data-v-6bfd94e2] .van-pull-refresh{
    overflow: visible!important;
    -webkit-user-select: none;
    user-select: none;
}
</style>
