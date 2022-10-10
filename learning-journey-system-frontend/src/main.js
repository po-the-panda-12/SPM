import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            stored_role_id: 5,
        }
    },
    mutations: {
        setRoleId(state, role_id) {
            state.stored_role_id = role_id
        }
    }
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')