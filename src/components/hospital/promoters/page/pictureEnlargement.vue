<template>
	<div class="_photo" >
		<!-- <van-image-preview
			v-model="enlarge"
			:images="imgUrl"
			:start-position='photoNum'
			@change="onChange"
			lazy-load = true
		>
		@close="backFn"
		  <template v-slot:index>第{{ photoPage+1 }}页</template>
		</van-image-preview> -->
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { ImagePreview } from 'vant';
export default {
	name: '',
	data () {
		return {
			enlarge : true,
			imgUrl:[],
			photoNum : 0,
			photoPage : 0,
			inx: 0,
		}
	},
	computed:{

	},
	components:{

	},
	created () {
		this.imgUrl = this.$route.query.imgUrl;
		this.inx = this.$route.query.inx;
		this.enlarge = this.$route.query.data;
		// 
	},
	beforeRouteLeave(to, from, next) {
	  //debugger;
		this.scrollTop =document.getElementById('promoters').scrollTop ||document.getElementById('promoters').pageYOffset
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
    debugger
      next(vm => {
      document.getElementById('promoters').scrollTop=document.getElementById('promoters').pageYOffset=vm.scrollTop;
    });
  },
	mounted () {
		let _this = this
		ImagePreview({
			images: this.imgUrl,
			asyncClose: false,
			startPosition: this.$route.query.inx? this.$route.query.inx : 0,
			onClose(){
				_this.$router.back()
			}
		});
	},
	methods: {
		// backFn(){
		// 	debugger

		// 	//this.enlarge = false;
		// 	this.$router.back()
		// 	
		// },
		// enlargeFn(_value){
		// 	this.photoNum = _value;
		// 	
		// 	this.enlarge = true;
		// },
		// onChange(_value){
		// 	this.photoPage = _value;
		// 	
		// },
	},
}
</script>

<style scoped>

</style>
