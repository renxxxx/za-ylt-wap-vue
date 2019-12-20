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
import moment from 'moment'
// 在入口文件中（main.js），导入组件库
import vueHashCalendar from 'vue-hash-calendar'
// 引入组件CSS样式
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
import VueScroller from 'vue-scroller'

import h5p from '../build/h5p.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.moment = moment;
Vue.prototype.store = store



if(window.plus){
	plusReady();
}else{
	document.addEventListener('plusready',plusReady,false);
}


function plusReady(){
	    plus.navigator.setStatusBarBackground("#2B77EF");
      plus.navigator.setStatusBarStyle("light")

      function location(position){
        axios.defaults.headers.common['latitude']=position.coords.latitude
        axios.defaults.headers.common['longitude']=position.coords.longitude
        axios.defaults.headers.common['heading']=position.coords.heading
        axios.defaults.headers.common['speed']=position.coords.heading
      }

      plus.geolocation.getCurrentPosition( location, function ( e ) {
      },{geocode:true});

      plus.geolocation.watchPosition( location, function ( e ) {

      }, {geocode:false} );
}


moment.locale('zh-cn');

import { Image, Row, Col,Search,Tabbar, TabbarItem,Tab,Tabs,Checkbox, CheckboxGroup,Dialog,Popup,RadioGroup, Radio,Cell, CellGroup,
		PullRefresh,Area,Overlay,DatetimePicker,Notify,CountDown,List,Uploader,DropdownMenu, DropdownItem,
		 Swipe, SwipeItem,Lazyload,ActionSheet,Grid, GridItem ,SwipeCell,Circle,Toast,ImagePreview,Progress,Stepper   } from 'vant';
Vue.use(Image).use(Row).use(Col).use(Search).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Checkbox).use(Stepper)
	.use(CheckboxGroup).use(Dialog).use(Popup).use(RadioGroup).use(Radio).use(Cell).use(CellGroup).use(PullRefresh)
	.use(Area).use(Overlay).use(vueHashCalendar).use(DatetimePicker).use(VueScroller).use(Notify).use(CountDown).use(List)
	.use(Uploader).use(DropdownMenu).use(DropdownItem).use(Swipe).use(SwipeItem).use(Lazyload).use(ActionSheet).use(Grid)
	.use(GridItem).use(SwipeCell).use(Circle).use(Toast).use(ImagePreview).use(Progress);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  h5p,
  components: { App },
  template: '<App/>'
})
