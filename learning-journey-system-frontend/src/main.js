import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            stored_role_id: 5,
            stored_indivLJ_id: null,
            stored_staff_id: null,
            stored_current_accessrole: null
        }
    },
    mutations: {
        setRoleId(state, role_id) {
            state.stored_role_id = role_id
        },
        setIndivLJId(state, indivLJ_id) {
            state.stored_indivLJ_id = indivLJ_id
        },
        setStaffId(state, staff_id) {
            state.stored_staff_id = staff_id
        },
        setCurrentAccessRole(state, role_id) {
            state.stored_current_accessrole = role_id
        }
        
    }
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')