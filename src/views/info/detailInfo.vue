<template>
   <div class="detailInfo">
      <el-form ref="form" :model="form" label-width="80px">
         <el-form-item label="分类">
            <el-select v-model="form.categoryId" placeholder="请选择活动区域">
               <el-option
                  v-for="item in category"
                  :key="item.id"
                  :label="item.category_name"
                  :value="item.id"
               ></el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
         </el-form-item>
         <el-form-item label="日期">
            <el-date-picker :disabled="true" v-model="form.createDate" type="date" placeholder="选择日期"></el-date-picker>
         </el-form-item>
         <el-form-item label="缩略图" class="img">
            <el-upload
               class="avatar-uploader"
               action="https://jsonplaceholder.typicode.com/posts/"
               :show-file-list="false"
               :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload"
            >
               <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
         </el-form-item>
         <el-form-item label="内容">
            <quillEditor v-model="form.content" :options="config"></quillEditor>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="onSubmit">确定修改</el-button>
            <el-button @click="$router.push('/infoList')">取消</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>
import { formatDate } from "../../util/verify";
import { addApi, editInfoApi } from "../../api/infoList";
import { getListApi } from "../../api/infoList";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
   name: "detailInfo-com",
   components: {
      quillEditor
   },
   data() {
      return {
         form: {
            categoryId: "",
            title: "",
            createDate: "",
            imageUrl: "",
            content: ""
         },
         category: [],
         infoId: "",
         config: {} //富文本配置
      };
   },
   created() {
      //    获取分类列表
      this.getCategory();
   },
   mounted() {
      //    获取分类信息
      this.$nextTick(()=>{
         this.getList();
      })
    
   },
   methods: {
      onSubmit() {
         console.log(this.infoId);
         let resquestData = {
            id: this.infoId,
            categoryId: this.form.categoryId,
            title: this.form.title,
            content: this.form.content,
            imgUrl: ""
         };
         editInfoApi(resquestData)
            .then(res => {
               this.$message.success(res.data.message);
            })
            .catch(err => {
               this.$message.success(err.message);
            });
      },
      handleAvatarSuccess(res, file) {
         console.log(res, file);
         this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
         const isJPG = file.type === "image/jpeg";
         const isLt2M = file.size / 1024 / 1024 < 2;

         if (!isJPG) {
            this.$message.error("上传头像图片只能是 JPG 格式!");
         }
         if (!isLt2M) {
            this.$message.error("上传头像图片大小不能超过 2MB!");
         }
         return isJPG && isLt2M;
      },
      //获取信息列表
      getList() {
         console.log(this.infoId);
         let requestData = {
            categoryId: "",
            startTime: "",
            endTime: "",
            id: this.infoId,
            title: "",
            pageNumber: 1,
            pageSize: 1
         };
         getListApi(requestData)
            .then(res => {
               //  console.log(res, "信息列表");
               let resData = res.data.data;
               this.form.categoryId = resData.data[0].categoryId;
               this.form.title = resData.data[0].title;
               this.form.createDate = formatDate(resData.data[0].createDate);
               this.form.content = resData.data[0].content;
            })
            .catch(err => {
               console.log(err);
            });
      },
      // 获取分类列表
      getCategory() {
         this.$store
            .dispatch("storeTwo/getCategory", {})
            .then(res => {
               //    console.log(res, "获取分类");
               this.category = res.data.data;
            })
            .catch(err => {});
      }
   },
   beforeRouteEnter(to, from, next) {
      //   console.log(to);
      next(vm => {
         vm.infoId = to.query.detailInfo.id;
      });
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detailInfo {
   background-color: #fff;
   height: 100%;
   padding: 10px;
   box-sizing: border-box;
   overflow: auto;
   .img {
      /deep/ .el-upload {
         border: 1px dashed rgb(163, 163, 163);
      }

      .avatar-uploader .el-upload {
         border: 1px dashed #d9d9d9;
         border-radius: 6px;
         cursor: pointer;
         position: relative;
         overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
         border-color: #409eff;
      }
      .avatar-uploader-icon {
         font-size: 28px;
         color: #8c939d;
         width: 178px;
         height: 178px;
         line-height: 178px;
         text-align: center;
      }
      .avatar {
         width: 178px;
         height: 178px;
         display: block;
      }
   }
}
</style>