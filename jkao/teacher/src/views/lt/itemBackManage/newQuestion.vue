<template>
    <el-card class="f-new box-card" id="new-question">
        <!-- <previous-page :goPreviousPage="manageQuestion" @goback="goback"></previous-page> -->
        <div class="previousPage">
            <!-- <el-button @click="backHistory" size="mini" >返回</el-button> -->
            <img src="@/assets/images/returnbutton.png" @click="goback" />
        </div>
        <h3 v-if="this.$route.query.id||this.$route.query.qid" class="titleText">修改试题</h3>
        <h3 v-else class="titleText">新增试题</h3>
        <div class="newQue-body">
            <div class="new-body">
                <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                    <div>
                        <el-form-item label="试题类型:" prop="type" class="wushi">
                            <el-select v-model="form.type" placeholder="请选择" @change="changeAdd">
                                <el-option v-if="$route.query.flag" label="单选题" :value="1"></el-option>
                                <el-option v-if="$route.query.flag" label="多选题" :value="2"></el-option>
                                <el-option v-if="$route.query.flag" label="判断题" :value="3"></el-option>
                                <el-option v-if="$route.query.flag1" label="普通实训题" :value="1"></el-option>
                                <el-option v-if="$route.query.flag1" label="综合实训题" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="试题状态:" prop="open" class="wushi fr">
                            <el-select v-model="form.open" placeholder="请选择">
                                <el-option label="开放" :value="1"></el-option>
                                <el-option label="关闭" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <template v-if="form.type=='4'">
                          <el-form-item label="基础数据" class="wushi fr">
                            <el-button>请设置</el-button>
                        </el-form-item>
                        </template>-->
                    </div>

                    <!-- </div> -->
                    <div>
                        <el-form-item label="试题难度:" prop="level" class="wushi fr">
                            <el-select v-model="form.level" placeholder="请选择">
                                <el-option label="非常容易" :value="1"></el-option>
                                <el-option label="比较容易" :value="2"></el-option>
                                <el-option label="常规" :value="3"></el-option>
                                <el-option label="较难" :value="4"></el-option>
                                <el-option label="非常难" :value="5"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="名称:" prop="name" class="wushi">
                            <el-input max-lenght="50" v-model="form.name" class="inputWidth" />
                        </el-form-item>
                        <!-- <template v-if="form.type=='4'">
                        <el-form-item label="试题答案" class="wushi fr">
                            <el-button>请设置</el-button>
                        </el-form-item>
                        </template>-->

                        <!-- <el-form-item label="试题来源:" prop="qfrom" class="wushi fr">
                            <input
                                type="text"
                                maxlength="50"
                                v-model="form.qfrom"
                                placeholder="请输入"
                                class="inputWid"
                            />
                        </el-form-item>-->
                    </div>

                    <div>
                        <el-form-item label="所属题库:" prop="bank_ids" class="wushi">
                            <el-button class="whiteBtn" @click="chooseSubject">选择题库</el-button>
                        </el-form-item>
                        <el-form-item
                            label="试题编号:"
                            prop="number"
                            class="wushi fr"
                            v-if="form.number"
                        >
                            <span class="titleNumber">{{form.number}}</span>
                        </el-form-item>
                    </div>
                    <!-- <div> -->
                    <!-- <el-form-item label="添加案例:" prop="caseBh" class="wushi fr">
                            <el-input
                                @focus.prevent="getCaseList"
                                v-model="case_mc"
                                :disabled="form.type == '4' ? false : true"
                                class="inputWid"
                                clearable
                            ></el-input>
                    </el-form-item>-->
                    <!-- </div> -->
                    <!-- <div> -->
                    <!-- <el-form-item label="课程:" class="wushi">
                            <el-select
                                v-model="form.course"
                                @change="curriculum(form.course, 'N')"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="(item,index) in curriculumList"
                                    :key="index"
                                    :label="item.cname"
                                    :value="item.cid"
                                ></el-option>
                            </el-select>
                    </el-form-item>-->
                    <!-- <el-form-item label="自动取数:" prop="autocalc" class="wushi fr">
                            <el-select
                                v-model="form.autocalc"
                                :disabled="form.type == '4' ? false : true"
                                placeholder="请选择"
                            >
                                <el-option label="是" value="Y"></el-option>
                                <el-option label="否" value="N"></el-option>
                            </el-select>
                    </el-form-item>-->
                    <!-- </div> -->
                    <div>
                        <!-- <el-form-item label="章:" class="wushi">
                            <el-select
                                v-model="form.chapter"
                                @change="chapters(form.chapter, 'N')"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="(item,index) in chaptersList"
                                    :key="index"
                                    :label="item.pname"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>-->
                        <!-- <el-form-item label="共享:" prop="shared" class="wushi fr">
                            <el-select v-model="form.shared" placeholder="请选择" class="add-status">
                                <el-option label="共享" :value="1"></el-option>
                                <el-option label="私有" :value="0"></el-option>
                            </el-select>
                        </el-form-item>-->
                    </div>
                    <!-- <el-form-item label="节:">
                        <el-select
                            v-model="form.section"
                            @change="section(form.section, 'N')"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="(item,index) in sectionList"
                                :key="index"
                                :label="item.pname"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>-->
                    <!-- <el-form-item label="目:">
                        <el-select v-model="form.directory" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in finalList"
                                :key="index"
                                :label="item.pname"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>-->
                    <el-form-item label="试题题干:" prop="content">
                        <template>
                            <div id="editor1"></div>
                        </template>
                    </el-form-item>
                    <template
                        v-if="$route.query.flag&&(form.type == '1' || form.type == '2' || form.type == '3')"
                    >
                        <el-form-item label>
                            <el-button
                                class="whiteBtn"
                                v-if="form.type == '1' || form.type == '2'"
                                @click="addOption(form.options)"
                            >增加选项</el-button>
                        </el-form-item>
                        <el-form-item label="选项设置:">
                            <template v-if="form.type == '1'">
                                <ul v-for="(item, index) in form.options" :key="index">
                                    <li class="optionA" v-if="index === 0">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                maxlength="200"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项A</span>
                                            <input v-model="form.key" type="radio" value="A" />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                    <li class="optionA" v-if="index === 1">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                maxlength="200"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项B</span>
                                            <input v-model="form.key" type="radio" value="B" />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                    <li class="optionA" v-if="index === 2">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                maxlength="200"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项C</span>
                                            <input v-model="form.key" type="radio" value="C" />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                    <li class="optionA" v-if="index === 3">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                maxlength="200"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项D</span>
                                            <input v-model="form.key" type="radio" value="D" />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                    <li class="optionA" v-if="index === 4">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                maxlength="200"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项E</span>
                                            <input v-model="form.key" type="radio" value="E" />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                    <li class="optionA" v-if="index === 5">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                maxlength="200"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项F</span>
                                            <input v-model="form.key" type="radio" value="F" />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                </ul>
                            </template>
                            <template v-if="form.type == '2'">
                                <ul v-for="(item, index) in form.options" :key="index">
                                    <li class="optionA" v-if="index === 0">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项A</span>
                                            <input
                                                name="check"
                                                :checked="form.key.indexOf('A') > -1 ? true : false"
                                                @change="MultipleChoice"
                                                type="checkbox"
                                                value="A"
                                            />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                    <li class="optionA" v-if="index === 1">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项B</span>
                                            <input
                                                name="check"
                                                :checked="form.key.indexOf('B') > -1 ? true : false"
                                                @change="MultipleChoice"
                                                type="checkbox"
                                                value="B"
                                            />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                    <li class="optionA" v-if="index === 2">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项C</span>
                                            <input
                                                name="check"
                                                :checked="form.key.indexOf('C') > -1 ? true : false"
                                                @change="MultipleChoice"
                                                type="checkbox"
                                                value="C"
                                            />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                    <li class="optionA" v-if="index === 3">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项D</span>
                                            <input
                                                name="check"
                                                :checked="form.key.indexOf('D') > -1 ? true : false"
                                                @change="MultipleChoice"
                                                type="checkbox"
                                                value="D"
                                            />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                    <li class="optionA" v-if="index === 4">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项E</span>
                                            <input
                                                name="check"
                                                :checked="form.key.indexOf('E') > -1 ? true : false"
                                                @change="MultipleChoice"
                                                type="checkbox"
                                                value="E"
                                            />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                    <li class="optionA" v-if="index === 5">
                                        <div>
                                            <input
                                                type="textarea"
                                                v-model="item.content"
                                                class="optionTx"
                                            />
                                        </div>
                                        <div>
                                            <span>选项F</span>
                                            <input
                                                name="check"
                                                :checked="form.key.indexOf('F') > -1 ? true : false"
                                                @change="MultipleChoice"
                                                type="checkbox"
                                                value="F"
                                            />
                                        </div>
                                        <div @click="delOption(form.options, index)">❌</div>
                                    </li>
                                </ul>
                            </template>
                            <template v-if="form.type == '3'">
                                <div class="trueOrFalse">
                                    <div>
                                        <input v-model="form.key" type="radio" value="A" />
                                        <span>正确</span>
                                    </div>
                                    <div>
                                        <input v-model="form.key" type="radio" value="B" />
                                        <span>错误</span>
                                    </div>
                                </div>
                                <!-- <ul>
                  <li class="optionA">
                    <div><input type="textarea" v-model="form.options[0].content" maxlength="200" class="optionTx"></div>
                    <div><span>正确</span><input v-model="form.key" type="radio" value='A'></div>
                  </li>
                  <li class="optionA">
                    <div><input type="textarea" v-model="form.options[1].content" maxlength="200" class="optionTx"></div>
                    <div><span>错误</span><input v-model="form.key" type="radio" value='B'></div>
                  </li>
                                </ul>-->
                            </template>
                        </el-form-item>
                    </template>
                    <el-form-item label="试题解析:" prop="resolve">
                        <template>
                            <div id="editor"></div>
                        </template>
                    </el-form-item>
                    <!-- <el-form-item> -->
                    <div class="btnBox">
                        <!-- <el-button class="nextButton" v-if="form.type=='4'">下一步</el-button> -->
                        <!-- <add-btn
                        style="margin-left: 100px;"
                        level1="提 交"
                        level2="返 回"
                        :flag="flag"
                        @submitForm="newQuestion('form')"
                        @cancelForm="manageQuestion"
                        ></add-btn>-->
                        <el-button
                            class="submitBtn"
                            :disabled="disableBtn"
                            v-if="flag&&$route.query.flag1!=2"
                            @click="newQuestion('form')"
                        >提 交</el-button>
                        <el-button
                            :disabled="disableBtn"
                            @click="tobasicInfo('form')"
                            v-if="$route.query.flag!=1"
                        >
                            <!-- 选择账套 -->
                            <span v-if="$route.query.qid">{{btnText="下一步"}}</span>
                            <span v-else>{{btnText}}</span>
                        </el-button>
                        <!-- <el-button v-if="!$route.query.qid&&$route.query.flag!=1" @click="createAccount('form')">自建账套</el-button> -->

                        <el-button class="whiteBtn" @click="manageQuestion1">返 回</el-button>
                        <!-- :class="{'marginLeft':!flag}" -->
                        <!-- <el-button
                            @click="tobasicInfo('form')"
                            class="nextButton whiteBtn"
                            v-if="$route.query.flag1"
                        >下一步</el-button>-->
                    </div>
                </el-form>
            </div>
        </div>
        <el-dialog title="选择题库" center :visible.sync="dialogVisible" width="600px">
            <div class="tableBox">
                <el-table
                    :data="itemBankList"
                    style="width: 100%"
                    max-height="350px"
                    @selection-change="selectSingle"
                    @select-all="selectAll"
                    :row-key="getRowKeys"
                    ref="multipleTable"
                >
                    <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="55"
                        align="center"
                    ></el-table-column>
                    <el-table-column prop="name" align="center" label="题库名称"></el-table-column>
                    <el-table-column
                        prop="description"
                        align="center"
                        :show-overflow-tooltip="true"
                        label="备注"
                    ></el-table-column>
                    <el-table-column align="center" label="创建时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.create_time|fmtDate1}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogVisible1" width="450px">
            <el-form
                :model="ruleForm1"
                :rules="rules1"
                ref="ruleForm1"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="账套名称" prop="name">
                    <el-input class="inputWidth" v-model="ruleForm1.name"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input class="inputWidth" v-model="ruleForm1.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="submit1('ruleForm1')">确 定</el-button>
                <el-button @click="dialogVisible1 = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 选择试卷对话框 -->
        <el-dialog
            :visible.sync="dialogVisibleData"
            width="60%"
            class="analy-q"
            :show-close="false"
        >
            <div class="analyzeHead">
                <img src="@/assets/images/icon_news.png" alt />
                <span>选择案例</span>
                <a href="javacript:;" @click="handleClose" class="fr el-icon-close"></a>
            </div>
            <div class="analyzeBody">
                <!-- 搜索框 -->
                <el-form :inline="true" :model="formline" class="demo-form-inline">
                    <el-form-item label="案例编号">
                        <el-input class="searchWid-4" v-model="formline.caseBh"></el-input>
                    </el-form-item>
                    <el-form-item label="申报种类">
                        <el-select v-model="formline.sbzlDm" placeholder="请选择" class="searchWid-2">
                            <el-option
                                v-for="(item, index) in sbzlDmList"
                                :key="index"
                                :label="item.sbzlMc"
                                :value="item.sbzlDm"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="案例名称:">
                        <el-input class="searchWid-2" v-model="formline.caseMc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleCaseCX" class="search">搜索</el-button>
                    </el-form-item>
                </el-form>

                <!-- 表格 -->
                <template>
                    <el-table
                        :data="tableData"
                        :header-cell-style="{background:'#3ec8dd', color:'#fff'}"
                        @row-click="examRow"
                        stripe
                        border
                        style="width: 100%"
                    >
                        <el-table-column align="center" width="150" label="案例编号">
                            <template slot-scope="scope">{{ scope.row.case_bh }}</template>
                        </el-table-column>
                        <el-table-column prop="sbzl_dm" width="320" align="center" label="申报种类">
                            <template slot-scope="scope">{{ getSbzlMc(scope.row.sbzl_dm) }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="case_mc"
                            show-overflow-tooltip
                            align="center"
                            label="案例名称"
                        >
                            <template slot-scope="scope">
                                <span class="qzbhh">{{scope.row.case_mc}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>

                <!-- 分页 -->
                <div class="block">
                    <el-pagination
                        small
                        background
                        layout="prev, pager, next"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="pagesize"
                        :current-page="pagenum"
                        :total="total"
                    ></el-pagination>
                </div>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
import newTabs from "@/components/newTabs";
import { cleanWord } from "@/api/taxUrl/base";
import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
import basicInfo from "./basicInfo";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
export default {
    data() {
        return {
            getRowKeys(row) {
                if (row.practice_bank_id) {
                    return row.practice_bank_id;
                } else {
                    return row.objective_bank_id;
                }
            },
            manageQuestion: "", //返回页
            dialogVisible: false,
            sbzlDmList: [],
            btnText: "下一步",
            editor: "",
            editor1: "",
            formline: {
                caseMc: "",
                caseBh: "",
                sbzlDm: ""
            },
            flag: true,
            case_mc: "",
            dialogVisibleData: false,
            list: [],
            tableData: [],
            // 分页数据
            total: 10,
            pagesize: 10,
            pagesizes: [10, 20, 30, 40],
            pagenum: 1,
            // 题库列表
            DbsList: [],
            // 多选
            checkList: [],
            ruleForm1: {
                name: "",
                type: "C",
                remark: "",
                questionCode: ""
            },
            dialogVisible1: false,
            disableBtn: false,
            form: {
                options: [],
                question: {
                    content: "",
                    key: "",
                    status: 1,
                    open: 0,
                    resolve: "",
                    type: 0,
                    level: 0,
                    number: null,
                    name: ""
                },
                number: null,
                content: "",
                key: "",
                level: "",
                // autocalc: "N",
                // qmodifyor: sessionStorage.getItem("aId"),
                // qposter: sessionStorage.getItem("aId"),
                // qfrom: "原创",
                resolve: "",
                status: 1,
                open: "",
                type: "",
                name: ""
                // caseBh: "",
                // sbzlDm: "",
                // course: "",
                // chapter: "",
                // section: "",
                // directory: "",
                // shared: sessionStorage.aRoleid == "teacher" ? 0 : 1
            },
            rules1: {
                name: [
                    {
                        required: true,
                        message: "请输入账套名称",
                        trigger: "change"
                    }
                ]
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入名称",
                        trigger: "change"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "试题题干不能为空！",
                        trigger: "blur"
                    }
                ],
                // bank_ids: [
                //     {
                //         required: true,
                //         message: "所属题库不能为空！",
                //         trigger: "blur"
                //     }
                // ],
                level: [
                    {
                        required: true,
                        message: "试卷难易不能为空！",
                        trigger: "blur"
                    }
                ],
                qfrom: [
                    {
                        required: true,
                        message: "试题来源不能为空！",
                        trigger: "blur"
                    }
                ],
                resolve: [
                    {
                        required: true,
                        message: "试题解析不能为空！",
                        trigger: "blur"
                    }
                ],
                open: [
                    {
                        required: true,
                        message: "试题状态不能为空",
                        trigger: "change"
                    }
                ],
                type: [
                    {
                        required: true,
                        message: "试题类型不能为空！",
                        trigger: "change"
                    }
                ],
                caseBh: [
                    {
                        required: false,
                        message: "添加案例不能为空！",
                        trigger: "blur"
                    }
                ]
                // autocalc: [{ required: true, message: '自动取数不能为空！', trigger: 'blur' }]
            },
            // 章节目
            curriculumList: [],
            chaptersList: [],
            sectionList: [],
            finalList: [],
            // disabledAdd 添加案例
            disabledAdd: true,
            itemBankList: [], //题库列表
            // 富文本
            // content:null,
            editorOption: [
                "head", // 标题
                "bold", // 粗体
                "fontSize", // 字号
                "fontName", // 字体
                "italic", // 斜体
                "underline", // 下划线
                "strikeThrough", // 删除线
                "foreColor", // 文字颜色
                "backColor", // 背景颜色
                "link", // 插入链接
                "list", // 列表
                "justify", // 对齐方式
                "quote", // 引用
                "emoticon", // 表情
                "image", // 插入图片
                "table", // 表格
                // 'video',  // 插入视频
                "code", // 插入代码
                "undo", // 撤销
                "redo" // 重复
            ],
            pageSize1: 999999,
            bank_ids: [],
            questUrl: ""
        };
    },

    computed: {
        level: {
            get: function() {
                return (this.level = !this.$route.query.id
                    ? "新增试题"
                    : "修改试题");
            },
            set: function() {}
        }
    },

    components: {
        newTabs,
        basicInfo,
        "previous-page": previousPage
    },

    created() {
        // this.getSbzlList(); //申报
        // this.getFindQuestionDbs(); // 题库列表
        if (this.$route.query.id || this.$route.query.qid)
            this.getQuestionInfo();
        // this.getZJM();
    },
    mounted() {
        this.editorInit();
        // this.$router.beforeEach((to, from, next) => {
        //   if (to.name === 'manageQuestion') {
        //     to.meta.keepAliveChange = false
        //   }
        // })
    },
    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        if (to.name === "manageQuestion") {
            to.meta.keepAlive = false;
            next();
        }
        next();
    },
    methods: {
        editorInit() {
            this.editor = new Editor("#editor"); // 解析
            this.editor1 = new Editor("#editor1"); //题干
            this.editor.customConfig.menus = this.editorOption; //显示菜单
            // this.editor.customConfig.linkImgCallback = url => {
            //     console.log(url); // url 即插入图片的地址
            // };
            this.editor1.customConfig.menus = this.editorOption;
            this.editor.customConfig.onchange = html => {
                this.form.resolve = html;
            };
            this.editor1.customConfig.onchange = html => {
                this.form.content = html;
            };
            // 关闭粘贴样式的过滤
            this.editor.customConfig.pasteFilterStyle = false;
            this.editor1.customConfig.pasteFilterStyle = false;
            // 隐藏“网络图片”tab
            this.editor.customConfig.showLinkImg = false;
            this.editor1.customConfig.showLinkImg = false;
            // 上传图片
            this.editor.customConfig.uploadImgServer = `${this.reqApi.shuiwuUrl}/image/upload`;
            this.editor1.customConfig.uploadImgServer = `${this.reqApi.shuiwuUrl}/image/upload`;
            // 后端接收上传文件的参数名
            this.editor.customConfig.uploadFileName = "files";
            this.editor1.customConfig.uploadFileName = "files";
            // 将图片大小限制为2M
            this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
            this.editor1.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
            // 限制最多上传6张图片
            // this.editor.customConfig.uploadImgMaxLength = 6;
            // this.editor1.customConfig.uploadImgMaxLength = 6;
            // 设置超时
            this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000;
            this.editor1.customConfig.uploadImgTimeout = 3 * 60 * 1000;
            // 图片上传回调
            this.editor.customConfig.uploadImgHooks = {
                // fail: (xhr, editor, result) => {
                //     /**插入图片回调失败 */
                // },
                before: (xhr, editor, files) => {
                    // console.log(xhr,'xhrbefore')
                    // console.log(editor,'editorbeferor')
                    // console.log(files,'filesbefore')
                },
                success: (xhr, editor, result) => {
                    // console.log(result, "result");
                    /**图片上传成功回调 */
                },
                timeout: (xhr, editor, result) => {
                    /**网络超时回调 */
                },
                error: (xhr, editor, result) => {
                    // console.log(xhr,'xhr')
                    // console.log(editor,'editor')
                    // console.log(result,'result')
                    /**图片上传错误回调 */
                },
                customInsert: (insertImg, result, editor) => {
                    insertImg(`${this.reqApi.shuiwuUrl}${result.imgCodes}`); //图片回显
                    /**图片上传成功，插入图片回调 */
                }
            };
            this.editor1.customConfig.uploadImgHooks = {
                customInsert: (insertImg, result, editor) => {
                    insertImg(`${this.reqApi.shuiwuUrl}${result.imgCodes}`); //图片回显
                    /**图片上传成功，插入图片回调 */
                }
            };
            // 自定义多张上传 暂时不用
            // this.editor.customConfig.customUploadImg = (files, insert) => {
            //     var formData = new FormData();

            //     for (var i = 0; i < files.length; i++) {
            //         formData.append(
            //             "files[" + i + "]",
            //             files[i],
            //             files[i].name
            //         );
            //     }
            // };

            // 自定义上传参数
            this.editor.customConfig.uploadImgParams = {
                token: sessionStorage.getItem("token")
            };
            this.editor1.customConfig.uploadImgParams = {
                token: sessionStorage.getItem("token")
            };
            // 上传图片的错误提示默认使用alert弹出，你也可以自定义用户体验更好的提示方式
            this.editor.customConfig.customAlert = info => {
                // alert(12);
                // info 是需要提示的内容
                this.$message.error("错误提示：" + info);
            };
            this.editor1.customConfig.customAlert = info => {
                // alert(12);
                // info 是需要提示的内容
                this.$message.error("错误提示：" + info);
            };

            this.editor.create();
            this.editor1.create();
        },
        submit1(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ruleForm1.questionCode = sessionStorage.getItem(
                        "questionUUid"
                    );
                    this.$utils
                        .post(
                            this.reqApi.shuiwuUrl + "/question/prc/createQu",
                            qs.stringify({
                                question: JSON.stringify(this.form),
                                bank_ids: JSON.stringify(this.bank_ids)
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                sessionStorage.setItem(
                                    "questionUUid",
                                    res.data.question_uuid
                                );
                                if (sessionStorage.getItem("questionUUid")) {
                                    this.$utils
                                        .post(
                                            this.reqApi.xinls +
                                                "/exam/account/add",
                                            qs.stringify(this.ruleForm1)
                                        )
                                        .then(res => {
                                            if (res.data.code === "0000") {
                                                this.dialogVisible1 = false;
                                                this.$message.success(
                                                    "提交成功！！"
                                                );
                                                sessionStorage.setItem(
                                                    "questionUUid",
                                                    res.data.data
                                                );
                                                this.$router.push({
                                                    name: "dictionary"
                                                });
                                            } else {
                                                this.$message.error(
                                                    res.data.msg
                                                );
                                            }
                                        });
                                }
                            } else {
                                return this.$message.error(res.data.msg);
                            }
                        });

                    return;
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/account/add",
                            qs.stringify(this.ruleForm1)
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.dialogVisible1 = false;
                                this.$message.success("提交成功！！");
                                sessionStorage.setItem(
                                    "questionUUid",
                                    res.data.data
                                );
                                this.$router.push({
                                    name: "dictionary"
                                });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        createAccount(formName) {
            this.form.content = cleanWord(this.form.content);
            this.form.resolve = cleanWord(this.form.resolve);
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (sessionStorage.getItem("tag")) {
                        sessionStorage.removeItem("tag");
                    }
                    if (this.$route.query.qid) {
                        this.form.create_time = null;
                        this.form.update_time = null;
                        this.dialogVisible1 = true;
                        this.$utils
                            .post(
                                this.reqApi.shuiwuUrl +
                                    "/question/prc/updateQu",
                                qs.stringify({
                                    question: JSON.stringify(this.form),
                                    bank_ids: JSON.stringify(this.bank_ids)
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    sessionStorage.setItem(
                                        "questionUUid",
                                        this.form.practice_question_uuid
                                    );
                                    if (sessionStorage.getItem("activeName")) {
                                        sessionStorage.removeItem("activeName");
                                    }
                                    return;
                                    this.$router.push({
                                        name: "dictionary",
                                        query: {
                                            id: this.form.practice_question_uuid
                                        }
                                    });
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    } else {
                        this.form.question.content = this.form.content;
                        this.form.question.key = this.form.key;
                        this.form.question.status = this.form.status;
                        this.form.question.resolve = this.form.resolve;
                        this.form.question.type = this.form.type;
                        this.form.question.level = this.form.level;
                        this.dialogVisible1 = true;
                        // 测试
                        return;
                        this.$utils
                            .post(
                                this.reqApi.shuiwuUrl +
                                    "/question/prc/createQu",
                                qs.stringify({
                                    question: JSON.stringify(this.form),
                                    bank_ids: JSON.stringify(this.bank_ids)
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    sessionStorage.setItem(
                                        "questionUUid",
                                        res.data.question_uuid
                                    );
                                    this.dialogVisible1 = true;
                                    return;
                                    this.$router.push({
                                        name: "accountSetList"
                                    });
                                    if (sessionStorage.getItem("activeName")) {
                                        sessionStorage.removeItem("activeName");
                                    }
                                } else {
                                    return this.$message.error(res.data.msg);
                                }
                            });
                    }
                } else {
                    return false;
                }
            });
        },
        toAccountSet() {
            this.$router.push({
                name: "accountSetList"
            });
        },
        goback() {
            if (
                sessionStorage.getItem("sx") ||
                this.$route.query.qid ||
                this.$route.query.flag1
            ) {
                this.$router.push({
                    name: "practicalTraining"
                });
                // this.previousPage = "/practicalTraining";
                sessionStorage.removeItem("sx");
            } else {
                // this.previousPage = "/manageQuestion";
                this.$router.push({
                    name: "manageQuestion"
                });
            }
        },
        // 题库单选
        selectSingle(selection) {
            this.bank_ids = [];
            selection.forEach(item => {
                if (item.objective_bank_id) {
                    this.bank_ids.push(item.objective_bank_id);
                } else {
                    this.bank_ids.push(item.practice_bank_id);
                }
            });
        },
        // 题库全选
        selectAll(selection) {
            this.bank_ids = [];
            selection.forEach(item => {
                if (item.objective_bank_id) {
                    this.bank_ids.push(item.objective_bank_id);
                } else {
                    this.bank_ids.push(item.practice_bank_id);
                }
            });
        },
        // 获取题库列表
        async getItemBank() {
            if (this.$route.query.flag1) {
                // 实训题
                await this.$utils
                    .post(
                        this.reqApi.shuiwuUrl + "/question/prc/listBank",
                        qs.stringify({
                            pageSize: this.pageSize1
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.itemBankList = res.data.banks.list;
                        } else {
                            return this.$message.error(res.data.msg);
                        }
                    });
            } else {
                // 客观题
                await this.$utils
                    .post(
                        this.reqApi.shuiwuUrl + "/question/obj/listBank",
                        qs.stringify({
                            pageSize: this.pageSize1
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.itemBankList = res.data.banks.list;
                        } else {
                            return this.$message.error(res.data.msg);
                        }
                    });
            }
        },
        async chooseSubject() {
            this.dialogVisible = true;
            await this.getItemBank();
            if (this.$route.query.id) {
                this.itemBankList.forEach((item, index) => {
                    this.bank_ids.forEach(item2 => {
                        if (item.objective_bank_id == item2) {
                            this.$nextTick(() => {
                                this.$refs.multipleTable.toggleRowSelection(
                                    this.itemBankList[index],
                                    true
                                );
                            });
                        }
                    });
                });
            } else {
                // 实训题
                // this.practice_bank_id
                this.itemBankList.forEach((item, index) => {
                    this.bank_ids.forEach(item2 => {
                        if (item.practice_bank_id == item2) {
                            this.$nextTick(() => {
                                this.$refs.multipleTable.toggleRowSelection(
                                    this.itemBankList[index],
                                    true
                                );
                            });
                        }
                    });
                });
            }
        },
        tobasicInfo(formName) {
            // this.form.content = cleanWord(this.form.content);
            // this.form.resolve = cleanWord(this.form.resolve);
            this.$refs[formName].validate(valid => {
                this.disableBtn = true;
                setInterval(() => {
                    this.disableBtn = false;
                }, 3000);
                if (valid) {
                    let reg = new RegExp(this.reqApi.shuiwuUrl, "g");
                    this.form.content = this.form.content.replace(reg, "");
                    this.form.resolve = this.form.resolve.replace(reg, "");
                    if (this.$route.query.qid) {
                        this.form.create_time = null;
                        this.form.update_time = null;
                        // sessionStorage.setItem("locked", this.form.locked);
                        sessionStorage.setItem(
                            "tihaoUUID",
                            this.form.practice_question_uuid
                        );
                        //1是锁定
                        if (this.form.locked == 1) {
                            return this.$router.push({
                                name: "accountSetList",
                                query: {
                                    qid: this.$route.query.qid,
                                    flag1: this.$route.query.flag1,
                                    locked: this.form.locked
                                }
                            });
                        } else {
                            // sessionStorage.removeItem("locked");
                        }

                        // return
                        this.$utils
                            .post(
                                this.reqApi.shuiwuUrl +
                                    "/question/prc/updateQu",
                                qs.stringify({
                                    question: JSON.stringify(this.form),
                                    bank_ids: JSON.stringify(this.bank_ids)
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    sessionStorage.setItem(
                                        "tihaoUUID",
                                        this.form.practice_question_uuid
                                    );
                                    this.$router.push({
                                        name: "accountSetList",
                                        query: {
                                            qid: this.$route.query.qid,
                                            flag1: this.$route.query.flag1,
                                            locked: this.form.locked
                                        }
                                    });
                                    // sessionStorage.setItem(
                                    //     "questionUUid",
                                    //     this.form.practice_question_uuid
                                    // );
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    } else {
                        this.form.question.content = this.form.content;
                        this.form.question.key = this.form.key;
                        this.form.question.status = this.form.status;
                        this.form.question.resolve = this.form.resolve;
                        this.form.question.type = this.form.type;
                        this.form.question.level = this.form.level;

                        this.$utils
                            .post(
                                this.reqApi.shuiwuUrl +
                                    "/question/prc/createQu",
                                qs.stringify({
                                    question: JSON.stringify(this.form),
                                    bank_ids: JSON.stringify(this.bank_ids)
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    sessionStorage.setItem(
                                        "tihaoUUID",
                                        res.data.question_uuid
                                    );
                                    this.$router.push({
                                        name: "accountSetList",
                                        query: {
                                            qid: res.data.question_uuid,
                                            flag1: this.$route.query.flag1
                                        }
                                    });
                                    if (sessionStorage.getItem("activeName")) {
                                        sessionStorage.removeItem("activeName");
                                    }
                                } else {
                                    return this.$message.error(res.data.msg);
                                }
                            });
                    }
                } else {
                    return false;
                }
            });
        },
        getSbzlMc(sbzl_dm) {
            for (const key in this.sbzlDmList) {
                if (sbzl_dm === this.sbzlDmList[key].sbzlDm)
                    return this.sbzlDmList[key].sbzlMc;
            }
        },
        getSbzlList() {
            this.$utils.post("tax/getSbzlList").then(res => {
                const { code, list } = res.data;
                if (code === "00") return (this.sbzlDmList = list);
                else return this.$message("获取申报种类失败！");
            });
        },
        getQuestionInfo() {
            let reg = new RegExp('src="', "g");
            if (this.$route.query.id) {
                this.$utils
                    .post(
                        this.reqApi.shuiwuUrl + "/question/obj/detailQu",
                        qs.stringify({
                            questions_id: this.$route.query.id
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.form = res.data.quVo.question;

                            this.form.resolve = this.form.resolve.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                            this.form.content = this.form.content.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                            this.editor1.txt.html(this.form.content);
                            this.editor.txt.html(this.form.resolve);
                            this.form.options = res.data.quVo.options;
                            // if (res.data.banks) {
                            //     this.bank_ids = res.data.banks;
                            // }
                            if (res.data.banks.length > 0) {
                                res.data.banks.forEach(item => {
                                    this.bank_ids.push(item.objective_bank_id);
                                });
                            }
                        } else {
                            this.$message(res.data.msg);
                        }
                    });
            } else if (this.$route.query.qid) {
                this.$utils
                    .post(
                        this.reqApi.shuiwuUrl + "/question/prc/detailQu",
                        qs.stringify({
                            questions_id: this.$route.query.qid
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.form = res.data.question;
                            // let reg= new RegExp('src="', "g");
                            this.form.resolve = this.form.resolve.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                            this.form.content = this.form.content.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                            this.editor1.txt.html(this.form.content);
                            this.editor.txt.html(this.form.resolve);

                            this.form.options = res.data.options;
                            this.bank_ids = [];
                            if (res.data.banks.length > 0) {
                                res.data.banks.forEach(item => {
                                    this.bank_ids.push(item.practice_bank_id);
                                });
                            }
                        } else {
                            this.$message(res.data.msg);
                        }
                    });
            }
        },
        // 章节目
        getZJM() {
            this.$utils.post("exam/course/findCourse").then(res => {
                const { code, list } = res.data;
                if (code == "00") {
                    this.curriculumList = list;
                    for (const i of list) {
                    }
                }
            });
        },
        curriculum(cid, key) {
            this.$utils
                .post(`exam/course/findCourseChapter/${cid}`)
                .then(res => {
                    const { code, list } = res.data;
                    if (code == "00" && key === "N") {
                        this.chaptersList = list;
                        this.sectionList = [];
                        this.finalList = [];
                        this.form.chapter = "";
                        this.form.section = "";
                        this.form.directory = "";
                    } else return (this.chaptersList = list);
                });
        },
        chapters(id, key) {
            this.$utils
                .post(`exam/course/findCourseSection/${id}`)
                .then(res => {
                    const { code, list } = res.data;
                    if (code == "00" && key === "N") {
                        this.sectionList = list;
                        this.finalList = [];
                        this.form.section = "";
                        this.form.directory = "";
                    } else return (this.sectionList = list);
                });
        },
        section(id, key) {
            this.$utils
                .post(`exam/course/findCourseDirectory/${id}`)
                .then(res => {
                    const { code, list } = res.data;
                    if (code == "00" && key === "N") {
                        this.finalList = list;
                        this.form.directory = "";
                    } else return (this.finalList = list);
                });
        },
        // 选择试卷后
        examRow(row) {
            this.case_mc = row.case_mc;
            this.form.caseBh = row.case_bh;
            this.form.sbzlDm = row.sbzl_dm;
            this.dialogVisibleData = false;
        },

        handleCaseCX() {
            const that = this;
            if (
                that.formline.case_mc === "" &&
                that.formline.case_bh === "" &&
                that.formline.sbzl_dm === ""
            )
                return that.getCaseList();
            that.$utils
                .post("tax/getCaseListSearch", that.formline)
                .then(res => {
                    const { code, list } = res.data;
                    if (code === "00") {
                        that.list = list;
                        that.total = list.length;
                        that.tableData = [];
                        list.forEach((item, index) => {
                            if (index < that.pagesize)
                                return that.tableData.push(item);
                        });
                    }
                })
                .catch(_ => {
                    that.$message.error("网络异常");
                });
        },

        // 获取案例列表
        getCaseList(getMc, getBh) {
            const that = this;
            that.$utils.post(`tax/getCaseList`).then(res => {
                const { list, code, msg } = res.data;
                if (code === "00") {
                    if (getMc === "getMc") {
                        for (const key in list) {
                            if (list[key].case_bh === getBh) {
                                that.case_mc = list[key].case_mc;
                            }
                        }
                    } else {
                        that.list = list;
                        that.total = list.length;
                        that.tableData = [];
                        list.forEach((item, index) => {
                            if (index < that.pagesize)
                                return that.tableData.push(item);
                        });
                        that.dialogVisibleData = true;
                    }
                }
            });
        },

        // 多选
        MultipleChoice(e) {
            const that = this;
            const check_checked = e.target.checked;
            const check_value = e.target.value;
            if (check_checked) that.checkList += check_value;
            else that.checkList = that.checkList.replace(check_value, "");
            let str = that.checkList;
            let arr = str.split("");
            arr = arr.sort();
            that.checkList = arr.join("");
            that.form.key = that.checkList;
        },

        // 添加案例框
        changeAdd() {
            if (this.form.type != "4") {
                // this.form.caseBh = "";
                // this.form.sbzlDm = "";
                // this.form.autocalc = ''
                this.case_mc = "";
                if (this.form.type == "3") {
                    this.form.options = [
                        {
                            oid: 1,
                            option: "A",
                            oqid: "",
                            content: "正确"
                        },
                        {
                            oid: 2,
                            option: "B",
                            oqid: "",
                            content: "错误"
                        }
                    ];
                } else {
                    this.form.options = [];
                }
            }
            this.rules.caseBh[0].required =
                this.form.type != "4" ? false : true;
            // this.rules.autocalc[0].required = this.form.type != '4' ? false : true
            if (this.$route.query.flag1) {
                this.flag = false;
            } else {
                this.flag = true;
            }
        },

        // 增加选项
        addOption(obj) {
            if (obj.length > 4) return this.$message("不能加了！");
            else {
                let list = {
                    oid: parseFloat(obj.length) + 1,
                    option: "",
                    oqid: "",
                    content: ""
                };
                obj.push(list);
                this.optionsABC();
            }
        },

        // 批量导入试题
        batchLeadQuestion() {
            this.$router.push({ name: "batchLeadQuestion" });
        },
        // 管理试题
        manageQuestion1() {
            if (this.$route.query.flag1) {
                this.$router.push({
                    name: "practicalTraining"
                });
            } else {
                this.$router.push({ name: "manageQuestion" });
            }
        },

        // 删除选中行
        delOption(obj, index) {
            if (obj.length <= 0) {
                this.$message("不能删了！");
                this.optionsABC();
            } else {
                obj.splice(index, 1);
                this.optionsABC();
            }
        },
        // 提交
        newQuestion(formName) {
            this.disableBtn = true;
            setInterval(() => {
                this.disableBtn = false;
            }, 3000);
            // this.form.content = cleanWord(this.form.content);
            // this.form.resolve = cleanWord(this.form.resolve);
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let reg = new RegExp(this.reqApi.shuiwuUrl, "g");
                    this.form.content = this.form.content.replace(reg, "");
                    this.form.resolve = this.form.resolve.replace(reg, "");
                    this.form.question = {};
                    this.form.question.content = this.form.content;
                    this.form.question.key = this.form.key;
                    this.form.question.status = this.form.status;
                    this.form.question.resolve = this.form.resolve;
                    this.form.question.type = this.form.type;
                    this.form.question.level = this.form.level;
                    this.form.question.name = this.form.name;
                    this.form.question.open = this.form.open;
                    // return
                    if (this.form.number) {
                        this.form.question.number = this.form.number;
                    } else {
                        this.form.question.number = null;
                    }

                    this.form.question.objective_question_uuid = this.form.objective_question_uuid;
                    if (this.form.options.length > 0) {
                        if (this.form.type == "3") {
                            if (!this.form.question.key) {
                                return this.$message.error("请设置正确答案");
                            }
                        }
                        // 单选题判断增加了选项有没有题目内容或者选择正确答案
                        if (this.form.type == "1") {
                            let flag = false;
                            for (const i of this.form.options) {
                                if (i.option) {
                                    if (!i.content.trim()) {
                                        return this.$message.error(
                                            "请填写选项内容！！"
                                        );
                                    } else {
                                        flag = false;
                                    }
                                }
                            }
                            if (flag) {
                            }
                            if (!this.form.question.key) {
                                return this.$message.error("请设置正确答案");
                            }
                        }
                        //多选
                        if (this.form.type == "2") {
                            if (!this.form.question.key) {
                                return this.$message.error("请设置正确答案");
                            } else {
                                if (this.form.question.key.length == 1) {
                                    return this.$message.warning(
                                        "多选题请至少添加2个正确答案"
                                    );
                                }
                            }
                            for (const i of this.form.options) {
                                if (i.option && !i.content.trim()) {
                                    this.$message.error("请填写选项内容！！");
                                    return false;
                                }
                            }
                        }
                    } else {
                        return this.$message.error("请设置选项！！");
                    }

                    let reqUrl = this.$route.query.id
                        ? "/question/obj/updateQu"
                        : "/question/obj/createQu";
                    // if (this.$route.query.id) {
                    //     // 编辑
                    // } else {
                    // 新增
                    // return//暂停执行
                    if (this.form.type != 4) {
                        this.$utils
                            .post(
                                this.reqApi.shuiwuUrl + reqUrl,
                                // "/question/obj/createQu",
                                qs.stringify({
                                    objQuVo: JSON.stringify(this.form),
                                    bank_ids: JSON.stringify(this.bank_ids)
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$message.success("提交成功！");
                                    this.$router.push({
                                        name: "manageQuestion"
                                    });
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    }
                }
                // }
            });
            // return;
            // const that = this;
            // this.form.content = cleanWord(this.form.content);
            // this.form.resolve = cleanWord(this.form.resolve);
            // that.$refs[formName].validate(valid => {
            //     if (valid) {
            //         let obj = that.form;
            //         const Identification = !that.$route.query.id
            //             ? "exam/sys/newQuestion"
            //             : "exam/sys/updateQuestion";
            //         that.$utils.post(Identification, obj).then(res => {
            //             const { code, msg } = res.data;
            //             if (code === "00") {
            //                 that.$router.push({
            //                     name: "manageQuestion"
            //                 });
            //                 that.$message.success(msg);
            //             } else return that.$message(msg);
            //         });
            //     } else {
            //         that.$message("请填写完整！");
            //         return false;
            //     }
            // });
        },

        optionsABC() {
            const ac = this.form.options;
            if (ac[0]) ac[0].option = "A";
            if (ac[1]) ac[1].option = "B";
            if (ac[2]) ac[2].option = "C";
            if (ac[3]) ac[3].option = "D";
            if (ac[4]) ac[4].option = "E";
            if (ac[5]) ac[5].option = "F";
        },

        // 关闭
        handleClose() {
            this.dialogVisibleData = false;
        },

        // 分页
        handleSizeChange(val) {
            this.pagesize = val;
            this.tableData = [];
            this.pagenum = 1;
            this.list.forEach((item, index) => {
                if (index < this.pagesize) return this.tableData.push(item);
            });
        },

        handleCurrentChange(val) {
            this.pagenum = val;
            this.tableData = [];
            const currentIndex = this.pagesize * val;
            this.list.forEach((item, index) => {
                let result = [];
                if (index < currentIndex) {
                    result.push(item);
                    if (index >= this.pagesize * (val - 1))
                        return this.tableData.push(item);
                }
            });
        }
    }
};
</script>

<style scoped>
.newQue-body {
    /* border: 1px solid #dbdfe6; */
}
.newQue-body .new-header {
    height: 50px;
    background-color: #54c9de;
}
.newQue-body .new-body {
    padding: 30px 100px;
}
.wushi {
    display: inline-block;
}

.inputWid {
    width: 250px;
}

.optionA {
    margin-bottom: 15px;
    padding: 10px 20px;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#f3f3f3), to(#ddd));
    overflow: hidden;
    position: relative;
}
.optionA div:nth-child(2) {
    width: 100px;
    min-width: 100px;
    float: left;
}
.optionA div:nth-child(2) span {
    padding-right: 20px;
}
.optionTx {
    position: absolute;
    left: 130px;
    right: 200px;
    top: 10px;
    bottom: 10px;
    width: 70%;
    padding: 0 10px;
}
.optionA div:nth-child(3) {
    width: 100px;
    min-width: 100px;
    float: right;
    text-align: center;
    cursor: pointer;
}
div.el-select {
    width: 250px;
}

#new-question .abc .ql-toolbar.ql-snow {
    border: 1px solid #ccc;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    padding: 8px;
    background-color: #ccc !important;
}

.inputWid-q {
    width: 100px;
}
.titleText {
    margin-left: 20px;
    margin-top: 10px;
}
.trueOrFalse {
    display: flex;
}

.trueOrFalse:first-child > div {
    margin-right: 30px;
}
.btnBox {
    position: relative;
    margin-left: 100px;
}
.nextButton {
    position: absolute;
    top: 0px;
    left: -10px;
}
.marginLeft {
    margin-left: 100px;
}
#new-question .submitBtn {
    background-color: #444;
    color: #fff;
}
.tableBox {
    width: 500px;
    margin: 0 auto;
    height: 400px;
}
.inputWidth {
    width: 250px;
}
.previousPage {
    /* position: absolute;
    top: 30px;
    right: 35px; */
    float: right;
    margin: 20px 20px 0 0;
    cursor: pointer;
    z-index: 55;
}
.el-button {
    border: 1px solid #444;
    /* color: #444; */
    padding: 7px 20px;
}
.titleNumber {
    display: inline-block;
    width: 250px;
}
/* #new-question .el-table-column--selection .cell{
    padding-left: 0px!important; 
} */
</style>