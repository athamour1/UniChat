

import { route } from 'quasar/wrappers'
import { Router, createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default route(function ({ store, state/*, ssrContext */ }) {

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const publicPages = ['/']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = store.getters['uniChat/getLoggedin']
    const profile = store.getters['uniChat/getProfile']
    //console.log(to.path)

    if (authRequired && !loggedIn) {
      return next({
        path: '/',
        query: {
          next: to.fullPath.replace('/', ''),
        }
      });
    } else {
      next();
    }

  })

  return Router
})
