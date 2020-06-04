<template>
  <div class="jiaoshi">
    <div>
      <h3>主讲教师</h3>
      <img src="@/assets/images/img_teacher.png" class="jiaoPhoto" />
      <p class="Tname">姓名：{{course_info.poster}}</p>
      <p class="Tname">联系方式：15812024578</p>
      <p class="Tname">电子信箱：15812024578@163.com</p>
      <h3>{{studentCourse.length}}人共同在学</h3>
      <ul>
        <li v-for="(item,index) in studentCourse" :key="index">
          <img :src="item.user_photo | serverUrl(item.user_photo)" :onerror="errorImg"/>
          <p class="ppp">{{item.user_realname}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import Mock from "mockjs";
export default {
  name: "mainInfo",
  props: {
    studentCourse: Array,
    course_info:Object
  },
  data() {
    return {
      dataName: [],
      errorImg: 'this.src="' + require("@/assets/images/failToLoad.png") + '"'
    };
  },
  created() {
    // const data = Mock.mock({
    //   "list|10-20": [
    //     {
    //       name: "@cname",
    //       img: "@/assets/images/studentPhoto.jpg"
    //     }
    //   ]
    // });
    // this.dataName = data.list;
  }
};
</script>
<style scoped>
.jiaoshi {
  width: 20%;
  float: left;
  border: 1px solid #ebeef5;
  margin-top: 40px;
  min-height: 500px;
}
.jiaoPhoto {
  margin: 0 auto;
  width: 24%;
  display: inherit;
}
.jiaoshi h3 {
  text-align: center;
}
.jiaoshi .Tname {
  width: 77%;
  margin: 5px auto;
}
.jiaoshi ul li {
  width: 60px;
  text-align: center;
  display: inline-block;
  /* float: left; */
  margin-left: 40px;
  margin-bottom: 5px;
}
.jiaoshi ul li img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 5px;
}
.ppp{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
