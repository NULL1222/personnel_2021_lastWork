<template>
<div>
{{myname}}
<zhutu></zhutu>
<bintu></bintu>
</div>
</template>

// Es6 导出规范
<script>
import zhutu from './zhutu/index'
import bintu from './bintu/index'
import Vue from 'vue'
// 全局注册
// Vue.component('zhutu',zhutu)

export default {
    data() {
        return {
            myname:"hhn"
        }
    },
    components: {
        zhutu,
        bintu
    },
    methods: {
        
    },
    computed:{

    },
    watch:{

    }
}
</script>

<style>

</style>
