import jsrsasign from 'jsrsasign';
// 图片提示框
const showimage = function(title, zhi) {
	uni.showToast({
		title: title,
		image: zhi == 'success' ? "../../static/img/success.png" : "../../static/img/error.png",
		mask: true,
		duration: 1000
	});
};
// icon loading 提示框
const showicon = function(title, icon, time) {
	uni.showToast({
		title: title,
		icon: icon,
		mask: true,
		duration: time ? time : 1000
	});
};
// 手机号验证
const isMobile = function(s) {
	return /^1[0-9]{10}$/.test(s)
}
// 邮箱验证
const checkEmail = function(email) {
	return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)
		.test(
			email);
}
// 删除url 某个参数
const delUrlParam = function(url, ref) {
	// 如果不包括此参数
	if (url.indexOf(ref) == -1)
		return url;
	var arr_url = url.split('?');
	var base = arr_url[0];
	var arr_param = arr_url[1].split('&');
	var index = -1;
	for (var i = 0; i < arr_param.length; i++) {
		var paired = arr_param[i].split('=');
		if (paired[0] == ref) {
			index = i;
			break;
		}
	}
	if (index == -1) {
		return url;
	} else {
		arr_param.splice(index, 1);
		return base + "?" + arr_param.join('&');
	}
}

// 未登录 跳转个人中心页
const noLoginTo = function() {
	uni.showModal({
		title: '您还未登录！',
		showCancel: true,
		content: '是否前去登录',
		success: function(res) {
			if (res.confirm) {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		}
	});
}
// 检测是否已登录状态
const IsLogin = function() {
	const token = uni.getStorageSync('token');
	if (!token) {
		showicon("未登录！", "loading");
		setTimeout(() => {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}, 1000)
	}
}
// 检测token是够过期
const decodeToken = (token) => {
	let obj = null
	if (token !== '') {
		const payload = jsrsasign.KJUR.jws.JWS.parse(token)
		if (payload.hasOwnProperty('payloadObj')) {
			obj = payload.payloadObj
		}
	}
	return obj
}


export default {
	showimage,
	showicon,
	isMobile,
	delUrlParam,
	checkEmail,
	noLoginTo,
	IsLogin,
	decodeToken,
}
