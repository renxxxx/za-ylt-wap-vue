<template>
	<div class="chooseTheType">
    <div class="nav">
      <h3>您有以下端口</h3>
      <p>请选择进入</p>
    </div>

		<div class="options" @click="choseFn('1')" v-if="showValue.hospitalUser">
      <img src="../assets/image/yy.png" alt="">
      <h3>Hospital</h3>
      <span>医院端</span>
    </div>
    <div class="options" @click="choseFn('2')" v-if="showValue.clinicUser">
      <img src="../assets/image/mz.png" alt="">
      <h3>Outpatient</h3>
      <span>门诊端</span>
    </div>
    <div class="options" @click="choseFn('3')" v-if="showValue.managerUser">
      <img src="../assets/image/yying.png" alt="">
      <h3>Operation</h3>
      <span>运营端</span>
    </div>
    <div class="nextPage">
      <img src="../assets/image/go.png" alt="" @click="submit">
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
      showValue:{},
      stata:undefined,
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
    choseFn(stata){
      this.stata = stata;
    },
    submit(){
      if(this.stata){
        switch(this.stata){
          case '1':
          this.submitFn('/hospital/login-refresh',100)
          break;
          case '2':
          this.submitFn('/clinic/login-refresh',200);
          break;
          case '3':
          this.submitFn('/manager/login-refresh',300)
          break;
        }
      }else{
        this.$toast.fail('请选择端口')
      }

    },
    submitFn(_postRefresh,_isLogin){
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
  background-color: #FFFFFF;
}

.nav{
  height: 1.27rem;
  position: relative;
  margin-bottom: .45rem;
}
.nav>p{
  position: absolute;
  bottom: 0;
  left: .3rem;
  font-size: .16rem;
  color: #666666;
}
.nav>h3{
  position: absolute;
  bottom: .34rem;
  left: .3rem;
  font-size: .2rem;
  font-weight: bolder;
}
.options{
  width: 84%;
  height: .9rem;
  margin: 0rem auto .2rem;
  border: 4px solid #E2E2E2;
  border-radius: .15rem;
  position: relative;
}
.options:first-child{
  margin-top: .45rem;
}
.options:hover{
  color: #ED2828;
  border: 4px solid #ED2828;
}
.options>img{
  width: 100%;
  height: 100%;

}
.options>h3{
  z-index: 999;
  position: absolute;
  left: 48.4%;
  top: .19rem;
  font-size: .19rem;
}
.options>span{
  z-index: 999;
  position: absolute;
  left: 48.4%;
  top: .5rem;
  font-size: .15rem;
}
.nextPage{
  text-align: center;
  margin-top: .45rem;
}
.nextPage>img{
  width:.65rem;
  height: .65rem;
}
</style>
