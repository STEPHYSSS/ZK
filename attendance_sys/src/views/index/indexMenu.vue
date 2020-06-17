<template>
  <el-container>
    <el-aside
      width="200px"
      style="background-color: #fff;box-sizing: border-box;border-left:1px solid rgba(217,217,217,1);border-right: solid 1px #e6e6e6;">
      <div class="index-logo">
        <img src="@/assets/images/logo_blue.png" alt />
      </div>
      <el-menu router>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>用户管理
          </template>
          <el-menu-item-group>
            <el-menu-item
              :class="activeName === 'userList' ? 'activeRouter' : ''"
              index="/userList"
              @click="editableTabs('员工管理', 'userList')">
              员工管理
            </el-menu-item>
            <el-menu-item
              :class="activeName === 'accountManagement' ? 'activeRouter' : ''"
              index="/accountManagement"
              @click="editableTabs('账号管理', 'accountManagement')">
              账号管理
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-claim"></i>考勤管理
          </template>
          <el-menu-item-group>
            <el-menu-item
              :class="activeName === 'attendanceRules' ? 'activeRouter' : ''"
              index="/attendanceRules"
              @click="editableTabs('考勤规则', 'attendanceRules')">
              考勤规则
            </el-menu-item>
            <el-menu-item
              :class="activeName === 'attendanceRecord' ? 'activeRouter' : ''"
              index="/attendanceRecord"
              @click="editableTabs('考勤记录', 'attendanceRecord')">
              考勤记录
            </el-menu-item>
            <el-menu-item
              :class="activeName === 'attendanceStatistics' ? 'activeRouter' : ''"
              index="/attendanceStatistics"
              @click="editableTabs('考勤统计', 'attendanceStatistics')">
              考勤统计
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-tools"></i>系统设置
          </template>
          <el-menu-item-group>
            <el-menu-item
              :class="activeName === 'stationList' ? 'activeRouter' : ''"
              index="/stationList"
              @click="editableTabs('岗位管理', 'stationList')">
              岗位管理
            </el-menu-item>
            <el-menu-item
              :class="activeName === 'roleList' ? 'activeRouter' : ''"
              index="/roleList"
              @click="editableTabs('角色管理', 'roleList')">
              角色管理
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-date"></i>日常管理
          </template>
          <el-menu-item-group>
            <el-menu-item
              :class="activeName === 'scoreReview' ? 'activeRouter' : ''"
              index="/scoreReview"
              @click="editableTabs('评分审核', 'scoreReview')">
              评分审核
            </el-menu-item>
            <el-menu-item
              :class="activeName === 'appeal' ? 'activeRouter' : ''"
              index="/appeal"
              @click="editableTabs('申诉管理', 'appeal')">
              申诉管理
            </el-menu-item>
            <el-menu-item
              :class="activeName === 'attendanceVacation' ? 'activeRouter' : ''"
              index="/attendanceVacation"
              @click="editableTabs('出勤请假', 'attendanceVacation')">
              出勤请假
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-menu"></i>模块管理
          </template>
          <el-menu-item-group>
            <el-menu-item
              :class="activeName === 'advertising' ? 'activeRouter' : ''"
              index="/advertising"
              @click="editableTabs('广告管理', 'advertising')">
              广告管理
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="font-size: 12px" class="menu-header">
        <div class="tab-header qzbhh">
          <span
            v-for="(item, index) in tabsList"
            :key="index"
            style="display: inline-block;"
            @click="gogogo(item.routerName)"
            class="cur-point"
            :class="activeName === item.routerName ? 'activeli' : ''">
            {{item.tabName}}
            <i class="el-icon-close" @click.stop.prevent="delTab(item.routerName)"></i>
          </span>
        </div>
        <el-dropdown trigger="hover" :show-timeout="0" @command="handleCommand">
          <span class="el-dropdown-link user-info">
            <span class="ssl">{{userInfo.name}}</span>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix" command="a">修改密码</el-dropdown-item>
            <el-dropdown-item class="clearfix" command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
    
    <!-- 修改密码 -->
    <re-pwd ref="rePwd"></re-pwd>

  </el-container>
</template>


