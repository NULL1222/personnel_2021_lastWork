<template>
    <el-menu 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose" 
    :collapse="isCollapse">
     <div class="menu-title">
      <h3 v-show="!isCollapse">铁路后台管理系统</h3>
      <h3 v-show="isCollapse">导航</h3>
    </fragment>
    </div>
    <fragment v-if="userRole_1 === 'admin'">
      <el-menu-item :index="item.path" v-for="item in noChildren" 
      :key="item.path" @click="clickMenu(item)">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu :index="item.label" v-for="item in hasChildren" 
      :key="item.path">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" 
          :key="subIndex" @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
    </fragment>
    <fragment v-else>
      <el-menu-item :index="item.path" v-for="item in userMenu" 
      :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
      </el-menu-item>
       <el-submenu :index="item.label" v-for="item in hasChildren" 
      :key="item.path">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" 
          :key="subIndex" @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
    </fragment>
      </el-menu>  
 </template>
 <script>
    export default {
      props: ["isCollapse"],
      data() {
        return {
          userRole_1: sessionStorage.getItem('userRole'),
          // isCollapse: false,
          menu: [
            // {
            //   path: "/",
            //   name: "Data_All",
            //   label: "数据总览",
            //   icon: "s-data",
            //   url: "Data_All/Data", 
            // },
            {
              path: "/",
              name: "Notice",
              label: "公告",
              icon: "s-order",
              url: "Notice/notice", 
            },
            {
              path: "/personnel",
              name: "Personnel",
              label: "人事管理",
              icon: "user-solid",
              url: "Personnel/Personnel", 
            },
            {
              path: "/finance",
              label: "员工工资",
              name: "finance",
              icon: "coin",
              url: "Finance/staff", 
            },
            {
              path: "/interview",
              name: "interview",
              label: "新员工培训",
              icon: "folder-checked",
              url: "Interview/interview", 
            },
            {
              path: "/check",
              name: "check",
              label: "请假审核",
              icon: "folder-checked",
              url: "Interview/interview", 
            },
            {
              path: "/scan",
              label: "考勤签到",
              icon: "date",
              children: [
                {
                  path: "/scan",
                  name: "scan",
                  label: "工牌签到",
                  icon: "upload",
                  url: "Data_Scanning/scan",
                },
                {
                  path: "/input",
                  name: "input",
                  label: "手动签到",
                  icon: "setting",
                  url: "Data_Scanning/input",
                }
              ]
            }
           ],
          userMenu: [
            {
              path: "/",
              name: "Notice-u",
              label: "公告",
              icon: "s-order",
              url: "Notice/notice-u", 
            },
            {
              path: "/normalStaff",
              name: "normalStaff",
              label: "工资",
              icon: "s-order",
              url: "Finance/normalStaff", 
            },
            {
              path: "/request",
              name: "request",
              label: "请假",
              icon: "s-order",
              url: "absence/CheckRequest", 
            },
           ]
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        clickMenu(item) {
            this.$router.push({name: item.name});
          }
      },
      computed: {
        noChildren() {
          return this.menu.filter((item) => !item.children)
        },
        hasChildren() {
          return this.menu.filter((item) => item.children)
        },
      }
     }
</script>
 <style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    transition: width 0.1s ease-in-out;
  }
  .el-menu-item {
    text-align: left;
  }
  .el-submenu {
    text-align: left;
  }
  .menu-title {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-submenu {
    text-align: left;
  }
</style>