<template>
	<div class="hospital_About">
		<span>— 基本信息 —</span>
		<ul>	
			<li>
				<h4>医院名称</h4>
				<span>{{hospitalImage.name}}</span>
			</li>
			<li>
				<h4>联系方式</h4>
				<span>{{hospitalImage.tel}}</span>
			</li>
			<li>
				<h4>地址</h4>
				<span>{{hospitalImage.address}}</span>
			</li>
		</ul>
		<span v-if="hospitalImage.intro? true:false">— 医院简介 —</span>
		<div class="content_content" v-if="hospitalImage.intro? true:false">
			<p>{{hospitalImage.intro}}</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs'
import { Dialog } from 'vant'
export default {
  name: 'hospital_About',
  data () {
    return {
    }
  },
  computed:{
	 // ...mapGetters([]),
	
  },
  props:['hospitalImage'],
  created () {
		
  },
  beforeRouteLeave(to, from, next) {
    //debugger;
	this.scrollTop =document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
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
	  document.documentElement.scrollTop=document.body.scrollTop = vm.scrollTop;
	});
	
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		

  },
  
  methods: {
	  
  },
}
</script>

<style scoped>
.content>span{
	color: #999999;
}
.content ul{
	width: 100%;
	height: 1.36rem;
	margin: .15rem 0rem;
}
.content ul li{
	width: 91.46%;
	height: .45rem;
	line-height: .45rem;
	margin: 0rem auto;
	border-bottom: 1px solid #D9DBDE;
}
.content ul li:last-child{
	border: none;
}
.content ul li h4{
	font-weight: bold;
	float: left;
}
.content ul li span{
	float: right;
	color: #2B77EF;
}
.content_content{
	width: 85.3%;
	margin: 0rem auto;
	margin-top: .15rem;
	text-align: left;
	padding: .1rem .1rem .14rem .1rem;
	border: 1px dashed #D8D8D8;
}
</style>
