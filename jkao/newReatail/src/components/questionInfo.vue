<template>
    <div class="countDown" id="questionInfo">
        <!-- 题干 -->
        <button class="showQuestion" v-if="hideTit" @click="showQuestion">显示题干</button>
        <!-- 题干遮罩层弹窗 -->
        <el-dialog
            title="考试内容"
            :visible.sync="dialogVisible"
            width="65%"
            :append-to-body="true"
            :close-on-click-modal="true"
        >
            <div id="maxBox">
                <h4>题干</h4>
                <!-- <p v-html="questionInfo2"></p>  -->
                <p>上一题</p>
                <div v-html="preContent"></div>
                当前题干
                <div v-html="content"></div>
                下一题题干
                <div v-html="nextContent"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "questionInfo",
    data() {
        return {
            dialogVisible: false,
            questionInfo2: "",
            hideTit: true,
            preContent: "",
            nextContent: "",
            content: ""
        };
    },
    created() {
        if(sessionStorage.getItem("questionInfo")){
            this.questionInfo=JSON.parse(sessionStorage.getItem("questionInfo"))
        }
        this.questionInfo.prcQus.forEach((item, index) => {
            if (index == this.questionInfo.index) {
                // 当前题干
                this.content = item.content;
            } else if (this.questionInfo.index - 1 == index) {
                // 上一题题干
                this.preContent = item.content;
            } else if (this.questionInfo.index + 1 == index) {
                //下一题题干
                this.nextContent = item.content;

            }
        });
        // this.questionInfo2=this.questionInfo.replace(/<[^>]+>|&[^>]+;/g, "").trim();
        this.questionInfo2 = this.questionInfo;
        let flag = sessionStorage.getItem("questionInfo");
        if (flag === "undefined") {
            this.hideTit = false;
        } else {
            this.hideTit = true;
        }
    },
    methods: {
        showQuestion() {
            this.dialogVisible = true;
        }
    }
};
</script>

<style scoped>
#maxBox {
    max-height: 600px;
    overflow-y: scroll;
}
#maxBox table {
    background-color: #31b5ff;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
}

#maxBox table td,
#maxBox table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
}

#maxBox table th {
    border-bottom: 1px solid #ccc;
    text-align: center;
}
</style>
