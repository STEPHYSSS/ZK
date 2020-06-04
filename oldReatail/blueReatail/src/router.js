import VueRouter from "vue-router";
// 门店系统模块
import home from "./Home.vue"; //门店模块主页
import operating from "./operating.vue"; // 运营模块主页
import supppliManage from "./supppliManage"; //供应商模块主页
import warehouse from "./warehouse.vue"; //仓库主页
import Mall from "./Mall" //商城模块主页
import login from "./components/login.vue"; //登录
import index from "./components/order/index.vue";
import operatIndex from "./components/operatIndex.vue"; //运营首页
import suppIndex from "./components/suppIndex.vue"; //供应商首页

// 门店系统
import choose from "./components/order/choose.vue"; //选品订购
import management from "./components/order/management.vue"; // 叫货单管理
import invoice from "./components/order/invoice.vue"; //全部叫货单
import goodsmanagement from "./components/order/goodsmanagement.vue"; //叫货单详情
import query from "./components/ordermanagement/query.vue"; //订单查询
import details from "./components/ordermanagement/details.vue"; //订单查询详情
import echarts from "./components/echarts/echarts.vue"; //数据分析
import inventory from "./components/echarts/inventory.vue"; //商品库存查询
import piechart from "./components/echarts/piechart.vue"; //数据分析.库存管理
import receiving from "./components/RegularReceiving/receiving"; //常规收货
import delivered from "./components/RegularReceiving/delivered"; //待配送
import acceptance from "./components/RegularReceiving/acceptance"; //配送完成(已验收)
import waitCheck from "./components/RegularReceiving/waitCheck"; //配送完成(待验收)
import amendment from "./components/ReceivingAmendment/amendment"; //收货修正单
import refuse from "./components/ReceivingAmendment/Refuse"; //拒收收货修正单
import upload from "./components/ReceivingAmendment/upload"; //上传证据
import assistant from "./components/clerkManage/assistant"; //店员管理
import dailyManager from "./components/DailyManager/dailyManager"; //日结管理
import dailyDetail from "./components/DailyManager/dailyDetails"; // 日结明细
//二期新增模块
import billManager from "./components/returnsBill/billManager"; //退货单管理
import billdetail from "./components/returnsBill/billDetail"; //退货单管理详情
import billAdd from "./components/returnsBill/billAdd"; //退货单管理新增退货
import scrapManage from "./components/returnsBill/scrapManage"; //报废单管理
import scrapdetail from "./components/returnsBill/scrapDetail"; //报废单详情
import scrapadd from "./components/returnsBill/scrapAdd"; //新增报废
import transferSlip from "./components/returnsBill/transferSlip"; //转移单管理
import transferadd from "./components/returnsBill/transferAdd"; //转移单新增转出
import transferdetail from "./components/returnsBill/transferDetail"; //转移单管理详情
import storeManagement from "./components/returnsBill/storeManagement"; //盘点管理
import inventoryadd from "./components/returnsBill/inventoryAdd"; //盘点管理新增
import inventoryedit from "./components/returnsBill/inventoryEdit"; //盘点管理编辑
import inventorydetail from "./components/returnsBill/inventoryDetail"; //盘点管理详情
// 运营后台部分
import suppliermanagement from "./components/supplier/suppliermanagement.vue"; //编辑供应商
import addsupplier from "./components/supplier/addsupplier.vue"; //新增供应商
import smanagement from "./components/supplier/smanagement.vue"; //供应商管理
import shopmanagement from "./components/supplier/shopmanagement"; //商品管理
import supplier from "./components/supplier/supplier.vue"; //新增商品
import newseditor from "./components/supplier/newseditor.vue"; //编辑商品
import storeorder from "./components/storeorder/storeorder.vue"; //订单管理
import sheet from "./components/storeorder/sheet.vue"; //修正单管理
import Cgrefuse from "./components/storeorder/Cgrefuse"; // 拒收,缺货修正单详情
import xiuCheck from "./components/storeorder/xiuCheck"; //拒收意见修正单
import storedetails from "./components/storeorder/storedetails.vue"; //订单详情
import delivery from "./components/storeorder/delivery.vue"; //叫货单管理
import querystore from "./components/storeorder/querystore.vue"; //叫货单管理详情
import mallOrders from "./components/storeorder/mallOrders" //商城订单
import mallDetail from "./components/storeorder/mallDetail" //商城订单详情
import storeManage from "./components/StoreManage/StoreManager"; // 门店管理
import addStore from "./components/StoreManage/addStore"; //新增门店
import editStore from "./components/StoreManage/editStore"; //编辑门店
import goodsDetail from "./components/supplier/goodsDetail"; //商品详情
import purchase from "./components/priceManager/purchaseManage"; //供应商进价管理
import selling from "./components/priceManager/sellingPrice"; //特殊门店售价管理
import adjustPrice from "./components/priceManager/adjustPrice"; //特殊门店调价申请
import PurchaseOrder from "./components/purchasingManagement/PurchaseOrder"; //采购单管理
import orderDetail from "./components/purchasingManagement/orderDetail"; //采购单详情
import Kinventor from "./components/InventoryManage/Kinventor"; //库存管理
import sysStockManag from "./components/InventoryManage/sysStockManag"; //库存
import category from "./components/categoryManager/category"; //类目管理
import dictionary from "./components/dictionaryManager/dictionary"; //字典管理
import staff from "./components/staffManger/staff"; //职员管理
import role from "./components/roleManag/role"; //角色管理
// // 二期运营新增模块
import returnManagement from "./components/storeorder/returnManagement.vue"; // 退货单管理
import returnDetails from "./components/storeorder/returnDetails.vue"; //退货单详情
import transferSingle from "./components/storeorder/transferSingle.vue"; //转移单管理
import scrapForm from "./components/storeorder/scrapForm.vue"; // 报废单管理
import transferDetails from "./components/storeorder/transferDetails.vue"; //转移单详情
import scrapDetails from "./components/storeorder/scrapDetails.vue"; //报废单详情
import strongDelivery from "./components/storeorder/strongDelivery.vue"; // 强配单管理
import strongAdd from "./components/storeorder/strongAdd.vue"; //新增强配单
import strongDetails from "./components/storeorder/strongDetails.vue"; //强配单详情
import productSales from "./components/storeorder/productSales.vue"; // 商品促销
import promotionAdd from "./components/storeorder/promotionAdd.vue"; // 新增促销
import nDiscounts from "./components/storeorder/nDiscounts.vue"; //第N件优惠
import discountsAdd from "./components/storeorder/discountsAdd.vue"; //新增第N件优惠
import buyPresent from "./components/storeorder/buyPresent.vue"; // 买赠活动
import buyPresentAdd from "./components/storeorder/buyPresentAdd.vue"; // 新增买赠活动
import memberManage from "./components/Member/memberManage"; //会员管理
import coupon from "./components/Member/coupon"; //优惠券详情
import membership from "./components/Member/Membership"; //会员级别
import Integral from "./components/Member/IntegralPolicy"; //积分政策
import operaInventory from "./components/Member/operaInventory"; //盘点管理
import operaInvenDetail from "./components/Member/operaInvenDetail"; //盘点详情和验收
import CouponMana from "./components/Couponmanagement/CouponMana"; //优惠券管理
import addCoupon from "./components/Couponmanagement/CouponAdd"; //新增优惠券
import detaiCo from "./components/Couponmanagement/CouponDetail"; //详情
import pushCoupon from "./components/Couponmanagement/CouponPage"; //推券
// 仓库管理Operation purchase warehousing
import operaPurWare from "./components/operaWarehous/operaPurWare"; //仓库管理采购入库
import operaPurWareAdd from "./components/operaWarehous/operaPurWareAdd"; //仓库管理采购入库新增
import operaPurWareDetail from "./components/operaWarehous/operaPurWareDetail"; //仓库管理采购详情
import operaOtherInWare from "./components/operaWarehous/operaOtherInWare"; //仓库管理其他入库
import OtherInWareCheck from "./components/operaWarehous/OtherInWareCheck"; //仓库管理其他入库




