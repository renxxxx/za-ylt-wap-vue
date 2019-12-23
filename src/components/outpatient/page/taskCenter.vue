<template>
	<div class="taskCenter">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn">
				<img src="static/img/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<!-- <h3>任务管理</h3> -->
			</div>
			<router-link :to="{name: 'outpatient_integralExchange'}">
				<div class="right">
					<span>我要兑换</span>
				</div>
			</router-link>
			<div class="Explain" @click="showExplainFn">
				<button>积分说明</button>
			</div>
		</div>
		<van-overlay :show="showExplain" @click="showExplain = false">
			<div class="explainContent">
				<div class="explainTitle">
					<h4>积分说明</h4>
				</div>
				<div class="explainRule">
					<p>完成指定的任务可以获得相应的积分，积分规则如下：</p>
				</div>
				<div class="explainRulenNum">
					<p>1.首次收益为第一次的任务收益：每个用户仅可领取一次。首次上传病员可一次领取20000积分；首次确认就诊即给上级医院输送的病员首次被确认就诊，用户可得20000积分；首次浏览文章可获得20000积分；首次分享文章获得20000积分。</p>
					<p>2.每日收益为每天都可以做的任务，每天都可领取到的积分。每日首次登录获得1分；上传病员每位20分，上限200分；浏览文章5分，上限10分；分享文章5分，上限10分；上级医院确认就诊20分一位，上限200分；文章推广即分享出去的文章获得的点击量，2分一个，上限20分。</p>
				</div>
				<img src="static/img/Leaves@2x.png" alt="">
			</div>
		</van-overlay>
		<div class="centerOnce" v-show="task.once.length==0? false:true">
			<ul>
				<h3 class="titleBefore">首次收益</h3>
				<li v-for="(item,inx) in task.once" :key='inx'>
					<h4>{{item.name}}<span>+{{item.exchangePointUpperPerDay}}</span></h4>
					<p>{{item.intro}}</p>
					<button :class="item.doneIs? 'buttonColorYes':'buttonColorNo'">{{item.doneIs? '已完成':'去完成'}}</button>
				</li>
			</ul>
		</div>
		<div class="centerDate" v-show="task.daily.length==0? false:true">
			<ul>
				<h3 class="titleBefore">每日收益</h3>
				<li v-for="(item,inx) in task.daily" :key='inx+1'>
					<h4>{{item.name}}<span>+{{item.everyDayIs}}</span><span>/</span></h4>
					<van-progress :percentage="item.gotExchangePointToday/item.exchangePointUpperPerDay*100" :show-pivot='false' :color="'#FF1A2E'" :rack-color="'#E5E5E5'" stroke-width='0.05rem'/>
					<p>已获{{item.exchangePoint}}分/上限{{item.exchangePointUpperPerDay}}分</p>
					<button :class="item.doneIs? 'buttonColorYes':'buttonColorNo'">{{item.doneIs? '已完成':'去完成'}}</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
// import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'taskCenter',
	data () {
		return {
			buttonColor: false,
			task:{
				once : [],
				daily : [],
			},
			showExplain : false,
		}
	},
	computed:{
	  ...mapGetters(['account'])
	},
	components:{

	},
	created(){

	},
	mounted(){
		this.$axios.post('/clientend2/clinicend/taskcenter/tasks',qs.stringify({
			clinicId : this.account.clinicId,
		}))
		.then(res => {
			if(res.data.codeMsg == '' || res.data.codeMsg == null || res.data.codeMsg == undefined){
				for(let i in res.data.data.rows){
					if(res.data.data.rows[i].oneTimeIs == 1){
						this.task.once.push(res.data.data.rows[i]);
						// console.log(tahis.task.once)
					}else{
						this.task.daily.push(res.data.data.rows[i])
					}
				}
			}else{
				this.$toast.fail(res.data.codeMsg)
			}
		})
		.catch((err)=>{
			Dialog({ message: err});
		})
	},
	methods: {
		goBackFn(){
			this.$router.back(-1)
		},
		showExplainFn(){
			this.showExplain = true
		}
	},
}
</script>

