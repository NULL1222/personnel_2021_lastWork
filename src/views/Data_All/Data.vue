<template>
<div>
<cardgroup></cardgroup>
<zhutu></zhutu>
<bintu></bintu>
<yuanhuan></yuanhuan>
</div>
</template>

// Es6 导出规范
<script>
import zhutu from './zhutu/index'
import bintu from './bintu/index'
import cardgroup from './cardgroup/index'
import Vue from 'vue'
// 全局注册
// Vue.component('zhutu',zhutu)

export default {
    data() {
        return {
            
        }
    },
    components: {
        zhutu,
        bintu,
        cardgroup
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
