<template>
	<div class="detail">
		<div class="topNav">
			<div class="nav_left">
				<a @click="goBackFn">
					<img src="static/img/back-white@2x.png" alt="">
				</a>
			</div>
			<div class="nav_center">
				<h3>病员信息</h3>
			</div>
			<div class="nav_right" @click="modifyFn" v-model='modify' v-if="isLogin == 200? false:true">
				<span>{{modify.value}}</span>
				<img :src=modify.img alt="">
			</div>
		</div>
		<div class="_message">
			<h3>基本信息</h3>
			<ul>
				<li>
					<span>病员姓名</span>
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
					<input type="text" v-model="detail.clinicName" :placeholder="modify.readonly? '':'请输入' " :readonly="true">
				</li>
			</ul>
			<div style="margin-top:.2rem"></div>
			<h3>就诊信息</h3>
			<ul>
				<li>
					<span>门诊推送时间</span>
					<input type="text" :value="detail.pushTime" :placeholder="modify.readonly? '':'请输入' " :readonly="true">
				</li>
				<li>
					<span>确认就诊时间</span>
					<input type="text" v-model="detail.hospitalConfirmTime" :placeholder="modify.readonly? '':'请输入' " :readonly="true">
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
		<div style="margin-top:.2rem"></div>
		<div class="_photo">
			<h3>发票照片</h3>
      <ul>
        <li v-for="(item,inx) in imgUrl" :key="inx" @click="enlargeFn(inx)">
          <img v-bind:src="item" alt="">
          <img v-show="show" src="static/img/detele.png" alt="" @click="deteleFn(item)">
		  <van-image-preview
		    v-model="enlarge"
		    :images="imgUrl"
			:start-position='photoNum'
		    @change="onChange"
		  >
		    <template v-slot:index>第{{ photoPage+1 }}页</template>
		  </van-image-preview>
        </li>
         <li v-show="show">
            <div class="addImg">
            	<div class="addImgButton" v-show="imgUrl? false : true">
            		<div class="add"></div>
                <div class="min"></div>
            	</div>
            	<input type="file" class="upload" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"
            	    multiple @change="addImg($event)"/>
            </div>
         </li>
      </ul>
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
    imgUrl:[],
    show : true,
		modify:{
			value:'编辑',
			img:'static/img/editor.png',
			data:false,					//保存状态
			readonly : 'true',		//读取状态
			num: 0,						//点击次数
		},
		photoNum : 0,
    photoPage : 0,
		enlarge: false,
    detail:{
    	patientId : undefined,		//病人id
    	realname : undefined,		//病人姓名
    	clinicId : undefined,		//门诊id
    	clinicName : undefined,		//门诊名称
    	hospitalConfirmTime : undefined	,//医院确诊时间
    	hospitalId	: undefined,	//医院id
    	hospitalName : undefined,	//医院名称
    	idcardNo : undefined,		//身份证号
    	invoices : [],		//发票
    	patientId :undefined,		//患者id
    	pushTime : undefined,		//推送时间
    	remark : undefined,			//备注
    	tel : undefined,			//电话号码
    	sickness : undefined		//病例
    },
    }
  },
  computed:{
		...mapGetters(['account','isLogin']),
		// detail: {
		// 	get: function() {
		// 		// console.log(this.$store)
		// 		return this.$store.state.shop.detail
		// 	},
		// 	set: function (newValue) {
		// 		this.$store.state.shop.detail = newValue;
		// 	},
		// },
  },
  created () {

  },
  mounted () {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}

	this.$axios.post('/c2/patient/item',qs.stringify({
		patientId : this.$route.query.patientId,
	})).then(res =>{
		this.detail = {
			realname : res.data.data.realname,			//病人姓名
			clinicId : res.data.data.clinicId,		//门诊id
			clinicName : res.data.data.clinicName,		//门诊名称
			// hospitalConfirmTime : res.data.data.hospitalConfirmTime,//医院确诊时间
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
		// console.log(this.detail)
		if(res.data.data.invoices){
			res.data.data.invoices = res.data.data.invoices.split(",");
			for (let i in res.data.data.invoices){
				this.imgUrl.push( res.data.data.invoices[i]);
			}
			this.modify.data = true;
			this.modify.value = '编辑';
			this.modify.img = 'static/img/editor.png';
      this.show = false;
		}else{
			this.modify.data = false;
			this.imgUrl = [];
      this.show = false;
		}
		//判断时间是否为空
		// console.log(this.detail.pushTime)
		if(res.data.data.hospitalConfirmTime){
			// console.log(this.detail.hospitalConfirmTime)
			this.detail.hospitalConfirmTime = moment(res.data.data.hospitalConfirmTime).format('YYYY-MM-DD HH:mm');
		}
		if(res.data.data.pushTime){
      // console.log(res.data.data.pushTime)
			this.detail.pushTime = moment(res.data.data.pushTime).format('YYYY-MM-DD HH:mm');
		}
	}).catch(err =>{
		console.log(err)
	})
  },
  methods: {
	enlargeFn(_value){
    this.photoNum = _value;
    console.log(this.photoNum)
		this.enlarge = true;
	},
	onChange(_value){
		this.photoPage = _value;
		console.log(this.imgUrl)
	},
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
			this.modify.img = 'static/img/save@2x.png';
      // console.log(this.modify.value)
			this.modify.data = true;
			for(let i =1; i<6; i++){
				let _id = 'readId' + i;
				this.modify.readonly = false;
			}
      this.show = true;
		}else{
      this.modify.value = '编辑';
      this.modify.img = 'static/img/editor.png';
      // console.log(this.modify.value);
			let _imgAddress = [];
      if(this.imgUrl.length == 1){
        _imgAddress[0] = this.imgUrl[0]
      }else{
        for(let i in this.imgUrl){
        	_imgAddress[i] = this.imgUrl[i]
        }
      }
      // console.log(_imgAddress)
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
        if(!res.data.codeMsg){
          this.show = false
        }
			}).catch(err =>{
				console.log(err)
			})
			for(let i =1; i<6; i++){
				let _id = 'readId' + i;
				// console.log(_id)
				this.modify.readonly = true;
			}
		}
	},
	 // 上传图片触发方法
	addImg(_fileLIst){
		var file = _fileLIst.target.files[0]
		// console.log(e)
		if(file.type.indexOf('image') > -1){
			let formData = new FormData();
			formData.append('file', file)
			this.$axios.post('/other/fileupload?cover&duration',formData,{headers: {'Content-Type': 'multipart/form-data'
			}}).then(res =>{
        if(!res.data.codeMsg){
          // console.log(res.data.codeMsg)
          this.imgUrl.push(res.data.data.url)
          // console.log(this)
        }

			}).catch(err =>{
				console.log(err)
			})
		 }else{
			Dialog({ message: '请选择图片' });
			return false;
		}
	},
  deteleFn(_img){
    // console.log(this.imgUrl)
    let deleteImg =  this.imgUrl.filter( n => n != _img);
    this.imgUrl = deleteImg;
    // console.log(this.imgUrl)
  }
  },
}
</script>

<style scoped>
.detail{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
}
.topNav{
	width: 100%;
	height: .47rem;
	background-color: #2B77EF;
	color:#FFFFFF;
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
/* ._message ul li:last-child{
	border: none;
} */
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
._photo ul{
  margin-top: .1rem;
  padding: 0rem .16rem;
}
._photo ul li{
  display: inline-block;
  margin-right: .04rem;
  width: .88rem;
  height: .88rem;
  overflow: hidden;
  position: relative;
}
._photo ul li img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
._photo ul li img:last-child{
  position: absolute;
  right: 0;
  top: 0;
  height: .2rem;
  width: .2rem;
}
.addImg{
	width: .86rem;
	height:.86rem;
	line-height: 88%;
	/* margin: 0rem auto; */
	overflow: hidden;
	text-align: center;
	position: relative;
  border:1px dashed #b9b9b9;
}
.addImg>img{
	width: 100%;
}
.addImgButton{
	display: block!important;
	text-align: center;
	width: 100%;
  height: 100%;
  line-height: 100%;
  position: relative;
}
.add{
  height:.24rem ;
  width: .02rem;
  background-color: #b9b9b9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.min{
  width: .24rem;
  height: .02rem;
  background-color: #b9b9b9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
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
