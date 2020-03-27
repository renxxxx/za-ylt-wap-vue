<template>
	<div class="addClinic">
		<div class="navWarp" :style="{'padding-top':$store.state.paddingTop}">
			<div class="leftNav" @click="goBackFn"  id="navback">
				<img src="../../../../assets/image/back-white@2x.png" alt="">
			</div>
			<div class="centerNav">
				<span>新增门诊</span>
			</div>
			<div class="rightNav" @click="saveFn">
				<span>保存</span>
				<img src="../../../../assets/image/save@2x.png" alt="">
			</div>
		</div>
		<div class="zhangwei"></div>
		<div class="content" :style="{'padding-top':$store.state.paddingTop}">
			<div class="newAdd">
				<div class="newAddTitle">
					<img src="../../../../assets/image/bitian@2x.png" alt="">
					<h3>必填项</h3>
					<ul class="Fill">
						<li  >
							<span>门诊名称</span>
							<input type="text" v-model="addClinic.name"  placeholder="请填写">
						</li>
						<li>
							<span>分配账号</span>
							<input type="text" maxlength="11" v-model="addClinic.phone"  placeholder="请填写">
						</li>
						<li>
							<span>分配密码</span>
							<input type="password" v-model="addClinic.pwd " placeholder="请填写">
						</li>
						<li>
							<span>确认密码</span>
							<input type="password" v-model="addClinic.pwdConfirm " placeholder="请填写">
						</li>
						<li>
							<span>负责人</span>
							<input type="text"  v-model="addClinic.headmanName"  placeholder="请填写">
						</li>
						<li>
							<span>联系方式</span>
							<input type="text"  maxlength="11" v-model="addClinic.contactTel" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请填写">
						</li>
						<li>
							<span>门诊地址</span>
							<input type="text" v-model="addClinic.address" placeholder="请填写">
						</li>
					</ul>
				</div>
				<div class="newAddTitle bottom">
					<img src="../../../../assets/image/xuantian@2x.png" alt="">
					<h3>选填项</h3>
					<ul class="Fill">
						<li  >
							<span>备注</span>
							<input type="text" v-model="addClinic.remark" placeholder="请填写">
						</li>
						<li class="popup" @click="showFn">
							<span>营业执照</span>
							<div class="uploadPictures">
								 <input
								        type="file"
								        class="upload"
								        ref="inputer"
								        accept="image/png,image/jpeg,image/gif,image/jpg"
								        multiple
										@change="addImg($event)"
								   />
								   <div class="add">
								      <!-- <p>点击上传</p> -->
								   </div>
							</div>
							<img class="rightImg" src="../../../../assets/image/right@2x.png" alt="">
							<img  id="backimg" :src='imageUpload'  alt="" >
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog,Toast } from 'vant'
export default {
	name: 'search',
	data () {
		return {
			// 添加列表绑定数据
			addClinic:{
				name : '',        //医院名称
				phone : '',       //分配账号
				pwd : '',         //分配账号密码
				headmanName : '', //负责人姓名
				contactTel : '',  //负责人电话
				address : '',     //门诊地址
				remark : '',      //备注
				license : '',
				pwdConfirm: '',    //确认密码
				readonly : '',
				clinicPromoterId : ''
			},
			// 上传图片弹窗显示
			show: false,
			imageUpload:''
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
		//console.log(this.height)
	},
	beforeRouteLeave(to, from, next) {
    this.scrollTop =
	  document.documentElement.scrollTop || document.body.scrollTop;
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
     document.getElementById('promoters').scrollTop=document.getElementById('promoters').pageYOffset=vm.scrollTop;
    });
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
	},
	methods: {
		// 返回键
		goBackFn(){
			this.$router.back(-1)
		},
		// 显示上传图片选择弹窗
		showFn(){
			this.show = true;
		},
		// 关闭上传图片选择弹窗
		closeFn() {
		      this.show = false;
			  console.log(this.show)
		},
		addImg(_fileLIst){
			var file = _fileLIst.target.files[0]
			// console.log(e)
			if(file.type.indexOf('image') > -1){
				let formData = new FormData();
				formData.append('file', file)
				this.$axios.post('/other/fileupload?cover&duration',formData,{headers: {'Content-Type': 'multipart/form-data'
				}}).then(res =>{
					// this.imageUpload.push({name:file.name,url:res.data.data.url})
					this.imageUpload = res.data.data.url
					console.log(this.imageUpload)
					this.show = false;
				}).catch(err =>{
					console.log(err)
				})
			 }else{
				Dialog({ message: '请选择图片' });
				return false;
			}

		},
		// 保存方法
		saveFn(){
			console.log(this.addClinic)
			this.$axios.post('/hospital/operator/hospital-clinic-add',qs.stringify({
				hospitalClinicId : this.$store.state.hospitalEntrance.loginRefresh().hospital.hospitalId,
				name :  this.addClinic.name,        //医院名称
				hospitalUserId : this.addClinic.clinicPromoterId,	//推广人id
				cover: '',
				license : this.imageUpload,         //营业执照
				address : this.addClinic.address,   //门诊地址
				headman : this.addClinic.headmanName, //负责人姓名
				tel : this.addClinic.contactTel,      //负责人电话
				remark : this.addClinic.remark,       //备注
				clinicUserPhone : this.addClinic.phone, //分配账号
				clinicUserPassword : this.addClinic.pwd,//分配账号密码
				clinicUserPasswordConfirm : this.addClinic.pwdConfirm,  //确认密码
			}))
			.then(res => {
				if(res.data.codeMsg){
					this.$toast(res.data.codeMsg)
				}else{
					this.$toast.success('操作成功');
					this.$router.back(-1)
				}
			})
			.catch((err)=>{
				console.log(err);
				//Dialog({ message: '加载失败!'});
			})
		},
	}
}
</script>

