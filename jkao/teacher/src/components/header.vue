<template>
	<el-header style="height: 60px;background-color: rgb(90, 139, 255);padding: 0;">
		<div class="header">
			<div class="left-h">
				<span class="title">畅捷通</span>
				<span class="ctitle">chanjet财税一体化实训平台v2.0</span>
			</div>
			<div class="sbbtTitle"><slot name="title"></slot></div>
			<div class="backIndex" v-if="path.indexOf('cindex') == -1"><router-link to="/index">返回主页 </router-link></div>
		</div>				
	</el-header>
</template>

<script>
	export default {
		data() {
			return {
				path: this.$route.path,
			}
		}
	}
</script>

<style scoped="scoped">
	.backIndex{
		position: absolute;
		right: 20px;
	}
	.backIndex a{
		color: #fff;
		font-size: 14px;		
	}
	.backIndex a i{
		margin-right: 3px;
	}
</style>