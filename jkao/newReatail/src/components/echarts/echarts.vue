<template>
  <div class="echarts minimum minWidth1600" id="echarts">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="营业额分析" name="first">
        <div class="echartsBoxss">
          <div class="shuju">
            <el-row class="row rowSpacing">
              <el-col :span="8">
                <span>今日营业额:{{chartInfo.todaySum}}</span>
              </el-col>
              <el-col :span="8">
                <span>来客数:{{chartInfo.todayCount}}</span>
              </el-col>
              <el-col :span="8">
                <span>客单价:{{chartInfo.todayDiv}}</span>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="8">
                <span>昨日营业额:{{chartInfo.yesterdaySum}}</span>
              </el-col>
              <el-col :span="8">
                <span>昨日来客数:{{chartInfo.yesterdayCount}}</span>
              </el-col>
              <el-col :span="8">
                <span>昨日客单价:{{chartInfo.yesterdayDiv}}</span>
              </el-col>
            </el-row>
          </div>
          <div id="myChart" :style="{width: '80%', height: '350px'}"></div>
        </div>
        <div class="sales">
          <span>品类销售</span>
          <span>TOP10</span>
          <el-table :data="typeSaleList" style="width: 100%" height="340px">
            <el-table-column align="center" prop="typeName" label="品类名称"></el-table-column>
            <el-table-column align="center" prop="sumSale" label="销售额"></el-table-column>
            <el-table-column prop="sumGrossProfit" align="center" label="毛利"></el-table-column>
            <el-table-column prop="countSale" align="center" label="销量"></el-table-column>
            <el-table-column align="center" label="单品销售">
              <template scope="scope">
                <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
                  <img src="@/assets/chaxun_icon.png" class="codesty" @click="checkInfo(scope.row.typeCode)" alt />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog title="详情" :visible.sync="dialogVisible" width="50%">
          <el-table :data="tableInfo" style="width: 100%" max-height="600">
            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column prop="sumSale" label="销售额"></el-table-column>
            <el-table-column prop="sumGrossProfit" label="毛利"></el-table-column>
            <el-table-column prop="countSale" label="销量"></el-table-column>
          </el-table>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="库存管理" name="second"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import qs from "qs";
