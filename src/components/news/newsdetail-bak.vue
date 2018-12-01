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
    <div class="comment">
      <h2 class="title">发表评论</h2>
      <textarea placeholder="请输入你要bb的内容(不超过120个字)" v-model="content"></textarea>
      <mt-button type="primary" size="large" @click="postComment" >发表评论</mt-button>
      <div class="list">
        <div class="list-item" v-for="(item,index) in comments" :key="index">
          <div class="user">第{{index+1}}楼用户：{{item.user_name}}  发表时间：{{item.add_time| dateFormat}}</div>
          <div class="content">{{item.content}}</div>
        </div>
      </div>
    </div>
    <mt-button type="danger" plain size="large" @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
//按需导入提示框
import {Toast} from 'mint-ui';
  export default {
    data(){
      return {
        id:this.$route.params.id,
        newslistinfo:[],
        pageindex:1,
        comments:[],
        content:""
      }
    },
    created(){
      this.getNewsInfo();
      this.getComment();
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
      //获取评论数据
      getComment(){
        this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageindex).then(function(res){
          // console.log(res);
          if(res.body.status == 0){
            if(res.body.message.length == 0){
              Toast("没有更多");
              // this.pageindex = this.pageindex;
              // return;
            }
            // this.comments = res.body.message;
            // 使用concat 方法将评论拼接起来
            this.comments = this.comments.concat( res.body.message );
          }
        });
      },
      postComment(){
        //判断是否为空
        if( this.content.trim() == '' ){
            Toast('评论不能为空');
            return;
          }
        this.$http.post("api/postcomment/"+this.id,{content:this.content},{emulateJSON:true}).then(function(res){
          
          // console.log(res);
          if(res.body.status == 0){
            Toast('评论成功');
            this.content = '';
            this.comments = [];//清空数据，否则会出现发表评论后自动触发加载更多的按钮
            this.getComment();
          }
        });
      },
      loadMore(){
        //点击加载更多的评论
        this.pageindex ++;
        this.getComment();
      }
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

    //评论区
    .comment{
      .title{
        color:black;
        font-size:17px;
      }
      textarea{
        height: 130px;
      }
      .list{
        .list-item{
          padding : 5px 0;
          .user{
            background-color: #ccc;
            font-size: 12px;
            height: 25px;
            line-height: 25px;
          }
        }
        padding: 10px 0; 
      }
    }
  }
</style>