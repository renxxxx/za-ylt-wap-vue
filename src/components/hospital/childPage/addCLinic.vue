<template>
	<div class="addClinic">
		<div class="navWarp" >
			<div class="leftNav" @click="goBackFn">
				<img src="static/img/back-white@2x.png" alt="">
			</div>
			<div class="centerNav">
				<span>新增门诊</span>
			</div>
			<div class="rightNav" @click="saveFn">
				<span>保存</span>
				<img src="static/img/save@2x.png" alt="">
			</div>
		</div>
		<div class="content">
			<form @submit.prevent="hospitalSubmit" class="newAdd">
				<div class="newAddTitle">
					<img src="static/img/bitian@2x.png" alt="">
					<h3>必填项</h3>
					<ul class="Fill">
						<li  >
							<span>门诊名称</span>
							<input type="text" v-model="addClinic.name"  placeholder="请填写">
						</li>
						<li>
							<span>推广人</span>
							<van-dropdown-menu>
								<van-dropdown-item v-model="value" :options="option" active-color='#2B77EF'/>
							</van-dropdown-menu>
						</li>
						<li>
							<span>分配账号</span>
							<input type="text" maxlength="11" v-model="addClinic.userPhone"  placeholder="请填写">
						</li>
						<li>
							<span>分配密码</span>
							<input type="password" v-model="addClinic.pwd " placeholder="请填写">
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
					<img src="static/img/xuantian@2x.png" alt="">
					<h3>选填项</h3>
					<ul class="Fill">
						<li  >
							<span>备注</span>
							<input type="text" v-model="addClinic.remark" placeholder="请填写">
						</li>
						<li class="popup" v-model="imageUpload" @click="showFn">
							<span>营业执照</span>
							<img class="rightImg" src="static/img/right@2x.png" alt="">
							<img  id="backimg" :src='imageUpload'  alt="" >
						</li>
						<van-action-sheet v-model="show"  :round="false" >
							<div class="popupChoose">
								<span>拍照</span>
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
									      <p>点击上传</p>
									   </div>
								</div>
							</div>
							<button @click="closeFn" class="closeStyle">取消</button>
						</van-action-sheet>
					</ul>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import clinic_content from '../functionPage/clinic_content.vue'
import { Toast } from 'vant'
export default {
	name: 'search',
	data () {
		return {
			// 推广人下拉列表参数
			value: '001',
			option: [],
			// 添加列表绑定数据
			addClinic:{
				name : '',
				phone : '',
				pwd : '',
				headmanName : '',
				contactTel : '',
				address : '',
				remark : '',
				license : '',
				readonly : '',
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
		clinic_content
	},
	created () {

	},
	mounted () {
		// 加载dom节点后,获取推广人列表请求
		this.$axios.post('hospitaler/clinic-promoter/list',qs.stringify({
			pn : 1,
			ps : 200,
			hospitalId : this.account.hospitalId,
		}))
		.then(res => {
			for(let i in res.data.data.items){
				this.option.push({
					'text' : res.data.data.items[i].name,
					'value' : res.data.data.items[i].no,
				})
			}
		})
		.catch((err)=>{
			console.log(err);
			Dialog({ message: '加载失败!'});
		})
		// console.log(this.$route.params.item)
    this.$route.params.item ? this.clinicFn() : ""
	},
	methods: {
    clinicFn(){
      
      this.$axios.post('/c2/clinic/item',qs.stringify({
      	itemId : this.$route.params.item,
      }))
      .then(_d => {
      	this.addClinic = _d.data.data;
      	this.imageUpload = _d.data.data.license
      })
      .catch((err)=>{
      	console.log(err);
      	Dialog({ message: err});
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
			this.$axios.post('c2/clinic/itemadd',qs.stringify({
				hospitalId : this.account.hospitalId,
				name : this.addClinic.name,
				phone : this.addClinic.phone,
				pwd : this.addClinic.pwd,
				headmanName : this.addClinic.headmanName,
				contactTel : this.addClinic.contactTel,
				address : this.addClinic.address,
				remark : this.addClinic.remark,
				license : this.addClinic.license,
			}))
			.then(res => {
				console.log(typeof res.data.codeMsg)
				res.data.codeMsg? Toast.success(res.data.codeMsg) : this.successFn();

			})
			.catch((err)=>{
				console.log(err);
				Dialog({ message: '加载失败!'});
			})
		},
		successFn(){
			Toast.success('添加成功');
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
	position: relative;
	width: 100%!important;
	height: .44rem!important;
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
