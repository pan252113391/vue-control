<template>
   <div class="nav">
      <i class=" icon el-icon-s-fold" aria-hidden="true" @click="collapse" v-show="isCollapse"></i>
      <i class=" icon el-icon-s-unfold" aria-hidden="true" @click="collapse" v-show="!isCollapse"></i>
      <span>{{!isCollapse}}</span>
   </div>
</template>

<script>
export default {
   name: "nav-component",
   data() {
      return {
         isCollapse: JSON.parse(this.$cookies.get("Collapse"))
      };
   },
   methods: {
      collapse() {
         this.isCollapse = !this.isCollapse;
         this.$store.commit("storeOne/MuIsCollapse", this.isCollapse);
      }
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav {
   height: 60px;
   background-color: #fff;
   display: flex;
   align-items: center;
   box-shadow: 5px 5px 2px rgb(78, 78, 78);
   .icon {
      font-size: 30px;
      padding-left: 10px;
      box-sizing: border-box;
   }
}
</style>
