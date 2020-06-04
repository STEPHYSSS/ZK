<template>
	<el-footer style="height: 40px;padding: 0;font-size: 12px;margin-top: 30px;">
		<div class="footer-info">
			<div class="nsr-info">
				<i class="iconfont i-ren"></i>
				<span>纳税人信息：</span>
				<span>{{nsrInfo.nsrsbh}}</span>
				<span>{{nsrInfo.nsrmc}}</span>
			</div>
			<div class="time" @click="setTime">
				<a class="timeSet" href="javascript:void(0);"><i class="iconfont i-time"></i></a>
				<span>{{now}}</span>
			</div>
		</div>
		<el-dialog title="系统时间设置" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
			<p class="mark"><span>修改平台的时钟，以便匹配案例对应的申报期间（并不修改计算机的时钟，也不修改服务器的时钟）。</span></p>
			<el-form ref="form" label-width="100px">
				<el-form-item label="系统时钟：">
					<el-date-picker v-model="value1" value-format="yyyy-MM-dd" type="date" placeholder="选择系统时钟"></el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="makeSure()">确 定</el-button>
			</span>
		</el-dialog>
	</el-footer>
</template>

<script>
	export default {
		data() {
			return {
				nsrInfo: [],
				now: this.$utils.getNowFormatDate(),
				intervalFn: null,
				sbzl: this.$route.params.sbzl,
				dialogVisible: false,
				value1: '2015-04-30',
			}
		},
		components: {},
		created() {
			let _this = this;
			/*this.intervalFn = setInterval(function() {
				_this.now = _this.$utils.getNowFormatDate();
			}, 1000);*/
			this.initCourses();
			
		},
		methods: {
			initCourses: function() { //获取案例与纳税人信息
				let that = this;
				if(that.sbzl == '101-1') { //表示发票勾选
					that.sbzl = '101'
				} else if(that.sbzl == '101-2') { //一般纳税人
					that.sbzl = '101'
				}else if(that.sbzl == '101-3') { //税控
					that.sbzl = '101'
				}
				let url = 'tax/useCase/' + sessionStorage.sjh + '/' + that.sbzl;
				that.$utils.post(url).then(res => {
					that.nsrInfo = res.data.nsrxx //纳税人基本信息
					sessionStorage.setItem('useCase', JSON.stringify(res.data));
					// let t = null;
					// t = res.data.sssqZ;
					this.now = res.data.sbqx
					this.value1 = res.data.sbqx
					that.intervalFn = setInterval(() => {
						that.now = that.$utils.getNowFormatDate(res.data.sbqx);
					}, 1000);
				}).catch(function(err) {
					that.$message.error('获取纳税人信息异常');
				})
			},
			setTime() { //设置时间
				this.dialogVisible = true;
			},
			handleClose(done) {
				done();
			},
			makeSure(){//设置时间
				let _this = this;
				if(this.value1 != ''){
					_this.now = _this.$utils.getNowFormatDate(this.value1);
					window.clearInterval(this.intervalFn);
					this.intervalFn = setInterval(function() {
						_this.now = _this.$utils.getNowFormatDate(_this.value1);
					}, 1000);
					this.dialogVisible = false;
				}else{
					this.$message.error('您还未选择系统时钟！');
				}
				
			}

		},
		destroyed() { //销毁
			window.clearInterval(this.intervalFn);
		},
		watch: {
			'$route' (to, from) {

			}
		}
	}
</script>

<style scoped="scoped">
	.footer-info{
		background-image: initial;
		font-size: 12px;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	.mark{
		color: #ff6600;
		font-size: 12px;
	}
	.time {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.i-ren{
		font-size: 14px  !important;
	}
	.i-time {
		font-size: 16px !important;
		color: #3333cc;
		margin-right: 5px;
	}
</style>