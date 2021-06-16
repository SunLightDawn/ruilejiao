<template>
	<view class="contentPage">
		<!-- 顶部信息 -->
		<div class="baogaoInfo">
			<div>
				<image src="../../static/img/icon_lesson.png" mode="widthFix"></image>
				{{name}}
			</div>
			<div>
				<div>
					<image src="../../static/img/icon_done.png" mode="widthFix"></image>
					<p>已完/未完：</p>
					<p>{{baogaook}}/{{baogaono}}</p>
				</div>
				<div>
					<image src="../../static/img/icon_time.png" mode="widthFix"></image>
					<p>班均耗时：</p>
					<p>{{junhaoshi || 0}}</p>
				</div>
				<div>
					<image src="../../static/img/icon_rate.png" mode="widthFix"></image>
					<p>班均正确率：</p>
					<p>{{junok}}％</p>
				</div>
			</div>
		</div>
		<!-- 列表信息 -->
		<div class="baogaoList">
			<div v-for="(item,index) in list" :key="index">
				<div :class="item.type == 2 ? 'baogaoStatusW':''"></div>
				<div>
					<div>
						<image
							:src="item.gender == 1 ? '../../static/img/icon_boy.png' : '../../static/img/icon_girl.png'"
							mode="widthFix"></image>
						<p>{{item.name}}</p>
					</div>
					<div>
						<p>正确</p>
						<p>{{item.question_correct_count}}</p>
					</div>
					<div>
						<p>错误</p>
						<p>{{item.question_count - item.question_correct_count}}</p>
					</div>
					<div>
						<p>正确率</p>
						<p>{{item.accuracy}}%</p>
					</div>
					<div>
						<p>耗时</p>
						<p>{{item.elapsed_time}}</p>
					</div>
				</div>
				<div class="baogaoListIdx">
					<div class="list_child">
						<div class="list_child_child flex">
							{{item.question_correct_count + item.question_count - item.question_correct_count == item.question_count ?(index * 1 + 1):''}}
							<image
								v-if="item.question_correct_count + item.question_count - item.question_correct_count != item.question_count"
								src="../../static/img/icon_pencil.png" mode="widthFix"></image>
						</div>
					</div>
				</div>
				<div class="baogaoStatus flex"
					:class="(item.question_correct_count + item.question_count - item.question_correct_count == item.question_count) ? '':'baogaoStatusW'">
					{{item.question_correct_count + item.question_count - item.question_correct_count == item.question_count ? '已完成' : '未完成'}}
				</div>
			</div>
		</div>
		<div class="loadingmove">
			{{loadingtext?'没有更多了':'加载中'}}
			<image v-if="!loadingtext" class="liadingimg" src="../../static/img/loading.gif" mode="widthFix">
			</image>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				loadingtext: 0,
				clazz_id: 0,
				curriculum_no: 0,
				baogaook: 0,
				baogaono: 0,
				junhaoshi: 0,
				junok: 0,
				allok: 0,
				allti: 0,
				name: "",
			};
		},
		onLoad(e) {
			this.clazz_id = e.id;
			this.curriculum_no = e.kc;
			this.name = e.name;
			this.baogaodetail();
		},
		methods: {
			// 班级-班级详情-课表列表
			async baogaodetail() {
				try {
					const res = await this.$api.getbaogaodetail({
						clazz_id: this.clazz_id,
						curriculum_no: this.curriculum_no,
					});
					this.list = res.data;
					for (let i in this.list) {
						this.junhaoshi += this.list[i].elapsed_time;
						this.allok += this.list[i].question_correct_count;
						this.allti += this.list[i].question_count;
						if (this.list[i].question_correct_count + this.list[i].question_count - this.list[i]
							.question_correct_count == this.list[i].question_count) {
							this.baogaook += 1;
						} else {
							this.baogaono += 1;
						}
					}
					this.junhaoshi = this.junhaoshi / this.list.length;
					this.junok = this.allok ? parseInt(this.allok / this.allti * 100) : 0;
				} catch (e) {
					console.log(e)
				}
			},
		},
		onReachBottom() {
			setTimeout(() => {
				if (!this.loadingtext) {
					this.page = this.page += 1;
				}
			}, 500)
		},
	}
</script>

<style lang="scss">
	@import './workBaogaoDetail.scss'
</style>
