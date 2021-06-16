<template>
	<view class="contentPage">
		<div class="loadingNum">共{{xueyuanshengri.length}}条记录，已加载{{xueyuanshengri.length}}条</div>
		<div class="listEle">
			<div v-for="(item,index) in xueyuanshengri" :key="index">
				<div>
					<image :src="item.gender == 1 ? '../../static/img/icon_boy.png' : '../../static/img/icon_girl.png'"
						mode="widthFix"></image>
					<p>{{item.name}}</p>
				</div>
				<div>
					<image src="../../static/img/icon_birthday_homepage.png" mode="widthFix"></image>
					<p>{{item.birthday}}</p>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xueyuanshengri: [],
				list: []
			};
		},
		onLoad(e) {
			this.KcSr(e.date);
		},
		mounted() {

		},
		methods: {
			// 教师当天默认课表及生日学员获取
			async KcSr(date) {
				try {
					const res = await this.$api.getKcSr({
						query_date: date,
					});
					this.xueyuanshengri = res.data.birthday_list;
				} catch (e) {
					console.log(e)
				}
			},
		}
	}
</script>

<style lang="scss">
	.loadingNum {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background-image: linear-gradient(to bottom, #f8f8f8, #ffffff, #ffffff);
		color: #999999;
		font-size: $uni-font-size-24;
	}

	.listEle {
		width: 100%;
		padding-left: 35rpx;
		box-sizing: border-box;

		>div {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid #f4f4f4;
			padding: 24rpx 32rpx 24rpx 0;
			box-sizing: border-box;

			>div:nth-child(1) {
				display: flex;
				align-items: center;

				image {
					width: 64rpx;
					height: 64rpx;
					margin-right: 10rpx;
				}

				p {
					color: #000000;
					font-weight:500;
					font-size: $uni-font-size-32;
				}
			}

			>div:nth-child(2) {
				display: flex;
				align-items: center;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 10rpx;
				}

				p {
					width: 200rpx;
					color: #999999;
					font-size: $uni-font-size-32;
					font-family:SF Pro Text;
				}
			}
		}
	}
</style>
