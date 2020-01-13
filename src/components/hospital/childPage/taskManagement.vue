<template>
	<div class="task">
		<div class="topNav" :style="{'padding-top':$store.state.topHeight}">
			<div class="leftImg" @click="goBackFn">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>任务管理</h3>
			</div>
			<div class="right"></div>
		</div>
		<div class="zhangwei"></div>
		<div class="taskList" :style="{'padding-top':$store.state.topHeight}">
			<h3>首次收益</h3>
			<ul>
				<li v-for="(item,inx) in task.one" :key='inx'>
					<input type="checkbox" class="input_check" :checked="item.checked" @change="change($event,item,inx)"/>
					<router-link :to="{name : 'hospital_taskManagementDetails' ,query : {item : JSON.stringify(item),show : false,time:new Date().getTime()}}">
						<span>{{item.name}}</span>
					</router-link>
				</li>
			</ul>
			<h3>每日收益</h3>
			<ul>
				<li v-for="(item,inx) in task.no" :key='inx'>
					<input type="checkbox" class="input_check" :checked="item.checked" @change="change($event,item,inx)"/>
					<router-link :to="{name : 'hospital_taskManagementDetails' ,query : {item : JSON.stringify(item),show : true,time:new Date().getTime()}}">
						<span>{{item.name}}</span>
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
import { Dialog } from 'vant'
export default {
	name: 'search',
	data () {
		return {
			checked: true,
      //医院端用户的任务管理参数
      task:{
        one:[],
        no:[],
      },
		}
	},
	computed:{
		...mapGetters(['account']),
	},
	components:{

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
    next(vm => {
	 document.getElementById('app').scrollTop=document.getElementById('app').pageYOffset=vm.scrollTop;
	});
	
  },
   mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
		if(this.task.one.length == 0 || this.task.no.length == 0){
			// this.task.no = [];
			// this.task.one = []
			this.$axios.post('/c2/task/tasks',qs.stringify({
				hospitalId : this.account.hospitalId,
			}))
			.then(res => {
				for(let i in res.data.data.items){
					if(res.data.data.items[i].oneTimeIs  == 1){
            if(res.data.data.items[i].issueIs){
              // console.log(res.data.data.items[i].issueIs)
              this.task.one.push({
              	name : res.data.data.items[i].name,
              	taskId : res.data.data.items[i].taskId,
              	oneTimeIs : res.data.data.items[i].oneTimeIs,
              	checked : true,
              	exchangePointUpperPerDay : res.data.data.items[i].exchangePointUpperPerDay,
              	exchangePoint : res.data.data.items[i].exchangePoint,
              	everyDayIs : res.data.data.items[i].everyDayIs,
              	intro : res.data.data.items[i].intro,
                taskId : res.data.data.items[i].taskId,
              })
            }else{
              this.task.one.push({
              	name : res.data.data.items[i].name,
              	taskId : res.data.data.items[i].taskId,
              	oneTimeIs : res.data.data.items[i].oneTimeIs,
              	checked : false,
              	exchangePointUpperPerDay : res.data.data.items[i].exchangePointUpperPerDay,
              	exchangePoint : res.data.data.items[i].exchangePoint,
              	everyDayIs : res.data.data.items[i].everyDayIs,
              	intro : res.data.data.items[i].intro,
                taskId : res.data.data.items[i].taskId,
              })
            }

					}else{
            if(res.data.data.items[i].issueIs){
              this.task.no.push({
              	name : res.data.data.items[i].name,
              	taskId : res.data.data.items[i].taskId,
              	oneTimeIs : res.data.data.items[i].oneTimeIs,
              	checked : true,
              	exchangePointUpperPerDay : res.data.data.items[i].exchangePointUpperPerDay,
              	exchangePoint : res.data.data.items[i].exchangePoint,
              	everyDayIs : res.data.data.items[i].everyDayIs,
              	intro : res.data.data.items[i].intro,
                taskId : res.data.data.items[i].taskId,
              })
            }else{
              this.task.no.push({
              	name : res.data.data.items[i].name,
              	taskId : res.data.data.items[i].taskId,
              	oneTimeIs : res.data.data.items[i].oneTimeIs,
              	checked : false,
              	exchangePointUpperPerDay : res.data.data.items[i].exchangePointUpperPerDay,
              	exchangePoint : res.data.data.items[i].exchangePoint,
              	everyDayIs : res.data.data.items[i].everyDayIs,
              	intro : res.data.data.items[i].intro,
                taskId : res.data.data.items[i].taskId,
              })
            }
					}
				}
			})
			.catch((err)=>{
				console.log(err);
				//Dialog({ message: '加载失败!'});
			})
		}

	},
	methods: {
		// 返回上一级
		goBackFn(){
			this.$router.back(-1)
		},

		change(_value,_item,inx){
			console.log(_value)
			console.log(_item)
			console.log(inx)
			this.$axios.post('/c2/task/taskunissue',qs.stringify({
				hospitalId : this.account.hospitalId,
				taskId : _item.taskId
			}))
			.then(res =>{
			   
			})
			.catch((err)=>{
				console.log(err);
				//Dialog({ message: '加载失败!'});
			})
			
			switch(_value.target.checked){
				case true:
				if(_item.oneTimeIs == 1){
					this.task.one[inx].checked = _value.target.checked
					this.$router.push({ name : 'hospital_taskManagementDetails',query : {item : JSON.stringify(_item),show : false,time:new Date().getTime()}});
				}else{
					this.task.no[inx].checked = _value.target.checked;
					this.$router.push({ name : 'hospital_taskManagementDetails',query : {item : JSON.stringify(_item),show : false,time:new Date().getTime()}});
				};
				break;
				case false:
				if(_item.oneTimeIs == 1){
					this.task.one[inx].checked = _value.target.checked
				}else{
					this.task.no[inx].checked = _value.target.checked
				};
				break;

			}
			if(_item.oneTimeIs == 1){
				this.task.one[inx].checked = true
			}else{
				this.task.no[inx].checked = true;
			};

		},
	},
}
</script>

