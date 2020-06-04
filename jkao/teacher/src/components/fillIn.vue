<template>
  <div class="table2">
    <el-table :data="tableData"  v-loading="loading" border style="width: calc(100% - 50px);margin: auto;">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="sbbzlMc" label="申报表" width="300" align="center">
      </el-table-column>
      <el-table-column label="状态" width="180" align="center">
        <template slot-scope="scope">
          <span style="color: #ff6600;">{{ getzt(scope.row.zt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.sbzt != 16 && scope.row.sbzt != 17 && scope.row.zt <= 22" @click="$emit('edit')">编辑</el-button>
          <el-button type="text" size="small" v-if="scope.row.sbzt != 16 && scope.row.sbzt != 17 && scope.row.zt == 22"  @click="deleteSbb(scope.row.sbzlDm, scope.row.sbbzlDm)">删除</el-button>
          <el-button type="text" size="small" v-if="scope.row.sbzt == 16 || scope.row.sbzt == 17" @click="look(scope.row.sbzlDm)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [],
        loading : false,
      }
    },
    props: ['pzxh', 'isEdit'],
    created() {
      this.getSbbb(this.pzxh);
		},
    methods: {
      getSbbb(pzxh) {
				let that = this
        let url = '/sbztList/' + pzxh;
        that.loading = true;
				that.$utils.ajax.post(url).then(function(response) {
          const {data} = response
          // console.log(data)
          that.tableData = data;
          that.loading = false;
				}).catch(function(err) {
          that.loading = false;
					that.$message.error('获取申报表异常');
				})
			},

      //根据申报状态变成正文
			getzt(zt) {
        return this.$utils.getTxzt(zt);
			},

      //编辑
			edit(sbbzlDm) {
        this.isEdit = true;
				//this.$router.push("/dstb/" + this.pzxh);
				this.goSbb(sbbzlDm);
      },
      
			look(sbbzlDm){//查看
				this.isEdit = false;
				this.goSbb(sbbzlDm);
      },
      
      deleteSbb(sbzlDm, sbbzlDm){//删除
		   	let that = this
        let url = '/delSbb/' + that.pzxh + '/' + sbzlDm + '/'+ sbbzlDm;
				that.loading = true;
				that.$utils.ajax.post(url).then(function(response) {
					that.getSbbb(that.pzxh);
				}).catch(function(err) {
					that.$message.error('处理异常');
				})
		   }
       
    },
    watch: {
			pzxh: function(val) {
				this.pzxh = val;
				this.getSbbb(this.pzxh);
			},
    }
    
	}
</script>

<style>

</style>