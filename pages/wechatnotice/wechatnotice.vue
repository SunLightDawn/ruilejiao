<template>
	<view class="contentPage">
		<div v-if="info.subscribe == true">
			<div class="wechatEle">
				<image src="../../static/img/icon_wechat_small.png" mode="widthFix"></image>
				<image :src="userInfo.headimgurl" mode="widthFix"></image>
			</div>
			<div class="wechatTishi">
				<p>{{userInfo.nickname}}</p>
				<p>恭喜您绑定成功，可接收相关通知</p>
				<div class="flex" @click="Unbind()">解除绑定</div>
			</div>
		</div>
		<div v-else>
			<div class="wechatEleW">
				<image src="../../static/img/icon_wechat_small.png" mode="widthFix"></image>
				<p></p>
				<p></p>
				<image src="../../static/img/icon_link.png" mode="widthFix"></image>
				<p></p>
				<p></p>
				<image :src="userInfo.headimgurl" mode="widthFix"></image>
			</div>
			<div class="wechatTishiW">
				<p>您未绑定微信，无法接收相关通知</p>
				<div>
					<div class="flex">如何绑定？<span></span><span></span></div>
					<div class="flex">1.关注【睿乐未来】公众号，点击【我是老师】完成绑定</div>
					<div class="flex">2.登录时，必须授权微信完成绑定，否则无法接公众号推送消息</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				info: {},
			};
		},
		onLoad() {
			this.get_check_subscribe();
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			// 是否绑定微信通知
			async get_check_subscribe() {
				try {
					const res = await this.$api.check_subscribe();
					this.info = res.data;
				} catch (e) {
					console.log(e)
				}
			},
			Unbind() {
				uni.showModal({
					title: '操作提示',
					showCancel: true,
					confirmColor: "#576b95",
					content: "确定解除绑定吗",
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.contentPage {
		min-height: 100vh;
		background-color: #f4f4f4;
		padding-top: 180rpx;
		box-sizing: border-box;
	}

	.wechatEleW {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		>image:nth-child(1),
		>image:nth-child(7) {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}

		>image:nth-child(4) {
			width: 48rpx;
			height: 48rpx;
		}

		p {
			width: 10rpx;
			height: 10rpx;
			border-radius: 50%;
			margin: 0 10rpx;
		}

		p:nth-child(2),
		p:nth-child(6) {
			background-color: rgba(#000000, 0.2);
			animation: linkD 0.5s linear 0s infinite alternate;
		}

		p:nth-child(3),
		p:nth-child(5) {
			background-color: rgba(#000000, 0.2);
			animation: linkD 0.5s linear 0.5s infinite alternate;
		}
	}

	@keyframes linkD {
		0% {
			background-color: rgba(#000000, 0.2);
		}

		100% {
			background-color: rgba(#000000, 0.4);
		}
	}

	.wechatTishiW {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;


		p:nth-child(1) {
			margin-top: 20rpx;
			color: #999999;
			font-size: $uni-font-size-24;
			margin: 64rpx 0 70rpx;
		}

		>div {
			width: 550rpx;
			height: 270rpx;
			background-color: #ffffff;
			box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.08);
			border-radius: 8rpx;

			>div:nth-child(1) {
				width: 100%;
				height: 100rpx;
				color: #000000;
				font-size: $uni-font-size-28;
				border-bottom: 2rpx dotted #eaeaea;
				position: relative;

				>span {
					display: inline-block;
					width: 20rpx;
					height: 20rpx;
					position: absolute;
					background-image: linear-gradient(to right, rgba(233, 233, 233, 1), rgba(239, 239, 239, 1));
					border-radius: 50%;
					bottom: -10rpx;
				}

				>span:nth-child(1) {
					left: -10rpx;
				}

				>span:nth-child(2) {
					right: -10rpx;
				}
			}

			>div:nth-child(2) {
				width: 100%;
				height: calc(100% - 100rpx);
				color: #999999;
				font-size: $uni-font-size-24;
				text-align: center;
				padding: 60rpx;
				box-sizing: border-box;
			}
		}

	}

	.wechatEle {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: center;

		>image:nth-child(1) {
			width: 124rpx;
			height: 124rpx;
			border-radius: 50%;
		}

		>image:nth-child(2) {
			width: 60rpx;
			height: 60rpx;
			margin-left: -30rpx;
			border-radius: 50%;
		}
	}

	.wechatTishi {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		p:nth-child(1) {
			margin-top: 80rpx;
			color: #000000;
			font-size: $uni-font-size-32;
		}

		p:nth-child(2) {
			margin-top: 20rpx;
			color: #999999;
			font-size: $uni-font-size-24;
		}

		div {
			width: 686rpx;
			height: 80rpx;
			margin-top: 80rpx;
			background-color: #6da6bd;
			border-radius: 8rpx;
			color: #ffffff;
			font-size: $uni-font-size-32;
		}
	}
</style>
