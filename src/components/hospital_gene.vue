<template>
	<div class="gene">
		<div class="topNav">
			<div class="nav_left">
				<img src="../../static/iOS切图/sousuo@2x.png" alt="">
			</div>
			<div class="nav_center">
				<h3>基因检测</h3>
			</div>
			<div class="nav_right">
				全部
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'gene',
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
  
  },
}
</script>

<style>
.topNav{
	width: 100%;
	height: .47rem;
	background-color: #FFFFFFFF;
}
.nav_left{
	float: left;
	width: 15.5%;
	height:.47rem;
	line-height:.47rem;
	text-align:center;
}
.nav_left img{
	width: .14rem;
	height: .15rem;
}
.nav_center{
	float: left;
	width: 69%;
	height:.47rem;
	line-height:.47rem;
	text-align:center;
}
.nav_center h3{
	font-weight: bold;
	font-size: .16rem;
}
.nav_right{
	float: left;
	width: 15.5%;
	height:.47rem;
	line-height:.47rem;
	text-align:center;
}
</style>
