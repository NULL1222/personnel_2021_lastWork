<template>
<div>
<cardgroup></cardgroup>
<zhexian></zhexian>
<bintu></bintu>
</div>
</template>
// Es6 导出规范
<script>

import bintu from './bintu/index'
import cardgroup from './cardgroup/index'
import zhexian from './zhexian/index'
import Vue from 'vue'
// 全局注册
// Vue.component('zhutu',zhutu)

export default {
    data() {
        return {
            
        }
    },
    components: {
        bintu,
        cardgroup,
        zhexian
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
