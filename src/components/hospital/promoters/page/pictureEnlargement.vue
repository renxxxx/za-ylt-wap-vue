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
