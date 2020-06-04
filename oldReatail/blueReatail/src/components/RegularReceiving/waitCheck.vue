<template>
  <div class="waitCheck minWidth1600 minimum">
    <!-- 配送完成(待验收) -->
    <div class="waitBox">
      <div class="detailBackBtn">
        <router-link :to="{ path: '/receiving' }">
          <img src="@/assets/returnbutton.png" alt class="codesty" />
        </router-link>
      </div>
      <div class="wait_Box">
        <h3 class="title">
          配送完成
          <span>（待验收）</span>
        </h3>
        <div class="waitList">
          <div class="waitList_l">
            <p>
              配送单编号：
              <span>{{detailist.code}}</span>
            </p>
            <p>
              下单日期
              <span>{{detailist.orderingTime | converTime('YYYY-MM-DD')}}</span>
            </p>
            <p>
              配送总金额（元）：
              <span>{{detailist.amount}}</span>
            </p>
          </div>
          <div class="waitList_c waitList_2">
            <p>
              配送方：
              <span>{{detailist.supplierName}}</span>
            </p>
            <p>
              配送状态：
              <span>{{detailist.deliveryStatus | waitStateTip}}</span>
            </p>
          </div>
          <div class="waitList_c">
            <p>
              配送方联系电话：
              <span>{{detailist.supplierContactsPhone}}</span>
            </p>
            <p>
              配送品项总数：
              <span>{{detailist.item}}</span>
            </p>
          </div>
          <div class="waitList_r">
            <p>
              关联叫货单编号：
              <span>{{detailist.orderingCode}}</span>
            </p>
            <p>
              配送总数量：
              <span>{{detailist.count}}</span>
            </p>
          </div>
        </div>
        <div style="height:50px">
          <el-button class="themeColor increase" @click="issure">确定验收</el-button>
        </div>
      </div>
    </div>
    <div class="waitBox2">
      <div class="wait_Box">
        <el-table :data="detailist2" style="width: 100%" max-height="600">
          <el-table-column prop="id" label="序号" align="center"></el-table-column>
          <el-table-column prop="goodsCode" label="货号" align="center" width="100"></el-table-column>
          <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="period" label="保质期" align="center"></el-table-column>
          <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
          <el-table-column prop="amount" label="订购总金额" align="center"></el-table-column>
          <el-table-column prop="count" label="订购总数" align="center"></el-table-column>
          <el-table-column prop="actualDelivery" label="实际发货数" align="center"></el-table-column>
          <el-table-column prop="actualReceipt" label="实际收货数" align="center"></el-table-column>
          <el-table-column label="缺货数" align="center">
            <template slot-scope="{row, $index}">
              <input
                type="text"
                class="miniInput"
                v-model="list[$index].shortage"
                oninput="value=value.replace(/[`~!@#$%^&*()_\-+=<>?:{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,'').replace(/[^\d]/g, '')"
              />
            </template>
          </el-table-column>
          <el-table-column label="拒收数" align="center">
            <template slot-scope="{row, $index}">
              <input
                class="miniInput"
                type="text"
                v-model="list[$index].rejection"
                oninput="value=value.replace(/[`~!@#$%^&*()_\-+=<>?:{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,'').replace(/[^\d]/g, '')"
              />
            </template>
          </el-table-column>
          <el-table-column label="拒收原因" align="center" width="160">
            <template slot-scope="{row, $index}">
              <!-- list[index]. -->
              <el-select v-model="list[$index].rejectionReason" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="actualAmount" label="实际收货总金额" align="center"></el-table-column>
          <el-table-column prop="shortageAmount" label="缺货总金额" align="center"></el-table-column>
          <el-table-column prop="rejectionAmount" label="拒收总金额" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { log } from "util";
export default {
  name: "waitCheck",
  data() {
    return {
      token: this.$route.params.token,
      code: this.$route.params.deliveryCode,
      detailist: {},
      detailist2: [],
      options: [
        {
          value: "请选择",
          label: "请选择"
        },
        {
          value: "货品包装破损",
          label: "货品包装破损"
        },
        {
          value: "实物与订购不符",
          label: "实物与订购不符"
        },
        {
          value: "产品质量问题",
          label: "产品质量问题"
        }
      ],
      list: []
    };
  },
  created() {
    this.waitcheck();
  },
  methods: {
    //限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
    },
    waitcheck() {
      let _this = this;
      _this
        .$axios({
          url: window.apiStore + "delivery/detail",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            deliveryCode: sessionStorage.getItem("waitpeiCode")
          })
        })
        .then(res => {
          const {
            code,
            data: { deliverySheetVo, subList }
          } = res.data;
          if (code == "0000") {
            _this.detailist = deliverySheetVo;
            _this.detailist2 = subList;
            subList.forEach((item, index) => {
              _this.list.push({
                id: item.id,
                shortage: "",
                rejection: "",
                rejectionReason: ""
              });
            });
          } else if (code == "6666") {
            _this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              _this.$router.push({ name: "login" });
            }, 3000);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 确定收货
    issure() {
      let _this = this;
      let token = _this.token;
      _this
        .$axios({
          url: window.apiStore + "delivery/receiving",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            deliveryCode: sessionStorage.getItem("waitpeiCode"),
            deliveryJsonArray: JSON.stringify(_this.list)
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            this.$router.push({
              name: "acceptance",
              params: {
                token: token,
                deliveryCode: sessionStorage.getItem("waitpeiCode")
              }
            });
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
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    }
  },
  filters: {
    waitStateTip(value) {
      if (value == "1") {
        return "待配送";
      } else if (value == "2") {
        return "配送中";
      } else if (value == "3") {
        return "已完成";
      }
    }
  }
};
</script>
<style scoped>
.waitCheck {
  min-height: 647px;
  min-width: 1200px;
}
.waitBox{
  padding-top: 20px;
}
.waitBox,
.waitBox2 {
  background: #fff;
}
.wait_Box {
  margin: 0 20px;
}
.waitTab {
  border-collapse: collapse;
}
.wait_Box .title {
  /* padding-top: 20px;
  margin-bottom: 0;
  padding-bottom: 0; */
}
.wait_Box .title span {
  font-weight: 100;
  font-size: 16px;
}
.tip {
  margin: 0 0 20px 0px;
  color: #c2c2c2;
}
.check th {
  width: 9%;
  background: #dcf9fc;
  color: #444444;
  font-family: "微软雅黑";
}
.check td {
  text-align: center;
  width: 12%;
  height: 50px;
  padding: 0 10px;
}
.issure {
  width: 80px;
  height: 30px;
  font-size: 14px;
  color: #fff;
  background: #3ad159;
  border: none;
  border-radius: 5px;
  float: right;
  margin-top: 15px;
}
.waitBox2 .wait_Box {
  padding-top: 30px;
}
.checkInfo th {
  background-color: #01c8dc;
}
/* 返回 */
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.btnback {
  text-decoration: none;
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  color: #01c8dc;
  border: 1px solid #01c8dc;
  border-radius: 5px;
  float: right;
  margin-right: 2%;
}
.btnback:hover {
  background-color: #01c8dc;
  color: #fff;
}
.waitList {
  display: flex;
}
.waitList_l {
  width: 30%;
}
.waitList_c {
  width: 25%;
}
.waitList_2 {
  width: 14%;
}
.waitList_r {
  width: 30%;
}
.waitList_r p,
.waitList_c p {
  padding-left: 14%;
}
.waitList p {
  margin-bottom: 10px;
}
</style>


