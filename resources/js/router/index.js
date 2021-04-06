import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/';
import { routes } from './routes';
Vue.use(VueRouter)

let loggedIn = store.getters['auth/isLoggedIn']
const router = new VueRouter({
    mode : 'history',
    routes
})


router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        await store.dispatch('auth/initApp')
      if (!store.getters['auth/isLoggedIn']) {
        next({ path: '/login', query: { redirect: to.fullPath }})
      } else {
        next()
      }
    } else if(to.matched.some(record => record.meta.requiresGuest)){
        if(store.getters['auth/isLoggedIn']){
            await store.dispatch('auth/initApp')
            next({ path: '/admin'})
        }else{
            next()
        }
    } else {
      next()
    }
  })
export default router
