<template>
	<div class="index" >
		<topSolt>
		<van-pull-refresh slot="returnTopSolt" v-model="pullingDown" @refresh="afterPullDown" ref="refersh" >
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="topNav_search">
				<img src="../../../assets/image/sousuo@2x.png" alt="">
				<router-link :to="{path:'/operating/operating_hospiatlAllSearch'}">
					<input type="search">
					
				</router-link>
				<div class="shaixuan" @click="shaixuanFn">
					<span>筛选</span>
					<img src="../../../assets/image/shaixuan.svg" alt="">
				</div>
			</div>
			<div class="topNav_Title">
				<h4>合作医院<span>{{hospitalSum}}</span></h4>
				<router-link :to="{path:'/operating/operating_addHospital'}">
					<div class="addHospital">新增医院<img src="../../../assets/image/right@2x.png" alt=""></div>
				</router-link>
			</div>
		</div>
		<div style="width: 100%;height: 1rem;" :style="{'padding-top':$store.state.paddingTop}"></div>
		<van-popup v-model="show" @close="closeTimeFn" position="right" :style="{ height: '100%',width:'78.7%'}">
			<div id="indexLabel">
				<div class="labelLabel xiaxian" >
					<strong>显示</strong>
					<button @click="clickFn('0')" :class="listStyleData[0]? 'clickColor':''">全部医院</button>
					<button @click="clickFn('1')" :class="listStyleData[1]? 'clickColor':''">我的医院</button>
				</div>
				<div style="margin-top: .1rem;">
					<div class="labelLabel" >
						<strong>排序</strong>	
						<button @click="clickFn('2')" :class="listStyleData[2]? 'clickColor':''">
							门诊数量最多
						</button>
						<button @click="clickFn('3')" :class="listStyleData[3]? 'clickColor':''">
							病源数量最多
						</button>
					</div>
					<div class="labelLabel">
						<button @click="clickFn('4')" :class="listStyleData[4]? 'clickColor':''">
							创建时间最近
						</button>
						<button @click="clickFn('5')" :class="listStyleData[5]? 'clickColor':''">
							医院名称A-Z
						</button>
					</div>
				</div>
				<div class="LabelResult">
					<button @click="screeningResult">重选</button>
					<button @click="screeningSubmit">确定</button>
				</div>
			</div>
		</van-popup>
		<div class="hospitalContent">
		<van-list  v-model="loading" :finished="finished" :finished-text="test"  @load="getNextPage">
			<router-link :to="{path:'/operating/operating_indexDetails',query:{hospitalId:item.hospitalId}}"  v-for="(item,inx) in hospitalList" :key="inx">
				<div class="hospitalList">
					<div class="hospitalContent_title">
						<img :src="item.cover" alt="">
						<h5>{{item.hospitalName}}</h5>
						<img :src="item.img" alt="">
					</div>
					<div class="hospitalContent_message">
						<p>创建时间：{{moment(item.time).format('YYYY-MM-DD HH-MM')}}</p>
						<p>门诊数：{{item.clinicCount}}</p>
						<p>病源数：{{item.patientCount}}</p>
					</div>
				</div>
			</router-link>
		</van-list>
		</div>
		<div style="height: .55rem;"></div>
		</van-pull-refresh>
		</topSolt>
	</div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import qs from "qs";
