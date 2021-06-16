<template>
	<view class="contentPage">
		<div class="topEle">
			<!-- 顶部按钮 -->
			<div class="classTabEle">
				<div v-for="(item,index) in tabList" :key="index" :class="item.sel ? 'sel' : ''"
					@click="tabClick(index,item.id)">
					{{item.name}}
				</div>
				<p :style="{'left': 'calc(100% - '+( tabBtnLeft )+' - (25% / 2) - 20rpx)'}"></p>
			</div>
			<!-- 数据统计 -->
			<div class="numStatistics">
				<div>共{{classList.length}}条数据，已加载{{classList.length}}条</div>
				<div class="flex" @click="screenEleKg = true">筛选<image src="../../static/img/icon_screen.png"
						mode="widthFix"></image>
				</div>
			</div>
		</div>
		<!-- 列表 -->
		<div class="classListEle" style="margin-top: 206rpx;">
			<div class="classList" v-for="(item,index) in classList" :key="index">
				<div class="classListT">
					<image src="../../static/img/icon_date.png" mode="widthFix"></image>
					{{item.begin_date}}/{{item.finish_date}}
				</div>
				<div class="classListB" @click="to_classList(item.id,index)">
					<div class="classListBL">
						<image
							:src="item.subject == '4'?'../../static/img/icon_chinese.png':item.subject == '2'?'../../static/img/icon_science.png':'../../static/img/icon_thinking.png'"
							mode="widthFix"></image>
						<div>
							<p>{{item.class_begin_time}}-{{item.class_finish_time}}</p>
							<p>{{item.name}}</p>
							<p :class="item.subject == '4'?'lan':item.subject == '2'?'zi':'cheng'">
								<span>{{item.class_type_display}}</span>
								<span>{{item.subject_display}}</span>
								<span>{{item.term_display}}</span>
								<span>{{item.grade_display}}</span>
							</p>
						</div>
					</div>
					<div class="classListBC">
						<div class="jinduBar">
							<div class='circle-container'>
								<div class="circle-item">
									<div class="circle-left-wrap">
										<div class="left"
											:style="{'transform': 'rotate('+((item.expend_class_hour_perlesson?parseInt((item.total_lesson_number - item.expend_class_hour_perlesson) / item.total_lesson_number * 100):0)>=50?(360*(((item.expend_class_hour_perlesson?parseInt((item.total_lesson_number - item.expend_class_hour_perlesson) / item.total_lesson_number * 100):0)-50)/100)):0)+'deg)'}">
										</div>
									</div>
									<div class="circle-right-wrap">
										<div class="right"
											:style="{'transform': 'rotate('+((item.expend_class_hour_perlesson?parseInt((item.total_lesson_number - item.expend_class_hour_perlesson) / item.total_lesson_number * 100):0)>=50?180:(360*((item.expend_class_hour_perlesson?parseInt((item.total_lesson_number - item.expend_class_hour_perlesson) / item.total_lesson_number * 100):0)/100)))+'deg)'}">
										</div>
									</div>
									<div class='mask'></div>
									<div class="jinduInfo flex">
										{{item.total_lesson_number - item.expend_class_hour_perlesson}}/{{item.total_lesson_number}}
									</div>
								</div>
							</div>
							<div style="color:#999999;">剩余/总课次</div>
						</div>
					</div>
					<div class="classListBC">
						<div class="jinduBar">
							<div class='circle-container'>
								<div class="circle-item">
									<div class="circle-left-wrap">
										<div class="left"
											:style="{'transform': 'rotate('+((item.student_count?parseInt(item.student_count / item.student_limit * 100):0)>=50?(360*(((item.student_count?parseInt(item.student_count / item.student_limit * 100):0)-50)/100)):0)+'deg)'}">
										</div>
									</div>
									<div class="circle-right-wrap">
										<div class="right"
											:style="{'transform': 'rotate('+((item.student_count?parseInt(item.student_count / item.student_limit * 100):0)>=50?180:(360*((item.student_count?parseInt(item.student_count / item.student_limit * 100):0)/100)))+'deg)'}">
										</div>
									</div>
									<div class='mask'></div>
									<div class="jinduInfo flex">
										{{item.student_count}}/{{item.student_limit}}
									</div>
								</div>
							</div>
							<div style="color:#999999;">学员人数/限额</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 无数据提示 -->
		<div class="indexListNo" v-if="classList.length == 0">
			<image src="../../static/img/nodatabg.png" mode="widthFix"></image>
			<p>暂无班级哦~</p>
		</div>
		<!-- 筛选功能 -->
		<div class="screenEle" :class="screenEleKg ? 'screenEleLeft' : ''">
			<div class="screenEleBg" @click="screenEleKg = false"></div>
			<div class="screenSel">
				<div class="screenAudio">
					<p>学科（单选）</p>
					<div>
						<div class="flex" v-for="(items,indexs) in screenSelListXk" :key="indexs"
							:class="items.sel ? 'sel' : ''" @click="screenSelBtnXk(indexs)">{{items.name}}</div>
					</div>
				</div>
				<div class="screenAudio">
					<p>年级（单选）</p>
					<div>
						<div class="flex" v-for="(items,indexs) in screenSelListNj" :key="indexs"
							:class="items.sel ? 'sel' : ''" @click="screenSelBtnNj(indexs)">{{items.grade_name}}</div>
					</div>
				</div>
				<div class="screenAudio">
					<p>学期（单选）</p>
					<div>
						<div class="flex" v-for="(items,indexs) in screenSelListXq" :key="indexs"
							:class="items.sel ? 'sel' : ''" @click="screenSelBtnXq(indexs)">{{items.term_name}}</div>
					</div>
				</div>
				<div class="screenSelDate">
					<p>日期</p>
					<div>
						<div class="flex" @click="selectDatePicker('start')">{{startTime}}</div>
						<p>-</p>
						<div class="flex" @click="selectDatePicker('end')">{{endTime}}</div>
					</div>
				</div>
				<div class="rememberPasd" @click="isShowClassClick()">
					<div>
						<image
							:src="!isShowClass?'../../static/img/icon_selectbox3.png':'../../static/img/icon_selectbox_selected3.png'"
							mode="widthFix"></image>
					</div>
					<p>隐藏试听班</p>
				</div>
				<div class="screenSelBtn">
					<div class="flex" @click="screenSelCz()">重置</div>
					<div class="flex" @click="screenSelOk()">确定</div>
				</div>
			</div>
		</div>
		<!-- 选择年月日 -->
		<jp-timePicker ref='date-time' :datestype="type" :datestring='dateString' @change='dateTimeChange'>
		</jp-timePicker>
		<!-- loading -->
		<div class="loadingmove">
			{{loadingtext?'我是有底线的':'加载中'}}
			<image v-if="!loadingtext" class="liadingimg" src="../../static/img/loading.gif" mode="widthFix">
			</image>
		</div>
		<div class="noDataEle flex" v-if="classList.length != 0">我是有底线的</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dateString: '',
				type: 'date',
				startTime: "开课日期",
				endTime: "结课日期",
				dateType: "",

				isShowClass: false,

				tabBtnLeft: '75%',
				tabList: [{
					name: "开课中",
					sel: true,
					left: '75%',
					id: 1,
				}, {
					name: "未开课",
					sel: false,
					left: '50%',
					id: 0,
				}, {
					name: "已结课",
					sel: false,
					left: '25%',
					id: 2,
				}, {
					name: "已关闭",
					sel: false,
					left: '0%',
					id: 3,
				}], //tab
				percent: 0, //进度条百分比
				tabListIdx: 1,
				loadingtext: 0,
				screenSelListXk: [],
				screenSelListXkDate: [],
				screenSelListNj: [],
				screenSelListXq: [],
				screenSelZ: {
					xueke: '',
					nianji: '',
					xueqi: '',
					startTime: '',
					endTime: ''
				},
				screenEleKg: false, //筛选开关
				classList: [],
				classListData: [],
				state: 1,
				classList0: [],
				classList1: [],
				classList2: [],
				classList3: [],
			};
		},
		onShow() {
			if (this.tabListIdx == 1) {
				this.getClassData1();
			} else if (this.tabListIdx == 0) {
				this.getClassData0();
			} else if (this.tabListIdx == 2) {
				this.getClassData2();
			} else if (this.tabListIdx == 3) {
				this.getClassData3();
			}
		},
		onLoad() {
			this.options();
			this.getClassData1();
			this.getClassData0();
			this.getClassData2();
			this.getClassData3();
		},
		methods: {
			// 获取筛选选项
			async options() {
				try {
					const res = await this.$api.getoptions();
					this.screenSelListXkDate = res.data.results;
					this.screenSelListXk = res.data.results;
					for (let i in this.screenSelListXk) {
						this.screenSelListXk[i].grades.unshift({
							grade_name: "不限"
						});
						this.screenSelListXk[i].terms.unshift({
							term_name: "不限"
						});
					}
					this.screenSelListXk.unshift({
						name: "不限"
					});
					for (let i in this.screenSelListXk) {
						this.screenSelListXk[i].sel = false;
					}
					this.screenSelListNj = this.screenSelListXk[1].grades;
					this.screenSelListXq = this.screenSelListXk[1].terms;
				} catch (e) {
					console.log(e)
				}
			},
			// 获取基本数据
			async getClassData0() {
				try {
					const res = await this.$api.getclass({
						state: 0,
					});
					this.classList0 = res.data;
				} catch (e) {
					console.log(e)
				}
			},
			async getClassData1() {
				try {
					const res = await this.$api.getclass({
						state: 1,
					});
					this.classList1 = res.data;
					this.classList = res.data;
				} catch (e) {
					console.log(e)
				}
			},
			async getClassData2() {
				try {
					const res = await this.$api.getclass({
						state: 2,
					});
					this.classList2 = res.data;
				} catch (e) {
					console.log(e)
				}
			},
			async getClassData3() {
				try {
					const res = await this.$api.getclass({
						state: 3,
					});
					this.classList3 = res.data;
				} catch (e) {
					console.log(e)
				}
			},
			// 点击切换
			tabClick(index, id) {
				for (let i in this.tabList) {
					this.tabList[i].sel = false;
				}
				this.tabListIdx = id;
				this.tabList[index].sel = true;
				this.tabBtnLeft = this.tabList[index].left;
				this.state = index == 0 ? 1 : index == 1 ? 0 : index;
				if (index == 0) {
					this.classList = this.classList1;
				} else if (index == 1) {
					this.classList = this.classList0;
				} else if (index == 2) {
					this.classList = this.classList2;
				} else if (index == 3) {
					this.classList = this.classList3;
				}
			},
			// 学科筛选选择
			screenSelBtnXk(index) {
				for (let i in this.screenSelListXk) {
					this.screenSelListXk[i].sel = false;
				}
				this.screenSelListXk[index].sel = true;
				if (this.screenSelListXk[index].name == "不限") {
					for (let i in this.screenSelListNj) {
						this.screenSelListNj[i].sel = false;
					}
					for (let i in this.screenSelListXq) {
						this.screenSelListXq[i].sel = false;
					}
					this.screenSelZ.xueke = "";
					this.screenSelZ.nianji = "";
					this.screenSelZ.xueqi = "";
					this.screenSelListNj = [{
						grade_name: "不限"
					}];
					this.screenSelListXq = [{
						term_name: "不限"
					}];
				} else {
					this.screenSelListNj = [];
					this.screenSelListXq = [];
					this.screenSelZ.xueke = this.screenSelListXk[index].name;
					this.screenSelListNj = this.screenSelListXk[index].grades;
					this.screenSelListXq = this.screenSelListXk[index].terms;
					this.screenSelZ.nianji = "";
					this.screenSelZ.xueqi = "";
				}
			},
			// 年级筛选选择
			screenSelBtnNj(index) {
				for (let i in this.screenSelListNj) {
					this.screenSelListNj[i].sel = false;
				}
				this.screenSelListNj[index].sel = true;
				this.screenSelZ.nianji = this.screenSelListNj[index].grade_name == "不限" ? '' : this.screenSelListNj[index]
					.grade_name;
			},
			// 学期筛选选择
			screenSelBtnXq(index) {
				for (let i in this.screenSelListXq) {
					this.screenSelListXq[i].sel = false;
				}
				this.screenSelListXq[index].sel = true;
				this.screenSelZ.xueqi = this.screenSelListXq[index].term_name == "不限" ? '' : this.screenSelListXq[index]
					.term_name;
			},
			// 打开日期选择
			selectDatePicker(type) {
				this.$refs['date-time'].show();
				this.dateType = type;
			},
			// 选择日期
			dateTimeChange(value) {
				if (this.dateType == 'start') {
					this.startTime = value;
					this.screenSelZ.startTime = value;
					uni.$emit('startDate', {
						msg: value
					})
				} else {
					this.endTime = value;
					this.screenSelZ.endTime = value;
					uni.$emit('endDate', {
						msg: value
					})
				}
			},
			// 隐藏试听
			isShowClassClick() {
				this.isShowClass = !this.isShowClass;
			},
			// 筛选重置
			screenSelCz() {
				this.startTime = "开课日期";
				this.endTime = "结课日期";
				this.isShowClass = false;
				for (let i in this.screenSelListXk) {
					this.screenSelListXk[i].sel = false;
				}
				for (let i in this.screenSelListNj) {
					this.screenSelListNj[i].sel = false;
				}
				for (let i in this.screenSelListXq) {
					this.screenSelListXq[i].sel = false;
				}
				this.screenSelZ = {
					xueke: '',
					nianji: '',
					xueqi: '',
					startTime: '',
					endTime: ''
				};
			},
			multiFilter(array, filters) {
				const filterKeys = Object.keys(filters)
				return array.filter((item) => {
					return filterKeys.every(key => {
						if (!filters[key].length) return true
						return !!~filters[key].indexOf(item[key])
					})
				})
			},
			// 筛选确定
			screenSelOk() {
				if (this.screenSelZ.startTime != "" && this.screenSelZ.endTime == "") {
					this.$gj_api.showicon("请选择时间", "loading");
				} else if (this.screenSelZ.startTime == "" && this.screenSelZ.endTime != "") {
					this.$gj_api.showicon("请选择时间", "loading");
				} else if (this.screenSelZ.startTime == "" && this.screenSelZ.endTime == "") {
					this.screenEleKg = false;
					this.screenEleKg = false;
					var list = [];
					var filters = {
						subject_display: this.screenSelZ.xueke ? [this.screenSelZ.xueke] : [],
						grade_display: this.screenSelZ.nianji ? [this.screenSelZ.nianji] : [],
						term_display: this.screenSelZ.xueqi ? [this.screenSelZ.xueqi] : [],
					}
					list = this.multiFilter(this.classListData, filters);
					this.classList = list;
				} else {
					this.screenEleKg = false;
					this.screenEleKg = false;
					var list = [];
					var lists = [];
					var filters = {
						subject_display: this.screenSelZ.xueke ? [this.screenSelZ.xueke] : [],
						grade_display: this.screenSelZ.nianji ? [this.screenSelZ.nianji] : [],
						term_display: this.screenSelZ.xueqi ? [this.screenSelZ.xueqi] : [],
					}
					list = this.multiFilter(this.classListData, filters);
					lists = list.filter(item => item.begin_date >= this.screenSelZ.startTime && item
						.finish_date <= this.screenSelZ.endTime)
					this.classList = lists;
				}
			},
			to_classList(id, index) {
				uni.setStorageSync('classData', this.classList[index]);
				uni.navigateTo({
					url: '../classList/classList?id=' + id + "&idx=" + this.tabListIdx
				})
			},
		},
	}
</script>

<style lang="scss">
	@import "./class.scss";
</style>
