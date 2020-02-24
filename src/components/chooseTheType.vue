<template>
	<div class="chooseTheType">
		<div class="options" @click="submitFn('/hospital/login-refresh',100)" v-if="showValue.hospitalUser">
      <span>医院端</span>
    </div>
    <!-- <div class="options" @click="submitFn('/hospital/login-refresh'),100"> -->
      <!-- <span>推广人端</span> -->
    <!-- </div> -->
    <div class="options" @click="submitFn('/clinic/login-refresh',200)" v-if="showValue.clinicUser">
      <span>门诊端</span>
    </div>
    <div class="options" @click="submitFn('/manager/login-refresh',300)" v-if="showValue.managerUser">
      <span>运营端</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Dialog } from 'vant'
export default {
  name: '',
  data () {
    return {
      showValue:{}
    }
  },
  computed:{
    account:{
    	get: function() {
    		console.log(this.$store)
    	    return this.$store.state.account
    	},
    	set: function (newValue) {
    		this.$store.state.account = newValue;
    	},
    },
    isLogin: {
      get: function() {
        return this.$store.state.isLogin
      },
      set: function (newValue) {
        this.$store.state.isLogin = newValue;
      },
    },
  },
  created () {

  },
  mounted () {
    this.getData();
  },
  methods: {
    submitFn(_postRefresh,_isLogin){
      console.log('ss')
      this.$axios.post(_postRefresh)
        .then( res =>{
      		this.isLogin = _isLogin;
      		localStorage.setItem("isLogin",_isLogin);
      		switch(_isLogin){
      			case 100:
      			if(res.data.data.type == 1){
      				this.$router.replace({ name : 'promoters_index',query:{time:new Date().getTime()}});
      			}else{
      				this.$router.replace({ name : 'hospital_index',query:{time:new Date().getTime()}});
      			}
      			this.account.hospitalId= res.data.data.hospital.hospitalId;
      			// console.log(this.account.hospitalId)
      			this.account.data = {};
      			this.account.data = res.data;
      			break;

      			case 200:
      				this.$router.replace({ name : 'hospital_sourceManagement',query:{time:new Date().getTime()}});
      				this.account.clinicId= res.data.data.clinic.clinicId;
      				this.account.hospitalId= res.data.data.hospital.hospitalId;
      				// console.log(this.account.hospitalId)
      				this.account.data = {};
      				this.account.data = res.data;
      			break;

      			case 300:
      				// this.$router.replace({ name : '',query:{time:new Date().getTime()}});
      				this.$toast.fail('正在开发中')
      				// Dialog({ message: '正在开发中，敬请期待' });
      				// this.account.clinicId= res.data.data.clinic.clinicId;
      				// this.account.hospitalId= res.data.data.hospital.hospitalId;
      				// console.log(this.account.hospitalId)
      				// this.account.data = {};
      				// this.account.data = res.data;
      			break;
      		}
      	})
      	.catch((err)=>{
          // console.log(err)
          this.$toast.fail(err);
      	})
    },
    getData(){
      this.$axios.get('/phone-in-which?'+qs.stringify({phone:this.$route.query.phone}))
      .then(res => {
        this.showValue = {
          hospitalUser: res.data.data.hospitalUser,
          clinicUser: res.data.data.clinicUser,
          managerUser: res.data.data.managerUser,
        }
      })
      .catch((err)=>{
      	console.log(err);
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chooseTheType{
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
}
.options{
  height: 20%;
  width: 100%;
  margin-bottom: 5%;
  text-align: center;
  position: relative;
  font-weight: bolder;
}
.options:nth-child(2n-1){
  background-color: #2B77EF;
  color: white;
}
.options>span{
  width: 50%;
  height: .2rem;
  line-height: .2rem;
  font-size: .18rem;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>
