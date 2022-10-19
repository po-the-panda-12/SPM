import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            current_lj_id: 0,
            current_role_id: 0,
        }
    },
    mutations: {
        setRoleId(state, role_id) {
            state.current_role_id = role_id
        },
        setCurrentLJId(state, lj_id) {
            state.current_lj_id = lj_id
        }
    }   
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')