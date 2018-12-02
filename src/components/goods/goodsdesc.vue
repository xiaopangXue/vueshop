<template>
  <div class="goodsdesc-container">
    <h2 class="title">{{goodsinfo.title}}</h2>
    <hr>
    <div class="content" v-html="goodsinfo.content"></div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        id: this.$route.params.id,
        goodsinfo:{}
      }
    },
    created(){
      this.getGoodsDesc();
    },
    methods:{
      getGoodsDesc(){
        this.$http.get("api/getgoodsdesc/"+this.id).then(function(res){
          // console.log(res);
          if(res.body.status == 0){
            this.goodsinfo = res.body.message[0];
          }
        });
        // console.log(this.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .goodsdesc-container{
    .title{
      color:rgb(35, 53, 216);
      font-size: 15px;
      font-weight:bold;
    }

    /deep/ img{
      width:100%;
      // height:100%;
    }
  }
</style>