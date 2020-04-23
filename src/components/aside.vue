<template>
   <div class="aside" :class="{'changWidth':!Collapse}">
      <div class="img_wap">
         <img src="../assets/control.png" />
      </div>
      <el-menu
         default-active="1"
         class="el-menu-vertical-demo"
         background-color="#35495E"
         text-color="#fff"
         active-text-color="#ffd04b"
         :collapse="!Collapse"
         :router="true"
      >
         <template v-for="(items) in routes">
            <el-submenu :index="items.path" :key="items.id" v-if="!items.hidden">
               <template slot="title">
                  <i class="icon" :class="items.meta.icon"></i>
                  <span>{{items.meta.name}}</span>
               </template>
               <el-menu-item  
                  v-for="item in items.children"
                  :key="item.id"
                  :index="item.path"
                  v-show="!item.hidden"
               >{{item.meta.name}}</el-menu-item>
            </el-submenu>
         </template>
      </el-menu>
   </div>
</template>

<script>
export default {
   name: "aside-component",
   data() {
      return {};
   },
   computed: {
      routes() {
         console.log(this.$router.options.routes);
         return this.$router.options.routes;
      },
      Collapse() {
         return this.$store.getters["storeOne/getIsCollapse"];
      }
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.aside {
   width: 200px;
   height: 100%;
   transition: all 1s;
   background-color: $bgColor;
   .img_wap {
      padding: 10px;
      img {
         width: 100%;
      }
   }
   .icon {
      font-size: 30px;
      color: #fff;
   }
}
.changWidth {
   width: 64px;
}
</style>
