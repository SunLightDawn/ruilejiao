<template>
	<view class="contentPage flex">
		<!-- 背景颜色 -->
		<!-- loginBg 正常屏  loginBgL 全面屏 -->
		<div :class="isiPhoneL?'loginBgL':'loginBg'">
			<div></div>
			<div></div>
			<div></div>
		</div>
		<!-- 登录界面 -->
		<div class="loginEle">
			<div class="loginLogo flexC">
				<image src="../../static/img/logo.png" mode="widthFix"></image>
				<p>睿乐教</p>
				<image src="../../static/img/really-education.png" mode="widthFix"></image>
			</div>
			<div class="loginIpt flexC">
				<div class="loginAccount">
					<image src="../../static/img/icon_account.png" mode="widthFix"></image>
					<input type="text" placeholder="请输入账号" v-model="up_info.account" maxlength="11">
				</div>
				<div class="loginAccount">
					<image src="../../static/img/icon_password.png" mode="widthFix"></image>
					<input type="text" password="true" placeholder="请输入密码" v-model="up_info.password">
				</div>
				<div class="rememberPasd">
					<div @click="isRememberPasdClick()">
						<image
							:src="!isRememberPasd?'../../static/img/icon_selectbox.png':'../../static/img/icon_selectbox_selected.png'"
							mode="widthFix"></image>
					</div>
					<p @click="isRememberPasdClick()">记住密码</p>
				</div>
				<div class="loginBtn flex" @click="loginBtn">登 录</div>
			</div>
		</div>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				up_info: {
					account: "",
					password: ""
				}, //账号 密码
				isRememberPasd: false,
				info: {},
				isiPhoneL: false,
			};
		},
		onLoad() {
			if (uni.getStorageSync('isRememberPasd')) {
				this.up_info.account = uni.getStorageSync('admin') || "";
				this.up_info.password = uni.getStorageSync('isRememberPasd') || "";
				this.isRememberPasd = true;
			}
			uni.getSystemInfo({
				success: (res) => {
					// 根据 model 进行判断
					if (res.model == 'iPhone X' || res.model == 'iPhone XR' || res.model == 'iPhone XS Max' ||
						res.model == 'iPhone 11' ||
						res.model == 'iPhone 11 Pro' || res.model == 'iPhone 11 Pro Max') {
						this.isiPhoneL = true;
					} else {
						this.isiPhoneL = false;
					}
				}
			})
		},
		methods: {
			...mapMutations(['cctoken', 'ccadmin', 'login']),
			// 是否记住密码
			isRememberPasdClick() {
				this.isRememberPasd = !this.isRememberPasd;
				if (this.isRememberPasd) {
					uni.setStorageSync("isRememberPasd", this.up_info.password)
				} else {
					uni.removeStorageSync("isRememberPasd")
				}
			},
			// 登录-绑定手机号
			async get_wx_login() {
				const res = await this.$api.wx_login({
					mobile: this.up_info.account,
				});
			},
			// 是否绑定微信通知
			async get_check_subscribe() {
				try {
					var that = this;
					const res = await this.$api.check_subscribe();
					this.info = res.data;
					if (res.data.subscribe == true) {
						this.login(res.data.data);
						// 已绑定
						uni.showToast({
							title: '登录成功!',
							icon: 'success',
							duration: 1000
						});
						setTimeout(() => {
							uni.switchTab({
								url: "../index/index"
							})
						}, 1000)
					} else {
						// 未绑定
						uni.showModal({
							title: '温馨提示',
							showCancel: true,
							cancelText: "取消",
							confirmText: "获取授权",
							confirmColor: "#576b95",
							content: '需要获取微信授权信息后可进行操作！',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定')
									uni.navigateTo({
										url: "../loginview/loginview?url=https://vip-test.cn.utools.club/api/store/webchat/wx_login&mobile=" +
											that.up_info.account
									})
								} else {
									console.log('用户点击取消')
								}
							}
						});
					}
				} catch (e) {
					console.log(e)
				}
			},
			//点击登录
			async loginBtn() {
				var that = this;
				if (this.up_info.account == "") {
					this.$gj_api.showicon("请输入账号", "none", 3000);
				} else if (this.up_info.password == "") {
					this.$gj_api.showicon("请输入密码", "none", 3000);
				} else {
					const res = await this.$api.login({
						mobile: this.up_info.account,
						password: this.up_info.password
					});
					if (res.code == 200) {
						this.cctoken(res);
						this.ccadmin(this.up_info.account);
						this.get_check_subscribe();
					} else {
						this.$gj_api.showicon(res.message, "none", 3000);
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.contentPage {
		height: 100vh;
		overflow: hidden;
		overflow-y: auto;
		background-image: linear-gradient(180deg, #d1effb 0%, #9dc0ce 100%);
		position: relative;
	}

	.loginBgL {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;

		>div:nth-child(1) {
			width: 204rpx;
			height: 600rpx;
			background-image: linear-gradient(to right, #ffffff, #9dc0ce);
			opacity: 0.25;
			transform: rotate(-35deg);
			position: absolute;
			right: 0rpx;
			top: -296rpx;
		}

		>div:nth-child(2) {
			width: 200%;
			height: 471rpx;
			background-image: linear-gradient(0deg, #ffffff, #9dc0ce);
			opacity: 0.3;
			transform: rotate(25deg);
			position: absolute;
			right: -260rpx;
			top: -219rpx;
		}

		>div:nth-child(3) {
			width: 200%;
			height: 621rpx;
			background-image: linear-gradient(180deg, #9dc0ce 0%, #ffffff 100%);
			opacity: 0.25;
			transform: rotate(-30deg);
			position: absolute;
			right: -260rpx;
			top: -111rpx;
		}
	}

	.loginBg {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;

		>div:nth-child(1) {
			width: 217rpx;
			height: 600rpx;
			background-image: linear-gradient(to right, #ffffff, #9dc0ce);
			opacity: 0.4;
			transform: rotate(-40deg);
			position: absolute;
			right: 0rpx;
			top: -333rpx;
		}

		>div:nth-child(2) {
			width: 200%;
			height: 400rpx;
			background-image: linear-gradient(0deg, #ffffff, #9dc0ce);
			opacity: 0.3;
			transform: rotate(18deg);
			position: absolute;
			right: -260rpx;
			top: -226rpx;
		}

		>div:nth-child(3) {
			width: 200%;
			height: 621rpx;
			background-image: linear-gradient(180deg, #9dc0ce 0%, #ffffff 100%);
			opacity: 0.25;
			transform: rotate(-30deg);
			position: absolute;
			right: -260rpx;
			top: -277rpx;
		}
	}

	.loginEle {
		width: 650rpx;
		height: 900rpx;
		background-color: rgba(225, 225, 225, 0.4);
		border-radius: 8rpx;
		box-shadow: 0px 0px 22px rgba(28, 52, 91, 0.23);
		z-index: 1;
	}

	.loginLogo {
		width: 100%;
		padding-top: 50rpx;

		image:nth-child(1) {
			width: 135rpx;
			height: 146rpx;
		}

		p {
			font-size: $uni-font-size-36;
			font-weight: 600;
			color: #1c345b;
			letter-spacing: 15rpx;
			line-height: 50rpx;
			text-align: center;
			padding-left: 15rpx;
			margin-top: 5rpx;
		}

		image:nth-child(3) {
			width: 140rpx;
		}
	}

	.loginIpt {
		width: 100%;
		padding-top: 110rpx;

		.loginAccount {
			width: 510rpx;
			height: 80rpx;
			background-color: #fafafa;
			border-radius: 8rpx;
			display: flex;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
				margin: 0 26rpx 0 30rpx;
			}

			input {
				font-size: $uni-font-size-24;
				color: #000000;
			}
		}

		.loginAccount:nth-child(1) {
			margin-bottom: 70rpx;
		}

		.rememberPasd {
			width: 510rpx;
			height: 80rpx;
			display: flex;
			// align-items: center;
			padding-top: 18rpx;
			box-sizing: border-box;

			>div {
				width: 34rpx;
				height: 34rpx;
				margin-right: 10rpx;

				image {
					width: 34rpx;
					height: 34rpx;
				}
			}

			p {
				font-size: $uni-font-size-24;
				color: #6da6bd;
			}
		}

		.loginBtn {
			width: 510rpx;
			height: 80rpx;
			background-color: #6da6bd;
			border-radius: 8rpx;
			font-weight: 600;
			color: #ffffff;
			font-size: $uni-font-size-32;
			font-family: PingFang SC;
			// margin-top: 80rpx;
		}
	}
</style>
