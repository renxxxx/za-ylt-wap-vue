<template>
	<div class="operatingManualList">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@3x.png" alt="" id="navback" >
			</div>
			<div class="centerTitle">
				<h3>{{this.$route.query.name}}</h3>
			</div>
			<div class="right"></div>
		</div>
    <div class="zhangwei" :style="{'padding-top':$store.state.paddingTop}"></div>
    <div style="margin-top: .2rem;">
      <div v-for="(item,inx) in operatingManualList" :key="inx" @click="nextPageFn(item)">
        <!-- <router-link :to="{path : '/hospital/hospital_operatingManualList',query:{operatingManualId:item.operatingManualId}}"> -->
          <van-cell is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template>
              <span class="custom-title">{{item.name}}</span>
            </template>
          </van-cell>
        <!-- </router-link> -->
      </div>

    </div>
    <!-- <van-collapse v-model="activeNames">
       <van-collapse-item :title="this.$route.query.name" name="1">
         <div slot="title" class="title">
           <span>{{this.$route.query.name}}</span>
           <p><span>{{yesNum}}</span>/{{num}}</p>
         </div>
         <div v-for="(_item,inx) in operatingManualList" :key="inx">
           <router-link :to="{path : '/hospital/hospital_operatingManualListDetails',query:{name:_item.name ,operatingManualId:_item.operatingManualId,operatingManualSectionId:_item.operatingManualSectionId}}">
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
	  query:{}
    }
  },
  computed:{

  },
  beforeRouteLeave(to, from, next) {
    //debugger;
  let scrollTop = this.scrollTop =document.getElementById('operating').scrollTop;
this.scrollTop = scrollTop?scrollTop :0;

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
      document.getElementById('operating').scrollTop=document.getElementById('operating').pageYOffset=vm.scrollTop;
    });
  },
  created () {

  },
  mounted () {
    if(window.plus){
    	//plus.navigator.setStatusBarBackground("#ffffff");
    	plus.navigator.setStatusBarStyle("dark")
    }
		// this.query = JSON.parse(this.$route.query)
		
    this.getData()
  },
  methods: {
    //回退方法
    goBackFn(){
    	this.$router.back(-1)
    },
    nextPageFn(item){
      if(item.lowerCount){
        // console.dir(item)
        this.$router.push({path:'/operating/operating_operatingManualListTwo',query:{name:item.name,operatingManualId:this.$route.query.operatingManualId,operatingManualSectionId : item.operatingManualSectionId,time:new Date().getTime()}})
      }else{
        this.$router.push({path:'/operating/operating_operatingManualListDetails',query:{name:item.name,operatingManualId:this.$route.query.operatingManualId,operatingManualSectionId : item.operatingManualSectionId,time:new Date().getTime()}})
      }
    },
    getData(){
      this.$axios.get('/manager/operating-manual-sections?'+qs.stringify({
		  operatingManualId:this.$route.query.operatingManualId}))
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
          //   // 
          //     this.yesNum.push(num)
          // // 
          //   this.operatingManual[i]._data.push(_res.data.data.rows[_i])
          //  // console.dir(this.operatingManual[i]._data)
          // }
        }else{
          this.$toast(_res.data.codeMsg)
        }
      })
      .catch((err)=>{
      	
      })
    }
    // async getdata(){
    //   
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
    //         // 
    //           this.yesNum = num
    //     }else{
    //       this.$toast(res.data.codeMsg)
    //     }
    // 	})
    // 	.catch((err)=>{
    // 		
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
    //       this.$toast(res.data.codeMsg)
    //     }
    //   })
    //   .catch((err)=>{
    //   	
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
