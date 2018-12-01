<template>
  <div class="newsdetail-container" >
    <h3>{{newslistinfo.title}}</h3>
    <!-- 子标题 -->
    <div class="title">
      <span class="time">发表时间：{{newslistinfo.add_time | dateFormat}}</span>
      <span class="click">点击：{{newslistinfo.click}} 次</span>
    </div>
    <hr>
    <!-- 内容 -->
    <div class="content" v-html="newslistinfo.content">
    </div>
    
    <!-- 评论区 -->
    <!-- 引入评论区组件 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
// 引入评论组件
import comment from '../common/comment.vue';
//按需导入提示框
import {Toast} from 'mint-ui';
  export default {
    data(){
      return {
        id:this.$route.params.id,
        newslistinfo:[],
      }
    },
    created(){
      this.getNewsInfo();
    },
    methods:{
      //获取新闻详情
      getNewsInfo(){
        this.$http.get("api/getnew/"+this.id).then(function(res){
          if(res.body.status == 0){
            this.newslistinfo = res.body.message[0];
          }
        });
      },
    },
    components:{
      comment
    }
  }
</script>

<style lang="scss" scoped>
  .newsdetail-container{
    padding: 10px 10px;
    h3{
      font-size: 16px;
      color:red;
      // font-weight: bold;
      text-align: center;
      padding: 8px 0px;
    }
    .title{
      font-size: 13px;
      color: blue;
      .click{
        float:right;
      }
    }
    .content{
      padding: 5px 0;
    }

  }
</style>