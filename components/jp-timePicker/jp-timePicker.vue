<template>
	<view class="date-time-picker" v-if="visible">
		<view class="date-time-mask" @click.stop="hide"></view>
		<view class="date-time-container" @click.stop="handleEvent">
			<view class="jp-picker" v-if="0">
				<view @click="gettype('year')" class="jp-picker-year" :class="type=='year'?'jp-picker-xzr':''">按年</view>
				<view @click="gettype('year-month')" class="jp-picker-year-month"
					:class="type=='year-month'?'jp-picker-xzr':''">按月</view>
				<view @click="gettype('date')" class="jp-picker-date" :class="type=='date'?'jp-picker-xzr':''">按日</view>
			</view>
			<div class="riqiBox">
				<div>
					<p>开始日期</p>
					<p>{{startDate}}</p>
				</div>
				<p></p>
				<div>
					<p>结束日期</p>
					<p>{{endDate}}</p>
				</div>
			</div>
			<div class="picker-view-box">
				<div class="picker-view-boxT"></div>
				<div class="picker-view-boxB"></div>
				<div class="picker-view-boxC"></div>
				<picker-view class="picker-view" :indicator-style="indicatorStyle" :value="dateTime"
					@change="dateTimePickerChange" mask-style="background-color:rgba(0,0,0,0);">
					<picker-view-column data-id='year' v-if='isShowYear'>
						<view class="item" v-for="(item,index) in years" :key="index"
							:style="{'color': formatDateArrays[0]==item?'#000000':''}">
							{{item}}年
						</view>
					</picker-view-column>
					<picker-view-column data-id='month' v-if='isShowMonth'>
						<view class="item" v-for="(item,index) in months" :key="index"
							:style="{'color': formatDateArrays[1]==item?'#000000':''}">{{item}}月
						</view>
					</picker-view-column>
					<picker-view-column data-id='day' v-if='isShowDay'>
						<view class="item" v-for="(item,index) in days" :key="index"
							:style="{'color': formatDateArrays[2]==item?'#000000':''}">{{item}}日
						</view>
					</picker-view-column>
				</picker-view>
			</div>

			<view class="time-picker-tool">
				<view class="cancel-btn" @click.stop="cancel">
					<text>取消</text>
				</view>
				<view class="confirm-btn" @click.stop="confirm">
					<text>确定</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getOneMonthDays,
		getTimeArray,
		addZero,
		getIndexOfArray
	} from './uitls/util.js'
	export default {
		name: 'jp-timePicker',
		props: {
			startYear: {
				type: Number,
				default: 1900
			},
			endYear: {
				type: Number,
				default: new Date().getFullYear() + 100
			},
			datestring: {
				type: String,
				default: ''
			},
			datestype: {
				type: String,
				default: 'year'
			},
		},
		data() {
			return {
				formatDateArrays: [],
				visible: false,
				dateTime: [],
				days: [],
				indicatorStyle: `height: 40px;`,
				// indicatorStyle: {
				// 	background: 'rgba(255,255,255,0)',
				// 	height: '40px',
				// 	color: '#000000 !important',

				// },
				indicatorStyleString: '',
				type: 'year',
				startDate: "未选择",
				endDate: "未选择",
			}
		},
		watch: {
			datestype() {
				this.type = this.datestype
			},
			// indicatorStyle(val) {
			// 	this.getIndicatorStyle();
			// },
			type() {
				this.initDateTime()
			},
			datestring() {
				this.initDateTime()
			}
		},
		computed: {
			years() {
				return this.initTimeData(this.endYear, this.startYear);
			},
			isShowYear() {
				return this.type !== 'time' && this.type !== 'hour-minute';
			},
			months() {
				return this.initTimeData(12, 1);
			},
			isShowMonth() {
				return this.type !== 'year' && this.type !== 'time' && this.type !== 'hour-minute';
			},
			isShowDay() {
				return this.type === 'date' || this.type === 'datetime' || this.type === 'datetime-all';
			},
			hours() {
				return this.initTimeData(23, 0);
			},
			isShowHour() {
				return this.type !== 'date' && this.type !== 'year-month' && this.type !== 'year';
			},
			minutes() {
				return this.initTimeData(59, 0);
			},
			isShowMinute() {
				return this.type !== 'date' && this.type !== 'year-month' && this.type !== 'year';
			},
			seconds() {
				return this.initTimeData(59, 0);
			},
			isShowSecond() {
				return this.type === 'datetime-all' || this.type === 'time';
			}
		},
		methods: {
			gettype(type) {
				this.type = type
			},
			// getIndicatorStyle() {
			// 	if (this.indicatorStyle) {
			// 		for (let key in this.indicatorStyle) {
			// 			this.indicatorStyleString += `${key}:${this.indicatorStyle[key]};`
			// 		}
			// 	}
			// },
			handleEvent() {
				return;
			},
			cancel() {
				this.hide();
			},
			confirm() {
				this.formatDate();
				this.hide();
			},
			show() {
				this.visible = true;
			},
			hide() {
				this.visible = false;
			},
			initDateTime() {
				let value;
				if (this.datestring.length > 0) {
					if (this.type === 'year') {
						value = new Date(this.datestring, 0);
					} else if (this.type === 'time' || this.type === 'hour-minute') {
						let date = new Date();
						let ary = this.datestring.split(':');
						ary.forEach((item, index) => {
							if (index == 0) {
								date.setHours(item)
							} else if (index == 1) {
								date.setMinutes(item)
							} else if (index == 2) {
								date.setSeconds(item)
							}
						})
						value = date;
					} else {
						value = new Date(this.datestring.replace(/-/g, '/'));
					}

				} else {
					value = new Date();
				}
				let len, timeArray, index;
				let array = getTimeArray(value);
				let [year, month, day, hour, minute, second] = array;
				this.days = this.initTimeData(getOneMonthDays(year, month), 1);
				let names = ['year', 'month', 'day', 'hour', 'minute', 'second'];
				switch (this.type) {
					case "date":
						len = 3;
						break;
					case "year-month":
						len = 2;
						break;
					case "year":
						len = 1;
						break;
					case "datetime":
						len = 5;
						break;
					case "datetime-all":
						len = 6;
						break;
					case "time":
						len = 3;
						break;
					case "hour-minute":
						len = 2;
						break;
				}
				timeArray = new Array(len).fill(0);
				if (this.type === 'time' || this.type === 'hour-minute') {
					names = names.slice(3);
					array = array.slice(3);
				}
				timeArray = timeArray.map((item, index) => {
					const name = names[index];
					return getIndexOfArray(array[index], this[name + 's'])
				})
				this.dateTime = timeArray;

				if (this.type === 'date' || this.type === 'year-month' || this.type === 'year') {
					this.formatDateArrays = this.dateTime.map((item, index) => {
						return this[names[index] + 's'][item] < 10 ? addZero(this[names[index] + 's'][item]) :
							this[names[index] + 's'][item];
					})
				}
				// console.log(this.formatDateArrays)
			},
			initTimeData(end, start) {
				let timeArray = [];
				while (start <= end) {
					timeArray.push(start);
					start++;
				}
				return timeArray;
			},
			formatDate() {
				let names = ['year', 'month', 'day', 'hour', 'minute', 'second'];
				let dateString, formatDateArray = [];
				if (this.type === 'date' || this.type === 'year-month' || this.type === 'year') {
					formatDateArray = this.dateTime.map((item, index) => {
						return this[names[index] + 's'][item] < 10 ? addZero(this[names[index] + 's'][item]) :
							this[names[index] + 's'][item];
					})
					dateString = formatDateArray.join('-');
				}
				this.$emit('change', dateString)
			},
			dateTimePickerChange(e) {
				let columns = e.target.value;
				if (this.type === 'date' || this.type === 'datetime' || this.type === 'datetime-all') {
					if (columns[0] != this.dateTime[0]) {
						this.dateTime.splice(0, 1, columns[0]);
						this.days = this.initTimeData(getOneMonthDays(this.years[this.dateTime[0]], this.months[this
							.dateTime[1]]), 1);
						if (this.dateTime[1] == 1) {
							if (this.dateTime[2] === this.days.length - 1) {
								if (getOneMonthDays(this.years[columns[0]], this.dateTime[1]) < getOneMonthDays(this.years[
										this.dateTime[0]], this.dateTime[1])) {
									this.dateTime.splice(2, 1, this.days.length - 1)
								}
							}
						}
					} else {
						this.dateTime.splice(1, 1, columns[1]);
						this.days = this.initTimeData(getOneMonthDays(this.years[this.dateTime[0]], this.months[this
							.dateTime[1]]), 1)
						if (columns[1] != this.dateTime[1]) {
							if (this.dateTime[1] == 1) {
								if (this.dateTime[2] === this.days.length - 1) {
									if (getOneMonthDays(this.years[columns[0]], this.dateTime[1]) < getOneMonthDays(this
											.years[this.dateTime[0]],
											this.dateTime[1])) {
										this.dateTime.splice(2, 1, this.days.length - 1)
									}
								}
							} else {
								if (this.dateTime[2] > this.days.length - 1) {
									this.dateTime.splice(2, 1, this.days.length - 1)
								} else {
									this.dateTime.splice(2, 1, columns[2])
								}
							}
						} else {
							this.dateTime.splice(2, 1, columns[2])
						}
					}
					if (columns.length > 2) {
						columns.splice(3).forEach((column, index) => {
							this.dateTime.splice(index + 3, 1, column);
						})
					}
				} else {
					columns.forEach((column, index) => {
						this.dateTime.splice(index, 1, column);
					})
				}
				// if (!this.isShowToolBar) {
				// 	this.formatDate();
				// }

				let names = ['year', 'month', 'day', 'hour', 'minute', 'second'];
				this.formatDateArrays = [];
				if (this.type === 'date' || this.type === 'year-month' || this.type === 'year') {
					this.formatDateArrays = this.dateTime.map((item, index) => {
						return this[names[index] + 's'][item] < 10 ? addZero(this[names[index] + 's'][item]) :
							this[names[index] + 's'][item];
					})
				}
				// console.log(this.formatDateArrays)
			},
		},
		mounted() {
			var that = this;
			this.type = this.datestype
			// this.getIndicatorStyle();
			this.initDateTime();
			uni.$on('startDate', function(data) {
				that.startDate = data.msg;
			})
			uni.$on('endDate', function(data) {
				that.endDate = data.msg;
			})
		}
	}
