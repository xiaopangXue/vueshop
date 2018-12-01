<template>
  <div class="photodetail-container">
      <h3>{{imageinfo.title}}</h3>
      <div class="subtitle">
        <span>发布时间：{{imageinfo.add_time | dateFormat}}</span>
        <span class="click">点击 {{imageinfo.click}} 次</span>
      </div>
      <hr>
      <!-- <div class="images" v-for="item in thumbimage" :key="item.src">
        <img :src="item.src" alt="">
      </div> -->
      <vue-preview :slides="thumbimage" ></vue-preview>
      <div class="contents" v-html="imageinfo.content">
        
      </div>

      <!-- 发表评论 -->
      <comment :id="id"></comment>

  </div>
</template>

<script>
  import comment from '../common/comment.vue';
  export default {
    data(){
      return {
        id:this.$route.params.id,
        imageinfo:[],
        thumbimage:[]
      }
    },
    created(){
      this.getImageInfo();
      this.getThumbImage();
    },
    methods:{
      getImageInfo(){
        this.$http.get("api/getimageInfo/"+this.id).then(function(res){
          console.log(res);
          if(res.body.status == 0){
            this.imageinfo = res.body.message[0];
          }
        });
      },
      getThumbImage(){
        this.$http.get("api/getthumbimages/"+this.id).then(function(res){
          // console.log(res);
          if(res.body.status == 0){
            res.body.message.forEach(function(ele){
              ele.w = 600;
              ele.h = 400;
              ele.msrc = ele.src;
            });
            this.thumbimage = res.body.message;
          }
        });
      }
    },
    components:{
      comment
    }
  }
</script>

<style lang="scss" scoped>
  .photodetail-container{
    padding: 8px 8px;
    h3{
      color:#26a2ff;
      font-size: 16px;
      text-align: center;
    }
    .images{
      img{
        width: 100%;
        height: 300px;
        padding-bottom:15px;
      }
    }
    .subtitle{
      color:rgb(155, 148, 148);
      font-size:13px;
      .click{
        float:right;
      }
    }
    .contents{
      color:rgb(133, 128, 128);
      font-size:14px;
      line-height: 35px;
    }
  }
</style>