// 营销管理
import turnTable from '@/components/marketing/turnTable.vue' //大转盘
import mutiplayerGroup from '@/components/marketing/mutiplayerGroup.vue' //多人拼团
import shakeActivity from '@/components/marketing/shakeActivity.vue' //摇一摇
import smashingGoldenEggs from '@/components/marketing/smashingGoldenEggs.vue' //砸金蛋
import scratchCard from '@/components/marketing/scratchCard.vue' //刮刮乐
import bargainActivity from '@/components/marketing/bargainActivity.vue' //砍价


import TurnLibraryWorkList from "./components/operaWarehous/TurnLibraryWorkList"; //转库作业
import TurnLibraryWorkDetail from "./components/operaWarehous/TurnLibraryWorkDetail"; //转库详情
import OtherOutboundList from "./components/operaWarehous/OtherOutboundList"; //其他出库
import OtherOutboundDetail from "./components/operaWarehous/OtherOutboundDetail"; //出库详情y
import operateOutboundOrder from "./components/operaWarehous/operateOutboundOrder"; //订购出库
import outboundOrderDetail from "./components/operaWarehous/outboundOrderDetail"; //出库详情

// 供应商管理模块 
import shoporder from "./components/system/shoporder.vue"; //采购单管理
import shopdetails from "./components/system/shopdetails.vue"; //查看采购单详情
import documents from "./components/system/documents.vue"; //点击品名查看详情
import confirm from "./components/system/confirm.vue"; //采购单配送
import revise from "./components/revise/reviseManage"; //配送单管理
import reDetail from "./components/revise/reviseDetail"; //配送单详情
import amendList from "./components/revise/amendList"; // 修正单管理
import examine from "./components/revise/examine"; // 修正单审核
import check from "./components/revise/check"; // 修正单查看
import GbManager from "./components/revise/suppBillManager"; //退货单管理
import GbDetail from "./components/revise/suppBillDetail"; //退货单详情
import shopManage from "./components/revise/shopMang"; //商品管理
//仓库模块
import setOfWaveList from "./components/basic/setOfWaveList.vue"; //组波策略
import setOfWaveEdit from "./components/basic/setOfWaveEdit.vue"; //策略编辑
import distributionList from "./components/basic/distributionList.vue"; //分配策略
import distributionEdit from "./components/basic/distributionEdit.vue"; //策略编辑
import dispatchingList from "./components/basic/dispatchingList.vue"; //配送路线
import dispatchingAdd from "./components/basic/dispatchingAdd.vue"; //路线新增
import procurementList from "./components/management/procurementList.vue"; //采购入库
import procurementDetail from "./components/management/procurementDetail.vue"; //入库详情
import otherWarehouseList from "./components/management/otherWarehouseList.vue"; //其他入库
import otherWarehouseAdd from "./components/management/otherWarehouseAdd.vue"; //新增入库
import otherWarehouseDetail from "./components/management/otherWarehouseDetail.vue"; //入库详情
import turnWarehouseList from "./components/management/turnWarehouseList.vue"; //转库作业
import turnWarehouseAdd from "./components/management/turnWarehouseAdd.vue"; //新增转库
import turnWarehouseDetail from "./components/management/turnWarehouseDetail.vue"; //转库详情
import orderWarehouseList from "./components/management/orderWarehouseList.vue"; //订购出库
import orderWarehouseDetail from "./components/management/orderWarehouseDetail.vue"; //出库详情
import orderEncasement from "./components/management/orderEncasement.vue"; //集货包装
import storeOutletList from "./components/management/storeOutletList.vue"; //商城出库列表
import outOfStock from "./components/management/outOfStock.vue"; //商城出库
import outOfStockDetail from "./components/management/outOfStockDetail.vue"; //商城出库详情

