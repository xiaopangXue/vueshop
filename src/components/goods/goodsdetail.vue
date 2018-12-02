<template>
  <div class="goodsdetail-container">
    <!-- 卡片,商品图片 -->
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <swipe :lunbo="lunbo"></swipe>
					</div>
				</div>
			</div>
    <!-- 商品购买区 -->
    <div class="mui-card">
      <div class="mui-card-header">
        {{goodsinfo.title}}
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            <span class="market">市场价:￥{{goodsinfo.market_price}} </span>
            <span class="now">本店价: ￥{{goodsinfo.sell_price}}</span>
          </p>
          <div>
            <span class="buy">购买数量：</span>
            <div class="mui-numbox" data-numbox-min='1' data-numbox-max='200'>
              <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
              <input id="test" class="mui-input-numbox" type="number" value="1" />
              <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" class="mai">立即购买</mt-button>
        <mt-button type="danger">加入购物车</mt-button>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            商品货号：{{goodsinfo.goods_no}}
          </p>
          <p>
            库存情况：{{goodsinfo.stock_quantity}}件
          </p>
          <p>
            上架时间：{{goodsinfo.add_time|dateFormat }}
          </p>
        </div>
      </div>
      <div class="mui-card-footer btn">
          <mt-button type="primary" plain size="large" class="text" @click="getGoodsDesc">图文介绍</mt-button>
          <mt-button type="danger" plain size="large" @click="getComment">商品评论</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
  // 引入轮播图模块
  import swipe from '../common/lunbo.vue';
  //引入mui数字框js文件
  import mui from "../../lib/mui/js/mui.js";

  export default {
    data(){
      return {
        id:this.$route.params.id,
        lunbo:[],
        goodsinfo:{}
      }
    },
    created(){
      this.getGoodsLunbo();
      this.getGoodsInfo();
    },
    mounted(){
      //这时候，vue已经将虚拟dom对象挂载到真实的dom中，我才可以使用js去操作dom
      // 解决的是，number输入框失效的问题
      mui('.mui-numbox').numbox();
    },
    methods:{
      getGoodsLunbo(){
        this.$http.get("api/getthumbimages/"+this.id).then(function(res){
          if( res.body.message.length == 0 ){
            //给一个默认图片
            res.body.message.push({
              img:"../../images/error.png",
              url:"../../images/error.png"
            });
          }else{
            res.body.message.forEach(function(ele){
              ele.img = ele.src;
              ele.url = ele.src;
            });
          }
          this.lunbo = res.body.message;
        });
      },
      // 获取商品详情信息
      getGoodsInfo(){
        this.$http.get("api/getgoodsinfo/"+this.id).then(function(res){
          if(res.body.status == 0) {
            this.goodsinfo = res.body.message[0];
          }
        });
      },
      getGoodsDesc(){
        //跳转到图文详情页
        // 编程式导航
        this.$router.push("/home/goodsdesc/"+this.id);
      },
      getComment(){
        this.$router.push("/home/goodscomment/"+this.id);
      }
    },
    components:{
      swipe
    }
  }
</script>

<style lang="scss" scoped>
  .goodsdetail-container{
    
    .market{
      text-decoration:line-through;
    }
    .now{
      color:red;
      font-weight:bold;
      margin-left:10px;
    }
    .buy{
      color:rgb(143, 135, 135);
    }
    
    .mui-card-footer{
      display: flex;
      justify-content: start;
      .mai{
        margin-right:10px;
      }
    }
    .btn{
      display:flex;
      flex-direction:column;
      .text{
        margin-bottom:10px;
      }
    }
  }

</style>