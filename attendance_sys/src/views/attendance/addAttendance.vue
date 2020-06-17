<template>
  <el-card id="addAttendance">
    <div class="addAttendanceForm">
      <el-form :model="form" :rules="rules" ref="form" label-width="145px" class="demo-form">
        <el-form-item label="考勤名称: " prop="name" class="nameAndRemark">
          <el-input maxlength="50" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注: " prop="remark" class="nameAndRemark">
          <el-input maxlength="50" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item v-if="form.status" label="状态:" prop="status">
          <el-select
            size="mini"
            class="inp-width"
            v-model="form.status"
            placeholder="请选择状态"
          >
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px;" label="排班方式: " prop="schedule">
          <el-radio-group v-model="form.schedule">
            <el-radio label="1">固定</el-radio>
            <el-radio label="2">自由</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" " prop="week">
          <el-checkbox-group v-model="form.week">
            <el-checkbox label="1">星期一</el-checkbox>
            <el-checkbox label="2">星期二</el-checkbox>
            <el-checkbox label="3">星期三</el-checkbox>
            <el-checkbox label="4">星期四</el-checkbox>
            <el-checkbox label="5">星期五</el-checkbox>
            <el-checkbox label="6">星期六</el-checkbox>
            <el-checkbox label="7">星期天</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <template v-if="form.schedule == 1">
          <el-form-item label="一天上下班次数: " prop="commute">
            <el-radio-group v-model="form.commute">
              <el-radio :label="1">一次</el-radio>
              <el-radio :label="2">两次</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row>
            <el-col :span="10">
              <el-form-item label=" " prop="toWorkOne">
                上班:
                <el-time-picker
                  v-model="form.toWorkOne"
                  value-format="HH:mm"
                  format="HH:mm"
                  placeholder="请选择时间"
                ></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label=" " prop="toWorkBeforeOne">
                最早打卡提前:
                <el-input class="inp-width" v-model="form.toWorkBeforeOne"></el-input>&nbsp;&nbsp;分钟
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label=" " prop="offWorkOne">
                下班:
                <el-time-picker
                  v-model="form.offWorkOne"
                  value-format="HH:mm"
                  format="HH:mm"
                  placeholder="请选择时间"
                ></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label=" " prop="offWorkAfterOne">
                最晚打卡延迟:
                <el-input class="inp-width" v-model="form.offWorkAfterOne"></el-input>&nbsp;&nbsp;分钟
              </el-form-item>
            </el-col>
          </el-row>
          <template v-if="form.commute == 2">
            <el-row>
              <el-col :span="10">
                <el-form-item label=" " prop="toWorkTwo">
                  上班:
                  <el-time-picker
                    v-model="form.toWorkTwo"
                    value-format="HH:mm"
                    format="HH:mm"
                    placeholder="请选择时间"
                  ></el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label=" " prop="toWorkBeforeTwo">
                  最早打卡提前:
                  <el-input class="inp-width" v-model="form.toWorkBeforeTwo"></el-input>&nbsp;&nbsp;分钟
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label=" " prop="offWorkTwo">
                  下班:
                  <el-time-picker
                    v-model="form.offWorkTwo"
                    value-format="HH:mm"
                    format="HH:mm"
                    placeholder="请选择时间"
                  ></el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label=" " prop="offWorkAfterTwo">
                  最晚打卡延迟:
                  <el-input class="inp-width" v-model="form.offWorkAfterTwo"></el-input>&nbsp;&nbsp;分钟
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </template>
        <template v-if="form.schedule == 2">
          <el-row>
            <el-col :span="10">
              <el-form-item label="考勤统计最早时间:" prop="earliestTime">
                <el-date-picker
                  type="datetime"
                  prefix-icon="el-icon-date"
                  value-format="HH:mm"
                  format="HH:mm"
                  placeholder="考勤统计最早时间"
                  v-model="form.earliestTime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="考勤统计最晚时间:" prop="latestTime">
                <el-date-picker
                  type="datetime"
                  prefix-icon="el-icon-date"
                  value-format="HH:mm"
                  format="HH:mm"
                  placeholder="考勤统计最晚时间"
                  v-model="form.latestTime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <el-form-item label="拍照打卡: " prop="photograph">
          <el-radio-group v-model="form.photograph">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="7">
            <el-form-item label="定位打卡: " prop="location">
              <el-radio-group v-model="form.location">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <div style="display: flex;" v-if="form.location == '1'">
              <el-button size="small" @click="handleAmap" class="mapChoosing">地图选点</el-button>
              <span class="ssl">{{form.address}}</span>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="生效时间: " prop="effectiveTime" class="nameAndRemark">
          <el-date-picker
            type="datetime"
            prefix-icon="el-icon-date"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="生效时间"
            v-model="form.effectiveTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="失效时间: " prop="ineffectiveTime" class="nameAndRemark">
          <el-date-picker
            type="datetime"
            prefix-icon="el-icon-date"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="失效时间"
            v-model="form.ineffectiveTime"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button
          size="mini"
          class="border-blue bgc-blue font-color-fff"
          @click="submitForm('form')"
        >保存</el-button>
        <el-button size="mini" class="border-blue font-color-blue" @click="attendanceRules">取消</el-button>
      </div>
    </div>
    <el-dialog
      width="800px"
      title="地图坐标"
      class="amap-dialog"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-amap
        @register="getInfo"
        :coordinate="form.coordinate"
        :range="form.range"
        @handleClose="dialogVisible = false"
      ></el-amap>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  attendanceInsert,
  attendanceUpdate,
  attendanceDetail
} from "@/api/attendance";
import elAmap from "./attRules/amap";
export default {
  data() {
    const checkComTime = (rule, value, callback) => {
      let earliestTime = new Date(this.form.earliestTime).getTime();
      let latestTime = new Date(value).getTime();
      if (!value) {
        return callback(new Error("考勤统计最晚时间必填"));
      } else if (latestTime <= earliestTime) {
        this.form.latestTime = "";
        return callback(new Error("考勤统计最晚时间应大于考勤统计最早时间"));
      } else {
        callback();
      }
    };
    const checkNumBefore1 = (rule, value, callback) => {
      if (value.length <= 0) {
        return callback(new Error("最早打卡提前必填"));
      } else if (value <= 0 || value > 999) {
        return callback(new Error("请保持在1-999之间"));
      } else if (isNaN(value - 0)) {
        this.form.toWorkBeforeOne = "";
        return callback(new Error("请输入1-999之间的数字"));
      } else {
        callback();
      }
    };
    const checkNumAfter1 = (rule, value, callback) => {
      if (value.length <= 0) {
        return callback(new Error("最晚打卡延迟必填"));
      } else if (value <= 0 || value > 999) {
        return callback(new Error("请保持在1-999之间"));
      } else if (isNaN(value - 0)) {
        this.form.offWorkAfterOne = "";
        return callback(new Error("请输入1-999之间的数字"));
      } else {
        callback();
      }
    };
    const checkNumBefore2 = (rule, value, callback) => {
      if (value.length <= 0) {
        return callback(new Error("最早打卡提前必填"));
      } else if (value <= 0 || value > 999) {
        return callback(new Error("请保持在1-999之间"));
      } else if (isNaN(value - 0)) {
        this.form.toWorkBeforeTwo = "";
        return callback(new Error("请输入1-999之间的数字"));
      } else {
        callback();
      }
    };
    const checkNumAfter2 = (rule, value, callback) => {
      if (value.length <= 0) {
        return callback(new Error("最晚打卡延迟必填"));
      } else if (value <= 0 || value > 999) {
        return callback(new Error("请保持在1-999之间"));
      } else if (isNaN(value - 0)) {
        this.form.offWorkAfterTwo = "";
        return callback(new Error("请输入1-999之间的数字"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      form: {
        address: "",
        name: "", // 考勤名称
        remark: "", // 备注
        schedule: "1", // 排班方式
        week: [], // 一周的安排
        photograph: "1", // 拍照打卡
        location: "1", // 定位打卡
        coordinate: [], // 坐标
        range: "", // 范围
        commute: 1, // 一天上下班次数
        toWorkOne: "", // 第一次上班时间
        toWorkBeforeOne: "", // 第一次上班最早打卡提前N分钟
        offWorkOne: "", // 第一次下班时间
        offWorkAfterOne: "", // 第一次下班最晚打卡延后N分钟
        toWorkTwo: "", // 第二次上班时间
        toWorkBeforeTwo: "", // 第二次上班最早打卡提前N分钟
        offWorkTwo: "", // 第二次下班时间
        offWorkAfterTwo: "", // 第二次下班最晚打卡延后N分钟
        earliestTime: "", // 考勤统计最早时间
        latestTime: "", // 考勤统计最晚时间
        effectiveTime: "", // 生效时间
        ineffectiveTime: "", // 失效时间
        status: null
      },
      rules: {
        name: { required: true, message: "考勤名称必填", trigger: "blur" },
        schedule: { required: true, message: "排班方式必选", trigger: "change" },
        week: { required: true, message: "必选", trigger: "blur" },
        effectiveTime: {
          required: true,
          message: "生效时间必填",
          trigger: "blur"
        },
        photograph: {
          required: true,
          message: "拍照打卡必选",
          trigger: "blur"
        },
        location: { required: true, message: "定位打卡必选", trigger: "change" },
        toWorkOne: { required: true, message: "上班时间必填", trigger: "blur" },
        toWorkBeforeOne: {
          required: true,
          validator: checkNumBefore1,
          trigger: "blur"
        },
        offWorkAfterOne: {
          required: true,
          validator: checkNumAfter1,
          trigger: "blur"
        },
        toWorkTwo: { required: true, message: "上班时间必填", trigger: "blur" },
        toWorkBeforeTwo: {
          required: true,
          validator: checkNumBefore2,
          trigger: "blur"
        },
        offWorkAfterTwo: {
          required: true,
          validator: checkNumAfter2,
          trigger: "blur"
        },
        earliestTime: {
          required: true,
          message: "考勤统计最早时间必填",
          trigger: "blur"
        },
        latestTime: [
          { required: true, validator: checkComTime, trigger: "blur" }
        ],
        offWorkOne: [
          { required: true, message: "下班时间必填", trigger: "blur" }
        ],
        offWorkTwo: [
          { required: true, message: "下班时间必填", trigger: "blur" }
        ],
        status: { required: true, message: "请状态", trigger: "change" }
      }
    };
  },

  created() {
    if (this.$route.query.id) {
      this.getAttDetail(this.$route.query.id);
    }
  },

  components: {
    elAmap
  },

  methods: {
    async getAttDetail(id) {
      const {
        data: { code, msg, data }
      } = await attendanceDetail({ id });
      if (code === "0000") {
        if (data) this.form = data;
        this.form["id"] = this.$route.query.id;
        this.form.week = data.week.split(",");
        if (data.coordinate) {
          this.form.coordinate = data.coordinate.split(',')
        }else {
          this.form.coordinate = [114.373761,30.582912]
        }
      }
    },
    handleAmap() {
      this.dialogVisible = true;
    },
    getInfo(data) {
      this.form.coordinate = data[0];
      this.form.range = data[1];
      this.form.address = data[2];
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (
            this.form.location == "1" &&
            (!this.form.coordinate || this.form.range == '')
          )
            return this.$message.error("请设置考勤地点和考勤范围");
          let form = { ...this.form };
          form.week = form.week.join(",");
          form.coordinate = form.coordinate.join(',')
          let res = {};
          if (!this.$route.query.id) {
            res = await attendanceInsert(form);
          } else {
            res = await attendanceUpdate(form);
          }
          const { code, msg } = res.data;
          if (code === "0000") {
            this.attendanceRules();
            this.$message.success("保存成功");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // checkNum (e, id) {
    //   console.log(e, id)
    //   return false
    //   let g = e + ''
    //   //先把非数字的都替换掉，除了数字和.
    //   g = g.replace(/[^\d.]/g, "")
    //   //保证只有出现一个.而没有多个.
    //   g = g.replace(/\.{2,}/g, ".")
    //   //必须保证第一个为数字而不是.
    //   g = g.replace(/^\./g, "")
    //   //保证.只出现一次，而不能出现两次以上
    //   g = g.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
    //   //只能输入两个小数
    //   g = g.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
    //   if(g <= 0 && >=) {
    //     g = 0.00
    //   }
    //   this.form[id] = parseFloat(g).toFixed(2)
    // },
    // 取消跳转考勤规则列表
    attendanceRules() {
      this.$router.push({ name: "attendanceRules" });
    }
  }
};
</script>

<style scoped>
.addAttendanceForm {
  width: 1065px;
  margin-left: 70px;
}
.el-checkbox-group {
  /* margin: 22px 0 0 8px; */
}

.mapChoosing {
  color: #4489fe;
  background-color: #fff;
  border: 1px solid #4489fe;
}
.inp-width {
  width: 200px;
}
.ssl {
  width: 250px;
  height: 30px;
  line-height: 30px;
}
</style>