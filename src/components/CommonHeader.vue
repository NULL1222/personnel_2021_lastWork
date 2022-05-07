<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="emitCollapse"></el-button>
      <h3 class="l-content-text"></h3>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img :src="userImg" class="r-content-user"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="personalCenter">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
 <script>
export default {
  data() {
    return {
      userImg: require("../assets/Me.png"),
      role: {
        id: '',
        name: '',
        sex: '',
        mail: '',
        phone: '',
        idCard: '',
        card: '',
        address: '',
        attendance: '',
        birthday: ''
      }
    };
  },
  methods: {
    emitCollapse() {
      this.$emit('emitCollapse');
    },
    personalCenter() {
      this.$router.push({
        path: '/personalCenter'
      })
      console.log("clickpersonCenter")
    },
    logout() {
      this.$confirm('此操作将注销登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
      }).then(() => {
        window.sessionStorage.clear()
        // 跳转到登录页
        this.$router.push('/')
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", function (e) {
          history.pushState(null, null, document.URL);
        }, false);
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });    
      });
    }
  }
};
 </script>
 <style scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.l-content {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 300px;
  padding: 10px;
}
.l-content-text {
  color: white;
  margin-left: 20px;
}
.r-content {
  display: flex;
  align-items: baseline;
  justify-content: center;
}
 .r-content-user {
  border-radius: 50% ;
  width: 40px;
  height: 40px;
  margin-top: 7px;
  margin-right: 10px;
}
</style>
