<template>
	<div class="case">
		<div class="topNav">
			<img src="static/iOS切图/shape@2x.png" alt=""  @click="goBackFn">
			<h3>优质案例</h3>
		</div>
		<div class="article">
			<ul>
				<router-link :to="{name : 'hospital_caseDetails'}">
					<li v-for="(items,inx) in article" :key="inx" @click="itemPostFn(items)">
						<div class="article_left">
							<p>{{items.content}}</p>
							<div class="article_leftTime">
								<img src="static/iOS切图/time@2x.png" alt="">
								<span>{{moment(items.time).format('YYYY-MM-DD HH:mm')}}</span>
							</div>
						</div>
						<div class="article_right">
							<img :src=items.img alt="">
						</div>
					</li>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'case',
	data () {
		return {
			article:[],
		}
	},
	computed:{
	  ...mapGetters(['account']),
	},
	components:{
		
	},
	created () {
		
	},
	mounted () {
		this.$axios.post('/c2/project/items',qs.stringify({
			hospitalId : this.account.hospitalId,
			pn : 1,
			ps : 10
		}))
		.then(res => {
			if(res.data.data.items.length != 0){
				for(let i in res.data.data.items){
					// console.log(res.data.data.items[i])
					if(res.data.data.items[i]){
						this.article.push({
							content:res.data.data.items[i].name,
							img: res.data.data.items[i].cover,
							time:res.data.data.items[i].alterTime,
							itemId : res.data.data.items[i].itemId,
						}) 
					}else{
						this.$notify({
							message: '数据已全部加载',
							duration: 1000,
							background:'#79abf9',
						})
					}
				}
			}
		})
		.catch((err)=>{
			console.log(err);
			Dialog({ message: '加载失败!'});
		})
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
		itemPostFn(_id){
			this.account.itemId = _id.itemId;
			// console.log(this.account.itemId)
		}
	},
}
</script>

<style scoped>
.case{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	text-align: center;
	position: relative;
	background-color: #FFFFFF;
}
.topNav img{
	width: .09rem;
	height: .15rem;
	position: absolute;
	left: .16rem;
	top:.16rem;
}
.topNav h3{
	font-size: .16rem;
	font-weight: bold;
}
.article{
	width: 91.5%;
	margin: 0rem auto;	
}
.article ul{
	margin-top: .2rem;
	width: 100%;
}
.article ul li {
	width: 100%;
	height: .97rem;
	border-bottom:1px solid #D8D8D8FF ;
	margin: .12rem 0;
}
.article ul li:last-child{
	border: none;
}
.article_left{
	float: left;
	width: 60.1%;
}
.article_left p{
	font-size: .14rem;
	font-weight: bold;
	height: .42rem;
}
.article_leftTime{
	margin-top: .23rem;
	height: .16rem;
	line-height: .16rem;
	position: relative;
}
.article_leftTime img{
	position: absolute;
	top:.02rem;
	width: .11rem;
	height: .11rem;
	
}
.article_leftTime span{
	margin-left: .17rem;
}
.article_right{
	float: left;
	margin-left: 7.8%;
	width: 32.1%;
}
.article_right img{
	width: 1.08rem;
	height: .85rem;
}
</style>
