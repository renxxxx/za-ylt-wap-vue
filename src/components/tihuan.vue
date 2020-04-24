<template>

</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
export default {
	name: 'caseDetails',
	data () {
		return {
			
		}
	},
	computed:{
		
	},
	components:{

	},
	beforeCreate(){

	},
	created(){

	},
	mounted(){
		// console.log(this.$route.query)
		// console.dir(JSON.parse(this.$route.query.query))
		// if(this.$route.query.query)
		let query = JSON.parse(this.$route.query.query)
		// console.log(query)
		this.$router.replace({path:this.$route.query.path,query:query})
	},
	activated(){
		// console.dir(JSON.stringify(this.$route.query.query))
		let query = JSON.parse(this.$route.query.query)
		this.$router.replace({path:this.$route.query.path,query:query})
	},
	methods: {
		
	},
}
</script>
