<template>
	<div class="detail">
		<div class="topNav">
			<div class="nav_left">
				<a @click="goBackFn">
					<img src="static/iOS切图/back-white@2x.png" alt="">
				</a>
			</div>
			<div class="nav_center">
				<h3>基因检测</h3>
			</div>
			<div class="nav_right" @click="modifyFn" v-model='modify'>
				<span>{{modify.value}}</span>
				<img :src=modify.img alt="">
			</div>
		</div>
		<div class="_message">
			<h3>基本信息</h3>
			<ul>
				<li>
					<span>病源姓名</span>
					<input type="text" id='readId1' v-model="detail.realname"  :placeholder="modify.readonly? '':'请输入' "  :readonly="modify.readonly">
				</li>
				<li>
					<span>联系方式</span>
					<input type="text" id='readId2' v-model="detail.tel"  :placeholder="modify.readonly? '':'请输入' "  :readonly="modify.readonly">
				</li>
				<li>
					<span>证件号码</span>
					<input type="text" id='readId3' v-model="detail.idcardNo" :placeholder="modify.readonly? '':'请输入' " :readonly="modify.readonly">
				</li>
				<li>
					<span>所属门诊</span>
					<input type="text" v-model="detail.clinicName" :readonly="true">
				</li>
			</ul>
			<ul>
				<li>
					<span>门诊推送时间</span>
					<input type="text" :value="detail.pushTime" placeholder="请输入" :readonly="true">
				</li>
				<li>
					<span>确认就诊时间</span>
					<input type="text" v-model="detail.hospitalConfirmTime" :readonly="true">
				</li>
				<li>
					<span>病种</span>
					<input type="text" id='readId4' v-model="detail.sickness" :placeholder="modify.readonly? '':'请输入' "  :readonly="modify.readonly">
				</li>
				<li>
					<span>备注</span>
					<input type="text" id='readId5' v-model="detail.remark"  :placeholder="modify.readonly? '':'请输入' " :readonly="modify.readonly">
				</li>
			</ul>
		</div>
		<div class="_photo">
			<h3>发票照片</h3>
			<div class="imageUpload" v-show="modify.data" id='readImg'>
				<van-uploader :before-read="beforeRead" :before-delete="berforedelete" preview-size='.9rem' 
				v-model="fileList" multiple="false" />
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
  name: 'gene',
  data () {
    return {
		//预浏览发票图img片地址
		fileList: [],
		//保存处理过的发票图片img地址
		imageUpload:[],
		// 最后提交的发票图片img
		postImgList:[],
		modify:{
			value:'编辑',
			img:'static/iOS切图/editor.png',
			data:false,					//保存状态
			readonly : 'true',		//读取状态
			num: 0,						//点击次数
		},
    }
  },
  computed:{
		...mapGetters(['account','detail']),
		detail: {
			get: function() {
				// console.log(this.$store)
				return this.$store.state.shop.detail
			},
			set: function (newValue) {
				this.$store.state.shop.detail = newValue;
			},
		},
  },
  created () {
		
  },
  mounted () {
	console.log(this.account.patientId)
	this.$axios.post('/c2/patient/item',qs.stringify({
		patientId : this.$route.params.patientId,
	})).then(res =>{
		this.detail = {
			realname : res.data.data.realname,			//病人姓名
			clinicId : res.data.data.clinicId,		//门诊id
			clinicName : res.data.data.clinicName,		//门诊名称
			hospitalConfirmTime : res.data.data.hospitalConfirmTime,//医院确诊时间
			hospitalId	: res.data.data.hospitalId,	//医院id
			hospitalName : res.data.data.hospitalName,	//医院名称
			idcardNo : res.data.data.idcardNo,		//身份证号
			invoices : res.data.data.invoices,		//发票
			patientId :res.data.data.patientId,		//患者id
			// pushTime : res.data.data.pushTime,		//推送时间
			remark : res.data.data.remark,			//备注
			tel : res.data.data.tel,			//电话号码
			sickness: res.data.data.sickness	//病例
		};
		// 如果信息中有发票图片,就显示
		// let code = res.data.data.invoices
		// console.log(code != null)
		if(res.data.data.invoices != null || undefined || ''){
			res.data.data.invoices = res.data.data.invoices.split(",")
			for (let i in res.data.data.invoices){
				this.fileList.push({'url' : res.data.data.invoices[i]});
				this.imageUpload.push({url:res.data.data.invoices[i]})
				// console.log(res.data.data)
			}
			this.modify.data = true;
			this.modify.value = '编辑';
			this.modify.img = 'static/iOS切图/editor.png';
			document.getElementsByClassName('van-uploader__upload')[0].style.display = 'none';
			console.log(document.getElementsByClassName('van-uploader__upload')[0])
			let classDomList = document.getElementsByClassName('van-uploader__preview-delete');
			for(let _d=0; _d <classDomList.length;_d++){
				classDomList[_d].style.display = "none";
			console.log(classDomList[_d])
			}
		}else{
			this.modify.data = false;
			this.fileList = [];
		}
		//判断时间是否为空
		// console.log(this.detail.pushTime)
		
		if(res.data.data.hospitalConfirmTime == '' || res.data.data.hospitalConfirmTime == undefined || res.data.data.hospitalConfirmTime == null){
			// console.log(this.detail.hospitalConfirmTime)
			this.detail.hospitalConfirmTime = ''
		}else{
			this.detail.hospitalConfirmTime = moment(res.data.data.hospitalConfirmTime).format('HH:mm:ss YYYY-MM-DD');
		}
		if(res.data.data.pushTime == '' || res.data.data.pushTime == undefined || res.data.data.pushTime == null){
		}else{
			this.detail.pushTime = moment(res.data.data.pushTime).format('HH:mm:ss YYYY-MM-DD');
		}
		// this.detail = res.data.data
		// console.log(this.detail);
	}).catch(err =>{
		console.log(err)
	})
  },
  methods: {
	// 返回上一级
	goBackFn(){
		this.$router.back(-1)
	},
	//修改方法
	modifyFn(){
		this.modify.num++;
		if(this.modify.num % 2 != 0){
			// console.log(this.modify.num)
			this.modify.value = '保存';
			this.modify.img = 'static/iOS切图/save@2x.png';
			this.modify.data = true;
			for(let i =1; i<6; i++){
				let _id = 'readId' + i;
				this.modify.readonly = false;
			}
			document.getElementsByClassName('van-uploader__upload')[0].style.display = 'flex'
			let classDomList = document.getElementsByClassName('van-uploader__preview-delete');
			for(let _d=0; _d <classDomList.length;_d++){
				classDomList[_d].style.display = "inline";
			}
		}else{
			
			let _imgAddress = [];
			for(let i in this.imageUpload){
				_imgAddress[i] = this.imageUpload[i].url
			}
			_imgAddress =  _imgAddress.join(",");
			// console.log(_imgAddress)
			this.$axios.post('/c2/patient/itemalter',qs.stringify({
				realname : this.detail.realname,
				patientId : this.detail.patientId,
				remark : this.detail.remark,
				sickness : this.detail.sickness,
				invoices : _imgAddress,
				idcardNo : this.detail.idcardNo,
				tel : this.detail.tel
			})).then(res =>{
				// console.log(this.imageUpload)
			}).catch(err =>{
				console.log(err)
			})
			for(let i =1; i<6; i++){
				let _id = 'readId' + i;
				// console.log(_id)
				this.modify.readonly = true;
			}
			// console.log()
			// console.log(this.fileList)
			if(this.fileList.length > 0){
				this.modify.value = '编辑';
				this.modify.img = 'static/iOS切图/editor.png';
				document.getElementsByClassName('van-uploader__upload')[0].style.display = 'none'
				let classDomList = document.getElementsByClassName('van-uploader__preview-delete');
				// console.log(classDomList)
				for(let _d=0; _d <classDomList.length;_d++){
					// console.log(classDomList[_d])
					classDomList[_d].style.display = "none";
				}
			}else{
				this.modify.data = false;
				this.modify.value = '编辑';
				this.modify.img = 'static/iOS切图/editor.png';
			}
		}
	},
	postImg(file){
		console.log(file)
		if(file.type == 'image/png'||'image/jpeg','image/gif'||'image/jpg'){
			let formData = new FormData();
			formData.append('file', file)
			this.$axios.post('/other/fileupload?cover&duration',formData,{headers: {'Content-Type': 'multipart/form-data'
			}}).then(res =>{
				this.imageUpload.push({url:res.data.data.url})
				console.log(this.imageUpload)
			}).catch(err =>{
				console.log(err)
			})
		 }else{
			Dialog({ message: '请选择图片' });
			return false;
		}
	},
	 // 上传图片触发方法
	beforeRead(file) {
		// let _file = file;
		// console.log('this.fileList')
		this.postImg(file);
		return true;
	},
	// 删除图片触发方法
	berforedelete(_deteleValue){
		// console.log(_deteleValue);
		let deleteImg =  this.imageUpload.filter( n => n.url != _deteleValue.url);
		this.imageUpload = deleteImg;
		console.log(document.getElementsByClassName('van-uploader__upload')[0]);
		
		this.detail.invoices = [];
		for(var _imgUrl = 0; _imgUrl < this.imageUpload.length; _imgUrl++){
			// console.log(this.imageUpload[_imgUrl].url)
			this.detail.invoices.push(this.imageUpload[_imgUrl].url)
		}
		console.log(this.detail.invoices)
		return true
	},
  },
}
</script>

