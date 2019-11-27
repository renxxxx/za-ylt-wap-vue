<template>
	<div class="caseDetails">
		<div class="topNav">
			<img src="static/iOS切图/shape@2x.png" alt="">
			<img src="static/iOS切图/share@3x.png" alt="">
		</div>
		<div class="banner">
			<img src="static/iOS切图/denglu2@3x.png" alt="">
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import Dialog from 'vant';
export default {
	name: 'caseDetails',
	data () {
		return {
			
		}
	},
	computed:{
		...mapGetters(['account']),
	},
	components:{
		
	},
	created(){
		
	},
	mounted(){
		// this.$axios.post('c2/office/item',qs.stringify({
		// 	itemId : this.account.itemId,
		// }))
		// .then(_d => {
		// 	// console.log(_d.data.data)
		// })
		// .catch((err)=>{
		// 	console.log(err);
		// 	Dialog({ message: err});
		// })
		
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
		
	},
}
</script>

<style scoped>
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
}
.topNav img:first-child{
	width: .09rem;
	height: .15rem;
	float: left;
	margin-top: .16rem;
	margin-left: .16rem;
}
.topNav img:last-child{
	width: .19rem;
	height: .19rem;
	float: right;
	margin-top: .14rem;
	margin-right: .21rem;
}
.banner{
	height: 1.75rem;
	width: 100%;
}
.banner img{
	width: 100%;
	height: 1.75rem;
}
</style>
