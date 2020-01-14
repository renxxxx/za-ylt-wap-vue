<template>
	<div class="integralDetails">
    <div class="topNav" :style="{'padding-top':height+'px'}">
    	<div class="leftImg" @click="goBackFn"  id="navback">
    		<img src="../../../assets/image/shape@3x.png" alt="">
    	</div>
    	<div class="centerTitle">
    		<h3>积分明细</h3>
    	</div>
    	<div class="right"></div>
    </div>
		<div class="zhangwei"></div>
    <div class="detailsTitle" :style="{'padding-top':$store.state.topHeight}">
      <img src="../../../assets/image/lishi.png" alt="">
      <span>积分使用明细</span>
    </div>
    <ul>
      <li v-for="(item,inx) in integralDetails" :key="inx">
        <h4>{{item.note}}</h4>
        <p>{{moment(item.addTime).format('YYYY-MM-DD hh:mm')}}</p>
        <span>{{item.amount}}</span>
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
		integralDetails : [],
    }
  },
  computed:{
	...mapGetters(['account']),
  },
  created(){
  	var heightRexg = /^[0-9]*/g
  	//var topHeight = this.topHeight.match(heightRexg)
  	//this.height = parseInt(topHeight.join()) 
  	//console.log(this.height)
  },
  beforeRouteLeave(to, from, next) {
    //debugger;
	this.scrollTop =document.getElementById('app').scrollTop ||document.getElementById('app').pageYOffset
	if(!to.query.time || !from.query.time || to.query.time < from.query.time){
		 debugger
            if (this.$vnode && this.$vnode.data.keepAlive)
            {
                if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
                {
                    if (this.$vnode.componentOptions)
                    {
                        var key = this.$vnode.key == null
                                    ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                                    : this.$vnode.key;
                        var cache = this.$vnode.parent.componentInstance.cache;
                        var keys  = this.$vnode.parent.componentInstance.keys;
                        if (cache[key])
                        {
                            if (keys.length) {
                                var index = keys.indexOf(key);
                                if (index > -1) {
                                    keys.splice(index, 1);
                                }
                            }
                            delete cache[key];
                        }
                    }
                }
			}
            this.$destroy();
		}
	next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
     ;
    next(vm => {
	 document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
	});
	
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
    this.$axios.post('/clientend2/clinicend/pointexchange/exchangepointdetails',qs.stringify({
    	clinicId : this.account.clinicId,
    	pn : 1,
    	ps : 99
    }))
    .then(res => {
    	if(res.data.codeMsg == null || res.data.codeMsg == '' || res.data.codeMsg == undefined){
    		for(let i in res.data.data.items){
    			this.integralDetails.push(res.data.data.items[i]);
    		}
    	}else{
    		this.$toast.fail(res.data.codeMsg)
    	}
    })
    .catch((err)=>{
    	//Dialog({ message: err});;
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
