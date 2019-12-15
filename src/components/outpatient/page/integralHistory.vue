<template>
	<div class="integralHistory">
    <div class="topNav">
    	<div class="leftImg" @click="goBackFn">
    		<img src="static/img/shape@3x.png" alt="">
    	</div>
    	<div class="centerTitle">
    		<h3>积分明细</h3>
    	</div>
    	<div class="right"></div>
    </div>
    <div class="detailsTitle">
      <img src="static/img/Select@2x.png" alt="">
      <span>积分使用明细</span>
    </div>
    <ul>
      <li v-for="(item,inx) in 4" :key="inx">
        <img src="static/img/bj-keshi@2x.png" alt="">
        <div class="ulTitle">
          <h4>半自动体外除颤器</h4>
          <p>心脏骤停-分秒必争</p>
          <p>2017-12-28 14:36</p>
          <span>数量 <strong>2</strong></span>
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
  name: 'integralHistory',
  data () {
    return {

    }
  },
  computed:{


  },
  created () {

  },
  mounted () {
    this.$axios.post('/clientend2/clinicend/pointexchange/msgs',qs.stringify({
    	clinicId : this.account.clinicId,
    	pn : 1,
    	ps : 10
    }))
    .then(res => {
    	if(res.data.codeMsg == '' || res.data.codeMsg == null || res.data.codeMsg == undefined){
    		for(let i in res.data.data.items){
    			this.contentArr.push(res.data.data.items[i].title);
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
      this.$router.back(-1);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.integralHistory{
	width: 100%;
  height: 100%;
  background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: .47rem;
  background-color: #FFFFFF;
}
.leftImg{
	width: 10%;
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
.detailsTitle{
  width: 100%;
  height: .52rem;
  line-height: .52rem;
  background-color: #FFFFFF;
  border-top: 1px solid #EEEEEE;
  border-bottom: 1px solid #EEEEEE;
}
.detailsTitle img{
  width: .19rem;
  height: .19rem;
  margin-left: .16rem;
  margin-right: .13rem;
}
.detailsTitle span{
  font-size: .14rem;
}
.integralHistory ul{
  width: 100%;
  background-color: #FFFFFF;
}
.integralHistory ul li{
  width: 95.733%;
  height: .88rem;
  margin-left: 4.267%;
  border-bottom: 1px solid #EEEEEE;
  position: relative;
}
.integralHistory ul li img{
  width: .66rem;
  height: .66rem;
  object-fit: cover;
  margin-top: .11rem;
  margin-right: .14rem;
  float: left;
}
.ulTitle h4{
  font-weight: bold;
  font-size: .13rem;
  padding-top: .12rem;
}
.ulTitle p{
  color: #999999;
}
.ulTitle p:nth-child(3){
  padding-top: .11rem;
}
.ulTitle span{
  color: #999999;
  font-size: .16rem;
  position: absolute;
  right: .16rem;
  bottom: .2rem;
}
.ulTitle span strong{
  color: #333333;
}
</style>
