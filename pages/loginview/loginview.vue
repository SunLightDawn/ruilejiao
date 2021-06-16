<template>
	<view class="contentPage">
		<web-view :src="url" bindmessage="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
			}
		},
		onLoad(e) {
			this.url = e.url + "?mobile=" + e.mobile;
		}
	}
</script>
<style lang="scss">
	
</style>