<script>
import rePwd from './rePwd'
import { roleDetail } from '@/api/systemSetup'
export default {
  data() {
    return {
      // 权限列表
      powerList: [],
      // 侧边栏列表 用来遍历
      initTabsList: [
        {
          tabName: '员工管理',
          routerName: 'userList'
        },
        {
          tabName: '账号管理',
          routerName: 'accountManagement'
        },
        {
          tabName: '考勤规则',
          routerName: 'attendanceRules'
        },
        {
          tabName: '考勤记录',
          routerName: 'attendanceRecord'
        },
        {
          tabName: '考勤统计',
          routerName: 'attendanceStatistics'
        },
        {
          tabName: '岗位管理',
          routerName: 'stationList'
        },
        {
          tabName: '角色管理',
          routerName: 'roleList'
        },
        {
          tabName: '评分审核',
          routerName: 'scoreReview'
        },
        {
          tabName: '申诉管理',
          routerName: 'appeal'
        },
        {
          tabName: '出勤请假',
          routerName: 'attendanceVacation'
        },
        {
          tabName: '广告管理',
          routerName: 'advertising'
        },
      ],
      // 头部tab栏列表
      tabsList: [],
      // 用来判断 显示哪个tabs
      activeName: "",
      // 登录人信息
      userInfo: JSON.parse(sessionStorage.userInfo) || {}
    }
  },
  created () {
    // 获取权限详情
    this.getRoleDetail(JSON.parse(sessionStorage.userInfo).roleId)
  },
  components: {
    rePwd
  },
  methods: {
    async getRoleDetail (id) {
      const { data: { code, data } } = await roleDetail({id})
      if (code === '0000') {
        this.powerList = data.powerSet
        // 第一次进来讲用户列表存到role
        sessionStorage.setItem('role', JSON.stringify(data.powerSet[0].children))
        // 控制头部tab栏是否已有
        let flag = false
        for (const i of this.initTabsList) { // 遍历侧边栏列表
          if (i.routerName == this.$route.name) {  // 找到与当前路由名相匹配的tab
            flag = true
            // push && 显示当前栏
            this.tabsList.push(i)
            this.activeName = i.routerName
          }
        }
        // 如果没有 与当前路由名相匹配的tab 说明在新增页或者其他不在侧边栏显示的页面
        if (!flag) {
          for (const i of this.initTabsList) {
            if (i.routerName == sessionStorage.beforeName) { // 找到与前一个路由名相匹配的tab
              // push && 显示当前栏
              this.tabsList.push(i)
              this.activeName = i.routerName
            }
          }
        }
      }
    },
    // 修改密码或退出登录
    handleCommand(id) {
      if (id === "b") {
        sessionStorage.clear()
        this.$router.push({ name: "login" })
      } else if (id === "a") {
        this.$refs.rePwd.dialogFormVisible = true
      }
    },
    // aside
    editableTabs(tabName, routerName) {
      this.activeName = routerName
      let flag = false
      for (const i of this.tabsList) {
        if (i.routerName === routerName) return flag = true
      }
      if (!flag) {
        this.tabsList.push({ tabName, routerName })
      }
    },
    // 点击头部tab栏跳转
    gogogo(routerName) {
      this.activeName = routerName
      this.$router.push({ name: routerName })
    },
    // 删除tab栏 if删除当前页 则返回userList
    delTab(routerName) {
      if (this.tabsList.length <= 1) return false
      for (const i in this.tabsList) {
        const item = this.tabsList[i]
        if (item.routerName === routerName) {
          this.tabsList.splice(i, 1)
        }
      }
      if (this.activeName === routerName) {
        this.activeName = this.tabsList[0].routerName
        this.$router.push({ name: this.tabsList[0].routerName })
      }
    },
    // 储存权限到session
    cRole (tabName) {
      for (const i of this.powerList) {
        if (tabName === i.name) {
          sessionStorage.setItem('role', JSON.stringify(i.children))
        }
      }
    }
  },
  watch: {
    activeName: function (val) {
      this.activeName = val
      this.$router.push({name: val})
      for (const i of this.tabsList) {
        if (i.routerName === val) {
          this.cRole(i.tabName)
        }
      }
    },
    $route: function (val) {
      let tabName = ''
      for (const i of this.initTabsList) {
        if (i.routerName == val.name) {
          tabName = i.tabName
        }
      }
      if (tabName) this.editableTabs(tabName, val.name)
    }
  },
}
</script>
<style scope>
.index-logo {
  width: 200px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tab-header {
  width: calc(100% - 130px);
  overflow: auto;
}
.tab-header span {
  position: relative;
  text-align: center;
  height: 45px;
  width: 74px;
  padding-left: 15px;
}
.activeli::before {
  position: absolute;
  bottom: 0px;
  left: 16px;
  content: "";
  width: 58px;
  border-bottom: 2px solid #4489fe;
}
.activeRouter {
  position: relative;
}
.activeRouter::before {
  position: absolute;
  content: "";
  left: 28px;
  top: 15px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fa8a11;
}
.ssl {
  width: 80px;
}
.user-info {
  display: flex;
  align-items: center;
}
</style>