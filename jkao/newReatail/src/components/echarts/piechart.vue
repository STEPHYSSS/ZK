<template>
  <div class="pie minimum minWidth1600" id="pie">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="营业额分析" name="first"></el-tab-pane>
      <el-tab-pane label="库存管理" name="second">
        <div class="echartsBox">
          <div class="bossbox">
            <!-- <el-button class="resetButton btnAdd2 marginRight" @click="findClasses" plain>营业额分析</el-button>
            <el-button class="themeColor btnAdd2">库存管理</el-button>-->
            <div class="twospan">
              <span>库存总成本:{{this.sumStockMoney}}</span>
              <span>SKU数量:{{this.sumStock}}</span>
            </div>
          </div>
          <div id="main" :style="{width:'70%',height:'280px'}"></div>
        </div>
        <div class="topspan">
          <span>品类销售</span>
          <span>TOP10</span>
        </div>

        <div class="table">
          <el-table :data="rankGoodsStock" border max-height="440px" style="width: 100%">
            <el-table-column prop="goodsName" label="单品名称" align="center"></el-table-column>
            <el-table-column prop="stockMoney" label="库存金额" align="center"></el-table-column>
            <el-table-column prop="stock" label="库存数量" align="center"></el-table-column>
            <el-table-column prop="averageSale30" label="近30天日均销量" align="center"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      activeName: "second",
      sumStock: "",
      sumStockMoney: "",
      rankGoodsStock: [],
      data: [],
      name: []
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    handleClick() {
      if (this.activeName === "first") {
        this.$router.push({
          name: "echarts"
        });
      }
    },
    findClasses() {
      this.$router.push({ name: "echarts" });
    },
    getlist() {
      let formData = new FormData();
      formData.append("token", sessionStorage.getItem("token"));
      this.$axios.post("/store/statistics/stock", formData).then(res => {
        if (res.data.code == "0000") {
          this.sumStock = res.data.data.sumStock;
          this.sumStockMoney = res.data.data.sumStockMoney;
          this.rankGoodsStock = res.data.data.rankGoodsStock;
          var arr = res.data.data.rankTypeStock;
          const newArr = arr.map(item => {
            return {
              value: item.sumStock,
              name: item.typeName
            };
          });
          var arr2 = [];
          const name = arr.map((item, index) => {
            arr2[index] = item.typeName;
          });
          this.name = arr2;
          this.data = newArr;
          this.one();
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
    },
    one() {
      var myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          x: "left"
        },
        tooltip: {
          trigger: "item",
          formatter: " {b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          right: "right",
          y: "center",
          itemWidth: 24,
          itemHeight: 18,
          data: this.name
        },
        series: [
          {
            // name: '访问来源',
            type: "pie",
            radius: ["0", "70%"],
            center: ["50%", "50%"],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.bossbox {
  /* margin-left: 40px; */
}
.bossbox h4 {
  font-size: 16px;
  font-weight: 700;
}
.twospan {
  margin-top: 15px;
}
.twospan span {
  font-weight: 700;
  font-size: 14px;
  margin-right: 200px;
}
.topspan span {
  font-weight: 700;
  font-size: 16px;
  margin-right: 5px;
  margin-left: 20px;
}
.table {
  box-sizing: border-box;
  /* margin-bottom: 40px; */
}
/* .table th{
  text-align: center;
}
.table td{
  text-align: center;
} */
.btnAdd2 {
  /* margin: 0; */
  /* padding: 8px 18px; */
  border-radius: 6px;
  color: #444;
}
#orderWarehouseList .marginRight {
  margin-right: 5px;
}
#pie .btnAdd2:hover,
#pie .btnAdd2:focus {
  background-color: #e50109;
  color: #fff;
  transform: scale(1.01);
  border-color: #e50109;
}
.echartsBox {
  margin: 0 20px;
  padding-top: 15px;
  box-sizing: border-box;
}
/* #pie .el-table td, .el-table th.is-leaf {
  text-align: center;
} */
</style>
