import Vue from 'vue'
import App from './App'
import store from './store'

// 封装request
import request from 'common/request.js'
Vue.prototype.$request = request

// 引用api
import api from 'common/api.js'
Vue.prototype.$api = api;

// 引用工具函数
import gj_api from './util/util.js'
Vue.prototype.$gj_api = gj_api

// 全局分享
// import share from './common/share.js'
// Vue.mixin(share)

// vuex
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
