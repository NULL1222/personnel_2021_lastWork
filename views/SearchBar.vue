<template>
    <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
      <el-input
        @keyup.enter.native="searchClick"
        :placeholder="text"
        prefix-icon="el-icon-search"
        size="primary"
        style="width: 400px;margin-right: 10px"
        v-model="keywords">
      </el-input>
      <el-button size="primary" type="primary" @click="searchClick">查询</el-button>
    </div>
  </template>
  
  <script>
      export default {
        name: 'SearchBar',
        data () {
          return {
            text: "请输入工号或姓名",
            keywords: '',
            books: [],
            cardLoading: []
          }
        },
        methods: {
          searchClick () {
            this.$emit('onSearch')
          }
        }
      }
  </script>
  
  <style scoped>
  
  </style>