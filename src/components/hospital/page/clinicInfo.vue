<template>
	<div class="addClinic">
		<div class="navWarp" :style="{'padding-top':$store.state.paddingTop}">
			<div class="leftNav" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/back-white@2x.png" alt="">
			</div>
			<div class="centerNav">
				<span>门诊详情页</span>
			</div>
			<div class="rightNav" @click="saveFn">
				<span>保存</span>
				<img src="../../../assets/image/save@2x.png" alt="">
			</div>
		</div>
		<div class="zhangwei"></div>
		<div class="content" :style="{'padding-top':$store.state.paddingTop}">
			<div class="newAdd">
				<div class="newAddTitle">
					<img src="../../../assets/image/bitian@2x.png" alt="">
					<h3>必填项</h3>
					<ul class="Fill">
						<li>
							<span>门诊名称</span>
							<input type="text" v-model="addClinic.name"  placeholder="请填写">
						</li>
						<li>
							<span>推广人</span>
							<!-- <van-dropdown-menu>
								<van-dropdown-item v-model="value" :options="option" active-color='#2B77EF' @change="changeFn"/>
							</van-dropdown-menu> -->
              <router-link :to="{name:'hospital_list',query:{name:'选择推广人',nowValue:addClinic.promoter,path:this.$router.apps[0]._route.name,item:this.$route.query.item,time:new Date().getTime()}}">
                <span>{{addClinic.promoter}}</span>
              </router-link>
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
					<img src="../../../assets/image/xuantian@2x.png" alt="">
					<h3>选填项</h3>
					<ul class="Fill">
						<li>
							<span>备注</span>
							<input type="text" v-model="addClinic.remark" placeholder="请填写">
						</li>
						<li class="popup" v-model="imageUpload" @click="showFn">
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
							<img class="rightImg" src="../../../assets/image/right@2x.png" alt="">
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
import { Dialog } from 'vant'
import { Toast } from 'vant'
import Vue from 'vue'
export default {
	name: 'search',
	data () {
		return {
			// 推广人下拉列表参数
			// value: "000",
			// option: [],
			// 添加列表绑定数据
			addClinic:{
				path : '/hospital/',
				phone : '',
				pwd : '',
				pwdConfirm : '',
				headmanpath : '/hospital/',
				contactTel : '',
				address : '',
				remark : '',
				license : '',
				readonly : '',
				clinicPromoterId : '',
				hospitalUserId : '',
        promoter:'请选择'
			},
			// 上传图片弹窗显示
			show: false,
			imageUpload:'',

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
    next(vm => {
	 document.getElementById('hospital').scrollTop=document.getElementById('hospital').pageYOffset=vm.scrollTop;
	});

  },
  activated(){
    // 
    // 
    // this.addClinic.promoter = localStorage.getItem('list_promoterValue')
    // this.addClinic.hospitalUserId = localStorage.getItem('list_promoterId');
    if(localStorage.getItem('list_promoterValue') || localStorage.getItem('list_promoterId')){
      delete this.addClinic.promoter;
      Vue.set(this.addClinic,'promoter',localStorage.getItem('list_promoterValue'));
      Vue.set(this.addClinic,'hospitalUserId',localStorage.getItem('list_promoterId'));
    }
  },
  mounted() {
     
		// 
		this.$route.query.item? this.clinicFn() : ""
	},
	methods: {
    clinicFn(){
      this.$axios.get('/hospital/super-admin/hospital-clinic/'+this.$route.query.item)
      .then(_d => {
          this.addClinic = {
            name : _d.data.data.name,
            phone : _d.data.data.clinicUserPhone,
            pwd :'',
            headmanName : _d.data.data.headman,
            contactTel : _d.data.data.tel,
            address : _d.data.data.address,
            remark : _d.data.data.remark,
            hospitalUserId : _d.data.data.hospitalUserId,
          },
          _d.data.data.hospitalUserName? this.addClinic.promoter = _d.data.data.hospitalUserName: ''
          this.$route.query.promoterValue? this.addClinic.promoter = this.$route.query.promoterValue:''
        // if(_d.data.data.hospitalUserName){

        // }
		// 
      	this.imageUpload = _d.data.data.license
		// this.$axios.get('/hospital/def/hospital-operator-users?'+qs.stringify({hospitalUserId:this.addClinic.hospitalUserId}))
		// .then(res => {
		// 	// 
		// 	// this.promoter= this.option.find((n)=>n.text == res.data.data.rows[0].name)
		// 	this.value = promoter
		// 	// 
		// })
		// .catch((err)=>{
		// 	
		// })
      })
      .catch((err)=>{
      	
      	//Dialog({ message: err});;
      })
    },
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
			  
		},
		// changeFn(id){
		// 	debugger
		// 	let promoter= this.option.find((n)=>n.value == id)
		// 		this.addClinic.clinicPromoterId = promoter.clinicPromoterId
		// 	
		// },
		addImg(_fileLIst){
			var file = _fileLIst.target.files[0]
			// 
			if(file.type.indexOf('image') > -1){
				let formData = new FormData();
				formData.append('file', file)
				this.$axios.post('/other/fileupload?cover&duration',formData,{headers: {'Content-Type': 'multipart/form-data'
				}}).then(res =>{
					// this.imageUpload.push({name:file.name,url:res.data.data.url})
					this.imageUpload = res.data.data.url
					
					this.show = false;
				}).catch(err =>{
					
				})
			 }else{
				Dialog({ message: '请选择图片' });
				return false;
			}

		},
		// 保存方法
		saveFn(){
			
			this.$axios.post('/hospital/super-admin/hospital-clinic-alter',qs.stringify({
				hospitalClinicId :  this.$route.query.item,
				name :  this.addClinic.name,
				license : this.imageUpload,								//营业执照
				address : this.addClinic.address, 						//门诊地址
				headman : this.addClinic.headmanName, 					//负责人姓名
				tel : this.addClinic.contactTel,						//负责人电话
				remark : this.addClinic.remark, 						//备注
				hospitalUserId : this.addClinic.hospitalUserId,		//推广人id
				clinicUserPhone : this.addClinic.phone, 				//分配账号
				clinicUserPassword : this.addClinic.pwd,				//分配账号密码
				clinicUserPasswordConfirm : this.addClinic.pwdConfirm,  //确认密码
			}))
			.then(res => {
				// 
				res.data.codeMsg? Toast.fail(res.data.codeMsg) : this.successFn();

			})
			.catch((err)=>{
				
				//Dialog({ message: '加载失败!'});
			})
		},
		successFn(){
			Toast.success('操作成功');
			this.$router.back(-1)
		}
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
	width: 19.6%;
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
	width: 60.8%;
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
	width: 19.6%;
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
	/* height: .44rem!important; */
  height: .71rem;
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
 }
.Fill li a span{
  color: #2B77EF;
  float: right;
  text-align: right;
  width: 60%;
}
</style>
