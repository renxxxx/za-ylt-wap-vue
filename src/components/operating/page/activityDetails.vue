<template>
	<div class="activityDetails">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>活动详情</h3>
			</div>
			<div class="right">
				<img src="../../../assets/image/share@3x.png" @click="share" alt="">
			</div>
		</div>
		<div class="zhangwei"></div>
		<div class="activeList" :model='active' :style="{'padding-top':$store.state.paddingTop}">
			<img v-lazy="active.cover" alt="">
			<div class="activeTitle">
				<h4>{{active.title}}</h4>
				<span>{{moment(active.startTime).format('YYYY-MM-DD HH:mm')}} - {{moment(active.endTime).format('YYYY-MM-DD HH:mm')}}</span>
			</div>
		</div>
		<div class="tabel">
			<ul>
				<li>
					<span>标题</span>
					<input type="text" v-model='active.title' readonly="readonly">
				</li>
				<li>
					<span>副标题</span>
					<input type="text" v-model='active.brief' readonly="readonly">
				</li>
				<li>
					<span>联系电话</span>
					<input type="text" v-model='active.tel' readonly="readonly">
				</li>
				<li>
					<span>活动起止时间</span>
					<input type="text" v-model="active.time" readonly="readonly">
				</li>
				<li>
					<span>活动地址</span>
					<input type="text" v-model='active.address' readonly="readonly">
				</li>
				<li>
					<span>活动说明</span>
					<!-- <input type="text" v-model='active.content' readonly="readonly"> -->
					<div class="tabelContent">
						<p style="white-space:pre-line;">{{active.content}}</p>
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
export default {
	name: 'activityDetails',
	data () {
		return {
			active : {},
		}
	},
	computed:{
	  ...mapGetters(['account']),
	},
	components:{

	},
	created(){
		var heightRexg = /^[0-9]*/g
		//var topHeight = this.topHeight.match(heightRexg)
		//this.height = parseInt(topHeight.join())
		//
	},
  beforeRouteLeave(to, from, next) {
    //debugger;
	let scrollTop = this.scrollTop =document.getElementById('operating').scrollTop;
this.scrollTop = scrollTop?scrollTop :0;

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
     ;
    next(vm => {
	 document.getElementById('operating').scrollTop=document.getElementById('operating').pageYOffset=vm.scrollTop;
	});

  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}

		this.$axios.post('/c2/activity/item',qs.stringify({
			itemId : this.$route.query.itemId,
		}))
		.then(_d => {
			this.active = _d.data.data
			if(_d.data.data.startTime != '' && _d.data.data.endTime){
				var moment = require('moment');
				this.active.time = moment(_d.data.data.startTime).format('YYYY-MM-DD HH:mm') + ' - ' +moment(_d.data.data.endTime).format('YYYY-MM-DD HH:mm')
				// 
			}
			this.$axios.get('/other/bigtxt/'+_d.data.data.contentBtId+'/'+_d.data.data.contentBtId)
			.then(_d => {
        _d.data = _d.data.replace(/(\r\n|\n|\r)/gm, "\n");
				this.$set(this.active,'content',_d.data)
				// 
			})
			.catch((err)=>{
				
				//Dialog({ message: err});;
			})
		})
		.catch((err)=>{
			
			//Dialog({ message: err});;
		})
	},
	methods: {
		share(){

			let vue = this
			this.$h5p.shareWeb(location.href,this.active.cover,this.active.title,this.active.brief||'',function(){

				vue.$axios.post('/c2/share')
			});
		},
		//回退方法
		goBackFn(){
			this.$router.back(-1)
		},

	},
}
</script>

<style scoped>
.activityDetails{
	width: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	line-height: .47rem;
	background-color: #FFFFFF;
	border-bottom: 1px solid #E5E5E5;
	position: fixed;
	top:0;
	z-index: 9999;
}
.zhangwei{
	width: 100%;
	height: .47rem;
}
.leftImg{
	width: 10%;
	height: .47rem;
	float:left;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
	line-height: .47rem;
	padding-left: .16rem;
}
.centerTitle{
	width: 80%;
	text-align: center;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.centerTitle h3{
	font-size: .16rem;
	font-weight: bolder;
}
.right{
	width: 10%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.right img{
    width: .19rem;
    height: .19rem;
    float: right;
    margin-top: .14rem;
    margin-right: .21rem;
}
.activeList{
	width: 93.6%;
	height: 1.8rem;
	margin: .12rem auto;
	position: relative;
	overflow: hidden;
}
.activeList>img{
	height: 100%;
	width: 100%;
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
.tabel{
	width: 100%;
}
.tabel ul{
	width: 91.46%;
	margin: 0 auto;
}
.tabel ul li{
	height: .71rem;
	width: 100%;
	margin: .12rem 0rem;
}
.tabel ul li span{
	display: block;
	color: #999999;
	margin-bottom: .05rem;
}
.tabel ul li input{
	width: 96%;
	height: .45rem;
	line-height: .45rem;
	border: 1px solid #D8D8D8;
	padding-left: 4%;
}
.tabelContent{
	width: 96%;
	/* height: 100%; */
	line-height: .25rem;
	border: 1px solid #D8D8D8;
	padding-left: 4%;
}
</style>
