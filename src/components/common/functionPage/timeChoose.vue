<template>
	<div class="">
		<van-popup v-model="show" position="right" :style="{ height: '100%',width:'78.7%'}">
    		<div id="indexLabel" v-model="Time">
			<div class="labelLabel" >
				<strong>状态</strong>
				<button  class="right" @click="labelLabelFn(0,$event)" :id="labelDocument[0]">未就诊</button>
				<button @click="labelLabelFn(1,$event)" :id="labelDocument[1]">已就诊</button>
			</div>
    			<div class="labelLabel" >
    				<strong>就诊时间</strong>
    				<button class="rightLine" @click="labelLabelFn(2,$event)" :id="labelDocument[2]">
    					{{Time.confirmStart?  moment(Time.confirmStart).format('YYYY-MM-DD'):'开始时间'}}
    				</button>
    				<button  @click="labelLabelFn(3,$event)" :id="labelDocument[3]">
    					{{Time.confirmOver? moment(Time.confirmOver).format('YYYY-MM-DD'):'结束时间'}}
    				</button>
    			</div>
    			<div class="labelLabel">
    				<strong>推送时间</strong>
    				<button class="rightLine"  @click="labelLabelFn(4,$event)"  :id="labelDocument[4]">
    					{{Time.pushStart? moment(Time.pushStart).format('YYYY-MM-DD'):'开始时间'}}
    				</button>
    				<button  @click="labelLabelFn(5,$event)"  :id="labelDocument[5]">
    					{{Time.pushOver? moment(Time.pushOver).format('YYYY-MM-DD'):'结束时间'}}
    				</button>
    			</div>
    			<div class="LabelResult">
    				<button @click="screeningResult">重选</button>
    				<button @click="screeningSubmit">确定</button>
    			</div>
    		</div>
    	</van-popup>

		<van-popup @click="closeFn" v-model="showTime" position="bottom" :style="{ height: '40%',width:'100%'}">
			<van-datetime-picker
			  type="date"
			  @confirm="confirm"
			  @cancel="cancel"
			/>
		</van-popup>
	</div>
</template>


