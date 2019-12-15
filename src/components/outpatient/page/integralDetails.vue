<template>
	<div class="integralDetails">
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
        <h4>订单编号：027493938462742</h4>
        <p>2017-12-28 14:36</p>
        <span>-5,400</span>
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
  name: 'integralDetails',
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
.integralDetails{
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
.integralDetails ul{
  width: 100%;
  background-color: #FFFFFF;
}
.integralDetails ul li{
  width: 95.733%;
  height: .64rem;
  margin-left: 4.267%;
  border-bottom: 1px solid #EEEEEE;
  position: relative;
}
.integralDetails ul li h4{
  font-weight: bold;
  font-size: .13rem;
  padding-top: .12rem;
}
.integralDetails ul li p{
  color: #999999;
}
.integralDetails ul li span{
  color: #FFA33A;
  font-size: .16rem;
  position: absolute;
  right: .16rem;
  top: .21rem;
}
</style>
