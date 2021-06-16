import request from 'common/request.js'

//登录
export const login = (data) => {
	return new Promise((resolve, reject) => {
		request('/account/token', data, "post").then(res => {
			resolve(res)
		})
	})
}
//登录-绑定手机号
export const wx_login = (data) => {
	return new Promise((resolve, reject) => {
		request('/api/store/webchat/wx_login', data, "GET").then(res => {
			resolve(res)
		})
	})
}
//修改密码
export const changePassword = (data) => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/mine/change_password', data, "post", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
// 首页-RTS临时密码获取
export const RTSPasd = () => {
	return new Promise((resolve, reject) => {
		request('/account/token/random_token', {}, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}

// 首页-根据日期范围查找是否有课
export const getSchedulesByDate = (data) => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/home/getSchedulesByDate', data, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
// 首页-教师课表及生日学员获取
export const getKcSr = (data) => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/home', data, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
// 首页-学员考勤列表   
export const getattendance = (data) => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/home/curriculum/attendance', data, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
// 班级-列表
export const getclass = (data) => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/clazz', data, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
// 班级-班级详情-班级课表
export const getcurriculumList = (data) => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/clazz/curriculumList', data, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
// 班级-班级详情-班级学员
export const getstudent = (data) => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/clazz/student', data, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
// 班级-班级详情-作业报告
export const getworkbaogao = (data) => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/clazz/homework', data, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
// 班级-班级详情-作业报告详情
export const getbaogaodetail = (data) => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/clazz/homework/report', data, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
// 班级-班级详情-分类信息
export const getoptions = () => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/clazz/options', {}, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
// 我的 获取参数数据
export const getmine = (data) => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/mine', data, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
// 我的-检测是否绑定
export const check_subscribe = () => {
	return new Promise((resolve, reject) => {
		request('/api/rlj/mine/check_subscribe', {}, "get", {
			authorization: "Bearer " + uni.getStorageSync("token").token
		}).then(res => {
			resolve(res)
		})
	})
}
export default {
	login,
	wx_login,
	RTSPasd,
	getSchedulesByDate,
	getKcSr,
	getattendance,
	getmine,
	getclass,
	getcurriculumList,
	getstudent,
	getworkbaogao,
	getbaogaodetail,
	getoptions,
	check_subscribe,
}
