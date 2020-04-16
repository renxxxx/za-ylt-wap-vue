<template>
	<div class="productsExchange">
		<div class="title" v-show="show? true : false">
			<h3>热门兑换</h3>
			<router-link :to="{path : '/outpatient/outpatient_ExchangeList',query:{time:new Date().getTime()}}">
				<h3>更多</h3>
			</router-link>
		</div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ul>
        <li v-for="(item,inx) in list" :key='inx'>
          <router-link :to="{path : '/outpatient/outpatient_integralShop',query : {commodityId : item.commodityId,time:new Date().getTime()}}">
            <div class="productsImg">
              <img :src="item.cover" alt="">
            </div>
            <h4>{{item.name}}</h4>
            <p><span>{{item.payExchangepoint}}</span> 积分</p>
            <button>立即兑换</button>
          </router-link>
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
	name: 'integralExchangeList',
	data () {
		return {
			list : [],
      loading: false,
      finished: false,
      page: 0,
		}
	},
	computed:{
		...mapGetters(['account'])
	},
	components:{

	},
	created () {

	},
	props:['show'],
  mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}


	},
	methods: {
    onLoad(){
      ++this.page;
      // 
      this.getdata();
    },
    getdata(){
      this.$axios.post('/clientend2/clinicend/pointexchange/hots',qs.stringify({
      	clinicId : this.$store.state.outpatient.login.clinicId,
      	pn: this.page,
      	ps: 10
      }))
      .then(res => {
      	if(!res.data.codeMsg){
          if(res.data.data.items.length != 0){
            for(let i in res.data.data.items){
              this.list.push(res.data.data.items[i]);
            }
            this.loading = false;
          }else {
            this.loading = false;
            this.finished = true;
          }
      	}else{
      		this.$toast(res.data.codeMsg)
      	}
      })
      .catch((err)=>{
      	//Dialog({ message: err});
      })
    }
	},
}
</script>

<style scoped>
.productsExchange{
	width: 90.4%;
	background-color: #FFFFFF;
	padding: .12rem 4.8%;
}
.title h3{
	color: #333333;
	font-size: .15rem;
	font-weight: bolder;
	padding-bottom: .15rem;
	display: inline-block;
}
.title>a{
	float: right;
}
.productsExchange ul{
	width: 100%;
}
.productsExchange ul li{
	width: 48%;
	height: 2.11rem;
	display: inline-block;
	overflow: hidden;
	text-align: center;
	border: 1px solid #E5E5E5;
	margin-bottom: .09rem;
}
.productsExchange ul li:nth-child(2n){
	margin-left: .09rem;
}
.productsImg{
	width: 100%;
	height: 1.14rem;
	margin-bottom: .07rem;
	object-fit: cover;
	overflow: hidden;
}
.productsImg img{
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.productsExchange ul li h4{
	color: #333333;
	font-size: .15rem;
	font-weight: normal;
	padding-bottom: .02rem;
}
.productsExchange ul li p{
	font-size: .13rem;
}
.productsExchange ul li p span{
	color: #FF951B;
}
.productsExchange ul li button{
	width: .8rem;
	height: .21rem;
  line-height: .21rem;
  padding: 0;
	color: #2B77EF;
	border: 1px solid #2B77EF;
	background-color: #FFFFFF;
	border-radius: .1rem;
	margin-top: .12rem;
}
</style>
