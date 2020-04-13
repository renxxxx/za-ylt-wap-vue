<template>
	<div class="exchangeAddImg">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>修改商品</h3>
			</div>
			<div class="right" >
				<button :class="this.exchangeAdd.cover? 'buttonColorOver' : 'buttonColorNow'" @click="submitFn">完成</button>
			</div>
		</div>
		<div class="zhangwei"></div>
		<div class="addImg" v-model="exchangeAdd" :style="{'padding-top':$store.state.paddingTop}">
			<div class="addImgButton" v-show="this.exchangeAdd.cover? false : true">
				<img src="../../../assets/image/append@2x.png" alt="">
				<span>请添加照片</span>
			</div>
			<img v-bind:src="this.exchangeAdd.cover" alt="">
			<input type="file" class="upload" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"
			    multiple @change="addImg($event)"/>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Toast } from 'vant';
export default {
	name: 'exchangeAddImg',
	data () {
		return {
			commodity : [],
			imgUrl : 0,
			exchangeAdd:{}
		}
	},
	computed:{
		...mapGetters(['account']),
	},
	components:{

	},
	created(){
		var heightRexg = /^[0-9]*/g
		//var topHeight = this.topHeight.match(heightRexg)
		//this.height = parseInt(topHeight.join()) 
		//
	},
  beforeRouteLeave(to, from, next) {
    //debugger;
	let scrollTop = this.scrollTop =document.getElementById('hospital').scrollTop;
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
     ;
    next(vm => {
	 document.getElementById('hospital').scrollTop=document.getElementById('hospital').pageYOffset=vm.scrollTop;
	});
	
  }, mounted() {
		this.exchangeAdd = JSON.parse(this.$route.query.exchangeEditor)
		
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1)
			// this.$router.push({ path : '/hospital/hospital_exchangeManagementAdd',query : {item : this.commodity}});
			// exchangeManagementAdd
		},
		//添加图片
		addImg(_fileLIst){
			var file = _fileLIst.target.files[0]
			// 
			if(file.type.indexOf('image') > -1){
				let formData = new FormData();
				formData.append('file', file)
				this.$axios.post('/other/fileupload?cover&duration',formData,{headers: {'Content-Type': 'multipart/form-data'
				}}).then(res =>{
					// this.imageUpload.push({name:file.name,url:res.data.data.url})
					// this.$set(this.exchangeAdd,'cover',res.data.data.url);
					this.exchangeAdd.cover = res.data.data.url;
					
				}).catch(err =>{
					
				})
			 }else{
				Dialog({ message: '请选择图片' });
				return false;
			}
		},
		submitFn(){
			if(this.exchangeAdd.cover != ''){
				this.$axios.post('/c2/commodity/itemalter',qs.stringify({
					hospitalId : this.$store.state.hospital.login.hospital.hospitalId,
					itemId : this.exchangeAdd.itemId,
					name : this.exchangeAdd.name,
					cover : this.exchangeAdd.cover,
					intro : this.exchangeAdd.intro,
					stock: this.exchangeAdd.stock,
					payExchangepoint : this.exchangeAdd.payExchangepoint,
				})).then(res  =>{
					res.data.codeMsg? Toast.fail(res.data.codeMsg) : this.successFn();
          		}).catch(err =>{
					
				})
			}else{
				Toast.fail('请先添加图片');
			}
		},
		successFn(){
			Toast.success('操作成功');
			this.$router.go(-2);
		}
	},
}
</script>

<style scoped>
.exchangeAddImg{
	width: 100%;
	height: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	margin-bottom: .15rem;
	background-color: #FFFFFF;
	border-bottom: 1px solid #D8D8D8;
	position: fixed;
	top:0;
	z-index: 9999;
}
.zhangwei{
	width: 100%;
	height: .62rem;
}
.leftImg{
	width: 18%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
	line-height: .47rem;
	padding-left: .16rem;
}
.centerTitle{
	width: 64%;
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
	width: 18%;
	height: .47rem;
	line-height: .47rem;
	float:right;
	text-align: right;
}
.right button{
	width: .56rem;
	height: .3rem;
	line-height: .3rem;
	text-align: center;
	border: none;
	border-radius: .03rem;
	margin-right: .22rem;
	font-size: .14rem;
}
.buttonColorNow{
	color: #999999;
	background-color: #E5E5E5;
}
.buttonColorOver{
	color: #FFFFFF;
	background-color: #2B77EF;
}
.addImg{
	width: 3.25rem;
	height:84%;
	line-height: 88%;
	margin: 0rem auto;
	overflow: hidden;
	text-align: center;
	position: relative;
}
.addImg>img{
	width: 100%;
}
.addImgButton{
	display: block;
	text-align: center;
	padding-top: 50%;
	line-height: 70%;
	width: 100%;
}
.addImgButton img{
	height: .3rem;
	width: .3rem;
}
.addImgButton span{
	display: block;
	color: #666666;
	margin-top: .12rem;
}
.upload{
	opacity: 0;
	width: 100%;
	height:100%;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>
