<template>
    <el-card class="box-card f-new">
        <h3 v-if="$route.query.id">修改文章</h3>
        <h3 v-else>新增文章</h3>
        <previous-page goPreviousPage="/articleList"></previous-page>
        <div class="newQue-body">
            <div class="new-header"></div>
            <div class="new-body">
                <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                    <div>
                        <el-form-item label="标题:" prop="name" class="wushi">
                            <el-input
                                maxlength="50"
                                type="text"
                                v-model="form.name"
                                id="inputColor"
                                class="inputBbig"
                            ></el-input>
                            <!-- <div class="kan">
              <img src="@/assets/images/alter_icon.png" alt="">
                            </div>-->
                            <!-- <el-color-picker class="pao" v-model="colorIN"></el-color-picker> -->
                        </el-form-item>
                        <el-form-item label="访问量:" prop="visits" class="wushi fr">
                            <el-input maxlength="9" v-model.number="form.visits" class="inputWid"></el-input>
                        </el-form-item>
                    </div>

                    <div>
                        <el-form-item label="分类:" prop="type_id" class="wushi">
                            <el-select v-model="form.type_id" placeholder="请选择">
                                <el-option
                                    v-for="(item,index) in list"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态:" prop="status" class="wushi fr">
                            <el-select v-model="form.status" placeholder="请选择">
                                <el-option label="开放" :value="1"></el-option>
                                <el-option label="关闭" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div></div>
                    <el-form-item label="文章内容:" prop="content">
                        <template>
                            <div id="editor"></div>
                        </template>
                    </el-form-item>
                    <el-form-item>
                        <add-btn
                            level1="提 交"
                            level2="取 消"
                            @submitForm="newArticle('form')"
                            @cancelForm="articleList"
                        ></add-btn>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-card>
</template>

<script>
import {
    newNotice,
    updateNotice,
    noticeListType
} from "@/api/taxUrl/announcement";
import newTabs from "@/components/newTabs";
import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
import previousPage from "@/components/previousPage.vue";
export default {
    data() {
        return {
            editor: "",
            // neirong: '',
            // 缩略图
            imageUrl: "",
            // 题库列表
            list: [],
            // 字体颜色
            colorIN: "#606266",
            form: {
                id: null,
                name: "",
                content: "",
                create_time: null,
                create_user_id: null,
                update_time: null,
                update_user_id: null,
                status: 1,
                over_time: null,
                visits: "",
                school_uuid: null,
                type_id: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "标题不能为空！",
                        trigger: "blur"
                    }
                ],
                type_id: [
                    {
                        required: true,
                        message: "分类不能为空！",
                        trigger: "blur"
                    }
                ],
                status: [
                    {
                        required: true,
                        message: "状态不能为空！",
                        trigger: "blur"
                    }
                ],
                ntotop: [
                    {
                        required: true,
                        message: "置顶不能为空！",
                        trigger: "blur"
                    }
                ],
                visits: [
                    {
                        required: true,
                        message: "访问量不能为空！",
                        trigger: "blur"
                    },
                    {
                        type: "number",
                        message: "访问量为数字类型！",
                        trigger: "blur"
                    }
                ],
                nauthor: [
                    {
                        required: true,
                        message: "作者不能为空！",
                        trigger: "blur"
                    }
                ],
                nnewsfrom: [
                    {
                        required: true,
                        message: "来源不能为空！",
                        trigger: "blur"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "文章内容不能为空！",
                        trigger: "blur"
                    }
                ]
            },
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
                // 'image',  // 插入图片
                "table", // 表格
                // 'video',  // 插入视频
                "code", // 插入代码
                "undo", // 撤销
                "redo" // 重复
            ]
        };
    },
    components: {
        newTabs,
        "previous-page": previousPage
    },

    created() {
        this.noticeListType();
        if (this.$route.query.id) return this.getArticleInfo();
    },
    mounted() {
        this.editor = new Editor("#editor");
        this.editor.customConfig.menus = this.editorOption;
        this.editor.customConfig.onchange = html => {
            this.form.content = html;
        };
        this.editor.create();
    },

    methods: {
        getArticleInfo() {
            let announcementInfo = JSON.parse(
                sessionStorage.getItem("announcementInfo")
            );
            this.form = announcementInfo;
            let timer = setTimeout(() => {
                clearTimeout(timer);
                this.editor.txt.html(this.form.content);
            }, 100);
        },

        // 获取分类列表
        async noticeListType() {
            const {
                data: { code, anno_types }
            } = await noticeListType();
            if (code === "0000") return (this.list = anno_types.list);
        },

        // 文章列表
        articleList() {
            this.$router.push({ name: "articleList" });
        },

        // 提交
        newArticle(formName) {
            const that = this;
            that.$refs[formName].validate(async valid => {
                if (valid) {
                    let res = {};
                    that.form.create_time = null;
                    that.form.update_time = null;
                    if (!that.$route.query.id) {
                        res = await newNotice(that.form);
                    } else {
                        res = await updateNotice(that.form);
                    }
                    const { code, msg } = res.data;
                    if (code === "0000") {
                        sessionStorage.removeItem("announcementInfo");
                        that.$router.push({ name: "articleList" });
                        that.$message.success(msg);
                    } else return that.$message(msg);
                } else {
                    that.$message("请填写完整！");
                    return false;
                }
            });
        }
    },

    watch: {
        colorIN: function(val) {
            const abc = document.querySelector("#inputColor");
            abc.style.color = val;
            this.form.ntitle_color = val;
        }
    }
};
</script>

<style scoped>
.newQue-body {
    border: 1px solid #dbdfe6;
}
.newQue-body .new-header {
    /* height: 50px;
    background-color: #54c9de; */
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
.inputBbig {
    width: 250px;
}
div.el-select {
    width: 250px !important;
}
/* 缩略图 */
.avatar-uploader {
    border: 1px dashed #d9d9d9;
    background-color: #dbdfe6;
    border-radius: 6px;
    width: 120px;
    height: 120px;
}
.avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #fff;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar {
    width: 100%;
    display: block;
}
/* tu */

.kan {
    width: 23px;
    height: 23px;
    display: inline-block;
    padding: 3px;
    border: 1px solid #e6e6e6;
    border-radius: 6px;
    vertical-align: middle;
}
.kan img {
    width: 100%;
    vertical-align: top;
}
.pao {
    position: relative;
    left: -40px;
    opacity: 0;
}
</style>