<style scoped>
.addClinic{
	width: 100%;
}
.navWarp{
	width: 100%;
	height: .48rem;
	line-height: .48rem;
	background-color: #2B77EF;
	color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 9999;
}
.zhangwei{
	width: 100%;
	height: .48rem;
}
.leftNav{
	float: left;
	width: 17.6%;
	height: .48rem;
	line-height: .48rem;
}
.leftNav img{
	width: .09rem;
	height: .15rem;
	margin-left: .16rem;
}
.centerNav{
	float: left;
	width: 64.8%;
	height: .48rem;
	line-height: .48rem;
	text-align: center;
}
.centerNav span{
	font-size: .16rem;
	font-weight: 600;
}
.rightNav{
	float: left;
	width: 17.6%;
	height: .48rem;
	line-height: .48rem;
}
.rightNav img{
	width: .14rem;
	height: .15rem;
	margin: 0rem .16rem 0rem .05rem;
}
.newAddTitle{
	width: 91.4%;
	margin-top: .2rem;
	margin: 0 auto;
	padding-top: .2rem;
}
.newAddTitle img{
	width: .165rem;
	height: .185rem;
}
.newAddTitle h3{
	margin-left: .05rem;
	width: .45rem;
	height: .21rem;
	display: inline;
}
.Fill {
	width:90%;
}
.Fill li{
	border: 1px solid #D8D8D8;
	border-radius: .02rem;
	padding: .12rem .15rem;
	margin-top:.12rem;
	width: 100%;
	position: relative;
}
.Fill li span{
	height: .21rem;width: .6rem;
}
.Fill li input{
	border: none;
	float:right;
	text-align: right;
	color: #2B77EF;
}

.bottom img{
	width: .15rem;
	height: .18rem;
}
.AlreadySpanColor{
	color: #2B77EF!important;
}
>>>.van-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
	color: #2B77EF;
}
>>>.van-dropdown-menu {
	float: right;
    height: .22rem;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
	color: #757575;
}
>>>.van-dropdown-menu__title {
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    padding: 0rem;
    color: #323233;
    font-size: .09rem;
    line-height: 18px;
}
>>>.van-dropdown-menu__title::after {
    position: absolute;
    top: 50%;
    right: -4px;
    margin-top: -5px;
    border: 3px solid;
    border-color: transparent transparent currentColor currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    opacity: .8;
    content: none;
}
>>>.van-dropdown-item--down {
    bottom: 0;
    top: 202.141px!important;
}
.popup{
	height: .45rem;
	line-height: .45rem;
}
.rightImg{
	width: .06rem!important;
	height: .11rem!important;
	margin-top: .16rem;
	margin-left: .05rem;
	float: right;
}
#backimg{
	width: .43rem;
	height: 100%;
	margin: auto;
	float: right;
	object-fit: cover;
}
.popupChoose{
	height: .9rem;
	border-bottom: 6px solid #F5F5F5;
	text-align: center;
	font-size: .15rem;
}
.popupChoose span{
	display: block;
	width: 100%!important;
	height: .44rem!important;
	line-height: .44rem;
	border-bottom: .5px solid #D8D8D8;
}
.closeStyle{
	background: none;
	width: 100%;
	height: 100%;
	border: none;
	height: .44rem;
	font-size: .15rem;
}
.uploadPictures{
	position: absolute;
	width: 100%!important;
	height: .71rem!important;
	top: 0;
	left: 0;

}
.uploadPictures:hover{
   border-color:#3594F4;
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
.add{
	display: block;
	width: 100%!important;
	height: .44rem!important;
	line-height: .44rem!important;
	/* margin-top:-.44rem

	; */
 }

</style>
