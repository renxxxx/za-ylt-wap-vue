<template>
	<div class="index">
		<van-pull-refresh v-model="pullingDown" @refresh="afterPullDown" ref="refersh" >
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="topNav_search">
				<div class="topNav_searchBack" @click="backFn">
					<img src="../../../assets/image/shape@3x.png" alt="">
				</div>
				<div class="topNav_searchinput">
					<img src="../../../assets/image/sousuo@2x.png" alt="">
					<input type="search" v-model="kw" @keydown.enter="searchFn">
				</div>
				<div class="shaixuan" @click="shaixuanFn">
					<span>筛选</span>
					<img src="../../../assets/image/shaixuan.svg" alt="">
				</div>
			</div>
			<div class="topNav_Title">
				<h4>合作门诊<span>{{clinicNum}}</span></h4>
			</div>
		</div>
		<div style="width: 100%;height: 1rem;" :style="{'padding-top':$store.state.paddingTop}"></div>
		<div class="content">
			<ul>
				<van-list  v-model="loading" :finished="finished" :finished-text="test"  @load="getNextPage">
					<li v-for="(items,inx) in content" :key="inx">
						<router-link :to="{path : '/operating/operating_clinicDetails' ,query :  {clinicId : items.itemId,clinicName:items.name,}}">
							<div class="contentLi">
								<h4>{{items.name}}</h4>
								<span>推广人: {{items.clinicPromoterName}}</span>
								<input type="text" v-model="items.pushCount" readonly="readonly">
							</div>
						</router-link>
					</li>
				</van-list>
			</ul>
		</div>
		<div style="height: .55rem;"></div>
		<van-popup v-model="show" @close="closeTimeFn" position="right" :style="{ height: '100%',width:'78.7%'}">
			<div id="indexLabel">
				<!-- <div class="labelLabel xiaxian" >
					<strong>显示</strong>
					<button @click="clickFn('0')" :class="listStyleData[0]? 'clickColor':''">全部医院</button>
					<button @click="clickFn('1')" :class="listStyleData[1]? 'clickColor':''">我的医院</button>
				</div> -->
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
		</van-pull-refresh>
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
      page: 1,
      pullingDown: false,
	  show:false,
	  listStyleData:[false,false,false,false,false,false,false],
	  sorts:'',
	  orders:'',
	  loading: false,
	  			finished: false,
	  			content : [],
	  			page:0,
	  			clinicNum : 0,
	  test:'',
	  kw:'',
    };
  },
  components: {
    clinicContent
  },
  computed: {
    // ...mapGetters(["account", "isLogin"])
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
  
         let fromRoute =  JSON.stringify({path:from.path,name:from.name,query:from.query})
         let lastRoute = localStorage.getItem('lastRoute')
         
         
         if(fromRoute == lastRoute){
          localStorage.removeItem('lastRoute')
         }
   

  },
  beforeMount(){
    debugger
    
  },
  mounted() {
    debugger
    let thisVue = this;
    if (window.plus) {
      //plus.navigator.setStatusBarBackground("#ffffff");
      plus.navigator.setStatusBarStyle("dark");
    }
    
    let lastRoute = localStorage.getItem('lastRoute')
        if(lastRoute){
          this.$router.push(JSON.parse(lastRoute));
          return
        }
    this.initData();
  },
  activated(){
  },
  deactivated(){
    debugger
    },
  methods: {
	backFn(){
		this.$router.back()
	},
	searchFn(){
		this.page = 0;
		this.content = [];
		this.clinicNum = 0;
		this.finished = false;
		this.getNextPage()
	},
	getdata(){
		this.$axios.get('/c2/clinic/items?'+qs.stringify({
			pn:this.page,
			kw:this.kw,
			ps:10,
			sorts:this.sorts,
			orders:this.orders,
		}))
		.then(res => {
			if(res.data.data.items.length != 0){
				for(let i in res.data.data.items){
					if(res.data.data.items[i]){
						this.content.push(res.data.data.items[i])
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
	shaixuanFn(){
		this.show = true
	},
	closeTimeFn(){
	  this.hospitalReturnHomePage = true;
	  this.hospitalReturnTopPage = true;
	},
	screeningResult(){
		this.listStyleData = [false,false,false,false,false,false,false];
		this.sorts = '';
		this.orders = '';
		this.page = 0;
		this.show = false;
		this.content = [];
		this.getNextPage()
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
		this.content = []
		this.page = 0
		this.getNextPage();
		this.show = false;
	},
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
      if(this.$route.meta.auth && !this.$store.state.operating.login)
      this.$toast({message:'请登录',onClose:function(){
        thisVue.$router.replace({ path : '/operating/operatingLogin',query:{time:1}});
      }})

      Object.assign(this.$data, this.$options.data());
      // this.getdata();
      // this.$refs.clinic.initData();
    },
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
	margin-top: .08rem;
}
.topNav_searchBack{
	width: 7%;
	float: left;
}
.topNav_searchBack>img{
	width: .09rem;
	    height: .15rem;
}
.topNav_search{
	width: 100%;
	height: .335rem;
	line-height: .335rem;
	
}
.topNav_searchinput{
	width: 80%;
	float: left;
position: relative;
}
.topNav_searchinput>img{
	width: .13rem;
	height: .145rem;
	position: absolute;
	left: .15rem;
	top:0rem;
	bottom: 0rem;
	margin: auto 0rem;
}
.topNav_searchinput>input{
	width: 95%;
	height: .335rem;
	background-color: #FFFFFF;
	border-radius: .17rem;
	box-sizing: border-box;
	padding: .06rem .1rem .06rem .39rem;
}
.shaixuan{
	width: 13%;
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
.content{
	width: 100%;
	/* position: fixed; */
	/* height: calc(100% - 2.5rem); */
	height: 100%;
	/* overflow: scroll; */
}
.content>span{
	width: 94.6%;
	margin: 0 auto;
	display: block;
	margin-bottom: .05rem;
	color: #999999;
}
.content ul{
	width: 94.6%;
	margin: 0 auto;
	/* text-align: center; */
}
.content ul li{
	width: 48.6%;
	height: 1.1rem;
	display: inline-block;
	margin-top: .1rem;
	background-color: #FFFFFF;
	text-align: center;
	box-shadow: 0px 0px 5px 0.5px #ded9d9;
}
.content ul li:nth-child(1),.content ul li:nth-child(2){
	margin-top: 0rem;
}
.content ul li:nth-child(2n){
	margin-left:1.71% ;
}
.content ul li:first-child{
	/* margin-top: .2rem; */
}
.content ul li:last-child{
	margin-bottom: .49rem;
}
.contentLi{
	height: .82rem;
	/* margin-top: .19rem; */
	margin: .14rem auto;
}
.contentLi h4{
	font-size: .14rem;
	font-weight: bold;
	display: block;
	margin-top: .19rem;
}
.contentLi span{
	display: block;
	margin-top: .05rem;
	margin-bottom: .09rem;
	color: #999999;
}
.contentLi input{
	width: .9rem;
	height: .24rem;
	text-align: center;
	border: 1px solid #FF951B;
	border-radius: .5rem;
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
