<template>
	<div class="clinicDetails">
		<div class="nav">
			<div class="navLeft" @click="backFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="navCenter">
				<span>{{message.name}}</span>
			</div>
			<div class="navRight"></div>
		</div>
		<div class="type" :class="[!typeData? 'beijingColor':'']">
			<div class="typeData">
				<div class="tuisong" @click="typeClickFn(1)" :class="[typeData? 'typeDataColor':'']">
					推送病源
				</div>
				<div class="menzheng" @click="typeClickFn(0)" :class="[!typeData? 'typeDataColor':'']"> 
					门诊简介
				</div>
			</div>
		</div>
		<div style="width: 100%;height: 1.05rem;" :style="{'padding-top':$store.state.paddingTop}"></div>
		<div class="hospitalContent" v-show="typeData">
			<van-list  v-model="loading" :finished="finished" :finished-text="test"  @load="getNextPage">
				<div class="clinicMssageList" v-for="(item,inx) in content" :key="inx">
					<div class="hospitalList">
						<div class="hospitalContent_title">
							<!-- <img :src="item.cover" alt=""> -->
							<h5>{{item.realname}}</h5>
							<div class="zhuangtai">
								<img :src="item.img" alt="">
								<span :class="[item.status== 1? 'color':'']">{{item.span}}</span>
							</div>
						</div>
						<div class="hospitalContent_message">
							<p>推送时间：{{moment(item.pushTime).format('YYYY-MM-DD HH-MM')}}</p>
							<p>电话：{{item.tel}}</p>
							<p>所属：{{item.clinicName}}</p>
						</div>
					</div>
				</div>
		</van-list>
		</div>
		<div class="message" v-show="!typeData">
			<div class="newAddTitle">
					<ul class="Fill">
						<li>
							<span>创建时间</span>
							<input type="text" v-model="moment(message.addTime).format('YYYY-MM-DD HH-MM')" disabled="disabled" >
						</li>
						<li>
							<span>分配账号</span>
							<input type="text" maxlength="11" v-model="message.userPhone" disabled="disabled">
						</li>
						<li>
							<span>负责人</span>
							<input type="text" v-model="message.headmanName " disabled="disabled">
						</li>
						<li>
							<span>联系方式</span>
							<input type="text"  maxlength="11" v-model="message.contactTel" disabled="disabled" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请填写">
						</li>
						<li>
							<span>门诊地址</span>
							<input type="text" v-model="message.address" disabled="disabled">
						</li>
						<li>
							<span>备注</span>
							<input type="text" v-model="message.remark" disabled="disabled">
						</li>
						<li class="popup">
							<span>营业执照</span>
							<div class="yingyezhizhao">
								<img  id="backimg" :src='message.license'  alt="" >
								<img class="rightImg" src="../../../assets/image/right@2x.png" alt="">
							</div>
							
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import qs from "qs";
import { Dialog } from "vant";
import clinicContent from '../function/clinic_content.vue'
// import bottomNav from "./functionPage/bottomNav.vue";
// import moment from 'moment'
export default {
  name: "gene",
  data() {
    return {
      page: 0,
	  show:false,
	  sorts:'',
	  orders:'',
	  loading: false,
	  finished: false,
	  content : [],
	  test:'',
	  message:'',
	  typeData:true,
    };
  },
  components: {
    clinicContent
  },
  computed: {
  },

  beforeCreate(){
    
  },
  created() {

  },
  beforeRouteLeave(to, from, next) {
	
  let scrollTop = this.scrollTop =document.getElementById('operating').scrollTop;
this.scrollTop = scrollTop?scrollTop :0;

	
	
	if(!to.query.time || !from.query.time || to.query.time < from.query.time){
  
		 
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
	  debugger;
     next(vm => {
       debugger
	 document.getElementById('operating').scrollTop=document.getElementById('operating').pageYOffset=vm.scrollTop;
  });
  
   

  },
  beforeMount(){
    
  },
  mounted() {
    let thisVue = this;
    if (window.plus) {
      //plus.navigator.setStatusBarBackground("#ffffff");
      plus.navigator.setStatusBarStyle("dark");
    }
	this.getMessages()
  },
  activated(){
  },
  deactivated(){
    },
  methods: {
	backFn(){
		this.$router.back()
	},
	typeClickFn(value){
		if(value){
			this.typeData = true
		}else{
			this.typeData = false
		}
	},
	getMessages(){
		this.$axios.post('/c2/clinic/item?',qs.stringify({
			itemId: this.$route.query.clinicId,
		}))
		.then(res=>{
			if(res.data.codeMsg){
				this.$toast(res.data.codeMsg)
			}
			this.message = res.data.data
		})
	},
	getdata(){
		this.$axios.post('/c2/patient/items?',qs.stringify({
			pn:this.page,
			clinicId: this.$route.query.clinicId,
			ps:10,
			sorts:this.sorts,
			orders:this.orders,
		}))
		.then(res => {
			if(res.data.data.items.length != 0){
				for(let i in res.data.data.items){
					if(res.data.data.items[i].status == 1){
						this.content.push({
							clinicName : res.data.data.items[i].clinicName,
							itemId : res.data.data.items[i].itemId,
							pushTime : res.data.data.items[i].pushTime,
							realname : res.data.data.items[i].realname,
							status : res.data.data.items[i].status,
							img : require("../../../assets/image/weijiuzhen@2x.png"),
							tel : res.data.data.items[i].tel,
							span : "未就诊"
						});
					}else if(res.data.data.items[i].status == 4){
						this.content.push({
							clinicName : res.data.data.items[i].clinicName,
							itemId : res.data.data.items[i].itemId,
							pushTime : res.data.data.items[i].pushTime,
							realname : res.data.data.items[i].realname,
							status : res.data.data.items[i].status,
							img :require( "../../../assets/image/yes@2x.png"),
							tel : res.data.data.items[i].tel,
							buttonColor : "buttonColor",
							span : "已就诊"
						});
					}
					this.clinicNum = res.data.data.sum.totalCount
					// 
				}
			// 加载状态结束
			this.loading = false;
			}else{
				this.loading = false;
			this.test='没有更多了'
				this.finished = true;
			}
	
			if(this.content.length == 0){
			  this.test='无数据'
			}
			// this.clinic.num = res.data.data.sum.totalCount;
		})
		.catch((err)=>{
			
		})
	
	},
	getNextPage(){
		this.page++
		this.getdata()
	},

  }
};
</script>

</script>

<style scoped>
.clinicDetails{
	width: 100%;
	background-color: #F5F5F5;
}
.nav{
	width: 100%;
	height: .46rem;
	line-height: .46rem;
	background-color: #FFFFFF;
	box-sizing: border-box;
	position: fixed;
	z-index: 9;
}
.navLeft{
	width: 10%;
	height:100%;
	float: left;
	position: relative;
}
.navLeft>img{
	width: .09rem;
	height: .15rem;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
}
.navCenter{
	width: 80%;
	height:100%;
	float: left;
	text-align: center;
}
.navCenter>span{
	font-size: .18rem;
	font-weight: bold;
	color: #333333;
}
.navRight{
	width: 10%;
	height:100%;
	float: left;
}
.hospitalContent{
	box-sizing: border-box;
	padding: 0px .12rem;
	margin-top: .12rem;
}
.hospitalList{
	background-color: #FFFFFF;
	margin-bottom: .12rem;
}
.hospitalContent_title{
	height: .5rem;
	line-height: .5rem;
	border-bottom: 1px solid #E5E5E5;
	box-sizing: border-box;
	padding: 0rem 0rem .0rem .15rem;
	position: relative;
}
/* .hospitalContent_title>img{
	width: .72rem;
	height: .21rem;
	position: absolute;
	top: .08rem;
	right: -0.035rem;
} */
.zhuangtai{
	height: 100%;
	float: right;
	position: relative;
	margin-right: .15rem;
}
.zhuangtai>img{
	width: .11rem;
	height: .11rem;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	right: .4rem;
	
}
.color{
	color: #2B77EF!important;
}
.zhuangtai>span{
	font-size: .12rem;
	color: #FF951B;
}
.hospitalContent_title>h5{
	display: inline-block;
}
.hospitalContent_message{
	padding: .12rem 0rem .12rem .15rem;
}
.hospitalContent_message>p{
	color: #768892;
	padding-bottom: .05rem;
}
.type{
	width: 100%;
	height: .59rem;
	background-color: #F5F5F5;
	position: fixed;
	z-index: 9;
	top: .46rem;
}
.typeData{
	width: 93.6%;
	height: .35rem;
	line-height: .35rem;
	color: #2B77EF;
	margin: .12rem auto 0rem;
	box-sizing: border-box;
	border: 1px solid #2B77EF;
	border-radius: .04rem;
	/* position: fixed; */
}
.tuisong{
	width: 50%;
	display: inline-block;
	text-align: center;
	float: left;
}
.menzheng{
	width: 50%;
	display: inline-block;
	text-align: center;
	box-sizing: border-box;
}
.typeDataColor{
	color: #FFFFFF!important;
	background-color: #2B77EF!important;
}
.message{
	width: 100%;
	position: fixed;
	height: calc(100% - 1.05rem);
	background-color: #FFFFFF;
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
	background-color: #FFFFFF;
}
.Fill li span{
	height: .21rem;width: .6rem;
}
.Fill li input{
	border: none;
	float:right;
	text-align: right;
	color: #2B77EF;
	background-color: transparent;
}
.bottom img{
	width: .15rem;
	height: .18rem;
}
.beijingColor{
	background-color: #FFFFFF;
}
.popup{
	height: .74rem;
	line-height: .74rem;
}
.yingyezhizhao{
	float: right;
}
.yingyezhizhao>img:first-child{
	width: .54rem;
	height: .54rem;
	object-fit: cover
	
}
</style>
