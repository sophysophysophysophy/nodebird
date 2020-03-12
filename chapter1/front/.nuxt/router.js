import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _67359862 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _792066ef = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _400c2f4b = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/profile",
    component: _67359862,
    name: "profile"
  }, {
    path: "/signup",
    component: _792066ef,
    name: "signup"
  }, {
    path: "/",
    component: _400c2f4b,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