<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import moment from 'moment'
import Vue from 'vue'
export default {
	name: 'clinicYes',
	data () {
		return {
       // lable的dom节点
       labelDocument:['labelDocument','labelDocument2','labelDocument3','labelDocument4','labelDocument5','labelDocument6'],
       //筛选数据
       Time:{
       	look:'',
       	noLook:'',
       	confirmStart : undefined,
       	confirmOver : undefined,
       	pushStart : undefined,
       	pushOver : undefined,
       	postState : undefined,
       },
       dateStata : '',
		}
	},
	computed:{
	  ...mapGetters(['account','isLogin']),
    show: {
        get: function() {
        // console.log(this.$store)
            return this.$store.state.shop.show
        },
        set: function (newValue) {
        this.$store.state.shop.show = newValue;
        },
    },
    showTime: {
        get: function() {
        // console.log(this.$store)
            return this.$store.state.shop.showTime
        },
        set: function (newValue) {
        this.$store.state.shop.showTime = newValue;
        },
    },
	},
	components:{

	},
	props:['list'],
	created () {

	},
	beforeRouteLeave(to, from, next) {
     ;
    this.scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
     ;
    next(vm => {
      document.body.scrollTop = vm.scrollTop;
    });
  }, mounted() {
if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
	},
	methods: {
		// 筛选确定
		screeningSubmit(){
			this.getData();
		},
		// 筛选重置
		screeningResult(){
			// console.log(this.labelDocument);
			for(let _a=0 ;_a < 6; _a++){
				document.getElementById(this.labelDocument[_a]).style.backgroundColor = "#EEEEEE"; 
			}
			Vue.set(this.Time,'postState',undefined);
			Vue.set(this.Time,'confirmStart',undefined);
			Vue.set(this.Time,'confirmOver',undefined);
			Vue.set(this.Time,'pushStart',undefined);
			Vue.set(this.Time,'pushOver',undefined);
			console.log(this.Time);
			// this.list.clinicAll = [];
			this.getData()
			// console.log(typeof this.labelDocument)
		},
		//选择框样式
		labelLabelFn(_vlaue,_this){
			// console.log(typeof _vlaue);
			// console.log(typeof _this);
			let buttonStyle = document.getElementById(this.labelDocument[_vlaue]);
			switch(_vlaue){
				case 0:
				document.getElementById(this.labelDocument[0]).style.backgroundColor = "#EEEEEE";
				document.getElementById(this.labelDocument[1]).style.backgroundColor = "#EEEEEE";
				_this.target.style.backgroundColor = "#FFE1BE";
				this.Time.look = "";
				this.Time.noLook = "";
				this.Time.look = '未就诊';
				this.Time.postState = 1;
				// console.log(this.dateStata);

				break;
				case 1:
				document.getElementById(this.labelDocument[0]).style.backgroundColor = "#EEEEEE";
				document.getElementById(this.labelDocument[1]).style.backgroundColor = "#EEEEEE";
				_this.target.style.backgroundColor = "#FFE1BE";
				this.Time.look = "";
				this.Time.noLook = "";
				this.Time.noLook = '已就诊';
				this.Time.postState = 4;
				// console.log(this.dateStata);
				break;

				case 2:
				document.getElementById(this.labelDocument[2]).style.backgroundColor = "#EEEEEE";
				document.getElementById(this.labelDocument[3]).style.backgroundColor = "#EEEEEE";
				_this.target.style.backgroundColor = "#FFE1BE";
				this.Time.confirmStart = this.time;
				this.showTime = true;
				break;

				case 3:
				_this.target.style.backgroundColor = "#FFE1BE";
				// console.log(this.dateStata);
				this.Time.confirmOver = this.time;
				this.showTime = true;
				break;

				case 4:
				_this.target.style.backgroundColor = "#FFE1BE";
				// console.log(this.dateStata);
				this.Time.pushStart = this.time;
				this.showTime = true;
				break;

				case 5:
				_this.target.style.backgroundColor = "#FFE1BE";
				this.dateStata=_vlaue;
				// console.log(this.dateStata);
				this.showTime = true;
				this.Time.pushOver = this.time;
				break;
			}
		},
		//关闭半遮罩
		closeFn(){
			// console.log(dialog)
			this.showTime = false;
		},
		// 确定选择的日期
		confirm(_value){
			this.time = '';
			// this.time = _value
			let time = moment(_value).format('YYYY-MM-DD HH:mm:ss')
			this.time = new Date(time).getTime();
			// console.log(this.time)
			// console.log(this.calendarTime)
			switch (this.dateStata){
				case 2:
				this.Time.confirmStart = '';
				this.Time.confirmStart = this.time;
				break;
				case 3:
				this.Time.confirmOver = '';
				this.Time.confirmOver = this.time;
				break;
				case 4:
				this.Time.pushStart = '';
				this.Time.pushStart = this.time;
				break;
				case 5:
				this.Time.pushOver = '';
				this.Time.pushOver = this.time;
				break;
			}
			// console.log(this.Time)
			// console.log(mutations.labelLabelFn._vlaue)
		},
		//取消选择的日期
		cancel(_value){
			console.log(_value)
		},
		getData(){
			let clinicId = '';
			this.list.clinicAll = []
			this.list.clinicId? clinicId = this.list.clinicId: clinicId = this.account.clinicId;
			this.$axios.post('/c2/patient/items',qs.stringify({
				clinicId : clinicId,
				hospitalId :  this.account.hospitalId,
				status : this.Time.postState,
				pushTimeStart : this.Time.pushStart,
				pushTimeEnd : this.Time.pushOver? this.Time.pushOver+(24*60*60*1000):this.Time.pushOver,
				hospitalConfirmTimeStart : this.Time.confirmStart,
				hospitalConfirmTimeEnd : this.Time.confirmOver? this.Time.confirmOver+(24*60*60*1000):this.Time.confirmOver,
			  }))
			  .then(_d => {
				// console.log(_d.data.data.items)
				this.show = false;
				if(_d.data.data.items.length>0){
					for (let nums in _d.data.data.items) {
						// console.log(_d.data.data.items[nums])
						if(_d.data.data.items[nums].status == 1){
							this.list.clinicAll.push({
								clinicName : _d.data.data.items[nums].clinicName,
								itemId : _d.data.data.items[nums].itemId,
								pushTime : _d.data.data.items[nums].pushTime,
								realname : _d.data.data.items[nums].realname,
								status : _d.data.data.items[nums].status,
								img : require("../../../assets/image/orange@2x.png"),
								button : "确认就诊",
								span : "未就诊"
							});
							// console.log(this.list)
						}else if(_d.data.data.items[nums].status == 4){
							// console.log(_d.data.data.ite ms[nums].status )
							this.list.clinicAll.push({
								clinicName : _d.data.data.items[nums].clinicName,
								itemId : _d.data.data.items[nums].itemId,
								pushTime : _d.data.data.items[nums].pushTime,
								realname : _d.data.data.items[nums].realname,
								status : _d.data.data.items[nums].status,
								img : require("../../../assets/image/blue@2x.png"),
								button : "已就诊",
								buttonColor : "buttonColor",
								span : "已就诊"
							});
						}
					}
				console.log(this.list.clinicAll)
				}
			})
			.catch((err)=>{
				console.log(err);
				//Dialog({ message: '加载失败!'});
			})
		}
	},
}
</script>


<style scoped>
#indexLabel{
	width: 85.5%;
	padding: .32rem .2rem .25rem .2rem;
	position: relative;
}
.labelLabel{
	height: .95rem;
}
.labelLabel:first-child{
	height: .95rem;
	/* border-bottom: 1px dotted  rgba(0, 0, 0, 0.4); */
}
.labelLabel strong{
	display: block;
}
.right{
  margin-right: .25rem;
}
.rightLine{
	margin-right: .25rem;
}
.rightLine:after{
	content: " ";
	position: absolute;
	height: .01rem;
	width: .15rem;
	bottom: 0;
	top: 50%;
	left:107%;
	background-color: #999999;
}
.labelLabel button{
	height: .3rem;width: 1.05rem;
	margin-top: .1rem;
	border-radius: .15rem;
	border: none;background: #EEEEEE;
	text-align: center;position: relative;
}
.LabelResult{
	position: fixed;bottom: .25rem;right: .2rem;
}
.LabelResult button:first-child{
	border: none;height: .3rem;text-align: center;width: .8rem;
	border-radius: 100px  0px  0px  100px;
	background-color: #1ECAC6;
}
.LabelResult button:last-child{
	border: none;height: .3rem;text-align: center;width: .8rem;
	border-radius:0px 100px 100px 0px;
	background-color: #FF951B;
}
</style>
