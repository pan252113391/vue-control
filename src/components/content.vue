<template>
   <div class="content">
      <router-view></router-view>
   </div>
</template>

<script>
export default {
   name: "content-component"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
   padding: 10px;
   height: calc(100% - 62px);
   box-sizing: border-box;
   
}
</style>
