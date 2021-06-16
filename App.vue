<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		methods: {
			...mapMutations(['cctoken', 'login']),
		},
		onLaunch: function() {

		},
		onShow: function() {
			console.log('App Show');
			const token = uni.getStorageSync('token');
			const userInfo = uni.getStorageSync('userInfo');
			//判断本地缓存是否存在数据
			if (token) {
				this.cctoken(token)
				const nowTime = Date.parse(new Date()) / 1000; //当前时间
				const expTime = this.$gj_api.decodeToken(token.token).exp; //过期时间
				const iatTime = this.$gj_api.decodeToken(token.token).iat; //登录时间
				if (expTime < nowTime) {
					this.$gj_api.showicon("登录已过期", "loading");
					uni.removeStorageSync("token");
					setTimeout(() => {
						uni.redirectTo({
							url: "/pages/login/login"
						})
					}, 1000)
				}
			} else {
				uni.redirectTo({
					url: "/pages/login/login"
				})
			}
			if (userInfo) this.login(userInfo)
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	*,
	view,
	p {
		font-family: PingFang SC;
	}

	image {
		display: block;
	}

	.contentPage {
		width: 100%;
	}
</style>
