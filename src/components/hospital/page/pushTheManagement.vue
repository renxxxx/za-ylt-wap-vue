<template>
  <div class="pushTheManagement">
    <div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
    	<img src="../../../assets/image/shape@3x.png" alt=""  @click="goBackFn"  id="navback" :style="{'padding-top':$store.state.paddingTop}">
    	<h3>推送管理</h3>
    </div>
    <div class="zhangwei" :style="{'padding-top':$store.state.paddingTop}"></div>
    <div class="addPush">
      <span>+</span>
      <h5>新建推送</h5>
    </div>
    <ul class="content">
      <li>
        <div class="content_p">
          <span>这有可能是脊椎疼痛患者最期待的新年礼，价值三万多的货我们只送不卖，拿到的都笑了</span>
        </div>
        <div class="content_time">
          <span>2019-02-17 10:48</span>
          <span>已推送</span>
        </div>
      </li>

    </ul>
  </div>

</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'pushTheManagement',
  data () {
    return {
		query:''
    }
  },
  computed:{


  },
  
  created () {

  },
  mounted () {

  },
  activated() {
  	if(this.query != JSON.stringify(this.$route.query)){
  		this.query = JSON.stringify(this.$route.query);
  		if(window.plus){
  			//plus.navigator.setStatusBarBackground("#ffffff");
  			plus.navigator.setStatusBarStyle("dark")
  		}
  	}
  },
  methods: {
    //回退方法
    goBackFn(){
    	this.$router.back(-1)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pushTheManagement{
  width: 100%;
  background-color: #F5F5F5;
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
}
.zhangwei{
	width: 100%;
	height: .47rem;
}
.topNav img{
	width: .09rem;
	height: .15rem;
	position: absolute;
	left: .16rem;
	top:.16rem;
}
.topNav h3{
	font-size: .16rem;
	font-weight: bold;
}
.addPush{
  width: 93.6%;
  height: .49rem;
  line-height: .49rem;
  background-color: #FFFFFF;
  text-align: center;
  margin: .12rem auto;
}
.addPush span{
  color: #2B77EF;
  width: .15rem;
  height: .15rem;
  line-height: .15rem;
  border: 1px solid #2B77EF;
  display: inline-block;
  border-radius: .03rem;
}
.addPush h5{
  font-size: .145rem;
  color: #2B77EF;
  display: inline;
}
.content{
  width: 100%;
}
.content li{
  width: 93.6%;
  height: 1.215rem;
  margin: 0rem auto .12rem;
  background-color: #FFFFFF;
}
.content_p{
  width: 100%;
  height: .72rem;
  border-bottom: 1px solid #E5E5E5;
}
.content_p>span{
  width: 91.45%;
  height: .42rem;
  line-height: .21rem;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  font-weight: bold;
  color: #333333;
  padding-top: .15rem;
  margin: auto;
}
.content_time{
  width: 91.45%;
  height: .49rem;
  line-height: .49rem;
  margin: auto;
}
.content_time span{
  color: #768892;
}
.content_time span:last-child{
  float: right;
  color: #2B77EF;
}
</style>
