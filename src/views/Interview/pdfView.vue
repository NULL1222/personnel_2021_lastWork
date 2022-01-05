<template>
    <div>
      <pdf 
        ref="pdf"
        :src="url"
      >
      </pdf>
      <div>
        {{this.$route.query.url}}
      </div>
    </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components:{
      pdf
  },
  data(){
      return {
          url:this.$route.query.url,
      }
  }
}
</script>