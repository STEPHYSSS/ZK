<template>
	<div class="tools">
		<div class="sbbtitle">
      <el-tooltip class="item" effect="light" :enterable="false" :open-delay="500" :content="name" placement="bottom-end">
        <span class="slh">{{name}}</span>
      </el-tooltip>
    </div>
		<ul class="list" v-if="!ihide">
			<!-- <li  @click="msg()">
				<i class="iconfont i-pf"></i>
				<span>评分</span>
			</li> -->
			<li @click="$emit('addTabZF')">
				<i class="iconfont i-zf"></i>
				<span>申报作废</span>
			</li>
			<li @click="$emit('cjCX')">
				<i class="iconfont i-weibiaoti-"></i>
				<span>成绩查询</span>
			</li>
			<li  @click="$emit('addTabXC')">
				<i class="iconfont i-sbblscx"></i>
				<span>申报历史</span>
			</li>
			<li @click="$emit('moneySet')">
				<i class="iconfont i-msnui-maintain"></i>
				<span>金额维护</span>
			</li>
			<!-- <li @click="$emit('deleteTbsData')">
				<i class="iconfont i-shanchu"></i>
				<span>删除</span>
			</li> -->
		</ul>
		<a href="javascript:;" @click="goback" class="back-home"><i class="iconfont i-index"></i>返回主页</a>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props:["ihide", "name", "sbzl", "gouxuan"],
		methods:{
			msg() {
				this.$message({
					showClose: true,
					message: '本次考试不涉及本功能模块'
				});
      },
      goback () {
        this.$router.push(`/pageModule?${sessionStorage.cjtHomeHash}`)
      }
    },
	}
</script>

<style scoped="scoped">
	.tools {
		height: 60px;
		background-image: linear-gradient(0deg, #dcebff 0%, #f9fdfe 100%), linear-gradient( #fcbc31, #fcbc31);
		background-blend-mode: normal, normal;
		line-height: 60px;
		color: #333;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
	}
	
	.sbbtitle {
		font-size: 20px;
		/* text-indent: 30px; */
		min-width: 270px;
	}
	
	.list {
		display: flex;
		justify-content: flex-start;
	}
	
	.list li {
		padding: 0 20px;
		height: 100%;
		font-size: 16px;
	}
	.list li:hover{
		cursor: pointer;
		background-image: linear-gradient(0deg, #a9d4fe 0%, #edf4fe 100%), linear-gradient( #fcbc31, #fcbc31);
		background-blend-mode: normal, normal;
	}
	
	.active {
		background-image: linear-gradient(0deg, #a9d4fe 0%, #edf4fe 100%), linear-gradient( #fcbc31, #fcbc31);
		background-blend-mode: normal, normal;
	}
	.back-home{
		position: absolute;
		font-size: 16px;
		color: #333;
		right:25px;
	}
	.back-home i{
		font-size: 15px;
		color: #333;
		padding-right: 5px;
	}
  .skkp{
    position: absolute;
    padding: 3px 5px;
    margin: 0;
    background-color: #fff;
    border-color: #46b6f8;
    color: #46b6f8;
    right: 115px;
  }
  .skkp img{
    width: 16px;
    height: 16px;
    vertical-align: sub;
  }
  .skkp.sk{
    right: 25px;
    padding: 3px 5px;
    margin: 0;
    background-color: #46b6f8;
    color: #fff;
  }
</style>