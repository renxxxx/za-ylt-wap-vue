<template>
	<div class="operatingManualListDetails">
    <div class="topNav" :style="{'padding-top':$store.state.topHeight}">
    	<img src="../../../assets/image/shape@3x.png" alt=""  @click="goBackFn"  id="navback" :style="{'padding-top':$store.state.topHeight}">
      <h3>{{this.$route.query.name}}</h3>
    </div>
    <div class="zhangwei" :style="{'padding-top':$store.state.topHeight}"></div>
    <van-list  v-model="loading" :finished="finished" :finished-text="test"  @load="getNextPage">
    <ul>
      <li v-for="(item,inx) in operatingManualListDetails" :key="inx">
        <div class="operatingCenter">
          <div v-for="(_item,_inx) in item.image" :key="_inx" style="display: inline;">
            <router-link :to="{name:'pictureEnlargement',query:{inx:_inx,imgUrl:item.image,data:true,time:new Date().getTime()}}">
            	<!-- <img v-bind:src="item" alt=""> -->
              <img  v-if="_item" :src="_item" alt="" >
            </router-link>
          </div>
          <div v-for="(video,index) in item.video" key="index" style="display: inline;position: relative" @click="showVideoFn(video)" class="video">
            <video class="ArcanaVideo">
              <source type="video/mp4" :src="video">
            </video>
            <!-- <video :src="video" controls="controls" preload="auto"></video> -->
          </div>
          <div style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,.7);" v-show="show">
            <video :src="nowVideo" controls="controls" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 9999;"
             preload="auto"></video>
             <!-- <object  controls="controls" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 9999;" preload="auto">
                <param name="filename" :value="nowVideo">
              </object> -->
          </div>
          <span v-if="item.content" style="white-space:pre-line;">{{item.content}}</span>
        </div>
        <div class="operatingTitle">
          <span>{{moment(item.addTime).format('YYYY-MM-DD HH:mm')}}</span>
          <span>{{item.managerUserName}}</span>
        </div>
      </li>
    </ul>
    </van-list>
    <div class="addMessage">
      <div class="text">
        <!-- <input type="search" v-model="text"> -->
        <van-field
          v-model="text"
          rows = '1'
          :autosize="{minHeight:20,maxHeight:143}"
          type="textarea"
          placeholder="请输入留言"
          show-word-limit
        />
        <span @click="addContent" :class="[text? 'color':'']">发送</span>
      </div>
      <div class="addFunctuion">
        <div class="camera2xImg">
          <img src="../../../assets/image/photoadd.png" alt="">
          <input
            type="file"
            class="upload"
            ref="inputer"
            accept="image/*"
            multiple
        		@change="addImg($event)"/>
        </div>
        <div class="cameraImg">
          <img src="../../../assets/image/video.png" alt="">
          <input type="file"  class="upload" multiple accept="video/*" @change="addVideoFn($event)"/>
        </div>

      </div>
    </div>
   <!-- <div class="addImg">
      <router-link :to="{name: 'hospital_operatingManualListDetailsAdd',query:{operatingManualSectionId:this.$route.query.operatingManualSectionId}}">
        <img src="../../../assets/image/add copy@2x.png" alt="">
      </router-link>
    </div> -->
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
      operatingManualListDetails : [],
      show: false,
      nowVideo: '',
      loading: false,
      // 加载状态结束
      finished: false,
      // 请求页数
      page : 1,
      text: '',
      test: ''
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
    debugger
      next(vm => {
      document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
    });
  },
  mounted () {
    if(window.plus){
    	//plus.navigator.setStatusBarBackground("#ffffff");
    	plus.navigator.setStatusBarStyle("dark")
    }
    this.getdata();
    // console.log(this.$store.state.)
  },
  methods: {
    //回退方法
    goBackFn(){
      if(this.show){
        this.show = false
      }else{
        this.$router.back()
      }
    },
    getNextPage(){
    	 this.page++;
    	 this.getdata()
    },
    showVideoFn(video){
      console.log('ss');
      this.nowVideo = video
      this.show = true
    },
    getdata(){
    	this.$axios.get('/hospital/operating-manual/operating-manual-section-tracks?'
      +qs.stringify({"operatingManualSectionId":this.$route.query.operatingManualSectionId})
      +'&'+qs.stringify({pn:this.page})+'&'+qs.stringify({ps:10})
      // +qs.stringify(this.page)+'&',+qs.stringify(10)
      // +qs.stringify({"pn":this.page})+'&'+
      // +qs.stringify({"ps":'10'})
      )
    	.then(res => {
        if(!res.data.codeMsg){
          if(res.data.data.rows.length != 0){
            for(let i in res.data.data.rows){
              if(res.data.data.rows[i].image){
                // console.log(res.data.data.rows[i])
                res.data.data.rows[i].image = res.data.data.rows[i].image.split(",");
              }
              if(res.data.data.rows[i].video){
                // console.log(res.data.data.rows[i].video)
                res.data.data.rows[i].video = res.data.data.rows[i].video.split(",");
              }
              if(res.data.data.rows[i].audio){
                // console.log(res.data.data.rows[i].audio)
                res.data.data.rows[i].audio = res.data.data.rows[i].audio.split(",");
              }
              if(res.data.data.rows[i].content){
                // console.log(res.data.data.rows[i].audio)
                res.data.data.rows[i].content = res.data.data.rows[i].content.replace(/(\r\n|\n|\r)/gm, "\n");
              }
              this.operatingManualListDetails.push({
                content : res.data.data.rows[i].content,
                image : res.data.data.rows[i].image,
                video : res.data.data.rows[i].video,
                audio : res.data.data.rows[i].audio,
                addTime : res.data.data.rows[i].addTime,
                alterTime : res.data.data.rows[i].alterTime,
                operatingManualSectionName : res.data.data.rows[i].operatingManualSectionName,
                managerUserName : res.data.data.rows[i].managerUserName,
                hospitalUserName : res.data.data.rows[i].hospitalUserName,
              })
            }
            this.loading = false;
            // this.finished = true;
          }else{
            this.loading = false;
            this.finished = true;
            this.test='没有更多了'
          }
          if(this.operatingManualListDetails.length == 0){
            this.test='无数据'
          }
        }else{
          this.$toast.fail(res.data.codeMsg)
        }
    	})
    	.catch((err)=>{
    		console.log(err);
    	})
    },
    //上传视频至服务器，获取到服务器的地址，并提交到当前章节
    addVideoFn(_fileLIst){
      var file = _fileLIst.target.files[0]

      // console.log(file)
      if(file.type.indexOf('video/mp4') > -1){
      	let formData = new FormData();
      	formData.append('file', file)
        // console.dir(formData)
      	this.$axios.post('/other/fileupload?cover&duration',formData,{headers: {'Content-Type': 'multipart/form-data'
      	}})
        .then(res =>{
          // console.log(res)
          let videoUrl = ''
          videoUrl = res.data.data.url
          this.saveFn('',videoUrl,'')
      		// console.log(this.operating.video)
      	}).catch(err =>{
      		console.log(err)
      	})
       }else{
      	this.$toast.fail({ message: '请上传视频' });
      	return false;
      }
    },
    //上传图片至服务器，获取到服务器的地址，并提交到当前章节
    addImg(_fileLIst){
    	var file = _fileLIst.target.files[0]
    	// console.log(e)
    	if(file.type.indexOf('image') > -1){
    		let formData = new FormData();
    		formData.append('file', file)
        // console.dir(formData)
    		this.$axios.post('/other/fileupload?cover&duration',formData,{headers: {'Content-Type': 'multipart/form-data'
    		}})
        .then(res =>{
          let imgUrl = ''
    			imgUrl = res.data.data.url
          this.saveFn(imgUrl,'','')
    			// console.log(this.operating.img)
    		}).catch(err =>{
    			console.log(err)
    		})
    	 }else{
    		this.$toast.fail({ message: '请选择图片' });

    		return false;
    	}
    },
    // 上传文字
    addContent(){
      this.saveFn('','',this.text)
    },
    //保存方法
    saveFn(_img,_video,_content){
      console.log(_img)
      // let img = _img.join;
      // let video = _video.join(",");
      this.$axios.post('/hospital/operating-manual/operating-manual-section-track-add?',qs.stringify({
    		operatingManualSectionId:this.$route.query.operatingManualSectionId,
        image:_img,
        video:_video,
        content:_content,
    	  }))
        .then(res =>{
      	// this.imageUpload.push({name:file.name,url:res.data.data.url})
        if(res.data.codeMsg){
          this.$toast.fail(res.data.codeMsg)
        }else{
          this.$toast.success('操作成功');
          this.text = '';
          this.operatingManualListDetails = [];
          this.page = 1;
          this.getdata();
        }
      	this.imageUpload = res.data.data.url
      	console.log(this.imageUpload)
      	this.show = false;
      }).catch(err =>{
      	console.log(err)
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
  transform: ;
}
.operatingManualListDetails ul{
  width: 100%;
}
.operatingManualListDetails ul>li{
  width: 100%;
  background-color: #FFFFFF;
  margin-bottom: .225rem;
}
.operatingManualListDetails ul>li:last-child{
  margin-bottom: 0rem;
}
.operatingCenter{
  width: 93.6%;
  margin: 0rem auto;
  border-bottom: 1px solid #D8D8D8;
  padding-top: .12rem;
}
.operatingCenter img{
  width: .39rem;
  height: .39rem;
  padding: 0rem 0rem .12rem .12rem;
}
.operatingCenter span{
  display: block;
  margin-bottom: .12rem;
}
.operatingCenter video{
  width: .39rem;
  height: .39rem;
}
.operatingTitle{
  width: 93.6%;
  height: .44rem;
  line-height: .44rem;
  margin: 0rem auto;
}
.operatingTitle span{
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
.video>video::-webkit-media-controls{
  display:none !important;
}
>>>.van-list{
  margin-bottom: .75rem;
}
.addMessage{
  position: fixed;
  bottom: 0;
  width: 100%;
  /* margin-bottom: .1rem; */
  background-color: #F5F5F5;
}

.text{
  width: 100%;
  padding-top: .03rem;
  position: relative;
}

>>>.van-cell{
  width: 78%;
  margin-left: 3%;
  border-radius: .15rem;
}
.text>input{
  margin-left: 1.5%;
  width: 78%;
  border-radius: .25rem;
  padding-left: 3%;
  height:.35rem;
  border: 1px solid #F5F5F5;
}
.text input[type=search]::-webkit-search-cancel-button{
  padding-right: 5%;
}
.text>span{
  width: 15%;
  height:.35rem;
  line-height: .35rem;
  text-align: center;
  position: absolute;
  right: 2%;
  bottom: 0;
  /* margin-left: 1%; */
  border-radius: .25rem;
  color: #FFFFFF;
  background-color: #78ddea;
  /* width: .3rem; */
  display: inline-block;
}
.color{
  background-color: #2dd8ef!important;
}
.addFunctuion{
  width: 100%;
  margin-top: .04rem;
}
.camera2xImg,.cameraImg{
  width: 15%;
  display: inline-block;
  position: relative;
  text-align: center;
}
.camera2xImg>img,.cameraImg>img{
  width: .3rem;
  height: .3rem;
  margin: auto;
}
.cameraImg>img{
  height: .33rem;
}
.upload{
	opacity: 0;
	width: 100%!important;
	height: .44rem!important;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>
