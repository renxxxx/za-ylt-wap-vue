<template>
	<div class="addClinic">
		<div class="navWarp" :style="{'padding-top':$store.state.topHeight}">
			<div class="leftNav" @click="goBackFn">
				<img src="../../../assets/image/back-white@2x.png" alt="">
			</div>
			<div class="centerNav">
				<span>新增病原</span>
			</div>
			<div class="rightNav"></div>
		</div>
		<div class="zhangwei"></div>
		<div class="content" :style="{'padding-top':$store.state.topHeight}">
			<div class="newAdd">
				<div class="newAddTitle">
					<img src="../../../assets/image/bitian@2x.png" alt="">
					<h3>必填项</h3>
					<ul class="Fill">
						<li>
							<span>病患姓名</span>
							<input type="text" v-model="source.name"  placeholder="请填写">
						</li>
						<li>
							<span>联系方式</span>
							<input type="text" maxlength="11" v-model="source.tel" placeholder="请填写">
						</li>
					</ul>
				</div>
				<div class="newAddTitle bottom">
					<img src="../../../assets/image/xuantian@2x.png" alt="">
					<h3>选填项</h3>
					<ul class="Fill">
						<li>
							<span>身份证号</span>
							<input type="text" maxlength="18" v-model="source.idNumber" placeholder="请填写">
						</li>
						<li>
							<span>备注</span>
							<input type="text" v-model="source.remark" placeholder="请填写">
						</li>
					</ul>
				</div>
				<div class="submitClss">
					<button @click="submitFn">提交</button>
				</div>
			</div>
		</div>
		
		
	</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs';
import {mapActions,mapGetters} from 'vuex'
export default {
	name: 'search',
	data () {
		return {
			source:{
				name: '',
				tel: '',
				idNumber:'',
				remark: ''
			}
		}
	},
	computed:{
		...mapGetters(['account'])
	},
	components:{
		
	},
	created(){
		var heightRexg = /^[0-9]*/g
		//var topHeight = this.topHeight.match(heightRexg)
		//this.height = parseInt(topHeight.join())
		//console.log(this.height)
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
   mounted() {
		// 加载dom节点后,获取推广人列表请求
	},
	methods: {
		submitFn(){
			// console.log(this.account)
		this.$axios.post('/c2/patient/itemadd',qs.stringify({
				hospitalId : this.account.data.data.hospital.hospitalId,
				clinicId: this.$route.query.clinicId,
		 		realname : this.source.name,
		 		tel	:  this.source.tel,
		 		idcardNo : this.source.idNumber,
		 		remark : this.source.remark,
		 	}))
		 	.then( res =>{
		 		if(!res.data.code){
					this.$toast.success('操作成功')
				}else{
					if(res.data.codeMsg){
						this.$toast.fail(res.data.codeMsg)
					}
				}
		 	})
		 	.catch((err)=>{
		 		console.log(err)
		 		//Dialog({ message: '加载失败!'});
		 	})
		},
		// 返回键
		goBackFn(){
			this.$router.back(-1)
		},
	}
}
</script>

<style scoped>
.addClinic{
	width: 100%;
}
.navWarp{
	width: 100%;
	height: .48rem;
	line-height: .48rem;
	background-color: #2B77EF;
	color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 9999;
}
.zhangwei{
	width: 100%;
	height: .48rem;
}
.leftNav{
	float: left;
	width: 17.6%;
	height: .48rem;
	line-height: .48rem;
}
.leftNav img{
	width: .09rem;
	height: .15rem;
	margin-left: .16rem;
}
.centerNav{
	float: left;
	width: 64.8%;
	height: .48rem;
	line-height: .48rem;
	text-align: center;
}
.centerNav span{
	font-size: .16rem;
	font-weight: 600;
}
.rightNav{
	float: left;
	width: 17.6%;
	height: .48rem;
	line-height: .48rem;
}
.rightNav img{
	width: .14rem;
	height: .15rem;
	margin: 0rem .16rem 0rem .05rem;
}
.newAddTitle{
	width: 91.4%;
	margin-top: .2rem;
	margin: 0 auto;
	padding-top: .2rem;
}
.newAddTitle img{
	width: .165rem;
	height: .185rem;
}
.newAddTitle h3{
	margin-left: .05rem;
	width: .45rem;
	height: .21rem;
	display: inline;
}
.submitClss{
	width: 100%;
	margin-top: .91rem;
	text-align: center;
}
.submitClss button{
	height: .4rem;
	width: 64.3%;
	color: #FFFFFF;
	font-size: .145rem;
	border: none;
	border-radius: .2rem;
	margin: 0rem auto;
	background-color: #2B77EF;
}
.Fill {
	width:90%;
}
.Fill li{
	border: 1px solid #D8D8D8;
	border-radius: .02rem;
	padding: .12rem .15rem;
	margin-top:.12rem;
	width: 100%;
	position: relative;
}
.Fill li span{
	height: .21rem;width: .6rem;
}
.Fill li input{
	border: none;
	float:right;
	text-align: right;
	color: #2B77EF;
}

.bottom img{
	width: .15rem;
	height: .18rem;
}
.AlreadySpanColor{
	color: #2B77EF!important;
}
>>>.van-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
	color: #2B77EF;
}
>>>.van-dropdown-menu {
	float: right;
    height: .22rem;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
	color: #757575;
}
>>>.van-dropdown-menu__title {
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    padding: 0rem;
    color: #323233;
    font-size: .09rem;
    line-height: 18px;
}
>>>.van-dropdown-menu__title::after {
    position: absolute;
    top: 50%;
    right: -4px;
    margin-top: -5px;
    border: 3px solid;
    border-color: transparent transparent currentColor currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    opacity: .8;
    content: none;
}
>>>.van-dropdown-item--down {
    bottom: 0;
    top: 202.141px!important;
}
.popup{
	height: .45rem;
	line-height: .45rem;
}
.rightImg{
	width: .06rem!important;
	height: .11rem!important;
	margin-top: .16rem;
	margin-left: .05rem;
	float: right;
}
#backimg{
	width: .43rem;
	height: 100%;
	margin: auto;
	float: right;
	object-fit: cover;
}
.popupChoose{
	height: .9rem;
	border-bottom: 6px solid #F5F5F5;
	text-align: center;
	font-size: .15rem;
}
.popupChoose span{
	display: block;
	width: 100%!important;
	height: .44rem!important;
	line-height: .44rem;
	border-bottom: .5px solid #D8D8D8;
}
.closeStyle{
	background: none;
	width: 100%;
	height: 100%;
	border: none;
	height: .44rem;
	font-size: .15rem;
}
.uploadPictures{
	position: absolute;
	width: 100%!important;
	height: .71rem!important;
	top: 0;
	left: 0;
}
.uploadPictures:hover{
   border-color:#3594F4;
}
.upload{
	opacity: 0;
	width: 100%!important;
	height: .44rem!important;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

}
.add{
	display: block;
	width: 100%!important;
	height: .44rem!important;
	line-height: .44rem!important;
	/* margin-top:-.44rem

	; */
 }
</style>
