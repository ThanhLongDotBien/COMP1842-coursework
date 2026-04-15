import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import WelcomePage     from '@/views/WelcomePage.vue'
import NotFoundPage    from '@/views/NotFoundPage.vue'
import EntriesPage     from '@/views/responder/EntriesPage.vue'
import NewEntryPage    from '@/views/responder/NewEntryPage.vue'
import EditEntryPage   from '@/views/responder/EditEntryPage.vue'
import EntryDetailPage from '@/views/responder/EntryDetailPage.vue'
import TrainingPage    from '@/views/responder/TrainingPage.vue'

const routes = [
  { path: '/',                    name: 'welcome',      component: WelcomePage },
  { path: '/entries',             name: 'entries',      component: EntriesPage },
  { path: '/entries/new',         name: 'new-entry',    component: NewEntryPage },
  { path: '/entries/:id',         name: 'entry-detail', component: EntryDetailPage },
  { path: '/entries/:id/edit',    name: 'edit-entry',   component: EditEntryPage },
  { path: '/training',            name: 'training',     component: TrainingPage },
  { path: '*',                    component: NotFoundPage }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
