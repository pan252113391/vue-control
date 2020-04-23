<template>
   <div class="dialog">
      <el-dialog :title="editRow.id?'编辑':'新增'" :visible.sync="dialogFormVisible" @close="flagChange">
         <el-form :model="form">
            <el-form-item label="分类" :label-width="formLabelWidth">
               <el-select v-model="form.category" placeholder="请选择活动区域">
                  <el-option
                     v-for="item in categogy"
                     :key="item.id"
                     :label="item.category_name"
                     :value="item.id"
                  ></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="标题" :label-width="formLabelWidth">
               <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth">
               <el-input v-model="form.content" autocomplete="off"></el-input>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="flagChange">取 消</el-button>
            <el-button type="primary" @click="enterInfo">确定</el-button>
         </div>
      </el-dialog>
   </div>
</template>

<script>
// 引入
import { addApi, editInfoApi } from "../api/infoList";

export default {
   name: "dialog-com",
   props: {
      flag: {
         type: Boolean,
         default: false
      },
      categogy: {
         type: Array,
         default: []
      },
      editRow: {
         type: Object,
         default: {}
      }
   },
   data() {
      return {
         dialogFormVisible: false,
         form: {
            category: "",
            title: "",
            content: ""
         },
         formLabelWidth: "60px"
      };
   },
   watch: {
      flag(newValue, oldValue) {
         this.dialogFormVisible = newValue;
      },
      editRow(newValue, oldValue) {
         // this.row = newValue;
         this.edit();
      }
   },
   methods: {
      flagChange() {
         this.$emit("update:flag", false);
      },
      enterInfo() {
         if (!this.form.category) {
            this.$message.error("请选择分类");
            return false;
         } else if (!this.form.title) {
            this.$message.error("标题不能为空");
            return false;
         } else if (!this.form.content) {
            this.$message.error("内容不能为空");
            return false;
         }
         // console.log(this.editRow); editRow是点击编辑时，会传入子组件中一个对象
         if (this.editRow) {
            console.log('编辑');
            this.editInfo();
         } else {
            console.log('新增');
            this.addInfo();
         }
      },
      editInfo() {
         let resquestData = {
            id: this.editRow.id,
            categoryId:  this.form.category,
            title: this.form.title,
            content: this.form.content,
            imgUrl: '',
         };
         editInfoApi(resquestData)
            .then(res => {
                this.$message.success(res.data.message);
                this.clearData();
               this.$parent.getList();
            })
            .catch(err => {
               this.$message.success(err.message);
            });
      },
      addInfo() {
         let resquestData = {
            category: this.form.category,
            title: this.form.title,
            content: this.form.content
         };
         addApi(resquestData)
            .then(res => {
               console.log(res);
               this.$message.success(res.data.message);
               this.dialogFormVisible = false;
               this.$emit("dialogEnterClick", false);
               // 清空输入框数据
               this.clearData();
               this.$parent.getList();
            })
            .catch(err => {
               console.log(err);
               this.$message.error(err.message);
            });
      },
      // 清空input框
      clearData() {
         this.form.category = "";
         this.form.title = "";
         this.form.content = "";
      },
      edit() {
         this.form.category = this.editRow.categoryId;
         this.form.title = this.editRow.title;
         this.form.content = this.editRow.content;
      }
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
