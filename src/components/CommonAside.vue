<template>
    <el-menu 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose" 
    :collapse="isCollapse">
    
    <div class="menu-title">
      <h3 v-show="!isCollapse">铁路后台管理系统</h3>
      <h3 v-show="isCollapse">导航</h3>
    </div>
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
      </el-menu>  
</template>

<script>
    export default {
      props: ["isCollapse"],
      data() {
        return {
           //isCollapse: false,
          menu: [
            {
              path: "/",
              name: "Data_All",
              label: "数据总览",
              icon: "s-data",
              url: "Data_All/Data", 
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
              label: "财政管理",
              icon: "coin",
              children: [
                {
                  path: "/finance",
                  name: "finance",
                  label: "公司收支",
                  icon: "coin",
                  url: "Finance/finance",
                },
                {
                  path: "/staff",
                  name: "staff",
                  label: "员工工资",
                  icon: "setting",
                  url: "Finance/staff",
                }
              ]
            },
            {
              path: "/railway",
              name: "Railway",
              label: "铁路管理",
              icon: "location",
              url: "Railway/Railway", 
            },
            {
              path: "/visitor",
              name: "Visitor",
              label: "旅客管理",
              icon: "s-custom",
              url: "Visitor/Visitor", 
            },
            {
              path: "/scan",
              label: "数据采集",
              icon: "upload",
              children: [
                {
                  path: "/scan",
                  name: "scan",
                  label: "扫描输入",
                  icon: "upload",
                  url: "Data_Scanning/scan",
                },
                {
                  path: "/input",
                  name: "input",
                  label: "人工输入",
                  icon: "setting",
                  url: "Data_Scanning/input",
                }
              ]
            }
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
        //  isCollapse() {
        //    return this.$store.state.tab.isCollapse;
        //  }
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
  .menu-title {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>