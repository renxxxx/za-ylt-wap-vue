<template>
	<div class="typeDetails">
		<div class="topNav"  :style="{'padding-top':$store.state.paddingTop}">
			<img src="../../../assets/image/shape@3x.png" alt=""  @click="goBackFn"  id="navback"  :style="{'padding-top':$store.state.paddingTop}">
			<h3>{{this.about.name}}</h3>
		</div>
		<div class="zhangwei" :style="{'padding-top':$store.state.paddingTop}"></div>
		<div class="typeTItle" v-show="!this.doctor||this.doctor.length==0? false:true">
			<h4 class="xia">科室医生</h4>
			<ul ref='scrollId'>
				<li v-for="(item,inx) in doctor" :key="inx" @click='doctorAboutFn(item)'>
					<img :src="item.headimg" alt="">
					<h5>{{item.name}}</h5>
					<p>{{item.hosptialName}}</p>
				</li>
			</ul>
			<van-popup v-model="show">
				<div class="popup">
					<img src="../../../assets/image/Bookmark@2x.png" alt="">
					<div class="popupTitle">
						<img :src="doctorAbout.headimg" alt="">
						<h5>{{doctorAbout.name}}<span>{{doctorAbout.jobTitles}}</span></h5>
						<p>{{doctorAbout.hosptialName}}</p>
						<p>{{doctorAbout.intro}}</p>
					</div>
					<img src="../../../assets/image/close2@2x.png" alt="" @click='show = false'>
				</div>
			</van-popup>

		</div>
		<div class="typeContent" v-show="this.about.content? true:false">
			<h4 class="xia">科室简介</h4>
			<div class="contentP">
				<p>{{this.about.content}}</p>
				<img :src="img" v-for='(img,inx) in about.image' :key='inx' alt="">
			</div>
		</div>
		<div class="typeContent" v-show="this.about.shiYingZheng? true:false">
			<h4 class="xia">适应症状</h4>
			<ul>
				<li v-for='(item,inx) in this.about.shiYingZheng' :key='inx'>
					{{item}}
				</li>
			</ul>
		</div>
		<div class="typeContent" v-show="this.about.zhenLiaoJiShu? true:false">
			<h4 class="xia">诊疗技术</h4>
			<div class="contentP">
				<p>{{this.about.zhenLiaoJiShu}}</p>
			</div>
		</div>
		<div class="typeContent" v-show="this.about.teSe? true:false">
			<h4 class="xia">诊疗特色</h4>
			<div class="contentP">
				<p>{{this.about.teSe}}</p>
			</div>
		</div>
		<div class="typeContent" v-show="this.about.youShi? true:false">
			<h4 class="xia">科室优势</h4>
			<div class="contentP">
				<p>{{this.about.youShi}}</p>
			</div>
		</div>
	</div>

</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import Dialog from 'vant';
export default {
	name: 'case',
	data () {
		return {
			doctor:[],
			show: false,
			doctorAbout:{},
			about:{}
		}
	},
	computed:{
		...mapGetters(['account']),
	},
	components:{

	},
	created(){

	},
  
	mounted(){
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		// let id = '';
		// this.$router.currentRoute.query.item? id = this.$router.currentRoute.query.item: ''
		// this.$axios.post('/c2/office/item',qs.stringify({
		// 	itemId : id,
		// }))
		// .then(_d => {
		// 	this.about = _d.data.data;
		// 	// 
		// 	if(this.about.image!=null){
		// 		this.about.image = _d.data.data.image.split(',');
				
		// 	}
		// 	if(_d.data.data.shiYingZheng == null){

		// 	}else{
		// 		debugger
		// 		this.about.shiYingZheng = _d.data.data.shiYingZheng.split(',');
				
		// 	}
		// })
		// .catch((err)=>{
			
		// 	//Dialog({ message: err});;
		// })
		// this.$axios.post('/c2/doctor/items',qs.stringify({
		// 	officeId : id,
		// 	hospitalId : this.$store.state.hospital.login.hospital.hospitalId,
		// }))
		// .then(_d => {
		// 	for(let i in _d.data.data.items){
		// 		this.doctor.push({
		// 			name : _d.data.data.items[i].name,
		// 			hosptialName : _d.data.data.items[i].hosptialName,
		// 			intro : _d.data.data.items[i].intro,
		// 			jobTitles : _d.data.data.items[i].jobTitles,
		// 			headimg : _d.data.data.items[i].headimg,
		// 		})
		// 	}

		// 	this.$refs.scrollId.style.width = 50 * _d.data.data.items.length +'%'
		// 	// 
		// })
		// .catch((err)=>{
			
		// 	//Dialog({ message: err});;
		// })
	},
	activated() {
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			let id = '';
			this.$router.currentRoute.query.item? id = this.$router.currentRoute.query.item: ''
			this.$axios.post('/c2/office/item',qs.stringify({
				itemId : id,
			}))
			.then(_d => {
				this.about = _d.data.data;
				// 
				if(this.about.image!=null){
					this.about.image = _d.data.data.image.split(',');
					
				}
				if(_d.data.data.shiYingZheng == null){
			
				}else{
					debugger
					this.about.shiYingZheng = _d.data.data.shiYingZheng.split(',');
					
				}
			})
			.catch((err)=>{
				
				//Dialog({ message: err});;
			})
			this.$axios.post('/c2/doctor/items',qs.stringify({
				officeId : id,
				hospitalId : this.$store.state.hospital.login.hospital.hospitalId,
			}))
			.then(_d => {
				for(let i in _d.data.data.items){
					this.doctor.push({
						name : _d.data.data.items[i].name,
						hosptialName : _d.data.data.items[i].hosptialName,
						intro : _d.data.data.items[i].intro,
						jobTitles : _d.data.data.items[i].jobTitles,
						headimg : _d.data.data.items[i].headimg,
					})
				}
			
				this.$refs.scrollId.style.width = 50 * _d.data.data.items.length +'%'
				// 
			})
			.catch((err)=>{
				
				//Dialog({ message: err});;
			})
		}
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1)
			// this.$router.push({ path : '/hospital/hospitalImage',query :{components : "hospital_imageType",}});
		},
		//医生介绍
		doctorAboutFn(_about){
			this.show = true;
			this.doctorAbout = _about;
			// 
		}
	},
}
</script>