<style scoped>
.taskCenter{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: 1.76rem;
	background: url('../../../../static/img/tu1.png')  center no-repeat,linear-gradient(#FDFDFD, #FBFBFB) ;
	background-size: 1.84rem 1.29rem;
	margin-bottom: .15rem;
	position: relative;
}
.leftImg{
	width: 22%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
	line-height: .47rem;
	padding-left: .16rem;
}
.centerTitle{
	width: 56%;
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
	width: 22%;
	height: .47rem;
	line-height: .47rem;
	text-align: right;
	float:left;
}
.right span{
	color: #2B77EF;
	font-size: .14rem;
	padding-right: .16rem;
}
.Explain{
	position: absolute;
	right: 0;
	bottom: .12rem;
}
.Explain button{
	width: .86rem;
	height: .285rem;
	border: none;
	border-radius: .5rem  0rem 0rem  .5rem ;
	color: #FFFFFF;
	background-color: #459AE9;
}
.centerOnce,.centerDate{
	width: 100%;
	margin: .12rem 0rem;
	background-color: #FFFFFF;
}
.centerOnce ul,.centerDate ul{
	width: 91.46%;
	margin: 0rem auto;
}
.centerOnce ul h3,.centerDate ul h3{
	color: #999999;
	position: relative;
	padding: .15rem 0rem;
	padding-left: .1rem!important;
}
.centerOnce ul li,.centerDate ul li{
	width: 100%;
	height: .67rem;
	line-height: .67rem;
	position: relative;
	border-bottom: 1px solid #EEEEEE;
}
.titleBefore:before {
    content: "";
    display: inline-block;
    width: .04rem;
    height: .11rem;
    background-color: #2B77EF;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* border-radius: 3px; */
    position: absolute;
    top: .185rem;
    left: -0rem;
}
.centerOnce ul li h4,.centerDate ul li h4{
	width:60%;
	color: #333333;
	line-height: .22rem;
	font-size: .14rem;
	font-weight: bolder;
	padding-top: .12rem;
	padding-bottom: .06rem;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.centerOnce ul li h4 span,.centerDate ul li h4 span{
	color: #FF1A2E;
	font-size: .13rem;
	margin-left: .15rem;
	font-weight: normal;
}
.centerDate ul li h4 span:last-child{
	font-size: .13rem;
	margin-left: 0rem;
	font-weight: normal;
	color: #999999;
}
.centerOnce ul li p,.centerDate ul li p{
	width:60%;
	line-height: .16rem;
	font-size: .12rem;
	color: #666666;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.centerDate ul li p{
	width: 39%;
}
.centerDate ul li p{
	float: left;
	margin-left: .95rem;
	margin-top: -.1rem!important;
}
.centerOnce ul li button,.centerDate ul li button{
	position: absolute;
	bottom: .18rem;
	right: .16rem;
	width: .8rem;
	height: .3rem;
	line-height: .3rem;
	text-align: center;

	border-radius: .15rem;
}
.buttonColorYes{
	color: #666666;
	background-color: #E5E5E5;
	border: none;
}
.buttonColorNo{
	color: #E2403F;
	background-color: #FFFFFF;
	border: 1px solid #E2403F;
}
>>>.van-progress {
    height: 4px;
    background: #e5e5e5;
    border-radius: 4px;
    width: .7rem;
    position: relative;
	margin-top: .05rem;
}
.explainContent{
	width: 62.93%;
	/* width: 72%; */
	height: 5rem;
	background-color: #FFFFFF;
	display: block;
	margin: auto;
	margin-top: 20%;
	border-radius: 10px  6px  6px  6px;
	position: relative;
	padding: 0rem 4.535%;
}
.explainContent>img{
	position: absolute;
	width: .87rem;
	/* height: .87rem; */
	object-fit: cover;
	right: -.24rem;
	bottom: 0rem;
}
.explainTitle{
	width: 100%;
	height: .42rem;
	line-height: .42rem;
	text-align: center;
	font-size: .13rem;
	color: #333333;
}
.explainRule{
	color:#333333;
	font-size: .12rem;
	margin-bottom: .15rem;
}
.explainRulenNum p{
	color:#333333;
	font-size: .12rem;
}
.explainRulenNum p:first-child{
	padding-bottom: .15rem;
}
</style>
