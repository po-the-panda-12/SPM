import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            api: 'https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api',
            stored_role_id: 5,
            stored_indivLJ_id: null,
            current_lj: null,
            stored_staff_id: null,
            stored_current_accessrole: null,
            currentLJName: null
        }
    },
    mutations: {
        setCurrentLJ(state, lj_object) {
            state.current_lj = lj_object
        },
        setIndivLJId(state, indivLJ_id) {
            state.stored_indivLJ_id = indivLJ_id
        },
        setRoleId(state, role_id) {
            state.stored_role_id = role_id
        },
        
        setStaffId(state, staff_id) {
            state.stored_staff_id = staff_id
        },
        setCurrentAccessRole(state, role_id) {
            state.stored_current_accessrole = role_id
        },
        setCurrentLJName(state, lj_name){
            state.currentLJName = lj_name;
        }
        
    }
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')