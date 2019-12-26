<template>
	<div class="search_clinic">
		<div class="navWarp">
			<div class="topNav">
				<div class="clinic_information" @click="goBackFn">
					<img src="../../../assets/image/shape@3x.png" alt="">
				</div>
				<div class="clinic_search">
					<input type="text" placeholder="搜索门诊"  v-model="keywords" @keyup="inputNow">
					<img src="../../../assets/image/sousuo@2x.png" alt="">
				</div>
			</div>
		</div>
		<clinic_content ref='content'></clinic_content>
		
		
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import clinic_content from '../functionPage/clinic_content.vue'
export default {
	name: 'search',
	data () {
		return {
			keywords : '',
			content : [],
		}
	},
	computed:{
	  
	},
	components:{
		clinic_content
	},
	created () {
		
	},
	mounted () {
	if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
	},
	methods: {
		goBackFn(){
			this.$router.back(-1)
		},
		//获取数据
		getdata(){
			// console.log(this.Time)
			this.$axios.post('/c2/clinic/items',qs.stringify({
				kw : this.keywords,
			}))
			.then(_d => {
				// console.log( _d.data.data.items)
				// this.content = _d.data.data.items;
				// console.log(this.$refs.content.content)
				this.$refs.content.content = _d.data.data.items
			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: '加载失败!'});
			})
		},
		//键盘输入值时触发
		inputNow(_keywordsCode){
			//清除计时器
			if (this.timer) {
			    clearTimeout(this.timer);
			}
			if (_keywordsCode) {
			    this.timer = setTimeout(() => {
					this.getdata();
			    }, 500);
			} else {
			    // 输入框中的内容被删为空时触发，此时会清除之前展示的搜索结果
			    this.getdata();
			}
		},
	},
}
</script>

<style scoped>
.search_clinic{
	width: 100%;
}
.navWarp{
	width: 100%;
	height: .55rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 3;
}
.topNav{
	width: 100%;
	height: .42rem;
}
.clinic_search{
	float:left;
	width: 90.3%;
	position: relative;
}
.clinic_search input{
	margin: .09rem 0rem 0rem 0rem;
	height:.33rem;
	width: 80%;
	border: none;
	border-radius: .33rem;
	padding-left: 11.6%;
	background-color: rgba(0, 0, 0, 0.05);
}
.clinic_search img{
	width: .14rem;
	height: .15rem;
	position: absolute;
	top: .18rem;
	left: 4.8%;
}
.clinic_information{
	float:left;
	width: 5.3%;
	margin-left: .16rem;
	margin-top: .19rem;
}
.clinic_information img{
	width: .09rem;
	height: .15rem;
}
.listTitle{
	width: 84%;
	height: .26rem;
	margin: 0rem auto;
	margin-top: .3rem;
}
.titleleft{
	float: left;
	height: .26rem;
	line-height: .26rem;
}
.content[data-v-3c6a3c8a] {
    width: 100%;
    height: 100%;
    margin-top: 0rem;

}
>>>.van-pull-refresh {
    overflow: visible;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-top: .45rem!important;
}
.content ul li:first-child {
    margin-top: 0rem!important;
}
</style>
