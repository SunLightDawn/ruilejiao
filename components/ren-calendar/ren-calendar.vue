<template>
	<view class="calendar-wrapper">
		<view class="header" v-if="headerBar">
			<view class="pre" @click="changeMonth('pre')">
				<image src="../../static/img/icon_next.png" mode="widthFix"></image>
			</view>
			<view>{{y+'-'+formatNum(m)}}</view>
			<view class="next" @click="changeMonth('next')">
				<image src="../../static/img/icon_next.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="week">
			<view class="week-day" v-for="(item, index) in weekDay" :key="index">{{ item }}</view>
		</view>
		<view :class="{ hide: !monthOpen }" class="content" :style="{ height: height }">
			<div class="bgText flex" v-if="monthOpen">{{m}}</div>
			<view :style="{ top: positionTop + 'rpx' }" class="days">
				<view class="item" v-for="(item, index) in dates" :key="index">
					<view class="day" @click="selectOne(item, $event,index)" :class="{
                            choose: choose == `${item.year}-${item.month}-${item.date}`,
                            nolm: !item.isCurM,
                            today: isToday(item.year, item.month, item.date),
                            isWorkDay: isWorkDay(item.year, item.month, item.date)
                        }">
						{{ isToday(item.year, item.month, item.date) ? '今' : Number(item.date) }}
					</view>
					<view class="markDay" v-if="isMarkDay(item.year, item.month, item.date)"></view>
				</view>
			</view>
		</view>
		<div class="showKg">
			<div class="showKgNr" style="bottom: 0;" @click="toggle">
				<image src="../../static/img/1.png"></image>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		name: 'ren-calendar',
		props: {
			// 星期几为第一天(0为星期日)
			weekstart: {
				type: Number,
				default: 1
			},
			// 标记的日期
			markDays: {
				type: Array,
				default: () => {
					return [];
				}
			},
			//是否展示月份切换按钮
			headerBar: {
				type: Boolean,
				default: true
			},
			// 是否展开
			open: {
				type: Boolean,
				default: true
			},
			//是否可收缩
			collapsible: {
				type: Boolean,
				default: true
			},
			//未来日期是否不可点击
			disabledAfter: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				weektext: ['日', '一', '二', '三', '四', '五', '六'],
				y: new Date().getFullYear(), // 年
				m: new Date().getMonth() + 1, // 月
				dates: [], // 当前月的日期数据
				positionTop: 0,
				monthOpen: true,
				choose: '',
				Dday: "",
				Mmonth: "",
				dayIndex: -1,
			};
		},
		created() {
			this.dates = this.monthDay(this.y, this.m);
			!this.open && this.toggle();
		},
		mounted() {
			this.choose = this.getToday().date;
			this.Dday = this.getToday().day;
			this.Mmonth = this.getToday().month;
			uni.$on('scrollHd', (data) => {
				if (data.msg == true) {
					this.monthOpen = false;
					if (this.dayIndex == -1) {
						for (let i in this.dates) {
							if (this.dates[i].date == this.Dday) {
								this.dayIndex = i;
							}
						}
						this.positionTop = -((Math.ceil((Number(this.dayIndex) + 1) / 7) || 1) - 1) * 90;
					} else {
						this.positionTop = -((Math.ceil((Number(this.dayIndex) + 1) / 7) || 1) - 1) * 90;
					}
				}
			})
		},
		computed: {
			// 顶部星期栏
			weekDay() {
				return this.weektext.slice(this.weekstart).concat(this.weektext.slice(0, this.weekstart));
			},
			height() {
				return (this.dates.length / 7) * 90 + 20 + 'rpx';
			}
		},
		methods: {
			formatNum(num) {
				let res = Number(num);
				return res < 10 ? '0' + res : res;
			},
			getToday() {
				let date = new Date();
				let y = date.getFullYear();
				let m = date.getMonth();
				let d = date.getDate();
				let week = new Date().getDay();
				let weekText = ['日', '一', '二', '三', '四', '五', '六'];
				let formatWeek = '星期' + weekText[week];
				let today = {
					date: y + '-' + this.formatNum(m + 1) + '-' + this.formatNum(d),
					week: formatWeek,
					day: this.formatNum(d),
					month: m + 1,
				};
				return today;
			},
			// 获取当前月份数据
			monthDay(y, month) {
				let dates = [];
				let m = Number(month);
				let firstDayOfMonth = new Date(y, m - 1, 1).getDay(); // 当月第一天星期几
				let lastDateOfMonth = new Date(y, m, 0).getDate(); // 当月最后一天
				let lastDayOfLastMonth = new Date(y, m - 1, 0).getDate(); // 上一月的最后一天
				let weekstart = this.weekstart == 7 ? 0 : this.weekstart;
				let startDay = (() => {
					// 周初有几天是上个月的
					if (firstDayOfMonth == weekstart) {
						return 0;
					} else if (firstDayOfMonth > weekstart) {
						return firstDayOfMonth - weekstart;
					} else {
						return 7 - weekstart + firstDayOfMonth;
					}
				})();
				let endDay = (7 - ((startDay + lastDateOfMonth) % 7)) == 7 ? 0 : (7 - ((startDay +
						lastDateOfMonth) %
					7)); // 结束还有几天是下个月的
				for (let i = 1; i <= startDay; i++) {
					dates.push({
						date: this.formatNum(lastDayOfLastMonth - startDay + i),
						day: weekstart + i - 1 || 7,
						month: m - 1 >= 0 ? this.formatNum(m - 1) : 12,
						year: m - 1 >= 0 ? y : y - 1
					});
				}
				for (let j = 1; j <= lastDateOfMonth; j++) {
					dates.push({
						date: this.formatNum(j),
						day: (j % 7) + firstDayOfMonth - 1 || 7,
						month: this.formatNum(m),
						year: y,
						isCurM: true //是否当前月份
					});
				}
				for (let k = 1; k <= endDay; k++) {
					dates.push({
						date: this.formatNum(k),
						day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
						month: m + 1 <= 11 ? this.formatNum(m + 1) : 0,
						year: m + 1 <= 11 ? y : y + 1
					});
				}
				this.$emit('getriqi', dates);
				return dates;
			},
			isWorkDay(y, m, d) {
				//是否工作日
				let ymd = `${y}/${m}/${d}`;
				let formatDY = new Date(ymd.replace(/-/g, '/'));
				let week = formatDY.getDay();
				if (week == 0 || week == 6) {
					return false;
				} else {
					return true;
				}
			},
			isFutureDay(y, m, d) {
				//是否未来日期
				let ymd = `${y}/${m}/${d}`;
				let formatDY = new Date(ymd.replace(/-/g, '/'));
				let showTime = formatDY.getTime();
				let curTime = new Date().getTime();
				if (showTime > curTime) {
					return true;
				} else {
					return false;
				}
			},
			// 标记日期
			isMarkDay(y, m, d) {
				let flag = false;
				for (let i = 0; i < this.markDays.length; i++) {
					let dy = `${y}-${m}-${d}`;
					if (this.markDays[i] == dy) {
						flag = true;
						break;
					}
				}
				return flag;
			},
			isToday(y, m, d) {
				let checkD = y + '-' + m + '-' + d;
				let today = this.getToday().date;
				if (checkD == today) {
					return true;
				} else {
					return false;
				}
			},
			// 展开收起
			toggle() {
				this.monthOpen = !this.monthOpen;
				if (this.monthOpen) {
					this.positionTop = 0;
				} else {
					if (this.dayIndex == -1) {
						for (let i in this.dates) {
							if (this.dates[i].date == this.Dday) {
								this.dayIndex = i;
							}
						}
						this.positionTop = -((Math.ceil((Number(this.dayIndex) + 1) / 7) || 1) - 1) * 90;
					} else {
						this.positionTop = -((Math.ceil((Number(this.dayIndex) + 1) / 7) || 1) - 1) * 90;
					}
				}
				this.$emit('dateToggle', this.monthOpen);
			},
			// 点击回调
			selectOne(i, event, index) {
				this.dayIndex = index;
				let date = `${i.year}-${i.month}-${i.date}`;
				let selectD = new Date(date).getTime();
				let curTime = new Date().getTime();
				let week = new Date(date).getDay();
				let weekText = ['日', '一', '二', '三', '四', '五', '六'];
				let formatWeek = '星期' + weekText[week];
				let response = {
					date: date,
					week: formatWeek
				};
				// if (!i.isCurM) {
				// console.log('不在当前月范围内');
				// return false;
				// }
				if (selectD > curTime) {
					if (this.disabledAfter) {
						return false;
					} else {
						this.choose = date;
						this.$emit('onDayClick', response);
					}
				} else {
					this.choose = date;
					this.$emit('onDayClick', response);
				}
			},
			//改变年月
			changYearMonth(y, m) {
				this.dates = this.monthDay(y, m);
				this.y = y;
				this.m = m;
			},
			changeMonth(type) {
				if (type == 'pre') {
					if (this.m + 1 == 2) {
						this.m = 12;
						this.y = this.y - 1;
					} else {
						this.m = this.m - 1;
					}
				} else {
					if (this.m + 1 == 13) {
						this.m = 1;
						this.y = this.y + 1;
					} else {
						this.m = this.m + 1;
					}
				}
				this.dates = this.monthDay(this.y, this.m);
				// console.log(this.y, this.m);
				var mo = {
					"nian": this.y,
					"yue": this.m,
				}
				this.$emit('changeMonth', mo);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.calendar-wrapper {
		color: #bbb7b7;
		font-size: 28rpx;
		text-align: center;
		background-color: #ffffff;
		border-radius: 8rpx;
		// padding-bottom: 10rpx;

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 88rpx;
			color: #000000;
			font-family: SF Pro Text;
			font-size: 32rpx;
			font-weight: bold;
			padding: 0 20rpx;
			box-sizing: border-box;
			// border-bottom: 2rpx solid #f2f2f2;

			.pre,
			.next {
				color: #4d7df9;
				font-size: 28rpx;
				font-weight: normal;
				padding: 8rpx 15rpx;
				border-radius: 10rpx;

				image {
					width: 30rpx;
					height: 30rpx;
				}
			}

			.pre {
				margin-right: 30rpx;

				image {
					transform: rotate(180deg);
				}
			}

			.next {
				margin-left: 30rpx;
			}
		}

		.week {
			display: flex;
			align-items: center;
			height: 80rpx;
			// border-bottom: 1rpx solid rgba(255, 255, 255, 0.2);
			border-bottom: 2rpx solid #f4f4f4;

			view {
				flex: 1;
			}
		}

		.content {
			position: relative;
			overflow: hidden;
			// transition: 0.3s;
			padding-bottom: 20rpx;

			.days {
				// transition: 0.3s;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				position: relative;

				.item {
					position: relative;
					display: block;
					height: 90rpx;
					width: calc(100% / 7);
					padding-top: 20rpx;
					box-sizing: border-box;

					.day {
						font-style: normal;
						display: inline-block;
						vertical-align: middle;
						width: 55rpx;
						height: 55rpx;
						line-height: 55rpx;
						overflow: hidden;
						border-radius: 55rpx;
						color: #000000;

						&.nolm {
							// color: #ffffff;
							color: #cccccc !important;
							opacity: 1;
						}

						&.choose {
							background-color: #6da6bd;
							color: #ffffff !important;
						}

					}

					.isWorkDay {
						color: #000000;
					}

					.notSigned {
						font-style: normal;
						width: 10rpx;
						height: 10rpx;
						background-image: linear-gradient(180deg, #5a92cd 0%, #2e599e 100%);
						border-radius: 10rpx;
						position: absolute;
						left: 50%;
						bottom: 0;
						pointer-events: none;
					}

					.today {
						color: #6da6bd;
					}

					.workDay {
						font-style: normal;
						width: 10rpx;
						height: 10rpx;
						// background: #4d7df9;
						border-radius: 10rpx;
						position: absolute;
						left: 50%;
						bottom: 0;
						pointer-events: none;
					}

					.markDay {
						font-style: normal;
						width: 10rpx;
						height: 10rpx;
						background-image: linear-gradient(180deg, #5a92cd 0%, #2e599e 100%);
						border-radius: 10rpx;
						position: absolute;
						left: 50%;
						bottom: -0rpx;
						margin-left: -5rpx;
						pointer-events: none;
					}

					.today-text {
						font-style: normal;
						display: inline-block;
						vertical-align: middle;
						width: 55rpx;
						height: 55rpx;
						line-height: 55rpx;
						overflow: hidden;
						border-radius: 55rpx;
						background-color: #6da6bd;
						color: #ffffff;
						margin-top: -100rpx;
					}
				}
			}

			.bgText {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				font-size: 340rpx;
				color: rgb(248, 250, 251);
				font-weight: bold;
				font-family: SF Pro Text;
			}
		}

		.hide {
			height: 80rpx !important;
		}

		.weektoggle {
			width: 50rpx;
			height: 62rpx;
			position: relative;
			bottom: 0;
			transform: rotate(90deg);
			// transition: 0.3s;
			left: 50%;
			margin-left: -22.5rpx;

			&.down {
				transform: rotate(-90deg);
				// bottom: 10rpx;
			}
		}
	}

	.week-day {
		color: #6da6bd;
	}

	.showKg {
		// background-color: rgba(0, 0, 0, 0);
		width: 100%;
		height: 30rpx;
		position: relative;

		.zuosanjiao {
			position: absolute;
			left: 236rpx;
			bottom: -43rpx;
			width: 0px;
			height: 0px;
			border-top: 37rpx solid transparent;
			border-right: -28rpx solid transparent;
			border-bottom: 23rpx solid #ffffff;
			border-left: 30rpx solid transparent;
			transform: rotate(-90deg);
		}

		.yousanjiao {
			position: absolute;
			left: 421rpx;
			bottom: -43rpx;
			width: 0px;
			height: 0px;
			border-top: 37rpx solid transparent;
			border-right: -28rpx solid transparent;
			border-bottom: 23rpx solid #ffffff;
			border-left: 30rpx solid transparent;
			transform: rotateY(180deg) rotate(-90deg);
		}

		.showKgNr {
			width: 128rpx;
			height: 30rpx;
			background-color: #ffffff;
			position: absolute;
			bottom: -30rpx;
			left: 50%;
			margin-left: -64rpx;
			display: flex;
			align-items: center;
			justify-content: center;


			>image {
				width: 80%;
				height: 50rpx;
			}
		}
	}
</style>
