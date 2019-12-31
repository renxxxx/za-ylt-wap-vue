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
import jquery from 'jquery'
import moment from 'moment'
import iscroll from 'iscroll'
// 在入口文件中（main.js），导入组件库
import vueHashCalendar from 'vue-hash-calendar'
// 引入组件CSS样式
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
import VueScroller from 'vue-scroller'
import qs from 'qs';
import h5p from '../build/h5p.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.moment = moment;
Vue.prototype.$store = store
Vue.prototype.$h5p = h5p
Vue.prototype.qs = qs
if(navigator.userAgent.toLowerCase().indexOf('html5plus'))
	Vue.prototype.topHeight = "24px"
else
	Vue.prototype.topHeight = "10px"
Vue.prototype.$jquery = jquery
Vue.prototype.$iscroll = iscroll


function plusReady() {
	let currentWebview = plus.webview.currentWebview();
	currentWebview.setStyle({scrollIndicator:"none"})

	let isImmersedStatusbar = plus.navigator.isImmersedStatusbar(); 
	// 检测是否支持沉浸式 支持沉浸式状态栏则返回true

	let _statusbarHeight = "24"; // 设置默认值
	if (isImmersedStatusbar) {
		_statusbarHeight = plus.navigator.getStatusbarHeight(); // 获取系统状态栏高度
	}
		Vue.prototype.topHeight=_statusbarHeight+'px'
	//plus.navigator.setStatusBarBackground("#ffffff");
	plus.navigator.setStatusBarStyle("dark")
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

}


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

moment.locale('zh-cn');

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
	Stepper
} from 'vant';
Vue.use(Image).use(Row).use(Col).use(Search).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Checkbox).use(Stepper)
	.use(CheckboxGroup).use(Dialog).use(Popup).use(RadioGroup).use(Radio).use(Cell).use(CellGroup).use(PullRefresh)
	.use(Area).use(Overlay).use(vueHashCalendar).use(DatetimePicker).use(VueScroller).use(Notify).use(CountDown).use(List)
	.use(Uploader).use(DropdownMenu).use(DropdownItem).use(Swipe).use(SwipeItem).use(Lazyload).use(ActionSheet).use(Grid)
	.use(GridItem).use(SwipeCell).use(Circle).use(Toast).use(ImagePreview).use(Progress);
//配置全局时间
Toast.setDefaultOptions({
	duration: 800
});
/* eslint-disable no-new */



new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})

