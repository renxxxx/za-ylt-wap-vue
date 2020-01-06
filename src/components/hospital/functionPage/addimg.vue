<template>
	<div class="uploadPictures">
		 <input 
		        type="file" 
		        class="upload" 
		        ref="inputer" 
				@change="addImg"
		        multiple 
		        accept="image/png,image/jpeg,image/gif,image/jpg"
		   />
		   <div class="add">
		      <p>点击上传</p>
		   </div>
	</div>
</template>

<script>
export default {
	name: 'addimg',
	data () {
		return {
			// 上传图片弹窗显示
			show: false
		}
	},
	computed:{
	},
	components:{
	},
	created () {
		
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
	
		// 显示上传图片选择弹窗
		showFn(){
			this.show = true;
		},
		closeFn() {
		      this.show = false;
			  console.log(this.show)
		},
		
	}
}
</script>

<style scoped>
.uploadPictures{
	position: relative;
	width: 100%!important;
	height: .44rem!important;
}
.uploadPictures:hover{
   border-color:#3594F4;
}
.upload{
	opacity: 0;
	width: 100%!important;
	height: .44rem!important;
}
.add{
	display: block;
	width: 100%!important;
	height: .44rem!important;
	line-height: .44rem!important;
	margin-top:-.44rem;
 }
</style>
