<template>
	<view class="contentPage">
		<div class="loadingNum">
			<div>{{title}}</div>
			<div>
				<div>
					<p>{{student_count}}</p>
					<p>学员人数</p>
				</div>
				<div>
					<p>{{attendance_count}}%</p>
					<p>出勤率</p>
				</div>
			</div>
		</div>
		<div class="listEle">
			<div v-for="(item,index) in list" :key="index">
				<div>
					<image :src="item.type == 1 ? '../../static/img/icon_boy.png' : '../../static/img/icon_girl.png'"
						mode="widthFix"></image>
					<p>李磊</p>
				</div>
				<div class="flex"
					:class="item.status == 1 ? 'daikaoqin' : item.status == 2 ? 'qingjia' : item.status == 3 ? 'queqin' : 'chuqin'">
					{{item.name}}
				</div>
			</div>
			<div class="indexListNo" style="border: none;" v-if="list.length == 0">
				<image src="../../static/img/nodatabg.png" mode="widthFix"></image>
				<p>暂无学员哦~</p>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				curriculum_no: 0,
				clazz_id: 0,
				attendance_count: 0,
				student_count: 0,
				title: "",
			};
		},
		onLoad(e) {
			this.clazz_id = e.clazz_id;
			this.curriculum_no = e.curriculum_no;
			this.attendance_count = e.attendance_count;
			this.student_count = e.student_count;
			this.title = e.title;
			this.attendance();
		},
		methods: {
			// 教师当天默认课表及生日学员获取
			async attendance(date) {
				try {
					const res = await this.$api.getattendance({
						clazz_id: this.clazz_id,
						curriculum_no: this.curriculum_no
					});
					this.list = res.data;
				} catch (e) {
					console.log(e)
				}
			},
		}
	}
</script>

<style lang="scss">
	.contentPage {
		min-height: 100vh;
		background-color: #f4f4f4;
	}

	.loadingNum {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background-image: linear-gradient(to bottom, #e1e1e1, #ffffff);
		display: flex;
		align-items: center;
		justify-content: space-between;

		>div:nth-child(1) {
			font-weight: 500;
			color: #000000;
			font-size: $uni-font-size-32;
		}

		>div:nth-child(2) {
			display: flex;
			align-items: center;

			>div {
				text-align: center;
				margin-left: 20rpx;

				p:nth-child(2) {
					color: #999999;
					font-size: $uni-font-size-24;
				}

				p:nth-child(1) {
					color: #000000;
					font-size: $uni-font-size-28;
				}
			}
		}
	}

	.listEle {
		width: 100%;
		padding-left: 35rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		margin-top: 20rpx;

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
					font-size: $uni-font-size-32;
				}
			}

			.daikaoqin {
				width: 100rpx;
				height: 40rpx;
				background-color: #f4f4f4;
				border-radius: 8px;
				color: #999999;
				font-size: $uni-font-size-24;
			}

			.qingjia {
				width: 100rpx;
				height: 40rpx;
				background-color: #fdf6eb;
				border-radius: 8px;
				color: #ebb567;
				font-size: $uni-font-size-24;
			}

			.queqin {
				width: 100rpx;
				height: 40rpx;
				background-color: #fef0f0;
				border-radius: 8px;
				color: #f78c8d;
				font-size: $uni-font-size-24;
			}

			.chuqin {
				width: 100rpx;
				height: 40rpx;
				background-color: #f0f8eb;
				border-radius: 8px;
				color: #88d068;
				font-size: $uni-font-size-24;
			}
		}
	}

	.indexListNo {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		image {
			width: 160rpx;
		}

		p {
			color: #999999;
			font-size: $uni-font-size-24;
			margin-top: 15rpx;
		}
	}
</style>
