<template>
	<div class="addAcivity" >
		<div class="topNav" :style="{'padding-top': height+'px'}">
			<div class="left" @click="goBackFn">
				<span>取消</span>
			</div>
			<div class="centerTitle">
				<h3>编辑活动</h3>
			</div>
			<router-link :to="{name : 'hospital_previewActivities',query:{activity:JSON.stringify(activity),time:new Date().getTime()}}">
				<div class="right">
					<button>预览</button>
				</div>
			</router-link>

		</div>
		<div class="addImg" :style="{'padding-top': (height+47)+'px'}">
			<img :src="activity.cover" alt="">
			<div class="addImgTitle">
				<img src="../../../assets/image/replace@2x.png" alt="">
				<span>选择背景</span>
			</div>
			<input
			    type="file"
			    class="upload"
			    ref="inputer"
			    accept="image/png,image/jpeg,image/gif,image/jpg"
			    multiple
				@change="addImg($event)"
			  />
		</div>
		<div class="addcontent">
			<input type="text" v-model='activity.title' placeholder="标题">
			<input type="text" v-model='activity.brief' placeholder="副标题">
			<input type="text" v-model='activity.tel' placeholder="联系电话">
			<input type="text" placeholder="活动起始时间" v-model='activity.startTime' readonly="readonly" @click="showTimeFn('start')">
			<input type="text" placeholder="活动终止时间" v-model='activity.endTime' readonly="readonly" @click="showTimeFn('end')">
			<input type="text" v-model='activity.address' placeholder="活动地址">
			<textarea placeholder="活动说明" v-model='activity.content'></textarea>
		</div>
		<van-popup @click="closeFn" v-model="showTime" position="bottom" :style="{ height: '40%',width:'100%'}">
			<van-datetime-picker
				type="datetime"
				@confirm="confirm"
				@cancel="cancel"
			/>
		</van-popup>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'addAcivity',
	data () {
		return {
			data : '',
			  activity : {
				title : '',
				brief : '',
				address : '',
				tel : '',
				startTime : undefined,
				endTime : undefined,
				content : '',
				cover : require('../../../assets/image/Group@2x.png')
			  },
		}
	},
	computed:{
		...mapGetters(['account','showTime']),
		showTime: {
		    get: function() {
				// console.log(this.$store)
		        return this.$store.state.shop.showTime
		    },
		    set: function (newValue) {
				this.$store.state.shop.showTime = newValue;
		    },
		},
	},
	components:{

	},
	created(){
		var heightRexg = /^[0-9]*/g
		var topHeight = this.topHeight.match(heightRexg)
		this.height = parseInt(topHeight.join())
		console.log(this.height)
	},
  beforeRouteLeave(to, from, next) {
    //debugger;
	this.scrollTop =document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
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
	  document.documentElement.scrollTop=document.body.scrollTop = vm.scrollTop;
	});

  }, mounted() {
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
		// 添加上传的图片
		addImg(_fileLIst){
			var file = _fileLIst.target.files[0]
			// console.log(e)
			if(file.type.indexOf('image') > -1){
				let formData = new FormData();
				formData.append('file', file)
				this.$axios.post('/other/fileupload?cover&duration',formData,{headers: {'Content-Type': 'multipart/form-data'
				}}).then(res =>{
					// this.imageUpload.push({name:file.name,url:res.data.data.url})
					this.activity.cover = res.data.data.url
					// console.log(this.imageUpload)
					this.show = false;
				}).catch(err =>{
					console.log(err)
				})
			 }else{
				Dialog({ message: '请选择图片' });
				return false;
			}
		},
		showTimeFn(_data){
			this.showTime = true
			this.data = _data
		},
		confirm(_value){
			var moment = require('moment');
			let time = moment(_value).format('YYYY-MM-DD HH:mm');
			if(this.data == 'start'){
				this.$set(this.activity,'startTime',time)
			}else{
				this.$set(this.activity,'endTime',time)
			}
		},
		//关闭半遮罩
		closeFn(){
			// console.log(dialog)
			this.showTime = false;
		},
		//取消选择的日期
		cancel(_value){
			console.log(_value)
		},
	},
}
</script>

<style scoped>
.addAcivity{
	width: 100%;
  overflow: hidden;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	background-color: #FFFFFF;
	border-bottom: 1px solid #E5E5E5;
	position: fixed;
	top : 0;
	z-index: 999;
}
.left{
	width: 20%;
	height: .47rem;
	float:left;

}
.left>span{
	width: .32rem;
	height: 100%;
	color: #666666;
	font-size: .14rem;
	/* font-weight: bold; */
	padding-left: .16rem;
}
.centerTitle{
	width: 60%;
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
	width: 20%;
	height: .47rem;
	line-height: .47rem;
	float:right;
}
.right button{
	width: .66rem;
	height: .3rem;
	line-height: .3rem;
	border: none;
	border-radius: .03rem;
	background-color: #E5E5E5;
	margin-right: .15rem;
}
.addImg{
	width: 	100%;
	height: 1.75rem;
	overflow: hidden;
	position: relative;

}
.addImg>img{
	width: 100%;
}
.addImgTitle{
	width: .64rem;
	height: .23rem;
	line-height:.23rem;
	text-align: center;
	color: #FFFFFF;
	position: absolute;
	bottom : .1rem;
	right : .16rem;
	background-color: #000000;
}
.addImgTitle>img{
	width: .08rem;
	height: .05rem;
	padding-left: .06rem;
	display: inline-block;
}
.addImgTitle span{
	float: right;
	display:inline-block;
	 font-size: 10px;
	transform: scale(0.8)
}
.addImg>input{
	opacity: 0;
	width: 100%!important;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99;
}
.addcontent{
	width: 100%;
}
.addcontent input{
	width: 83.46%;
	height: .45rem;
	margin: 0 4.27%;
	margin-top: .12rem;
	padding: 0 4%;
  border: 1px solid #D8D8D8;
}
.addcontent textarea{
	width: 83.46%;
	height: 3.55rem;
	margin: 0 4.27%;
	padding : .12rem 4%;
	margin-top: .12rem;
}
</style>