</script>

<style lang='scss' scoped>
	.date-time-picker {
		.date-time-mask {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba($color: #000000, $alpha: .5);
			z-index: 100;
		}

		.jp-picker {
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 120rpx;
			font-size: 30rpx;
			color: #9dc0ce;
		}

		.jp-picker-year {
			padding: 10rpx 20rpx;
			/* border: 1px solid #9dc0ce; */
			/* border-top-left-radius: 30rpx; */
			/* border-bottom-left-radius: 30rpx; */
			height: 30rpx;
			line-height: 30rpx;
		}

		.jp-picker-year-month {
			padding: 10rpx 20rpx;
			/* border-top: 1px solid #9dc0ce; */
			/* border-bottom: 1px solid #9dc0ce; */
			height: 30rpx;
			line-height: 30rpx;
		}

		.jp-picker-date {
			padding: 10rpx 20rpx;
			/* border: 1px solid #9dc0ce; */
			/* border-top-right-radius: 30rpx; */
			/* border-bottom-right-radius: 30rpx; */
			height: 30rpx;
			line-height: 30rpx;
		}

		.jp-picker-xzr {
			/* background-color: #9dc0ce; */
			color: #fff;
		}

		.date-time-container {
			position: fixed;
			height: 740rpx;
			bottom: 0;
			right: 0;
			left: 0;
			background-color: #ffffff;
			z-index: 1000;
			display: flex;
			flex-direction: column;
			border-radius: 40rpx 40rpx 0px 0px;

			.time-picker-tool {
				height: calc(100% - 178rpx - 200px);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				padding: 0 32rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;

				.cancel-btn {
					width: 322rpx;
					height: 70rpx;
					border: 2rpx solid #999999;
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
					margin-right: 20rpx;
				}

				.confirm-btn {
					width: 322rpx;
					height: 70rpx;
					border: 2rpx solid #6da6bd;
					background-color: #6da6bd;
					color: #FFFFFF;
					border-radius: 8px;
					display: flex;
					align-items: center;
					font-size: 32rpx;
					justify-content: center;
					margin-left: 20rpx;
				}
			}

			.picker-view-box {
				width: 686rpx;
				height: 200px;
				/* background-color: #9dc0ce; */
				/* box-shadow: 80rpx 0rpx #6da6bd inset; */
				margin-left: 32rpx;
				border-radius: 8rpx;
				overflow: hidden;
				position: relative;
			}

			.picker-view-boxT {
				width: 100%;
				height: 80px;
				position: absolute;
				top: 0;
				left: 0;
				background-color: #9dc0ce;
			}

			.picker-view-boxB {
				width: 100%;
				height: 80px;
				position: absolute;
				bottom: 0;
				left: 0;
				background-color: #9dc0ce;
			}

			.picker-view-boxC {
				width: 4rpx;
				height: 80px;
				background-color: #9dc0ce;
				box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
				position: absolute;
				top: 80px;
				left: 0;
			}

			.picker-view {
				width: 686rpx;
				height: 200px;
				flex: 1;

				.item {
					height: 40px;
					font-size: 34rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #333333;
				}
			}
		}
	}

	.riqiBox {
		width: 100%;
		height: 178rpx;
		display: flex;
		align-items: center;

		>div {
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-family: PingFang SC;
		}

		>div:nth-child(1) {
			p:nth-child(1) {
				width: 170rpx;
				font-weight: 600;
				color: #6da6bd;
				font-size: 24rpx;
				line-height: 34rpx;
			}

			p:nth-child(2) {
				width: 170rpx;
				font-weight: 500;
				color: #000000;
				font-size: 28rpx;
				line-height: 40rpx;
				margin-top: 4rpx;
			}
		}

		>p:nth-child(2) {
			width: 2rpx;
			height: 92rpx;
			background-color: #e4e4e4;
		}

		>div:nth-child(3) {
			p:nth-child(1) {
				width: 170rpx;
				font-weight: 600;
				color: #999999;
				font-size: 24rpx;
				line-height: 34rpx;
			}

			p:nth-child(2) {
				width: 170rpx;
				font-weight: 500;
				color: #999999;
				font-size: 28rpx;
				line-height: 40rpx;
				margin-top: 4rpx;
			}
		}
	}
</style>
