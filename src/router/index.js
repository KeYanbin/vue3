//route 访问路径，路由
//router 路由管理者
import { createRouter, createWebHashHistory } from 'vue-router';// 创建路由实例并传递 `routes` 配置const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//创建路由 route

import Home from "@/views/Home.vue"
import About from "@/views/About.vue"
import Read from "@/views/Read.vue"
import Flex from "@/views/Flex.vue"
import Login from '@/views/user/Login.vue'
import Article from '@/views/user/Article.vue'
import UserInfo from '@/views/user/UserInfo.vue'
import Register from '@/views/user/Register.vue'
import articleDetail from '@/views/user/articleDetail.vue'


const routes = [
   { path: '/', component: Home },
   { path: '/about', component: About },
   { path: '/read', component: Read, name: "Read" },
   { path: '/flex', component: Flex },
   { path: '/login', component: Login },
   {
      path: '/article', component: Article, name: "article",
      meta: {
         hideTabBar: true
      }
   },
   {
      path: '/userinfo',
      component: UserInfo,
      name: "userinfo",
      meta: {
         hideTabBar: true
      }
   },
   {
      path: '/register',
      component: Register,
      name: "register",
      meta: {
         hideTabBar: false
      }
   },
   { path: '/articleDetail', component: articleDetail, name: "articleDetail" },

]
//创建路由管理 router
const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
   history: createWebHashHistory(),
   routes,
}
);
//导出路由
export default router