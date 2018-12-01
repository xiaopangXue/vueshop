//引入vue框架
import Vue from 'vue';

//引入vue-resource，用来发送ajax请求
import vueResource from 'vue-resource';
Vue.use(vueResource);

// 全局设置 ajax请求的根域名
Vue.http.options.root = "http://127.0.0.1:3000/";
//可以全局设置post表单的传值方式
// Vue.http.options.emulateJSON = true;

//引入vue-router路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//按需引入vant的标签页组件
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);

//导入vant相关样式
import 'vant/lib/index.css';

//引入vue-preview
import VuePreview from 'vue-preview';
// defalut install
Vue.use(VuePreview);


// 引入路由模块
import router from './router.js';

// //引入相关的组件
// import home from './components/tabbar/home.vue';
// import member from './components/tabbar/member.vue';
// import shopcar from './components/tabbar/shopcar.vue';
// import search from './components/tabbar/search.vue';
// import newslist from './components/news/newslist.vue';

// //定义路由匹配的组件
// var router = new VueRouter({
//   routes:[
//     //重定向路由
//     {path:"/", redirect:'/home'},
//     {path:"/home", component:home},
//     {path:"/member", component:member},
//     {path:"/shopcar", component:shopcar},
//     {path:"/search", component:search},
//     {path:"/newslist", component:newslist},
//   ],
//   //当触发路由的时候，为触发的路由加上一个类，以示高亮
//   linkActiveClass:'mui-active'
// });

//引入moment模块
import moment from 'moment';
//定义全局过滤器
Vue.filter('dateFormat', function(dateStr, pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dateStr).format(pattern);
});

//引入轮播图相关
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//引入懒加载
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

//导入app.vue组件
import app from './app.vue';

//引入mint-ui相关组件
import { Header,Button } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
//css一般是按需引入，js引入整个文件
import 'mint-ui/lib/style.css';

//引入 mui的css样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/mui.css';
//引入mui扩展的字体文件
import './lib/mui/css/icons-extra.css';


//创建vm的实例
new Vue({
  el:"#app",
  render:c=> c(app),
  router
});