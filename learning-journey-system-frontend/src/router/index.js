import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LearningJourneysView from '../views/LearningJourneysView.vue'
import JobRoleView from '../views/JobRoleView.vue'
import IndivLearningJourneyView from '../views/IndivLearningJourneyView.vue'
import CreatelearningJourneyView from '../views/CreatelearningJourneyView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/jobroles',
    name: 'jobroles',
    component: JobRoleView
  },
  {
    path: '/indivlearningJourneys/:lj_id',
    name: 'indivlearningJourneys',
    component: IndivLearningJourneyView
  },
  {
    path: '/learningJourneys',
    name: 'learningJourneys',
    component: LearningJourneysView
  },
  {
    path: '/createlearningJourney',
    name: 'createlearningJourney',
    component: CreatelearningJourneyView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
