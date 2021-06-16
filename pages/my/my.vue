<template>
	<view class="contentPage">
		<!-- 背景 -->
		<div class="myInfoEle">
			<div class="myInfoEleBgO"></div>
			<div class="myInfoEleBgT"></div>
			<div class="myInfoEleBgD"><span v-for="(item,index) in 32" :key="index"></span></div>
		</div>

		<!-- 个人信息 -->
		<div class="myInfoBox">
			<div class="myInfo">
				<div class="myInfoTx">
					<div class="list_child">
						<div class="list_child_child flex">
							<div class="myInfoTxL">
								<div class="list_childL">
									<div class="list_child_childL flex"
										:style="{'background-image':'url('+userInfo.headimgurl+')'}">
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="myInfoName">{{userInfo.nickname}}</div>
			</div>
			<div class="myInfoDate">
				<div>
					<p>{{mineInfo.student_total || 0}}</p>
					<p>带生量</p>
				</div>
				<div>
					<p>{{mineInfo.clazz_total || 0}}</p>
					<p>带班量</p>
				</div>
			</div>
			<div class="myWorkDate">
				<p>
					<image src="../../static/img/icon_notice.png" mode="widthFix"></image>
					统计本月截止当前时间的数据
				</p>
				<div>
					<div>
						<div>
							<image src="../../static/img/icon_attendance.png" mode="widthFix"></image>
							<p>平均出勤率</p>
							<p>{{mineInfo.attence?parseInt(mineInfo.attence / mineInfo.attence_all  * 100):0}}%
							</p>
						</div>
						<div>
							<!-- <ar-circle-progress inactiveColor="#e4e4e4" activeColor="#9dc0ce" borderWidth="10"
								width="90"
								:percent="attence?parseInt(mineInfo.attence / attence_all * 100):0">
							</ar-circle-progress> -->
							<div class='circle-container'>
								<div class="circle-item">
									<div class="circle-left-wrap">
										<div class="left"
											:style="{'transform': 'rotate('+((mineInfo.attence?parseInt(mineInfo.attence / mineInfo.attence_all * 100):0)>=50?(360*(((mineInfo.attence?parseInt(mineInfo.attence / mineInfo.attence_all * 100):0)-50)/100)):0)+'deg)'}">
										</div>
									</div>
									<div class="circle-right-wrap">
										<div class="right"
											:style="{'transform': 'rotate('+((mineInfo.attence?parseInt(mineInfo.attence / mineInfo.attence_all * 100):0)>=50?180:(360*((mineInfo.attence?parseInt(mineInfo.attence / mineInfo.attence_all * 100):0)/100)))+'deg)'}">
										</div>
									</div>
									<div class='mask'></div>
								</div>
							</div>
							<div class="jinduLineEle">
								<div class="jinduLine">
									<div v-for="(item,index) in 8" :key="index"
										:style="{'transform':'rotate('+(45 * index)+'deg)'}">
									</div>
									<p></p>
								</div>
							</div>
							<div class="jinduLineValue">
								{{mineInfo.attence || 0}}/{{mineInfo.attence_all || 0}}
							</div>
						</div>
					</div>
					<div>
						<div>
							<image src="../../static/img/icon_classrate.png" mode="widthFix"></image>
							<p>平均满班率</p>
							<p>{{mineInfo.student_total?parseInt(mineInfo.student_total / mineInfo.total_clazz_stuent_limit_number * 100):0}}%
							</p>
						</div>
						<div>
							<!-- <ar-circle-progress inactiveColor="#e4e4e4" activeColor="#9dc0ce" borderWidth="10"
								width="90"
								:percent="mineInfo.student_total?parseInt(mineInfo.student_total / mineInfo.total_clazz_stuent_limit_number * 100):0">
							</ar-circle-progress> -->
							<div class='circle-container'>
								<div class="circle-item">
									<div class="circle-left-wrap">
										<div class="left"
											:style="{'transform': 'rotate('+((mineInfo.student_total?parseInt(mineInfo.student_total / mineInfo.total_clazz_stuent_limit_number * 100):0)>=50?(360*(((mineInfo.student_total?parseInt(mineInfo.student_total / mineInfo.total_clazz_stuent_limit_number * 100):0)-50)/100)):0)+'deg)'}">
										</div>
									</div>
									<div class="circle-right-wrap">
										<div class="right"
											:style="{'transform': 'rotate('+((mineInfo.student_total?parseInt(mineInfo.student_total / mineInfo.total_clazz_stuent_limit_number * 100):0)>=50?180:(360*((mineInfo.student_total?parseInt(mineInfo.student_total / mineInfo.total_clazz_stuent_limit_number * 100):0)/100)))+'deg)'}">
										</div>
									</div>
									<div class='mask'></div>
								</div>
							</div>
							<div class="jinduLineEle">
								<div class="jinduLine">
									<div v-for="(item,index) in 8" :key="index"
										:style="{'transform':'rotate('+44.6 * index+'deg)'}">
									</div>
									<p></p>
								</div>
							</div>
							<div class="jinduLineValue">
								{{mineInfo.student_total || 0}}/{{mineInfo.total_clazz_stuent_limit_number || 0}}
							</div>
						</div>
					</div>
					<div>
						<div style="width: 100%;">
							<image src="../../static/img/icon_officialclass.png" mode="widthFix"></image>
							<p>正式课时数</p>
							<p style="text-align: right;font-size: 36rpx;">{{mineInfo.lesson_hours || 0}}</p>
						</div>
					</div>
					<div>
						<div style="width: 100%;">
							<image src="../../static/img/icon_democlass.png" mode="widthFix"></image>
							<p>试听课时数</p>
							<p style="text-align: right;font-size: 36rpx;">{{mineInfo.audition_hours || 0}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="myFuncList">
				<div @click="messageBtn()">
					<div>
						<image src="../../static/img/icon_message.png" mode=""></image>
						微信通知提醒
					</div>
					<div>
						<div v-if="info.subscribe == true">
							<image :src="userInfo.headimgurl" mode="widthFix"></image>
							<p>{{userInfo.nickname}}</p>
						</div>
						<div v-else>未绑定</div>
						<image src="../../static/img/jiantou.png" mode="widthFix"></image>
					</div>
				</div>
				<div @click="settingBtn()">
					<div>
						<image style="width: 40rpx;height:42rpx;" src="../../static/img/icon_setting.png" mode="">
						</image>
						设置
					</div>
					<div>
						<image src="../../static/img/jiantou.png" mode="widthFix"></image>
					</div>
				</div>
				<div @click="quitBtn()">
					<div>
						<image style="width: 42rpx;height:42rpx;" src="../../static/img/icon_quit.png" mode=""></image>
						退出
					</div>
					<div>
						<image src="../../static/img/jiantou.png" mode="widthFix"></image>
					</div>
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
				percent: 50,
				mineInfo: {},
				info: {},
			};
		},
		onShow() {
			this.mine();
			this.get_check_subscribe();
		},
		onLoad() {

		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			// 获取基本数据
			async mine() {
				try {
					const res = await this.$api.getmine();
					this.mineInfo = res.data;
				} catch (e) {
					console.log(e)
				}
			},
			// 是否绑定微信通知
			async get_check_subscribe() {
				try {
					const res = await this.$api.check_subscribe();
					this.info = res.data;
				} catch (e) {
					console.log(e)
				}
			},
			// 设置
			settingBtn() {
				uni.navigateTo({
					url: '../changePassword/changePassword'
				})
			},
			// 微信通知提醒
			messageBtn() {
				uni.navigateTo({
					url: '../wechatnotice/wechatnotice'
				})
			},
			// 退出
			quitBtn() {
				uni.showModal({
					title: '操作提示',
					showCancel: true,
					confirmColor: "#576b95",
					content: "确定退出当前账号吗",
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.removeStorageSync("token");
							uni.removeStorageSync("isRememberPasd");
							uni.removeStorageSync("admin");
							uni.removeStorageSync("userInfo");
							uni.redirectTo({
								url: '../login/login'
							});
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	@import "./my.scss";

	.circle-container {
		position: relative;
		float: left;
		width: 50px;
		height: 50px;
	}

	.circle-item {
		position: absolute;
		left: 0;
		top: 0px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #9dc0ce;
	}

	.circle-left-wrap,
	.circle-right-wrap {
		position: absolute;
		left: 0;
		top: 0;
		width: 25px;
		height: 50px;
		overflow: hidden;
	}

	.circle-right-wrap {
		left: 25px;
	}

	.left,
	.right {
		position: absolute;
		top: 0;
		left: 0;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: #e4e4e4;
	}

	.left {
		clip: rect(0, 25px, auto, 0);
	}

	.right {
		clip: rect(0, auto, auto, 25px);
		left: -25px;
	}

	.mask {
		position: absolute;
		top: 7px;
		left: 7px;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: #ffffff;
	}
</style>