import { Dialog } from "vant";
import topSolt from "../function/topSolt.vue";
export default {
  name: "gene",
  data() {
    return {
		labelDocument:['labelDocument','labelDocument2','labelDocument3','labelDocument4','labelDocument5','labelDocument6'],
      page: 0,
      pullingDown: false,
	  hospitalList:[],
	  loading: false,
	  // 加载状态结束
	  finished: false,
	  test:'',
	  hospitalSum:0,
	  show:false,
	  listStyleData:[false,false,false,false,false,false,false],
	  sorts:'',
	  orders:'',
	  axiosData:1,
    };
  },
  components: {
    topSolt
  },
  computed: {
    // ...mapGetters(["account", "isLogin"])
  },

  beforeCreate(){
    
  },
  created() {

  },
  beforeMount(){
    debugger
    
  },
  mounted() {
    // debugger
    // let thisVue = this;
    // if (window.plus) {
    //   //plus.navigator.setStatusBarBackground("#ffffff");
    //   plus.navigator.setStatusBarStyle("dark");
    // }
    // if(this.$route.meta.auth && !this.$store.state.operating.login){
    // 	this.$toast({message:'请登录',onClose:function(){
	// 		debugger
    // 		thisVue.$router.replace({ path : '/operating/operatingLogin',query:{time:1}});
    // 	}})
    // }
  },
  activated(){
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			// if(this.$route.meta.auth && !this.$store.state.operating.login){
			// 	this.$toast({message:'请登录',onClose:function(){
			// 		debugger
			// 		thisVue.$router.replace({ path : '/operating/operatingLogin',query:{time:1}});
			// 	}})
			// }
			this.initData();
		}
  	},
  deactivated(){
    debugger
    },
  methods: {
	clickFn(_num){
		if(this.listStyleData[_num]){
			this.listStyleData.splice(_num, 1, false);
		}else{
			if(_num == 0 || _num == 1){
				this.listStyleData[0] = false;
				this.listStyleData[1] = false;
				this.listStyleData.splice(_num, 1, true);
			}
			if(_num == 2 || _num == 3 || _num == 4 || _num == 5){
				this.listStyleData[2] = false;
				this.listStyleData[3] = false;
				this.listStyleData[4] = false;
				this.listStyleData[5] = false;
			}
			this.listStyleData.splice(_num, 1, true);
		}
		console.log(_num)
		console.log(this.listStyleData)
		console.log(this.listStyleData[_num])
		
	},
	shaixuanFn(){
		this.show = true
	},
	screeningSubmit(){
		if(this.listStyleData[0]){
			this.loading = false,
			this.finished = false,
			this.axiosData = 0
		}
		if(this.listStyleData[1]){
			this.loading = false,
			this.finished = false,
			this.axiosData = 1
		}
		if(this.listStyleData[2]){
			this.sorts = 'clinicCount';
			this.orders = 'desc';
		}
		if(this.listStyleData[3]){
			this.sorts = 'patientCount';
			this.orders = 'desc';
		}
		if(this.listStyleData[4]){
			this.sorts = 'addTime';
			this.orders = 'desc';
		}
		if(this.listStyleData[5]){
			this.sorts = 'hospitalName';
			this.orders = 'asc';
		}
		this.hospitalList = []
		this.page = 0
		this.getNextPage();
		this.show = false;
	},
	screeningResult(){
		this.listStyleData = [false,false,false,false,false,false,false];
		this.sorts = '';
		this.orders = '';
		this.page = 0;
		this.show = false;
		this.getNextPage()
	},
	closeTimeFn(){
	  this.hospitalReturnHomePage = true;
	  this.hospitalReturnTopPage = true;
	},
	getNextPage(){
	  	this.page++;
	  	if(this.axiosData){
			this.getMyData();
		}else{
			this.getAllData()
		}
		
	},
    afterPullDown() {
      //下拉刷新
      setTimeout(() => {
        this.pullingDown = false;
        this.initData();
      }, 500);
    },
    initData() {
      let thisVue = this;
	  console.log(this.$store.state.operating.login)
      if(!this.$store.state.operating.login){
		  this.$toast('请登录')
		  let exit = setTimeout(()=>{
			  thisVue.$router.replace({path:"/operating/operatingLogin",query:{}})
			  clearTimeout(exit)
		  },1500)
	  }
      Object.assign(this.$data, this.$options.data());
      this.getNextPage();
    },
	getAllData(_data) {
	  this.$axios.post("/clientend2/manageend/allhospitals",qs.stringify({
			sorts:this.sorts,
			orders:this.orders,
	        pn: this.page,
	        ps: 10
	      })
	    )
	    .then(res => {
		if(res.data.codeMsg){
			this.$toast(res.data.codeMsg)
		}
		// if(res.data.code)
	      if (res.data.data.items.length != 0) {
	        for (let i in res.data.data.items) {
	          if (res.data.data.items[i].authStatus) {
	            this.hospitalList.push({
	              hospitalId: res.data.data.items[i].hospitalId,
	              cover: res.data.data.items[i].cover? res.data.data.items[i].cover:require('../../../assets/image/small-logo@2x.png'),
	              time: res.data.data.items[i].addTime,
	              hospitalName: res.data.data.items[i].hospitalName,
				  clinicCount: res.data.data.items[i].clinicCount,
				  patientCount: res.data.data.items[i].patientCount,
				  img: require('../../../assets/image/yirenzheng.svg'),
	            });
	          }else{
				  this.hospitalList.push({
				    hospitalId: res.data.data.items[i].hospitalId,
				    cover: res.data.data.items[i].cover? res.data.data.items[i].cover:require('../../../assets/image/small-logo@2x.png'),
				    time: res.data.data.items[i].addTime,
				    hospitalName: res.data.data.items[i].hospitalName,
				    clinicCount: res.data.data.items[i].clinicCount,
				    patientCount: res.data.data.items[i].patientCount,
					img: require('../../../assets/image/weirenzheng.svg'),
				  });
			  }
	        }
			this.hospitalSum = res.data.data.sum.totalItemCount
	        this.loading = false;
	        // this.finished = true;
	      } else {
	        this.loading = false;
	        this.finished = true;
	      }
	    })
	    .catch(err => {
	      
	    });
	},
    getMyData(_data) {
      this.$axios.post("/clientend2/manageend/hospitals",qs.stringify({
			sorts:this.sorts,
			orders:this.orders,
            pn: this.page,
            ps: 10
          })
        )
        .then(res => {
		if(res.data.codeMsg){
			this.$toast(res.data.codeMsg)
		}
		// if(res.data.code)
          if (res.data.data.items.length != 0) {
            for (let i in res.data.data.items) {
              if (res.data.data.items[i].authStatus) {
                this.hospitalList.push({
                  hospitalId: res.data.data.items[i].hospitalId,
                  cover: res.data.data.items[i].cover? res.data.data.items[i].cover:require('../../../assets/image/small-logo@2x.png'),
                  time: res.data.data.items[i].addTime,
                  hospitalName: res.data.data.items[i].hospitalName,
				  clinicCount: res.data.data.items[i].clinicCount,
				  patientCount: res.data.data.items[i].patientCount,
				  img: require('../../../assets/image/yirenzheng.svg'),
                });
              }else{
				  this.hospitalList.push({
				    hospitalId: res.data.data.items[i].hospitalId,
				    cover: res.data.data.items[i].cover? res.data.data.items[i].cover:require('../../../assets/image/small-logo@2x.png'),
				    time: res.data.data.items[i].addTime,
				    hospitalName: res.data.data.items[i].hospitalName,
				    clinicCount: res.data.data.items[i].clinicCount,
				    patientCount: res.data.data.items[i].patientCount,
					img: require('../../../assets/image/weirenzheng.svg'),
				  });
			  }
            }
			this.hospitalSum = res.data.data.sum.totalItemCount
            this.loading = false;
            // this.finished = true;
          } else {
            this.loading = false;
            this.finished = true;
          }
        })
        .catch(err => {
          
        });
    },
    // onLoad() {
    //   ++this.page;
      
    //   this.getdata();
    // },
  }
};
</script>