<style scoped>
.typeDetails{
	width: 100%;
	/* background-color: #F5F5F5; */
	background-color: #FFFFFF;
}
.zhangwei{
	height: .47rem;width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	/* border-bottom: 1px solid #E5E5E5; */
	text-align: center;
	position: relative;
	background-color: #FFFFFF;
	position: fixed;
	top: 0;
	z-index: 999;
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
.typeTItle{
	width: 100%;
	height: 2.06rem;
	background-color: #FFFFFF;
	padding-top: .15rem;
	overflow: auto;
	overflow-y: hidden
}
.xia{
	font-size: .15rem;
	font-weight: bold;
	margin-top: .15rem;
	margin-left: .26rem;
	position: relative;
}
.xia:before{
	content: "";
	width: .03rem;
	height: .11rem;
	background-color: #2B77EF;
	position: absolute;
	top: .05rem;
	left: -.08rem;
}
.typeTItle ul{
	margin-top: .25rem;
	width: 100%;
	height: 1.44rem;

}
.typeTItle ul li{
	width: 1.6rem;
	float: left;
	animation: 15s wordsLoop linear infinite normal;
	text-align: center;
}
.typeTItle ul li{
	border-left:1px solid #EEEEEE;
}
.typeTItle ul li img{
	width: .9rem;
	height: .9rem;
	border-radius: 50%;
	margin-bottom: .12rem;
	object-fit: cover;
}
.typeTItle ul li h5{
	font-size: .14rem;
	font-weight: bold;
}
.typeTItle ul li h5 span{
	margin-left: .06rem;
	font-weight: normal;
}
.typeContent{
	width: 100%;
	margin-top: .1rem;
	padding: .15rem 0rem;
	background-color: #FFFFFF;
}
.contentP{
	margin: .12rem .17rem .15rem .17rem;
}
.contentP p{
	color: #666666;
}
.contentP img{
	width: 100%;
	margin-top: .1rem;
}
.typeContent ul{
	width: 85.3%;
	margin-top: .15rem;
	margin-left: .18rem;
}
.typeContent ul li{
	/* width: .9rem; */
	padding:.07rem .15rem;
	height: .25rem;
	line-height: .25rem;
	border-radius: .15rem;
	text-align: center;
	color: #FF951B;
	background-color: #FFF9F2;
	margin-right: .1rem;
	margin-bottom: .1rem;
	display: inline-block;
}
>>>.van-popup--center {
    top: 39%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
    width: 91.46%;
	height: 3.9rem;
	border-radius: .06rem;
}
>>>.van-popup {
    overflow-y: visible;
}
.popup{
	width: 100%;
	height: 3.9rem;
	position: relative;
	text-align: center;
}
.popup>img:first-child{
	width: .31rem;
	height: .33rem;
	position: absolute;
	right: .08rem;
	top:-.05rem;
	z-index: 9999;
}
.popup>img:last-child{
	width: .45rem;
	height: .45rem;
	position: absolute;
	/* right: 0rem; */
	left: 42%;
	top:4.45rem;
	z-index: 9999;
}
.popupTitle{
	width: 82.5%;
	margin: 0rem auto;
	padding-top: .27rem;
	text-align: center;
}
.popupTitle img{
	width: .9rem;
	height: .9rem;
	margin: 0rem auto;
	margin-bottom: .12rem;
	border-radius: 50%;
}
.popupTitle h5{
	font-weight: bold;
	color: #333333;
}
.popupTitle h5 span{
	font-weight: normal;
	margin-left: .05rem;
}
.popupTitle p{
	color: #333333;
}
.popupTitle p:last-child{
	color: #666666;
	text-align: left;
}
</style>
