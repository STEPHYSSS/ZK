<template>
    <div class="areaSettings minWidth1600">
        <!-- <h3>库区设置</h3> -->
        <div class="areainfo">
            <div class>
                <!-- <div class="wsListsearch">
                    <div class="increaseBox">
                        <div class="addBtnBox">
                            <div class="serchBoxBtn70">
                                <el-button class="increase themeColor" @click="newIncrease">
                                    <i class="el-icon-plus"></i>新增
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div> -->
                 <div class="addStore">
                    <!-- <span class="titleText">库区设置</span> -->
                        <el-button class="increase themeColor" @click="newIncrease">
                            <i class="el-icon-plus"></i>新增
                        </el-button>
                </div>
                <el-table :data="tableData" style="width: 100%;" border max-height="600">
                    <el-table-column prop="item" label="库区编号" align="center"></el-table-column>
                    <el-table-column prop="name" label="库区名称" align="center"></el-table-column>
                    <el-table-column prop="warehouseCode" label="所属仓库" align="center"></el-table-column>
                    <el-table-column label="货架数量" align="center">
                        <template slot-scope="scope">
                            <span
                                class="codesty"
                                @click="sheNum(scope.row.id)"
                            >{{scope.row.shelves}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="capacity" label="库位容量" align="center"></el-table-column>
                    <el-table-column label="创建时间" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.createTime !=null"
                            >{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">{{scope.row.status | statusTip}}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                                <img
                                    src="@/assets/images/xiugai_icon.png"
                                    class="codesty"
                                    @click="editRow(scope.row)"
                                />
                            </el-tooltip>&nbsp;&nbsp;
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                <img
                                    src="@/assets/images/shanchu_icon.png"
                                    class="codesty"
                                    @click="del(scope.row.id)"
                                />
                            </el-tooltip>&nbsp;&nbsp; 
                            <el-tooltip class="item" effect="dark" content="关联商品" placement="bottom">
                            <img
                                    src="@/assets/images/guanlianshangpin_icon.png"
                                    class="codesty"
                                    @click="relation(scope.row.id)"
                                />
                            </el-tooltip>
                            <!-- <span class="codesty" @click="relation(scope.row.id)">关联商品</span> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 编辑 -->
            <el-dialog title="编辑" :visible.sync="dialogFormVisible" :show-close="false">
                <el-form :model="ruleForm" label-width="110px" :rules="rules" ref="ruleForm">
                    <el-form-item label="库区名称：" prop="name">
                        <p class="kuquname">
                            <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
                        </p>
                    </el-form-item>
                   
                </el-form>

                <div class="btnCent">
                    <el-button class="theBtn themeColor textMright" @click="isSure">确定</el-button>
                    <el-button class="theBtn resetButton" @click="fanhui">返 回</el-button>
                </div>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="400px">
                <div class="styleBox">
                    <span>删除库区会关联删除该库区的货架和该库区下对应的仓库库存，是否确定删除？</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="sure">确 定</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    name: "areaSettings",
    data() {
        return {
            itemCode: "",
            name: "",
            status: "",
            id: "",
            dialogVisible: false,
            dialogVisible2:false,
            Info: {
                token: sessionStorage.getItem("token"),
                id: ""
            },
            ruleForm: {
                name: "",
                regionId: "",
                questionCode: sessionStorage.getItem("questionUUid")
                // warehouseCode: "",
                // locationVolume: ""
            },
            tableData: [],
            optionsGoods:[],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入仓库名称",
                        trigger: "blur"
                    }
                ],
                warehouseCode: [
                    {
                        required: true,
                        message: "请选择所属仓库",
                        trigger: "blur"
                    }
                ],
                locationVolume: [
                    {
                        required: true,
                        message: "请输入单个货位容积",
                        trigger: "blur"
                    }
                ]
            },
            dialogFormVisible: false,
            isfalse: false,
        };
    },
    created() {
        this.areaSetting();
        
    },
    mounted(){
      this.getGoodList()
    },
    methods: {
      // 关联商品
      relation(id){
        this.$router.push({
          name:'shelveshopAdd',
          query:{
            id:id
          }
        })

      },
      // 获取商品列表
      getGoodList(){
        this.$utils.post(this.reqApi.xinls+'/exam/goods/list',qs.stringify({
          questionCode:sessionStorage.getItem('questionUUid')
        })).then(res=>{
          if(res.data.code==='0000'){
            this.optionsGoods=res.data.data
          }
        })
      },
        sure() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/region/delete",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        regionId: this.id
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.dialogFormVisible = false;
                        this.$message.success("删除成功！");
                        this.areaSetting();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        del(id) {
            this.id = id;
            this.dialogVisible = true;
        },
        newIncrease() {
            this.$router.push({
                name: "reservoirAdd"
            });
        },
        areaSetting(pageNum, pageSize) {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/region/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data;
                    }
                });
        },
        // 编辑
        editRow(row) {
            this.dialogFormVisible = true;
            this.ruleForm = row;
        },
        // 提交编辑
        isSure() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/region/update",
                    qs.stringify({
                        questionCode: this.ruleForm.questionCode,
                        regionId: this.ruleForm.id,
                        name: this.ruleForm.name
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("提交成功！");
                        this.dialogFormVisible = false;
                        this.areaSetting();
                    }
                });
        },
        fanhui() {
            this.dialogFormVisible = false;
            this.areaSetting();
        },
        // 货架详情
        sheNum(id) {
            this.$router.push({
                name: "shelvesAdd",
                query: {
                    id: id
                }
            });
        }
    },
    filters: {
        statusTip(value) {
            if (value == "1") {
                return "启用";
            } else if (value == "0") {
                return "禁用";
            }
        }
    }
};
</script>
<style scoped>
.areaSettings {
    /* background-color: #f1f6fa; */
    min-height: 647px;
    min-width: 1200px;
}
.areaBox,
.areainfo {
    background: #fff;
}
.areaSettings .rece_Box {
    /* margin-left: 30px;
  margin-right: 30px; */
    margin: 0 20px;
}
.areaSettings .nav {
    display: inline-block;
    height: 50px;
    line-height: 50px;
}
.block {
    height: 150px;
}
.spacelet {
    letter-spacing: 6px;
}
.aaa {
    width: 66%;
}
.cit {
    width: 30%;
}
.shop2 {
    margin: 0 2px;
}
.bbb {
    width: 34%;
    text-align: right;
}
.bbb .typ {
    width: 58%;
}
.sotl {
    width: 33%;
}
.sotl p {
    width: 60%;
}
.aaa,
.cit,
.shop2,
.bbb,
.bbb .typ,
.sotl,
.sotl p {
    display: inline-block;
}
.sotl2 {
    text-align: right;
}
.sotl2 .sotlname {
    margin-right: 5px;
}
.soList {
    margin-bottom: 30px;
}
.soList .el-range-editor.el-input__inner {
    width: 100%;
}
.btn_flot {
    width: 100%;
    text-align: right;
}
.kuquname {
    width: 90%;
    display: inline-block;
}
.btnCent {
    text-align: center;
        padding: 20px 0;
}
.areainfo .el-dialog {
    width: 500px;
}
h3 {
    padding: 20px 0 20px 0px;
}
.codesty {
    color: #2772f4;
}
.titleText {
    display: inline-block;
    float: left;
    font-size: 14px;
    font-weight: 700;
}
.addStore {
    text-align: right;
    margin-bottom: 20px;
}
.styleBox {
    text-align: center;
    height: 70px;
    padding: 0 20px;
}
</style>


