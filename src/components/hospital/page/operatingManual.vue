<template>
	<div class="operatingManual">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@3x.png" alt="" id="navback" >
			</div>
			<div class="centerTitle">
				<h3>运营成功手册架构</h3>
			</div>
			<div class="right">
				<router-link :to="{name:'hospital_operatingDate'}">
				  <img src="../../../assets/image/jilu@2x.png" alt="" :style="{'padding-top':$store.state.paddingTop}">
				</router-link>
			</div>
		</div>
    <div class="zhangwei" :style="{'padding-top':$store.state.paddingTop}"></div>
    <div style="margin-top: .2rem;">
      <div v-for="(item,inx) in operatingManual" :key="inx">
        <router-link :to="{path : '/hospital/hospital_operatingManualList',query:{name:item.name,operatingManualId:item.operatingManualId,}}">
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
      yesNum:[],
	  query:''
    }
  },
  computed:{

  },
  
  created () {

  },
  mounted () {
    // if(window.plus){
    // 	//plus.navigator.setStatusBarBackground("#ffffff");
    // 	plus.navigator.setStatusBarStyle("dark")
    // }
    // this.getdata()
  },
	activated() {
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			this.getdata()
		}
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
            //       // 
            //         this.yesNum.push(num)
            //     // 
            //       this.operatingManual[i]._data.push(_res.data.data.rows[_i])
            //      // console.dir(this.operatingManual[i]._data)
            //     }
            //   }else{
            //     this.$toast(_res.data.codeMsg)
            //   }
            // })
            // .catch((err)=>{
            // 	
            // })
            this.$axios.get('/hospital/operating-manual/operating-manual-sections-sum?'+qs.stringify({operatingManualId:res.data.data.rows[i].operatingManualId}))
            .then(res => {
              console.dir(res)
              if(!res.data.codeMsg){
                
                this.num.push(res.data.data.rowCount)
                // this.num = res.data.data.rowCount
                // 
              }else{
                this.$toast(res.data.codeMsg)
              }
            })
            .catch((err)=>{
            	
            })
          }
        }else{
          this.$toast(res.data.codeMsg)
        }
    	})
    	.catch((err)=>{
    		
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
.right img{
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
