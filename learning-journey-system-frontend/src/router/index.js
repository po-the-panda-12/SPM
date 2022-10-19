import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/StaffViews/HomeView.vue'
import LearningJourneysView from '../views/StaffViews/LearningJourneysView.vue'
import JobRoleView from '../views/StaffViews/JobRoleView.vue'
import IndivLearningJourneyView from '../views/StaffViews/IndivLearningJourneyView.vue'
import CreatelearningJourneyView from '../views/StaffViews/CreatelearningJourneyView.vue'
import viewSkillsandCourses from '../views/StaffViews/viewSkillsandCourses.vue'
import createSkills from '../views/AdminViews/createSkills.vue'

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
    path: '/createSkills',
    name: 'createSkills',
    component: createSkills
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
