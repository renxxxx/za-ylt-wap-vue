<template>
	<div class="imageType">
		<ul>
			<li v-for="(item,inx) in type" :key='inx'>
				<router-link :to="{name : 'hospital_typeDetails' ,query : {item : item.itemId,time:new Date().getTime()}}">
					<img :src="item.url" alt="">
					<span>{{item.name}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: 'hospital_About',
  data () {
    return {
		type:[]
    }
  },
  computed:{
	...mapGetters(['account']),
  },
  created () {
		
  },
  beforeRouteLeave(to, from, next) {
    //debugger;
	this.scrollTop =document.getElementById('hospital').scrollTop ||document.getElementById('hospital').pageYOffset
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
	 document.getElementById('hospital').scrollTop=document.getElementById('hospital').pageYOffset=vm.scrollTop;
	});
	
  }, mounted() {
		if(window.plus){
			//plus.navigator.setStatusBarBackground("#ffffff");
			plus.navigator.setStatusBarStyle("dark")
		}
		
	this.$axios.post('/c2/office/items',qs.stringify({
			hospitalId : this.account.hospitalId,
	}))
	.then(_d => {
		for(let i in _d.data.data.items){
			this.type.push({
				name: _d.data.data.items[i].name,
				url : _d.data.data.items[i].cover,
				itemId : _d.data.data.items[i].itemId,
			})
		}
	})
	.catch((err)=>{
		console.log(err);
		//Dialog({ message: err});;
	})
  },
  
  methods: {
	
  },
}
</script>

<style scoped>
.imageType{
	width: 100%;
}
.content ul{
	width: 97.2%;
	margin: 0rem auto;
}
.content ul li{
	width: 25%;
	height: .66rem;
	text-align: center;
	float: left;
	margin-bottom: .27rem;
}
.content ul li img{
	width: .29rem;
	height: .33rem;
	margin-bottom: .05rem;
	object-fit: cover;
}
.content ul li span{
	display: block;
}
</style>
