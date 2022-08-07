import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import plaintes from '../views/plaintes/plaintes.vue'
import pvs from '../views/pvs/pvs.vue'
import traiter from '../views/traitement/affecter_dossier.vue'
import suivi from '../views/suivi_dossiers/suivi_traitement.vue'
import stats from '../views/stats.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'plaintes',
        name: 'plaintes',
        component: plaintes
      },
      {
        path: 'pvs',
        name: 'pvs',
        component: pvs
      },
      {
        path: 'traiter',
        name: 'traiter',
        component: traiter
      },
      {
        path: 'suivi',
        name: 'suivi',
        component: suivi
      },
      {
        path: 'stats',
        name: 'stats',
        component: stats
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
