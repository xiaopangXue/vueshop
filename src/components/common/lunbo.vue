<template>
  <div>
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in lunbo" :key="item.img">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        
      }
    },
    props:['lunbo']
  }
</script>

<style lang="scss" scoped>
  .mint-swipe {
      height: 200px;
      text-align: center;
    }

    img {
      height:100%;
    }
</style>