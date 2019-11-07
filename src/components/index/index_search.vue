<template>
  <div class="_search">
		<div class="top_search">
			<div class="search_return">
				<a @click="goBackFn">
					<img src="../../../static/iOS切图/shape@2x.png" alt="">
				</a>
			</div>
			<div class="search_input">
				<img src="../../../static/iOS切图/sousuo@2x.png" alt="">
				<input type="text" placeholder="搜索病源">
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'index_search',
  data () {
    return {
     
    }
  },
  computed:{
	  
  },
  created () {
		
  },
  mounted () {
		
  },
  methods: {
	goBackFn(){
		this.$router.back(-1)
	},
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top_search{
	height: .5rem;width: 100%;
	background-color: #FFFFFF;
}
.search_return img{
	width: .09rem;
	height: .16rem;
	margin: .17rem .18rem;
	float: left;
}
.search_input{
	float: left;width: 82%;
}
.search_input input{
	background-color: #F5F5F5;
	height: .3rem;
	line-height: .3rem;
	width: 88%;
	margin: .1rem 0rem;
	border: none;
	border-radius: 25px;
	position: relative;
	padding-left: .37rem;
}
.search_input img{
	height: .15rem;
	width: .15rem;
	z-index: 3;
	position: absolute;
	top: .18rem;
	left: .6rem;
}
</style>
