<template>
  <div >
    <br><br>
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
 		</el-form>
      <el-upload
        class="upload-demo"
        drag
        action="/test/upload"
        multiple
        :auto-upload = "true"
        :file-list="fileList"
        :on-success="uploadFileHandler"
        :on-error="uploadFileErrorHandler"
        :before-upload="beforeAvatarUpload"
        :before-remove="beforeRemove">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过500kb</div>
      </el-upload>
   </div>
</template>
<script>
   export default {
    data() {
      return {
        loadId: '',
        headers: {
						'Content-Type': 'multipart/form-data'
					},
        imageUrl: '',
        fileList: [],
        time: '',
        postTime: '',
      };
    },
    created() {
    const myData2 = sessionStorage.getItem('userId2');
    this.loadId = myData2;
    },
    methods: {
      uploadFileHandler(res){
        console.log(res.words_result[7].words)
        const nowTime = new Date()
        let dd = String(nowTime.getDate()).padStart(2, '0');
        let mm = String(nowTime.getMonth() + 1).padStart(2, '0');
         this.time = nowTime.getFullYear() + '-' + mm + '-' + dd + ' ' + nowTime.getHours() + ':' + nowTime.getMinutes() + ':' + nowTime.getSeconds()
        this.postTime = nowTime.getFullYear() + '-' + mm + '-' + dd
        console.log(this.time)
        if(res.words_result[7].words === this.loadId){
          this.$axios.post('/checking/attendance?id=' + res.words_result[7].words +'&date=' + this.postTime, {}).then(resp=>{
            if(resp && resp.data.code === 200){
              this.$confirm('工号为'+res.words_result[7].words+'的'+res.words_result[4].words+'，您好！'+'</br>您已于'+this.time+'签到成功！'+'</br>好好工作，天天加薪！'
              , '签到成功！', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                cancelButtonText: '取消',
                type: 'success'
              })
            }else{
              this.$confirm('您今日已签到，谢谢！', '签到失败！', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                cancelButtonText: '取消',
                type: 'warning '
              })
            }
          })
        }
        else{
          this.$confirm('您的工号与登录账号不符，请重试！', '签到失败！', {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString: true,
            cancelButtonText: '取消',
            type: 'error'
          })
        }
      },
      beforeAvatarUpload(file) {
        debugger;
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
         if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return this.file
      },
      uploadFileErrorHandler(res){
        this.$message.error("上传失败,请检查网络连接")
      },
      beforeRemove(file, fileList) {
        this.$confirm(`确定移除 ${ file.name }？`);
      },
    }
  }
</script>