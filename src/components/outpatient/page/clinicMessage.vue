<template>
	<div class="message">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>推送通知</h3>
			</div>
			<div class="right">
			</div>
		</div>
		<div class="zhangwei" :style="{'padding-top':$store.state.paddingTop}"></div>
		<div class="content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul>
          <li v-for="(item,inx) in clinicMessage" :key='inx'>
            <router-link :to="{path : '/outpatient/outpatient_detailsPage' ,query : {patientId : item.itemId,time:new Date().getTime()}}">
              <div class="triangle_border_up">
                <span></span>
              </div>
              <div class="contentTitle">
                <span>{{item.realname}}</span>
                <span>所属：{{item.clinicName}}</span>
                <span>时间 : {{moment(item.pushTime).format('YYYY-MM-DD HH:MM')}}</span>
              </div>
              <div class="contentTel">
                <span>去联系</span>
              </div>
            </router-link>
          </li>
        </ul>
      </van-list>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
	name: 'case',
	data () {
		return {
			clinicMessage : [],
			loading: false,
			finished: false,
			page: 0,
		}
	},
	computed:{
	  ...mapGetters(['account']),
	},
	components:{

	},
	created(){
		var heightRexg = /^[0-9]*/g
		//var topHeight = this.topHeight.match(heightRexg)
		//this.height = parseInt(topHeight.join())
	},
 mounted() {
	  debugger
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}

	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
		onLoad(){
		  ++this.page;
		  // 
		  this.getdata();
		},
		getdata(){
      this.$axios.post('/c2/patient/items',qs.stringify({
      	hospitalId : this.$store.state.outpatient.login.hospitalId,
        pn: this.page,
        ps: 10
      }))
      .then(res => {
      	if(res.data.data.items.length != 0){
      	  for(let i in res.data.data.items){
      	    this.clinicMessage.push(res.data.data.items[i])
      	  }
      	  this.loading = false;
      	}else {
      	    this.loading = false;
      	    this.finished = true;
      	  }
      })
      .catch((err)=>{
      	
      	//Dialog({ message: err});;
      })
    }
	},
}
</script>

<style scoped>
.message{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 999;
}
.zhangwei{
	height: .47rem;
}
.leftImg{
	width: 10%;
	height: .47rem;
	float:left;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
	line-height: .47rem;
	padding-left: .16rem;
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
.content{
	width: 100%;
}
.content ul{
	width: 91.46%;
	margin: 0rem auto;
	margin-top: .2rem;
}
.content ul li{
	width: 100%;
	height: .95rem;
	border: 1px solid #FF1A2E;
	border-radius: .08rem;
	/* padding: .16rem .22rem; */
	position: relative;
	margin-bottom: .12rem;
}
.triangle_border_up{
	width: .3rem;
	height: .3rem;
	float: left;
	/* display: inline-block; */
}
.triangle_border_up span{
	display:block;
	width:0;
	height:0;
	border-width:0 .06rem .06rem;
	border-style:solid;
	border-color:transparent transparent #FF1A2E;/*透明 透明  黄*/
	top : .23rem;
	left: .22rem;
	position: absolute;
}
.contentTitle{
	width: 1.41rem;
	height: .61rem;
	float: left;
	margin-top: .16rem;
	margin-left: .15rem;

}
.contentTitle span{
	display: block;
	color: #0D0E10;
	font-size: .12rem;
}
.contentTitle span:first-child{
	font-size: .15rem;
	font-weight: bolder;
	margin-bottom: .03rem;
}
.contentTel{
	float: right;
	color: #FF1A2E;
	margin-top: .39rem;
	margin-right: .22rem;
}
</style>
