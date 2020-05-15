<template>
	<div class="list">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<img src="../../../assets/image/shape@3x.png" alt=""  @click="goBackFn"  id="navback" :style="{'padding-top':$store.state.paddingTop}">
			<h3>{{name}}</h3>
		</div>
		<div class="zhangwei" :style="{'padding-top':$store.state.paddingTop}"></div>
    <div class="_list" ref="_list" @scroll="handleScroll">
      <van-search v-model="keywords" placeholder="请输入搜索关键词" @search="searchFn"/>
      <span>当前: {{nowPromoter}}</span>
      <ul>
          <li v-for="(item,inx) in list" :ref="'ref'+inx" :id="'list_'+inx ":key='inx' @click="subimtFn(item)">
            <span>{{item.name}}</span>
          </li>
      </ul>
    </div>
    <div class="returnTop" @click="$refs._list.scrollTop=0;hospitalReturnTopPage = false;" ref="returnTopRef" v-show="hospitalReturnTopPage">
			<img src="../../../assets/image/returnTop.png" alt />
			<span>顶部</span>
		</div>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  name: 'list',
  data () {
    return {
      name:'',
      list:[],
      radio:'1',
      keywords: '',
      nowPromoter : '',
      query:'',
      scrollTop:0,
    	hospitalReturnTopPage:false,
    }
  },
  computed:{

  },
  
  created () {
    this.getData()
  },
  mounted () {
    if(window.plus){
    	//plus.navigator.setStatusBarBackground("#ffffff");
    	plus.navigator.setStatusBarStyle("dark")
    }
    this.name = this.$route.query.name;
    this.nowPromoter = this.$route.query.nowValue
  },
  activated() {
  	if(this.query != JSON.stringify(this.$route.query)){
  		this.query = JSON.stringify(this.$route.query);
  		if(window.plus){
  			//plus.navigator.setStatusBarBackground("#ffffff");
  			plus.navigator.setStatusBarStyle("dark")
  		}
  		this.name = this.$route.query.name;
  		this.nowPromoter = this.$route.query.nowValue
    }
    if(this.scrollTop != 0){
			this.$refs._list.scrollTop = this.scrollTop;
		}
  },
  methods: {
    // 滑动一定距离出现返回顶部按钮
		handleScroll() {
			this.scrollTop = this.$refs._list.scrollTop || this.$refs._list.pageYOffset
			if (this.scrollTop > 800) {
				this.hospitalReturnTopPage = true;
			} else {
				this.hospitalReturnTopPage = false;
			}
		},
    // 返回上一级
    goBackFn(){
    	this.$router.back()
    },
    subimtFn(_promoter){
      this.nowPromoter = _promoter.name;
      localStorage.setItem('list_promoterId',_promoter.hospitalUserId)
      localStorage.setItem('list_promoterValue',_promoter.name);
      this.$router.back();
      // this.$router.replace({name:this.$route.query.path,query:{promoterValue:_promoter.name,item:this.$route.query.item,promoterId:_promoter.hospitalUserId}})
    },
    searchFn(_kw){
      
      this.list = [];
      this.getData();
    },
    getData(){
      // 加载dom节点后,获取推广人列表请求
      this.$axios.get('/hospital/def/hospital-operator-users?'+qs.stringify({kw:this.keywords}))
      .then(res => {
      	if(!res.data.codeMsg){
      		for(let i in res.data.data.rows){
            this.list.push(res.data.data.rows[i])
      		}
          this.$nextTick(function(){
            if(this.list.length){
              debugger
              let num = this.list.findIndex((n)=>n.name == this.$route.query.nowValue);
              if(num){
                document.getElementById('list_'+num).style.backgroundColor = '#F0EDED'
              }
            }
          })
      		// 
      	}
      })
      .catch((err)=>{
      	
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list{
  width: 100%;
  background-color: #F5F5F5;
  height: 100%;
  overflow: hidden;
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
._list>ul{
	width: 100%;
	/* margin: .15rem auto; */
	background-color: #FFFFFF;
	/* margin-bottom: .18rem; */
  margin: .12rem auto;
}
._list>span{
  display: block;
  margin-left: .12rem;
}
._list>ul li{
	width: 100%;
	height: .49rem;
	color: #000000;
	line-height: .49rem;
	font-size: .15rem;
	margin: 0rem auto;
	border-bottom: 1px solid #DDDDDD;
}
._list>ul li:last-child{
  border: none;
}
._list>ul li:hover{
  background-color: #F0EDED;
}
.lis_listt>ul li>span{
  display: block;
  margin-left: .12rem
}
>>>.van-search{
  margin: .12rem auto;
}
._list{
  width: 100%;
	height: calc(100% - .47rem);
  touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
	overflow: scroll;
	overflow-x: hidden;
}
</style>
