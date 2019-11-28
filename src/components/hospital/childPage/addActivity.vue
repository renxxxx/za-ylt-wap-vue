<template>
	<div class="addAcivity">
		<div class="topNav">
			<div class="left" @click="goBackFn">
				<button>取消</button>
			</div>
			<div class="centerTitle">
				<h3>编辑活动</h3>
			</div>
			<div class="right">
				<button>预览</button>
			</div>
		</div> 
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'addAcivity',
	data () {
		return {
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
.addAcivity{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	background-color: #FFFFFF;
	border-bottom: 1px solid #E5E5E5;
}
.left{
	width: 10%;
	height: .47rem;
	float:left;
}
.centerTitle{
	width: 80%;
	text-align: center;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.centerTitle h3{
	font-size: .16rem;
	font-weight: bolder;
}
.right{
	width: 10%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
</style>