<style scoped>
.detail{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: .47rem;
	background-color: #FF951BFF;
	color:#FFFFFFFF;
}
.nav_left{
	float: left;
	width: 15.5%;
	height:.47rem;
	line-height:.47rem;
	text-align:center;
}
.nav_left a img{
	width: .09rem;
	height: .15rem;
}
.nav_center{
	float: left;
	width: 66.5%;
	height:.47rem;
	line-height:.47rem;
	text-align:center;
}
.nav_center h3{
	font-weight: bold;
	font-size: .16rem;
}
.nav_right{
	float: left;
	width: 18%;
	height:.47rem;
	line-height:.47rem;
	text-align:center;
}
.nav_right span{
	font-size: .13rem;
}
.nav_right img{
	width: .14rem;
	height: .15rem;
	margin-top: -.05rem;
	margin-left: .05rem;
	margin-right: .16rem;
}
._message{
	width: 100%;
	margin-top: .1rem;
}
._message h3{
	color: #2B77EF;
	/* margin: 0rem .16rem; */
	position: relative;
	margin-left: .23rem;
}
._message h3:before{
	content: "";
	display: inline-block;
	width: .02rem;
	height: .07rem;
	background-color: #2B77EF;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	/* border-radius: 3px; */
	position: absolute;
	top: .05rem;
	left: -.07rem;
	
}
._message ul{
	margin-top: .1rem;
	/* margin: .1rem .16rem 0rem .1rem; */
	/* width: 100%; */
	background-color: #FFFFFF;
}
._message ul li{
	height: .45rem;
	line-height: .45rem;
	margin: 0 .16rem;
	border-bottom: 1px solid #E5E5E5;
}
._message ul li:last-child{
	border: none;
}
._message ul li span{
	float: left;
	font-size: .13rem;
}
._message ul li input{
	float: right;
	border: none;
	font-size: .13rem;
	height: .43rem;
	text-align: right;
	background-color: #FFFFFFF!important;
}
._photo{
	width: 100%;
	margin-top:.1rem;
}
._photo h3{
	margin-left: .23rem;
	color: #2B77EF;
	position: relative;	
}
._photo h3:before{
	content: "";
	display: inline-block;
	width: .02rem;
	height: .07rem;
	background-color: #2B77EF;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	/* border-radius: 3px; */
	position: absolute;
	top: .05rem;
	left: -.07rem;
}
.imageUpload{
	margin-top: .1rem;
}
>>>.van-uploader__upload{
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    margin: 0 8px 8px 0;
    background-color: #D8D8D8!important;
    border: 1px dashed #e5e5e5;
    border-radius: 4px;
}
>>>.van-uploader__preview{
    position: relative;
    margin: 0rem .05rem .05rem 0rem!important;
}
>>>.van-uploader__preview:nth-child(4n){
    position: relative;
    margin: 0rem 0rem .05rem 0rem!important;
}

>>>.van-uploader__upload {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    margin: 0 0px 8px 0;
    background-color: #D8D8D8!important;
    border: 1px dashed #e5e5e5;
    border-radius: 4px;
}
>>>.van-uploader__preview-delete {
    position: absolute;
    top: -8px;
    right: -8px;
    color: #969799;
    font-size: 18px;
    background-color: #fff;
    border-radius: 100%;
	z-index: 99;
}
</style>
