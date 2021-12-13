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
          :key="subIndex" @click="clickMenu(item)">
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
              name: "home",
              label: "数据总览",
              icon: "s-data",
              url: "Home/Home", 
            },
            {
              path: "/mall",
              name: "mall",
              label: "人事管理",
              icon: "user-solid",
              url: "Home/Home", 
            },
            {
              path: "/finance",
              name: "home",
              label: "财政管理",
              icon: "coin",
              url: "Home/Home", 
            },
            {
              path: "/trail",
              name: "home",
              label: "铁路管理",
              icon: "location",
              url: "Home/Home", 
            },
            {
              path: "/visitor",
              name: "home",
              label: "旅客管理",
              icon: "s-custom",
              url: "Home/Home", 
            },
            {
              label: "数据采集",
              icon: "upload",
              children: [
                {
                  path: "/page1",
                  name: "page1",
                  label: "扫描输入",
                  icon: "upload",
                  url: "Other/pageOne",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "人工输入",
                  icon: "setting",
                  url: "Other/pageTwo",
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
          // console.log("Clicked !!!")
          this.$router.push({name: item.name})
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