import VueRouter from 'vue-router';

//引入相关的组件
import home from './components/tabbar/home.vue';
import member from './components/tabbar/member.vue';
import shopcar from './components/tabbar/shopcar.vue';
import search from './components/tabbar/search.vue';
import newslist from './components/news/newslist.vue';

//定义路由匹配的组件
var router = new VueRouter({
  routes:[
    //重定向路由
    {path:"/", redirect:'/home'},
    {path:"/home", component:home},
    {path:"/member", component:member},
    {path:"/shopcar", component:shopcar},
    {path:"/search", component:search},
    {path:"/newslist", component:newslist},
  ],
  //当触发路由的时候，为触发的路由加上一个类，以示高亮
  linkActiveClass:'mui-active'
});

//暴露给外部
export default router;