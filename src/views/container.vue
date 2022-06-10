<template>
   <div> 
    <el-container class="container" style="min-height: 100%;">
        <el-aside width="auto"><common-aside :isCollapse="collapseStatus"></common-aside></el-aside>
        <el-container>
          <el-header><common-header @emitCollapse="toggle"></common-header></el-header>
          <el-main><router-view /></el-main>
        </el-container>
      </el-container>
   </div>
</template>
 <script>
import CommonAside from '../components/CommonAside'
import CommonHeader from '../components/CommonHeader'
 export default { 
  name: "Main",
  data() {
    return {
      collapseStatus: false
    }
  },
  components: {CommonAside, CommonHeader },
  methods: {
    toggle() {
      //当子组件 emit 的时候 会触发这个方法
      this.collapseStatus = !this.collapseStatus;
    }
  }
}
</script>
 <style>
.el-header {
  background-color: rgb(121, 157, 204);
}
.el-container {
  min-height: 100%;
}
.el-main {
  padding-top: 0;
}
.el-aside {
  height: 100vh;
}
 </style>