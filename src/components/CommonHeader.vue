<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="emitCollapse"></el-button>
      <h3 class="l-content-text">数据总览</h3>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img :src="userImg" class="r-content-user"/>
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
  },
  methods: {
    emitCollapse() {
      this.$emit('emitCollapse');
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
