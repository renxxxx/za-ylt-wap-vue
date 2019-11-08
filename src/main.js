// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/rem'
import './assets/rest.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import store from './store'
import moment from 'moment';
// 在入口文件中（main.js），导入组件库
import vueHashCalendar from 'vue-hash-calendar'
// 引入组件CSS样式
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
import VueScroller from 'vue-scroller'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.moment = moment
import { Image, Row, Col,Search,Tabbar, TabbarItem,Tab,Tabs,Checkbox, CheckboxGroup,Dialog,Popup,RadioGroup, Radio,Cell, CellGroup,
		PullRefresh,Area,Overlay,DatetimePicker,Notify,CountDown,List} from 'vant';
Vue.use(Image).use(Row).use(Col).use(Search).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Checkbox)
	.use(CheckboxGroup).use(Dialog).use(Popup).use(RadioGroup).use(Radio).use(Cell).use(CellGroup).use(PullRefresh)
	.use(Area).use(Overlay).use(vueHashCalendar).use(DatetimePicker).use(VueScroller).use(Notify).use(CountDown).use(List);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
