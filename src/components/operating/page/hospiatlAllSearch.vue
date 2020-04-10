<template>
	<div class="hospiatlAllSearch">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="returnNav" @click="backFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="search">
				<img src="../../../assets/image/sousuo@2x.png" alt="">
				<input type="search" v-model="kw" @keydown.enter="searcFn">
			</div>
			<button @click="searcFn">搜索</button>
		</div>
		<div style="width: 100%;height: .6rem;" :style="{'padding-top':$store.state.paddingTop}"></div>
		<div class="hospitalContent">
			<van-list  v-model="loading" :finished="finished" :finished-text="test"  @load="getNextPage">
				<!-- <router-link :to="{path :'/hospital/hospital_index'}"> -->
					<div class="hospitalList" v-for="(item,inx) in hospitalList" :key="inx">
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
				<!-- </router-link> -->
			</van-list>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import qs from "qs";
import { Dialog } from "vant";
export default {
  name: "gene",
  data() {
    return {
		loading: false,
		// 加载状态结束
		finished: false,
		hospitalList:[],
		test:'',
		page: 0,
		kw:''
    };
  },
  components: {
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
  },
  activated(){
  },
  deactivated(){
  },
  methods: {
	searcFn(){
		this.hospitalList = [];
		this.loading = false,
		this.finished = false,
		this.page = 0;
		this.getNextPage();
	},
	backFn(){
		this.$router.back()
	},
	getNextPage(){
	  	this.page++;
		this.getAllData()
		
	},
	getAllData(_data) {
	  this.$axios.post("/clientend2/manageend/allhospitals",qs.stringify({
			kw:this.kw,
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
  }
};
</script>

<style scoped>
.hospiatlAllSearch{
	width: 100%;
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: .5rem;
	line-height: .5rem;
	box-sizing: border-box;
	position: fixed;
	background-color: #FFFFFF;
	z-index: 999;
	top: 0;
}
.topNav>button{
	color: #ffffff;
	background-color: #2b77ef;
	border-radius: 0.15rem;
	border: none;
	height: 0.28rem;
	line-height: .28rem;
	width: 0.5rem;
	font-size: 0.12rem;
	margin-left: .1rem;
}
.returnNav{
	width: 10%;
	height: 100%;
	line-height: 100%;
	text-align: center;
	float: left;
}
.returnNav>img{
	width: .09rem;
	height: .15rem;
	margin-top: .17rem;
}
.search{
	display: inline-block;
	width: 70%;
	box-sizing: border-box;
	position: relative;
	/* padding-right: ; */
}
.search>input{
	width: 100%;
	height: .335rem;
	background-color: #F5F5F5;
	border-radius: .17rem;
	box-sizing: border-box;
	padding: .06rem .1rem .06rem .39rem;
}
.search>img{
	width: .13rem;
	height: .145rem;
	position: absolute;
	left: .15rem;
	top:0rem;
	bottom: 0rem;
	margin: auto 0rem;
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
</style>
