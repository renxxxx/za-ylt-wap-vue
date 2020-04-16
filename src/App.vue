<template>
  <div id="app" ref='appRef'>
    <keep-alive> 
       <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch:{
     $route(to,from){
         if(!to.query.time || !from.query.time || to.query.transition=='def')
            this.direction = "";
         else if(to.query.time > from.query.time)
             this.direction = "slide-left";
         else
             this.direction = "";
     }
  },
 
  beforeCreate(){
    debugger
  },
  created(){
    if(!this.cookieOn()){
        this.$dialog.confirm({
              message: '您的浏览器限制了第三方Cookie, 这将影响您正常登录, 您可以更改浏览器的隐私设置, 解除限制后重试.'
            })
    }
  },
  beforeMount(){
    debugger
  },
  mounted(){
    debugger
  },
  beforeUpdate(){
    debugger
  },
  updated(){
    debugger
  },
  activated(){
    debugger
  },
  deactivated(){
    debugger
  },
  beforeDestroy(){
    debugger
  },
  destroyed(){
    debugger
  },
}
</script>

<style>
html {
  height: 100%;
}
body {
  /* background-color:#FFFFFF; */
  height: 100%;
  width: 100%;
}

img {
  object-fit: cover
}

img[lazy="loading"]{
    object-fit:scale-down!important;
 }

img[lazy="error"]{
    object-fit:scale-down!important;
 }


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  position: relative;
	/* background-color: #F5F5F5; */
}

</style>
