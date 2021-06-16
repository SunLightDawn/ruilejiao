<template>
	<view class="contentPage">
		<!-- <web-view src="http://www.kangchenxi.com/hybrid/html/pdf.html?url=https://s.reallyedu.com/kj-test/9b233b30-9774-11eb-a316-439557a83ea0_jy.pdf" bindmessage="getMessage"></web-view> -->
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
			let fileUrl = decodeURIComponent(e.url) // decodeURIComponent 函数可把字符串作为 URI 组件进行编码。
			this.url = `http://s.reallyedu.com/tempPDFcandelete/hybrid/html/pdf.html?url=${fileUrl}`;
			console.log(this.url)
		}
	}
</script>
