<template>
	<div class="shopAddress">
		<div class="topNav">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>新建地址</h3>
			</div>
			<div class="right" @click="submitFn">
				<button>确定</button>
			</div>
		</div>
		<div class="content">
			<ul>
				<li>
					<span>收货人:</span>
					<input type="text" v-model="address.name">
				</li>
				<li>
					<span>手机:</span>
					<input type="number" v-model="address.tel">
				</li>
				<li>
					<span>省市区:</span>
					<textarea rows="2" v-model="address.city"></textarea>
				</li>
				<li>
					<span>详细地址:</span>
					<textarea v-model="address.detailedAddress"></textarea>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
	name: 'shopAddressAdd',
	data () {
		return {
			address : {
				name : '',
				tel:'',
				city: '',
				detailedAddress : '',
			},
		}
	},
	computed:{
		...mapGetters(['account'])
	},
	components:{

	},
	created () {

	},
  beforeRouteLeave(to, from, next) {
    //debugger;
	this.scrollTop =document.getElementById('outpatient').scrollTop ||document.getElementById('outpatient').pageYOffset
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
	 document.getElementById('outpatient').scrollTop=document.getElementById('outpatient').pageYOffset=vm.scrollTop;
	});
	
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
		let querAddress = JSON.parse(this.$route.query.address)
		this.address = {
			name : querAddress.name,
			tel : querAddress.tel,
			city : querAddress.area,
			detailedAddress : querAddress.address,
			receiverId : querAddress.receiverId
		}
		

	},
	methods: {
		goBackFn(){
			this.$router.back(-1);
		},
		submitFn(){
			
			this.$axios.post('/clientend2/clinicend/pointexchange/receiveradd',qs.stringify({
				clinicId : this.$store.state.outpatientEntrance.loginRefresh().clinicId,
				receiverId : this.address.receiverId,
				name : this.address.name,
				tel : this.address.tel,
				address : this.address.city + this.address.detailedAddress,
			}))
			.then(res => {
				this.$toast.success({
					duration: 1000,
					message: '操作成功',
				});
			})
			.catch((err)=>{
				//Dialog({ message: err});;
			})
		},
	},
}
</script>

<style scoped>
.shopAddress{
	width: 100%;
	height: 100%;
	/* background-color: #F5F5F5; */
}

.topNav{
	width: 100%;
	height: .47rem;
  background-color: #FFFFFF;
}
.leftImg{
	width: 15%;
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
	width: 70%;
	text-align: center;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.centerTitle h3{
	font-size: .16rem;
	font-weight: bold;
}
.right{
	width: 15%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.right button{
	width: 100%;
	color: #48d38a;
	font-size: .14rem;
	border: none;
	background: none;
	text-align: center;
}
.content{
	width: 100%;
}
.content ul{
	width: 100%;
}
.content ul li{
	height: .4rem;
	line-height: .4rem;
	padding: 0rem .12rem;
	border-bottom: 1px solid #ebe7e7;
}
.content ul li:last-child{
	border: none;
}
.content ul li span{
	display:-moz-inline-box;
	display:inline-block;
	color: #BBBBBB;
	width: .55rem;
}
.content ul li input{
	height: .38rem;
	font-size: .13rem;
	width: 80%;
	float: right;
	border:none;

}
.content ul li textarea{
	height: .26rem;
	font-size: .13rem;
	width: 80%;
	/* line-height: .14rem; */
	display: inline-block;
	float: right;
	border:none;
}
</style>
