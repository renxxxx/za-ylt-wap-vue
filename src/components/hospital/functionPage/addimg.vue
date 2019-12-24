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
	mounted () {
		if(window.plus){
			plus.navigator.setStatusBarBackground("#ffffff");
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
