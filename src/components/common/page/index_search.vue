<template>
	<div class="_search">
		<div class="top_search">
			<div class="search_return">
				<a @click="goBackFn">
					<img src="static/img/shape@3x.png" alt="">
				</a>
			</div>
			<div class="search_input">
				<img src="static/img/sousuo@2x.png" alt="">
				<input type="text" placeholder="搜索病员" v-model="list.keywords" v-focus='this.$route.query.focus'>
			</div>	
			<div class="clinic_buttton"  @click="inputNow">
				<button>搜索</button>
			</div>
			<div class="screening" @click="showPopup">
				<span>筛选</span>
				<img src="static/img/screening.png" alt="">
			</div>
      <timeChoose :list = 'list'></timeChoose>
		</div>
		<clinicAll ref='all' :list = 'list'></clinicAll>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import timeChoose from '../functionPage/timeChoose.vue'
import clinicAll from '../functionPage/clinicAll.vue'
export default {
  name: 'index_search',
  data () {
    return {
      timer :undefined,
      list:{
      	keywords : '',			//搜索框的关键字value
      	allNum : 0,
      	clinicId : '',
      	clinicAll : [],
      }
    }
  },
  computed:{
	...mapGetters(['Time','showTime','detail','account']),
	show: {
	      get: function() {
	  		// console.log(this.$store)
	          return this.$store.state.shop.show
	      },
	      set: function (newValue) {
	  		this.$store.state.shop.show = newValue;
	      },
	},
	showTime: {
	    get: function() {
			// console.log(this.$store)
	        return this.$store.state.shop.showTime
	    },
	    set: function (newValue) {
			this.$store.state.shop.showTime = newValue;
	    },
	},
  },
  components:{
    timeChoose,clinicAll
  },
  created () {

  },
  mounted () {
	  if(window.plus){
			plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
	this.getdata();
  },
  methods: {
	//显示筛选弹窗
	showPopup() {
	   this.show = true;
	},
	//获取数据
	getdata(){

	},
	//键盘输入值时触发
  	inputNow(_keywordsCode){
		//清除计时器
		if (this.timer) {
		    clearTimeout(this.timer);
		}
		if (_keywordsCode) {
		    this.timer = setTimeout(() => {
				this.$refs.all.search();
		    }, 200);
		} else {
		    // 输入框中的内容被删为空时触发，此时会清除之前展示的搜索结果
		    this.$refs.all.search();
		}
  	},
	goBackFn(){
		this.$router.back(-1)
	},
	...mapActions([])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
._search{
	position: relative;
	width: 100%;
	/* height: 100%; */
	padding-top: .52rem;
	/* background-color: #F5F5F5; */
	background-color: #FFFFFF;
}
.top_search{
	height: .5rem;width: 100%;
	background-color: #FFFFFF;
	position:fixed;
	top:0;
	/* margin-top: -.62rem; */
	z-index: 999;
}
.search_return{
	height: .5rem;width: 11.3%;
	float: left;
}
.search_return a{
	height: .5rem;width: 100%;
}
.search_return a img{
	width: .09rem;
	height: .16rem;
	margin: .17rem .18rem;

}
.search_input{
	float: left;width: 63%;
}
.search_input input{
	background-color: #F5F5F5;
	height: .335rem;
	line-height: .3rem;
	width: 79%;
	margin: .082rem 0rem;
	border: none;
	border-radius: 25px;
	position: relative;
	padding-left: .37rem;
}
.search_input img{
	height: .15rem;
	width: .15rem;
	z-index: 3;
	position: absolute;
	top: .18rem;
	left: .6rem;
}
.clinic_buttton{
	float: left;
	margin-top: .125rem;
	margin-left: -.05rem;
}
.clinic_buttton button{
	color: #FFFFFF;
	background-color: #2B77EF;
	border-radius: .15rem;
	border: none;
	height: .28rem;
	width: .45rem;
	font-size: .12rem;
}
.screening{
	float: left;
	width: 12.7%;
	height: .5rem;
	line-height: .5rem;
	margin-left: .05rem;
}
.screening span{
	/* font-weight: bold; */
	margin-left: .05rem;
	font-size: .12rem;
	padding-top: .03rem;
	display: inline-block;
}
.screening img{
	height: .13rem;
	width: .12rem;
}
.search_content{
	margin: 0 .12rem;
}
.search_content li {
	height:1.01rem;
	margin-top:.12rem;
	background-color:#FFFFFF;
	position:relative;
	/* padding:.14rem .15rem; */
}
.search_content li p{
	position:absolute;
	bottom:0;
	height:.5rem;
	width:93%;
	line-height:.5rem;
	margin-left:.14rem;
	border-top:1px solid #E5E5E5;
}
.content_left{
	float:left;
	height:.5rem;
	margin-top:.14rem;
	margin-left:.15rem;
}
.content_right{
	float:right;
	height:.5rem;
	margin-right:.14rem;
	margin-top:.15rem
}
.content_right img{
	width:.11rem;
	height:.11rem;
	margin-right:.04rem;
}
>>>[data-v-6bfd94e2] .van-pull-refresh{
    overflow: visible!important;
    -webkit-user-select: none;
    user-select: none;
}


#indexLabel{
	width: 85.5%;
	padding: .32rem .2rem .25rem .2rem;
	position: relative;
}
.labelLabel{
	height: .95rem;
}
.labelLabel:first-child{
	height: .95rem;
	border-bottom: 1px dotted  rgba(0, 0, 0, 0.4);
}
.labelLabel strong{
	display: block;
}
.rightLine{
	margin-right: .25rem;
}
.rightLine:after{
	content: " ";
	position: absolute;
	height: .01rem;
	width: .15rem;
	bottom: 0;
	top: 50%;
	left:107%;
	background-color: #999999;

}
.labelLabel button{
	height: .3rem;width: 1.05rem;
	margin-top: .1rem;
	border-radius: .15rem;
	border: none;background: #EEEEEE;
	text-align: center;position: relative;
}
.labelLabel:first-child button:last-child{
	margin-left: .2rem;
}
.LabelResult{
	position: fixed;bottom: .25rem;right: .2rem;
}
.LabelResult button:first-child{
	border: none;height: .3rem;text-align: center;width: .8rem;
	border-radius: 100px  0px  0px  100px;
	background-color: #1ECAC6;
}
.LabelResult button:last-child{
	border: none;height: .3rem;text-align: center;width: .8rem;
	border-radius:0px 100px 100px 0px;
	background-color: #FF951B;
}
</style>
