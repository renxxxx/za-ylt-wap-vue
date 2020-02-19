<template>
	<div class="operatingManualListDetails">
    <div class="topNav" :style="{'padding-top':$store.state.topHeight}">
    	<img src="../../../assets/image/shape@3x.png" alt=""  @click="goBackFn"  id="navback" :style="{'padding-top':$store.state.topHeight}">
      <h3>{{this.$route.query.name}}</h3>
    </div>
    <div class="zhangwei" :style="{'padding-top':$store.state.topHeight}"></div>
    <ul>
      <li v-for="(item,inx) in 100" :key="inx">
        <div class="operatingCenter">
          <img  v-if="_item" :src="_item" alt="" v-for="(_item,_inx) in item.image" :key="_inx">
          <span v-if="item.content">{{item.content}}</span>
        </div>
        <div class="operatingTitle">
          <span>{{moment(item.addTime).format('YYYY-MM-DD HH:mm')}}</span>
          <span>{{item.managerUserName}}</span>
        </div>
      </li>
    </ul>
    <div class="addImg">
      <router-link :to="{name: 'hospital_operatingManualListDetailsAdd'}">
        <img src="../../../assets/image/add copy@2x.png" alt="">
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'operatingManualListDetails',
  data () {
    return {
      operatingManualListDetails : []
    }
  },
  computed:{


  },
  created () {

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
      next(vm => {
      document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
    });
  },
  mounted () {
    if(window.plus){
    	//plus.navigator.setStatusBarBackground("#ffffff");
    	plus.navigator.setStatusBarStyle("dark")
    }
    this.getdata()
  },
  methods: {
    //回退方法
    goBackFn(){
    	this.$router.back(-1)
    },
    getdata(){
      console.log(this.$route.query.operatingManualSectionId)
    	this.$axios.get('/hospital/operating-manual/operating-manual-section-tracks?'
      // +qs.stringify({"operatingManualId":this.$route.query.operatingManualId})
      // +'&'
      +qs.stringify({"operatingManualSectionId":this.$route.query.operatingManualSectionId})
      )
    	.then(res => {
        if(!res.data.codeMsg){
          for(let i in res.data.data.rows){
            this.operatingManualListDetails.push(res.data.data.rows[i]);
            if(this.operatingManualListDetails[i].image)
            this.operatingManualListDetails[i].image = this.operatingManualListDetails[i].image.split(",");
            // console.log(img)
            // console.log(this.operatingManualListDetails[i].image)
          }
        }else{
          this.$toast.fail(res.data.codeMsg)
        }
    	})
    	.catch((err)=>{
    		console.log(err);
    	})
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operatingManualListDetails{
  width: 100%;
  background-color: #F5F5F5;
  position: relative;
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
  margin-bottom: .225rem;
}
.zhangwei{
	width: 100%;
	height: .47rem;
  margin-bottom: .225rem;
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
.operatingManualListDetails>ul{
  width: 100%;
}
.operatingManualListDetails>ul>li{
  width: 100%;
  background-color: #FFFFFF;
  margin-bottom: .225rem;
}
.operatingCenter{
  width: 93.6%;
  margin: 0rem auto;
  border-bottom: 1px solid #D8D8D8;
  padding-top: .12rem;
}
.operatingCenter>img{
  width: .39rem;
  height: .39rem;
  padding: 0rem 0rem .12rem .12rem;
}
.operatingCenter>span{
  display: block;
  margin-bottom: .12rem;
}
.operatingTitle{
  width: 93.6%;
  height: .44rem;
  line-height: .44rem;
  margin: 0rem auto;
}
.operatingTitle span:first-child{
  margin-right: .15rem;
  color: #999999;
}
.addImg{
  position: fixed;
  right: .2rem;
  bottom: .5rem;
}
.addImg img{
  width: .44rem;
  height: .44rem;
}
</style>
