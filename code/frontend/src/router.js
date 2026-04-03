import Vue from 'vue'
import Router from 'vue-router'
import Entries from './views/Entries.vue'
import New     from './views/New.vue'
import Show    from './views/Show.vue'
import Edit    from './views/Edit.vue'
import Test    from './views/Test.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    { path: '/',              redirect: '/entries' },
    { path: '/entries',       name: 'entries',    component: Entries },
    { path: '/entries/new',   name: 'new-entry',  component: New },
    { path: '/entries/:id',   name: 'show',       component: Show },
    { path: '/entries/:id/edit', name: 'edit',    component: Edit },
    { path: '/test',          name: 'test',       component: Test }
  ]
})