import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ba8ad85e = () => interopDefault(import('../pages/callback.vue' /* webpackChunkName: "pages/callback" */))
const _360d0304 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _162ba2e6 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _02617945 = () => interopDefault(import('../pages/main.vue' /* webpackChunkName: "pages/main" */))
const _2b428b76 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/callback",
    component: _ba8ad85e,
    name: "callback"
  }, {
    path: "/inspire",
    component: _360d0304,
    name: "inspire"
  }, {
    path: "/login",
    component: _162ba2e6,
    name: "login"
  }, {
    path: "/main",
    component: _02617945,
    name: "main"
  }, {
    path: "/",
    component: _2b428b76,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
