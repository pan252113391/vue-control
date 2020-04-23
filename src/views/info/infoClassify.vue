<template>
   <div class="infoClassify">
      <div class="button_wrap">
         <el-button type="success" size="small" @click="addFirstData">添加一级分类</el-button>
      </div>
      <div class="content">
         <el-row>
            <el-col :span="12">
               <ul>
                  <!-- 父级菜单 -->
                  <li class="title" v-for="items in title" :key="items.id">
                     <div class="title_content">
                        <div class="left">
                           <i class="icon el-icon-plus" @click="showFn(items)"></i>
                           <span class="text">{{items.category_name}}</span>
                        </div>
                        <div class="right">
                           <el-button
                              type="primary"
                              size="mini"
                              round
                              @click="editFirstCategory(items)"
                           >编辑</el-button>
                           <el-button
                              type="success"
                              size="mini"
                              round
                              @click="addChildrenData(items)"
                           >添加子级</el-button>
                           <el-button
                              type="danger"
                              size="mini"
                              round
                              @click="deleteFirstCategory(items)"
                           >删除</el-button>
                        </div>
                     </div>
                     <!-- 子级菜单 -->
                     <!-- <collapse-transition> -->
                     <!-- v-show="showHidden && items.id === itemsId.id" -->
                     <ul class="hidden">
                        <li class="children" v-for="item in items.children" :key="item.id">
                           <div class="left">{{item.category_name}}</div>
                           <div class="right">
                              <el-button
                                 type="primary"
                                 size="mini"
                                 round
                                 @click="editChildrenCategory(item)"
                              >编辑</el-button>
                              <el-button
                                 type="danger"
                                 size="mini"
                                 round
                                 @click="deleteChildrenCategory(item)"
                              >删除</el-button>
                           </div>
                        </li>
                     </ul>
                     <!-- </collapse-transition> -->
                  </li>
               </ul>
            </el-col>
            <el-col :span="12">
               <el-form
                  v-show="isCategory"
                  :inline="true"
                  :model="formInline"
                  class="demo-form-inline"
               >
                  <el-form-item label="添加一级分类">
                     <el-input
                        v-model="formInline.firstLevel"
                        :disabled="isFirstdisabled"
                        placeholder="添加一级分类"
                     ></el-input>
                  </el-form-item>
                  <el-form-item>
                     <el-button
                        type="success"
                        @click="firstSubmit"
                        :disabled="isFirstdisabled"
                     >{{firstButton}}</el-button>
                  </el-form-item>
               </el-form>
               <el-form
                  v-show="isChildren"
                  :inline="true"
                  :model="formInline"
                  class="demo-form-inline"
               >
                  <el-form-item label="添加子级菜单">
                     <el-input
                        v-model="formInline.ChildrenLevel"
                        :disabled="istwoDisabled"
                        placeholder="添加子级菜单"
                     ></el-input>
                  </el-form-item>
                  <el-form-item>
                     <el-button
                        type="success"
                        @click="childrenSubmit"
                        :disabled="istwoDisabled"
                     >{{childrenButton}}</el-button>
                  </el-form-item>
               </el-form>
            </el-col>
         </el-row>
      </div>
   </div>
</template>

