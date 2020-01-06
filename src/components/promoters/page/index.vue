<template>
	<div class="index">
		<div class="topNav" :style="{'padding-top': height+'px'}">
			<h3>—&nbsp;&nbsp;医院端&nbsp;&nbsp;—</h3>
		</div>
		<div class="zhangwei" :style="{'padding-top': height+'px'}"></div>
		<div class="typeNav">
			<img src="../../../assets/image/qudaomenzhen@2.png" alt="">
			<img src="../../../assets/image/bingyuanguanli@2.png" alt="">
		</div>
		<div class="article">
		  <div class="articleTitle">
		    <img src="../../../assets/image/Combined Shape@2x.png" alt />
		    <h3>运营精选</h3>
		  </div>
		  <ul :model="article">
		    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @check="onLoad">
		      <li v-for="(items,inx) in article" :key="inx">
		        <router-link
		          :to="{name : 'hospital_caseDetails' ,query : {itemId : items.itemId,data: 1,time:new Date().getTime()}}"
		        >
		          <div class="article_left">
		            <p>{{items.content}}</p>
		            <div class="article_leftTime">
		              <img src="../../../assets/image/time@2x.png" alt />
		              <span>{{moment(items.time).format('YYYY-MM-DD HH:mm')}}</span>
		            </div>
		          </div>
		          <div class="article_right">
		            <img :src="items.img" alt />
		          </div>
		        </router-link>
		      </li>
		    </van-list>
		  </ul>
		</div>
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
			loading: false,
			finished: false,
			page: 1,
		}
	},
	computed:{
	  ...mapGetters(["account"])
	},
	components:{
		
	},
	created(){
		var heightRexg = /^[0-9]*/g
		var topHeight = this.topHeight.match(heightRexg)
		this.height = parseInt(topHeight.join()) 
	},
	beforeRouteLeave(to, from, next) {
		this.scrollTop =document.getElementById('app').scrollTop ||document.getElementById('app').pageYOffset
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
		 document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
		});
		
	},
	destroyed(){
		// console.log('destroyed')
	},
	mounted () {
	
	},
	methods: {
		onLoad() {
		  this.getdata();
		},
		getdata(_data) {
		  this.$axios.post("/c2/article/items",qs.stringify({
		        hospitalId: this.account.hospitalId,
		        pn: this.page,
		        ps: 10
		      })
		    )
		    .then(res => {
		      if (res.data.data.items.length != 0) {
		        for (let i in res.data.data.items) {
		          // console.log(res.data.data.items[i])
		          if (res.data.data.items[i]) {
		            this.article.push({
		              content: res.data.data.items[i].title,
		              img: res.data.data.items[i].cover,
		              time: res.data.data.items[i].alterTime,
		              itemId: res.data.data.items[i].itemId
		            });
		          } else {
		            // this.$notify({
		            // 	message: '数据已全部加载',
		            // 	duration: 1000,
		            // 	background:'#79abf9',
		            // })
		          }
		        }
		        this.loading = false;
		      } else {
		        // this.$notify({
		        // 	message: '数据已全部加载',
		        // 	duration: 1000,
		        // 	background:'#79abf9',
		        // })
		        this.loading = false;
		        this.finished = true;
		      }
		    })
		    .catch(err => {
		      console.log(err);
		      //Dialog({ message: '加载失败!'});
		    });
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
  width: 91.5%;
  margin: 0rem auto;
  border-top: 1px solid #e5e5e5;
}
.articleTitle {
  height: 100%;
  width: 100%;
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
}
.article ul {
  margin-top: 0.2rem;
  width: 100%;
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
</style>
