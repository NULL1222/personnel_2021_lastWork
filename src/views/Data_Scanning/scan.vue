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
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        headers: {
						'Content-Type': 'multipart/form-data'
					},
        imageUrl: '',
        fileList: [],
      };
    },
    methods: {
      uploadFileHandler(res){
        console.log(res.words_result[8])

        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        console.log("看看这个",this.fileList)
        // var _this = this;
        // debugger;
        // var files=file.target.files[0];
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
        console.log(fileList.length)
        console.log(this.isJPG)
        if (this.isJPG && this.isLt2M)
          return this.$confirm(`确定移除 ${ file.name }？`);

      },
    }
  }
</script>