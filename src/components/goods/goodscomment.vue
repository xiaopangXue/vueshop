<template>
  <div>
    <!-- 引入评论组件 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
  //引入评论组件
  import comment from "../common/comment.vue";

  export default {
    data(){
      return {
        id:this.$route.params.id,
      }
    },
    components:{
      comment
    }
  }
</script>

<style scoped>

</style>