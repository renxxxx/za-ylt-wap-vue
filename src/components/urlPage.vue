<template>
	<div class="urlPage">
		<div class="topNav" :style="{'padding-top':$store.state.topHeight}">
			<div class="backImg">
				<img src="../assets/image/shape@3x.png" alt=""  @click="backFn" id="navback" :style="{'padding-top':$store.state.topHeight}">
			</div>
			<div class="centerNav">
				<h3>{{this.$route.query.name}}</h3>
			</div>
			
		</div>
		<div class="zhangwei" :style="{'padding-top':$store.state.topHeight}"></div>
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
			//console.log(this.height)
		},
	beforeRouteLeave(to, from, next) {
		this.scrollTop =document.getElementById('app').scrollTop ||document.getElementById('app').pageYOffset
		if(!to.query.time || !from.query.time || to.query.time < from.query.time){
			 debugger
	          if (this.$vnode && this.$vnode.data.keepAlive)
	          {
	              if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
	              {
	                  if (this.$vnode.componentOptions)
	                  {
	                      var key = this.$vnode.key == null
	                                  ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
	                                  : this.$vnode.key;
	                      var cache = this.$vnode.parent.componentInstance.cache;
	                      var keys  = this.$vnode.parent.componentInstance.keys;
	                      if (cache[key])
	                      {
	                          if (keys.length) {
	                              var index = keys.indexOf(key);
	                              if (index > -1) {
	                                  keys.splice(index, 1);
	                              }
	                          }
	                          delete cache[key];
	                      }
	                  }
	              }
				}
	          this.$destroy();
			}
		next();
	},
	//进入该页面时，用之前保存的滚动位置赋值
	beforeRouteEnter(to, from, next) {
	  next(vm => {
		 document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
		});
		
	},
	mounted () {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#2B77EF");
			plus.navigator.setStatusBarStyle("dark")
  		}
		console.log(this.$route.query.url)
		this.$axios.get(this.$route.query.url)
		.then((res)=>{
			// console.log(res)
			this.$refs.urlPageRef.innerHTML = res.data
		})
		.catch((e)=>{
			console.log(e)
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
