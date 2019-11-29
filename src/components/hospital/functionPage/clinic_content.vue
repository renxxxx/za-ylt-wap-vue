<template>
	<div class="content">
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<ul>
				<van-list  v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad">
					<li v-for="(items,inx) in content" :key="inx">
						<div class="contentLi">
							<h4>{{items.name}}</h4>
							<span>推广人: {{items.clinicPromoterName}}</span>
							<input type="text" v-model="items.pushCount" readonly="readonly">
						</div>
					</li>
				</van-list>
			</ul>
		</van-pull-refresh>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
	name: 'content',
	data () {
		return {
			isLoading: true,
			loading: false,
			finished: false,
			content : [],
			page:1
		}
	},
	// props:['content'],
	computed:{
		...mapGetters(['account']),
	},
	components:{
		
	},
	created () {
		
	},
	mounted () {
		this.getdata(0);
		
	},
	methods: {
		
		onRefresh() {
			this.page = 1;
			this.content = [];
			this.getdata(0)
		},
		getdata(_data){
			if(_data == 0){
				this.isLoading = false;
				this.$axios.post('/c2/clinic/items',qs.stringify({
					hospitalId : this.account.hospitalId,
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
					this.finished = false;
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
			}else{
				// console.log(this.page)
				this.page++
				this.$axios.post('/c2/clinic/items',qs.stringify({
					hospitalId : this.account.hospitalId,
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

<style scoped>
.content{
	width: 100%;
	height: 100%;
	margin-top: .1rem;
}
.content ul{
	width: 94.6%;
	margin: 0 auto;
	/* text-align: center; */
}
.content ul li{
	width: 48.6%;
	height: 1.1rem;
	display: inline-block;
	margin-top: .1rem;
	background-color: #FFFFFF;
	text-align: center;
}
/* .content ul li:first-child {
    margin-top: 2.1rem;
} */
>>>.van-pull-refresh {
    overflow: visible;
    -webkit-user-select: none;
    user-select: none;
    margin-top: 2rem;
}
.content ul li:nth-child(1),.content ul li:nth-child(2){
	margin-top: 0rem;
}
.content ul li:nth-child(2n){
	margin-left:1.71% ;
}
.content ul li:first-child{
	margin-top: .2rem;
}
.content ul li:last-child{
	margin-bottom: .49rem;
}
.contentLi{
	height: .82rem;
	/* margin-top: .19rem; */
	margin: .14rem auto;
}
.contentLi h4{
	font-size: .14rem;
	font-weight: bold;
	display: block;
	margin-top: .19rem;
}
.contentLi span{
	display: block;
	margin-top: .05rem;
	margin-bottom: .09rem;
	color: #999999;
}
.contentLi input{
	width: .9rem;
	height: .24rem;
	text-align: center;
	border: 1px solid #FF951B;
	border-radius: .5rem;
}
</style>
