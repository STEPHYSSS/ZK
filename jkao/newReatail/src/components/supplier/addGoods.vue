<template>
    <div class="addGoods">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >商品管理</el-breadcrumb-item>
            <el-breadcrumb-item >新增</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="detail_box">
            <div class="foodsBox">
                <div class="ls" style="width:100%">
                   <i>*</i>商品分类：<el-select v-model="value" placeholder="请选择"><el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option></el-select>
                        <el-select v-model="value" placeholder="请选择"><el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option></el-select>
                        <el-select v-model="value" placeholder="请选择"><el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option></el-select>
                        <span><i>*</i>商品名称：</span><el-select v-model="value" placeholder="请选择"><el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option></el-select>
                </div>
                <div class="le">
                    国际条码：&nbsp;<el-select v-model="value" placeholder="请选择"><el-option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option></el-select>
                    <span><i>*</i>单位：</span><el-select v-model="value" placeholder="请选择"><el-option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option></el-select>
                    <span><i>*</i>温层：</span><el-select v-model="value" placeholder="请选择"><el-option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option></el-select>
                </div>
                <div class="lb">
                    <i>*</i>保质期：&nbsp;&nbsp;&nbsp;<el-input type="text"></el-input>
                    <div class="selec"><el-select v-model="value" placeholder="请选择"><el-option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option></el-select></div>
                    <span><i>*</i>规格：</span><el-select v-model="value" placeholder="请选择"><el-option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option></el-select>
                    &nbsp;<span>等级：</span><el-select v-model="value" placeholder="请选择"><el-option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option></el-select>
                </div>
                <div class="le">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产地：&nbsp;&nbsp;&nbsp;<el-select v-model="value" placeholder="请选择"><el-option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option></el-select>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'addGoods',
    data() {
      return {
        inArea: '', // 区域选中编码
        inStreet: '', // 街道选中编码
        inCommunity: '', // 社区选中编码
        community: [], // 下拉遍历社区
        street: [], // 下拉遍历街道
        area: [], // 下拉遍历区划
        areaShow: true, // 区划下拉显示
        streetShow: true, // 街道及社区下拉显示
        areaCode: '', // 区划编码
        streetCode: '', // 街道编码
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }]
      }
    },

    created () {
    },
}
</script>
<style scoped>
.addGoods{
    background-color: #f1f6fa;
    min-height: 647px;
}
.detail_box{
    background: #fff;
    border-radius: 10px;
}
.foodsBox{
  margin-left: 30px;
  margin-right: 30px;
}
.present-btn {
  color: #fff;
  margin-bottom: 20px;
  background-color: #01c8dc;
}
.ls .el-select{
    margin-right: 3px;
    width: 248px;
}
.el-select{
    /* width: 250px; */width: 100%;
}
span{
    margin-left: 30px;
}
.le{
    margin-top: 15px;
}
.le .el-select{
    width: 26.7%;
}
.lb{
    margin-top: 15px;
}
.lb .el-input{
    width: 11%;
    margin-right: 10px;
}

.lb .el-select{
    width: 26.62%;
}
.lb .selec{
    display: inline;
}
.lb .selec .el-select{
    width: 14.8% !important;
}
i{
    color: red;
}
</style>


