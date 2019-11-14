<template>
	<div class="hospital">
		<div class="topNav">
			<div class="hospital_search">
				<input type="text" placeholder="输入文章关键字">
				<img src="../../../static/iOS切图/sousuo@2x.png" alt="">
			</div>
			<div class="hospital_information">
				<img src="../../../static/iOS切图/xiaoxi@2x.png" alt="">
			</div>
		</div>
		<div class="shared">
			<h3>共享医联体</h3>
			<ul>
				<li>
					<img src="../../../static/iOS切图/yiyuanxingxiang@2x.png" alt="">
					<span>医院形象</span>
				</li>
				<li>
					<img src="../../../static/iOS切图/youzhianli@2x.png" alt="">
					<span>优质案例</span>
				</li>
				<li>
					<img src="../../../static/iOS切图/zhuanjia@2x.png" alt="">
					<span>专家介绍</span>
				</li>
				<li>
					<img src="../../../static/iOS切图/huodongfabu@2x.png" alt="">
					<span>最新活动</span>
				</li>
			</ul>
		</div>
		
		<bottomNav v-bind:name='name'></bottomNav>
	</div>
</template>

<script>
import bottomNav from './childPage/bottomNav.vue'
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
	 bottomNav
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

</style>
