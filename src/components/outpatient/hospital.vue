<template>
	<div class="hospital">
		<div class="topNav">
			<div class="hospital_search">
				<input type="text" placeholder="输入文章关键字">
				<img src="static/img/sousuo@2x.png" alt="">
			</div>
			<div class="hospital_information">
				<img src="static/img/xiaoxi@2x.png" alt="">
			</div>
		</div>
		<div class="shared">
			<h3>共享医联体</h3>
			<ul>
				<router-link :to="{name : 'hospitalImage'}">
					<li>
						<img src="static/img/yiyuanxingxiang@2x.png" alt="">
						<span>医院形象</span>
					</li>
				</router-link>
				<router-link :to="{name : 'hospital_case'}">
					<li>
						<img src="static/img/youzhianli@2x.png" alt="">
						<span>优质案例</span>
					</li>
				</router-link>
				<router-link :to="{name : 'hospital_expertsIntroduction'}">
					<li>
						<img src="static/img/zhuanjia@2x.png" alt="">
						<span>专家介绍</span>
					</li>
				</router-link>
				<router-link :to="{name : 'hospital_activityReleased'}">
					<li>
						<img src="static/img/huodongfabu@2x.png" alt="">
						<span>最新活动</span>
					</li>
				</router-link>
			</ul>
		</div>
		
		<div class="article">
			<h3>文章分享</h3>
			<ul>
				<li>
					<div class="article_left">
						<p>身体有这些症状，说明你可能感染了幽门螺旋杆菌</p>
						<div class="article_leftTime">
							<img src="static/img/time@2x.png" alt="">
							<span>2019-02-19 12:39</span>
						</div>
					</div>
					<div class="article_right">
						<img src="static/img/Group@2x.png" alt="">
					</div>
				</li>
				
				<li>
					<div class="article_left">
						<p>身体有这些症状，说明你可能感染了幽门螺旋杆菌</p>
						<div class="article_leftTime">
							<img src="static/img/time@2x.png" alt="">
							<span>2019-02-19 12:39</span>
						</div>
					</div>
					<div class="article_right">
						<img src="static/img/Group@2x.png" alt="">
					</div>
				</li>
				
				<li>
					<div class="article_left">
						<p>身体有这些症状，说明你可能感染了幽门螺旋杆菌</p>
						<div class="article_leftTime">
							<img src="static/img/time@2x.png" alt="">
							<span>2019-02-19 12:39</span>
						</div>
					</div>
					<div class="article_right">
						<img src="static/img/Group@2x.png" alt="">
					</div>
				</li>
			</ul>
		</div>
		<routerNav v-bind:name='name'></routerNav>
	</div>
</template>

<script>
import routerNav from './childPage/router.vue'
export default {
  name: 'hospital',
  data () {
    return {
		name: 'hospital',
    }
  },
  computed:{
	  
  },
  components:{
	 routerNav
  },
  created () {
		
  },
  mounted () {
		
  },
  methods: {
  
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hospital{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .42rem;
}
.hospital_search{
	float:left;
	width: 85.9%;
	position: relative;
}
.hospital_search input{
	margin: .08rem 0rem 0rem .16rem;
	height:.34rem;
	width: 80%;
	border: none;
	border-radius: .33rem;
	padding-left: 11.6%;
	background-color: #0000000D;
}
.hospital_search img{
	width: .14rem;
	height: .15rem;
	position: absolute;
	top: .18rem;
	left: 9.8%;
}
.hospital_information{
	float:left;
	width: 10.3%;
	margin-left: .14rem;
	margin-top: .15rem;
}
.hospital_information img{
	width: .19rem;
	height: .24rem;
}
.shared{
	height: 1.29rem;
	width: 89%;
	margin: 0rem auto;
	margin-top: .3rem;
}
.shared h3{
	font-weight: bold;
	font-family: '苹方-简 中粗体';
}
.shared ul{
	width: 100%;
	margin-top: .25rem;
}
.shared ul li{
	width: 25%;
	float: left;
	text-align: center;
}
.shared ul li img{
	width: .56rem;
	height: .43rem;
	display: block;
	margin: 0 auto;
	margin-bottom: .12rem;
}
.article{
	width: 91.5%;
	margin: 0rem auto;
	margin-top: .3rem;
}
.article h3{
	font-weight: bolder;
	font-size: .18rem;
}
.article ul{
	margin-top: .18rem;
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
