<template>
	<view class="contentPage">
		<!-- 输入密码 -->
		<div class="iptPasd" v-if="!isChangeStatus">
			<div>当前密码</div>
			<input type="text" placeholder="请输入当前密码" placeholder-style="color:#999999;" v-model="password" />
		</div>
		<!-- 修改密码 -->
		<div class="changePasd" v-if="isChangeStatus">
			<div class="iptPasd">
				<div>新密码</div>
				<input type="text" placeholder="请输入新密码" placeholder-style="color:#999999;" v-model="newpassword" />
			</div>
			<div class="iptPasd">
				<div>确认密码</div>
				<input type="text" placeholder="请输入确认密码" placeholder-style="color:#999999;" v-model="okpassword" />
			</div>
		</div>
		<!-- 确认按钮 -->
		<div class="queren flex" @click="queren()">{{!isChangeStatus?'下一步':'确认'}}</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: "",
				newpassword: "",
				okpassword: "",
				isChangeStatus: false,
			};
		},
		methods: {
			async queren() {
				if (!this.isChangeStatus) {
					if (this.password == "") {
						this.$gj_api.showicon("请输入当前密码", "none", 3000)
					} else {
						const res = await this.$api.login({
							mobile: uni.getStorageSync("admin"),
							password: this.password
						});
						if (res.code == 200) {
							this.isChangeStatus = true;
						} else {
							this.$gj_api.showicon(res.message, "none", 3000);
						}
					}
				} else {
					if (this.newpassword == "") {
						this.$gj_api.showicon("请输入新密码", "none", 3000)
					} else if (this.okpassword == "") {
						this.$gj_api.showicon("请输入确认密码", "none", 3000)
					} else if (this.okpassword != this.newpassword) {
						this.$gj_api.showicon("密码不一致", "none", 3000)
					} else {
						const res = await this.$api.changePassword({
							password: this.password,
							new_password: this.okpassword
						});
						if (res.code == 200) {
							this.$gj_api.showimage(res.message, "success");
							uni.removeStorageSync("token");
							uni.removeStorageSync("isRememberPasd");
							uni.removeStorageSync("admin");
							uni.removeStorageSync("userInfo");
							setTimeout(() => {
								uni.redirectTo({
									url: '../login/login'
								});
							}, 1000)
						} else {
							this.$gj_api.showicon(res.message, "error", 3000);
						}
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.contentPage {
		min-height: 100vh;
		background-color: #f4f4f4;
		padding-top: 20rpx;
		box-sizing: border-box;
	}

	.iptPasd {
		width: 100%;
		height: 112rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;

		>div {
			width: 120rpx;
			font-weight: 500;
			color: #666666;
			font-size: $uni-font-size-28;
			margin: 0 60rpx 0 32rpx;
		}

		>input {
			color: #999999;
			font-size: $uni-font-size-24;
		}
	}

	.changePasd {
		padding-left: 32rpx;
		box-sizing: border-box;
		background-color: #ffffff;

		>div {
			border-bottom: 2rpx solid #f4f4f4;

			>div {
				margin-left: 0;
			}
		}
	}

	.queren {
		width: 686rpx;
		height: 80rpx;
		background-color: #6da6bd;
		border-radius: 8rpx;
		color: #ffffff;
		font-size: $uni-font-size-32;
		margin-left: 32rpx;
		margin-top: 60rpx;
	}
</style>
