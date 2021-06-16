<template>
	<view class="contentPage">
		<!-- 背景色 -->
		<div class="indexBg"></div>
		<!-- 首页内容 -->
		<div class="indexEle">
			<div class="indexElefixed" style="position: fixed;left: 0;top: 0;width: 100%;"
				:style="{'height':TopEleHeight+'rpx'}">
				<!-- 临时密码 -->
				<div class="linshiPasdEle">
					<div>
						<p>RTS临时密码</p>
						<p>有效期24小时</p>
					</div>
					<div>
						<div v-for="(item,index) in pasdValue" :key="index" :class="pasdValueKg?'':'xinhao'">{{item}}
						</div>
					</div>
					<div class="flex" @click="shengcheng()">生成</div>
				</div>
				<!-- 选择日历 -->
				<div class="calendarEle flex">
					<ren-calendar ref='ren' :markDays='markDays' :headerBar='true' @onDayClick='onDayClick'
						@changeMonth="changeMonth" @getriqi='getriqi' @dateToggle="dateToggle"></ren-calendar>
				</div>
			</div>

			<div
				:style="{'width':'100%','margin-top':TopEleHeight + 'rpx','height':'calc(100vh - '+TopEleHeight+'rpx)','overflow':'auto'}">
				<scroll-view scroll-y="true" @scroll="scrollList" style="width:100%;height:100%;"
					:refresher-enabled="true" :refresher-triggered="refresherEnabledKg"
					@refresherrefresh="refresherpullingList" @refresherrestore="onRestore" @refresherabort="onAbort">
					<!-- 生日学员 -->
					<div class="birthdayStudentEle" v-if="xueyuanshengri.length != 0">
						<div>
							<image src="../../static/img/icon_birthday_homepage.png" mode="widthFix"></image>
							<div>
								<p>生日学员</p>
								<div @click="to_detail">详情
									<image src="../../static/img/icon_more_details.png" mode="widthFix"></image>
								</div>
							</div>
						</div>
						<!-- birthday -->
						<div>
							<span v-for="(item,index) in xueyuanshengri" :key="index">{{item.name}}</span>
						</div>
					</div>
					<!-- ；列表 -->
					<div class="indexListNo" v-if="classList.length == 0">
						<image src="../../static/img/nodatabg.png" mode="widthFix"></image>
						<p>没有课程，好好休息吧~</p>
					</div>
					<div style="width:100%;">
						<div class="indexListEle" v-for="(item,index) in classList" :key="index">
							<!-- <image src="../../static/img/icon_thinking_myclass_1.png" mode="widthFix"></image> -->
							<image src="../../static/img/icon_thinking_myclass_1.png" mode="widthFix"
								v-if="item.class_date + item.end_time < Format('yyyy-MM-dd HH:mm:ss')"></image>
							<image v-else
								:src="item.subject == '4'?'../../static/img/icon_thinking_myclass_2.png':item.subject == '2'?'../../static/img/icon_thinking_myclass_4.png':'../../static/img/icon_thinking_myclass_3.png'"
								mode="widthFix"></image>
							<div class="indexListEleT"
								@click="to_kaoqin(item.school_id,item.curriculum_no,item.student_count,(item.student_count?parseInt(item.attendance_count / item.student_count * 100):0),item.title)">
								<div>
									<p>{{item.start_time}}</p>
									<p>- {{item.end_time}}</p>
								</div>
								<div>
									<p>{{item.title || "暂无课件"}}</p>
									<p
										:class="item.class_date + item.end_time < Format('yyyy-MM-dd HH:mm:ss') ? 'hui' : item.subject == '4'?'lan':item.subject == '2'?'zi':'cheng'">
										<span>{{item.subject_name}}</span>
										<span>{{item.grade_name}}</span>
										<span>{{item.term_name}}</span>
										<span>{{item.clazz_type_name}}</span>
									</p>
								</div>
								<div>
									<p>{{item.student_count}}</p>
									<p>学员人数</p>
								</div>
								<div>
									<p>{{item.student_count?parseInt(item.attendance_count / item.student_count * 100):0}}%
									</p>
									<p>出勤率</p>
								</div>
							</div>
							<div class="indexListEleB">
								<div>第{{item.curriculum_no}}/{{item.total_lesson_number}}课</div>
								<div>
									<div @click="to_jiaoan(item.jy_file_path)">
										<image
											:src="item.class_date + item.end_time < Format('yyyy-MM-dd HH:mm:ss') ?'../../static/img/icon_teachingplan_grey.png':'../../static/img/icon_teachingplan.png'"
											mode="widthFix">
										</image>
										电子教案
									</div>
									<div @click="to_video(item.v_file_path)">
										<image
											:src="item.class_date + item.end_time < Format('yyyy-MM-dd HH:mm:ss') ?'../../static/img/icon_video_grey.png':'../../static/img/icon_video.png'"
											mode="widthFix"></image>
										说课视频
									</div>
									<div @click="to_work(item.homework_file_path)">
										<image
											:src="item.class_date + item.end_time < Format('yyyy-MM-dd HH:mm:ss') ?'../../static/img/icon_homework_grey.png':'../../static/img/icon_homework.png'"
											mode="widthFix"></image>
										课后作业
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="noDataEle flex" v-if="classList.length != 0">没有更多课程喽</div>
				</scroll-view>
			</div>
		</div>
	</view>
