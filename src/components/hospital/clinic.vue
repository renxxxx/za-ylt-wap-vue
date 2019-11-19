<template>
	<div class="hospital">
		<div class="navWarp">
			<div class="topNav">
				<div class="hospital_search">
					<input type="text" placeholder="输入门诊名">
					<img src="../../../static/iOS切图/sousuo@2x.png" alt="">
				</div>
				<div class="hospital_information">
					<img src="../../../static/iOS切图/xiaoxi@2x.png" alt="">
				</div>
			</div>
			<div class="shared">
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
			<div class="statisticalTitle">
				<h3>合作门诊（376）</h3>
				<div class="statisticalAdd">
					<span>新增</span>
					<img src="../../../static/iOS切图/xinzeng@2x.png" alt="">
				</div>
			</div>
		</div>
		
		<clinic_content></clinic_content>
		
		<bottomNav v-bind:name='name'></bottomNav>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import bottomNav from './childPage/bottomNav.vue'
import clinic_content from './childPage/clinic_content.vue'
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
		clinic_content,bottomNav
	},
	created () {
		
	},
	mounted () {
		// this.getdata(0)
	},
	methods: {
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hospital{
	width: 100%;
}
.navWarp{
	width: 100%;
	height: 2.1rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 3;
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
	height: .73rem;
	width: 89%;
	margin: 0rem auto;
	margin-top: .3rem;
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
.statisticalTitle{
	margin-top: .25rem;
	width: 100%;
	height: .26rem;
	line-height: .26rem;
	padding-bottom: .1rem;
}
.statisticalTitle h3{
	float: left;
	margin-left: .18rem;
	font-size: .16rem;
	font-weight: bolder;
}
.statisticalAdd{
	float: right;
	height: .26rem;
	line-height: .26rem;
	margin-right: .18rem;
}
.statisticalAdd span{
	font-size: .15rem;
}
.statisticalAdd img{
	height: .19rem;
	width: .19rem;
	/* margin: .04rem 0rem; */
	margin-left: .05rem;
	margin-top: -.03rem;
}

</style>
