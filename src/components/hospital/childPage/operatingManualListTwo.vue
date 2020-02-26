<template>
	<div class="operatingManualList">
    <div class="topNav" :style="{'padding-top':$store.state.topHeight}">
    	<img src="../../../assets/image/shape@3x.png" alt=""  @click="goBackFn"  id="navback" :style="{'padding-top':$store.state.topHeight}">
      <h3>{{this.$route.query.name}}</h3>
    </div>
    <div class="zhangwei" :style="{'padding-top':$store.state.topHeight}"></div>
   <div style="margin-top: .2rem;">
      <div v-for="(item,inx) in operatingManualList" :key="inx" @click="nextPageFn(item)">
          <van-cell is-link>
            <template>
              <span class="custom-title">{{item.name}}</span>
            </template>
          </van-cell>
      </div>
    </div>
    <!-- <van-collapse v-model="activeNames">
       <van-collapse-item :title="this.$route.query.name" name="1">
         <div slot="title" class="title">
           <span>{{this.$route.query.name}}</span>
           <p><span>{{yesNum}}</span>/{{num}}</p>
         </div>
         <div v-for="(_item,inx) in operatingManualList" :key="inx">
           <router-link :to="{name : 'hospital_operatingManualListDetails',query:{name:_item.name ,operatingManualId:_item.operatingManualId,operatingManualSectionId:_item.operatingManualSectionId}}">
             <div  class="manualList">
               <span :class="[_item.done? '':'doColor']">{{_item.name}}</span>
               <img src="../../../assets/image/Chevron Copy 2@2x.png" alt="">
             </div>

           </router-link>
         </div>
       </van-collapse-item>
    </van-collapse> -->
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'operatingManualList',
  data () {
    return {
      activeNames: ['1'],
      operatingManualList : [],
      num:0,
      yesNum:0,
    }
  },
  computed:{
  },
  // beforeRouteUpdate(to,from,next){
  //   this.operatingManualList = [];
  //   console.log(this.$route.query.name)
  //   this.getData()
  //   next();
  // },
  beforeRouteLeave(to, from, next) {
    //debugger;
  this.scrollTop =document.getElementById('app').scrollTop ||document.getElementById('app').pageYOffset
  if(!to.query.time || !from.query.time || to.query.time < from.query.time){
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

    this.getData()
  },
  methods: {
    //回退方法
    goBackFn(){
    	this.$router.back(-1)
    },
    nextPageFn(item){
      console.dir(item.lowerCount)
      if(item.lowerCount){
        console.dir(item.operatingManualSectionId)

        this.$router.push({name:'hospital_operatingManualListThree',query:{name:item.name,operatingManualId:this.$route.query.operatingManualId,operatingManualSectionId : item.operatingManualSectionId}})
      }else{
        this.$router.push({name:'hospital_operatingManualListDetails',query:{name:item.name,operatingManualId:this.$route.query.operatingManualId,operatingManualSectionId : item.operatingManualSectionId}})
      }
    },
    getData(){
      this.$axios.get('/hospital/operating-manual/operating-manual-sections?'
        +qs.stringify({"operatingManualId":this.$route.query.operatingManualId})+'&'
        +qs.stringify({"upperId":this.$route.query.operatingManualSectionId})
        )
      .then(res => {
        if(!res.data.codeMsg){
          for(let i in res.data.data.rows){
            this.operatingManualList.push(res.data.data.rows[i])
          }
          // this.operatingManual[i]._data=[]
          //  let num = 0;
          // for(let _i in _res.data.data.rows){
          //   if(_res.data.data.rows[_i].done){
          //     ++num
          //   }
          //   // console.log(num)
          //     this.yesNum.push(num)
          // // console.log(_res.data.data.rows[_i])
          //   this.operatingManual[i]._data.push(_res.data.data.rows[_i])
          //  // console.dir(this.operatingManual[i]._data)
          // }
        }else{
          this.$toast.fail(res.data.codeMsg)
        }
      })
      .catch((err)=>{
      	console.log(err);
      })
    }
    // async getdata(){
    //   console.log(this.$route.query.operatingManualSectionId)
    // 	await this.$axios.get('/hospital/operating-manual/operating-manual-sections?'
    //   +qs.stringify({"operatingManualId":this.$route.query.operatingManualId})+'&'
    //   +qs.stringify({"upperId":this.$route.query.operatingManualSectionId})
    //   )
    // 	.then(res => {
    //     if(!res.data.codeMsg){
    //       for(let i in res.data.data.rows){
    //         this.operatingManualList.push(res.data.data.rows[i])
    //         console.dir(this.operatingManualList)

    //       }
    //       let num = 0;
    //       for(let _i in _res.data.data.rows){
    //         if(_res.data.data.rows[_i].done){
    //           ++num
    //         }
    //       }
    //         // console.log(num)
    //           this.yesNum = num
    //     }else{
    //       this.$toast.fail(res.data.codeMsg)
    //     }
    // 	})
    // 	.catch((err)=>{
    // 		console.log(err);
    // 	})
    //   await this.$axios.get('/hospital/operating-manual/operating-manual-sections-sum?'
    //   +qs.stringify({operatingManualId:this.$route.query.operatingManualId})+'&'
    //   +qs.stringify({"upperId":this.$route.query.operatingManualSectionId})
    //   )
    //   .then(res => {
    //     console.dir(res)
    //     if(!res.data.codeMsg){
    //       this.num = res.data.data.rowCount
    //       console.dir(res)
    //     }else{
    //       this.$toast.fail(res.data.codeMsg)
    //     }
    //   })
    //   .catch((err)=>{
    //   	console.log(err);
    //   })
    // },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operatingManualList{
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
