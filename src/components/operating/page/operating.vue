<template>
	<div class="operating">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@3x.png" alt="" id="navback" >
			</div>
			<div class="centerTitle">
				<h3>优质案例</h3>
			</div>
			<div class="right"></div>
		</div>
    <div class="zhangwei" :style="{'padding-top':$store.state.paddingTop}"></div>
    <ul>
      <!-- <li v-for="(items,inx) in 4" :key='inx'> -->
      <!-- <router-link :to="{name:'hospital_pushTheManagement'}"> -->
      <li @click="data">
          <h4>发布推送</h4>
          <img src="../../../assets/image/Chevron Copy 2@2x.png" alt="">
      </li>
      <!-- </router-link> -->
      <router-link :to="{path:'/operating/operating_operatingManual',query:{hospitalId: this.$route.query.hospitalId,}}">
        <li>
          <h4>运营手册</h4>
          <img src="../../../assets/image/Chevron Copy 2@2x.png" alt="">
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'operating',
  data () {
    return {

    }
  },
  computed:{

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
    //回退方法
    goBackFn(){
    	this.$router.back(-1)
    },
	data(){
		this.$toast("暂未开通");
	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operating{
  width: 100%;
  background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 9999;
}
.zhangwei{
	width: 100%;
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
.operating>ul{
  width: 100%;
  margin-top: .12rem;
  background-color: #FFFFFF;
}
.operating>ul li{
  width: 95.73%;
  height: .52rem;
  line-height: .52rem;
  margin-left: 4.27%;
  border-bottom: 1px solid #EEEEEE;
  font-size: .15rem;
  color: #333333;
  position: relative;
}
.operating>ul li:last-child{
	border: none;
}
.operating>ul li h4{
  display: inline-block;
  font-weight: bold;
}
.operating>ul li img{
  width: .08rem;
  height: .13rem;
  display: inline-block;
  position: absolute;
  right: 4.8%;
  top: 0;
  bottom: 0;
  margin: auto 0rem;
}
</style>
