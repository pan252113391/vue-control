<template>
   <div class="infoList">
      <!-- 搜索栏 -->
      <el-row>
         <el-col :span="4">
            <div class="flex">
               <span style="width:90px;">分类:</span>
               <el-select v-model="search.selectValue1" placeholder="请选择" size="mini">
                  <el-option
                     v-for="item in options1"
                     :key="item.id"
                     :label="item.category_name"
                     :value="item.id"
                  ></el-option>
               </el-select>
            </div>
         </el-col>
         <el-col :span="7">
            <div class="flex">
               <span style="width:90px;">日期:</span>
               <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="search.timeValue"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="mini"
               ></el-date-picker>
            </div>
         </el-col>
         <el-col :span="8">
            <div class="flex">
               <span style="width:200px;">关键词:</span>
               <el-select class="widthKey" v-model="search.region" placeholder="ID" size="mini">
                  <el-option label="ID" value="id"></el-option>
                  <el-option label="标题" value="title"></el-option>
               </el-select>
               <el-input v-model="search.keywordInput" size="mini" placeholder="请输入内容"></el-input>
               <el-button type="danger" size="mini" @click="searchButton">搜索</el-button>
               <el-button type="danger" size="mini" @click="clearData">清空</el-button>
            </div>
         </el-col>
         <el-col :span="2" :offset="3">
            <el-button class="button" type="danger" size="mini" @click="flagChange">新增</el-button>
         </el-col>
      </el-row>
      <!-- 表格栏 -->
      <el-table :data="infoList" style="width: 100%" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55"></el-table-column>
         <el-table-column prop="title" label="标题"></el-table-column>
         <el-table-column prop="categoryId" label="分类" width="280" :formatter="formatter_id"></el-table-column>
         <el-table-column prop="createDate" label="日期" :formatter="formatter_date" width="180"></el-table-column>
         <el-table-column prop="user" label="管理员" width="280"></el-table-column>
         <el-table-column prop label="操作" width="280">
            <template slot-scope="scope">
               <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
               <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
               >删除</el-button>
                <el-button type="warning" size="mini" @click="handleDetailInfo(scope.$index, scope.row)">信息详情</el-button>
            </template>
         </el-table-column>
      </el-table>
      <!-- 批量删除、分页 -->
      <el-row>
         <el-col :span="12">
            <el-button type="danger" size="small" @click="BatchDelete">批量删除</el-button>
         </el-col>
         <el-col :span="12">
            <el-pagination
               class="pull_right"
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :page-sizes="[5,10,15]"
               :page-size="2"
               layout="total, sizes, prev, pager, next"
               :total="total"
            ></el-pagination>
         </el-col>
      </el-row>
      <!-- 弹窗组件 -->
      <Dialog ref="dialog" :flag.sync="flag" :categogy="options1" :editRow="editRow" @dialogEnterClick="dialogEnterClick"/>
     
   </div>
</template>

<script>
import { getListApi, deleteInfo } from "../../api/infoList";
import Dialog from "../../components/dialog";
import messageEnter from "../../util/messageBox";
import { formatDate } from "../../util/verify";

export default {
   name: "infoList",
   components: {
      Dialog
   },
   data() {
      return {
         options1: [],
         search: {
            selectValue1: "",
            timeValue: "",
            region: "",
            keywordInput: ""
         },
         SelectArray: [],
         flag: false,
         total: 0,
         infoList: [],
         pageNumber: 1,
         pageSize: 5,
         editRow:{}
      };
   },
   methods: {
      handleSelectionChange(arr) {
         console.log(arr);

         this.SelectArray = arr.map(item => {
            return item.id;
         });
         console.log(this.SelectArray);
      },
      // 清空子组件中的input输入
      flagChange() {
         this.flag = true;
         this.$refs.dialog.clearData();
      },
      // 分页方法
      handleSizeChange(val) {
         console.log(`每页 ${val} 条`);
         this.pageSize = val;
         this.getList();
      },
      // 分页方法
      handleCurrentChange(val) {
         console.log(`当前页: ${val}`);
         this.pageNumber = val;
         this.getList();
      },
      handleEdit(index, row) {
        this.editRow = row;
         this.flag = true;
      },
      // 删除按钮  弹窗
      handleDelete(index, row) {
         let params = {
            title: "此操作将【永久删除】该文件, 是否继续?",
            fn: () => {
               let requestData = { id: [row.id] };
               console.log(requestData);
               deleteInfo(requestData)
                  .then(res => {
                     this.getList();
                  })
                  .catch(err => {});
            }
         };
         messageEnter(params);
         // this.message();
      },
      // 获取信息列表
      getList() {
         let requestData = {
            categoryId: this.search.selectValue1,
            startTime: this.search.timeValue[0],
            endTime: this.search.timeValue[1],
            id:'',
            title:'',
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
         };
         // 改变id和title中的值用于搜索
             requestData[this.search.region] = this.search.keywordInput;
         // console.log(requestData);
         getListApi(requestData)
            .then(res => {
               // console.log(res);
               let resData = res.data.data;
               this.total = resData.total;
               this.infoList = resData.data;
            })
            .catch(err => {
               console.log(err);
            });
      },
      // 获取分类
      getCategory() {
         this.$store
            .dispatch("storeTwo/getCategory", {})
            .then(res => {
               this.options1 = res.data.data;
               // console.log(res,"获取分类");
            })
            .catch(err => {});
      },
      // 批量删除
      BatchDelete() {
         let params = {
            title: "此操作将【批量永久删除】该文件, 是否继续?",
            fn: () => {
               let requestData = { id: this.SelectArray };
               console.log(requestData);
               if(!requestData){

               }
               deleteInfo(requestData)
                  .then(res => {
                     this.$message.success(res.data.message);
                     this.getList();
                  })
                  .catch(err => {});
            }
         };
         messageEnter(params);
      },
      //搜索按钮
      searchButton() {
         this.getList();
      },
      dialogEnterClick() {
         this.getList();
      },
      // 格式化日期
      formatter_date(row) {
         return formatDate(row.createDate);
      },
      // 格式化类型，让分类id转换成，相应文字
      formatter_id(row) {
         // console.log(row);
         let arr = this.options1.filter(item => {
            return item.id == row.categoryId;
         });
         if(!arr[0]){
            return;
         }
          
         return arr[0].category_name;
      },
      clearData() {
            this.search.selectValue1="",
            this.search.timeValue="",
            this.search.region="",
            this.search.keywordInput=""       
      },
      handleDetailInfo(index, row) {
         this.$router.push({path:'/detailInfo',query:{detailInfo:row}})
      }
   },
   created() {
      this.getList();
      this.getCategory();
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.infoList {

   background-color: #fff;
   height: 100%;
   .el-row {
      padding: 10px 0;
      .flex {
         display: flex;
         align-items: center;
         justify-content: center;
         span {
            text-align: center;
         }
         .widthKey{
            width: 200px;
         }
      }
      .pull_right {
         float: right;
      }
   }
}
</style>