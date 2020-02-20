<template>
	<div class="operatingManualListDetailsAdd">
    <div class="topNav" :style="{'padding-top':$store.state.topHeight}">
    	<img src="../../../assets/image/shape@3x.png" alt=""  @click="goBackFn"  id="navback" :style="{'padding-top':$store.state.topHeight}">
      <span @click="saveFn">保存</span>
    </div>
    <div class="zhangwei" :style="{'padding-top':$store.state.topHeight}"></div>
    <div class="center">
      <textarea name="" id="" cols="30" rows="10" placeholder="请输入详情" v-model="operating.center"></textarea>
    </div>
    <div class="addImg" v-for="(item,inx) in operating.img" :key="inx">
      <img src="../../../assets/image/close2@2x.png" alt="" @click="deleteImgFn(item)">
      <img :src="item" alt="" >
    </div>
    <div class="addAudio" v-for="(item,inxs) in operating.video" :key="inxs">
      <img src="../../../assets/image/close2@2x.png" alt="" @click="deleteVideoFn(item)">
      <video :src="item" controls="controls"></video>
    </div>

    <div class="deleteImg" @click="deteleBackFn">
      <img src="../../../assets/image/delete@2x.png" alt="">
    </div>
    <div class="cameraImg">
      <img src="../../../assets/image/camera2.png" alt="">
      <input type="file"  class="upload" multiple accept="video/*" @change="addVideoFn($event)"/>
    </div>
    <div class="camera2xImg">
      <img src="../../../assets/image/camera@2x.png" alt="">
      <input
        type="file"
        class="upload"
        ref="inputer"
        accept="image/*"
        multiple
				@change="addImg($event)"/>
    </div>
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
      operating:{
        center:'',
        img : [],
        video : []
      }
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
    //上传图片至服务器，获取到服务器的地址
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
    			this.operating.img.push(res.data.data.url)
    			// console.log(this.operating.img)
    		}).catch(err =>{
    			console.log(err)
    		})
    	 }else{
    		this.$toast.fail({ message: '请选择图片' });

    		return false;
    	}
    },
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
      		this.operating.video.push(res.data.data.url)
      		// console.log(this.operating.video)
      	}).catch(err =>{
      		console.log(err)
      	})
       }else{
      	this.$toast.fail({ message: '请上传视频' });
      	return false;
      }
    },
    //删除图片
    deleteImgFn(_url){
      let num = this.operating.img.findIndex((n)=>n == _url);
      this.operating.img.splice(num,1)
    },
    //删除图片
    deleteVideoFn(_url){
      let num = this.operating.video.findIndex((n)=>n == _url);
      this.operating.video.splice(num,1)
    },
    saveFn(){
      // console.log(this.operating.center)
      let img = this.operating.img.join(",");
      let video = this.operating.video.join(",");
      this.$axios.post('/hospital/operating-manual/operating-manual-section-track-add?',qs.stringify({
				operatingManualSectionId:this.$route.query.operatingManualSectionId,
        image:img,
        video:video,
        content:this.operating.center,
			  }))
        .then(res =>{
      	// this.imageUpload.push({name:file.name,url:res.data.data.url})
      	this.imageUpload = res.data.data.url
      	console.log(this.imageUpload)
      	this.show = false;
      }).catch(err =>{
      	console.log(err)
      })
    },
    deteleBackFn(){
      this.operating = {
        center:'',
        img : [],
        video : []
      }
      this.$router.back(-1)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operatingManualListDetailsAdd{
  width: 100%;
  height: 18rem;
  background-color: #F5F5F5;
  position: relative;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	/* text-align: center; */
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
.topNav span{
	font-size: .13rem;
  width: .4rem;
  height: .25rem;
  line-height: .25rem;
  color: #FFFFFF;
  background-color: #2B77EF;
  height: .25;
  display: block;
  position: absolute;
  right: .16rem;
  top: 0;
  bottom: 0;
  margin: auto 0rem;
  text-align: center;
}
.center{
  /* width: 100%; */
  margin-top: .1rem;
  padding: .05rem;
  background-color: #FFFFFF;
}
.center>textarea{
  width: 100%;
}
.deleteImg{
  position: fixed;
  right: 1.2rem;
  bottom: .5rem;
  width: .42rem;
  height: .42rem;
  object-fit: cover;
}
.cameraImg{
  position: fixed;
  right: .7rem;
  bottom: .5rem;
  width: .42rem;
  height: .42rem;
  object-fit: cover;
}
.camera2xImg{
  position: fixed;
  right: .2rem;
  bottom: .5rem;
  width: .42rem;
  height: .42rem;
  object-fit: cover;
}
.camera2xImg img,.cameraImg img,.deleteImg img{
  width: 100%;
  height: 100%;
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
.addImg{
  width: 93.6%;
  margin: .1rem auto;
  position: relative;
}
.addImg>img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.addImg>img:first-child{
  width: .22rem;
  height: .22rem;
  z-index: 99;
  position: absolute;
  right: 2%;
  top: 2%;
}
.addAudio{
  width: 93.6%;
  margin: .1rem auto;
  position: relative;
}
.addAudio>img{
  width: .22rem;
  height: .22rem;
  z-index: 99;
  position: absolute;
  right: 2%;
  top: 2%;
}
.addAudio>video{
  width: 100%;
}
</style>
