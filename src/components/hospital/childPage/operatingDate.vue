<template>
	<div class="operatingDate">
    <div class="topNav" :style="{'padding-top':$store.state.topHeight}">
    	<img src="../../../assets/image/shape@2x.png" alt=""  @click="goBackFn" :style="{'padding-top':$store.state.topHeight}">
    	<h3>{{nowYear}}年</h3>
    </div>
    <div class="zhangwei" :style="{'padding-top':$store.state.topHeight}"></div>
    <van-swipe :show-indicators='false' ref="Swipe" @change="changeFn" :initial-swipe='indedxOf'>
      <div v-for="year in data">
        <van-swipe-item>
          <div class='mounth' v-for="(item,inx) in year.minMounth" @click="mouthFn(year.year,item.num)" ref='minMounth' :key="inx" @touchstart="startFn" @touchend="endFn">
            <span :class='item.color'>{{item.num}}月</span>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class='mounth' v-for="(_item,num) in year.maxMounth" @click="mouthFn(year.year,_item.num)" ref='maxMounth' :key="num" @touchstart="startFn" @touchend="endFn">
            <span :class='_item.color'>{{_item.num}}月</span>
          </div>
        </van-swipe-item>
      </div>
    </van-swipe>
    <div class="center">
      <div class="title" v-for="data in dataValue">
        <span>{{moment(data.time[0]).format('MM-DD')}}</span>
        <!-- <span>{{data.value[0].content}}</span> -->
        <van-steps direction="vertical" :active="-9999">
          <van-step v-for="riqi in data.value" key="riqi">
            <span class="addTime">{{moment(riqi.addTime).format('hh:mm')}}</span>
            <p class="riqiP">{{riqi.hospitalUserName}} 上传了 <span>{{riqi.operatingManualSectionName}}</span> </p>
          </van-step>
        </van-steps>
        <!-- <ul>
          <li v-for="riqi in data.value">

            <span>{{moment(riqi.addTime).format('mm:ss')}}</span>
            <div>
              <span>{{riqi.hospitalUserName}}</span>
              <span>{{riqi.operatingManualSectionName}}</span>
            </div>
          </li>
        </ul> -->
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import moment from 'moment'
export default {
  name: 'operatingDate',

  data () {
    return {
      nowYear:undefined,
      nowMonth:undefined,
      start:0,
      end:0,
      data:[],
      dataValue:[],
      indedxOf:undefined,
    }
  },
  computed:{
  },
  beforeRouteLeave(to, from, next) {
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
  mounted () {
    if(window.plus){
    	//plus.navigator.setStatusBarBackground("#ffffff");
    	plus.navigator.setStatusBarStyle("dark")
    }
    this.riliFn()
  },
  methods: {
    //回退方法
    goBackFn(){
    	this.$router.back(-1)
    },
    riliFn(){
      let timestamp = Date.parse(new Date());
      let date = new Date(timestamp);
      this.nowYear = date.getFullYear();
      this.indedxOf = (this.nowYear-1950)*2
      this.nowMonth = date.getMonth()+1;
      for(let i = 1950;i<=2099;i++){
        if(this.nowYear == i){
          this.data.push({
            year:i,
            minMounth:[],
            maxMounth:[]
          })
          for(let num = 1;num<7;num++){
            if(this.nowMonth == num){
              // console.log('sss')
              if(this.nowMonth>6){
                this.data[this.nowYear-1950].maxMounth.push({
                  num: num+6,
                  color:'color'
                })
                this.data[this.nowYear-1950].minMounth.push({
                  num: num,
                  color:'noColor'
                })
              }else{
                this.data[this.nowYear-1950].maxMounth.push({
                  num: num+6,
                  color:'noColor'
                })
                this.data[this.nowYear-1950].minMounth.push({
                  num: num,
                  color:'color'
                })
              }
            }else{
              console.log(num)
              this.data[this.nowYear-1950].minMounth.push({
                num: num,
                color:'noColor'
              })
              this.data[this.nowYear-1950].maxMounth.push({
                num: num+6,
                color:'noColor'
              })
            }
          }
        }else{
          this.data.push({
            year:i,
            minMounth:[],
            maxMounth:[]
          })
          // this.data[i-1937].minMounth='ss'
          for(let num = 1;num<7;num++){
            this.data[i-1950].minMounth.push({
              num: num,
              color:'noColor'
            })
            this.data[i-1950].maxMounth.push({
              num: num+6,
              color:'noColor'
            })
          }
        }

      }
      console.dir(this.data)
      // for(let num = 1;num<(this.nowYear-1950);num++){
      //   this.$refs.Swipe.next();
      // }
      // if(this.nowMonth>6){
      //   this.$refs.Swipe.next();
      //   console.log(this.data[this.nowYear-1950])
      //   this.data[this.nowYear-1950].maxMounth[this.nowMonth-7].color = 'color'
      //   // this.maxMounth[this.nowMonth-7].color = 'color'
      // }else{
      //   console.log(this.data[this.nowYear-1950])
      //   this.data[this.nowYear-1950].minMounth[this.nowMonth-1].color = 'color'
      //   // this.minMounth[this.nowMonth-1].color = 'color'
      // }
      // for(let i = 1;i<7;i++){
      //   this.minMounth.push({
      //     num: i,
      //     color:'noColor'
      //   })
      //   this.maxMounth.push({
      //     num: i+6,
      //     color:'noColor'
      //   })
      // }
      this.getData(this.nowYear,this.nowMonth)
    },
    changeFn(index) {
      // let timestamp = Date.parse(new Date());
      // let date = new Date(timestamp);
      // if(this.nowYear == date.getFullYear()){
      //   if(this.nowMonth>6){
      //     this.$refs.Swipe.next();
      //     this.maxMounth[this.nowMonth-7].color = 'color'
      //   }else{
      //     this.minMounth[this.nowMonth-1].color = 'color'
      //   }
      // }
      if((this.start-this.end)<0){
        if(index%2){
          --this.nowYear
        }
      }else{
        if(!(index%2)){
          ++this.nowYear
        }
      }

    },
    startFn(e){
      this.start = e.changedTouches[0].pageX;
    },
    endFn(e){
      this.end = e.changedTouches[0].pageX;

    },
    mouthFn(year,mounth){
      console.log(year,mounth)
      this.data=[];
      for(let i = 1950;i<=2100;i++){
        this.data.push({
          year:i,
          minMounth:[],
          maxMounth:[]
        })
        for(let num = 1;num<7;num++){
          this.data[i-1950].minMounth.push({
            num: num,
            color:'noColor'
          })
          this.data[i-1950].maxMounth.push({
            num: num+6,
            color:'noColor'
          })
        }
      }
      this.dataValue = []
      this.getData(year,mounth)
    },
    getData(year,mounth){
      let timeFrom =this.zhuanHuanFn(year,mounth)
      let timeTo =this.zhuanHuanFn(year,mounth+1)-1
      let addTimeFrom = undefined;
      let addTimeTo = undefined;
      this.$axios.get('/hospital/operating-manual/operating-manual-section-tracks?'
      +qs.stringify({"addTimeFrom":timeFrom})+'&'
      +qs.stringify({"addTimeTo":timeTo})
      )
      .then(res => {
        let _dataValue = [];
        if(!res.data.codeMsg){
          for(let i in res.data.data.rows){
            _dataValue.push(res.data.data.rows[i])
            _dataValue[i].addTime = moment(_dataValue[i].addTime).format('YYYY-MM-DD HH:mm:ss')
            _dataValue[i].alterTime = moment(_dataValue[i].alterTime).format('YYYY-MM-DD HH:mm:ss')
            // console.dir(_dataValue)
          }
        }else{
          this.$toast.fail(res.data.codeMsg)
        }

        if(res.data.data.rows.length){
          // let _time = _dataValue[0].addTime.split(' ');
          let num = 0;
          this.dataValue.push({
            time:undefined,
            value:[]
          })
          console.dir(_dataValue[0]);
          console.log(this.dataValue)
          this.dataValue[num].time = _dataValue[0].addTime.split(' ');
          console.log(this.dataValue[num].time[0])
          for(let i = 0;i<_dataValue.length;i++){
            let _time = _dataValue[i].addTime.split(' ');
            if(this.dataValue[num].time[0] == _time[0]){
              console.log(_time)
              this.dataValue[num].value.push(_dataValue[i])
            }else{
              ++num;
              this.dataValue[num] = {
                time : undefined,
                value :[]
              }
              this.dataValue[num].time = _dataValue[i].addTime.split(' ');
              this.dataValue[num].value.push(_dataValue[i])
              // this.dataValue[num].time = _dataValue[i].addTime.split(' ')[0];
              // this.dataValue[num].value.push(_dataValue[i])
            }
          }
        }
          console.log(this.dataValue)

        // console.dir(this.dataValue)
      })
      .catch((err)=>{
      	console.log(err);
      })
    },
    zhuanHuanFn(year,mounth){
      // let data = undefined;
      let _time = undefined
      if(mounth<10){
        _time = year.toString()+0+mounth.toString()+'01'
      }else{
        _time = year.toString()+mounth.toString()+'01'
      }
      _time = moment(_time).format('YYYY-MM-DD HH:mm:ss')
      let data = new Date(_time).getTime();
      return data;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operatingDate{
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
  color: #FFFFFF;
	background-color: #2B77EF;
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
.mounth{
  width: 16.66%;
  height: .63rem;
  line-height: .63rem;
  color: #FFFFFF;
  display: inline-block;

  text-align: center;
}
.mounth>span{
  width: .38rem;
  height: .38rem;
  line-height: .38rem;
  display: block;
  border-radius: 50%;
  margin:.125rem auto;
}
.mounth>span:hover{
  background-color: #FFFFFF;
  color: #2B77EF;
}
.color{
  background-color: #FFFFFF;
  color: #2B77EF;
}
>>>.van-swipe{
  background-color: #2B77EF;
}
.center{
  width: 100%;
}
.title{
  width: 100%;
  margin: .15rem auto;
}
.title>span{
  width: 25.8%;
  height: .25rem;
  line-height: .25rem;
  color: #FFFFFF;
  display: block;
  background-color: #FF932E;
  border-radius: 0rem .5rem .5rem 0rem;
  margin-bottom: .15rem;
  text-align: center;
}
.title>ul{
  width: 100%;
}
.title>ul>li{
  width: 100%;
  height: ;
}
.addTime{
  font-size: .14rem;
  color: #999999;
}
.riqiP{
  font-size: .15rem;
  color: #333333;
}
.riqiP>span{

  color: #2B77EF;
}
</style>