<script>
import {
   addFirstCategory,
   addChildrenCategory,
   getCategoryAll,
   editCategory,
   deleteCategory
} from "../../api/infoClassify";
import CollapseTransition from "../../util/collapse-transition";
import messageEnter from "../../util/messageBox";
export default {
   name: "infoClassify",
   components: {
      "collapse-transition": CollapseTransition
   },
   data() {
      return {
         dialogImageUrl: "",
         dialogVisible: false,
         title: [{ name: "没有数据信息" }],
         formInline: {
            firstLevel: "",
            ChildrenLevel: ""
         },
         isFirstdisabled: true,
         istwoDisabled: true,
         showHidden: false,
         itemsId: "",
         submitType: "",
         isCategory: true,
         isChildren: true,
         firstButton: "确定添加一级菜单",
         childrenButton: "确定添加子级菜单",
         childrenId: ""
      };
   },
   created() {
      getCategoryAll({})
         .then(res => {
            console.log(res);
            this.title = res.data.data;
            this.$message.success(res.data.message);
         })
         .catch(err => {
            console.log(err);
            this.$message.error(err.message);
         });
   },

   methods: {
      showFn(items) {
         // console.log(this.showHidden);
         this.showHidden = !this.showHidden;
         this.itemsId = items;
      },
      firstSubmit() {
         if (this.submitType == "add_first_category") {
            this.addFirstCategoryApi();
         } else if (this.submitType == "edit_first_category") {
            this.editFirstCategoryApi();
         }
      },
      childrenSubmit() {
         if (this.submitType == "add_children_data") {
            this.addChildrenCategoryApi();
         } else if (this.submitType == "edit_children_category") {
            this.editChildrenCategoryApi();
         } else if (this.submitType == "delete_children_category") {
            this.deleteChildrenCategoryApi();
         }
      },
      //点击添加一级分类
      addFirstData() {
         this.resetFirstFn();
         this.submitType = "add_first_category";
      },
      //点击添加子级
      addChildrenData(items) {
         this.resetChildrenFn();
         this.parentId = items.id;
         this.submitType = "add_children_data";
      },
      //点击编辑分类
      editFirstCategory(items) {
         this.resetFirstFn();
         this.parentId = items.id;
         console.log(this.parentId);
         this.submitType = "edit_first_category";
         this.formInline.firstLevel = items.category_name;
         this.firstButton = "确定编辑";
      },
      //点击编辑子级
      editChildrenCategory(item) {
         this.resetChildrenFn();
         this.submitType = "edit_children_category";
         this.formInline.ChildrenLevel = item.category_name;
         this.childrenButton = "确定编辑";
         this.childrenId = item.id;
      },
      deleteChildrenCategory(item) {
         this.resetChildrenFn();
         this.submitType = "delete_children_category";
         this.formInline.ChildrenLevel = item.category_name;
         this.childrenButton = "确定删除";
         this.childrenId = item.id;
         this.deleteChildrenCategoryApi();
      },
      resetFirstFn() {
         this.isFirstdisabled = false;
         this.istwoDisabled = true;
         this.isChildren = false;
         this.isCategory = true;
         this.formInline.firstLevel = "";
      },
      resetChildrenFn() {
         this.isFirstdisabled = true;
         this.istwoDisabled = false;
         this.isChildren = true;
         this.isCategory = false;
      },
      addFirstCategoryApi() {
         let resquestData = {
            categoryName: this.formInline.firstLevel
         };
         addFirstCategory(resquestData)
            .then(res => {
               console.log(res);
               this.title.push(res.data.data);
               this.formInline.firstLevel = "";
               this.$message.success(res.data.message);
            })
            .catch(err => {
               console.log(err);
               this.$message.error(err.message);
            });
      },
      editFirstCategoryApi() {
         let resquestData = {
            id: this.parentId,
            categoryName: this.formInline.firstLevel
         };
         // console.log(resquestData);
         editCategory(resquestData)
            .then(res => {
               console.log(res);
               this.$message.success(res.data.message);
               let editArr = this.title.filter(item => {
                  return item.id == this.parentId;
               });
               editArr[0].category_name = this.formInline.firstLevel;
               this.formInline.firstLevel = "";
            })
            .catch(err => {
               console.log(err);
               this.$message.error(err.message);
            });
      },
      addChildrenCategoryApi() {
         let resquestData = {
            categoryName: this.formInline.ChildrenLevel,
            parentId: this.parentId
         };
         addChildrenCategory(resquestData)
            .then(res => {
               console.log(this.parentId);
               let filterTitle = this.title.filter(items => {
                  console.log(items);
                  return items.id == this.parentId;
               });
               filterTitle[0].children.push(res.data.data);
               this.formInline.firstChildrenLevelLevel = "";
               this.$message.success(res.data.message);
            })
            .catch(err => {
               console.log(err);
               this.$message.error(err.message);
            });
      },
      deleteFirstCategory(items) {
         let deleteFn = () => {
            let resquestData = {
               categoryId: items.id
            };
            console.log(resquestData);
            deleteCategory(resquestData)
               .then(res => {
                  console.log(res);
                  let filterTitle = this.title.filter(titleItem => {
                     return titleItem.id !== items.id;
                  });
                  this.title = filterTitle;
               })
               .catch(err => {
                  console.log(err);
               });
         };
         messageEnter({
            title: "是否确定删除一级分类",
            fn: deleteFn
         });
      },
      editChildrenCategoryApi() {
         this.title.forEach(item => {
            item.children.forEach(ite => {
               if (ite.id == this.childrenId) {
                  ite.category_name = this.formInline.ChildrenLevel;
               }
            });
         });
         this.$message.success("编辑子级成功");
         this.formInline.ChildrenLevel = "";
      },
      deleteChildrenCategoryApi() {
         this.title.forEach(item => {
            let index = item.children.findIndex(ite => {
               return ite.id == this.childrenId;
            });
            if(index != '-1'){
               item.children.splice(index,1);
            }
         });

         this.$message.success("删除子级成功");
         this.formInline.ChildrenLevel = "";
      }
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.infoClassify {
   background-color: #fff;
   height: 100%;
   .button_wrap {
      padding: 20px;
      border-bottom: 1px solid #ccc;
   }
   .content {
      padding: 20px;
      height: calc(100% - 95px);
      box-sizing: border-box;
      overflow: auto;
      .title {
         line-height: 30px;
         margin-left: 10px;
         position: relative;

         .title_content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left {
               display: flex;
               align-items: center;
            }
            .right {
               display: none;
            }
            &:hover {
               background-color: rgb(231, 231, 231);
               .right {
                  display: block;
               }
            }
            .icon {
               border: 1px solid rgb(131, 130, 130);
               font-size: 10px;
               margin-right: 5px;
               color: rgb(131, 130, 130);
               position: absolute;
               z-index: 1;
               background-color: #fff;
               vertical-align: middle;
            }
            .text {
               padding-left: 15px;
               display: inline-block;
               vertical-align: middle;
            }
         }
         .hidden {
            overflow: hidden;
            .children {
               margin-left: 30px;
               line-height: 30px;
               position: relative;
               display: flex;
               justify-content: space-between;
               &:before {
                  content: "";
                  position: absolute;
                  height: 27px;
                  width: 20px;
                  border-bottom: 1px dashed #5f5f5f;
                  border-left: 1px dashed #5f5f5f;
                  top: -13px;
                  left: -24px;
               }
               .right {
                  display: none;
               }
               &:hover {
                  background-color: rgb(231, 231, 231);
                  .right {
                     display: block;
                  }
               }
            }
         }
      }
   }
}
</style>