<template>
   <div> 
    <el-container style="position: relative">
        <el-aside width="auto"><common-aside></common-aside></el-aside>
        <el-container>
          <el-header><common-header></common-header></el-header>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
   </div>
</template>

<script>
import CommonAside from '../components/CommonAside'
import CommonHeader from '../components/CommonHeader'

export default { 
  name: "Main",
  components: {CommonAside, CommonHeader }
}
</script>

<style>
.el-containier {
  /* height: 100vh; */
  /* width: 100%; */
}
.el-header {
  background-color: rgb(121, 157, 204);
}
.el-main {
  padding-top: 0;
}
.el-aside {
  height: 100vh;
  /* background-color: rgb(121, 157, 204); */
}

</style>