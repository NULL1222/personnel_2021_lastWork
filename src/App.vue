<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <div class="background">
    <img src="../src/images/login_background.jpg">
    </div> -->
    <!-- <comA></comA>
    <comB></comB> -->
    <router-view/>
    <!-- 啦啦啦 -->
  </div>
</template>

<script>
import ComA from './views/Login'
import ComB from './views/PersonalCenter'

export default {
  components: {
    ComA,
    ComB
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
