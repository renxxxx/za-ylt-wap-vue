<template>
	<div class="index">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<h3>—&nbsp;&nbsp;医院端&nbsp;&nbsp;—</h3>
		</div>
		<div class="zhangwei" :style="{'padding-top':$store.state.paddingTop}"></div>
		<div class="typeNav">
			<router-link :to="{path : '/promoters/promoters_clinicSearch',query:{time:new Date().getTime()}}">
				<img src="../../../../assets/image/qudaomenzhen@2.png" alt="">
			</router-link>
			<router-link :to="{path : '/promoters/promoters_sourceManagement',query:{time:new Date().getTime()}}">
				<img src="../../../../assets/image/bingyuanguanli@2.png" alt="">
			</router-link>
		</div>
		<div class="article" v-if="article.length">
		  <div class="articleTitle">
		    <img src="../../../../assets/image/Combined Shape@2x.png" alt />
		    <h3>运营文章</h3>
			<div class="articleDetails">
				<router-link
				  :to="{path : '/promoters/promoters_case'}"
				>
				<span>查看更多</span>
				<img src="../../../../assets/image/Chevron Copy 2@2x.png" alt="">
				</router-link>
			</div>
		  </div>
		  <ul>
		      <li v-for="(items,inx) in article" :key="inx">
		        <router-link
		          :to="{path : '/promoters/promoters_caseDetails' ,query : {itemId : items.itemId,data: 1,time:new Date().getTime()}}"
		        >
		          <div class="article_left">
		            <p>{{items.content}}</p>
		            <div class="article_leftTime">
		              <img src="../../../../assets/image/time@2x.png" alt />
		              <span>{{moment(items.time).format('YYYY-MM-DD HH:mm')}}</span>
		            </div>
		          </div>
		          <div class="article_right">
		            <img :src="items.img" alt />
		          </div>
		        </router-link>
		      </li>
		  </ul>
		</div>
		<div class="article" v-if="qualityCase.length">
		  <div class="articleTitle">
		    <img src="../../../../assets/image/huodong@2x.png" alt />
		    <h3>推广活动</h3>
			<div class="articleDetails">
				<router-link :to="{path : '/promoters/promoters_activityReleased'}">
				<span>查看更多</span>
				<img src="../../../../assets/image/Chevron Copy 2@2x.png" alt="">
				</router-link>
			</div>
		  </div>
		  <div class="activeList">
        <router-link :to="{path : '/promoters/promoters_activityDetails',query:{itemId:qualityCase[0].itemId,time:new Date().getTime()}}">
          <img :src="qualityCase[0].img" alt="">
          <div class="activeTitle">
            <h4>{{qualityCase[0].content}}</h4>
            <span>{{moment(qualityCase[0].time).format('YYYY-MM-DD HH:mm')}}</span>
          </div>
        </router-link>
		  </div>
		  <ul style="">
		      <li v-for="(items,num) in qualityCase" :key="num">
		        <router-link :to="{path : '/promoters/promoters_activityDetails',query:{itemId:items.itemId,time:new Date().getTime()}}">
		          <div class="article_left">
		            <p>{{items.content}}</p>
		            <div class="article_leftTime">
		              <img src="../../../../assets/image/time@2x.png" alt />
		              <span>{{moment(items.time).format('YYYY-MM-DD HH:mm')}}</span>
		            </div>
		          </div>
		          <div class="article_right">
		            <img :src="items.img" alt />
		          </div>
		        </router-link>
		      </li>
		  </ul>
		</div>
		<div style="height: .5rem;"></div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';

