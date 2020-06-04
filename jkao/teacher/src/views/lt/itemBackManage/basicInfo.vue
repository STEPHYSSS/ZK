<template>
    <el-card class="f-new box-card" id="new-question">
        <h3>基础账套</h3>
        <div class="basicInfo">
            <new-tabs :active="active" :data="data"></new-tabs>


        <div class="basicBox">
            <router-view></router-view>
            <!-- <el-button>保存</el-button> -->
            <!-- <el-button @click="previous">上一步</el-button> -->
            <el-button class="positionBtn nexttip" @click="toNext" v-if="!tag">下一步</el-button>
            <el-button class="positionBtn" @click="goback">返回</el-button>
        </div>
        </div>
    </el-card>
</template>
<script>
import newTabs from "@/components/newTabs";
// import categoryPages from './categoryPages'//类目管理
// import commodityPages from './commodityPages' //商品管理
// import warehousePages from './warehousePages'//仓库管理
// import reservoirArea from './reservoirArea' //库区管理
// import storeInventoryPages from './storeInventoryPages' //门店库存
// import warehouseInventory from './warehouseInventory' //仓库库存

export default {
    data() {
        return {
            active: 0,
            activeName: "0",
            tag: sessionStorage.getItem("tag"),
            data: [
                {
                    label: "基础数据",
                    children: [
                        {
                            label: "字典管理",
                            url: "dictionary",
                            id:6,
                        },
                        {
                            label: "供应商管理",
                            url: "smanagement",
                             id:7
                        },
                        {
                            label: "门店管理",
                            url: "storeManage",
                             id:8
                        },
                        {
                            label: "类目管理",
                            url: "categoryPages",
                            id:9

                        },
                        {
                            label: "商品管理",
                            url: "commodityPages",
                            id:10
                        },
                        {
                            label: "角色管理",
                            url: "role",
                            id:11
                        },
                        {
                            label: "职员管理",
                            url: "staff",
                            id:12
                        },
                        {
                            label: "会员级别",
                            url: "membership",
                            id:13
                        },
                        {
                            label: "仓库设置",
                            url: "warehousePages",
                             id:14
                        },
                        {
                            label: "库区设置",
                            url: "reservoirArea",
                             id:15
                        },
                        {
                            label: "门店库存",
                            url: "storeInventoryPages",
                             id:16
                        },
                        {
                            label: "仓库库存",
                            url: "warehouseInventory",
                             id:17
                        }
                    ]
                },
                {
                    label: "单据数据",
                    children: [
                        {
                            label: "门店叫货单",
                            url: "invoice",
                            id:1
                        },
                        {
                            label: "供应商采购单",
                            url: "shoporder",
                            id:2
                        },
                        {
                            label: "门店配送单",
                            url: "receiving",
                            id:3
                        },
                        {
                            label: "门店修正单",
                            url: "amendment",
                            id:4
                        },
                        {
                            label: "门店盘点单",
                            url: "storeManagement",
                             id:18
                        },
                        {
                            label: "门店退货单",
                            url: "returnOrder",
                             id:19
                        },
                        {
                            label: "门店报废单",
                            url: "scrapManage",
                             id:20
                        },
                        {
                            label: "门店转移单",
                            url: "transferSlip",
                            id:21
                        },
                        {
                            label: "仓库出库单",
                            url: "orderWarehouseList",
                            id:5
                        },
                        {
                            label: "仓库拣货单",
                            url: "pickingOrders",
                            id:28
                        },
                        {
                            label: "仓库盘点单",
                            url: "CKInventory",
                            id:23
                        },
                        {
                            label: "仓库采购单",
                            url: "CKProcurement",
                            id:24
                        },
                        {
                            label: "仓库其他入库单",
                            url: "CKotherWarehouseList",
                            id:25
                        },
                        {
                            label: "仓库其他出库单",
                            url: "CKOtherdepots",
                            id:26
                        },
                        {
                            label: "仓库转移单",
                            url: "CKTurnWarehouseList",
                            id:27
                        }
                    ]
                },
            ]
        };
    },
    components: {
        newTabs
    },
    created() {
        //  console.log(4)
        // if(sessionStorage.getItem('activeName')){
        //   this.active=sessionStorage.getItem('activeName')
        // }
    },
    mounted() {
        if (sessionStorage.getItem("activeName")) {
            this.active = Number(sessionStorage.getItem("activeName"));
        }
    },
    methods: {
        toTabs(active, val) {
            this.active = active;
            sessionStorage.setItem("activeName", active);
            this.$router.push(val.url);
        },
        previous() {
            this.$router.go(-1);
        },
        goback() {
            if (sessionStorage.getItem("tag")) {
                this.$router.push({
                    name: "testLedgerList"
                });
                sessionStorage.removeItem("tag");
                sessionStorage.removeItem("activeName");
                sessionStorage.removeItem("questionUUid");
            } else {
                this.$router.push({
                    name: "practicalTraining"
                });
                sessionStorage.removeItem("activeName");
                sessionStorage.removeItem("questionUUid");
            }
        },
        toNext() {
            this.$router.push({
                name: "setAnswer"
            });
        }
        // dictionary() {
        //     sessionStorage.setItem("activeName", this.active);
        //     this.$router.push("/dictionary");
        // },
        // categoryPages() {
        //     sessionStorage.setItem("activeName", this.active);
        //     this.$router.push({ name: "categoryPages" });
        // },
        // commodityPages() {
        //     sessionStorage.setItem("activeName", this.active);
        //     this.$router.push({ name: "commodityPages" });
        // },
        // warehousePages() {
        //     sessionStorage.setItem("activeName", this.active);
        //     this.$router.push({ name: "warehousePages" });
        // },
        // reservoirArea() {
        //     sessionStorage.setItem("activeName", this.active);
        //     this.$router.push({ name: "reservoirArea" });
        // },
        // storeInventoryPages() {
        //     sessionStorage.setItem("activeName", this.active);
        //     this.$router.push({ name: "storeInventoryPages" });
        // },
        // warehouseInventory() {
        //     sessionStorage.setItem("activeName", this.active);
        //     this.$router.push({ name: "warehouseInventory" });
        // }
        // handleClick(tab, event) {
        // }
    }
};
</script>
<style scoped>
.basicBox {
    /* padding: 0 20px; */
    flex: 1;
    margin-left: 10px;
    border: 1px solid #eee;
    padding: 20px 0 0 20px;
    box-sizing: border-box;
}
#new-question {
    position: relative;
}
.positionBtn {
    position: absolute;
    top: 9px;
    right: 20px;
}
.nexttip {
    right: 100px;
}
.basicInfo{
    display: flex;
    margin: 0 20px;
    width: calc(100% - 40px);
}
</style>
