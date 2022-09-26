import Home from '../views/Home.vue'
import About from '../views/About.vue'
import LearningJourney from '../views/LearningJourney.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// 1. Define route components.
// These are imported from other files


// 2. Define some routes
// Each route should map to a component.
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/learning_journey', component: LearningJourney }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router;