import wsettings from "./components/Foundation/WSettings"; //仓库设置
import storehouseAdd from "./components/Foundation/storehouseAdd"; //仓库设置新增
import storehouseEdit from "./components/Foundation/storehouseEdit"; //仓库设置编辑
import areaSetting from "./components/Foundation/areaSetting"; //库区设置
import reservoirAdd from "./components/Foundation/reservoirAdd"; //库区设置新增
import shelvesAdd from "./components/Foundation/shelvesAdd"; //库区设置货架
import shelvesShop from "./components/Foundation/shelvesShop"; //货位商品关联
import shelveshopAdd from "./components/Foundation/shelveshopAdd"; //货位商品关联新增
import Otherdepots from "./components/Foundation/Otherdepots"; //其他出库
import OtherdepotsAdd from "./components/Foundation/OtherdepotsAdd"; //其他出库新增
import OtherdepDetail from "./components/Foundation/OtherdepDetail"; //其他出库详情
import wareInventory from "./components/Foundation/wareInventory"; //盘点管理
import wareInvenAdd from "./components/Foundation/wareInvenAdd"; //盘点新增
import wareInvenEntry from "./components/Foundation/wareInvenEntry"; //盘点录入
import wareInvenCheck from "./components/Foundation/wareInvenCheck"; //盘点复核
import wareInvenDetail from "./components/Foundation/wareInvenDetail"; //盘点详情
import wareStock from "./components/Foundation/wareStock"; //库存查询
import wareAmendList from "./components/Foundation/wareAmendList"; //修正单管理
import wareAmendCheck from "./components/Foundation/wareAmendCheck"; //修正单管理审核
import wareAmendDetail from "./components/Foundation/wareAmendDetail"; //修正单管理详情

