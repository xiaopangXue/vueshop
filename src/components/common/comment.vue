<template>
  <div class="comment">
    <h2 class="title">发表评论</h2>
    <textarea placeholder="请输入你要bb的内容(不超过120个字)" v-model="content"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="list">
      <div class="list-item" v-for="(item,index) in comments" :key="index">
        <div class="user">第{{index+1}}楼用户：{{item.user_name}} 发表时间：{{item.add_time| dateFormat}}</div>
        <div class="content">{{item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" plain size="large" @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
  //按需导入提示框
  import {
    Toast
  } from 'mint-ui';

  export default {
    data() {
      return {
        pageindex: 1,
        comments: [],
        content: "",
        pageindexTotal:0,
        articleCommentId:0,

      }
    },
    props: ['id'],
    created() {
      this.getComment('list');
    },
    methods: {
      //获取评论数据
      getComment(status = '') {
        this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex + "&add=" + status).then(function (
          res) {

          // if (res.body.status == 0) {
            // console.log(res.body.message);
            var _message = res.body.message;
            console.log(_message);
            // console.log( this.articleCommentId );
            // console.log( _message[_message.length-1].id );
            if (_message.length == []) {
                Toast('没有更多评论');
                return false;
            }
            //content将两个数组合并为一个数组
            if (status == 'add') {
              // console.log(this.comments);return false;
              this.comments = this.comments.concat(_message);
              this.pageindexTotal = _message.length;
              this.articleCommentId = _message[_message.length - 1].id;
            } else if (this.articleCommentId != _message[_message.length - 1].id) {
              this.pageindex++;
              this.comments = this.comments.concat(_message);
              this.pageindexTotal = _message.length;
              this.articleCommentId = _message[_message.length - 1].id;
              
              // console.log(this.comments);
              // console.log( _message.length );
              
            }
          // }
        });
      },
      postComment() {
        //判断是否为空
        if (this.content.trim() == '') {
          Toast('评论不能为空');
          return;
        }
        this.$http.post("api/postcomment/" + this.id, {
          content: this.content
        }, {
          emulateJSON: true
        }).then(function (res) {

          // console.log(res);
          if (res.body.status == 0) {
            Toast('评论成功');
            this.content = '';
            // this.comments = []; //清空数据，否则会出现发表评论后自动触发加载更多的按钮
            this.getComment('add');
          }
        });
      },
      loadMore() {
        //点击加载更多的评论
        this.getComment('list');
      }
    }
  }
</script>

<style lang="scss" scoped>
  //评论区
  .comment {
    .title {
      color: black;
      font-size: 17px;
    }

    textarea {
      height: 130px;
    }

    .list {
      .list-item {
        padding: 5px 0;

        .user {
          background-color: #ccc;
          font-size: 12px;
          height: 25px;
          line-height: 25px;
        }
      }

      padding: 10px 0;
    }
  }
</style>