import echarts from "echarts";
export default {
  data() {
    return {
      activeName: "first",
      typeSaleList: [], //top10表格
      tableInfo: [],
      yesterdayYinye: [],
      todayYinye: [],
      yesterdayLaike: [],
      todayLaike: [],
      chartInfo: {},
      dialogVisible: false,
      aaaa: []
    };
  },
  created() {
    this.$axios({
      url: window.apiStore + "statistics/turnover",
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        token: sessionStorage.getItem("token")
      })
    }).then(res => {
      if (res.data.code == "0000") {
        var shuju = [
          this.yesterdayYinye,
          this.todayYinye,
          this.yesterdayLaike,
          this.todayLaike
        ];
        this.yesterdayYinye = res.data.data.yesterdayCountList; //昨日营业额
        this.yesterdayLaike = res.data.data.yesterdaySumList; //昨日来客数
        this.todayLaike = res.data.data.todaySumList;
        this.todayYinye = res.data.data.todayCountList;
        this.typeSaleList = res.data.data.typeSaleList;
        this.chartInfo = res.data.data.turnover;
        this.getCharts();
      }
    });
  },
  mounted() {
    // this.getCharts()
  },
  methods: {
    handleClick() {
      if (this.activeName === "second") {
        this.$router.push({
          name: "piechart"
        });
      }
    },
    // echarts图表
    getCharts() {
      var myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["昨日营业额", "今日营业额", "昨日来客数", "今日来客数"]
        },
        xAxis: [
          {
            type: "category",
            data: ["0-6", "7-12", "13-18", "19-23"]
          }
        ],
        yAxis: [
          {
            type: "value"
            // name: '水量',
            // min: 0,
            // max: 100,
            // interval: 10,
            // axisLabel: {
            //     formatter: '{value}'
            // }
          }
        ],
        series: [
          {
            name: "昨日营业额",
            type: "bar",
            /*设置柱状图颜色*/
            itemStyle: {
              normal: {
                //  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //  offset: 0,
                //  color: '#c7b4fc'
                //  }, {
                //  offset: 1,
                //  color: '#9c7af7'
                //  }]),
              }
            },
            barWidth: 20,
            data: this.yesterdayLaike
          },
          {
            name: "今日营业额",
            type: "bar",
            /*设置柱状图颜色*/
            itemStyle: {
              normal: {
                // color: function(params) {
                //     var colorList = [
                //         '#87ee4a'
                //     ];
                //     return colorList[params.dataIndex]
                // },
                // /*信息显示方式*/
                label: {
                  show: true,
                  position: "right"
                  // formatter: '{a}'
                }
              }
            },
            data: this.todayLaike
          },
          {
            name: "昨日来客数",
            type: "line",
            itemStyle: {
              /*设置折线颜色*/
              normal: {
                /* color:'#c4cddc'*/
              }
            },
            data: this.yesterdayYinye
          },
          {
            name: "今日来客数",
            type: "line",
            itemStyle: {
              /*设置折线颜色*/
              normal: {
                /* color:'#c4cddc'*/
              }
            },
            data: this.todayYinye
          }
        ]
      });

      myChart.getOption();
      // this.$axios({
      // url:window.apiStore+'statistics/turnover',
      // method:'POST',
      // headers:{'content-type': 'application/x-www-form-urlencoded'},
      // data:qs.stringify({
      //     token:sessionStorage.getItem('token')
      // })
      // }).then(res=>{
      //     if(res.data.code=='0000'){
      //       var shuju = [this.yesterdayYinye,this.todayYinye,this.yesterdayLaike,this.todayLaike]
      //       this.yesterdayYinye = res.data.data.yesterdayCountList//昨日营业额
      //       this.yesterdayLaike = res.data.data.yesterdaySumList//昨日来客数
      //       this.todayLaike = res.data.data.todaySumList
      //       this.todayYinye = res.data.data.todayCountList
      //       this.typeSaleList = res.data.data.typeSaleList
      //       this.chartInfo = res.data.data.turnover
      //       console.log(this.aaaa)
      //     }
      // })
      // console.log(this.yesterdayLaike)
    },

    findClasses() {
      this.$router.push({ name: "piechart" });
    },
    // 查看
    checkInfo(typeCode) {
      this.dialogVisible = true;
      this.$axios({
        url: window.apiStore + "statistics/goods/sale",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          typeCode: typeCode
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableInfo = res.data.data;
        } else if (res.data.code == "6666") {
          this.$message({
            showClose: true,
            message: "token异常，请重新登录",
            type: "error"
          });
          const timer = setTimeout(() => {
            clearTimeout(timer);
            this.$router.push({ name: "login" });
          }, 3000);
        } else {
          this.$message.error(res.data.msg);
        }
      });
      // var codelist=[]
      // codelist.token=sessionStorage.getItem('token')
      // codelist.typeCode=e
      // let formData = new FormData();
      // const obj =codelist
      // Object.keys(obj).forEach(key => {
      //     formData.append(key, obj[key])
      // })
      // this.$axios.post('/store/statistics/goods/sale',formData).then(res=>{
      //     console.log(res);
      //     if(res.data.code=='0000'){
      //       this.tableInfo=res.data.data
      //     }
      // })
    }
  }
};
</script>

<style scoped>
#echarts {
  box-sizing: border-box;
}
.shuju {
  /* margin-left: 40px; */
}
.shuju h4 {
  font-weight: 700;
  font-size: 16px;
}
.row {
  margin-top: 15px;
  margin-bottom: 20px;
}
.sales span {
  font-size: 16px;
  font-weight: 700;
  margin-right: 10px;
  margin-left: 20px;
}
.echartsBoxss {
  margin: 0 20px;
}
.btnAdd2 {
  margin: 0;
  /* padding: 8px 18px; */
  border-radius: 6px;
  color: #444;
}
.marginRight {
  margin-right: 10px;
}
.btnAdd2:hover,
.btnAdd2:focus {
  background-color: #e50109;
  color: #fff;
  transform: scale(1.01);
  border-color: #e50109;
}
.el-tabs__header {
  margin: 0;
}
</style>
