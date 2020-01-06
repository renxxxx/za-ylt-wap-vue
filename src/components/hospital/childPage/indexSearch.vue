<template>
	<div class="search_clinic">
		<div class="navWarp" :style="{'padding-top': height+'px'}">
			<div class="topNav">
				<div class="clinic_information" @click="goBackFn">
					<img src="../../../assets/image/shape@3x.png" alt="">
				</div>
				<div class="clinic_search">
					<input type="text" placeholder="搜索门诊"  v-model="keywords" @keyup.enter="inputNow">
					<img src="../../../assets/image/sousuo@2x.png" alt="">
				</div>
				<div class="clinic_buttton" @click="inputNow">
					<button>搜索</button>
				</div>
			</div>
			<div class="listTitle">
				<div class="titleleft">
					<h3>合作门诊 {{clinic.num}}</h3>
				</div>
				<div class="titleRight">
					<router-link :to="{name : 'hospital_addCLinic',query:{time:new Date().getTime()}}">
						<span>新增</span>
						<img src="../../../assets/image/xinzeng@2x.png" alt="">
					</router-link>
				</div>
			</div>
		</div>
		<clinic_content ref='content' :clinic = 'clinic' :style="{'padding-top': height+'px'}"></clinic_content>


	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import clinic_content from '../functionPage/clinic_content.vue'
export default {
	name: 'search',
	data () {
		return {
			keywords : '',
			content : [],
			clinic : {
				num : 0
			},
		}
	},
	computed:{
		...mapGetters(['account'])
	},
	components:{
		clinic_content
	},
	created(){
		var heightRexg = /^[0-9]*/g
		var topHeight = this.topHeight.match(heightRexg)
		this.height = parseInt(topHeight.join())
		console.log(this.height)
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
     ;
    next(vm => {
	 document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
	});
	
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
	},
	methods: {
		goBackFn(){
			this.$router.back(-1)
		},
		//获取数据
		getdata(){
			 
			// console.log(this.Time)
      this.$axios.get('/hospital/super-admin/hospital-clinics?'+qs.stringify({kw:this.keywords}))

			.then(_d => {
				this.$refs.content.content = _d.data.data.rows
			})
			.catch((err)=>{
				console.log(err);
				//Dialog({ message: '加载失败!'});
			})
		},
		//键盘输入值时触发
		inputNow(_keywordsCode){
			//清除计时器
			if (this.timer) {
			    clearTimeout(this.timer);
			}
			if (_keywordsCode) {
			    this.timer = setTimeout(() => {
					this.getdata();
			    }, 500);
			} else {
			    // 输入框中的内容被删为空时触发，此时会清除之前展示的搜索结果
			    this.getdata();
			}
		},
	},
}
</script>

<style scoped>
.search_clinic{
	width: 100%;
}
.navWarp{
	width: 100%;
	height: .98rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 3;
}
.topNav{
	width: 100%;
	height: .42rem;
}
.clinic_search{
	float:left;
	width: 78.3%;
	position: relative;
}
.clinic_search input{
	margin: .09rem 0rem 0rem 0rem;
	height:.33rem;
	width: 83%;
	border: none;
	border-radius: .33rem;
	padding-left: 11.6%;
	background-color: rgba(0, 0, 0, 0.05);
}
.clinic_search img{
	width: .14rem;
	height: .15rem;
	position: absolute;
	top: .18rem;
	left: 4.8%;
}
.clinic_buttton{
	float: left;
	margin-top: .14rem;
	margin-left: -.05rem;
}
.clinic_buttton button{
	color: #FFFFFF;
	background-color: #2B77EF;
	border-radius: .15rem;
	border: none;
	height: .28rem;
	width: .45rem;
}

.clinic_information{
	float:left;
	width: 5.3%;
	margin-left: .16rem;
	margin-top: .17rem;
}
.clinic_information img{
	width: .09rem;
	height: .15rem;
}
.listTitle{
	width: 84%;
	height: .26rem;
	margin: 0rem auto;
	margin-top: .3rem;
}
.titleleft{
	float: left;
	height: .26rem;
	line-height: .26rem;
}
.titleleft h3{
	font-size: .16rem;
	font-weight: bolder;
}
.titleRight{
	float: right;
	height: .26rem;
	line-height: .26rem;
}
.titleRight span{
	font-size: .15rem;
}
.titleRight img{
	width: .19rem;
	height: .19rem;
	margin-left: .05rem;
	margin-top: -.03rem;
}
.content[data-v-3c6a3c8a] {
    width: 100%;
    height: 100%;
    margin-top: 0rem;

}
>>>.van-pull-refresh {
    overflow: visible;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-top: .98rem!important;
}
.content{
    width: 100%;
    height: 100%;
    margin-top: .98rem;
}
</style>