export default {
	name: 'index',
	data () {
		return {
			article: [],
			qualityCase : []
		}
	},
	computed:{
	  ...mapGetters(["account"])
	},
	components:{

	},
	created(){

	},
	beforeRouteLeave(to, from, next) {
		this.scrollTop =document.getElementById('promoters').scrollTop ||document.getElementById('promoters').pageYOffset
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
		 document.getElementById('promoters').scrollTop=document.getElementById('promoters').pageYOffset=vm.scrollTop;
		});
		let fromRoute =  JSON.stringify({path:from.path,name:from.name,query:from.query})
		let lastRoute = localStorage.getItem('lastRoute')
		
		
		if(fromRoute == lastRoute){
		 localStorage.removeItem('lastRoute')
		}
	},
	destroyed(){
		// 
	},
	mounted () {
		let lastRoute = localStorage.getItem('lastRoute')
		    if(lastRoute){
		      this.$router.push(JSON.parse(lastRoute));
		      return
		    }
		
		this.initData();

	},
	methods: {
		initData(_data) {
			let thisVue=this;
			if(this.$route.meta.auth && !this.$store.state.hospitalEntrance.loginRefresh())
		this.$toast({message:'请登录',onClose:function(){
		  thisVue.$router.replace({ path : '/hospital/hospitalLogin',query:{time:1}});
		}})

		  this.$axios.post("/c2/article/items",qs.stringify({
		        hospitalId: this.$store.state.hospitalEntrance.loginRefresh().hospital.hospitalId,
		        pn: 1,
		        ps: 3
		      })
		    )
		    .then(res => {
		      if (res.data.data.items.length != 0) {
		        for (let i in res.data.data.items) {
		          // 
		          if (res.data.data.items[i]) {
		            this.article.push({
		              content: res.data.data.items[i].title,
		              img: res.data.data.items[i].cover,
		              time: res.data.data.items[i].alterTime,
		              itemId: res.data.data.items[i].itemId
		            });
		          }
		        }
		      }
		    })
		    .catch(err => {
		      
		    });
			this.$axios.post('/c2/activity/items',qs.stringify({
				hospitalId: this.$store.state.hospitalEntrance.loginRefresh().hospital.hospitalId,
				pn : 1,
				ps : 3
			}))
			.then(res => {
				if(res.data.data.items.length != 0){
					for(let i in res.data.data.items){
						// 
						if(res.data.data.items[i]){
							this.qualityCase.push({
								content:res.data.data.items[i].title,
								img: res.data.data.items[i].cover,
								time:res.data.data.items[i].alterTime,
								itemId : res.data.data.items[i].itemId,
							})
						}


					}
				}
			})
			.catch((err)=>{
				
				//Dialog({ message: '加载失败!'});
			})
		},
	},
}
</script>

<style scoped>
.index{
	width: 100%;
	background-color: #F5F5F5;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	text-align: center;
	position: fixed;
	top:0;
	border-bottom: 1px solid #E2E2E2;
	background-color: #FFFFFF;
	z-index: 999;
}
.topNav h3{
	font-size: .16rem;
	font-weight: bold;
}
.zhangwei{
	height: .47rem;
}
.typeNav{
	width: 100%;
	height: .95rem;
	line-height: .95rem;
	background-color: #FFFFFF;
	text-align: center;
}
.typeNav img{
	width: 1.65rem;
	height: .65rem;
}
.typeNav img:first-child{
	padding-right: .15rem;
}

.article {
  border-top: 1px solid #e5e5e5;
  background-color: #FFFFFF;
  margin-top: .1rem;
}
.articleTitle {
	width: 91.5%;
	margin: 0rem auto;
	height: 100%;
	/* line-height: 100%; */
	/* width: 100%; */
	margin-top: 0.2rem;
}
.articleTitle img {
  float: left;
  width: 0.18rem;
  height: 0.21rem;
  margin-right: 0.12rem;
}
.articleTitle h3 {
  font-weight: bolder;
  font-size: 0.16rem;
  display: inline-block;
}
.articleDetails{
	float: right;
	position: relative;
	height: .24rem;
	line-height: .24rem;
}
.articleDetails span{
	color: #666666;
	font-size: .135rem;
	display: inline-block;
	height: .24rem;
	line-height: .24rem;
	padding-right: .05rem;
}
.articleDetails img{
	float: right;
	width: .08rem;
	height: .13rem;
	margin: .045rem 0rem;
}
.article ul {
  margin-top: 0.2rem;
  width: 100%;
  width: 91.5%;
  margin: 0rem auto;
}
.article ul li {
  width: 100%;
  height: 0.97rem;
  border-bottom: 1px solid #d8d8d8;
  margin: 0.12rem 0;
}
.article ul li:last-child {
  border: none;
}
.article_left {
  float: left;
  width: 60.1%;
}
.article_left p {
  font-size: 0.14rem;
  font-weight: bold;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 0.42rem;
}
.article_leftTime {
  margin-top: 0.23rem;
  height: 0.16rem;
  line-height: 0.16rem;
  position: relative;
}
.article_leftTime img {
  position: absolute;
  top: 0.02rem;
  width: 0.11rem;
  height: 0.11rem;
}
.article_leftTime span {
  margin-left: 0.17rem;
}
.article_right {
  float: left;
  margin-left: 7.8%;
  width: 32.1%;
}
.article_right img {
  width: 1.08rem;
  height: 0.85rem;
  object-fit: cover;
}
.activeList{
	width: 93.6%;
	height: 1.8rem;
	margin: .12rem auto;
	position: relative;
	overflow: hidden;
	box-sizing: border-box;
}
.activeList>img{
	height: 100%;
	width: 100%;
	object-fit: cover;
}
.activeTitle{
	position: absolute;
	color: #FFFFFF;
	bottom: 0rem;
	left: 0rem;
	width: 100%;
	height: 50%;
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
.activeTitle h4{
	font-size: .15rem;
	position: absolute;
	bottom: .32rem;
	left: .2rem;
}
.activeTitle span{
	color: #EAF2FF;
	position: absolute;
	bottom: .15rem;
	left: .2rem;
}
</style>
