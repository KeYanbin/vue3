import './assets/main.css'
// 创建实例
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'//引入pinia
import piniaPluginPersist from 'pinia-plugin-persist'//引入pinia数据持久化插件
import { useUserStore } from './pinia/store'
import 'vant/lib/index.css';
import { Tabbar, TabbarItem } from 'vant';

const app = createApp(App);//确保 _use_ 路由实例使整个应用支持路由。
app.use(Tabbar);
app.use(TabbarItem);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia().use(piniaPluginPersist))//安装插件
app.provide('$axios', axios);//provide 提供$axios实例
app.use(router);// 挂载router,完成
app.mount('#app');
// 路由判断登录 根据路由配置文件的参数
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  const nextRoute = ['articleDetail', 'userinfo', 'article']; // 页面组件名集合
  const isLogin = useUserStore().token // 是否登录
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {
    if (isLogin.length === 0) {
      console.log('未登录~');
      router.push({ name: 'register' })
    }
  }
  // 已登录状态；当路由到login时，跳转至home 
  if (to.fullPath === '/register') {
    if (isLogin.length > 0) {
      router.push({ name: 'article' });
    }
  }
  next();
});

export default router;

