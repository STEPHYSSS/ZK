import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/* export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
}) */
const router = new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    redirect: 'login'
},
{
    name: 'login',
    path: '/login',
    component: (resolve) => { require(['@/views/login/login'], resolve) }
},
{
    name: 'indexMenu',
    path: '/indexMenu',
    component: (resolve) => { require(['@/views/index/indexMenu'], resolve) },
    redirect: '/userList',
    children: [
      // 用户管理
      {
        name: 'userList',
        path: '/userList',
        component: (reslove) => { require(['@/views/user/staff/userList'], reslove) }
      },
      {
        name: 'addUser',
        path: '/addUser',
        component: (reslove) => { require(['@/views/user/staff/addUser'], reslove) }
      },
      {
        name: 'accountManagement',
        path: '/accountManagement',
        component: (reslove) => { require(['@/views/user/account/accountManagement'], reslove) }
      },
      {
        name: 'addAccount',
        path: '/addAccount',
        component: (reslove) => { require(['@/views/user/account/addAccount'], reslove) }
      },
      // 系统设置
      {
        name: 'stationList',
        path: '/stationList',
        component: (reslove) => { require(['@/views/systemSetup/postManagement/stationList'], reslove) }
      },
      {
        name: 'addStation',
        path: '/addStation',
        component: (reslove) => { require(['@/views/systemSetup/postManagement/addStation'], reslove) }
      },
      {
        name: 'recordList',
        path: '/recordList',
        component: (reslove) => { require(['@/views/systemSetup/postManagement/recordList'], reslove) }
      },
      {
        name: 'roleList',
        path: '/roleList',
        component: (reslove) => { require(['@/views/systemSetup/roleManagement/roleList'], reslove) }
      },
      {
        name: 'addRole',
        path: '/addRole',
        component: (reslove) => { require(['@/views/systemSetup/roleManagement/addRole'], reslove) }
      },


      //考勤管理
      {//考勤规则
          name: 'attendanceRules',
          path: '/attendanceRules',
          component: (reslove) => { require(['@/views/attendance/attendanceRules'], reslove) },
          meta: {aaa: 'aaa'},
      },
      {//新增考勤
        name: 'addAttendance',
        path: '/addAttendance',
        component: (reslove) => { require(['@/views/attendance/addAttendance'], reslove) }
      },
      {//考勤记录
        name: 'attendanceRecord',
        path: '/attendanceRecord',
        component: (reslove) => { require(['@/views/attendance/attendanceRecord'], reslove) }
      },
      {//考勤统计
        name: 'attendanceStatistics',
        path: '/attendanceStatistics',
        component: (reslove) => { require(['@/views/attendance/attendanceStatistics'], reslove) }
      },


      // 模块管理
      {//广告管理
        name: 'advertising',
        path: '/advertising',
        component: (reslove) => { require(['@/views/moduleManagement/advertising'], reslove) }
      },
      {//新增广告
        name: 'addNewAdvertising',
        path: '/addNewAdvertising',
        component: (reslove) => { require(['@/views/moduleManagement/addNewAdvertising'], reslove) }
      },


      // 日常管理
      {//评分审核
        name: 'scoreReview',
        path: '/scoreReview',
        component: (reslove) => { require(['@/views/dailyManagement/scoreReview'], reslove) }
      },
      {//评分审核详情
        name: 'scoringDetails',
        path: '/scoringDetails',
        component: (reslove) => { require(['@/views/dailyManagement/scoringDetails'], reslove) }
      },
      {//评分审核详情（待审核）
        name: 'scoringDetails_superior',
        path: '/scoringDetails_superior',
        component: (reslove) => { require(['@/views/dailyManagement/scoringDetails_superior'], reslove) }
      },
      {//评分审核详情（已作废）
        name: 'scoringDetails_obsolete',
        path: '/scoringDetails_obsolete',
        component: (reslove) => { require(['@/views/dailyManagement/scoringDetails_obsolete'], reslove) }
      },
      {//申诉管理
        name: 'appeal',
        path: '/appeal',
        component: (reslove) => { require(['@/views/dailyManagement/appeal'], reslove) }
      },
      {//申诉详情
        name: 'appealDetails',
        path: '/appealDetails',
        component: (reslove) => { require(['@/views/dailyManagement/appealDetails'], reslove) }
      },
      {//出勤休假
        name: 'attendanceVacation',
        path: '/attendanceVacation',
        component: (reslove) => { require(['@/views/dailyManagement/attendanceVacation'], reslove) }
      },
      {//出勤详情
        name: 'attendanceDetails',
        path: '/attendanceDetails',
        component: (reslove) => { require(['@/views/dailyManagement/attendanceDetails'], reslove) }
      },
    ]
  }]
})

/* 导航守卫*/
router.beforeEach((to, from, next) => {
  if (from.name) sessionStorage.beforeName = from.name
  else next()
  next()
})

export default router