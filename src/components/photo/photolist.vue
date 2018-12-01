<template>
  <div style="background-color:white;">
    <!-- tab左右滑动标签页 -->
    <van-tabs v-model="active" @click="getImages">
    <van-tab v-for="item in cats" :key="item.id" :title="item.title" >
      <div class="photolist">
        <router-link tag="li" :to="'/home/photodetail/'+item.id" v-for="item in images" :key="item.id" >
          <img v-lazy="item.img_url" alt="">
          <div class="info">
            <p class="title">{{item.title}}</p>
            <div class="zhaiyao">{{item.zhaiyao}}</div>
          </div>
        </router-link>
      </div>
    </van-tab>
</van-tabs>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        active:0,
        cats:[],
        images:[]
      }
    },
    created(){
      //初始化标签页的数据
      this.getImgCats();
      //初始化标签页为全部图片，即id为0
      this.getImages(0,'全部');
    },
    methods:{
      getImgCats(){
        this.$http.get("api/getimgcategory").then(function(res){
          // console.log(res);s
          if(res.body.status == 0){
            this.cats = res.body.message;
            //加上一个全部的类别
            this.cats.unshift({id:0,title:"全部"});
          }
        });  
      },
      getImages(index,title){
        // console.log(this.cats);
        // console.log(index,ts/itle);
        //index 为数组的索引下标，title为对应的标题
        //通过cats数组，通过index获取来获取id，通过id发送请求
        // var id = this.cat[index].id;
        var id = this.cats.length == 0 ? 0 : this.cats[index].id;
        this.$http.get("api/getcatimages/"+id).then(function(res){
          // console.log(res);
          if(res.body.status == 0){
            this.images = res.body.message;
          }
        });
      }
    } 
  }
</script>

<style lang="scss" scoped>
  .photolist{
    padding:8px 10px;
    li{
      box-shadow: 0px 0px 15px #aaa;
      margin-bottom: 15px;
      list-style: none;
      position:relative;
      img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      img{
       width:100%;
       height: 325px;
      }
      .info{
        padding:5px 0;
        background-color: rgba(0,0,0,0.5);
        position:absolute;
        // top:215px;
        bottom:5px;
        .title{
          color:#fff;
          font-size: 14px;
          font-weight:bold;
        }
        .zhaiyao{
          color:#fff;
          font-size: 13px;
        }
     }
    }
  }
</style>