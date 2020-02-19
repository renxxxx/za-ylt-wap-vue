<template>
	<div class="operatingManualListDetailsAdd">
    <div class="topNav" :style="{'padding-top':$store.state.topHeight}">
    	<img src="../../../assets/image/shape@3x.png" alt=""  @click="goBackFn"  id="navback" :style="{'padding-top':$store.state.topHeight}">
      <span>保存</span>
    </div>
    <div class="zhangwei" :style="{'padding-top':$store.state.topHeight}"></div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'operatingManualListDetailsAdd',
  data () {
    return {

    }
  },
  computed:{

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
</style>
