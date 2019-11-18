<template>
	<div class="hospital">
		<div class="navWarp">
			<div class="navTitle">
				<span>- 医院端 -</span>
			</div>
			<div class="slider" >
				<!-- :autoplay="3000" -->
				<van-swipe >
				  <van-swipe-item v-for="(image, index) in images" :key="index">
				    <img v-lazy="image" class="silder_img"/>
				  </van-swipe-item>
				</van-swipe>
			</div>
		</div>
		
		<div class="typeList">
			<ul>
				<li>
					<img src="../../../static/iOS切图/qudaomenzhen@2x.png" alt="">
					<span>渠道门诊</span>
				</li>
				<li>
					<img src="../../../static/iOS切图/bingyuanguanli@2x.png" alt="">
					<span>病源管理</span>
				</li>
				<li>
					<img src="../../../static/iOS切图/qixiejicai@2x.png" alt="">
					<span>器械集采</span>
				</li>
				<li>
					<img src="../../../static/iOS切图/yunyingzhongxin@2x.png" alt="">
					<span>运营中心</span>
				</li>
				<li>
					<img src="../../../static/iOS切图/jiyinjiance@2x.png" alt="">
					<span>基因检测</span>
				</li>
				<li>
					<img src="../../../static/iOS切图/yiliaoziyuan@2x.png" alt="">
					<span>医疗资源</span>
				</li>
				<li>
					<img src="../../../static/iOS切图/yiyuanhuodong@2x.png" alt="">
					<span>医院活动</span>
				</li>
				<li>
					<img src="../../../static/iOS切图/qita@2x.png" alt="">
					<span>其他项目</span>
				</li>
			</ul>
		</div>
		
		<div class="article">
			<div class="articleTitle">
				<img src="../../../static/iOS切图/Combined Shape@2x.png" alt="">
				<h3>运营精选</h3>
			</div>
			<ul :model="article">
				<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @check="onLoad">
					<li v-for="(items,inx) in article" :key="inx">
						<div class="article_left">
							<p>{{items.content}}</p>
							<div class="article_leftTime">
								<img src="../../../static/iOS切图/time@2x.png" alt="">
								<!-- <span>{{moment(items.time).format('YYYY-MM-DD HH:mm:ss')}}</span> -->
							</div>
						</div>
						<div class="article_right">
							<img :src=items.img alt="">
						</div>
					</li>
				</van-list>
			</ul>
		</div>
		<bottomNav></bottomNav>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import bottomNav from './childPage/bottomNav.vue'
// import moment from 'moment'
export default {
	name: 'gene',
	data () {
		return {
			images: [],
			article:[],
			loading: false,
			finished: false,
			page:1
		}
	},
	components:{
		  bottomNav
	},
	computed:{
		...mapGetters(['account']),
	},
	created () {
		
	},
	mounted () {
		console.log(this.account.hospitalId)
		//轮播图图片路径请求
		this.$axios.post('/hospitaler/currentHospitalMaincarouselList')
			.then(res =>{
				for(let i in res.data.data.items){
					// console.log(res.data.data.items[i])
					this.images.push(res.data.data.items[i].cover)
					
				}
				
				// console.log(this.images)
				// this.images.push()
				// console.log(res)
			}).catch((err)=>{
				console.log(err)
				Dialog({ message: '加载失败!' });
			})
		//文章请求
		this.onLoad()
	},
	methods: {
		getdata(_data){
			this.$axios.post('/c2/article/items',qs.stringify({
				hospitalId : this.account.hospitalId,
				pn : this.page,
				ps : 10
			}))
			.then(res => {
				if(res.data.data.items.length != 0){
					for(let i in res.data.data.items){
					console.log(res.data.data.items[i])
					if(res.data.data.items[i]){
						this.article.push({
							content:res.data.data.items[i].title,
							img: res.data.data.items[i].cover,
							time:res.data.data.items[i].alterTime
						}) 
					}else{
						this.$notify({
							message: '数据已全部加载',
							duration: 1000,
							background:'#79abf9',
						})
					}
				}
					if(_data == 1){
						this.page++
					}else{
						this.isLoading = false;
					}
				this.loading = false;
				}else{
					this.$notify({
						message: '数据已全部加载',
						duration: 1000,
						background:'#79abf9',
					})
					this.loading = false;
					this.finished = true;
				}
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: '加载失败!'});
			})
		},
		onLoad(){
			console.log(this.account.hospitalId)
			this.getdata(1)
			
		}
	},
}
</script>

<style scoped>
.hospital{
	height: 100%;
	width: 100%;
}
.navWarp{
	height: 2.26rem;
	width: 100%;
	background: url('../../../static/iOS切图/88-1.png') no-repeat;
	background-size: 100% 1.8rem;
	padding-top: .12rem;
}
.navTitle{
	width: .88rem;
	height: .25rem;
	line-height: .25rem;
	color: #FFFFFF;
	font-size: .14rem;
	font-weight: bolder;
	text-align: center;
	margin: 0 auto;
}
.slider{
	width: 95.7%;
	height: 1.96rem;
	margin: 0rem auto;
	margin-top: .05rem;
	/* background-color: red; */
}
>>>.van-swipe {
    position: relative;
    overflow: hidden;
    -webkit-user-select: none;
    user-select: none;
    /* box-shadow: darkgrey 0rem 0rem  .10rem 3px; */
	height: 100%;
}
>>>.van-swipe__indicators {
    position: absolute;
    bottom: 29px;
    left: 50%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}
.silder_img{
	width:95.5%;
	height: 1.8rem;
	margin: 0rem 2.25%;
	/* box-shadow:0px 0px 30px 5px hsla(0, 0%, 0%, 10%); */
	box-shadow: hsla(0, 0%, 0%, 10%) 0rem 0rem .1rem 0rem;
}
.typeList{
	width: 100%;
	height: 1.7rem;
	margin-top: .12rem;
	margin-bottom: .25rem;
	
}
.typeList ul{
	width: 3.11rem;
	height: 1.85rem;
	margin: 0rem auto;
	text-align: center;
}
.typeList ul li{
	float: left;width: 25%;
}
.typeList ul li:nth-child(5),li:nth-child(6),li:nth-child(7),li:nth-child(8){
	margin-top:.25rem;
}
.typeList ul li img{
	width: .3rem;
	margin: 0rem auto;
	display: block;
}
.typeList ul li span{
	display:block;
	margin-top: -.1rem;
}
.article{
	width: 91.5%;
	margin: 0rem auto;
	border-top: 1px solid #E5E5E5;
	
}
.articleTitle{
	height: 100%;
	width: 100%;
	margin-top: .2rem;
}
.articleTitle img{
	float: left;
	width: .18rem;
	height: .21rem;
	margin-right: .12rem;
}
.articleTitle h3{
	font-weight: bolder;
	font-size: .16rem;
	
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
