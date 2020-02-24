<template>
	<div class="case">
		<div class="topNav" :style="{'padding-top':$store.state.topHeight}">
			<img src="../../../assets/image/shape@3x.png" alt=""  @click="goBackFn"  id="navback" :style="{'padding-top':$store.state.topHeight}">
			<h3>优质案例</h3>
		</div>
		<div class="zhangwei"></div>
		<div class="article" :style="{'padding-top':$store.state.topHeight}">
			<ul>
				<li v-for="(items,inx) in article" :key="inx">
					<router-link :to="{name : 'hospital_caseDetails' ,query : {itemId : items.itemId,data: 4,time:new Date().getTime()}}">
						<div class="article_left" :style="{width:items.img?'60.1%':'100%'}">
							<p>{{items.content}}</p>
							<div class="article_leftTime">
								<img src="../../../assets/image/time@2x.png" alt="">
								<span>{{moment(items.time).format('YYYY-MM-DD HH:mm')}}</span>
							</div>
						</div>
						<div v-if="items.img"  class="article_right">
							<img :src=items.img alt="">
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'case',
	data () {
		return {
			article:[],
		}
	},
	computed:{
	  ...mapGetters(['account']),
	},
	components:{
		
	},
	created(){
		// var heightRexg = /^[0-9]*/g
		//var topHeight = this.topHeight.match(heightRexg)
		//this.height = parseInt(topHeight.join()) 
		//console.log(this.height)
	},
  beforeRouteLeave(to, from, next) {
    //debugger;
	this.scrollTop =document.getElementById('app').scrollTop ||document.getElementById('app').pageYOffset
	if(!to.query.time || !from.query.time || to.query.time < from.query.time){
		 debugger
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
	
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		this.$axios.post('/c2/project/items',qs.stringify({
			hospitalId : this.account.hospitalId,
			pn : 1,
			ps : 999
		}))
		.then(res => {
			if(res.data.data.items.length != 0){
				for(let i in res.data.data.items){
					// console.log(res.data.data.items[i])
					if(res.data.data.items[i]){
						this.article.push({
							content:res.data.data.items[i].name,
							img: res.data.data.items[i].cover,
							time:res.data.data.items[i].alterTime,
							itemId : res.data.data.items[i].itemId,
						}) 
					}else{
						// this.$notify({
						// 	message: '数据已全部加载',
						// 	duration: 1000,
						// 	background:'#79abf9',
						// })
					}
				}
			}
		})
		.catch((err)=>{
			console.log(err);
			//Dialog({ message: '加载失败!'});
		})
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},
	},
}
</script>

<style scoped>
.case{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	text-align: center;
	position: fixed;
	top:0;
	z-index: 999;
	background-color: #FFFFFF;
}
.zhangwei{
	width: 100%;
	height: .47rem;
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
.article{
	width: 91.5%;
	margin: 0rem auto;	
}
.article ul{
	margin-top: .2rem;
	width: 100%;
}
.article ul li {
	width: 100%;
	height: .97rem;
	border-bottom:1px solid #D8D8D8 ;
	margin: .12rem 0;
}
.article ul li:last-child{
	border: none;
}
.article_left{
	float: left;
	width: 60.1%;
}
.article_left p{
	font-size: .14rem;
	font-weight: bold;
	height: .42rem;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	height: 0.42rem;
}
.article_leftTime{
	margin-top: .23rem;
	height: .16rem;
	line-height: .16rem;
	position: relative;
}
.article_leftTime img{
	position: absolute;
	top:.02rem;
	width: .11rem;
	height: .11rem;
	
}
.article_leftTime span{
	margin-left: .17rem;
}
.article_right{
	float: left;
	margin-left: 7.8%;
	width: 32.1%;
}
.article_right img{
	width: 1.08rem;
	height: .85rem;
}
</style>
