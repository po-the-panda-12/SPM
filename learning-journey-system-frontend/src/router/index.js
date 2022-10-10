import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LearningJourneysView from '../views/LearningJourneysView.vue'
import JobRoleView from '../views/JobRoleView.vue'
import IndivLearningJourneyView from '../views/IndivLearningJourneyView.vue'
import CreatelearningJourneyView from '../views/CreatelearningJourneyView.vue'
import viewSkillsandCourses from '../views/viewSkillsandCourses.vue'
import viewAllSkills from '../views/viewAllSkills.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/viewSkillsandCourses',
    name: 'viewSkillsandCourses',
    component: viewSkillsandCourses,
    props: true
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
    name: '/createlearningJourney',
    component: CreatelearningJourneyView
  },
  {
    path: '/viewAllSkills',
    name: 'viewAllSkills',
    component: viewAllSkills
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