</template>

<script>
	var nowDate = new Date();
	var cloneNowDate = new Date();
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				markDays: [], //标记的日期
				pasdValue: "✱✱✱✱", //临时密码
				pasdValueKg: false,
				classList: [],
				xueyuanshengri: [],
				page: 1,
				dayC: 0,
				dangqianDate: [],
				dangqianStartDate: "",
				dangqianEndDate: "",
				TopEleHeight: 882,
				TopEleHeightD: 882,
				scroll: 0,
				refresherEnabledKg: true,
				dateToggleKg: true,
			}
		},
		onShow() {
			if (uni.getStorageSync("token")) {
				this.SchedulesByDate();
				this.KcSr(this.getTodayDate());
				this.get_check_subscribe();
			}
		},
		onLoad() {

		},
		methods: {
			...mapMutations(['cctoken', 'ccadmin', 'login']),
			// 是否绑定微信通知
			async get_check_subscribe() {
				try {
					const res = await this.$api.check_subscribe();
					this.login(res.data.data);
				} catch (e) {
					console.log(e)
				}
			},
			// 获取所能看到的日期
			getriqi(data) {
				this.dangqianDate = [];
				for (let i in data) {
					this.dangqianDate.push(data[i].year + "-" + data[i].month + "-" + data[i].date)
				}
				this.dangqianStartDate = this.dangqianDate[0];
				this.dangqianEndDate = this.dangqianDate[this.dangqianDate.length - 1];
			},
			// 获取顶部临时密码
			async RTSPasd() {
				try {
					const res = await this.$api.RTSPasd();
					this.pasdValue = res.data;
					this.pasdValueKg = true;
				} catch (e) {
					console.log(e)
				}
			},
			// 根据日期范围查找是否有课
			async SchedulesByDate(Moon) {
				try {
					const res = await this.$api.getSchedulesByDate({
						begin_time: this.dangqianStartDate,
						end_time: this.dangqianEndDate
					});
					this.getSDay(res.data.has_class_date_value, this.markDays, this.dangqianDate);
					res.data.has_class_date_value.length > 35 ? this.TopEleHeightD = 972 : this.TopEleHeightD =
					882; //大数字是多一行的高度  小数字是正常高度
					if (this.dateToggleKg) {
						this.TopEleHeight = this.TopEleHeightD;
					} else {
						this.TopEleHeight = 492;
					}
				} catch (e) {
					console.log(e)
				}
			},
			// 教师当天默认课表及生日学员获取
			async KcSr(date) {
				try {
					const res = await this.$api.getKcSr({
						query_date: date,
					});
					this.classList = res.data.schedules;
					this.xueyuanshengri = res.data.birthday_list;
				} catch (e) {
					console.log(e)
				}
			},
			// 获取带标记的天数
			getSDay(IsD, days, allday) {
				for (let i in IsD) {
					if (IsD[i] == 1) {
						days.push(allday[i]);
					}
				}
			},
			// 日历收起展开
			dateToggle(data) {
				this.dateToggleKg = data;
				if (this.dateToggleKg) {
					this.TopEleHeight = this.TopEleHeightD;
				} else {
					this.TopEleHeight = 492;
				}
			},
			// 滑动列表
			scrollList() {
				this.TopEleHeight = 492;
				this.dateToggleKg = false;
				uni.$emit('scrollHd', {
					msg: true
				})
			},
			// 下滑列表loading
			refresherpullingList() {
				this.refresherEnabledKg = false;
				this.KcSr(this.dayC ? this.dayC : this.getTodayDate())
			},
			onRestore() {
				this.refresherEnabledKg = 'restore'; // 需要重置
			},
			onAbort() {},
			// 生成密码
			shengcheng() {
				this.RTSPasd();
			},
			// 切换月份
			changeMonth(data) {
				try {
					// this.getriqi();
					this.SchedulesByDate();
				} catch (e) {
					console.log(e)
				}
			},
			// 点击某天
			onDayClick(data) {
				this.KcSr(data.date)
				this.dayC = data.date;
			},
			// 学员生日详情
			to_detail() {
				uni.navigateTo({
					url: "../birthdayStudentList/birthdayStudentList?date=" + (this.dayC ? this.dayC : this
						.getTodayDate())
				})
			},
			// 查看考勤
			to_kaoqin(id, cur, student_count, attendance_count, title) {
				uni.navigateTo({
					url: "../attendanceRecord/attendanceRecord?clazz_id=" + id + "&curriculum_no=" + cur +
						"&student_count=" + student_count + "&attendance_count=" + attendance_count +
						"&title=" +
						title
				})
			},
			// 查看电子教案
			to_jiaoan(url) {
				uni.navigateTo({
					url: "../webview/webview?url=" + encodeURIComponent("https://s.reallyedu.com/" + url)
				})
			},
			// 查案说课视频
			to_video(video) {
				uni.navigateTo({
					url: "../video/video?video=https://s.reallyedu.com/" + video
				})
			},
			// 查看课后作业
			to_work(url) {
				uni.navigateTo({
					url: "../webview/webview?url=" + encodeURIComponent("https://s.reallyedu.com/" + url)
				})
			},
			// 获取标记天数
			getSignMonth(M, days, Moon) {
				var D, y, m;
				D = new Date();
				y = D.getFullYear();
				m = Moon || D.getMonth() + 1;
				m = m > 9 ? m : '0' + m;
				for (let i in M) {
					if (M[i] == 1) {
						days.push(y + "-" + m + "-" + ((i * 1 + 1) > 9 ? (i * 1 + 1) :
							'0' + (i * 1 + 1)))
					}
				}
			},
			// 自定义月 cloneNowDate.setDate 获取月的最后一天  传的数值为月  不传则为当前月
			getCustomMonth(Moom) {
				var fullYear = nowDate.getFullYear();
				var month = Moom || nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
				var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
				return endOfMonth;
			},
			// 获取每个月的第一天和最后一天  Moom传为自定义月  不传为当前月
			getFullDate(targetDate, Moon) {
				var D, y, m, d;
				if (targetDate) {
					D = new Date(targetDate);
					y = D.getFullYear();
					m = Moon || D.getMonth() + 1;
					d = D.getDate();
				} else {
					y = fullYear;
					m = month;
					d = date;
				}
				m = m > 9 ? m : '0' + m;
				d = d > 9 ? d : '0' + d;
				return y + '-' + m + '-' + d;
			},
			// 获取当天年月日
			getTodayDate() {
				var D, y, m, d;
				D = new Date();
				y = D.getFullYear();
				m = D.getMonth() + 1;
				d = D.getDate();
				m = m > 9 ? m : '0' + m;
				d = d > 9 ? d : '0' + d;
				return y + '-' + m + '-' + d;
			},
			// 获取当前时间
			Format(fmt) {
				var d = new Date();
				var o = {
					"M+": d.getMonth() + 1,
					"d+": d.getDate(),
					"H+": d.getHours(),
					"m+": d.getMinutes(),
					"s+": d.getSeconds(),
					"q+": Math.floor((d.getMonth() + 3) / 3),
					"S": d.getMilliseconds()
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1
					.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
						(o[
							k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			},
		},
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
