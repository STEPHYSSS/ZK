<template>
    <div class="transferAdd minWidth1600">
        <div class="billMa2">
            <div class="billMaList2">
                <el-row style="padding-bottom: 15px;">
                    <el-col :span="12">
                        <span style="font-size:14px">转入门店：{{this.Zname}}</span>
                    </el-col>
                    <el-col :span="12">
                        转出门店：
                        <el-select
                            style="width:300px"
                            type="text"
                            v-model="storeCode"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="i in options1"
                                :key="i.code"
                                :label="i.name"
                                :value="i.code"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <table class="tableLlist" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <th style="width:9%">货号</th>
                        <th style="width:10%">品名</th>
                        <th style="width:5%">单品售价</th>
                        <th style="width:8%">转出数量</th>
                        <th style="width:10%">转出总金额</th>
                        <th style="width:10%">规格</th>
                        <th style="width:10%">单位</th>
                        <th style="width:10%">保质期</th>
                        <th style="width:10%">温层</th>
                        <th style="width:10%">退货原因</th>
                        <th width="5%">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in tableData" :key="index">
                            <td>
                                <input
                                    class="inputTd"
                                    type="text"
                                    v-model="item.code"
                                    @keydown.enter="transferData(item.code, index)"
                                    maxlength="49"
                                />
                            </td>
                            <td>{{item.name}}</td>
                            <td>{{item.salesPrice}}</td>
                            <td>
                                <input class="inputTd" type="text" v-model="item.count" />
                            </td>
                            <td>{{item.count * item.salesPrice || ''}}</td>
                            <td>{{item.spec}}</td>
                            <td>{{item.unit}}</td>
                            <td v-if="item.periodUnit =='永久'">{{item.periodUnit}}</td>
                            <td v-else>{{item.period}}{{item.periodUnit}}</td>
                            <td>{{item.temperature}}</td>
                             <td>
                                <el-select
                                    class="inputSelect"
                                    type="text"
                                    v-model="item.reason"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="(item,index) in reasonList"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </td>
                            <td class="codesty" @click="delRetuen(index)">删除</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="codesty" @click="addRetuen">添加</td>
                        </tr>
                    </tbody>
                </table>
                <div class="konge"></div>
                <div class="addButt">
                    <el-button class="theBtn queryButton" @click="sure">确定</el-button>
                    <el-button class="theBtn resetButton" @click="retuBack">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    name: "transferAdd",
    data() {
        return {
            token: sessionStorage.getItem("token"),
            tableData: [],
            Zname: sessionStorage.getItem("name"),
            Zcode: sessionStorage.getItem("code"),
            storeCode: "",
            options1: [],
            reasonList: [
                {
                    value: "货品包装破损",
                    label: "货品包装破损"
                },
                {
                    value: "实物与订购不符",
                    label: "实物与订购不符"
                },
                {
                    value: "产品品质问题",
                    label: "产品品质问题"
                },
                {
                    value: "到货临期",
                    label: "到货临期"
                },
                {
                    value: "到货过期",
                    label: "到货过期"
                }
            ]
        };
    },
    created(){
      this.showother()
    },
    methods: {
        showother() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/store/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if ((res.data.code = "0000")) {
                        this.options1 = res.data.data;
                    }
                });
        },
        addRetuen() {
            this.tableData.push({
                code: "",
                unit: "",
                name: "",
                spec: "",
                temperature: "",
                salesPrice: "",
                period: ""
            });
        },
        // 输入货号回车事件
        transferData(code, index) {
            let that = this;
            let token = sessionStorage.getItem("token");
            that.$utils({
                url: this.reqApi.xinls + "/exam/goods/detail",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    questionCode: sessionStorage.getItem("questionUUid"),
                    code: code
                })
            }).then(res => {
                if (res.data.code == "0000") {
                  console.log(res.data.data.goods,'res.data.data')
                    this.tableData[index] = res.data.data.goods;
                    console.log(this.tableData)   
                    this.$set(this.tableData, index, res.data.data.goods);

                } else if (res.data.code === "1000") {
                    return this.$message.error("商品货号错误，请重新输入");
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        // 删除
        delRetuen(index) {
            this.tableData.splice(index, 1);
        },
        // 确定
        sure() {
          if(!this.storeCode) return this.$message.error('请选择转出门店')
            let that = this;
            const aaa = this.tableData.map(item => {
                return {
                    goodsCode: item.code,
                    number: item.count,
                    remark: item.reason
                    // "reason": item.reason,
                };
            });
            aaa.forEach(item => {
                if (item.number == null) {
                    this.$message("请添加数量");
                } else {
                    that.$utils({
                        url: this.reqApi.xinls + "/exam/transfer/insert",
                        method: "POST",
                        headers: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        data: qs.stringify({
                            questionCode: sessionStorage.getItem(
                                "questionUUid"
                            ),
                            goodsSet: JSON.stringify(aaa),
                            storeCodeIn: this.Zcode,
                            storeCodeOut: this.storeCode
                        })
                    }).then(res => {
                        if (res.data.code == "0000") {
                          this.$message.success('提交成功')
                            this.$router.push({ name: "transferSlip" });
                        }  else if (res.data.code === "3010") {
                            return this.$message.error(
                                "商品货号错误，请重新输入"
                            );
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            });
            // if(aaa== ''){
            //     this.$message('请信息')
            //     return
            // }
            // let token = sessionStorage.getItem('token');
            //     that.$axios({
            //     url:window.apiStore+'transfer/add',
            //     method:'POST',
            //     headers:{'content-type': 'application/x-www-form-urlencoded'},
            //     data:qs.stringify({
            //         token:token,
            //         json:JSON.stringify(aaa),
            //         storeCodeIn:this.Zcode
            //     })
            //     }).then(res=>{
            //         if(res.data.code=="0000"){
            //             that.$router.push({name:'transferSlip'})
            //         }else if(res.data.code=="6666"){
            //             this.$message({
            //             showClose: true,
            //             message: 'token异常，请重新登录',
            //             type: 'error'
            //         });
            //         const timer = setTimeout(() => {
            //             clearTimeout(timer)
            //             this.$router.push({name: "login"})}, 3000)
            //         }else{
            //             this.$message.error(res.data.msg);
            //         }
            //     }).catch(err=>{
            //         console.log('数据异常',err)
            //     })
        },
        // 返回
        retuBack() {
            this.$router.go(-1);
        }
    }
};
</script>
<style scoped>
.transferAdd {
    /* background-color: #f1f6fa; */
    min-height: 647px;
    min-width: 1200px;
}
.billMa2 {
    margin: 0px auto;
    background: #fff;
    border-radius: 10px;
    min-height: 170px;
}
.addbill {
    padding: 0;
}
.billMaList {
    padding-left: 35px;
    padding-right: 30px;
}
.billMaList2 {
    box-sizing: border-box;
    padding: 20px 30px 50px 35px;
}
.addButt {
    height: 50px;
    text-align: center;
}
.tableLlist {
    width: 100%;
    text-align: center;
}
.tableLlist th {
    background: #fff;
    color: #444;
    font-weight: 700;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 23px;
    border: none;
    padding: 12px 0;
    text-align: center;
    border: 1px solid #dbe0e5;
    border-top: 1px solid #444;
}
.tableLlist tr {
    border-left: 1px solid #dbe0e5;
    border-right: 1px solid #dbe0e5;
}
table {
    border-collapse: collapse;
    font-size: 12px;
    color: #444;
    /* font: 12px/25px '微软雅黑' '\5FAE\8F6F\96C5\9ED1', Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #444; */
}
.tableLlist tbody td {
    padding-left: 10px;
    padding-right: 10px;
    line-height: 23px;
    padding: 8px 0;
    text-align: center;
    font-size: 12px;

    border: 1px solid #dbe0e5;
}
.tableLlist tbody tr:hover,
.tableLlist tbody tr:focus {
    background-color: #f0f3f5;
}
.inputTd {
    outline: none;
    border: 1px solid #dbe0e5;
    width: 80%;
    height: 28px;
    border-radius: 8px;
    line-height: 28px;
    /* padding-left: 16px; */
    text-align: center;
    box-sizing: content-box;
    color: #444;
}
.inputSelect {
    width: 80%;
    height: 32px;
}
h3 {
    margin: 20px 0;
}
</style>
