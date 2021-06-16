<template>
	<view class="contentPage">
		<!-- 顶部信息 -->
		<div class="classListEle" ref="classListEle" :style="{'height':classListEleHeight+'rpx'}">
			<div class="classList">
				<div class="classListT">
					<div>
						<image src="../../static/img/icon_date.png" mode="widthFix"></image>
						{{classTopInfo.begin_date}}/{{classTopInfo.finish_date}}
					</div>
					<div @click="detail()">
						详情
						<image :style="{'transform':'rotate('+(detailKg?'180deg':'0deg')+')'}"
							src="../../static/img/icon_down.png" mode="widthFix"></image>
					</div>
				</div>
				<div class="classListB">
					<div class="classListBL">
						<image
							:src="classTopInfo.subject == '4'?'../../static/img/icon_chinese.png':classTopInfo.subject == '2'?'../../static/img/icon_science.png':'../../static/img/icon_thinking.png'"
							mode="widthFix"></image>
						<div>
							<p>
								<image src="../../static/img/icon_time.png" mode="widthFix"></image>
								{{classTopInfo.class_begin_time}}-{{classTopInfo.class_finish_time}}<a>{{classTopInfo.expend_class_hour_perlesson}}课时</a>
							</p>
							<p>
								<image src="../../static/img/icon_class.png" mode="widthFix"></image>
								{{classTopInfo.name}}
							</p>
							<p :class="classTopInfo.subject == '4'?'lan':classTopInfo.subject == '2'?'zi':'cheng'">
								<span>{{classTopInfo.class_type_display}}</span>
								<span>{{classTopInfo.subject_display}}</span>
								<span>{{classTopInfo.term_display}}</span>
								<span>{{classTopInfo.grade_display}}</span>
							</p>
						</div>
					</div>
					<div class="classListBR flex"
						:class="idx == '0' ? 'huang':idx == '1' ? 'lv':idx == '2' ? 'hong':'hui'">
						{{idx == '0' ? '未开课':idx == '1' ? '开课中':idx == '2' ? '已结课':'已关闭'}}
					</div>
				</div>
				<div class="classListX" :style="{'height':detailKg?'160rpx':'0'}">
					<div class="classListXT" v-if="detailKg">
						<div class="jinduBar">
							<div class='circle-container'>
								<div class="circle-item">
									<div class="circle-left-wrap">
										<div class="left"
											:style="{'transform': 'rotate('+((classTopInfo.expend_class_hour_perlesson?parseInt((classTopInfo.total_lesson_number - classTopInfo.expend_class_hour_perlesson) / classTopInfo.total_lesson_number * 100):0)>=50?(360*(((classTopInfo.expend_class_hour_perlesson?parseInt((classTopInfo.total_lesson_number - classTopInfo.expend_class_hour_perlesson) / classTopInfo.total_lesson_number * 100):0)-50)/100)):0)+'deg)'}">
										</div>
									</div>
									<div class="circle-right-wrap">
										<div class="right"
											:style="{'transform': 'rotate('+((classTopInfo.expend_class_hour_perlesson?parseInt((classTopInfo.total_lesson_number - classTopInfo.expend_class_hour_perlesson) / classTopInfo.total_lesson_number * 100):0)>=50?180:(360*((classTopInfo.expend_class_hour_perlesson?parseInt((classTopInfo.total_lesson_number - classTopInfo.expend_class_hour_perlesson) / classTopInfo.total_lesson_number * 100):0)/100)))+'deg)'}">
										</div>
									</div>
									<div class='mask'></div>
									<div class="jinduInfo flex">
										{{classTopInfo.total_lesson_number - classTopInfo.expend_class_hour_perlesson}}/{{classTopInfo.total_lesson_number}}
									</div>
								</div>
							</div>
							<div>剩余/总课次</div>
						</div>
					</div>
					<div class="classListXT" v-if="detailKg">
						<div class="jinduBar">
							<div class='circle-container'>
								<div class="circle-item">
									<div class="circle-left-wrap">
										<div class="left"
											:style="{'transform': 'rotate('+((classTopInfo.student_count?parseInt(classTopInfo.student_count / classTopInfo.student_limit * 100):0)>=50?(360*(((classTopInfo.student_count?parseInt(classTopInfo.student_count / classTopInfo.student_limit * 100):0)-50)/100)):0)+'deg)'}">
										</div>
									</div>
									<div class="circle-right-wrap">
										<div class="right"
											:style="{'transform': 'rotate('+((classTopInfo.student_count?parseInt(classTopInfo.student_count / classTopInfo.student_limit * 100):0)>=50?180:(360*((classTopInfo.student_count?parseInt(classTopInfo.student_count / classTopInfo.student_limit * 100):0)/100)))+'deg)'}">
										</div>
									</div>
									<div class='mask'></div>
									<div class="jinduInfo flex">
										{{classTopInfo.student_count}}/{{classTopInfo.student_limit}}
									</div>
								</div>
							</div>
							<div>学员人数/限额</div>
						</div>
					</div>
					<div class="classListXT" v-if="detailKg">
						<div class="jinduBar">
							<div class='circle-container'>
								<div class="circle-item">
									<div class="circle-left-wrap">
										<div class="left"
											:style="{'transform': 'rotate('+((classTopInfo.student_attence?parseInt(classTopInfo.student_attence / classTopInfo.student_total * 100):0)>=50?(360*(((classTopInfo.student_attence?parseInt(classTopInfo.student_attence / classTopInfo.student_total * 100):0)-50)/100)):0)+'deg)'}">
										</div>
									</div>
									<div class="circle-right-wrap">
										<div class="right"
											:style="{'transform': 'rotate('+((classTopInfo.student_attence?parseInt(classTopInfo.student_attence / classTopInfo.student_total * 100):0)>=50?180:(360*((classTopInfo.student_attence?parseInt(classTopInfo.student_attence / classTopInfo.student_total * 100):0)/100)))+'deg)'}">
										</div>
									</div>
									<div class='mask'></div>
									<div class="jinduInfo flex">
										{{classTopInfo.student_attence}}/{{classTopInfo.student_total}}
									</div>
								</div>
							</div>
							<div>
								平均出勤率:{{classTopInfo.student_attence?parseInt(classTopInfo.student_attence / classTopInfo.student_total * 100):0}}%
							</div>
						</div>
					</div>
				</div>
				<div class="classTabEle">
					<div v-for="(item,index) in tabList" :key="index" :class="item.sel ? 'sel' : ''"
						@click="tabClick(index)">
						{{item.name}}
					</div>
					<p :style="{'left': 'calc(100% - '+( tabBtnLeft )+' - (33.333% / 2) - 64rpx)'}"></p>
				</div>
			</div>
		</div>
		<!-- 主要列表信息 -->
		<div class="classListInfo" :style="{'margin-top':classListEleHeight + 'rpx'}">
			<!-- 班级课表 -->
			<div class="classTimetable" v-if="classListIdx == 0">
				<div style="width: 100%;">
					<div class="indexListEle" v-for="(item,index) in classTableList" :key="index">
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
				<div class="noDataEle flex" v-if="classTableList != 0">我是有底线的</div>
			</div>
			<!-- 作业报告 -->
			<div class="classTimetable" v-if="classListIdx == 1">
				<div class="workBaogaoEle">
					<div class="workBaogao" v-for="(item,index) in homework_list" :key="index">
						<div>{{index+1}}:{{item.homework.name || "暂无作业"}}</div>
						<div
							@click="item.complete_count == 0 ? tishi() : to_baogao(clazz_id,item.curriculum_no,((index+1) + ':' + item.homework.name))">
							已完/未完：{{item.complete_count}}/{{item.curriculum_no}}
							<image src="../../static/img/jiantou.png" mode="widthFix">
							</image>
						</div>
					</div>
				</div>
				<div class="indexListNo" v-if="homework_list.length == 0">
					<image src="../../static/img/nodatabg.png" mode="widthFix"></image>
					<p>暂无作业报告哦~</p>
				</div>
				<div class="noDataEle flex" v-if="homework_list != 0">我是有底线的</div>
			</div>
			<!-- 班级学员 -->
			<div class="classTimetable" v-if="classListIdx == 2">
				<div class="classXueyuanList">
					<div v-for="(item,index) in classXyList" :key="index">
						<div>
							<div>
								<image
									:src="item.student.gender == 0?'../../static/img/icon_girl.png':'../../static/img/icon_boy.png'"
									mode="widthFix"></image>
								{{item.student.name}}
							</div>
							<div v-if="item.student.student_parents.length >= 2" @click="showJz(index)">
								<p>{{item.sel ? '收起':'展开'}}</p>
								<image :style="{'transform':'rotate('+(item.sel?'90deg':'90deg')+')'}"
									src="../../static/img/jiantou.png" mode="widthFix"></image>
							</div>
						</div>
						<div :style="{'height':item.sel ? 'auto':'50rpx'}">
							<div v-for="(items,indexs) in item.student.student_parents" :key="indexs">
								<span class="nicheng flex"
									:class="items.relation_type == 1 || items.relation_type == 3 || items.relation_type == 5 ? 'nichengL':''">{{items.relation_type}}</span>
								<p>家长：{{items.name}} {{items.mobile}}</p>
								<image @click="tel(items.mobile)" src="../../static/img/icon_telephone.png"
									mode="widthFix"></image>
							</div>
						</div>
					</div>
				</div>
				<div class="indexListNo" style="border: none;" v-if="classXyList.length == 0">
					<image src="../../static/img/nodatabg.png" mode="widthFix"></image>
					<p>暂无班级学员哦~</p>
				</div>
				<div class="noDataEle flex" v-if="classXyList != 0">我是有底线的</div>
			</div>
		</div>
		<div class="loadingmove">
			{{loadingtext?'我是有底线的':'加载中'}}
			<image v-if="!loadingtext" class="liadingimg" src="../../static/img/loading.gif" mode="widthFix">
			</image>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				percent: 0, //进度条百分比
				tabBtnLeft: '66.666%',
				tabList: [{
					name: "班级课表",
					sel: true,
					left: '66.666%'
				}, {
					name: "作业报告",
					sel: false,
					left: '33.333%'
				}, {
					name: "班级学员",
					sel: false,
					left: '0%'
				}], //tab
				detailKg: false,
				classListIdx: 0,
				loadingtext: 0,
				classXyList: [],
				classListEleHeight: 340, //顶部高度
				clazz_id: '', //获取班级课表数据的id值
				scroll: 0,
				classTableList: [],
				classTopInfo: {},
				homework_list: [],
				idx: 0,
			};
		},
		onLoad(e) {
			this.clazz_id = e.id;
			this.idx = e.idx;
			this.classTopInfo = uni.getStorageSync("classData");
			uni.setNavigationBarTitle({
				title: this.classTopInfo.name
			})
			this.curriculumList();
			this.classxueyuan();
			this.workbaogao();
		},
		mounted() {

		},
		methods: {
			// 班级-班级详情-课表列表
			async curriculumList() {
				try {
					const res = await this.$api.getcurriculumList({
						clazz_id: this.clazz_id,
					});
					this.classTableList = res.data.curriculumSchedule_list;
				} catch (e) {
					console.log(e)
				}
			},
			// 班级-班级详情-班级学员
			async classxueyuan() {
				try {
					const res = await this.$api.getstudent({
						clazz_id: this.clazz_id,
					});
					this.classXyList = res.data.student_list;
					for (let i in this.classXyList) {
						this.classXyList[i].sel = false;
					}
				} catch (e) {
					console.log(e)
				}
			},
			// 班级-班级详情-班级学员
			async workbaogao() {
				try {
					const res = await this.$api.getworkbaogao({
						clazz_id: this.clazz_id,
					});
					this.homework_list = res.data.homework_list;
				} catch (e) {
					console.log(e)
				}
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
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[
						k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			},
			// 点击切换tab
			tabClick(index) {
				for (let i in this.tabList) {
					this.tabList[i].sel = false;
				}
				this.tabList[index].sel = true;
				this.tabBtnLeft = this.tabList[index].left;
				this.classListIdx = index;
			},
			// 查看作业报告
			to_baogao(id, kc, name) {
				uni.navigateTo({
					url: "../workBaogaoDetail/workBaogaoDetail?id=" + id + "&kc=" + kc + "&name=" + name
				})
			},
			// 查看全部家长
			showJz(index) {
				this.classXyList[index].sel = !this.classXyList[index].sel;
				this.$forceUpdate();
			},
			// 查看数据详情
			detail() {
				this.detailKg = !this.detailKg;
				this.classListEleHeight = this.classListEleHeight == '340' ? '500' : '340';
			},
			// 拨打电话
			tel(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
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
			tishi() {
				this.$gj_api.showicon("暂无学员提交作业", "none");
			},
		},
		onReachBottom() {
			setTimeout(() => {
				if (!this.loadingtext) {
					this.page = this.page += 1;
				}
			}, 500)
		},
		onPageScroll(e) {
			let that = this;
			if (that.scroll < e.scrollTop) {
				that.detailKg = false;
				that.classListEleHeight = '340'
			} else {
				// console.log("向上滚动");
			}
			that.scroll = e.scrollTop;
		},
	}
</script>

<style lang="scss">
	@import './classList.scss';

	.circle-item {
		background-color: #99cde2 !important;
	}
</style>