<style scoped>
.index{
	width: 100%;	
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	padding: 0px .16rem;
	box-sizing: border-box;
	position: fixed;
	background-color: #F5F5F5;
	z-index: 999;
	top: 0;
}
.topNav_search{
	width: 100%;
	height: .335rem;
	line-height: .335rem;
	position: relative;
	margin-top: .05rem;
}
.topNav_search img:first-child{
	width: .13rem;
	height: .145rem;
	position: absolute;
	left: .15rem;
	top:0rem;
	bottom: 0rem;
	margin: auto 0rem;
}
.topNav_search input{
	width: 82%;
	height: .335rem;
	background-color: #FFFFFF;
	border-radius: .17rem;
	box-sizing: border-box;
	padding: .06rem .1rem .06rem .39rem;
}
.shaixuan{
	height: 35px;
	/* line-height: 100%; */
	float: right;
}
.shaixuan span{
	font-size: .15rem;
	display: inline-block;
	margin-right: .03rem;
	height: 100%;
	line-height: auto;
}
.shaixuan img{
	width: .115rem;
	height: .13rem;
	float: right;
	margin-top:.1rem ;
}
.topNav_Title{
	margin-top: .2rem;
	height: .26rem;
	margin-bottom: .15rem;
}
.topNav_Title>h4{
	color: #333333;
	font-size: .17rem;
	font-weight: bolder;
	display: inline-block;
}
.topNav_Title>h4>span{
	font-size: .15rem;
	margin-left: .08rem;
}
.addHospital{
	float: right;
	display: inline-block;
	color: #2B77EF;
	font-size: .16rem;
}
.addHospital>img{
	width: .08rem;
	height: .13rem;
	float: right;
	margin-left: .05rem;
	margin-top: .05rem;
}
.hospitalContent{
	box-sizing: border-box;
	padding: 0px .12rem;
	/* margin-top: .15rem; */
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
.hospitalContent_title>img{
	display: inline-block;
}
.hospitalContent_title>img:first-child{
	float: left;
	width: .23rem;
	height: .16rem;
	margin-top: .17rem;
	margin-right: .1rem;
}
.hospitalContent_title>img:last-child{
	width: .72rem;
	height: .21rem;
	position: absolute;
	top: .08rem;
	right: -0.035rem;
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

#indexLabel {
  width: 85.5%;
  padding: 0.32rem 0.2rem 0.25rem 0.2rem;
  position: relative;
}
.labelLabel {
  height: 0.75rem;
}
.xiaxian{
	height: .8rem;
	border-bottom: 1px dotted rgba(0, 0, 0, 0.4);
}
.labelLabel strong {
  display: block;
}
.rightLine {
  margin-right: 0.25rem;
}
.rightLine:after {
  content: " ";
  position: absolute;
  height: 0.01rem;
  width: 0.15rem;
  bottom: 0;
  top: 50%;
  left: 107%;
  background-color: #999999;
}
.labelLabel button {
  height: 0.3rem;
  width: 1.05rem;
  margin-top: 0.1rem;
  border-radius: 0.15rem;
  border: none;
  background: #eeeeee;
  text-align: center;
  position: relative;
  color: #999999;
  font-size: 13px;
}
.labelLabel button:last-child {
  margin-left: 0.25rem;
}
.LabelResult {
  position: fixed;
  bottom: 0.25rem;
  right: 0.2rem;
  width: 1.6rem;
}
.LabelResult button:first-child {
  border: none;
  height: 0.3rem;
  text-align: center;
  width: 0.8rem;
  border-radius: 100px 0px 0px 100px;
  background-color: #1ecac6;
  float: left;
  color: #FFFFFF;
}
.LabelResult button:last-child {
  border: none;
  height: 0.3rem;
  text-align: center;
  width: 0.8rem;
  border-radius: 0px 100px 100px 0px;
  background-color: #ff951b;
  float: right;
  color: #FFFFFF;
}
.clickColor{
	color: #333333!important;
	background-color: #FFE1BE!important;
}
</style>
