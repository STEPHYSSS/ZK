export default [{
    name: 'page',
    path: '/page',
    component: (resolve) => require(['@/views/homePage'], resolve),
  },
  { //新闻公告
    name: 'announceList',
    path: '/announceList',
    component: (resolve) => require(['@/views/cx/home/announceList'], resolve),
  },
  { //我的试卷
    name: 'myTest',
    path: '/myTest',
    component: (resolve) => require(['@/views/cx/myTest/myTest'], resolve),
  },
  { //准备考试
    name: 'prepareForExamination',
    path: '/prepareForExamination',
    component: (resolve) => require(['@/views/cx/myTest/prepareForExamination'], resolve),
  },
  { //历史考试
    name: 'historyTryBook',
    path: '/historyTryBook',
    component: (resolve) => require(['@/views/cx/myTest/historyTryBook'], resolve),
  },
  { //历史考试详情
    name: 'historyExamDetails',
    path: '/historyExamDetails',
    component: (resolve) => require(['@/views/cx/myTest/historyExamDetails'], resolve),
  },
  { //自我检测列表
    name: 'selfExamList',
    path: '/selfExamList',
    component: (resolve) => require(['@/views/cx/selfTest/selfExam/selfExamList'], resolve),
  },
  { //新建自我检测
    name: 'selfConfigOptions',
    path: '/selfConfigOptions',
    component: (resolve) => require(['@/views/cx/selfTest/selfExam/selfConfigOptions'], resolve),
  },
  { //开始自我检测
    name: 'startSelfExam',
    path: '/startSelfExam',
    component: (resolve) => require(['@/views/cx/selfTest/selfExam/startSelfExam'], resolve),
  },
  { //个人课程列表
    name: 'curriculumsTable',
    path: '/curriculumsTable',
    component: (resolve) => require(['@/views/cx/selfTest/curriculumsTable'], resolve),
  },
  { //自我检测记录
    name: 'selfTestRecord',
    path: '/selfTestRecord',
    component: (resolve) => require(['@/views/cx/selfTest/selfExam/selfTestRecord'], resolve),
  },

  { //个人信息修改
    name: 'personalInfo',
    path: '/personalInfo',
    component: (resolve) => require(['@/views/cx/personalCentre/personalInfo'], resolve),
  },
  { //我的错题集
    name: 'myWrongTopicSet',
    path: '/myWrongTopicSet',
    component: (resolve) => require(['@/views/cx/personalCentre/myWrongTopicSet'], resolve),
  },

  { //下载PPT文件
    name: 'downloadPPTFile',
    path: '/downloadPPTFile',
    component: (resolve) => require(['@/views/cx/resourceLibrary/downloadPPTFile'], resolve),
  },
  {//教材列表
    name: 'textBookList',
    path: '/textBookList',
    component: (resolve) => require(['@/views/cx/resourceLibrary/textBookList'], resolve),
  },
  { //资源库课程详情
    path: '/exprole',
    name: 'exprole',
    component: () => import('@/views/cx/resourceLibrary/exprole'),
  },
  {
    path: '/priview',
    name: 'priview',
    component: () => import('@/views/cx/resourceLibrary/priview'),
  },
  { //新零售实训
    name: 'newRetailTax',
    path: '/newRetailTax',
    component: (resolve) => require(['@/views/cx/newRetailTax/newRetailTax'], resolve),
  },
  { //新零售实训测试
    name: 'trainingTest',
    path: '/trainingTest',
    component: (resolve) => require(['@/views/cx/newRetailTax/trainingTest'], resolve),
  },
  { // 新零售实训题(考试时跳转带时间)
    name: 'toNewRetail',
    path: '/toNewRetail',
    component: (resolve) => require(['@/views/cx/myTest/toNewRetail'], resolve)
  },
  { // 实训教学和实训训练选择角色
    name: 'publicRole',
    path: '/publicRole',
    component: (resolve) => require(['@/views/cx/newRetailTax/publicRole'], resolve)
  },
  { // 考试、自测交卷后的进入实训的详情页面
    name: 'testOrExamDetail',
    path: '/testOrExamDetail',
    component: (resolve) => require(['@/views/cx/newRetailTax/testOrExamDetail'], resolve)
  }
]
