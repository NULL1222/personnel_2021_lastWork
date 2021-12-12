<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini"></el-button>
      <h3 style="color: white;">数据总览</h3>
    </div>
    <div class="r-content" style="margin-left: 1170px;">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img :src="userImg" class="user"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
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
    };
  }
};

</script>

<style>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.l-content {
  /* isplay: flex; */
  /* align-items: center; */
  margin-top: 20px;
  width: 300px;
  /* margin-left: 10px; */
}
.el-button {
    /* width: 30px;
    height: 30px; */
    margin-left: 10px;
    background-color: rgb(121, 157, 204);
    /* border-width: 1px; */
  }
.user {
  border-radius: 50% ;
  width: 40px;
  height: 40px;
  border-color: black;
}
</style>
