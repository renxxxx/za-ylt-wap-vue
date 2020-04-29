debugger
import './assets/rem'
import './assets/rest.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/index.css'
import axios from 'axios'
import store from './store'
// import jquery from 'jquery'
import cookies from 'js-cookie'
// import moment from 'moment'
moment.locale('zh-cn');
import qs from 'qs';
import h5p from '../build/h5p.js'
Vue.prototype.$version = '2003271407-2cfdac6'
Vue.prototype.$versionBrief = '修复了已知BUG, 优化了用户体验.'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.moment = moment;
Vue.prototype.$store = store
Vue.prototype.$h5p = h5p
Vue.prototype.qs = qs
// Vue.prototype.$jquery = jquery
Vue.prototype.$cookies = cookies
import {
	Image,
	Row,
	Col,
	Search,
	Tabbar,
	TabbarItem,
	Tab,
	Tabs,
	Checkbox,
	CheckboxGroup,
	Dialog,
	Popup,
	RadioGroup,
	Radio,
	Cell,
	CellGroup,
	PullRefresh,
	Area,
	Overlay,
	DatetimePicker,
	Notify,
	CountDown,
	List,
	Uploader,
	DropdownMenu,
	DropdownItem,
	Swipe,
	SwipeItem,
	Lazyload,
	ActionSheet,
	Grid,
	GridItem,
	SwipeCell,
	Circle,
	Toast,
	ImagePreview,
	Progress,
	Stepper,
	Picker,
  Collapse,
  CollapseItem,
  Step, Steps,
  Field
} from 'vant';
Vue.use(Image).use(Row).use(Col).use(Search).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Checkbox).use(Stepper)
	.use(CheckboxGroup).use(Dialog).use(Popup).use(RadioGroup).use(Radio).use(Cell).use(CellGroup).use(PullRefresh)
	.use(Area).use(Overlay).use(DatetimePicker).use(Notify).use(CountDown).use(List)
	.use(Uploader).use(DropdownMenu).use(DropdownItem).use(Swipe).use(SwipeItem).use(Lazyload, {
		loading:require('./assets/image/loading.gif'),
		error:require('./assets/image/loading-error.png'),
		attempt:1,
		preload:1.3,
	  }).use(ActionSheet).use(Grid).use(Step).use(Steps).use(Field)
	.use(GridItem).use(SwipeCell).use(Circle).use(Toast,{
		duration: 1500,
		forbidClick: true
	}).use(ImagePreview).use(Progress).use(Picker).use(Collapse).use(CollapseItem);
//配置全局时间
Vue.prototype.$toast  = Toast


Vue.prototype.cookieOn=function() {
	debugger
	var result = false;
	if (navigator.cookiesEnabled) 
	  return true;
	  cookies.set('tc', 'yes', { path: "/"});
	if (cookies.get('tc') && cookies.get('tc').indexOf('yes') > -1) 
	  result = true;
	  cookies.set('tc', '', { expires: -1 });
	return result;
  }
  
if(navigator.userAgent.toLowerCase().indexOf('html5plus') > -1)
	store.state.paddingTop = "24px"
else
	store.state.paddingTop = "0px"


const paddingBottom = () => {
	debugger
	var a = false;
	if (typeof window !== 'undefined' && window) {
		a= /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
	}

	return a?"34px":"0px";
};

store.state.paddingBottom = paddingBottom()


function plusReady() {
	debugger
	let currentWebview = plus.webview.currentWebview();
	currentWebview.setStyle({scrollIndicator:"none"})

	let isImmersedStatusbar = plus.navigator.isImmersedStatusbar();
	// 检测是否支持沉浸式 支持沉浸式状态栏则返回true

	let paddingTop = "24"; // 设置默认值
	if (isImmersedStatusbar) {
		paddingTop = plus.navigator.getStatusbarHeight(); // 获取系统状态栏高度
	}

	store.state.paddingTop=paddingTop+'px'
	//plus.navigator.setStatusBarBackground("#ffffff");
	//plus.navigator.setStatusBarStyle("dark")
	function location(position) {
		axios.defaults.headers.common['latitude'] = position.coords.latitude
		axios.defaults.headers.common['longitude'] = position.coords.longitude
		axios.defaults.headers.common['heading'] = position.coords.heading
		axios.defaults.headers.common['speed'] = position.coords.heading
	}

	plus.geolocation.getCurrentPosition(location, function(e) {}, {
		geocode: true
	});

	plus.geolocation.watchPosition(location, function(e) {

	}, {
		geocode: false
	});

	currentWebview.drag({direction:'right',moveMode:'silent'}, null,function(e){
		history.back()
	});

	launchVue();
}
// var NjsHello = plus.navigator.setStatusBarStyle("dark")

if (window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}
Vue.directive('focus', {
	// 当被绑定的元素插入到 DOM 中时……
	inserted: function(el, attr) {
		// 聚焦元素
		if (attr.value)
			el.focus()
	}
})

/* eslint-disable no-new */


debugger
if(navigator.userAgent.toLowerCase().indexOf('html5plus') == -1){
	launchVue();
}


function launchVue(){
	debugger
	new Vue({
		el: '#app',
		router,
		store,
		components: { App },
		template: '<App/>'
	  })
}