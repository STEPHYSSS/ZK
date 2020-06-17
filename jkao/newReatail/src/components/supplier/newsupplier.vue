<template>
  <div class="supplier">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"><i>1</i> 基本信息</span>
        


      
      
       


      </el-tab-pane>
     <el-tab-pane name="second">
        <span slot="label"><i>2</i> 供应商信息</span>
        <el-button type="primary" @click="clickshow">选择供应商</el-button>
        <div v-if="n1"  class="bigshow">
          <div class="show">
              <el-row :gutter="20">
                <el-col :span="10">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                      <el-form-item label="供应商标号">
                        <el-input
                          placeholder="请输入内容"
                          v-model="formInline.input10"
                          clearable>
                        </el-input>
                      </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="10">
                  <el-form :inline="true" :model="formInline" class="demo-form-inline">
                      <el-form-item label="供应商名称">
                        <el-input
                          placeholder="请输入内容"
                          v-model="formInline.input10"
                          clearable>
                        </el-input>
                      </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="4">
                      <el-button type="success">查询</el-button>
                </el-col>
              </el-row>

              
              <!-- <el-table
              :data="tableData"
              border
              @selection-change="handleSelectionChange"
              style="width: 100%">
              
                <el-table-column
                type="selection"
                width="55"
                @cell-click="hh(scope.column,scope.cell,scope.event,scope.$index, scope.row)"
              >
                
              </el-table-column>
             
              <el-table-column
                prop="date"
                label="供应商编号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="供应商类型">
              </el-table-column>
            </el-table> -->


            <el-table
              ref="multipleTable"
              :data="tableData3"
              style="width: 100%"
              @current-change="handleSelectionChange"> 
              <el-table-column
                label="操作"
                width="55">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.checked"></el-checkbox> 
                </template>
              </el-table-column>
              <el-table-column
                label="日期"
                prop="date"
                width="120">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>


             
            <div class="m">
              <el-button type="primary" @click="nextclick">确定</el-button>
              <el-button type="primary" plain>返回</el-button>
            </div>
        </div>
       
        </div>
        <div class="top" v-if="n2">
          <h4>供应商关联关系</h4>
           <el-table
              :data="arr"
              @selection-change="handleSelectionChange"
              style="width: 60%">
              <el-table-column
                prop="date"
                label="供应商编号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="date"
                label="供应商编号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="供应商类型">
              </el-table-column>
            </el-table>
        </div>
        <div class="bottom" v-if="n2">
          <h4>供应商物流信息</h4>
           <el-table
              :data="arr"
              @selection-change="handleSelectionChange"
              style="width: 60%">
              <el-table-column
                prop="date"
                label="供应商编号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="date"
                label="供应商编号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="供应商类型">
              </el-table-column>
            </el-table>
            <div class="twobb">
                  <el-button type="primary" >下一步</el-button>
                  <el-button type="primary" plain>上一步</el-button>
            </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label"><i>3</i> 订购信息</span>
         <el-form :inline="true" :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
           <el-row>
             <el-col :span="8">
                <el-form-item label="供应商名称:" prop="name" >
                  <el-input v-model="ruleForm.name " class="fff"></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="8">
                <el-form-item label="供应商名称:" prop="name" >
                  <el-input v-model="ruleForm.name" class="fff"></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="8">
                <el-form-item label="供应商名称:" prop="name" >
                  <el-input v-model="ruleForm.name" class="fff"></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="8">
                <el-form-item label="供应商名称:" prop="name" >
                  <el-input v-model="ruleForm.name" class="fff"></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="8">
                <el-form-item label="供应商名称:" prop="name" >
                  <el-input v-model="ruleForm.name" class="fff"></el-input>
                </el-form-item>
             </el-col>
           </el-row>
         
        </el-form>
      </el-tab-pane>
    </el-tabs>







    
  </div>
</template>

<script>


export default {
   data() {
      return {
        activeName: 'first',
        arr:[],
        // obj:{},
         radio2: 3,
        n1:false,
        n2:false,
         tableData3: [],
         formInline:{
          input10: '',
         },
           ruleForm: {
          name: '',
        },
         multipleSelection: [],
        checked: true,
        // tableData: [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // },{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1 弄'
        // }],
        rules:{
           name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      };
    },
      created () {
      this.setTable()
    },
    methods: {
      handleClick(tab, event) {
        // tab.$el.style.backgroundColor="red"
        
      },
     
      clickshow(){
        this.n1=true
        // this.activeName='first'
      },
      handleSelectionChange(val){
        this.multipleSelection=val
        
      },
      nextclick(){
        this.n2=true
      },

  //把element-ui里面的复选框改成单选框
       setTable () {
        let resdata = [{
          id: 44,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 89,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1512 弄'
        }, {
          id: 23,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1513 弄'
        }, {
          id: 88,
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1514 弄'
        }]
        // 后台数据返回后,手动添加一个checked属性控制选中与否
        resdata.forEach(item => {
          item.checked = false
        })
        this.tableData3 = resdata
      },

      handleSelectionChange (row) {
        this.tableData3.forEach(item => {
          // 排他,每次选择时把其他选项都清除
          if (item.id !== row.id) {
            item.checked = false
          }
        })
        
      this.arr.push(row)
        
      }
    }
}
</script>

<style scoped>
.supplier{
  /* height: 600px; */
  border: 1px solid #ccc;
  padding: 20px 20px 40px 20px;
   border: 1px solid #ccc;
  box-shadow:0px 2px 10px #ccc;
  border-radius: 4px;
}
.el-tabs__nav-wrap::after{
   width:330px ;
}
.el-tabs__item i{
  background-color: #c2c2c2;
  padding: 0 5px;
  border-radius: 50%;
}
.show{
  width: 100%;
  padding: 30px 40px 0px 30px;
  /* background-color: #ccc; */
  /* margin-left: 200px; */
    border: 1px solid #ccc;
  box-shadow:0px 2px 10px #ccc;
  border-radius: 4px;
}
.m{
  width: 206px;
  margin: 0px auto 0px;
}
.show .el-button--success{
  margin-top: 5px;
}
.show .el-row{
  height: 40px;
 
}
.twob{
  padding-left: 70px;
  text-align: right;
}
.bigshow{
  margin-left: 200px;
  width: 60%;
}
.top h4,
.bottom h4{
  font-size: 20px;
}
.top{
  margin-bottom: 20px;
  margin-top: 20px;
}
.bottom .twobb{
text-align: center;
}
.supplier .fff{
   width: calc(180% )
}
.supplier .el-form-item{
  width: 100%;
}
</style>
