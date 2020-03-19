<template>
	<div class="operatingManual">
    <div class="topNav" :style="{'padding-top':$store.state.topHeight}">
    	<img src="../../../assets/image/shape@3x.png" alt=""  @click="goBackFn" :style="{'padding-top':$store.state.topHeight}">
    	<h3>运营成功手册架构</h3>
      <router-link :to="{name:'hospital_operatingDate'}">
        <img src="../../../assets/image/jilu@2x.png" alt="" :style="{'padding-top':$store.state.topHeight}">
      </router-link>
    </div>
    <div class="zhangwei" :style="{'padding-top':$store.state.topHeight}"></div>
    <div style="margin-top: .2rem;">
      <div v-for="(item,inx) in operatingManual" :key="inx">
        <router-link :to="{path : '/hospital/hospital_operatingManualList',query:{name:item.name,operatingManualId:item.operatingManualId,time:new Date().getTime()}}">
          <van-cell is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template>
              <span class="custom-title">{{item.name}}</span>
            </template>
          </van-cell>
        </router-link>
      </div>

    </div>

    <!-- <van-collapse v-model="activeNames"> -->

       <!-- <van-collapse-item :name="inx" v-for="(item,inx) in operatingManual" :key="inx">
         <div slot="title" class="title">
           <span>{{item.name}}</span>
           <p><span>{{yesNum[inx]}}</span>/{{num[inx]}}</p>
         </div>
         <div v-for="(_item,inx) in item._data" :key="inx">
           <router-link :to="{path : '/hospital/hospital_operatingManualList',query:{name:_item.name,operatingManualId:item.operatingManualId,operatingManualSectionId : _item.operatingManualSectionId}}">
             <div  class="manualList">
               <span :class="[_item.done? '':'doColor']">{{_item.name}}</span>
               <img src="../../../assets/image/Chevron Copy 2@2x.png" alt="">
             </div>
           </router-link>
         </div>
       </van-collapse-item> -->
    <!-- </van-collapse> -->
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'operatingManual',
  data () {
    return {
      activeNames: ['0'],
      operatingManual : [],
      num:[],
      yesNum:[]
    }
  },
  computed:{

  },
  beforeRouteLeave(to, from, next) {
    //debugger;
  let scrollTop = this.scrollTop =document.getElementById('hospital').scrollTop;
this.scrollTop = scrollTop?scrollTop :0;
console.log(this.scrollTop)
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
      document.getElementById('hospital').scrollTop=document.getElementById('hospital').pageYOffset=vm.scrollTop;
    });
  },
  created () {

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
    	this.$router.back()
    },
    async getdata(){
      debugger;
    	await this.$axios.get('/hospital/operating-manual/operating-manuals?')
    	.then(res => {
        if(!res.data.codeMsg){
            for(let i in res.data.data.rows){
            this.operatingManual.push(res.data.data.rows[i])
            // this.$axios.get('/hospital/operating-manual/operating-manual-sections?'+qs.stringify({operatingManualId:res.data.data.rows[i].operatingManualId}))
            // .then(_res => {
            //   if(!_res.data.codeMsg){
            //     this.operatingManual[i]._data=[]
            //      let num = 0;
            //     for(let _i in _res.data.data.rows){
            //       if(_res.data.data.rows[_i].done){
            //         ++num
            //       }
            //       // console.log(num)
            //         this.yesNum.push(num)
            //     // console.log(_res.data.data.rows[_i])
            //       this.operatingManual[i]._data.push(_res.data.data.rows[_i])
            //      // console.dir(this.operatingManual[i]._data)
            //     }
            //   }else{
            //     this.$toast(_res.data.codeMsg)
            //   }
            // })
            // .catch((err)=>{
            // 	console.log(err);
            // })
            this.$axios.get('/hospital/operating-manual/operating-manual-sections-sum?'+qs.stringify({operatingManualId:res.data.data.rows[i].operatingManualId}))
            .then(res => {
              console.dir(res)
              if(!res.data.codeMsg){
                console.log(res.data.data.rowCount)
                this.num.push(res.data.data.rowCount)
                // this.num = res.data.data.rowCount
                // console.log(this.operatingManual[i].num)
              }else{
                this.$toast(res.data.codeMsg)
              }
            })
            .catch((err)=>{
            	console.log(err);
            })
          }
        }else{
          this.$toast(res.data.codeMsg)
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
.operatingManual{
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
.topNav>img:first-child{
	width: .09rem;
	height: .15rem;
	position: absolute;
	left: .16rem;
	top:0;
  bottom: 0;
  margin: auto 0rem;
}
.topNav h3{
	font-size: .16rem;
	font-weight: bold;
}
.topNav a img{
  width: .2rem;
  height: .18rem;
  position: absolute;
  right: .16rem;
  top:0;
  bottom: 0;
  margin: auto 0rem;
}
>>>.van-collapse{
  margin-top: .12rem;
}
>>>.van-collapse-item__content {
    padding: 0rem;
    /* padding-left: .16rem; */
}
.manualList{
  width: 100%;
  height: .44rem;
  line-height: .44rem;
  border-bottom: 1px solid #ebedf0;
  padding-left: .16rem;
  position: relative;
  font-size: .14rem;
}
.manualList>img{
  width: .09rem;
  position: absolute;
  right: .34rem;
  top: 0;
  bottom: 0;
  margin: auto 0rem;
}
.doColor{
  color: #2B77EF;
}
.title>p{
  float: right;
}
</style>
