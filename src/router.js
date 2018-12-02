import VueRouter from 'vue-router';

//引入相关的组件
import home from './components/tabbar/home.vue';
import member from './components/tabbar/member.vue';
import shopcar from './components/tabbar/shopcar.vue';
import search from './components/tabbar/search.vue';
import newslist from './components/news/newslist.vue';
import newsdetail from './components/news/newsdetail.vue';
import photolist from './components/photo/photolist.vue';
import photodetail from './components/photo/photodetail.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsdetail from './components/goods/goodsdetail.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import goodscomment from './components/goods/goodscomment.vue';

//定义路由匹配的组件
var router = new VueRouter({
  routes:[
    //重定向路由
    {path:"/", redirect:'/home'},
    {path:"/home", component:home},
    {path:"/member", component:member},
    {path:"/shopcar", component:shopcar},
    {path:"/search", component:search},
    {path:"/home/newslist", component:newslist},
    {path:"/home/newsdetail/:id", component:newsdetail},
    {path:"/home/photolist", component:photolist},
    {path:"/home/photodetail/:id", component:photodetail},
    {path:"/home/goodslist/", component:goodslist},
    {path:"/home/goodsdetail/:id", component:goodsdetail},
    {path:"/home/goodsdesc/:id", component:goodsdesc},
    {path:"/home/goodscomment/:id", component:goodscomment},
  ],
  //当触发路由的时候，为触发的路由加上一个类，以示高亮
  linkActiveClass:'mui-active'
});

//暴露给外部
export default router;