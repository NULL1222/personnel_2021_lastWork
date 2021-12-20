<template>
  <div class="personal">
    <div class="left-content">
      <img :src="userImg" class="photo-user"/>
    </div>
    <div>
      <el-descriptions class="des-right" 
        :labelStyle="{'font-size': '18px','font-weight': 'bold', }"
        :contentStyle="{'font-size': '18px'}" 
        :column="2" >
        <el-descriptions-item label="姓名">小李</el-descriptions-item>
        <el-descriptions-item label="工号">11111001</el-descriptions-item>
        <el-descriptions-item label="职务">财务管理</el-descriptions-item>
        <el-descriptions-item label="性别">女</el-descriptions-item>
        <el-descriptions-item label="身份证号">320303200203491188</el-descriptions-item>
        <el-descriptions-item label="地址">浙江省宁波市江北区孔浦街道风华路201号6#221</el-descriptions-item>
        <el-descriptions-item label="邮箱">LIIHSE2309@Gmail.com 1188 号</el-descriptions-item>
        <el-descriptions-item label="手机号"> 18745432998</el-descriptions-item>
        <el-descriptions-item label="考勤（本月）">22天</el-descriptions-item>
        <el-descriptions-item label="银行卡号">6543434234289834895</el-descriptions-item>
        <el-descriptions-item label="生日">1995-3-5</el-descriptions-item>
      </el-descriptions>
    </div>
  <div class="pwdchange">
    安全设置

    <el-button @click="changePwd">修改密码</el-button>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userImg: require("../assets/Me.png"),
    }
  },
  methods: {
    changePwd() {
      console.log("changepwd")
    }
  },
}
</script>

<style scoped>
.el-descriptions {
  margin-left: 50px;
  margin-top: 70px;
}
.photo-user {
  border-radius: 50% ;
  width: 250px;
  height: 250px;
  border-style: solid;
  margin-top: 40px;
  margin-left: 40px;  
  border-color: rgb(121, 157, 204);
}
.personal {
  display: flex;
  justify-content:flex-start;
  text-align: flex-start;
}
.left-content {

}
.des-right {

}
.pwdchange {

}
</style>