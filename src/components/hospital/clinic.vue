<template>
	<div class="hospital">
		<div class="navWarp">
			<div class="topNav">
				<div class="hospital_search">
					<router-link to="hospital_clinicSearch">
						<input type="text" placeholder="输入门诊名">
						<img src="static/img/sousuo@2x.png" alt="">
					</router-link>
				</div>
				<router-link :to="{name : 'hospital_clinicMessage'}">
					<div class="hospital_information">
						<img src="static/img/xiaoxi@2x.png" alt="">
					</div>
				</router-link>
			</div>
			<div class="shared">
				<ul>
					<router-link :to="{name : 'hospitalImage'}">
						<li>
							<img src="static/img/yiyuanxingxiang@2x.png" alt=""/>
							<span>医院形象</span>
						</li>
					</router-link>
					<router-link  :to="{name : 'hospital_case'}">
						<li>
							<img src="static/img/youzhianli@2x.png" alt=""/>
							<span>优质案例</span>
						</li>
					</router-link>
					<router-link :to="{name : 'hospital_expertsIntroduction'}">
						<li>
							<img src="static/img/zhuanjia@2x.png" alt=""/>
							<span>专家介绍</span>
						</li>
					</router-link>
					<router-link :to="{name : 'hospital_activityReleased'}">
						<li>
							<img src="static/img/huodongfabu@2x.png" alt=""/>
							<span>最新活动</span>
						</li>
					</router-link>
				</ul>
			</div>
			<div class="statisticalTitle" v-model="clinic">
				<h3>合作门诊 {{clinic.num}}</h3>
				<div class="statisticalAdd">
					<router-link :to="{name : 'hospital_addCLinic'}">
						<span>新增</span>
						<img src="static/img/xinzeng@2x.png" alt="">
					</router-link>
				</div>
			</div>
		</div>
		
		<clinicContent :clinic = 'clinic'></clinicContent>
		
		<bottomNav v-bind:name='name'></bottomNav>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
import bottomNav from './functionPage/bottomNav.vue'
import clinicContent from './functionPage/clinic_content.vue'
export default {
	name: 'clinic',
	data () {
		return {
			name: 'hospital',
			clinic : {
				num : 0
			},
		}
  },
	computed:{
	  
	},
	components:{
		clinicContent,bottomNav
	},
	created () {
		
	},
	mounted () {
		// this.getdata(0);
	},
	methods: {	
		onRefresh() {
			this.content = []
			this.getdata(0)
		},
		getdata(_data){
			if(_data == 0){
				this.isLoading = false;
				this.$axios.post('/c2/clinic/items',qs.stringify({
					pn : 1,
					ps : 10
				}))
				.then(res => {
					if(res.data.data.items.length != 0){
						// console.log(this.page)
						for(let i in res.data.data.items){
						// console.log(res.data.data.items[i])
						if(!res.data.data.items[i]){
							this.$notify({
								message: '数据已全部加载',
								duration: 1000,
								background:'#79abf9',
							})
							// this.loading = false;
							// this.finished = true;
						}else{
							this.content.push(res.data.data.items[i])
						}
					}
					this.isLoading = false;
					// 加载状态结束
					this.loading = false;
					}else{
						this.$notify({
							message: '数据已全部加载',
							duration: 1000,
							background:'#79abf9',
						})
						this.loading = false;
						this.finished = true;
					}
				})
				.catch((err)=>{
					console.log(err);
					Dialog({ message: '加载失败!'});
				})
			}else if(_data = 1){
				console.log(this.page)
				this.page++
				this.$axios.post('/c2/clinic/items',qs.stringify({
					pn : this.page,
					ps : 10
				}))
				.then(res => {
					if(res.data.data.items.length != 0){
						// console.log(this.page)
						for(let i in res.data.data.items){
						// console.log(res.data.data.items[i])
						if(!res.data.data.items[i]){
							this.$notify({
								message: '数据已全部加载',
								duration: 1000,
								background:'#79abf9',
							})
							// this.loading = false;
							// this.finished = true;
						}else{
							this.content.push(res.data.data.items[i])
						}
					}
					
					// 加载状态结束
					this.loading = false;
					}else{
						this.$notify({
							message: '数据已全部加载',
							duration: 1000,
							background:'#79abf9',
						})
						this.loading = false;
						this.finished = true;
					}
				})
				.catch((err)=>{
					console.log(err);
					Dialog({ message: '加载失败!'});
				})
			}
			
		},
		onLoad(){
			this.getdata(1)
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hospital{
	width: 100%;
	background-color: #F5F5F5;
}
.navWarp{
	width: 100%;
	height: 2.1rem;
	background-color: #FFFFFF;
	position: fixed;
	top:0;
	z-index: 3;
}
.topNav{
	width: 100%;
	height: .42rem;
}
.hospital_search{
	float:left;
	width: 85.9%;
	position: relative;
}
.hospital_search input{
	margin: .08rem 0rem 0rem .16rem;
	height:.34rem;
	width: 80%;
	border: none;
	border-radius: .33rem;
	padding-left: 11.6%;
	background-color: #0000000D;
}
.hospital_search img{
	width: .14rem;
	height: .15rem;
	position: absolute;
	top: .18rem;
	left: 9.8%;
}
.hospital_information{
	float:left;
	width: 10.3%;
	margin-left: .14rem;
	margin-top: .15rem;
}
.hospital_information img{
	width: .19rem;
	height: .24rem;
}
.shared{
	height: .73rem;
	width: 89%;
	margin: 0rem auto;
	margin-top: .3rem;
}
.shared ul{
	width: 100%;
	margin-top: .25rem;
}
.shared ul li{
	width: 25%;
	float: left;
	text-align: center;
}
.shared ul li img{
	width: .56rem;
	height: .43rem;
	display: block;
	margin: 0 auto;
	margin-bottom: .12rem;
}
.statisticalTitle{
	margin-top: .25rem;
	width: 100%;
	height: .26rem;
	line-height: .26rem;
	padding-bottom: .1rem;
}
.statisticalTitle h3{
	float: left;
	margin-left: .18rem;
	font-size: .16rem;
	font-weight: bolder;
}
.statisticalAdd{
	float: right;
	height: .26rem;
	line-height: .26rem;
	margin-right: .18rem;
}
.statisticalAdd span{
	font-size: .15rem;
}
.statisticalAdd img{
	height: .19rem;
	width: .19rem;
	/* margin: .04rem 0rem; */
	margin-left: .05rem;
	margin-top: -.03rem;
}

</style>
