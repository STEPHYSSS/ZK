<template>
    <div class="memberM">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >会员中心</el-breadcrumb-item>
            <el-breadcrumb-item >会员管理</el-breadcrumb-item>
        </el-breadcrumb>-->
        <div class="storeBox">
            <div class="store_Box">
                <p class="store_tit">会员管理</p>
                <el-row style="white-space: nowrap;">
                    <el-col :span="6">
                        <span class="lett">手机号：</span>
                        <p>
                            <el-input type="text" v-model="ruleForm.phone" placeholder="请输入"></el-input>
                        </p>
                    </el-col>
                    <el-col :span="6" class="TongCenter">
                        <span>姓名：</span>
                        <p>
                            <el-input type="text" v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </p>
                    </el-col>
                    <el-col :span="6" class="TongCenter">
                        <span>会员级别：</span>
                        <p>
                            <el-select type="text" v-model="ruleForm.level">
                                <el-option
                                    v-for="(item,index) in leverGader"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                    placeholder="请选择"
                                ></el-option>
                            </el-select>
                        </p>
                    </el-col>
                    <el-col :span="6" class="TongRight">
                        <span>会员状态：</span>
                        <p>
                            <el-select type="text" v-model="ruleForm.status">
                                <el-option
                                    v-for="(item,index) in Invertstatu"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                                    placeholder="请选择"
                                ></el-option>
                            </el-select>
                        </p>
                    </el-col>
                </el-row>
                <div class="konge"></div>
                <el-row>
                    <el-col :span="6">
                        <span>创建日期：</span>
                        <p>
                            <el-date-picker
                                v-model="changeTime"
                                type="daterange"
                                @input="Panchange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>
                        </p>
                    </el-col>
                    <el-col :span="18" class="TongRight">
                        <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
                        <el-button @click="rests" class="theBtn resetButton">重置</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="storeInfo">
            <div class="memberBox">
                <div class="hideMemberScoll">
                    <div class="store_Box1">
                        <div class="addStore">
                            <!-- <img src="@/assets/addBtn.png" alt @click="addmember" /> -->
                            <el-button class="increase themeColor" @click="addmember">
                                <i class="el-icon-plus"></i>新增
                            </el-button>
                        </div>
                        <el-table :data="tableData" style="width: 100%;">
                            <el-table-column prop="id" label="会员ID" align="center"></el-table-column>
                            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="levelName" label="会员级别" align="center"></el-table-column>
                            <el-table-column label="注册时间" align="center">
                                <template scope="scope">
                                    <span
                                        v-if="scope.row.createTime !=null"
                                    >{{scope.row.createTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="source" label="注册来源" align="center"></el-table-column>
                            <el-table-column label="当前优惠券" align="center">
                                <template scope="scope">
                                    <span
                                        class="codesty"
                                        @click="couponDetail(scope.row.id)"
                                    >{{scope.row.coupon}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="score" label="剩余积分" align="center"></el-table-column>
                            <el-table-column label="会员状态" align="center">
                                <template slot-scope="scope">{{scope.row.status | statusTip }}</template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="编辑"
                                        placement="bottom"
                                    >
                                        <img
                                            src="@/assets/xiugai_icon.png"
                                            @click="modifyship(scope.row)"
                                            class="imgSize"
                                        />
                                    </el-tooltip>
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="重置密码"
                                        placement="bottom"
                                    >
                                        <img
                                            src="@/assets/resetpasswords_icon.png"
                                            @click="resPwd(scope.row.id)"
                                            class="imgSize"
                                        />
                                    </el-tooltip>
                                    <!-- <el-tooltip
                    class="item"
                    effect="dark"
                    content="禁用"
                    placement="bottom"
                    v-else-if="scope.row.status=='Y'"
                  >
                    <img
                      src="@/assets/qiyong_icon.png"
                      @click="modifyship(scope.row.status,scope.row.id)"
                      class="imgSize"
                    />
                                    </el-tooltip>-->
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="konge"></div>
                        <div class="paginStyle">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pageNum"
                                :page-sizes="[20,40,60]"
                                :page-size="pageSize"
                                background
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total"
                                class="pagination"
                            ></el-pagination>
                        </div>
                    </div>
                    <el-dialog title="新增" :visible.sync="dialogFormVisible" width="500px">
                        <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
                            <el-form-item
                                label="姓名："
                                prop="name"
                                :rules="[
                            { required: true, message: '请输入姓名', trigger: 'blur' },
                            { max: 5, message: '不超过20个字符', trigger: 'blur' }
                            ]"
                            >
                                <el-input type="text" v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="手机号："
                                prop="phone"
                                :rules="[
                            { required: true, message: '不能为空'},
                            { type: 'number', message: '必须为数字'}
                            ]"
                            >
                                <el-input
                                    type="text"
                                    maxlength="11"
                                    v-model.number="form.phone"
                                    auto-complete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="会员级别："
                                prop="level"
                                :rules="[
                            { required: true, message: '请选择会员级别', trigger: 'change' }
                            ]"
                            >
                                <el-select type="text" v-model="form.level">
                                    <el-option
                                        v-for="(item,index) in leverGader"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id"
                                        placeholder="请选择"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <div class="boxCenter">
                                <el-button
                                    class="AllquedingBtn"
                                    @click="submitForm('form')"
                                >确定</el-button>
                                <el-button class="theBtn resetButton" @click="resetForm('form')">取消</el-button>
                            </div>
                        </el-form>
                    </el-dialog>
                    <el-dialog title="编辑" :visible.sync="dialogFormVisible1" width="500px">
                        <el-form
                            :model="form1"
                            ref="form1"
                            label-width="100px"
                            class="demo-ruleForm"
                        >
                            <el-form-item
                                label="姓名："
                                prop="name"
                                :rules="[
                            { required: true, message: '请输入姓名', trigger: 'blur' },
                            { max: 5, message: '不超过20个字符', trigger: 'blur' }
                            ]"
                            >
                                <el-input type="text" v-model="form1.name"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="手机号："
                                prop="phone"
                                :rules="[
                            { required: true, message: '不能为空'},
                            { type: 'number', message: '必须为数字'}
                            ]"
                            >
                                <el-input
                                    type="text"
                                    maxlength="11"
                                    v-model.number="form1.phone"
                                    auto-complete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="会员级别："
                                prop="level"
                                :rules="[
                            { required: true, message: '请选择会员级别', trigger: 'change' }
                            ]"
                            >
                                <el-select type="text" v-model="form1.level">
                                    <el-option
                                        v-for="(item,index) in leverGader"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id"
                                        placeholder="请选择"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="状态："
                                prop="status"
                                :rules="[
                            { required: true, message: '请选择状态', trigger: 'change' }
                            ]"
                            >
                                <el-select type="text" v-model="form1.status">
                                    <el-option label="启用" value="Y"></el-option>
                                    <el-option label="禁用" value="N"></el-option>
                                </el-select>
                            </el-form-item>
                            <div class="boxCenter">
                                <el-button
                                    class="AllquedingBtn"
                                    @click="submitForm1('form1')"
                                >确定{{form.status}}</el-button>
                                <el-button
                                    class="theBtn resetButton"
                                    @click="resetForm1('form1')"
                                >取消</el-button>
                            </div>
                        </el-form>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    name: "memberM",
    data() {
        return {
            ruleForm: {
                phone: "",
                name: "",
                level: "",
                status: "",
                createTimeStart: "",
                createTimeEnd: "",
                token: sessionStorage.getItem("token")
            },
            form: {
                name: "",
                phone: "",
                level: "",
                token: sessionStorage.getItem("token")
            },
            form1: {
                id: "",
                name: "",
                phone: "",
                level: "",
                token: sessionStorage.getItem("token"),
                status: ""
            },
            Invertstatu: [
                {
                    value: "Y",
                    label: "已启用"
                },
                {
                    value: "N",
                    label: "已禁用"
                }
            ], //会员状态
            changeTime: [],
            leverGader: [], //新增下的会员级别
            tableData: [],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            // 分页
            pageNum: 1,
            pageSize: 20,
            total: 0
        };
    },
    created() {
        this.getMenber(this.pageNum, this.pageSize);
        this.showShip();
    },
    methods: {
        // 编辑
        submitForm1(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$axios
                        .post("/sys/member/update", qs.stringify(this.form1))
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.getMenber();
                                this.dialogFormVisible1 = false;
                            }
                        });
                } else {
                    return false;
                }
            });
        },
      
        resetForm1() {
            this.dialogFormVisible1 = false;
        },
        getMenber(pageNum, pageSize) {
            this.$axios({
                url: window.apiUrl + "member/list",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    phone: this.ruleForm.phone,
                    name: this.ruleForm.name,
                    level: this.ruleForm.level,
                    status: this.ruleForm.status,
                    createTimeStart: this.ruleForm.createTimeStart,
                    createTimeEnd: this.ruleForm.createTimeEnd,
                    token: this.ruleForm.token,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
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
        // 新增
        addmember() {
            this.dialogFormVisible = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$axios({
                        url: window.apiUrl + "member/addMember",
                        method: "POST",
                        headers: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        data: qs.stringify(this.form)
                    }).then(res => {
                        if (res.data.code == "0000") {
                            this.dialogFormVisible = false;
                            this.getMenber();
                            // this.$router.push({name:'memberManage'})
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
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.dialogFormVisible = false;
        },
        // 启用Y、禁用N
        modifyship(row, code) {
            this.dialogFormVisible1 = true;
            console.log(row);
            this.form1.id = row.id;
            this.form1.name = row.name;
            this.form1.phone = Number(row.phone);
            this.form1.level = row.level;
            this.form1.status = row.status;
            // this.$axios({
            //     url: window.apiUrl + "member/memberStatus",
            //     method: "POST",
            //     headers: {
            //         "content-type": "application/x-www-form-urlencoded"
            //     },
            //     data: qs.stringify({
            //         token: sessionStorage.getItem("token"),
            //         id: code,
            //         status: status
            //     })
            // }).then(res => {
            //     if (res.data.code == "0000") {
            //         this.getMenber();
            //     }
            // });
        },
        // 优惠券详情
        couponDetail(id) {
            sessionStorage.setItem("couCode", id);
            this.$router.push({
                name: "coupon",
                params: {
                    couCode: id
                }
            });
        },
        // 重置 查询
        chaxun() {
            this.getMenber();
        },
        rests() {
            this.ruleForm.phone = "";
            this.ruleForm.name = "";
            this.ruleForm.level = "";
            this.ruleForm.status = "";
            this.ruleForm.createTimeStart = "";
            this.ruleForm.createTimeEnd = "";
            this.changeTime = [];
            this.getMenber();
        },
        // 会员级别下拉选
        showShip() {
            this.$axios({
                url: window.apiUrl + "member/addLevelStatus",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    token: sessionStorage.getItem("token")
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.leverGader = res.data.data;
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
        // 选择时间
        Panchange(e) {
            this.ruleForm.createTimeStart = this.$moment(e[0]).format(
                "YYYY-MM-DD"
            );
            this.ruleForm.createTimeEnd = this.$moment(e[1]).format(
                "YYYY-MM-DD"
            );
        },
        // 分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.getMenber(this.pageNum, val);
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getMenber(val, this.pageSize);
        },
        // 重置密码
         resPwd(id) {
      this.$confirm("确定将供应商登陆密码重置为123456？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         this.$axios.post("/sys/member/reset/password",qs.stringify({
           token:sessionStorage.getItem('token'),
           id:id
         }))
            .then(res => {
              this.$message({
                type: "success",
                message: "设置成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "已取消重置"
              });
              console.log("数据有误");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
    },

    },
    filters: {
        statusTip(value) {
            if (value == "Y") {
                return "已启用";
            } else if (value == "N") {
                return "已禁用";
            }
        },
        statusName(value) {
            if (value == "Y") {
                return "禁用";
            } else if (value == "N") {
                return "启用";
            }
        }
    }
};
</script>
<style scoped>
.memberM {
    background-color: #fff;
    height: 100%;
    min-height: 647px;
    min-width: 1700px;
    box-shadow: 0px 2px 10px #ccc;
}
p {
    display: inline-block;
    width: 300px;
}
.memberM .el-range-editor.el-input__inner {
    width: 100%;
}
.memberM .el-select {
    width: 100%;
}
.lett {
    letter-spacing: 3px;
}
.boxCenter {
    text-align: center;
}
.memberM .addStore img {
    margin-right: 20px;
}
.memberBox {
    overflow: hidden;
    position: relative;
    height: 634px;
}
.hideMemberScoll {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>
