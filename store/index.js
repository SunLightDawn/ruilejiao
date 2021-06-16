import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		token: "",
		userInfo: {},
		admin: "",
		isLogin: false,
	},
	mutations: {
		// 登录存储个人信息
		login(state, user) {
			state.userInfo = user;
			uni.setStorageSync("userInfo", user)
		},
		// 登录存储用户名密码
		ccadmin(state, user) {
			state.admin = user;
			uni.setStorageSync("admin", user)
		},
		// 登录存储token
		cctoken(state, token) {
			state.token = token;
			state.isLogin = true;
			uni.setStorageSync("token", token)
		},
	},
	actions: {

	},
	getters: {
		getState(state) {
			return state;
		}
	}
})
export default store
