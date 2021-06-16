// const baseUrl = 'https://api-tms-test.reallyedu.com';
const baseUrl = 'https://vip-test.cn.utools.club';

const request = (url = '', date = {}, type = 'POST', header = {
	"Content-Type": "application/x-www-form-urlencoded"
}) => {
	uni.showLoading({
		title: '加载中',
		mask: true
	})
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: baseUrl + url,
			data: date,
			header: header,
			dataType: 'json'
		}).then((response) => {
			let [error, res] = response;
			if (res.statusCode == 200) {
				resolve(res.data);
				setTimeout(() => {
					uni.hideLoading();
				}, 100)
			} else if (res.statusCode == 405) {
				uni.showToast({
					icon: 'none',
					title: '请求方法错误',
					duration: 1500
				});
			} else if (res.statusCode == 401) {
				uni.showToast({
					icon: 'none',
					title: '未登录或登录超时',
					duration: 1500
				});
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/login/login',
					});
				}, 1500)
			} else {
				uni.showToast({
					title: "数据请求失败",
					icon: "none",
					mask: true,
					duration: 1000
				});
			}
		}).catch(error => {
			let [err, res] = error;
			reject(err)
			uni.showToast({
				title: "数据请求失败",
				icon: "none",
				mask: true,
				duration: 1000
			});
		})
	});
}
export default request
