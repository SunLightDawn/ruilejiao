<template>
	<view class="contentPage">
		<video id="myVideo" :src="videoUrl" :direction="90" autoplay :show-fullscreen-btn="true"
			enable-danmu :danmu-btn="false" controls></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl: ""
			};
		},
		onLoad(e) {
			this.videoUrl = e.video
		}
	}
</script>

<style lang="scss">
	.contentPage {
		height: 100vh;
	}

	#myVideo {
		width: 100%;
		height: 100%;
	}
</style>
