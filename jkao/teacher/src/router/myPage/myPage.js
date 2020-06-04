export default [{ // 首页
        name: 'mpage',
        path: '/mpage',
        component: (resolve) => require(['@/views/mhomePage'], resolve),
    },
    { // 查看新闻
        name: 'news',
        path: '/news',
        component: (resolve) => require(['@/views/news'], resolve),
    },
    // 管理用户
    {
        name: 'user',
        path: '/user',
        component: (resolve) => require(['@/views/lt/userManage/user'], resolve),
    },
    {
        name: 'findClasses',
        path: '/findClasses',
        component: (resolve) => require(['@/views/lt/userManage/findClasses'], resolve),
    },
    {
        name: 'newClass',
        path: '/newClass',
        component: (resolve) => require(['@/views/lt/userManage/newClass'], resolve),
    },
    {
        name: 'ImportingUsers',
        path: '/ImportingUsers',
        component: (resolve) => require(['@/views/lt/userManage/ImportingUsers'], resolve),
    },
    {
        name: 'addUsers',
        path: '/addUsers',
        component: (resolve) => require(['@/views/lt/userManage/addUsers'], resolve),
    },

    // 题库管理
    { // 题库列表
        name: 'findQuestionDbs',
        path: '/findQuestionDbs',
        component: (resolve) => require(['@/views/lt/itemBackManage/findQuestionDbs'], resolve)
    },
    { // 新增题库
        name: 'addQuestion',
        path: '/addQuestion',
        component: (resolve) => require(['@/views/lt/itemBackManage/addQuestion'], resolve),
    },
    { // 新增题库
        name: 'addQuestionSx',
        path: '/addQuestionSx',
        component: (resolve) => require(['@/views/lt/itemBackManage/addQuestionSx'], resolve),
    },
    { // 新增试题
        name: 'newQuestion',
        path: '/newQuestion',
        component: (resolve) => require(['@/views/lt/itemBackManage/newQuestion'], resolve),
    },
    { // 批量导入试题
        name: 'batchLeadQuestion',
        path: '/batchLeadQuestion',
        component: (resolve) => require(['@/views/lt/itemBackManage/batchLeadQuestion'], resolve),
    },
    { // 管理试题客观题
        name: 'manageQuestion',
        path: '/manageQuestion',
        component: (resolve) => require(['@/views/lt/itemBackManage/manageQuestion'], resolve),
        meta: {
            keepAlive: false
        }
    },
    { // 管理试题实训题
        name: 'practicalTraining',
        path: '/practicalTraining',
        component: (resolve) => require(['@/views/lt/itemBackManage/practicalTraining'], resolve),
        meta: {
            keepAlive: false
        }
    },
    { // 基础账套
        name: 'basicInfo',
        path: '/basicInfo',
        redirect: '/dictionary',
        component: (resolve) => require(['@/views/lt/itemBackManage/basicInfo'], resolve),
        children: [{ // 新增试题实训题类目管理
                name: 'categoryPages',
                path: '/categoryPages',
                component: (resolve) => require(['@/views/lt/itemBackManage/categoryPages'], resolve),
            },
            { // 新增试题实训题商品管理
                name: 'commodityPages',
                path: '/commodityPages',
                component: (resolve) => require(['@/views/lt/itemBackManage/commodityPages'], resolve),
            },
            { // 新增试题实训题商品管理新增
                name: 'supplier',
                path: '/supplier',
                component: (resolve) => require(['@/views/lt/itemBackManage/supplier'], resolve),
            },
            { // 新增试题实训题仓库管理
                name: 'warehousePages',
                path: '/warehousePages',
                component: (resolve) => require(['@/views/lt/itemBackManage/warehousePages'], resolve),
            },
            { // 新增试题实训题仓库管理新增
                name: 'storehouseAdd',
                path: '/storehouseAdd',
                component: (resolve) => require(['@/views/lt/itemBackManage/storehouseAdd'], resolve),
            },
            { // 新增试题实训题库区管理
                name: 'reservoirArea',
                path: '/reservoirArea',
                component: (resolve) => require(['@/views/lt/itemBackManage/reservoirArea'], resolve),
            },
            { // 新增试题实训题库区管理新增
                name: 'reservoirAdd',
                path: '/reservoirAdd',
                component: (resolve) => require(['@/views/lt/itemBackManage/reservoirAdd'], resolve),
            },
            { // 新增试题实训题库区管理货架
                name: 'shelvesAdd',
                path: '/shelvesAdd',
                component: (resolve) => require(['@/views/lt/itemBackManage/shelvesAdd'], resolve),
            },
            { // 新增试题实训题库区管理关联商品
                name: 'shelveshopAdd',
                path: '/shelveshopAdd',
                component: (resolve) => require(['@/views/lt/itemBackManage/shelveshopAdd'], resolve),
            },


            { // 新增试题实训题门店库存
                name: 'storeInventoryPages',
                path: '/storeInventoryPages',
                component: (resolve) => require(['@/views/lt/itemBackManage/storeInventoryPages'], resolve),
            },
            { // 新增试题实训题门店库存新增
                name: 'shopStock',
                path: '/shopStock',
                component: (resolve) => require(['@/views/lt/itemBackManage/shopStock'], resolve),
            },
            { // 新增试题实训题仓库库存
                name: 'warehouseInventory',
                path: '/warehouseInventory',
                component: (resolve) => require(['@/views/lt/itemBackManage/warehouseInventory'], resolve),
            },
            { // 新增试题实训题仓库库存新增
                name: 'warehouseInventoryAdd',
                path: '/warehouseInventoryAdd',
                component: (resolve) => require(['@/views/lt/itemBackManage/warehouseInventoryAdd'], resolve),
            },
            { // 字典管理
                name: 'dictionary',
                path: '/dictionary',
                component: (resolve) => require(['@/views/lt/itemBackManage/dictionary'], resolve),
            },
            { // 会员级别
                name: 'membership',
                path: '/membership',
                component: (resolve) => require(['@/views/lt/itemBackManage/membership'], resolve),
            },
            { // 角色管理
                name: 'role',
                path: '/role',
                component: (resolve) => require(['@/views/lt/itemBackManage/role'], resolve),
            },
            { // 职员管理
                name: 'staff',
                path: '/staff',
                component: (resolve) => require(['@/views/lt/itemBackManage/staff'], resolve),
            },
            { // 供应商管理列表
                name: 'smanagement',
                path: '/smanagement',
                component: (resolve) => require(['@/views/lt/itemBackManage/smanagement'], resolve),
            },
            { // 供应商管理编辑新增
                name: 'suppliermanagement',
                path: '/suppliermanagement',
                component: (resolve) => require(['@/views/lt/itemBackManage/suppliermanagement'], resolve),
            },
            { // 门店管理列表
                name: 'storeManage',
                path: '/storeManage',
                component: (resolve) => require(['@/views/lt/itemBackManage/storeManage'], resolve),
            },
            { // 门店管理新增编辑
                name: 'addStore',
                path: '/addStore',
                component: (resolve) => require(['@/views/lt/itemBackManage/addStore'], resolve),
            },
            // 单据数据

            { // 门店退货单
                name: 'returnOrder',
                path: '/returnOrder',
                component: (resolve) => require(['@/views/lt/basicData/returnOrder'], resolve),
            },
            { // 门店退货单新增
                name: 'billAdd',
                path: '/billAdd',
                component: (resolve) => require(['@/views/lt/basicData/billAdd'], resolve),
            },
            { // 门店退货单详情
                name: 'billdetail',
                path: '/billdetail',
                component: (resolve) => require(['@/views/lt/basicData/billdetail'], resolve),
            },

            { // 门店报废单
                name: 'scrapManage',
                path: '/scrapManage',
                component: (resolve) => require(['@/views/lt/basicData/scrapManage'], resolve),
            },
            { // 门店报废单新增
                name: 'scrapadd',
                path: '/scrapadd',
                component: (resolve) => require(['@/views/lt/basicData/scrapadd'], resolve),
            },
            { // 门店报废单详情
                name: 'scrapdetail',
                path: '/scrapdetail',
                component: (resolve) => require(['@/views/lt/basicData/scrapdetail'], resolve),
            },
            { // 门店转移单
                name: 'transferSlip',
                path: '/transferSlip',
                component: (resolve) => require(['@/views/lt/basicData/transferSlip'], resolve),
            }, {
                // 仓库拣货单
                name: 'pickingOrders',
                path: '/pickingOrders',
                component: (resolve) => require(['@/views/lt/basicData/pickingOrders'], resolve),
            }, {
                // 仓库拣货单详情
                name: 'pickingOrdersDetail',
                path: '/pickingOrdersDetail',
                component: (resolve) => require(['@/views/lt/basicData/pickingOrdersDetail'], resolve),
            }, { //仓库盘点单
                name: 'CKInventory',
                path: '/CKInventory',
                component: (resolve) => require(['@/views/lt/basicData/CKInventory'], resolve),
            }, { //仓库盘点单新增
                name: 'CKwareInvenAdd',
                path: '/CKwareInvenAdd',
                component: (resolve) => require(['@/views/lt/basicData/CKwareInvenAdd'], resolve),
            }, { //仓库盘点单录入
                name: 'CKwareInvenEntry',
                path: '/CKwareInvenEntry',
                component: (resolve) => require(['@/views/lt/basicData/CKwareInvenEntry'], resolve),
            }, { //仓库盘点单复核
                name: 'CKwareInvenCheck',
                path: '/CKwareInvenCheck',
                component: (resolve) => require(['@/views/lt/basicData/CKwareInvenCheck'], resolve),
            }, { //仓库盘点单详情
                name: 'CKwareInvenDetail',
                path: '/CKwareInvenDetail',
                component: (resolve) => require(['@/views/lt/basicData/CKwareInvenDetail'], resolve),
            }, { //13.仓库采购单
                name: 'CKProcurement',
                path: '/CKProcurement',
                component: (resolve) => require(['@/views/lt/basicData/CKProcurement'], resolve),
            }, { //13.仓库采购单新增
                name: 'CKOperaPurWareAdd',
                path: '/CKOperaPurWareAdd',
                component: (resolve) => require(['@/views/lt/basicData/CKOperaPurWareAdd'], resolve),
            }, { //13.仓库采购单详情和审核
                name: 'CKprocurementDetail',
                path: '/CKprocurementDetail',
                component: (resolve) => require(['@/views/lt/basicData/CKprocurementDetail'], resolve),
            }, { //14.仓库其他入库单
                name: 'CKotherWarehouseList',
                path: '/CKotherWarehouseList',
                component: (resolve) => require(['@/views/lt/basicData/CKotherWarehouseList'], resolve),
            }, { //14.仓库其他入库单新增
                name: 'CKotherWarehouseAdd',
                path: '/CKotherWarehouseAdd',
                component: (resolve) => require(['@/views/lt/basicData/CKotherWarehouseAdd'], resolve),
            }, { //14.仓库其他入库单详情
                name: 'CKOtherWarehouseDetail',
                path: '/CKOtherWarehouseDetail',
                component: (resolve) => require(['@/views/lt/basicData/CKOtherWarehouseDetail'], resolve),
            }, { //14.仓库其他入库单审核
                name: 'CKOtherInWareCheck',
                path: '/CKOtherInWareCheck',
                component: (resolve) => require(['@/views/lt/basicData/CKOtherInWareCheck'], resolve),
            }, { //15.仓库其他出库单
                name: 'CKOtherdepots',
                path: '/CKOtherdepots',
                component: (resolve) => require(['@/views/lt/basicData/CKOtherdepots'], resolve),
            }, { //15.仓库其他出库单新增
                name: 'CKOtherDepostAdd',
                path: '/CKOtherDepostAdd',
                component: (resolve) => require(['@/views/lt/basicData/CKOtherDepostAdd'], resolve),
            }, { //15.仓库其他出库单审核与详情
                name: 'CKOtherdepotCheck',
                path: '/CKOtherdepotCheck',
                component: (resolve) => require(['@/views/lt/basicData/CKOtherdepotCheck'], resolve),
            }, { //16.仓库转移单
                name: 'CKTurnWarehouseList',
                path: '/CKTurnWarehouseList',
                component: (resolve) => require(['@/views/lt/basicData/CKTurnWarehouseList'], resolve),
            }, { //16.仓库转移单新增
                name: 'CKturnWarehouseAdd',
                path: '/CKturnWarehouseAdd',
                component: (resolve) => require(['@/views/lt/basicData/CKturnWarehouseAdd'], resolve),
            }, { //16.仓库转移单审核与详情
                name: 'CKTurnLibraryWorkDetail',
                path: '/CKTurnLibraryWorkDetail',
                component: (resolve) => require(['@/views/lt/basicData/CKTurnLibraryWorkDetail'], resolve),

            },
            { // 门店转移单新增
                name: 'transferadd',
                path: '/transferadd',
                component: (resolve) => require(['@/views/lt/basicData/transferadd'], resolve),
            },
            { // 门店转移单详情
                name: 'transferdetail',
                path: '/transferdetail',
                component: (resolve) => require(['@/views/lt/basicData/transferdetail'], resolve),
            },

            { // 门店盘点单
                name: 'storeManagement',
                path: '/storeManagement',
                component: (resolve) => require(['@/views/lt/basicData/storeManagement'], resolve),
            },
            { // 门店盘点单新增
                name: 'inventoryadd',
                path: '/inventoryadd',
                component: (resolve) => require(['@/views/lt/basicData/inventoryadd'], resolve),
            },
            { // 门店盘点单详情
                name: 'inventorydetail',
                path: '/inventorydetail',
                component: (resolve) => require(['@/views/lt/basicData/inventorydetail'], resolve),
            },
            { // 门店盘点单编辑
                name: 'inventoryedit',
                path: '/inventoryedit',
                component: (resolve) => require(['@/views/lt/basicData/inventoryedit'], resolve),
            },
            { // 门店盘点单审核
                name: 'operaInvenDetail',
                path: '/operaInvenDetail',
                component: (resolve) => require(['@/views/lt/basicData/operaInvenDetail'], resolve),
            },
            { // 门店叫货单列表
                name: 'invoice',
                path: '/invoice',
                component: (resolve) => require(['@/views/lt/basicData/invoice'], resolve),
            },
            { // 门店叫货单新增  newOrder
                name: 'newOrder',
                path: '/newOrder',
                component: (resolve) => require(['@/views/lt/basicData/newOrder'], resolve),
            },
            { // 门店叫货单详情
                name: 'goodsmanagement',
                path: '/goodsmanagement',
                component: (resolve) => require(['@/views/lt/basicData/goodsmanagement'], resolve),
            },
            { // 供应商采购单管理
                name: 'shoporder',
                path: '/shoporder',
                component: (resolve) => require(['@/views/lt/basicData/shoporder'], resolve),
            },
            { // 供应商采购单详情
                name: 'shopdetails',
                path: '/shopdetails',
                component: (resolve) => require(['@/views/lt/basicData/shopdetails'], resolve),
            },
            // { // 供应商采购单发货
            //     name: 'confirm',
            //     path: '/confirm',
            //     component: (resolve) => require(['@/views/lt/basicData/confirm'], resolve),
            // },
            { // 门店配送单
                name: 'receiving',
                path: '/receiving',
                component: (resolve) => require(['@/views/lt/basicData/receiving'], resolve),
            },
            { // 门店配送单详情/验收
                name: 'delivered',
                path: '/delivered',
                component: (resolve) => require(['@/views/lt/basicData/delivered'], resolve),
            },
            { // 门店修正单
                name: 'amendment',
                path: '/amendment',
                component: (resolve) => require(['@/views/lt/basicData/amendment'], resolve),
            },
            { // 门店修正单详情
                name: 'refuse',
                path: '/refuse',
                component: (resolve) => require(['@/views/lt/basicData/refuse'], resolve),
            },
            { // 门店修正单一审
                name: 'examine',
                path: '/examine',
                component: (resolve) => require(['@/views/lt/basicData/examine'], resolve),
            },

            { // 门店修正单二审
                name: 'upload',
                path: '/upload',
                component: (resolve) => require(['@/views/lt/basicData/upload'], resolve),
            },
            { // 门店修正单最终审核
                name: 'xiuCheck',
                path: '/xiuCheck',
                component: (resolve) => require(['@/views/lt/basicData/xiuCheck'], resolve),
            },
            { // 仓库出库单
                name: 'orderWarehouseList',
                path: '/orderWarehouseList',
                component: (resolve) => require(['@/views/lt/basicData/orderWarehouseList'], resolve),
            },
            { // 仓库出库单
                name: 'orderEncasement',
                path: '/orderEncasement',
                component: (resolve) => require(['@/views/lt/basicData/orderEncasement'], resolve),
            },
            { // 仓库出库单
                name: 'orderWarehouseDetail',
                path: '/orderWarehouseDetail',
                component: (resolve) => require(['@/views/lt/basicData/orderWarehouseDetail'], resolve),
            },
        ]
    },
    { // 设置答案
        name: 'setAnswer',
        path: '/setAnswer',
        component: (resolve) => require(['@/views/lt/itemBackManage/setAnswer'], resolve),
    },
    { // 选择账套
        name: 'accountSetList',
        path: '/accountSetList',
        component: (resolve) => require(['@/views/lt/itemBackManage/accountSetList'], resolve),
    },

    { // 账套列表
        name: 'testLedgerList',
        path: '/testLedgerList',
        component: (resolve) => require(['@/views/lt/itemBackManage/testLedgerList'], resolve),
    },
    {
        name: 'batchImportPage',
        path: '/batchImportPage',
        component: (resolve) => require(['@/views/lt/itemBackManage/batchImportPage'], resolve)
    },
    // 试卷管理
    { // 试卷管理
        name: 'findPapers',
        path: '/findPapers',
        component: (resolve) => require(['@/views/lt/testPaperManage/findPapers'], resolve),
    },
    { // 创建试卷
        name: 'newPaper',
        path: '/newPaper',
        component: (resolve) => require(['@/views/lt/testPaperManage/newPaper'], resolve),
    },
    { // 考试信息
        name: 'testInfo',
        path: '/testInfo',
        component: (resolve) => require(['@/views/lt/testPaperManage/testInfo'], resolve),
    },
    { // 新建考试
        name: 'newTest',
        path: '/newTest',
        component: (resolve) => require(['@/views/lt/testPaperManage/newTest'], resolve),
    },
    { // 试卷分类
        name: 'findPaperCategorys',
        path: '/findPaperCategorys',
        component: (resolve) => require(['@/views/lt/testPaperManage/findPaperCategorys'], resolve),
    },
    { // 增加试卷分类
        name: 'newPaperCategory',
        path: '/newPaperCategory',
        component: (resolve) => require(['@/views/lt/testPaperManage/newPaperCategory'], resolve),
    },
    { // 配置
        name: 'configOptions',
        path: '/configOptions',
        component: (resolve) => require(['@/views/lt/testPaperManage/configOptions'], resolve),
    },
    { // 配置随机试卷
        name: 'configOptionsSj',
        path: '/configOptionsSj',
        component: (resolve) => require(['@/views/lt/testPaperManage/configOptionsSj'], resolve),
    },
    { // 考试详情
        name: 'examDetails',
        path: '/examDetails',
        component: (resolve) => require(['@/views/lt/testPaperManage/examDetails'], resolve),
    },

    // 自测管理
    { // 自测记录
        name: 'selfTesting',
        path: '/selfTesting',
        component: (resolve) => require(['@/views/lt/selfTestingRecord/selfTesting'], resolve),
    }, { // 自测详情
        name: 'testingDetails',
        path: '/testingDetails',
        component: (resolve) => require(['@/views/lt/selfTestingRecord/testingDetails'], resolve),
    },

    // 系统分析
    { // 试卷分析
        name: 'papersAnalysis',
        path: '/papersAnalysis',
        component: (resolve) => require(['@/views/lt/systemsAnalysis/papersAnalysis'], resolve),
    },
    { // 具体试卷分析
        name: 'specificAnalysis',
        path: '/specificAnalysis',
        component: (resolve) => require(['@/views/lt/systemsAnalysis/specificAnalysis'], resolve),
    },
    { // 考试分析
        name: 'examAnalysis',
        path: '/examAnalysis',
        component: (resolve) => require(['@/views/lt/systemsAnalysis/examAnalysis'], resolve),
    },
    { // 成绩分析
        name: 'resulitAnalysis',
        path: '/resulitAnalysis',
        component: (resolve) => require(['@/views/lt/systemsAnalysis/resulitAnalysis'], resolve),
    },
    { // 学生成绩
        name: 'studentResulit',
        path: '/studentResulit',
        component: (resolve) => require(['@/views/lt/systemsAnalysis/studentResulit'], resolve),
    },
    {

        name: 'examinationAnalysis',
        path: '/examinationAnalysis',
        component: (resolve) => require(['@/views/lt/systemsAnalysis/examinationAnalysis'], resolve),
    },
    { // 考试总分析
        name: 'totalAnalysis',
        path: '/totalAnalysis',
        component: (resolve) => require(['@/views/lt/systemsAnalysis/totalAnalysis'], resolve),
    },

    // 在线学习
    { // 课程列表
        name: 'courseList',
        path: '/courseList',
        component: (resolve) => require(['@/views/lt/onlineLearning/courseList'], resolve),
    },
    { // 课程配置
        name: 'configuration',
        path: '/configuration',
        component: (resolve) => require(['@/views/lt/onlineLearning/configuration'], resolve),
    },
    { // peizhi
        name: 'configCourse',
        path: '/configCourse',
        component: (resolve) => require(['@/views/lt/onlineLearning/configCourse'], resolve),
    },
    { // 增加课程
        name: 'addCourse',
        path: '/addCourse',
        component: (resolve) => require(['@/views/lt/onlineLearning/addCourse'], resolve),
    },
    { // 课程分类列表
        name: 'courseCategory',
        path: '/courseCategory',
        component: (resolve) => require(['@/views/lt/onlineLearning/courseCategory'], resolve),
    },
    { // 增加课程分类
        name: 'addCourseCategory',
        path: '/addCourseCategory',
        component: (resolve) => require(['@/views/lt/onlineLearning/addCourseCategory'], resolve),
    },
    { // 讲师列表
        name: 'lecturerList',
        path: '/lecturerList',
        component: (resolve) => require(['@/views/lt/onlineLearning/lecturerList'], resolve),
    },
    { // 增加课程
        name: 'addLecturer',
        path: '/addLecturer',
        component: (resolve) => require(['@/views/lt/onlineLearning/addLecturer'], resolve),
    },

    // 案例管理
    { // 案例列表
        name: 'caseList',
        path: '/caseList',
        component: (resolve) => require(['@/views/lt/caseManage/caseList'], resolve),
    },
    { // 设置标准答案
        name: 'setCaseBz',
        path: '/setCaseBz',
        component: (resolve) => require(['@/views/lt/caseManage/setCaseBz'], resolve),
    },
    { // 新增案例
        name: 'addCase',
        path: '/addCase',
        component: (resolve) => require(['@/views/lt/caseManage/addCase'], resolve),
    },
    { // 纳税人信息
        name: 'taxpayerInfo',
        path: '/taxpayerInfo',
        component: (resolve) => require(['@/views/lt/caseManage/taxpayerInfo'], resolve),
    },
    { // 发票信息
        name: 'invoiceInfo',
        path: '/invoiceInfo',
        component: (resolve) => require(['@/views/lt/caseManage/invoiceInfo'], resolve),
    },

    // 交流互动
    { // 文章列表
        name: 'articleList',
        path: '/articleList',
        component: (resolve) => require(['@/views/lt/exchangeInteract/articleList'], resolve),
    },
    { // 增加文章
        name: 'newArticleList',
        path: '/newArticleList',
        component: (resolve) => require(['@/views/lt/exchangeInteract/newArticleList'], resolve),
    },
    { // 文章管理分类列表
        name: 'articleManage',
        path: '/articleManage',
        component: (resolve) => require(['@/views/lt/exchangeInteract/articleManage'], resolve),
    },
    { // 增加文章分类管理
        name: 'newArticleManage',
        path: '/newArticleManage',
        component: (resolve) => require(['@/views/lt/exchangeInteract/newArticleManage'], resolve),
    },
    // 系统管理
    { // 系统设置
        name: 'systemSetup',
        path: '/systemSetup',
        component: (resolve) => require(['@/views/lt/systemManage/systemSetup'], resolve),
    },
    { // 管理员列表（教师）
        name: 'adminList',
        path: '/adminList',
        component: (resolve) => require(['@/views/lt/systemManage/adminList'], resolve),
    },
    { // 新增管理员（教师）
        name: 'newAdmin',
        path: '/newAdmin',
        component: (resolve) => require(['@/views/lt/systemManage/newAdmin'], resolve),
    },
    //学校管理员列表
    {
        name: 'studentAdminList',
        path: '/studentAdminList',
        component: (resolve) => require(['@/views/lt/systemManage/studentAdminList'], resolve),
    },
    { //新增学校管理员
        name: 'newStudentAdmin',
        path: '/newStudentAdmin',
        component: (resolve) => require(['@/views/lt/systemManage/newStudentAdmin'], resolve),
    },
    { // 新增管理员（新零售案例）
        name: 'newCase',
        path: '/newCase',
        component: (resolve) => require(['@/views/newCase/newCase'], resolve),
    },
    { // 账套
        name: 'accountSet',
        path: '/accountSet',
        component: (resolve) => require(['@/views/lt/accountSet/accountSet'], resolve),
    },
    { // 实训教学和实训训练选择角色
        name: 'teacherPublicRole',
        path: '/teacherPublicRole',
        component: (resolve) => require(['@/views/cx/newRetailTax/teacherPublicRole'], resolve)
    },
    { // 账套
        name: 'addCompany',
        path: '/addCompany',
        component: (resolve) => require(['@/views/lt/accountSet/addCompany'], resolve),
    },
    { // 上传资源-scl
        name: 'uploadResources',
        path: '/uploadResources',
        component: (resolve) => require(['@/views/lt/onlineLearning/uploadResources'], resolve),
    },

]