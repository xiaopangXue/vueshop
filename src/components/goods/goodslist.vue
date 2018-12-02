
<template>

  <div class="goodslist-container">
    
    <router-link tag="div" :to="'/home/goodsdetail/'+item.id" class="item" v-for="item in goodsData" :key="item.id">
      <img v-lazy="item.img_url" alt="">
      <p class="title"> {{item.title}} </p>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}} </span>
        </p>
        <p class="hot">
          <span>热卖中</span>
          <span>剩余 {{item.stock_quantity}} 件</span>
        </p>
      </div>
    </router-link>
    <!-- 加载更多 -->
    <mt-button type="danger" plain size="large" @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        pageindex:1,
        goodsData:[]
      }
    },
    created(){
      this.getGoodsData();
    },
    methods:{
      getGoodsData(){
        this.$http.get("api/getgoods?pageindex="+this.pageindex).then(function(res){
          // console.log(res);
          if(res.body.status == 0){
            this.goodsData = this.goodsData.concat(res.body.message) ;
          }
        });
      },
      loadMore(){
        this.pageindex++;
        this.getGoodsData();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .goodslist-container{
    background-color: white;
    padding: 10px 8px;
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    justify-content:space-between;
    .item{
      // 每一个盒子的flex布局
      display:flex;
      flex-direction:column;
      justify-content: space-between;

      border-radius:3px;
      box-shadow: 0 0 5px rgb(150, 147, 147);
      
      margin-bottom: 12px;
      border: 1px solid #ccc;
      width:48%;
      img{
        padding:3px 3px;
        width:100%;
        // background-color:#ccc;
        // height:180px;
      }
      .title{
        padding:0 2px;
        color:black;
        font-size:15px;
        font-weight:bold;
      }
      .info{
        margin: 0;
        padding-top:10px;
        background-color:#eee;
        // height:60px;
        .price{
          .now{
            color:red;
            font-weight:bold;
          }
          .old{
            text-decoration: line-through;
            margin-left:10px;
          }
        }
        .hot{
          padding:0px 2px;
          display:flex;
          justify-content:space-between;
        }
      }
    }
  }
</style>