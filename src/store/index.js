import Vue from 'vue'
import Vuex from 'vuex'
import shop from './moudle/date'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{ shop }
})