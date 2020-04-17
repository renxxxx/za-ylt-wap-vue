<template>
	<div class="urlPage">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="backImg">
				<img src="../../assets/image/shape@3x.png" alt=""  @click="backFn" id="navback" :style="{'padding-top':$store.state.paddingTop}">
			</div>
			<div class="centerNav">
				<h3>{{this.$route.query.name}}</h3>
			</div>

		</div>
		<div class="zhangwei" :style="{'padding-top':$store.state.paddingTop}"></div>
		<div class="center" ref='urlPageRef' >
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'urlPage',
	data () {
		return {

		}
	},
	computed:{

	},
	components:{

	},
	created(){
			var heightRexg = /^[0-9]*/g
			//var topHeight = this.topHeight.match(heightRexg)
			//this.height = parseInt(topHeight.join())
			//
		},

	mounted () {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#2B77EF");
			plus.navigator.setStatusBarStyle("dark")
  		}
		
		this.$axios.get(this.$route.query.url)
		.then((res)=>{
			// 
			this.$refs.urlPageRef.innerHTML = res.data
		})
		.catch((e)=>{
			
		})
	},
	methods: {
		backFn(){
			this.$router.back(-1)
		}
	},
}
</script>

<style scoped>
.urlPage{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	text-align: center;
	position: fixed;
	top:0;
	z-index: 999;
	background-color: #FFFFFF;
	border-bottom: 1px solid #efecec;
}
.zhangwei{
	width: 100%;
	height: .47rem;
}
.backImg img{
	width: .09rem;
	height: .15rem;
	position: absolute;
	left: .16rem;
	top:.16rem;
}
.backImg{
	width: 10%;
	height: 100%;
	/* display: inline; */
	float:left;
}
.centerNav{
	width: 80%;
	height: 100%;
	/* display: inline; */
	float:left;
}
.centerNav h3{
	font-size: .16rem;
	font-weight: bold;
	display: inline-block;
}
.center{
	padding: 5px;

}
</style>