<style scoped>
.task{
	width: 100%;
	height: 100%;
	/* background-color: #F5F5F5; */
	background-color: #FFFFFF;
}
.topNav{
	width: 100%;
	height: 1.76rem;
	background: url('../../../assets/image/tu1.png')  center no-repeat,linear-gradient(#FDFDFD, #FBFBFB) ;
	background-size: 1.84rem 1.29rem;
	margin-bottom: .15rem;
	position: fixed;
	top: 0;
	z-index: 999;
}
.zhangwei{
	width: 100%;
	height: 1.76rem;
}
.leftImg{
	width: 10%;
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
.taskList{
	width: 100%;
}
.taskList h3{
	color: #999999;
	/* margin: 0rem .16rem; */
	position: relative;
	margin-left: .23rem;
}
.taskList h3:before{
	content: "";
	display: inline-block;
	width: .04rem;
	height: .11rem;
	background-color: #2B77EF;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	/* border-radius: 3px; */
	position: absolute;
	top: .035rem;
	left: -.09rem;
}
.taskList>ul{
	width: 100%;
	/* margin: .15rem auto; */
	background-color: #FFFFFF;
	margin-bottom: .18rem;
}
.taskList>ul>li{
	width: 92%;
	height: .49rem;
	color: #000000;
	line-height: .49rem;
	font-size: .15rem;
	margin: 0rem auto;
	border-bottom: 1px solid #DDDDDD;
}
.taskList>ul>li>a>span{
	float: left;
	width: 80%;
}

.taskList>ul>li input[type=checkbox] {
  width: .22rem;
  height: .22rem;
  background: url('../../../assets/image/Notselected@2x.png') center no-repeat;
  -webkit-appearance: none;
  background-size: .22rem .22rem;
  border: none;
  outline: 0 !important;
  /* color: #d8d8d8; */
  position: relative;
  margin-top: .14rem;
  margin-right: .15rem;
  padding: 0!important;
  float: left;
}

.taskList>ul>li input[type=checkbox]:checked:before{
  content: "";
  display:inline-block;
  width: .22rem;
  height: .22rem;
  background: url('../../../assets/image/Select@2x.png')center no-repeat;
  background-size: .22rem .22rem;
  box-sizing:border-box;
  position: absolute;
  top: 0;
  left: 0rem;
}

</style>