// 商城后台
import Advertising from "./components/mallSystem/Advertising" //基础设置
import advertisementAdd from './components/mallSystem/advertisementAdd.vue' //广告位新增
import mallPurchase from "./components/mallSystem/mallPurchase" //商城采购入库
import mallPurchaseInfo from './components/mallSystem/mallPurchaseInfo' //商城采购入库详情
import mallPurchaseAdd from './components/mallSystem/mallPurchaseAdd' //商城采购入库新增
import mallOutbound from "./components/mallSystem/mallOutbound" //商城出库
import mallOutboundInfo from "./components/mallSystem/mallOutboundInfo" //商城出库详情
import mallInquiry from "./components/mallSystem/mallInquiry" //商城库存查询
import mallOrderinquiry from "./components/mallSystem/mallOrderinquiry" //商城订单管理查询
import mallOrderinquiryDetail from "./components/mallSystem/mallOrderinquiryDetail" //商城订单查询详情
import activityModuleManage from './components/mallSystem/activityModuleManage' //模块管理
import activityModuleManageAdd from './components/mallSystem/activityModuleManageAdd' //模块管理新增
var router = new VueRouter({
    mode: "hash",
    routes: [{
            path: "/",
            component: login,
            redirect: "/login"
        },
        {
            path: "/login",
            component: login,
            name: "login"
        },
        {
            path: "/home",
            name: "home",
            component: home,
            redirect: "/choose",
            children: [{
                    path: "/index",
                    name: "index",
                    component: index
                },
                {
                    path: "/choose",
                    component: choose,
                    name: "choose"
                },
                {
                    path: "/management",
                    component: management,
                    name: "management"
                },
                {
                    path: "/invoice",
                    component: invoice,
                    name: "invoice"
                },
                {
                    path: "/goodsmanagement",
                    component: goodsmanagement,
                    name: "goodsmanagement"
                },
                {
                    path: "/query",
                    component: query,
                    name: "query"
                },
                {
                    path: "/details",
                    component: details,
                    name: "details"
                },
                {
                    path: "/echarts",
                    component: echarts,
                    name: "echarts"
                },
                {
                    path: "/inventory",
                    component: inventory,
                    name: "inventory"
                },
                {
                    path: "/piechart",
                    component: piechart,
                    name: "piechart"
                },
                {
                    path: "/receiving",
                    name: "receiving",
                    component: receiving
                },
                {
                    path: "/delivered",
                    name: "delivered",
                    component: delivered
                },
                {
                    path: "/acceptance",
                    name: "acceptance",
                    component: acceptance
                },
                {
                    path: "/waitCheck",
                    name: "waitCheck",
                    component: waitCheck
                },
                {
                    path: "/amendment",
                    name: "amendment",
                    component: amendment
                },
                {
                    path: "/assistant",
                    name: "assistant",
                    component: assistant
                },
                {
                    path: "/refuse",
                    name: "refuse",
                    component: refuse
                },
                {
                    path: "/upload",
                    name: "upload",
                    component: upload
                },
                {
                    path: "/dailyManager",
                    name: "dailyManager",
                    component: dailyManager
                },
                {
                    path: "/dailyDetail",
                    name: "dailyDetail",
                    component: dailyDetail
                },
                {
                    path: "/billManager",
                    name: "billManager",
                    component: billManager
                },
                {
                    path: "/billdetail",
                    name: "billdetail",
                    component: billdetail
                },
                {
                    path: "/billAdd",
                    name: "billAdd",
                    component: billAdd
                },
                {
                    path: "/scrapManage",
                    name: "scrapManage",
                    component: scrapManage
                },
                {
                    path: "/scrapdetail",
                    name: "scrapdetail",
                    component: scrapdetail
                },
                {
                    path: "/scrapadd",
                    name: "scrapadd",
                    component: scrapadd
                },
                {
                    path: "/transferSlip",
                    name: "transferSlip",
                    component: transferSlip
                },
                {
                    path: "/transferadd",
                    name: "transferadd",
                    component: transferadd
                },
                {
                    path: "/transferdetail",
                    name: "transferdetail",
                    component: transferdetail
                },
                {
                    path: "/storeManagement",
                    name: "storeManagement",
                    component: storeManagement
                },
                {
                    path: "/inventoryadd",
                    name: "inventoryadd",
                    component: inventoryadd
                },
                {
                    path: "/inventoryedit",
                    name: "inventoryedit",
                    component: inventoryedit
                },
                {
                    path: "/inventorydetail",
                    name: "inventorydetail",
                    component: inventorydetail
                }
            ]
        },
        {
            path: "/operating",
            component: operating,
            name: "operating",
            redirect: "/storeManage",
            children: [{
                    path: "/operatIndex",
                    name: "operatIndex",
                    component: operatIndex
                },
                {
                    path: "/suppliermanagement",
                    name: "suppliermanagement",
                    component: suppliermanagement
                },
                {
                    path: "/addsupplier",
                    name: "addsupplier",
                    component: addsupplier
                },
                {
                    path: "/smanagement",
                    name: "smanagement",
                    component: smanagement
                },
                {
                    path: "/shopmanagement",
                    name: "shopmanagement",
                    component: shopmanagement
                },
                {
                    path: "/supplier",
                    name: "supplier",
                    component: supplier
                },
                {
                    path: "/newseditor",
                    name: "newseditor",
                    component: newseditor
                },
                {
                    path: "/storeorder",
                    name: "storeorder",
                    component: storeorder
                },
                {
                    path: "/querystore",
                    name: "querystore",
                    component: querystore
                },
                {
                    path: "/sheet",
                    name: "sheet",
                    component: sheet
                },
                {
                    path: "/Cgrefuse",
                    name: "Cgrefuse",
                    component: Cgrefuse
                },
                {
                    path: "/xiuCheck",
                    name: "xiuCheck",
                    component: xiuCheck
                },
                {
                    path: "/storedetails",
                    name: "storedetails",
                    component: storedetails
                },
                {
                    path: "/delivery",
                    name: "delivery",
                    component: delivery
                },
                {
                    path: "/storeManage",
                    name: "storeManage",
                    component: storeManage
                },
                {
                    path: "/addStore",
                    name: "addStore",
                    component: addStore
                },
                {
                    path: "/editStore",
                    name: "editStore",
                    component: editStore
                },
                {
                    path: "/goodsDetail",
                    name: "goodsDetail",
                    component: goodsDetail
                },
                {
                    path: "/purchase",
                    name: "purchase",
                    component: purchase
                },
                {
                    path: "/selling",
                    name: "selling",
                    component: selling
                },
                {
                    path: "/adjustPrice",
                    name: "adjustPrice",
                    component: adjustPrice
                },
                {
                    path: "/PurchaseOrder",
                    name: "PurchaseOrder",
                    component: PurchaseOrder
                },
                {
                    path: "/orderDetail",
                    name: "orderDetail",
                    component: orderDetail
                },
                {
                    path: "/Kinventor",
                    name: "Kinventor",
                    component: Kinventor
                },
                {
                    path: "/category",
                    name: "category",
                    component: category
                },
                {
                    path: "/dictionary",
                    name: "dictionary",
                    component: dictionary
                },
                {
                    path: "/staff",
                    name: "staff",
                    component: staff
                },
                {
                    path: "/role",
                    name: "role",
                    component: role
                },
                {
                    path: "/memberManage",
                    name: "memberManage",
                    component: memberManage
                },
                {
                    path: "/coupon",
                    name: "coupon",
                    component: coupon
                },
                {
                    path: "/membership",
                    name: "membership",
                    component: membership
                },
                {
                    path: "/Integral",
                    name: "Integral",
                    component: Integral
                },
                {
                    path: "/operaInventory",
                    name: "operaInventory",
                    component: operaInventory
                },
                {
                    path: "/operaInvenDetail",
                    name: "operaInvenDetail",
                    component: operaInvenDetail
                },
                {
                    path: "/CouponMana",
                    name: "CouponMana",
                    component: CouponMana
                },
                {
                    path: "/addCoupon",
                    name: "addCoupon",
                    component: addCoupon
                },
                {
                    path: "/pushCoupon",
                    name: "pushCoupon",
                    component: pushCoupon
                },
                {
                    path: "/detaiCo",
                    name: "detaiCo",
                    component: detaiCo
                }, //退货单管理
                {
                    path: "/returnManagement",
                    name: "returnManagement",
                    component: returnManagement
                },
                //退货单审核详情
                {
                    path: "/returnDetails",
                    name: "returnDetails",
                    component: returnDetails
                },
                // 转移单管理
                {
                    path: "/transferSingle",
                    name: "transferSingle",
                    component: transferSingle
                },
                // 报废单管理
                {
                    path: "/scrapForm",
                    name: "scrapForm",
                    component: scrapForm
                },
                //转移单详情
                {
                    path: "/transferDetails",
                    name: "transferDetails",
                    component: transferDetails
                },
                //报废单详情
                {
                    path: "/scrapDetails",
                    name: "scrapDetails",
                    component: scrapDetails
                },
                //强配单管理
                {
                    path: "/strongDelivery",
                    name: "strongDelivery",
                    component: strongDelivery
                },
                //新增强配单
                {
                    path: "/strongAdd",
                    name: "strongAdd",
                    component: strongAdd
                },
                //强配单详情
                {
                    path: "/strongDetails",
                    name: "strongDetails",
                    component: strongDetails
                },
                // 商品促销
                {
                    path: "/productSales",
                    name: "productSales",
                    component: productSales
                },
                // 新增促销
                {
                    path: "/promotionAdd",
                    name: "promotionAdd",
                    component: promotionAdd
                }, //第N件优惠
                {
                    path: "/nDiscounts",
                    name: "nDiscounts",
                    component: nDiscounts
                },
                //新增第N件优惠
                {
                    path: "/discountsAdd",
                    name: "discountsAdd",
                    component: discountsAdd
                },
                //买赠活动
                {
                    path: "/buyPresent",
                    name: "buyPresent",
                    component: buyPresent
                },
                // 新增买赠活动
                {
                    path: "/buyPresentAdd",
                    name: "buyPresentAdd",
                    component: buyPresentAdd
                },
                {
                    path: "/operaPurWare",
                    name: "operaPurWare",
                    component: operaPurWare
                },
                {
                    path: "/operaPurWareAdd",
                    name: "operaPurWareAdd",
                    component: operaPurWareAdd
                },
                {
                    path: "/operaPurWareDetail",
                    name: "operaPurWareDetail",
                    component: operaPurWareDetail
                },
                {
                    path: "/operaOtherInWare",
                    name: "operaOtherInWare",
                    component: operaOtherInWare
                },
                {
                    path: "/OtherInWareCheck",
                    name: "OtherInWareCheck",
                    component: OtherInWareCheck
                },
                {
                    path: "/TurnLibraryWorkList",
                    name: "TurnLibraryWorkList",
                    component: TurnLibraryWorkList
                },
                {
                    path: "/TurnLibraryWorkDetail",
                    name: "TurnLibraryWorkDetail",
                    component: TurnLibraryWorkDetail
                },
                {
                    path: "/OtherOutboundList",
                    name: "OtherOutboundList",
                    component: OtherOutboundList
                },
                {
                    path: "/OtherOutboundDetail",
                    name: "OtherOutboundDetail",
                    component: OtherOutboundDetail
                },
                {
                    path: "/operateOutboundOrder",
                    name: "operateOutboundOrder",
                    component: operateOutboundOrder
                },
                {
                    path: "/outboundOrderDetail",
                    name: "outboundOrderDetail",
                    component: outboundOrderDetail
                }, { //商城订单
                    path: '/mallOrders',
                    name: 'mallOrders',
                    component: mallOrders
                }, {
                    path: '/mallDetail',
                    name: 'mallDetail',
                    component: mallDetail
                },
                {
                    path: "/turnTable",
                    name: "turnTable",
                    component: turnTable
                },
                {
                    path: "/sysStockManag",
                    name: "sysStockManag",
                    component: sysStockManag
                },
                {
                    path: "/mutiplayerGroup",
                    name: "mutiplayerGroup",
                    component: mutiplayerGroup
                },
                {
                    path: "/bargainActivity",
                    name: "bargainActivity",
                    component: bargainActivity
                },
                {
                    path: "/scratchCard",
                    name: "scratchCard",
                    component: scratchCard
                },
                {
                    path: "/smashingGoldenEggs",
                    name: "smashingGoldenEggs",
                    component: smashingGoldenEggs
                },

                {
                    path: "/shakeActivity",
                    name: "shakeActivity",
                    component: shakeActivity
                },
            ]
        },
        {
            path: "/supppliManage",
            component: supppliManage,
            name: "supppliManage",
            redirect: "/shoporder",
            children: [{
                    path: "/suppIndex",
                    name: "suppIndex",
                    component: suppIndex
                },
                {
                    path: "/shoporder",
                    component: shoporder,
                    name: "shoporder"

                },
                {
                    path: "/shopdetails",
                    component: shopdetails,
                    name: "shopdetails"
                },
                {
                    path: "/confirm",
                    component: confirm,
                    name: "confirm"
                },
                {
                    path: "/documents",
                    component: documents,
                    name: "documents"
                },
                {
                    path: "/revise",
                    name: "revise",
                    component: revise
                },
                {
                    path: "/reDetail",
                    name: "reDetail",
                    component: reDetail
                },
                {
                    path: "/amendList",
                    name: "amendList",
                    component: amendList
                },
                {
                    path: "/shopManage",
                    name: "shopManage",
                    component: shopManage
                },
                {
                    path: "/examine",
                    name: "examine",
                    component: examine
                },
                {
                    path: "/check",
                    name: "check",
                    component: check
                },
                {
                    path: "/GbManager",
                    name: "GbManager",
                    component: GbManager
                },
                {
                    path: "/GbDetail",
                    name: "GbDetail",
                    component: GbDetail
                }
            ]
        },
        {
            path: "/warehouse",
            component: warehouse,
            name: "warehouse",
            redirect: "/WSettings",
            children: [{
                    path: "/setOfWaveList",
                    name: "setOfWaveList",
                    component: setOfWaveList
                },
                {
                    path: "/setOfWaveEdit",
                    name: "setOfWaveEdit",
                    component: setOfWaveEdit
                },
                {
                    path: "/wsettings",
                    name: "wsettings",
                    component: wsettings
                },
                {
                    path: "/storehouseAdd",
                    name: "storehouseAdd",
                    component: storehouseAdd
                },
                {
                    path: "/storehouseEdit",
                    name: "storehouseEdit",
                    component: storehouseEdit
                },
                {
                    path: "/areaSetting",
                    name: "areaSetting",
                    component: areaSetting
                },
                {
                    path: "/reservoirAdd",
                    name: "reservoirAdd",
                    component: reservoirAdd
                },
                {
                    path: "/shelvesAdd",
                    name: "shelvesAdd",
                    component: shelvesAdd
                },
                {
                    path: "/shelvesShop",
                    name: "shelvesShop",
                    component: shelvesShop
                },
                {
                    path: "/shelveshopAdd",
                    name: "shelveshopAdd",
                    component: shelveshopAdd
                },
                {
                    path: "/Otherdepots",
                    name: "Otherdepots",
                    component: Otherdepots
                },
                {
                    path: "/OtherdepotsAdd",
                    name: "OtherdepotsAdd",
                    component: OtherdepotsAdd
                },
                {
                    path: "/OtherdepDetail",
                    name: "OtherdepDetail",
                    component: OtherdepDetail
                },
                {
                    path: "/wareInventory",
                    name: "wareInventory",
                    component: wareInventory
                },
                {
                    path: "/wareInvenAdd",
                    name: "wareInvenAdd",
                    component: wareInvenAdd
                },
                {
                    path: "/wareInvenEntry",
                    name: "wareInvenEntry",
                    component: wareInvenEntry
                },
                {
                    path: "/wareInvenCheck",
                    name: "wareInvenCheck",
                    component: wareInvenCheck
                },
                {
                    path: "/wareInvenDetail",
                    name: "wareInvenDetail",
                    component: wareInvenDetail
                },
                {
                    path: "/wareStock",
                    name: "wareStock",
                    component: wareStock
                },
                {
                    path: "/wareAmendList",
                    name: "wareAmendList",
                    component: wareAmendList
                }, {
                    path: "/wareAmendCheck",
                    name: "wareAmendCheck",
                    component: wareAmendCheck
                }, {
                    path: "/wareAmendDetail",
                    name: "wareAmendDetail",
                    component: wareAmendDetail
                }, //
                {
                    path: "/distributionList",
                    name: "distributionList",
                    component: distributionList
                },
                {
                    path: "/distributionEdit",
                    name: "distributionEdit",
                    component: distributionEdit
                },
                {
                    path: "/dispatchingList",
                    name: "dispatchingList",
                    component: dispatchingList
                },
                {
                    path: "/dispatchingAdd",
                    name: "dispatchingAdd",
                    component: dispatchingAdd
                },
                {
                    path: "/procurementList",
                    name: "procurementList",
                    component: procurementList
                },
                {
                    path: "/procurementDetail",
                    name: "procurementDetail",
                    component: procurementDetail
                },
                {
                    path: "/otherWarehouseList",
                    name: "otherWarehouseList",
                    component: otherWarehouseList
                },
                {
                    path: "/otherWarehouseAdd",
                    name: "otherWarehouseAdd",
                    component: otherWarehouseAdd
                },
                {
                    path: "/otherWarehouseDetail",
                    name: "otherWarehouseDetail",
                    component: otherWarehouseDetail
                },
                {
                    path: "/turnWarehouseList",
                    name: "turnWarehouseList",
                    component: turnWarehouseList
                },
                {
                    path: "/turnWarehouseAdd",
                    name: "turnWarehouseAdd",
                    component: turnWarehouseAdd
                },
                {
                    path: "/turnWarehouseDetail",
                    name: "turnWarehouseDetail",
                    component: turnWarehouseDetail
                },
                {
                    path: "/orderWarehouseList",
                    name: "orderWarehouseList",
                    component: orderWarehouseList
                },
                {
                    path: "/orderWarehouseDetail",
                    name: "orderWarehouseDetail",
                    component: orderWarehouseDetail
                },
                {
                    path: "/orderEncasement",
                    name: "orderEncasement",
                    component: orderEncasement
                },
                {
                    path: "/storeOutletList",
                    name: "storeOutletList",
                    component: storeOutletList
                },
                {
                    path: "/outOfStock",
                    name: "outOfStock",
                    component: outOfStock
                },
                {
                    path: "/outOfStockDetail",
                    name: "outOfStockDetail",
                    component: outOfStockDetail
                }
            ]
        }, {
            path: "/Mall",
            component: Mall,
            name: "Mall",
            redirect: "/mallPurchase",
            children: [{
                    path: "/Advertising",
                    name: "Advertising",
                    component: Advertising
                }, {
                    path: "/mallPurchase",
                    name: 'mallPurchase',
                    component: mallPurchase
                }, {
                    path: "/mallPurchaseInfo",
                    name: 'mallPurchaseInfo',
                    component: mallPurchaseInfo
                }, {
                    path: '/mallPurchaseAdd',
                    name: 'mallPurchaseAdd',
                    component: mallPurchaseAdd
                }, {
                    path: "/mallOutbound",
                    name: 'mallOutbound',
                    component: mallOutbound
                }, {
                    path: '/mallOutboundInfo',
                    name: 'mallOutboundInfo',
                    component: mallOutboundInfo
                }, {
                    path: "/mallInquiry",
                    name: 'mallInquiry',
                    component: mallInquiry
                }, {
                    path: '/mallOrderinquiry',
                    name: 'mallOrderinquiry',
                    component: mallOrderinquiry
                }, {
                    path: '/mallOrderinquiryDetail',
                    name: 'mallOrderinquiryDetail',
                    component: mallOrderinquiryDetail
                }, {
                    path: "/advertisementAdd",
                    name: 'advertisementAdd',
                    component: advertisementAdd
                },
                {
                    path: "/activityModuleManage",
                    name: 'activityModuleManage',
                    component: activityModuleManage
                },
                {
                    path: "/activityModuleManageAdd",
                    name: 'activityModuleManageAdd',
                    component: activityModuleManageAdd
                }

            ]

        }
    ]
});
export default router;