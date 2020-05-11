<template>
	<div class="promoters" ref='promotersRef'>
		<van-pull-refresh v-model="pullingDown" @refresh="afterPullDown" >
			<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
				<div class="leftImg" @click="goBackFn"  id="navback">
					<img src="../../../assets/image/shape@3x.png" alt="">
				</div>
				<div class="centerTitle">
					<h3>人员列表</h3>
				</div>
				<div class="right">
					<router-link :to="{name:'hospital_promotersSearch',query:{}}">
						<img src="../../../assets/image/sousuo@2x.png" alt="">
					</router-link>
					<router-link :to="{name:'hospital_addPromoters',query:{}}">
						<img src="../../../assets/image/tianjia@2x.png" alt="">
					</router-link>
				</div>
			</div>
			<div class="zhangwei"></div>
			<div class="promoters_list" @scroll="handleScroll" ref="promoters_list">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<ul :style="{'padding-top':$store.state.paddingTop}">
						<li v-for="(item,inx) in promotersList" :key="inx">
						<router-link :to="{path : '/hospital/hospital_promotersDetails',query:{hospitalUserId: item.hospitalUserId}}">
							<div class="list">
							<img src="../../../assets/image/ren@2x.png" alt="">
							<h4>{{item.name}}</h4>
							<div class="listRight">
								<span>门诊数：{{item.clinicCount}}</span>
								<img src="../../../assets/image/right@2x.png" alt="">
							</div>
							</div>
						</router-link>
						</li>
					</ul>
				</van-list>
			</div>
		</van-pull-refresh>
		<div class="returnTop" @click="$refs.promoters_list.scrollTop=0;hospitalReturnTopPage = false;" ref="returnTopRef" v-show="hospitalReturnTopPage">
			<img src="../../../assets/image/returnTop.png" alt />
			<span>顶部</span>
		</div>
	</div>
</template>

<script>
import qs from 'qs';
export default {
	name: 'promoters',
	data () {
		return {
			promotersList:[],
			loading: false,
			finished: false,
			page: 0,
			query:'',
	 		pullingDown:false,
		}
	},
	computed:{

	},
	components:{
		
	},
	created(){
		
	},
  
	mounted(){
	},
	activated() {
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
		}
		if(this.scrollTop != 0){
			this.$refs.promoters_list.scrollTop = this.scrollTop;
		}
	},
	methods: {
		// 滑动一定距离出现返回顶部按钮
		handleScroll() {
			this.scrollTop = this.$refs.promoters_list.scrollTop || this.$refs.promoters_list.pageYOffset
			if (this.scrollTop > 800) {
				this.hospitalReturnTopPage = true;
			} else {
				this.hospitalReturnTopPage = false;
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
			let thisVue = this
			if(this.$route.meta.auth && !this.$store.state.hospital.login)
			this.$toast({message:'请登录',onClose:function(){
				thisVue.$router.replace({ path : '/hospital/hospitalLogin',query:{time:1}});
			}})

		  Object.assign(this.$data, this.$options.data());
		  this.onLoad();
		},
		goBackFn(){
			this.$router.back(-1)
		},
    onLoad(){
      ++this.page;
      this.getData();
    },
		getData(){
			this.$axios.get('/hospital/def/hospital-operator-users?'+'&'+qs.stringify({
        pn: this.page,
        ps: 10
      }))
			.then(res => {
				if(!res.data.codeMsg){
          if(res.data.data.rows.length != 0){
            for(let i in res.data.data.rows){
            	this.promotersList.push(res.data.data.rows[i])
              console.dir(this.promotersList)
            }
            if(this.promotersList.length<10){
            	let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            	// 
            	this.$refs.promotersRef.style.height = windowHeight+ 'px'
            }
            // 
            this.loading = false;
          }else {
            this.loading = false;
            this.finished = true;
          }
				}else{
          this.$toast(res.data.codeMsg)
        }
			})
			.catch((err)=>{
				
			})
		}
	},
}
</script>

<style scoped>
.promoters{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: .47rem;
	margin-bottom: .15rem;
	position: fixed;
	top:0;
	z-index: 999;
	background-color: #FFFFFF;
}
.zhangwei{
	width: 100%;
	height: .47rem;
}
.leftImg{
	width: 22%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
	line-height: .47rem;
	padding-left: .16rem;
}
.centerTitle{
	width:56%;
	text-align: center;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.centerTitle h3{
	font-size: .16rem;
	font-weight: bolder;
	color: #333333;
}
.right{
	width: 22%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.right a{
	width: 40%;
}
.right img{
	height: .22rem;
	width: .22rem;
	object-fit: cover;
}
.right a:first-child img{
	padding-right: .2rem;
}
.promoters ul{
	width: 100%;
	/* height: 100%; */
}
.promoters ul li{
	width: 93.6%;
	height: .5rem;
	margin:.12rem auto 0;
	line-height: .5rem;
	overflow: hidden;
	background-color: #FFFFFF;
}
.list{
	height: 100%;
	width: 100%;
	position: relative;
}
.list img:first-child{
	width: .17rem;
	height: .16rem;
	margin: 0rem .1rem 0rem .15rem;
	display: inline-block;
}
.list h4{
	color: #333333;
	font-size: .14rem;
	font-weight: bold;
	display: inline-block;
}
.listRight{
	position: absolute;
	right: .1rem;
	top:0;
	font-size: .13rem;
}
.listRight span{
	margin-right: .15rem;
}
.listRight img{
	height: .15rem;
}
.promoters_list{
	height: calc(100% - .47rem);
	touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
	overflow: scroll;
	overflow-x: hidden;
	width: 100%;
}
>>>.van-pull-refresh{
	height: 100%;
}
</style>
